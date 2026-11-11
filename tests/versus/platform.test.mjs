import test from "node:test";
import assert from "node:assert/strict";
import {
  VERSUS_GAME_IDS,
  loadVersusGame,
} from "../../dist/versus/metadata.mjs";
import {
  createSession,
  currentState,
  applySessionMove,
  restoreSession,
  serializeSession,
  travelHistory,
} from "../../dist/versus/session.mjs";
import { chooseMove } from "../../dist/versus/search.mjs";
import {
  createVersusStorage,
  VERSUS_STORAGE_KEY,
} from "../../dist/versus/storage.mjs";
import {
  createProgressBackup,
  previewProgressRestore,
  applyProgressRestore,
} from "../../dist/progress-backup.mjs";

const config = {
  mode: "local",
  difficulty: "intermediate",
  mascots: ["capivara", "tucano"],
};

function freezeDeep(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.values(value).forEach(freezeDeep);
    Object.freeze(value);
  }
  return value;
}

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
}

function advance(engine, session, count) {
  for (let index = 0; index < count; index += 1) {
    const move = engine.getLegalMoves(currentState(session))[0];
    if (!move) break;
    session = applySessionMove(engine, session, move);
  }
  return session;
}

for (const id of VERSUS_GAME_IDS) {
  test(`${id}: motor, histórico e computador mantêm o contrato imutável`, async () => {
    const { engine, view } = await loadVersusGame(id);
    const initial = freezeDeep(engine.createState());
    const snapshot = structuredClone(initial);
    const moves = engine.getLegalMoves(initial);
    assert.ok(moves.length > 0);
    assert.deepEqual(engine.getLegalMoves(initial), moves);
    assert.deepEqual(JSON.parse(JSON.stringify(moves)), moves);
    assert.ok(engine.getScores(initial).every(Number.isFinite));
    assert.ok(Number.isFinite(engine.evaluate(initial, 0)));
    assert.ok(Number.isFinite(engine.evaluate(initial, 1)));

    const answer = chooseMove(engine, initial, "intermediate", {
      clock: () => 0,
      nodes: 300,
      milliseconds: 1000,
    });
    assert.ok(
      moves.some(
        (move) => JSON.stringify(move) === JSON.stringify(answer.move),
      ),
    );
    assert.ok(answer.nodes <= 300);
    assert.deepEqual(initial, snapshot);

    const original = advance(engine, createSession(engine), 4);
    const undone = travelHistory(original, -1);
    const record = serializeSession(undone, config);
    const restored = restoreSession(engine, JSON.parse(JSON.stringify(record)));
    assert.deepEqual(restored, undone);
    assert.deepEqual(
      currentState(travelHistory(restored, 1)),
      currentState(original),
    );
    assert.match(view.getStatus(initial), /\S/);
    assert.match(
      view.describeMove(
        initial,
        answer.move,
        engine.applyMove(initial, answer.move),
      ),
      /\S/,
    );
  });
}

test("uma jogada após desfazer substitui somente o futuro, sem alterar o histórico anterior", async () => {
  const { engine } = await loadVersusGame("acorde");
  const original = advance(engine, createSession(engine), 4);
  const before = structuredClone(original);
  const undone = travelHistory(travelHistory(original, -1), -1);
  const alternatives = engine.getLegalMoves(currentState(undone));
  const changed = applySessionMove(engine, undone, alternatives.at(-1));
  assert.equal(changed.cursor, 3);
  assert.equal(changed.actions.length, 3);
  assert.equal(changed.states.length, 4);
  assert.deepEqual(original, before);
});

test("restauração rejeita cursor inválido, ações ilegais e histórico excessivo", async () => {
  const { engine } = await loadVersusGame("acorde");
  for (const record of [
    { actions: [], cursor: -1 },
    { actions: [], cursor: 1 },
    { actions: [{ type: "collect", cell: 0 }], cursor: 1 },
    { actions: [null], cursor: 1 },
    { actions: Array(181).fill({ type: "pass" }), cursor: 0 },
  ]) {
    assert.throws(() => restoreSession(engine, record));
  }
});

test("QUINHÃO desfaz e refaz até uma decisão humana sem presumir alternância", async () => {
  const { engine } = await loadVersusGame("quinhao");
  const session = advance(engine, createSession(engine), 4);
  assert.deepEqual(
    session.states.map((state) => state.player),
    [0, 1, 1, 0, 0],
  );
  const previous = travelHistory(session, -1, true);
  assert.equal(previous.cursor, 3);
  assert.equal(travelHistory(previous, -1, true).cursor, 0);
  assert.equal(travelHistory({ ...session, cursor: 0 }, 1, true).cursor, 3);
});

test("oito partidas reais sobrevivem a backup e restauração, incluindo o futuro desfeito", async () => {
  const source = memoryStorage();
  const save = createVersusStorage(source);
  const records = new Map();
  for (const id of VERSUS_GAME_IDS) {
    const { engine } = await loadVersusGame(id);
    const session = travelHistory(
      advance(engine, createSession(engine), 4),
      -1,
    );
    const record = serializeSession(session, config);
    records.set(id, record);
    assert.equal(save.save(id, record), true);
  }
  const raw = source.getItem(VERSUS_STORAGE_KEY);
  const backup = createProgressBackup(source);
  const target = memoryStorage();
  applyProgressRestore(backup, previewProgressRestore(backup, target), target);
  assert.equal(target.getItem(VERSUS_STORAGE_KEY), raw);
  const restored = createVersusStorage(target);
  for (const [id, record] of records) {
    const { engine } = await loadVersusGame(id);
    assert.deepEqual(restored.read(id), record);
    assert.equal(
      restoreSession(engine, restored.read(id)).cursor,
      record.cursor,
    );
  }
});

test("salvar relê o envelope e conserva alterações de outro jogo em outra aba", () => {
  const storage = memoryStorage();
  const firstTab = createVersusStorage(storage);
  const secondTab = createVersusStorage(storage);
  assert.equal(firstTab.save("acorde", { marker: 1 }), true);
  assert.equal(secondTab.save("lastro", { marker: 2 }), true);
  assert.equal(firstTab.save("acorde", { marker: 3 }), true);
  assert.deepEqual(firstTab.read("lastro"), { marker: 2 });
  assert.deepEqual(secondTab.read("acorde"), { marker: 3 });
  assert.equal(firstTab.save("jogo-inexistente", {}), false);
});

test("registro corrompido ou futuro permanece intacto e falha de quota é comunicada", () => {
  for (const raw of ["{incompleto", '{"version":2,"games":{}}']) {
    const storage = memoryStorage({ [VERSUS_STORAGE_KEY]: raw });
    const save = createVersusStorage(storage);
    assert.equal(save.read("acorde"), null);
    assert.equal(save.save("acorde", {}), false);
    assert.equal(storage.getItem(VERSUS_STORAGE_KEY), raw);
    assert.ok(save.warning);
  }
  const storage = memoryStorage();
  storage.setItem = () => {
    throw new Error("Quota excedida");
  };
  const save = createVersusStorage(storage);
  assert.equal(save.save("acorde", {}), false);
  assert.match(save.warning, /continuar/);
});

test("busca considera o decisor real, inclusive quando ele joga novamente", () => {
  const states = {
    start: { id: "start", player: 0, result: null },
    same: { id: "same", player: 0, result: null },
    rival: { id: "rival", player: 1, result: null },
    win: { id: "win", player: 1, result: { winner: 0 } },
    lose: { id: "lose", player: 0, result: { winner: 1 } },
  };
  const tree = {
    start: ["rival", "same"],
    same: ["win", "lose"],
    rival: ["win", "lose"],
  };
  const engine = {
    getLegalMoves: (state) => (tree[state.id] ?? []).map((to) => ({ to })),
    applyMove: (_, move) => states[move.to],
    evaluate: () => 0,
  };
  const answer = chooseMove(engine, states.start, "strong", { clock: () => 0 });
  assert.deepEqual(answer.move, { to: "same" });
  assert.equal(answer.value, 1_000_000);
  assert.equal(chooseMove(engine, states.win).move, null);
});

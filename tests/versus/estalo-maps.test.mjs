import test from "node:test";
import assert from "node:assert/strict";
import * as engine from "../../dist/versus/games/estalo/engine.mjs";

function freeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

function neighbors(cell, rows, columns) {
  const row = Math.floor(cell / columns);
  const column = cell % columns;
  return [[row - 1, column], [row + 1, column], [row, column - 1], [row, column + 1]]
    .filter(([r, c]) => r >= 0 && r < rows && c >= 0 && c < columns)
    .map(([r, c]) => r * columns + c);
}

test("ESTALO mapas: sete mapas fixos, quatro tamanhos e metas iguais", () => {
  assert.equal(engine.ESTALO_MAPS.length, 7);
  assert.equal(new Set(engine.ESTALO_MAPS.map(({ id }) => id)).size, 7);
  assert.deepEqual(new Set(engine.ESTALO_MAPS.map(({ rows, columns }) => `${rows}x${columns}`)), new Set(["4x4", "3x6", "4x6", "6x6"]));
  for (const map of engine.ESTALO_MAPS) {
    const state = engine.createState({ mapId: map.id });
    assert.equal(state.board.length, map.rows * map.columns);
    assert.deepEqual(state.targets, map.targets);
    assert.equal(state.targets[0], state.targets[1]);
    assert.equal(state.board.filter(Boolean).length, state.targets[0] * 2);
    assert.deepEqual(state.blocked, map.blocked);
    for (const cell of map.blocked) assert.equal(state.board[cell], null);
    assert.ok(state.targets[0] >= 8);
  }
});

test("ESTALO mapas: simetria rotacional troca posse e inverte seta", () => {
  for (const map of engine.ESTALO_MAPS) {
    for (let cell = 0; cell < map.board.length; cell += 1) {
      const pod = map.board[cell];
      const opposite = map.board[map.board.length - 1 - cell];
      if (!pod) assert.equal(opposite, null);
      else {
        assert.equal(opposite.owner, 1 - pod.owner, `${map.id} célula ${cell}`);
        assert.equal(opposite.direction, (pod.direction + 2) % 4, `${map.id} célula ${cell}`);
      }
    }
  }
});

test("ESTALO mapas: área útil conectada e nenhuma vitória imediata", () => {
  for (const map of engine.ESTALO_MAPS) {
    const state = engine.createState({ mapId: map.id });
    const reached = new Set([state.board.findIndex(Boolean)]);
    const queue = [...reached];
    for (let head = 0; head < queue.length; head += 1) {
      for (const cell of neighbors(queue[head], state.rows, state.columns)) {
        if (state.board[cell] && !reached.has(cell)) { reached.add(cell); queue.push(cell); }
      }
    }
    assert.equal(reached.size, state.board.filter(Boolean).length, map.id);
    for (const player of [0, 1]) {
      const perspective = freeze({ ...state, player });
      for (const move of engine.getLegalMoves(perspective)) {
        assert.equal(engine.applyMove(perspective, move).result, null, `${map.id}: ${JSON.stringify(move)}`);
      }
    }
  }
});

test("ESTALO mapas: cadeia não salta buracos nem atravessa borda de linha", () => {
  const island = engine.createState({ mapId: "ilha" });
  island.board[13] = { owner: 0, direction: 1 };
  assert.deepEqual(engine.traceMove(freeze(island), { type: "burst", cell: 13, turn: 0 }), [13]);
  const rectangle = engine.createState({ mapId: "horta" });
  rectangle.board[5] = { owner: 0, direction: 1 };
  assert.deepEqual(engine.traceMove(freeze(rectangle), { type: "burst", cell: 5, turn: 0 }), [5]);
  assert.throws(() => engine.applyMove(island, { type: "burst", cell: 14, turn: 0 }));
});

test("ESTALO mapas: toda partida conserva pontos e termina sem mutar estado", () => {
  for (const map of engine.ESTALO_MAPS) {
    for (let variant = 0; variant < 40; variant += 1) {
      let state = engine.createState({ mapId: map.id });
      while (!state.result) {
        const before = freeze(state);
        const moves = engine.getLegalMoves(before);
        assert.ok(moves.length > 0, map.id);
        state = engine.applyMove(before, moves[(variant * 7 + state.moveCount * 11) % moves.length]);
        assert.ok(state.board.filter(Boolean).length < before.board.filter(Boolean).length);
        assert.deepEqual(state.blocked, map.blocked);
        for (const owner of [0, 1]) {
          assert.equal(state.board.filter((pod) => pod?.owner === owner).length + state.scores[owner], map.targets[owner]);
          assert.ok(Number.isFinite(engine.evaluate(state, owner)));
        }
        assert.ok(state.moveCount <= map.targets[0] * 2);
      }
      assert.deepEqual(engine.getLegalMoves(state), []);
      if (state.result.winner === null) assert.deepEqual(state.scores, map.targets);
      else assert.equal(state.scores[state.result.winner], map.targets[state.result.winner]);
    }
  }
});

test("ESTALO mapas: clássico e estados sem metadados reproduzem as jogadas antigas", () => {
  let modern = engine.createState();
  let legacy = { player: modern.player, moveCount: modern.moveCount, result: modern.result, scores: [...modern.scores], lastChain: [], board: modern.board.map((pod) => ({ ...pod })) };
  for (const cell of [0, 11, 12, 3, 4, 2]) {
    const move = { type: "burst", cell, turn: 0 };
    modern = engine.applyMove(modern, move);
    legacy = engine.applyMove(legacy, move);
    for (const key of ["board", "scores", "lastChain", "player", "result", "moveCount"]) {
      assert.deepEqual(legacy[key], modern[key]);
    }
  }
  assert.equal(legacy.result.winner, 1);
  assert.equal(engine.DEFAULT_MAP_ID, "classico");
});

test("ESTALO mapas: configuração desconhecida falha e mapas não compartilham estado mutável", () => {
  for (const options of [null, [], "ilha", { mapId: null }, { mapId: "__proto__" }, { mapId: "desconhecido" }]) {
    assert.throws(() => engine.createState(options));
  }
  const first = engine.createState({ mapId: "ilha" });
  first.board[0].direction = 3;
  first.targets[0] = 100;
  first.blocked.push(0);
  const second = engine.createState({ mapId: "ilha" });
  assert.deepEqual(second.targets, [16, 16]);
  assert.equal(second.blocked.length, 4);
  assert.deepEqual(second.board, engine.getEstaloMap("ilha").board);
});

test("ESTALO mapas: salvar/restaurar mantém mapa, histórico, desfazer e refazer", async () => {
  const { createSession, applySessionMove, currentState, travelHistory, serializeSession, restoreSession } = await import("../../dist/versus/session.mjs");
  for (const map of engine.ESTALO_MAPS) {
    const config = { mode: "local", mapId: map.id };
    let session = createSession(engine, config);
    for (let index = 0; index < 3 && !currentState(session).result; index += 1) {
      session = applySessionMove(engine, session, engine.getLegalMoves(currentState(session))[0]);
    }
    const final = currentState(session);
    session = travelHistory(session, -1);
    const serialized = serializeSession(session, config);
    const restored = restoreSession(engine, JSON.parse(JSON.stringify(serialized)));
    assert.deepEqual(restored, session);
    assert.equal(currentState(restored).mapId, map.id);
    assert.deepEqual(currentState(travelHistory(restored, 1)), final);
  }
  const legacy = restoreSession(engine, { actions: [{ type: "burst", cell: 0, turn: 0 }], cursor: 1 });
  assert.equal(currentState(legacy).mapId, "classico");
  assert.deepEqual(currentState(legacy).scores, [4, 2]);
  assert.throws(() => restoreSession(engine, { config: { mapId: "invalid" }, actions: [], cursor: 0 }));
  assert.throws(() => restoreSession(engine, { config: { mapId: "ilha" }, actions: [{ type: "burst", cell: 14, turn: 0 }], cursor: 1 }));
});

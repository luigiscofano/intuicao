import test from "node:test";
import assert from "node:assert/strict";
import * as engine from "../../dist/versus/games/lastro/engine.mjs";
import * as view from "../../dist/versus/games/lastro/view.mjs";
import { game } from "../../dist/versus/games/lastro/index.mjs";

const PREFIX = [
  ["E1", 2],
  ["E1", 4],
  ["D2", 2],
  ["E2", 2],
  ["D2", 4],
  ["D3", 2],
  ["E7", 2],
  ["D3", 4],
];
const WINNING_FINISH = [
  ["E2", 3],
  ["E2", 4],
  ["D5", 2],
  ["E7", 3],
  ["D5", 3],
];
const LOSING_FINISH = [
  ["E2", 4],
  ["D5", 2],
  ["E7", 3],
  ["D5", 3],
];

function play(moves, initial = engine.createState()) {
  return moves.reduce(
    (state, [piece, to]) =>
      engine.applyMove(state, { type: "advance", piece, to }),
    initial,
  );
}

function freeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

test("LASTRO começa com seis pesos compartilhados, cargas 10/10 e sete ajustes", () => {
  const state = engine.createState();
  assert.deepEqual(state.positions, {
    E1: 1,
    E2: 1,
    E7: 1,
    D2: 1,
    D3: 1,
    D5: 1,
  });
  assert.deepEqual(engine.getLoads(state), { left: 10, right: 10, delta: 0 });
  assert.deepEqual(engine.getScores(state), [0, 0]);
  assert.deepEqual(engine.getLegalMoves(state), [
    { type: "advance", piece: "E1", to: 2 },
    { type: "advance", piece: "E1", to: 3 },
    { type: "advance", piece: "E2", to: 2 },
    { type: "advance", piece: "E2", to: 3 },
    { type: "advance", piece: "D2", to: 2 },
    { type: "advance", piece: "D2", to: 3 },
    { type: "advance", piece: "D3", to: 2 },
  ]);
  assert.deepEqual(
    engine.getLegalMoves({ ...state, player: 1 }),
    engine.getLegalMoves(state),
  );
});

test("LASTRO reconstitui as seis distâncias do exemplo e a resposta única", () => {
  const state = play(PREFIX);
  assert.deepEqual(state.positions, {
    E1: 4,
    E2: 2,
    E7: 2,
    D2: 4,
    D3: 4,
    D5: 1,
  });
  assert.deepEqual(engine.getLoads(state), { left: 22, right: 25, delta: 3 });
  assert.equal(state.player, 0);
  assert.deepEqual(engine.getLegalMoves(state), [
    { type: "advance", piece: "E2", to: 3 },
    { type: "advance", piece: "E2", to: 4 },
    { type: "advance", piece: "E7", to: 3 },
  ]);
  const next = engine.applyMove(state, { type: "advance", piece: "E2", to: 3 });
  assert.deepEqual(next.positions, {
    E1: 4,
    E2: 3,
    E7: 2,
    D2: 4,
    D3: 4,
    D5: 1,
  });
  assert.deepEqual(engine.getLoads(next), { left: 24, right: 25, delta: 1 });
  assert.equal(next.player, 1);
  assert.deepEqual(engine.getLegalMoves(next), [
    { type: "advance", piece: "E2", to: 4 },
  ]);
});

test("LASTRO respeita a diferença estratégica entre avançar uma e duas marcas", () => {
  const before = play(PREFIX);
  const winner = play(WINNING_FINISH, before);
  const loser = play(LOSING_FINISH, before);
  assert.equal(winner.roundWinner, 0);
  assert.deepEqual(winner.roundScores, [1, 0]);
  assert.equal(loser.roundWinner, 1);
  assert.deepEqual(loser.roundScores, [0, 1]);
  assert.equal(winner.result, null);
  assert.equal(loser.result, null);
});

test("LASTRO rejeita recuo, salto, peça inexistente, desvio proibido e passe", () => {
  const state = freeze(engine.createState());
  const snapshot = JSON.stringify(state);
  for (const move of [
    { type: "advance", piece: "E1", to: 1 },
    { type: "advance", piece: "E1", to: 0 },
    { type: "advance", piece: "E1", to: 4 },
    { type: "advance", piece: "E1", to: 2.5 },
    { type: "advance", piece: "E1", to: "2" },
    { type: "advance", piece: "E7", to: 2 },
    { type: "advance", piece: "D5", to: 2 },
    { type: "advance", piece: "D7", to: 2 },
    { type: "pass" },
    { type: "next-round" },
  ])
    assert.throws(() => engine.applyMove(state, move));
  const next = engine.applyMove(state, { type: "advance", piece: "E2", to: 3 });
  assert.equal(engine.getLoads(next).delta, -4);
  assert.equal(next.phase, "playing");
  assert.equal(JSON.stringify(state), snapshot);
  assert.notEqual(next.positions, state.positions);
  assert.notEqual(next.roundScores, state.roundScores);
  assert.throws(() =>
    engine.applyMove(next, { type: "advance", piece: "E2", to: 2 }),
  );
});

test("LASTRO pausa após a primeira rodada, preserva o ponto e inverte o início", () => {
  const ended = freeze(play([...PREFIX, ...WINNING_FINISH]));
  assert.equal(ended.phase, "between-rounds");
  assert.equal(ended.round, 1);
  assert.equal(ended.player, 1);
  assert.equal(ended.result, null);
  assert.deepEqual(engine.getLegalMoves(ended), [{ type: "next-round" }]);
  const next = engine.applyMove(ended, { type: "next-round" });
  assert.equal(next.phase, "playing");
  assert.equal(next.round, 2);
  assert.equal(next.player, 1);
  assert.equal(next.roundWinner, null);
  assert.deepEqual(next.positions, engine.createState().positions);
  assert.deepEqual(next.roundScores, [1, 0]);
  assert.equal(next.roundMoveCount, 0);
  assert.equal(next.moveCount, ended.moveCount + 1);
  assert.equal(next.result, null);
  assert.throws(() => engine.applyMove(next, { type: "next-round" }));
});

test("LASTRO só anuncia resultado final ao encerrar as duas rodadas: 1–1 e 2–0", () => {
  const roundOne = play([...PREFIX, ...WINNING_FINISH]);
  const roundTwo = engine.applyMove(roundOne, { type: "next-round" });
  const draw = play([...PREFIX, ...WINNING_FINISH], roundTwo);
  assert.equal(draw.phase, "finished");
  assert.equal(draw.round, 2);
  assert.deepEqual(draw.roundScores, [1, 1]);
  assert.equal(draw.result.winner, null);
  assert.deepEqual(engine.getLegalMoves(draw), []);
  assert.equal(engine.evaluate(draw, 0), 0);

  const win = play([...PREFIX, ...LOSING_FINISH], roundTwo);
  assert.deepEqual(win.roundScores, [2, 0]);
  assert.equal(win.result.winner, 0);
  assert.equal(engine.evaluate(win, 0), 10000);
  assert.equal(engine.evaluate(win, 1), -10000);
  assert.deepEqual(engine.getLegalMoves(win), []);
  assert.throws(() => engine.applyMove(win, { type: "next-round" }));
});

test("LASTRO percorre 1.214 aparelhos alcançáveis, conserva a faixa e encontra três terminais", () => {
  const visited = new Set();
  const pending = [engine.createState()];
  let terminal = 0;
  while (pending.length) {
    const state = pending.pop();
    const key = engine.TRACKS.map((track) => state.positions[track.id]).join(
      ",",
    );
    if (visited.has(key)) continue;
    visited.add(key);
    assert.equal(engine.validateState(JSON.parse(JSON.stringify(state))), true);
    if (state.phase === "between-rounds") {
      terminal += 1;
      assert.equal(state.roundScores[0] + state.roundScores[1], 1);
      continue;
    }
    const sum = Object.values(state.positions).reduce(
      (total, value) => total + value,
      0,
    );
    for (const move of engine.getLegalMoves(state)) {
      const next = engine.applyMove(freeze(state), move);
      const after = Object.values(next.positions).reduce(
        (total, value) => total + value,
        0,
      );
      assert.ok(after - sum === 1 || after - sum === 2);
      assert.ok(after <= 24);
      assert.ok(Math.abs(engine.getLoads(next).delta) <= 4);
      assert.ok(next.roundMoveCount <= 18);
      pending.push(next);
    }
  }
  assert.equal(visited.size, 1214);
  assert.equal(terminal, 3);
});

test("LASTRO rejeita posição, contagem, fase e resultado de duelo inconsistentes", () => {
  const state = engine.createState();
  assert.throws(() =>
    engine.validateState({
      ...state,
      positions: { ...state.positions, E1: 5 },
    }),
  );
  assert.throws(() =>
    engine.validateState({
      ...state,
      positions: { ...state.positions, E7: 2 },
    }),
  );
  assert.throws(() => engine.validateState({ ...state, roundMoveCount: 2 }));
  assert.throws(() => engine.validateState({ ...state, roundScores: [1, 0] }));
  assert.throws(() =>
    engine.validateState({
      ...state,
      result: { winner: 0, reason: "Inventado" },
    }),
  );
  assert.throws(() =>
    engine.validateState({ ...state, phase: "between-rounds" }),
  );
});

test("LASTRO seleção e prévia mostram seis pesos e contas, sem alterar o aparelho", () => {
  const state = freeze(play(PREFIX));
  const selected = view.interact(state, null, { type: "piece", piece: "E2" });
  assert.deepEqual(selected, { selection: { piece: "E2" }, move: null });
  const prepared = view.interact(state, selected.selection, {
    type: "destination",
    piece: "E2",
    to: 3,
  });
  assert.deepEqual(prepared.move, { type: "advance", piece: "E2", to: 3 });
  assert.deepEqual(view.selectionForMove(state, prepared.move), {
    piece: "E2",
  });
  const alternative = view.interact(
    state,
    view.selectionForMove(state, prepared.move),
    {
      type: "destination",
      piece: "E2",
      to: 4,
    },
  );
  assert.deepEqual(alternative.move, { type: "advance", piece: "E2", to: 4 });
  const preview = engine.applyMove(state, prepared.move);
  const html = view.renderBoard(state, {
    selection: prepared.selection,
    pendingMove: prepared.move,
    previewState: preview,
  });
  assert.equal((html.match(/data-piece=/g) ?? []).length, 6);
  assert.match(html, /Δ: \+3 − 2 = \+1/);
  assert.match(html, /esquerda 24, direita 25/);
  assert.match(html, /lastro-weight--ghost/);
  assert.equal(state.positions.E2, 2);
  assert.equal(engine.getLoads(state).delta, 3);
  assert.equal(game.id, "lastro");
  assert.equal(game.rules.length, 8);
});

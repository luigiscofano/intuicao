import test from "node:test";
import assert from "node:assert/strict";
import * as engine from "../../dist/versus/games/acorde/engine.mjs";
import * as view from "../../dist/versus/games/acorde/view.mjs";
import { game } from "../../dist/versus/games/acorde/index.mjs";

function play(cells, initial = engine.createState()) {
  return cells.reduce(
    (state, cell) =>
      engine.applyMove(
        state,
        cell === "pass" ? { type: "pass" } : { type: "collect", cell },
      ),
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

test("ACORDE monta quatro símbolos de cada tipo e começa na linha 2", () => {
  const state = engine.createState();
  assert.equal(state.player, 0);
  assert.equal(state.cursor, null);
  assert.deepEqual(engine.getActiveAxis(state), { kind: "row", index: 1 });
  assert.deepEqual(
    engine.getLegalMoves(state),
    [4, 5, 6, 7].map((cell) => ({ type: "collect", cell })),
  );
  assert.deepEqual(state.board, [
    "folha",
    "gota",
    "onda",
    "sol",
    "gota",
    "onda",
    "sol",
    "folha",
    "onda",
    "sol",
    "folha",
    "gota",
    "sol",
    "folha",
    "gota",
    "onda",
  ]);
  for (const symbol of engine.SYMBOLS)
    assert.equal(state.board.filter((item) => item === symbol).length, 4);
  assert.deepEqual(engine.getScores(state), [0, 0]);
  assert.equal(engine.validateState(state), true);
});

test("ACORDE reproduz B2 → B4 → D4 → D2 e os pares aprovados", () => {
  let state = play([5, 13]);
  assert.equal(state.cursor, 13);
  assert.equal(state.player, 0);
  assert.deepEqual(engine.getActiveAxis(state), { kind: "row", index: 3 });
  assert.equal(state.collections[0].onda, 1);
  assert.equal(state.collections[1].folha, 1);
  assert.equal(state.board.filter((item) => item !== null).length, 14);
  state = engine.applyMove(state, { type: "collect", cell: 15 });
  assert.deepEqual(engine.getScores(state), [1, 0]);
  assert.equal(state.cursor, 15);
  assert.deepEqual(engine.getActiveAxis(state), { kind: "column", index: 3 });
  assert.deepEqual(
    engine.getLegalMoves(state).map((move) => move.cell),
    [3, 7, 11],
  );
  state = engine.applyMove(state, { type: "collect", cell: 7 });
  assert.deepEqual(engine.getScores(state), [1, 1]);
  assert.deepEqual(engine.getActiveAxis(state), { kind: "row", index: 1 });
});

test("ACORDE permite atravessar sinos e casas vazias, sem recolher o caminho", () => {
  const state = play([5]);
  const next = engine.applyMove(state, { type: "collect", cell: 13 });
  assert.equal(next.board[9], "sol");
  assert.equal(next.board[1], "gota");
  assert.equal(next.collections[1].folha, 1);
  assert.equal(next.board.filter((item) => item === null).length, 2);
});

test("ACORDE rejeita casa fora do eixo, casa vazia, índice inválido e passe voluntário", () => {
  const state = freeze(engine.createState());
  const snapshot = JSON.stringify(state);
  for (const move of [
    { type: "collect", cell: 0 },
    { type: "collect", cell: -1 },
    { type: "collect", cell: 4.5 },
    { type: "collect", cell: "4" },
    { type: "pass" },
    { type: "cell", cell: 4 },
  ])
    assert.throws(() => engine.applyMove(state, move));
  const next = engine.applyMove(state, { type: "collect", cell: 5 });
  assert.throws(() => engine.applyMove(next, { type: "collect", cell: 5 }));
  assert.equal(JSON.stringify(state), snapshot);
  assert.notEqual(next, state);
  assert.notEqual(next.board, state.board);
  assert.notEqual(next.collections[0], state.collections[0]);
});

test("ACORDE exige passe sem mover o carrinho e zera a sequência após nova coleta", () => {
  const before = play([7, 15, 14, 6, 5, 1, 0, 4]);
  assert.deepEqual(engine.getLegalMoves(before), [{ type: "pass" }]);
  const passed = engine.applyMove(freeze(before), { type: "pass" });
  assert.equal(passed.cursor, 4);
  assert.deepEqual(passed.board, before.board);
  assert.deepEqual(passed.collections, before.collections);
  assert.equal(passed.player, 1);
  assert.equal(passed.consecutivePasses, 1);
  assert.equal(passed.result, null);
  const next = engine.applyMove(passed, { type: "collect", cell: 8 });
  assert.equal(next.consecutivePasses, 0);
  assert.equal(next.cursor, 8);
});

test("ACORDE encerra dois passes comparando pares, mesmo com sinos restantes", () => {
  const before = play([6, 10, 11, 15, 12, 4, 5, 9, 8, 0, 3, 7]);
  const onePass = engine.applyMove(before, { type: "pass" });
  assert.equal(onePass.result, null);
  const result = engine.applyMove(onePass, { type: "pass" });
  assert.deepEqual(engine.getScores(result), [2, 1]);
  assert.equal(result.result.winner, 0);
  assert.equal(result.board.filter((item) => item !== null).length, 4);
  assert.deepEqual(engine.getLegalMoves(result), []);
  assert.throws(() => engine.applyMove(result, { type: "pass" }));

  const draw = play([7, 11, 10, 14, 12, 0, 2, 6, 5, 9, 8, 4, "pass", "pass"]);
  assert.deepEqual(engine.getScores(draw), [2, 2]);
  assert.equal(draw.result.winner, null);
});

test("ACORDE dá vitória ao terceiro par sem recolher os sinos restantes", () => {
  const result = play([4, 12, 14, 2, 0, 8, 9, 13, 15, 11, 10, 6, 5]);
  assert.equal(result.result.winner, 0);
  assert.deepEqual(engine.getScores(result), [3, 2]);
  assert.equal(result.board.filter((symbol) => symbol !== null).length, 3);
  assert.deepEqual(engine.getLegalMoves(result), []);
  assert.equal(engine.evaluate(result, 0), 10000);
  assert.equal(engine.evaluate(result, 1), -10000);
});

test("ACORDE três ou quatro cópias do mesmo símbolo continuam sendo um único par", () => {
  const state = play([4, 8, 9, 13, 14, 10, 11, 15, 12, 0, 1]);
  assert.equal(state.collections[0].gota, 4);
  assert.equal(state.collections[1].folha, 3);
  assert.deepEqual(engine.getScores(state), [2, 2]);
  assert.equal(state.result, null);
});

test("ACORDE esgotamento encerra imediatamente e conserva os dezesseis sinos", () => {
  const state = play([4, 12, 14, 6, 5, 13, 15, 11, 10, 2, 1, 9, 8, 0, 3, 7]);
  assert.ok(state.board.every((symbol) => symbol === null));
  assert.equal(state.moveCount, 16);
  assert.equal(state.consecutivePasses, 0);
  assert.equal(state.result.winner, null);
  assert.equal(engine.evaluate(state, 0), 0);
  assert.equal(engine.validateState(JSON.parse(JSON.stringify(state))), true);
  assert.throws(() => engine.getLegalMoves({ ...state, result: null }));
});

test("ACORDE rejeita conservação, carrinho e resultado inconsistentes", () => {
  const state = engine.createState();
  assert.throws(() =>
    engine.validateState({ ...state, board: state.board.slice(0, 15) }),
  );
  assert.throws(() => engine.validateState({ ...state, cursor: 4 }));
  assert.throws(() => engine.validateState({ ...state, player: 2 }));
  assert.throws(() =>
    engine.validateState({
      ...state,
      result: { winner: 0, reason: "Inventado" },
    }),
  );
  const broken = structuredClone(state);
  broken.collections[0].onda = 1;
  assert.throws(() => engine.validateState(broken));
});

test("ACORDE view prepara a coleta e mostra o par previsto, sem aplicar a jogada", () => {
  const state = freeze(play([5, 13]));
  const interaction = view.interact(state, null, { type: "cell", cell: 15 });
  assert.deepEqual(interaction, {
    selection: null,
    move: { type: "collect", cell: 15 },
  });
  const next = engine.applyMove(state, interaction.move);
  const html = view.renderBoard(state, {
    pendingMove: interaction.move,
    previewState: next,
  });
  assert.match(html, /acorde-cell--selected/);
  assert.match(html, /Completa um par de onda: 1\/3 pares/);
  assert.match(html, /rival recebe a coluna D/);
  assert.match(html, /&quot;cell&quot;:15/);
  assert.equal(state.board[15], "onda");
  assert.equal(state.collections[0].onda, 1);
  assert.equal(game.id, "acorde");
  assert.equal(game.rules.length, 8);
});

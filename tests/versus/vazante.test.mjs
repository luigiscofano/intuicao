import test from "node:test";
import assert from "node:assert/strict";
import {
  applyMove,
  createState,
  evaluate,
  getConvoy,
  getLegalMoves,
  getScores,
  positionKey,
} from "../../dist/versus/games/vazante/engine.mjs";
import {
  interact,
  renderBoard,
  selectionForMove,
} from "../../dist/versus/games/vazante/view.mjs";

const cell = (value) =>
  (Number(value.slice(1)) - 1) * 5 + value.charCodeAt(0) - 65;
const move = (from, to) => ({ type: "move", from: cell(from), to: cell(to) });
const freeze = (value) => {
  if (value && typeof value === "object") Object.values(value).forEach(freeze);
  return value && typeof value === "object" ? Object.freeze(value) : value;
};
const positions = (state, player) =>
  state.board.flatMap((owner, index) => (owner === player ? [index] : []));

test("VAZANTE começa com três barcos por equipe e sete remadas legais", () => {
  const state = createState();
  assert.deepEqual(positions(state, 0), ["A1", "C1", "E1"].map(cell));
  assert.deepEqual(positions(state, 1), ["A5", "C5", "E5"].map(cell));
  assert.equal(getLegalMoves(state).length, 7);
  assert.equal(state.repetitions[positionKey(state)], 1);
  assert.deepEqual(getScores(state), [0, 0]);
  assert.equal(evaluate(state, 0) + evaluate(state, 1), 0);
  assert.throws(() => applyMove(state, { type: "pass" }));
});

test("reconstrói os doze lances aprovados, a remada ilustrada e o contra-reboque misto", () => {
  let state = createState();
  const history = [
    ["C1", "C2"],
    ["A5", "B5"],
    ["C2", "C3"],
    ["C5", "C4"],
    ["E1", "E2"],
    ["C4", "B4"],
    ["E2", "E3"],
    ["B4", "B3"],
    ["A1", "A2"],
    ["B3", "B2"],
    ["E3", "D3"],
    ["B2", "C2"],
  ];
  history.forEach(([from, to]) => {
    state = applyMove(freeze(state), move(from, to));
  });
  assert.deepEqual(positions(state, 0), ["B2", "C3", "D3"].map(cell));
  assert.deepEqual(positions(state, 1), ["C2", "B3", "E5"].map(cell));
  const snapshot = JSON.stringify(state);
  assert.deepEqual(getConvoy(state, move("C3", "C4")), [
    { from: cell("C3"), to: cell("C4"), player: 0 },
    { from: cell("C2"), to: cell("C3"), player: 1 },
  ]);
  const next = applyMove(freeze(state), move("C3", "C4"));
  assert.equal(JSON.stringify(state), snapshot);
  assert.deepEqual(positions(next, 0), ["B2", "D3", "C4"].map(cell));
  assert.deepEqual(positions(next, 1), ["B3", "C3", "E5"].map(cell));
  const response = applyMove(freeze(next), move("B3", "A3"));
  assert.equal(response.lastMove.convoy.length, 3);
  assert.deepEqual(positions(response, 0), ["B2", "C3", "C4"].map(cell));
  assert.deepEqual(positions(response, 1), ["A3", "B3", "E5"].map(cell));
  assert.deepEqual(getScores(response), [0, 0]);
});

test("uma casa vazia interrompe a esteira e a borda não conecta linhas", () => {
  const state = createState();
  state.board = Array(25).fill(null);
  state.board[cell("C3")] = 0;
  state.board[cell("C1")] = 1;
  assert.equal(getConvoy(state, move("C3", "C4")).length, 1);
  const next = applyMove(state, move("C3", "C4"));
  assert.equal(next.board[cell("C1")], 1);
  assert.throws(() => applyMove(createState(), move("E1", "A2")));
  assert.throws(() => applyMove(createState(), move("A1", "B2")));
  assert.throws(() => applyMove(createState(), move("A5", "A4")));
});

test("qualquer coluna do cais recebe um barco, e a segunda entrega vence no turno 80", () => {
  const state = createState();
  state.board = Array(25).fill(null);
  state.board[cell("B4")] = 0;
  state.board[cell("E3")] = 0;
  state.board[cell("A5")] = 1;
  state.board[cell("C5")] = 1;
  state.board[cell("E5")] = 1;
  state.delivered = [1, 0];
  state.moveCount = 79;
  const next = applyMove(freeze(state), move("B4", "B5"));
  assert.equal(next.board[cell("B5")], null);
  assert.deepEqual(getScores(next), [2, 0]);
  assert.equal(next.result.winner, 0);
  assert.equal(next.moveCount, 80);
  assert.deepEqual(getLegalMoves(next), []);
});

test("o cais âmbar também aceita a coluna D", () => {
  const state = createState();
  state.player = 1;
  state.board = Array(25).fill(null);
  state.board[cell("D2")] = 1;
  state.board[cell("A3")] = 1;
  state.delivered = [0, 1];
  const next = applyMove(state, move("D2", "D1"));
  assert.equal(next.board[cell("D1")], null);
  assert.equal(next.result.winner, 1);
});

test("a terceira repetição real empata após dois ciclos completos", () => {
  let state = createState();
  const cycle = [
    ["A1", "A2"],
    ["E5", "E4"],
    ["A2", "A1"],
    ["E4", "E5"],
  ];
  for (let repetition = 0; repetition < 2; repetition += 1) {
    cycle.forEach(([from, to]) => {
      state = applyMove(freeze(state), move(from, to));
    });
    if (repetition === 0) assert.equal(state.result, null);
  }
  assert.equal(state.moveCount, 8);
  assert.equal(state.result.winner, null);
  assert.match(state.result.reason, /três vezes/);
  assert.equal(state.repetitions[positionKey(state)], 3);
});

test("o limite de oitenta turnos encerra uma posição sem duas entregas", () => {
  const state = createState();
  state.moveCount = 79;
  const next = applyMove(state, move("A1", "A2"));
  assert.equal(next.result.winner, null);
  assert.match(next.result.reason, /80 turnos/);
});

test("o passe é explícito e dois passes forçados encerram a posição bloqueada", () => {
  // Estado de fronteira para a cláusula de bloqueio, não uma abertura do jogo.
  const state = createState();
  state.board = Array.from({ length: 25 }, (_, index) => index % 2);
  assert.deepEqual(getLegalMoves(state), [{ type: "pass" }]);
  const once = applyMove(freeze(state), { type: "pass" });
  assert.equal(once.result, null);
  assert.equal(once.consecutivePasses, 1);
  const twice = applyMove(freeze(once), { type: "pass" });
  assert.equal(twice.result.winner, null);
  assert.match(twice.result.reason, /sem remadas/);
});

test("selecionar barco e destino prepara a prévia, com seis peças completas e cais nas cinco colunas", () => {
  const state = freeze(createState());
  const first = interact(state, null, { type: "cell", cell: cell("A1") });
  assert.equal(first.move, null);
  const second = interact(state, first.selection, {
    type: "cell",
    cell: cell("A2"),
  });
  assert.deepEqual(second.move, move("A1", "A2"));
  assert.equal(state.moveCount, 0);
  const preview = applyMove(state, second.move);
  const html = renderBoard(state, {
    selection: second.selection,
    pendingMove: second.move,
    previewState: preview,
    config: { mascots: ["capivara", "peixeBoi"] },
  });
  assert.equal(
    (html.match(/<span class="vazante-boat(?: |")/g) ?? []).length,
    6,
  );
  assert.equal((html.match(/<i><\/i>/g) ?? []).length, 10);
  assert.match(html, /vs-mascot/);
  assert.match(html, /vazante-preview-trails/);
  assert.match(html, /qualquer coluna/);
  assert.equal(state.board[cell("A1")], 0);
});

test("uma remada sugerida mantém sua origem ao escolher outro destino", () => {
  const state = freeze(createState());
  const hint = move("C1", "C2");
  const selection = selectionForMove(state, hint);
  assert.deepEqual(selection, { from: cell("C1"), to: cell("C2") });
  const changed = interact(state, selection, {
    type: "cell",
    cell: cell("B1"),
  });
  assert.deepEqual(changed.move, move("C1", "B1"));
  assert.equal(applyMove(state, changed.move).board[cell("B1")], 0);
  const preview = applyMove(state, hint);
  const html = renderBoard(state, {
    selection: null,
    pendingMove: hint,
    previewState: preview,
  });
  assert.equal((html.match(/vazante-destination/g) ?? []).length, 3);
  assert.match(html, /Escolher outro barco/);
  assert.equal(selectionForMove(preview, hint), null);
  assert.equal(selectionForMove(state, { type: "pass" }), null);
  assert.equal(state.moveCount, 0);
});

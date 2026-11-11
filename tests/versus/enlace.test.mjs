import test from "node:test";
import assert from "node:assert/strict";
import {
  applyMove,
  createState,
  EDGES,
  evaluate,
  getEdgeIndex,
  getLegalMoves,
  getLitNodes,
  getScores,
} from "../../dist/versus/games/enlace/engine.mjs";
import {
  interact,
  renderBoard,
  selectionForMove,
} from "../../dist/versus/games/enlace/view.mjs";

const cell = (value) =>
  (Number(value.slice(1)) - 1) * 5 + value.charCodeAt(0) - 65;
const place = (center, green, amber) => ({
  type: "place",
  center: cell(center),
  green: cell(green),
  amber: cell(amber),
});
const freeze = (value) => {
  if (value && typeof value === "object") Object.values(value).forEach(freeze);
  return value && typeof value === "object" ? Object.freeze(value) : value;
};
function setEdge(state, from, to, owner) {
  state.edges[getEdgeIndex(cell(from), cell(to))] = owner;
}

test("ENLACE começa com entradas acesas e 128 presilhas orientadas possíveis", () => {
  const state = createState();
  assert.equal(state.edges.length, 40);
  assert.deepEqual(getScores(state), [5, 5]);
  assert.equal(getLegalMoves(state).length, 128);
  assert.deepEqual(getLegalMoves(state), getLegalMoves(state));
  assert.equal(evaluate(state, 0) + evaluate(state, 1), 0);
});

test("o exemplo aprovado acende cinco novos pinos sem misturar as duas redes", () => {
  let state = createState();
  for (const move of [
    place("B3", "C3", "B2"),
    place("C3", "C2", "D3"),
    place("D2", "C2", "D3"),
    place("C2", "B2", "C1"),
  ]) {
    state = applyMove(freeze(state), move);
  }
  assert.deepEqual(getScores(state), [5, 6]);
  const snapshot = JSON.stringify(state);
  const next = applyMove(freeze(state), place("A3", "B3", "A2"));
  assert.equal(JSON.stringify(state), snapshot);
  assert.deepEqual(getScores(next), [10, 6]);
  assert.deepEqual(
    getLitNodes(next, 0),
    ["A1", "A2", "B2", "C2", "D2", "A3", "B3", "C3", "A4", "A5"]
      .map(cell)
      .sort((a, b) => a - b),
  );
  assert.equal(next.result, null);
  const response = applyMove(next, place("E2", "E3", "D2"));
  assert.equal(response.edges[getEdgeIndex(cell("D2"), cell("E2"))], 1);
  assert.equal(getLitNodes(response, 0).includes(cell("E2")), false);
});

test("rejeita sobreposição, diagonais, dois braços colineares e ações desconhecidas", () => {
  const state = applyMove(createState(), place("B3", "C3", "B2"));
  assert.throws(() => applyMove(state, place("B3", "C3", "B4")));
  assert.throws(() => applyMove(state, place("C3", "D4", "C4")));
  assert.throws(() => applyMove(state, place("D3", "D2", "D4")));
  assert.throws(() => applyMove(state, { type: "pass" }));
  assert.throws(() => applyMove(state, place("A1", "A1", "B1")));
});

test("a rede presenteada vence mesmo que o rival tenha colocado o fio", () => {
  const state = createState();
  state.player = 1;
  for (const [a, b] of [
    ["A3", "B3"],
    ["B3", "C3"],
    ["C3", "D3"],
  ])
    setEdge(state, a, b, 0);
  const next = applyMove(freeze(state), place("D3", "E3", "D2"));
  assert.equal(next.result.winner, 0);
  assert.deepEqual(getLegalMoves(next), []);
  assert.throws(() => applyMove(next, place("A1", "B1", "A2")));
});

test("duas travessias na mesma presilha empatam, sem prioridade de cor", () => {
  const state = createState();
  for (const [a, b] of [
    ["A4", "B4"],
    ["B4", "C4"],
    ["C4", "D4"],
  ])
    setEdge(state, a, b, 0);
  for (const [a, b] of [
    ["D1", "D2"],
    ["D2", "D3"],
    ["D3", "D4"],
  ])
    setEdge(state, a, b, 1);
  const next = applyMove(state, place("D4", "E4", "D5"));
  assert.equal(next.result.winner, null);
  assert.match(next.result.reason, /mesma jogada/);
});

function almostFullTear() {
  const state = createState();
  state.edges = EDGES.map(({ a, b }) => (b - a === 5 ? 0 : 1));
  setEdge(state, "A1", "A2", null);
  setEdge(state, "A1", "B1", null);
  state.moveCount = 19;
  return state;
}

test("sem encaixes, conta pinos acesos e mantém empate quando os alcances são iguais", () => {
  const next = applyMove(almostFullTear(), place("A1", "A2", "B1"));
  assert.deepEqual(getScores(next), [5, 5]);
  assert.equal(next.result.winner, null);
  assert.match(next.result.reason, /Não há encaixes/);
  assert.equal(next.moveCount, 20);
});

test("o encerramento por alcance pode ter vencedor sem travessia", () => {
  const state = almostFullTear();
  setEdge(state, "A3", "B3", 0);
  setEdge(state, "B1", "B2", 1);
  const next = applyMove(state, place("A1", "A2", "B1"));
  assert.deepEqual(getScores(next), [9, 10]);
  assert.equal(next.result.winner, 1);
  assert.match(next.result.reason, /mais pinos/);
});

test("partidas determinísticas conservam dois fios por lance e terminam em até vinte lances", () => {
  for (let seed = 0; seed < 12; seed += 1) {
    let state = createState();
    while (!state.result) {
      const moves = getLegalMoves(state);
      assert.ok(moves.length > 0);
      state = applyMove(
        freeze(state),
        moves[(seed * 19 + state.moveCount * 37) % moves.length],
      );
      assert.equal(
        state.edges.filter((owner) => owner !== null).length,
        state.moveCount * 2,
      );
      assert.ok(state.moveCount <= 20);
    }
  }
});

test("a interação de três pinos prepara uma ação válida sem jogar e permite inverter suas cores", () => {
  const state = freeze(createState());
  const first = interact(state, null, { type: "pin", cell: cell("A1") });
  assert.equal(first.move, null);
  const second = interact(state, first.selection, {
    type: "pin",
    cell: cell("B1"),
  });
  assert.equal(second.move, null);
  const third = interact(state, second.selection, {
    type: "pin",
    cell: cell("A2"),
  });
  assert.deepEqual(third.move, place("A1", "B1", "A2"));
  assert.equal(state.moveCount, 0);
  const swapped = interact(state, third.selection, { type: "swap" });
  assert.deepEqual(swapped.move, place("A1", "A2", "B1"));
  const preview = applyMove(state, swapped.move);
  const html = renderBoard(state, {
    selection: swapped.selection,
    pendingMove: swapped.move,
    previewState: preview,
  });
  assert.equal((html.match(/class="enlace-pin/g) ?? []).length, 25);
  assert.match(html, /data-action="\{&quot;type&quot;:&quot;pin&quot;/);
  assert.match(html, /enlace-pending-wire/);
  assert.equal(state.edges.filter((edge) => edge !== null).length, 0);
});

test("a presilha sugerida pode trocar de cores sem refazer a seleção de pinos", () => {
  const state = freeze(createState());
  const hint = place("A1", "B1", "A2");
  const selection = selectionForMove(state, hint);
  assert.deepEqual(selection, {
    center: cell("A1"),
    green: cell("B1"),
    amber: cell("A2"),
  });
  const swapped = interact(state, selection, { type: "swap" });
  assert.deepEqual(swapped.move, place("A1", "A2", "B1"));
  assert.equal(applyMove(state, swapped.move).moveCount, 1);
  const preview = applyMove(state, hint);
  const html = renderBoard(state, {
    selection: null,
    pendingMove: hint,
    previewState: preview,
  });
  assert.match(html, /enlace-pin enlace-selected/);
  assert.match(html, /Trocar as cores/);
  assert.equal(selectionForMove(preview, hint), null);
  assert.equal(state.moveCount, 0);
});

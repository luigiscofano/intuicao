import test from "node:test";
import assert from "node:assert/strict";
import {
  applyMove,
  CORNER_COLORS,
  createState,
  evaluate,
  getLegalMoves,
  getScores,
  getSeals,
} from "../../dist/versus/games/mosaico/engine.mjs";
import {
  interact,
  renderBoard,
  selectionForMove,
} from "../../dist/versus/games/mosaico/view.mjs";

const cell = (value) =>
  (Number(value.slice(1)) - 1) * 5 + value.charCodeAt(0) - 65;
const place = (position, orientation) => ({
  type: "place",
  cell: cell(position),
  orientation,
});
const freeze = (value) => {
  if (value && typeof value === "object") Object.values(value).forEach(freeze);
  return value && typeof value === "object" ? Object.freeze(value) : value;
};

test("MOSAICO começa com cem escolhas e quatro giros coerentes da mesma peça", () => {
  const state = createState();
  assert.equal(getLegalMoves(state).length, 100);
  assert.deepEqual(getScores(state), [0, 0]);
  assert.equal(getSeals(state).length, 16);
  assert.deepEqual(CORNER_COLORS, [
    [0, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 0],
  ]);
  assert.equal(evaluate(state, 0) + evaluate(state, 1), 0);
});

test("o exemplo aprovado fecha exatamente um selo verde de três cantos contra um", () => {
  let state = createState();
  for (const move of [
    place("A1", 2),
    place("B1", 1),
    place("A2", 1),
    place("D4", 0),
  ]) {
    state = applyMove(freeze(state), move);
  }
  assert.deepEqual(getScores(state), [0, 0]);
  const snapshot = JSON.stringify(state);
  const next = applyMove(freeze(state), place("B2", 0));
  assert.equal(JSON.stringify(state), snapshot);
  assert.deepEqual(getSeals(next)[0].colors, [0, 1, 0, 0]);
  assert.deepEqual(getScores(next), [1, 0]);
  assert.equal(next.lastMove.completed.length, 1);
  assert.equal(next.result, null);
  const response = applyMove(next, place("E4", 0));
  assert.deepEqual(getScores(response), [1, 0]);
  assert.deepEqual(getSeals(response)[15].colors, [1, 1, null, null]);
});

test("a colocação central resolve quatro selos e pode pontuar para ambas as equipes", () => {
  let state = createState();
  for (const [position, orientation] of [
    ["A1", 2],
    ["B1", 0],
    ["C1", 0],
    ["A2", 0],
    ["C2", 0],
    ["A3", 0],
    ["B3", 0],
    ["C3", 2],
  ]) {
    state = applyMove(state, place(position, orientation));
  }
  assert.deepEqual(getScores(state), [0, 0]);
  const next = applyMove(freeze(state), place("B2", 0));
  assert.deepEqual(getScores(next), [1, 1]);
  assert.equal(next.lastMove.completed.length, 4);
  assert.equal(
    next.lastMove.completed.filter(({ owner }) => owner === -1).length,
    2,
  );
  const later = applyMove(next, place("E5", 3));
  assert.deepEqual(getScores(later), [1, 1]);
});

test("não permite girar peças colocadas, passar, usar orientações extras ou ocupar fora do painel", () => {
  const state = applyMove(createState(), place("A1", 0));
  assert.throws(() => applyMove(state, place("A1", 1)));
  assert.throws(() => applyMove(state, place("B1", 4)));
  assert.throws(() => applyMove(state, place("B1", -1)));
  assert.throws(() => applyMove(state, { type: "pass" }));
  assert.throws(() =>
    applyMove(state, { type: "place", cell: 25, orientation: 0 }),
  );
});

test("vinte e cinco colocações iguais deixam todos os selos divididos e empatam", () => {
  let state = createState();
  for (let position = 0; position < 25; position += 1) {
    assert.equal(state.result, null);
    state = applyMove(freeze(state), {
      type: "place",
      cell: position,
      orientation: 0,
    });
  }
  assert.equal(state.moveCount, 25);
  assert.equal(state.result.winner, null);
  assert.deepEqual(getScores(state), [0, 0]);
  assert.ok(
    getSeals(state).every(({ complete, owner }) => complete && owner === -1),
  );
  assert.deepEqual(getLegalMoves(state), []);
});

test("o vencedor só é definido ao terminar o painel, sem bônus por maioria de quatro", () => {
  let state = createState();
  for (let position = 0; position < 25; position += 1) {
    state = applyMove(state, {
      type: "place",
      cell: position,
      orientation: position === 0 ? 2 : 0,
    });
    if (position < 24) assert.equal(state.result, null);
  }
  assert.deepEqual(getScores(state), [1, 0]);
  assert.equal(state.result.winner, 0);
  assert.throws(() => applyMove(state, place("A1", 0)));
});

test("a casa e a orientação podem mudar na prévia sem alterar o painel confirmado", () => {
  const state = freeze(createState());
  const orientation = interact(state, null, {
    type: "orientation",
    orientation: 2,
  });
  assert.equal(orientation.move, null);
  const selected = interact(state, orientation.selection, {
    type: "cell",
    cell: cell("A1"),
  });
  assert.deepEqual(selected.move, place("A1", 2));
  const rotated = interact(state, selected.selection, {
    type: "orientation",
    orientation: 0,
  });
  assert.deepEqual(rotated.move, place("A1", 0));
  const changedCell = interact(state, rotated.selection, {
    type: "cell",
    cell: cell("B2"),
  });
  assert.deepEqual(changedCell.move, place("B2", 0));
  const html = renderBoard(state, {
    selection: changedCell.selection,
    pendingMove: changedCell.move,
    previewState: applyMove(state, changedCell.move),
  });
  assert.equal((html.match(/class="mosaico-cell(?: |")/g) ?? []).length, 25);
  assert.match(html, /mosaico-pending/);
  assert.match(html, /aria-label="Verdes para cima"/);
  assert.equal(state.tiles.filter((tile) => tile !== null).length, 0);
});

test("a sugestão de treino seleciona o giro mostrado e mantém a casa ao mudar a orientação", () => {
  const state = freeze(createState());
  const hint = { type: "place", cell: 1, orientation: 2 };
  const selection = selectionForMove(state, hint);
  assert.deepEqual(selection, { cell: 1, orientation: 2 });
  const rotated = interact(state, selection, {
    type: "orientation",
    orientation: 1,
  });
  assert.deepEqual(rotated.move, { type: "place", cell: 1, orientation: 1 });
  assert.equal(applyMove(state, rotated.move).tiles[1], 1);
  const preview = applyMove(state, hint);
  for (const initialSelection of [null, { cell: 1, orientation: 0 }]) {
    const html = renderBoard(state, {
      selection: initialSelection,
      pendingMove: hint,
      previewState: preview,
    });
    const buttons = html.match(/<button\b[^>]*>/g);
    const down = buttons.find((button) =>
      button.includes('aria-label="Verdes para baixo"'),
    );
    const up = buttons.find((button) =>
      button.includes('aria-label="Verdes para cima"'),
    );
    assert.match(down, /aria-pressed="true"/);
    assert.match(up, /aria-pressed="false"/);
  }
  assert.equal(selectionForMove(preview, hint), null);
  assert.equal(state.moveCount, 0);
});

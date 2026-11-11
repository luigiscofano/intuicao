import test from "node:test";
import assert from "node:assert/strict";
import * as engine from "../../dist/versus/games/dobra/engine.mjs";
import * as view from "../../dist/versus/games/dobra/view.mjs";

function freeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

function assertConservation(state) {
  assert.equal(
    state.tiles.reduce((sum, tile) => sum + tile.area, 0),
    36,
  );
  for (let player = 0; player < 2; player += 1) {
    assert.equal(
      state.tiles.reduce((sum, tile) => sum + tile.seals[player], 0) +
        state.reserves[player],
      4,
    );
  }
  assert.equal(state.tiles.length, state.rows * state.columns);
}

test("DOBRA: preparação contém 144 escolhas de selo e borda", () => {
  const state = engine.createState();
  assert.equal(engine.getLegalMoves(state).length, 144);
  assert.deepEqual(engine.getScores(state), [0, 0]);
  assertConservation(state);
});

test("DOBRA: o histórico ilustrado conserva área e reindexa selos", () => {
  let state = engine.applyMove(freeze(engine.createState()), {
    type: "fold",
    cell: 2,
    edge: "north",
  });
  assert.equal(state.rows, 5);
  assert.deepEqual(state.tiles[2], { area: 2, seals: [1, 0] });
  state = engine.applyMove(freeze(state), {
    type: "fold",
    cell: 27,
    edge: "south",
  });
  assert.equal(state.rows, 4);
  assert.deepEqual(state.tiles[21], { area: 2, seals: [0, 1] });
  state = engine.applyMove(freeze(state), {
    type: "fold",
    cell: 7,
    edge: "west",
  });
  assert.equal(state.columns, 5);
  assert.deepEqual(state.tiles[1], { area: 2, seals: [1, 0] });
  assert.deepEqual(state.tiles[5], { area: 2, seals: [1, 0] });
  assert.deepEqual(state.tiles[17], { area: 2, seals: [0, 1] });
  assert.deepEqual(
    [0, 5, 10, 15].map((cell) => state.tiles[cell].area),
    [4, 2, 2, 4],
  );
  state = engine.applyMove(freeze(state), {
    type: "fold",
    cell: 1,
    edge: "north",
  });
  assert.deepEqual(state.tiles[1], { area: 3, seals: [1, 1] });
  assert.equal(engine.getOwner(state.tiles[1]), null);
  assert.deepEqual(state.tiles[0], { area: 6, seals: [1, 0] });
  assert.deepEqual(state.tiles[12], { area: 2, seals: [0, 1] });
  assertConservation(state);
});

test("DOBRA: as quatro bordas somam pilhas sem modificar o estado recebido", () => {
  const initial = freeze(engine.createState());
  for (const edge of ["north", "south", "west", "east"]) {
    const state = engine.applyMove(initial, { type: "fold", cell: 0, edge });
    assertConservation(state);
    assert.equal(state.rows + state.columns, 11);
    assert.equal(state.tiles.filter((tile) => tile.seals[0] > 0).length, 1);
  }
  assert.equal(initial.tiles.length, 36);
  assert.ok(
    initial.tiles.every((tile) => tile.area === 1 && tile.seals[0] === 0),
  );
  assert.deepEqual(initial.reserves, [4, 4]);
});

test("DOBRA: oito dobras encerram o atlas com áreas 25 a 1", () => {
  let state = engine.createState();
  for (const edge of [
    "west",
    "west",
    "west",
    "west",
    "north",
    "north",
    "north",
    "north",
  ]) {
    const cell = state.player === 0 ? 0 : state.tiles.length - 1;
    state = engine.applyMove(freeze(state), { type: "fold", cell, edge });
    assertConservation(state);
    assert.ok(Number.isFinite(engine.evaluate(state, 0)));
  }
  assert.deepEqual([state.rows, state.columns], [2, 2]);
  assert.equal(state.moveCount, 8);
  assert.deepEqual(state.reserves, [0, 0]);
  assert.deepEqual(engine.getScores(state), [25, 1]);
  assert.equal(state.result.winner, 0);
  assert.deepEqual(engine.getLegalMoves(state), []);
  assert.throws(() =>
    engine.applyMove(state, { type: "fold", cell: 0, edge: "north" }),
  );
});

test("DOBRA: igualdade local mantém o distrito neutro e pode empatar o atlas", () => {
  let state = engine.createState();
  for (const edge of [
    "west",
    "west",
    "west",
    "west",
    "north",
    "north",
    "north",
    "north",
  ]) {
    state = engine.applyMove(state, { type: "fold", cell: 0, edge });
  }
  assert.deepEqual(state.tiles[0], { area: 25, seals: [4, 4] });
  assert.deepEqual(engine.getScores(state), [0, 0]);
  assert.equal(state.result.winner, null);
});

test("DOBRA: dimensão mínima, painéis ausentes e ações incompletas são rejeitados", () => {
  let state = engine.createState();
  assert.throws(() =>
    engine.applyMove(state, { type: "fold", cell: -1, edge: "north" }),
  );
  assert.throws(() =>
    engine.applyMove(state, { type: "fold", cell: 36, edge: "north" }),
  );
  assert.throws(() =>
    engine.applyMove(state, { type: "fold", cell: 0, edge: "middle" }),
  );
  assert.throws(() => engine.applyMove(state, { type: "pass" }));
  for (let index = 0; index < 4; index += 1) {
    state = engine.applyMove(state, { type: "fold", cell: 0, edge: "west" });
  }
  assert.deepEqual(engine.getAvailableEdges(state), ["north", "south"]);
  assert.throws(() =>
    engine.applyMove(state, { type: "fold", cell: 0, edge: "west" }),
  );
  assert.throws(() =>
    engine.applyMove(state, { type: "fold", cell: 0, edge: "east" }),
  );
});

test("DOBRA: marcar e escolher borda gera a prévia reindexada sem gastar o selo", () => {
  const state = freeze(engine.createState());
  assert.equal(
    view.interact(state, null, { type: "edge", edge: "north" }).move,
    null,
  );
  const selected = view.interact(state, null, { type: "cell", cell: 2 });
  assert.equal(selected.move, null);
  const folded = view.interact(state, selected.selection, {
    type: "edge",
    edge: "north",
  });
  assert.deepEqual(folded.move, { type: "fold", cell: 2, edge: "north" });
  const preview = engine.applyMove(state, folded.move);
  const html = view.renderBoard(state, {
    selection: folded.selection,
    pendingMove: folded.move,
    previewState: preview,
  });
  assert.match(html, /Prévia: 5 × 6/);
  assert.match(html, /C1 ficará em C1/);
  assert.deepEqual(state.reserves, [4, 4]);
  assert.equal(state.rows, 6);
  assert.equal((html.match(/class="dobra-tile /g) ?? []).length, 30);
});

test("DOBRA: a dica preserva o painel original quando se troca a borda da prévia", () => {
  const state = freeze(engine.createState());
  const suggested = { type: "fold", cell: 7, edge: "west" };
  const selected = view.selectionForMove(state, suggested);
  assert.deepEqual(selected, { cell: 7, edge: "west" });
  const alternative = view.interact(state, selected, {
    type: "edge",
    edge: "north",
  });
  assert.deepEqual(alternative.move, { type: "fold", cell: 7, edge: "north" });
  const next = engine.applyMove(state, alternative.move);
  assert.deepEqual(next.tiles[1], { area: 2, seals: [1, 0] });
  assert.equal(
    view.selectionForMove(state, { type: "fold", cell: 36, edge: "north" }),
    null,
  );
  assert.equal(
    view.selectionForMove(state, { type: "fold", cell: 7, edge: "middle" }),
    null,
  );
});

import test from "node:test";
import assert from "node:assert/strict";
import * as engine from "../../dist/versus/games/estalo/engine.mjs";
import * as view from "../../dist/versus/games/estalo/view.mjs";

function freeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

test("ESTALO: as seis cadeias do exemplo dão os placares esperados", () => {
  let state = engine.createState();
  const starts = [0, 11, 12, 3, 4, 2];
  const scores = [
    [4, 2],
    [4, 5],
    [6, 5],
    [6, 7],
    [7, 7],
    [7, 8],
  ];
  for (let index = 0; index < starts.length; index += 1) {
    state = engine.applyMove(freeze(state), {
      type: "burst",
      cell: starts[index],
      turn: 0,
    });
    assert.deepEqual(state.scores, scores[index]);
    for (let owner = 0; owner < 2; owner += 1) {
      assert.equal(
        state.board.filter((pod) => pod?.owner === owner).length +
          state.scores[owner],
        8,
      );
    }
  }
  assert.equal(state.result.winner, 1);
  assert.deepEqual(engine.getLegalMoves(state), []);
  assert.throws(() =>
    engine.applyMove(state, { type: "burst", cell: 13, turn: 0 }),
  );
});

test("ESTALO: o circuito para na casca que acabou de abrir", () => {
  const state = freeze(engine.createState());
  const move = { type: "burst", cell: 0, turn: 0 };
  assert.deepEqual(engine.traceMove(state, move), [0, 1, 5, 6, 10, 9]);
  const next = engine.applyMove(state, move);
  assert.equal(next.board.filter(Boolean).length, 10);
  assert.deepEqual(next.scores, [4, 2]);
  assert.equal(state.board.filter(Boolean).length, 16);
  assert.deepEqual(state.scores, [0, 0]);
});

test("ESTALO: apenas a origem gira e apenas em 90°", () => {
  const state = engine.createState();
  const moved = engine.applyMove(state, { type: "burst", cell: 0, turn: -1 });
  assert.deepEqual(moved.lastChain, [0]);
  assert.equal(moved.board[1].direction, state.board[1].direction);
  assert.throws(() =>
    engine.applyMove(state, { type: "burst", cell: 0, turn: 2 }),
  );
  assert.throws(() =>
    engine.applyMove(state, { type: "burst", cell: 2, turn: 0 }),
  );
  assert.throws(() =>
    engine.applyMove(state, { type: "burst", cell: 16, turn: 0 }),
  );
  assert.throws(() => engine.applyMove(state, { type: "pass" }));
});

test("ESTALO: terminar a cadeia inteira permite vitória simultânea", () => {
  const state = engine.createState();
  state.board = Array(16).fill(null);
  state.board[1] = { owner: 0, direction: 2 };
  state.board[2] = { owner: 1, direction: 3 };
  state.scores = [7, 7];
  const next = engine.applyMove(freeze(state), {
    type: "burst",
    cell: 1,
    turn: -1,
  });
  assert.deepEqual(next.lastChain, [1, 2]);
  assert.deepEqual(next.scores, [8, 8]);
  assert.equal(next.result.winner, null);
});

test("ESTALO: uma jogada também pode completar a semeadura rival", () => {
  const state = engine.createState();
  state.board = Array(16).fill(null);
  state.board[1] = { owner: 0, direction: 2 };
  state.board[2] = { owner: 1, direction: 3 };
  state.board[12] = { owner: 0, direction: 0 };
  state.scores = [6, 7];
  const next = engine.applyMove(freeze(state), {
    type: "burst",
    cell: 1,
    turn: -1,
  });
  assert.deepEqual(next.scores, [7, 8]);
  assert.equal(next.result.winner, 1);
});

test("ESTALO: ações sempre reduzem o tabuleiro e terminam em até 16 turnos", () => {
  for (let variant = 0; variant < 24; variant += 1) {
    let state = engine.createState();
    while (!state.result) {
      const moves = engine.getLegalMoves(state);
      assert.ok(moves.length > 0);
      const before = state.board.filter(Boolean).length;
      state = engine.applyMove(
        freeze(state),
        moves[(variant + state.moveCount * 5) % moves.length],
      );
      assert.ok(state.board.filter(Boolean).length < before);
      assert.ok(state.moveCount <= 16);
      assert.ok(Number.isFinite(engine.evaluate(state, 0)));
    }
  }
});

test("ESTALO: seleção e orientação produzem prévia numerada, sem aplicar por conta própria", () => {
  const state = freeze(engine.createState());
  const selected = view.interact(state, null, { type: "cell", cell: 0 });
  assert.deepEqual(selected.move, { type: "burst", cell: 0, turn: 0 });
  const aimed = view.interact(state, selected.selection, {
    type: "aim",
    cell: 0,
    turn: 0,
  });
  assert.deepEqual(aimed.move, { type: "burst", cell: 0, turn: 0 });
  const preview = engine.applyMove(state, aimed.move);
  const html = view.renderBoard(state, {
    selection: aimed.selection,
    pendingMove: aimed.move,
    previewState: preview,
  });
  assert.equal((html.match(/class="estalo-chain-order"/g) ?? []).length, 6);
  assert.match(html, /Jogador 1 \+4/);
  assert.match(html, /Jogador 2 \+2/);
  assert.deepEqual(state.scores, [0, 0]);
  assert.equal(
    view.interact(state, null, { type: "cell", cell: 2 }).move,
    null,
  );
});

test("ESTALO: a dica mantém a origem selecionada ao comparar outro giro", () => {
  const state = freeze(engine.createState());
  const suggested = { type: "burst", cell: 0, turn: 0 };
  const selected = view.selectionForMove(state, suggested);
  assert.deepEqual(selected, { cell: 0, turn: 0 });
  const alternative = view.interact(state, selected, {
    type: "aim",
    cell: selected.cell,
    turn: -1,
  });
  assert.deepEqual(alternative.move, { type: "burst", cell: 0, turn: -1 });
  assert.deepEqual(engine.traceMove(state, alternative.move), [0]);
  assert.equal(
    view.selectionForMove(state, { type: "burst", cell: 2, turn: 0 }),
    null,
  );
  assert.equal(
    view.selectionForMove(state, { type: "burst", cell: 0, turn: 2 }),
    null,
  );
});

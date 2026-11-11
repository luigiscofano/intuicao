import test from "node:test";
import assert from "node:assert/strict";
import * as engine from "../../dist/versus/games/quinhao/engine.mjs";
import * as view from "../../dist/versus/games/quinhao/view.mjs";

function freeze(value) {
  if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
    Object.freeze(value);
  }
  return value;
}

function share(state, start, basket) {
  return engine.applyMove(engine.applyMove(state, { type: "offer", start }), {
    type: "choose",
    basket,
  });
}

function conservedFruitCounts(state) {
  const total = state.inventories[0].map(
    (count, fruit) => count + state.inventories[1][fruit],
  );
  for (const basket of state.baskets) total[basket.fruit] += 1;
  return total;
}

test("QUINHÃO: preparação simétrica e ações em ordem estável", () => {
  const state = engine.createState();
  assert.equal(state.baskets.length, 24);
  assert.deepEqual(conservedFruitCounts(state), [8, 8, 8]);
  assert.deepEqual(engine.getScores(state), [0, 0]);
  assert.deepEqual(
    engine.getLegalMoves(state),
    Array.from({ length: 24 }, (_, index) => ({
      type: "offer",
      start: index + 1,
    })),
  );
});

test("QUINHÃO: o exemplo preserva a vizinhança circular e os depósitos", () => {
  let state = share(engine.createState(), 2, 3);
  state = share(state, 5, 5);
  assert.deepEqual(state.inventories, [
    [1, 1, 1],
    [1, 1, 1],
  ]);
  assert.deepEqual(engine.getScores(state), [5, 5]);
  assert.deepEqual(engine.getOfferIds(state, 24), [24, 1, 8]);
  state = share(state, 24, 24);
  assert.deepEqual(state.inventories, [
    [3, 1, 1],
    [1, 1, 2],
  ]);
  assert.equal(state.baskets.length, 15);
  state = share(state, 9, 9);
  assert.deepEqual(state.inventories, [
    [3, 2, 1],
    [1, 2, 3],
  ]);
  assert.deepEqual(engine.getScores(state), [7, 7]);
  assert.deepEqual(conservedFruitCounts(state), [8, 8, 8]);
});

test("QUINHÃO: quem escolhe passa a propor sem troca artificial de decisor", () => {
  const state = freeze(engine.createState());
  const offered = engine.applyMove(state, { type: "offer", start: 1 });
  assert.equal(offered.player, 1);
  assert.equal(offered.proposer, 0);
  assert.equal(offered.phase, "choose");
  const chosen = engine.applyMove(freeze(offered), {
    type: "choose",
    basket: 1,
  });
  assert.equal(chosen.player, 1);
  assert.equal(chosen.proposer, 1);
  assert.equal(chosen.phase, "offer");
  assert.equal(chosen.moveCount, 2);
  assert.equal(state.baskets.length, 24);
  assert.deepEqual(state.inventories, [
    [0, 0, 0],
    [0, 0, 0],
  ]);
  assert.deepEqual(offered.offer, [1, 2, 3]);
});

test("QUINHÃO: etapas e escolhas fora da oferta são rejeitadas", () => {
  const state = engine.createState();
  assert.throws(() => engine.applyMove(state, { type: "choose", basket: 1 }));
  assert.throws(() => engine.applyMove(state, { type: "offer", start: 25 }));
  const offered = engine.applyMove(state, { type: "offer", start: 1 });
  assert.throws(() => engine.applyMove(offered, { type: "offer", start: 2 }));
  assert.throws(() => engine.applyMove(offered, { type: "choose", basket: 4 }));
  assert.throws(() => engine.applyMove(offered, { type: "pass" }));
});

test("QUINHÃO: oito partilhas distribuem 12 frutos a cada equipe e encerram", () => {
  let state = engine.createState();
  for (let round = 0; round < 8; round += 1) {
    const start = state.baskets[0].id;
    if (round === 7) assert.equal(engine.getLegalMoves(state).length, 1);
    state = share(freeze(state), start, start);
    assert.deepEqual(conservedFruitCounts(state), [8, 8, 8]);
  }
  assert.equal(state.moveCount, 16);
  assert.equal(state.round, 8);
  assert.equal(state.baskets.length, 0);
  assert.deepEqual(state.inventories, [
    [4, 8, 0],
    [4, 0, 8],
  ]);
  assert.deepEqual(engine.getScores(state), [8, 8]);
  assert.equal(state.result.winner, null);
  assert.deepEqual(engine.getLegalMoves(state), []);
  assert.throws(() => engine.applyMove(state, { type: "offer", start: 1 }));
});

test("QUINHÃO: pontuação não reutiliza frutos entre trios e pares", () => {
  assert.equal(engine.scoreInventory([4, 4, 4]), 20);
  assert.equal(engine.scoreInventory([3, 2, 1]), 7);
  assert.equal(engine.scoreInventory([0, 6, 6]), 12);
  assert.equal(engine.scoreInventory([12, 0, 0]), 0);
  assert.equal(engine.scoreInventory([5, 4, 3]), 17);
});

test("QUINHÃO: várias partilhas completas mantêm o estoque e o vencedor correto", () => {
  const winners = new Set();
  for (let variant = 0; variant < 30; variant += 1) {
    let state = engine.createState();
    while (!state.result) {
      const moves = engine.getLegalMoves(state);
      const index = (variant * 7 + state.moveCount * 11) % moves.length;
      state = engine.applyMove(freeze(state), moves[index]);
      assert.deepEqual(conservedFruitCounts(state), [8, 8, 8]);
      assert.ok(Number.isFinite(engine.evaluate(state, 0)));
    }
    assert.deepEqual(
      state.inventories.map((inventory) =>
        inventory.reduce((sum, count) => sum + count, 0),
      ),
      [12, 12],
    );
    const [green, amber] = engine.getScores(state);
    const expected = green === amber ? null : Number(amber > green);
    assert.equal(state.result.winner, expected);
    winners.add(expected);
  }
  assert.ok(
    winners.has(0) || winners.has(1),
    "A regra não deve impor empate a toda distribuição.",
  );
});

test("QUINHÃO: a interface prepara cada decisão sem alterar os depósitos", () => {
  const state = freeze(engine.createState());
  const interaction = view.interact(state, null, {
    type: "basket",
    basket: 24,
  });
  assert.deepEqual(interaction.move, { type: "offer", start: 24 });
  const offered = engine.applyMove(state, interaction.move);
  const choice = view.interact(offered, null, { type: "basket", basket: 1 });
  assert.deepEqual(choice.move, { type: "choose", basket: 1 });
  const preview = engine.applyMove(offered, choice.move);
  const html = view.renderBoard(offered, {
    selection: choice.selection,
    pendingMove: choice.move,
    previewState: preview,
  });
  assert.equal(
    (html.match(/class="quinhao-choice(?: is-selected)?"/g) ?? []).length,
    3,
  );
  assert.match(html, /Prévia:/);
  assert.deepEqual(offered.inventories, [
    [0, 0, 0],
    [0, 0, 0],
  ]);
  assert.deepEqual(
    view.interact(offered, null, { type: "basket", basket: 10 }).move,
    null,
  );
});

test("QUINHÃO: a dica recupera a oferta ou escolha para comparação antes de confirmar", () => {
  const state = freeze(engine.createState());
  const offer = { type: "offer", start: 24 };
  const selected = view.selectionForMove(state, offer);
  assert.deepEqual(selected, { basket: 24 });
  assert.deepEqual(
    view.interact(state, selected, { type: "basket", basket: 2 }).move,
    { type: "offer", start: 2 },
  );
  const offered = freeze(engine.applyMove(state, offer));
  const choice = { type: "choose", basket: 1 };
  assert.deepEqual(view.selectionForMove(offered, choice), { basket: 1 });
  assert.deepEqual(
    view.interact(offered, view.selectionForMove(offered, choice), {
      type: "basket",
      basket: 24,
    }).move,
    { type: "choose", basket: 24 },
  );
  assert.equal(view.selectionForMove(offered, offer), null);
  assert.equal(
    view.selectionForMove(offered, { type: "choose", basket: 10 }),
    null,
  );
});

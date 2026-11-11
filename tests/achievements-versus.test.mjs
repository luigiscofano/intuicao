import test from "node:test";
import assert from "node:assert/strict";
import {
  VERSUS_MISSIONS,
  evaluateVersusMissions,
} from "../dist/achievements/versus-missions.mjs";

const engines = Object.fromEntries(
  await Promise.all(
    [
      "enlace",
      "vazante",
      "mosaico",
      "quinhao",
      "estalo",
      "dobra",
      "acorde",
      "lastro",
    ].map(async (id) => [
      id,
      await import(`../dist/versus/games/${id}/engine.mjs`),
    ]),
  ),
);

// Sequências legais desde a posição inicial: não fabricam tabuleiros premiados.
const enlaceBridge = [
  [6, 7, 11],
  [7, 8, 2],
  [8, 9, 13],
  [20, 21, 15],
  [5, 6, 0],
].map(([center, green, amber]) => ({ type: "place", center, green, amber }));

const mosaicoSeals = [
  [0, 2],
  [1, 2],
  [2, 2],
  [5, 0],
  [7, 0],
  [24, 0],
  [6, 0],
].map(([cell, orientation]) => ({ type: "place", cell, orientation }));

const boatMoves = (pairs) =>
  pairs.map(([from, to]) => ({ type: "move", from, to }));
const folds = (pairs) =>
  pairs.map(([cell, edge]) => ({ type: "fold", cell, edge }));
const collections = (cells) => cells.map((cell) => ({ type: "collect", cell }));
const advances = (pairs) =>
  pairs.map(([piece, to]) => ({ type: "advance", piece, to }));

const witnesses = [
  {
    id: "enlace-corrente-acesa",
    gameId: "enlace",
    actions: enlaceBridge,
  },
  {
    id: "enlace-travessia",
    gameId: "enlace",
    actions: enlaceBridge,
  },
  {
    id: "vazante-comboio-misto",
    gameId: "vazante",
    actions: boatMoves([
      [0, 5],
      [20, 15],
      [5, 10],
      [22, 17],
      [10, 5],
    ]),
  },
  {
    id: "vazante-tres-barcos",
    gameId: "vazante",
    actions: boatMoves([
      [2, 7],
      [20, 15],
      [7, 12],
      [24, 19],
      [0, 1],
      [15, 10],
      [1, 2],
      [19, 14],
      [2, 7],
      [22, 23],
      [4, 3],
      [10, 5],
      [3, 2],
      [14, 9],
      [12, 17],
    ]),
  },
  {
    id: "mosaico-dupla-assinatura",
    gameId: "mosaico",
    actions: mosaicoSeals,
  },
  {
    id: "mosaico-unanimidade",
    gameId: "mosaico",
    actions: mosaicoSeals,
  },
  {
    id: "quinhao-fruto-que-faltava",
    gameId: "quinhao",
    actions: [
      { type: "offer", start: 2 },
      { type: "choose", basket: 3 },
      { type: "offer", start: 21 },
      { type: "choose", basket: 21 },
      { type: "offer", start: 13 },
      { type: "choose", basket: 14 },
    ],
  },
  {
    id: "quinhao-oferta-diversa",
    gameId: "quinhao",
    actions: [
      { type: "offer", start: 2 },
      { type: "choose", basket: 3 },
      { type: "offer", start: 6 },
      { type: "choose", basket: 7 },
      { type: "offer", start: 1 },
    ],
  },
  {
    id: "estalo-cadeia-longa",
    gameId: "estalo",
    actions: [{ type: "burst", cell: 0, turn: 0 }],
  },
  {
    id: "estalo-cadeia-limpa",
    gameId: "estalo",
    actions: [
      { type: "burst", cell: 12, turn: 1 },
      { type: "burst", cell: 11, turn: 1 },
      { type: "burst", cell: 8, turn: -1 },
    ],
  },
  {
    id: "dobra-distrito-reunido",
    gameId: "dobra",
    actions: folds([
      [0, "south"],
      [7, "north"],
      [14, "east"],
      [3, "west"],
      [1, "south"],
      [4, "north"],
    ]),
  },
  {
    id: "dobra-virada-final",
    gameId: "dobra",
    actions: folds([
      [34, "south"],
      [13, "north"],
      [16, "east"],
      [9, "west"],
      [11, "south"],
      [10, "north"],
      [3, "east"],
      [3, "west"],
    ]),
  },
  {
    id: "acorde-par-e-silencio",
    gameId: "acorde",
    actions: collections([7, 3, 2, 6, 5, 9, 10, 14, 12, 4]),
  },
  {
    id: "acorde-tres-vozes",
    gameId: "acorde",
    actions: collections([5, 9, 11, 3, 0, 8, 10, 6, 7, 15, 13, 1, 2, 14]),
  },
  {
    id: "lastro-volta-ao-centro",
    gameId: "lastro",
    actions: advances([
      ["E2", 3],
      ["D3", 3],
      ["D2", 2],
      ["E2", 4],
      ["E1", 2],
      ["E1", 3],
    ]),
  },
  {
    id: "lastro-ultimo-ajuste",
    gameId: "lastro",
    actions: advances([
      ["E1", 2],
      ["D5", 2],
      ["E2", 3],
      ["E2", 4],
      ["D3", 2],
      ["E1", 3],
      ["D3", 3],
      ["E1", 4],
      ["D2", 2],
      ["E7", 2],
      ["D5", 3],
      ["D2", 3],
      ["E7", 3],
      ["D2", 4],
      ["D5", 4],
      ["E7", 4],
      ["D3", 4],
    ]),
  },
];

function replayWitness({ gameId, actions }) {
  const engine = engines[gameId];
  let before = engine.createState();
  for (const move of actions.slice(0, -1))
    before = engine.applyMove(before, move);
  const move = actions.at(-1);
  return {
    gameId,
    engine,
    before,
    after: engine.applyMove(before, move),
    move,
    actor: before.player,
    config: { mode: "local" },
  };
}

test("cada um dos oito duelos tem duas missões identificadas e alcançáveis", () => {
  assert.equal(VERSUS_MISSIONS.length, 16);
  assert.equal(new Set(VERSUS_MISSIONS.map(({ id }) => id)).size, 16);
  for (const gameId of Object.keys(engines)) {
    assert.equal(
      VERSUS_MISSIONS.filter((mission) => mission.gameId === gameId).length,
      2,
    );
  }
  assert.deepEqual(
    VERSUS_MISSIONS.map(({ id }) => id).sort(),
    witnesses.map(({ id }) => id).sort(),
  );
});

for (const witness of witnesses) {
  test(`a sequência legal comprova ${witness.id}`, () => {
    const context = replayWitness(witness);
    const snapshot = structuredClone({
      before: context.before,
      after: context.after,
    });
    const unlocked = evaluateVersusMissions(context);
    assert.ok(unlocked.includes(witness.id));
    assert.deepEqual(
      { before: context.before, after: context.after },
      snapshot,
    );
  });
}

test("a primeira colocação de cada jogo não recebe missões que ainda não cumpriu", () => {
  for (const [gameId, engine] of Object.entries(engines)) {
    const before = engine.createState();
    const move = engine.getLegalMoves(before).at(-1);
    const after = engine.applyMove(before, move);
    assert.deepEqual(
      evaluateVersusMissions({
        gameId,
        engine,
        before,
        after,
        move,
        actor: 0,
        config: { mode: "local" },
      }),
      [],
    );
  }
});

test("as ações do computador não recebem missões do jogador humano", () => {
  const witness = witnesses.find(({ id }) => id === "acorde-tres-vozes");
  const context = replayWitness(witness);
  assert.equal(context.actor, 1);
  assert.deepEqual(
    evaluateVersusMissions({ ...context, config: { mode: "bot" } }),
    [],
  );
  const human = replayWitness(witnesses[0]);
  assert.ok(
    evaluateVersusMissions({ ...human, config: { mode: "bot" } }).includes(
      witnesses[0].id,
    ),
  );
});

test("confirmações humanas de treino e competitivo também podem cumprir a missão", () => {
  const context = replayWitness(witnesses[0]);
  for (const mode of ["training", "competitive"]) {
    assert.ok(
      evaluateVersusMissions({ ...context, config: { mode } }).includes(
        witnesses[0].id,
      ),
    );
  }
});

test("contextos ausentes, fora de turno ou desconhecidos não geram conquistas", () => {
  const context = replayWitness(witnesses[0]);
  for (const candidate of [
    undefined,
    {},
    { ...context, before: null },
    { ...context, after: context.before },
    { ...context, before: { ...context.before, result: { winner: 0 } } },
    { ...context, gameId: "outro" },
    { ...context, actor: 1 },
    { ...context, actor: "0" },
    { ...context, config: { mode: "preview" } },
  ])
    assert.deepEqual(evaluateVersusMissions(candidate), []);
});

test("iniciar a segunda rodada de LASTRO não equivale a ajustar o aparelho", () => {
  const context = replayWitness(
    witnesses.find(({ id }) => id === "lastro-ultimo-ajuste"),
  );
  assert.equal(context.after.phase, "between-rounds");
  const before = context.after;
  const move = { type: "next-round" };
  const after = context.engine.applyMove(before, move);
  assert.deepEqual(
    evaluateVersusMissions({
      ...context,
      before,
      after,
      move,
      actor: before.player,
    }),
    [],
  );
});

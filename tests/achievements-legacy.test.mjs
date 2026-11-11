import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  LEGACY_VERSUS_MISSIONS,
  legacyVersusMissionUnlocks,
} from "../dist/achievements/legacy-versus-missions.mjs";
import { createBroto, applyBrotoMove } from "../dist/broto/engine.mjs";
import {
  createCerco,
  applyCercoMove,
  legalCercoMoves,
} from "../dist/cerco/engine.mjs";
import {
  DESVIO_MAPS,
  createDesvio,
  applyDesvioMove,
  legalDesvioMoves,
} from "../dist/desvio.mjs";

// As testemunhas são partidas legais reproduzíveis, não tabuleiros inventados.
const witnesses = [
  {
    id: "broto-double-harvest",
    game: "broto",
    map: "classic",
    moves: [1, 5, 7, 6, 3],
  },
  {
    id: "broto-four-winds",
    game: "broto",
    map: "cruz",
    moves: [12, 13, 8, 2, 22, 15, 7, 16, 18, 14, 10, 12],
  },
  {
    id: "cerco-isolate",
    game: "cerco",
    map: "classic",
    moves: [
      [4, 9],
      [22, 21],
      [2, 1],
      [21, 16],
      [9, 8],
      [20, 15],
      [0, 5],
      [15, 10],
      [8, 13],
      [16, 17],
      [13, 12],
      [10, 11],
      [5, 6],
    ],
  },
  {
    id: "cerco-last-opening",
    game: "cerco",
    map: "lago",
    moves: [
      [2, 7],
      [22, 23],
      [4, 9],
      [20, 21],
      [9, 14],
      [23, 18],
      [14, 19],
      [18, 13],
      [0, 1],
      [13, 8],
      [1, 6],
      [21, 16],
      [6, 11],
      [16, 15],
      [11, 10],
      [8, 3],
      [10, 5],
    ],
  },
  {
    id: "desvio-narrow-path",
    game: "desvio",
    map: "D-00",
    moves: [14, 6, 5, 7, 3, 15, 13],
  },
  {
    id: "desvio-early-trap",
    game: "desvio",
    map: "D-M01",
    moves: [12, 15, 11, 9, 8, 10, 14, 13, 5, 6, 2, 1],
  },
];

function lastTransition(witness) {
  const map = DESVIO_MAPS.find((candidate) => candidate.id === witness.map);
  let state =
    witness.game === "broto"
      ? createBroto(0, witness.map)
      : witness.game === "cerco"
        ? createCerco(0, witness.map)
        : createDesvio(map);
  let context;
  for (const action of witness.moves) {
    const before = state;
    const move =
      witness.game === "cerco" ? { from: action[0], to: action[1] } : action;
    const result =
      witness.game === "broto"
        ? applyBrotoMove(before, move)
        : witness.game === "cerco"
          ? applyCercoMove(before, move)
          : { state: applyDesvioMove(map, before, move) };
    state = result.state;
    context = {
      confirmed: true,
      mode: "local",
      before,
      after: state,
      events: result.events,
      legalBefore: witness.game === "cerco" ? legalCercoMoves(before) : [],
      legalAfter: witness.game === "desvio" ? legalDesvioMoves(map, state) : [],
      opponentMovesBefore:
        witness.game === "cerco"
          ? legalCercoMoves(before, 1 - before.player)
          : [],
      opponentMovesAfter:
        witness.game === "cerco"
          ? legalCercoMoves(state, 1 - before.player)
          : [],
    };
  }
  return context;
}

test("os três duelos anteriores têm duas missões distintas, todas com testemunha", () => {
  assert.equal(LEGACY_VERSUS_MISSIONS.length, 6);
  assert.equal(
    new Set(LEGACY_VERSUS_MISSIONS.map((mission) => mission.id)).size,
    6,
  );
  assert.deepEqual(
    new Set(LEGACY_VERSUS_MISSIONS.map((mission) => mission.id)),
    new Set(witnesses.map((witness) => witness.id)),
  );
});

for (const witness of witnesses) {
  test(`${witness.id}: uma sequência legal confirma a missão sem alterar o estado`, () => {
    const context = lastTransition(witness);
    const snapshot = JSON.stringify(context);
    assert.ok(
      legacyVersusMissionUnlocks(witness.game, context).includes(witness.id),
    );
    assert.equal(JSON.stringify(context), snapshot);
    assert.ok(
      legacyVersusMissionUnlocks(witness.game, {
        ...context,
        mode: "training",
      }).includes(witness.id),
    );
  });
}

test("prévia, bot, importação e deslocamento no histórico não geram conquista", () => {
  for (const witness of witnesses) {
    const context = lastTransition(witness);
    for (const change of [
      { confirmed: false },
      { computer: true },
      { custom: true },
      { mode: "replay" },
      { before: context.after },
    ])
      assert.deepEqual(
        legacyVersusMissionUnlocks(witness.game, { ...context, ...change }),
        [],
      );
  }
  assert.deepEqual(legacyVersusMissionUnlocks("unknown", {}), []);
  assert.deepEqual(legacyVersusMissionUnlocks("broto"), []);
});

test("plantio sem flores e sem quatro receptores não antecipa conquistas", () => {
  const before = createBroto();
  const result = applyBrotoMove(before, 1);
  assert.deepEqual(
    legacyVersusMissionUnlocks("broto", {
      confirmed: true,
      mode: "local",
      before,
      after: result.state,
      events: result.events,
    }),
    [],
  );
});

test("a interface registra apenas um caminho de confirmação por jogo", async () => {
  for (const path of ["broto/ui.mjs", "cerco/ui.mjs", "collection-ui.mjs"]) {
    const source = await readFile(
      new URL(`../dist/${path}`, import.meta.url),
      "utf8",
    );
    assert.equal(
      (
        source.match(/recordMissionUnlocks\(\s*legacyVersusMissionUnlocks/g) ??
        []
      ).length,
      1,
      path,
    );
    assert.match(source, /confirmed:\s*true/);
  }
});

import test from "node:test";
import assert from "node:assert/strict";
import {
  CAMPAIGN_MISSIONS,
  campaignMissionUnlocks,
} from "../dist/achievements/campaign-missions.mjs";
import { lightLevels, cutLevels } from "../dist/levels.mjs";
import { GEOMETRY_LEVELS } from "../dist/geometry-levels.mjs";
import { SYMBOL_LEVELS } from "../dist/symbol-levels.mjs";
import { CAMPAIGN as sintonia } from "../dist/sintonia/campaign.mjs";
import { CAMPAIGN as repasse } from "../dist/repasse/campaign.mjs";
import { CAMPAIGN as orbita } from "../dist/orbita/campaign.mjs";
import { LOGIC_CAMPAIGNS } from "../dist/logica/catalog-summary.mjs";

const campaigns = {
  light: lightLevels,
  cut: cutLevels,
  ...GEOMETRY_LEVELS,
  ...SYMBOL_LEVELS,
  sintonia,
  repasse,
  orbita,
};
const logicAdapters = new Map();
for (const { id } of LOGIC_CAMPAIGNS) {
  const adapter = await import(`../dist/logica/games/${id}/index.mjs`);
  campaigns[id] = adapter.CAMPAIGN;
  logicAdapters.set(id, adapter);
}

// Números editoriais conhecidos. O teste usa fases reais, sem forjar desempenho.
const examples = {
  "light-color-gates": 16,
  "light-three-colors": 21,
  "cut-hollow-shape": 11,
  "cut-wave": 16,
  "elo-distance": 39,
  "elo-exclusive": 68,
  "prumo-asymmetric": 12,
  "prumo-corridor": 77,
  "pacto-unpaired": 45,
  "pacto-blank-row": 17,
  "sintonia-remote-switch": 21,
  "sintonia-ice": 38,
  "repasse-four-directions": 61,
  "repasse-handoff": 29,
  "orbita-gears": 41,
  "orbita-sensor": 49,
  "divisa-no-contact": 2,
  "divisa-four-territories": 76,
  "pulso-three-intervals": 8,
  "pulso-wide-beat": 1,
  "foz-long-course": 10,
  "foz-confluence": 12,
  "refugio-interior": 24,
  "refugio-four-markers": 46,
  "mirante-four-witnesses": 3,
  "mirante-witness-rule": 46,
  "renovo-unequal-arms": 1,
  "renovo-four-turns": 25,
};

function summaryFor(gameId, level) {
  const summary = LOGIC_CAMPAIGNS.find((game) => game.id === gameId);
  return summary ? summary.levels.find((item) => item.id === level.id) : level;
}

test("cada uma das 14 campanhas tem duas missões com identidades e símbolos próprios", () => {
  assert.equal(CAMPAIGN_MISSIONS.length, 28);
  assert.equal(new Set(CAMPAIGN_MISSIONS.map((item) => item.id)).size, 28);
  assert.equal(new Set(CAMPAIGN_MISSIONS.map((item) => item.icon)).size, 28);
  for (const gameId of Object.keys(campaigns)) {
    assert.equal(
      CAMPAIGN_MISSIONS.filter((item) => item.gameId === gameId).length,
      2,
      gameId,
    );
  }
});

for (const mission of CAMPAIGN_MISSIONS) {
  test(`${mission.id}: conclusão de uma fase atual comprova a missão`, () => {
    const levels = campaigns[mission.gameId];
    const witness = levels[examples[mission.id] - 1];
    assert.ok(mission.matchesLevel(witness));
    const adapter = logicAdapters.get(mission.gameId);
    if (adapter)
      assert.equal(
        adapter.checkState(witness, adapter.solutionState(witness)).valid,
        true,
      );
    const completed = summaryFor(mission.gameId, witness);
    const snapshot = JSON.stringify(completed);
    assert.ok(
      campaignMissionUnlocks(mission.gameId, [completed]).includes(mission.id),
    );
    assert.equal(
      campaignMissionUnlocks(mission.gameId, [completed, completed]).filter(
        (id) => id === mission.id,
      ).length,
      1,
    );
    assert.equal(JSON.stringify(completed), snapshot);
    const ordinary = levels.find((level) => !mission.matchesLevel(level));
    assert.ok(
      ordinary,
      "uma missão específica não pode ser apenas vencer qualquer fase",
    );
    assert.equal(
      campaignMissionUnlocks(mission.gameId, [
        summaryFor(mission.gameId, ordinary),
      ]).includes(mission.id),
      false,
    );
  });
}

test("nenhuma visita, coleção vazia ou jogo desconhecido comprova uma missão", () => {
  for (const gameId of Object.keys(campaigns)) {
    assert.deepEqual(campaignMissionUnlocks(gameId, []), []);
    assert.deepEqual(campaignMissionUnlocks(gameId, null), []);
  }
  assert.deepEqual(campaignMissionUnlocks("unknown", lightLevels), []);
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { CAMPAIGN_MISSIONS } from "../dist/achievements/campaign-missions.mjs";
import {
  LOGIC_MISSION_INDEX,
  matchesIndexedMission,
} from "../dist/achievements/logic-mission-index.mjs";
import { LOGIC_CAMPAIGNS } from "../dist/logica/catalog-summary.mjs";
import { readAchievements } from "../dist/achievements.mjs";
import {
  buildLogicMissionIndex,
  renderLogicMissionIndex,
} from "../scripts/build-achievement-index.mjs";

const fullCampaigns = new Map(
  await Promise.all(
    LOGIC_CAMPAIGNS.map(async ({ id }) => {
      const { CAMPAIGN } = await import(
        `../dist/logica/games/${id}/campaign.mjs`
      );
      return [id, CAMPAIGN];
    }),
  ),
);

test("o índice leve corresponde aos predicados das 480 fases completas atuais", () => {
  const missions = CAMPAIGN_MISSIONS.filter((mission) =>
    fullCampaigns.has(mission.gameId),
  );
  assert.equal(missions.length, 12);
  assert.deepEqual(
    Object.keys(LOGIC_MISSION_INDEX).sort(),
    missions.map(({ id }) => id).sort(),
  );
  for (const mission of missions) {
    const levels = fullCampaigns.get(mission.gameId);
    const expected = Object.fromEntries(
      levels
        .filter(mission.matchesLevel)
        .map((level) => [level.id, level.version]),
    );
    assert.ok(Object.keys(expected).length > 0, mission.id);
    assert.deepEqual(LOGIC_MISSION_INDEX[mission.id], expected, mission.id);
    const summary = LOGIC_CAMPAIGNS.find((game) => game.id === mission.gameId);
    for (const level of summary.levels) {
      const full = levels.find((candidate) => candidate.id === level.id);
      assert.equal(
        matchesIndexedMission(mission.id, level),
        Boolean(mission.matchesLevel(full)),
        `${mission.id}: ${level.id}`,
      );
    }
  }
});

test("IDs desconhecidos e versões diferentes não herdam uma missão do índice", () => {
  for (const [missionId, levels] of Object.entries(LOGIC_MISSION_INDEX)) {
    const [id, version] = Object.entries(levels)[0];
    assert.equal(matchesIndexedMission(missionId, { id, version }), true);
    assert.equal(
      matchesIndexedMission(missionId, { id, version: version + 1 }),
      false,
    );
    assert.equal(
      matchesIndexedMission(missionId, { id, version: String(version) }),
      false,
    );
    assert.equal(
      matchesIndexedMission(missionId, { id: `${id}-antigo`, version }),
      false,
    );
    assert.equal(matchesIndexedMission(missionId, { id }), false);
  }
  assert.equal(
    matchesIndexedMission("desconhecida", { id: "desconhecido", version: 1 }),
    false,
  );
  assert.equal(matchesIndexedMission("foz-confluence", null), false);
  assert.equal(
    matchesIndexedMission("constructor", { id: "length", version: 1 }),
    false,
  );
});

function completedLogicStorage(versionOffset = 0) {
  const data = JSON.stringify({
    version: 1,
    games: Object.fromEntries(
      LOGIC_CAMPAIGNS.map((game) => [
        game.id,
        {
          completed: Object.fromEntries(
            game.levels.map((level) => [
              level.id,
              {
                version: level.version + versionOffset,
                assisted: true,
              },
            ]),
          ),
          sessions: {},
        },
      ]),
    ),
  });
  return {
    getItem: (id) => (id === "intuicao.logica.v1" ? data : null),
    setItem() {
      throw new Error("A leitura das conquistas não deve modificar saves.");
    },
  };
}

test("ler saves dos seis catálogos conserva apenas as cinco campanhas ativas e suas dez missões", () => {
  const result = readAchievements(completedLogicStorage());
  assert.equal(result.total, 400);
  assert(!result.games.some(game=>game.id==="divisa"));
  const missions = result.missions.filter((mission) =>
    Object.hasOwn(LOGIC_MISSION_INDEX, mission.id),
  );
  assert.equal(missions.length, 10);
  assert.ok(missions.every((mission) => mission.unlocked));
  assert.deepEqual(result.warnings, []);
});

test("uma versão de fase divergente não conta como conclusão nem como missão", () => {
  const result = readAchievements(completedLogicStorage(1));
  assert.equal(result.total, 0);
  assert.ok(result.missions.every((mission) => !mission.unlocked));
});

test("o índice pode ser regenerado sem diferenças de conteúdo", async () => {
  const generated = renderLogicMissionIndex(await buildLogicMissionIndex());
  const current = await readFile(
    new URL("../dist/achievements/logic-mission-index.mjs", import.meta.url),
    "utf8",
  );
  assert.equal(current, generated);
});


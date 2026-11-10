import test from "node:test";
import assert from "node:assert/strict";
import {
  ACHIEVEMENT_GAMES,
  readAchievements,
  renderAchievements,
} from "../dist/achievements.mjs";
import { CONTENT_REVISION } from "../dist/sintonia/campaign.mjs";
import { CAMPAIGN_VERSION } from "../dist/orbita/campaign.mjs";
const game = (id) => ACHIEVEMENT_GAMES.find((g) => g.id === id);
function storage(data = {}) {
  const map = new Map(
    Object.entries(data).map(([k, v]) => [
      k,
      typeof v === "string" ? v : JSON.stringify(v),
    ]),
  );
  return {
    getItem: (k) => map.get(k) ?? null,
    setItem() {
      throw Error("Must remain read-only");
    },
    map,
  };
}
function completeAll() {
  const data = {
    "intuicao.collection.v1": {
      version: 1,
      sessions: {},
      completed: ["elo", "prumo", "pacto"].flatMap((id) =>
        game(id).levels.map((l) => l.id),
      ),
    },
  };
  for (const id of ["light", "cut"])
    data[`intuicao.campaign.${id}.progress.v1`] = {
      version: 1,
      completedIds: game(id).levels.map((l) => l.id),
    };
  for (const id of ["sintonia", "repasse", "orbita"])
    data[`intuicao.${id}.v1`] = {
      version: 1,
      contentRevision: CONTENT_REVISION,
      catalogVersion: CAMPAIGN_VERSION,
      campaign: {
        completed: Object.fromEntries(
          game(id).levels.map((l) => [
            l.id,
            { firstCompletedAt: "2026-11-01T12:00:00Z", assisted: true },
          ]),
        ),
      },
    };
  return data;
}
test("empty browser has eight campaigns and no invented progress", () => {
  const result = readAchievements(storage());
  assert.equal(result.available, 640);
  assert.equal(result.total, 0);
  assert.equal(result.games.length, 8);
  assert(result.achievements.every((a) => !a.unlocked));
});
test("all current saved campaign identities count once, including assisted completions", () => {
  const store = storage(completeAll()),
    before = [...store.map];
  const result = readAchievements(store);
  assert.equal(result.total, 640);
  assert.equal(result.hard, 280);
  assert.equal(result.explored, 8);
  assert(result.achievements.every((a) => a.unlocked));
  assert.deepEqual(readAchievements(store), result);
  assert.deepEqual([...store.map], before);
});
test("duplicate, retired, unknown and imported IDs do not inflate totals", () => {
  const id = game("light").levels[0].id;
  const result = readAchievements(
    storage({
      "intuicao.campaign.light.progress.v1": {
        version: 1,
        completedIds: [id, id, "light-retired-999", "custom-level", 1, null],
      },
      "intuicao.collection.v1": { version: 1, completed: ["elo-9999"] },
    }),
  );
  assert.equal(result.total, 1);
  assert.equal(result.hard, 0);
  assert.equal(result.achievements[0].unlocked, true);
});
test("attempts, gabaritos, endless totals and versus wins are not conclusions", () => {
  const result = readAchievements(
    storage({
      "intuicao.answers.v1": {
        "light:light-v3-1": { assisted: true, failures: 5 },
      },
      "intuicao.endless.original.v1": { light: { count: 999, solved: true } },
      "intuicao.collection.v1": {
        version: 1,
        completed: [],
        sessions: { "elo-v2-001": { solved: true } },
        events: [{ type: "win" }],
      },
      "intuicao.broto.v1": { wins: 999 },
    }),
  );
  assert.equal(result.total, 0);
});
test("unknown historical Sintonia and Orbita definitions do not inherit current IDs", () => {
  const result = readAchievements(
    storage({
      "intuicao.sintonia.v1": {
        version: 1,
        contentRevision: "unknown",
        campaign: { completed: { [game("sintonia").levels[45].id]: {} } },
      },
      "intuicao.orbita.v1": {
        version: 1,
        catalogVersion: "old",
        campaign: { completed: { [game("orbita").levels[0].id]: {} } },
      },
    }),
  );
  assert.equal(result.total, 0);
});
test("archived Repasse identity is recovered only when it is the identical current level", () => {
  const id = game("repasse").levels[0].id;
  const result = readAchievements(
    storage({
      "intuicao.repasse.v1": {
        campaign: {
          archive: { completed: { [id]: { assisted: false }, 999999: {} } },
        },
      },
    }),
  );
  assert.equal(result.total, 1);
});
test("unreadable and malformed saves are preserved and reported without crashing", () => {
  const store = storage({
    "intuicao.campaign.light.progress.v1": "{broken",
    "intuicao.sintonia.v1": {
      version: 1,
      contentRevision: CONTENT_REVISION,
      campaign: { completed: { [game("sintonia").levels[0].id]: null } },
    },
  });
  const before = [...store.map];
  const result = readAchievements(store);
  assert.equal(result.total, 0);
  assert.equal(result.warnings.length, 1);
  assert.deepEqual([...store.map], before);
  assert.doesNotThrow(() =>
    readAchievements({
      getItem() {
        throw Error("denied");
      },
    }),
  );
});
test("UI includes labelled progress, honest criteria, empty state and every campaign link", () => {
  const host = { innerHTML: "" };
  renderAchievements(host, storage());
  assert.match(host.innerHTML, /id="achievements-title" tabindex="-1"/);
  assert.equal((host.innerHTML.match(/<progress /g) || []).length, 10);
  assert.match(host.innerHTML, /Conclusões assistidas também contam/);
  assert.match(host.innerHTML, /Modo Sem Parar/);
  assert.match(host.innerHTML, /Em descoberta/);
  for (const g of ACHIEVEMENT_GAMES)
    assert(host.innerHTML.includes(`href="?game=${g.id}"`));
});

test("varied milestones use current completion evidence only", () => {
  const all = readAchievements(storage(completeAll()));
  assert.equal(all.finishedCampaigns, 8);
  assert.equal(all.exploredTiers, 6);
  assert.equal(all.achievements.length, 10);
  assert.equal(new Set(all.achievements.map((a) => a.symbol)).size, 10);
  const one = readAchievements(
    storage({
      "intuicao.campaign.light.progress.v1": {
        version: 1,
        completedIds: [game("light").levels[0].id],
      },
    }),
  );
  assert.equal(one.finishedCampaigns, 0);
  assert.equal(one.exploredTiers, 1);
});

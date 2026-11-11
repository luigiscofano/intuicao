import test from "node:test";
import assert from "node:assert/strict";
import {
  ACHIEVEMENT_GAMES,
  readAchievements,
  renderAchievements,
} from "../dist/achievements.mjs";
import { CONTENT_REVISION } from "../dist/sintonia/campaign.mjs";
import { CAMPAIGN_VERSION } from "../dist/orbita/campaign.mjs";
const LOGIC_IDS = ["divisa", "pulso", "foz", "refugio", "mirante", "renovo"];
const ORIGINAL_CAMPAIGNS = ["light", "cut", "elo", "prumo", "pacto", "sintonia", "repasse", "orbita"];
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
  data["intuicao.logica.v1"] = {
    version: 1,
    games: Object.fromEntries(LOGIC_IDS.map(id => [id, {
      completed: Object.fromEntries(game(id).levels.map(level => [level.id, {
        version: level.version, assisted: true, completedAt: "2026-11-10T12:00:00Z",
      }])),
      sessions: {},
    }])),
  };
  return data;
}
test("navegador vazio tem 14 campanhas e 1.120 níveis, sem progresso inventado", () => {
  const result = readAchievements(storage());
  assert.equal(result.available, 1120);
  assert.equal(result.total, 0);
  assert.equal(result.games.length, 14);
  assert.deepEqual(result.games.map(item => item.id).sort(), [...ORIGINAL_CAMPAIGNS, ...LOGIC_IDS].sort());
  for (const item of result.games) assert.equal(item.total, 80);
  assert(result.achievements.every((a) => !a.unlocked));
});
test("all current saved campaign identities count once, including assisted completions", () => {
  const store = storage(completeAll()),
    before = [...store.map];
  const result = readAchievements(store);
  assert.equal(result.total, 1120);
  assert.equal(result.hard, 490);
  assert.equal(result.explored, 14);
  assert(result.achievements.every((a) => a.unlocked));
  assert.deepEqual(readAchievements(store), result);
  assert.deepEqual([...store.map], before);
});

test("os saves anteriores continuam comprovando exatamente as oito campanhas originais", () => {
  const data = completeAll();
  delete data["intuicao.logica.v1"];
  const result = readAchievements(storage(data));
  assert.equal(result.total, 640);
  assert.equal(result.hard, 280);
  assert.equal(result.finishedCampaigns, 8);
  for (const id of LOGIC_IDS) assert.equal(result.games.find(item => item.id === id).completed, 0);
});

test("as seis campanhas lógicas contam apenas a identidade e a versão atuais dentro do jogo correto", () => {
  const savedGames = Object.fromEntries(LOGIC_IDS.map((id, index) => {
    const [first, second, third, fourth] = game(id).levels;
    const foreign = game(LOGIC_IDS[(index + 1) % LOGIC_IDS.length]).levels[0];
    return [id, { completed: {
      [first.id]: { version: first.version, assisted: true },
      [second.id]: { version: second.version + 1 },
      [third.id]: null,
      [fourth.id]: {},
      [foreign.id]: { version: foreign.version },
      [`${id}-retired`]: { version: 1 },
    } }];
  }));
  const store = storage({ "intuicao.logica.v1": { version: 1, games: savedGames } });
  const before = [...store.map], result = readAchievements(store);
  assert.equal(result.total, 6);
  assert.equal(result.hard, 0);
  assert.equal(result.explored, 6);
  for (const id of LOGIC_IDS) assert.equal(result.games.find(item => item.id === id).completed, 1);
  assert.deepEqual([...store.map], before);
  assert.equal(readAchievements(storage({ "intuicao.logica.v1": { version: 2, games: savedGames } })).total, 0);
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
      "intuicao.logica.v1": { version: 1, games: Object.fromEntries(LOGIC_IDS.map(id => [id, {
        completed: {},
        sessions: { [game(id).levels[0].id]: { levelId: game(id).levels[0].id, levelVersion: 1, assisted: true, failures: 3, states: [{ solved: true }], cursor: 0 } },
      }])) },
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
  const campaignLinks = [...host.innerHTML.matchAll(/href="\?game=([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(campaignLinks.sort(), [...ORIGINAL_CAMPAIGNS, ...LOGIC_IDS].sort());
  assert.match(host.innerHTML, /nível das 14 campanhas atuais/);
  assert.match(host.innerHTML, /0<span> \/ 1120<\/span>/);
  assert.match(host.innerHTML, /Conclusões assistidas também contam/);
  assert.match(host.innerHTML, /Modo Sem Parar/);
  assert.match(host.innerHTML, /Em descoberta/);
  for (const g of ACHIEVEMENT_GAMES)
    assert(host.innerHTML.includes(`href="?game=${g.id}"`));
});

test("varied milestones use current completion evidence only", () => {
  const all = readAchievements(storage(completeAll()));
  assert.equal(all.finishedCampaigns, 14);
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

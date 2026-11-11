import test from "node:test";
import assert from "node:assert/strict";
import {
  ACHIEVEMENT_ICON_IDS,
  renderAchievementIcon,
} from "../dist/achievements/icons.mjs";
import { MISSION_CATALOG } from "../dist/achievements/catalog.mjs";
import {
  filterAchievements,
  renderAchievementView,
} from "../dist/achievements/view.mjs";

const GENERAL_IDS = [
  "first",
  "ten",
  "fifty",
  "hundred",
  "hard",
  "all-games",
  "campaign",
  "tiers",
  "half",
  "collection",
];

function sampleData() {
  return {
    total: 10,
    available: 1120,
    warnings: [],
    games: [
      { id: "light", name: "Reflexos", completed: 10, total: 80 },
      { id: "sintonia", name: "Sintonia", completed: 0, total: 80 },
    ],
    achievements: [
      {
        id: "first",
        name: "Primeira descoberta",
        description: "Conclua um nível.",
        icon: "first",
        current: 1,
        target: 1,
        unlocked: true,
      },
      {
        id: "fifty",
        name: "Caminho de descobertas",
        description: "Conclua cinquenta níveis.",
        icon: "fifty",
        current: 10,
        target: 50,
        unlocked: false,
      },
    ],
    missions: [
      {
        id: "enlace-corrente-acesa",
        gameId: "enlace",
        gameName: "ENLACE",
        name: "Corrente acesa",
        description: "Ilumine três pinos.",
        icon: "enlace-corrente-acesa",
        current: 1,
        target: 1,
        unlocked: true,
      },
      {
        id: "enlace-travessia",
        gameId: "enlace",
        gameName: "ENLACE",
        name: "De margem a margem",
        description: "Atravesse o tear.",
        icon: "enlace-travessia",
        current: 0,
        target: 1,
        unlocked: false,
      },
      {
        id: "lastro-volta-ao-centro",
        gameId: "lastro",
        gameName: "LASTRO",
        name: "Volta ao centro",
        description: "Recupere o equilíbrio.",
        icon: "lastro-volta-ao-centro",
        current: 0,
        target: 1,
        unlocked: false,
      },
    ],
  };
}

function host() {
  const listeners = new Map();
  return {
    innerHTML: "",
    listeners,
    focused: null,
    addEventListener(type, handler) {
      const handlers = listeners.get(type) ?? [];
      handlers.push(handler);
      listeners.set(type, handlers);
    },
    contains(element) {
      return element.host === this;
    },
    querySelector(selector) {
      return { focus: () => (this.focused = selector) };
    },
    select(field, value) {
      for (const handler of listeners.get("change") ?? []) {
        handler({ target: { dataset: { achievementFilter: field }, value } });
      }
    },
    changeKind(kind) {
      const button = { dataset: { achievementKind: kind }, host: this };
      for (const handler of listeners.get("click") ?? []) {
        handler({ target: { closest: () => button } });
      }
    },
  };
}

test("todas as 64 missões e dez conquistas gerais possuem símbolos vetoriais distintos", () => {
  const expectedIds = [
    ...GENERAL_IDS,
    ...MISSION_CATALOG.map((mission) => mission.icon),
  ];
  assert.equal(MISSION_CATALOG.length, 64);
  assert.equal(new Set(expectedIds).size, 74);
  assert.deepEqual([...ACHIEVEMENT_ICON_IDS].sort(), expectedIds.sort());

  const drawings = expectedIds.map(renderAchievementIcon);
  assert.equal(new Set(drawings).size, 74);
  for (const drawing of drawings) {
    assert.match(drawing, /viewBox="0 0 64 64"/);
    assert.match(drawing, /aria-hidden="true"/);
    assert.doesNotMatch(drawing, /<text|<image|<script|https?:/);
  }
});

test("filtros combinam jogo e estado sem alterar conquistas ou progresso", () => {
  const data = sampleData();
  const original = structuredClone(data);
  assert.deepEqual(
    filterAchievements(data, {
      kind: "missions",
      gameId: "enlace",
      status: "locked",
    }).map((entry) => entry.id),
    ["enlace-travessia"],
  );
  assert.deepEqual(
    filterAchievements(data, {
      kind: "general",
      gameId: "lastro",
      status: "unlocked",
    }).map((entry) => entry.id),
    ["first"],
  );
  assert.equal(
    filterAchievements(data, {
      kind: "missions",
      gameId: "lastro",
      status: "unlocked",
    }).length,
    0,
  );
  assert.deepEqual(data, original);
});

test("a primeira renderização apresenta missões, progresso acessível e links de jogo", () => {
  const container = { innerHTML: "" };
  renderAchievementView(container, sampleData());
  assert.match(
    container.innerHTML,
    /data-achievement-kind="missions" aria-pressed="true"/,
  );
  assert.equal(
    (container.innerHTML.match(/data-achievement-id=/g) ?? []).length,
    3,
  );
  assert.match(
    container.innerHTML,
    /<label for="achievement-enlace-travessia">/,
  );
  assert.match(
    container.innerHTML,
    /<progress id="achievement-enlace-travessia" value="0" max="1"/,
  );
  assert.match(container.innerHTML, /href="\?game=lastro"/);
  assert.match(container.innerHTML, /Conclusões assistidas também contam/);
  assert.match(container.innerHTML, /inclusive no treino/);
  assert.match(container.innerHTML, /aria-live="polite"/);
});

test("atualizar progresso preserva filtros e não duplica ouvintes", () => {
  const container = host();
  renderAchievementView(container, sampleData());
  container.select("gameId", "lastro");
  container.select("status", "locked");

  const updated = sampleData();
  updated.missions[2].unlocked = true;
  updated.missions[2].current = 1;
  renderAchievementView(container, updated);
  assert.match(container.innerHTML, /Nenhuma conquista neste filtro/);
  assert.match(container.innerHTML, /value="lastro" selected/);
  assert.equal(container.listeners.get("click").length, 1);
  assert.equal(container.listeners.get("change").length, 1);

  container.select("status", "unlocked");
  assert.match(
    container.innerHTML,
    /data-achievement-id="lastro-volta-ao-centro"/,
  );
  assert.equal(container.focused, '[data-achievement-filter="status"]');
  container.changeKind("general");
  assert.match(container.innerHTML, /data-achievement-id="first"/);
  assert.doesNotMatch(
    container.innerHTML,
    /data-achievement-id="lastro-volta-ao-centro"/,
  );
  assert.equal(container.focused, '[data-achievement-kind="general"]');
  container.changeKind("missions");
  assert.match(container.innerHTML, /value="lastro" selected/);
  assert.match(
    container.innerHTML,
    /data-achievement-id="lastro-volta-ao-centro"/,
  );
  assert.doesNotMatch(
    container.innerHTML,
    /data-achievement-id="enlace-corrente-acesa"/,
  );
});

test("valores desconhecidos e conteúdo textual não viram controles ou HTML", () => {
  const container = host();
  const data = sampleData();
  data.missions[0].name = '<img src=x onerror="alert(1)">';
  data.warnings = ["<script>injetado</script>"];
  renderAchievementView(container, data);
  assert.doesNotMatch(container.innerHTML, /<img|<script/);
  assert.match(container.innerHTML, /&lt;img/);
  assert.match(container.innerHTML, /&lt;script/);

  const previousMarkup = container.innerHTML;
  container.select("gameId", "unknown-game");
  container.select("status", 'all"><script>');
  container.changeKind("unknown-kind");
  assert.equal(container.innerHTML, previousMarkup);
});

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
const root = new URL("..", import.meta.url),
  html = readFileSync(new URL("dist/index.html", root), "utf8");
const source = readFileSync(
  new URL("dist/category-navigation.mjs", root),
  "utf8",
);
const ORIGINAL_IDS = [
  "light",
  "cut",
  "elo",
  "prumo",
  "pacto",
  "sintonia",
  "repasse",
  "orbita",
  "desvio",
  "broto",
  "cerco",
];
const LOGIC_IDS = ["divisa", "pulso", "foz", "refugio", "mirante", "renovo"];
const VERSUS_IDS = [
  "enlace",
  "vazante",
  "mosaico",
  "quinhao",
  "estalo",
  "dobra",
  "acorde",
  "lastro",
];
const ALL_IDS = [...ORIGINAL_IDS, ...LOGIC_IDS, ...VERSUS_IDS];
const cardId = (card) => Object.values(card.dataset)[0];

function cardDataset(id) {
  if (LOGIC_IDS.includes(id)) return { logic: id };
  if (VERSUS_IDS.includes(id)) return { versus: id };
  if (["light", "cut"].includes(id)) return { game: id };
  if (["elo", "prumo", "pacto", "desvio"].includes(id))
    return { collection: id };
  return { [id]: id };
}

function originalNavigation(markup) {
  const body = markup
    .replace(/<small class="game-card-progress">\s*<\/small>/g, "")
    .match(/<nav(?: hidden)? class="games"[^>]*>([\s\S]*?)<\/nav>/)[1];
  // Apenas os cartões novos são retirados; conteúdo e atributos dos originais permanecem comparados.
  const added =
    /<button\b[^>]*\bdata-(?:logic|versus)="[^"]+"[^>]*>[\s\S]*?<\/button>/g;
  return body
    .replace(added, "")
    .replace(/\s+/g, " ")
    .replace(/<([\w/-]+)\s+>/g, "<$1>")
    .replace(/>\s+</g, "><")
    .trim();
}

function harness(url = "https://example.test/") {
  const el = (dataset = {}) => ({
    dataset,
    hidden: false,
    attrs: {},
    events: {},
    setAttribute(k, v) {
      this.attrs[k] = v;
    },
    addEventListener(k, f) {
      this.events[k] = f;
    },
    focus() {
      this.focused = true;
    },
    click() {
      this.clicked = (this.clicked || 0) + 1;
      nav.events.click({ target: { closest: () => this } });
    },
  });
  const ids = ALL_IDS;
  const cards = ids.map((id) => {
      const card = el(cardDataset(id));
      card.progress = el();
      card.querySelector = (selector) =>
        selector === ".game-card-progress" ? card.progress : null;
      return card;
    }),
    heads = [el(), el(), el()],
    infos = ids.map((x) => el({ infoGame: x }));
  const nav = el();
  nav.querySelectorAll = (s) =>
    s === ".game-section-title"
      ? heads
      : s === "[data-info-game]"
        ? infos
        : cards.filter((card) =>
            s.split(",").some((selector) => {
              const attribute = selector
                .trim()
                .match(/^\[data-([a-z]+)\]$/)?.[1];
              return attribute && Object.hasOwn(card.dataset, attribute);
            }),
          );
  const filters = ["", "intuicao", "logica", "versus"].map((x) =>
      el({ category: x }),
    ),
    categories = el();
  categories.querySelectorAll = () => filters;
  const tabs = el(),
    buttons = ["games", "achievements"].map((x) => el({ screen: x }));
  tabs.querySelectorAll = () => buttons;
  const title = el(),
    back = el(),
    awards = el();
  awards.querySelector = () => title;
  const nodes = {
    categories,
    "category-back": back,
    "category-title": title,
    achievements: awards,
    "library-navigation": tabs,
  };
  let hidden = 0,
    renders = 0;
  const context = {
    URL,
    URLSearchParams,
    VERSUS_GAME_IDS: VERSUS_IDS,
    location: new URL(url),
    history: {
      pushState(_, __, u) {
        context.location = new URL(u);
      },
    },
    document: { querySelector: () => nav, getElementById: (id) => nodes[id] },
    window: {
      addEventListener(k, f) {
        this[k] = f;
      },
    },
    readAchievements() {
      return {
        games: ids
          .filter(
            (id) => !["desvio", "broto", "cerco", ...VERSUS_IDS].includes(id),
          )
          .map((id) => ({ id, completed: 3, total: 80 })),
      };
    },
    renderAchievements() {
      renders++;
    },
  };
  vm.createContext(context);
  vm.runInContext(
    source.replace(/^import .*\n/gm, "").replaceAll("export ", ""),
    context,
  );
  context.initCategoryNavigation({
    hideGames() {
      hidden++;
    },
  });
  const click = (host, b) =>
    host.events.click({ target: { closest: () => b } });
  return {
    context,
    cards,
    heads,
    infos,
    nav,
    categories,
    filters,
    tabs,
    buttons,
    title,
    back,
    awards,
    click,
    get hidden() {
      return hidden;
    },
    get renders() {
      return renders;
    },
  };
}
test("a biblioteca mostra 25 jogos e preserva integralmente os 11 cartões originais", () => {
  // A referência versionada não depende do histórico de publicação do site.
  const prior = readFileSync(
    new URL("tests/fixtures/library-github-baseline.html", root),
    "utf8",
  );
  assert.equal(originalNavigation(html), originalNavigation(prior));
  const currentCards = [
    ...html.matchAll(
      /<button\b[^>]*\bdata-logic="([^"]+)"[^>]*>[\s\S]*?<\/button>/g,
    ),
  ];
  assert.deepEqual(
    currentCards.map((match) => match[1]).sort(),
    [...LOGIC_IDS].sort(),
  );
  const versusCards = [
    ...html.matchAll(
      /<button\b[^>]*\bdata-versus="([^"]+)"[^>]*>[\s\S]*?<\/button>/g,
    ),
  ];
  assert.deepEqual(
    versusCards.map((match) => match[1]).sort(),
    [...VERSUS_IDS].sort(),
  );
  assert.equal((originalNavigation(html).match(/<button\b/g) || []).length, 11);
  const h = harness();
  assert.equal(h.cards.filter((x) => !x.hidden).length, 25);
  assert.equal(h.title.textContent, "Todos os jogos");
  assert.ok(h.awards.hidden);
  assert.equal(h.cards.filter((x) => x.clicked).length, 0);
});
test("filters and all-games return preserve cards and info visibility", () => {
  const h = harness();
  for (const [i, n] of [
    [1, 2],
    [2, 12],
    [3, 11],
    [0, 25],
  ]) {
    h.click(h.categories, h.filters[i]);
    assert.equal(h.cards.filter((x) => !x.hidden).length, n);
    assert.equal(h.infos.filter((x) => !x.hidden).length, n);
  }
  assert.equal(h.hidden, 5);
});
test("achievements closes games, refreshes on every entry and storage, and supports history", () => {
  const h = harness();
  h.click(h.tabs, h.buttons[1]);
  assert.ok(h.nav.hidden);
  assert.ok(!h.awards.hidden);
  assert.equal(h.renders, 1);
  assert.equal(h.context.location.search, "?screen=achievements");
  h.context.window.storage();
  assert.equal(h.renders, 2);
  h.click(h.tabs, h.buttons[0]);
  assert.ok(h.awards.hidden);
  assert.equal(h.cards.filter((x) => !x.hidden).length, 25);
  h.context.location = new URL("https://example.test/?screen=achievements");
  h.context.window.popstate();
  assert.equal(h.renders, 3);
});
test("as rotas diretas dos 25 jogos acionam exatamente o handler correspondente", () => {
  for (const game of ALL_IDS) {
    const h = harness(`https://example.test/?game=${game}`);
    assert.equal(h.cards.find((x) => cardId(x) === game).clicked, 1);
    assert.equal(h.cards.filter((x) => x.clicked).length, 1);
    assert.equal(h.cards.filter((x) => !x.hidden).length, 25);
  }
});
test("filtered game links, old removed-game routes, invalid filters and reload remain safe", () => {
  const h = harness("https://example.test/?game=elo&category=logica");
  assert.equal(h.cards.filter((x) => !x.hidden).length, 12);
  h.back.onclick();
  assert.equal(h.cards.filter((x) => !x.hidden).length, 25);
  assert.equal(h.context.location.search, "");
  assert.equal(
    harness("https://example.test/?game=trama").cards.filter((x) => !x.hidden)
      .length,
    11,
  );
  assert.equal(
    harness("https://example.test/?category=invalid").cards.filter(
      (x) => !x.hidden,
    ).length,
    25,
  );
});

test("os seis data-logic participam do filtro, progresso, clique e retorno à biblioteca", () => {
  for (const game of LOGIC_IDS) {
    const h = harness();
    const card = h.cards.find((item) => item.dataset.logic === game);
    assert.ok(card);
    assert.equal(card.dataset.game, undefined);
    assert.equal(card.progress.textContent, "Campanha · 3 / 80 concluídos");
    h.click(h.categories, h.filters[2]);
    assert.equal(card.hidden, false);
    h.click(h.nav, card);
    assert.equal(h.context.location.searchParams.get("game"), game);
    assert.equal(h.context.location.searchParams.get("category"), "logica");
    assert.equal(h.nav.hidden, true);
    h.back.onclick();
    assert.equal(h.cards.filter((item) => !item.hidden).length, 25);
    assert.equal(h.infos.filter((item) => !item.hidden).length, 25);
    assert.equal(h.context.location.search, "");
    const direct = harness(
      `https://example.test/?game=${game}&category=logica`,
    );
    assert.equal(
      direct.cards.find((item) => item.dataset.logic === game).clicked,
      1,
    );
    assert.equal(direct.cards.filter((item) => !item.hidden).length, 12);
  }
});

test("game navigation collapses library and return restores it", () => {
  const h = harness();
  h.click(h.nav, h.cards[0]);
  assert.equal(h.nav.hidden, true);
  assert.equal(h.categories.hidden, true);
  assert.equal(h.back.hidden, false);
  h.back.onclick();
  assert.equal(h.nav.hidden, false);
  assert.equal(h.categories.hidden, false);
  assert.equal(h.context.location.search, "");
});

test("os oito versus participam do filtro e conservam a rota ao voltar", () => {
  for (const game of VERSUS_IDS) {
    const h = harness();
    const card = h.cards.find((item) => item.dataset.versus === game);
    h.click(h.categories, h.filters[3]);
    assert.equal(card.hidden, false);
    h.click(h.nav, card);
    assert.equal(h.context.location.searchParams.get("game"), game);
    assert.equal(h.context.location.searchParams.get("category"), "versus");
    assert.equal(h.nav.hidden, true);
    h.back.onclick();
    assert.equal(h.cards.filter((item) => !item.hidden).length, 25);
    const direct = harness(
      `https://example.test/?game=${game}&category=versus`,
    );
    assert.equal(
      direct.cards.find((item) => item.dataset.versus === game).clicked,
      1,
    );
    assert.equal(direct.cards.filter((item) => !item.hidden).length, 11);
  }
});

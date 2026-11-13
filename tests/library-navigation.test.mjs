import { LIBRARY_PREFERENCES_KEY, readLibraryPreferences, saveLibraryPreferences, recordRecentGame, filterLibraryGames } from "../dist/library-preferences.mjs";
import { retiredGameFromLocation, retiredGameCategory } from "../dist/retired-games.mjs";
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
  "desvio",
  "broto",
  "cerco",
];
const LOGIC_IDS = ["pulso", "foz", "refugio", "mirante", "renovo"];
const VERSUS_IDS = [
  "mosaico",
  "quinhao",
  "estalo",
  "acorde",
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
    .replace(/<button\b[^>]*data-orbita="orbita"[^>]*>[\s\S]*?<\/button>/g, "")
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
    classList: { toggle() {} },
    querySelector() { return null; },
    style: {},
    childNodes: [],
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
  nav.children = cards;
  nav.append = () => {};
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
    "library-visible-count": el(),
    achievements: awards,
    "library-navigation": tabs,
  };
  let hidden = 0,
    renders = 0;
  const context = {
    URL,
    URLSearchParams,
    LIBRARY_PREFERENCES_KEY, readLibraryPreferences, saveLibraryPreferences, recordRecentGame, filterLibraryGames, retiredGameFromLocation, retiredGameCategory,
    VERSUS_GAME_IDS: VERSUS_IDS,
    MISSION_UNLOCK_EVENT: "intuicao:missions-unlocked",
    initMissionNotifications() {},
    location: new URL(url),
    history: {
      replaceState(_, __, u) { context.location = new URL(u); },
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
        missions: [],
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
    source.replace(/^import [\s\S]*?;\n/gm, "").replaceAll("export ", ""),
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
    count: nodes["library-visible-count"],
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
test("a biblioteca mostra 19 jogos e preserva integralmente os 10 cartões originais", () => {
  // A referência versionada não depende do histórico de publicação do site.
  const prior = readFileSync(
    new URL("tests/fixtures/library-github-baseline.html", root),
    "utf8",
  );
  // A renumeração editorial é autorizada; o restante do cartão deve ser idêntico.
  const withoutNumbers = source => originalNavigation(source).replace(/<span>\d{2}<\/span>/g, '<span>índice</span>');
  assert.equal(withoutNumbers(html), withoutNumbers(prior));
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
  assert.equal((originalNavigation(html).match(/<button\b/g) || []).length, 10);
  const h = harness();
  assert.equal(h.cards.filter((x) => !x.hidden).length, 19);
  assert.equal(h.title.textContent, "Todos os jogos");
  assert.ok(h.awards.hidden);
  assert.equal(h.cards.filter((x) => x.clicked).length, 0);
});
test("filters and all-games return preserve cards and info visibility", () => {
  const h = harness();
  for (const [i, n] of [
    [1, 2],
    [2, 10],
    [3, 7],
    [0, 19],
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
  h.context.window.storage({ key: null });
  assert.equal(h.renders, 2);
  h.click(h.tabs, h.buttons[0]);
  assert.ok(h.awards.hidden);
  assert.equal(h.cards.filter((x) => !x.hidden).length, 19);
  h.context.location = new URL("https://example.test/?screen=achievements");
  h.context.window.popstate();
  assert.equal(h.renders, 3);
});
test("as rotas diretas dos 19 jogos acionam exatamente o handler correspondente", () => {
  for (const game of ALL_IDS) {
    const h = harness(`https://example.test/?game=${game}`);
    assert.equal(h.cards.find((x) => cardId(x) === game).clicked, 1);
    assert.equal(h.cards.filter((x) => x.clicked).length, 1);
    assert.equal(h.cards.filter((x) => !x.hidden).length, 19);
  }
});
test("filtered game links, old removed-game routes, invalid filters and reload remain safe", () => {
  const h = harness("https://example.test/?game=elo&category=logica");
  assert.equal(h.cards.filter((x) => !x.hidden).length, 10);
  h.back.onclick();
  assert.equal(h.cards.filter((x) => !x.hidden).length, 19);
  assert.equal(h.context.location.search, "");
  assert.equal(
    harness("https://example.test/?game=trama").cards.filter((x) => !x.hidden)
      .length,
    7,
  );
  assert.equal(
    harness("https://example.test/?category=invalid").cards.filter(
      (x) => !x.hidden,
    ).length,
    19,
  );
});

test("os cinco data-logic participam do filtro, progresso, clique e retorno à biblioteca", () => {
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
    assert.equal(h.cards.filter((item) => !item.hidden).length, 19);
    assert.equal(h.infos.filter((item) => !item.hidden).length, 19);
    assert.equal(h.context.location.search, "");
    const direct = harness(
      `https://example.test/?game=${game}&category=logica`,
    );
    assert.equal(
      direct.cards.find((item) => item.dataset.logic === game).clicked,
      1,
    );
    assert.equal(direct.cards.filter((item) => !item.hidden).length, 10);
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

test("os quatro versus participam do filtro e conservam a rota ao voltar", () => {
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
    assert.equal(h.cards.filter((item) => !item.hidden).length, 19);
    const direct = harness(
      `https://example.test/?game=${game}&category=versus`,
    );
    assert.equal(
      direct.cards.find((item) => item.dataset.versus === game).clicked,
      1,
    );
    assert.equal(direct.cards.filter((item) => !item.hidden).length, 7);
  }
});

// O total deve acompanhar a categoria, sem expor contagem no jogo ou nas conquistas.
test("contador acompanha categoria e desaparece fora da biblioteca", () => {
  const h = harness();
  assert.equal(h.count.textContent, "19 jogos");
  h.click(h.categories, h.filters[2]);
  assert.equal(h.count.textContent, "10 jogos");
  h.click(h.tabs, h.buttons[1]);
  assert.equal(h.count.hidden, true);
});

test("seletor compacto preserva controles sem ícones anunciados em duplicidade", () => {
  assert.ok(html.indexOf('id="category-title"') < html.indexOf('id="library-filters"'));
  assert.match(html, /class="library-filter-options" role="group" aria-label="Mostrar jogos"/);
  assert.match(html, /id="library-visible-count"[^>]*aria-live="polite"/);
  for (const filter of ["all", "favorites", "recent"]) {
    assert.match(html, new RegExp(`data-library-filter="${filter}"`));
  }
});


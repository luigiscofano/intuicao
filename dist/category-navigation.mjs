import { readLibraryPreferences, saveLibraryPreferences, recordRecentGame, filterLibraryGames, LIBRARY_PREFERENCES_KEY } from './library-preferences.mjs';
import { retiredGameFromLocation, retiredGameCategory } from "./retired-games.mjs";
import { VERSUS_GAME_IDS } from "./versus/metadata.mjs";
import { renderAchievements, readAchievements } from "./achievements.mjs";
import { initMissionNotifications } from "./achievements/notifications.mjs";
import { MISSION_UNLOCK_EVENT } from "./achievements/mission-store.mjs";

// A navegação controla somente a tela. Cada jogo continua responsável pelo save.
export const CATEGORY_GAMES = Object.freeze({
  intuicao: ["light", "cut"],
  logica: [
    "elo",
    "prumo",
    "pacto",
    "sintonia",
    "repasse",
    "pulso",
    "foz",
    "refugio",
    "mirante",
    "renovo",
  ],
  versus: ["desvio", "broto", "cerco", ...VERSUS_GAME_IDS],
});

const CARD_SELECTOR =
  "[data-game],[data-collection],[data-sintonia],[data-repasse],[data-orbita],[data-broto],[data-cerco],[data-logic],[data-versus]";
const CATEGORY_NAMES = {
  intuicao: "Intuição",
  logica: "Raciocínio lógico",
  versus: "Versus",
};
const cardGame = (card) =>
  card.dataset.game ||
  card.dataset.collection ||
  card.dataset.sintonia ||
  card.dataset.repasse ||
  card.dataset.orbita ||
  card.dataset.broto ||
  card.dataset.cerco ||
  card.dataset.logic ||
  card.dataset.versus;

export function initCategoryNavigation({ hideGames }) {
  initMissionNotifications();
  const navigation = document.querySelector("#main > .games");
  const categories = document.getElementById("categories");
  const back = document.getElementById("category-back");
  const title = document.getElementById("category-title");
  const achievements = document.getElementById("achievements");
  const tabs = document.getElementById("library-navigation");
  // Permite montar os jogos isoladamente, inclusive nos testes legados.
  if (!navigation || !categories || !back || !title || !achievements || !tabs)
    return;

  const originalLibraryNodes = [...navigation.children];
  const cards = [...navigation.querySelectorAll(CARD_SELECTOR)];
  const count = tabs.querySelector('[data-screen="games"] span');
  if (count) count.textContent = String(cards.length);
  const allowedGames = cards.map(cardGame);
  let storage;
  try { storage = window.localStorage; } catch { /* Navegação privada. */ }
  let preferences = readLibraryPreferences(storage, allowedGames);
  let libraryFilter = 'all';
  const filters = document.getElementById('library-filters');
  const empty = document.getElementById('library-empty');
  const visibleCount = document.getElementById('library-visible-count');
  const favoritesDialog = document.getElementById('favorites-dialog');
  const favoriteList = favoritesDialog?.querySelector('[data-favorites-list]');
  const cardName = card => [...card.childNodes].filter(node => node.nodeType === 3)
    .map(node => node.textContent.trim()).filter(Boolean).join(' ') || cardGame(card);
  const filterTitles = { all: 'Todos os jogos', favorites: 'Seus favoritos', recent: 'Jogos recentes' };
  let currentCategory = null;

  function refreshFavorites() {
    if (!favoriteList) return;
    favoriteList.replaceChildren();
    for (const card of cards) {
      const game = cardGame(card), label = document.createElement('label');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox'; checkbox.checked = preferences.favorites.includes(game);
      checkbox.addEventListener('change', () => {
        preferences = saveLibraryPreferences(storage, { ...preferences, favorites: checkbox.checked
          ? [...preferences.favorites, game] : preferences.favorites.filter(id => id !== game) }, allowedGames);
        showView(currentCategory, { focus: false });
      });
      label.append(checkbox, document.createTextNode(cardName(card))); favoriteList.append(label);
    }
  }
  filters?.addEventListener('click', event => {
    const button = event.target.closest('[data-library-filter]');
    if (button) { libraryFilter = button.dataset.libraryFilter; returnToLibrary(currentCategory); }
  });
  document.getElementById('favorites-edit')?.addEventListener('click', () => {
    refreshFavorites(); favoritesDialog?.showModal();
  });
  favoritesDialog?.querySelector('[data-dialog-close]')?.addEventListener('click', () => favoritesDialog.close());
  let restoring = false;

  function routeFromLocation() {
    const parameters = new URLSearchParams(location.search);
    const game = parameters.get("game");
    if (parameters.get("screen") === "achievements")
      return { screen: "achievements" };
    const retiredGame = retiredGameFromLocation(location);
    if (retiredGame) return { category: retiredGameCategory(retiredGame), retired: true };
    const retiredRoute =
      ["trama", "vertice"].includes(game) ||
      /\/(?:trama|vertice|divisa|orbita|lastro|vazante|enlace)\/?$/i.test(location.pathname) ||
      (!game &&
        /^#(?:game=)?(?:trama|vertice|divisa|orbita|lastro|vazante|enlace)(?:$|[/?&])/i.test(location.hash));
    if (retiredRoute) return { category: "versus" };
    return {
      game: cards.some((card) => cardGame(card) === game) ? game : null,
      category: CATEGORY_GAMES[parameters.get("category")]
        ? parameters.get("category")
        : null,
    };
  }

  function recordRoute(category, game = null, screen = null) {
    const url = new URL(location.href);
    url.pathname = url.pathname.replace(/(?:trama|vertice|divisa|orbita|lastro|vazante|enlace)\/?$/i, "");
    if (/^#(?:game=)?(?:trama|vertice|divisa|orbita|lastro|vazante|enlace)(?:$|[/?&])/i.test(url.hash))
      url.hash = "";
    for (const key of ["game", "category", "screen"])
      url.searchParams.delete(key);
    if (game) url.searchParams.set("game", game);
    if (category) url.searchParams.set("category", category);
    if (screen) url.searchParams.set("screen", screen);
    if (url.href !== location.href) history.pushState(null, "", url);
  }

  function refreshCardProgress() {
    const progress = readAchievements();
    for (const card of cards) {
      const summary = card.querySelector?.(".game-card-progress");
      if (!summary) continue;
      const campaign = progress.games.find(
        (game) => game.id === cardGame(card),
      );
      const missions = progress.missions.filter(mission =>
        mission.gameId === cardGame(card) || mission.gameIds?.includes(cardGame(card)));
      summary.textContent = campaign
        ? `Campanha · ${campaign.completed} / ${campaign.total} concluídos`
        : `Missões · ${missions.filter(mission => mission.unlocked).length} / ${missions.length} conquistadas`;
    }
  }

  function showView(
    category,
    { focus = true, screen = null, game = null } = {},
  ) {
    currentCategory = category;
    const showingAchievements = screen === "achievements";
    const playing = Boolean(game);
    categories.hidden = showingAchievements || playing;
    navigation.hidden = showingAchievements || playing;
    back.hidden = showingAchievements || (!category && !playing);
    title.hidden = showingAchievements || playing;
    achievements.hidden = !showingAchievements;
    const backupPanel = document.getElementById("progress-backup-panel");
    if (backupPanel && !backupPanel.closest('#preferences-dialog')) backupPanel.hidden = playing;
    if (filters) filters.hidden = showingAchievements || playing;
    title.textContent = [libraryFilter !== 'all' ? filterTitles[libraryFilter] : null, CATEGORY_NAMES[category]].filter(Boolean).join(' · ') || filterTitles.all;
    document
      .querySelector("#main > .intro")
      ?.classList?.toggle("library-intro-collapsed", playing);

    const visibleIds = filterLibraryGames(allowedGames, libraryFilter, preferences)
      .filter(id => !category || CATEGORY_GAMES[category]?.includes(id));
    if (visibleCount) {
      visibleCount.hidden = showingAchievements || playing;
      visibleCount.textContent = `${visibleIds.length} ${visibleIds.length === 1 ? 'jogo' : 'jogos'}`;
    }
    for (const card of cards) {
      const gameId = cardGame(card);
      card.hidden = !visibleIds.includes(gameId);
      card.classList.toggle('is-favorite', preferences.favorites.includes(gameId));

    }
    // Move os mesmos elementos: teclado e leitura seguem a ordem visual, sem recriar handlers.
    const orderedNodes = libraryFilter === 'recent'
      ? [...visibleIds.map(id => cards.find(card => cardGame(card) === id)), ...originalLibraryNodes.filter(node => !cards.includes(node) || !visibleIds.includes(cardGame(node)))]
      : originalLibraryNodes;
    for (const node of orderedNodes) navigation.append(node);
    navigation.classList.toggle('library-filtered', libraryFilter !== 'all');
    if (empty) { empty.hidden = playing || showingAchievements || visibleIds.length > 0;
      empty.textContent = libraryFilter === 'favorites' ? 'Nenhum favorito nesta categoria. Use Editar favoritos para escolher.'
        : 'Ainda não há jogos recentes nesta categoria. Abra um jogo para encontrá-lo aqui.'; }
    navigation.querySelectorAll('.game-section-title').forEach(heading => {
      heading.hidden = Boolean(category) || libraryFilter !== 'all';
    });
    navigation.querySelectorAll('[data-info-game]').forEach(button => {
      button.hidden = !visibleIds.includes(button.dataset.infoGame);
    });
    filters?.querySelectorAll('[data-library-filter]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.libraryFilter === libraryFilter));
    });
    categories.querySelectorAll("[data-category]").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String((button.dataset.category || null) === category),
      );
    });
    tabs.querySelectorAll("[data-screen]").forEach((button) => {
      const selected =
        (button.dataset.screen === "achievements") === showingAchievements;
      button.setAttribute("aria-current", selected ? "page" : "false");
    });
    if (showingAchievements) renderAchievements(achievements);
    else if (!playing) refreshCardProgress();
    if (focus && !playing)
      (showingAchievements ? achievements.querySelector("h2") : title)?.focus({
        preventScroll: true,
      });
  }

  function returnToLibrary(category = null) {
    hideGames();
    recordRoute(category);
    showView(category);
  }

  categories.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (button) returnToLibrary(button.dataset.category || null);
  });
  back.onclick = () => returnToLibrary();
  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-screen]");
    if (!button) return;
    hideGames();
    const screen =
      button.dataset.screen === "achievements" ? "achievements" : null;
    recordRoute(null, null, screen);
    showView(null, { screen });
  });
  navigation.addEventListener("click", (event) => {
    const card = event.target.closest(CARD_SELECTOR);
    if (!card) return;
    const game = cardGame(card);
    if (!restoring) recordRoute(currentCategory, game);
    preferences = saveLibraryPreferences(storage, recordRecentGame(preferences, game, allowedGames), allowedGames);
    showView(currentCategory, { focus: false, game });
  });

  function restoreRoute() {
    const route = routeFromLocation();
    if (route.retired) {
      const url = new URL(location.href);
      url.searchParams.delete("game");
      url.searchParams.set("category", route.category);
      url.pathname = url.pathname.replace(/(?:divisa|orbita|lastro|vazante|enlace)\/?$/i, "");
      url.hash = "";
      history.replaceState(null, "", url);
    }
    hideGames();
    showView(route.category || null, {
      focus: false,
      screen: route.screen,
      game: route.game,
    });
    if (!route.game) return;
    restoring = true;
    try {
      cards.find((card) => cardGame(card) === route.game).click();
    } finally {
      restoring = false;
    }
  }

  window.addEventListener("popstate", restoreRoute);
  window.addEventListener("storage", event => {
    if (event.key === LIBRARY_PREFERENCES_KEY) {
      preferences = readLibraryPreferences(storage, allowedGames);
      if (!navigation.hidden) showView(currentCategory, { focus: false });
    }
    if (!achievements.hidden) renderAchievements(achievements);
    else if (!navigation.hidden) refreshCardProgress();
  });
  window.addEventListener(MISSION_UNLOCK_EVENT, () => {
    if (!achievements.hidden) renderAchievements(achievements);
  });
  restoreRoute();
}


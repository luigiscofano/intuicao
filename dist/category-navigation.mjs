import { renderAchievements, readAchievements } from "./achievements.mjs";

// A navegação controla somente a tela. Cada jogo continua responsável pelo save.
export const CATEGORY_GAMES = Object.freeze({
  intuicao: ["light", "cut"],
  logica: ["elo", "prumo", "pacto", "sintonia", "repasse", "orbita"],
  versus: ["desvio", "broto", "cerco"],
});

const CARD_SELECTOR =
  "[data-game],[data-collection],[data-sintonia],[data-repasse],[data-orbita],[data-broto],[data-cerco]";
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
  card.dataset.cerco;

export function initCategoryNavigation({ hideGames }) {
  const navigation = document.querySelector("#main > .games");
  const categories = document.getElementById("categories");
  const back = document.getElementById("category-back");
  const title = document.getElementById("category-title");
  const achievements = document.getElementById("achievements");
  const tabs = document.getElementById("library-navigation");
  // Permite montar os jogos isoladamente, inclusive nos testes legados.
  if (!navigation || !categories || !back || !title || !achievements || !tabs)
    return;

  const cards = [...navigation.querySelectorAll(CARD_SELECTOR)];
  let currentCategory = null;
  let restoring = false;

  function routeFromLocation() {
    const parameters = new URLSearchParams(location.search);
    const game = parameters.get("game");
    if (parameters.get("screen") === "achievements")
      return { screen: "achievements" };
    const retiredRoute =
      ["trama", "vertice"].includes(game) ||
      /\/(?:trama|vertice)\/?$/i.test(location.pathname) ||
      (!game &&
        /^#(?:game=)?(?:trama|vertice)(?:$|[/?&])/i.test(location.hash));
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
    url.pathname = url.pathname.replace(/(?:trama|vertice)\/?$/i, "");
    if (/^#(?:game=)?(?:trama|vertice)(?:$|[/?&])/i.test(url.hash))
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
      summary.textContent = campaign
        ? `${campaign.completed} / ${campaign.total} níveis concluídos`
        : "Partida local · sem histórico acumulado";
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
    if (backupPanel) backupPanel.hidden = playing;
    title.textContent = CATEGORY_NAMES[category] || "Todos os jogos";
    document
      .querySelector("#main > .intro")
      ?.classList?.toggle("library-intro-collapsed", playing);

    for (const card of cards)
      card.hidden =
        Boolean(category) &&
        !CATEGORY_GAMES[category]?.includes(cardGame(card));
    navigation.querySelectorAll(".game-section-title").forEach((heading) => {
      heading.hidden = Boolean(category);
    });
    navigation.querySelectorAll("[data-info-game]").forEach((button) => {
      button.hidden =
        Boolean(category) &&
        !CATEGORY_GAMES[category]?.includes(button.dataset.infoGame);
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
    showView(currentCategory, { focus: false, game });
  });

  function restoreRoute() {
    const route = routeFromLocation();
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
  window.addEventListener("storage", () => {
    if (!achievements.hidden) renderAchievements(achievements);
    else if (!navigation.hidden) refreshCardProgress();
  });
  restoreRoute();
}

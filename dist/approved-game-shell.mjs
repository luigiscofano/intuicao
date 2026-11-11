import { LOGIC_GAMES } from './logica/metadata.mjs';
import { GAME_GUIDANCE } from "./contextual-guidance.mjs";

// A composição visual reutiliza os nós dos controles: não duplica ações nem saves.
export const GAME_PRESENTATION = Object.freeze({
  ...Object.fromEntries(LOGIC_GAMES.map(game => [game.id, { ...game, category: "Raciocínio lógico", prefix: "lg" }])),
  light: {
    name: "Reflexos",
    number: "01",
    category: "Intuição",
    headline: "Observe a luz.\nDescubra o caminho.",
    prefix: "",
  },
  cut: {
    name: "Corte certo",
    number: "02",
    category: "Intuição",
    headline: "Observe as formas.\nEncontre a proporção.",
    prefix: "",
  },
  elo: {
    name: "Elo",
    number: "03",
    category: "Raciocínio lógico",
    headline: "Encontre as ligações.\nComplete o circuito.",
    prefix: "c",
  },
  prumo: {
    name: "Prumo",
    number: "04",
    category: "Raciocínio lógico",
    headline: "Observe o apoio.\nDescubra o equilíbrio.",
    prefix: "c",
  },
  pacto: {
    name: "Pacto",
    number: "05",
    category: "Raciocínio lógico",
    headline: "Leia as pistas.\nDescubra as relações.",
    prefix: "c",
  },
  desvio: {
    name: "Desvio",
    number: "06",
    category: "Versus",
    headline: "Imagine os caminhos.\nPrepare sua jogada.",
    prefix: "c",
  },
  sintonia: {
    name: "Sintonia",
    number: "07",
    category: "Raciocínio lógico",
    headline: "Um comando.\nMuitos caminhos.",
    prefix: "s",
  },
  repasse: {
    name: "Repasse",
    number: "08",
    category: "Raciocínio lógico",
    headline: "Observe a ordem.\nTransforme o caminho.",
    prefix: "r",
  },
  orbita: {
    name: "Órbita",
    number: "09",
    category: "Raciocínio lógico",
    headline: "Gire as possibilidades.\nEncontre as conexões.",
    prefix: "o",
  },
  broto: {
    name: "Broto",
    number: "10",
    category: "Versus",
    headline: "Prepare o terreno.\nEscolha quem floresce.",
    prefix: "b",
  },
  cerco: {
    name: "Cerco",
    number: "11",
    category: "Versus",
    headline: "Observe as saídas.\nFaça o próximo movimento.",
    prefix: "ce",
  },
});

function setText(node, text) {
  if (node.textContent !== text) node.textContent = text;
}

function element(doc, tag, className, text = "") {
  const node = doc.createElement(tag);
  node.className = className;
  node.textContent = text;
  return node;
}

function move(node, destination) {
  if (node && node.parentElement !== destination) destination.append(node);
}

export function initApprovedGameShell(doc = document, win = window) {
  const main = doc.getElementById("main");
  if (!main || !win.MutationObserver) return () => {};
  const navigation = doc.getElementById("library-navigation");
  const header = doc.querySelector("body > header");
  const navigationHome = navigation?.parentElement;
  const navigationNext = navigation?.nextSibling;

  const hero = element(doc, "section", "approved-game-hero");
  hero.id = "approved-game-hero";
  hero.hidden = true;
  const copy = element(doc, "div", "approved-hero-copy");
  const headline = element(doc, "h1", "approved-hero-headline");
  const description = element(doc, "p", "approved-hero-description");
  copy.append(headline, description);
  const tiles = element(doc, "div", "approved-tiles");
  tiles.setAttribute("aria-hidden", "true");
  for (let index = 0; index < 8; index++)
    tiles.append(element(doc, "span", "approved-tile"));
  const band = element(doc, "div", "approved-game-band");
  const number = element(doc, "span", "number");
  const category = element(doc, "strong", "approved-category");
  const line = element(doc, "span", "approved-band-line");
  line.setAttribute("aria-hidden", "true");
  band.append(number, category, line);
  hero.append(copy, tiles, band);
  main.insertBefore(hero, doc.querySelector(".category-heading"));

  let queued = false;
  const observer = new win.MutationObserver(() => {
    if (queued) return;
    queued = true;
    win.queueMicrotask(update);
  });
  const observe = () =>
    observer.observe(main, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden"],
    });

  function update() {
    queued = false;
    observer.disconnect();
    try {
      const parameters = new URL(win.location.href).searchParams;
      const game = parameters.get("game");
      const presentation = Object.hasOwn(GAME_PRESENTATION, game)
        ? GAME_PRESENTATION[game]
        : null;
      const active = Boolean(
        presentation && parameters.get("screen") !== "achievements",
      );
      hero.hidden = !active;
      doc.body.classList.toggle("approved-game-view", active);
      if (
        navigation &&
        header &&
        active &&
        navigation.parentElement !== header
      ) {
        header.insertBefore(navigation, doc.getElementById("about-open"));
      } else if (
        navigation &&
        !active &&
        navigationHome &&
        navigation.parentElement !== navigationHome
      ) {
        navigationHome.insertBefore(navigation, navigationNext);
      }
      if (!active) return;
      setText(headline, presentation.headline);
      setText(
        description,
        `${presentation.name} · um experimento por vez, no seu ritmo.`,
      );
      setText(number, presentation.number);
      setText(category, `${presentation.category} · ${presentation.name}`);

      const surfaces = main.querySelectorAll(
        ".workspace > .experiment, .collection-workspace > .collection-surface",
      );
      const surface = [...surfaces].find((node) => !node.closest("[hidden]"));
      if (!surface) return; // A seleção mantém seus próprios modos, mapas e importação.
      const workspace = surface.parentElement;
      const section = workspace.closest(".collection-lab, .lab");
      if (!section) return;
      section.classList.add("approved-game-section");
      workspace.classList.add("approved-workspace");
      surface.classList.add("approved-play-surface");
      const prefix = presentation.prefix;
      const control = (name) =>
        section.querySelector(`#${prefix ? `${prefix}-` : ""}${name}`);

      let heading = section.querySelector(".approved-game-heading");
      if (!heading) {
        heading = element(doc, "div", "approved-game-heading");
        const titleGroup = element(doc, "div", "approved-title-group");
        titleGroup.append(
          element(doc, "h2", "approved-game-title"),
          element(doc, "p", "approved-game-position"),
        );
        heading.append(
          titleGroup,
          element(doc, "div", "approved-heading-actions"),
        );
        section.insertBefore(heading, workspace);
      }
      let panel = workspace.querySelector(".approved-action-panel");
      if (!panel) {
        panel = element(doc, "aside", "approved-action-panel");
        panel.setAttribute("aria-label", "Instruções e ações do jogo");
        panel.append(
          element(doc, "p", "approved-action-kicker", "PARA EXPERIMENTAR"),
        );
        panel.append(element(doc, "h3", "approved-action-title"));
        panel.append(element(doc, "p", "instructions"));
        const actions = element(doc, "div", "approved-real-actions");
        actions.append(element(doc, "div", "approved-primary-action"));
        actions.append(element(doc, "div", "approved-history-actions"));
        actions.append(element(doc, "div", "approved-secondary-actions"));
        panel.append(actions);
        workspace.insertBefore(panel, surface.nextSibling);
      }

      const selectedLevel =
        game === "light" || game === "cut" ? control("level") : null;
      const levelName =
        selectedLevel && !selectedLevel.disabled
          ? selectedLevel.options[
              selectedLevel.selectedIndex
            ]?.textContent?.replace(/^\d+\.\s*/, "")
          : section
              .querySelector(".s-level-name, .r-level-name, .o-level-name, .logic-level-name")
              ?.childNodes[0]?.textContent?.trim();
      const title = levelName || presentation.name;
      const contextTitle =
        control("rules-context-title") ||
        (prefix === ""
          ? doc.getElementById("original-rules-context-title")
          : null);
      const contextText =
        control("rules-context-text") ||
        (prefix === ""
          ? doc.getElementById("original-rules-context-text")
          : null);
      const stage = control("stage-label");
      setText(heading.querySelector(".approved-game-title"), title);
      setText(
        heading.querySelector(".approved-game-position"),
        stage?.textContent ||
          (presentation.category === "Versus"
            ? "Partida local · confira o turno e as regras"
            : "Explore no seu ritmo"),
      );
      setText(
        panel.querySelector(".approved-action-title"),
        contextTitle?.textContent || "Uma descoberta por vez.",
      );
      setText(
        panel.querySelector(".instructions"),
        contextText?.textContent || GAME_GUIDANCE[game],
      );
      if (stage) stage.classList.add("approved-stage-metadata");

      // Reaproveitar os elementos mantém disabled, hidden, foco e eventos originais.
      move(control("confirm"), panel.querySelector(".approved-primary-action"));
      for (const name of ["undo", "redo"])
        move(control(name), panel.querySelector(".approved-history-actions"));
      const secondary = panel.querySelector(".approved-secondary-actions");
      for (const group of [
        ...surface.querySelectorAll(
          ":scope > .level-actions, :scope > .board-check-controls",
        ),
      ])
        move(group, secondary);
      move(
        prefix === ""
          ? doc.getElementById("toggle-controls")
          : control("advanced-toggle"),
        secondary,
      );
      const stageTools = surface.querySelector(".stage-tools");
      move(stageTools, heading.querySelector(".approved-heading-actions"));
      // Ajuda já foi incorporada no painel; o disclosure continua disponível e recolhido.
      const guidance = surface.querySelector(".contextual-guidance");
      if (guidance) {
        guidance.open = false;
        move(guidance, secondary);
      }
    } finally {
      observe();
    }
  }
  update();
  win.addEventListener("popstate", update);
  return () => {
    observer.disconnect();
    win.removeEventListener("popstate", update);
  };
}

if (typeof document !== "undefined" && typeof window !== "undefined")
  initApprovedGameShell();


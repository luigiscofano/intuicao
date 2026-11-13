import { gameDisplayNumber } from './game-catalog.mjs';
import { arrangeActionSidebar } from './action-sidebar.mjs';
import { VERSUS_GAMES } from "./versus/metadata.mjs";
import { LOGIC_GAMES } from "./logica/metadata.mjs";
import { GAME_GUIDANCE } from "./contextual-guidance.mjs";

// A composição visual reutiliza os nós dos controles: não duplica ações nem saves.
export const GAME_PRESENTATION = Object.freeze({
  ...Object.fromEntries(
    VERSUS_GAMES.map((game) => [
      game.id,
      { ...game, category: "Versus", prefix: "nv" },
    ]),
  ),
  ...Object.fromEntries(
    LOGIC_GAMES.filter((game) => game.id !== "divisa").map((game) => [
      game.id,
      { ...game, category: "Raciocínio lógico", prefix: "lg" },
    ]),
  ),
  light: {
    name: "Reflexos",
    number: gameDisplayNumber("light"),
    category: "Intuição",
    headline: "Observe a luz.\nDescubra o caminho.",
    prefix: "",
  },
  cut: {
    name: "Corte certo",
    number: gameDisplayNumber("cut"),
    category: "Intuição",
    headline: "Observe as formas.\nEncontre a proporção.",
    prefix: "",
  },
  elo: {
    name: "Elo",
    number: gameDisplayNumber("elo"),
    category: "Raciocínio lógico",
    headline: "Encontre as ligações.\nComplete o circuito.",
    prefix: "c",
  },
  prumo: {
    name: "Prumo",
    number: gameDisplayNumber("prumo"),
    category: "Raciocínio lógico",
    headline: "Observe o apoio.\nDescubra o equilíbrio.",
    prefix: "c",
  },
  pacto: {
    name: "Pacto",
    number: gameDisplayNumber("pacto"),
    category: "Raciocínio lógico",
    headline: "Leia as pistas.\nDescubra as relações.",
    prefix: "c",
  },
  desvio: {
    name: "Desvio",
    number: gameDisplayNumber("desvio"),
    category: "Versus",
    headline: "Imagine os caminhos.\nPrepare sua jogada.",
    prefix: "c",
  },
  sintonia: {
    name: "Sintonia",
    number: gameDisplayNumber("sintonia"),
    category: "Raciocínio lógico",
    headline: "Um comando.\nMuitos caminhos.",
    prefix: "s",
  },
  repasse: {
    name: "Repasse",
    number: gameDisplayNumber("repasse"),
    category: "Raciocínio lógico",
    headline: "Observe a ordem.\nTransforme o caminho.",
    prefix: "r",
  },
  broto: {
    name: "Broto",
    number: gameDisplayNumber("broto"),
    category: "Versus",
    headline: "Prepare o terreno.\nEscolha quem floresce.",
    prefix: "b",
  },
  cerco: {
    name: "Cerco",
    number: gameDisplayNumber("cerco"),
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
  const band = element(doc, "div", "approved-game-band");
  const number = element(doc, "span", "number");
  const category = element(doc, "h1", "approved-category");
  const line = element(doc, "span", "approved-band-line");
  line.setAttribute("aria-hidden", "true");
  band.append(number, category, line);
  // O acesso ao jogo começa na identificação, sem chamada promocional acima.
  hero.append(band);
  main.insertBefore(hero, doc.querySelector(".category-heading"));

  // Não recolher novamente uma ajuda que o jogador decidiu abrir.
  const incorporatedGuidance = new WeakSet();
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
      doc.body.classList.toggle(
        "approved-campaign-actions",
        active && presentation.category !== "Versus",
      );
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
      setText(number, gameDisplayNumber(game) ?? presentation.number);
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

      // O desenho CSS substitui a seta legada. Um nome explícito evita
      // que leitores de tela somem o rótulo do pseudo-elemento ao texto original.
      if (presentation.category !== "Versus" && prefix !== "lg") {
        control("reset")?.setAttribute("aria-label", "Reiniciar");
      }

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
              .querySelector(
                ".s-level-name, .r-level-name, .o-level-name, .logic-level-name",
              )
              ?.childNodes[0]?.textContent?.trim();
      const stage = control("stage-label");
      // As campanhas fornecem o nome por ID; modos livres mantêm seu contexto.
      const title = stage?.dataset?.campaignLevelName || levelName || presentation.name;
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
      const versus = presentation.category === "Versus";
      surface.classList.toggle("approved-versus-surface", versus);
      // Versus precisa da confirmação ao lado do tabuleiro, inclusive no celular.
      if (!versus)
        move(control("confirm"), panel.querySelector(".approved-primary-action"));
      for (const name of ["undo", "redo"])
        move(control(name), panel.querySelector(".approved-history-actions"));
      const secondary = panel.querySelector(".approved-secondary-actions");
      // Reiniciar tem dois nomes históricos; ambos preservam o mesmo elemento e handler.
      if (!versus) {
        for (const [name, label] of [["undo", "Desfazer"], ["redo", "Refazer"]]) {
          control(name)?.setAttribute("aria-label", label);
        }
        const restart = control("restart") || control("reset");
        if (restart) {
          let restartSlot = panel.querySelector(".approved-restart-action");
          if (!restartSlot) {
            restartSlot = element(doc, "div", "approved-restart-action");
            secondary.insertBefore(restartSlot, secondary.firstChild || null);
          }
          restart.setAttribute("aria-label", "Reiniciar");
          move(restart, restartSlot);
        }
      }
      for (const group of [
        ...surface.querySelectorAll(
          ":scope > .level-actions, :scope > .board-check-controls",
        ),
      ]) {
        if (versus && group.querySelector(`#${prefix}-confirm`)) continue;
        move(group, secondary);
      }
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
        if (!incorporatedGuidance.has(guidance)) {
          guidance.open = false;
          incorporatedGuidance.add(guidance);
        }
        move(guidance, secondary);
      }
      arrangeActionSidebar({ doc, section, panel, control, game, versus });
    } finally {
      observe();
    }
  }
  update();
  win.addEventListener("popstate", update);
  win.addEventListener("pulso-skin-change", update);
  win.addEventListener("refugio-skin-change", update);
  return () => {
    observer.disconnect();
    win.removeEventListener("popstate", update);
    win.removeEventListener("pulso-skin-change", update);
    win.removeEventListener("refugio-skin-change", update);
  };
}

if (typeof document !== "undefined" && typeof window !== "undefined")
  initApprovedGameShell();

import { VERSUS_GAMES, VERSUS_GAME_IDS } from "./metadata.mjs";
import { escapeHTML } from "./shared/markup.mjs";

/** A rota cancela importações atrasadas para não reabrir um jogo que já foi fechado. */
export function createVersusRoute({ hideOthers }) {
  const host = document.getElementById("versus-games");
  let controller = null;
  let loading = null;
  let revision = 0;
  let visible = false;

  async function open(id) {
    if (!VERSUS_GAME_IDS.includes(id)) return;
    controller?.hide();
    const token = ++revision;
    visible = true;
    hideOthers();
    document
      .querySelectorAll(".games > button[aria-pressed]")
      .forEach((button) => {
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.versus === id),
        );
      });
    host.hidden = false;
    const metadata = VERSUS_GAMES.find((game) => game.id === id);
    host.innerHTML = `<div class="level-screen"><h2>${escapeHTML(metadata.name)}</h2><p role="status">Preparando a partida…</p></div>`;
    try {
      loading ??= import("./ui.mjs").then((module) => {
        controller = module.initVersusGames();
        return controller;
      });
      const ui = await loading;
      if (token !== revision || !visible) return;
      await ui.activate(id);
    } catch {
      if (token !== revision || !visible) return;
      if (!controller) loading = null;
      host.innerHTML = `
        <div class="level-screen">
          <h2>${escapeHTML(metadata.name)}</h2>
          <p role="status">Não foi possível abrir a partida. O registro salvo continua guardado.</p>
          <button type="button" class="primary" data-versus-retry>Tentar novamente</button>
        </div>`;
      host.querySelector("[data-versus-retry]").onclick = () => open(id);
    }
  }

  function hide() {
    revision += 1;
    visible = false;
    controller?.hide();
    host.hidden = true;
    document.querySelectorAll("[data-versus]").forEach((button) => {
      button.setAttribute("aria-pressed", "false");
    });
  }

  for (const button of document.querySelectorAll("[data-versus]")) {
    button.onclick = () => open(button.dataset.versus);
  }
  return { open, hide, isOpen: () => visible };
}

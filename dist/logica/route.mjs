import { isRetiredGame } from "../retired-games.mjs";
import { LOGIC_GAME_IDS, LOGIC_GAMES } from './metadata.mjs';

// Uma rota atende os seis jogos; cada motor só é importado ao abrir seu cartão.
export function createLogicRoute({ hideOthers }) {
  const host = document.getElementById('logic-games');
  let ui = null;
  let loading = null;
  let revision = 0;
  let visible = false;

  async function open(game) {
    if (!LOGIC_GAME_IDS.includes(game) || isRetiredGame(game)) return;
    const token = ++revision;
    visible = true;
    hideOthers();
    document.querySelectorAll('.games > button[aria-pressed]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.logic === game)));
    host.hidden = false;
    host.innerHTML = `<div class="level-screen"><h2>${LOGIC_GAMES.find(item => item.id === game).name}</h2><p role="status">Preparando o tabuleiro…</p></div>`;
    try {
      loading ??= import('./ui.mjs').then(module => ui = module.initLogicGames());
      const controller = await loading;
      if (token !== revision || !visible) return;
      await controller.activate(game);
    } catch {
      if (token !== revision || !visible) return;
      if (!ui) loading = null;
      host.innerHTML = '<div class="level-screen"><h2>Vamos tentar novamente?</h2><p role="status">Não foi possível abrir o jogo agora. Seu progresso continua guardado.</p><button type="button" class="primary" data-logic-retry>Tentar novamente</button></div>';
      host.querySelector('[data-logic-retry]').onclick = () => open(game);
    }
  }

  function hide() {
    ++revision;
    visible = false;
    ui?.hide();
    host.hidden = true;
    document.querySelectorAll('[data-logic]').forEach(button => button.setAttribute('aria-pressed', 'false'));
  }

  for (const button of document.querySelectorAll('[data-logic]')) button.onclick = () => open(button.dataset.logic);
  return { open, hide, isOpen: () => visible };
}

import { isRetiredGame } from "../retired-games.mjs";
import { writeProgress } from '../progress-write-guard.mjs';
// Carregamento de ÓRBITA sob demanda e retomada da tela solicitada.
// The catalog, solver and game load only when ÓRBITA is opened or resumed.
export function createOrbitaRoute({ hideOthers }) {
  // Mantém os saves antigos, mas não reabre um jogo retirado da biblioteca.
  if (isRetiredGame("orbita")) {
    return { open() {}, hide() {}, restoreOnLoad: () => false, isOpen: () => false };
  }
  let ui = null,
    loading = null,
    revision = 0,
    visible = false;
  const host = document.getElementById('orbita'),
    nav = document.querySelector('[data-orbita]');
  const setActive = (active) => nav?.setAttribute('aria-pressed', String(active));
  const load = () =>
    (loading ??= import('./ui.mjs')
      .then(({ initOrbita }) => (ui = initOrbita({ hideOthers })))
      .catch((error) => {
        loading = null;
        throw error;
      }));
  async function open(restore = false) {
    const token = ++revision;
    visible = true;
    hideOthers();
    document
      .querySelectorAll('[data-game],[data-collection],[data-sintonia],[data-repasse]')
      .forEach((button) => button.setAttribute('aria-pressed', 'false'));
    setActive(true);
    host.hidden = false;
    if (!ui)
      host.innerHTML =
        '<div class="level-screen"><p class="eyebrow">EXPERIMENTO 09</p><h2 id="o-selection-title" tabindex="-1">ÓRBITA ·</h2><p role="status">Preparando os anéis…</p></div>';
    try {
      const game = await load();
      if (token !== revision || !visible) return;
      if (!restore || !game.restoreOnLoad()) game.activate();
    } catch {
      if (token !== revision || !visible) return;
      host.innerHTML =
        '<div class="level-screen"><h2 id="o-selection-title" tabindex="-1">ÓRBITA ·</h2><p role="status">Não foi possível abrir o jogo agora. Seu progresso continua guardado.</p><button id="o-load-retry" class="primary">Tentar novamente</button></div>';
      host.querySelector('#o-load-retry').onclick = () => open(restore);
    }
  }
  function hide() {
    ++revision;
    visible = false;
    if (ui) ui.hide();
    else {
      host.hidden = true;
      try {
        const raw = localStorage.getItem('intuicao.orbita.v1');
        if (raw) {
          const data = JSON.parse(raw);
          if (data?.lastView?.active) {
            data.lastView.active = false;
            writeProgress(localStorage, 'intuicao.orbita.v1', JSON.stringify(data));
          }
        }
      } catch {
        /* Storage failure must not prevent navigation. */
      }
    }
    setActive(false);
  }
  function restoreOnLoad() {
    try {
      const data = JSON.parse(localStorage.getItem('intuicao.orbita.v1') || 'null');
      if (data?.lastView?.active === true && data.lastView.screen === 'play') {
        void open(true);
        return true;
      }
    } catch {
      /* A damaged record belongs only to ÓRBITA. */
    }
    return false;
  }
  if (nav) nav.onclick = () => open();
  return { open, hide, restoreOnLoad, isOpen: () => visible };
}


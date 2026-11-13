import { writeProgress } from '../progress-write-guard.mjs';
// Carregamento sob demanda de REPASSE e abertura ou retomada da partida.
// Catalog and game code load only when REPASSE is opened or resumed.
export function createRepasseRoute({ hideOthers }) {
  let ui = null,
    loading = null,
    revision = 0,
    visible = false;
  const host = document.getElementById('repasse');
  const nav = document.querySelector('[data-repasse]');
  const setActive = (active) => nav?.setAttribute('aria-pressed', String(active));
  const load = () =>
    (loading ??= import('./ui.mjs')
      .then(({ initRepasse }) => {
        ui = initRepasse({ hideOthers });
        return ui;
      })
      .catch((error) => {
        loading = null;
        throw error;
      }));
  async function open(restore = false) {
    const token = ++revision;
    visible = true;
    hideOthers();
    for (const button of document.querySelectorAll('[data-game],[data-collection],[data-sintonia]'))
      button.setAttribute('aria-pressed', 'false');
    setActive(true);
    host.hidden = false;
    if (!ui)
      host.innerHTML =
        '<div class="level-screen"><p class="eyebrow">EXPERIMENTO 07</p><h2 id="r-selection-title" tabindex="-1">REPASSE ·</h2><p role="status">Preparando as peças…</p></div>';
    try {
      const game = await load();
      if (token !== revision || !visible) return;
      if (!restore || !game.restoreOnLoad()) game.activate();
    } catch {
      if (token !== revision || !visible) return;
      host.innerHTML =
        '<div class="level-screen"><h2 id="r-selection-title" tabindex="-1">REPASSE ·</h2><p role="status">Não foi possível abrir o jogo agora. Seu progresso continua guardado.</p><button id="r-load-retry" class="primary">Tentar novamente</button></div>';
      host.querySelector('#r-load-retry').onclick = () => open(restore);
    }
  }
  function hide() {
    ++revision;
    visible = false;
    if (ui) ui.hide();
    else {
      host.hidden = true;
      try {
        const raw = localStorage.getItem('intuicao.repasse.v1');
        if (raw) {
          const data = JSON.parse(raw);
          if (data?.lastView?.active) {
            data.lastView.active = false;
            writeProgress(localStorage, 'intuicao.repasse.v1', JSON.stringify(data));
          }
        }
      } catch {
        /* Navigation remains available when storage is disabled. */
      }
    }
    setActive(false);
  }
  function restoreOnLoad() {
    try {
      const data = JSON.parse(localStorage.getItem('intuicao.repasse.v1') || 'null');
      if (data?.lastView?.active === true && data.lastView.screen === 'play') {
        void open(true);
        return true;
      }
    } catch {
      /* A damaged local record must not prevent other games loading. */
    }
    return false;
  }
  if (nav) nav.onclick = () => open();
  return { open, hide, restoreOnLoad, isOpen: () => visible };
}

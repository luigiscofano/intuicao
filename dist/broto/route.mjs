import { writeProgress } from '../progress-write-guard.mjs';
// Carregamento de BROTO e abertura da preparação ou da retomada do duelo.
// BROTO abre sempre a preparação; retomar o duelo exige escolha explícita.
export function createBrotoRoute({ hideOthers }) {
  let ui = null,
    loading = null,
    revision = 0,
    visible = false;
  const host = document.getElementById('broto'),
    nav = document.querySelector('[data-broto]');
  const setActive = (active) => nav?.setAttribute('aria-pressed', String(active));
  const load = () =>
    (loading ??= import('./ui.mjs')
      .then(({ initBroto }) => (ui = initBroto()))
      .catch((error) => {
        loading = null;
        throw error;
      }));
  async function open(restore = false) {
    const token = ++revision;
    visible = true;
    hideOthers();
    document
      .querySelectorAll(
        '[data-game],[data-collection],[data-sintonia],[data-repasse],[data-orbita]',
      )
      .forEach((b) => b.setAttribute('aria-pressed', 'false'));
    setActive(true);
    host.hidden = false;
    if (!ui)
      host.innerHTML =
        '<div class="level-screen"><h2 id="b-selection-title" tabindex="-1">BROTO ·</h2><p role="status">Preparando o jardim…</p></div>';
    try {
      const game = await load();
      if (token !== revision || !visible) return;
      game.activate();
    } catch {
      if (token !== revision || !visible) return;
      host.innerHTML =
        '<div class="level-screen"><h2 id="b-selection-title" tabindex="-1">BROTO ·</h2><p role="status">Não foi possível abrir BROTO agora. O duelo salvo continua guardado.</p><button id="b-load-retry" class="primary">Tentar novamente</button></div>';
      host.querySelector('#b-load-retry').onclick = () => open(restore);
    }
  }
  function hide() {
    ++revision;
    visible = false;
    if (ui) ui.hide();
    else {
      host.hidden = true;
      try {
        const raw = JSON.parse(localStorage.getItem('intuicao.broto.v1') || 'null');
        if (raw?.lastView?.active) {
          raw.lastView.active = false;
          writeProgress(localStorage, 'intuicao.broto.v1', JSON.stringify(raw));
        }
      } catch {}
    }
    setActive(false);
  }
  function restoreOnLoad() {
    try {
      const raw = JSON.parse(localStorage.getItem('intuicao.broto.v1') || 'null');
      if (raw?.lastView?.active === true) {
        void open(true);
        return true;
      }
    } catch {}
    return false;
  }
  if (nav) nav.onclick = () => open();
  return { open, hide, restoreOnLoad, isOpen: () => visible };
}

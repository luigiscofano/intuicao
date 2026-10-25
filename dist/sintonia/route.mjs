// Load the 500-level catalog only when SINTONIA is opened or resumed.
// The other six games retain their initial loading path.
export function createSintoniaRoute({hideOtherGames}) {
  let ui = null, loading = null, revision = 0, visible = false;
  const host = document.getElementById('sintonia');
  const nav = document.querySelector('[data-sintonia]');
  const setActive = active => nav?.setAttribute('aria-pressed', String(active));
  const load = () => loading ??= import('./ui.mjs').then(({initSintonia}) => {
    ui = initSintonia({hideOtherGames}); return ui;
  }).catch(error => {loading = null; throw error;});

  async function open(restore = false) {
    const token = ++revision;
    visible = true;
    hideOtherGames();
    for (const button of document.querySelectorAll('[data-game],[data-collection]')) button.setAttribute('aria-pressed', 'false');
    setActive(true); host.hidden = false;
    if (!ui) host.innerHTML = '<div class="level-screen"><p class="eyebrow">EXPERIMENTO 07</p><h2 id="s-selection-title" tabindex="-1">SINTONIA ·</h2><p role="status">Preparando os caminhos…</p></div>';
    try {
      const game = await load();
      if (revision !== token || !visible) return;
      if (!restore || !game.restoreOnLoad?.()) game.open();
    } catch {
      if (revision !== token || !visible) return;
      host.innerHTML = '<div class="level-screen"><h2 id="s-selection-title" tabindex="-1">SINTONIA ·</h2><p role="status">Não foi possível abrir o jogo agora. Seu progresso continua guardado.</p><button id="s-load-retry" class="primary">Tentar novamente</button></div>';
      host.querySelector('#s-load-retry').onclick = () => open(restore);
    }
  }
  function hide() {
    ++revision; visible = false;
    if (ui) ui.hide();
    else {
      host.hidden = true;
      try {
        const raw = localStorage.getItem('intuicao.sintonia.v1');
        if (raw) {const data = JSON.parse(raw); if (data?.lastView?.active) {data.lastView.active = false; localStorage.setItem('intuicao.sintonia.v1', JSON.stringify(data));}}
      } catch { /* A disabled store must not block navigation. */ }
    }
    setActive(false);
  }
  function restoreOnLoad() {
    try {
      const data = JSON.parse(localStorage.getItem('intuicao.sintonia.v1') || 'null');
      if (data?.lastView?.active === true && data.lastView.screen === 'play') {void open(true); return true;}
    } catch { /* Other games remain usable when local data is unavailable. */ }
    return false;
  }
  if (nav) nav.onclick = () => open();
  return {open, hide, restoreOnLoad, isOpen: () => visible};
}

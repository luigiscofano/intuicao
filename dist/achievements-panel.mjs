import { renderAchievements } from './achievements.mjs';
import { MISSION_UNLOCK_EVENT } from './achievements/mission-store.mjs';

/** Conquistas são uma consulta sobre a tela atual, não uma troca de partida. */
export function initAchievementsPanel(doc = globalThis.document, win = doc?.defaultView) {
  const trigger = doc?.getElementById('achievements-open');
  const content = doc?.getElementById('achievements');
  if (!trigger || !content || !win) return null;
  const dialog = doc.createElement('dialog');
  dialog.id = 'achievements-dialog';
  dialog.setAttribute('aria-labelledby', 'achievements-panel-title');
  dialog.innerHTML = '<div class="achievements-panel-heading"><h2 id="achievements-panel-title">Conquistas</h2><button type="button" data-achievements-close aria-label="Fechar conquistas">Fechar <span aria-hidden="true">×</span></button></div>';
  dialog.append(content);
  doc.body.append(dialog);
  const closeButton = dialog.querySelector('[data-achievements-close]');
  let origin = null;
  let position = null;
  const refresh = () => { if (dialog.open) renderAchievements(content); };

  const open = () => {
    if (dialog.open) return;
    origin = doc.activeElement;
    position = { left: win.scrollX, top: win.scrollY };
    renderAchievements(content);
    content.hidden = false;
    dialog.showModal();
    trigger.setAttribute('aria-expanded', 'true');
    closeButton.focus({ preventScroll: true });
  };
  const close = () => { if (dialog.open) dialog.close(); };
  closeButton.addEventListener('click', close);
  trigger.addEventListener('click', open);
  dialog.addEventListener('close', () => {
    content.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    // Não reconstruímos a página nem tocamos em seleção, tabuleiro ou save.
    const target = origin?.isConnected ? origin : trigger;
    target.focus({ preventScroll: true });
    if (position) win.scrollTo({ ...position, behavior: 'instant' });
    const url = new URL(win.location.href);
    if (url.searchParams.get('screen') === 'achievements') {
      url.searchParams.delete('screen');
      win.history.replaceState(win.history.state, '', url);
    }
  });
  // O Escape nativo do dialog fecha e restaura o foco pelo mesmo fluxo.
  win.addEventListener('storage', refresh);
  win.addEventListener(MISSION_UNLOCK_EVENT, refresh);
  doc.addEventListener('click', event => {
    const link = event.target.closest?.('a[href="?screen=achievements"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    open();
  });
  return { open, close, get isOpen() { return dialog.open; } };
}

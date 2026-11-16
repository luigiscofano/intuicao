import { victoryTilesMarkup } from './victory-tiles.mjs';

/** Apenas campanhas ativas; duelos e jogos arquivados não recebem este efeito. */
export const LEVEL_FEEDBACK_GAMES = Object.freeze([
  'light', 'cut', 'elo', 'prumo', 'pacto', 'sintonia', 'repasse',
  'pulso', 'foz', 'refugio', 'mirante', 'renovo',
]);
export const LEVEL_FEEDBACK_DURATION = Object.freeze({ victory: 3400, error: 1700, shake: 320 });

export function levelFeedbackBoard(surface, game) {
  const selectors = game === 'light' || game === 'cut' ? '#scene'
    : ['pulso', 'foz', 'refugio', 'mirante', 'renovo'].includes(game) ? '#lg-board'
      : game === 'sintonia' ? '#s-play-area'
        : game === 'repasse' ? '#r-board' : '#c-board';
  return surface.querySelector?.(selectors) ?? surface;
}

export function levelFeedbackMarkup(success) {
  return success
    ? `<div class="level-feedback-card">${victoryTilesMarkup()}<strong>Vitória!</strong><span>Nível concluído</span></div>`
    : '<span class="level-feedback-announcement">Resposta incorreta. Tente novamente.</span>';
}

/** Camada independente do layout: não troca elementos, medidas ou dados do tabuleiro. */
export function createLevelFeedback(surface, clock = globalThis) {
  let dispose = () => {};
  function clear() { dispose(); dispose = () => {}; }
  function show(game, success, { animate = true } = {}) {
    clear();
    if (!LEVEL_FEEDBACK_GAMES.includes(game) || (success && !animate)) return;
    const doc = surface.ownerDocument;
    const win = doc?.defaultView;
    if (!doc?.body || !win) return;
    const board = levelFeedbackBoard(surface, game);
    const layer = doc.createElement('div');
    layer.className = `level-feedback-layer level-feedback-${success ? 'victory' : 'error'}`;
    layer.setAttribute('role', 'status');
    layer.setAttribute('aria-live', 'polite');
    layer.setAttribute('aria-atomic', 'true');
    layer.innerHTML = levelFeedbackMarkup(success);
    const media = win.matchMedia?.('(prefers-reduced-motion: reduce)');
    let animation = null;
    let timer = null;
    let frame = null;
    let closed = false;
    const reduced = () => media?.matches || doc.documentElement.getAttribute('data-ui-reduced-motion') === 'true';
    const syncMotion = () => {
      const stopMotion = reduced();
      layer.classList.toggle('level-feedback-static', stopMotion);
      if (stopMotion) { animation?.cancel(); animation = null; }
    };
    const followBoard = () => {
      if (closed) return;
      const rect = board.getBoundingClientRect();
      if (!board.isConnected || rect.width <= 0 || rect.height <= 0) { clear(); return; }
      Object.assign(layer.style, { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` });
      frame = win.requestAnimationFrame(followBoard);
    };
    const observer = win.MutationObserver ? new win.MutationObserver(syncMotion) : null;
    dispose = () => {
      if (closed) return;
      closed = true;
      if (timer !== null) clock.clearTimeout(timer);
      if (frame !== null) win.cancelAnimationFrame(frame);
      animation?.cancel();
      observer?.disconnect();
      media?.removeEventListener?.('change', syncMotion);
      layer.remove();
    };
    doc.body.append(layer);
    syncMotion();
    observer?.observe(doc.documentElement, { attributes: true, attributeFilter: ['data-ui-reduced-motion'] });
    media?.addEventListener?.('change', syncMotion);
    followBoard();
    if (closed) return;
    if (!success && !reduced() && typeof board.animate === 'function') {
      // translate é independente de transform: preserva escala e ajuste à tela existentes.
      animation = board.animate([
        { translate: '0 0' }, { translate: '-5px 0' }, { translate: '4px 0' },
        { translate: '-3px 0' }, { translate: '2px 0' }, { translate: '0 0' },
      ], { duration: LEVEL_FEEDBACK_DURATION.shake, iterations: 1, easing: 'ease-out' });
    }
    timer = clock.setTimeout(clear, success ? LEVEL_FEEDBACK_DURATION.victory : LEVEL_FEEDBACK_DURATION.error);
  }
  return { show, clear };
}

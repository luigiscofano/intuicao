// ESTALO usa dimensão CSS estável: seleção e prévia não recalculam seu tamanho.
// Ajuste somente de apresentação. Não lê nem grava partidas ou preferências.
export const FIT_BOARD_SELECTOR = [
  '#scene', '#c-board', '#s-boards', '#r-board', '#o-board',
  '#broto .b-lab .b-board-wrap', '#cerco .ce-lab .ce-board-wrap',
  '.logic-lab .logic-board > svg', '.logic-lab .logic-board > div > svg',
  '#versus-games .nv-lab .enlace-board',
  '#versus-games .nv-lab .vazante-river-frame',
  '#versus-games .nv-lab .mosaico-board-wrap',
  '#versus-games .nv-lab .quinhao-plot',
  '#versus-games .nv-lab .dobra-map',
  '#versus-games .nv-lab .acorde-board',
  '#versus-games .nv-lab .lastro-instrument',
].join(',');

export function boardHeightBudget(height) {
  const viewport = Number.isFinite(height) && height > 0 ? height : 768;
  // Reserva espaço para a moldura, pistas externas e navegação, sem encolher textos.
  return Math.max(80, viewport - Math.min(120, Math.max(64, viewport * .14)));
}

export function nextBoardWidth(width, height, budget) {
  if (![width, height, budget].every(Number.isFinite) || width <= 0 || height <= 0 || budget <= 0) return width;
  return height <= budget + 1 ? width : Math.max(1, Math.floor(width * budget / height));
}

export function installBoardFit(doc = globalThis.document, win = globalThis) {
  const root = doc?.getElementById('main');
  if (!root || !win.requestAnimationFrame) return () => {};
  let frame = 0, timer = 0;
  const originals = new WeakMap(), parents = new Map();
  const observer = win.ResizeObserver ? new win.ResizeObserver(entries => {
    let changed = false;
    for (const entry of entries) {
      const width = entry.contentRect.width;
      if (Math.abs((parents.get(entry.target) ?? -1) - width) > .5) {
        parents.set(entry.target, width); changed = true;
      }
    }
    if (changed) schedule();
  }) : null;

  function fit() {
    if (frame) win.cancelAnimationFrame(frame);
    if (timer) win.clearTimeout(timer);
    frame = 0; timer = 0;
    // O zoom voluntário de acessibilidade do navegador continua sob controle do jogador.
    const visual = win.visualViewport;
    const height = visual && Math.abs(visual.scale - 1) < .01 ? visual.height : win.innerHeight;
    const budget = boardHeightBudget(height);
    const liveParents = new Set();
    for (const board of root.querySelectorAll(FIT_BOARD_SELECTOR)) {
      if (board.closest('[hidden]') || !board.getClientRects().length) continue;
      // O enquadramento novo mede também todos os controles do shell.
      if (board.closest('.approved-game-section')) continue;
      const parent = board.parentElement;
      if (parent) {
        liveParents.add(parent);
        if (!parents.has(parent)) { parents.set(parent, parent.clientWidth); observer?.observe(parent); }
      }
      if (!originals.has(board)) originals.set(board, board.style.maxWidth);
      board.style.maxWidth = originals.get(board);
      const measure = () => ({ width: board.offsetWidth || board.getBoundingClientRect().width, height: board.offsetHeight || board.getBoundingClientRect().height });
      let rect = measure();
      // Refinamentos limitados acomodam bordas, pistas e cabeçalhos de SINTONIA.
      for (let step = 0; step < 8 && rect.height > budget + 1; step++) {
        const width = nextBoardWidth(rect.width, rect.height, budget);
        const previousMaxWidth = board.style.maxWidth;
        board.style.maxWidth = `${width}px`;
        const next = measure();
        if (next.height >= rect.height - .5) { board.style.maxWidth = previousMaxWidth; break; }
        rect = next;
      }
      // A largura não altera coordenadas lógicas, transformações, viewBox ou listeners.
    }
    for (const parent of parents.keys()) {
      if (!liveParents.has(parent)) { observer?.unobserve(parent); parents.delete(parent); }
    }
  }
  function schedule() {
    if (frame) return;
    frame = win.requestAnimationFrame(fit);
    // Frames fora da área visível podem ter rAF suspenso. Mantém o tamanho pronto
    // antes de o jogador rolar de volta ao tabuleiro, sem polling permanente.
    if (win.setTimeout) timer = win.setTimeout(fit, 100);
  }
  const mutations = win.MutationObserver ? new win.MutationObserver(schedule) : null;
  mutations?.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden'] });
  win.addEventListener('resize', schedule);
  win.visualViewport?.addEventListener('resize', schedule);
  doc.fonts?.ready.then(schedule);
  schedule();
  return () => {
    mutations?.disconnect(); observer?.disconnect();
    win.removeEventListener('resize', schedule);
    win.visualViewport?.removeEventListener('resize', schedule);
    if (frame) win.cancelAnimationFrame(frame);
    if (timer) win.clearTimeout(timer);
  };
}
if (globalThis.document) installBoardFit();

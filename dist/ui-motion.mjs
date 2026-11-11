/** Microinterações visuais: nenhuma leitura de saves ou alteração do jogo. */
export const UI_MOTION_DURATION = Object.freeze({ category: 180, level: 220, notice: 300 });
const instances = new WeakMap();
const running = new Map();
const HEADING = '.approved-game-heading, .lab-heading, #category-title';
const BOARD = 'canvas, svg, .logic-board, .collection-board, .board, [id$="-board"], #board';

export function prefersReducedUIMotion(doc = globalThis.document, win = doc?.defaultView) {
  return doc?.documentElement?.getAttribute('data-ui-reduced-motion') === 'true' ||
    Boolean(win?.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
}

function cancelForDocument(doc) {
  for (const [element, animation] of running) {
    if (element.ownerDocument === doc) {
      animation.cancel();
      running.delete(element);
    }
  }
}

export function setReducedMotion(reduced, doc = globalThis.document) {
  doc?.documentElement?.setAttribute('data-ui-reduced-motion', String(Boolean(reduced)));
  if (reduced) cancelForDocument(doc);
}

/** Retorna a animação opcional; nunca atrasa a ação nem exige animationend. */
export function animateUIMotion(element, kind, win = element?.ownerDocument?.defaultView) {
  const duration = UI_MOTION_DURATION[kind];
  if (!element || !duration) return null;
  running.get(element)?.cancel();
  running.delete(element);
  if (prefersReducedUIMotion(element.ownerDocument, win) || !element.animate ||
      element.closest?.(BOARD) || element.hidden || element.closest?.('[hidden]')) return null;
  const frames = kind === 'notice'
    ? [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }]
    : [{ opacity: 0 }, { opacity: 1 }];
  const animation = element.animate(frames, { duration, easing: 'cubic-bezier(.2,.7,.2,1)', iterations: 1 });
  running.set(element, animation);
  const release = () => { if (running.get(element) === animation) running.delete(element); };
  animation.finished?.then(release, release);
  return animation;
}

export function initUIMotion(doc = globalThis.document, win = doc?.defaultView) {
  if (!doc?.documentElement) return () => {};
  if (instances.has(doc)) return instances.get(doc);
  doc.documentElement.setAttribute('data-ui-motion', 'true');
  const main = doc.getElementById('main');
  const signatures = new Map();
  let disposed = false;
  const media = win?.matchMedia?.('(prefers-reduced-motion: reduce)');
  const onPreference = () => { if (prefersReducedUIMotion(doc, win)) cancelForDocument(doc); };
  media?.addEventListener?.('change', onPreference);

  function update(initial = false) {
    if (disposed || !main) return;
    for (const heading of main.querySelectorAll(HEADING)) {
      if (heading.hidden || heading.closest('[hidden]')) continue;
      const category = heading.id === 'category-title';
      // Texto de botões, feedback e contadores de jogadas não identificam fases.
      const parts = category ? [heading] : [...heading.querySelectorAll(
        '.approved-game-title, .approved-game-position, h2, [id$="stage-label"]')];
      const signature = parts.map(node => node.textContent.trim()).join('|');
      if (!signature) continue;
      const section = heading.closest('section[id], [id$="-host"], #main');
      const key = category ? 'category' : `${section?.id || 'game'}:${heading.className}`;
      const previous = signatures.get(key);
      signatures.set(key, signature);
      if (!initial && previous !== undefined && previous !== signature) {
        animateUIMotion(category ? doc.querySelector('#main > .games') : heading,
          category ? 'category' : 'level', win);
      }
    }
  }

  const observer = main && win?.MutationObserver ? new win.MutationObserver(records => {
    const relevant = records.some(record => {
      const target = record.target.nodeType === 3 ? record.target.parentElement : record.target;
      if (!target || target.closest?.(BOARD)) return false;
      if (target.closest?.(HEADING)) return true;
      if (record.type === 'attributes') return record.attributeName === 'hidden' && target.contains?.(main.querySelector(HEADING));
      return [...(record.addedNodes || [])].some(node => node.nodeType === 1 &&
        (node.matches?.(HEADING) || node.querySelector?.(HEADING)));
    });
    if (relevant) update();
  }) : null;
  update(true);
  observer?.observe(main, { childList: true, characterData: true, subtree: true,
    attributes: true, attributeFilter: ['hidden'] });
  const preferenceObserver = win?.MutationObserver ? new win.MutationObserver(onPreference) : null;
  preferenceObserver?.observe(doc.documentElement, { attributes: true, attributeFilter: ['data-ui-reduced-motion'] });
  const cleanup = () => {
    disposed = true;
    observer?.disconnect();
    preferenceObserver?.disconnect();
    media?.removeEventListener?.('change', onPreference);
    cancelForDocument(doc);
    doc.documentElement.removeAttribute('data-ui-motion');
    instances.delete(doc);
  };
  instances.set(doc, cleanup);
  return cleanup;
}

// Memória visual efêmera por galeria. Não lê nem escreve persistência.
const progressViews = new WeakMap();
export function syncAchievementProgressMotion(container, { animate = false } = {}) {
  const doc = container?.ownerDocument;
  if (!doc?.createElement || !container?.querySelectorAll) return;
  let previous = progressViews.get(container);
  if (!previous) { previous = new Map(); progressViews.set(container, previous); }
  // Cancelar nós descartados evita referências até o fim da animação anterior.
  for (const [element, animation] of running) {
    if (element.ownerDocument === doc && element.isConnected === false) {
      animation.cancel(); running.delete(element);
    }
  }
  for (const progress of container.querySelectorAll('.achievement-card progress[id]')) {
    const ratio = Math.max(0, Math.min(1, Number(progress.value) / (Number(progress.max) || 1)));
    if (!Number.isFinite(ratio)) continue;
    const old = previous.get(progress.id);
    previous.set(progress.id, ratio);
    if (progress.classList.contains('ui-progress-native')) continue;
    const track = doc.createElement('span');
    track.className = 'ui-progress-track';
    track.setAttribute('aria-hidden', 'true');
    const fill = doc.createElement('span');
    fill.className = 'ui-progress-fill';
    fill.style.transform = `scaleX(${ratio})`;
    track.append(fill);
    progress.after(track);
    progress.classList.add('ui-progress-native');
    // Primeira abertura e filtros mostram o valor real sem representar ganho fictício.
    if (!animate || old === undefined || old === ratio || !fill.animate ||
        prefersReducedUIMotion(doc) || container.closest?.('[hidden]')) continue;
    const animation = fill.animate([{ transform: `scaleX(${old})` }, { transform: `scaleX(${ratio})` }],
      { duration: 240, easing: 'ease-out', iterations: 1 });
    running.set(fill, animation);
    const release = () => { if (running.get(fill) === animation) running.delete(fill); };
    animation.finished?.then(release, release);
  }
}

if (typeof document !== 'undefined') initUIMotion();

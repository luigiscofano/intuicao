// Navigation-only enhancement: never changes a game, progress, or level state.
const ORIGINALS = new Set(['light', 'cut']);
const COLLECTIONS = new Set(['elo', 'prumo', 'pacto', 'desvio']);

export function selectionSelector(button) {
 if (button?.dataset?.infoGame !== undefined) return null;
 if (ORIGINALS.has(button?.dataset?.game)) return '#selection';
 if (COLLECTIONS.has(button?.dataset?.collection)) return '#collection > .level-screen';
 if (button?.dataset?.sintonia !== undefined) return '#sintonia > .level-screen';
 if (button?.dataset?.repasse !== undefined) return '#repasse > .level-screen';
 if (button?.dataset?.vertice !== undefined) return '#vertice > .level-screen';
 if (button?.dataset?.trama !== undefined) return '#trama > .level-screen';
 if (button?.dataset?.cerco !== undefined) return '#cerco > .level-screen';
 if (button?.dataset?.broto !== undefined) return '#broto > .level-screen';
 if (button?.dataset?.orbita !== undefined) return '#orbita > .level-screen';
 return null;
}

export function selectionScrollTop(rectTop, scrollY, maximum, gap = 12) {
 return Math.max(0, Math.min(maximum, rectTop + scrollY - gap));
}

export function easeNavigation(progress) {
 const t = Math.max(0, Math.min(1, progress));
 return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function initGameNavScroll(doc = document, win = window) {
 const nav = doc.querySelector('#main > .games');
 if (!nav) return () => {};
 let revision = 0, frame = null;
 const cancel = () => {
  revision++;
  if (frame !== null) win.cancelAnimationFrame(frame);
  frame = null;
 };
 const instant = (top, left = win.scrollX) => win.scrollTo({top, left, behavior: 'instant'});
 const reduced = () => win.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 const onClick = event => {
  const button = event.target?.closest?.('button[data-game], button[data-collection], button[data-sintonia], button[data-repasse], button[data-orbita], button[data-broto], button[data-cerco], button[data-trama], button[data-vertice]');
  const selector = button && nav.contains(button) && !button.disabled && selectionSelector(button);
  cancel();
  if (!selector || (event.button !== undefined && event.button !== 0)) return;
  const token = revision, originY = win.scrollY, originX = win.scrollX;
  // The existing synchronous onclick renders and focuses its own heading. Restore
  // only that click's scroll before painting, preserving focus and every handler.
  win.queueMicrotask(() => {
   if (revision !== token) return;
   if (win.scrollY !== originY || win.scrollX !== originX) instant(originY, originX);
   frame = win.requestAnimationFrame(() => {
    frame = win.requestAnimationFrame(() => {
     frame = null;
     if (revision !== token || button.getAttribute('aria-pressed') !== 'true') return;
     const target = doc.querySelector(selector);
     if (!target || target.closest('[hidden]') || !target.getClientRects().length) return;
     const maximum = Math.max(0, (doc.scrollingElement || doc.documentElement).scrollHeight - win.innerHeight);
     const end = selectionScrollTop(target.getBoundingClientRect().top, win.scrollY, maximum);
     const start = win.scrollY, distance = end - start;
     if (reduced() || Math.abs(distance) < 1) { instant(end); return; }
     const duration = Math.min(760, Math.max(420, Math.abs(distance) * .45));
     let began;
     const step = now => {
      frame = null;
      if (revision !== token) return;
      if (reduced()) { instant(end); return; }
      began ??= now;
      const progress = Math.min(1, (now - began) / duration);
      instant(start + distance * easeNavigation(progress));
      if (progress < 1) frame = win.requestAnimationFrame(step);
     };
     frame = win.requestAnimationFrame(step);
    });
   });
  });
 };
 // Capture records the viewport before the application's target onclick focuses.
 doc.addEventListener('click', onClick, true);
 const interruptions = ['wheel', 'touchstart', 'touchmove', 'pointerdown', 'keydown'];
 for (const type of interruptions) win.addEventListener(type, cancel, {capture: true, passive: true});
 return () => {
  cancel();
  doc.removeEventListener('click', onClick, true);
  for (const type of interruptions) win.removeEventListener(type, cancel, true);
 };
}

if (typeof document !== 'undefined' && typeof window !== 'undefined') {
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initGameNavScroll(), {once: true});
 else initGameNavScroll();
}

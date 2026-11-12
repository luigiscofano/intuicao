import { startTrace, moveTrace, finishTrace, tracePreviewMarkup } from './trace-model.mjs';

/** Adapta Pointer Events ao motor; cliques curtos e teclado continuam no host. */
export function createRenovoTraceInput(host, { getContext, commit, hint = () => {}, window: win = host.ownerDocument.defaultView }) {
  let gesture = null;
  let suppressClick = null;
  const listeners = [];
  const listen = (target, type, handler, options) => {
    target.addEventListener(type, handler, options);
    listeners.push(() => target.removeEventListener(type, handler, options));
  };
  const boardPoint = (svg, event) => {
    const matrix = svg.getScreenCTM?.();
    if (!matrix) return null;
    const point = svg.createSVGPoint();
    point.x = event.clientX; point.y = event.clientY;
    try { const local = point.matrixTransform(matrix.inverse()); return [local.x, local.y]; }
    catch { return null; }
  };
  const clearPreview = svg => {
    if (!svg) return;
    const overlay = svg.querySelector('.renovo-gesture-preview');
    if (overlay) overlay.innerHTML = '';
    svg.removeAttribute('data-tracing');
  };
  function cancel() {
    if (!gesture) return false;
    const old = gesture;
    gesture = null;
    clearPreview(old.svg);
    // A supressão acompanha o ponteiro até seu click ou um novo pointerdown.
    // Escape continua valendo mesmo se a pessoa mantiver o dedo pressionado.
    suppressClick = { pointerId: old.pointerId };
    try { if (host.hasPointerCapture?.(old.pointerId)) host.releasePointerCapture(old.pointerId); } catch { /* já liberado pelo navegador */ }
    return true;
  }
  const current = () => {
    if (!gesture) return null;
    const context = getContext();
    if (!context || context.level !== gesture.context.level || context.state !== gesture.context.state || !gesture.svg.isConnected) { cancel(); return null; }
    return gesture;
  };
  function advance(event) {
    const active = current();
    if (!active || event.pointerId !== active.pointerId) return;
    if (!active.moved && Math.hypot(event.clientX - active.clientStart[0], event.clientY - active.clientStart[1]) < 6) return;
    if (!active.moved) {
      active.moved = true;
      try { host.setPointerCapture?.(active.pointerId); } catch { /* ponteiro pode ter terminado neste quadro */ }
    }
    if (event.cancelable) event.preventDefault();
    const samples = event.getCoalescedEvents?.() ?? [];
    for (const sample of [...samples, event]) {
      const point = boardPoint(active.svg, sample);
      if (point) active.trace = moveTrace(active.context.level, active.trace, point);
    }
    const overlay = active.svg.querySelector('.renovo-gesture-preview');
    if (overlay) overlay.innerHTML = tracePreviewMarkup(active.context.level, active.trace);
    active.svg.setAttribute('data-tracing', 'true');
  }
  listen(host, 'pointerdown', event => {
    // Uma segunda mão interrompe a rota em vez de juntar dois ponteiros.
    if (gesture && event.pointerId !== gesture.pointerId) { cancel(); return; }
    if (event.button !== 0 || event.isPrimary === false) return;
    suppressClick = null;
    const context = getContext();
    if (!context) return;
    const cell = event.target.closest?.('[data-cell]');
    const svg = cell?.closest?.('.renovo-svg');
    if (!cell || !svg || !host.contains(svg)) return;
    const index = Number(cell.dataset.cell);
    const trace = startTrace(context.level, index);
    if (!trace) return;
    // Não capturar/prevenir ainda: um clique sem arraste usa a interação existente.
    gesture = { context, trace, svg, pointerId: event.pointerId, clientStart: [event.clientX, event.clientY], moved: false };
  });
  listen(win, 'pointermove', advance, { passive: false });
  listen(win, 'pointerup', event => {
    const active = current();
    if (!active || event.pointerId !== active.pointerId) return;
    advance(event);
    if (!active.moved) { gesture = null; return; }
    if (event.cancelable) event.preventDefault();
    const action = finishTrace(active.context.level, active.trace);
    const focusIndex = action?.path.at(-1) ?? active.trace.path[0];
    cancel();
    if (action) commit(action, focusIndex);
    else hint('Traço cancelado. Solte sobre uma peça alinhada, sem pular outras peças.');
  }, { passive: false });
  listen(win, 'pointercancel', event => { if (gesture?.pointerId === event.pointerId) cancel(); });
  // Ao transferir captura implícita da peça para o host, a perda na peça borbulha.
  // Só perder a captura do próprio host interrompe o gesto.
  listen(host, 'lostpointercapture', event => { if (event.target === host && gesture?.pointerId === event.pointerId) cancel(); });
  listen(host, 'click', event => {
    if (!suppressClick) return;
    // Eventos de teclado têm detail=0 e não são o click sintético do ponteiro.
    if (event.detail === 0) return;
    if (event.pointerId !== undefined && event.pointerId !== -1 && event.pointerId !== suppressClick.pointerId) return;
    suppressClick = null;
    event.preventDefault(); event.stopImmediatePropagation();
  }, true);
  listen(win, 'blur', cancel);
  listen(win, 'keydown', event => { if (event.key === 'Escape') cancel(); });
  listen(host.ownerDocument, 'visibilitychange', () => { if (host.ownerDocument.hidden) cancel(); });
  return { cancel, isActive: () => gesture !== null, destroy() { cancel(); listeners.forEach(remove => remove()); } };
}

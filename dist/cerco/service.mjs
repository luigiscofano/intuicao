// Coordenação e cancelamento da busca de CERCO, com worker e alternativa local.
// Uma busca por vez; cancelamento invalida worker e fallback cooperativo.
export function createCercoSearch() {
  let worker = null,
    controller = null,
    rejectPending = null,
    serial = 0;
  function cancel() {
    serial++;
    worker?.terminate();
    worker = null;
    controller?.abort();
    controller = null;
    if (rejectPending) {
      const reject = rejectPending;
      rejectPending = null;
      reject(new DOMException('Busca cancelada', 'AbortError'));
    }
  }
  function search(state, options = {}) {
    cancel();
    const id = serial;
    controller = new AbortController();
    const signal = controller.signal;
    return new Promise((resolve, reject) => {
      rejectPending = reject;
      const done = (result, error) => {
        if (id !== serial || signal.aborted) return;
        worker?.terminate();
        worker = null;
        rejectPending = null;
        error ? reject(error) : resolve(result);
      };
      const fallback = () => {
        if (id !== serial || signal.aborted) return;
        worker?.terminate();
        worker = null;
        import('./bot.mjs')
          .then(({ chooseCercoMoveAsync }) => chooseCercoMoveAsync(state, { ...options, signal }))
          .then(
            (result) => done(result),
            (error) => done(null, error),
          );
      };
      try {
        if (typeof Worker === 'undefined') {
          fallback();
          return;
        }
        worker = new Worker(new URL('./worker.mjs', import.meta.url), { type: 'module' });
        worker.onmessage = (e) => {
          if (e.data?.id !== id) return;
          if (e.data.error) done(null, new Error(e.data.error));
          else done(e.data.result);
        };
        worker.onerror = () => fallback();
        worker.postMessage({ id, state, options });
      } catch {
        fallback();
      }
    });
  }
  return { search, cancel };
}

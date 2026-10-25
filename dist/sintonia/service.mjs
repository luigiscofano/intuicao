// One task per instance. Generation and hint clients use independent workers,
// so a changed hint never cancels a readying Endless level.
const abortError = () => Object.assign(new Error('Tarefa substituída por uma solicitação mais recente.'), {name: 'AbortError'});

export function createSintoniaService({workerFactory, timeoutMs = 18000} = {}) {
  let worker = null, pending = null, serial = 0, destroyed = false;
  const stopWorker = () => {worker?.terminate(); worker = null;};
  function cancel() {
    serial++;
    if (pending) {clearTimeout(pending.timer); pending.reject(abortError()); pending = null;}
    stopWorker();
  }
  async function lightFallback(type, payload) {
    if (type === 'hint') {
      const {analyzePosition} = await import('./analysis.mjs');
      return analyzePosition(payload.level, payload.state, {allowSearch: false});
    }
    const {selectCertifiedFallback} = await import('./fallback.mjs');
    return selectCertifiedFallback(payload.seed, payload.options);
  }
  function run(type, payload) {
    if (destroyed) return Promise.reject(new Error('Este serviço foi encerrado.'));
    cancel();
    const id = serial;
    return new Promise((resolve, reject) => {
      const finish = (error, value) => {
        if (!pending || pending.id !== id) return;
        clearTimeout(pending.timer); pending = null;
        if (error) reject(error); else resolve(value);
      };
      const recover = () => {
        if (!pending || pending.id !== id || pending.recovering) return;
        pending.recovering = true;
        clearTimeout(pending.timer);
        stopWorker();
        lightFallback(type, payload).then(value => finish(null, value), error => finish(error));
      };
      pending = {id, reject, timer: setTimeout(recover, Math.max(50, timeoutMs))};
      try {
        const make = workerFactory ?? (() => new Worker(new URL('./worker.mjs', import.meta.url), {type: 'module', name: 'sintonia-search'}));
        worker = make();
        worker.onmessage = event => {
          const message = event.data;
          if (message?.id !== id || !pending || pending.id !== id) return;
          if (message.ok) finish(null, message.result);
          else recover();
        };
        worker.onerror = event => {event?.preventDefault?.(); if (pending?.id === id) recover();};
        worker.onmessageerror = () => {if (pending?.id === id) recover();};
        worker.postMessage({id, type, ...payload});
      } catch {recover();}
    });
  }
  return {
    generate(seed, options = {}) {return run('generate', {seed: String(seed), options});},
    hint(level, state) {return run('hint', {level, state});},
    cancel,
    destroy() {cancel(); destroyed = true;}
  };
}

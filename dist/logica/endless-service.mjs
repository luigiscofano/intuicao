import { generateLogicChallenge } from './endless-generator.mjs';
const cancelled = () => Object.assign(new Error('Geração cancelada.'), { name: 'AbortError' });
export function createLogicGenerator({ WorkerClass = globalThis.Worker, timeout = 15000, clock = globalThis } = {}) {
  let serial = 0, pending = null;
  function cancel() {
    ++serial;
    if (!pending) return;
    pending.worker?.terminate(); clock.clearTimeout(pending.timer); pending.reject(cancelled()); pending = null;
  }
  return {
    cancel,
    generate(request) {
      cancel(); const id = serial;
      return new Promise((resolve, reject) => {
        const finish = (error, result) => {
          if (pending?.id !== id) return;
          clock.clearTimeout(pending.timer); pending.worker?.terminate(); pending = null;
          if (error) reject(error); else resolve(result);
        };
        pending = { id, reject, worker: null, timer: clock.setTimeout(() => finish(new Error('A geração demorou mais que o esperado. Sua partida foi mantida. Tente novamente.')), timeout) };
        // Worker construction can be unavailable in a private browser context.
        try {
          if (typeof WorkerClass !== 'function') throw new Error('Worker indisponível');
          const worker = new WorkerClass(new URL('./endless-worker.mjs', import.meta.url), { type: 'module' });
          pending.worker = worker;
          worker.onmessage = ({ data }) => { if (data.id === id) finish(data.error ? new Error(data.error) : null, data.result); };
          worker.onerror = () => finish(new Error('Não foi possível carregar o gerador. Sua partida foi mantida. Recarregue a página e tente novamente.'));
          worker.postMessage({ id, request });
        } catch {
          // Each generator has a deterministic operation budget. Never uses a catalogue fallback.
          Promise.resolve().then(() => generateLogicChallenge(request)).then(result => finish(null, result), error => finish(error));
        }
      });
    },
  };
}

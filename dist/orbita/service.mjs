// Coordenação das tarefas de geração e análise de ÓRBITA com cancelamento.
import { ENDLESS_VERSION, isCircularGeneration } from './endless-v2.mjs';
import { certifyGenerated, certifyAnalysis } from './analysis.mjs';

const abortError = () =>
  Object.assign(new Error('Solicitação substituída.'), { name: 'AbortError' });

/** Independent workers keep generation and current-position advice responsive. */
export function createOrbitaService({ workerFactory, timeoutMs = 14000 } = {}) {
  let destroyed = false;
  function channel(type) {
    let worker = null,
      pending = null,
      serial = 0;
    const stop = () => {
      worker?.terminate();
      worker = null;
    };
    function cancel() {
      serial++;
      if (pending) {
        clearTimeout(pending.timer);
        pending.reject(abortError());
        pending = null;
      }
      stop();
    }
    const certify = (payload, result) => {
      if (type === 'generate') {
        if (result?.generatorVersion !== ENDLESS_VERSION || !isCircularGeneration(result?.level))
          throw new Error('O gerador precisa usar a versão circular atual.');
        if (result?.seed !== payload.seed)
          throw new Error('A geração devolveu uma seed diferente da solicitada.');
        return certifyGenerated(result, payload.options);
      }
      return certifyAnalysis(payload.level, payload.state, result);
    };
    async function fallback(payload) {
      if (type === 'generate') {
        const { selectFallback } = await import('./fallback.mjs');
        return certify(payload, selectFallback(payload.seed, payload.options));
      }
      const { analyzePosition } = await import('./analysis.mjs');
      return certify(
        payload,
        analyzePosition(payload.level, payload.state, {
          ...payload.options,
          allowSearch: false,
          maxStates: 0,
          timeoutMs: 0,
        }),
      );
    }
    function run(payload) {
      if (destroyed) return Promise.reject(new Error('O serviço foi encerrado.'));
      cancel();
      const id = serial;
      return new Promise((resolve, reject) => {
        const current = () => pending?.id === id;
        const finish = (error, result) => {
          if (!current()) return;
          clearTimeout(pending.timer);
          pending = null;
          stop();
          if (error) reject(error);
          else resolve(result);
        };
        const recover = () => {
          if (!current() || pending.recovering) return;
          pending.recovering = true;
          clearTimeout(pending.timer);
          stop();
          fallback(payload).then(
            (result) => finish(null, result),
            (error) => finish(error),
          );
        };
        pending = {
          id,
          reject,
          recovering: false,
          timer: setTimeout(recover, Math.max(50, timeoutMs)),
        };
        try {
          const make =
            workerFactory ??
            (() =>
              new Worker(new URL('./worker.mjs', import.meta.url), {
                type: 'module',
                name: `orbita-${type}`,
              }));
          worker = make(type);
          worker.onmessage = (event) => {
            const message = event.data;
            if (!current() || pending.recovering || message?.id !== id) return;
            if (message.ok !== true) {
              recover();
              return;
            }
            try {
              finish(null, certify(payload, message.result));
            } catch {
              recover();
            }
          };
          worker.onerror = (event) => {
            event?.preventDefault?.();
            recover();
          };
          worker.onmessageerror = recover;
          worker.postMessage({ id, type, ...payload });
        } catch {
          recover();
        }
      });
    }
    return { run, cancel };
  }
  const generation = channel('generate'),
    analysis = channel('analyze');
  return {
    generate(seed, options = {}) {
      if (!Number.isSafeInteger(seed) || seed < 0 || seed > 0xffffffff)
        return Promise.reject(new TypeError('Seed inválida.'));
      return generation.run({ seed, options });
    },
    analyze(level, state, options = {}) {
      return analysis.run({ level, state, options });
    },
    cancel() {
      generation.cancel();
      analysis.cancel();
    },
    destroy() {
      generation.cancel();
      analysis.cancel();
      destroyed = true;
    },
  };
}

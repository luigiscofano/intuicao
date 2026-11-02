// Coordenação de geração e análise de REPASSE, incluindo cancelamento do worker.
import { certifyGenerated, certifyAnalysis } from './certification.mjs';

const abortError = () =>
  Object.assign(new Error('Solicitação substituída.'), { name: 'AbortError' });

// Separate channels let a hint and an Endless prefetch run independently.
export function createRepasseService({ workerFactory, timeoutMs = 18000 } = {}) {
  let destroyed = false;
  function channel(type) {
    let worker = null,
      pending = null,
      serial = 0;
    function stop() {
      worker?.terminate();
      worker = null;
    }
    function cancel() {
      serial++;
      if (pending) {
        clearTimeout(pending.timer);
        pending.reject(abortError());
        pending = null;
      }
      stop();
    }
    async function fallback(payload) {
      if (type === 'generate') {
        const { selectFallback } = await import('./fallback.mjs');
        return certifyGenerated(selectFallback(payload.seed, payload.options), payload.options);
      }
      const { analyzePosition } = await import('./analysis.mjs');
      return certifyAnalysis(
        payload.level,
        payload.state,
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
        const finish = (error, value) => {
          if (!current()) return;
          clearTimeout(pending.timer);
          pending = null;
          stop();
          if (error) reject(error);
          else resolve(value);
        };
        const recover = () => {
          if (!current() || pending.recovering) return;
          pending.recovering = true;
          clearTimeout(pending.timer);
          stop();
          fallback(payload).then(
            (value) => finish(null, value),
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
                name: `repasse-${type}`,
              }));
          worker = make(type);
          worker.onmessage = (event) => {
            const message = event.data;
            if (!current() || message?.id !== id || pending.recovering) return;
            if (!message.ok) {
              recover();
              return;
            }
            try {
              const value =
                type === 'generate'
                  ? certifyGenerated(message.result, payload.options)
                  : certifyAnalysis(payload.level, payload.state, message.result);
              finish(null, value);
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

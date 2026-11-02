// Geração e análise de ÓRBITA em uma tarefa separada da interface.
import { generateEndless } from './generator.mjs';
import { selectFallback } from './fallback.mjs';
import { analyzePosition, certifyAnalysis, certifyGenerated } from './analysis.mjs';

self.onmessage = (event) => {
  const { id, type, seed, level, state, options = {} } = event.data ?? {};
  try {
    let result;
    if (type === 'generate') {
      try {
        result = certifyGenerated(generateEndless(seed, options), options);
      } catch {
        result = certifyGenerated(selectFallback(seed, options), options);
      }
    } else if (type === 'analyze') {
      result = certifyAnalysis(
        level,
        state,
        analyzePosition(level, state, {
          ...options,
          maxStates: Math.min(Math.max(0, Number(options.maxStates ?? 40000)), 150000),
          timeoutMs: Math.min(Math.max(0, Number(options.timeoutMs ?? 1800)), 6000),
        }),
      );
    } else throw new Error('Solicitação desconhecida.');
    self.postMessage({ id, ok: true, result });
  } catch (error) {
    self.postMessage({
      id,
      ok: false,
      error: error?.message ?? 'Não foi possível concluir esta solicitação.',
    });
  }
};

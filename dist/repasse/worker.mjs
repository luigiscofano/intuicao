import {generateRepasse} from './generator.mjs';
import {selectFallback} from './fallback.mjs';
import {analyzePosition} from './analysis.mjs';
import {certifyGenerated, certifyAnalysis} from './certification.mjs';

self.onmessage = event => {
  const {id, type, seed, options = {}, level, state} = event.data ?? {};
  try {
    let result;
    if (type === 'generate') {
      try { result = certifyGenerated(generateRepasse(seed, options), options); }
      catch { result = certifyGenerated(selectFallback(seed, options), options); }
    } else if (type === 'analyze') {
      result = certifyAnalysis(level, state, analyzePosition(level, state, {
        ...options,
        maxStates: Math.min(Math.max(0, Number(options.maxStates ?? 150000)), 250000),
        timeoutMs: Math.min(Math.max(0, Number(options.timeoutMs ?? 6000)), 10000)
      }));
    } else throw new Error('Solicitação desconhecida.');
    self.postMessage({id, ok: true, result});
  } catch (error) {
    self.postMessage({id, ok: false, error: error?.message ?? 'Não foi possível concluir a análise.'});
  }
};

import {generateLevel} from './generator.mjs';
import {selectCertifiedFallback} from './fallback.mjs';
import {analyzePosition, verifyGenerated} from './analysis.mjs';

self.onmessage = event => {
  const {id, type, seed, options = {}, level, state} = event.data || {};
  try {
    let result;
    if (type === 'generate') {
      try {
        result = verifyGenerated(generateLevel(seed, {...options,
          maxStates: Math.min(Number(options.maxStates) || 50000, 100000),
          maxMs: Math.min(Number(options.maxMs) || 7000, 10000)}));
      } catch {
        result = verifyGenerated(selectCertifiedFallback(seed, options));
      }
    } else if (type === 'hint') {
      result = analyzePosition(level, state);
    } else throw new Error('Solicitação de análise desconhecida.');
    self.postMessage({id, ok: true, result});
  } catch (error) {
    self.postMessage({id, ok: false, error: error?.message || 'Não foi possível preparar a fase.'});
  }
};

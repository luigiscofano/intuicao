// Execução da busca de jogadas de CERCO em um worker.
import { restoreCerco } from './engine.mjs';
import { chooseCercoMove } from './bot.mjs';
self.onmessage = (event) => {
  const { id, state, options } = event.data || {};
  try {
    const valid = restoreCerco(state);
    if (!valid) throw Error('Estado de CERCO inválido.');
    self.postMessage({ id, result: chooseCercoMove(valid, options || {}) });
  } catch (error) {
    self.postMessage({ id, error: error.message });
  }
};

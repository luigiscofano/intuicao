import {restoreTrama, tramaStateKey} from './engine.mjs';
import {chooseTramaMoveAsync} from './bot.mjs';
let active = null;
self.onmessage = async event => {
  const {id, state, options, type, matchId} = event.data || {};
  if (type === 'cancel') {
    if (active && (id === undefined || id === active.id)) active.controller.abort();
    return;
  }
  active?.controller.abort();
  const task = {id, controller: new AbortController()}; active = task;
  try {
    const valid = restoreTrama(state);
    if (!valid) throw Error('Estado de TRAMA inválido.');
    const result = await chooseTramaMoveAsync(valid, {...options, signal: task.controller.signal});
    if (active === task && !task.controller.signal.aborted) self.postMessage({id, matchId, stateKey: tramaStateKey(valid), result});
  } catch (error) {
    if (active === task && !task.controller.signal.aborted) self.postMessage({id, matchId, error: error.message});
  } finally { if (active === task) active = null; }
};

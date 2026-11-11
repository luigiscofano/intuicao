// Histórico transacional: o motor decide a jogada; este módulo cuida de desfazer/refazer.
const clone = value => structuredClone(value);
export const MAX_HISTORY = 64;

export function createSession(adapter, level) {
  return { levelId: level.id, levelVersion: level.version, states: [adapter.initialState(level)], cursor: 0, failures: 0, assisted: false };
}

export function currentState(session) {
  return session.states[session.cursor];
}

export function restoreSession(adapter, level, saved) {
  const fresh = createSession(adapter, level);
  if (!saved || saved.levelId !== level.id || saved.levelVersion !== level.version) return fresh;
  if (!Array.isArray(saved.states) || !saved.states.length || saved.states.length > MAX_HISTORY) return fresh;
  if (!Number.isInteger(saved.cursor) || saved.cursor < 0 || saved.cursor >= saved.states.length) return fresh;
  // Uma pista alterada ou valor fora dos limites invalida a tentativa, nunca o catálogo.
  try { if (!saved.states.every(state => adapter.isStateValid(level, state))) return fresh; }
  catch { return fresh; }
  return {
    ...fresh,
    states: clone(saved.states),
    cursor: saved.cursor,
    failures: Number.isSafeInteger(saved.failures) ? Math.max(0, Math.min(1000, saved.failures)) : 0,
    assisted: saved.assisted === true,
  };
}

export function replaceState(adapter, level, session, nextState) {
  if (!adapter.isStateValid(level, nextState)) return session;
  if (JSON.stringify(currentState(session)) === JSON.stringify(nextState)) return session;
  const states = [...session.states.slice(0, session.cursor + 1), clone(nextState)].slice(-MAX_HISTORY);
  return { ...session, states, cursor: states.length - 1 };
}

export function applySessionAction(adapter, level, session, action) {
  return replaceState(adapter, level, session, adapter.applyAction(level, currentState(session), action));
}

export function moveHistory(session, delta) {
  const cursor = session.cursor + delta;
  return cursor < 0 || cursor >= session.states.length ? session : { ...session, cursor };
}

export function restartSession(adapter, level, session) {
  // Reiniciar não apaga o histórico de ajuda ou erros usado para liberar o gabarito.
  return { ...createSession(adapter, level), failures: session.failures, assisted: session.assisted };
}

export function applySolution(adapter, level, session) {
  if (session.failures < 3) return session;
  const solution = adapter.solutionState(level);
  if (!adapter.checkState(level, solution).valid) throw new Error('O gabarito desta fase não passou pela verificação.');
  return { ...replaceState(adapter, level, session, solution), assisted: true };
}

export function checkSession(adapter, level, session) {
  const result = adapter.checkState(level, currentState(session));
  return { result, session: result.valid ? session : { ...session, failures: Math.min(1000, session.failures + 1) } };
}

import { createSession, restoreSession, currentState } from './session.mjs';

// Ordem certificada, sem geração: ao terminar o catálogo começa outro ciclo.
export function restoreEndless(adapter, saved) {
  const step = Number.isSafeInteger(saved?.step) && saved.step >= 0 ? saved.step : 0;
  const level = adapter.CAMPAIGN[step % adapter.CAMPAIGN.length];
  return { step, session: restoreSession(adapter, level, saved?.session) };
}

export function endlessLevel(adapter, run) {
  return adapter.CAMPAIGN[run.step % adapter.CAMPAIGN.length];
}

export function advanceEndless(adapter, run) {
  const level = endlessLevel(adapter, run);
  if (!adapter.checkState(level, currentState(run.session)).valid) return run;
  // Evita perda de precisão mesmo em um save extremo, mantendo o ciclo correto.
  const step = run.step < Number.MAX_SAFE_INTEGER ? run.step + 1 : (run.step + 1) % adapter.CAMPAIGN.length;
  return { step, session: createSession(adapter, adapter.CAMPAIGN[step % adapter.CAMPAIGN.length]) };
}

// Uma vitória fica visível antes do avanço. Cancelar invalida callbacks já enfileirados.
export function createEndlessAdvance(clock = globalThis, delay = 1800) {
  let timer = null;
  let revision = 0;
  return {
    schedule(callback) {
      if (timer !== null) return false;
      const token = ++revision;
      timer = clock.setTimeout(() => {
        if (token !== revision) return;
        timer = null;
        callback();
      }, delay);
      return true;
    },
    cancel() {
      ++revision;
      if (timer !== null) clock.clearTimeout(timer);
      timer = null;
    },
  };
}

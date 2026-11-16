import { createSession, restoreSession, currentState } from './session.mjs';
import { normalizeDifficulty, RECENT_LIMIT } from './endless-generator.mjs';
export const ENDLESS_VERSION = 2;
const bounded = n => Number.isSafeInteger(n) && n >= 0 ? Math.min(n, Number.MAX_SAFE_INTEGER - 1) : 0;
export function freshSeed() {
  if (globalThis.crypto?.getRandomValues) return globalThis.crypto.getRandomValues(new Uint32Array(1))[0];
  return Math.floor(Math.random() * 0x100000000) >>> 0;
}
export function validGeneratedLevel(adapter, level) {
  if (!level || level.game !== adapter.GAME.id || level.version !== 1 || !/^endless-[a-z]+-v[0-9]+-[0-9]+-[0-5]$/.test(level.id ?? '')) return false;
  if (JSON.stringify(level).length > 100000 || level.difficulty !== normalizeDifficulty(level.difficulty)) return false;
  const rows = level.rows ?? level.height, cols = level.cols ?? level.width;
  if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows < 2 || cols < 2 || rows > 30 || cols > 30) return false;
  try { return adapter.isStateValid(level, adapter.initialState(level)) && !adapter.checkState(level, adapter.initialState(level)).valid && adapter.checkState(level, adapter.solutionState(level)).valid; }
  catch { return false; }
}
export function restoreEndless(adapter, saved) {
  if (!saved || typeof saved !== 'object') return null;
  if (saved.version === ENDLESS_VERSION) {
    if (!validGeneratedLevel(adapter, saved.level)) return null;
    return { version: ENDLESS_VERSION, baseSeed: Number(saved.baseSeed) >>> 0, step: bounded(saved.step), solved: bounded(saved.solved), difficulty: normalizeDifficulty(saved.difficulty), seed: Number(saved.seed) >>> 0, generatorVersion: saved.generatorVersion ?? 1, level: structuredClone(saved.level), currentCompleted: saved.currentCompleted === true, autoAdvance: saved.autoAdvance !== false, recentSignatures: Array.isArray(saved.recentSignatures) ? saved.recentSignatures.filter(x => typeof x === 'string' && /^[0-9a-f]{16}$/.test(x)).slice(-RECENT_LIMIT) : [], session: restoreSession(adapter, saved.level, saved.session) };
  }
  if (saved.version != null && saved.version !== 1) return null;
  // Preserve the current attempt of the former catalogue sequence only. Its successor is generated.
  if (Number.isSafeInteger(saved.step) && saved.step >= 0) {
    const level = adapter.CAMPAIGN[saved.step % adapter.CAMPAIGN.length];
    return { version: 1, legacy: true, baseSeed: Number.isInteger(saved.baseSeed) ? Number(saved.baseSeed) >>> 0 : freshSeed(), step: bounded(saved.step), solved: bounded(saved.solved ?? saved.step), currentCompleted: saved.currentCompleted === true, difficulty: normalizeDifficulty(level.difficulty), level, recentSignatures: [], autoAdvance: saved.autoAdvance !== false, session: restoreSession(adapter, level, saved.session) };
  }
  return null;
}
export const endlessLevel = (adapter, run) => run.level;
export function acceptGeneratedChallenge(adapter, generated, previous = null, { difficulty = previous?.difficulty ?? 0, baseSeed = previous?.baseSeed ?? freshSeed(), fresh = false } = {}) {
  if (!validGeneratedLevel(adapter, generated?.level)) throw new Error('O desafio gerado não passou pela verificação. Sua partida foi mantida.');
  const step = fresh || !previous ? 0 : bounded(previous.step + 1);
  return { version: ENDLESS_VERSION, baseSeed: Number(baseSeed) >>> 0, step, solved: fresh ? 0 : bounded(previous?.solved), difficulty: normalizeDifficulty(difficulty), seed: generated.seed, generatorVersion: generated.generatorVersion, level: generated.level, currentCompleted: false, autoAdvance: previous?.autoAdvance !== false, recentSignatures: [...(previous?.recentSignatures ?? []), generated.signature].slice(-RECENT_LIMIT), session: createSession(adapter, generated.level) };
}
export function markEndlessCompleted(adapter, run) {
  if (run.currentCompleted || !adapter.checkState(run.level, currentState(run.session)).valid) return run;
  return { ...run, solved: bounded((run.solved ?? 0) + 1), currentCompleted: true };
}
export function advanceEndless(adapter, run, generated) {
  if (!adapter.checkState(run.level, currentState(run.session)).valid || !generated) return run;
  return acceptGeneratedChallenge(adapter, generated, markEndlessCompleted(adapter, run));
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

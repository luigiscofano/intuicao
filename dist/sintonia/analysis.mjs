// Análise de SINTONIA e certificação de soluções usando as regras ativas.
import { validateActiveSintoniaLevel } from './active-rules.mjs';
import {
  initialState,
  stateKey,
  transition,
  isWon,
  validateLevel,
  validateState,
  replay,
  solveLevel,
} from './engine.mjs';

// A stored witness is useful only when the complete current logical state lies
// on its path. Positions alone are insufficient after keys or bridges change.
export function certifiedSuffix(level, state) {
  if (!validateLevel(level).valid || !validateState(level, state).valid) return null;
  if (isWon(level, state))
    return { status: 'solved', solution: [], visited: 0, optimal: true, source: 'already-won' };
  const solution = level.solution;
  if (!Array.isArray(solution) || solution.length > 10000) return null;
  const target = stateKey(state);
  let current = initialState(level),
    match = null;
  for (let i = 0; i <= solution.length; i++) {
    if (stateKey(current) === target) match = i;
    if (i < solution.length) {
      if (!['up', 'right', 'down', 'left'].includes(solution[i])) return null;
      current = transition(level, current, solution[i]).state;
    }
  }
  if (match === null || !isWon(level, current)) return null;
  const suffix = solution.slice(match),
    verified = replay(level, suffix, { state });
  if (!verified.valid || !verified.won) return null;
  return {
    status: 'solved',
    solution: suffix,
    visited: 0,
    optimal: false,
    source: 'replayed-witness',
  };
}

export function analyzePosition(
  level,
  state,
  { allowSearch = true, maxStates = 70000, maxMs = 2200 } = {},
) {
  const validation = validateLevel(level);
  if (!validation.valid)
    return {
      status: 'inconclusive',
      reason: 'invalid-level',
      errors: validation.errors,
      visited: 0,
    };
  const stateValidation = validateState(level, state);
  if (!stateValidation.valid)
    return {
      status: 'inconclusive',
      reason: 'invalid-state',
      errors: stateValidation.errors,
      visited: 0,
    };
  const suffix = certifiedSuffix(level, state);
  if (suffix) return suffix;
  if (!allowSearch) return { status: 'inconclusive', reason: 'worker-unavailable', visited: 0 };
  const result = solveLevel(level, {
    state,
    maxStates: Math.max(1, Math.min(maxStates, 120000)),
    maxMs: Math.max(1, Math.min(maxMs, 3500)),
    maxDepth: 180,
  });
  if (result.status === 'solved') {
    const checked = replay(level, result.solution, { state });
    if (!checked.valid || !checked.won)
      return { status: 'inconclusive', reason: 'verification-failed', visited: result.visited };
  }
  return result;
}

// Confere o desafio gerado antes de aceitá-lo na sessão.
export function verifyGenerated(result) {
  if (!result?.level || !validateActiveSintoniaLevel(result.level).valid)
    throw new Error('A fase gerada não passou pela validação.');
  const solution = result.solution ?? result.level.solution;
  if (!Array.isArray(solution) || solution.length > 10000)
    throw new Error('Falta uma solução verificável para esta fase.');
  const check = replay(result.level, solution);
  if (!check.valid || !check.won) throw new Error('A solução desta fase não pôde ser confirmada.');
  return {
    ...result,
    level: { ...result.level, solution: [...solution] },
    solution: [...solution],
    validation: { ...result.validation, valid: true, replay: true },
  };
}

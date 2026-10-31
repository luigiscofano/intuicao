import {legalTramaMoves, applyTramaMove, analyzeBoard} from './engine.mjs';
export const TRAMA_BOT_LEVELS = Object.freeze({
  beginner: {depth: 0, nodes: 1}, intermediate: {depth: 1, nodes: 1400}, strong: {depth: 4, nodes: 10000}
});
function features(state, owner) {
  const graph = state.graphs?.[owner] || analyzeBoard(state.board).graphs[owner];
  // Componentes contam mais que traços. Pontes expostas são menos robustas.
  const groups = new Map();
  graph.components.forEach((component, index) => component.forEach(cell => groups.set(cell, index)));
  let mergePotential = 0;
  for (let cell = 0; cell < 36; cell++) {
    if (state.board[cell] !== null) continue;
    const linked = new Set(), row = Math.floor(cell / 6), col = cell % 6;
    for (const node of graph.nodes) {
      const dr = Math.abs(Math.floor(node / 6) - row), dc = Math.abs(node % 6 - col);
      if (dr && dc) continue;
      if (dr + dc === 1 || (dr + dc === 2 && state.board[(node + cell) / 2] === null)) linked.add(groups.get(node));
    }
    if (linked.size > 1) mergePotential = Math.max(mergePotential, [...linked].reduce((sum, i) => sum + graph.components[i].length, 1));
  }
  return 30 * graph.maxSize + 3 * graph.components.reduce((n, c) => n + c.length ** 2, 0) +
    8 * mergePotential - 3 * graph.edges.filter(e => e.midpoint !== null).length;
}
export function evaluateTrama(state, owner) {
  if (state.over) return state.winner === 'draw' ? 0 : state.winner === owner ? 100000 : -100000;
  return features(state, owner) - features(state, 1 - owner);
}
/** Orçamento inclui a triagem tática. Não representa uma solução exata. */
export function* tramaSearch(state, options = {}) {
  const difficulty = Object.hasOwn(TRAMA_BOT_LEVELS, options.difficulty) ? options.difficulty : 'intermediate';
  const spec = TRAMA_BOT_LEVELS[difficulty];
  // Até 36 candidatas × 35 respostas: reserva suficiente para não pular ameaças.
  const nodeBudget = difficulty === 'beginner' ? 1 : Math.max(1400, Math.min(30000, Number.isInteger(options.nodeBudget) ? options.nodeBudget : spec.nodes));
  const legal = legalTramaMoves(state), root = state.player;
  let nodes = 0, depth = 0;
  const result = (move, extra = {}) => ({move, nodes, depth, limited: true, nodeBudget, difficulty, ...extra});
  if (!legal.length) return result(null);
  if (difficulty === 'beginner') {
    let seed = Number.isInteger(options.seed) ? options.seed >>> 0 : (Math.random() * 4294967296) >>> 0;
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return result(legal[seed % legal.length]);
  }
  let candidates = [];
  for (const move of legal) {
    const next = applyTramaMove(state, move).state; nodes++;
    if (nodes % 24 === 0) yield;
    if (next.winner === root) return result(move, {immediateWin: true});
    candidates.push({move, state: next, unsafe: false, score: evaluateTrama(next, root)});
  }
  for (const candidate of candidates) {
    for (const reply of legalTramaMoves(candidate.state)) {
      const next = applyTramaMove(candidate.state, reply).state; nodes++;
      if (nodes % 24 === 0) yield;
      if (next.winner === 1 - root) { candidate.unsafe = true; break; }
    }
  }
  const safe = candidates.filter(candidate => !candidate.unsafe);
  if (safe.length) candidates = safe;
  candidates.sort((a, b) => b.score - a.score || a.move - b.move);
  let best = candidates[0].move;
  depth = 1;
  function* search(position, remaining, alpha, beta) {
    if (position.over || remaining === 0) return evaluateTrama(position, root);
    const maximize = position.player === root;
    let value = maximize ? -Infinity : Infinity;
    for (const move of legalTramaMoves(position)) {
      if (nodes >= nodeBudget) return null;
      const next = applyTramaMove(position, move).state; nodes++;
      if (nodes % 24 === 0) yield;
      const score = yield* search(next, remaining - 1, alpha, beta);
      if (score === null) return null;
      value = maximize ? Math.max(value, score) : Math.min(value, score);
      if (maximize) alpha = Math.max(alpha, value); else beta = Math.min(beta, value);
      if (beta <= alpha) break;
    }
    return Number.isFinite(value) ? value : evaluateTrama(position, root);
  }
  if (difficulty === 'strong') for (let targetDepth = 2; targetDepth <= spec.depth && nodes < nodeBudget; targetDepth++) {
    let complete = true, choice = best, bestScore = -Infinity;
    for (const candidate of candidates) {
      const score = yield* search(candidate.state, targetDepth - 1, bestScore, Infinity);
      if (score === null) { complete = false; break; }
      if (score > bestScore) { bestScore = score; choice = candidate.move; }
    }
    if (!complete) break;
    best = choice; depth = targetDepth;
  }
  return result(best, {avoidedImmediateLoss: safe.length > 0 && safe.length < legal.length});
}
export function chooseTramaMove(state, options = {}) {
  const search = tramaSearch(state, options);
  let step; do { step = search.next(); } while (!step.done);
  return step.value;
}
/** Cada lote devolve a execução ao navegador, inclusive sem Worker disponível. */
export async function chooseTramaMoveAsync(state, options = {}) {
  const search = tramaSearch(state, options);
  for (;;) {
    if (options.signal?.aborted) throw new DOMException('Busca cancelada', 'AbortError');
    const step = search.next();
    if (step.done) return step.value;
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}

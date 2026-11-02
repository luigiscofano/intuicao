// Métricas de autoria das fases de ÓRBITA e evidências dos encontros entre anéis.
import { createEngine } from './engine.mjs';
import { encounterMatrix } from './diversity.mjs';

/** All simple ring paths. Port multiplicity is structural, not a promise of legal transport. */
export function graphRouteEvidence(level) {
  const matrix = encounterMatrix(level),
    pairs = [];
  for (let from = 0; from < matrix.length; from++)
    for (let to = from + 1; to < matrix.length; to++) {
      const paths = [];
      function visit(at, path, ports) {
        if (at === to) {
          paths.push({ rings: path.map((i) => level.rings[i].id), portCombinations: ports });
          return;
        }
        for (let next = 0; next < matrix.length; next++)
          if (matrix[at][next] && !path.includes(next))
            visit(next, [...path, next], ports * matrix[at][next]);
      }
      visit(from, [from], 1);
      pairs.push({
        from: level.rings[from].id,
        to: level.rings[to].id,
        simpleRingPaths: paths.length,
        portDistinctRoutes: paths.reduce((n, p) => n + p.portCombinations, 0),
        shortestRegionDistance: paths.length
          ? Math.min(...paths.map((p) => p.rings.length - 1))
          : null,
        paths,
      });
    }
  return {
    interpretation:
      'structural paths only; occupancy, steps and sensors may constrain legal transport',
    pairs,
    totalSimpleRingPaths: pairs.reduce((n, p) => n + p.simpleRingPaths, 0),
    totalPortDistinctRoutes: pairs.reduce((n, p) => n + p.portDistinctRoutes, 0),
    pairsWithAlternativeRoutes: pairs.filter((p) => p.portDistinctRoutes > 1).length,
  };
}
function identity(level) {
  return Object.fromEntries(level.cells.map((c) => [c.id, c.id]));
}
function moveTokens(tokens, movements) {
  const next = { ...tokens };
  for (const m of movements) next[m.to] = tokens[m.from];
  return next;
}
function permutationResult(tokens) {
  const support = Object.keys(tokens).filter((id) => tokens[id] !== id),
    destination = Object.fromEntries(Object.entries(tokens).map(([to, from]) => [from, to])),
    seen = new Set(),
    cycles = [];
  for (const start of support)
    if (!seen.has(start)) {
      const cycle = [];
      let at = start;
      do {
        seen.add(at);
        cycle.push(at);
        at = destination[at];
      } while (at !== start);
      cycles.push(cycle);
    }
  return {
    support,
    supportSize: support.length,
    cycles,
    restoredCells: Object.keys(tokens).length - support.length,
  };
}
/** Shadow identities use actual engine movement records; visible symbol equivalence remains unchanged. */
export function referencePermutationEvidence(level, moves = level.solution) {
  const engine = createEngine(level);
  let state = engine.initialState(),
    tokens = identity(level);
  const trace = [];
  for (let i = 0; i < moves.length; i++) {
    const next = engine.transition(state, moves[i]);
    if (!next.allowed) return { valid: false, invalidMove: i, reason: next.reasonCode };
    tokens = moveTokens(tokens, next.movements);
    trace.push({
      move: { ...moves[i] },
      movements: next.movements,
      affectedRings: next.affectedRings,
    });
    state = next.state;
  }
  const localized = [];
  for (let start = 0; start < trace.length; start++) {
    let shadow = identity(level);
    const rings = new Set();
    for (let end = start; end < Math.min(trace.length, start + 12); end++) {
      shadow = moveTokens(shadow, trace[end].movements);
      trace[end].affectedRings.forEach((r) => rings.add(r));
      if (end - start < 2 || rings.size < 2) continue;
      const effect = permutationResult(shadow);
      if (effect.supportSize >= 2 && effect.supportSize <= 4)
        localized.push({
          start,
          endExclusive: end + 1,
          moves: moves.slice(start, end + 1),
          ...effect,
        });
    }
  }
  localized.sort(
    (a, b) => a.moves.length - b.moves.length || a.supportSize - b.supportSize || a.start - b.start,
  );
  return {
    valid: true,
    solved: engine.isWon(state),
    ...permutationResult(tokens),
    localizedCertificates: localized.slice(0, 8),
    localizedSearch: {
      method: 'contiguous windows of the legal reference route',
      maximumWindow: 12,
      found: localized.length,
      exhaustiveBeyondReference: false,
    },
    interpretation:
      'Distinct shadow identities certify positional permutation; identical visible symbols remain interchangeable.',
  };
}
function searchWithout(engine, excluded, { maxDepth, maxStates }) {
  const initial = engine.initialState(),
    nodes = [{ state: initial, depth: 0, parent: -1, move: null }],
    seen = new Set([engine.key(initial)]);
  if (engine.isWon(initial))
    return { status: 'solved', solution: [], visited: 1, minimumWithinRestriction: 0 };
  let head = 0,
    depthTruncated = false,
    fullyExpandedDepth = -1;
  const path = (index) => {
    const out = [];
    while (nodes[index].parent >= 0) {
      out.push(nodes[index].move);
      index = nodes[index].parent;
    }
    return out.reverse();
  };
  while (head < nodes.length) {
    const index = head++,
      node = nodes[index];
    if (node.depth >= maxDepth) {
      depthTruncated = true;
      continue;
    }
    if (index > 0 && nodes[index - 1].depth < node.depth) fullyExpandedDepth = node.depth - 1;
    for (const move of engine.allowedMoves(node.state)) {
      if (move.command === excluded) continue;
      const next = engine.transition(node.state, move),
        key = engine.key(next.state);
      if (seen.has(key)) continue;
      if (seen.size >= maxStates)
        return {
          status: 'inconclusive',
          reason: 'state-budget',
          visited: seen.size,
          completeDepth: Math.max(0, fullyExpandedDepth),
          necessityProven: false,
        };
      const child = nodes.length;
      nodes.push({ state: next.state, depth: node.depth + 1, parent: index, move });
      seen.add(key);
      if (engine.isWon(next.state))
        return {
          status: 'solved',
          solution: path(child),
          visited: seen.size,
          minimumWithinRestriction: node.depth + 1,
          necessityProven: false,
        };
    }
  }
  return depthTruncated
    ? {
        status: 'inconclusive',
        reason: 'depth-budget',
        visited: seen.size,
        completeDepth: maxDepth,
        necessityProven: false,
      }
    : {
        status: 'unreachable-without-command',
        visited: seen.size,
        reachableGraphExhausted: true,
        necessityProven: true,
      };
}
/** Necessity is asserted ONLY after exhausting the complete restricted reachable graph. */
export function commandAblationEvidence(
  level,
  { maxDepth = 3, maxStates = 3000, commands = level.commands.map((c) => c.id) } = {},
) {
  maxDepth = Math.max(0, Math.min(12, Math.floor(maxDepth)));
  maxStates = Math.max(1, Math.min(50000, Math.floor(maxStates)));
  const engine = createEngine(level);
  return {
    method: 'breadth-first search with one command disabled; all other engine rules unchanged',
    bounds: { maxDepth, maxStates },
    commands: commands.map((command) => ({
      command,
      ...searchWithout(engine, command, { maxDepth, maxStates }),
    })),
  };
}
export function designEvidence(level, { ablation = false, maxDepth = 3, maxStates = 3000 } = {}) {
  return {
    routes: graphRouteEvidence(level),
    permutation: referencePermutationEvidence(level),
    ...(ablation
      ? { commandAblation: commandAblationEvidence(level, { maxDepth, maxStates }) }
      : {}),
  };
}

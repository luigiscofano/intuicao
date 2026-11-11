export function rowPatterns(cols) {
  const patterns = [];
  for (let distance = 1; distance * 2 < cols; distance++) for (let start = 0; start + distance * 2 < cols; start++)
    patterns.push(Array.from({ length: cols }, (_, col) => Number(col === start || col === start + distance || col === start + distance * 2)));
  return patterns;
}

/** Restrições lineares de capacidade: cotas, diferenças de duas colunas e
 * comparação entre uma coluna e duas outras. Não são tentativas de tabuleiros.
 */
function constraints(level, strength) {
  const weights = [];
  for (let a = 0; a < level.cols; a++) {
    const v = Array(level.cols).fill(0); v[a] = 1; weights.push({ v, kind: 0 });
  }
  if (strength >= 1) for (let a = 0; a < level.cols; a++) for (let b = a + 1; b < level.cols; b++) {
    for (const sign of [-1, 1]) {
      const v = Array(level.cols).fill(0); v[a] = 1; v[b] = sign; weights.push({ v, kind: 1 });
    }
  }
  if (strength >= 2) for (let a = 0; a < level.cols; a++) for (let b = 0; b < level.cols; b++) for (let c = b + 1; c < level.cols; c++) {
    if (a === b || a === c) continue;
    const v = Array(level.cols).fill(0); v[a] = 1; v[b] = -1; v[c] = -1; weights.push({ v, kind: 2 });
  }
  if (strength >= 2) for (let a = 0; a < level.cols; a++) for (let b = a + 1; b < level.cols; b++) for (let c = b + 1; c < level.cols; c++) {
    const v = Array(level.cols).fill(0); v[a] = v[b] = v[c] = 1; weights.push({ v, kind: 2 });
  }
  return weights.map(({ v, kind }) => ({ v, kind, total: v.reduce((sum, x, i) => sum + x * level.quotas[i], 0) }));
}

export function solvePulso(level, { strength = 2, search = true, limit = 2, maxNodes = 100000 } = {}) {
  const patterns = rowPatterns(level.cols);
  const equations = constraints(level, strength).map(e => ({ ...e, values: patterns.map(p => p.reduce((sum, x, i) => sum + x * e.v[i], 0)) }));
  const initial = Array.from({ length: level.rows }, (_, row) => patterns.flatMap((p, index) =>
    Object.entries(level.givens).every(([cell, value]) => Math.floor(Number(cell) / level.cols) !== row || p[Number(cell) % level.cols] === value) ? [index] : []));
  const metrics = { nodes: 0, branches: 0, maxDepth: 0, rounds: 0, removals: [0, 0, 0], initialCandidates: initial.reduce((n, d) => n + d.length, 0) };
  let complete = true;
  const solutions = [];
  let rootDomains;
  function propagate(domains) {
    let changed = true;
    while (changed) {
      changed = false;
      metrics.rounds++;
      if (domains.some(d => !d.length)) return false;
      for (const equation of equations) {
        const bounds = domains.map(d => {
          const values = d.map(index => equation.values[index]);
          return [Math.min(...values), Math.max(...values)];
        });
        const lower = bounds.reduce((n, b) => n + b[0], 0), upper = bounds.reduce((n, b) => n + b[1], 0);
        if (equation.total < lower || equation.total > upper) return false;
        for (let row = 0; row < domains.length; row++) {
          const next = domains[row].filter(index => {
            const value = equation.values[index];
            return value + lower - bounds[row][0] <= equation.total && value + upper - bounds[row][1] >= equation.total;
          });
          if (!next.length) return false;
          if (next.length !== domains[row].length) {
            metrics.removals[equation.kind] += domains[row].length - next.length;
            domains[row] = next; changed = true;
          }
        }
      }
    }
    return true;
  }
  function visit(domains, depth) {
    if (++metrics.nodes > maxNodes) { complete = false; return; }
    metrics.maxDepth = Math.max(depth, metrics.maxDepth);
    if (!propagate(domains)) return;
    if (depth === 0) rootDomains = domains.map(d => d.slice());
    if (domains.every(d => d.length === 1)) {
      solutions.push(domains.flatMap(d => patterns[d[0]])); return;
    }
    if (!search) { complete = false; return; }
    const row = domains.map((d, i) => [d.length, i]).filter(([n]) => n > 1).sort((a, b) => a[0] - b[0])[0][1];
    metrics.branches++;
    for (const choice of domains[row]) {
      const next = domains.map(d => d.slice()); next[row] = [choice];
      visit(next, depth + 1);
      if (solutions.length >= limit || !complete) { complete = false; return; }
    }
  }
  visit(initial, 0);
  return { count: solutions.length, complete, solutions, metrics, rootDomains };
}

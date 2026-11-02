// Testes e verificações de ELO.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  eloEdges,
  eloPointAllowed,
  validateElo,
  solveElo,
  analyzeEloLocal,
} from '../dist/elo-rules.mjs';
import {
  validateGeometry,
  solveGeometry,
  geometryLocalAnalysis,
  geometryHint,
} from '../dist/geometry-games.mjs';
let checks = 0;
const test = (name, fn) => {
  fn();
  checks++;
  console.log('PASS', name);
};
const base = { game: 'elo', rows: 3, cols: 3, regions: [0, 0, 1, 0, 0, 1, 3, 3, 2], fixed: {} },
  answer = [0, 2, 8, 6];
const straight = { game: 'elo', rows: 3, cols: 3, regions: [0, 4, 1, 0, 4, 1, 3, 3, 2], fixed: {} },
  straightAnswer = [0, 2, 8, 6, 1];
const withRules = (rules, l = base) => ({ ...l, constraints: rules });
const has = (l, p, code) => validateElo(l, p).violations.some((v) => v.code === code);

test('Classical visibility, straight points, region boundaries and alternative solutions', () => {
  assert.ok(validateElo(base, answer).complete);
  assert.ok(validateGeometry(base, answer).complete);
  assert.ok(validateElo(straight, straightAnswer).complete);
  assert.deepEqual(eloEdges(straight, straightAnswer), [
    [0, 4],
    [0, 3],
    [1, 2],
    [3, 2],
    [4, 1],
  ]);
  const alt = [3, 5, 8, 6];
  assert.ok(validateElo(base, alt).complete);
  assert.notDeepEqual(alt, answer);
  const trap = { ...base };
  Object.defineProperty(trap, 'solution', {
    get() {
      throw Error('Read answer');
    },
  });
  assert.ok(validateElo(trap, answer).complete);
  assert.ok(solveElo(trap, {}, 2).count);
});
test('Curves and straight clues constrain directions, not point positions', () => {
  assert.ok(
    validateElo(withRules({ shapes: { 0: 'turn', 4: 'straight' } }, straight), straightAnswer)
      .complete,
  );
  assert.ok(has(withRules({ shapes: { 0: 'straight' } }), answer, 'shape'));
  assert.equal(validateElo(withRules({ shapes: { 0: 'turn' } }), [0, -1, -1, -1]).valid, true);
});
test('Passages are strict interiors, never point positions or visibility walls', () => {
  const l = withRules({ passages: [1, 7] });
  assert.ok(validateElo(l, answer).complete);
  assert.equal(eloPointAllowed(l, 1), false);
  assert.equal(has(l, [1, 2, 8, 6], 'passage-point'), true);
  assert.deepEqual(eloEdges(l, answer), eloEdges(base, answer));
  const partial = validateElo(l, [0, -1, -1, -1]);
  assert.ok(partial.valid);
  assert.ok(partial.pending.some((v) => v.code === 'passage'));
  assert.equal(
    eloPointAllowed({ ...base, regions: [...base.regions.slice(0, 8), null] }, 8),
    false,
  );
  assert.equal(eloPointAllowed(l, -1), false);
  assert.equal(eloPointAllowed(l, 0.5), false);
});
test('Forbidden unit intervals invalidate traversal without changing connections', () => {
  const l = withRules({ forbiddenEdges: [[0, 1]] });
  assert.ok(has(l, answer, 'forbidden-edge'));
  assert.deepEqual(eloEdges(l, answer), eloEdges(base, answer));
  assert.ok(has(l, [0, 2, -1, -1], 'forbidden-edge'));
  assert.ok(has(withRules({ forbiddenEdges: [[0, 2]] }), answer, 'constraint'));
});
test('Counts include fixed points but not traversing segments', () => {
  const l = {
    ...withRules({ rowCounts: { 0: 2, 1: 0, 2: 2 }, colCounts: { 0: 2, 1: 0, 2: 2 } }),
    fixed: { 0: 0 },
  };
  assert.ok(validateElo(l, answer).complete);
  assert.ok(has({ ...l, constraints: { rowCounts: { 0: 1 } } }, [0, 2, -1, -1], 'row-count'));
  const d = analyzeEloLocal(l, {}, { maxMs: Infinity });
  assert.equal(d.contradiction, false);
  assert.ok(d.candidates[0].includes(0));
});
test('Distance uses interval lengths and may shrink after subdivision', () => {
  const l = withRules({ distances: { 0: 3, 4: 2 } }, straight);
  assert.ok(validateElo(l, straightAnswer).complete);
  const partial = validateElo(l, [0, 2, 8, 6, -1]);
  assert.ok(partial.valid);
  assert.ok(partial.pending.some((v) => v.code === 'distance'));
  const a = analyzeEloLocal(l, [0, 2, 8, 6, -1], { maxMs: Infinity });
  assert.equal(a.contradiction, false);
  assert.deepEqual(a.candidates[4], [1]);
  assert.ok(has(withRules({ distances: { 0: 5 } }), answer, 'distance'));
});
test('Mandatory neighbors require direct visibility, not merely a path', () => {
  assert.ok(
    validateElo(
      withRules({
        neighbors: [
          [0, 1],
          [0, 3],
        ],
      }),
      answer,
    ).complete,
  );
  assert.ok(has(withRules({ neighbors: [[0, 2]] }), answer, 'neighbor'));
  assert.ok(has(withRules({ neighbors: [[0, 1]] }, straight), straightAnswer, 'neighbor'));
});
test('Order accepts rotations and reversal and ignores insertion order', () => {
  for (const order of [
    [0, 1, 2, 3],
    [2, 3, 0, 1],
    [3, 2, 1, 0],
  ])
    assert.ok(validateElo(withRules({ order }), answer).complete);
  assert.ok(has(withRules({ order: [0, 2, 1, 3] }), answer, 'order'));
  const l = withRules({ order: [0, 1, 2, 3] }, straight);
  assert.ok(validateElo(l, straightAnswer).complete);
  assert.ok(validateElo(l, [0, -1, 8, -1, 1]).valid);
});
test('Cuts lie between adjacent rows or columns and need even traversal counts', () => {
  assert.ok(
    validateElo(
      withRules({
        cuts: [
          { axis: 'row', index: 0, count: 2 },
          { axis: 'col', index: 1, count: 2 },
        ],
      }),
      answer,
    ).complete,
  );
  assert.ok(has(withRules({ cuts: [{ axis: 'row', index: 0, count: 0 }] }), answer, 'cut-count'));
  assert.ok(has(withRules({ cuts: [{ axis: 'col', index: 1, count: 1 }] }), answer, 'constraint'));
  const l = withRules({ cuts: [{ axis: 'row', index: 0, count: 2 }] });
  assert.ok(validateElo(l, [0, 2, -1, -1]).valid);
});
test('Exactly one exclusive passage is traversed and every option remains empty', () => {
  const l = withRules({ exclusivePassages: [{ id: 'A', cells: [1, 4] }] });
  assert.ok(validateElo(l, answer).complete);
  assert.equal(eloPointAllowed(l, 1), false);
  assert.equal(eloPointAllowed(l, 4), false);
  assert.ok(
    has(
      withRules({ exclusivePassages: [{ id: 'A', cells: [1, 7] }] }),
      answer,
      'exclusive-passage',
    ),
  );
  assert.ok(
    has(
      withRules({ exclusivePassages: [{ id: 'A', cells: [3, 4] }] }),
      [0, 2, 8, 7],
      'exclusive-passage',
    ),
  );
});
test('A partial cycle is not rejected if remaining regions can subdivide it', () => {
  const state = [0, 2, 8, 6, -1];
  assert.ok(validateElo(straight, state).valid);
  const a = analyzeEloLocal(straight, state, { maxMs: Infinity });
  assert.equal(a.contradiction, false);
  assert.deepEqual(a.candidates[4], [1]);
  const s = solveElo(straight, state, 2, { maxMs: Infinity });
  assert.equal(s.count, 1);
  assert.equal(s.exhaustive, true);
  assert.deepEqual(s.solutions[0], straightAnswer);
});
test('Annotations do not alter truth, deductions or visibility', () => {
  const l = withRules({ passages: [1] }),
    state = { positions: [0, -1, -1, -1], discarded: [...Array(9).keys()] };
  assert.deepEqual(validateElo(l, state), validateElo(l, state.positions));
  const a = analyzeEloLocal(l, state, { maxMs: Infinity }),
    b = analyzeEloLocal(l, state.positions, { maxMs: Infinity });
  assert.deepEqual(a.candidates, b.candidates);
  assert.deepEqual(a.eliminations, b.eliminations);
});
test('Search budgets are inconclusive, not a proof of zero solutions', () => {
  const s = solveElo(base, {}, 2, { maxNodes: 0, maxMs: Infinity });
  assert.equal(s.count, 0);
  assert.equal(s.exhaustive, false);
  assert.equal(s.cutoffReason, 'maxNodes');
  const timed = solveElo(base, {}, 2, { maxMs: 0 });
  assert.equal(timed.exhaustive, false);
  assert.equal(timed.cutoffReason, 'maxMs');
  const operations = solveElo(base, {}, 2, { maxMs: Infinity, maxOperations: 0 });
  assert.equal(operations.exhaustive, false);
  assert.equal(operations.cutoffReason, 'maxOperations');
  const local = analyzeEloLocal(base, {}, { maxOperations: 0, maxMs: Infinity });
  assert.equal(local.budgetExhausted, true);
  assert.equal(local.contradiction, false);
  assert.equal(local.eliminations.length, 0);
  const limited = solveElo(base, {}, 1, { maxMs: Infinity });
  assert.equal(limited.count, 1);
  assert.equal(limited.exhaustive, false);
  assert.equal(limited.cutoffReason, 'solutionLimit');
});
test('Offline domain assumptions are explicit and never taken from player X marks', () => {
  const domains = [[0], [2], [8], [6]];
  const assumed = analyzeEloLocal(base, {}, { domains, maxMs: Infinity });
  assert.equal(assumed.solved, true);
  assert.equal(assumed.assumptions.length, 3);
  assert.equal(assumed.forced.length, 1);
  const solved = solveElo(base, {}, 2, { domains, maxMs: Infinity });
  assert.equal(solved.count, 1);
  assert.equal(solved.exhaustive, true);
  assert.deepEqual(solved.solutions[0], answer);
  const impossible = analyzeEloLocal(
    base,
    { positions: [0, -1, -1, -1] },
    { domains: [[3]], maxMs: Infinity },
  );
  assert.equal(impossible.contradiction, true);
  assert.throws(() => analyzeEloLocal(base, {}, { domains: {} }), TypeError);
});
test('Geometry facade delegates ELO and local hints never search', () => {
  const l = withRules({ passages: [1] });
  assert.deepEqual(validateGeometry(l, answer), validateElo(l, answer));
  const a = solveGeometry(l, {}, 2, { maxNodes: 0, maxMs: Infinity });
  assert.equal(a.exhaustive, false);
  assert.deepEqual(geometryLocalAnalysis(l, {}).candidates, analyzeEloLocal(l, {}).candidates);
  const hint = geometryHint(base, {}, 3);
  assert.ok(!String(hint.proof).startsWith('exhaustive'));
  const source = readFileSync(new URL('../dist/elo-rules.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /GEOMETRY_ANSWERS|\.solution\b/);
});

// Small-board independent exhaustive oracle. It reconstructs first visible
// neighbors from row/column sorting, not the production directional scanner.
function oracle(l, p) {
  const k = Math.max(...l.regions) + 1,
    c = l.constraints || {},
    edges = new Set(),
    adj = Array.from({ length: k }, () => []),
    pointAt = new Map(p.map((cell, r) => [cell, r]));
  // O agrupamento acompanha o oráculo original de regiões e passagens.
  // prettier-ignore
  if (
    p.length !== k ||
    new Set(p).size !== k ||
    p.some(
      (cell, r) =>
        l.regions[cell] !== r ||
        ((c.passages || []).includes(cell) ||
        (c.exclusivePassages || []).some((group) => group.cells.includes(cell))) ||
        (l.fixed?.[r] !== undefined && l.fixed[r] !== cell),
    )
  )
    return false;
  const add = (a, b) => edges.add(a < b ? `${a},${b}` : `${b},${a}`);
  for (let row = 0; row < l.rows; row++) {
    const points = p.filter((cell) => Math.floor(cell / l.cols) === row).sort((a, b) => a - b);
    for (let i = 1; i < points.length; i++) add(pointAt.get(points[i - 1]), pointAt.get(points[i]));
  }
  for (let col = 0; col < l.cols; col++) {
    const points = p.filter((cell) => cell % l.cols === col).sort((a, b) => a - b);
    for (let i = 1; i < points.length; i++) add(pointAt.get(points[i - 1]), pointAt.get(points[i]));
  }
  const links = [...edges].map((key) => key.split(',').map(Number));
  for (const [a, b] of links) {
    adj[a].push(b);
    adj[b].push(a);
  }
  if (adj.some((a) => a.length !== 2)) return false;
  const route = [0];
  let prev = -1,
    at = 0;
  while (true) {
    const next = adj[at].find((r) => r !== prev);
    if (next === 0) break;
    if (route.includes(next)) return false;
    route.push(next);
    prev = at;
    at = next;
  }
  if (route.length !== k) return false;
  const xy = (cell) => [cell % l.cols, Math.floor(cell / l.cols)],
    between = (a, b, c) => (a < c && c < b) || (b < c && c < a);
  const on = (cell, a, b, strict = true) => {
    const [x, y] = xy(cell),
      [ax, ay] = xy(a),
      [bx, by] = xy(b);
    return (
      (ax === bx &&
        x === ax &&
        (strict ? between(ay, by, y) : y >= Math.min(ay, by) && y <= Math.max(ay, by))) ||
      (ay === by &&
        y === ay &&
        (strict ? between(ax, bx, x) : x >= Math.min(ax, bx) && x <= Math.max(ax, bx)))
    );
  };
  for (const [a, b] of links)
    for (const [d, e] of links) {
      if ([a, b].some((r) => r === d || r === e)) continue;
      const [ax, ay] = xy(p[a]),
        [bx, by] = xy(p[b]),
        [dx, dy] = xy(p[d]),
        [ex, ey] = xy(p[e]);
      if (ay === by && dx === ex && between(ax, bx, dx) && between(dy, ey, ay)) return false;
    }
  const used = (cell) => links.some(([a, b]) => on(cell, p[a], p[b]));
  for (const [r, type] of Object.entries(c.shapes || {})) {
    const [a, b] = adj[r],
      sameRow = Math.floor(p[a] / l.cols) === Math.floor(p[b] / l.cols),
      sameCol = p[a] % l.cols === p[b] % l.cols;
    if ((type === 'straight') !== (sameRow || sameCol)) return false;
  }
  if ((c.passages || []).some((cell) => !used(cell))) return false;
  if (
    (c.forbiddenEdges || []).some(([u, v]) =>
      links.some(([a, b]) => on(u, p[a], p[b], false) && on(v, p[a], p[b], false)),
    )
  )
    return false;
  for (const [r, count] of Object.entries(c.rowCounts || {}))
    if (p.filter((cell) => Math.floor(cell / l.cols) === +r).length !== count) return false;
  for (const [col, count] of Object.entries(c.colCounts || {}))
    if (p.filter((cell) => cell % l.cols === +col).length !== count) return false;
  for (const [r, total] of Object.entries(c.distances || {}))
    if (
      adj[r].reduce(
        (sum, s) =>
          sum +
          Math.abs((p[r] % l.cols) - (p[s] % l.cols)) +
          Math.abs(Math.floor(p[r] / l.cols) - Math.floor(p[s] / l.cols)),
        0,
      ) !== total
    )
      return false;
  if ((c.neighbors || []).some(([a, b]) => !adj[a].includes(b))) return false;
  if (c.order?.length) {
    const order = route.filter((r) => c.order.includes(r)),
      index = order.indexOf(c.order[0]);
    if (
      ![1, -1].some((sign) =>
        c.order.every((r, i) => order[(index + sign * i + order.length) % order.length] === r),
      )
    )
      return false;
  }
  for (const cut of c.cuts || []) {
    const side = (cell) =>
      (cut.axis === 'row' ? Math.floor(cell / l.cols) : cell % l.cols) <= cut.index;
    if (links.filter(([a, b]) => side(p[a]) !== side(p[b])).length !== cut.count) return false;
  }
  if ((c.exclusivePassages || []).some((group) => group.cells.filter(used).length !== 1))
    return false;
  return true;
}
function enumerate(l) {
  const k = Math.max(...l.regions) + 1,
    domains = Array.from({ length: k }, (_, r) =>
      l.regions.flatMap((region, cell) => (region === r ? [cell] : [])),
    ),
    solutions = [],
    p = Array(k).fill(-1);
  function go(r) {
    if (r === k) {
      if (oracle(l, p)) solutions.push(p.slice());
      return;
    }
    for (const cell of domains[r]) {
      p[r] = cell;
      go(r + 1);
    }
  }
  go(0);
  return solutions;
}
function checkOracle(l) {
  const all = enumerate(l),
    searched = solveElo(l, {}, 100000, { maxNodes: 1000000, maxMs: Infinity });
  assert.equal(searched.exhaustive, true);
  assert.deepEqual(searched.solutions.map(String).sort(), all.map(String).sort());
  const local = analyzeEloLocal(l, {}, { maxMs: Infinity, maxOperations: Infinity });
  if (all.length) assert.equal(local.contradiction, false);
  for (const sol of all)
    for (let r = 0; r < sol.length; r++)
      assert.ok(local.candidates[r].includes(sol[r]), `Unsound elimination of ${r}:${sol[r]}`);
  for (const sol of all.slice(0, 4))
    for (let mask = 0; mask < 1 << sol.length; mask++) {
      const p = sol.map((cell, r) => (mask & (1 << r) ? cell : -1));
      const a = analyzeEloLocal(l, p, { maxMs: Infinity, maxOperations: Infinity });
      assert.equal(a.contradiction, false, JSON.stringify({ l, p, diagnostic: a.diagnostic }));
      for (let r = 0; r < sol.length; r++) assert.ok(a.candidates[r].includes(sol[r]));
    }
  return all.length;
}
test('Independent exhaustive oracle agrees on all mechanics and partial solution subsets', () => {
  const configurations = [
    {},
    { shapes: { 0: 'turn' } },
    { shapes: { 4: 'straight' } },
    { passages: [7] },
    { forbiddenEdges: [[3, 4]] },
    { rowCounts: { 0: 3 }, colCounts: { 1: 1 } },
    { distances: { 0: 3, 4: 2 } },
    { neighbors: [[0, 4]] },
    { order: [0, 1, 2, 3] },
    { cuts: [{ axis: 'col', index: 0, count: 2 }] },
    { exclusivePassages: [{ id: 'A', cells: [3, 4] }] },
    { shapes: { 4: 'straight' }, passages: [7], distances: { 0: 3 }, order: [0, 1, 2, 3] },
  ];
  let solutions = 0;
  for (const rules of configurations) solutions += checkOracle(withRules(rules, straight));
  assert.ok(solutions > 0);
  // Deliberately inconsistent combinations must be proved zero, not pruned by an answer.
  checkOracle(withRules({ neighbors: [[0, 2]], rowCounts: { 0: 3 } }, straight));
  checkOracle(withRules({ shapes: { 0: 'straight' }, passages: [7] }, straight));
});

test('Seeded connected region boards preserve every oracle solution under local deductions', () => {
  let seed = 904371,
    positiveBoards = 0,
    fullComparisons = 0,
    solutionChecks = 0;
  const random = (n) => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed % n;
  };
  for (let sample = 0; sample < 100; sample++) {
    const rows = 4,
      cols = 4,
      k = 4 + (sample % 3),
      regions = Array(16).fill(-1),
      pool = [...Array(16).keys()];
    for (let r = 0; r < k; r++) regions[pool.splice(random(pool.length), 1)[0]] = r;
    while (pool.length) {
      const frontier = [];
      for (const cell of pool)
        for (const next of [cell - 1, cell + 1, cell - cols, cell + cols])
          if (
            next >= 0 &&
            next < 16 &&
            (Math.abs(cell - next) === cols ||
              Math.floor(cell / cols) === Math.floor(next / cols)) &&
            regions[next] >= 0
          )
            frontier.push([cell, regions[next]]);
      const [cell, r] = frontier[random(frontier.length)];
      regions[cell] = r;
      pool.splice(pool.indexOf(cell), 1);
    }
    const l = { game: 'elo', rows, cols, regions, fixed: {} },
      all = enumerate(l),
      result = solveElo(l, {}, 100000, { maxNodes: 1000000, maxMs: Infinity });
    assert.equal(result.exhaustive, true);
    assert.deepEqual(result.solutions.map(String).sort(), all.map(String).sort());
    fullComparisons++;
    if (!all.length) continue;
    positiveBoards++;
    const solution = all[random(all.length)],
      edges = eloEdges(l, solution),
      adj = Array.from({ length: k }, () => []);
    for (const [a, b] of edges) {
      adj[a].push(b);
      adj[b].push(a);
    }
    const on = (cell, a, b) =>
      (Math.floor(a / cols) === Math.floor(b / cols) &&
        Math.floor(cell / cols) === Math.floor(a / cols) &&
        cell > Math.min(a, b) &&
        cell < Math.max(a, b)) ||
      (a % cols === b % cols &&
        cell % cols === a % cols &&
        cell > Math.min(a, b) &&
        cell < Math.max(a, b));
    const used = [...Array(16).keys()].filter((cell) =>
        edges.some(([a, b]) => on(cell, solution[a], solution[b])),
      ),
      empty = [...Array(16).keys()].filter(
        (cell) => !solution.includes(cell) && !used.includes(cell),
      ),
      units = [];
    for (let cell = 0; cell < 16; cell++)
      for (const next of [cell + 1, cell + cols])
        if (
          next < 16 &&
          (next - cell === cols || Math.floor(next / cols) === Math.floor(cell / cols))
        )
          units.push([cell, next]);
    const forbidden = units.find(
      ([a, b]) =>
        !edges.some(([r, s]) =>
          [a, b].every(
            (cell) =>
              cell === solution[r] || cell === solution[s] || on(cell, solution[r], solution[s]),
          ),
        ),
    );
    const route = [0];
    let previous = -1,
      current = 0;
    while (route.length < k) {
      const next = adj[current].find((r) => r !== previous);
      route.push(next);
      previous = current;
      current = next;
    }
    const [a, b] = adj[0],
      isStraight =
        Math.floor(solution[a] / cols) === Math.floor(solution[b] / cols) ||
        solution[a] % cols === solution[b] % cols,
      target = adj[1].reduce(
        (sum, r) =>
          sum +
          Math.abs((solution[r] % cols) - (solution[1] % cols)) +
          Math.abs(Math.floor(solution[r] / cols) - Math.floor(solution[1] / cols)),
        0,
      ),
      cut = { axis: sample % 2 ? 'row' : 'col', index: 1 };
    const side = (cell) =>
      (cut.axis === 'row' ? Math.floor(cell / cols) : cell % cols) <= cut.index;
    cut.count = edges.filter(([a, b]) => side(solution[a]) !== side(solution[b])).length;
    const constraints = {
      shapes: { 0: isStraight ? 'straight' : 'turn' },
      distances: { 1: target },
      neighbors: [edges[0]],
      rowCounts: { 1: solution.filter((cell) => Math.floor(cell / cols) === 1).length },
      colCounts: { 2: solution.filter((cell) => cell % cols === 2).length },
      order: route.slice(0, 4),
      cuts: [cut],
      ...(forbidden ? { forbiddenEdges: [forbidden] } : {}),
      ...(used.length ? { passages: [used[0]] } : {}),
      ...(used.length > 1 && empty.length
        ? { exclusivePassages: [{ id: 'A', cells: [used[1], empty[0]] }] }
        : {}),
    };
    const constrained = { ...l, constraints };
    assert.ok(oracle(constrained, solution));
    assert.ok(validateElo(constrained, solution).complete);
    checkOracle(constrained);
    fullComparisons++;
    for (let mask = 0; mask < 1 << k; mask++) {
      const state = solution.map((cell, r) => (mask & (1 << r) ? cell : -1)),
        analysis = analyzeEloLocal(constrained, state, {
          maxMs: Infinity,
          maxOperations: Infinity,
        });
      assert.equal(
        analysis.contradiction,
        false,
        JSON.stringify({ constrained, state, diagnostic: analysis.diagnostic }),
      );
      for (let r = 0; r < k; r++) assert.ok(analysis.candidates[r].includes(solution[r]));
      solutionChecks++;
    }
  }
  assert.ok(positiveBoards >= 10);
  console.log(
    JSON.stringify({
      randomOracleBoards: fullComparisons,
      positiveBoards,
      partialSolutionChecks: solutionChecks,
    }),
  );
});
console.log(JSON.stringify({ passed: true, tests: checks }));

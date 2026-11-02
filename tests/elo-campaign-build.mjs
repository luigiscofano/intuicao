// Geração e preparação de dados de ELO.
/** Offline, deterministic ELO campaign production. No generation runs in the app. */
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { eloEdges, validateGeometry, geometryLocalAnalysis } from '../dist/geometry-games.mjs';
import { analyzeEloLocal, solveElo } from '../dist/elo-rules.mjs';
import { explainElo } from './elo-campaign-reasoning.mjs';
const readLiteral = (path, marker) => {
  const text = fs.readFileSync(new URL(path, import.meta.url), 'utf8'),
    start = text.indexOf(marker) + marker.length;
  return JSON.parse(text.slice(start, text.indexOf('\n', start)).replace(/;\s*$/, ''));
};
const sources = readLiteral('../dist/geometry-levels.mjs', 'export const GEOMETRY_LEVELS = ').elo;
const oldAnswers = readLiteral('../dist/geometry-answers.mjs', 'export const GEOMETRY_ANSWERS=');
export const stageNames = [
  'Fundamentos',
  'Curvas e retas',
  'Passagens',
  'Trechos vedados',
  'Contagens',
  'Distâncias',
  'Vizinhanças',
  'Ordem no circuito',
  'Travessias',
  'Escolhas interligadas',
];
export const families = [
  'core',
  'shapes',
  'passages',
  'forbiddenEdges',
  'counts',
  'distances',
  'neighbors',
  'order',
  'cuts',
  'exclusivePassages',
];
const rng = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const shuffle = (a, r) => {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const adj = (c, R, C) =>
  [
    c % C ? c - 1 : -1,
    c % C < C - 1 ? c + 1 : -1,
    c >= C ? c - C : -1,
    c < (R - 1) * C ? c + C : -1,
  ].filter((x) => x >= 0);
const xy = (c, C) => [c % C, Math.floor(c / C)];
const coord = (l, c) => `L${Math.floor(c / l.cols) + 1}C${(c % l.cols) + 1}`;
const direction = (a, b, C) =>
  a === b
    ? -1
    : Math.floor(a / C) === Math.floor(b / C)
      ? b > a
        ? 0
        : 1
      : a % C === b % C
        ? b > a
          ? 2
          : 3
        : -1;
const opposite = (a, b) => Math.floor(a / 2) === Math.floor(b / 2) && a !== b;
export function graph(l, p) {
  const edges = eloEdges(l, p),
    rays = p.map(() => []);
  for (const [a, b] of edges) {
    rays[a].push(direction(p[a], p[b], l.cols));
    rays[b].push(direction(p[b], p[a], l.cols));
  }
  return { edges, rays };
}
const interior = (l, c, a, b) =>
  direction(a, c, l.cols) === direction(a, b, l.cols) &&
  direction(b, c, l.cols) === direction(b, a, l.cols) &&
  direction(a, b, l.cols) >= 0;
const crosses = (l, p, e, f) => {
  if (e.some((v) => f.includes(v))) return false;
  let [a, b] = e.map((v) => xy(p[v], l.cols)),
    [c, d] = f.map((v) => xy(p[v], l.cols));
  if (a[1] !== b[1]) [a, b, c, d] = [c, d, a, b];
  return (
    a[1] === b[1] &&
    c[0] === d[0] &&
    Math.min(a[0], b[0]) < c[0] &&
    c[0] < Math.max(a[0], b[0]) &&
    Math.min(c[1], d[1]) < a[1] &&
    a[1] < Math.max(c[1], d[1])
  );
};
export function usedPassages(l, p, edges) {
  const used = new Set();
  for (const [a, b] of edges) {
    const x = p[a],
      y = p[b],
      step = x % l.cols === y % l.cols ? l.cols : 1;
    for (let c = Math.min(x, y) + step; c < Math.max(x, y); c += step) used.add(c);
  }
  return used;
}
const crossedCut = (l, p, e, cut) => {
  const q = (c) => (cut.axis === 'row' ? Math.floor(c / l.cols) : c % l.cols);
  return q(p[e[0]]) <= cut.index !== q(p[e[1]]) <= cut.index;
};
function cycleOrder(edges, k) {
  const ns = Array.from({ length: k }, () => []);
  for (const [a, b] of edges) {
    ns[a].push(b);
    ns[b].push(a);
  }
  if (ns.some((n) => n.length !== 2)) return [];
  const out = [0];
  let prev = -1,
    cur = 0;
  while (out.length <= k) {
    const next = ns[cur].find((x) => x !== prev);
    if (next === 0) return out;
    out.push(next);
    prev = cur;
    cur = next;
  }
  return [];
}
const sameCycle = (a, b) =>
  a.length === b.length &&
  [b, [...b].reverse()].some((x) =>
    x.some((_, i) => a.every((v, j) => v === x[(i + j) % x.length])),
  );
export function validConstraints(l, p, complete = false) {
  const { edges, rays } = graph(l, p),
    c = l.constraints || {},
    used = usedPassages(l, p, edges);
  if (rays.some((a) => a.length > 2)) return false;
  for (let i = 0; i < edges.length; i++)
    for (let j = 0; j < i; j++) if (crosses(l, p, edges[i], edges[j])) return false;
  for (const [r, type] of Object.entries(c.shapes || {}))
    if (
      rays[r].length === 2 &&
      (type === 'straight' ? !opposite(...rays[r]) : opposite(...rays[r]))
    )
      return false;
  for (const e of c.forbiddenEdges || [])
    if (
      edges.some(([a, b]) => {
        const min = Math.min(p[a], p[b]),
          max = Math.max(p[a], p[b]);
        return direction(p[a], p[b], l.cols) === direction(e[0], e[1], l.cols) ||
          direction(p[a], p[b], l.cols) === direction(e[1], e[0], l.cols)
          ? e.every(
              (x) =>
                x >= min &&
                x <= max &&
                (p[a] % l.cols === p[b] % l.cols
                  ? x % l.cols === p[a] % l.cols
                  : Math.floor(x / l.cols) === Math.floor(p[a] / l.cols)),
            )
          : false;
      })
    )
      return false;
  for (const [axis, key] of [
    ['row', 'rowCounts'],
    ['col', 'colCounts'],
  ])
    for (const [index, n] of Object.entries(c[key] || {})) {
      const count = p.filter(
        (x) => x >= 0 && (axis === 'row' ? Math.floor(x / l.cols) : x % l.cols) === +index,
      ).length;
      if (count > n || (complete && count !== n)) return false;
    }
  for (const [a, b] of c.neighbors || [])
    if (p[a] >= 0 && p[b] >= 0 && !edges.some((e) => e.includes(a) && e.includes(b))) return false;
  for (const cut of c.cuts || []) {
    const n = edges.filter((e) => crossedCut(l, p, e, cut)).length;
    if (n > cut.count || (complete && n !== cut.count)) return false;
  }
  for (const group of c.exclusivePassages || []) {
    const n = group.cells.filter((x) => used.has(x)).length;
    if (n > 1 || (complete && n !== 1)) return false;
  }
  if (!complete) return true;
  if (rays.some((a) => a.length !== 2) || cycleOrder(edges, p.length).length !== p.length)
    return false;
  if ((c.passages || []).some((x) => !used.has(x))) return false;
  for (const [r, n] of Object.entries(c.distances || {})) {
    let sum = 0;
    for (const [a, b] of edges)
      if (a === +r || b === +r) {
        const [x, y] = xy(p[a], l.cols),
          [u, v] = xy(p[b], l.cols);
        sum += Math.abs(x - u) + Math.abs(y - v);
      }
    if (sum !== n) return false;
  }
  if (
    c.order?.length &&
    !sameCycle(
      cycleOrder(edges, p.length).filter((r) => c.order.includes(r)),
      c.order,
    )
  )
    return false;
  return true;
}
/** Independent bounded enumerator: no answer equality, no unsafe partial-loop pruning. */
export function independentSolve(l, { limit = 2, maxNodes = 120000 } = {}) {
  const k = Math.max(...l.regions) + 1,
    c = l.constraints || {},
    ban = new Set([...(c.passages || []), ...(c.exclusivePassages || []).flatMap((g) => g.cells)]),
    base = Array(k).fill(-1);
  for (const [r, x] of Object.entries(l.fixed || {})) base[r] = x;
  let domains = base.map((p, r) =>
    p < 0
      ? l.regions.flatMap((v, x) => (v === r && !ban.has(x) ? [x] : []))
      : ban.has(p)
        ? []
        : [p],
  );
  let changed = true;
  while (changed) {
    changed = false;
    for (let r = 0; r < k; r++) {
      const ds = domains[r].filter((x) => {
        let mask = 0;
        for (let s = 0; s < k; s++)
          if (s !== r)
            for (const y of domains[s]) {
              const d = direction(x, y, l.cols);
              if (d >= 0) mask |= 1 << d;
            }
        const ds = [0, 1, 2, 3].filter((d) => mask & (1 << d));
        if (ds.length < 2) return false;
        const shape = c.shapes?.[r];
        if (shape === 'straight' && !((mask & 3) === 3 || (mask & 12) === 12)) return false;
        if (shape === 'turn' && !(mask & 3 && mask & 12)) return false;
        return true;
      });
      if (ds.length !== domains[r].length) {
        domains[r] = ds;
        changed = true;
      }
    }
    if (domains.some((d) => !d.length)) break;
  }
  const p = Array(k).fill(-1),
    solutions = [],
    stats = { nodes: 0, branches: 0, candidates: domains.reduce((n, d) => n + d.length, 0) };
  let cutoffReason = null;
  function feasible() {
    if (!validConstraints(l, p)) return false;
    for (const [axis, key] of [
      ['row', 'rowCounts'],
      ['col', 'colCounts'],
    ])
      for (const [index, n] of Object.entries(c[key] || {})) {
        const q = (x) => (axis === 'row' ? Math.floor(x / l.cols) : x % l.cols) === +index;
        let min = 0,
          max = 0;
        for (let r = 0; r < k; r++) {
          if (p[r] >= 0) {
            if (q(p[r])) (min++, max++);
          } else {
            if (domains[r].every(q)) min++;
            if (domains[r].some(q)) max++;
          }
        }
        if (n < min || n > max) return false;
      }
    // Every placed point still needs two distinct available directions.
    for (let r = 0; r < k; r++)
      if (p[r] >= 0) {
        let mask = 0;
        for (let s = 0; s < k; s++)
          if (s !== r)
            for (const y of p[s] >= 0 ? [p[s]] : domains[s]) {
              const d = direction(p[r], y, l.cols);
              if (d >= 0) mask |= 1 << d;
            }
        if ([0, 1, 2, 3].filter((d) => mask & (1 << d)).length < 2) return false;
      }
    return true;
  }
  const order = domains.map((_, r) => r).sort((a, b) => domains[a].length - domains[b].length);
  function dfs(d) {
    if (++stats.nodes > maxNodes) {
      cutoffReason = 'maxNodes';
      return;
    }
    if (d === k) {
      if (validConstraints(l, p, true)) {
        solutions.push(p.slice());
        if (solutions.length >= limit) cutoffReason = 'solutionLimit';
      }
      return;
    }
    const r = order[d];
    if (domains[r].length > 1) stats.branches++;
    for (const x of domains[r]) {
      p[r] = x;
      if (feasible()) dfs(d + 1);
      if (cutoffReason) break;
    }
    p[r] = -1;
  }
  if (!domains.some((d) => !d.length)) dfs(0);
  return { count: solutions.length, solutions, exhaustive: !cutoffReason, cutoffReason, stats };
}
export function productionSolve(l, { limit = 2, maxNodes = 120000, domains } = {}) {
  const local = analyzeEloLocal(l, {}, { domains, maxMs: Infinity, maxOperations: Infinity });
  return solveElo(l, {}, limit, {
    domains: local.candidates,
    maxNodes,
    maxMs: Number(process.env.ELO_MAX_MS || 1500),
  });
}
function scaleSolution(source, answer, R, C, random) {
  const xs = [...new Set(answer.map((c) => c % source.cols))].sort((a, b) => a - b),
    ys = [...new Set(answer.map((c) => Math.floor(c / source.cols)))].sort((a, b) => a - b);
  if (xs.length > C || ys.length > R) return null;
  const map = (old, n) => {
    let chosen = shuffle(
      Array.from({ length: n }, (_, i) => i),
      random,
    )
      .slice(0, old.length)
      .sort((a, b) => a - b);
    if (n >= 10) {
      chosen = shuffle(
        Array.from({ length: n - 2 }, (_, i) => i + 1),
        random,
      )
        .slice(0, old.length - 2)
        .concat([0, n - 1])
        .sort((a, b) => a - b);
    }
    return new Map(old.map((v, i) => [v, chosen[i]]));
  };
  const xm = map(xs, C),
    ym = map(ys, R);
  return answer.map((c) => ym.get(Math.floor(c / source.cols)) * C + xm.get(c % source.cols));
}
function addStraight(l, p, random) {
  const candidates = [];
  for (const [a, b] of eloEdges(l, p)) {
    const x = p[a],
      y = p[b],
      step = x % l.cols === y % l.cols ? l.cols : 1;
    for (let z = Math.min(x, y) + step; z < Math.max(x, y); z += step) {
      if (
        p.some((v) =>
          step === 1
            ? v % l.cols === z % l.cols
            : Math.floor(v / l.cols) === Math.floor(z / l.cols),
        )
      )
        continue;
      candidates.push(z);
    }
  }
  if (candidates.length) p.push(candidates[Math.floor(random() * candidates.length)]);
  return candidates.length > 0;
}

function resizedSource(source, answer, R, C, random) {
  if (R < source.rows || C < source.cols) return null;
  const mapping = (n, N) => [
      0,
      ...shuffle(
        Array.from({ length: N - 2 }, (_, i) => i + 1),
        random,
      )
        .slice(0, n - 2)
        .sort((a, b) => a - b),
      N - 1,
    ],
    ys = mapping(source.rows, R),
    xs = mapping(source.cols, C),
    near = (a, v) => a.reduce((b, x, i) => (Math.abs(x - v) < Math.abs(a[b] - v) ? i : b), 0);
  const p = answer.map((c) => ys[Math.floor(c / source.cols)] * C + xs[c % source.cols]),
    regions = Array.from(
      { length: R * C },
      (_, c) => source.regions[near(ys, Math.floor(c / C)) * source.cols + near(xs, c % C)],
    );
  const connected = (reg) => {
    const cells = regions.flatMap((r, c) => (r === reg ? [c] : []));
    if (!cells.length) return false;
    const set = new Set(cells),
      seen = new Set([cells[0]]),
      q = [cells[0]];
    for (const c of q)
      for (const n of adj(c, R, C))
        if (set.has(n) && !seen.has(n)) {
          seen.add(n);
          q.push(n);
        }
    return seen.size === cells.length;
  };
  for (let i = 0; i < Math.max(4, Math.floor((R * C) / 15)); i++) {
    const cells = shuffle(
      Array.from({ length: R * C }, (_, c) => c).filter((c) => !p.includes(c)),
      random,
    );
    for (const c of cells) {
      const old = regions[c],
        other = shuffle(
          adj(c, R, C).filter((n) => regions[n] !== old),
          random,
        )[0];
      if (other === undefined) continue;
      regions[c] = regions[other];
      if (connected(old)) break;
      regions[c] = old;
    }
  }
  return { p, regions, sizes: p.map((_, r) => regions.filter((x) => x === r).length) };
}

function growRegions(R, C, p, random) {
  const regions = Array(R * C).fill(-1),
    front = p.map(() => new Set()),
    sizes = p.map(() => 1);
  p.forEach((c, r) => (regions[c] = r));
  p.forEach((c, r) =>
    adj(c, R, C)
      .filter((x) => regions[x] < 0)
      .forEach((x) => front[r].add(x)),
  );
  let remain = R * C - p.length;
  while (remain) {
    let best = -1,
      score = Infinity;
    for (let r = 0; r < p.length; r++) {
      for (const c of front[r]) if (regions[c] >= 0) front[r].delete(c);
      if (front[r].size) {
        const v = sizes[r] * (0.55 + random());
        if (v < score) {
          score = v;
          best = r;
        }
      }
    }
    if (best < 0) throw Error('growth');
    const options = [...front[best]],
      c = options[Math.floor(random() * options.length)];
    regions[c] = best;
    sizes[best]++;
    remain--;
    for (const n of adj(c, R, C)) if (regions[n] < 0) front[best].add(n);
  }
  return { regions, sizes };
}
export function constraintPool(l, p, random) {
  const { edges, rays } = graph(l, p),
    used = usedPassages(l, p, edges),
    noPoint = Array.from({ length: l.rows * l.cols }, (_, c) => c).filter((c) => !p.includes(c)),
    pool = [];
  const add = (family, key, value, label) => pool.push({ family, key, value, label });
  rays.forEach((ds, r) =>
    add(
      'shapes',
      'shapes',
      { [r]: opposite(...ds) ? 'straight' : 'turn' },
      `A região ${r + 1} deve formar ${opposite(...ds) ? 'um trecho reto' : 'uma curva'}.`,
    ),
  );
  for (const c of used)
    add(
      'passages',
      'passages',
      [c],
      `A passagem ${coord(l, c)} precisa ser atravessada, sem receber ponto.`,
    );
  for (let c = 0; c < l.rows * l.cols; c++)
    for (const d of [
      c % l.cols < l.cols - 1 ? c + 1 : -1,
      c < l.cols * (l.rows - 1) ? c + l.cols : -1,
    ])
      if (d >= 0) {
        const cc = { ...l, constraints: { forbiddenEdges: [[c, d]] } };
        if (validConstraints(cc, p, true))
          add(
            'forbiddenEdges',
            'forbiddenEdges',
            [[c, d]],
            `Nenhuma ligação pode percorrer o intervalo ${coord(l, c)}–${coord(l, d)}.`,
          );
      }
  for (let r = 0; r < l.rows; r++) {
    const n = p.filter((c) => Math.floor(c / l.cols) === r).length;
    if (n)
      add('counts', 'rowCounts', { [r]: n }, `A linha ${r + 1} recebe exatamente ${n} pontos.`);
  }
  for (let c = 0; c < l.cols; c++) {
    const n = p.filter((x) => x % l.cols === c).length;
    if (n)
      add('counts', 'colCounts', { [c]: n }, `A coluna ${c + 1} recebe exatamente ${n} pontos.`);
  }
  p.forEach((cell, r) => {
    const sum = edges
      .filter((e) => e.includes(r))
      .reduce(
        (n, [a, b]) =>
          n +
          Math.abs((p[a] % l.cols) - (p[b] % l.cols)) +
          Math.abs(Math.floor(p[a] / l.cols) - Math.floor(p[b] / l.cols)),
        0,
      );
    add(
      'distances',
      'distances',
      { [r]: sum },
      `As duas ligações da região ${r + 1} somam ${sum} intervalos.`,
    );
  });
  for (const e of edges)
    add(
      'neighbors',
      'neighbors',
      [e],
      `As regiões ${e[0] + 1} e ${e[1] + 1} precisam ser vizinhas diretas, sem outro ponto entre elas.`,
    );
  const cycle = cycleOrder(edges, p.length);
  for (let i = 0; i < Math.min(12, p.length); i++) {
    const marked = new Set(
      shuffle(cycle, random).slice(0, Math.min(p.length, 4 + Math.floor(random() * 3))),
    );
    const order = cycle.filter((r) => marked.has(r));
    add(
      'order',
      'order',
      order,
      `Percorrendo o circuito, os marcos ${order.map((r) => r + 1).join(' → ')} respeitam esta ordem, admitindo rotação e inversão.`,
    );
  }
  for (const axis of ['row', 'col'])
    for (let index = 0; index < (axis === 'row' ? l.rows : l.cols) - 1; index++) {
      const count = edges.filter((e) => crossedCut(l, p, e, { axis, index })).length;
      if (count > 0)
        add(
          'cuts',
          'cuts',
          [{ axis, index, count }],
          `O corte após ${axis === 'row' ? 'a linha' : 'a coluna'} ${index + 1} deve ser cruzado por ${count} ligações.`,
        );
    }
  const unused = noPoint.filter(
    (c) =>
      !used.has(c) &&
      [0, 2].some((d) => {
        const left = l.regions.flatMap((r, x) => (direction(c, x, l.cols) === d ? [r] : [])),
          right = l.regions.flatMap((r, x) => (direction(c, x, l.cols) === d + 1 ? [r] : []));
        return left.some((a) => right.some((b) => a !== b));
      }),
  );
  for (const cell of shuffle([...used], random))
    for (let j = 0; j < 3 && unused.length; j++) {
      const others = shuffle(unused, random).slice(0, random() < 0.25 ? 2 : 1);
      const cells = shuffle([cell, ...others], random);
      add(
        'exclusivePassages',
        'exclusivePassages',
        [{ id: `X${cell}_${j}`, cells }],
        `Exatamente uma das passagens ${cells.map((c) => coord(l, c)).join(', ')} é utilizada; nenhuma recebe ponto.`,
      );
    }
  return shuffle(pool, random);
}
export function combineClues(clues) {
  const c = {};
  for (const q of clues) {
    if (q.key === 'order') c.order = q.value;
    else if (Array.isArray(q.value)) c[q.key] = [...(c[q.key] || []), ...q.value];
    else c[q.key] = { ...c[q.key], ...q.value };
  }
  return c;
}
const matches = (l, p, q) =>
  validConstraints({ ...l, constraints: combineClues([q]) }, p, true) &&
  ![
    ...(q.key === 'passages' ? q.value : []),
    ...(q.key === 'exclusivePassages' ? q.value.flatMap((x) => x.cells) : []),
  ].some((c) => p.includes(c));
export function canonical(l) {
  const variants = [];
  for (const tr of [false, true])
    for (const fx of [false, true])
      for (const fy of [false, true]) {
        const R = tr ? l.cols : l.rows,
          C = tr ? l.rows : l.cols,
          arr = Array(R * C),
          map = new Map();
        for (let c = 0; c < l.regions.length; c++) {
          let [x, y] = xy(c, l.cols);
          if (tr) [x, y] = [y, x];
          if (fx) x = C - 1 - x;
          if (fy) y = R - 1 - y;
          arr[y * C + x] = l.regions[c];
        }
        const norm = arr.map((r) => {
          if (!map.has(r)) map.set(r, map.size);
          return map.get(r);
        });
        variants.push(`${R}x${C}:${norm.join(',')}`);
      }
  return variants.sort()[0];
}
function dims(stage, pos) {
  if (stage === 2 && [13, 14, 15, 16, 20].includes(pos)) return [8 + (pos % 2), 8];
  if (pos === 13 || pos === 14 || pos === 15 || pos === 16 || pos === 20) {
    const n = 10 + ((stage + pos) % 3);
    return [n, n === 11 ? 10 : n];
  }
  if ([1, 2, 3, 6, 17, 18, 19].includes(pos))
    return [pos === 1 || pos === 17 ? 5 : 6, pos === 1 || pos === 17 ? 5 : 6];
  return [7 + ((stage + pos) % 3), 7 + ((stage + pos + 1) % 3)];
}
function difficulty(stage, pos) {
  if (stage === 1 && pos <= 2) return 'introdução';
  if (pos <= 2) return stage < 5 ? 'aprendizagem' : 'intermediário';
  if (pos <= 6) return stage < 4 ? 'intermediário' : 'avançado';
  if (pos >= 17) return stage < 3 ? 'avançado' : 'especialista';
  return stage < 3 ? 'intermediário' : 'avançado';
}
export function makeMetadata(l, p, stage, pos, clues, result, extra = {}) {
  const current = families[stage - 1],
    mech = ['core', ...new Set(clues.map((q) => q.family))],
    graphInfo = graph(l, p),
    local = geometryLocalAnalysis({ ...l, constraints: {} }, {}),
    active = clues.filter((q) => q.family === current),
    discovery =
      active[0]?.label ||
      'Compare as posições de cada região: duas direções visíveis e um único circuito precisam permanecer possíveis.';
  const idea =
    stage === 1
      ? 'Duas alternativas de alinhamento devem ser distinguidas sem criar terceira direção, cruzamento ou circuito separado.'
      : current === 'shapes'
        ? 'A orientação exigida elimina alinhamentos que parecem fechar o circuito, mas formam o tipo errado de ponto.'
        : current === 'passages'
          ? 'Uma casa sem ponto exige dois alinhamentos em lados opostos; a escolha limita as regiões distantes.'
          : current === 'forbiddenEdges'
            ? 'Um trecho vedado elimina uma ligação automática, sem escondê-la: é preciso mudar os pontos e preservar o circuito.'
            : current === 'counts'
              ? 'As cotas compartilham regiões: ocupar uma linha ou coluna retira alternativas de outras regiões.'
              : current === 'distances'
                ? 'Comprimentos curtos e longos competem pela soma: escolher um vizinho restringe onde o outro pode ficar.'
                : current === 'neighbors'
                  ? 'Alinhar o par não basta: a primeira peça visível deve pertencer à região pedida.'
                  : current === 'order'
                    ? 'As ligações locais precisam deixar uma travessia global dos marcos na ordem indicada, em qualquer sentido.'
                    : current === 'cuts'
                      ? 'A continuidade exige travessias pares, e a cota do corte limita como áreas distantes se conectam.'
                      : 'Escolher uma passagem elimina as outras do mesmo grupo, propagando consequências entre os alinhamentos.';
  return {
    ...l,
    id: l.id || `elo-v3-${String((stage - 1) * 20 + pos).padStart(3, '0')}`,
    name: `${stageNames[stage - 1]} ${String(pos).padStart(2, '0')}`,
    campaignNumber: (stage - 1) * 20 + pos,
    version: l.id?.startsWith('elo-v2') ? 2 : 3,
    regrasVersion: 2,
    stage,
    stageName: stageNames[stage - 1],
    stagePosition: pos,
    mechanics: mech,
    difficulty: difficulty(stage, pos),
    lesson: idea,
    logicIdea: idea + ' ' + discovery,
    reasoningTrace: [
      { kind: 'premise', text: discovery },
      { kind: 'deduction-framework', text: idea },
      ...local.eliminations.slice(0, 3).map((e) => ({
        kind: 'verified-local-elimination',
        region: e.index,
        cell: e.value,
        technique: e.technique,
        text: e.explanation,
      })),
      {
        kind: 'global-check',
        text: 'Depois das exclusões, reconstrua o primeiro ponto visível em cada direção; confira grau dois, ausência de cruzamentos e circuito único.',
      },
    ],
    uniqueness: {
      status:
        result.exhaustive && result.count === 1
          ? 'unique'
          : result.count > 1
            ? 'multiple'
            : 'inconclusive',
      count: result.count,
      exhaustive: result.exhaustive,
      method: 'Enumeração exaustiva de posições pelo motor de regras, após propagação local segura',
      cutoffReason: result.cutoffReason || null,
    },
    validation: {
      solutionCount: result.count,
      solutionVerified: true,
      method: 'automatic-nearest-neighbor-full-rules',
    },
    profile: {
      classification:
        'Estimativa editorial por dependências e interação de regras; não calibrada por jogadores.',
      humanCalibration: false,
      topology: {
        vertices: p.length,
        turns: graphInfo.rays.filter((ds) => !opposite(...ds)).length,
        straight: graphInfo.rays.filter((ds) => opposite(...ds)).length,
        movable: p.length - Object.keys(l.fixed || {}).length,
      },
      localDeduction: {
        solved: local.solved,
        forcedMoves: local.forced.length,
        eliminations: local.eliminations.length,
        rounds: local.rounds,
      },
      searchProfile: {
        nodes: result.stats.nodes,
        branches: result.stats.branches,
        note: 'Métrica computacional, não medida de dificuldade humana.',
      },
    },
    ...extra,
  };
}
export async function build() {
  const levels = [],
    answers = {},
    audit = [],
    seen = new Set();
  let random = rng(0xe1032026);
  const startStage = Number(process.env.ELO_START || 2),
    endStage = Number(process.env.ELO_END || 10),
    progressFile = process.env.ELO_OUT || '/tmp/elo-campaign-progress.json',
    repairs = (process.env.ELO_REPAIR || '').split(',').map(Number).filter(Boolean),
    requireMain = process.env.ELO_REQUIRE_MAIN === '1';
  const selected = [
    0, 7, 16, 19, 23, 26, 39, 47, 55, 61, 70, 76, 90, 105, 121, 139, 64, 67, 73, 152,
  ];
  for (let pos = 1; pos <= 20; pos++) {
    const source = sources[selected[pos - 1]],
      p = oldAnswers[source.id],
      l = {
        game: 'elo',
        rows: source.rows,
        cols: source.cols,
        regions: source.regions,
        fixed: source.fixed,
        id: source.id,
      },
      result = productionSolve(l, { maxNodes: 1500000 });
    if (result.count !== 1 || !result.exhaustive) throw Error('classic not unique ' + source.id);
    const level = makeMetadata(l, p, 1, pos, [], result, { sourceLevelId: source.id });
    levels.push(level);
    answers[level.id] = p;
    seen.add(canonical(l));
    audit.push({
      id: level.id,
      stage: 1,
      source: source.id,
      redesigned: false,
      validation: level.validation,
      uniqueness: level.uniqueness,
      attempts: 1,
      clues: [],
    });
  }
  if (fs.existsSync(progressFile)) {
    const prior = JSON.parse(fs.readFileSync(progressFile));
    for (const l of prior.levels)
      if (l.stage !== 1 && !repairs.includes(l.campaignNumber)) {
        levels.push(l);
        answers[l.id] = prior.answers[l.id];
        seen.add(canonical(l));
        audit.push(prior.audit.find((a) => a.id === l.id));
      }
  }
  for (let stage = startStage; stage <= endStage; stage++)
    for (let pos = 1; pos <= 20; pos++) {
      if (levels.some((l) => l.campaignNumber === (stage - 1) * 20 + pos)) continue;
      if (process.env.ELO_ONLY === '1' && !repairs.includes((stage - 1) * 20 + pos)) continue;
      if (stage >= 5 && pos === 12) {
        const source = sources[154 + (stage - 5) * 9],
          p = oldAnswers[source.id],
          l = {
            game: 'elo',
            rows: source.rows,
            cols: source.cols,
            regions: source.regions,
            fixed: source.fixed,
            id: source.id,
          },
          result = productionSolve(l, { maxNodes: 1500000 });
        if (result.count !== 1 || !result.exhaustive)
          throw Error('classic not unique ' + source.id);
        const level = makeMetadata(l, p, stage, pos, [], result, {
          mechanics: ['core'],
          logicIdea: source.lesson,
          sourceLevelId: source.id,
          designAudit: { classicInterlude: true, mainFamilyEssential: null },
        });
        levels.push(level);
        answers[level.id] = p;
        audit.push({
          id: level.id,
          stage,
          source: source.id,
          redesigned: false,
          validation: level.validation,
          uniqueness: level.uniqueness,
          attempts: 1,
          clues: [],
        });
        seen.add(canonical(l));
        fs.writeFileSync(progressFile, JSON.stringify({ levels, answers, audit }));
        console.log('classic', level.id, stage, pos);
        continue;
      }
      random = rng(
        0xe1032026 ^ ((stage * 20 + pos) * 2654435761) ^ Number(process.env.ELO_SEED_OFFSET || 0),
      );
      const [R, C] = dims(stage, pos),
        main = families[stage - 1],
        classic = stage >= 5 && pos === 12;
      let accepted = null;
      for (let attempt = 0; attempt < 1000 && !accepted; attempt++) {
        let minK = pos <= 2 ? 5 : R <= 6 ? 7 : 9,
          maxK = pos <= 2 ? 6 : R <= 5 ? 9 : R <= 6 ? 11 : 14;
        const candidates = sources.filter((s) => {
          const n = oldAnswers[s.id].length;
          return n >= minK && n <= maxK;
        });
        const source = candidates[Math.floor(random() * candidates.length)];
        const resized =
          attempt % 2 ? resizedSource(source, oldAnswers[source.id], R, C, random) : null;
        let p = resized?.p || scaleSolution(source, oldAnswers[source.id], R, C, random);
        if (!p) continue;
        if (!resized) p = shuffle(p, random);
        const l = { game: 'elo', rows: R, cols: C, regions: [], fixed: {}, constraints: {} };
        if (!resized && ((stage === 2 && pos % 3 !== 0) || random() < 0.25))
          addStraight(l, p, random);
        const grown = resized || growRegions(R, C, p, random);
        if (grown.sizes.some((x) => x < 2) || grown.sizes.some((x) => x > R * C * 0.3)) continue;
        l.regions = grown.regions;
        if (seen.has(canonical(l))) continue;
        const fixedCount = classic
          ? Math.min(3, Math.floor(p.length / 4))
          : pos <= 2
            ? 2
            : R >= 10
              ? 3
              : R >= 7
                ? stage === 2
                  ? 3
                  : 2
                : random() < 0.65
                  ? 1
                  : 2;
        for (const r of (resized
          ? [
              ...Object.keys(source.fixed).map(Number),
              ...shuffle(
                p.map((_, r) => r).filter((r) => source.fixed[r] === undefined),
                random,
              ),
            ]
          : shuffle(
              p.map((_, r) => r),
              random,
            )
        ).slice(0, fixedCount))
          l.fixed[r] = p[r];
        const allowed = classic
          ? []
          : [
              main,
              ...(stage > 2 ? [families[1 + ((stage + pos) % Math.max(1, stage - 2))]] : []),
              ...(stage >= 5 && pos >= 7 ? [families[1 + ((stage * 3 + pos) % (stage - 2))]] : []),
            ];
        const pool = constraintPool(l, p, random).filter((q) => allowed.includes(q.family));
        let clues = [];
        if (!classic) {
          const mainPool = pool.filter(
            (q) =>
              q.family === main &&
              (stage !== 2 ||
                pos > 2 ||
                Object.values(q.value).includes(pos === 1 ? 'turn' : 'straight')) &&
              (stage !== 9 || pos <= 2 || q.value[0].count >= 4),
          );
          if (!mainPool.length) continue;
          clues.push(mainPool[0]);
          if (stage === 10 && pos >= 3) {
            const first = new Set(mainPool[0].value[0].cells),
              second = mainPool.find((q) => q.value[0].cells.every((c) => !first.has(c)));
            if (!second) continue;
            clues.push(second);
          }
        }
        if (stage === 2) {
          const all = pool.filter(
            (q) =>
              q.family === 'shapes' &&
              (pos > 2 || Object.values(q.value).includes(pos === 1 ? 'turn' : 'straight')),
          );
          l.constraints = combineClues(all);
          const test = productionSolve(l, { limit: 2, maxNodes: 60000 });
          if (!(test.exhaustive && test.count === 1)) continue;
          clues = all;
        }
        let result = null,
          invalid = false;
        for (let turn = 0; turn < 11; turn++) {
          l.constraints = combineClues(clues);
          result = productionSolve(l, { limit: 6, maxNodes: R >= 10 ? 80000 : 50000 });
          if (result.exhaustive && result.count === 1) {
            if (requireMain && !classic) {
              for (const r of Object.keys(l.fixed)) {
                const saved = l.fixed[r];
                delete l.fixed[r];
                const trial = productionSolve(l, { limit: 2, maxNodes: 120000 });
                if (!(trial.exhaustive && trial.count === 1)) l.fixed[r] = saved;
              }
              const ban =
                  stage === 10
                    ? new Set(
                        clues
                          .filter((q) => q.family === main)
                          .flatMap((q) => q.value.flatMap((g) => g.cells)),
                      )
                    : new Set(),
                ablationDomains =
                  stage === 10
                    ? p.map((_, r) =>
                        l.regions.flatMap((s, c) => (s === r && !ban.has(c) ? [c] : [])),
                      )
                    : undefined;
              const noMain = productionSolve(
                { ...l, constraints: combineClues(clues.filter((q) => q.family !== main)) },
                { limit: 2, maxNodes: 120000, domains: ablationDomains },
              );
              if (noMain.count < 2) break;
            }
            if (
              process.env.ELO_REQUIRE_PROOF === '1' &&
              !explainElo(l, { maxEvaluations: 3000 }).solved
            )
              break;
            accepted = { l, p, result, clues, attempt: attempt + 1, source: source.id, classic };
            break;
          }
          if (result.count === 0 && result.exhaustive) {
            invalid = true;
            break;
          }
          const alternatives = result.solutions.filter((sol) => sol.some((x, i) => x !== p[i]));
          const unused = pool.filter(
            (q) =>
              !clues.includes(q) && !(q.key === 'order' && clues.some((c) => c.key === 'order')),
          );
          if (!unused.length || clues.length >= Math.min(9, Math.ceil(p.length * 0.7))) break;
          let options = unused
            .map((q) => ({
              q,
              score: alternatives.reduce((n, a) => n + (!matches(l, a, q) ? 1 : 0), 0),
            }))
            .sort((a, b) => b.score - a.score);
          if (alternatives.length && options[0].score === 0) break;
          clues.push(options[0].q);
        }
        if (invalid) throw Error('construction invalid ' + stage + ' ' + pos);
        if (attempt % 25 === 24) console.log('retry', stage, pos, attempt + 1);
      }
      if (!accepted) throw Error(`Could not select ${stage}:${pos} ${R}x${C}`);
      const { l, p, result, clues, attempt, source } = accepted;
      // Reverse deletion: discard redundant clues while retaining the stage's family.
      for (const q of [...clues].reverse()) {
        if (
          !classic &&
          q.family === main &&
          clues.filter((c) => c.family === main).length === (stage === 10 && pos >= 3 ? 2 : 1)
        )
          continue;
        const trial = clues.filter((x) => x !== q),
          test = productionSolve({ ...l, constraints: combineClues(trial) }, { maxNodes: 100000 });
        if (
          test.exhaustive &&
          test.count === 1 &&
          (process.env.ELO_REQUIRE_PROOF !== '1' ||
            explainElo({ ...l, constraints: combineClues(trial) }, { maxEvaluations: 3000 }).solved)
        ) {
          clues.splice(clues.indexOf(q), 1);
        }
      }
      l.constraints = combineClues(clues);
      const final = productionSolve(l, { maxNodes: 1000000 });
      if (!final.exhaustive || final.count !== 1) throw Error('final uniqueness');
      const banned =
          stage === 10
            ? new Set(
                clues
                  .filter((q) => q.family === main)
                  .flatMap((q) => q.value.flatMap((g) => g.cells)),
              )
            : new Set(),
        ablationDomains =
          stage === 10
            ? p.map((_, r) => l.regions.flatMap((s, c) => (s === r && !banned.has(c) ? [c] : [])))
            : undefined;
      const stripped = productionSolve(
        { ...l, constraints: combineClues(clues.filter((q) => q.family !== main)) },
        { limit: 2, maxNodes: 100000, domains: ablationDomains },
      );
      const essential = classic ? null : stripped.count >= 2;
      const level = makeMetadata(l, p, stage, pos, clues, final, {
        designAudit: {
          production: 'offline-candidate-selection',
          attempts: attempt,
          mainFamilyEssential: essential,
          withoutMainFamily: { count: stripped.count, exhaustive: stripped.exhaustive },
          editorialReview:
            'Automated mathematical review and rule-based explanation; no claim of human playtesting.',
          classicInterlude: classic,
        },
      });
      levels.push(level);
      answers[level.id] = p;
      seen.add(canonical(l));
      audit.push({
        id: level.id,
        stage,
        dimensions: [R, C],
        sourceTopology: source,
        redesigned: true,
        attempts: attempt,
        validation: level.validation,
        uniqueness: level.uniqueness,
        clues: clues.map((q) => q.label),
        mainFamilyEssential: essential,
        logicIdea: level.logicIdea,
        reasoningTrace: level.reasoningTrace,
      });
      console.log(
        'selected',
        level.id,
        `${R}x${C}`,
        p.length,
        'regions',
        clues.length,
        'clues',
        final.stats.nodes,
        'nodes',
        'essential',
        essential,
      );
      fs.writeFileSync(progressFile, JSON.stringify({ levels, answers, audit }));
    }
  if (startStage !== 2 || endStage !== 10) {
    console.log('CHUNK DONE', startStage, endStage);
    return;
  }
  fs.writeFileSync(
    new URL('../dist/elo-campaign.mjs', import.meta.url),
    '// Materialized offline ELO campaign. No answer data; see development audit.\nexport const ELO_CAMPAIGN = ' +
      JSON.stringify(levels) +
      ';\n',
  );
  fs.writeFileSync(
    new URL('../dist/elo-campaign-answers.mjs', import.meta.url),
    '// Verified answers, isolated from ordinary rendering and win validation.\nexport const ELO_CAMPAIGN_ANSWERS = ' +
      JSON.stringify(answers) +
      ';\n',
  );
  fs.writeFileSync(
    new URL('./elo-campaign-audit.json', import.meta.url),
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        method:
          'offline candidate selection, exact enumeration, clue deletion and symmetry rejection',
        humanCalibration: false,
        levels: audit,
      },
      null,
      2,
    ),
  );
  console.log('DONE', levels.length);
}
if (process.argv[1] === new URL(import.meta.url).pathname) await build();

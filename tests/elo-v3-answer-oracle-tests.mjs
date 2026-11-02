// Testes e verificações de ELO.
/** Full answers checked with a separate graph construction, never eloEdges/validator. */
import assert from 'node:assert/strict';
import { GEOMETRY_LEVELS } from '../dist/geometry-levels.mjs';
import { GEOMETRY_ANSWERS } from '../dist/geometry-answers.mjs';
export function independentAnswerCheck(l, p) {
  const R = l.rows,
    C = l.cols,
    k = Math.max(...l.regions) + 1,
    cs = l.constraints ?? {};
  assert.equal(p.length, k);
  assert.equal(new Set(p).size, k);
  const x = (c) => c % C,
    y = (c) => Math.floor(c / C),
    inBounds = (c) => Number.isInteger(c) && c >= 0 && c < R * C;
  const banned = new Set([
    ...(cs.passages ?? []),
    ...(cs.exclusivePassages ?? []).flatMap((g) => g.cells),
  ]);
  for (let r = 0; r < k; r++) {
    assert.ok(inBounds(p[r]));
    assert.equal(l.regions[p[r]], r);
    assert.ok(!banned.has(p[r]));
    if (l.fixed?.[r] !== undefined) assert.equal(p[r], l.fixed[r]);
    const cells = l.regions.flatMap((v, c) => (v === r ? [c] : [])),
      seen = new Set([cells[0]]),
      q = [cells[0]];
    for (const a of q)
      for (const b of [a - 1, a + 1, a - C, a + C])
        if (
          inBounds(b) &&
          Math.abs(x(a) - x(b)) + Math.abs(y(a) - y(b)) === 1 &&
          l.regions[b] === r &&
          !seen.has(b)
        ) {
          seen.add(b);
          q.push(b);
        }
    assert.equal(seen.size, cells.length);
  }
  const edges = [];
  for (const [coordinate, other, size] of [
    [y, x, R],
    [x, y, C],
  ])
    for (let i = 0; i < size; i++) {
      const line = p
        .map((cell, r) => ({ cell, r }))
        .filter((v) => coordinate(v.cell) === i)
        .sort((a, b) => other(a.cell) - other(b.cell));
      for (let j = 1; j < line.length; j++) edges.push([line[j - 1].r, line[j].r]);
    }
  const ns = Array.from({ length: k }, () => []);
  for (const [a, b] of edges) {
    ns[a].push(b);
    ns[b].push(a);
  }
  assert.ok(ns.every((n) => n.length === 2));
  const route = [0];
  let prev = -1,
    cur = 0;
  do {
    const next = ns[cur].find((r) => r !== prev);
    if (next === 0) break;
    assert.ok(!route.includes(next));
    route.push(next);
    prev = cur;
    cur = next;
  } while (route.length <= k);
  assert.equal(route.length, k);
  const between = (v, a, b, strict) =>
    strict ? Math.min(a, b) < v && v < Math.max(a, b) : Math.min(a, b) <= v && v <= Math.max(a, b);
  const on = (cell, a, b, strict = false) =>
    y(a) === y(b)
      ? y(cell) === y(a) && between(x(cell), x(a), x(b), strict)
      : x(cell) === x(a) && between(y(cell), y(a), y(b), strict);
  for (let i = 0; i < edges.length; i++)
    for (let j = 0; j < i; j++) {
      const e = edges[i],
        f = edges[j];
      if (e.some((r) => f.includes(r))) continue;
      const a = p[e[0]],
        b = p[e[1]],
        c = p[f[0]],
        d = p[f[1]],
        h = y(a) === y(b),
        hh = y(c) === y(d);
      if (h === hh) continue;
      const horizontal = h ? [a, b] : [c, d],
        vertical = h ? [c, d] : [a, b];
      assert.ok(
        !(
          between(x(vertical[0]), x(horizontal[0]), x(horizontal[1]), true) &&
          between(y(horizontal[0]), y(vertical[0]), y(vertical[1]), true)
        ),
      );
    }
  for (const [r, type] of Object.entries(cs.shapes ?? {})) {
    const [a, b] = ns[r].map((n) => p[n]),
      c = p[r],
      straight = (x(a) === x(c) && x(b) === x(c)) || (y(a) === y(c) && y(b) === y(c));
    assert.equal(straight, type === 'straight');
  }
  const used = (c) => edges.some(([a, b]) => on(c, p[a], p[b], true));
  for (const c of cs.passages ?? []) assert.ok(used(c));
  for (const [a, b] of cs.forbiddenEdges ?? [])
    assert.ok(!edges.some(([u, v]) => on(a, p[u], p[v]) && on(b, p[u], p[v])));
  for (const [r, n] of Object.entries(cs.rowCounts ?? {}))
    assert.equal(p.filter((c) => y(c) === +r).length, n);
  for (const [c, n] of Object.entries(cs.colCounts ?? {}))
    assert.equal(p.filter((v) => x(v) === +c).length, n);
  for (const [r, n] of Object.entries(cs.distances ?? {}))
    assert.equal(
      ns[r].reduce((sum, s) => sum + Math.abs(x(p[r]) - x(p[s])) + Math.abs(y(p[r]) - y(p[s])), 0),
      n,
    );
  for (const [a, b] of cs.neighbors ?? []) assert.ok(ns[a].includes(b));
  if (cs.order?.length) {
    const observed = route.filter((r) => cs.order.includes(r)),
      same = (a, b) => a.some((_, shift) => b.every((r, i) => r === a[(i + shift) % a.length]));
    assert.ok(same(observed, cs.order) || same([...observed].reverse(), cs.order));
  }
  for (const cut of cs.cuts ?? []) {
    const value = cut.axis === 'row' ? y : x;
    assert.equal(
      edges.filter(([a, b]) => value(p[a]) <= cut.index !== value(p[b]) <= cut.index).length,
      cut.count,
    );
  }
  for (const g of cs.exclusivePassages ?? []) assert.equal(g.cells.filter(used).length, 1);
  return true;
}
for (const l of GEOMETRY_LEVELS.elo) {
  try {
    independentAnswerCheck(l, GEOMETRY_ANSWERS[l.id]);
  } catch (e) {
    e.message = l.id + ': ' + e.message;
    throw e;
  }
}
console.log(
  'PASS 200 ELO answers through an independent row/column-sorted graph and all final constraint checks. This is not a second uniqueness proof.',
);

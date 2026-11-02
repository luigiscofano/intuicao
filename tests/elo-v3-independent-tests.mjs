// Testes e verificações de ELO.
/** Small hand-checkable fixtures independent of generated campaign metadata. */
import assert from 'node:assert/strict';
import { validateGeometry, eloEdges } from '../dist/geometry-games.mjs';
import { eloPointAllowed, solveElo } from '../dist/elo-rules.mjs';
const rectangle = {
  game: 'elo',
  rows: 4,
  cols: 4,
  regions: [0, 0, 1, 1, 0, 0, 1, 1, 3, 3, 2, 2, 3, 3, 2, 2],
  fixed: {},
};
const outer = [0, 3, 15, 12],
  inner = [5, 6, 10, 9];
const verdict = (constraints, positions = outer, l = rectangle) =>
  validateGeometry({ ...l, constraints }, { positions });
const valid = (constraints, positions = outer, l = rectangle) => {
  const v = verdict(constraints, positions, l);
  assert.equal(v.valid, true, JSON.stringify(v));
  assert.equal(v.complete, true);
  return v;
};
const invalid = (constraints, positions = outer, l = rectangle) =>
  assert.equal(verdict(constraints, positions, l).valid, false, JSON.stringify(constraints));
let cases = 0;
const test = (name, fn) => {
  fn();
  cases++;
  console.log('PASS ' + name);
};
test('classic and alternative solution are accepted by rules', () => {
  valid({});
  valid({}, inner);
  const l = { ...rectangle };
  Object.defineProperty(l, 'solution', {
    get() {
      throw Error('Reference answer read');
    },
  });
  assert.ok(validateGeometry(l, { positions: inner }).complete);
});
test('turns versus straights constrain the region point, not its coordinate', () => {
  valid({ shapes: { 0: 'turn', 1: 'turn' } });
  valid({ shapes: { 0: 'turn' } }, inner);
  invalid({ shapes: { 0: 'straight' } });
});
test('passage uses strict segment interior and remains point-free', () => {
  valid({ passages: [1, 11] });
  invalid({ passages: [0] });
  invalid({ passages: [5] });
  assert.equal(eloPointAllowed({ ...rectangle, constraints: { passages: [1] } }, 1), false);
});
test('forbidden unit interval is checked without hiding automatic edges', () => {
  const v = verdict({ forbiddenEdges: [[1, 2]] });
  assert.equal(v.valid, false);
  assert.deepEqual(v.edges, eloEdges(rectangle, outer));
  valid({ forbiddenEdges: [[5, 6]] });
});
test('row and column counts count points, not crossed segments', () => {
  valid({ rowCounts: { 0: 2, 1: 0, 3: 2 }, colCounts: { 0: 2, 1: 0 } });
  invalid({ rowCounts: { 1: 1 } });
  const l = { ...rectangle, fixed: { 0: 0, 1: 3 } };
  assert.equal(verdict({ rowCounts: { 0: 2 } }, outer, l).complete, true);
});
test('distance is the sum of the two first-visible incident lengths', () => {
  valid({ distances: { 0: 6, 1: 6, 2: 6, 3: 6 } });
  invalid({ distances: { 0: 5 } });
});
test('neighbors require a direct edge, not a path', () => {
  valid({
    neighbors: [
      [0, 1],
      [1, 2],
    ],
  });
  invalid({ neighbors: [[0, 2]] });
});
test('order accepts cyclic rotation and reversal, not a permutation', () => {
  for (const order of [
    [0, 1, 2, 3],
    [2, 3, 0, 1],
    [3, 2, 1, 0],
  ])
    valid({ order });
  invalid({ order: [0, 2, 1, 3] });
});
test('cuts count links and do not act as walls', () => {
  valid({
    cuts: [
      { axis: 'row', index: 1, count: 2 },
      { axis: 'col', index: 1, count: 2 },
    ],
  });
  invalid({ cuts: [{ axis: 'col', index: 1, count: 1 }] });
});
test('exclusive passage means exactly one, including unused alternatives', () => {
  valid({ exclusivePassages: [{ id: 'A', cells: [1, 5] }] });
  invalid({ exclusivePassages: [{ id: 'A', cells: [1, 2] }] });
  invalid({ exclusivePassages: [{ id: 'A', cells: [5, 6] }] });
  assert.equal(
    eloPointAllowed(
      { ...rectangle, constraints: { exclusivePassages: [{ id: 'A', cells: [1, 5] }] } },
      5,
    ),
    false,
  );
});
const subdivided = { ...rectangle, regions: [0, 4, 1, 1, 0, 0, 1, 1, 3, 3, 2, 2, 3, 3, 2, 2] },
  five = [0, 3, 15, 12, 1];
test('first visible point replaces a long direct edge', () => {
  const es = eloEdges(subdivided, five);
  assert.ok(es.some((e) => e.includes(0) && e.includes(4)));
  assert.ok(es.some((e) => e.includes(1) && e.includes(4)));
  assert.ok(!es.some((e) => e.includes(0) && e.includes(1)));
  valid({}, five, subdivided);
  valid({ shapes: { 4: 'straight' }, distances: { 0: 4 } }, five, subdivided);
  invalid({ neighbors: [[0, 1]] }, five, subdivided);
});
test('a partial closed loop can be completed by subdivision', () => {
  const v = verdict({}, [0, 3, 15, 12, -1], subdivided);
  assert.equal(v.valid, true);
  assert.equal(v.complete, false);
});
test('distance in a partial graph can shorten after subdivision', () => {
  const v = verdict({ distances: { 0: 4 } }, [0, 3, 15, 12, -1], subdivided);
  assert.equal(v.valid, true);
  assert.equal(v.complete, false);
});
test('unmet passages and counts in an incomplete board are pending', () => {
  const v = verdict(
    { passages: [1], rowCounts: { 0: 2 }, cuts: [{ axis: 'row', index: 1, count: 2 }] },
    [-1, -1, -1, -1],
  );
  assert.equal(v.valid, true);
  assert.equal(v.complete, false);
});
test('annotation X does not affect mathematical truth', () => {
  const l = { ...rectangle, constraints: { passages: [1] } };
  assert.deepEqual(
    validateGeometry(l, { positions: outer, discarded: [...Array(16).keys()] }),
    validateGeometry(l, { positions: outer, discarded: [] }),
  );
});
test('bounded solver never labels a node-budget cutoff exhaustive', () => {
  const r = solveElo(rectangle, undefined, 2, { maxNodes: 1, maxMs: Infinity });
  assert.equal(r.exhaustive, false);
  assert.ok(r.cutoffReason);
});
console.log(JSON.stringify({ passed: true, independentMechanicCases: cases }));

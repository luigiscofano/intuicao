/** Reproduces the independent audit of the materialized REPASSE catalogue.
 * Run: node tests/repasse-independent-audit.mjs
 * The sample oracle below does not import production transitions, search,
 * state keys, signatures, victory tests or pruning. It walks grid cells and
 * enumerates orders, pruning only a border that already exceeded its target.
 * Full-catalogue replay remains a separate check through the shared engine.
 */
import assert from 'node:assert/strict';
import {CAMPAIGN} from '../dist/repasse/campaign.mjs';
import {FALLBACK_LEVELS} from '../dist/repasse/fallback.mjs';
import {validateLevel, replay} from '../dist/repasse/engine.mjs';

const SIDES = ['top', 'right', 'bottom', 'left'];
const VECTORS = {up: [-1, 0], right: [0, 1], down: [1, 0], left: [0, -1]};
const kind = piece => piece.directions.length === 1 ? 'single'
  : piece.directions.length === 4 ? 'four'
    : piece.directions.includes('up') && piece.directions.includes('down')
      || piece.directions.includes('left') && piece.directions.includes('right') ? 'original' : 'corner';

function gcd(a, b) {
  while (b) [a, b] = [b, a % b];
  return a;
}

// Coordinate/vector canonicalization written separately from generator.mjs.
// Boundary boxes are represented by points just outside the compressed grid.
function canonical(level, topology = false) {
  const rows = [...new Set(level.pieces.map(p => p.row))].sort((a, b) => a - b);
  const cols = [...new Set(level.pieces.map(p => p.col))].sort((a, b) => a - b);
  const R = rows.length, C = cols.length;
  const pieces = level.pieces.map(p => ({
    r: rows.indexOf(p.row), c: cols.indexOf(p.col), v: p.value,
    ds: p.directions.map(d => VECTORS[d])
  }));
  const edges = [];
  for (let c = 0; c < C; c++) edges.push(
    {r: -1, c, v: level.targets.top[cols[c]]},
    {r: R, c, v: level.targets.bottom[cols[c]]}
  );
  for (let r = 0; r < R; r++) edges.push(
    {r, c: -1, v: level.targets.left[rows[r]]},
    {r, c: C, v: level.targets.right[rows[r]]}
  );
  const factor = topology ? 1 : [...pieces.map(p => p.v), ...edges.map(e => e.v)].reduce(gcd, 0);
  const keys = [];
  for (const mirror of [false, true]) for (let turn = 0; turn < 4; turn++) {
    const vector = (r, c) => {
      if (mirror) c = -c;
      for (let k = 0; k < turn; k++) [r, c] = [c, -r];
      return [r, c];
    };
    const points = pieces.map(p => ({...p, xy: vector(p.r, p.c)}));
    const minR = Math.min(...points.map(p => p.xy[0])), minC = Math.min(...points.map(p => p.xy[1]));
    const maxR = Math.max(...points.map(p => p.xy[0])) - minR;
    const maxC = Math.max(...points.map(p => p.xy[1])) - minC;
    const data = points.map(p => [
      p.xy[0] - minR, p.xy[1] - minC,
      p.ds.map(([r, c]) => vector(r, c).join(':')).sort().join('|'),
      ...(topology ? [] : [p.v / factor])
    ]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const borders = {
      top: Array(maxC + 1).fill(0), right: Array(maxR + 1).fill(0),
      bottom: Array(maxC + 1).fill(0), left: Array(maxR + 1).fill(0)
    };
    for (const edge of edges) {
      let [r, c] = vector(edge.r, edge.c);
      r -= minR; c -= minC;
      const side = r < 0 ? 'top' : r > maxR ? 'bottom' : c < 0 ? 'left' : 'right';
      borders[side][side === 'top' || side === 'bottom' ? c : r] = edge.v / factor;
    }
    keys.push(JSON.stringify([maxR + 1, maxC + 1, data, ...(topology ? [] : [SIDES.map(s => borders[s])])]));
  }
  return keys.sort()[0];
}

function equivalences(items, topology = false) {
  const groups = new Map();
  for (const level of items) {
    const key = canonical(level, topology);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(level.id);
  }
  return {distinct: groups.size, duplicates: [...groups.values()].filter(ids => ids.length > 1)};
}

// Exact order enumeration with mutable apply/undo to avoid a factorial array.
// No memoization or production necessary-condition pruning is used here.
function auditOrders(level) {
  const n = level.pieces.length;
  const values = level.pieces.map(p => p.value);
  const boxes = {
    top: Array(level.cols).fill(0), bottom: Array(level.cols).fill(0),
    left: Array(level.rows).fill(0), right: Array(level.rows).fill(0)
  };
  const path = [], grid = Array.from({length: level.rows}, () => Array(level.cols).fill(-1));
  level.pieces.forEach((p, i) => { grid[p.row][p.col] = i; });
  const moves = level.pieces.map(p => p.directions.map(d => ({
    up: [-1, 0, 'top'], right: [0, 1, 'right'], down: [1, 0, 'bottom'], left: [0, -1, 'left']
  })[d]));
  const firstCounts = {}, last = new Set(), safeFirst = [], forced = new Set();
  let count = 0, nodes = 0, pruned = 0;
  function visit(depth) {
    nodes++;
    if (depth === n) {
      if (!SIDES.every(s => boxes[s].every((value, i) => value === level.targets[s][i]))) return;
      count++;
      const order = path.map(i => level.pieces[i].id), positions = Array(n);
      path.forEach((i, k) => { positions[i] = k; });
      firstCounts[order[0]] = (firstCounts[order[0]] ?? 0) + 1;
      last.add(order.at(-1));
      if (count === 1) {
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (positions[i] < positions[j]) forced.add(i * n + j);
      } else for (const code of forced) {
        if (positions[Math.floor(code / n)] > positions[code % n]) forced.delete(code);
      }
      return;
    }
    for (let i = 0; i < n; i++) if (values[i]) {
      const value = values[i], piece = level.pieces[i], changes = [];
      values[i] = 0;
      let over = false;
      for (const [dr, dc, side] of moves[i]) {
        let row = piece.row + dr, col = piece.col + dc, receiver = -1;
        while (row >= 0 && row < level.rows && col >= 0 && col < level.cols) {
          const index = grid[row][col];
          if (index >= 0 && values[index]) { receiver = index; break; }
          row += dr; col += dc;
        }
        if (receiver >= 0) {
          values[receiver] += value;
          changes.push([values, receiver]);
        } else {
          const index = dc ? piece.row : piece.col;
          boxes[side][index] += value;
          changes.push([boxes[side], index]);
          if (boxes[side][index] > level.targets[side][index]) over = true;
        }
      }
      if (depth === 0 && !over) safeFirst.push(piece.id);
      if (!over) { path.push(i); visit(depth + 1); path.pop(); }
      else pruned++;
      for (const [array, index] of changes) array[index] -= value;
      values[i] = value;
    }
  }
  visit(0);
  return {
    count, firstCounts, last: [...last].sort(), safeFirst: safeFirst.sort(),
    forced: [...forced].map(code => [level.pieces[Math.floor(code / n)].id, level.pieces[code % n].id].join('>')).sort(),
    nodes, pruned
  };
}

assert.equal(CAMPAIGN.length, 500);
assert.ok(CAMPAIGN.every((level, i) => level.id === i + 1));
const chapters = [];
for (let chapter = 1; chapter <= 20; chapter++) {
  const levels = CAMPAIGN.filter(level => level.chapter === chapter);
  assert.equal(levels.length, 25);
  const expanded = levels.filter(level => level.pieces.some(piece => kind(piece) !== 'original')).length;
  const expected = chapter <= 8 ? 0 : chapter % 2 ? 13 : 12;
  assert.equal(expanded, expected, `Configurações do capítulo ${chapter}`);
  chapters.push({chapter, total: 25, original: 25 - expanded, expanded});
}
assert.equal(chapters.reduce((sum, chapter) => sum + chapter.original, 0), 350);
assert.equal(chapters.reduce((sum, chapter) => sum + chapter.expanded, 0), 150);
for (const [configuration, id] of [['single', 201], ['corner', 276], ['four', 351]]) {
  assert.equal(CAMPAIGN.find(level => level.pieces.some(piece => kind(piece) === configuration))?.id, id);
  const level = CAMPAIGN[id - 1];
  assert.ok(level.pieces.length <= 5);
  assert.equal(level.pieces.filter(piece => kind(piece) === configuration).length, 1);
  assert.ok(level.pieces.every(piece => ['original', configuration].includes(kind(piece))));
}
assert.ok(CAMPAIGN.at(-1).pieces.every(piece => kind(piece) === 'original'));
const categoryCounts = Object.fromEntries(['Básico', 'Intermediário', 'Avançado', 'Mestre'].map(category => [category, CAMPAIGN.filter(level => level.category === category).length]));
assert.deepEqual(categoryCounts, {'Básico': 200, 'Intermediário': 100, 'Avançado': 100, 'Mestre': 100});

const maxima = {campaign: {value: 0, target: 0, rows: 0, cols: 0, pieces: 0}, reserves: {value: 0, target: 0, rows: 0, cols: 0, pieces: 0}};
for (const [label, levels] of [['campaign', CAMPAIGN], ['reserves', FALLBACK_LEVELS]]) for (const level of levels) {
  assert.equal(validateLevel(level).valid, true, `Definição ${level.id}`);
  const played = replay(level, level.solution);
  assert.equal(played.valid && played.solved, true, `Solução ${level.id}`);
  const maximum = maxima[label];
  maximum.rows = Math.max(maximum.rows, level.rows);
  maximum.cols = Math.max(maximum.cols, level.cols);
  maximum.pieces = Math.max(maximum.pieces, level.pieces.length);
  maximum.target = Math.max(maximum.target, ...Object.values(level.targets).flat());
  maximum.value = Math.max(maximum.value, ...played.steps.flatMap(step => [step.removed.value, ...step.state.values, ...Object.values(step.state.boxes).flat()]));
}
assert.equal(FALLBACK_LEVELS.length, 80);

const signatures = equivalences(CAMPAIGN), topologies = equivalences(CAMPAIGN, true);
assert.equal(signatures.distinct, 498);
assert.equal(topologies.distinct, 496);
assert.deepEqual(signatures.duplicates, [[1, 2], [3, 5]]);
assert.deepEqual(topologies.duplicates, [[1, 2], [3, 5], [7, 8, 9]]);
assert.ok([2, 5, 7, 8, 9].every(id => CAMPAIGN[id - 1].validation.intentionalPair));
assert.deepEqual(equivalences(FALLBACK_LEVELS).duplicates, []);
const campaignSignatures = new Set(CAMPAIGN.map(level => canonical(level)));
assert.ok(FALLBACK_LEVELS.every(level => !campaignSignatures.has(canonical(level))));

// Exactly the sample used in the original independent audit: the first 14
// directed lessons, every chapter's closing phase, all arrow introductions,
// phase 500, and the first/last post-100 primary instance of each family.
const ids = new Set([
  ...Array.from({length: 14}, (_, i) => i + 1), 201, 276, 351, 500,
  ...Array.from({length: 20}, (_, i) => (i + 1) * 25)
]);
for (const family of new Set(CAMPAIGN.map(level => level.primaryConcept))) {
  const group = CAMPAIGN.filter(level => level.primaryConcept === family && level.id > 100);
  if (group.length) { ids.add(group[0].id); ids.add(group.at(-1).id); }
}
const results = [], discrepancies = [];
for (const id of [...ids].sort((a, b) => a - b)) {
  const level = CAMPAIGN[id - 1], independent = auditOrders(level), stored = level.validation.alternatives;
  const comparisons = {
    solutionCount: [independent.count, stored.solutionCount],
    firstCounts: [independent.firstCounts, stored.firstCounts],
    lastMoves: [independent.last, [...stored.lastMoves].sort()],
    safeFirstMoves: [independent.safeFirst, [...stored.safeFirstMoves].sort()],
    requiredPrecedences: [independent.forced, stored.requiredPrecedences.map(pair => pair.join('>')).sort()]
  };
  for (const [metric, [expected, actual]] of Object.entries(comparisons)) {
    try { assert.deepEqual(expected, actual); }
    catch { discrepancies.push({id, metric, expected, actual}); }
  }
  results.push({id, pieces: level.pieces.length, solutions: independent.count, nodes: independent.nodes, precedences: independent.forced.length});
}
const totalNodes = results.reduce((sum, result) => sum + result.nodes, 0);
assert.equal(results.length, 64);
assert.equal(totalNodes, 8_360_434);
assert.deepEqual(discrepancies, []);
console.log(JSON.stringify({
  campaignReplays: CAMPAIGN.length, reserveReplays: FALLBACK_LEVELS.length,
  categoryCounts, chapters, maxima, signatures, topologies,
  sampleCount: results.length, totalNodes, discrepancies, results
}, null, 2));

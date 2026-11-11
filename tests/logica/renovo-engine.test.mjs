import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CAMPAIGN, initialState, applyAction, checkState, isStateValid, solutionState, renderBoard } from '../../dist/logica/games/renovo/index.mjs';

const fixtures = JSON.parse(readFileSync(new URL('./renovo-fixtures.json', import.meta.url), 'utf8'));
const rightAngle = { width: 3, height: 3, pieces: { 0: 'S', 2: 'B', 8: 'F' }, solution: [[0, 2, 8]] };
const freeze = value => { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; };

// Auditor independente: ocupa todos os pontos inteiros de cada L. Não usa
// visiblePieces, isLinkAllowed, segmentsIntersect nem o solution da fase.
function independentCount(level) {
  const entries = Object.entries(level.pieces).map(([key, kind]) => [Number(key), kind]);
  const pieces = new Set(entries.map(([index]) => index));
  const point = index => [index % level.width, Math.floor(index / level.width)];
  function segment(a, b) {
    const [ax, ay] = point(a), [bx, by] = point(b);
    if (ax !== bx && ay !== by || a === b) return null;
    const dx = Math.sign(bx - ax), dy = Math.sign(by - ay), length = Math.abs(bx - ax) + Math.abs(by - ay);
    const route = Array.from({ length: length + 1 }, (_, i) => (ay + i * dy) * level.width + ax + i * dx);
    return route.slice(1, -1).some(index => pieces.has(index)) ? null : route;
  }
  const buds = entries.filter(([, kind]) => kind === 'B').map(([index]) => index);
  const candidates = new Map();
  for (const bud of buds) {
    const [bx, by] = point(bud), choices = [];
    for (const [seed, seedKind] of entries) if (seedKind === 'S') {
      const left = segment(bud, seed); if (!left) continue;
      const [sx, sy] = point(seed);
      for (const [leaf, leafKind] of entries) if (leafKind === 'F') {
        const right = segment(bud, leaf); if (!right) continue;
        const [fx, fy] = point(leaf);
        if ((sx - bx) * (fx - bx) + (sy - by) * (fy - by) !== 0) continue;
        choices.push({ seed, leaf, occupied: new Set([...left, ...right]) });
      }
    }
    candidates.set(bud, choices);
  }
  let count = 0;
  function search(remaining, used, occupied) {
    if (count >= 2) return;
    if (remaining.length === 0) { count += 1; return; }
    const domains = remaining.map(bud => [bud, candidates.get(bud).filter(choice => !used.has(choice.seed) && !used.has(choice.leaf) && [...choice.occupied].every(index => !occupied.has(index)))]).sort((a, b) => a[1].length - b[1].length);
    const [bud, choices] = domains[0];
    for (const choice of choices) search(remaining.filter(index => index !== bud), new Set([...used, choice.seed, choice.leaf]), new Set([...occupied, ...choice.occupied]));
  }
  search(buds, new Set(), new Set());
  return count;
}

test('RENOVO: 80 fases, IDs distintos e seis faixas', () => {
  assert.equal(CAMPAIGN.length, 80);
  assert.equal(new Set(CAMPAIGN.map(level => level.id)).size, 80);
  assert.deepEqual(Array.from({ length: 6 }, (_, d) => CAMPAIGN.filter(level => level.difficulty === d).length), [15, 15, 15, 15, 15, 5]);
  CAMPAIGN.forEach((level, i) => { assert.equal(level.number, i + 1); assert.equal(level.game, 'renovo'); assert.equal(level.version, 1); });
});

test('RENOVO: fixtures e 80 fases têm uma solução por auditor independente', () => {
  for (const level of [...fixtures, ...CAMPAIGN]) {
    assert.equal(isStateValid(level, initialState(level)), true, level.id);
    assert.equal(checkState(level, initialState(level)).valid, false, level.id);
    const solution = solutionState(level);
    assert.equal(checkState(level, solution).valid, true, level.id);
    const withoutAnswer = { width: level.width, height: level.height, pieces: level.pieces };
    assert.equal(independentCount(withoutAnswer), 1, level.id);
  }
  for (const fixture of fixtures) {
    const entries = value => Object.entries(value).sort((a, b) => Number(a[0]) - Number(b[0]));
    assert.ok(CAMPAIGN.some(level => level.width === fixture.width && level.height === fixture.height && JSON.stringify(entries(level.pieces)) === JSON.stringify(entries(fixture.pieces))), 'Fixture deve integrar o catálogo sem mover as peças.');
  }
});

test('RENOVO: checker não consulta solution e aceita ligação em qualquer ordem', () => {
  const level = { ...rightAngle, get solution() { throw new Error('O verificador não deve consultar o gabarito.'); } };
  assert.equal(checkState(level, { links: [[8, 2], [2, 0]], selected: 2 }).valid, true);
  assert.equal(checkState(level, { links: [[0, 2]], selected: null }).complete, false);
});

test('RENOVO: não permite saltar a primeira peça nem unir peças incompatíveis', () => {
  const skip = { width: 3, height: 3, pieces: { 0: 'S', 1: 'S', 2: 'B', 5: 'F', 8: 'B', 7: 'F' } };
  assert.equal(isStateValid(skip, { links: [[0, 2]], selected: null }), false);
  assert.equal(isStateValid(rightAngle, { links: [[0, 8]], selected: null }), false);
  const start = initialState(skip);
  assert.equal(applyAction(skip, start, { type: 'link', from: 0, to: 2 }), start);
});

test('RENOVO: trios retos, parceiros repetidos e cruzamentos não vencem', () => {
  const straight = { width: 3, height: 3, pieces: { 3: 'S', 4: 'B', 5: 'F' } };
  const straightResult = checkState(straight, { links: [[3, 4], [4, 5]], selected: null });
  assert.equal(straightResult.complete, true); assert.equal(straightResult.valid, false);
  const partners = { width: 3, height: 3, pieces: { 4: 'B', 3: 'S', 1: 'S', 6: 'B', 2: 'F', 8: 'F' } };
  const wrongKinds = checkState(partners, { links: [[3, 4], [1, 4]], selected: null });
  assert.equal(wrongKinds.valid, false); assert.ok(wrongKinds.errors.includes(4));
  const crossing = { width: 5, height: 5, pieces: { 5: 'S', 9: 'B', 24: 'F', 2: 'S', 17: 'B', 15: 'F' } };
  const result = checkState(crossing, { links: [[5, 9], [9, 24], [2, 17], [15, 17]], selected: null });
  assert.equal(result.complete, true); assert.equal(result.valid, false); assert.match(result.message, /cruzar/);
  assert.equal(independentCount(straight), 0); assert.equal(independentCount(crossing), 0);
});

test('RENOVO: saves malformados e duplicata com extremos invertidos são rejeitados', () => {
  const invalid = [null, {}, [], { links: [] }, { links: [], selected: 4 }, { links: [], selected: '2' }, { links: [], selected: null, extra: true }, { links: Array(1), selected: null }, { links: [[0, 2], [2, 0]], selected: null }, { links: [[0, 2, 8]], selected: null }, { links: [[0, '2']], selected: null }];
  for (const state of invalid) { assert.equal(isStateValid(rightAngle, state), false); assert.equal(checkState(rightAngle, state).valid, false); assert.equal(checkState(rightAngle, state).complete, false); }
});

test('RENOVO: seleção, ligação, remoção e limpar não modificam o histórico', () => {
  const level = freeze(structuredClone(rightAngle)), start = freeze(initialState(level));
  const selected = applyAction(level, start, { type: 'cell', index: 0, tool: 'select' });
  assert.equal(selected.selected, 0); assert.equal(start.selected, null);
  const linked = applyAction(level, freeze(selected), { type: 'cell', index: 2, tool: 'select' });
  assert.deepEqual(linked, { links: [[0, 2]], selected: null });
  const complete = applyAction(level, freeze(linked), { type: 'link', from: 8, to: 2 });
  assert.deepEqual(linked.links, [[0, 2]]); assert.equal(checkState(level, complete).valid, true);
  assert.notEqual(complete.links[0], linked.links[0]);
  const toggle = applyAction(level, freeze(complete), { type: 'link', from: 2, to: 0 });
  assert.deepEqual(toggle.links, [[2, 8]]);
  const clear = applyAction(level, toggle, { type: 'cell', index: 2, tool: 'clear' });
  assert.deepEqual(clear, start);
  assert.deepEqual(applyAction(level, selected, { type: 'cancel-selection' }), start);
  assert.equal(applyAction(level, start, { type: 'cell', index: 4, tool: 'select' }), start);
  assert.equal(applyAction(level, start, { type: 'cell', index: 0, tool: 'unknown' }), start);
});

test('RENOVO: view expõe todas as peças como alvos acessíveis e não os vazios', () => {
  const level = fixtures[0], markup = renderBoard(level, initialState(level));
  const targets = [...markup.matchAll(/<g\b[^>]*data-cell="(\d+)"[^>]*>/g)];
  assert.equal(targets.length, Object.keys(level.pieces).length);
  for (const [tag, index] of targets) { assert.ok(Object.hasOwn(level.pieces, index)); assert.match(tag, /role="button"/); assert.match(tag, /tabindex="0"/); assert.match(tag, /aria-label="[^"]+"/); }
  assert.match(markup, /viewBox="0 0 /); assert.doesNotMatch(markup, /\bonclick=/);
});

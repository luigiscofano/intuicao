import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { CAMPAIGN, GAME, initialState, applyAction, isStateValid, checkState, solutionState, toolsForLevel, renderBoard } from '../../dist/logica/games/refugio/index.mjs';

const fixtures = JSON.parse(readFileSync(new URL('./refugio-fixtures.json', import.meta.url)));
const report = JSON.parse(readFileSync(new URL('./refugio-certificates.json', import.meta.url)));
const stateOf = cells => ({ cells: cells.slice(), lastChanged: null });
const stableJSON = value => Array.isArray(value) ? `[${value.map(stableJSON).join(',')}]` : value && typeof value === 'object' ? `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableJSON(value[key])}`).join(',')}}` : JSON.stringify(value);
function levelOf(rows, cols, markerIndices) {
  const givens = Array(rows * cols).fill(null); markerIndices.forEach(i => { givens[i] = 0; });
  return { rows, cols, givens, markers: markerIndices.map((index, i) => ({ index, label: i + 1 })) };
}
function canonical(cells, rows, cols) {
  let grid = Array.from({ length: rows }, (_, r) => cells.slice(r * cols, (r + 1) * cols));
  const keys = [];
  for (let turn = 0; turn < 4; turn += 1) {
    for (const g of [grid, grid.map(row => row.slice().reverse())]) keys.push(`${g.length}x${g[0].length}:${g.flat().join('')}`);
    grid = grid[0].map((_, c) => grid.map(row => row[c]).reverse());
  }
  return keys.sort()[0];
}

test('REFÚGIO: 80 níveis certificados, faixas completas e separadores estruturalmente diferentes', () => {
  assert.equal(CAMPAIGN.length, 80); assert.equal(GAME.rules.length, 3);
  const shapes = new Set(), ids = new Set(), bands = Array(6).fill(0);
  CAMPAIGN.forEach((level, i) => {
    assert.equal(level.number, i + 1); assert.equal(level.version, 1); assert.equal(level.game, 'refugio');
    ids.add(level.id); bands[level.difficulty] += 1;
    assert.ok(isStateValid(level, initialState(level)));
    const result = checkState(level, solutionState(level));
    assert.equal(result.valid, true, `${level.id}: ${result.message}`); assert.equal(result.complete, true);
    assert.equal(result.regions, level.markers.length);
    const cert = report.certificates[i]; assert.equal(cert.id, level.id); assert.equal(cert.solutionCount, 1); assert.equal(cert.searchExhausted, true);
    assert.equal(level.id, `refugio-${createHash('sha256').update(stableJSON(cert.definition)).digest('hex').slice(0, 16)}`);
    for (const key of ['rows', 'cols', 'markers', 'givens']) assert.deepEqual(level[key], cert.definition[key]);
    const shape = canonical(level.solution, level.rows, level.cols); assert.equal(shape, cert.canonicalSolution); shapes.add(shape);
    assert.ok(level.logic.maxDepth <= 2);
    if (level.difficulty < 2) assert.equal(level.logic.maxDepth, 0);
    if (level.difficulty >= 4) assert.ok(level.logic.maxDepth >= 1);
    if (level.difficulty === 3) assert.ok(level.markers.length >= 3);
    if (i > 0) assert.ok(level.logic.wallsToFind >= 1);
  });
  assert.equal(shapes.size, 80); assert.equal(ids.size, 80); assert.deepEqual(bands, [15, 15, 15, 15, 15, 5]);
});

test('REFÚGIO: enumeração independente dos dois exemplos aprovados confirma 1 entre 1.024 estados', () => {
  for (const level of fixtures) {
    const free = level.givens.flatMap((v, i) => v === null ? [i] : []), valid = [];
    assert.equal(free.length, 10);
    for (let mask = 0; mask < 2 ** free.length; mask += 1) {
      const cells = level.givens.slice(); free.forEach((i, bit) => { cells[i] = (mask >> bit) & 1; });
      if (checkState(level, stateOf(cells)).valid) valid.push(cells);
    }
    assert.deepEqual(valid, [level.solution]);
    assert.deepEqual(CAMPAIGN.find(item => item.fixture === level.fixture).solution, level.solution);
  }
});

test('REFÚGIO: dois marcos na mesma região são rejeitados', () => {
  const result = checkState(levelOf(2, 2, [0, 3]), stateOf([0, 0, 0, 0]));
  assert.equal(result.valid, false); assert.equal(result.complete, true); assert.match(result.message, /mais de um marco/);
});

test('REFÚGIO: um bolsão sem marco é rejeitado mesmo quando todas as barreiras tocam duas regiões', () => {
  const result = checkState(levelOf(1, 5, [0, 4]), stateOf([0, 1, 0, 1, 0]));
  assert.equal(result.valid, false); assert.match(result.message, /sem marco/);
  assert.deepEqual(Object.values(result.wallContacts), [2, 2]);
});

test('REFÚGIO: duas casas da mesma região não são duas regiões', () => {
  const result = checkState(levelOf(2, 2, [0]), stateOf([0, 0, 0, 1]));
  assert.equal(result.valid, false); assert.equal(result.wallContacts[3], 1); assert.ok(result.errors.includes(3));
});

test('REFÚGIO: barreira em contato com três refúgios também está errada', () => {
  const result = checkState(levelOf(2, 3, [0, 2, 4]), stateOf([0, 1, 0, 1, 0, 1]));
  assert.equal(result.regions, 3); assert.equal(result.wallContacts[1], 3); assert.equal(result.valid, false);
  assert.equal(result.wallContacts[3], 2); assert.equal(result.wallContacts[5], 2);
});

test('REFÚGIO: uma barreira pode tocar três casas, desde que sejam de apenas duas regiões', () => {
  const level = fixtures[0], result = checkState(level, stateOf(level.solution));
  assert.equal(level.solution[0], 0); assert.equal(level.solution[2], 0); assert.equal(level.solution[5], 0);
  assert.equal(result.wallContacts[1], 2); assert.equal(result.valid, true);
});

test('REFÚGIO: diagonais não conectam e as próprias barreiras podem ser desconectadas', () => {
  const level = levelOf(2, 2, [0, 3]);
  const result = checkState(level, stateOf([0, 1, 1, 0]));
  assert.equal(result.valid, true); assert.equal(result.regions, 2);
  const renamed = { ...level, markers: [{ index: 0, label: 20 }, { index: 3, label: 90 }] };
  assert.equal(checkState(renamed, stateOf([0, 1, 1, 0])).valid, true);
});

test('REFÚGIO: não se introduz a proibição de bloco 2 × 2 de outro puzzle', () => {
  const level = levelOf(4, 4, [1, 4, 7, 13]);
  const cells = [1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1];
  const result = checkState(level, stateOf(cells));
  assert.equal(result.valid, true); assert.equal(result.regions, 4);
  assert.deepEqual([cells[5], cells[6], cells[9], cells[10]], [1, 1, 1, 1]);
});

test('REFÚGIO: verificar usa regras, preserva indecisão e ignora o campo de gabarito', () => {
  const level = { ...fixtures[1], solution: ['errado'] };
  assert.equal(checkState(level, stateOf(fixtures[1].solution)).valid, true);
  assert.equal(checkState(level, initialState(level)).complete, false);
});

test('REFÚGIO: ações são imutáveis; ferramentas, pistas e reinício preservam o contrato', () => {
  const level = CAMPAIGN[0], state = initialState(level), i = level.givens.indexOf(null), before = JSON.stringify(state);
  Object.freeze(state.cells); Object.freeze(state);
  let next = applyAction(level, state, { type: 'cell', index: i, tool: 'cycle' });
  assert.equal(next.cells[i], 0); assert.equal(next.lastChanged, i);
  next = applyAction(level, next, { type: 'cell', index: i, tool: 'cycle' }); assert.equal(next.cells[i], 1);
  next = applyAction(level, next, { type: 'cell', index: i, tool: 'cycle' }); assert.equal(next.cells[i], null);
  next = applyAction(level, next, { type: 'cell', index: i, tool: 'wall' }); assert.equal(next.cells[i], 1);
  next = applyAction(level, next, { type: 'cell', index: i, tool: 'free' }); assert.equal(next.cells[i], 0);
  next = applyAction(level, next, { type: 'cell', index: i, tool: 'erase' }); assert.equal(next.cells[i], null);
  assert.strictEqual(applyAction(level, state, { type: 'cell', index: level.markers[0].index, tool: 'wall' }), state);
  assert.strictEqual(applyAction(level, state, { type: 'cell', index: -1, tool: 'wall' }), state);
  assert.strictEqual(applyAction(level, state, { type: 'cell', index: i, tool: 'inexistente' }), state);
  assert.equal(JSON.stringify(state), before); assert.deepEqual(initialState(level), JSON.parse(before));
  assert.deepEqual(toolsForLevel(level).map(tool => tool.id), ['cycle', 'free', 'wall', 'erase']);
});

test('REFÚGIO: saves malformados e pistas alteradas são recusados, mesmo em arrays esparsos', () => {
  const level = CAMPAIGN[0], state = initialState(level), i = level.givens.indexOf(null);
  const bad = [null, {}, { cells: [] }, { cells: Array(level.rows * level.cols) }, { ...state, lastChanged: -1 }, { ...state, lastChanged: '0' }];
  for (const value of [undefined, false, '0', 2, -1, {}, []]) { const cells = state.cells.slice(); cells[i] = value; bad.push({ cells }); }
  const changed = state.cells.slice(); changed[level.markers[0].index] = 1; bad.push({ cells: changed });
  const sparse = state.cells.slice(); delete sparse[i]; bad.push({ cells: sparse });
  for (const b of bad) { assert.equal(isStateValid(level, b), false); assert.equal(checkState(level, b).valid, false); }
  assert.ok(isStateValid(level, JSON.parse(JSON.stringify(state))));
});

test('REFÚGIO: soluções são cópias e todos os alvos SVG têm nomes e foco de teclado', () => {
  const level = CAMPAIGN[79], answer = solutionState(level), original = level.solution[0]; answer.cells[0] = null;
  assert.equal(level.solution[0], original);
  const svg = renderBoard(level, initialState(level), { selectedTool: 'wall' });
  assert.equal((svg.match(/data-cell="/g) || []).length, level.rows * level.cols);
  assert.equal((svg.match(/role="button" tabindex="0"/g) || []).length, level.rows * level.cols);
  assert.match(svg, /viewBox="0 0 /); assert.match(svg, /width="100%"/); assert.match(svg, /aria-label="A1, /);
  assert.match(svg, /pattern/); assert.match(svg, /pista fixa/); assert.match(svg, /não indica área/);
  assert.doesNotMatch(svg, /<script|on(?:click|keydown)=/i);
});

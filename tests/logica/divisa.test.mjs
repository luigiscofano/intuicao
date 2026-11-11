import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { CAMPAIGN, GAME, initialState, applyAction, isStateValid, checkState, solutionState, toolsForLevel, renderBoard } from '../../dist/logica/games/divisa/index.mjs';
import { contactCounts } from '../../dist/logica/games/divisa/engine.mjs';

const fixtures = JSON.parse(readFileSync(new URL('./divisa-fixtures.json', import.meta.url)));
const report = JSON.parse(readFileSync(new URL('./divisa-certificates.json', import.meta.url)));
const completeState = cells => ({ cells: cells.slice(), lastChanged: null });
const blankLevel = (rows, cols, contacts) => ({ rows, cols, letters: ['A', 'B', 'C'], contacts, givens: Array(rows * cols).fill(null) });
const stableJSON = value => Array.isArray(value) ? `[${value.map(stableJSON).join(',')}]` : value && typeof value === 'object' ? `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableJSON(value[key])}`).join(',')}}` : JSON.stringify(value);

function canonical(solution, rows, cols) {
  let grid = Array.from({ length: rows }, (_, r) => solution.slice(r * cols, (r + 1) * cols));
  const keys = [];
  for (let turn = 0; turn < 4; turn += 1) {
    for (const reflected of [grid, grid.map(row => row.slice().reverse())]) {
      const names = new Map();
      const norm = reflected.flat().map(value => { if (!names.has(value)) names.set(value, names.size); return names.get(value); });
      keys.push(`${reflected.length}x${reflected[0].length}:${norm.join('')}`);
    }
    grid = grid[0].map((_, c) => grid.map(row => row[c]).reverse());
  }
  return keys.sort()[0];
}

test('DIVISA: campanha inteira tem 80 definições estáveis, gabaritos corretos e geometria distinta', () => {
  assert.equal(CAMPAIGN.length, 80);
  assert.equal(GAME.rules.length, 3);
  const geometries = new Set(), ids = new Set();
  const bands = Array(6).fill(0);
  CAMPAIGN.forEach((level, index) => {
    assert.equal(level.number, index + 1);
    assert.equal(level.version, 1);
    assert.equal(level.game, 'divisa');
    assert.match(level.id, /^divisa-[a-f0-9]{16}$/);
    ids.add(level.id); bands[level.difficulty] += 1;
    assert.ok(isStateValid(level, initialState(level)));
    const checked = checkState(level, solutionState(level));
    assert.equal(checked.complete, true);
    assert.equal(checked.valid, true, `${level.id}: ${checked.message}`);
    const cert = report.certificates[index];
    assert.equal(cert.id, level.id);
    assert.equal(level.id, `divisa-${createHash('sha256').update(stableJSON(cert.definition)).digest('hex').slice(0, 16)}`);
    assert.equal(cert.solutionCount, 1);
    assert.equal(cert.searchExhausted, true);
    for (const key of ['rows', 'cols', 'letters', 'givens', 'contacts']) assert.deepEqual(level[key], cert.definition[key]);
    const shape = canonical(level.solution, level.rows, level.cols);
    assert.equal(shape, cert.canonicalSolution);
    geometries.add(shape);
    assert.ok(level.logic.maxDepth <= 2);
    if (level.difficulty < 2) assert.equal(level.logic.maxDepth, 0);
    if (level.difficulty >= 3) assert.ok(level.logic.maxDepth >= 1);
    if (level.difficulty === 5) assert.equal(level.letters.length, 4);
    else assert.equal(level.letters.length, 3);
  });
  assert.equal(geometries.size, 80);
  assert.equal(ids.size, 80);
  assert.deepEqual(bands, [15, 15, 15, 15, 15, 5]);
});

test('DIVISA: os dois exemplos aprovados têm exatamente uma solução por enumeração independente', () => {
  for (const level of fixtures) {
    const cells = level.givens.slice(), free = cells.flatMap((v, i) => v === null ? [i] : []), valid = [];
    let leaves = 0;
    function visit(n) {
      if (n === free.length) { leaves += 1; if (checkState(level, completeState(cells)).valid) valid.push(cells.slice()); return; }
      for (const letter of level.letters) { cells[free[n]] = letter; visit(n + 1); }
    }
    visit(0);
    assert.equal(leaves, 27);
    assert.deepEqual(valid, [level.solution]);
    const campaignFixture = CAMPAIGN.find(item => item.fixture === level.fixture);
    assert.ok(campaignFixture);
    assert.deepEqual(campaignFixture.solution, level.solution);
  }
});

test('DIVISA: a regra de conexão rejeita componentes separados mesmo com todas as quotas corretas', () => {
  const level = blankLevel(3, 3, { AB: 4, AC: 0, BC: 3 });
  const state = completeState(['A', 'B', 'A', 'B', 'B', 'B', 'C', 'C', 'C']);
  assert.deepEqual(contactCounts(level, state.cells), level.contacts);
  const result = checkState(level, state);
  assert.equal(result.complete, true); assert.equal(result.valid, false);
  assert.match(result.message, /A.*ligadas por lados/);
  assert.ok(result.errors.includes(0) && result.errors.includes(2));
});

test('DIVISA: lados unitários, pares sem contato e borda externa são contados corretamente', () => {
  const level = blankLevel(1, 3, { AB: 1, AC: 0, BC: 1 });
  assert.equal(checkState(level, completeState(['A', 'B', 'C'])).valid, true);
  const wrongQuota = { ...level, contacts: { AB: 2, AC: 0, BC: 1 } };
  const result = checkState(wrongQuota, completeState(['A', 'B', 'C']));
  assert.equal(result.valid, false); assert.match(result.message, /A–B tem 1 lados/);
  const diagonal = blankLevel(2, 2, { AB: 2, AC: 2, BC: 0 });
  assert.equal(checkState(diagonal, completeState(['A', 'B', 'C', 'A'])).valid, false);
});

test('DIVISA: o validador não consulta solution e exige todas as casas decididas', () => {
  const level = { ...fixtures[0], solution: ['resposta deliberadamente incorreta'] };
  assert.equal(checkState(level, completeState(fixtures[0].solution)).valid, true);
  const pending = checkState(level, initialState(level));
  assert.equal(pending.complete, false); assert.equal(pending.valid, false);
});

test('DIVISA: transições não mutam estado, preservam pistas e oferecem ciclo completo', () => {
  const level = CAMPAIGN[0], state = initialState(level), before = JSON.stringify(state);
  const i = level.givens.indexOf(null), fixed = level.givens.findIndex(value => value !== null);
  Object.freeze(state.cells); Object.freeze(state);
  let next = applyAction(level, state, { type: 'cell', index: i, tool: 'A' });
  assert.equal(next.cells[i], 'A'); assert.equal(next.lastChanged, i);
  assert.equal(JSON.stringify(state), before);
  assert.strictEqual(applyAction(level, state, { type: 'cell', index: fixed, tool: 'erase' }), state);
  assert.strictEqual(applyAction(level, state, { type: 'cell', index: -1, tool: 'A' }), state);
  assert.strictEqual(applyAction(level, state, { type: 'cell', index: i, tool: 'inexistente' }), state);
  next = applyAction(level, next, { type: 'cell', index: i, tool: 'erase' });
  assert.equal(next.cells[i], null);
  for (let count = 0; count <= level.letters.length; count += 1) next = applyAction(level, next, { type: 'cell', index: i, tool: 'cycle' });
  assert.equal(next.cells[i], null);
  assert.deepEqual(initialState(level), JSON.parse(before));
  assert.deepEqual(toolsForLevel(level).map(tool => tool.id), ['cycle', ...level.letters, 'erase']);
});

test('DIVISA: saves malformados, arrays esparsos e pistas alteradas são recusados', () => {
  const level = CAMPAIGN[0], state = initialState(level), i = level.givens.indexOf(null), fixed = level.givens.findIndex(v => v !== null);
  const badStates = [null, {}, { cells: [] }, { cells: 'ABC' }, { cells: Array(level.rows * level.cols) }, { ...state, lastChanged: -1 }, { ...state, lastChanged: '2' }];
  for (const value of [undefined, false, 0, 'Z', {}, []]) {
    const cells = state.cells.slice(); cells[i] = value; badStates.push({ cells });
  }
  const changed = state.cells.slice(); changed[fixed] = null; badStates.push({ cells: changed });
  for (const bad of badStates) { assert.equal(isStateValid(level, bad), false); assert.equal(checkState(level, bad).valid, false); }
  assert.ok(isStateValid(level, JSON.parse(JSON.stringify(state))));
});

test('DIVISA: gabarito e início sempre retornam cópias; renderização acessível preserva alvos e pistas', () => {
  const level = CAMPAIGN[79], solved = solutionState(level), original = level.solution[0];
  solved.cells[0] = null; assert.equal(level.solution[0], original);
  const html = renderBoard(level, initialState(level), { selectedTool: 'D' });
  assert.match(html, /viewBox="0 0 /); assert.match(html, /width="100%"/);
  assert.equal((html.match(/data-cell="/g) || []).length, level.rows * level.cols);
  assert.equal((html.match(/role="button" tabindex="0"/g) || []).length, level.rows * level.cols);
  assert.match(html, /aria-label="A1, /); assert.match(html, /pista fixa/);
  assert.doesNotMatch(html, /<script|on(?:click|keydown)=/i);
  assert.match(html, /A–D/); assert.match(html, /#E1EDCE/); assert.match(html, /#F5E7B2/);
});

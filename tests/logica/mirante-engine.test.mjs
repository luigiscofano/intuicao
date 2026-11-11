import test from 'node:test';
import assert from 'node:assert/strict';
import { CAMPAIGN, GAME, initialState, applyAction, checkState, isStateValid, solutionState, toolsForLevel, renderBoard } from '../../dist/logica/games/mirante/index.mjs';
import { auditMirante } from '../../tools/logica/mirante-audit.mjs';
import { structuralSignature } from '../../tools/logica/mirante-build.mjs';

test('MIRANTE: 80 definições e diversidade descontando rotação, reflexão e troca de formas', () => {
  assert.equal(CAMPAIGN.length, 80);
  assert.equal(new Set(CAMPAIGN.map(l => l.id)).size, 80);
  assert.equal(new Set(CAMPAIGN.map(structuralSignature)).size, 80);
  assert.deepEqual(Array.from({ length: 6 }, (_, d) => CAMPAIGN.filter(l => l.difficulty === d).length), [15, 15, 15, 15, 15, 5]);
  CAMPAIGN.forEach((level, index) => { assert.equal(level.number, index + 1); assert.equal(level.game, 'mirante'); assert.equal(level.version, 1); });
});

test('MIRANTE: enumeração independente de todas as distribuições certifica os 80 níveis', () => {
  for (const level of CAMPAIGN) {
    assert.equal(checkState(level, solutionState(level)).valid, true, level.id);
    const audit = auditMirante(level);
    assert.equal(audit.exhaustive, true); assert.equal(audit.solutions, 1, level.id);
    assert.deepEqual(audit.answer, level.solution);
    assert.equal(audit.withoutWitnesses > 1, level.certificate.witnessesEssential);
    if (level.number >= 46) {
      assert.ok(audit.orphanAlternative, level.id);
      assert.equal(checkState(level, { cells: audit.orphanAlternative }).valid, false);
    }
  }
});

test('MIRANTE: os exemplos aprovados mantêm as posições, estoque e doze observadores', () => {
  assert.deepEqual(CAMPAIGN[0].solution, [1, 1, 0, 0, 0, 2, 0, 0, 2]);
  assert.deepEqual(CAMPAIGN[15].solution, [1, 2, 0, 0, 1, 0, 0, 0, 2]);
  for (const level of [CAMPAIGN[0], CAMPAIGN[15]]) {
    assert.deepEqual(level.inventory, { circle: 2, triangle: 2 });
    assert.equal(Object.values(level.observers).flat().filter(Boolean).length, 12);
  }
});

test('MIRANTE: vistas opostas contam separadamente, vazios são transparentes e não há diagonais', () => {
  const opposite = { rows: 1, cols: 3, inventory: { circle: 1, triangle: 0 }, observers: { left: [1], right: [1], top: [null, null, null], bottom: [null, null, null] }, solution: [0, 0, 0] };
  assert.equal(checkState(opposite, { cells: [0, 1, 0] }).valid, true);
  assert.deepEqual(checkState(opposite, { cells: [0, 1, 0] }).witnesses, [0, 2, 0]);
  const diagonal = { rows: 2, cols: 2, inventory: { circle: 1, triangle: 0 }, observers: { left: [1, null], right: [null, null], top: [1, null], bottom: [null, null] } };
  assert.equal(checkState(diagonal, { cells: [0, 0, 0, 1] }).valid, false);
  assert.equal(checkState({ ...opposite, inventory: { circle: 0, triangle: 0 } }, { cells: [0, 0, 0] }).valid, false);
});

test('MIRANTE: uma primeira peça bloqueia a seguinte; estoque e forma são obrigatórios', () => {
  const level = { rows: 1, cols: 3, inventory: { circle: 1, triangle: 1 }, observers: { left: [1], right: [2], top: [1, 2, null], bottom: [null, null, null] }, solution: [2, 2, 2] };
  assert.equal(checkState(level, { cells: [1, 2, 0] }).valid, true);
  assert.equal(checkState({ ...level, observers: { ...level.observers, left: [2] } }, { cells: [1, 2, 0] }).valid, false);
  assert.equal(checkState({ ...level, inventory: { circle: 2, triangle: 1 } }, { cells: [1, 2, 0] }).valid, false);
  assert.equal(checkState({ ...level, observers: { ...level.observers, top: [null, 2, null] } }, { cells: [1, 2, 0] }).valid, false);
});

test('MIRANTE: integridade, transições imutáveis e reinício', () => {
  const level = CAMPAIGN[0], start = initialState(level);
  assert.equal(isStateValid(level, JSON.parse(JSON.stringify(start))), true);
  for (const state of [null, {}, { cells: [] }, { cells: Array(9) }, { cells: Array(9).fill(NaN) }, { cells: Array(9).fill(3) }, { cells: Array(9).fill('1') }]) {
    assert.equal(isStateValid(level, state), false);
    assert.equal(checkState(level, state).valid, false);
  }
  Object.freeze(start.cells); Object.freeze(start);
  let next = start;
  for (const value of [1, 2, 0, null]) { next = applyAction(level, next, { type: 'cell', index: 0, tool: 'cycle' }); assert.equal(next.cells[0], value); }
  assert.equal(start.cells[0], null);
  assert.equal(applyAction(level, start, { type: 'cell', index: 9, tool: 'circle' }), start);
  assert.equal(applyAction(level, start, { type: 'cell', index: 0, tool: 'bad' }), start);
  assert.deepEqual(initialState(level), start);
  const answer = solutionState(level); answer.cells[0] = null;
  assert.equal(level.solution[0], 1);
});

test('MIRANTE: markup acessível, formas independentes da cor e observadores fixos', () => {
  const level = CAMPAIGN[0], html = renderBoard(level, initialState(level), { selectedTool: 'triangle' });
  assert.equal((html.match(/data-cell=/g) || []).length, 9);
  assert.equal((html.match(/role="button" tabindex="0"/g) || []).length, 9);
  assert.match(html, /aria-label="A1: indecisa"/);
  assert.match(html, /observador fixo/);
  assert.match(html, /Estoque/);
  assert.doesNotMatch(html, /<script|onclick=|onkeydown=/);
  assert.equal(GAME.rules.length, 3);
  assert.deepEqual(toolsForLevel(level).map(t => t.id), ['cycle', 'circle', 'triangle', 'empty', 'clear']);
});

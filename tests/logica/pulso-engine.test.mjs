import test from 'node:test';
import assert from 'node:assert/strict';
import { CAMPAIGN, GAME, initialState, applyAction, checkState, isStateValid, solutionState, toolsForLevel, renderBoard } from '../../dist/logica/games/pulso/index.mjs';
import { auditPulso } from '../../tools/logica/pulso-audit.mjs';
import { structuralSignature } from '../../tools/logica/pulso-build.mjs';
import { solvePulso } from '../../tools/logica/pulso-solver.mjs';

test('PULSO: 80 definições, seis faixas e diversidade sem permutar linhas/refletir', () => {
  assert.equal(CAMPAIGN.length, 80);
  assert.equal(new Set(CAMPAIGN.map(l => l.id)).size, 80);
  assert.equal(new Set(CAMPAIGN.map(structuralSignature)).size, 80);
  assert.deepEqual(Array.from({ length: 6 }, (_, d) => CAMPAIGN.filter(l => l.difficulty === d).length), [15, 15, 15, 15, 15, 5]);
  CAMPAIGN.forEach((level, index) => { assert.equal(level.number, index + 1); assert.equal(level.game, 'pulso'); assert.equal(level.version, 1); });
});

test('PULSO: todas as soluções passam as regras e auditor independente comprova unicidade', () => {
  for (const level of CAMPAIGN) {
    assert.equal(checkState(level, solutionState(level)).valid, true, level.id);
    const audit = auditPulso(level);
    assert.equal(audit.exhaustive, true);
    assert.equal(audit.solutions, 1, level.id);
    assert.deepEqual(audit.answer, level.solution);
    assert.equal(solvePulso(level, { strength: level.certificate.requiredStrength, search: false }).count, 1);
  }
});

test('PULSO: exemplos aprovados preservam pistas e respostas', () => {
  const basic = CAMPAIGN[0], advanced = CAMPAIGN[45];
  assert.deepEqual(basic.quotas, [3, 2, 2, 1, 1, 1, 2]);
  assert.deepEqual(basic.givens, { 2: 1, 7: 0, 20: 1, 27: 0 });
  assert.deepEqual(advanced.quotas, [2, 1, 2, 1, 2, 1, 3]);
  assert.deepEqual(advanced.givens, { 1: 0, 8: 1, 19: 0, 23: 1 });
  assert.equal(solvePulso(advanced, { strength: 0, search: false }).count, 0);
  assert.equal(solvePulso(advanced, { strength: 1, search: false }).count, 1);
});

test('PULSO: as últimas dez fases acrescentam comparação de três colunas', () => {
  for (const level of CAMPAIGN.slice(70)) {
    assert.equal(solvePulso(level, { strength: 1, search: false }).count, 0, level.id);
    assert.equal(solvePulso(level, { strength: 2, search: false }).count, 1, level.id);
  }
});

test('PULSO: cada regra é validada sem consultar a resposta guardada', () => {
  const valid = { rows: 1, cols: 5, quotas: [1, 0, 1, 0, 1], givens: {}, solution: [0, 0, 0, 0, 0] };
  assert.equal(checkState(valid, { cells: [1, 0, 1, 0, 1] }).valid, true);
  const spacing = { ...valid, quotas: [1, 1, 0, 1, 0] };
  assert.equal(checkState(spacing, { cells: spacing.quotas }).valid, false);
  const count = { ...valid, quotas: [1, 0, 0, 0, 1] };
  assert.equal(checkState(count, { cells: count.quotas }).valid, false);
  assert.equal(checkState({ ...valid, quotas: [0, 0, 1, 0, 1] }, { cells: [1, 0, 1, 0, 1] }).valid, false);
  assert.equal(checkState({ ...valid, givens: { 0: 0 } }, { cells: [1, 0, 1, 0, 1] }).valid, false);
});

test('PULSO: restauração rejeita estados malformados e alteração das pistas', () => {
  const level = CAMPAIGN[0], start = initialState(level);
  assert.equal(isStateValid(level, JSON.parse(JSON.stringify(start))), true);
  for (const state of [null, {}, { cells: [] }, { cells: Array(start.cells.length) }, { cells: Array(start.cells.length).fill('0') }, { cells: Array(start.cells.length).fill(2) }]) {
    assert.equal(isStateValid(level, state), false);
    assert.equal(checkState(level, state).valid, false);
  }
  const changed = initialState(level); changed.cells[2] = 0;
  assert.equal(isStateValid(level, changed), false);
  assert.equal(checkState(level, start).complete, false);
});

test('PULSO: ações são imutáveis, preservam fixos e reinício cria estado novo', () => {
  const level = CAMPAIGN[0], start = initialState(level), before = JSON.stringify(start);
  Object.freeze(start.cells); Object.freeze(start);
  const marked = applyAction(level, start, { type: 'cell', index: 0, tool: 'cycle' });
  assert.equal(marked.cells[0], 1); assert.equal(JSON.stringify(start), before);
  const empty = applyAction(level, marked, { type: 'cell', index: 0, tool: 'cycle' });
  assert.equal(empty.cells[0], 0);
  assert.equal(applyAction(level, empty, { type: 'cell', index: 0, tool: 'cycle' }).cells[0], null);
  for (const action of [{ type: 'cell', index: 2, tool: 'empty' }, { type: 'cell', index: -1, tool: 'mark' }, { type: 'cell', index: 0, tool: 'unknown' }]) assert.equal(applyAction(level, start, action), start);
  assert.deepEqual(initialState(level), start);
  const answer = solutionState(level); answer.cells[0] = null;
  assert.notEqual(level.solution[0], null);
});

test('PULSO: markup acessível e isolado, com pistas fixas sem alvo editável', () => {
  const level = CAMPAIGN[0], html = renderBoard(level, initialState(level), { selectedTool: 'mark' });
  assert.equal((html.match(/data-cell=/g) || []).length, level.rows * level.cols - Object.keys(level.givens).length);
  assert.equal((html.match(/role="button" tabindex="0"/g) || []).length, level.rows * level.cols - Object.keys(level.givens).length);
  assert.match(html, /aria-label="A1: indecisa"/);
  assert.match(html, /C1: batida, pista fixa/);
  assert.doesNotMatch(html, /<script|onclick=|onkeydown=/);
  assert.equal(GAME.rules.length, 3);
  assert.deepEqual(toolsForLevel(level).map(t => t.id), ['cycle', 'mark', 'empty', 'clear']);
});

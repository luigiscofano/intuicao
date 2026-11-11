import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CAMPAIGN, initialState, applyAction, checkState, isStateValid, solutionState, renderBoard } from '../../dist/logica/games/foz/index.mjs';

const fixtures = JSON.parse(readFileSync(new URL('./foz-fixtures.json', import.meta.url), 'utf8'));
const base = { width: 2, height: 2, root: 0, channels: [[0, 1], [0, 2], [1, 3], [2, 3]], clues: { 1: 1, 3: 2 } };
const freeze = value => { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; };

// Regra reexpressa por percursos simples, sem importar auxiliares do motor.
function independentlyValid(level, arrows) {
  const size = level.width * level.height;
  if (arrows.length !== size || arrows[level.root] !== -1) return false;
  for (let source = 0; source < size; source += 1) {
    if (source === level.root) continue;
    if (!level.channels.some(([a, b]) => a === source && b === arrows[source] || b === source && a === arrows[source])) return false;
    const path = [source];
    let next = arrows[source];
    while (next !== level.root) {
      if (!Number.isInteger(next) || next < 0 || next >= size || path.includes(next)) return false;
      path.push(next); next = arrows[next];
    }
    if (Object.hasOwn(level.clues, source) && level.clues[source] !== path.length) return false;
  }
  return true;
}

test('FOZ: 80 fases, IDs distintos e seis faixas', () => {
  assert.equal(CAMPAIGN.length, 80);
  assert.equal(new Set(CAMPAIGN.map(level => level.id)).size, 80);
  assert.deepEqual(Array.from({ length: 6 }, (_, d) => CAMPAIGN.filter(level => level.difficulty === d).length), [15, 15, 15, 15, 15, 5]);
  CAMPAIGN.forEach((level, i) => { assert.equal(level.number, i + 1); assert.equal(level.game, 'foz'); assert.equal(level.version, 1); });
});

test('FOZ: fixtures aprovadas e todos os gabaritos satisfazem as regras', () => {
  for (const level of [...fixtures, ...CAMPAIGN]) {
    assert.equal(isStateValid(level, initialState(level)), true, level.id);
    assert.equal(checkState(level, initialState(level)).complete, false, level.id);
    const solved = solutionState(level);
    assert.equal(independentlyValid(level, solved.arrows), true, level.id);
    assert.equal(checkState(level, solved).valid, true, level.id);
    assert.notEqual(solved.arrows, level.solution);
  }
  for (const fixture of fixtures) {
    assert.ok(CAMPAIGN.some(level => level.width === fixture.width && level.height === fixture.height && level.root === fixture.root && JSON.stringify(level.channels) === JSON.stringify(fixture.channels) && JSON.stringify(level.clues) === JSON.stringify(fixture.clues) && JSON.stringify(level.solution) === JSON.stringify(fixture.solution)), 'Fixture deve integrar o catálogo sem mudança de pistas.');
  }
});

test('FOZ: checker ignora solution e conta trechos, não pontos', () => {
  const level = { ...base, get solution() { throw new Error('O verificador não deve consultar o gabarito.'); } };
  const result = checkState(level, { arrows: [-1, 0, 0, 1] });
  assert.equal(result.valid, true);
  assert.deepEqual(result.distances, [0, 1, 1, 2]);
  const withoutClues = { ...base, clues: {} };
  assert.equal(checkState(withoutClues, { arrows: [-1, 3, 0, 2] }).valid, true, 'Outro caminho legal também deve ser aceito.');
});

test('FOZ: ciclos e distância incorreta impedem vitória completa', () => {
  const cycle = checkState(base, { arrows: [-1, 3, 0, 1] });
  assert.equal(cycle.complete, true); assert.equal(cycle.valid, false);
  assert.deepEqual(cycle.errors, [1, 3]); assert.match(cycle.message, /ciclo/);
  const distance = checkState(base, { arrows: [-1, 3, 0, 2] });
  assert.equal(distance.complete, true); assert.equal(distance.valid, false);
  assert.deepEqual(distance.errors, [1]); assert.equal(distance.distances[1], 3);
  const partial = checkState(base, { arrows: [-1, 0, -1, 1] });
  assert.equal(partial.complete, false); assert.equal(partial.valid, false);
});

test('FOZ: saves malformados, raiz editada e atalhos fora dos canais são rejeitados', () => {
  const invalid = [null, {}, [], { arrows: Array(4) }, { arrows: [-1, 0, 0] }, { arrows: [-1, 0, 0, 1], extra: true }, { arrows: [1, 0, 0, 1] }, { arrows: [-1, 2, 0, 1] }, { arrows: [-1, 0, 0, '1'] }, { arrows: [-1, 0, 0, undefined] }, { arrows: [-1, 0, 0, NaN] }];
  for (const state of invalid) {
    assert.equal(isStateValid(base, state), false);
    assert.equal(checkState(base, state).complete, false);
    assert.equal(checkState(base, state).valid, false);
  }
});

test('FOZ: ações preservam o estado anterior e a raiz fixa', () => {
  const level = freeze(structuredClone(base));
  const start = freeze(initialState(level));
  const next = applyAction(level, start, { type: 'cell', index: 3, tool: 'up' });
  assert.deepEqual(start.arrows, [-1, -1, -1, -1]);
  assert.deepEqual(next.arrows, [-1, -1, -1, 1]);
  assert.notEqual(next.arrows, start.arrows);
  assert.equal(applyAction(level, next, { type: 'link', from: 0, to: 1 }), next);
  assert.equal(applyAction(level, next, { type: 'link', from: 3, to: 0 }), next);
  assert.equal(applyAction(level, next, { type: 'cell', index: 3, tool: 'down' }), next);
  assert.equal(applyAction(level, next, { type: 'cell', index: 3, tool: 'unknown' }), next);
  assert.equal(applyAction(level, next, null), next);
  const clear = applyAction(level, freeze(next), { type: 'cell', index: 3, tool: 'clear' });
  assert.deepEqual(clear, start);
  let cycle = start;
  for (const expected of [1, 2, -1]) { cycle = applyAction(level, cycle, { type: 'cell', index: 3, tool: 'cycle' }); assert.equal(cycle.arrows[3], expected); }
});

test('FOZ: view identifica casas acessíveis e mantém a foz fora da edição', () => {
  const level = fixtures[0];
  const markup = renderBoard(level, initialState(level));
  const targets = [...markup.matchAll(/<g\b[^>]*data-cell="(\d+)"[^>]*>/g)];
  assert.equal(targets.length, level.width * level.height);
  for (const [tag, raw] of targets) {
    assert.match(tag, /role="button"/); assert.match(tag, /aria-label="[^"]+"/);
    assert.match(tag, Number(raw) === level.root ? /tabindex="-1".*aria-disabled="true"/ : /tabindex="0".*aria-disabled="false"/);
  }
  assert.match(markup, /viewBox="0 0 /);
  assert.doesNotMatch(markup, /\bonclick=/);
});

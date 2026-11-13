import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = file => readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8');
const opening = read('approved-opening.css');
const cohesion = read('cohesion.css');
const rule = (css, selector) => css.slice(css.indexOf(selector)).split('}')[0];
test('faixa e navegação usam espaço, sem filetes adicionais', () => {
  for (const selector of ['#main > .intro[data-approved-opening] {', '#library-controls {']) {
    assert.match(rule(opening, selector), /border-bottom: 0;/);
  }
});
test('filtros sem moldura preservam seleção azul e alvos de toque', () => {
  const filters = rule(cohesion, '.library-filter-options {');
  assert.match(filters, /border: 0;/);
  assert.match(filters, /background: transparent;/);
  assert.match(cohesion, /\[aria-pressed="true"\].*background: #244b63/);
  assert.match(rule(cohesion, '#library-filters button {'), /min-height: 44px/);
  assert.doesNotMatch(rule(cohesion, '#library-filters #favorites-edit {'), /border-left: 1px/);
  assert.match(cohesion, /:focus-visible/);
});
test('assinatura do cabeçalho mantém os três azulejos e filete', () => {
  const header = read('header-tiles.css');
  for (const tile of ['green-tl.png', 'gold-br.png', 'blue-br.png']) assert.ok(header.includes(tile));
  assert.match(header, /linear-gradient\(#30412f3b, #30412f3b\)/);
});

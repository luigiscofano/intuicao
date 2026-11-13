import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

// Normaliza apenas a formatação: o Site e o GitHub preservam seus formatos de origem.
const css = fs.readFileSync('dist/repasse/ui.css', 'utf8')
  .replace(/\s+/g, '').replace(/;}/g, '}');

test('Repasse reserva 24px acima e abaixo dos coletores em todos os modos', () => {
  // A regra usa a superfície compartilhada, sem depender da fase ou do modo.
  assert.match(css, /#repasse \.r-surface \.r-board-scroll\{padding-block:24px\}/);
  assert.doesNotMatch(css, /padding-bottom:2px/);
});

test('O respiro mantém a geometria das peças e acomoda os indicadores', () => {
  assert.match(css, /r-gain\{[^}]*top:-6px/);
  assert.match(css, /var\(--r-inner-cols\)\*76px/);
  assert.match(css, /r-board-scroll\{padding:2px 0;max-height:none\}/);
  assert.match(css, /r-piece,[^}]*aspect-ratio:1;min-height:44px/);
});

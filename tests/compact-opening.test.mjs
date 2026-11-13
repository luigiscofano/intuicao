import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../dist/approved-opening.css', import.meta.url), 'utf8');

test('faixa removida não ocupa espaço antes da inicialização', () => {
  assert.match(css, /#main > \.intro \{ display: none !important; \}/);
  assert.doesNotMatch(css, /opening-fauna|hero-fauna|opening-curiosity/);
});

test('navegação e cartões mantêm seus estilos responsivos', () => {
  assert.match(css, /#library-controls/);
  assert.match(css, /@media\(max-width:760px\)/);
  assert.match(css, /@media\(max-width:480px\)/);
});

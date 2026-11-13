import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../dist/approved-opening.css', import.meta.url), 'utf8');

test('faixa compacta corresponde às proporções desktop aprovadas', () => {
  assert.match(css, /min-height: 108px/);
  assert.match(css, /font-size: 28px/);
  assert.match(css, /width: 40px; height: 44px/);
  assert.match(css, /::after \{ display: none/);
  assert.doesNotMatch(css, /min-height: (214|326)px/);
});

test('fauna expande no fluxo e título equilibra linhas no celular', () => {
  assert.match(css, /opening-fauna-expanded \.opening-fauna-group \{ flex-wrap: wrap/);
  assert.match(css, /@media\(max-width:900px\)/);
  assert.match(css, /text-wrap: balance/);
  assert.match(css, /@media\(max-width:360px\)/);
  assert.doesNotMatch(css, /overflow:\s*hidden/);
});

test('botão de expansão mantém alvo de toque e foco visível', () => {
  assert.match(css, /min-height: 44px/);
  assert.match(css, /focus-visible \{ outline: 3px solid #244b63/);
});

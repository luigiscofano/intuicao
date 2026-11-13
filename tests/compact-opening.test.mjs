import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../dist/approved-opening.css', import.meta.url), 'utf8');

test('abertura reduz altura e escala dos azulejos sem esconder a fauna', () => {
  assert.match(css, /min-height: 214px/);
  assert.match(css, /font-size: clamp\(32px, 3.6vw, 46px\)/);
  assert.match(css, /width: 154px;\s*height: 76px/);
  assert.match(css, /background-size: 36px 36px/);
  assert.match(css, /\.hero-fauna-cell \{ width: 44px; height: 44px/);
});

test('expansão e telas estreitas permanecem no fluxo sem cortes de conteúdo', () => {
  assert.match(css, /opening-fauna-expanded \{ min-height: 326px/);
  assert.match(css, /@media\(max-width:760px\)/);
  assert.match(css, /position: relative;\s*order: 2/);
  assert.match(css, /opening-fauna-expanded \{ min-height: 0/);
  assert.doesNotMatch(css, /overflow:\s*hidden/);
});

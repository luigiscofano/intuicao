import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../dist/selection-presentation.css', import.meta.url), 'utf8');
const source = readFileSync(new URL('../dist/selection-presentation.mjs', import.meta.url), 'utf8');

test('modos usam composição compacta com texto e ação lado a lado', () => {
  assert.match(css, /\.selection-mode\{display:grid;grid-template-columns:minmax\(0,1fr\) auto/);
  assert.match(css, /padding:14px 16px/);
  assert.match(css, /\.selection-mode-button\{grid-column:2;grid-row:1 \/ span 2/);
});
test('ação mantém alvo de toque e volta à linha própria em telas estreitas', () => {
  assert.match(css, /\.selection-mode-button\{[^}]*min-height:44px/);
  assert.match(css, /@media\(max-width:440px\)/);
  assert.match(css, /grid-column:1;grid-row:auto;justify-self:start/);
  assert.match(css, /focus-visible/);
});
test('modo compacto mantém controles originais e não adiciona modos aos versus', () => {
  assert.match(source, /daily=campaign\?root.querySelector/);
  assert.match(source, /endless=campaign\?root.querySelector/);
  assert.match(source, /move\(control,card\)/);
  assert.doesNotMatch(source, /cloneNode|localStorage|sessionStorage/);
});

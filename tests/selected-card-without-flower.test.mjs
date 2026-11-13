import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const css = readFileSync(new URL('../dist/platform.css', import.meta.url), 'utf8');
test('cards selecionados não exibem a flor branca decorativa', () => {
  assert.doesNotMatch(css, /flower-white-original\.png/);
  assert.doesNotMatch(css, /#main\s*>\s*\.games\s*>\s*button\[aria-pressed=true\]::after\s*\{/);
});
test('o estado de seleção e a decoração fora dos cards são preservados', () => {
  assert.match(css, /button\[aria-pressed=true\]/);
  assert.match(css, /flower-green-original\.png/);
});

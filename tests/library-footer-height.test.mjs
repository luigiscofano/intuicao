import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../dist/library.css', import.meta.url), 'utf8');
test('biblioteca curta ocupa a janela sem alterar o modo de jogo', () => {
  const shell = css.match(/body:not\(\.approved-game-view\)\s*\{([^}]+)\}/)?.[1];
  assert.match(shell, /min-height:\s*100vh/);
  assert.match(shell, /min-height:\s*100svh/);
  assert.match(shell, /display:\s*flex/);
  assert.match(shell, /flex-direction:\s*column/);
  assert.match(css, /body:not\(\.approved-game-view\) > main\s*\{\s*flex-grow:\s*1/);
  assert.match(css, /body:not\(\.approved-game-view\) > :is\(header, main, footer\)\s*\{\s*width:\s*100%;\s*flex-shrink:\s*0/);
});

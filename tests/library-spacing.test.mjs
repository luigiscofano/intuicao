import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = name => readFileSync(new URL('../dist/' + name, import.meta.url), 'utf8');
test('biblioteca ganha respiro superior sem mudar o cabeçalho dos jogos', () => {
  const css = read('approved-opening.css');
  assert.match(css, /padding-block: 28px 16px/);
  assert.match(css, /body\.approved-game-view \.library-heading-row \{ padding-block: 8px 12px; \}/);
});
test('ícones mantêm margem interna e texto reservado em todos os cartões', () => {
  assert.match(read('approved-opening.css'), /#main > \.games > button:not\(\.game-info-nav\) \{[^}]*padding-right: 60px/s);
  assert.match(read('game-info.mjs'), /card.offsetLeft \+ card.offsetWidth - 48/);
  for (const width of [224, 280, 390, 540]) {
    const iconWidth = 32;
    const left = width - 48;
    assert.equal(width - left - iconWidth, 16);
    assert.ok(width - 60 < left);
  }
});

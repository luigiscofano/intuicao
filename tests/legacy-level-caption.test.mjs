import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');

test('remove legendas duplicadas acima do título sem esconder o cabeçalho ou controles', () => {
  const css = read('../dist/presentation-system.css');
  assert.match(css, /body\.approved-game-view #main \.approved-game-section > \.lab-heading\s+:is\(\.s-level-name, \.r-level-name, \.o-level-name, \.logic-level-name\)\s*\{\s*display: none;/);
  const shell = read('../dist/approved-game-shell.mjs');
  assert.match(shell, /stage\?\.dataset\?\.campaignLevelName \|\| levelName \|\| presentation.name/);
  assert.match(shell, /setText\(heading.querySelector\("\.approved-game-title"\), title\)/);
});

test('preserva nomes originais para campanhas e modos livres de todos os renderizadores afetados', () => {
  for (const [game, className] of [['sintonia', 's-level-name'], ['repasse', 'r-level-name'], ['orbita', 'o-level-name'], ['logica', 'logic-level-name']]) {
    const source = read(`../dist/${game}/ui.mjs`);
    assert.ok(source.includes(className), game);
    assert.ok(source.includes(game === 'orbita' ? 'level.name' : 'campaignLevelName'), game);
  }
});

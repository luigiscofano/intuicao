import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync('dist/game-header.css', 'utf8');
const html = readFileSync('dist/index.html', 'utf8');
test('o topo usa o mesmo contrato na seleção e dentro da partida', () => {
  assert.match(css, /body\.approved-game-view > header/);
  assert.doesNotMatch(css, /\.lab|level-screen|#main|approved-game-band/);
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\) auto auto/);
});
test('atalhos originais permanecem disponíveis e agrupados à direita', () => {
  for (const id of ['about-open', 'achievements-open', 'preferences-open']) {
    assert.equal(html.split(`id="${id}"`).length - 1, 1);
  }
  assert.match(css, /#about-open[\s\S]*?justify-self: end/);
  assert.match(css, /\.header-utilities[\s\S]*?justify-self: end/);
  assert.ok(html.indexOf('game-header.css') > html.indexOf('achievements-panel.css'));
});
test('telas estreitas têm uma linha própria para os atalhos sem esconder rótulos', () => {
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /grid-row: 2/);
  assert.doesNotMatch(css, /display: none|visibility: hidden/);
});

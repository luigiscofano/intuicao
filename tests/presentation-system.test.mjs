import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = file => readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8');
const css = read('presentation-system.css');
test('acabamento tem tokens únicos de papel e não muda geometria das peças', () => {
  assert.match(css, /--surface-paper: #fffefa/);
  assert.match(css, /--surface-surround: #f5f2e9/);
  assert.doesNotMatch(css, /(?:viewBox|transform:|zoom:|scale:|canvas\s*\{|svg\s*\{)/);
  assert.match(read('index.html'), /href="presentation-system.css"/);
});
test('ações continuam confortáveis e identificáveis por cor e rótulo', () => {
  const actions = read('action-sidebar.css');
  for (const action of ['confirm', 'undo', 'redo', 'restart', 'help']) assert(actions.includes(`[data-sidebar-action='${action}']`));
  assert.match(actions, /min-height: 44px/);
  assert.match(actions, /content: attr\(aria-label\)/);
  assert.match(actions, /\[hidden\] \{ display:none !important/);
  assert.match(css, /approved-secondary-actions/);
});
test('Conquistas oculta apenas introdução repetida, não muda a home', () => {
  assert.match(read('category-navigation.mjs'), /toggle\("library-intro-collapsed", playing \|\| showingAchievements\)/);
  assert.doesNotMatch(css, /hero-fauna|\.intro\s*\{|\.hero-fauna-cell/);
});
test('catálogo permanece com os 19 jogos atuais', () => {
  const catalog = read('index.html').match(/<nav class="games"[\s\S]*?<\/nav>/)[0];
  const ids = [...catalog.matchAll(/data-(?:game|collection|sintonia|repasse|broto|cerco|logic|versus)="([^"]+)"/g)].map(m => m[1]);
  assert.equal(ids.length, 19);
  assert.equal(new Set(ids).size, 19);
  for (const retired of ['divisa','orbita','lastro','vazante','enlace','dobra']) assert(!ids.includes(retired));
});
test('cabeçalho preserva Informações sobre o jogo sem legendas duplicadas', () => {
  assert.match(css, /\.lab-heading h2/);
  assert.doesNotMatch(css, /clip-path|position: absolute/);
  assert.doesNotMatch(css, /\.lab-heading\s*\{[^}]*display: none/);
  assert.match(css, /:is\(\.s-level-name, \.r-level-name, \.o-level-name, \.logic-level-name\)/);
});

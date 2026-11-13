import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { victoryTilesMarkup } from '../dist/victory-tiles.mjs';
import { GAME_PRESENTATION } from '../dist/approved-game-shell.mjs';
import { decodeRgbaPng } from './support/rgba-png.mjs';

const root = new URL('../', import.meta.url);
const baseline = '3c0609db77b66aa27d4d61753e7db7f438b14ba9';
// Escopo histórico da PR62; FOZ protege a árvore atual a partir deste commit.
const pngRelease = 'b34690d870b714280f742142413a64d9d7e0387e';
const read = path => readFileSync(new URL(path, root), 'utf8');
const asset = name => new URL(`dist/platform-assets/tiles/${name}`, root);
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
const styles = ['terra-mata.css', 'approved-game-shell.css', 'identity.css'];
const css = Object.fromEntries(styles.map(path => [path, read(`dist/${path}`)]));

function declarations(source, selector) {
  const index = source.indexOf(selector);
  assert.notEqual(index, -1, `seletor encontrado: ${selector}`);
  return source.slice(index).split('{')[1].split('}')[0];
}

test('dez PNGs RGBA de 256 px preservam transparência, bordas e cores', () => {
  const colors = {
    blue: '#244b63', green: '#39654c', gold: '#cca034',
    'game-green': '#39674a', 'game-gold': '#cc9f3b',
  };
  const files = readdirSync(new URL('dist/platform-assets/tiles/', root));
  assert.equal(files.length, 10);

  for (const file of files) {
    const { width, height, pixels } = decodeRgbaPng(readFileSync(asset(file)));
    assert.equal(width, 256);
    assert.equal(height, 256);
    const name = file.replace(/-(tl|br|bl)\.png$/, '');
    const expected = colors[name].slice(1).match(/../g).map(value => parseInt(value, 16));
    let transparent = 0;
    let opaque = 0;
    let softened = 0;

    for (let index = 0; index < pixels.length; index += 4) {
      const alpha = pixels[index + 3];
      if (alpha === 0) transparent++;
      else if (alpha === 255) {
        opaque++;
        assert.deepEqual([...pixels.subarray(index, index + 3)], expected, file);
      } else softened++;
    }
    assert.ok(transparent > 12000 && opaque > 50000 && softened > 0, file);
  }
});

test('fundos decorativos usam PNGs locais existentes e não deixam retângulos opacos', () => {
  for (const [name, source] of Object.entries(css)) {
    assert.doesNotMatch(source, /radial-gradient\(ellipse at (100% 100%|0 0)/, name);
    for (const [, file] of source.matchAll(/platform-assets\/tiles\/([^"')]+\.png)/g)) {
      assert.ok(readFileSync(asset(file)).length > 0, file);
    }
  }
  assert.match(declarations(css['approved-game-shell.css'], '.approved-tiles > span {'),
    /background: transparent/);
  assert.match(declarations(css['terra-mata.css'], '#main > .intro::after,'),
    /background-color:transparent/);
  assert.match(declarations(css['identity.css'], 'body>footer::after {'),
    /background-color: transparent/);
  assert.doesNotMatch(css['identity.css'], /#e7ddc3/);
});

test('19 páginas ativas começam pela identificação acessível sem decoração acima', () => {
  assert.equal(Object.keys(GAME_PRESENTATION).length, 19);
  assert.match(read('dist/approved-game-shell.mjs'),
    /element\(doc, "h1", "approved-category"\)/);
  assert.doesNotMatch(read('dist/approved-game-shell.mjs'), /const tiles = element/);
  assert.equal(git('diff', baseline, pngRelease, '--', 'dist/approved-game-shell.mjs', 'dist/index.html'), '');
});

test('vitória usa quatro PNGs preservando contêiner, animação e acessibilidade', () => {
  for (const animate of [true, false]) {
    const markup = victoryTilesMarkup({ animate });
    assert.equal((markup.match(/<image /g) || []).length, 4);
    assert.equal((markup.match(/\.png"/g) || []).length, 4);
    assert.equal((markup.match(/<circle /g) || []).length, 6);
    assert.match(markup, /aria-hidden="true" focusable="false"/);
    assert.match(markup, new RegExp(`victory-tiles-${animate ? 'animate' : 'static'}`));
    assert.doesNotMatch(markup, /<path /);
  }
  assert.equal(git('diff', baseline, pngRelease, '--', 'dist/victory-tiles.css'), '');
});

test('somente quatro arquivos de produção mudam; motores, geradores e FOZ ficam intactos', () => {
  const allowed = [
    'dist/approved-game-shell.css', 'dist/identity.css',
    'dist/terra-mata.css', 'dist/victory-tiles.mjs',
    ...readdirSync(new URL('dist/platform-assets/tiles/', root))
      .map(file => `dist/platform-assets/tiles/${file}`),
  ];
  const changed = git('diff', '--name-only', baseline, pngRelease, '--', 'dist')
    .trim().split('\n').filter(Boolean);
  for (const file of changed) assert.ok(allowed.includes(file), file);
  // Acréscimos atuais são protegidos por game-viewport-scope.test.mjs.
  const added = git('diff', '--name-only', '--diff-filter=A', baseline, pngRelease, '--', 'dist').trim().split('\n').filter(Boolean);
  for (const file of added) assert.ok(allowed.includes(file), file);
});



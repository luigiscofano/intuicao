import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const html = readFileSync('dist/index.html', 'utf8');
const css = readFileSync('dist/header-tiles.css', 'utf8');
assert.equal((html.match(/href="header-tiles.css"/g) || []).length, 1);
assert.ok(html.indexOf('header-tiles.css') > html.indexOf('approved-game-shell.css'));
assert.match(css, /body > header,\s*body\.approved-game-view > header/);
assert.match(css, /border-top: 0/);
assert.match(css, /@media \(max-width: 760px\)/);
for (const asset of ['green-tl', 'gold-br', 'blue-br']) {
  assert.ok(existsSync(`dist/platform-assets/tiles/${asset}.png`));
  assert.ok(css.includes(`tiles/${asset}.png`));
}
assert.ok(html.includes('brand-image'));
for (const id of ['about-open', 'preferences-open']) assert.ok(html.includes(`id="${id}"`));
console.log('Cabeçalho C: seletores compartilhados, assets, mobile, logo e controles preservados.');

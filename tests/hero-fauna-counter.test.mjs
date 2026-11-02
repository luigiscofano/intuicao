// Testes e verificações de componentes compartilhados do Intuição.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const read = (p) => fs.readFileSync(p, 'utf8');
const html = read('dist/index.html'),
  ui = read('dist/sintonia/ui.mjs');
assert.equal((html.match(/class="hero-fauna-cell"/g) || []).length, 15);
assert.match(html, /<div class="hero-fauna" aria-hidden="true" inert>/);
assert.match(html, /<h1>A <em>curiosidade<\/em><br>é a primeira lição\.<\/h1>/);
assert.equal((ui.match(/id="s-moves"/g) || []).length, 1);
assert.ok(ui.indexOf('<div class="s-command-row">') > ui.indexOf('<div id="s-board-surface"'));
assert.ok(ui.indexOf('<div class="s-command-row">') < ui.indexOf('<div id="s-motion"'));
assert.match(ui, /\$\('s-moves'\)\.textContent=session.cursor/);
const baseline = 'c3aa04e4765198d6b068f09105573962d7f56d9e';
const changed = new Set([
  'dist/index.html',
  'dist/sintonia/ui.mjs',
  'dist/sintonia/scenery.css',
  'dist/collection-ui.mjs',
  'dist/standard-controls.css',
]);
const files = execFileSync('git', ['ls-tree', '-r', '--name-only', baseline, 'dist'], {
  encoding: 'utf8',
})
  .trim()
  .split('\n');
for (const p of files)
  if (!changed.has(p))
    assert.ok(
      fs
        .readFileSync(p)
        .equals(execFileSync('git', ['show', `${baseline}:${p}`], { maxBuffer: 80e6 })),
      p,
    );
const oldUI = execFileSync('git', ['show', `${baseline}:dist/sintonia/ui.mjs`], {
  encoding: 'utf8',
});
const removeMarkup = (s) =>
  s
    .split('\n')
    .filter((line) => !line.includes('host.innerHTML='))
    .join('\n');
assert.equal(
  removeMarkup(ui),
  removeMarkup(oldUI),
  'All counter logic and game behavior remain identical',
);
console.log(
  `PASS 15 unchanged PNG icons; one counter inside board; gameplay JS unchanged; ${files.length - 5} existing files byte-identical`,
);

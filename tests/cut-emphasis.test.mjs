// Testes e verificações de Corte certo.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const base = '96f577bcbd1ad5a329981e471deed0c82bedaa0a',
  git = (...a) => execFileSync('git', a, { encoding: 'utf8' }).trim();
test('alteração limitada à meta visual e estilo do medidor', () => {
  for (const line of git('ls-tree', '-r', base, '--', 'dist').split('\n')) {
    const [m, p] = line.split('\t');
    if (['dist/index.html', 'dist/app.mjs'].includes(p)) continue;
    assert.equal(git('hash-object', p), m.split(' ')[2], p);
  }
  const old = git('show', base + ':dist/app.mjs'),
    now = readFileSync('dist/app.mjs', 'utf8').trim();
  assert.equal(
    now.replace(/^  \$\('cut-goal-caption'\).*$/m, ''),
    old.replace(/^  svg\+=`<text x="24" y="430".*$/m, ''),
  );
  const html = readFileSync('dist/index.html', 'utf8')
    .replace('<link rel="stylesheet" href="cut-emphasis.css">', '')
    .replace('<p id="cut-goal-caption" class="cut-goal-caption"></p>', '')
    .trim();
  assert.equal(html, git('show', base + ':dist/index.html'));
});

// Testes e verificações de componentes compartilhados do Intuição.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
test('original confirmation immediately follows board navigation before metrics', () => {
  const s = fs.readFileSync('dist/index.html', 'utf8'),
    board = s.indexOf('<div class="board-navigation"'),
    actions = s.indexOf('<div class="level-actions">', board),
    readout = s.indexOf('<div class="readout">', board);
  assert.ok(actions > board && actions < readout);
  assert.equal((s.match(/id="confirm"/g) || []).length, 1);
  assert.match(s, /compact-play.css/);
});
test('responsive styling keeps controls, board geometry and overflow truthful', () => {
  const css = fs.readFileSync('dist/compact-play.css', 'utf8');
  assert.doesNotMatch(css, /transform:\s*scale|overflow:\s*hidden|display:\s*none[^}]*#confirm/);
  assert.match(css, /min-height:44px/);
  assert.match(css, /max-width:570px/);
  assert.match(css, /grid-template-columns:minmax\(0,1fr\) 290px/);
});
test('all engines and level definitions unchanged from prior deployment', () => {
  const base = '6c41483930af29ee8276cc523bc8622ce2bc6d7d',
    paths = execFileSync('git', ['ls-tree', '-r', '--name-only', base, 'dist'], {
      encoding: 'utf8',
    })
      .trim()
      .split('\n')
      .filter((p) =>
        /engine\.mjs$|campaign.*\.mjs$|catalog.*\.mjs$|game-nav-icons\.mjs$|fauna-info-content\.mjs$/.test(
          p,
        ),
      );
  for (const p of paths)
    assert.ok(
      fs.readFileSync(p).equals(execFileSync('git', ['show', base + ':' + p], { maxBuffer: 30e6 })),
      p,
    );
});

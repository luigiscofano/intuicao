// Testes e verificações de componentes compartilhados do Intuição.
import { restoreEloExplanationsFile } from './elo-explanations-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { restoreBoardAlignmentFile } from './board-alignment-history.mjs';
const m = JSON.parse(
    fs.readFileSync(new URL('./board-alignment-authorized-change.json', import.meta.url)),
  ),
  css = restoreEloExplanationsFile(
    'style.css',
    fs.readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8'),
  ),
  sha = (x) => crypto.createHash('sha256').update(x).digest('hex');
const old = execFileSync('git', ['show', m.baseCommit + ':dist/style.css'], { encoding: 'utf8' });
assert.equal(sha(css), m.afterSha256);
assert.equal(sha(old), m.beforeSha256);
assert.equal(css, old + m.append);
assert.equal(restoreBoardAlignmentFile('style.css', css), old);
assert.equal(restoreBoardAlignmentFile('style.css', old), old);
assert.equal(restoreBoardAlignmentFile('style.css', css + ' '), css + ' ');
assert.equal(restoreBoardAlignmentFile('app.mjs', css), css);
assert.match(
  m.append,
  /\.experiment>\.stage-top\+\.board-navigation>\.collection-board-wrap\{margin-top:0\}/,
);
assert.match(m.append, />\.level-arrow:not\(\[hidden\]\)/);
assert.match(m.append, /scene-wrap\)>\.stage-top\{width:100%/);
assert.match(m.append, /max-width:460px/);
assert.match(m.append, /max-width:632px/);
assert.match(m.append, /max-width:616px;padding-left:32px/);
assert.match(m.append, /@media\(max-width:600px\)/);
assert.ok(!m.append.includes('min-height:'));
assert.ok(!m.append.includes('overflow:'));
assert.ok(!m.append.includes('transform:'));
assert.ok(!m.append.includes('grid-template'));
assert.ok(!m.append.includes(':is(.elo-has-gutter,:has('));
// Geometry model checks the existing nav/padding constants at narrow and wide widths.
// Browser measurements after publication remain necessary; this is not a browser substitute.
for (const mobile of [false, true])
  for (const width of [224, 280, 360, 520, 780, 1080])
    for (const arrows of [false, true]) {
      const nav = arrows ? (mobile ? 96 : 116) : 0,
        wrapper = Math.min(680, width - nav),
        side = mobile ? (arrows ? 2 : 6) : 24;
      const board = Math.max(0, wrapper - side * 2),
        toolbar = Math.min(mobile ? width - (arrows ? 100 : 12) : width - (arrows ? 164 : 48), 632);
      // Above 600px viewport, the source max-width632 is exact; mobile widths never exceed600px.
      if (!mobile || width <= 600) assert.equal(toolbar, board);
      const desvio = Math.min(460, Math.min(680, width) - (mobile ? 12 : 48));
      if (!arrows) assert.equal(Math.min(460, toolbar), desvio);
      const gutterWidth = Math.min(616, width - nav - 64),
        gutterRight = width / 2 + gutterWidth / 2;
      assert.equal(gutterRight, width / 2 + wrapper / 2 - 32);
    }
console.log(
  'PASS CSS-only toolbar edge alignment model, custom margin removal, immutable board/scroll declarations and exact 99ad537 restoration; real six-game geometry pending publication.',
);

// Testes e verificações de componentes compartilhados do Intuição.
import { restoreRulesSidebarFile } from './rules-sidebar-history.mjs';
import { restoreActiveFlowerCSS } from './active-flower-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { restoreCompletedGreenCSS } from './completed-green-history.mjs';
import { restoreBottomAlignmentCSS } from './bottom-alignment-history.mjs';
const read = (p) =>
  restoreRulesSidebarFile(p, fs.readFileSync(new URL('../' + p, import.meta.url), 'utf8'));
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const m = JSON.parse(read('tests/completed-green-authorized-change.json'));
const bottom = JSON.parse(read('tests/bottom-alignment-authorized-change.json'));
const css = restoreActiveFlowerCSS(read('dist/platform.css')),
  old = restoreCompletedGreenCSS(css);
assert.equal(sha(css), m.afterCssSHA256);
assert.equal(sha(old), m.priorCssSHA256);
assert.equal(m.priorCssSHA256, bottom.afterCssSHA256);
assert.equal(restoreCompletedGreenCSS(old), old);
assert.equal(sha(restoreBottomAlignmentCSS(css)), bottom.priorCssSHA256);
assert.equal(m.replacements.length, 2);
const shared = ':is(#selection, #collection > .level-screen) .level-tile.done';
assert.equal(
  m.replacements[0].after,
  shared + '{background:#486c4d;color:#fff;border-color:#405e49;box-shadow:0 2px #354b3a}',
);
assert.equal(m.replacements[1].after, shared + ' > small{color:#fff}');
let reconstructed = old;
for (const { before, after } of m.replacements) {
  assert.equal(reconstructed.split(before).length - 1, 1);
  reconstructed = reconstructed.replace(before, after);
}
assert.equal(reconstructed, css, 'Only completed tiles may change');
const selected =
  ':is(#selection, #collection > .level-screen) .level-tile[aria-current=true]{outline:2px solid #997838;outline-offset:2px}';
assert.ok(
  css.includes(selected) && old.includes(selected),
  'Selected outline remains intact, including completed selection',
);
const luminance = (hex) =>
  hex
    .match(/\w\w/g)
    .map((x) => parseInt(x, 16) / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
    .reduce((s, x, i) => s + x * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = 1.05 / (luminance('486c4d') + 0.05);
assert.ok(contrast >= 4.5, 'White numbers and small labels meet 4.5:1 contrast');
for (const invalid of [
  css + ' ',
  old + ' ',
  css.replace(m.replacements[0].after, m.replacements[0].before),
  css + '\n' + m.replacements[0].after,
])
  assert.throws(
    () => restoreCompletedGreenCSS(invalid),
    'Tampering, partial restoration and duplication fail closed',
  );
for (const [file, hash] of Object.entries(m.preservedSourcesSHA256))
  assert.equal(
    sha(read('dist/' + file)),
    hash,
    'Completion, assistance and selection logic unchanged: ' + file,
  );
const app = read('dist/app.mjs'),
  collection = read('dist/collection-ui.mjs');
for (const game of ['light', 'cut'])
  assert.ok(
    app.includes('catalogue[game]') && app.includes(`game==='${game}'`),
    game + ' uses original shared level-tile renderer',
  );
for (const game of ['elo', 'prumo', 'pacto'])
  assert.ok(
    collection.includes(game) && collection.includes('catalogue[game]'),
    game + ' uses collection shared level-tile renderer',
  );
assert.ok(app.includes("level-tile ${done?'done':''}"));
assert.ok(collection.includes("level-tile elo-level-tile ${done?'done':''}"));
assert.ok(collection.includes("level-tile ${data.completed.includes(l.id)?'done':''}"));
assert.ok(
  app.includes("done?(assisted?'✓ com gabarito':'✓ concluído')"),
  'Normal and assisted original completion keep textual labels',
);
assert.ok(
  collection.includes("assisted?'✓ assistido':'✓ concluído'"),
  'Normal and assisted collection completion keep textual labels',
);
console.log(
  `PASS completed green: exactly two done-only rules across five campaigns; preserved selection and assistance labels; contrast ${contrast.toFixed(2)}:1; immutable source hashes and fail-closed historical restoration.`,
);

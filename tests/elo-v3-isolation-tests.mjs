// Testes e verificações de ELO.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { restoreEloV3File } from './elo-v3-history.mjs';
const baseline = JSON.parse(
  fs.readFileSync(new URL('./elo-v3-baseline-sha256.json', import.meta.url)),
);
const change = JSON.parse(
  fs.readFileSync(new URL('./elo-v3-authorized-change.json', import.meta.url)),
);
const allowed = new Set([
  'collection-ui.mjs',
  'direct-actions.mjs',
  'direct-hints.mjs',
  'geometry-games.mjs',
  'geometry-levels.mjs',
  'geometry-answers.mjs',
  'style.css',
]);
for (const name of Object.keys(change.files))
  assert.ok(allowed.has(name), 'No expansion outside ELO integration files');
let untouched = 0,
  reviewed = 0;
for (const [path, sha] of Object.entries(baseline.sha256)) {
  const bytes = fs.readFileSync(new URL('../' + path, import.meta.url)),
    prior = restoreEloV3File(path, bytes);
  assert.equal(
    crypto.createHash('sha256').update(prior).digest('hex'),
    sha,
    'Untouched platform/other-game source or exact ELO-only reversal: ' + path,
  );
  if (change.files[path.replace(/^dist\//, '')]) reviewed++;
  else untouched++;
}
console.log(
  JSON.stringify({
    passed: true,
    baseCommit: baseline.baseCommit,
    untouchedFiles: untouched,
    exactlyReversibleEloFiles: reviewed,
  }),
);

// Testes e verificações de componentes compartilhados do Intuição.
import assert from 'node:assert/strict';
import fs from 'node:fs';
const css = fs.readFileSync(new URL('../dist/compact-play.css', import.meta.url), 'utf8');
const block = css.split(
  '/* Continuous game footer surface across all nine games; board frames stay intact. */',
)[1];
assert.ok(block, 'scoped footer rules exist');
for (const shell of ['.lab', '.collection-lab', '.sintonia-lab', '.repasse-lab', '.orbita-lab'])
  assert.ok(block.includes(shell));
for (const region of [
  '.level-actions',
  '.board-check-controls',
  '.readout',
  '.collection-feedback',
  '.collection-replay',
  '.level-notes',
])
  assert.ok(block.includes(region));
assert.ok(block.includes('background-color:#f8f9f3;background-image:none'));
assert.ok(block.includes('min-height:0;margin:0;padding:8px 12px;gap:8px'));
// Direct workspace children and their footer children only: never board descendants.
for (const protectedSelector of [
  '.scene-wrap',
  '.collection-board-wrap',
  '.s-board-surface',
  '.r-board-surface',
  '.o-board-surface',
  '.grid-cell',
  '.s-tile',
  '.r-tile',
  '.o-tile',
])
  assert.ok(!block.includes(protectedSelector), protectedSelector + ' remains untouched');
assert.ok(!block.includes('button{') && !block.includes('.level-actions{display:none'));
assert.ok(block.includes('>.collection-replay:empty{display:none}'));
console.log(
  'PASS nine-game footer shell coverage, explicit gradient removal, compact spacing, no button/board-frame styling or hidden navigation. Browser computed-style QA required.',
);

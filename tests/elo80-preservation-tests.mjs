// Testes e verificações de ELO.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const base = 'e2ff61691cf8277980cee5f3ec06b312b896c536';
const allowed = new Set([
  'dist/elo-campaign.mjs',
  'dist/elo-campaign-answers.mjs',
  'dist/elo-progress.mjs',
  'dist/elo-presentation.mjs',
  'dist/collection-ui.mjs',
]);
const names = execFileSync('git', ['ls-tree', '-r', '--name-only', base, 'dist'], {
  encoding: 'utf8',
})
  .trim()
  .split('\n');
let retained = 0;
for (const path of names) {
  if (allowed.has(path)) continue;
  assert.deepEqual(
    fs.readFileSync(path),
    execFileSync('git', ['show', base + ':' + path], { maxBuffer: 30e6 }),
    path + ' byte-identical',
  );
  retained++;
}
const old = execFileSync('git', ['show', base + ':dist/elo-presentation.mjs'], {
    encoding: 'utf8',
  }),
  now = fs.readFileSync('dist/elo-presentation.mjs', 'utf8');
assert.equal(
  now.slice(now.indexOf('export function eloRegionName')),
  old.slice(old.indexOf('export function eloRegionName')),
  'All clue rendering, symbols, coordinates and rules untouched',
);
let ui = execFileSync('git', ['show', base + ':dist/collection-ui.mjs'], { encoding: 'utf8' });
const replacements = [
  ["'CAMPANHA DE 200 NÍVEIS'", '`CAMPANHA DE ${catalogue[game].length} NÍVEIS`'],
  [
    "new Date().toLocaleDateString('sv-SE'),200)",
    "new Date().toLocaleDateString('sv-SE'),catalogue[game].length)",
  ],
  ['200 níveis em 10 etapas.', '80 níveis em seis dificuldades.'],
  ['ELO_STAGES.map(([name,mechanic],stage)', 'ELO_STAGES.map(([name,mechanic,first,last],stage)'],
  ['Níveis ${stage*20+1}–${stage*20+20}', 'Níveis ${first}–${last}'],
  ["${stage?'Nova família':'Base da campanha'}:", 'Foco:'],
  ['catalogue.elo.slice(stage*20,stage*20+20)', 'catalogue.elo.slice(first-1,last)'],
  ['const number=stage*20+j+1', 'const number=first+j'],
  ['`DESAFIO ${index+1} / 200`', '`DESAFIO ${index+1} / ${catalogue[game].length}`'],
  ['Math.floor(index/20)', 'Math.min(5,Math.floor(index/15))'],
];
replacements.push(["<small>${esc(l.difficulty??'desafio')}</small>", '']);
for (const [a, b] of replacements) {
  assert.ok(ui.includes(a));
  ui = ui.split(a).join(b);
}
assert.equal(
  fs.readFileSync('dist/collection-ui.mjs', 'utf8'),
  ui,
  'Only campaign groups, metadata and count-dependent indices changed; all buttons/handlers/visual markup preserved',
);
console.log(
  JSON.stringify({
    passed: true,
    byteIdenticalDistFiles: retained,
    unchanged:
      'all engines, physics, CSS, sprites, shared buttons, confirmation/check, hints policy, other campaigns, imports and Modo Sem Parar',
  }),
);

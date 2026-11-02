// Testes e verificações de componentes compartilhados do Intuição.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { root, store, $, timers, flush } from './direct-ui-harness.mjs';
import { generateOriginalEndless } from '../dist/endless-original.mjs';
root.innerHTML = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
document.body = root;
globalThis.cancelAnimationFrame = (id) => timers.delete(id);
globalThis.matchMedia = () => ({ matches: true });
const key = 'intuicao.endless.original.v1';
store.set(
  key,
  JSON.stringify({
    light: {
      seed: 1234,
      options: { sources: 3, mirrors: 3, walls: true, portals: true, selective: true },
      count: 0,
    },
    cut: { seed: 4321, options: { shape: 'Losango', curves: true, holes: true }, count: 0 },
  }),
);
await import('../dist/app.mjs');
const saved = (g) => JSON.parse(store.get(key))[g];
for (const game of ['light', 'cut']) {
  root.querySelector(`[data-game="${game}"]`).click();
  assert.equal($('original-endless').hidden, true);
  $('selection-free').click();
  assert.equal($('original-endless').hidden, false);
  assert.equal($('level-prev').hidden, true);
  assert.equal($('level-next').hidden, true);
  assert.equal($('hint').hidden, false);
  assert.equal($('shape'), undefined);
  assert.equal($('target'), undefined);
  assert.equal($('objectX'), undefined);
  const original = saved(game),
    generated = generateOriginalEndless(game, original.seed, original.options);
  assert.deepEqual(original.state, generated.initial);
  const handle = $('drawing').querySelector(
    game === 'light' ? '[data-item="0"]' : '[data-item="cut"]',
  );
  $('scene').dispatch('keydown', { target: handle, key: 'ArrowRight' });
  assert.notDeepEqual(saved(game).state, generated.initial);
  // Restart restores initial state but retains the same seed and preferences.
  $('reset').click();
  $('restart-original-confirm').click();
  assert.equal(saved(game).seed, original.seed);
  assert.deepEqual(saved(game).state, generated.initial);
  $('hint').click();
  assert.ok($('hint-text').textContent.length > 10);
  for (let i = 0; i < 3; i++) $('confirm').click();
  assert.equal($('answer-key').hidden, false);
  assert.equal(saved(game).count, 0);
  assert.equal(saved(game).seed, original.seed);
  $('answer-key').click();
  assert.deepEqual(saved(game).state, generated.answer);
  $('confirm').click();
  $('confirm').click();
  assert.equal(saved(game).count, 1);
  assert.equal(saved(game).solved, true);
  const staleWin = [...timers.values()];
  $('reset').click();
  $('confirm').click();
  for (const callback of staleWin) callback();
  flush();
  assert.equal(saved(game).seed, original.seed);
  assert.equal(saved(game).count, 1);
  assert.equal($('restart-original').open, true);
  $('restart-original-cancel').click();
  flush();
  assert.notEqual(saved(game).seed, original.seed);
  assert.equal(saved(game).count, 1);
  assert.equal(saved(game).solved, false);
  assert.deepEqual(
    saved(game).state,
    generateOriginalEndless(game, saved(game).seed, saved(game).options).initial,
  );
  // Returning to the mode resumes the same puzzle, independent from campaign.
  const now = saved(game);
  $('back-selection').click();
  $('level-grid').querySelector('[data-level="2"]').click();
  assert.equal($('original-endless').hidden, true);
  $('back-selection').click();
  $('selection-free').click();
  assert.equal(saved(game).seed, now.seed);
  assert.deepEqual(saved(game).state, now.state);
  // Staged controls do not change a running puzzle before explicit Apply.
  const before = saved(game);
  if (game === 'light') {
    $('endless-sources').value = '2';
    $('endless-mirrors').value = '1';
    $('endless-walls').checked = false;
    $('endless-portals').checked = false;
    $('endless-selective').checked = false;
  } else {
    $('endless-shape').value = 'Quadrado';
    $('endless-curves').checked = false;
    $('endless-holes').checked = false;
  }
  assert.deepEqual(saved(game), before);
  $('original-endless-form').dispatch('submit');
  assert.notEqual(saved(game).seed, before.seed);
  assert.equal(saved(game).count, 1);
  if (game === 'light') {
    assert.equal(saved(game).state.sources.length, 2);
    assert.equal(saved(game).state.portals.length, 0);
  } else {
    assert.equal(saved(game).state.shape, 'Quadrado');
    assert.equal(saved(game).state.family, 'Reta');
    assert.equal(saved(game).state.holes.length, 0);
  }
  const configSeed = saved(game).seed;
  $('original-endless-new').click();
  assert.notEqual(saved(game).seed, configSeed);
  assert.equal(saved(game).count, 1);
  // A successful seed cannot be counted twice after restarting during the delay.
  for (let i = 0; i < 3; i++) $('confirm').click();
  $('answer-key').click();
  $('confirm').click();
  assert.equal(saved(game).count, 2);
  $('reset').click();
  $('restart-original-confirm').click();
  $('answer-key').click();
  $('confirm').click();
  assert.equal(saved(game).count, 2);
  const stale = [...timers.values()];
  $('back-selection').click();
  const leaveSeed = saved(game).seed;
  for (const callback of stale) callback();
  assert.equal(saved(game).seed, leaveSeed);
  assert.equal(document.querySelector('.lab').hidden, true);
  console.log(
    'PASS',
    game,
    'Endless generation, gabarito, auto-next once, same-seed reset, resume, staged config, navigation cancellation and campaign separation',
  );
}

assert.ok(
  Object.keys(JSON.parse(store.get('intuicao.answers.v1') ?? '{}')).every(
    (k) => !k.startsWith('endless-'),
  ),
);
console.log(
  'PASS Endless answer counters remain bounded in the current per-game run, not campaign storage',
);

const storeWrite = globalThis.localStorage.setItem;
globalThis.localStorage.setItem = () => {
  throw Error('quota');
};
$('selection-free').click();
assert.equal($('original-endless-storage').hidden, false);
assert.equal(document.querySelector('.lab').hidden, false);
globalThis.localStorage.setItem = storeWrite;
console.log('PASS storage failure stays playable and shows an honest warning');

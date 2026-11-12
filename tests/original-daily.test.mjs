import assert from 'node:assert/strict';
import fs from 'node:fs';
import { dailyChallenge } from '../dist/daily-challenge.mjs';
import { lightLevels, cutLevels } from '../dist/levels.mjs';
import { dailyLevelIndex } from '../dist/logica/ui.mjs';

const before = new Date('2026-11-11T02:59:59.999Z');
const after = new Date('2026-11-11T03:00:00.000Z');
assert.equal(dailyChallenge('light', before).day, '2026-11-10');
assert.equal(dailyChallenge('light', after).day, '2026-11-11');
assert.deepEqual(dailyChallenge(' LIGHT ', after), dailyChallenge('light', after));
assert.deepEqual(dailyChallenge('cut', after), dailyChallenge('cut', new Date('2026-11-12T02:59:59Z')));
for (const game of ['light', 'cut']) {
  for (const count of [1, 2, 17, 80, 157]) {
    for (let offset = 0; offset < 100; offset++) {
      const date = new Date(after.getTime() + offset * 86400000);
      const challenge = dailyChallenge(game, date, count);
      assert.equal(challenge.index, dailyLevelIndex(game, date, count));
      assert.ok(challenge.index >= 0 && challenge.index < count);
    }
  }
}
for (const count of [0, -1, NaN, Infinity, 1.5, '80', Number.MAX_SAFE_INTEGER + 1])
  assert.throws(() => dailyChallenge('light', after, count), RangeError);
for (const game of ['', 'broto', 'versus', null, 3])
  assert.throws(() => dailyChallenge(game, after), RangeError);
assert.throws(() => dailyChallenge('light', new Date('invalid')), RangeError);
assert.equal(lightLevels.length, 80);
assert.equal(cutLevels.length, 80);

// Real app module in the repository's DOM harness, not a browser/layout check.
const { root, store, $, timers, Element } = await import('./direct-ui-harness.mjs');
Element.prototype.append ??= function(...nodes) { for (const node of nodes) this.appendChild(node); };
Element.prototype.insertBefore ??= function(node) { return this.appendChild(node); };
globalThis.window ??= { addEventListener() {} };
const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
assert.match(html, /id="selection-daily"/);
root.innerHTML = html;
document.body = root;
globalThis.cancelAnimationFrame = id => timers.delete(id);
globalThis.matchMedia = () => ({ matches: true });
await import('../dist/app.mjs');
const key = 'intuicao.campaign.original.v1';
for (const [game, levels] of [['light', lightLevels], ['cut', cutLevels]]) {
  root.querySelector(`[data-game="${game}"]`).click();
  const today = dailyChallenge(game, new Date(), levels.length);
  $('selection-daily').click();
  assert.equal(Number($('level').value), today.index);
  assert.match($('stage-label').textContent, /^Desafio diário · /);
  assert.equal($('original-endless').hidden, true);
  assert.equal($('level-prev').hidden, false);
  const handle = game === 'light'
    ? `[data-item="${levels[today.index].objects.findIndex(object => object.type === 'mirror')}"]`
    : '[data-item="basic-cut"]';
  const original = $('drawing').innerHTML;
  $('scene').dispatch('keydown', { target: $('drawing').querySelector(handle), key: 'ArrowRight' });
  assert.notEqual($('drawing').innerHTML, original);
  $('back-selection').click();
  const saved = JSON.parse(store.get(key))[`${game}:${levels[today.index].id}`];
  assert.ok(saved?.state);
  $('selection-daily').click();
  $('back-selection').click();
  assert.deepEqual(JSON.parse(store.get(key))[`${game}:${levels[today.index].id}`], saved);
  $('selection-daily').click();
  const delta = today.index === levels.length - 1 ? -1 : 1;
  $(delta === 1 ? 'level-next' : 'level-prev').click();
  assert.equal(Number($('level').value), today.index + delta);
  assert.doesNotMatch($('stage-label').textContent, /Desafio diário/);
  $('back-selection').click();
  $('level-grid').querySelector(`[data-level="${today.index}"]`).click();
  assert.doesNotMatch($('stage-label').textContent, /Desafio diário/);
  $('back-selection').click();
  $('selection-daily').click();
  $('reset').click();
  $('restart-original-cancel').click();
  assert.match($('stage-label').textContent, /Desafio diário/);
  $('back-selection').click();
  $('selection-free').click();
  assert.equal($('original-endless').hidden, false);
  assert.doesNotMatch($('stage-label').textContent, /Desafio diário/);
  $('back-selection').click();
}
console.log('PASS original daily: deterministic normalized selection, São Paulo midnight, catalog counts, resume without reset, navigation and endless isolation');

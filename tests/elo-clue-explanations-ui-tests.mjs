// Testes e verificações de ELO.
// Actual module/event simulation, not native keyboard or pixel QA.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { Element, host, store, $ } from './direct-ui-harness.mjs';
Object.defineProperty(Element.prototype, 'open', {
  configurable: true,
  get() {
    return Object.hasOwn(this.attrs, 'open');
  },
  set(v) {
    if (v) this.attrs.open = '';
    else delete this.attrs.open;
  },
});
const { initCollection } = await import('../dist/collection-ui.mjs');
const app = initCollection({ hideOriginal() {} }),
  button = () => $('c-elo-explanations-toggle'),
  legend = () => $('c-elo-clue-legend'),
  explanations = () => legend().querySelectorAll('.elo-clue-explanation');
const toggleRules = (v) => {
  const p = $('c-rules-panel');
  p.open = v;
  p.dispatch('toggle');
};
function shown(value, label) {
  assert.ok(button(), label + ' toggle exists');
  assert.equal(button().attrs.type, 'button');
  assert.equal(button().attrs['aria-expanded'], String(value), label + ' expanded');
  assert.equal(button().textContent, value ? 'Ocultar explicações' : 'Mostrar explicações');
  assert.ok(explanations().length > 0);
  assert.ok(
    explanations().every((n) => n.hidden === !value),
    label + ' explanations only',
  );
  const ids = button().attrs['aria-controls'].split(/\s+/);
  assert.deepEqual(
    ids,
    explanations().map((n) => n.id),
  );
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(legend().closest('#c-rules-sidebar'), $('c-rules-sidebar'));
  assert.equal(
    $('c-surface').querySelector('.elo-clue-legend'),
    null,
    'No duplicate legend above the map',
  );
}
app.activate('elo');
host.querySelector('[data-new-level="20"]').click();
shown(true, 'campaign entry');
const board = $('c-board').innerHTML,
  saved = [...store],
  code = host.innerHTML;
button().focus();
const firstButton = button();
firstButton.click();
shown(false, 'hide');
assert.equal(document.activeElement, firstButton);
assert.equal($('c-board').innerHTML, board);
assert.deepEqual(
  [...store],
  saved,
  'Explanation toggle never records progress, assistance, attempts or history',
);
assert.equal(host.innerHTML, code, 'Toggle never rewrites codes');
for (let i = 0; i < 3; i++) {
  button().click();
  shown(true, 'repeated show');
  button().click();
  shown(false, 'repeated hide');
}
$('c-advanced-toggle').click();
shown(false, 'advanced rerender');
assert.equal(
  document.activeElement,
  button(),
  'Focused explanation button restored after rerender',
);
firstButton.click();
shown(false, 'stale button ignored');
toggleRules(false);
shown(false, 'rules independent close');
assert.equal($('c-rules-sidebar').hidden, true);
toggleRules(true);
shown(false, 'rules independent open');
assert.equal($('c-rules-sidebar').hidden, false);
$('c-board').querySelector('[data-cell="0"]').dispatch('keydown', { key: 'Enter' });
$('c-undo').click();
$('c-redo').click();
$('c-hint').click();
shown(false, 'edit history and hint preserve choice');
$('c-reset').click();
$('restart-collection-cancel').click();
shown(false, 'cancel reset');
$('c-reset').click();
$('restart-collection-confirm').click();
shown(false, 'confirmed reset');
$('c-level-next').click();
shown(true, 'new phase');
button().click();
$('c-back').click();
host.querySelector('[data-new-level="21"]').click();
shown(true, 'fresh reentry');
const fixture = {
  game: 'elo',
  rows: 4,
  cols: 4,
  regions: Array.from({ length: 16 }, (_, i) => (i % 4 < 2 ? 0 : 1) + (i < 8 ? 0 : 2)),
  fixed: { 0: 0, 1: 3, 2: 12, 3: 15 },
  constraints: {
    shapes: { 0: 'turn', 1: 'turn' },
    passages: [1],
    forbiddenEdges: [[5, 6]],
    rowCounts: { 0: 2 },
    colCounts: { 3: 2 },
    distances: { 0: 6 },
    neighbors: [[0, 1]],
    order: [0, 1, 3, 2],
    cuts: [{ axis: 'row', index: 1, count: 2 }],
    exclusivePassages: [{ id: 'own-group', cells: [2, 10] }],
  },
};
$('c-editor-json').value = JSON.stringify(fixture);
$('c-editor-play').click();
await Promise.resolve();
shown(true, 'own JSON phase');
assert.match(host.innerHTML, /FASE PERSONALIZADA/);
assert.match(host.innerHTML, /own-group/);
button().click();
$('c-advanced-toggle').click();
shown(false, 'custom rerender');
for (const game of ['prumo', 'pacto', 'desvio']) {
  app.activate(game);
  host.querySelector(game === 'desvio' ? '[data-map="1"]' : '[data-new-level="1"]').click();
  assert.equal(button(), undefined);
  assert.equal(legend(), undefined);
  assert.equal(host.querySelector('.elo-clue-explanation'), null);
}
const css = fs.readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8');
assert.match(css, /\.elo-clue-legend \.elo-clue-explanation\{[^}]*white-space:normal/);
assert.match(css, /#c-elo-explanations-toggle\{[^}]*min-height:44px/);
assert.match(css, /\.elo-clue-legend \.elo-clue-explanation\[hidden\]\{display:none\}/);
console.log(
  'PASS ELO clue explanations: rules-sidebar placement, default/reset/reentry, independent accessible toggle, focus/stale callbacks, immutable code/game/saves, custom nine-family phase, wrapping and other-game isolation.',
);

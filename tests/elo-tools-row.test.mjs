// Testes e verificações de ELO.
import assert from 'node:assert/strict';
import { host, $ } from './direct-ui-harness.mjs';
import { initCollection } from '../dist/collection-ui.mjs';
const app = initCollection({ hideOriginal() {} });
function check() {
  const row = host.querySelector('.elo-tools-row');
  assert.ok(row);
  assert.equal($('c-tools').parentElement, row);
  for (const id of ['c-undo', 'c-redo', 'c-reset', 'c-rules-panel']) {
    assert.equal($(id).parentElement.parentElement, row, id + ' shares tools row');
    assert.equal(host.querySelectorAll('#' + id).length, 1, id + ' is unique');
  }
  assert.ok(host.querySelector('[data-tool="value"]'));
  assert.ok(host.querySelector('[data-tool="pencil"]'));
  assert.equal($('c-mark-blocked').parentElement.parentElement, $('c-board-surface'));
  assert.equal(
    $('c-stage-label').parentElement.parentElement,
    host.querySelector('.collection-stage-top'),
  );
  assert.equal($('c-confirm').parentElement, host.querySelector('.board-check-controls'));
  assert.equal($('c-rules-sidebar').parentElement, host.querySelector('.collection-workspace'));
}
app.activate('elo');
host.querySelector('[data-new-level="0"]').click();
check();
host.querySelector('[data-tool="pencil"]').click();
check();
host.querySelector('[data-tool="value"]').click();
check();
$('c-advanced-toggle').click();
check();
$('c-mark-blocked').click();
check();
const rules = $('c-rules-panel');
rules.open = true;
rules.dispatch('toggle');
check();
assert.equal($('c-rules-sidebar').hidden, false);
for (const game of ['prumo', 'pacto', 'desvio']) {
  app.activate(game);
  host.querySelector(game === 'desvio' ? '[data-map="0"]' : '[data-new-level="0"]').click();
  assert.ok(!host.querySelector('.elo-tools-row'));
  assert.equal(
    $('c-undo').parentElement.parentElement,
    host.querySelector('.collection-stage-top'),
  );
}
console.log(
  'PASS ELO-only tools/action row, unique IDs, rerender/tool switching, marking toggle/phase/confirmation/rules preserved; other games unchanged.',
);

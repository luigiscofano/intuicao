// Testes e verificações de componentes compartilhados do Intuição.
import assert from 'node:assert/strict';
import { host, $ } from './direct-ui-harness.mjs';
import { initCollection } from '../dist/collection-ui.mjs';
const app = initCollection({ hideOriginal() {} });
function check(game) {
  const board = host.querySelector('.board-navigation');
  const row = host.querySelector('.board-check-controls');
  const actions = host.querySelector('.level-actions');
  const siblings = board.parentElement.nodes.filter((n) => n.parentElement === board.parentElement);
  assert.equal(
    siblings[siblings.indexOf(board) + 1],
    row,
    `${game}: checks immediately below board`,
  );
  assert.equal(
    siblings[siblings.indexOf(row) + 1],
    actions,
    `${game}: nearby navigation/hints follow checks`,
  );
  assert.equal($('c-confirm').parentElement, row);
  assert.equal(host.querySelectorAll('#c-confirm').length, 1);
  assert.ok(host.nodes.indexOf(actions) < host.nodes.indexOf($('c-local-palette')));
  assert.ok(
    host.nodes.indexOf(actions) < host.nodes.indexOf(host.querySelector('.collection-feedback')),
  );
  if (game === 'desvio') assert.ok(!$('c-check'));
  else assert.equal($('c-check').parentElement, row);
  if (game === 'prumo') assert.equal($('c-moments').parentElement, row);
  assert.equal(typeof $('c-confirm').onclick, 'function');
}
for (const game of ['elo', 'prumo', 'pacto', 'desvio']) {
  app.activate(game);
  host.querySelector(game === 'desvio' ? '[data-map="0"]' : '[data-new-level="0"]').click();
  check(game);
  $('c-advanced-toggle').click();
  check(game);
}
console.log(
  'PASS collection confirmation/check adjacency, unique existing controls, nearby hints/navigation, PRUMO moments and DESVIO existing confirmation; rerender stable.',
);

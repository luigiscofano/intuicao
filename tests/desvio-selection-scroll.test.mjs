import test from 'node:test';
import assert from 'node:assert/strict';
import { Element, host, store, timers } from './direct-ui-harness.mjs';
import { initCollection } from '../dist/collection-ui.mjs';

// A troca de grid reconstrói a seleção. O foco do título não pode rolar a página.
test('DESVIO pede foco sem rolagem ao renderizar a seleção', () => {
  const calls = [];
  const original = Element.prototype.focus;
  Element.prototype.focus = function (options) { calls.push({ id: this.id, options }); };
  const app = initCollection({ hideOriginal() {} });
  try {
    store.clear();
    app.activate('desvio');
    const title = host.querySelector('#collection-title');
    assert.ok(title);
    assert.deepEqual(calls.at(-1)?.options, { preventScroll: true });
    // Voltar à seleção segue o mesmo caminho usado depois de trocar o mapa.
    app.activate('desvio');
    assert.deepEqual(calls.at(-1)?.options, { preventScroll: true });
  } finally {
    app.hide();
    Element.prototype.focus = original;
    timers.clear();
  }
});

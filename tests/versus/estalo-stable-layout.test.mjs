import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createState } from '../../dist/versus/games/estalo/engine.mjs';
import { renderBoard } from '../../dist/versus/games/estalo/view.mjs';
import { FIT_BOARD_SELECTOR } from '../../dist/board-fit.mjs';

test('ESTALO reserva a coluna lateral antes e depois da seleção', () => {
  for (const context of [{}, { selection: { cell: 0 } }, { pendingMove: { type: 'burst', cell: 0, turn: 0 } }]) {
    const html = renderBoard(createState(), context);
    assert.match(html, /class="estalo-workspace"/);
    assert.match(html, /<aside class="estalo-tools" aria-label="Direção da abertura">/);
    assert.ok(html.indexOf('estalo-coordinates') < html.indexOf('estalo-tools'));
  }
});
test('ESTALO não participa da redução por mensagens de cada jogada', () => {
  assert.ok(!FIT_BOARD_SELECTOR.includes('estalo-coordinates'));
  const css = readFileSync(new URL('../../dist/versus/games/estalo/view.css', import.meta.url), 'utf8');
  assert.match(css, /grid-template-columns: minmax\(0, 1fr\) 116px/);
  assert.match(css, /100svh - 240px/);
  assert.match(css, /overflow-anchor: none/);
});

/** A grade móvel muda a forma, nunca a ordem dos cestos ou as regras. */
import assert from 'node:assert/strict';
import { createState, applyMove, getLegalMoves, getOfferIds } from '../dist/versus/games/quinhao/engine.mjs';
import { mobileBasketPosition, renderBoard } from '../dist/versus/games/quinhao/view.mjs';
const perimeter = [];
for (let column = 1; column <= 6; column++) perimeter.push({ column, row: 1 });
for (let row = 2; row <= 8; row++) perimeter.push({ column: 6, row });
for (let column = 5; column >= 1; column--) perimeter.push({ column, row: 8 });
for (let row = 7; row >= 2; row--) perimeter.push({ column: 1, row });
assert.equal(perimeter.length, 24);
for (let count = 3; count <= 24; count += 3) {
  const positions = Array.from({ length: count }, (_, index) => mobileBasketPosition(index, count));
  assert.equal(new Set(positions.map(JSON.stringify)).size, count);
  const slots = positions.map(position => perimeter.findIndex(slot => JSON.stringify(slot) === JSON.stringify(position)));
  assert.ok(slots.every((slot, index) => slot >= 0 && (!index || slot > slots[index - 1])));
}
let state = createState();
for (let round = 0; round < 8; round++) {
  assert.equal(state.baskets.length, 24 - round * 3);
  const before = structuredClone(state);
  const html = renderBoard(state);
  assert.deepEqual(state, before);
  assert.equal((html.match(/class="quinhao-basket(?: |")/g) || []).length, state.baskets.length);
  assert.ok(html.includes('quinhao-mobile-legend'));
  const last = state.baskets.at(-1).id;
  assert.deepEqual(getOfferIds(state, last), [last, ...state.baskets.slice(0, 2).map(basket => basket.id)]);
  const move = getLegalMoves(state).at(-1);
  const offered = applyMove(state, move);
  assert.equal(offered.phase, 'choose');
  assert.equal(offered.offer.length, 3);
  const preview = renderBoard(state, { pendingMove: move, previewState: offered });
  assert.equal((preview.match(/--basket-column:/g) || []).length, state.baskets.length);
  const receipt = getLegalMoves(offered)[0];
  const next = applyMove(offered, receipt);
  renderBoard(offered, { pendingMove: receipt, previewState: next });
  state = next;
}
assert.ok(state.result);
assert.equal(state.baskets.length, 0);
assert.ok(renderBoard(state).includes('is-finished'));
console.log('Quinhão: 24 positions, cyclic order, previews and all eight rounds passed.');

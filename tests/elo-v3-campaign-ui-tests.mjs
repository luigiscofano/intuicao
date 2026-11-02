// Testes e verificações de ELO.
/** Every published ELO phase traverses the actual UI flow in the deterministic DOM harness. */
import assert from 'node:assert/strict';
import { host, store, $ } from './direct-ui-harness.mjs';
import { initCollection } from '../dist/collection-ui.mjs';
import { GEOMETRY_LEVELS } from '../dist/geometry-levels.mjs';
import { GEOMETRY_ANSWERS } from '../dist/geometry-answers.mjs';
import { validateGeometry } from '../dist/geometry-games.mjs';
const levels = GEOMETRY_LEVELS.elo,
  read = () => JSON.parse(store.get('intuicao.collection.v1'));
assert.equal(levels.length, 200);
let app = initCollection({ hideOriginal() {} });
app.activate('elo');
assert.equal(host.querySelectorAll('[data-new-level]').length, 200);
let failures = 0,
  answers = 0,
  reloads = 0;
for (let index = 0; index < levels.length; index++) {
  const l = levels[index];
  host.querySelector(`[data-new-level="${index}"]`).click();
  const session = () => read().sessions[l.id].history.present;
  assert.equal($('c-board').querySelectorAll('[data-cell]').length, l.rows * l.cols);
  assert.equal(validateGeometry(l, session()).complete, false, l.id + ' begins as a puzzle');
  assert.equal($('c-answer').hidden, true, l.id + ' answer initially hidden');
  for (let i = 0; i < 3; i++) {
    $('c-confirm').click();
    failures++;
    assert.notEqual($('c-motion').dataset.outcome, 'win');
    assert.equal($('c-answer').hidden, i < 2);
  }
  $('c-answer').click();
  answers++;
  assert.deepEqual(session().positions, GEOMETRY_ANSWERS[l.id]);
  for (const [r, c] of Object.entries(l.fixed ?? {})) assert.equal(session().positions[r], c);
  assert.equal(
    validateGeometry(l, session()).complete,
    true,
    l.id + ' applied answer satisfies rules',
  );
  assert.notEqual($('c-motion').dataset.outcome, 'win', 'answer application never auto-wins');
  assert.ok(!read().completed.includes(l.id));
  $('c-confirm').click();
  assert.equal($('c-motion').dataset.outcome, 'win');
  assert.ok(read().completed.includes(l.id));
  assert.match($('c-status').textContent, /assistida/);
  $('c-back').click();
  if (index % 40 === 39) {
    app = initCollection({ hideOriginal() {} });
    app.activate('elo');
    host.querySelector(`[data-new-level="${index}"]`).click();
    assert.ok(validateGeometry(l, session()).complete);
    assert.equal($('c-answer').hidden, false);
    assert.ok(read().completed.includes(l.id));
    $('c-back').click();
    reloads++;
  }
}
assert.equal(read().completed.filter((id) => levels.some((l) => l.id === id)).length, 200);
console.log(
  JSON.stringify({
    passed: true,
    campaignLevels: 200,
    confirmedFailures: failures,
    verifiedAnswers: answers,
    reloadChecks: reloads,
    explicitWins: 200,
  }),
);

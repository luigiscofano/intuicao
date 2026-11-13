import test from 'node:test';
import assert from 'node:assert/strict';
import * as engine from '../../dist/versus/games/estalo/engine.mjs';
import * as view from '../../dist/versus/games/estalo/view.mjs';
import { createSession, applySessionMove, currentState, serializeSession, restoreSession, travelHistory } from '../../dist/versus/session.mjs';
import { chooseMove } from '../../dist/versus/search.mjs';

for (const map of engine.ESTALO_MAPS) {
  test(`Estalo ${map.id}: renderização preserva dimensões, recortes e meta`, () => {
    const state = engine.createState({ mapId: map.id });
    const html = view.renderBoard(state);
    assert.match(html, new RegExp(`--estalo-columns:${map.columns};--estalo-rows:${map.rows}`));
    assert.match(html, new RegExp(`viewBox="0 0 ${map.columns * 100} ${map.rows * 100}"`));
    assert.equal((html.match(/class="estalo-cell/g) ?? []).length, map.rows * map.columns);
    assert.equal((html.match(/estalo-gap/g) ?? []).length, map.blocked.length);
    assert.match(view.renderResult(state), new RegExp(`0/${map.targets[0]}`));
    const move = engine.getLegalMoves(state)[0];
    const after = engine.applyMove(state, move);
    assert.ok(view.describeMove(state, move, after).length > 20);
  });
  test(`Estalo ${map.id}: replay, desfazer/refazer e configuração do mapa`, () => {
    const config = { mode: 'local', difficulty: 'intermediate', mascots: ['capivara', 'tucano'], mapId: map.id };
    let session = createSession(engine, config);
    for (let i = 0; i < 3 && !currentState(session).result; i++) {
      session = applySessionMove(engine, session, engine.getLegalMoves(currentState(session))[0]);
    }
    session = travelHistory(session, -1);
    const saved = serializeSession(session, config);
    const restored = restoreSession(engine, saved);
    assert.deepEqual(restored, session);
    assert.deepEqual(currentState(travelHistory(restored, 1)), session.states[session.cursor + 1]);
  });
  test(`Estalo ${map.id}: computador produz jogadas legais em três níveis`, () => {
    const state = engine.createState({ mapId: map.id });
    for (const difficulty of ['beginner', 'intermediate', 'strong']) {
      const answer = chooseMove(engine, state, difficulty, { milliseconds: 120, nodes: 300 });
      assert.ok(engine.getLegalMoves(state).some(move => JSON.stringify(move) === JSON.stringify(answer.move)));
      assert.ok(engine.applyMove(state, answer.move).moveCount === 1);
    }
  });
}

test('Estalo: save antigo sem mapId restaura o mapa clássico e rejeita mapa adulterado', () => {
  const config = { mode: 'local', difficulty: 'intermediate', mascots: ['capivara', 'tucano'] };
  const record = { version: 1, config, actions: [{ type: 'burst', cell: 0, turn: 0 }], cursor: 1 };
  assert.equal(currentState(restoreSession(engine, record)).mapId, 'classico');
  assert.deepEqual(currentState(restoreSession(engine, record)).scores, [4, 2]);
  assert.throws(() => restoreSession(engine, { ...record, config: { ...config, mapId: 'injetado' } }));
});

test('Estalo: segundo clique confirma a vagem e preserva a direção escolhida', async () => {
  const { repeatsPendingChoice } = await import('../../dist/versus/repeat-choice.mjs');
  for (const map of engine.ESTALO_MAPS) {
    const state = engine.createState({ mapId: map.id });
    const cell = engine.getLegalMoves(state)[0].cell;
    const action = { type: 'cell', cell };
    const first = view.interact(state, null, action);
    assert.equal(repeatsPendingChoice('estalo', null, action, null, first.move), false);
    const second = view.interact(state, first.selection, action);
    assert.equal(repeatsPendingChoice('estalo', action, action, first.move, second.move), true);
    const rotated = view.interact(state, first.selection, {type:'aim', cell, turn:1});
    const clicked = view.interact(state, rotated.selection, action);
    assert.equal(clicked.move.turn, 1);
    assert.equal(repeatsPendingChoice('estalo', {type:'aim',cell,turn:1}, action, rotated.move, clicked.move), true);
    const after = engine.applyMove(state, clicked.move);
    assert.equal(view.interact(after, null, action).move, null, 'vagem aberta não repete jogada');
    assert.equal(state.moveCount, 0);
  }
});

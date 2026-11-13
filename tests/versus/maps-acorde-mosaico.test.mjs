import test from 'node:test';
import assert from 'node:assert/strict';
import { game as acorde } from '../../dist/versus/games/acorde/index.mjs';
import { game as mosaico } from '../../dist/versus/games/mosaico/index.mjs';
import { createSession, applySessionMove, currentState, serializeSession, restoreSession } from '../../dist/versus/session.mjs';
import { chooseMove } from '../../dist/versus/search.mjs';

for (const game of [acorde, mosaico]) {
  test(`${game.name}: 42 arranjos fixos, seis formatos e identidade versionada`, () => {
    assert.equal(game.maps.length, 42);
    assert.equal(new Set(game.maps.map(map => map.id)).size, 42);
    assert.equal(new Set(game.maps.map(map => map.group)).size, 6);
    assert.deepEqual(game.engine.createState(), game.engine.createState({ mapId: 'classic' }));
    assert.throws(() => game.engine.createState({ mapId: 'inexistente' }));
    assert.throws(() => game.engine.createState({ mapId: game.maps[1].id, mapVersion: 99 }));
    assert.equal(new Set(game.maps.map(map => JSON.stringify([map.rows, map.cols, map.board ?? map.initialTiles]))).size, 42);
  });

  test(`${game.name}: todos os formatos chegam ao fim, mantêm histórico e renderizam`, () => {
    for (const map of game.maps) {
      for (let sample = 0; sample < 20; sample += 1) {
        const config = { mapId: map.id, mapVersion: map.version };
        let session = createSession(game.engine, config);
        let random = sample + 1;
        for (let turn = 0; !currentState(session).result && turn < 100; turn += 1) {
          const state = currentState(session);
          const before = JSON.stringify(state);
          const legal = game.engine.getLegalMoves(state);
          assert.ok(legal.length, `${map.id}: posição não terminal sem ação`);
          random = (Math.imul(random, 1664525) + 1013904223) >>> 0;
          session = applySessionMove(game.engine, session, legal[random % legal.length]);
          assert.equal(JSON.stringify(state), before, 'Motor não pode modificar o estado anterior');
        }
        const final = currentState(session);
        assert.ok(final.result, `${map.id}: partida não terminou`);
        assert.equal(final.mapId, map.id === 'classic' ? undefined : map.id);
        assert.deepEqual(currentState(restoreSession(game.engine, serializeSession(session, config))), final);
        assert.ok(game.view.renderBoard(final).includes(game.id + '-board'));
      }
    }
  });

  test(`${game.name}: IA recomenda ações legais em todo catálogo e nos três orçamentos`, () => {
    for (const map of game.maps) {
      const state = game.engine.createState({ mapId: map.id });
      const legal = game.engine.getLegalMoves(state);
      for (const difficulty of ['beginner', 'intermediate', 'strong']) {
        const result = chooseMove(game.engine, state, difficulty, { milliseconds: 35, nodes: 500 });
        assert.ok(legal.some(move => JSON.stringify(move) === JSON.stringify(result.move)), `${map.id}/${difficulty}`);
      }
    }
  });
}

test('ACORDE conserva quantidades iguais e a meta original de três pares', () => {
  for (const map of acorde.maps) {
    const amounts = acorde.engine.SYMBOLS.map(symbol => map.board.filter(item => item === symbol).length);
    assert.equal(new Set(amounts).size, 1);
    assert.ok(amounts[0] >= 4);
    const state = acorde.engine.createState({ mapId: map.id });
    assert.ok(acorde.engine.getLegalMoves(state).every(move => Math.floor(move.cell / map.cols) === 1));
    assert.equal(new Set(map.board.slice(map.cols, 2 * map.cols)).size >= 3, true);
  }
});

test('MOSAICO aberturas são prefixos legais pares, sem selos e com simetria de troca das cores', () => {
  for (const map of mosaico.maps) {
    const state = mosaico.engine.createState({ mapId: map.id });
    assert.deepEqual(mosaico.engine.getScores(state), [0, 0]);
    assert.equal(mosaico.engine.getSeals(state).some(seal => seal.complete), false);
    assert.equal(state.moveCount % 2, 0);
    assert.equal(state.player, 0);
    for (const { cell, orientation } of map.initialTiles) {
      assert.equal(state.tiles[state.tiles.length - 1 - cell], orientation);
    }
    const empty = { ...state, tiles: state.tiles.map(() => null), moveCount: 0 };
    let replay = empty;
    for (const tile of map.initialTiles) replay = mosaico.engine.applyMove(replay, { type: 'place', ...tile });
    assert.deepEqual(replay.tiles, state.tiles);
    assert.equal(replay.player, state.player);
    assert.deepEqual(mosaico.engine.getScores(replay), [0, 0]);
  }
});

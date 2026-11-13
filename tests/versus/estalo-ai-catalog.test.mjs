import test from 'node:test';
import assert from 'node:assert/strict';
import * as engine from '../../dist/versus/games/estalo/engine.mjs';
import { chooseMove } from '../../dist/versus/search.mjs';

// Orçamento curto exercita também a resposta segura quando uma busca é interrompida.
test('Estalo: partidas completas de IA nos 42 mapas e três dificuldades', () => {
  for (const map of engine.ESTALO_MAPS) {
    for (const difficulty of ['beginner', 'intermediate', 'strong']) {
      let state = engine.createState({ mapId: map.id });
      while (!state.result) {
        const result = chooseMove(engine, state, difficulty, { milliseconds: 20, nodes: 80 });
        assert.ok(engine.getLegalMoves(state).some(move => JSON.stringify(move) === JSON.stringify(result.move)), map.id);
        state = engine.applyMove(state, result.move);
        for (const owner of [0, 1]) {
          assert.equal(state.scores[owner] + state.board.filter(pod => pod?.owner === owner).length, map.targets[owner]);
        }
        assert.ok(state.moveCount <= map.targets[0] + map.targets[1]);
      }
      if (state.result.winner === null) assert.deepEqual(state.scores, map.targets);
      else assert.equal(state.scores[state.result.winner], map.targets[state.result.winner]);
    }
  }
});

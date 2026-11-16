import test from 'node:test';
import assert from 'node:assert/strict';
import { LOGIC_GAME_IDS, loadLogicGame } from '../../dist/logica/metadata.mjs';
import { generateLogicChallenge, RECENT_LIMIT } from '../../dist/logica/endless-generator.mjs';
import { validGeneratedLevel } from '../../dist/logica/endless.mjs';

test('revisão independente: 90 rodadas em cada uma das 36 combinações de jogo/faixa', async () => {
  for (const game of LOGIC_GAME_IDS) {
    const adapter = await loadLogicGame(game);
    for (let difficulty = 0; difficulty < 6; difficulty++) {
      let recentSignatures = [];
      for (let step = 0; step < 90; step++) {
        const result = await generateLogicChallenge({ game, baseSeed: 518329, step, difficulty, recentSignatures });
        const context = `${game}, dificuldade ${difficulty}, rodada ${step}`;
        assert.equal(validGeneratedLevel(adapter, result.level), true, context);
        assert.equal(result.level.difficulty, difficulty, context);
        assert.equal(result.level.number, step + 1, context);
        assert.equal(recentSignatures.includes(result.signature), false, context);
        recentSignatures = [...recentSignatures, result.signature].slice(-RECENT_LIMIT);
      }
    }
  }
});

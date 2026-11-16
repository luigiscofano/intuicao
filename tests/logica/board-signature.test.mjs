import { readFileSync } from 'node:fs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { ACTIVE_GAME_IDS } from '../../dist/game-catalog.mjs';
import { LOGIC_GAMES, loadLogicGame } from '../../dist/logica/metadata.mjs';

test('todas as campanhas lógicas ativas possuem duas assinaturas passivas dentro do SVG', async () => {
  const games = LOGIC_GAMES.filter(game => ACTIVE_GAME_IDS.includes(game.id));
  assert.deepEqual(games.map(game => game.id), ['pulso', 'foz', 'refugio', 'mirante', 'renovo']);
  for (const { id } of games) {
    const game = await loadLogicGame(id);
    for (const level of game.CAMPAIGN) {
      const state = game.initialState(level);
      const before = JSON.stringify({ level, state });
      for (const skin of ['normal', 'identity']) {
        const html = game.renderBoard(level, state, { skin });
        const [, width, height] = html.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
        const signatures = [...html.matchAll(/<g aria-hidden="true" pointer-events="none" class="logic-tile-signature" transform="translate\(([\d.]+) ([\d.]+)\) scale\(([\d.]+)\)">([\s\S]*?)<\/g>/g)];
        assert.equal(signatures.length, 2, `${id}: ${level.id}, ${skin}`);
        for (const [, x, y, scale, paths] of signatures) {
          assert.ok(+x >= 0 && +x + 20 * scale <= +width, `${id}: limite horizontal`);
          assert.ok(+y >= 0 && +y + 20 * scale <= +height, `${id}: limite vertical`);
          assert.equal((paths.match(/<path /g) || []).length, 4);
          assert.doesNotMatch(paths, /data-cell|tabindex|role="button"/);
        }
        assert.ok(+signatures[0][1] > +signatures[1][1]);
        assert.ok(+signatures[0][2] < +signatures[1][2]);
        assert.equal(JSON.stringify({ level, state }), before);
      }
    }
  }
});

test('os dez jogos da categoria pública usam assinaturas sem alcançar Versus', () => {
  const read = path => readFileSync(new URL('../../dist/' + path, import.meta.url), 'utf8');
  const navigation = read('category-navigation.mjs');
  const category = navigation.match(/logica: \[([\s\S]*?)\]/)[1];
  assert.deepEqual([...category.matchAll(/"([a-z]+)"/g)].map(match => match[1]), ['elo','prumo','pacto','sintonia','repasse','pulso','foz','refugio','mirante','renovo']);
  assert.ok(read('collection-ui.mjs').includes('game !== "desvio" ? boardCornerMarkup() : ""'));
  for (const file of ['sintonia/ui.mjs','repasse/ui.mjs']) assert.ok(read(file).includes('boardCornerMarkup()'));
  const css=read('logic-board-corners.css');
  assert.match(css, /pointer-events: none/);
  assert.doesNotMatch(css, /padding|margin|grid-template|transform/);
});

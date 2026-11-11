import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LOGIC_GAME_IDS, LOGIC_GAMES, loadLogicGame } from '../../dist/logica/metadata.mjs';
import { LOGIC_CAMPAIGNS } from '../../dist/logica/catalog-summary.mjs';
import { GAME_PRESENTATION } from '../../dist/approved-game-shell.mjs';
import { GAME_GUIDANCE } from '../../dist/contextual-guidance.mjs';
import { GAME_INFO } from '../../dist/game-info-content.mjs';

test('seis jogos têm catálogo completo e identidades iguais ao resumo de conquistas', async () => {
  assert.deepEqual(LOGIC_GAME_IDS, ['divisa', 'pulso', 'foz', 'refugio', 'mirante', 'renovo']);
  assert.equal(LOGIC_CAMPAIGNS.reduce((total, game) => total + game.levels.length, 0), 480);
  for (const game of LOGIC_GAMES) {
    const adapter = await loadLogicGame(game.id);
    assert.equal(adapter.GAME.id, game.id);
    assert.equal(adapter.CAMPAIGN.length, 80);
    const identities = adapter.CAMPAIGN.map(({ id, version, difficulty }) => ({ id, version, difficulty }));
    assert.deepEqual(LOGIC_CAMPAIGNS.find(item => item.id === game.id).levels, identities);
    assert.equal(new Set(identities.map(item => item.id)).size, 80);
    assert.deepEqual(Array.from({ length: 6 }, (_, band) => identities.filter(item => item.difficulty === band).length), [15, 15, 15, 15, 15, 5]);
    for (const level of adapter.CAMPAIGN) {
      assert.equal(adapter.isStateValid(level, adapter.initialState(level)), true, level.id);
      assert.equal(adapter.checkState(level, adapter.solutionState(level)).valid, true, level.id);
    }
  }
});

test('cada entrada da biblioteca possui apresentação, orientação, informação e estilo de tabuleiro', () => {
  const html = readFileSync(new URL('../../dist/index.html', import.meta.url), 'utf8');
  const css = readFileSync(new URL('../../dist/logica/ui.css', import.meta.url), 'utf8');
  for (const game of LOGIC_GAMES) {
    assert.equal((html.match(new RegExp(`data-logic="${game.id}"`, 'g')) || []).length, 1);
    assert.ok(GAME_PRESENTATION[game.id]);
    assert.ok(GAME_GUIDANCE[game.id]);
    assert.ok(GAME_INFO[game.id]);
    assert.ok(css.includes(`./games/${game.id}/view.css`));
  }
  assert.doesNotMatch(html, /data-logic="(?:laco|rodizio)"/);
});

test('rota rejeita identificadores desconhecidos sem importar caminhos arbitrários', async () => {
  await assert.rejects(loadLogicGame('../cerco'), /Jogo desconhecido/);
  await assert.rejects(loadLogicGame('constructor'), /Jogo desconhecido/);
});

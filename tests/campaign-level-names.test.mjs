import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { campaignLevelName } from '../dist/campaign-level-names.mjs';
import { CAMPAIGN_LEVEL_NAMES } from '../dist/campaign-level-names-data.mjs';
import { lightLevels, cutLevels } from '../dist/levels.mjs';
import { ELO_CAMPAIGN } from '../dist/elo-campaign.mjs';
import { PRUMO_CAMPAIGN } from '../dist/prumo-campaign.mjs';
import { PACTO_LEVELS } from '../dist/pacto-campaign.mjs';
import { CAMPAIGN as sintonia } from '../dist/sintonia/campaign.mjs';
import { CAMPAIGN as repasse } from '../dist/repasse/campaign.mjs';
import { loadLogicGame } from '../dist/logica/metadata.mjs';

const campaigns = { light: lightLevels, cut: cutLevels, elo: ELO_CAMPAIGN,
  prumo: PRUMO_CAMPAIGN, pacto: PACTO_LEVELS, sintonia, repasse };
for (const game of ['pulso', 'foz', 'refugio', 'mirante', 'renovo']) {
  campaigns[game] = (await loadLogicGame(game)).CAMPAIGN;
}

for (const [game, levels] of Object.entries(campaigns)) {
  test(`${game}: 80 nomes estáveis, completos e distintos, sem modificar a campanha`, () => {
    const before = JSON.stringify(levels);
    assert.equal(levels.length, 80);
    assert.deepEqual(Object.keys(CAMPAIGN_LEVEL_NAMES[game]).sort(), levels.map(l => String(l.id)).sort());
    const names = levels.map(level => campaignLevelName(game, level));
    assert.equal(new Set(names).size, 80);
    for (const name of names) {
      assert.equal(typeof name, 'string');
      assert.ok(name.length >= 3 && name.length <= 65, name);
      assert.doesNotMatch(name, /\d|[<>]/);
    }
    // Reordenar a seleção não muda o nome, pois ele é associado ao ID.
    assert.deepEqual([...levels].reverse().map(level => campaignLevelName(game, level)), [...names].reverse());
    assert.equal(JSON.stringify(levels), before);
  });
}

test('campanhas externas e jogos Versus não recebem títulos de fases inventadas', () => {
  assert.deepEqual(Object.keys(CAMPAIGN_LEVEL_NAMES).sort(), Object.keys(campaigns).sort());
  assert.equal(campaignLevelName('elo', {id: 'importado', name: 'Meu circuito'}), 'Meu circuito');
  assert.equal(campaignLevelName('cerco', {id: 'mapa', name: 'Meu mapa'}), 'Meu mapa');
  assert.equal(campaignLevelName('foz', null), '');
});

test('adaptadores publicam título somente ao abrir a fase; seleção não expõe nomes', () => {
  const read = path => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
  for (const file of ['collection-ui.mjs', 'logica/ui.mjs', 'sintonia/ui.mjs', 'repasse/ui.mjs']) {
    assert.match(read(file), /data-campaign-level-name=/);
  }
  assert.match(read('app.mjs'), /dataset\.campaignLevelName = free \|\| customLevel/);
  for (const file of ['app.mjs', 'sintonia/ui.mjs', 'repasse/ui.mjs', 'logica/ui.mjs']) {
    const text = read(file);
    for (const match of text.matchAll(/aria-label="(?:Nível|Fase)[^"\n]*"/g)) {
      assert.doesNotMatch(match[0], /displayCampaignName|item\.name|l\.name/);
    }
  }
  assert.doesNotMatch(read('logica/ui.mjs'), /<span>\$\{esc\(item\.name\)\}<\/span>/);
  assert.match(read('approved-game-shell.mjs'), /stage\?\.dataset\?\.campaignLevelName \|\| levelName/);
});

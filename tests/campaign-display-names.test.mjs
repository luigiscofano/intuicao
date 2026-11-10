import test from 'node:test';
import assert from 'node:assert/strict';
import {lightLevels, cutLevels} from '../dist/levels.mjs';
import {displayCampaignName} from '../dist/campaign-display-names.mjs';

test('ten approved technical suffixes change only in presentation', () => {
  const before = JSON.stringify(lightLevels);
  const changed = lightLevels.filter(level => displayCampaignName(level) !== level.name);
  assert.equal(changed.length, 10);
  assert(changed.every(level => !/\d{3}$/.test(displayCampaignName(level))));
  assert.equal(JSON.stringify(lightLevels), before);
  assert.equal(displayCampaignName(lightLevels[16]), 'Lados invertidos');
  assert.equal(displayCampaignName(lightLevels[52]), 'A volta pelo acesso útil');
});

test('unknown IDs, future revisions and other campaigns retain their original names', () => {
  assert.equal(displayCampaignName({id: 'custom', name: 'Minha fase 001'}), 'Minha fase 001');
  assert.equal(displayCampaignName({id: 'light-v7-spacious-017', name: 'Título novo 001'}), 'Título novo 001');
  assert(cutLevels.every(level => displayCampaignName(level) === level.name));
});

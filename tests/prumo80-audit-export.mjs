import fs from 'node:fs';
import {PRUMO_CAMPAIGN} from '../dist/prumo-campaign.mjs';
import {PRUMO_CAMPAIGN_ANSWERS} from '../dist/prumo-campaign-answers.mjs';
fs.writeFileSync('tests/prumo80-independent-input.json',JSON.stringify(PRUMO_CAMPAIGN.map(level=>({level,answer:PRUMO_CAMPAIGN_ANSWERS[level.id]}))));

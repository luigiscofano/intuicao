import fs from 'node:fs';
import assert from 'node:assert/strict';
import {ELO_CAMPAIGN as levels} from '../dist/elo-campaign.mjs';
import {levelHash} from './elo-campaign-reasoning.mjs';
const path=n=>new URL(n,import.meta.url),review=JSON.parse(fs.readFileSync(path('./elo-campaign-editorial.json'))),audit=JSON.parse(fs.readFileSync(path('./elo-campaign-audit.json'))),source=JSON.parse(fs.readFileSync(path('./elo-campaign-candidates.json')));
for(const[number,item]of Object.entries(review)){const l=levels[Number(number)-1];assert.ok(levelHash(l).startsWith(item.hashPrefix),'Editorial review no longer matches '+l.id);l.logicIdea=item.idea;l.difficulty=item.difficulty;l.designAudit.editorialSample={review:'tests/elo-editorial-review.md',hashPrefix:item.hashPrefix,kind:'Assisted editorial analysis, not player-tested calibration'};const a=audit.levels.find(a=>a.id===l.id);a.logicIdea=l.logicIdea;a.difficulty=l.difficulty;a.editorialReview={...item,source:'tests/elo-editorial-review.md',humanPlaytest:false};}
audit.summary.difficulty=levels.reduce((o,l)=>(o[l.difficulty]=(o[l.difficulty]||0)+1,o),{});audit.summary.editorialSamples=Object.keys(review).length;
fs.writeFileSync(path('../dist/elo-campaign.mjs'),'// Offline-selected ELO v3 campaign. Detailed reasoning certificates remain in development tests.\nexport const ELO_CAMPAIGN = '+JSON.stringify(levels)+';\n');
fs.writeFileSync(path('./elo-campaign-audit.json'),JSON.stringify(audit,null,2));source.levels=levels;source.audit=audit.levels;fs.writeFileSync(path('./elo-campaign-candidates.json'),JSON.stringify(source));console.log('Applied '+Object.keys(review).length+' hash-matched editorial reviews.');

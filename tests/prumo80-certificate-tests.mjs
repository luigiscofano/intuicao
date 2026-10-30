import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PRUMO_CAMPAIGN} from '../dist/prumo-campaign.mjs';
import {PRUMO_CAMPAIGN_ANSWERS} from '../dist/prumo-campaign-answers.mjs';
import {validateGeometry,solveGeometry} from '../dist/geometry-games.mjs';
const results=[];
assert.equal(PRUMO_CAMPAIGN.length,80);
for(const l of PRUMO_CAMPAIGN){const a=PRUMO_CAMPAIGN_ANSWERS[l.id];const start=performance.now();for(let repeat=0;repeat<100;repeat++)assert.equal(validateGeometry(l,a).complete,true,l.id);const checkMs=(performance.now()-start)/100;const r=solveGeometry(l,a,2,{maxMs:900,maxOperations:250000});assert.equal(r.count,1,l.id);assert.equal(r.exhaustive,true,l.id);results.push({id:l.id,rows:l.rows,cols:l.cols,referenceValid:true,completeStateExhaustive:true,checkMs});}
fs.writeFileSync('tests/prumo80-certificate-performance.json',JSON.stringify(results,null,2));console.log(JSON.stringify({pass:true,certified:results.length,maxCheckMs:Math.max(...results.map(r=>r.checkMs)),tenByTen:results.filter(r=>r.rows===10&&r.cols===10).length}));

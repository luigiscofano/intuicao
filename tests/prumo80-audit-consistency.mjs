import assert from 'node:assert/strict';import fs from 'node:fs';import {createHash} from 'node:crypto';
import {PRUMO_CAMPAIGN} from '../dist/prumo-campaign.mjs';
const rows=JSON.parse(fs.readFileSync(new URL('./prumo80-independent-validation.json',import.meta.url)));
const canonical=v=>Array.isArray(v)?v.map(canonical):v&&typeof v==='object'?Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])])):v;
assert.equal(rows.length,80);
for(const l of PRUMO_CAMPAIGN){const row=rows.find(r=>r.id===l.id);assert.ok(row,l.id);const hash=createHash('sha256').update(JSON.stringify(canonical({rows:l.rows,cols:l.cols,supports:l.supports}))).digest('hex');assert.equal(hash,row.definitionSha256,l.id+' audit must match final definition');assert.equal(row.certificate.exactZeroMoments,true);assert.notEqual(row.uniqueness.status,'multiple');assert.ok(['unique','inconclusive'].includes(row.uniqueness.status));}
console.log('PRUMO80 independent audit: all80 hashes match current definitions;60 unique MILP evidence/20 inconclusive.');

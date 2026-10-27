import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {ANIMAL_IDS,ANIMAL_SPRITES,resolveAnimalRoster} from '../dist/sintonia/animal-roster.mjs';
import {CAMPAIGN} from '../dist/sintonia/campaign.mjs';

const hash=data=>crypto.createHash('sha256').update(data).digest('hex');
test('all 16 original PNGs are embedded unchanged in local sprite assets',()=>{
  assert.equal(ANIMAL_IDS.length,16);assert.equal(new Set(ANIMAL_IDS).size,16);
  const sources=JSON.parse(fs.readFileSync(new URL('../docs/sintonia-sprites/roster-sources.json',import.meta.url)));
  for(const sprite of Object.values(ANIMAL_SPRITES)){
    const svg=fs.readFileSync(fileURLToPath(sprite.url),'utf8');
    const source=sources.find(item=>sprite.url.endsWith(item.asset.replace('dist/','')));
    assert.ok(source);assert.equal(hash(svg),source.assetSHA256);
    assert.equal(hash(Buffer.from(svg.match(/base64,([^" ]+)/)[1],'base64')),source.sourceSHA256);
    assert.match(svg,/clipPath/);assert.doesNotMatch(svg,/<script|<foreignObject|xlink:href="https?:/);
  }
});

test('500 phase-sized draws use the complete roster, without duplicates or map changes',()=>{
  let seed=157;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/2**32);
  const before=JSON.stringify(CAMPAIGN),seen=new Set(),groups=new Set();
  for(const level of CAMPAIGN){
    const roster=resolveAnimalRoster(level.boards.length,null,random);
    assert.equal(roster.length,level.boards.length);assert.equal(new Set(roster).size,roster.length);
    roster.forEach(id=>{assert.ok(ANIMAL_IDS.includes(id));seen.add(id);});groups.add(roster.join(','));
  }
  assert.equal(seen.size,16);assert.ok(groups.size>100);assert.equal(JSON.stringify(CAMPAIGN),before);
  // Each animal can be selected first; no fixed initial pair.
  for(let i=0;i<16;i++)assert.equal(resolveAnimalRoster(2,null,()=> (i+.5)/16)[0],ANIMAL_IDS[i]);
});

test('saved identities survive reload; malformed cosmetic data is safely replaced',()=>{
  const saved=['quati','arara','coral','tatu'];
  const copy=resolveAnimalRoster(4,saved,()=>{throw Error('Must not redraw a saved roster');});
  assert.deepEqual(copy,saved);assert.notEqual(copy,saved);
  for(const invalid of [null,{},['quati','quati'],['unknown','arara'],['quati'],['__proto__','constructor']]){
    const roster=resolveAnimalRoster(2,invalid,()=>0);
    assert.equal(new Set(roster).size,2);assert.ok(roster.every(id=>ANIMAL_IDS.includes(id)));
  }
});

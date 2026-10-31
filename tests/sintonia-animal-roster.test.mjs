import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {ANIMAL_IDS,ANIMAL_SPRITES,resolveAnimalRoster,normalizeAnimalId} from '../dist/sintonia/animal-roster.mjs';
import {CAMPAIGN} from '../dist/sintonia/campaign.mjs';

const hash=data=>crypto.createHash('sha256').update(data).digest('hex');
test('the exact user-attached sheet supplies all 16 frames, embedded once without modification',()=>{
  assert.equal(ANIMAL_IDS.length,16);assert.equal(new Set(ANIMAL_IDS).size,16);
  const source=JSON.parse(fs.readFileSync(new URL('../docs/sintonia-sprites/roster-sources.json',import.meta.url)));
  const svg=fs.readFileSync(fileURLToPath(ANIMAL_SPRITES.tuiuiu.url),'utf8');
  assert.equal(hash(svg),source.assetSHA256);
  assert.equal(source.sourceSHA256,'86d64f23b418243f573acfad6e14b06d750a1156c4adc901a3fb13b349f90f0e');
  assert.equal(source.sourceLibraryFileId,'libfile_c8e90fb42ca48191bdd126cc3f7638bc');
  const embedded=[...svg.matchAll(/base64,([^" ]+)/g)];
  assert.equal(embedded.length,1);assert.equal(hash(Buffer.from(embedded[0][1],'base64')),source.sourceSHA256);
  assert.doesNotMatch(svg,/<script|<foreignObject|xlink:href="https?:/);
  const paths=[...svg.matchAll(/<path data-animal="([a-z]+)" d="([^"]+)"\/>/g)];
  assert.deepEqual(paths.map(match=>normalizeAnimalId(match[1])),ANIMAL_IDS);
  for(const [frame,[id,sprite]] of Object.entries(ANIMAL_SPRITES).entries()){
    assert.equal(sprite.url,ANIMAL_SPRITES.tuiuiu.url);assert.equal(sprite.columns,4);assert.equal(sprite.rows,4);assert.equal(sprite.frame,frame);
    const rects=[...paths[frame][2].matchAll(/M(\d+) (\d+)h(\d+)v(\d+)h-\d+z/g)];
    assert.ok(rects.length>0,id);
    for(const [,x,y,w,h] of rects){assert.ok(+x>=frame%4*313.5&&+x+ +w<=(frame%4+1)*313.5);assert.ok(+y>=Math.floor(frame/4)*313.5&&+y+ +h<=(Math.floor(frame/4)+1)*313.5);}
  }
});

test('the game renderer selects the right row and column for every approved animal',()=>{
  const ui=fs.readFileSync(new URL('../dist/sintonia/ui.mjs',import.meta.url),'utf8');
  const fragment=ui.slice(ui.indexOf('  function spriteMarkup(board)'),ui.indexOf('  function renderBoards()'));
  const render=new Function('ANIMAL_SPRITES','animalKey','animalName','recentDirection','esc',fragment+';return spriteMarkup;')(ANIMAL_SPRITES,board=>board.animal,board=>board.animal,'up',String);
  for(const [frame,id] of ANIMAL_IDS.entries()){
    const expected=`background-size:400% 400%;background-position:${(frame%4)/3*100}% ${Math.floor(frame/4)/3*100}%`;
    assert.ok(render({animal:id}).includes(expected),id);
  }
});

test('80 campaign phase-sized draws use the complete roster, without duplicates or map changes',()=>{
  let seed=157;const random=()=>((seed=(Math.imul(seed,1664525)+1013904223)>>>0)/2**32);
  const before=JSON.stringify(CAMPAIGN),seen=new Set(),groups=new Set();
  for(const level of CAMPAIGN){
    const roster=resolveAnimalRoster(level.boards.length,null,random);
    assert.equal(roster.length,level.boards.length);assert.equal(new Set(roster).size,roster.length);
    roster.forEach(id=>{assert.ok(ANIMAL_IDS.includes(id));seen.add(id);});groups.add(roster.join(','));
  }
  assert.equal(seen.size,16);assert.ok(groups.size>40);assert.equal(JSON.stringify(CAMPAIGN),before);
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

test('legacy anta identity migrates in place without random draw; 500 endless-sized casts remain unique',()=>{
  const old=['anta','mico','quati'];assert.deepEqual(resolveAnimalRoster(3,old,()=>{throw Error('No redraw');}),['peixeboi','mico','quati']);assert.equal(old[0],'anta');
  for(let n=0;n<500;n++){const count=2+n%3,cast=resolveAnimalRoster(count,null);assert.equal(new Set(cast).size,count);assert.ok(cast.every(id=>ANIMAL_IDS.includes(id)));assert.ok(!cast.includes('anta'));}
  assert.equal(ANIMAL_SPRITES.peixeboi.frame,11);
});

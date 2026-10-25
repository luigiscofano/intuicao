import test from 'node:test';
import assert from 'node:assert/strict';
import {generateEndless,levelSignature} from '../dist/orbita/generator.mjs';
import {selectFallback} from '../dist/orbita/fallback.mjs';
import {validateLevel,initialState,isWon,replay} from '../dist/orbita/engine.mjs';

test('seeded endless produces complete reproducible nontrivial certified boards across all bands',()=>{
 const signatures=new Set(),families=new Set();
 for(let difficulty=0;difficulty<5;difficulty++)for(let sample=0;sample<12;sample++){
  const seed=900000+difficulty*1000+sample,options={difficulty,maxAttempts:32};
  const first=generateEndless(seed,options),again=generateEndless(seed,options);
  assert.deepEqual(again,first,'seed '+seed);assert.equal(first.seed,seed);assert.equal(first.level.seed,seed);
  assert.equal(first.level.difficulty,difficulty);assert.equal(validateLevel(first.level).valid,true);assert.equal(isWon(first.level,initialState(first.level)),false);assert.equal(replay(first.level,first.level.solution).solved,true);
  assert.equal(levelSignature(first.level),first.signature);assert.equal(first.generatorVersion,'orbita-generator-1');
  for(const rule of first.level.specialRules){if(rule.kind==='sensor')assert.ok(difficulty>=4);if(['gear','step'].includes(rule.kind))assert.ok(difficulty>=3);}
  signatures.add(first.signature);families.add(first.level.family);
 }
 assert.ok(signatures.size>=56);assert.ok(families.size>=7);
});

test('recent-signature rejection changes the actual puzzle, not merely its title or seed',()=>{
 const first=generateEndless(325,{difficulty:3,maxAttempts:32});
 const next=generateEndless(325,{difficulty:3,maxAttempts:32,recentSignatures:[first.signature],recentFamilies:[first.level.family]});
 assert.notEqual(first.signature,next.signature);assert.notDeepEqual(first.level.initial,next.level.initial);
});

test('bounded exhaustion exposes an explicit generation budget and reservoir stays solvable and nonrepeating',()=>{
 assert.throws(()=>generateEndless(12,{maxAttempts:0}),error=>error.code==='GENERATION_BUDGET');
 for(let difficulty=0;difficulty<5;difficulty++){
  const recent=[];
  for(let i=0;i<16;i++){
   const choice=selectFallback(1234+i,{difficulty,recentSignatures:recent});
   assert.equal(choice.source,'fallback');assert.ok(!recent.includes(choice.signature));assert.equal(choice.seed,1234+i);
   assert.equal(replay(choice.level,choice.level.solution).solved,true);assert.equal(isWon(choice.level,initialState(choice.level)),false);
   assert.deepEqual(choice,selectFallback(1234+i,{difficulty,recentSignatures:recent}));recent.push(choice.signature);
  }
 }
});

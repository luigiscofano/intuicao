import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {selectCertifiedV2,ENDLESS_VERSION} from '../dist/orbita/endless-v2.mjs';
import {replay,initialState,isWon} from '../dist/orbita/engine.mjs';
import {compactOrbitaAudit} from '../dist/orbita/presentation-fit.mjs';
import {validateCircleGeometryV3} from '../dist/orbita/topology-circles-v3.mjs';
import {endlessOptions as orbitOptions,restoreOrbitaSession,serializeOrbitaSession} from '../dist/orbita/ui.mjs';
import {endlessOptions as sintoniaOptions} from '../dist/sintonia/ui.mjs';
import {endlessOptions as repasseOptions} from '../dist/repasse/ui.mjs';
import {selectCertifiedFallback} from '../dist/sintonia/fallback.mjs';
import {selectFallback as repasseFallback} from '../dist/repasse/fallback.mjs';
import {verifyGenerated} from '../dist/sintonia/analysis.mjs';
import {certifyGenerated} from '../dist/repasse/certification.mjs';
import {generateFreshChallenge} from '../dist/endless-variety.mjs';
import {generateOriginalEndless} from '../dist/endless-original.mjs';
import {generateCollectionEndless} from '../dist/endless-collection.mjs';
for(const [options,max,learned] of [[orbitOptions,4,[]],[sintoniaOptions,5,[]],[repasseOptions,7,['original','single','corner','four']]])for(let difficulty=0;difficulty<=max;difficulty++)for(const wins of [0,4,8,40,999])assert.equal(options(difficulty,wins,learned).difficulty,difficulty);
let count=0;
for(let difficulty=0;difficulty<5;difficulty++){
 let recent=[];
 for(let seed=1;seed<=40;seed++){
  const r=selectCertifiedV2(seed,{difficulty,recentSignatures:recent});
  assert.equal(r.level.generation.source,'procedural');assert.equal(r.generatorVersion,ENDLESS_VERSION);
  assert.equal(r.level.difficulty,difficulty);assert.ok(replay(r.level,r.level.solution).solved);
  assert.ok(!isWon(r.level,initialState(r.level)));assert.ok(validateCircleGeometryV3(r.level).valid);assert.ok(compactOrbitaAudit(r.level).valid);
  assert.ok(!recent.includes(r.signature));recent=[...recent,r.signature].slice(-24);
  assert.deepEqual(selectCertifiedV2(seed,{difficulty}),selectCertifiedV2(seed,{difficulty}));
  const session=restoreOrbitaSession(r.level,null);assert.equal(restoreOrbitaSession(r.level,serializeOrbitaSession(r.level,session)).restored,true);
  count++;
 }
}
for(let difficulty=0;difficulty<6;difficulty++){
 const r=selectCertifiedFallback(123,{difficulty,maxMs:800});verifyGenerated(r);assert.equal(r.level.difficulty,difficulty);assert.ok(!String(r.level.id).includes('fallback'));
}
for(let difficulty=0;difficulty<8;difficulty++){
 const options={difficulty,allowedConfigurations:['original','single','corner','four']};const r=repasseFallback(123,options);certifyGenerated(r,options);assert.equal(r.source,'generated');
 const next=repasseFallback(123,{...options,recentSignatures:[r.signature]});assert.notEqual(next.signature,r.signature);
}
for(const game of ['light','cut','elo','prumo','pacto']){
 const generate=(seed,o)=>(['light','cut'].includes(game)?generateOriginalEndless:generateCollectionEndless)(game,seed,o);
 const first=generateFreshChallenge(generate,123,{}),second=generateFreshChallenge(generate,123,{},[first.signature]);
 assert.notEqual(first.signature,second.signature);assert.notEqual(first.seed,second.seed);assert.deepEqual(first,generateFreshChallenge(generate,123,{}));
}
assert.throws(()=>generateFreshChallenge(()=>({level:{id:'ignored',board:[1]}}),1,{},['{"board":[1]}']));
assert.ok(!readFileSync(new URL('../dist/orbita/endless-v2.mjs',import.meta.url),'utf8').includes('catalog-legacy'));
console.log(`PASS: ${count} fresh compact circular puzzles, fixed difficulty, persistence, procedural fallbacks and bounded recent dedupe for all five constructive games.`);

/** Independent campaign QA: no stored solution is supplied to either search. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {ELO_CAMPAIGN as levels} from '../dist/elo-campaign.mjs';
import {ELO_CAMPAIGN_ANSWERS as answers} from '../dist/elo-campaign-answers.mjs';
import {validateElo,solveElo,analyzeEloLocal} from '../dist/elo-rules.mjs';
import {independentSolve,canonical} from './elo-campaign-build.mjs';
import {levelHash} from './elo-campaign-reasoning.mjs';
const expectedStages=['Básico','Aprendiz','Intermediário','Avançado','Mestre','Modo Sábio'];
const first={turn:10,straight:13,passages:16,forbiddenEdges:24,counts:31,distances:39,neighbors:46,order:54,cuts:61,exclusivePassages:68};
const families=l=>{const c=l.constraints??{},f=[];for(const x of ['turn','straight'])if(Object.values(c.shapes??{}).includes(x))f.push(x);for(const x of ['passages','forbiddenEdges','distances','neighbors','order','cuts','exclusivePassages'])if(Object.keys(c[x]??{}).length)f.push(x);if(Object.keys(c.rowCounts??{}).length||Object.keys(c.colCounts??{}).length)f.push('counts');return f;};
assert.equal(levels.length,80);assert.equal(new Set(levels.map(l=>l.id)).size,80);
assert.equal(new Set(levels.map(canonical)).size,80,'No repeated layout under symmetry/relabeling');
const firstActual={};levels.forEach((l,i)=>families(l).forEach(f=>firstActual[f]??=i+1));assert.deepEqual(firstActual,first);
const records=[];let complete=false;const output=new URL('./elo80-independent-validation.json',import.meta.url);
const save=()=>fs.writeFileSync(output,JSON.stringify({generatedAt:new Date().toISOString(),engineHash:createHash('sha256').update(fs.readFileSync(new URL('../dist/elo-rules.mjs',import.meta.url))).digest('hex'),total:levels.length,validated:records.length,complete,mechanicIntroductions:firstActual,method:'Production exact search from all legal cells; separately implemented DFS without production local propagation; reference answers used only for post-search equality.',humanPlaytesting:false,records},null,2)+'\n');
for(const [i,l]of levels.entries()){
 const stage=Math.min(5,Math.floor(i/15));assert.equal(l.campaignNumber,i+1);assert.equal(l.stage,stage+1);assert.equal(l.stageName,expectedStages[stage]);assert.equal(l.stagePosition,i%15+1);assert.ok(l.rows<=12&&l.cols<=12);
 const p=answers[l.id];assert.ok(p);assert.ok(validateElo(l,{positions:p}).complete,l.id+' stored answer valid');assert.ok(!validateElo(l,p.map((_,r)=>l.fixed?.[r]??-1)).complete,l.id+' not presolved');
 const k=Math.max(...l.regions)+1;for(let r=0;r<k;r++){const cells=l.regions.flatMap((reg,c)=>reg===r?[c]:[]),seen=new Set([cells[0]]),queue=[cells[0]],all=new Set(cells);for(const c of queue)for(const n of [c-1,c+1,c-l.cols,c+l.cols])if(all.has(n)&&!seen.has(n)&&(Math.abs(n-c)===l.cols||Math.floor(n/l.cols)===Math.floor(c/l.cols))){seen.add(n);queue.push(n);}assert.equal(seen.size,cells.length,l.id+' connected region '+r);}
 const start=Date.now(),independent=independentSolve(l,{limit:2,maxNodes:10000000});assert.ok(independent.exhaustive,l.id+' independent enumeration incomplete '+independent.cutoffReason);assert.equal(independent.count,1,l.id+' independent unique');assert.deepEqual(independent.solutions[0],p,l.id+' independent solution');
 const production=solveElo(l,{},2,{maxNodes:10000000,maxMs:Infinity});assert.ok(production.exhaustive,l.id+' production enumeration incomplete');assert.equal(production.count,1);assert.deepEqual(production.solutions[0],p);
 const local=analyzeEloLocal(l,{}, {maxMs:Infinity,maxOperations:Infinity});assert.equal(local.contradiction,false);p.forEach((cell,r)=>assert.ok(local.candidates[r].includes(cell),l.id+' answer survives local rules'));
 // Fixed-point subsets exercise the crucial incomplete-board/subdivision path.
 for(let seed=0;seed<4;seed++){const partial=p.map((cell,r)=>l.fixed?.[r]??((r+seed)%3===0?cell:-1));assert.ok(validateElo(l,partial).valid,l.id+' valid partial subset');const a=analyzeEloLocal(l,partial,{maxMs:Infinity,maxOperations:Infinity});assert.equal(a.contradiction,false);p.forEach((cell,r)=>assert.ok(a.candidates[r].includes(cell),l.id+' partial answer survives'));}
 assert.equal(l.uniqueness.status,'unique');assert.equal(l.uniqueness.exhaustive,true);assert.equal(l.uniqueness.count,1);
 records.push({number:i+1,id:l.id,levelHash:levelHash(l),families:families(l),dimensions:[l.rows,l.cols],independent:{count:1,exhaustive:true,nodes:independent.stats.nodes},production:{count:1,exhaustive:true,nodes:production.nodes},partialSubsets:4,elapsedMs:Date.now()-start});save();console.log('PASS',i+1,l.id,'independent',independent.stats.nodes,'production',production.nodes);
}
for(const [n,required]of [[76,['distances','counts']],[77,['neighbors','order']],[78,['cuts']],[79,['exclusivePassages']]])for(const family of required)assert.ok(families(levels[n-1]).includes(family),'Synthesis '+n+' '+family);
assert.ok(levels.some(l=>l.rows!==l.cols),'rectangular grids');assert.ok(levels.some(l=>l.rows>=10||l.cols>=10),'large grids');assert.ok(levels.slice(45).some(l=>l.rows<=6&&l.cols<=6),'late compact challenges');assert.ok(levels.slice(30).some(l=>families(l).length===0),'late classical interlude');
const metadata=JSON.parse(fs.readFileSync(new URL('./elo80-validation-metadata.json',import.meta.url)));
assert.equal(metadata.records.length,80);
for(const [i,r]of metadata.records.entries()){
 assert.equal(r.id,levels[i].id);assert.equal(r.validation.levelHash,levelHash(levels[i]));assert.equal(r.uniqueness.levelHash,levelHash(levels[i]));assert.ok(r.proof.solved);assert.ok(r.completeSequence.length);assert.ok(r.explainedSequence.length);assert.ok(r.origin.sourceId);assert.ok(r.centralDeduction);
 if(r.primaryFamily==='core'){assert.ok(r.completeSequence.some(s=>s.rule===r.deductionCore||s.kind===r.deductionCore));assert.ok(r.explainedSequence.some(s=>s.rule===r.deductionCore||s.kind===r.deductionCore));assert.equal(r.centralDeduction,r.explainedSequence[0].text);}
 if(i>1)assert.ok(r.deductionCore!==metadata.records[i-1].deductionCore||r.deductionCore!==metadata.records[i-2].deductionCore,'No three repeated editorial deduction cores');
}
complete=true;save();
console.log(JSON.stringify({passed:true,total:80,uniqueIndependently:80,stages:[15,15,15,15,15,5],partialSubsets:320,output:output.pathname}));

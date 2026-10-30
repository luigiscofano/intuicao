/** Independent structural/editorial review. Does not substitute metadata for proof. */
import fs from 'node:fs';import assert from 'node:assert/strict';import {execFileSync} from 'node:child_process';
import {PRUMO_CAMPAIGN as levels} from '../dist/prumo-campaign.mjs';
import {PRUMO_CAMPAIGN_ANSWERS as answers} from '../dist/prumo-campaign-answers.mjs';
const base='cf3cb986d34e47bbca3519e3b3e1421b326d6f10';
const oldText=execFileSync('git',['show',base+':dist/geometry-levels.mjs'],{encoding:'utf8',maxBuffer:30e6});
const old=JSON.parse(oldText.split('export const GEOMETRY_LEVELS = ')[1].split(';\n')[0]).prumo;
const oldById=new Map(old.map(l=>[l.id,l]));
const tiers=['Básico','Aprendiz','Intermediário','Avançado','Mestre','Modo Sábio'];
function canonical(a,r,c){const forms=[];for(let trans=0;trans<2;trans++)for(let fx=0;fx<2;fx++)for(let fy=0;fy<2;fy++){const rr=trans?c:r,cc=trans?r:c,out=[];for(let y=0;y<r;y++)for(let x=0;x<c;x++){let xx=trans?y:x,yy=trans?x:y;if(fx)xx=cc-1-xx;if(fy)yy=rr-1-yy;out[yy*cc+xx]=a[y*c+x];}const map=new Map(),norm=out.map(s=>{if(!map.has(s))map.set(s,map.size);return map.get(s);});forms.push(rr+'x'+cc+':'+norm.join(','));}return forms.sort()[0];}
assert.equal(levels.length,80);assert.equal(new Set(levels.map(l=>l.id)).size,80);
const records=[],keys=[];let preserved=0;
for(const [i,l]of levels.entries()){
 const stage=Math.min(5,Math.floor(i/15)),a=answers[l.id];assert.equal(l.campaignNumber,i+1);assert.equal(l.stage,stage+1);assert.equal(l.stageName,tiers[stage]);assert.equal(l.stagePosition,i%15+1);assert.equal(a.length,l.rows*l.cols);assert.ok(l.rows<=10&&l.cols<=10);
 if(oldById.has(l.id)){const prior=oldById.get(l.id);assert.deepEqual([l.game,l.rows,l.cols,l.supports,l.regrasVersion],[prior.game,prior.rows,prior.cols,prior.supports,prior.regrasVersion],l.id+' unchanged puzzle retains ID');preserved++;}
 else assert.ok(!oldById.has(l.id));
 const key=canonical(a,l.rows,l.cols);keys.push(key);if(i>=2)assert.ok(key!==keys[i-1]||key!==keys[i-2],'No3 same partition up to reflection/transposition/relabeling');
 const profile=l.profile||{},techniques=(profile.localTechniquesObserved||[]).map(t=>t.id);
 records.push({number:i+1,id:l.id,tier:l.stageName,dimensions:[l.rows,l.cols],supports:l.supports.length,core:l.deductionCore,coreObserved:techniques.includes(l.deductionCore),localSolved:profile.localDeduction?.solved,asymmetricPieces:profile.topology?.asymmetricPieces,nonRectangularPieces:profile.topology?.nonRectangularPieces,sharedCandidateCells:profile.interdependencies?.sharedCandidateCells,preservedId:oldById.has(l.id)});
}
assert.ok(levels.slice(0,15).filter(l=>l.rows===4&&l.cols===4).length>=8);
for(const [lo,hi,r,c]of [[15,30,4,5],[15,30,5,5],[30,45,5,5],[30,45,5,6],[30,45,6,6],[45,60,7,7],[45,60,8,8],[60,75,8,8],[60,75,9,9],[60,75,10,10],[75,80,10,10]])assert.ok(levels.slice(lo,hi).some(l=>l.rows===r&&l.cols===c),`${lo+1}–${hi} contains ${r}x${c}`);
for(const [lo,hi]of [[45,60],[60,75],[75,80]])assert.ok(levels.slice(lo,hi).some(l=>l.rows<=6&&l.cols<=6),`${lo+1}–${hi} compact`);
assert.ok(records.slice(15,30).some(r=>r.asymmetricPieces>0));
const report={passedStructuralAssertions:true,scope:'Exact stage/grid/template/identity invariants. Metadata and candidate-overlap graphs do not prove human difficulty, mandatory corridors or dependency-chain depth.',preservedIds:preserved,newIds:80-preserved,distinctPartitions:new Set(keys).size,tiers:tiers.map(t=>({name:t,count:records.filter(r=>r.tier===t).length})),records};
fs.writeFileSync('tests/prumo80-editorial-review.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,records:undefined}));

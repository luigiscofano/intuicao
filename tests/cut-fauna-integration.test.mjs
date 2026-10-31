import {buildOriginalHint} from '../dist/original-hints.mjs';
import {rulesMechanics} from '../dist/rules-context.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {after} from 'node:test';
import {createHash} from 'node:crypto';
import {cutLevels,legacyCutSelectionIds} from '../dist/cut-campaign.mjs';
import {curvedCut,shapePolygon,basicCutState} from '../dist/curves.mjs';
import {createCutCampaignProgress,CUT_CAMPAIGN_PROGRESS_KEY} from '../dist/cut-campaign-progress.mjs';
const BASELINE='ff222574bb2e81f9b6e8dbd1c8a2cb2a61a7142e';
const root=new URL('../',import.meta.url),git=(...args)=>execFileSync('git',args,{cwd:root,maxBuffer:32*1024*1024}),dir=mkdtempSync(join(tmpdir(),'cut-fauna-baseline-'));
after(()=>rmSync(dir,{recursive:true,force:true}));
for(const file of ['curves.mjs','math.mjs','cut-campaign.mjs','original-hints.mjs','light-world.mjs'])writeFileSync(join(dir,file),git('show',BASELINE+':dist/'+file));
const {buildOriginalHint:oldHint}=await import(pathToFileURL(join(dir,'original-hints.mjs')));
const {cutLevels:old}=await import(pathToFileURL(join(dir,'cut-campaign.mjs')));
const {curvedCut:oldCut,shapePolygon:oldPolygon,basicCutState:oldState}=await import(pathToFileURL(join(dir,'curves.mjs')));
test('65 level objects and evaluated legacy math paths remain deeply identical',()=>{
 for(let i=0;i<80;i++)if(i<45||i>=60){assert.deepEqual(cutLevels[i],old[i]);for(const travel of [old[i].initialTravel,old[i].certificate.travel]){const s=oldState(old[i],travel);assert.deepEqual(curvedCut(shapePolygon(s.shape),s),oldCut(oldPolygon(s.shape),s));}}
});
test('15 new identities: exact area path, initial unsolved, solved certificates and visual bound below .01pp',()=>{
 for(let i=45;i<60;i++){const l=cutLevels[i];assert.notEqual(l.id,old[i].id);assert.equal(legacyCutSelectionIds[old[i].id],l.id);
 for(const travel of [l.initialTravel,l.certificate.travel]){const s=basicCutState(l,travel),r=curvedCut(shapePolygon(s.shape),s);assert(r.errorPP<.01);assert(r.visualErrorPP<=.01000001);assert.equal(r.cells.length,0);assert(r.solidPieces.length>0);assert(r.curve.length>1);assert(r.n);assert.equal(Math.abs(r.ratio*100-l.target)<=3,travel===l.certificate.travel);}}
});
test('old completion records survive; new IDs never inherit completion or mutate storage just to select',()=>{
 const saved={version:1,completedIds:old.slice(45,60).map(l=>l.id),lastLevelId:old[45].id,extra:'preserved'},data=new Map([[CUT_CAMPAIGN_PROGRESS_KEY,JSON.stringify(saved)]]);
 const storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)},store=createCutCampaignProgress(storage),before=data.get(CUT_CAMPAIGN_PROGRESS_KEY);
 for(const l of cutLevels.slice(45,60))assert(!store.snapshot().completedIds.has(l.id));
 assert.equal(data.get(CUT_CAMPAIGN_PROGRESS_KEY),before);store.visit(cutLevels[45].id);store.complete(cutLevels[45].id);
 const after=JSON.parse(data.get(CUT_CAMPAIGN_PROGRESS_KEY));assert.equal(after.extra,'preserved');for(const id of saved.completedIds)assert(after.completedIds.includes(id));assert.equal(after.completedIds.length,16);
});
test('exact fauna path is rendered; legacy drawing and victory source remain literal',()=>{
 const current=readFileSync(new URL('../dist/app.mjs',import.meta.url),'utf8'),prior=git('show',BASELINE+':dist/app.mjs').toString();
 assert(current.includes('if(isFaunaShape(state.shape))'));
 assert(current.includes('const path=getFaunaGeometry(state.shape).path;'));
 assert(current.includes('<path d="${path}" fill="white" fill-rule="evenodd"/>'));
 assert(current.includes('<path d="${path}" clip-rule="evenodd"/>'));
 assert(current.includes('<path data-shape="cut-region" d="${path}" fill="#e5e8df" fill-rule="evenodd"/>'));
 const oldDraw=prior.split('\n').find(line=>line.includes('svg+=')&&line.includes('<mask id="shape-mask"'));
 assert(oldDraw);assert(current.includes(oldDraw));
 for(const line of prior.split('\n'))if(line.trim()&&!line.includes('current=progress.lastLevelId===l.id'))assert(current.includes(line),line.slice(0,160));
 assert(current.includes('done=progress.completedIds.has(l.id)'));
 assert(current.includes('current=(legacyCutSelectionIds[progress.lastLevelId]??progress.lastLevelId)===l.id'));
 assert(current.includes('campaignSaved[`${game}:${l.id??level}`]'));
});
test('all prior assets, other games and solo celebration are byte-identical to released baseline',()=>{
 const allowed=new Set(['dist/app.mjs','dist/curves.mjs','dist/cut-campaign.mjs','dist/original-hints.mjs','dist/rules-context.mjs']);
 const files=git('ls-tree','-r','--name-only',BASELINE,'dist').toString().trim().split('\n');
 const hash=b=>createHash('sha256').update(b).digest('hex');let checked=0;
 for(const file of files){if(allowed.has(file))continue;assert.equal(hash(readFileSync(new URL('../'+file,import.meta.url))),hash(git('show',BASELINE+':'+file)),file);checked++;}
 assert(checked>100);
 for(const file of ['result-motion.mjs','style.css'])assert.equal(hash(readFileSync(new URL('../dist/'+file,import.meta.url))),hash(git('show',BASELINE+':dist/'+file)));
});

test('animal hints name the icon and explain white areas; all 65 legacy hints stay exact',()=>{
 for(let i=0;i<80;i++){const l=cutLevels[i],state=basicCutState(l),context={free:false,cutMode:'basic'};
 const hint=buildOriginalHint('cut',l,state,context);
 if(i>=45&&i<60){const text=JSON.stringify(hint);assert(!text.includes('corte-fauna-v1-'));assert(text.includes('ícone de lado de '+l.name));assert(text.includes('Os espaços brancos do ícone não contam em nenhum dos lados.'));assert(rulesMechanics('cut',l).includes('holes'));}
 else assert.deepEqual(hint,oldHint('cut',old[i],oldState(old[i]),context));
 }
});

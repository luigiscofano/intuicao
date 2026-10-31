import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {cutLevels,legacyCutSelectionIds} from '../dist/cut-campaign.mjs';
import {curvedCut,shapePolygon,basicCutState} from '../dist/curves.mjs';
import {getFaunaGeometry} from '../dist/cut-fauna-geometry.mjs';
import {buildOriginalHint} from '../dist/original-hints.mjs';
import {createCutCampaignProgress,CUT_CAMPAIGN_PROGRESS_KEY} from '../dist/cut-campaign-progress.mjs';
const BASELINE='97a05b215c7d962faf51a9725cfabbb12ec4b29a',root=new URL('../',import.meta.url);
const git=(...args)=>execFileSync('git',args,{cwd:root,maxBuffer:32*1024*1024});
const dir=mkdtempSync(join(tmpdir(),'cut-open-baseline-'));after(()=>rmSync(dir,{recursive:true,force:true}));
for(const file of ['curves.mjs','math.mjs','cut-campaign.mjs','cut-fauna-data.mjs','cut-fauna-levels.mjs','cut-fauna-geometry.mjs','cut-fauna-master-data.mjs','cut-fauna-master-levels.mjs','original-hints.mjs','light-world.mjs'])writeFileSync(join(dir,file),git('show',BASELINE+':dist/'+file));
const {cutLevels:old,legacyCutSelectionIds:oldAliases}=await import(pathToFileURL(join(dir,'cut-campaign.mjs')));
const {curvedCut:oldCut,shapePolygon:oldPolygon,basicCutState:oldState}=await import(pathToFileURL(join(dir,'curves.mjs')));
const {getFaunaGeometry:oldGeometry}=await import(pathToFileURL(join(dir,'cut-fauna-geometry.mjs')));
const {buildOriginalHint:oldHint}=await import(pathToFileURL(join(dir,'original-hints.mjs')));
test('primeiras 60 definições, 120 avaliações e dicas permanecem iguais',()=>{
 assert.equal(cutLevels.length,80);
 for(let i=0;i<60;i++){assert.deepEqual(cutLevels[i],old[i]);for(const travel of [old[i].initialTravel,old[i].certificate.travel]){const s=oldState(old[i],travel);assert.deepEqual(curvedCut(shapePolygon(s.shape),s),oldCut(oldPolygon(s.shape),s));}
 assert.deepEqual(buildOriginalHint('cut',cutLevels[i],basicCutState(cutLevels[i])),oldHint('cut',old[i],oldState(old[i])));}
});
test('20 novas identidades usam área real, certificados e vista correta nas dicas',()=>{
 assert.equal(Object.keys(legacyCutSelectionIds).length,75);
 for(let i=60;i<80;i++){const l=cutLevels[i];assert.notEqual(l.id,old[i].id);assert.equal(legacyCutSelectionIds[old[i].id],l.id);const g=getFaunaGeometry(l.shape);assert(g.source.view==='front'||g.source.view==='side');
 for(const travel of [l.initialTravel,l.certificate.travel]){const s=basicCutState(l,travel),r=curvedCut(shapePolygon(s.shape),s);assert(r.errorPP<.01);assert(r.visualErrorPP<=.01000001);assert(r.solidPieces.length>0);assert.equal(Math.abs(r.ratio*100-l.target)<=3,travel===l.certificate.travel);}
 const text=JSON.stringify(buildOriginalHint('cut',l,basicCutState(l)));assert(text.includes(g.source.view==='front'?'ícone de frente':'ícone de lado'));assert(text.includes('Os espaços brancos'));assert(!text.includes(l.id));}
});
test('conclusões antigas não somem nem se tornam vitórias dos novos IDs',()=>{
 const saved={version:1,completedIds:old.slice(60).map(l=>l.id),lastLevelId:old[60].id,extra:'preservado'},data=new Map([[CUT_CAMPAIGN_PROGRESS_KEY,JSON.stringify(saved)]]),storage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)},store=createCutCampaignProgress(storage);
 const before=data.get(CUT_CAMPAIGN_PROGRESS_KEY);for(const l of cutLevels.slice(60))assert(!store.snapshot().completedIds.has(l.id));assert.equal(data.get(CUT_CAMPAIGN_PROGRESS_KEY),before);
 store.visit(cutLevels[60].id);store.complete(cutLevels[60].id);const after=JSON.parse(data.get(CUT_CAMPAIGN_PROGRESS_KEY));assert.equal(after.extra,'preservado');assert.equal(after.completedIds.length,21);for(const id of saved.completedIds)assert(after.completedIds.includes(id));
});
test('somente os dois dados de silhuetas e aliases de seleção mudam; app terminal e controles ficam intactos',()=>{
 const allowed=new Set(['dist/cut-fauna-master-data.mjs','dist/cut-fauna-master-levels.mjs','dist/cut-campaign.mjs']);
 const files=git('ls-tree','-r','--name-only',BASELINE,'dist').toString().trim().split('\n'),hash=b=>createHash('sha256').update(b).digest('hex');
 for(const file of files)if(!allowed.has(file))assert.equal(hash(readFileSync(new URL('../'+file,import.meta.url))),hash(git('show',BASELINE+':'+file)),file);
 // Inclusive desenho app, animação solo, outras rotas, 15 animais avançados e PNGs.
});

test('55 aliases anteriores são preservados e 20 v3 apontam somente para seleção v4',()=>{
 assert.equal(Object.keys(oldAliases).length,55);
 for(const [id,target] of Object.entries(oldAliases)){
  const at=old.findIndex(l=>l.id===target);assert(at>=0);assert.equal(legacyCutSelectionIds[id],cutLevels[at].id);
 }
 for(let i=60;i<80;i++){assert(old[i].id.startsWith('corte-fauna-v3-'));assert(cutLevels[i].id.startsWith('corte-fauna-v4-'));assert.equal(legacyCutSelectionIds[old[i].id],cutLevels[i].id);assert.equal(cutLevels[i].name,old[i].name);assert.equal(getFaunaGeometry(cutLevels[i].shape).source.view,oldGeometry(old[i].shape).source.view);}
});

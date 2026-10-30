// Deterministic actual-module DOM acceptance; not a native-browser/mobile review.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {root,store,$,timers,Element} from './direct-ui-harness.mjs';
import {cutLevels} from '../dist/levels.mjs';
import {getRulesContext} from '../dist/rules-context.mjs';
import {CUT_CAMPAIGN_PROGRESS_KEY as KEY} from '../dist/cut-campaign-progress.mjs';
assert.equal(cutLevels.length,80);
for(const key of ['min','max','type'])Object.defineProperty(Element.prototype,key,{get(){return this.attrs[key]??'';},set(value){this.attrs[key]=String(value);},configurable:true});
root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');document.body=root;
globalThis.cancelAnimationFrame=id=>timers.delete(id);globalThis.matchMedia=()=>({matches:true});
await import('../dist/app.mjs');root.querySelector('[data-game="cut"]').click();
assert.deepEqual($('level-grid').querySelectorAll('.level-group').map(g=>g.querySelectorAll('[data-level]').length),[15,15,15,15,15,5]);
const travel=()=>Number($('basicTravel').value);
const edit=value=>{const input=$('basicTravel');input.value=String(value);input.dispatch('input');input.dispatch('change');};
const debuts={};
for(let i=0;i<80;i++){
 const l=cutLevels[i];const context=getRulesContext('cut',l,{catalogue:cutLevels,index:i});for(const k of context.introduced)debuts[k]=i+1;
 $('level-grid').querySelector(`[data-level="${i}"]`).click();
 assert.equal($('stage-label').textContent,`DESAFIO ${String(i+1).padStart(2,'0')} / 80`);assert.equal($('level-prev').disabled,i===0);assert.equal($('level-next').disabled,i===79);
 assert.equal($('cut-mode-basic').attrs['aria-selected'],'true');assert.equal(travel(),l.initialTravel);
 assert.equal($('original-rules-panel').open,true);assert.equal($('original-rules-context-title').textContent,context.title);
 assert.ok($('drawing').innerHTML.includes(`rotate(${l.basicDirection})`),'arrow follows phase axis');
 const initial=travel();edit(initial+1);assert.equal(travel(),initial+1);$('undo').click();assert.equal(travel(),initial);$('redo').click();assert.equal(travel(),initial+1);
 $('cut-mode-advanced').click();assert.ok($('drawing').querySelector('[data-item="move-curve"]'));assert.ok($('drawing').querySelector('[data-item="rotate-curve"]'));assert.ok($('drawing').querySelector('[data-item="cut"]'));
 $('scene').dispatch('keydown',{target:$('drawing').querySelector('[data-item="rotate-curve"]'),key:'ArrowRight'});
 const advancedDrawing=$('drawing').innerHTML;$('cut-mode-basic').click();assert.equal(travel(),initial+1);$('cut-mode-advanced').click();assert.equal($('drawing').innerHTML,advancedDrawing,'free tab preserves its own draft');$('cut-mode-basic').click();
 $('reset').click();assert.equal($('restart-original').open,true);$('restart-original-cancel').click();assert.equal(travel(),initial+1);
 $('reset').click();$('restart-original-confirm').click();assert.equal(travel(),initial);
 for(let a=0;a<3;a++){$('confirm').click();assert.ok(!$('feedback').textContent.startsWith('Vitória!'),l.id+' starts outside success');assert.equal($('answer-key').hidden,a<2);}
 $('answer-key').click();assert.equal($('metric').textContent,'—');assert.equal($('cut-mode-basic').attrs['aria-selected'],'true');assert.equal(travel(),l.solutionTravel);
 $('confirm').click();assert.ok($('feedback').textContent.startsWith('Vitória!'),l.id+' axis answer wins');assert.ok(JSON.parse(store.get(KEY)).completedIds.includes(l.id));
 edit(Math.round(l.solutionTravel*10)/10);$('confirm').click();assert.ok($('feedback').textContent.startsWith('Vitória!'),l.id+' rounded answer accepted, not exact-reference matching');
 $('back-selection').click();assert.ok($('level-grid').querySelector(`[data-level="${i}"]`).attrs.class.includes('done'));
}
assert.equal(JSON.parse(store.get(KEY)).completedIds.length,80);
assert.deepEqual(debuts,{base:1,'family:Reta':1,'family:Parábola':7,holes:11,'family:Seno':16,'family:Cúbica':31,'family:Cosseno':39,'family:Dupla curva':46});
console.log(JSON.stringify({passed:true,levels:80,failures:240,referenceWins:80,roundedWins:80,undoRedo:80,tabDrafts:80,restartConfirmCancel:80,debuts,nativeBrowser:false}));

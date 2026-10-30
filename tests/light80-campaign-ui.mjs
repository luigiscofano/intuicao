// Exercises the actual 80-level roster in deterministic DOM, not a browser or human playtest.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {root,store,$,timers,Element} from './direct-ui-harness.mjs';
import {lightLevels} from '../dist/light-levels.mjs';
import {getRulesContext} from '../dist/rules-context.mjs';
import {LIGHT_CAMPAIGN_PROGRESS_KEY as KEY} from '../dist/light-campaign-progress.mjs';
assert.equal(lightLevels.length,80);
for(const key of ['min','max','type'])Object.defineProperty(Element.prototype,key,{get(){return this.attrs[key]??'';},set(value){this.attrs[key]=String(value);},configurable:true});
root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');document.body=root;
globalThis.cancelAnimationFrame=id=>timers.delete(id);globalThis.matchMedia=()=>({matches:true});
await import('../dist/app.mjs');
assert.equal($('level-grid').querySelectorAll('[data-level]').length,80);
assert.deepEqual($('level-grid').querySelectorAll('.level-group').map(g=>g.querySelectorAll('[data-level]').length),[15,15,15,15,15,5]);
const debuts={};
for(let i=0;i<80;i++){
 const l=lightLevels[i];
 const context=getRulesContext('light',l,{catalogue:lightLevels,index:i});
 for(const k of context.introduced)debuts[k]=i+1;
 $('level-grid').querySelector(`[data-level="${i}"]`).click();
 assert.equal($('stage-label').textContent,`DESAFIO ${String(i+1).padStart(2,'0')} / 80`);
 assert.equal($('level-prev').disabled,i===0);assert.equal($('level-next').disabled,i===79);
 assert.equal($('answer-key').hidden,true);
 assert.equal($('original-rules-panel').open,true,'Latest shared UI opens rules on entering every phase');
 assert.equal($('original-rules-context-title').textContent,context.title);
 for(let a=0;a<3;a++){$('confirm').click();assert.ok(!$('feedback').textContent.startsWith('Vitória!'),l.id+' starts unsolved');assert.equal($('answer-key').hidden,a<2);}
 $('answer-key').click();assert.equal($('answer-key').dataset.assisted,'true');
 assert.equal($('metric').textContent,'—','Applying reference does not auto-confirm');
 $('confirm').click();assert.ok($('feedback').textContent.startsWith('Vitória!'),l.id+' answer wins in actual app');
 assert.ok(JSON.parse(store.get(KEY)).completedIds.includes(l.id));
 $('back-selection').click();
}
assert.deepEqual(debuts,{base:1,walls:5,multipleSources:9,portals:12,selectivePortals:16,threeSources:21});
assert.equal(JSON.parse(store.get(KEY)).completedIds.length,80);
console.log(JSON.stringify({passed:true,levels:80,completeFailures:240,referenceWins:80,debuts}));

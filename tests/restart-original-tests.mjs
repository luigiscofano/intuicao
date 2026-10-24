import assert from 'node:assert/strict';
import fs from 'node:fs';
import {root,store,$,timers} from './direct-ui-harness.mjs';
root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');document.body=root;
globalThis.cancelAnimationFrame=id=>timers.delete(id);
globalThis.matchMedia=()=>({matches:false});
await import('../dist/app.mjs');
const ok=()=>$('restart-original-confirm'),cancel=()=>$('restart-original-cancel');
const scene=()=>$('drawing').innerHTML;
for(const game of ['light','cut']){
 root.querySelector(`[data-game="${game}"]`).click();$('level-grid').querySelector('[data-level="0"]').click();
 const initial=scene();
 if(game==='cut'){$('scene').dispatch('keydown',{target:$('drawing').querySelector('[data-item="basic-cut"]'),key:'ArrowRight'});}
 else{$('scene').dispatch('keydown',{target:$('drawing').querySelector('[data-item="0"]'),key:'ArrowRight'});}
 const modified=scene();assert.notEqual(modified,initial,game+' must be edited');
 $('reset').focus();$('reset').click();assert.equal($('restart-original').open,true);assert.equal(scene(),modified);assert.equal(document.activeElement,cancel());
 cancel().click();assert.equal(scene(),modified);assert.equal(document.activeElement,$('reset'));
 $('reset').click();cancel().dispatch('keydown',{key:'Escape'});assert.equal(scene(),modified);
 const records=[...store];$('reset').click();ok().click();assert.equal(scene(),initial);assert.equal(document.activeElement,$('game-title'));assert.equal($('selection').hidden,true);assert.equal(document.querySelector('.lab').hidden,false);assert.deepEqual([...store],records);
 $('reset').click();const stale=ok();$('next').onclick();const next=scene();assert.equal($('restart-original').open,false);stale.click();assert.equal(scene(),next);
 $('reset').click();$('back-selection').click();assert.equal($('restart-original').open,false);stale.click();assert.equal(document.querySelector('.lab').hidden,true);
 console.log('PASS',game,'actual module edit/cancel/Escape/reset, current level/focus, storage unchanged and stale navigation');
}
root.querySelector('[data-game="light"]').click();$('level-grid').querySelector('[data-level="0"]').click();$('confirm').click();assert.equal($('scene').attrs['aria-busy'],'true');assert.ok(timers.size>0);$('reset').click();ok().click();assert.equal($('scene').attrs['aria-busy'],'false');assert.equal(timers.size,0);assert.equal($('result-motion').dataset.state,'idle');
console.log('PASS Reflexos reset cancels active ray animation and clears result');
$('reset').click();root.querySelector('[data-collection="pacto"]').click();assert.equal($('restart-original').open,false);ok().click();assert.equal(document.querySelector('.lab').hidden,true);
console.log('PASS game switch dismisses stale original confirmation');

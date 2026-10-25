// Actual published catalogue and actual app module in deterministic DOM.
// This is functional UI coverage, not native-browser, mouse accuracy or layout QA.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {root,store,$,timers,Element} from './direct-ui-harness.mjs';
import {lightLevels,cutLevels} from '../dist/levels.mjs';
import {LIGHT_CAMPAIGN_PROGRESS_KEY} from '../dist/light-campaign-progress.mjs';
const expected=Number(process.env.EXPECTED_LIGHT_LEVELS??500);
assert.equal(lightLevels.length,expected);assert.equal(cutLevels.length,100);
const sentinel={failures:7,assisted:true};store.set('intuicao.answers.v1',JSON.stringify({'light:retired-before-campaign':sentinel}));
for(const key of ['min','max','type'])Object.defineProperty(Element.prototype,key,{get(){return this.attrs[key]??'';},set(value){this.attrs[key]=String(value);},configurable:true});
root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');document.body=root;
globalThis.cancelAnimationFrame=id=>timers.delete(id);globalThis.matchMedia=()=>({matches:true});
await import('../dist/app.mjs');
let flows=0,individualClicks=0,failedConfirmations=0;
const answer=id=>JSON.parse(store.get('intuicao.answers.v1')??'{}')[id]??{failures:0,assisted:false};
for(const [game,levels]of [['light',lightLevels],['cut',cutLevels]]){
 root.querySelector(`[data-game="${game}"]`).click();
 assert.equal($('level-grid').querySelectorAll('[data-level]').length,levels.length);
 $('level-grid').querySelector('[data-level="0"]').click();
 for(let i=0;i<levels.length;i++){
  if(i)$('level').dispatch('change',{target:{value:i}});
  const l=levels[i],key=`${game}:${l.id}`,label=`${game}/${i+1}/${l.id}`;
  assert.equal(answer(key).failures,0,label+' starts with its own failure history');
  assert.equal($('answer-key').hidden,true);$('answer-key').click();assert.equal(answer(key).assisted,false);
  if(game==='light')assert.equal($('drawing').querySelectorAll('[data-ray]').length,0,label+' has no light before explicit firing');
  for(let failure=1;failure<=3;failure++){
   $('confirm').click();failedConfirmations++;
   assert.equal(answer(key).failures,failure,label+' failure gate');
   assert.equal($('answer-key').hidden,failure<3);
   assert.equal($('result-motion').dataset.outcome,'loss');
  }
  $('answer-key').click();assert.equal(answer(key).assisted,true);assert.equal($('next').disabled,true,label+' answer does not submit');
  if(game==='light'){
   assert.equal($('drawing').querySelectorAll('[data-ray]').length,0,label+' applying answer does not emit a ray');
   const order=Array.from({length:l.sources.length},(_,j)=>(j+i)%l.sources.length);
   for(let j=0;j<order.length;j++){
    $('drawing').querySelector(`[data-light-source="${order[j]}"]`).click();individualClicks++;
    if(j<order.length-1){
     assert.equal($('next').disabled,true);assert.equal(answer(key).failures,3);
     const before=$('drawing').querySelectorAll('[data-fired="true"]').length;
     $('drawing').querySelector(`[data-light-source="${order[j]}"]`).click();
     assert.equal($('drawing').querySelectorAll('[data-fired="true"]').length,before,label+' duplicate source is idempotent');
    }
   }
   assert.ok(JSON.parse(store.get(LIGHT_CAMPAIGN_PROGRESS_KEY)).completedIds.includes(l.id));
  }else $('confirm').click();
  assert.ok($('feedback').textContent.startsWith('Vitória!'),label+' actual answer wins');
  assert.equal($('result-motion').dataset.outcome,'win');assert.equal(answer(key).failures,3);
  flows++;
 }
}
assert.deepEqual(answer('light:retired-before-campaign'),sentinel,'Pre-existing answer history is never cleared');
const completed=JSON.parse(store.get(LIGHT_CAMPAIGN_PROGRESS_KEY)).completedIds;
assert.equal(lightLevels.filter(l=>completed.includes(l.id)).length,lightLevels.length);
root.querySelector('[data-game="light"]').click();
assert.equal($('level-grid').querySelectorAll('.done').length,lightLevels.length);
console.log(JSON.stringify({passed:true,lightLevels:lightLevels.length,cutLevels:cutLevels.length,flows,failedConfirmations,individualClicks,storedCompletions:completed.length,scope:'Actual app/catalogue with deterministic DOM; no browser or human-playtest claim.'}));

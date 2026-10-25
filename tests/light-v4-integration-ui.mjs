import assert from 'node:assert/strict';
import fs from 'node:fs';
import {root,store,$,timers,Element} from './direct-ui-harness.mjs';
import {lightLevels,cutLevels} from '../dist/levels.mjs';
import {originalLevelState,originalJSONExample} from '../dist/original-json.mjs';
import {createLightCampaignProgress,LIGHT_CAMPAIGN_PROGRESS_KEY as KEY} from '../dist/light-campaign-progress.mjs';

// Synthetic integration fixture, not authored campaign content or a geometry audit.
// Mutates only this test process's module array; no production file is rewritten.
const original={id:'light-v3-1',name:'A primeira virada',objects:[{type:'mirror',x:400,y:330,length:124.8,angle:-76}],sources:[{x:200,y:330,angle:0,color:'gold'}],targets:[{x:400,y:150,radius:22,color:'gold'}],target:{x:400,y:150,radius:22,color:'gold'},sourceAngle:0,portals:[],solution:[-45],wallPurpose:[],rules:'Leve a luz ao alvo.'},oldId=original.id,movedIndex=224;
const bands=['basic','intermediate','advanced','master'];
const bandFor=i=>i<200?'basic':bands[1+Math.floor((i-200)/100)];
lightLevels.splice(0,lightLevels.length,...Array.from({length:500},(_,i)=>({...structuredClone(original),id:i===movedIndex?oldId:`light-v4-fixture-${i+1}`,name:`Fixture ${i+1}`,campaignNumber:i+1,campaignBand:bandFor(i),stage:1+Math.floor(i/25),stageName:i<200?`Aprendizado ${1+Math.floor(i/25)}`:'NÃO DEVE VIRAR CAPÍTULO'})));
const draft=originalLevelState({...original,game:'light'});draft.objects[0].angle=-58;
const unrelatedDraft={state:{keep:'cut draft'},cutMode:'advanced',cutDrafts:{keep:'cut modes'}};
const oldAnswer={failures:4,assisted:true},otherAnswer={failures:5,assisted:true};
store.set('intuicao.campaign.original.v1',JSON.stringify({[`light:${oldId}`]:{state:draft,cutMode:'basic',cutDrafts:{basic:null,advanced:null}},'cut:retained':unrelatedDraft}));
store.set('intuicao.answers.v1',JSON.stringify({[`light:${oldId}`]:oldAnswer,'pacto:retained':otherAnswer}));
store.set(KEY,JSON.stringify({version:1,completedIds:[oldId,'light-v3-retired'],lastLevelId:oldId}));
store.set('intuicao.endless.original.v1',JSON.stringify({light:{seed:211,options:{sources:1,mirrors:1,walls:false,portals:false},count:7},cut:{seed:301,options:{shape:'Retângulo',curves:false,holes:false},count:3}}));
store.set('intuicao.custom.original.v1',JSON.stringify({retained:{keep:'custom draft'}}));
store.set('intuicao.advanced-hidden','true');
const untouchedKeys=['intuicao.endless.original.v1','intuicao.custom.original.v1','intuicao.advanced-hidden'];
const untouched=new Map(untouchedKeys.map(key=>[key,store.get(key)]));
for(const key of ['min','max','type'])Object.defineProperty(Element.prototype,key,{get(){return this.attrs[key]??'';},set(value){this.attrs[key]=String(value);},configurable:true});
root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');document.body=root;
globalThis.cancelAnimationFrame=id=>timers.delete(id);globalThis.matchMedia=()=>({matches:true});
await import('../dist/app.mjs');
const grid=()=>$('level-grid'),tile=i=>grid().querySelector(`[data-level="${i}"]`),select=i=>tile(i).click();
const go=i=>$('level').dispatch('change',{target:{value:i}});
const angle=()=>Number($('angle').value);
const edit=value=>{const field=$('angle');field.value=String(value);field.dispatch('input');field.dispatch('change');};

assert.equal(grid().querySelectorAll('[data-level]').length,500);
assert.equal(new Set(grid().querySelectorAll('[data-level]').map(b=>b.dataset.level)).size,500);
assert.deepEqual(grid().querySelectorAll('h3').map(h=>h.dataset.campaignBand),bands);
for(const [band,label,range,count] of [['basic','Básico','1–200',200],['intermediate','Intermediário','201–300',100],['advanced','Avançado','301–400',100],['master','Mestre','401–500',100]]){
 assert.ok(grid().innerHTML.includes(`>${label} · ${range}</h3>`));
 const groups=grid().querySelectorAll('.level-group').filter(g=>g.dataset.campaignBand===band);
 assert.equal(groups.reduce((sum,g)=>sum+g.querySelectorAll('[data-level]').length,0),count);
 assert.equal(groups.length,band==='basic'?8:1,'Higher tiers are uninterrupted grids, not groups of 10 or 50');
}
assert.equal(grid().querySelectorAll('h4').length,8);assert.ok(!grid().innerHTML.includes('NÃO DEVE VIRAR CAPÍTULO'));
for(const n of [1,200,201,300,301,400,401,500])assert.ok(tile(n-1).attrs['aria-label'].startsWith(`Nível ${n}:`));
assert.ok(!tile(0).attrs.class.includes('done'));assert.equal(tile(0).attrs['aria-current'],'false');assert.ok(!tile(0).attrs['aria-label'].includes('assistido'));
assert.ok(tile(movedIndex).attrs.class.includes('done'));assert.equal(tile(movedIndex).attrs['aria-current'],'true');assert.ok(tile(movedIndex).attrs['aria-label'].includes('assistido'));
select(movedIndex);assert.equal(angle(),-58,'A retained ID finds its draft after a move from 1 to 225');
assert.equal($('answer-key').dataset.assisted,'true');assert.equal($('answer-key').hidden,false);
assert.equal($('stage-label').textContent,'DESAFIO 225 / 500');
go(0);assert.equal(angle(),original.objects[0].angle,'A reused number does not receive the prior ID’s draft');assert.equal($('answer-key').dataset.assisted,'false');assert.equal($('answer-key').hidden,true);
console.log('PASS 500 selectable tiles; four 200/100/100/100 bands; Basic-only subdivisions; retained ID keeps completion, current status, draft and assistance after reordering');

edit(original.solution[0]);$('confirm').click();assert.ok($('feedback').textContent.startsWith('Vitória!'));
assert.ok(JSON.parse(store.get(KEY)).completedIds.includes(lightLevels[0].id));
$('undo').click();assert.equal(angle(),original.objects[0].angle);assert.ok(JSON.parse(store.get(KEY)).completedIds.includes(lightLevels[0].id),'Undo cannot revoke a completion');
$('redo').click();assert.equal(angle(),original.solution[0]);assert.equal($('metric').textContent,'—','Redo does not re-evaluate');
$('back-selection').click();assert.ok(tile(0).attrs.class.includes('done'));
assert.equal(createLightCampaignProgress().snapshot().completedIds.has(lightLevels[0].id),true,'A fresh progress instance reads the actual UI-earned completion');
for(const [key,value] of untouched)assert.equal(store.get(key),value,'Campaign play must not touch '+key);
assert.deepEqual(JSON.parse(store.get('intuicao.campaign.original.v1'))['cut:retained'],unrelatedDraft);
assert.deepEqual(JSON.parse(store.get('intuicao.answers.v1'))['pacto:retained'],otherAnswer);
console.log('PASS newly earned completion persists by ID; undo/redo and existing stores remain isolated');

select(0);assert.equal($('level-prev').disabled,true);
for(const index of [199,299,399]){
 go(index);assert.equal($('stage-label').textContent,`DESAFIO ${index+1} / 500`);
 $('reset').click();const stale=$('restart-original-confirm');$('level-next').click();
 assert.equal(Number($('level').value),index+1);assert.equal($('stage-label').textContent,`DESAFIO ${index+2} / 500`);
 assert.equal($('restart-original').open,false);stale.click();assert.equal(Number($('level').value),index+1);
 $('level-prev').click();assert.equal(Number($('level').value),index);
}
go(499);assert.equal($('level-next').disabled,true);$('level-next').onclick();assert.equal(Number($('level').value),499);
for(let attempt=0;attempt<3;attempt++)$('confirm').click();assert.equal($('answer-key').hidden,false);$('answer-key').click();assert.equal(angle(),original.solution[0],'The answer lookup supports campaign level 500');
$('confirm').click();assert.ok($('feedback').textContent.startsWith('Vitória!'));
$('next').click();assert.equal(Number($('level').value),499,'Last-level navigation retains its existing bounded behavior');
go(0);$('confirm').click();$('next').click();assert.equal(Number($('level').value),1,'Success next follows the same navigation path');
edit(-62);$('reset').click();$('restart-original-cancel').click();assert.equal(angle(),-62);
$('reset').click();$('restart-original-confirm').click();assert.equal(angle(),original.objects[0].angle);assert.equal($('undo').disabled,true);
const progressBeforeOtherModes=store.get(KEY);
root.querySelector('[data-game="cut"]').click();assert.equal(grid().querySelectorAll('[data-level]').length,cutLevels.length);assert.equal(grid().querySelectorAll('h3').length,10);assert.equal(grid().querySelectorAll('h4').length,0);select(0);
assert.equal(store.get(KEY),progressBeforeOtherModes);root.querySelector('[data-game="light"]').click();assert.equal(tile(1).attrs['aria-current'],'true');
$('original-json-text').value=JSON.stringify(originalJSONExample('light'));$('original-json-play').click();assert.equal($('stage-label').textContent,'FASE PERSONALIZADA');assert.equal($('level-next').hidden,true);
$('reset').click();$('restart-original-confirm').click();assert.equal(store.get(KEY),progressBeforeOtherModes);
$('free').click();assert.equal($('stage-label').textContent,'ENDLESS · DESAFIO 8');assert.equal($('level-next').hidden,true);assert.equal(store.get(KEY),progressBeforeOtherModes);
$('reset').click();$('restart-original-confirm').click();assert.equal(JSON.parse(store.get('intuicao.endless.original.v1')).light.count,7);assert.equal(store.get(KEY),progressBeforeOtherModes);
$('challenge').click();assert.equal(tile(1).attrs['aria-current'],'true');assert.ok(tile(0).attrs.class.includes('done'));
console.log('PASS 200/201, 300/301, 400/401, first/last, back/next, stale restart, cut switching, custom and Endless stay independent');

// Denied methods are supported throughout these paths; the legacy app's separate
// default-parameter localStorage getters are outside this integration's scope.
globalThis.localStorage.getItem=()=>{throw Error('denied');};globalThis.localStorage.setItem=()=>{throw Error('denied');};
select(2);edit(original.solution[0]);assert.doesNotThrow(()=>$('confirm').click());$('back-selection').click();assert.ok(tile(2).attrs.class.includes('done'));
console.log('PASS denied storage methods do not interrupt campaign play or session completion');

// A different display ordinal never changes the array navigation value or ID.
lightLevels[3].campaignNumber=5;lightLevels[4].campaignNumber=4;$('back-selection').click();
assert.ok(tile(3).attrs['aria-label'].startsWith('Nível 5:'));assert.ok(tile(4).attrs['aria-label'].startsWith('Nível 4:'));
select(3);assert.equal(Number($('level').value),3);assert.equal($('stage-label').textContent,'DESAFIO 05 / 500');assert.ok($('level').innerHTML.includes('<option value="3">5. Fixture 4</option>'));
console.log('PASS display number, navigation index and stable identity are independent');

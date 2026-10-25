// Deterministic DOM integration checks, not a substitute for native browser layout QA.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {getRulesContext} from '../dist/rules-context.mjs';
import {lightLevels,cutLevels} from '../dist/levels.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {DESVIO_MAPS} from '../dist/desvio.mjs';
const catalogue={light:lightLevels,cut:cutLevels,...GEOMETRY_LEVELS,...SYMBOL_LEVELS,desvio:DESVIO_MAPS};
const entryOpen=(game,index,level=catalogue[game][index],mode='campaign')=>getRulesContext(game,level,{catalogue:catalogue[game],index,mode}).autoOpen;

// The originals and collection must have independent document/module lifetimes.
const suite=process.argv[2];
if(!suite){
 for(const part of ['originals','collection']){
  const result=spawnSync(process.execPath,[fileURLToPath(import.meta.url),part],{stdio:'inherit'});
  assert.equal(result.status,0,`${part} hints/rules UI checks`);
 }
 console.log('PASS six-game hints/rules UI integration suite');
 process.exit(0);
}
assert.ok(['originals','collection'].includes(suite),'Known child suite');
const {Element,host,root,store,$,timers,flush}=await import('./direct-ui-harness.mjs');
// Model the native reflected details.open property, including the initial HTML
// attribute. Tests still dispatch toggle explicitly rather than assuming layout.
Object.defineProperty(Element.prototype,'open',{
 configurable:true,
 get(){return Object.hasOwn(this.attrs,'open');},
 set(value){if(value)this.attrs.open='';else delete this.attrs.open;}
});
// Reflect runtime visibility classes, which the shared lightweight harness
// intentionally treats as no-ops. This only affects elements in this test.
Object.defineProperty(Element.prototype,'classList',{
 configurable:true,
 get(){return this._testClassList;},
 set(){
  const classes=()=>new Set((this.attrs.class??this.className??'').split(/\s+/).filter(Boolean));
  const write=values=>{this.attrs.class=[...values].join(' ');};
  this._testClassList={
   contains:name=>classes().has(name),
   add:(...names)=>{const values=classes();names.forEach(name=>values.add(name));write(values);},
   remove:(...names)=>{const values=classes();names.forEach(name=>values.delete(name));write(values);},
   toggle:(name,force)=>{const values=classes(),add=force??!values.has(name);if(add)values.add(name);else values.delete(name);write(values);return add;}
  };
 }
});
function rules(id,open,label){
 const panel=$(id);assert.ok(panel,`${label}: rules exist`);assert.equal(panel.tag,'details');
 assert.ok(panel.querySelector('summary'),`${label}: rules can be opened at any time`);
 assert.equal(panel.open,open,`${label}: rules are ${open?'open':'closed'}`);
 const sidebar=$(id.replace('-panel','-sidebar')),summary=panel.querySelector('summary');
 assert.ok(sidebar,`${label}: detached rules sidebar exists`);
 assert.equal(sidebar.tag,'aside',`${label}: contextual rules use an aside`);
 assert.equal(sidebar.hidden,!open,`${label}: sidebar visibility follows disclosure`);
 assert.equal(summary.attrs['aria-expanded'],String(open),`${label}: expanded state is accessible`);
 assert.equal(summary.attrs['aria-controls'],sidebar.id,`${label}: disclosure controls the sidebar`);
 assert.ok(!sidebar.closest('details'),`${label}: sidebar is not trapped inside disclosure`);
 assert.ok(sidebar.parentElement.matches(id.startsWith('original')?'.workspace':'.collection-workspace'),`${label}: sidebar occupies a workspace column`);
}
function toggle(id,open){const panel=$(id);panel.open=open;panel.dispatch('toggle');}
function belowBoard(container,boardId,buttonId,textId,label){
 const board=$(boardId),button=$(buttonId),text=$(textId);
 assert.ok(board&&button&&text,`${label}: board and hint controls exist`);
 assert.equal(container.querySelectorAll('#'+buttonId).length,1,`${label}: exactly one hint button`);
 assert.equal(container.querySelectorAll('#'+textId).length,1,`${label}: exactly one hint text`);
 assert.ok(container.nodes.indexOf(board)<container.nodes.indexOf(button),`${label}: hint button follows board`);
 assert.ok(container.nodes.indexOf(board)<container.nodes.indexOf(text),`${label}: hint text follows board`);
 assert.equal(button.hidden,false,`${label}: hint is available`);
 assert.ok(button.matches('.action-hint'));
 assert.equal(text.attrs.role,'status',`${label}: hint is announced`);
 assert.ok(!button.closest('details'),`${label}: closed rules do not hide the hint button`);
 assert.ok(!text.closest('details'),`${label}: closed rules do not hide hint text`);
}
function labelHasNoCounter(id){assert.doesNotMatch($(id).textContent||$(id).innerHTML,/\d\s*\/\s*3/,'No visible hint-tier counter');}

if(suite==='originals'){
 root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');document.body=root;
 globalThis.cancelAnimationFrame=id=>timers.delete(id);globalThis.matchMedia=()=>({matches:true});
 const endlessKey='intuicao.endless.original.v1';
 store.set(endlessKey,JSON.stringify({light:{seed:1234,options:{sources:2,mirrors:2,walls:true,portals:true,selective:true},count:0},cut:{seed:4321,options:{shape:'Losango',curves:true,holes:true},count:0}}));
 await import('../dist/app.mjs');
 const {buildOriginalHint}=await import('../dist/original-hints.mjs');
 const {generateOriginalEndless}=await import('../dist/endless-original.mjs');
 const saved=game=>JSON.parse(store.get(endlessKey))[game];
 const seenEndless=new Map();
 const endlessEntryOpen=game=>{const record=saved(game),generated=generateOriginalEndless(game,record.seed,record.options),context=getRulesContext(game,{...generated.level,...generated.initial},{mode:'endless'}),seen=seenEndless.get(game)??new Set(),open=context.mechanics.some(m=>!seen.has(m));context.mechanics.forEach(m=>seen.add(m));seenEndless.set(game,seen);return open;};
 const scene=()=>$('drawing').innerHTML;
 function enter(game,index=0){root.querySelector(`[data-game="${game}"]`).click();$('level-grid').querySelector(`[data-level="${index}"]`).click();}
 function edit(game,free=false){
  const handle=$('drawing').querySelector(game==='light'?'[data-item="0"]':free?'[data-item="cut"]':'[data-item="basic-cut"]');
  assert.ok(handle,`${game}: editable keyboard handle`);$('scene').dispatch('keydown',{target:handle,key:'ArrowRight'});
 }
 for(const game of ['light','cut']){
  enter(game);rules('original-rules-panel',entryOpen(game,0),game+' campaign entry');
  belowBoard(root,'scene','hint','hint-text',game);
  const untouched=scene(),answerRecord=store.get('intuicao.answers.v1');
  $('hint').click();assert.ok($('hint-text').textContent.length>15);const firstHint=$('hint-text').textContent;
  for(let tier=2;tier<=4;tier++){$('hint').click();labelHasNoCounter('hint');assert.ok($('hint-text').textContent.length>15);}
  const capped=$('hint-text').textContent;$('hint').click();assert.equal($('hint-text').textContent,capped,'Third stage saturates');
  assert.equal(scene(),untouched,game+': a hint must not edit the board');assert.equal(store.get('intuicao.answers.v1'),answerRecord,game+': hint is not an answer attempt or gabarito');
  toggle('original-rules-panel',true);$('toggle-controls').click();rules('original-rules-panel',true,game+' toolbar rerender');
  edit(game);assert.notEqual(scene(),untouched);rules('original-rules-panel',true,game+' editing preserves open choice');
  assert.equal($('hint-text').textContent,'',game+': stale hint cleared after physical edit');$('hint').click();assert.ok($('hint-text').textContent.length>15);labelHasNoCounter('hint');
  if(game==='cut'){$('cut-mode-advanced').click();rules('original-rules-panel',true,'cut mode switch');assert.equal($('hint-text').textContent,'');$('hint').click();assert.ok($('hint-text').textContent.length>15);$('cut-mode-basic').click();}
  toggle('original-rules-panel',false);edit(game);$('toggle-controls').click();rules('original-rules-panel',false,game+' closed choice survives editing');
  toggle('original-rules-panel',true);$('level-next').click();rules('original-rules-panel',entryOpen(game,1),game+' next level');assert.equal($('hint-text').textContent,'');
  toggle('original-rules-panel',true);$('level-prev').click();rules('original-rules-panel',entryOpen(game,0),game+' previous level');
  $('hint').click();assert.equal($('hint-text').textContent,firstHint,game+': reentering starts at fresh first stage');
  toggle('original-rules-panel',true);$('back-selection').click();$('level-grid').querySelector('[data-level="0"]').click();rules('original-rules-panel',entryOpen(game,0),game+' reentry');
  toggle('original-rules-panel',true);$('level').dispatch('change',{target:{value:'2'}});rules('original-rules-panel',entryOpen(game,2),game+' level selector');
  toggle('original-rules-panel',true);$('back-selection').click();$('selection-free').click();rules('original-rules-panel',endlessEntryOpen(game),game+' Endless entry');belowBoard(root,'scene','hint','hint-text',game+' Endless');
  const record=saved(game),generated=generateOriginalEndless(game,record.seed,record.options);
  const expected=buildOriginalHint(game,generated.level,record.state,{free:true,cutMode:'advanced',phase:'editing',selected:game==='light'?record.state.objects.findIndex(o=>o.type==='mirror'):0});
  for(const field of ['focusText','explanation','nextStep']){$('hint').click();assert.equal($('hint-text').textContent,expected[field],game+': generated-board hint '+field);labelHasNoCounter('hint');}
  const beforeEdit=structuredClone(saved(game).state);toggle('original-rules-panel',true);edit(game,true);rules('original-rules-panel',true,game+' Endless editing');assert.notDeepEqual(saved(game).state,beforeEdit);assert.equal($('hint-text').textContent,'');
  const edited=saved(game),freshExpected=buildOriginalHint(game,generated.level,edited.state,{free:true,cutMode:'advanced',phase:'editing',selected:game==='light'?edited.state.objects.findIndex(o=>o.type==='mirror'):0});
  $('hint').click();assert.equal($('hint-text').textContent,freshExpected.focusText,game+': hint recomputed from edited state');
  $('back-selection').click();$('selection-free').click();rules('original-rules-panel',endlessEntryOpen(game),game+' Endless resume');assert.deepEqual(saved(game).state,edited.state);
  toggle('original-rules-panel',true);$('original-endless-new').click();rules('original-rules-panel',endlessEntryOpen(game),game+' regenerated Endless');assert.notEqual(saved(game).seed,edited.seed);assert.equal($('hint-text').textContent,'');
  console.log('PASS',game,'below-board hints, three stages, nonmutation, physical-edit invalidation, campaign navigation and Endless new/resume rules');
 }
}else{
 const {initCollection}=await import('../dist/collection-ui.mjs');
 const {buildDirectHint}=await import('../dist/direct-hints.mjs');
 const {buildDesvioContextHint}=await import('../dist/desvio-hints.mjs');
 const {legalDesvioMoves}=await import('../dist/desvio.mjs');
 const app=initCollection({hideOriginal(){}});
 const data=()=>JSON.parse(store.get('intuicao.collection.v1'));
 const level=()=>JSON.parse($('c-editor-json').value);
 const state=key=>data().sessions[key].history.present;
 const seenEndless=new Map();
 const endlessEntryOpen=game=>{const context=getRulesContext(game,level(),{mode:'endless'}),seen=seenEndless.get(game)??new Set(),open=context.mechanics.some(m=>!seen.has(m));context.mechanics.forEach(m=>seen.add(m));seenEndless.set(game,seen);return open;};
 function enter(game,index=0,mode='local'){
  app.activate(game);
  if(game==='desvio'){$('c-duel-mode').dispatch('change',{target:{value:mode}});host.querySelector(`[data-map="${index}"]`).click();return `desvio:${level().id}:${mode}`;}
  host.querySelector(`[data-new-level="${index}"]`).click();return level().id;
 }
 function edit(game,key){
  const l=level(),s=state(key);let cell;
  if(game==='elo')cell=l.regions.findIndex(r=>l.fixed?.[r]===undefined);
  else if(game==='prumo'){host.querySelector('[data-value="0"]').click();cell=s.assignments.findIndex(v=>v<0);}
  else cell=l.clues.findIndex(v=>v<0);
  $('c-board').querySelector(`[data-cell="${cell}"]`).dispatch('keydown',{key:game==='pacto'?'1':'Enter'});
 }
 for(const game of ['elo','prumo','pacto']){
  let key=enter(game,4);rules('c-rules-panel',entryOpen(game,4),game+' entry');belowBoard(host,'c-board','c-hint','c-hint-text',game);
  assert.equal($('c-direct-hint'),undefined,game+': no duplicate hint above board');
  if(game==='elo')assert.equal($('c-status').classList.contains('sr-only'),true,'ELO automatic tool/count guidance is not visual');
  if(game==='prumo'){
   assert.equal($('c-details').hidden,true);assert.equal($('c-details').textContent,'','PRUMO default omits automatic balance commentary');
   host.querySelector('[data-value="0"]').click();assert.equal($('c-details').hidden,true);assert.equal($('c-details').textContent,'','Selecting a support does not bring back annotations');
   $('c-moments').click();assert.equal($('c-details').hidden,false);assert.match($('c-details').textContent,/Momentos exatos da peça A: horizontal -?\d+; vertical -?\d+/);assert.equal($('c-moments').attrs['aria-pressed'],'true');
   $('c-advanced-toggle').click();assert.equal($('c-details').hidden,false);assert.equal($('c-moments').attrs['aria-pressed'],'true','Moment visibility and accessibility state survive rerender');
   $('c-moments').click();assert.equal($('c-details').hidden,true);assert.equal($('c-details').textContent,'');
  }
  const initial=structuredClone(state(key)),expected=buildDirectHint(game,level(),initial);
  for(let tier=1;tier<=4;tier++){
   $('c-hint').click();assert.equal($('c-hint-text').textContent,tier===1?expected.focusText:expected.explanation);
   assert.equal(data().events.filter(e=>e.type==='hint').at(-1).tier,Math.min(tier,3));labelHasNoCounter('c-hint');
   assert.equal($('c-hint-apply').hidden,!(tier>=3&&expected.action));
  }
  assert.deepEqual(state(key),initial,game+': hints do not apply a deduction');
  toggle('c-rules-panel',true);const staleRules=$('c-rules-panel');$('c-advanced-toggle').click();rules('c-rules-panel',true,game+' full rerender');
  staleRules.open=false;staleRules.dispatch('toggle');$('c-advanced-toggle').click();rules('c-rules-panel',true,game+' detached toggle cannot overwrite current choice');
  edit(game,key);assert.notDeepEqual(state(key),initial);rules('c-rules-panel',true,game+' editing');assert.equal($('c-hint-text').textContent,'');assert.equal($('c-hint-apply').hidden,true);
  $('c-hint').click();assert.equal($('c-hint-text').textContent,buildDirectHint(game,level(),state(key)).focusText,game+': fresh deduction after edit');assert.equal(data().events.filter(e=>e.type==='hint').at(-1).tier,1);
  toggle('c-rules-panel',false);$('c-direct-undo').click();$('c-advanced-toggle').click();rules('c-rules-panel',false,game+' undo/rerender');assert.equal($('c-hint-text').textContent,'');
  $('c-direct-redo').click();rules('c-rules-panel',false,game+' redo');
  toggle('c-rules-panel',true);const oldLevelRules=$('c-rules-panel');$('c-level-next').click();rules('c-rules-panel',entryOpen(game,5),game+' next level');assert.equal($('c-hint-text').textContent,'');
  oldLevelRules.open=true;oldLevelRules.dispatch('toggle');$('c-advanced-toggle').click();rules('c-rules-panel',entryOpen(game,5),game+' stale previous-level toggle cannot reopen rules');
  toggle('c-rules-panel',true);$('c-level-prev').click();rules('c-rules-panel',entryOpen(game,4),game+' previous level');
  toggle('c-rules-panel',true);$('c-back').click();host.querySelector('[data-new-level="4"]').click();rules('c-rules-panel',entryOpen(game,4),game+' reentry');
  for(const entry of ['c-tutorial','c-daily','c-free']){
   toggle('c-rules-panel',true);$('c-back').click();$(entry).click();rules('c-rules-panel',entry==='c-free'?endlessEntryOpen(game):entryOpen(game,catalogue[game].findIndex(l=>l.id===level().id),level(),entry==='c-tutorial'?'tutorial':entry==='c-daily'?'daily':'campaign'),game+' '+entry);belowBoard(host,'c-board','c-hint','c-hint-text',game+' '+entry);$('c-hint').click();assert.ok($('c-hint-text').textContent.trim().length>0,game+' '+entry+': contextual hint is nonempty');labelHasNoCounter('c-hint');
  }
  toggle('c-rules-panel',true);const seed=data().endless[game].seed;$('c-endless-new').click();rules('c-rules-panel',endlessEntryOpen(game),game+' regenerated Endless');assert.notEqual(data().endless[game].seed,seed);assert.equal($('c-hint-text').textContent,'');
  console.log('PASS',game,'one below-board hint, exact three-stage engine, edit/undo/redo invalidation and rules in campaign/tutorial/daily/Endless');
 }
 for(const mode of ['local','competitive','bot','training']){
  const key=enter('desvio',0,mode);rules('c-rules-panel',entryOpen('desvio',0),'desvio '+mode);belowBoard(host,'c-board','c-hint','c-hint-text','desvio '+mode);assert.equal($('c-direct-hint'),undefined);
  const initial=structuredClone(state(key)),expected=buildDesvioContextHint(level(),initial,{mode});
  for(const field of ['focusText','explanation','nextStep']){$('c-hint').click();assert.equal($('c-hint-text').textContent,expected[field],mode+': context-only '+field);labelHasNoCounter('c-hint');assert.equal($('c-hint-apply').hidden,true);}
  assert.deepEqual(state(key),initial,mode+': hints never choose/commit a move');
  toggle('c-rules-panel',true);if(mode!=='competitive')$('c-advanced-toggle').click();rules('c-rules-panel',true,'desvio '+mode+' rerender');
  const move=legalDesvioMoves(level(),state(key))[0];$('c-board').querySelector(`[data-cell="${move}"]`).dispatch('keydown',{key:'Enter'});assert.deepEqual(state(key),initial);
  assert.equal($('c-hint-text').textContent,'',mode+': changing preview invalidates old hint');
  // Real pointer interaction with Hint must not cancel the chosen preview.
  $('c-hint').dispatch('pointerdown');$('c-hint').click();$('c-hint').click();
  assert.equal($('c-hint-text').textContent,buildDesvioContextHint(level(),state(key),{mode,preview:move}).explanation,mode+': selected-arrow context');assert.equal($('c-confirm').disabled,false);
  $('c-confirm').click();assert.equal(state(key).turn,1);rules('c-rules-panel',true,'desvio '+mode+' move');assert.equal($('c-hint-text').textContent,'');
  $('c-hint').click();assert.equal($('c-hint-text').textContent,buildDesvioContextHint(level(),state(key),{mode}).focusText,mode+': new player and destination');
  if(mode==='bot'){flush();assert.equal(state(key).turn,2);assert.equal($('c-hint-text').textContent,'','Bot response invalidates stale hint');$('c-hint').click();assert.equal($('c-hint-text').textContent,buildDesvioContextHint(level(),state(key),{mode}).focusText);}
  toggle('c-rules-panel',true);$('c-back').click();host.querySelector('[data-map="0"]').click();rules('c-rules-panel',entryOpen('desvio',0),'desvio '+mode+' same-map reentry');
  toggle('c-rules-panel',true);$('c-back').click();host.querySelector('[data-map="1"]').click();rules('c-rules-panel',entryOpen('desvio',1),'desvio '+mode+' next map');assert.equal($('c-hint-text').textContent,'');
  console.log('PASS DESVIO',mode,'context-only three stages, preview/confirm/bot invalidation, no move application and map reentry');
 }
 app.activate('desvio');$('c-free').click();rules('c-rules-panel',endlessEntryOpen('desvio'),'desvio Endless');belowBoard(host,'c-board','c-hint','c-hint-text','desvio Endless');$('c-hint').click();assert.ok($('c-hint-text').textContent.length>15);toggle('c-rules-panel',true);$('c-endless-new').click();rules('c-rules-panel',endlessEntryOpen('desvio'),'desvio regenerated Endless');
 const desvioSource=fs.readFileSync(new URL('../dist/desvio-hints.mjs',import.meta.url),'utf8');
 assert.doesNotMatch(desvioSource,/analyzeDesvio|chooseDesvioBotMove|explainDesvioMove|winningMoves|\.solution\b/,'Public DESVIO hints must not invoke optimal-play analysis');
 console.log('PASS DESVIO generated-board entry and context helper without optimal-play solver');
}

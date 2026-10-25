import assert from 'node:assert/strict';
import {host,store,$,flush,timers} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {GEOMETRY_ANSWERS} from '../dist/geometry-answers.mjs';
import {protectedPrumoCells} from '../dist/direct-actions.mjs';
const saved=()=>JSON.parse(store.get('intuicao.collection.v1'));
const app=initCollection({hideOriginal(){}});
let level,key;
function start(game,index=0,duelMode='local'){app.activate(game);if(game==='desvio'){$('c-duel-mode').dispatch('change',{target:{value:duelMode}});host.querySelector('[data-map="0"]').click();level=JSON.parse($('c-editor-json').value);key=`desvio:${level.id}:${duelMode}`;}else{host.querySelector(`[data-new-level="${index}"]`).click();level=(game==='pacto'?SYMBOL_LEVELS:GEOMETRY_LEVELS)[game][index];key=level.id;}return state();}
const state=()=>saved().sessions[key].history.present;
const history=()=>saved().sessions[key].history;
const cell=i=>$('c-board').querySelector(`[data-cell="${i}"]`);
const xy=i=>({clientX:(i%level.cols)*100+50,clientY:Math.floor(i/level.cols)*100+50});
function event(type,i,extra={}){return cell(i).dispatch(type,{...xy(i),...extra});}
function click(i,extra={}){event('pointerdown',i,extra);event('pointerup',i,extra);event('click',i,{detail:1,...extra});}
function keypress(i,key,extra={}){cell(i).focus();return event('keydown',i,{key,...extra});}
function drag(from,to,{button=0,cancel=false}={}){event('pointerdown',from,{button});event('pointermove',to,{button});event(cancel?'pointercancel':'pointerup',to,{button});}
const tests=[];const test=(name,run)=>tests.push([name,run]);
test('ELO move, fixed-region X, invalid drop rollback, one undo',()=>{
 start('elo');const free=level.regions.findIndex(r=>level.fixed?.[r]===undefined),region=level.regions[free],other=level.regions.findIndex((r,i)=>r===region&&i!==free);
 click(free);assert.equal(state().positions[region],free);if(other>=0){const before=history().past.length;drag(free,other);assert.equal(state().positions[region],other);assert.equal(history().past.length,before+1);$('c-direct-undo').click();assert.equal(state().positions[region],free);}
 const foreign=level.regions.findIndex(r=>r!==region),before=state();drag(free,foreign);assert.deepEqual(state(),before);
 const annotate=level.regions.findIndex((r,i)=>level.fixed?.[r]!==undefined&&level.fixed[r]!==i);assert.ok(annotate>=0);click(annotate,{shiftKey:true});assert.ok(state().discarded.includes(annotate));
 const fixed=Object.values(level.fixed)[0],unchanged=state();click(fixed,{button:2});assert.deepEqual(state(),unchanged);
});
test('PRUMO marker priority selects without editing and click toggles',()=>{
 start('prumo');const initial=state();const marker=$('c-board').querySelector('[data-support="0"]');marker.dispatch('pointerdown',xy(0));marker.dispatch('pointerup',xy(0));assert.deepEqual(state(),initial);assert.equal(saved().sessions[key].selectedSupport,0,'SVG support marker selects its piece');
 const free=state().assignments.findIndex(x=>x<0);click(free);assert.equal(state().assignments[free],0);click(free);assert.equal(state().assignments[free],-1);
});
test('PRUMO brush undo/cancel and Alt pick preserve logic',()=>{
 start('prumo',1);host.querySelector('[data-value="0"]').click();const free=state().assignments.findIndex(x=>x<0),end=level.rows*level.cols-1,before=state(),past=history().past.length;
 drag(free,end);assert.equal(history().past.length,past+1);for(const [i,support] of protectedPrumoCells(level))assert.equal(state().assignments[i],support);
 $('c-direct-undo').click();assert.deepEqual(state(),before);drag(free,end,{cancel:true});assert.deepEqual(state(),before);
 host.querySelector('[data-value="1"]').click();const protectedCell=[...protectedPrumoCells(level)].find(([,s])=>s===0)[0];click(protectedCell,{altKey:true});assert.equal(saved().sessions[key].selectedSupport,0);assert.deepEqual(state(),before);
});
test('PACTO exact cycle, canonical numeric keys, candidates and fixed palette',()=>{
 start('pacto');const free=level.clues.findIndex(v=>v<0),fixed=level.clues.findIndex(v=>v>=0);
 for(const value of [0,2,1,3,-1]){click(free);assert.equal(state().values[free],value);}
 click(free,{shiftKey:true});assert.equal(state().values[free],3);keypress(free,'Delete');
 keypress(free,'2',{shiftKey:true});assert.deepEqual(state().candidates[free],[2]);keypress(free,'3');assert.equal(state().values[free],1);assert.deepEqual(state().candidates[free],[]);$('c-direct-undo').click();assert.equal(state().values[free],-1);assert.deepEqual(state().candidates[free],[2]);
 keypress(free,' ');$('c-local-palette').querySelector('[data-local-candidate="3"]').click();assert.equal($('c-local-palette').hidden,false);assert.deepEqual(state().candidates[free],[2,3]);
 keypress(fixed,' ');const before=state();$('c-local-palette').querySelector('[data-local-value="2"]').click();assert.deepEqual(state(),before);keypress(fixed,'Delete');assert.deepEqual(state(),before);
});
test('DESVIO hover/select/cancel never commits, second click commits',()=>{
 start('desvio');event('pointermove',0);assert.equal(state().turn,0);click(0);assert.equal(state().turn,0);keypress(0,'Escape');assert.equal(state().turn,0);assert.equal($('c-confirm').disabled,true);
 click(0);click(0);assert.equal(state().turn,1);assert.equal(state().history.length,1);
});
test('DESVIO bot undo returns before human and bot response',()=>{
 start('desvio',0,'bot');click(0);click(0);assert.equal(state().turn,1);flush();assert.equal(state().turn,2);$('c-direct-undo').click();assert.equal(state().turn,0);assert.equal(state().player,0);
});
test('Saved state reloads; solved board wins only after explicit confirmation',()=>{
 start('elo',1);for(const cellIndex of GEOMETRY_ANSWERS[level.id])if(level.fixed?.[level.regions[cellIndex]]===undefined)click(cellIndex);
 assert.notEqual($('c-motion').dataset.outcome,'win');assert.equal(saved().completed.includes(level.id),false);const before=state();$('c-back').click();host.querySelector('[data-new-level="1"]').click();assert.deepEqual(state(),before);assert.notEqual($('c-motion').dataset.outcome,'win');$('c-confirm').click();assert.equal($('c-motion').dataset.outcome,'win');assert.ok(saved().completed.includes(level.id));
});
test('PRUMO support keyboard, second finger rollback and right context suppression',()=>{
 start('prumo',2);const initial=state();$('c-board').querySelector('[data-support="0"]').dispatch('keydown',{key:'Enter'});assert.equal(saved().sessions[key].selectedSupport,0);
 const free=state().assignments.findIndex(x=>x<0),end=level.rows*level.cols-1;
 event('pointerdown',free,{pointerType:'touch'});event('pointermove',end,{pointerType:'touch'});event('pointerdown',free,{pointerType:'touch',pointerId:2});event('pointerup',free,{pointerType:'touch',pointerId:2});event('pointerup',end,{pointerType:'touch'});assert.deepEqual(state(),initial);
 click(free);assert.equal(state().assignments[free],0);const historyCount=history().past.length;drag(free,end,{button:2});event('contextmenu',end,{button:2});assert.equal(history().past.length,historyCount+1);$('c-direct-undo').click();assert.equal(state().assignments[free],0);
});
test('PACTO focus, longpress and local palette pointer do not add accidental edits',()=>{
 start('pacto',1);const free=level.clues.findIndex(v=>v<0),before=state();keypress(free,'ArrowDown');assert.match(document.activeElement.attrs['aria-label'],new RegExp('L'+(Math.floor((free+level.cols)/level.cols)+1)+'C'+(free%level.cols+1)));assert.equal($('c-details').hidden,true);assert.equal($('c-details').textContent,'');
 event('pointerdown',free,{pointerType:'touch'});flush();event('pointerup',free,{pointerType:'touch'});event('click',free);assert.deepEqual(state(),before);assert.equal($('c-local-palette').hidden,false);
 const button=$('c-local-palette').querySelector('[data-local-candidate="2"]');button.dispatch('pointerdown');button.dispatch('pointerup');button.click();assert.deepEqual(state().candidates[free],[2]);assert.equal($('c-local-palette').hidden,false);
});
test('DESVIO accessible confirm survives outside pointer and local undo agreement',()=>{
 start('desvio',0,'training');click(0);assert.equal(state().turn,0);const confirm=$('c-confirm');confirm.dispatch('pointerdown');confirm.dispatch('pointerup');confirm.click();assert.equal(state().turn,1);
 start('desvio',0,'local');const before=state();globalThis.confirm=()=>false;$('c-direct-undo').click();assert.deepEqual(state(),before);globalThis.confirm=()=>true;$('c-direct-undo').click();assert.equal(state().turn,0);
});
test('ELO returning drag to starting point cancels displacement',()=>{
 start('elo',3);const from=level.regions.findIndex(r=>level.fixed?.[r]===undefined&&level.regions.filter(v=>v===r).length>1),region=level.regions[from],to=level.regions.findIndex((r,i)=>r===region&&i!==from);assert.ok(from>=0&&to>=0);click(from);const before=state();event('pointerdown',from);event('pointermove',to);event('pointermove',from);event('pointerup',from);assert.deepEqual(state(),before,'actual drop cell must win over visited-cell suppression');
});
test('DESVIO saved redo branch survives reopening the same map',()=>{
 start('desvio',0,'training');$('c-reset').click();$('restart-collection-confirm').click();click(0);click(0);const moved=state();$('c-direct-undo').click();assert.equal(state().turn,0);start('desvio',0,'training');assert.equal($('c-direct-redo').disabled,false);$('c-direct-redo').click();assert.deepEqual(state(),moved);
});
test('PACTO candidate palette restores mounted focus after marking',()=>{
 start('pacto',2);const free=level.clues.findIndex(v=>v<0);keypress(free,' ');const candidate=$('c-local-palette').querySelector('[data-local-candidate="2"]');candidate.focus();candidate.click();assert.equal($('c-local-palette').hidden,false);assert.ok(host.contains(document.activeElement),'palette candidate must not leave focus on a detached element');assert.equal(document.activeElement.dataset.localCandidate,'2');assert.deepEqual(state().candidates[free],[2]);
});
test('PRUMO marker keyboard activation restores mounted support focus',()=>{
 start('prumo',3);const marker=$('c-board').querySelector('[data-support="0"]');marker.focus();marker.dispatch('keydown',{key:'Enter'});assert.equal(saved().sessions[key].selectedSupport,0);assert.ok(host.contains(document.activeElement),'support selection must not leave focus on a detached marker');assert.equal(document.activeElement.dataset.support,'0');
});
test('Browser Ctrl/Cmd numeric shortcuts are neither intercepted nor edits',()=>{
 start('pacto',3);const free=level.clues.findIndex(v=>v<0),before=state();for(const modifier of ['ctrlKey','metaKey']){const e=keypress(free,'1',{[modifier]:true});assert.deepEqual(state(),before);assert.ok(!e.defaultPrevented,'browser numeric shortcut must retain default behavior');}
});
test('Competitive DESVIO reset/rematch are hidden and handlers cannot reset an active turn',()=>{
 start('desvio',0,'competitive');click(0);click(0);assert.equal(state().turn,1);const before=state();for(const id of ['c-rematch','c-reset','c-direct-reset']){const button=$(id);assert.ok(!button||button.hidden,`${id} must not offer unilateral reset`);button?.onclick?.();assert.deepEqual(state(),before,`${id} handler cannot change competitive position`);}
});
test('Visual revision removes only viewport buttons and preserves collapsible rules/actions',()=>{
 for(const game of ['elo','prumo','pacto','desvio']){
  start(game);for(const id of ['c-coordinates','c-zoom-out','c-zoom-in','c-fit','c-pan-left','c-pan-right','c-pan-up','c-pan-down'])assert.equal(host.querySelector('#'+id),null,game+' must not render '+id);
  assert.ok(host.querySelector('#c-rules-panel'));assert.ok(host.querySelector('#c-rules'));
  assert.ok(host.querySelector('#c-direct-reset').matches('.action-reset'));
  assert.ok(host.querySelector('#c-hint').matches('.action-hint'));
  $('c-rules-panel').open=false;$('c-rules-panel').ontoggle();$('c-advanced-toggle').click();assert.equal($('c-rules-panel').attrs.open,undefined,'closed rules survive rerender');
  $('c-rules-panel').open=true;$('c-rules-panel').ontoggle();$('c-advanced-toggle').click();assert.ok(Object.hasOwn($('c-rules-panel').attrs,'open'),'open rules survive rerender');
 }
});
test('PACTO live hatching ignores inferred contradictions and survives undo/redo/reload',()=>{
 start('pacto',0);$('c-reset').click();$('restart-collection-confirm').click();
 const beforeAttempts=store.get('intuicao.answers.v1');
 keypress(10,'3');assert.equal(state().values[10],1);assert.notEqual(state().values[10],level.solution[10]);
 assert.equal($('c-board').querySelectorAll('.cell-conflict').length,0);
 assert.equal($('c-live-errors').hidden,true);
 assert.equal(store.get('intuicao.answers.v1'),beforeAttempts,'Editing never counts an attempt');
 $('c-direct-undo').click();assert.equal(state().values[10],-1);
 $('c-direct-redo').click();assert.equal(state().values[10],1);
 assert.equal($('c-board').querySelectorAll('.cell-conflict').length,0);
 $('c-back').click();host.querySelector('[data-new-level="0"]').click();
 assert.equal(state().values[10],1);assert.equal($('c-board').querySelectorAll('.cell-conflict').length,0);
 assert.notEqual($('c-motion').dataset.outcome,'win');
 $('c-confirm').click();assert.equal($('c-motion').dataset.outcome,'loss');
 assert.equal($('c-board').querySelectorAll('.cell-conflict').length,0,'Confirmation does not turn deductions into live hatching');
});
test('PACTO explicit trio still hatches and clearing it removes the warning',()=>{
 start('pacto',0);$('c-reset').click();$('restart-collection-confirm').click();
 const triple=Array.from({length:64},(_,i)=>[i,i+1,i+2]).find(cells=>cells[0]%8<6&&cells.every(i=>level.clues[i]<0));
 assert.ok(triple);for(const i of triple)keypress(i,'1');
 assert.equal($('c-board').querySelectorAll('.cell-conflict').length,0);flush();
 for(const i of triple){assert.ok(cell(i).matches('.cell-conflict'));assert.equal(cell(i).attrs['aria-invalid'],'true');}
 assert.equal($('c-live-errors').hidden,false);
 $('c-reset').click();$('restart-collection-confirm').click();assert.equal($('c-board').querySelectorAll('.cell-conflict').length,0);
});
test('PACTO final confirmation uses rules, not the stored answer key',()=>{
 start('pacto',0);$('c-reset').click();$('restart-collection-confirm').click();
 const solution=level.solution;
 try{
  level.solution=solution.map(v=>(v+1)%4);
  const keys=['1','3','2','4'];
  for(let i=0;i<64;i++)if(level.clues[i]<0)keypress(i,keys[solution[i]]);
  assert.deepEqual(state().values,solution);
  assert.equal($('c-board').querySelectorAll('.cell-conflict').length,0);
  assert.notEqual($('c-motion').dataset.outcome,'win','Completion alone must not trigger victory');
  $('c-confirm').click();assert.equal($('c-motion').dataset.outcome,'win');
 }finally{level.solution=solution;}
});
let failed=0;for(const [name,run] of tests){try{run();console.log('PASS',name);}catch(error){failed++;console.error('FAIL',name,error.stack);}}
console.log(`${tests.length-failed}/${tests.length} integrated UI suites passed (deterministic event simulation, not browser/device QA).`);if(failed)process.exitCode=1;

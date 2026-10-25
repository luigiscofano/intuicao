// Deterministic behavior/structure checks. Native geometry is verified separately.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {lightLevels,cutLevels} from '../dist/levels.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {DESVIO_MAPS,legalDesvioMoves} from '../dist/desvio.mjs';
import {getRulesContext} from '../dist/rules-context.mjs';

const suite=process.argv[2];
if(!suite){
 for(const part of ['originals','collection']){
  const result=spawnSync(process.execPath,[fileURLToPath(import.meta.url),part],{stdio:'inherit'});
  assert.equal(result.status,0,part+' sidebar interaction checks');
 }
 const css=fs.readFileSync(new URL('../dist/rules-sidebar.css',import.meta.url),'utf8');
 assert.match(css,/grid-template-columns:minmax\(0,1fr\) minmax\(260px,300px\)/,'Open rules reserve their own readable column');
 assert.match(css,/\.rules-sidebar\[hidden\]\{display:none\}/,'Hidden rules release their column');
 assert.match(css,/@media\(max-width:1050px\)/,'Narrow screens stack instead of shrinking boards');
 assert.match(css,/grid-column:1;grid-row:2;position:static/,'Stacked rules sit after the board');
 assert.doesNotMatch(css,/position\s*:\s*(absolute|fixed)|pointer-events\s*:\s*none/,'Rules do not overlay or block board controls');
 console.log('PASS six-game sidebar structure, entry policy, session choices, responsive non-overlay CSS and preserved actions');
 process.exit(0);
}
assert.ok(['originals','collection'].includes(suite));
const {Element,host,root,store,$,timers,flush}=await import('./direct-ui-harness.mjs');
Object.defineProperty(Element.prototype,'open',{configurable:true,get(){return Object.hasOwn(this.attrs,'open');},set(v){if(v)this.attrs.open='';else delete this.attrs.open;}});
Object.defineProperty(Element.prototype,'classList',{
 configurable:true,get(){return this._rulesClasses;},set(){
  const values=()=>new Set((this.attrs.class??this.className??'').split(/\s+/).filter(Boolean));
  const write=set=>{this.attrs.class=[...set].join(' ');};
  this._rulesClasses={contains:name=>values().has(name),add:(...names)=>{const set=values();names.forEach(n=>set.add(n));write(set);},remove:(...names)=>{const set=values();names.forEach(n=>set.delete(n));write(set);},toggle:(name,force)=>{const set=values(),add=force??!set.has(name);add?set.add(name):set.delete(name);write(set);return add;}};
 }
});
const prefix=suite==='originals'?'original':'c';
const panel=()=>$(`${prefix}-rules-panel`),sidebar=()=>$(`${prefix}-rules-sidebar`);
const toggle=open=>{panel().open=open;panel().dispatch('toggle');};
function visible(open,label){
 assert.equal(panel().open,open,label+': disclosure state');
 assert.equal(sidebar().hidden,!open,label+': actual sidebar state');
 const summary=panel().querySelector('summary');
 assert.equal(summary.attrs['aria-expanded'],String(open),label+': expanded state');
 assert.equal(summary.attrs['aria-controls'],sidebar().id,label+': accessible controlled target');
 assert.equal(sidebar().parentElement.classList.contains('rules-open'),open,label+': width reservation');
}
function structure(container,boardId,hintId,label){
 const board=$(boardId),hint=$(hintId);
 assert.equal(container.querySelectorAll('#'+sidebar().id).length,1,label+': one sidebar');
 assert.equal(sidebar().tag,'aside');
 assert.ok(!sidebar().closest('details'),label+': content outside native details');
 assert.ok(!sidebar().contains(board),label+': board remains independent');
 assert.ok(!sidebar().contains(hint),label+': hints remain with the game');
 assert.ok(container.nodes.indexOf(panel())<container.nodes.indexOf(board),label+': toggle stays above board');
 assert.ok(container.nodes.indexOf(board)<container.nodes.indexOf(hint),label+': hint stays below board');
 assert.ok(container.nodes.indexOf(hint)<container.nodes.indexOf(sidebar()),label+': stacked sidebar follows play and hints');
 assert.equal(panel().querySelector('.rules-body'),null,label+': no duplicate rules left above board');
 assert.ok(sidebar().querySelector('.rules-body'),label+': full rules remain accessible');
 assert.ok($(`${prefix}-rules-context-title`)&&$(`${prefix}-rules-context-text`),label+': contextual explanation exists');
}

if(suite==='originals'){
 root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');document.body=root;
 globalThis.cancelAnimationFrame=id=>timers.delete(id);globalThis.matchMedia=()=>({matches:true});
 store.set('intuicao.endless.original.v1',JSON.stringify({light:{seed:1234,options:{sources:1,mirrors:1,walls:false,portals:false,selective:false},count:0},cut:{seed:4321,options:{shape:'Retângulo',curves:false,holes:false},count:0}}));
 await import('../dist/app.mjs');
 const catalogue={light:lightLevels,cut:cutLevels};
 const enter=(game,index=0)=>{root.querySelector(`[data-game="${game}"]`).click();$('level-grid').querySelector(`[data-level="${index}"]`).click();};
 const edit=game=>{$('scene').dispatch('keydown',{target:$('drawing').querySelector(game==='light'?'[data-item="0"]':'[data-item="basic-cut"]'),key:'ArrowRight'});};
 for(const game of ['light','cut']){
  // Explicit independent examples include portal entry, not only first-level rules.
  const examples=game==='light'?[0,4,40,60,80,100]:[0,5,10,20,30,60,90];
  for(const index of examples){
   enter(game,index);visible(true,game+' introduction '+(index+1));structure(root,'scene','hint',game);
   assert.ok($('original-rules-context-title').textContent.length>0);
   assert.ok($('original-rules-context-text').textContent.length>15);
   const board=$('drawing').innerHTML,saved=[...store];toggle(false);toggle(true);
   assert.equal($('drawing').innerHTML,board,'Rules do not redraw or mutate the puzzle');assert.deepEqual([...store],saved,'Rules do not change saved progress');
   toggle(false);edit(game);$('toggle-controls').click();$('hint').click();$('confirm').click();visible(false,game+' hide survives edit/options/hint/confirm');
   $('reset').click();$('restart-original-cancel').click();visible(false,game+' canceled restart');
   $('reset').click();$('restart-original-confirm').click();visible(false,game+' confirmed restart');
   $('back-selection').click();$('level-grid').querySelector(`[data-level="${index}"]`).click();visible(true,game+' introductory reentry');
   const ordinary=index+1;
   if(!getRulesContext(game,catalogue[game][ordinary],{catalogue:catalogue[game],index:ordinary}).autoOpen){$('level-next').click();visible(false,game+' ordinary successor');$('level-prev').click();visible(true,game+' back to introduction');}
  }
  enter(game,1);visible(false,game+' ordinary direct entry');toggle(true);$('reset').click();$('restart-original-confirm').click();visible(true,game+' manual open survives restart');
  $('back-selection').click();$('selection-free').click();visible(true,game+' first Endless rules');toggle(false);$('original-endless-new').click();visible(false,game+' equivalent Endless seed');
  $('back-selection').click();$('selection-free').click();visible(false,game+' equivalent Endless resume');
  if(game==='light'){
   $('endless-sources').value='1';$('endless-mirrors').value='1';$('endless-walls').checked=false;$('endless-portals').checked=true;$('endless-selective').checked=false;$('original-endless-form').dispatch('submit');visible(true,'Endless portal newly introduced');
   assert.match($('original-rules-context-text').textContent,/porta/i);
   toggle(false);$('original-endless-new').click();visible(false,'Another portal seed does not repeat rules');
  }else{
   $('endless-shape').value='Retângulo';$('endless-curves').checked=false;$('endless-holes').checked=true;$('original-endless-form').dispatch('submit');visible(true,'Endless empty spaces newly introduced');
   toggle(false);$('original-endless-new').click();visible(false,'Another holed seed does not repeat rules');
  }
  console.log('PASS',game,'introductory and ordinary navigation, reset choices, nonmutation, initial and novel Endless mechanics');
 }
}else{
 const {initCollection}=await import('../dist/collection-ui.mjs');
 const app=initCollection({hideOriginal(){}}),catalogue={...GEOMETRY_LEVELS,...SYMBOL_LEVELS,desvio:DESVIO_MAPS};
 const data=()=>JSON.parse(store.get('intuicao.collection.v1'));
 const level=()=>JSON.parse($('c-editor-json').value);
 let key;
 const state=()=>data().sessions[key].history.present;
 function enter(game,index=0,mode='local'){
  app.activate(game);
  if(game==='desvio'){$('c-duel-mode').dispatch('change',{target:{value:mode}});host.querySelector(`[data-map="${index}"]`).click();key=`desvio:${level().id}:${mode}`;}
  else{host.querySelector(`[data-new-level="${index}"]`).click();key=level().id;}
 }
 function edit(game){
  let cell;
  if(game==='elo')cell=level().regions.findIndex(r=>level().fixed?.[r]===undefined);
  else if(game==='prumo'){host.querySelector('[data-value="0"]').click();cell=state().assignments.findIndex(v=>v<0);}
  else if(game==='pacto')cell=level().clues.findIndex(v=>v<0);
  else cell=legalDesvioMoves(level(),state())[0];
  $('c-board').querySelector(`[data-cell="${cell}"]`).dispatch('keydown',{key:game==='pacto'?'1':'Enter'});
 }
 for(const game of ['elo','prumo','pacto','desvio']){
  const examples=game==='elo'?[0,20,21,40,60,80,100,120,140,160,180]:[0];
  for(const index of examples){
   enter(game,index);visible(true,game+' introduction '+(index+1));structure(host,'c-board','c-hint',game);
   const saved=[...store],board=$('c-board').innerHTML;toggle(false);toggle(true);
   assert.deepEqual([...store],saved,'Rules do not affect progress or events');assert.equal($('c-board').innerHTML,board,'Rules do not replace the board');
   toggle(false);const stale=panel();$('c-advanced-toggle').click();stale.open=true;stale.dispatch('toggle');visible(false,game+' detached toggles ignored');
   edit(game);$('c-hint').click();$('c-confirm').click();$('c-check')?.click();visible(false,game+' hide survives physical edit/hint/confirm/check');
   $('c-direct-undo').click();$('c-direct-redo').click();visible(false,game+' hide survives undo/redo');
   $('c-reset').click();$('restart-collection-cancel').click();visible(false,game+' canceled restart');
   $('c-reset').click();$('restart-collection-confirm').click();visible(false,game+' confirmed restart');
   $('c-back').click();host.querySelector(`[${game==='desvio'?'data-map':'data-new-level'}="${index}"]`).click();visible(true,game+' introductory reentry');
   if(game!=='desvio'){$('c-level-next').click();visible(game==='elo'&&index===20,game+' successor entry');$('c-level-prev').click();visible(true,game+' preceding introduction');}
  }
  enter(game,1);visible(false,game+' ordinary direct entry');toggle(true);$('c-reset').click();$('restart-collection-confirm').click();visible(true,game+' manual open survives restart');
  if(game!=='desvio'){
   $('c-back').click();$('c-tutorial').click();visible(true,game+' explicit tutorial');toggle(false);$('c-guided').click();$('c-advanced-toggle').click();visible(false,game+' tutorial progress does not reopen rules');
   $('c-back').click();$('c-tutorial').click();visible(true,game+' tutorial reentry');
   enter(game,1);$('c-editor-play').click();visible(true,game+' first custom mechanics');toggle(false);$('c-editor-play').click();visible(false,game+' equivalent custom edit');
  }
  app.activate(game);$('c-free').click();visible(true,game+' first Endless rules');toggle(false);$('c-endless-new').click();visible(false,game+' same-rule Endless regeneration');
  $('c-back').click();$('c-free').click();visible(false,game+' same-rule Endless resume');
  console.log('PASS',game,'introduction/reentry, ordinary entry, choice preservation, stale callbacks, progress, custom/tutorial and Endless');
 }
 for(const mode of ['competitive','bot','training']){
  enter('desvio',0,mode);visible(true,'DESVIO '+mode+' intro');toggle(false);edit('desvio');$('c-confirm').click();flush();visible(false,'DESVIO '+mode+' move/bot preserves hidden rules');
 }
}

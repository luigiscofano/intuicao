// Deterministic tests of the actual game modules and CSS contracts.
// Native summary keyboard activation and pixel geometry need browser QA.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {legalDesvioMoves} from '../dist/desvio.mjs';

const suite=process.argv[2];
if(!suite){
 for(const part of ['originals','collection']){
  const result=spawnSync(process.execPath,[fileURLToPath(import.meta.url),part],{stdio:'inherit'});
  assert.equal(result.status,0,part+' rules toolbar checks');
 }
 const css=fs.readFileSync(new URL('../dist/rules-sidebar.css',import.meta.url),'utf8');
 const toolbarStart=css.indexOf('/* Compact native disclosure');
 assert.ok(toolbarStart>=0,'Compact toolbar styles exist');
 const toolbar=css.slice(toolbarStart);
 const baseCSS=fs.readFileSync(new URL('../dist/style.css',import.meta.url),'utf8');
 assert.match(baseCSS,/\.stage-top>\.stage-tools>button\{min-width:44px;min-height:44px\}/,'Shared toolbar buttons retain 44px touch targets despite older stage-top defaults');
 assert.match(baseCSS,/\.stage-top>\.stage-tools>#toggle-controls\{min-height:44px!important\}/,'Original advanced button overrides the legacy 36px important declaration');
 assert.match(toolbar,/\.rules-heading-tools,\.stage-tools\{[^}]*display:flex/,'Both game families use inline toolbar layout');
 assert.match(toolbar,/\.rules-heading-tools>\.rules-card,\.stage-tools>\.rules-card\{[^}]*margin:0/,'Disclosure has no old full-width card margin');
 assert.match(toolbar,/\.rules-heading-tools>\.rules-card>summary,\.stage-tools>\.rules-card>summary\{[^}]*min-height:44px/,'Compact disclosure retains an accessible touch target');
 assert.match(toolbar,/@media\(max-width:600px\)/,'Narrow-screen toolbar styling is explicit');
 assert.match(toolbar,/max-width:100%/,'Rules disclosure is constrained to its compact container');
 assert.doesNotMatch(toolbar,/position\s*:\s*(absolute|fixed)|(?:^|[;{])\s*order\s*:|flex-direction\s*:\s*(row|column)-reverse/,'Toolbar never overlays the board or reverses DOM order');
 assert.match(css,/\.rules-sidebar\[hidden\]\{display:none\}/,'Closing rules releases the reserved content');
 assert.match(css,/grid-template-columns:minmax\(0,1fr\) minmax\(260px,300px\)/,'Open rules retain their independent desktop column');
 assert.match(css,/@media\(max-width:1050px\)/,'Rules sidebar still stacks on smaller screens');
 assert.match(css,/grid-column:1;grid-row:2;position:static/,'Stacked rules stay in normal document flow');
 assert.doesNotMatch(css,/position\s*:\s*(absolute|fixed)|pointer-events\s*:\s*none/,'Rules and toolbar do not overlay or disable board controls');
 console.log('PASS all six games: adjacent toolbar controls, ARIA, disclosure focus, preserved rules policy/actions and compact non-overlay CSS contracts');
 process.exit(0);
}
assert.ok(['originals','collection'].includes(suite),'Known test family');
const {Element,host,root,store,$,timers,flush}=await import('./direct-ui-harness.mjs');
Object.defineProperty(Element.prototype,'open',{
 configurable:true,
 get(){return Object.hasOwn(this.attrs,'open');},
 set(value){if(value)this.attrs.open='';else delete this.attrs.open;}
});
Object.defineProperty(Element.prototype,'classList',{
 configurable:true,
 get(){return this._toolbarClasses;},
 set(){
  const values=()=>new Set((this.attrs.class??this.className??'').split(/\s+/).filter(Boolean));
  const write=set=>{this.attrs.class=[...set].join(' ');};
  this._toolbarClasses={
   contains:name=>values().has(name),
   add:(...names)=>{const set=values();names.forEach(name=>set.add(name));write(set);},
   remove:(...names)=>{const set=values();names.forEach(name=>set.delete(name));write(set);},
   toggle:(name,force)=>{const set=values(),add=force??!set.has(name);add?set.add(name):set.delete(name);write(set);return add;}
  };
 }
});
const original=suite==='originals',prefix=original?'original':'c';
const container=original?root:host;
const panel=()=>$(`${prefix}-rules-panel`);
const summary=()=>panel().querySelector('summary');
const sidebar=()=>$(`${prefix}-rules-sidebar`);
const advanced=()=>$(original?'toggle-controls':'c-advanced-toggle');
const board=()=>$(original?'drawing':'c-board');
const toggle=open=>{panel().open=open;panel().dispatch('toggle');};
const children=element=>element.nodes.filter(node=>node.parentElement===element);

function placement(label){
 const toolbar=panel().parentElement,siblings=children(toolbar);
 assert.ok(toolbar.matches('.stage-tools'),label+': rules moved to the correct toolbar');
 assert.equal(advanced().parentElement,toolbar,label+': rules and advanced options share a toolbar');
 assert.equal(siblings[siblings.indexOf(panel())+1],advanced(),label+': rules immediately precede advanced options');
 assert.deepEqual(siblings.map(node=>node.id),original?['undo','redo','reset','original-rules-panel','toggle-controls']:['c-undo','c-redo','c-reset','c-rules-panel','c-advanced-toggle'],label+': final requested order, with no duplicate controls');
 assert.equal(toolbar.parentElement,container.querySelector('.stage-top'),label+': shared stage placement');
 if(!original){assert.ok($('c-surface').contains(panel()),label+': compact toolbar is in the board surface');for(const id of ['c-direct-reset','c-direct-undo','c-direct-redo'])assert.equal($(id),undefined,label+': old duplicate removed');}

 assert.equal(container.querySelectorAll('#'+panel().id).length,1,label+': no duplicate disclosure');
 assert.equal(panel().tag,'details',label+': native disclosure semantics preserved');
 assert.equal(children(panel()).length,1,label+': only the summary is in the compact control');
 assert.equal(children(panel())[0],summary(),label+': summary remains first child');
 assert.ok(summary().querySelector('.rules-show')&&summary().querySelector('.rules-hide'),label+': both open/closed labels remain');
 assert.equal(summary().attrs['aria-controls'],sidebar().id,label+': rules has correct accessible target');
 assert.equal(sidebar().tag,'aside',label+': full rules remain in an aside');
 assert.ok(!sidebar().closest('details'),label+': full rules never expand inside compact toolbar');
 assert.ok(sidebar().querySelector('.rules-body'),label+': full rules content preserved');
 assert.ok(!toolbar.contains(sidebar()),label+': rules content stays outside toolbar');
 assert.ok(!sidebar().contains(board()),label+': board stays outside rules');
 assert.ok(!sidebar().contains($(original?'hint':'c-hint')),label+': hint stays with game');
 assert.ok(container.nodes.indexOf(panel())<container.nodes.indexOf(board()),label+': toolbar stays before board');
 assert.ok(container.nodes.indexOf($(original?'hint':'c-hint'))<container.nodes.indexOf(sidebar()),label+': stacked rules follow play and hints');
}
function visible(open,label){
 assert.equal(panel().open,open,label+': native disclosure state');
 assert.equal(sidebar().hidden,!open,label+': actual sidebar visibility');
 assert.equal(summary().attrs['aria-expanded'],String(open),label+': accessible expanded state');
 assert.equal(sidebar().parentElement.classList.contains('rules-open'),open,label+': independent rules column state');
 placement(label);
}
function independentDisclosure(label){
 const beforeBoard=board().innerHTML,beforeStore=[...store];
 const focused=summary();focused.focus();
 for(const open of [false,true,false]){
  toggle(open);visible(open,label+' '+(open?'show':'hide'));
  assert.equal(document.activeElement,focused,label+': toggling does not steal summary focus');
  assert.equal(board().innerHTML,beforeBoard,label+': toggling does not rebuild or change board');
  assert.deepEqual([...store],beforeStore,label+': toggling never changes saved progress');
 }
}

if(original){
 root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
 document.body=root;
 globalThis.cancelAnimationFrame=id=>timers.delete(id);
 globalThis.matchMedia=()=>({matches:true});
 store.set('intuicao.endless.original.v1',JSON.stringify({light:{seed:1234,options:{sources:1,mirrors:1,walls:false,portals:false,selective:false},count:0},cut:{seed:4321,options:{shape:'Retângulo',curves:false,holes:false},count:0}}));
 await import('../dist/app.mjs');
 const enter=(game,index=0)=>{root.querySelector(`[data-game="${game}"]`).click();$('level-grid').querySelector(`[data-level="${index}"]`).click();};
 const edit=game=>$('scene').dispatch('keydown',{target:$('drawing').querySelector(game==='light'?'[data-item="0"]':'[data-item="basic-cut"]'),key:'ArrowRight'});
 for(const game of ['light','cut']){
  enter(game);visible(true,game+' introductory entry');
  independentDisclosure(game);
  advanced().focus();const focused=advanced(),beforeExpanded=focused.attrs['aria-expanded'];focused.click();
  visible(false,game+' advanced options preserve closed rules');
  assert.equal(document.activeElement,focused,game+': advanced toggle keeps focus');
  assert.notEqual(advanced().attrs['aria-expanded'],beforeExpanded,game+': advanced toggle still works');
  assert.equal($('advanced-controls').hidden,advanced().attrs['aria-expanded']==='false',game+': advanced ARIA agrees with controlled content');
  assert.equal(advanced().attrs['aria-controls'],'advanced-controls',game+': original advanced accessible target preserved');
  edit(game);$('hint').click();$('confirm').click();visible(false,game+' edit hint and confirm preserve close choice');
  $('reset').click();$('restart-original-cancel').click();visible(false,game+' cancelled restart');
  $('reset').click();$('restart-original-confirm').click();visible(false,game+' confirmed restart');
  $('back-selection').click();$('level-grid').querySelector('[data-level="0"]').click();visible(true,game+' introduction reentry');
  $('level-next').click();visible(false,game+' ordinary successor');
  toggle(true);$('reset').click();$('restart-original-confirm').click();visible(true,game+' explicit open survives restart');
  $('back-selection').click();$('selection-free').click();visible(true,game+' first Endless entry');
  toggle(false);$('original-endless-new').click();visible(false,game+' same-mechanics Endless regeneration');
  $('back-selection').click();$('selection-free').click();visible(false,game+' Endless resume');
  console.log('PASS',game,'adjacent rules toolbar, semantics, focus, actions, restart/reentry and Endless policy');
 }
}else{
 const {initCollection}=await import('../dist/collection-ui.mjs');
 const app=initCollection({hideOriginal(){}});
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
  if(game==='elo')cell=level().regions.findIndex(region=>level().fixed?.[region]===undefined);
  else if(game==='prumo'){host.querySelector('[data-value="0"]').click();cell=state().assignments.findIndex(value=>value<0);}
  else if(game==='pacto')cell=level().clues.findIndex(value=>value<0);
  else cell=legalDesvioMoves(level(),state())[0];
  $('c-board').querySelector(`[data-cell="${cell}"]`).dispatch('keydown',{key:game==='pacto'?'1':'Enter'});
 }
 for(const game of ['elo','prumo','pacto','desvio']){
  enter(game);visible(true,game+' introductory entry');
  independentDisclosure(game);
  // The harness has no native pointer-to-focus default. Focus is explicit,
  // then the real render handler is checked for restoration to its replacement.
  const stalePanel=panel(),staleSummary=summary();staleSummary.focus();advanced().click();
  visible(false,game+' advanced rerender preserves closed rules');
  assert.notEqual(summary(),staleSummary,game+': actual collection rerender replaced summary');
  assert.equal(document.activeElement,summary(),game+': rules summary focus restored after rerender');
  stalePanel.open=true;stalePanel.dispatch('toggle');visible(false,game+' detached callback cannot reopen rules');
  advanced().focus();const beforeAdvanced=advanced(),beforeExpanded=beforeAdvanced.attrs['aria-expanded'];beforeAdvanced.click();
  assert.notEqual(advanced(),beforeAdvanced,game+': actual advanced rerender occurred');
  assert.equal(document.activeElement,advanced(),game+': advanced focus restored after rerender');
  assert.notEqual(advanced().attrs['aria-expanded'],beforeExpanded,game+': advanced options still toggle');
  // Unlike sidebar.hidden, this property is emitted as markup by render().
  // The minimal harness keeps parsed boolean attributes in attrs.
  assert.equal(Object.hasOwn($('c-advanced').attrs,'hidden'),advanced().attrs['aria-expanded']==='false',game+': advanced ARIA agrees with visibility');
  visible(false,game+' advanced state independent of rules');
  edit(game);$('c-hint').click();$('c-confirm').click();$('c-check')?.click();visible(false,game+' edit hint confirm and check preserve close choice');
  $('c-undo').click();$('c-redo').click();visible(false,game+' undo and redo preserve close choice');
  $('c-reset').click();$('restart-collection-cancel').click();visible(false,game+' cancelled restart');
  $('c-reset').click();$('restart-collection-confirm').click();visible(false,game+' confirmed restart');
  $('c-back').click();host.querySelector(`[${game==='desvio'?'data-map':'data-new-level'}="0"]`).click();visible(true,game+' introduction reentry');
  enter(game,1);visible(false,game+' ordinary entry');
  toggle(true);$('c-reset').click();$('restart-collection-confirm').click();visible(true,game+' explicit open survives restart');
  app.activate(game);$('c-free').click();visible(true,game+' first Endless entry');
  toggle(false);$('c-endless-new').click();visible(false,game+' same-mechanics Endless regeneration');
  $('c-back').click();$('c-free').click();visible(false,game+' Endless resume');
  console.log('PASS',game,'adjacent rules toolbar, semantics, focus restoration, stale callbacks, actions, restart/reentry and Endless policy');
 }
 for(const mode of ['competitive','bot','training']){
  enter('desvio',0,mode);visible(true,'DESVIO '+mode+' introductory entry');
  assert.equal(advanced().hidden,mode==='competitive','DESVIO '+mode+': existing advanced-options availability unchanged');
  assert.equal(panel().hidden,false,'DESVIO '+mode+': rules remain available even when advanced options are hidden');
  toggle(false);edit('desvio');$('c-confirm').click();flush();visible(false,'DESVIO '+mode+' move preserves rules choice and toolbar order');
 }
 console.log('PASS DESVIO competitive/bot/training rules placement and pre-existing advanced-options restriction');
}

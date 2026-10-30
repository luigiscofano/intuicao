import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {host,store,$,Element,timers} from './direct-ui-harness.mjs';
import {CAMPAIGN as sintonia} from '../dist/sintonia/campaign.mjs';
import {CAMPAIGN as repasse} from '../dist/repasse/campaign.mjs';
import {CAMPAIGN as orbita} from '../dist/orbita/campaign.mjs';
import {initSintonia} from '../dist/sintonia/ui.mjs';
import {initRepasse} from '../dist/repasse/ui.mjs';
import {initOrbita} from '../dist/orbita/ui.mjs';
// Deterministic DOM simulation, not browser/layout QA. Suppress animation/prefetch.
globalThis.addEventListener=()=>{};
globalThis.matchMedia=()=>({matches:true});
globalThis.Worker=class{terminate(){}postMessage(){}};
Element.prototype.replaceChildren=function(){this.innerHTML='';};
Element.prototype.scrollTo=function(){};
Element.prototype.append=function(...children){for(const child of children)this.appendChild(child);};
Object.defineProperty(Element.prototype,'viewBox',{get(){return {baseVal:{width:Number((this.attrs.viewBox??'0 0 800 600').split(' ')[2])}};}});
const settle=async()=>{for(let i=0;i<5;i++)await Promise.resolve();};
const fixtures=[['sintonia','s',sintonia[0],()=>initSintonia({hideOtherGames(){}})],['repasse','r',repasse[0],()=>initRepasse()],['orbita','o',orbita[0],()=>initOrbita()]];
for(const [game,p,level,init] of fixtures){
 for(const mode of ['campaign','endless']){
  timers.clear();host.innerHTML='';host.id=game;const key=`intuicao.${game}.v1`;
  const data={version:1,prefs:{autoAdvance:false},campaign:{lastId:level.id,completed:{},sessions:{}},lastView:{active:true,screen:'play',mode}};
  if(mode==='endless')data.endless={version:3,baseSeed:123,number:7,solved:3,startDifficulty:0,current:{level,seed:456,generatorVersion:'orbita-generator-3'}};
  store.set(key,JSON.stringify(data));let app=init();assert.equal(app.restoreOnLoad(),true);await settle();
  const read=()=>JSON.parse(store.get(key));
  const session=()=>mode==='campaign'?read().campaign.sessions[level.id]:read().endless.current.session;
  const count=()=>mode==='campaign'?Object.keys(read().campaign.completed).length:read().endless.solved;
  const initialCount=mode==='campaign'?0:3;
  assert.match(host.innerHTML,new RegExp(`<button[^>]*id="${p}-confirm"[^>]*\\bhidden(?:[ >])`));
  // Guard against any accidental dependence on the confirm action.
  $(`${p}-confirm`).onclick=()=>{throw Error('Confirm action must never be used');};
  const play=async command=>{
   if(game==='sintonia')host.querySelector(`[data-s-direction="${command}"]`).click();
   else if(game==='repasse')host.querySelector(`[data-r-piece="${level.pieces.findIndex(piece=>piece.id===command)}"]`).click();
   else{host.querySelector(`[data-o-command="${command.command}"]`).click();$(`o-${command.direction===1?'clockwise':'counterclockwise'}`).click();}
   await settle();
  };
  for(const command of level.solution)await play(command);
  assert.equal(session().winRecorded,true,`${game}/${mode} records win automatically`);
  assert.equal(count(),initialCount+1);
  assert.equal(session().failures,0);
  const wonCursor=session().cursor;
  $(`${p}-undo`).click();await settle();assert.equal(session().cursor,wonCursor-1);
  $(`${p}-redo`).click();await settle();assert.equal(session().cursor,wonCursor);assert.equal(count(),initialCount+1,'redo cannot duplicate completion');
  $(`${p}-reset`).click();const reset=$(`restart-${game}-confirm`);if(reset?.open||$(`restart-${game}`)?.open)reset.click();await settle();
  // Current campaign uses immediate reset; current freeplay may use confirmation.
  if(session().cursor!==0&&reset){reset.click();await settle();}
  assert.equal(session().cursor,0,`${game}/${mode} restart`);
  for(const command of level.solution)await play(command);
  assert.equal(count(),initialCount+1,'re-solving same attempt cannot duplicate completion');
  app.hide();const saved=read();saved.lastView={active:true,screen:'play',mode};store.set(key,JSON.stringify(saved));app=init();assert.equal(app.restoreOnLoad(),true);await settle();assert.equal(count(),initialCount+1,'reload cannot duplicate completion');app.hide();
  console.log('PASS',game,mode,'actual first-level solution auto-completes once; undo/redo/restart/re-solve/reload preserve progress');
 }
}
const original=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
assert.ok(!/<button[^>]*id="confirm"[^>]*\bhidden\b/.test(original));
const collection=readFileSync(new URL('../dist/collection-ui.mjs',import.meta.url),'utf8');
assert.ok(!/<button[^>]*id="c-confirm"[^>]*\bhidden\b/.test(collection));
console.log('PASS Reflexos/Corte and ELO/PRUMO/PACTO/DESVIO confirm markup remains visible');

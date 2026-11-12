import test from 'node:test';
import assert from 'node:assert/strict';
import * as engine from '../../dist/logica/games/renovo/engine.mjs';
import { CAMPAIGN } from '../../dist/logica/games/renovo/index.mjs';
import { startTrace, moveTrace, finishTrace } from '../../dist/logica/games/renovo/trace-model.mjs';
import { cellCenter } from '../../dist/logica/games/renovo/geometry.mjs';
import { createRenovoTraceInput } from '../../dist/logica/games/renovo/trace-input.mjs';
import { createSession, applySessionAction, currentState, moveHistory, restoreSession } from '../../dist/logica/session.mjs';
import { createLogicStorage, saveSession } from '../../dist/logica/storage.mjs';
const level = { id:'trace-test', version:1, width:3,height:3,pieces:{0:'S',2:'B',8:'F'} };
const freeze = x => { if (x && typeof x === 'object') { Object.values(x).forEach(freeze); Object.freeze(x); } return x; };
const tracePath = (l,p) => p.slice(1).reduce((t,i)=>moveTrace(l,t,cellCenter(l,i)), startTrace(l,p[0]));

test('independent trace: every solution trio in all 80 campaigns, both directions, without solution access',()=>{
  assert.equal(CAMPAIGN.length,80);
  for(const original of CAMPAIGN) for(const reverse of [false,true]) {
    const l={...original,get solution(){throw Error('solution read');}};
    let s=engine.initialState();
    for(const trio of original.solution){
      const p=reverse?[...trio].reverse():[...trio];
      const action=finishTrace(l,tracePath(l,p));
      assert.deepEqual(action,{type:'trace',path:p},original.id);
      s=engine.applyAction(l,freeze(s),freeze(action));
    }
    assert.equal(engine.checkState(l,s).valid,true,original.id);
  }
});
test('independent trace: partials in both directions, immutable path and state, repeat adds no history',()=>{
  for(const p of [[0,2],[2,0],[2,8],[8,2],[0,2,8],[8,2,0]]) {
    const action=finishTrace(level,tracePath(level,p)); assert.deepEqual(action.path,p);
    const initial=freeze(engine.initialState()); const frozen=freeze(action);
    const changed=engine.applyAction(level,initial,frozen);
    assert.equal(changed.links.length,p.length-1); assert.deepEqual(initial.links,[]);
    assert.equal(engine.applyAction(level,changed,frozen),changed);
  }
  let s=engine.applyAction(level,engine.initialState(),{type:'link',from:0,to:2});
  const old=freeze(s); s=engine.applyAction(level,s,{type:'trace',path:[0,2,8]});
  assert.deepEqual(s.links,[[0,2],[2,8]]); assert.notEqual(old.links[0],s.links[0]);
  const clicked=engine.applyAction(level,s,{type:'link',from:0,to:2});assert.deepEqual(clicked.links,[[2,8]]);
  assert.deepEqual(engine.applyAction(level,s,{type:'cell',index:2,tool:'clear'}),engine.initialState());
});
test('independent trace: invalid shape, diagonal, skip, wrong type and straight trio rejected',()=>{
  for(const p of [[],[0],[0,8],[0,2,0],[0,2,8,2],[0,'2'],[0,9]]) assert.equal(engine.isTraceAllowed(level,p),false);
  assert.equal(finishTrace(level,moveTrace(level,startTrace(level,0),cellCenter(level,8))),null);
  const skip={width:3,height:3,pieces:{0:'S',1:'S',2:'B',5:'F',8:'B',7:'F'}};
  const blocked=moveTrace(skip,startTrace(skip,0),cellCenter(skip,2));assert.deepEqual(blocked.path,[0]);assert.equal(blocked.blocked,true);assert.equal(finishTrace(skip,blocked),null);
  const straight={width:3,height:3,pieces:{3:'S',4:'B',5:'F'}};
  assert.equal(engine.isTraceAllowed(straight,[3,4,5]),false);
  assert.equal(engine.isTraceAllowed({width:3,height:3,pieces:{0:'S',2:'B',8:'S'}},[0,2,8]),false);
});
test('independent trace: provisional backtracking, release elsewhere, invalid coordinates',()=>{
  const first=freeze(tracePath(level,[0,2,8]));
  const back=moveTrace(level,first,cellCenter(level,2));assert.deepEqual(back.path,[0,2]);assert.deepEqual(first.path,[0,2,8]);
  const reset=moveTrace(level,back,cellCenter(level,0)); assert.deepEqual(reset.path,[0]);assert.equal(finishTrace(level,reset),null);
  assert.equal(moveTrace(level,back,[NaN,0]),back);
  assert.equal(finishTrace(level,moveTrace(level,back,[600,600])),null);
  assert.equal(startTrace(level,1),null);
});
test('independent trace: crossing attempts accepted then rejected by checker, no solution consultation',()=>{
  const l={width:5,height:5,pieces:{5:'S',9:'B',24:'F',2:'S',17:'B',15:'F'},get solution(){throw Error('solution read');}};
  let s=engine.initialState();for(const path of [[5,9,24],[2,17,15]])s=engine.applyAction(l,s,{type:'trace',path});
  assert.equal(s.links.length,4); assert.equal(engine.isStateValid(l,s),true);assert.equal(engine.checkState(l,s).valid,false);assert.match(engine.checkState(l,s).message,/cruzar/);
});
test('independent trace: single undo transaction and storage restore including undone cursor',()=>{
  const initial=createSession(engine,level);
  const done=applySessionAction(engine,level,initial,{type:'trace',path:[0,2,8]});
  assert.equal(done.states.length,2); assert.deepEqual(currentState(moveHistory(done,-1)),engine.initialState());
  assert.deepEqual(currentState(moveHistory(moveHistory(done,-1),1)),currentState(done));
  assert.equal(applySessionAction(engine,level,done,{type:'trace',path:[8,2,0]}),done);
  const data=new Map(); const local={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)};
  const store=createLogicStorage(local);saveSession(store.data,'renovo',level,moveHistory(done,-1));assert.equal(store.save(),true);
  const restored=restoreSession(engine,level,createLogicStorage(local).data.games.renovo.sessions[level.id]);
  assert.equal(restored.cursor,0);assert.deepEqual(currentState(moveHistory(restored,1)),currentState(done));
  assert.doesNotMatch(JSON.stringify(restored.states),/preview|pointer|trace/);
});

class Target {
  constructor(){this.listeners=new Map();}
  addEventListener(type,fn){this.listeners.set(type,[...(this.listeners.get(type)||[]),fn]);}
  removeEventListener(type,fn){this.listeners.set(type,(this.listeners.get(type)||[]).filter(f=>f!==fn));}
  emit(type,extra={}){const e={type,button:0,isPrimary:true,pointerId:1,pointerType:'mouse',cancelable:true,detail:1,preventDefault(){this.defaultPrevented=true;},stopImmediatePropagation(){this.stopped=true;},...extra};for(const fn of this.listeners.get(type)||[]){fn(e);if(e.stopped)break;}return e;}
}
function harness(pointerType='mouse'){
  const win=new Target();win.performance={now:()=>100};const doc=new Target();doc.defaultView=win;
  const host=new Target();host.ownerDocument=doc;const capture=new Set();host.setPointerCapture=id=>capture.add(id);host.hasPointerCapture=id=>capture.has(id);host.releasePointerCapture=id=>capture.delete(id);
  const overlay={innerHTML:''};let svg={isConnected:true,attrs:{},querySelector:()=>overlay,setAttribute(k,v){this.attrs[k]=v;},removeAttribute(k){delete this.attrs[k];},getScreenCTM:()=>({inverse:()=>({})}),createSVGPoint(){return {x:0,y:0,matrixTransform(){return {x:this.x,y:this.y};}};}};
  host.contains=x=>x===svg && x.isConnected;
  let cells;const createCells=()=>Object.fromEntries([0,2,8].map(i=>[i,{dataset:{cell:String(i)},closest:s=>s==='[data-cell]'?cells[i]:svg}]));cells=createCells();
  const replaceBoard=()=>{svg.isConnected=false;svg={...svg,isConnected:true,attrs:{}};cells=createCells();};
  let context={level,state:engine.initialState()};const commits=[]; const hints=[];
  const input=createRenovoTraceInput(host,{window:win,getContext:()=>context,commit:(...args)=>{commits.push(args);svg.isConnected=false;},hint:x=>hints.push(x)});
  const event=(type,index,extra={})=>{const p=typeof index==='number'?cellCenter(level,index):index;return (type==='pointerdown'||type==='click'||type==='lostpointercapture'?host:win).emit(type,{pointerType,target:cells[typeof index==='number'?index:0],clientX:p?.[0],clientY:p?.[1],...extra});};
  return {win,doc,host,get svg(){return svg;},replaceBoard,overlay,capture,input,commits,hints,event,setContext:x=>context=x};
}
for(const type of ['mouse','touch','pen'])test(`independent pointer ${type}: full trace, capture, rerender, synthetic click and keyboard`,()=>{
  const h=harness(type);h.event('pointerdown',0);assert.equal(h.capture.size,0);h.event('pointermove',2);assert.equal(h.capture.size,1);assert.match(h.overlay.innerHTML,/path/);h.event('pointerup',8);
  assert.deepEqual(h.commits,[[{type:'trace',path:[0,2,8]},8]]);assert.equal(h.capture.size,0);assert.equal(h.input.isActive(),false);assert.equal(h.overlay.innerHTML,'');
  assert.equal(h.event('click',8,{detail:0,pointerId:-1}).defaultPrevented,undefined);
  assert.equal(h.event('click',8).stopped,true);assert.equal(h.event('click',8).stopped,undefined);
});
test('independent pointer: six CSS-pixel boundary preserves short click',()=>{
  for(const distance of [5.99,6]){const h=harness();h.event('pointerdown',0);const [x,y]=cellCenter(level,0);h.event('pointermove',[x+distance,y]);assert.equal(h.capture.size,distance<6?0:1);h.event('pointerup',[x+distance,y]);assert.equal(h.commits.length,0);assert.equal(Boolean(h.event('click',0).stopped),distance>=6);}
});
for(const reason of ['pointercancel','blur','lostpointercapture','escape','hidden','secondTouch','context','level','disconnect'])test(`independent pointer cancellation: ${reason}, then ordinary click`,()=>{
  const h=harness('touch');h.event('pointerdown',0);h.event('pointermove',2);
  if(reason==='escape')h.win.emit('keydown',{key:'Escape'});
  else if(reason==='hidden'){h.doc.hidden=true;h.doc.emit('visibilitychange');}
  else if(reason==='secondTouch')h.event('pointerdown',8,{pointerId:2,isPrimary:false});
  else if(reason==='context')h.setContext({level,state:engine.initialState()});
  else if(reason==='level')h.setContext({level:{...level},state:engine.initialState()});
  else if(reason==='disconnect')h.svg.isConnected=false;
  else h.event(reason,2,reason==='lostpointercapture'?{target:h.host}:{});
  h.event('pointerup',8);assert.equal(h.commits.length,0);assert.equal(h.input.isActive(),false);assert.equal(h.overlay.innerHTML,'');
  assert.equal(h.event('click',8).stopped,true); // The cancelled gesture cannot become a host click.
  if(reason==='disconnect'){const detached=h.svg;h.replaceBoard();assert.notEqual(h.svg,detached);assert.equal(detached.isConnected,false);}
  h.doc.hidden=false;
  h.event('pointerdown',0);h.event('pointerup',0);assert.equal(h.event('click',0).stopped,undefined);
});
test('independent pointer: coalesced corner, other pointer ignored, release outside and destroy cleanup',()=>{
  const h=harness();h.event('pointerdown',0);h.event('pointermove',8,{pointerId:99});assert.equal(h.capture.size,0);
  const [clientX,clientY]=cellCenter(level,2);h.event('pointerup',8,{getCoalescedEvents:()=>[{clientX,clientY}]});assert.equal(h.commits.length,1);
  const outside=harness();outside.event('pointerdown',0);outside.event('pointermove',2);outside.event('pointerup',[900,900]);assert.equal(outside.commits.length,0);assert.equal(outside.hints.length,1);
  outside.input.destroy();for(const target of [outside.host,outside.win,outside.doc])assert.ok([...target.listeners.values()].every(x=>!x.length));
});
test('independent pointer: Escape before movement suppresses the pending physical click',()=>{
  const h=harness();h.event('pointerdown',0);h.win.emit('keydown',{key:'Escape'});h.event('pointerup',0);
  assert.equal(h.commits.length,0);
  assert.equal(h.event('click',0).stopped,true,'Escape must not let the still-held pointer reselect a piece after cancel-selection');
  h.event('pointerdown',0);h.event('pointerup',0);assert.equal(h.event('click',0).stopped,undefined);
});

for(const type of ['touch','pen'])test(`independent pointer ${type}: implicit capture transfer from child does not cancel the host gesture`,()=>{
  const h=harness(type);h.event('pointerdown',0);h.event('pointermove',2);
  assert.equal(h.capture.has(1),true);
  // Captura implícita sai da peça; o evento borbulha, mas o host agora captura.
  h.event('lostpointercapture',0);
  assert.equal(h.input.isActive(),true);
  h.event('pointerup',8);
  assert.deepEqual(h.commits,[[{type:'trace',path:[0,2,8]},8]]);
  assert.equal(h.event('click',8).stopped,true);
});
for(const moved of [false,true])test(`independent pointer: Escape remains cancelled after a long hold, moved=${moved}`,()=>{
  const h=harness('touch');let time=100;h.win.performance.now=()=>time;
  h.event('pointerdown',0);if(moved)h.event('pointermove',2);
  h.win.emit('keydown',{key:'Escape'});time=1100;
  h.event('pointerup',moved?2:0);
  assert.equal(h.commits.length,0);
  assert.equal(h.event('click',moved?2:0).stopped,true,'Holding after Escape must not reselect a piece');
  h.event('pointerdown',0);h.event('pointerup',0);
  assert.equal(h.event('click',0).stopped,undefined,'A new ordinary click remains usable');
});

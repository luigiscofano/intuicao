import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import * as engine from '../../dist/logica/games/mirante/engine.mjs';
import { CAMPAIGN } from '../../dist/logica/games/mirante/index.mjs';
import { createSession, applySessionAction, currentState, moveHistory, restoreSession } from '../../dist/logica/session.mjs';
import { createLogicStorage, saveSession } from '../../dist/logica/storage.mjs';
import { nextBoardCell } from '../../dist/logica/keyboard.mjs';
const source=readFileSync(new URL('../../dist/logica/ui.mjs',import.meta.url),'utf8');
// Executa os handlers de produção sem alterações, com DOM/ciclo de vida simulados.
function harness(value=null, tool='cycle') {
 const level=CAMPAIGN[0], listeners={}, cells=Array.from({length:level.rows*level.cols},(_,i)=>({dataset:{cell:String(i)},tagName:'g',disabled:false,hasAttribute:k=>k==='data-cell',getAttribute:()=>null,focus(){this.focused=true;},closest(selector){return selector==='input,textarea,select'?null:this;}}));
 const board={contains:t=>cells.includes(t),querySelectorAll:()=>cells};
 let session=createSession(engine,level);session.states[0].cells[0]=value;
 const actions=[];
 const ctx={active:true,screen:'play',metadata:{id:'mirante'},adapter:engine,restart:{isOpen:false},selectedTool:tool,level,host:{addEventListener:(t,f)=>listeners[t]=f},find:id=>id==='board'?board:{querySelector:()=>null},nextBoardCell,renderTools(){},renderBoard(){},travel:d=>session=moveHistory(session,d),edit(a){actions.push(a);session=applySessionAction(engine,level,session,a);}};
 vm.createContext(ctx);
 const start=source.indexOf('  function cellAction('),end=source.indexOf("  host.addEventListener('keydown'",start);
 vm.runInContext(source.slice(start,end),ctx);
 const keyStart=source.indexOf("  host.addEventListener('keydown'",end),keyEnd=source.indexOf("  globalThis.addEventListener('pagehide'",keyStart);
 vm.runInContext(source.slice(keyStart,keyEnd),ctx);
 return {ctx,cells,actions,get session(){return session;},set session(s){session=s;},emit(type,extra={}){const e={target:cells[0],button:2,pointerType:'mouse',preventDefault(){this.prevented=true;},...extra};listeners[type](e);return e;}};
}
for(const value of [null,0,1,2]) for(const tool of ['cycle','circle','triangle','empty','clear']) test(`right-click ${value} with ${tool} marks empty, idempotent, preserves tool`,()=>{
 const h=harness(value,tool);assert.equal(h.emit('contextmenu').prevented,true);assert.equal(currentState(h.session).cells[0],0);assert.equal(h.ctx.selectedTool,tool);
 const old=h.session;h.emit('contextmenu');assert.equal(h.session,old);assert.equal(h.session.states.length,value===0?1:2);
});
for(const [tool,value] of [['cycle',1],['circle',1],['triangle',2],['empty',0],['clear',null]]) test(`left/touch-equivalent click and Enter/Space preserve ${tool}`,()=>{
 for(const type of ['click','Enter',' ']) {const h=harness(null,tool);if(type==='click')h.emit('click',{button:0});else h.emit('keydown',{key:type});assert.equal(currentState(h.session).cells[0],value);assert.equal(h.ctx.selectedTool,tool);}
});
test('context menu excludes touch, pen, keyboard, other games, inactive and restart',()=>{
 for(const overrides of [{pointerType:'touch'},{pointerType:'pen'},{button:0},{button:-1}]){const h=harness();assert.equal(h.emit('contextmenu',overrides).prevented,undefined);assert.equal(h.actions.length,0);}
 for(const property of ['active','screen','metadata','restart']){const h=harness();h.ctx[property]={active:false,screen:'selection',metadata:{id:'renovo'},restart:{isOpen:true}}[property];assert.equal(h.emit('contextmenu').prevented,undefined);assert.equal(h.actions.length,0);}
 for(const id of ['divisa','pulso','foz','refugio','renovo']){const h=harness();h.ctx.metadata.id=id;h.emit('contextmenu');assert.equal(h.actions.length,0);}
 const h=harness();h.emit('contextmenu',{pointerType:undefined});assert.equal(currentState(h.session).cells[0],0);
});
test('outside cell and observer do not edit; detached target rejected',()=>{
 const h=harness();for(const target of [{closest:()=>null},{closest(){return this;},dataset:{cell:'0'}}])assert.equal(h.emit('contextmenu',{target}).prevented,undefined);assert.equal(h.actions.length,0);
});
test('arrows and Home/End navigate without editing after right click',()=>{
 const h=harness(null,'triangle');h.emit('contextmenu');const count=h.actions.length;
 for(const [key,index] of [['ArrowRight',1],['ArrowDown',h.ctx.level.cols],['Home',0],['End',h.ctx.level.rows*h.ctx.level.cols-1]]){h.emit('keydown',{key});assert.equal(h.cells[index].focused,true);}
 assert.equal(h.actions.length,count);h.emit('keydown',{key:'Enter'});assert.equal(currentState(h.session).cells[0],2);
});
test('right click undo redo save restore and branching retain transactional history',()=>{
 const h=harness(1,'triangle');h.emit('contextmenu');h.emit('keydown',{key:'z',ctrlKey:true});assert.equal(currentState(h.session).cells[0],1);
 const data=new Map(),local={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)},store=createLogicStorage(local);
 saveSession(store.data,'mirante',h.ctx.level,h.session);store.save();const restored=restoreSession(engine,h.ctx.level,createLogicStorage(local).data.games.mirante.sessions[h.ctx.level.id]);
 assert.equal(restored.cursor,0);assert.equal(currentState(moveHistory(restored,1)).cells[0],0);
 h.emit('keydown',{key:'y',ctrlKey:true});assert.equal(currentState(h.session).cells[0],0);h.emit('keydown',{key:'z',ctrlKey:true});h.emit('click',{button:0});assert.equal(h.session.states.length,2);assert.equal(currentState(h.session).cells[0],2);
});
test('interrupted restart/hidden/selection does not edit, resumed click works',()=>{
 const h=harness(1,'circle');for(const [key,value] of [['restart',{isOpen:true}],['active',false],['screen','selection']]){const before=h.ctx[key];h.ctx[key]=value;h.emit('contextmenu');h.ctx[key]=before;assert.equal(currentState(h.session).cells[0],1);}
 h.emit('contextmenu');assert.equal(currentState(h.session).cells[0],0);h.emit('click',{button:0});assert.equal(currentState(h.session).cells[0],1);
});

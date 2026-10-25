import assert from 'node:assert/strict';
import {selectionSelector, selectionScrollTop, easeNavigation, initGameNavScroll} from '../dist/game-nav-scroll.mjs';

for (const game of ['light', 'cut']) assert.equal(selectionSelector({dataset:{game}}), '#selection');
for (const collection of ['elo', 'prumo', 'pacto', 'desvio']) assert.equal(selectionSelector({dataset:{collection}}), '#collection > .level-screen');
assert.equal(selectionSelector({dataset:{infoGame:'elo'}}), null);
assert.equal(selectionSelector({dataset:{game:'light',infoGame:'light'}}), null);
assert.equal(selectionSelector({dataset:{game:'unknown'}}), null);
assert.equal(selectionScrollTop(500, 100, 2000), 588);
assert.equal(selectionScrollTop(-500, 100, 2000), 0);
assert.equal(selectionScrollTop(2000, 100, 1800), 1800);
assert.equal(easeNavigation(0), 0);
assert.equal(easeNavigation(.5), .5);
assert.equal(easeNavigation(1), 1);
let previous=0;
for(let i=0;i<=100;i++){const value=easeNavigation(i/100);assert.ok(value>=previous);previous=value;}

function fixture({reduce=false}={}) {
 const listeners=new Map(), frames=new Map(), micros=[], moves=[];
 let next=0, now=0, hidden=false, pressed='true';
 const button={dataset:{game:'light'},getAttribute:()=>pressed};
 const nav={contains:b=>b===button};
 const target={closest:()=>hidden?{}:null,getClientRects:()=>[{}],getBoundingClientRect:()=>({top:900-win.scrollY})};
 const doc={scrollingElement:{scrollHeight:3000},querySelector:s=>s==='#main > .games'?nav:target,
 addEventListener:(t,f)=>listeners.set(t,f),removeEventListener:t=>listeners.delete(t)};
 const win={scrollY:100,scrollX:0,innerHeight:700,matchMedia:()=>({matches:reduce}),
 queueMicrotask:f=>micros.push(f),requestAnimationFrame:f=>{frames.set(++next,f);return next;},cancelAnimationFrame:id=>frames.delete(id),
 scrollTo:o=>{win.scrollY=o.top;win.scrollX=o.left;moves.push(o);},
 addEventListener:(t,f)=>listeners.set(t,f),removeEventListener:t=>listeners.delete(t)};
 const cleanup=initGameNavScroll(doc,win);
 const flush=()=>{while(micros.length)micros.shift()();};
 const tick=(ms=16)=>{now+=ms;const current=[...frames.values()];frames.clear();for(const f of current)f(now);};
 const click=(b=button)=>listeners.get('click')({target:{closest:()=>b},button:0});
 const finish=()=>{flush();for(let i=0;i<100&&frames.size;i++)tick();};
 return {win,moves,frames,listeners,button,click,flush,tick,finish,cleanup,setHidden:v=>hidden=v,setPressed:v=>pressed=v};
}
{
 const f=fixture();assert.equal(f.moves.length,0);assert.equal(f.frames.size,0); // No load/reload scrolling.
 f.click();f.win.scrollY=700;f.flush();assert.equal(f.win.scrollY,100); // Undo only nav focus jump.
 f.tick();f.tick();assert.equal(f.win.scrollY,100); // Wait for selection layout.
 f.finish();assert.equal(f.win.scrollY,888);assert.ok(f.moves.length>10);
 assert.ok(f.moves.every(m=>m.behavior==='instant')); // Custom easing, independent of CSS scroll behavior.
 f.cleanup();assert.equal(f.listeners.size,0);
}
{
 const f=fixture({reduce:true});f.click();f.finish();assert.equal(f.win.scrollY,888);assert.equal(f.moves.length,1);
}
for(const type of ['wheel','touchstart','touchmove','pointerdown','keydown']) {
 const f=fixture();f.click();f.flush();f.tick();f.tick();f.tick();f.tick();
 f.listeners.get(type)({});const y=f.win.scrollY;f.finish();assert.equal(f.win.scrollY,y);assert.equal(f.frames.size,0);
}
{
 const f=fixture();f.click();f.listeners.get('wheel')({});f.win.scrollY=160;f.finish();assert.equal(f.win.scrollY,160);
}
{
 const f=fixture();f.click();f.click();f.finish();assert.equal(f.win.scrollY,888);
 assert.equal(f.moves.filter(m=>m.top===888).length,1); // Only latest click completes.
}
for(const change of [f=>f.setHidden(true),f=>f.setPressed('false')]) {
 const f=fixture();f.click();change(f);f.finish();assert.equal(f.moves.length,0);
}
{
 const f=fixture();f.click(null);f.finish();assert.equal(f.moves.length,0); // Info siblings and non-nav clicks.
 f.click({...f.button});f.finish();assert.equal(f.moves.length,0); // Outside nav.
 f.button.disabled=true;f.click();f.finish();assert.equal(f.moves.length,0);
}
console.log('game-nav-scroll: all tests passed');

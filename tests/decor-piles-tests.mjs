import assert from 'node:assert/strict';
import fs from 'node:fs';
import {pointerVelocity,disturb,stepParticle,growthOpacity,createPileDecoration,LIMITS,GROWTH} from '../dist/decor-piles.mjs';
const point=(x,time,scroll=0)=>({x,y:40,time,scroll});
assert.equal(pointerVelocity(null,point(20,20)),null);
assert.equal(pointerVelocity(point(0,0),point(5,500)),null);
assert.equal(pointerVelocity(point(0,0),point(5,20,50)),null);
assert.equal(pointerVelocity(point(0,0),point(800,20)),null);
assert.equal(pointerVelocity(point(0,0),point(8,16)).speed,500);
assert.equal(pointerVelocity(point(0,0),point(16,32)).speed,500);
assert.equal(pointerVelocity(point(0,0),point(100,10)).speed,LIMITS.speed);
const particle=()=>({dx:0,dy:0,vx:0,vy:0,flight:0,angle:0,spin:0,restY:80,floor:110,active:false});
const slow=particle(),fast=particle();disturb(slow,{x:70,y:0,speed:70},0);disturb(fast,{x:1000,y:0,speed:1000},0);
assert.ok(Math.abs(fast.vy)>Math.abs(slow.vy));assert.ok(Math.abs(fast.vx)>Math.abs(slow.vx));
const far=particle();assert.equal(disturb(far,{x:1000,y:0,speed:1000},100),false);assert.equal(far.active,false);
for(let i=0;i<100;i++)disturb(fast,{x:1500,y:0,speed:1500},0);
assert.ok(Math.abs(fast.vx)<=260&&Math.abs(fast.vy)<=260);
let minY=0,maxDx=0;for(let i=0;i<1200;i++){stepParticle(fast,1/120);minY=Math.min(minY,fast.dy);maxDx=Math.max(maxDx,Math.abs(fast.dx));}
assert.ok(minY< -5,'Fast swipe makes real individual leaves airborne');assert.ok(minY>=2-fast.restY);assert.ok(maxDx<=145);assert.equal(fast.active,false);assert.equal(fast.dx,0);assert.equal(fast.dy,0);
for(let i=0;i<600;i++)stepParticle(slow,1/60);assert.equal(slow.active,false);
const small=particle(),large=particle();disturb(small,{x:500,y:0,speed:500},0);disturb(large,{x:500,y:0,speed:500},0);stepParticle(small,.032);stepParticle(large,10);assert.deepEqual(large,small,'Long frame is clamped');
const bottom=particle();bottom.restY=125;bottom.floor=125;disturb(bottom,{x:500,y:0,speed:500},0);for(let i=0;i<1000;i++)stepParticle(bottom,1/60);assert.equal(bottom.active,false);
assert.equal(growthOpacity(-1,0),.8);for(let i=0;i<GROWTH.length;i++){assert.equal(growthOpacity(i,GROWTH[i]-1),0);assert.equal(growthOpacity(i,GROWTH[i]+6),.8);assert.equal(growthOpacity(i,1000),.8);}
// Minimal host validates failure fallback, passive listeners, and idempotent cleanup.
let disconnects=0,removed=0;const listeners=[];const layer={classList:{add(){},remove(){}},append(){},getBoundingClientRect(){return {width:1180}}};
const doc={hidden:false,querySelector:s=>s.includes('layer')?layer:{},createElementNS:()=>({classList:{add(){}},setAttribute(){},remove(){removed++}}),addEventListener:(name,fn,opts)=>listeners.push({name,opts})};
const win={innerWidth:1180,performance:{now:()=>10},matchMedia:()=>({matches:false,addEventListener(){}}),IntersectionObserver:class{observe(){}disconnect(){disconnects++}},ResizeObserver:class{observe(){}disconnect(){disconnects++}},addEventListener:(name,fn,opts)=>listeners.push({name,opts}),fetch:async()=>{throw Error('offline')},cancelAnimationFrame(){},clearTimeout(){}};
const host=createPileDecoration({document:doc,window:win});await host.loading;assert.ok(removed>0,'Failed asset load leaves static CSS fallback');host.destroy();host.destroy();assert.equal(disconnects,2);assert.equal(listeners.find(x=>x.name==='pointermove').opts.passive,true);assert.equal(listeners.find(x=>x.name==='scroll').opts.passive,true);assert.equal(listeners.find(x=>x.name==='pointermove').opts.signal.aborted,true);
const repeatedSlow=particle();for(let i=0;i<500;i++){disturb(repeatedSlow,{x:100,y:0,speed:100,dt:1/120},0);stepParticle(repeatedSlow,1/120);}assert.ok(Math.abs(repeatedSlow.dx)<=7&&Math.abs(repeatedSlow.dy)<=5,'Sustained slow motion remains a small rustle');
const source=fs.readFileSync(new URL('../dist/decor-piles.mjs',import.meta.url),'utf8');assert.ok(!/preventDefault|stopPropagation|localStorage|sessionStorage/.test(source));assert.ok(source.includes("event.pointerType!=='mouse'"));assert.ok(source.includes('reduced.matches'));assert.ok(source.includes('doc.hidden'));assert.ok(source.includes('LIMITS.maxLeaves'));assert.ok(source.includes('current.time-previous.time<4)return;const velocity='),'High-frequency samples accumulate rather than reset the reference');assert.ok(source.includes('clockRunning'),'Hidden-time accounting uses prior visibility state');assert.ok(!/app\.mjs|collection-ui|gameState/.test(source));
console.log('PASS decorative piles: velocity/dt/scroll guards, monotonic impulses, bounds/settle, growth, passive input, fallback and teardown.');

import assert from 'node:assert/strict';
import fs from 'node:fs';
import {pointerVelocity,disturb,stepParticle,growthOpacity,createPileDecoration,LIMITS,GROWTH,createSupportField,reconcileParticle} from '../dist/decor-piles.mjs';
const point=(x,time,scroll=0)=>({x,y:40,time,scroll});
assert.equal(pointerVelocity(null,point(20,20)),null);
assert.equal(pointerVelocity(point(0,0),point(5,500)),null);
assert.equal(pointerVelocity(point(0,0),point(5,20,50)),null);
assert.equal(pointerVelocity(point(0,0),point(800,20)),null);
assert.equal(pointerVelocity(point(0,0),point(8,16)).speed,500);
assert.equal(pointerVelocity(point(0,0),point(16,32)).speed,500);
assert.equal(pointerVelocity(point(0,0),point(100,10)).speed,LIMITS.speed);
const particle=()=>({restX:100,restY:80,dx:0,dy:0,vx:0,vy:0,angle:0,spin:0,floor:108,width:400,opacity:.8,active:false,moved:false});
const slow=particle(),fast=particle();disturb(slow,{x:70,y:0,speed:70},0);disturb(fast,{x:1000,y:0,speed:1000},0);
assert.ok(Math.abs(fast.vy)>Math.abs(slow.vy));assert.ok(Math.abs(fast.vx)>Math.abs(slow.vx));
const far=particle();assert.equal(disturb(far,{x:1000,y:0,speed:1000},100),false);assert.equal(far.active,false);
for(let i=0;i<100;i++)disturb(fast,{x:1500,y:0,speed:1500},0);assert.ok(Math.abs(fast.vx)<=260&&Math.abs(fast.vy)<=260);
let minY=80;for(let i=0;i<1200;i++){stepParticle(fast,1/120);minY=Math.min(minY,fast.restY+fast.dy);}
assert.ok(minY<75,'Fast swipe lifts real leaves');assert.ok(minY>=2);assert.equal(fast.active,false);assert.ok(fast.dx>15,'New landing position remains displaced');assert.equal(fast.restY+fast.dy,108,'Ground contact, no hovering');
const landed={...fast};for(let i=0;i<1000;i++)stepParticle(fast,1/60);assert.deepEqual(fast,landed,'Sleeping leaf stays at new landing position');
for(let i=0;i<600;i++)stepParticle(slow,1/60);assert.equal(slow.active,false);assert.ok(slow.dx>0&&slow.dx<fast.dx,'Gentle motion produces small permanent displacement');
const oldLanding=fast.dx;disturb(fast,{x:-600,y:0,speed:600},0);for(let i=0;i<1000;i++)stepParticle(fast,1/120);assert.notEqual(fast.dx,oldLanding,'Repeated local wake creates another landing');
const small=particle(),large=particle();disturb(small,{x:500,y:0,speed:500},0);disturb(large,{x:500,y:0,speed:500},0);stepParticle(small,.032);stepParticle(large,10);assert.deepEqual(large,small,'Long frame is bounded');
const at30=particle(),at120=particle();for(const p of [at30,at120])disturb(p,{x:650,y:0,speed:650},0);for(let i=0;i<500;i++)stepParticle(at30,1/30);for(let i=0;i<2000;i++)stepParticle(at120,1/120);assert.ok(Math.abs(at30.dx-at120.dx)<1,'Substeps make settling stable across frame rates');
const supporter=particle();supporter.restY=90;const incoming=particle();incoming.restY=60;incoming.active=true;incoming.moved=true;const field=createSupportField([supporter,incoming],400,112);for(let i=0;i<1000;i++)stepParticle(incoming,1/120,field);assert.equal(incoming.restY+incoming.dy,87,'Moved leaf rests on stationary leaf support');assert.equal(incoming.active,false);
supporter.active=true;const removedSupport=createSupportField([supporter,incoming],400,112);assert.ok(removedSupport.support(100,87,incoming)>89,'Removing support is detectable without waking original pile');incoming.active=true;for(let i=0;i<1000;i++)stepParticle(incoming,1/120,removedSupport);assert.equal(incoming.restY+incoming.dy,108);
const snapshotSupporter=particle();snapshotSupporter.restY=50;const snapshot=createSupportField([snapshotSupporter],400,112);snapshotSupporter.active=true;assert.equal(snapshot.support(100,2,null),108,'Support awakened during same frame is ignored');
const invisible=particle();invisible.opacity=0;invisible.restY=25;assert.equal(createSupportField([invisible],400,112).support(100,2,null),108,'Invisible growth leaves cannot support floating leaves');
const resized=reconcileParticle(landed,{...particle(),restX:180,restY:65},400,112,800,84);assert.ok(Math.abs((resized.restX+resized.dx)-(landed.restX+landed.dx)*2)<.001);assert.equal(resized.angle,landed.angle);assert.equal(resized.moved,true);assert.equal(resized.active,false);const pausedResize=reconcileParticle({...landed,pausedMotion:true},{...particle()},400,112,800,84);assert.equal(pausedResize.pausedMotion,true,'Reduced-motion resize preserves deferred movement');
const atWall=particle();atWall.restX=398;disturb(atWall,{x:1500,y:0,speed:1500},0);for(let i=0;i<1000;i++)stepParticle(atWall,1/120);assert.equal(atWall.restX+atWall.dx,398,'Horizontal boundary clamps without bounce');
assert.equal(growthOpacity(-1,0),.8);for(let i=0;i<GROWTH.length;i++){assert.equal(growthOpacity(i,GROWTH[i]-1),0);assert.equal(growthOpacity(i,GROWTH[i]+6),.8);assert.equal(growthOpacity(i,1000),.8);}
// Minimal host validates failure fallback, passive listeners, and idempotent cleanup.
let disconnects=0,removed=0;const listeners=[];const layer={classList:{add(){},remove(){}},append(){},getBoundingClientRect(){return {width:1180}}};
const doc={hidden:false,querySelector:s=>s.includes('layer')?layer:{},createElementNS:()=>({classList:{add(){}},setAttribute(){},remove(){removed++}}),addEventListener:(name,fn,opts)=>listeners.push({name,opts})};
const win={innerWidth:1180,performance:{now:()=>10},matchMedia:()=>({matches:false,addEventListener(){}}),IntersectionObserver:class{observe(){}disconnect(){disconnects++}},ResizeObserver:class{observe(){}disconnect(){disconnects++}},addEventListener:(name,fn,opts)=>listeners.push({name,opts}),fetch:async()=>{throw Error('offline')},cancelAnimationFrame(){},clearTimeout(){}};
const host=createPileDecoration({document:doc,window:win});await host.loading;assert.ok(removed>0,'Failed asset load leaves static CSS fallback');host.destroy();host.destroy();assert.equal(disconnects,2);assert.equal(listeners.find(x=>x.name==='pointermove').opts.passive,true);assert.equal(listeners.find(x=>x.name==='scroll').opts.passive,true);assert.equal(listeners.find(x=>x.name==='pointermove').opts.signal.aborted,true);
const source=fs.readFileSync(new URL('../dist/decor-piles.mjs',import.meta.url),'utf8');assert.ok(!/preventDefault|stopPropagation|localStorage|sessionStorage/.test(source));assert.ok(source.includes("event.pointerType!=='mouse'"));assert.ok(source.includes('reduced.matches'));assert.ok(source.includes('doc.hidden'));assert.ok(source.includes('LIMITS.maxLeaves'));assert.ok(source.indexOf('if(old.moved)appendParticle')<source.indexOf('if(retained.has(key)||x<-60'),'Moved leaves retained before original-coordinate viewport filtering');assert.ok(source.includes('current.time-previous.time<4)return;const velocity='),'High-frequency samples accumulate rather than reset the reference');assert.ok(source.includes('clockRunning'),'Hidden-time accounting uses prior visibility state');assert.ok(!/app\.mjs|collection-ui|gameState/.test(source));
console.log('PASS free-landing decorative piles: velocity/dt/scroll guards, monotonic impulses, bounds/settle, growth, passive input, fallback and teardown.');

import assert from 'node:assert/strict';
import {disturb,stepParticle,createSupportField,reconcileParticle,LIMITS} from '../dist/decor-piles.mjs';
const particle=()=>({restX:100,restY:60,dx:0,dy:0,vx:0,vy:0,spin:0,angle:0,active:false,moved:false,opacity:.8,width:400,floor:108});
const results=[];
for(const fps of [30,60,120]){
 const p=particle();disturb(p,{x:900,y:0,speed:900},0);
 for(let i=0;i<fps*20&&p.active;i++)stepParticle(p,1/fps,createSupportField([],400,112));
 assert.equal(p.active,false,'Gravity must eventually sleep');
 assert.ok(p.dx>20,'Settled leaf must not return to its original horizontal location');
 assert.equal(p.restY+p.dy,108,'Unsupported leaf lands on the actual floor');
 const settled=JSON.stringify(p);
 for(let i=0;i<300;i++)stepParticle(p,1/fps,createSupportField([],400,112));
 assert.equal(JSON.stringify(p),settled,'Repeated idle updates preserve the new position');
 results.push(p.dx);
}
assert.ok(Math.max(...results)-Math.min(...results)<1,'30/60/120 FPS trajectories remain close');
const a=particle(),b=particle();disturb(a,{x:900,y:0,speed:900},0);Object.assign(b,a);
stepParticle(a,LIMITS.dt);stepParticle(b,10);assert.deepEqual(a,b,'Large frame gaps are bounded');
const support={...particle(),restY:80};
const field=createSupportField([support],400,112);
assert.equal(field.support(100,50,null),77);
assert.equal(field.support(100,50,support),108,'A leaf cannot support itself');
support.active=true;
assert.equal(field.support(100,50,null),108,'A support activated after field creation must no longer support another leaf');
const p=particle();p.moved=true;p.dx=40;p.dy=48;p.angle=17;p.pausedMotion=true;
const scaled=reconcileParticle(p,{...particle(),restX:70,restY:40,width:200,floor:80},400,112,200,84);
assert.equal(scaled.restX+scaled.dx,70);assert.equal(scaled.restY+scaled.dy,80);
assert.equal(scaled.angle,17);assert.equal(scaled.pausedMotion,true,'Resize preserves reduced-motion suspension');
for(const fps of [30,60,120]){
 const pile=Array.from({length:80},(_,i)=>({...particle(),restX:50+(i%20)*8,restY:60+Math.floor(i/20)*10}));
 for(const leaf of pile)disturb(leaf,{x:1000,y:0,speed:1000},Math.hypot(leaf.restX-100,leaf.restY-90));
 let active=true;
 for(let n=0;active&&n<fps*30;n++){
  active=false;const field=createSupportField(pile,400,112);
  for(const leaf of pile){
   if(leaf.moved&&!leaf.active&&field.support(leaf.restX+leaf.dx,leaf.restY+leaf.dy,leaf)>leaf.restY+leaf.dy+2)leaf.active=true;
   if(leaf.active){stepParticle(leaf,1/fps,field);active||=leaf.active;}
  }
 }
 assert.equal(active,false,'A disturbed group with other supports must sleep');
 const field=createSupportField(pile,400,112);
 assert.equal(pile.filter(leaf=>leaf.moved&&field.support(leaf.restX+leaf.dx,leaf.restY+leaf.dy,leaf)>leaf.restY+leaf.dy+2).length,0,'Settled group remains supported on repeated wake');
}
console.log('PASS independent gravity checks: floor contact, new settled locations, idle stability, frame rates, dt guard, live supports and paused resize.');

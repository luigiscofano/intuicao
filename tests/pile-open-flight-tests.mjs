import assert from 'node:assert/strict';
import fs from 'node:fs';
import {disturb,stepParticle,reconcileParticle} from '../dist/decor-piles.mjs';
const particle=()=>({restX:100,restY:20,dx:0,dy:0,vx:0,vy:0,spin:0,angle:0,floor:108,width:400,active:false,moved:false});
for(const fps of [30,60,120]){
 const p=particle();for(let i=0;i<10;i++)disturb(p,{x:1500,y:0,speed:1500},0);
 let minY=20,airborne;
 for(let i=0;i<fps*20&&p.active;i++){
  stepParticle(p,1/fps);minY=Math.min(minY,p.restY+p.dy);
  if(p.restY+p.dy<0&&!airborne)airborne={...p};
 }
 assert.ok(minY< -10,'Leaf flies freely above SVG top');
 assert.equal(p.active,false);assert.equal(p.restY+p.dy,108);
 assert.ok(p.dx>20,'It still settles at a new location');
 const resized=reconcileParticle(airborne,particle(),400,112,800,84);
 assert.ok(resized.restY+resized.dy<0,'Resize must preserve above-strip flight');
 assert.ok(Math.abs(resized.restY+resized.dy-(airborne.restY+airborne.dy)*.75)<1e-8);
}
const css=fs.readFileSync(new URL('../dist/platform.css',import.meta.url),'utf8');
const surface=css.match(/body > \.platform-leaf-layer > \.platform-pile-surface\{([^}]+)\}/)[1];
assert.ok(surface.includes('height:112px;overflow:visible;pointer-events:none;'));
const outer=css.match(/body > \.platform-leaf-layer\{([^}]+)\}/)[1];
assert.ok(outer.includes('overflow:hidden;pointer-events:none;user-select:none;contain:strict'));
assert.ok(css.includes('.platform-pile-surface{height:84px}'));
console.log('PASS open-flight: negative altitude at 30/60/120 FPS, gravity return/new landing, airborne resize, inert SVG overflow inside document containment. Static checks do not establish browser click-through.');

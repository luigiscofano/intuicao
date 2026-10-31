import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMPAIGN} from '../dist/orbita/campaign.mjs';
import {projectOrbita} from '../dist/orbita/presentation-fit.mjs';
import {pickOrbitaRing,commandForOrbitaRing} from '../dist/orbita/ring-selection.mjs';
const ring=(id,cx=100,cy=100,r=40)=>({id,geometry:{cx,cy,r}});
const command=(id,...rings)=>({id,turns:rings.map(ring=>({ring,delta:1}))});

test('one to five concentric rings: rails, generous tolerance, empty center and exterior',()=>{
 for(let count=1;count<=5;count++){
  const level={rings:Array.from({length:count},(_,i)=>ring(String(i),200,200,40+i*40))};
  for(const r of level.rings){assert.equal(pickOrbitaRing(level,{x:200+r.geometry.r,y:200}),r.id);assert.equal(pickOrbitaRing(level,{x:200+r.geometry.r+15,y:200}),r.id);}
  assert.equal(pickOrbitaRing(level,{x:200,y:200}),null);
  assert.equal(pickOrbitaRing(level,{x:500,y:500}),null);
 }
});
test('intersections and equal distances use stable authored order, not selection state',()=>{
 const level={rings:[ring('B',80,100,50),ring('A',140,100,50)]};
 assert.equal(pickOrbitaRing(level,{x:110,y:140}),'B');
 assert.equal(pickOrbitaRing({...level,rings:[...level.rings].reverse()},{x:110,y:140}),'A');
 assert.equal(pickOrbitaRing(level,{x:190,y:100}),'A');
 assert.equal(pickOrbitaRing({rings:[ring('outer',100,100,60),ring('inner',100,100,40)]},{x:150,y:100}),'outer');
});
test('coordinate-unit tolerance handles scaled SVG and rejects invalid/blank input',()=>{
 const level={rings:[ring('A')]};
 assert.equal(pickOrbitaRing(level,{x:172,y:100},32),'A'); // CSS scale .5: 16px hit allowance.
 assert.equal(pickOrbitaRing(level,{x:172.01,y:100},32),null);
 assert.equal(pickOrbitaRing(level,{x:140,y:100},0),'A');
 for(const point of [null,{}, {x:NaN,y:0},{x:Infinity,y:0}])assert.equal(pickOrbitaRing(level,point),null);
 assert.equal(pickOrbitaRing(level,{x:140,y:100},-1),null);
 assert.equal(pickOrbitaRing({rings:[]},{x:0,y:0}),null);
});
test('explicit labels resolve exact ring: single command, selected linkage, first linkage',()=>{
 const level={rings:[ring('A'),ring('B'),ring('C')],commands:[command('AB','A','B'),command('BC','B','C'),command('A','A')]};
 assert.equal(commandForOrbitaRing(level,'A','AB'),'A');
 assert.equal(commandForOrbitaRing(level,'B','BC'),'BC');
 assert.equal(commandForOrbitaRing(level,'B','A'),'AB');
 assert.equal(commandForOrbitaRing(level,'C','AB'),'BC');
 assert.equal(commandForOrbitaRing(level,'unknown','A'),null);
 assert.equal(commandForOrbitaRing({...level,commands:[]},'A'),null);
});
test('all 80 campaign scenes at 265/335/680px: every rail selectable, commands valid, no mutation',()=>{
 const before=JSON.stringify(CAMPAIGN);
 for(const width of [265,335,680])for(const source of CAMPAIGN){
  const projected=projectOrbita(source,width,320).level,snapshot=JSON.stringify(projected);
  for(const r of projected.rings){
   let selectedOwn=false;
   for(let n=0;n<72;n++){
    const angle=n*Math.PI/36,point={x:r.geometry.cx+Math.cos(angle)*r.geometry.r,y:r.geometry.cy+Math.sin(angle)*r.geometry.r};
    const id=pickOrbitaRing(projected,point);assert.ok(id,`${source.id} ${width} ${r.id}`);
    if(id===r.id)selectedOwn=true;
    const cmd=commandForOrbitaRing(source,id,source.commands[0].id);
    assert.ok(source.commands.find(c=>c.id===cmd)?.turns.some(t=>t.ring===id));
   }
   assert.ok(selectedOwn,`${source.id} ${width}: ring ${r.id} has a direct hit area`);
   assert.ok(commandForOrbitaRing(source,r.id,source.commands[0].id));
  }
  assert.equal(pickOrbitaRing(projected,{x:-100,y:-100}),null);
  assert.equal(JSON.stringify(projected),snapshot);
 }
 assert.equal(JSON.stringify(CAMPAIGN),before);
});

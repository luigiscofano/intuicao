import test from 'node:test';
import assert from 'node:assert/strict';
import {CATALOG} from '../dist/orbita/catalog.mjs';
import {ringPath,movementPoint} from '../dist/orbita/ui.mjs';
import {createEngine} from '../dist/orbita/engine.mjs';
const TAU=Math.PI*2,mod=x=>(x%TAU+TAU)%TAU,epsilon=.03;
// Independent analytic oracle: no dependency on the generation geometry helper.
function intersections(a,b){
 const dx=b.cx-a.cx,dy=b.cy-a.cy,d=Math.hypot(dx,dy);
 if(d<1e-7){assert.ok(Math.abs(a.r-b.r)>epsilon,'coincident circles forbidden');return[];}
 if(d>a.r+b.r+1e-5||d<Math.abs(a.r-b.r)-1e-5)return[];
 const along=(a.r*a.r-b.r*b.r+d*d)/(2*d),h=Math.sqrt(Math.max(0,a.r*a.r-along*along)),x=a.cx+along*dx/d,y=a.cy+along*dy/d;
 return h<.01?[{x,y}]:[{x:x-dy/d*h,y:y+dx/d*h},{x:x+dy/d*h,y:y-dx/d*h}];
}
test('all800 new boards are exact circles, with every analytic intersection represented once',()=>{
 for(const l of CATALOG.slice(200)){
  assert.equal(l.catalogVersion,3,l.id);const cells=new Map(l.cells.map(c=>[c.id,c]));
  for(const r of l.rings){const g=r.geometry;assert.equal(g?.type,'circle',l.id);assert.equal(g.rx??g.r,g.r);assert.equal(g.ry??g.r,g.r);assert.equal(r.path,undefined,'new circle cannot fall back to polygon');
   assert.ok(g.r>0&&[g.cx,g.cy,g.r].every(Number.isFinite));
   const angles=r.cells.map(id=>{const c=cells.get(id);assert.ok(Math.abs(Math.hypot(c.x-g.cx,c.y-g.cy)-g.r)<epsilon,`${l.id}/${r.id}/${id} on circle`);return Math.atan2(c.y-g.cy,c.x-g.cx);});
   const turns=angles.reduce((sum,a,i)=>sum+mod(angles[(i+1)%angles.length]-a),0);assert.ok(Math.abs(turns-TAU)<1e-5,`${l.id} clockwise cyclic order`);
   const path=ringPath(l,r);assert.equal((path.match(/ A /g)??[]).length,2);assert.ok(!/\bL\b/.test(path),'perfect SVG arcs, not sampled polygons');
  }
  let contacts=0;for(let i=0;i<l.rings.length;i++)for(let j=i+1;j<l.rings.length;j++){
   const a=l.rings[i],b=l.rings[j],actual=intersections(a.geometry,b.geometry),shared=a.cells.filter(id=>b.cells.includes(id));assert.equal(shared.length,actual.length,`${l.id} pair${a.id}${b.id}`);assert.ok(shared.length<=2);
   if(actual.length===2){const ga=a.geometry,gb=b.geometry,d=Math.hypot(ga.cx-gb.cx,ga.cy-gb.cy),angle=Math.acos(Math.max(-1,Math.min(1,(ga.r**2+gb.r**2-d*d)/(2*ga.r*gb.r))))*180/Math.PI;assert.ok(Math.min(angle,180-angle)>=19.999,`${l.id} nearly parallel crossing ${angle}`);}
   for(const p of actual){assert.equal(shared.filter(id=>Math.hypot(cells.get(id).x-p.x,cells.get(id).y-p.y)<epsilon).length,1,`${l.id} exact unique junction`);}contacts+=actual.length;
  }
  assert.ok(contacts>=2&&contacts<=14);
  for(const c of l.cells){const owners=l.rings.filter(r=>r.cells.includes(c.id));assert.ok(owners.length>=1&&owners.length<=2);for(const r of l.rings.filter(r=>!r.cells.includes(c.id))){const clearance=Math.abs(Math.hypot(c.x-r.geometry.cx,c.y-r.geometry.cy)-r.geometry.r);assert.ok(clearance>=28,`${l.id} nonincident circle obscures house ${c.id}: ${clearance}`);}}
 }
});
test('dense circle networks genuinely connect circles to several different neighbors',()=>{
 const multi=CATALOG.slice(200).filter(l=>l.rings.some(a=>l.rings.filter(b=>b!==a&&a.cells.some(c=>b.cells.includes(c))).length>=2));assert.ok(multi.length>=700,multi.length);
 for(const l of CATALOG.slice(200).filter(l=>l.cells.filter(c=>l.rings.filter(r=>r.cells.includes(c.id)).length===2).length>=13))assert.equal(l.rings.length,5);
});
test('animation stays on a perfect circle throughout moves, including step2',()=>{
 for(const l of CATALOG.slice(200).filter((l,i)=>i%17===0||l.specialRules.some(s=>s.kind==='step'))){const e=createEngine(l),start=e.initialState();for(const move of e.allowedMoves(start))for(const m of e.transition(start,move).movements){const g=l.rings.find(r=>r.id===m.ring).geometry;for(const t of [.1,.25,.5,.75,.9]){const p=movementPoint(l,m,t);assert.ok(Math.abs(Math.hypot(p.x-g.cx,p.y-g.cy)-g.r)<epsilon,`${l.id} circular animation`);}}}
});

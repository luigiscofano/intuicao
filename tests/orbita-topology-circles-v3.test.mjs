import test from 'node:test';
import assert from 'node:assert/strict';
import {makeCircleTopologyV3,validateCircleGeometryV3,circleMeetings,circleCrossingAngle} from '../dist/orbita/topology-circles-v3.mjs';
import {structuralSignature} from '../dist/orbita/diversity.mjs';
const circle=(cx,cy,r)=>({cx,cy,r});
function assertTopology(t,n,k){const audit=validateCircleGeometryV3(t);assert.equal(audit.valid,true,JSON.stringify(audit));assert.equal(audit.intersections,k);assert.equal(t.rings.length,n);assert.ok(audit.pairMatrix.flat().every(x=>x<=2));assert.ok(audit.minimumCellDistance>=75.99);assert.ok(audit.minimumCellRailClearance>=32.99);assert.ok(audit.minimumCrossingAngle>=19.999999);assert.ok(Math.max(t.layout.width,t.layout.height)<=1400);assert.ok(t.cells.length<=80);for(const r of t.rings){assert.equal(r.path,undefined);const g=r.geometry;assert.equal(g.type,'circle');assert.equal(g.rx,g.r);assert.equal(g.ry,g.r);assert.ok(r.cells.length<=32);for(const id of r.cells){const p=t.cells.find(c=>c.id===id);assert.ok(Math.abs(Math.hypot(p.x-g.cx,p.y-g.cy)-g.r)<1e-5);}}if(k%2)assert.ok(audit.tangencies>0);}
test('Analytic circle classification handles crossings, true tangencies, containment and coincidence',()=>{
 assert.equal(circleMeetings(circle(0,0,10),circle(15,0,10)).length,2);
 assert.deepEqual(circleMeetings(circle(0,0,10),circle(20,0,10)),[{x:10,y:0,tangent:true}]);
 assert.equal(circleMeetings(circle(0,0,10),circle(5,0,5)).length,1);
 assert.equal(circleMeetings(circle(0,0,10),circle(0,0,5)).length,0);
 assert.equal(circleMeetings(circle(0,0,10),circle(0,0,10)),null);
 assert.equal(circleMeetings(circle(0,0,10),circle(25,0,10)).length,0);
});
test('Every connected feasible request up to fourteen meetings has actual circular rails',()=>{
 for(let n=2;n<=5;n++)for(let k=Math.max(2,n-1);k<=Math.min(14,n*(n-1));k++)for(let variant=0;variant<20;variant++)assertTopology(makeCircleTopologyV3({ringCount:n,intersections:k,variant}),n,k);
});
test('At least one hundred genuinely different two-circle structures, not renamed or moved copies',()=>{
 const signatures=new Set();for(let variant=0;variant<600;variant++){const t=makeCircleTopologyV3({ringCount:2,intersections:2,variant});t.commands=t.rings.map(r=>({turns:[{ring:r.id,delta:1}],requires:[]}));signatures.add(structuralSignature(t));}assert.ok(signatures.size>=100,`Only ${signatures.size} lens structures`);
});
test('Reject ellipses, organic paths, hidden intersections, reordered houses and nonfinite coordinates',()=>{
 const t=makeCircleTopologyV3({ringCount:4,intersections:8,variant:44});
 for(const mutate of [x=>x.rings[0].geometry.ry+=1,x=>x.rings[0].geometry.type='ellipse',x=>x.rings[0].path=[],x=>x.cells[0].x+=2,x=>x.cells[0].x=NaN,x=>x.rings[0].cells.reverse(),x=>x.rings[1].geometry={...x.rings[0].geometry},x=>x.rings[0].cells.pop()]){const bad=structuredClone(t);mutate(bad);assert.equal(validateCircleGeometryV3(bad).valid,false);}
 for(const value of [null,{},[],{cells:[],rings:[]}])assert.equal(validateCircleGeometryV3(value).valid,false);
});
test('Deterministic generation and explicit impossible-circle rejection',()=>{
 assert.deepEqual(makeCircleTopologyV3({ringCount:5,intersections:13,variant:17}),makeCircleTopologyV3({ringCount:5,intersections:13,variant:17}));
 assert.throws(()=>makeCircleTopologyV3({ringCount:2,intersections:3}));assert.throws(()=>makeCircleTopologyV3({ringCount:5,intersections:2}));assert.throws(()=>makeCircleTopologyV3({ringCount:3,intersections:7}));
});

test('Low-count networks include genuine all-tangent multi-neighbor circuits',()=>{
 for(const n of [3,4,5]){const t=makeCircleTopologyV3({ringCount:n,intersections:n,variant:0,family:n===3?'triangle':'circuit'}),a=validateCircleGeometryV3(t);assertTopology(t,n,n);assert.equal(a.tangencies,n);assert.ok(a.pairMatrix.every(row=>row.filter(Boolean).length===2));assert.equal(t.family,n===3?'triangle':'circuit');}
});
test('Near-parallel proper crossings are distinguished from intentional tangencies',()=>{
 assert.ok(circleCrossingAngle(circle(0,0,100),circle(10,0,100))<20);
 assert.ok(circleCrossingAngle(circle(0,0,100),circle(140,0,100))>20);
 const t=makeCircleTopologyV3({ringCount:3,intersections:5,variant:22});assert.ok(validateCircleGeometryV3(t).minimumCrossingAngle>=20);
});

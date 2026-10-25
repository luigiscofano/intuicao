import test from 'node:test';
import assert from 'node:assert/strict';
import {makeTopologyV2,makeCrossingTopologyV2,makeNestedTopologyV2,makePetalTopologyV2,validateGeometryV2} from '../dist/orbita/topology-v2.mjs';
function check(t,n,k){
 const v=validateGeometryV2(t);assert.equal(v.valid,true,JSON.stringify(v));assert.equal(v.intersections,k);assert.equal(t.rings.length,n);
 assert.ok(t.cells.length<=80);assert.ok(t.rings.every(r=>r.cells.length>=3&&r.cells.length<=32));
 assert.ok(t.cells.every(c=>c.rings.length<=2));assert.ok(v.minimumCellDistance>=75.99);assert.ok(v.minimumCellRailClearance>=32.99);assert.ok(v.minimumRailClearance>=8);
 for(const r of t.rings)assert.deepEqual(r.path.filter(p=>p.cell).map(p=>p.cell),r.cells);
 assert.ok(t.layout.width<16384&&t.layout.height<16384);
}
test('All supported ring/encounter ranges produce certified, connected physical rails',()=>{
 for(let n=2;n<=5;n++)for(let k=Math.max(2,n-1);k<=(n===2?5:14);k++)for(let variant=0;variant<30;variant++)check(makeTopologyV2({ringCount:n,intersections:k,variant}),n,k);
});
test('True transverse braids include exact odd encounters via isolated marked tangencies',()=>{
 for(let k=2;k<=5;k++)for(let variant=0;variant<30;variant++)check(makeCrossingTopologyV2({intersections:k,variant}),2,k);
});
test('Genuinely nested internal loops and separate exterior satellites',()=>{
 for(let n=2;n<=5;n++)for(let k=n;k<=n+3;k++)for(let variant=0;variant<15;variant++)check(makeNestedTopologyV2({ringCount:n,intersections:k,variant}),n,k);
});
test('Validator rejects unmarked visual crossing, moved markers, overlaps and close houses',()=>{
 const base=makeCrossingTopologyV2({intersections:4,variant:3});
 const moved=structuredClone(base);moved.cells[0].x+=9;assert.equal(validateGeometryV2(moved).valid,false);
 const unmarked=structuredClone(base);const shared=unmarked.cells.find(c=>c.rings.length===2);const r=unmarked.rings[1];r.path.find(p=>p.cell===shared.id).cell='fake';assert.equal(validateGeometryV2(unmarked).valid,false);
 const overlap=structuredClone(base);overlap.rings[1].path=structuredClone(overlap.rings[0].path);overlap.rings[1].cells=[...overlap.rings[0].cells];assert.ok(validateGeometryV2(overlap).errors.includes('Overlapping rails'));
 const order=structuredClone(base);order.rings[0].cells.reverse();assert.ok(validateGeometryV2(order).errors.includes('Rail markers disagree with cyclic engine order'));
});
test('Geometry construction is deterministic and rejects disconnected impossible requests',()=>{
 assert.deepEqual(makeTopologyV2({ringCount:5,intersections:14,variant:621}),makeTopologyV2({ringCount:5,intersections:14,variant:621}));
 assert.throws(()=>makeTopologyV2({ringCount:5,intersections:2}));assert.throws(()=>makeTopologyV2({ringCount:2,intersections:7}));
});

test('Untrusted paths reject nonfinite coordinates, malformed markers and oversized arrays without throwing',()=>{
 const t=makeTopologyV2({ringCount:3,intersections:4,variant:4});
 for(const value of [null,{},[],{cells:[],rings:[]}])assert.equal(validateGeometryV2(value).valid,false);
 for(const mutation of [x=>x.rings[0].path[0].x=NaN,x=>x.rings[0].path[0].x='0 onclick=x',x=>x.rings[0].path.push(...Array(300).fill({x:0,y:0})),x=>x.rings[0].path[0].cell='missing',x=>x.rings[0].path[0].x=-1]){const bad=structuredClone(t);mutation(bad);assert.equal(validateGeometryV2(bad).valid,false);}
});

test('Circular clover and unequal pinwheel petals have exact six/eight doors and compact bounds',()=>{
 const families=new Set();
 for(const ringCount of [3,4])for(let variant=0;variant<100;variant++){const t=makePetalTopologyV2({ringCount,variant});check(t,ringCount,ringCount*2);assert.ok(Math.max(t.layout.width,t.layout.height)<=1200);families.add(t.family);assert.ok(t.rings.every(r=>r.path.length>=48));}
 assert.deepEqual([...families].sort(),['clover','pinwheel']);
 assert.throws(()=>makePetalTopologyV2({ringCount:5}));
});

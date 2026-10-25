import test from 'node:test';import assert from 'node:assert/strict';
import {createOrderedBraidTopology} from '../dist/orbita/topology-braid-order.mjs';import {validateGeometryV2} from '../dist/orbita/topology-v2.mjs';
function canonicalCycle(a){return [a,[...a].reverse()].flatMap(x=>x.map((_,i)=>[...x.slice(i),...x.slice(0,i)].join(','))).sort()[0];}
test('six transverse contacts support genuinely different non-dihedral encounter orders',()=>{
 for(let variant=0;variant<40;variant++){
  const l=createOrderedBraidTopology({variant}),g=validateGeometryV2(l);assert.equal(g.valid,true,JSON.stringify(g));assert.equal(g.intersections,6);
  const [a,b]=l.rings.map(r=>r.cells.filter(c=>c.startsWith('j')));assert.notEqual(canonicalCycle(a),canonicalCycle(b));
  assert.ok(l.layout.width<=1100&&l.layout.height<=1100);
 }
});

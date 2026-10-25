import test from 'node:test';
import assert from 'node:assert/strict';
import {CATALOG} from '../dist/orbita/catalog.mjs';
import {graphRouteEvidence,referencePermutationEvidence,commandAblationEvidence} from '../dist/orbita/design-evidence.mjs';
import {replay} from '../dist/orbita/engine.mjs';
import {distinctLevel,move} from './orbita-engine-fixtures.mjs';
test('reference commutator certifies exactly three moved identities',()=>{
 const e=referencePermutationEvidence(distinctLevel(),[move('A'),move('B'),move('A',-1),move('B',-1)]);assert.equal(e.valid,true);assert.equal(e.solved,false);assert.equal(e.supportSize,3);assert.equal(e.cycles.length,1);assert.equal(e.cycles[0].length,3);assert.ok(e.localizedCertificates.length);
});
test('all simple paths count multiple ports without inventing legal-transfer proofs',()=>{
 const graph={rings:[{id:'A',cells:['ab1','ab2','ac']},{id:'B',cells:['ab1','ab2','bc']},{id:'C',cells:['ac','bc','c']}]};
 const e=graphRouteEvidence(graph),ab=e.pairs.find(p=>p.from==='A'&&p.to==='B');assert.equal(ab.simpleRingPaths,2);assert.equal(ab.portDistinctRoutes,3);assert.equal(e.pairsWithAlternativeRoutes,3);
});
test('ablation budget stays inconclusive, exhaustive restriction can establish necessity',()=>{
 const limited=commandAblationEvidence(CATALOG[9],{maxDepth:0,maxStates:1});assert.ok(limited.commands.every(c=>c.status==='inconclusive'&&!c.necessityProven));
 const single=commandAblationEvidence(CATALOG[0]);assert.equal(single.commands[0].status,'unreachable-without-command');assert.equal(single.commands[0].necessityProven,true);
 const tutorial=commandAblationEvidence(CATALOG[4]);const found=tutorial.commands.filter(c=>c.status==='solved');assert.ok(found.length);for(const row of found)assert.ok(replay(CATALOG[4],row.solution).solved);
});
test('invalid certificate is not assigned a permutation proof',()=>{
 assert.equal(referencePermutationEvidence(CATALOG[0],[{command:'absent',direction:1}]).valid,false);
});

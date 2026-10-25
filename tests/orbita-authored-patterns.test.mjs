import test from 'node:test';
import assert from 'node:assert/strict';
import {RULES_VERSION,replay} from '../dist/orbita/engine.mjs';
import {distinctLevel,move} from './orbita-engine-fixtures.mjs';
import {reserveMemoryEvidence,bottleneckEvidence,findLocalizedCommutator} from '../dist/orbita/authored-patterns.mjs';
function fixture(rings){const ids=[...new Set(rings.flatMap(r=>r.cells))];return {id:'evidence',version:1,rulesVersion:RULES_VERSION,cells:ids.map(id=>({id})),rings:rings.map(r=>({...r,step:1})),pieceTypes:ids.map(id=>({id,symbol:id})),initial:Object.fromEntries(ids.map(id=>[id,id])),targets:{[ids[0]]:ids[0]},commands:rings.map(r=>({id:r.id,turns:[{ring:r.id,delta:1}],requires:[]})),solution:[]};}
test('two-door reserve witness requires two moves elsewhere while token stays stored',()=>{
 const level=fixture([{id:'A',cells:['J','a','K','b']},{id:'B',cells:['J','X','K','Y']}]);
 level.solution=[move('A'),move('B'),move('A'),move('A'),move('B'),move('A')];
 const evidence=reserveMemoryEvidence(level),witness=evidence.witnesses.find(w=>w.ring==='B'&&w.token==='a');assert.ok(witness);assert.equal(witness.heldDuringOtherMoves,2);assert.deepEqual(witness.doors,['J','K']);assert.equal(witness.entryMove,1);assert.equal(witness.exitMove,4);
 level.solution=[move('A'),move('B'),move('A'),move('B')];assert.equal(reserveMemoryEvidence(level).witnesses.length,0);
});
test('two disjoint corridors and exact vertex cuts are not called observed without a trace',()=>{
 const level=fixture([{id:'A',cells:['AB','AC','a']},{id:'B',cells:['AB','BD','b']},{id:'C',cells:['AC','CD','c']},{id:'D',cells:['BD','CD','d']}]);
 const evidence=bottleneckEvidence(level);assert.equal(evidence.articulations.length,0);assert.equal(evidence.twoRingCuts.length,2);assert.ok(evidence.corridors.length>=2);assert.equal(evidence.multipleBottleneckWitness,null);
});
test('articulation evidence identifies the unique intermediate ring',()=>{
 const level=fixture([{id:'A',cells:['AB','a','aa']},{id:'B',cells:['AB','BC','b']},{id:'C',cells:['BC','c','cc']}]);
 assert.deepEqual(bottleneckEvidence(level).articulations.map(x=>x.ring),['B']);
});
test('localized commutator has exactly three changed distinct tokens and legal moves',()=>{
 const level=distinctLevel(),e=findLocalizedCommutator(level);assert.ok(e);assert.equal(e.supportSize,3);const result=replay(level,[...e.prefix,...e.moves]);assert.equal(result.valid,true);assert.equal(level.cells.filter(c=>result.state.occupancy[c.id]!==level.initial[c.id]).length,3);
});

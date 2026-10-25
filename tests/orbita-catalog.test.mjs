import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMPAIGN} from '../dist/orbita/campaign.mjs';
import {validateLevel,initialState,isWon,replay,createEngine} from '../dist/orbita/engine.mjs';
import {levelSignature,topologySignature,describeReplay,shortSolutionSearch} from '../dist/orbita/generator.mjs';

test('1000 complete definitions are valid, unsolved initially, and replay to their stated targets',()=>{
 assert.equal(CAMPAIGN.length,1000);
 for(const [index,level]of CAMPAIGN.entries()){
  assert.equal(level.id,index+1);assert.deepEqual(validateLevel(level),{valid:true,errors:[]});
  assert.equal(isWon(level,initialState(level)),false,'Already solved '+level.id);
  const result=replay(level,level.solution);assert.equal(result.valid,true);assert.equal(result.solved,true,'Replay '+level.id);
  assert.ok(level.name&&level.discovery&&level.hints.length>=2&&level.concepts.length);assert.ok(level.layout.width>0&&level.layout.height>0);
  assert.deepEqual(describeReplay(level),level.validation.trace,'Trace '+level.id);
 }
});

test('campaign preserves early bands and expands intermediate-or-higher definitions without new basic tutorials',()=>{
 assert.deepEqual([0,1].map(d=>CAMPAIGN.filter(l=>l.difficulty===d).length),[50,150]);
 assert.ok(CAMPAIGN.slice(200).every(l=>l.difficulty>=2));
 assert.ok(CAMPAIGN.some(l=>l.rings.length===5));
 for(const l of CAMPAIGN){for(const rule of l.specialRules){if(rule.kind==='step')assert.ok(l.id>=301);if(rule.kind==='gear')assert.ok(l.id>=351);if(rule.kind==='sensor')assert.ok(l.id>=401);}}
});

test('first ten teach the specified progression and the seven-house example has shortest length four',()=>{
 assert.deepEqual(CAMPAIGN.slice(0,4).map(l=>l.rings.length),[1,1,1,1]);
 assert.deepEqual(CAMPAIGN.slice(4,10).map(l=>l.rings.length),[2,2,2,2,2,2]);
 const example=CAMPAIGN[9];assert.equal(example.cells.length,7);
 assert.deepEqual(example.solution,[{command:'B',direction:1},{command:'A',direction:1},{command:'B',direction:1},{command:'A',direction:-1}]);
 const search=shortSolutionSearch(example,{maxDepth:4,maxStates:100000});assert.equal(search.distance,4);assert.equal(search.optimal,true);
 assert.equal(example.initial.Abaixo,'2');assert.equal(replay(example,example.solution).state.occupancy.Abaixo,'2');assert.ok(example.validation.trace.restoredTargets>=1);
});

test('canonical dedup ignores identifiers, labels, drawing scale, circular starts and mirror orientation',()=>{
 for(const source of [CAMPAIGN[9],CAMPAIGN[241],CAMPAIGN[351],CAMPAIGN[499]]){
  const level=structuredClone(source),cellMap=new Map(level.cells.map((c,i)=>[c.id,'position-'+(100-i)])),ringMap=new Map(level.rings.map((r,i)=>[r.id,'track-'+(10-i)])),typeMap=new Map(level.pieceTypes.map((t,i)=>[t.id,'symbol-'+(20-i)]));
  level.cells=level.cells.reverse().map(c=>({...c,id:cellMap.get(c.id),x:c.x*2+75,y:-c.y*2}));
  level.initial=Object.fromEntries(Object.entries(level.initial).reverse().map(([id,type])=>[cellMap.get(id),typeMap.get(type)]));
  level.targets=Object.fromEntries(Object.entries(level.targets).reverse().map(([id,type])=>[cellMap.get(id),typeMap.get(type)]));
  level.pieceTypes=level.pieceTypes.reverse().map(t=>({...t,id:typeMap.get(t.id),symbol:t.symbol==='·'?'·':'shape-'+t.symbol}));
  level.rings=level.rings.reverse().map(r=>{const ids=r.cells.map(id=>cellMap.get(id)).reverse();return {...r,id:ringMap.get(r.id),cells:[...ids.slice(2),...ids.slice(0,2)]};});
  level.commands=level.commands.reverse().map((c,i)=>({...c,id:'command-'+i,turns:c.turns.map(t=>({...t,ring:ringMap.get(t.ring)})),requires:c.requires.map(r=>({cell:cellMap.get(r.cell),type:typeMap.get(r.type)}))}));
  assert.equal(levelSignature(level),levelSignature(source),'canonical '+source.id);
  const inverted=structuredClone(source);inverted.commands[0].turns.forEach(turn=>turn.delta=-turn.delta);
  assert.equal(levelSignature(inverted),levelSignature(source),'same action set '+source.id);
 }
 const signatures=CAMPAIGN.slice(0,200).map(levelSignature);assert.equal(new Set(signatures).size,199);assert.equal(signatures[0],signatures[1]);
 for(let i=10;i<signatures.length;i++)assert.equal(signatures.indexOf(signatures[i]),i,'Duplicate '+(i+1));
});

test('all special actions preserve availability of their immediate inverse, including combined rules',()=>{
 for(const level of CAMPAIGN.filter(l=>l.specialRules.length)){
  const engine=createEngine(level);let state=engine.initialState();
  for(const action of level.solution){const before=state,tr=engine.transition(state,action);assert.equal(tr.allowed,true);const inverse=engine.transition(tr.state,{...action,direction:-action.direction});assert.equal(inverse.allowed,true);assert.deepEqual(inverse.state.occupancy,before.occupancy);state=tr.state;}
 }
});

test('rebuilt levels replace old advanced introductions with nontrivial multi-command relationships',()=>{
 for(const level of CAMPAIGN.slice(200)){assert.ok(level.solution.length>=3);assert.ok(new Set(level.solution.map(m=>m.command)).size>=2);const search=shortSolutionSearch(level,{maxDepth:2,maxStates:10000});assert.equal(search.found,false,'Trivial advanced '+level.id);}
});

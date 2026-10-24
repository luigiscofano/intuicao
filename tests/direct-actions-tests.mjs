import assert from 'node:assert/strict';
import {applyDirectAction as apply,protectedPrumoCells,cycleSymbol,SYMBOL_CYCLE} from '../dist/direct-actions.mjs';
import {eloEdges} from '../dist/geometry-games.mjs';
import {createHistory,commitHistory,undoHistory,redoHistory} from '../dist/collection-state.mjs';
let count=0;
function test(name,run){run();count++;console.log('PASS',name);}
const elo={game:'elo',rows:2,cols:4,regions:[0,0,1,1,2,2,3,3],fixed:{0:0}};
const es=()=>({positions:[0,2,4,6],discarded:[],candidates:[]});
const prumo={game:'prumo',rows:3,cols:4,supports:[{x2:0,y2:0},{x2:3,y2:2},{x2:6,y2:3}]};
const ps=()=>({assignments:Array(12).fill(-1),discarded:[],candidates:[]});
const pacto={game:'pacto',rows:8,cols:8,clues:[0,...Array(63).fill(-1)]};
const ss=()=>({values:pacto.clues.slice(),candidates:Array.from({length:64},()=>[])});
test('ELO move/toggle is atomic and clears target annotation',()=>{
 const s=es();s.discarded=[3];const moved=apply('elo',elo,s,{type:'point',cell:3});
 assert.deepEqual(moved.positions,[0,3,4,6]);assert.deepEqual(moved.discarded,[]);assert.deepEqual(s.positions,[0,2,4,6]);
 assert.equal(apply('elo',elo,moved,{type:'point',cell:3}).positions[1],-1);
});
test('ELO fixed regions permit annotations but never move fixed points',()=>{
 const s=es();for(const type of ['point','place-point','clear','move-point','discard'])assert.deepEqual(apply('elo',elo,s,{type,cell:0,from:0}),s);
 const annotated=apply('elo',elo,s,{type:'discard',cell:1});assert.deepEqual(annotated.discarded,[1]);
 assert.deepEqual(apply('elo',elo,annotated,{type:'point',cell:1}),annotated);
 assert.deepEqual(apply('elo',elo,annotated,{type:'clear',cell:1}),s);
});
test('ELO discard does not remove points or block connections',()=>{
 const s=es();assert.deepEqual(apply('elo',elo,s,{type:'discard',cell:2}),s);
 const marked=apply('elo',elo,s,{type:'discard',cell:1});assert.deepEqual(eloEdges(elo,marked.positions),eloEdges(elo,s.positions));
 assert.deepEqual(apply('elo',elo,marked,{type:'discard',cell:1,enabled:true}),marked);
 assert.deepEqual(apply('elo',elo,marked,{type:'discard',cell:1,enabled:false}),s);
});
test('ELO drag validates source and same region, idempotent drop',()=>{
 const s=es();assert.deepEqual(apply('elo',elo,s,{type:'move-point',from:2,cell:4}),s);
 assert.deepEqual(apply('elo',elo,s,{type:'move-point',from:3,cell:2}),s);
 assert.deepEqual(apply('elo',elo,s,{type:'move-point',from:2,cell:2}),s);
 assert.equal(apply('elo',elo,s,{type:'move-point',from:2,cell:3}).positions[1],3);
 assert.deepEqual(apply('elo',elo,s,{type:'place-point',cell:2}),s);
 assert.notDeepEqual(eloEdges(elo,apply('elo',elo,s,{type:'move-point',from:2,cell:3}).positions),eloEdges(elo,s.positions));
});
test('PRUMO initializes center and horizontal/vertical support incidents',()=>{
 assert.deepEqual([...protectedPrumoCells(prumo)],[[0,0],[5,1],[6,1],[7,2],[11,2]]);
 const s=apply('prumo',prumo,ps(),{type:'initialize'});
 for(const [cell,value] of protectedPrumoCells(prumo)){
  assert.equal(s.assignments[cell],value);
  for(const type of ['toggle','paint','erase'])assert.deepEqual(apply('prumo',prumo,s,{type,cell,value:(value+1)%3}),s);
 }
});
test('PRUMO toggles active color, overwrites other colors, requires selection',()=>{
 const s=ps();assert.deepEqual(apply('prumo',prumo,s,{type:'toggle',cell:1,value:-1}),s);
 const painted=apply('prumo',prumo,s,{type:'toggle',cell:1,value:0});assert.equal(painted.assignments[1],0);
 assert.deepEqual(apply('prumo',prumo,painted,{type:'toggle',cell:1,value:0}),s);
 assert.equal(apply('prumo',prumo,painted,{type:'toggle',cell:1,value:1}).assignments[1],1);
});
test('PRUMO stroke intent remains stable, filtered erase preserves other colors',()=>{
 let s=ps();for(const cell of [1,2,3,2,1])s=apply('prumo',prumo,s,{type:'paint',cell,value:0});
 assert.deepEqual(s.assignments.slice(1,4),[0,0,0]);s=apply('prumo',prumo,s,{type:'paint',cell:2,value:1});
 for(const cell of [1,2,3,2,1])s=apply('prumo',prumo,s,{type:'erase',cell,value:0});
 assert.deepEqual(s.assignments.slice(1,4),[-1,1,-1]);assert.equal(apply('prumo',prumo,s,{type:'erase',cell:2}).assignments[2],-1);
});
test('PACTO forward/reverse cycle preserves saved canonical symbol ids',()=>{
 assert.deepEqual(SYMBOL_CYCLE,[0,2,1,3]);let s=ss();
 for(const value of [0,2,1,3,-1]){s=apply('pacto',pacto,s,{type:'cycle',cell:1});assert.equal(s.values[1],value);}
 for(const value of [3,1,2,0,-1]){s=apply('pacto',pacto,s,{type:'cycle',cell:1,reverse:true});assert.equal(s.values[1],value);}
 for(const value of [-1,0,1,2,3])assert.equal(cycleSymbol(cycleSymbol(value),true),value);
});
test('PACTO candidates only on empty; values clear notes atomically and are idempotent',()=>{
 const s=ss();const noted=apply('pacto',pacto,s,{type:'candidate',cell:1,value:2});assert.deepEqual(noted.candidates[1],[2]);
 assert.deepEqual(apply('pacto',pacto,noted,{type:'candidate',cell:1,value:2}),s);
 const filled=apply('pacto',pacto,noted,{type:'set',cell:1,value:0});assert.equal(filled.values[1],0);assert.deepEqual(filled.candidates[1],[]);
 assert.deepEqual(apply('pacto',pacto,filled,{type:'set',cell:1,value:0}),filled);
 assert.deepEqual(apply('pacto',pacto,filled,{type:'candidate',cell:1,value:1}),filled);
 assert.deepEqual(apply('pacto',pacto,noted,{type:'clear',cell:1}),s);
 assert.deepEqual(apply('pacto',pacto,filled,{type:'clear',cell:1}),s);
});
test('PACTO fixed clues immune to all commands',()=>{
 const s=ss();for(const type of ['cycle','candidate','set','clear'])assert.deepEqual(apply('pacto',pacto,s,{type,cell:0,value:2,reverse:true}),s);
});
test('One history transaction restores full notes/values and full paint stroke',()=>{
 let s=apply('pacto',pacto,ss(),{type:'candidate',cell:1,value:3});let h=createHistory(s);
 h=commitHistory(h,apply('pacto',pacto,s,{type:'set',cell:1,value:0}));assert.deepEqual(undoHistory(h).present,s);assert.deepEqual(redoHistory(undoHistory(h)).present,h.present);
 s=ps();h=createHistory(s);let next=s;for(const cell of [1,2,3])next=apply('prumo',prumo,next,{type:'paint',cell,value:1});
 h=commitHistory(h,next);assert.equal(h.past.length,1);assert.deepEqual(undoHistory(h).present,s);
});
test('Invalid cells/actions and unsupported games remain cloned no-ops',()=>{
 const s=ss();for(const cell of [-1,64,1.5,undefined])assert.deepEqual(apply('pacto',pacto,s,{type:'clear',cell}),s);
 for(const value of [-1,4,NaN])assert.deepEqual(apply('pacto',pacto,s,{type:'set',cell:1,value}),s);
 const next=apply('nexo',pacto,s,{type:'cycle',cell:1});assert.deepEqual(next,s);assert.notEqual(next,s);assert.notEqual(next.values,s.values);
});
console.log(`${count} direct-action tests passed.`);

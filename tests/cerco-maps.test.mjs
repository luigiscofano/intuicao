import test from 'node:test';
import assert from 'node:assert/strict';
import {CERCO_MAPS,getCercoMap,createCerco,cercoNeighbors,legalCercoMoves,applyCercoMove,previewCercoMove,undoCerco,redoCerco,resetCerco,rematchCerco,restoreCerco,serializeCerco} from '../dist/cerco/engine.mjs';
import {chooseCercoMove} from '../dist/cerco/bot.mjs';
const clone=x=>structuredClone(x);
test('seven curated maps: immutable, distinct, connected, rotation-symmetric and all six pieces initially mobile',()=>{
 assert.equal(CERCO_MAPS.length,7);assert.equal(new Set(CERCO_MAPS.map(m=>JSON.stringify([m.walls,m.outside]))).size,7);
 for(const m of CERCO_MAPS){
  assert(Object.isFrozen(m.starts[0]));assert.equal(getCercoMap(m.id),m);assert.equal(m.rows,5);assert.equal(m.cols,5);
  const blocked=[...m.walls,...m.outside];assert.equal(new Set(blocked).size,blocked.length);
  assert(blocked.every(c=>Number.isInteger(c)&&c>=0&&c<25));assert.deepEqual([...blocked].sort((a,b)=>a-b),blocked.map(c=>24-c).sort((a,b)=>a-b));
  assert.deepEqual(m.starts[0].map(c=>24-c).sort((a,b)=>a-b),[...m.starts[1]].sort((a,b)=>a-b));
  const s=createCerco(0,m.id),playable=s.board.flatMap((v,c)=>!['wall','outside'].includes(v)?[c]:[]),seen=new Set([playable[0]]),queue=[playable[0]];
  for(let i=0;i<queue.length;i++)for(const n of cercoNeighbors(queue[i],m))if(playable.includes(n)&&!seen.has(n)){seen.add(n);queue.push(n);}
  assert.equal(seen.size,playable.length,m.id+' connected');
  assert.equal(m.maxMoves,s.board.filter(v=>v===null).length);
  for(const p of [0,1]){assert.equal(s.board.filter(v=>v===p).length,3);for(const c of m.starts[p])assert(legalCercoMoves(s,p).some(move=>move.from===c),m.id+' mobile '+c);}
 }
 assert.equal(getCercoMap('missing'),null);assert.throws(()=>createCerco(0,'missing'));
 for(const invalid of [null,0,false,[],{mapId:null},{mapId:undefined},{mapId:''}]){assert.equal(getCercoMap(invalid),null);assert.throws(()=>createCerco(0,invalid));}
 assert.equal(getCercoMap(),CERCO_MAPS[0]);assert.equal(getCercoMap({board:[]}),CERCO_MAPS[0]);
});
test('map dimensions prevent row wrapping and default retains classic neighbors',()=>{
 assert.deepEqual(cercoNeighbors(4),[9,3]);assert.deepEqual(cercoNeighbors(3,{rows:3,cols:4}),[7,2]);
 assert.deepEqual(cercoNeighbors(11,{rows:3,cols:4}),[7,10]);assert.deepEqual(cercoNeighbors(12,{rows:3,cols:4}),[]);
});
test('legacy classic save remains exact, including undone future, subsequent moves, reset and rematch',()=>{
 let s=createCerco();delete (s=clone(s)).mapId;delete s.mapVersion;
 const initial=clone(s);s=applyCercoMove(s,{from:2,to:7}).state;
 s=undoCerco(s);assert.deepEqual(restoreCerco(JSON.stringify(s)),s);assert(!Object.hasOwn(redoCerco(s),'mapId'));assert.deepEqual(resetCerco(s),initial);
 while(!s.over)s=applyCercoMove(s,legalCercoMoves(s)[0]).state;
 assert(!Object.hasOwn(rematchCerco(s),'mapId'));assert.deepEqual(restoreCerco(serializeCerco(s)),s);
});
test('canonical replay rejects altered maps, versions, permanent cells, outside movement and impossible futures',()=>{
 for(const m of CERCO_MAPS){
  const s=createCerco(0,m.id);
  for(const alter of [x=>x.mapId='unknown',x=>x.mapVersion=99,x=>delete x.mapVersion,x=>x.history=Array(m.maxMoves+1).fill({from:0,to:1}),x=>x.board[m.walls[0]??m.outside[0]??0]=null]){
   const bad=clone(s);alter(bad);assert.equal(restoreCerco(bad),null,m.id);
  }
  for(const to of [...m.walls,...m.outside])assert.throws(()=>applyCercoMove(s,{from:m.starts[0][0],to}));
  assert.equal(restoreCerco({...s,future:[{from:0,to:24}]}),null);
 }
});
test('2800 deterministic games: both starters, finite termination, permanent geometry, pure previews, undo and strict replay',()=>{
 let seed=92;const report={};
 for(const m of CERCO_MAPS){let min=25,max=0,wins=[0,0];
  for(let game=0;game<400;game++){let s=createCerco(game%2,m.id);
   while(!s.over){const moves=legalCercoMoves(s);assert(moves.length);seed=(Math.imul(seed,1664525)+1013904223)>>>0;const move=moves[seed%moves.length],before=JSON.stringify(s),p=previewCercoMove(s,move);assert.equal(JSON.stringify(s),before);s=applyCercoMove(s,move).state;assert.deepEqual(s,p.state);
    assert.equal(s.board.filter(v=>v===0).length,3);assert.equal(s.board.filter(v=>v===1).length,3);assert.equal(s.board.filter(v=>v==='barrier').length,s.turn);assert.equal(s.board.filter(v=>v===null).length,m.maxMoves-s.turn);
    assert(s.turn<=m.maxMoves);for(const c of m.walls)assert.equal(s.board[c],'wall');for(const c of m.outside)assert.equal(s.board[c],'outside');
    if(game<4)assert.deepEqual(redoCerco(undoCerco(s)),s);
   }
   assert.equal(legalCercoMoves({...s,over:false}).length,0);wins[s.winner]++;min=Math.min(min,s.turn);max=Math.max(max,s.turn);
   assert.deepEqual(restoreCerco(serializeCerco(s)),s);assert.deepEqual(resetCerco(s),createCerco(s.starter,m.id));assert.deepEqual(rematchCerco(s),createCerco(1-s.starter,m.id));
  }assert(wins.every(n=>n>0));report[m.id]={games:400,min,max,limit:m.maxMoves,wins};
 }console.log('CERCO map certificates:',JSON.stringify(report));
});
test('bots at every difficulty return legal moves on all maps and both starters',()=>{
 for(const m of CERCO_MAPS)for(const starter of [0,1])for(const difficulty of ['beginner','intermediate','strong']){
  let s=createCerco(starter,m.id);for(let ply=0;ply<4&&!s.over;ply++){const result=chooseCercoMove(s,{difficulty,nodeBudget:512,depth:2,seed:ply});assert(legalCercoMoves(s).some(move=>move.from===result.move.from&&move.to===result.move.to));s=applyCercoMove(s,result.move).state;}
 }
});

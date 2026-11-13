import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {BROTO_MAPS,getBrotoMapsForSize,getBrotoMapVariant} from '../dist/broto/maps.mjs';
import * as b from '../dist/broto/engine.mjs';
import * as c from '../dist/cerco/engine.mjs';
import {chooseCercoMove} from '../dist/cerco/bot.mjs';
const neighbors=(cell,m)=>[-m.cols,m.cols,-1,1].map(d=>cell+d).filter(n=>n>=0&&n<m.rows*m.cols&&Math.abs(n%m.cols-cell%m.cols)+Math.abs(Math.floor(n/m.cols)-Math.floor(cell/m.cols))===1);
for(const [name,maps] of [['Broto',BROTO_MAPS],['Cerco',c.CERCO_MAPS]])test(`${name}: geometrias únicas, conectadas, simétricas e imutáveis`,()=>{
 const shapes=new Set();
 for(const m of maps){
  const blocked=new Set([...m.walls,...m.outside]),n=m.rows*m.cols;
  const shape=JSON.stringify([m.rows,[...m.walls].sort((a,b)=>a-b),[...m.outside].sort((a,b)=>a-b)]);
  assert(!shapes.has(shape),m.id);shapes.add(shape);
  assert(Object.isFrozen(m));assert(m.rows<=8&&m.cols<=8);
  assert.equal(blocked.size,m.walls.length+m.outside.length);
  for(const cell of blocked){assert(cell>=0&&cell<n);assert(blocked.has(n-1-cell),m.id);}
  const first=Array.from({length:n},(_,i)=>i).find(i=>!blocked.has(i));const visited=new Set([first]),queue=[first];
  for(let i=0;i<queue.length;i++)for(const next of neighbors(queue[i],m))if(!blocked.has(next)&&!visited.has(next)){visited.add(next);queue.push(next);}
  assert.equal(visited.size,n-blocked.size,m.id);
  if(name==='Broto')assert(m.playableCount>=16);
  else for(const p of [0,1])for(const cell of m.starts[p])assert(c.legalCercoMoves(c.createCerco(p,m.id),p).some(move=>move.from===cell),m.id);
 }
});
test('mapas antigos permanecem idênticos por dados serializados',async()=>{
 for(const name of ['broto','cerco']){
  const previous = JSON.parse(readFileSync(new URL(`./fixtures/maps-legacy-${name}.json`, import.meta.url), 'utf8'));
  const key=name==='broto'?'BROTO_MAPS':'CERCO_MAPS';const current=name==='broto'?BROTO_MAPS:c.CERCO_MAPS;
  for(const map of previous)assert.deepEqual(current.find(m=>m.id===map.id),map);
 }
});
let seed=112613;const random=()=>seed=(Math.imul(seed,1664525)+1013904223)>>>0;
test('Broto: 1560 duelos completos, 49920 plantios, replay e histórico',()=>{
 for(const map of BROTO_MAPS)for(const starter of[0,1])for(let trial=0;trial<20;trial++){
  let state=b.createBroto(starter,map.id);
  for(let round=1;round<=2;round++){
   while(!state.roundOver){const moves=b.legalBrotoMoves(state);assert(moves.length);state=b.applyBrotoMove(state,moves[random()%moves.length]).state;}
   assert.equal(state.turn,16);if(round===1)state=b.nextBrotoRound(state);
  }
  assert(state.duelOver);assert.deepEqual(b.restoreBroto(b.serializeBroto(state)),state);
  assert.deepEqual(b.redoBroto(b.undoBroto(state)),state);
 }
});
test('Cerco: 1600 partidas completas, replay, histórico e conservação',()=>{
 for(const map of c.CERCO_MAPS)for(const starter of[0,1])for(let trial=0;trial<20;trial++){
  let state=c.createCerco(starter,map.id);
  while(!state.over){const moves=c.legalCercoMoves(state);assert(moves.length);state=c.applyCercoMove(state,moves[random()%moves.length]).state;assert(state.turn<=map.maxMoves);}
  assert.deepEqual(c.restoreCerco(c.serializeCerco(state)),state);assert.deepEqual(c.redoCerco(c.undoCerco(state)),state);
  assert.equal(state.board.filter(x=>x===0).length,3);assert.equal(state.board.filter(x=>x===1).length,3);
 }
});
test('Cerco: IA legal em todas as geometrias e dificuldades, orçamento preservado',()=>{
 for(const map of c.CERCO_MAPS)for(const difficulty of['beginner','intermediate','strong']){
  const state=c.createCerco(0,map.id),result=chooseCercoMove(state,{difficulty});
  assert(c.legalCercoMoves(state).some(m=>JSON.stringify(m)===JSON.stringify(result.move)),map.id);
  assert(result.nodes<=result.nodeBudget);
 }
});
test('Broto: tamanhos e fallback preservam escolha válida',()=>{
 for(const size of[4,5,6,7,8]){assert(getBrotoMapsForSize(size).length);for(const map of BROTO_MAPS)assert.equal(getBrotoMapVariant(map.id,size).rows,size);}
 assert.equal(getBrotoMapVariant('classic',9),null);
});

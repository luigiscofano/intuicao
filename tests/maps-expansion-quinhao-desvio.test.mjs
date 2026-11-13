import test from 'node:test';
import assert from 'node:assert/strict';
import * as quinhao from '../dist/versus/games/quinhao/engine.mjs';
import { QUINHAO_MAPS, getQuinhaoMap } from '../dist/versus/games/quinhao/maps.mjs';
import { game as quinhaoGame } from '../dist/versus/games/quinhao/index.mjs';
import { chooseMove } from '../dist/versus/search.mjs';
import { createSession, applySessionMove, serializeSession, restoreSession, travelHistory } from '../dist/versus/session.mjs';
import * as desvio from '../dist/desvio.mjs';

function canonicalRing(fruits) {
  const permutations = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
  const variants = [];
  for (const permutation of permutations) {
    const mapped = fruits.map(fruit => permutation[fruit]);
    for (const ring of [mapped, [...mapped].reverse()]) {
      for (let offset = 0; offset < 24; offset++) variants.push([...ring.slice(offset), ...ring.slice(0,offset)].join(''));
    }
  }
  return variants.sort()[0];
}

function canonicalArrows(map) {
  const variants = [];
  for (let transpose=0;transpose<2;transpose++) for(let reverseRows=0;reverseRows<2;reverseRows++) for(let reverseCols=0;reverseCols<2;reverseCols++) {
    const rows=transpose?map.cols:map.rows, cols=transpose?map.rows:map.cols;
    const arrows=Array(rows*cols);
    map.arrows.forEach((arrow, cell) => {
      let row=Math.floor(cell/map.cols), col=cell%map.cols;
      if(transpose) [row,col]=[col,row];
      if(reverseRows) row=rows-1-row;
      if(reverseCols) col=cols-1-col;
      arrows[row*cols+col]=transpose?(arrow==='H'?'V':'H'):arrow;
    });
    variants.push(`${rows}x${cols}:${arrows.join('')}`);
  }
  return variants.sort()[0];
}

test('QUINHÃO: 42 distribuições distintas, seis grupos e invariantes do pomar', () => {
  assert.equal(QUINHAO_MAPS.length,42);
  assert.equal(new Set(QUINHAO_MAPS.map(map=>canonicalRing(map.fruits))).size,42);
  const groups=new Map();
  for(const map of QUINHAO_MAPS) {
    assert.equal(map.fruits.length,24);
    assert.deepEqual([0,1,2].map(fruit=>map.fruits.filter(x=>x===fruit).length),[8,8,8]);
    assert.ok(Object.isFrozen(map.fruits));
    groups.set(map.group,(groups.get(map.group)||0)+1);
    const equal=map.fruits.filter((fruit,index)=>fruit===map.fruits[(index+1)%24]).length;
    const diverse=map.fruits.filter((_,index)=>new Set([0,1,2].map(offset=>map.fruits[(index+offset)%24])).size===3).length;
    assert.equal(map.metrics.equalNeighbors,equal);
    assert.equal(map.metrics.diverseOffers,diverse);
    const preview=quinhaoGame.mapPreview(map);
    assert.equal((preview.match(/class="quinhao-map-fruit"/g)||[]).length,24);
  }
  assert.deepEqual([...groups.values()],[7,7,7,7,7,7]);
  assert.throws(()=>getQuinhaoMap({mapId:'inventado'}));
  assert.throws(()=>quinhao.createState({mapId:'classic',mapVersion:2}));
});

test('QUINHÃO: estado clássico, saves e replay mantêm compatibilidade', () => {
  const initial=quinhao.createState();
  assert.equal(initial.mapId,undefined);
  assert.deepEqual(initial.baskets.map(b=>b.fruit),Array.from({length:24},(_,i)=>Math.floor(i%6/2)));
  for(const map of QUINHAO_MAPS) {
    const config={mapId:map.id,mapVersion:map.version};
    let session=createSession(quinhao,config);
    for(let step=0;step<10;step++) session=applySessionMove(quinhao,session,quinhao.getLegalMoves(session.states.at(-1))[step%3]);
    session=travelHistory(session,-1);
    assert.deepEqual(restoreSession(quinhao,serializeSession(session,config)),session);
  }
});

test('QUINHÃO: 1.680 partidas completas conservam frutos e encerram após oito partilhas', () => {
  for(const map of QUINHAO_MAPS) for(let seed=0;seed<40;seed++) {
    let state=quinhao.createState({mapId:map.id});
    while(!state.result) {
      const moves=quinhao.getLegalMoves(state);
      assert.ok(moves.length);
      const previous=JSON.stringify(state);
      const next=quinhao.applyMove(state,moves[(seed*17+state.moveCount*7)%moves.length]);
      assert.equal(JSON.stringify(state),previous);
      state=next;
      for(let fruit=0;fruit<3;fruit++) assert.equal(state.inventories[0][fruit]+state.inventories[1][fruit]+state.baskets.filter(b=>b.fruit===fruit).length,8);
    }
    assert.equal(state.moveCount,16);
    assert.equal(state.round,8);
    assert.deepEqual(state.inventories.map(x=>x.reduce((a,b)=>a+b,0)),[12,12]);
  }
});

test('QUINHÃO: IA legal em todos os mapas e dificuldades, inclusive decisão de oferta', () => {
  for(const map of QUINHAO_MAPS) for(const difficulty of ['beginner','intermediate','strong']) {
    const state=quinhao.createState({mapId:map.id});
    const choice=chooseMove(quinhao,state,difficulty);
    assert.ok(quinhao.getLegalMoves(state).some(move=>JSON.stringify(move)===JSON.stringify(choice.move)));
    const offered=quinhao.applyMove(state,choice.move);
    const reply=chooseMove(quinhao,offered,difficulty);
    assert.ok(offered.offer.includes(reply.move.basket));
  }
});

test('DESVIO: 42 mapas únicos, seis formatos, IDs legados preservados e até 16 casas', () => {
  assert.equal(desvio.DESVIO_MAPS.length,42);
  assert.deepEqual(desvio.DESVIO_MAPS.slice(0,16).map(m=>m.id),['D-00',...Array.from({length:15},(_,i)=>`D-M${String(i+1).padStart(2,'0')}`)]);
  assert.equal(new Set(desvio.DESVIO_MAPS.map(canonicalArrows)).size,42);
  assert.equal(new Set(desvio.DESVIO_MAPS.map(m=>`${m.rows}x${m.cols}`)).size,6);
  for(const map of desvio.DESVIO_MAPS) {
    assert.ok(map.rows*map.cols<=16);
    assert.equal(map.arrows.length,map.rows*map.cols);
    assert.ok(map.arrows.includes('H')&&map.arrows.includes('V'));
  }
});

test('DESVIO: 3.360 duelos, replay e revanche em todos os formatos', () => {
  for(const map of desvio.DESVIO_MAPS) for(const starter of [0,1]) for(let seed=0;seed<40;seed++) {
    let state=desvio.createDesvio(map,starter);
    while(state.winner===null) {
      const legal=desvio.legalDesvioMoves(map,state);
      assert.ok(legal.length);
      state=desvio.applyDesvioMove(map,state,legal[(seed*13+state.turn*7)%legal.length]);
      assert.ok(state.turn<=map.rows*map.cols);
    }
    assert.deepEqual(desvio.replayDesvio(map,state.history,starter),state);
    assert.equal(desvio.revancheDesvio(map,state).starter,1-starter);
  }
});

// Oráculo independente usa conjuntos e chave textual, não a máscara do motor.
function exactOracle(map) {
  const memo=new Map();
  function solve(remaining,target) {
    const key=remaining.join(',')+'|'+JSON.stringify(target);
    if(memo.has(key))return memo.get(key);
    const allowed=remaining.filter(cell=>!target||(target.axis==='row'?Math.floor(cell/map.cols):cell%map.cols)===target.index);
    const winning=allowed.some(cell=>!solve(remaining.filter(x=>x!==cell),map.arrows[cell]==='H'?{axis:'row',index:Math.floor(cell/map.cols)}:{axis:'col',index:cell%map.cols}));
    memo.set(key,winning);return winning;
  }
  return solve(Array.from({length:map.rows*map.cols},(_,i)=>i),null);
}

test('DESVIO: análise exata confere com oráculo independente e métricas publicadas', () => {
  for(const map of desvio.DESVIO_MAPS) {
    let state=desvio.createDesvio(map);
    const analysis=desvio.analyzeDesvio(map,state);
    assert.equal(analysis.winning,exactOracle(map));
    assert.equal(analysis.perfectWinner,map.metrics.perfectWinner);
    assert.equal(analysis.winningMoves.length,map.metrics.winningOpenings);
    for(const difficulty of ['easy','medium','perfect']) assert.ok(desvio.legalDesvioMoves(map,state).includes(desvio.chooseDesvioBotMove(map,state,difficulty)));
    while(state.winner===null) state=desvio.applyDesvioMove(map,state,desvio.chooseDesvioBotMove(map,state,'perfect'));
    assert.equal(state.winner,analysis.perfectWinner);
    assert.equal(state.turn,map.metrics.perfectPlies);
  }
});

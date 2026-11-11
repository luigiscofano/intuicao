import test from 'node:test';
import assert from 'node:assert/strict';
import { VERSUS_RULE_EXAMPLES as examples } from '../dist/rules-versus-examples.mjs';
import * as enlace from '../dist/versus/games/enlace/engine.mjs';
import * as vazante from '../dist/versus/games/vazante/engine.mjs';
import * as mosaico from '../dist/versus/games/mosaico/engine.mjs';
import * as quinhao from '../dist/versus/games/quinhao/engine.mjs';
import * as estalo from '../dist/versus/games/estalo/engine.mjs';
import * as dobra from '../dist/versus/games/dobra/engine.mjs';
import * as acorde from '../dist/versus/games/acorde/engine.mjs';
import * as lastro from '../dist/versus/games/lastro/engine.mjs';

test('eight complete instructional cards, bounded SVGs and shared animation hooks',()=>{
 assert.deepEqual(Object.keys(examples).sort(),['acorde','dobra','enlace','estalo','lastro','mosaico','quinhao','vazante']);
 for(const [id,entry] of Object.entries(examples)){
  assert.ok(entry.steps.length>=3&&entry.steps.length<=4,id);
  assert.ok(entry.steps.every(step=>step.length>90),id);
  assert.match(entry.steps.join(' '),/empat/i,id);
  assert.ok(entry.description.length>80,id);
  assert.match(entry.svg,/viewBox="0 0 240 140"/,id);
  assert.match(entry.svg,/aria-hidden="true"/,id);
  assert.match(entry.svg,/rpd-action/,id);
  assert.match(entry.svg,/rpd-result/,id);
  assert.match(entry.svg,/>Antes<.*>Depois</s,id);
  assert.doesNotMatch(entry.svg,/<script|<foreignObject|onload=|<animate|setTimeout|setInterval/,id);
  // Final locations are actual geometry; CSS supplies only transient animation.
  assert.doesNotMatch(entry.svg,/transform="/,id);
 }
});

test('ENLACE: A2 elbow adds one lit green node and leaves colors independent',()=>{
 const state=enlace.createState();
 const next=enlace.applyMove(state,{type:'place',center:5,green:6,amber:0});
 assert.deepEqual(enlace.getScores(next),[6,6]);
 assert.equal(next.edges[enlace.getEdgeIndex(5,6)],0);
 assert.equal(next.edges[enlace.getEdgeIndex(5,0)],1);
 assert.equal(state.edges.every(v=>v===null),true);
 assert.equal(next.result,null);
});

test('VAZANTE: mixed local convoy advances together without delivery',()=>{
 const state=vazante.createState();
 state.board.fill(null); state.board[10]=1; state.board[11]=0;
 const next=vazante.applyMove(state,{type:'move',from:11,to:12});
 assert.deepEqual(next.lastMove.convoy,[{from:11,to:12,player:0},{from:10,to:11,player:1}]);
 assert.equal(next.board[10],null); assert.equal(next.board[11],1); assert.equal(next.board[12],0);
 assert.deepEqual(next.delivered,[0,0]);
});

test('MOSAICO: illustrated corner orientations complete a 3–1 green seal',()=>{
 let state=mosaico.createState();
 for(const [cell,orientation] of [[0,2],[1,2],[5,0]]) state=mosaico.applyMove(state,{type:'place',cell,orientation});
 assert.deepEqual(mosaico.getScores(state),[0,0]);
 const next=mosaico.applyMove(state,{type:'place',cell:6,orientation:1});
 const seal=mosaico.getSeals(next)[0];
 assert.deepEqual(seal.colors,[0,0,0,1]);
 assert.equal(seal.owner,0); assert.deepEqual(mosaico.getScores(next),[1,0]);
 assert.equal(next.lastMove.player,1,'rival placement still scores green');
});

test('QUINHÃO: first offer assigns two chestnuts to green and pitanga to amber',()=>{
 const offer=quinhao.applyMove(quinhao.createState(),{type:'offer',start:1});
 assert.deepEqual(offer.offer,[1,2,3]);
 const next=quinhao.applyMove(offer,{type:'choose',basket:3});
 assert.deepEqual(next.inventories,[[2,0,0],[0,1,0]]);
 assert.equal(next.baskets.length,21); assert.equal(next.proposer,1);
 assert.equal(quinhao.scoreInventory([3,2,1]),7,'one trio and one distinct pair');
});

test('ESTALO: unrotated A1 opens the exact pictured six-cell chain',()=>{
 const next=estalo.applyMove(estalo.createState(),{type:'burst',cell:0,turn:0});
 assert.deepEqual(next.lastChain,[0,1,5,6,10,9]);
 assert.deepEqual(next.scores,[4,2]);
 for(const cell of next.lastChain) assert.equal(next.board[cell],null);
 assert.equal(next.result,null);
});

test('DOBRA: first north fold merges the full edge and keeps the A1 seal',()=>{
 const next=dobra.applyMove(dobra.createState(),{type:'fold',cell:0,edge:'north'});
 assert.equal(next.rows,5); assert.equal(next.columns,6);
 assert.equal(next.tiles.reduce((sum,t)=>sum+t.area,0),36);
 assert.deepEqual(next.tiles.slice(0,6).map(t=>t.area),[2,2,2,2,2,2]);
 assert.deepEqual(next.tiles[0].seals,[1,0]); assert.deepEqual(next.reserves,[3,4]);
 assert.equal(dobra.getOwner({area:9,seals:[1,1]}),null);
});

test('ACORDE: B2 wave collection redirects amber to column B',()=>{
 const next=acorde.applyMove(acorde.createState(),{type:'collect',cell:5});
 assert.equal(next.collections[0].onda,1); assert.equal(next.board[5],null);
 assert.equal(next.cursor,5); assert.equal(next.player,1);
 assert.deepEqual(acorde.getLegalMoves(next).map(m=>m.cell),[1,9,13]);
 assert.deepEqual(acorde.getScores(next),[0,0]);
});

test('LASTRO: D2 advancing one mark changes the exact delta from zero to +2',()=>{
 const state=lastro.createState();
 const next=lastro.applyMove(state,{type:'advance',piece:'D2',to:2});
 assert.deepEqual(lastro.getLoads(state),{left:10,right:10,delta:0});
 assert.deepEqual(lastro.getLoads(next),{left:10,right:12,delta:2});
 assert.equal(next.lastMove.deltaAfter,2); assert.equal(next.player,1);
 assert.throws(()=>lastro.applyMove(state,{type:'advance',piece:'D5',to:2}));
});

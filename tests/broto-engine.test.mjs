import test from 'node:test';
import assert from 'node:assert/strict';
import {createBroto,legalBrotoMoves,applyBrotoMove,previewBrotoMove,undoBroto,redoBroto,resetBrotoRound,nextBrotoRound,rematchBroto,restoreBroto,serializeBroto} from '../dist/broto/engine.mjs';
const moves=(cells,s=createBroto())=>cells.reduce((a,c)=>applyBrotoMove(a,c).state,s);
const piece=(owner,h=false,v=false)=>({owner,h,v});
const fixture=pieces=>({...structuredClone(createBroto()),board:Array.from({length:16},(_,i)=>pieces[i]??null)});
const finish=s=>{while(!s.roundOver)s=applyBrotoMove(s,legalBrotoMoves(s)[0]).state;return s;};
test('initial state and isolated planting consume exactly one seed without points',()=>{
 const s=createBroto(),r=applyBrotoMove(s,5);assert.equal(s.board[5],null);assert.deepEqual(r.state.board[5],piece(0));assert.deepEqual(r.state.reserves,[7,8]);assert.deepEqual(r.state.scores,[0,0]);assert.equal(r.state.player,1);assert.equal(r.state.turn,1);assert.deepEqual(r.events.receivers,[]);assert(Object.isFrozen(r.state.board[5]));
});
test('exact mandatory five-move example, every state and final board',()=>{
 let s=createBroto();s=applyBrotoMove(s,1).state;assert.deepEqual(s.board[1],piece(0));
 s=applyBrotoMove(s,5).state;assert.deepEqual(s.board[1],piece(0,false,true));
 s=applyBrotoMove(s,7).state;assert.deepEqual(s.board[5],piece(1,true,false));
 s=applyBrotoMove(s,6).state;assert.deepEqual(s.board,Array.from({length:16},(_,i)=>({1:piece(0,false,true),5:piece(1,true,false),6:piece(1),7:piece(0,true,false)})[i]??null));
 const r=applyBrotoMove(s,3);assert.deepEqual(r.state.board,Array.from({length:16},(_,i)=>({3:piece(0),5:piece(1,true,false),6:piece(1)})[i]??null));
 assert.deepEqual(r.state.scores,[2,0]);assert.deepEqual(r.state.totals,[2,0]);assert.deepEqual(r.state.reserves,[5,6]);assert.equal(r.events.blooms.length,2);assert.equal(r.state.turn,5);assert.equal(r.state.player,1);assert.deepEqual(r.state.history,[1,5,7,6,3]);assert(restoreBroto(r.state));
});
test('rays cross empties, hit first only, never diagonals or return to new seed',()=>{
 const r=applyBrotoMove(fixture({0:piece(1),1:piece(1),4:piece(1),10:piece(1)}),3);
 assert.deepEqual(r.events.receivers.map(x=>x.cell),[1]);assert.deepEqual(r.events.receivers[0].path,[2,1]);assert.deepEqual(r.state.board[0],piece(1));assert.deepEqual(r.state.board[3],piece(0));assert.deepEqual(r.state.board[10],piece(1));
});
test('repeated horizontal is idempotent, not vertical',()=>{
 const r=applyBrotoMove(fixture({5:piece(1,true,false)}),7);assert.equal(r.events.receivers[0].alreadyReceived,true);assert.deepEqual(r.state.board[5],piece(1,true,false));assert.deepEqual(r.events.points,[0,0]);
});
test('all four snapshot recipients resolve simultaneously and points belong to both owners',()=>{
 const r=applyBrotoMove(fixture({1:piece(1,true),4:piece(0,false,true),7:piece(1,false,true),13:piece(0,true)}),5);
 assert.deepEqual(r.events.receivers.map(x=>x.cell),[1,13,4,7]);assert.equal(r.events.blooms.length,4);assert.deepEqual(r.events.points,[2,2]);for(const i of [1,4,7,13])assert.equal(r.state.board[i],null);assert.deepEqual(r.state.board[5],piece(0));assert.deepEqual(r.state.reserves,[7,8]);
});
test('harvest never extends the ray into a second receptor or propagates a chain',()=>{
 const r=applyBrotoMove(fixture({1:piece(1,false,true),0:piece(0),5:piece(0)}),3);
 assert.equal(r.state.board[1],null);assert.deepEqual(r.state.board[0],piece(0));assert.deepEqual(r.state.board[5],piece(0));assert.deepEqual(r.events.points,[0,1]);assert.equal(r.events.receivers.length,1);
});
test('harvested cell reused with fresh marks, reserve never replenished',()=>{
 const s=moves([1,5,7,6,3]),r=applyBrotoMove(s,1);assert.deepEqual(r.state.board[1],piece(1));assert.deepEqual(r.state.reserves,[5,5]);assert.deepEqual(r.state.scores,[2,1]);
});
test('preview is identical to applying move but cannot mutate game, points/history or future',()=>{
 const s=moves([1,5,7,6]),raw=serializeBroto(s),preview=previewBrotoMove(s,3);assert.equal(serializeBroto(s),raw);assert.deepEqual(preview,applyBrotoMove(s,3));assert.throws(()=>{preview.state.board[3].h=true;});assert.equal(serializeBroto(s),raw);
});
test('illegal/stale/duplicate confirmations reject without consuming a seed',()=>{
 const s=moves([1]);for(const cell of [1,-1,16,1.5,null])assert.throws(()=>applyBrotoMove(s,cell));assert.throws(()=>applyBrotoMove(s,2,{expectedPlayer:0}));assert.throws(()=>applyBrotoMove(s,2,{expectedTurn:0}));assert.equal(s.turn,1);assert.deepEqual(s.reserves,[7,8]);
});
test('sixteenth move resolves effects then ends; leftovers receive no closing harvest',()=>{
 let s=createBroto();while(s.turn<15)s=applyBrotoMove(s,legalBrotoMoves(s)[0]).state;
 const r=applyBrotoMove(s,legalBrotoMoves(s)[0]);assert.equal(r.state.turn,16);assert.deepEqual(r.state.reserves,[0,0]);assert(r.state.roundOver);assert(!r.state.duelOver);assert.deepEqual(r.state.scores,s.scores.map((n,p)=>n+r.events.points[p]));assert.equal(r.state.board.filter(Boolean).length,16-r.state.scores[0]-r.state.scores[1]);assert.equal(legalBrotoMoves(r.state).length,0);assert.throws(()=>applyBrotoMove(r.state,0));
});
test('next round alternates starter, preserves finalized first result, resets board/reserves',()=>{
 const first=finish(createBroto()),second=nextBrotoRound(first);assert.equal(second.round,2);assert.equal(second.player,1);assert.equal(second.starter,1);assert.deepEqual(second.board,Array(16).fill(null));assert.deepEqual(second.reserves,[8,8]);assert.deepEqual(second.scores,[0,0]);assert.deepEqual(second.totals,first.scores);assert.deepEqual(second.completedRounds[0].history,first.history);assert.equal(undoBroto(second),second);assert.throws(()=>nextBrotoRound(second));
});
test('duel result totals are idempotent on serialization/reopen; rematch reverses first starter',()=>{
 const end=finish(nextBrotoRound(finish(createBroto())));assert(end.duelOver);assert.equal(end.winner,end.totals[0]===end.totals[1]?'draw':end.totals[0]>end.totals[1]?0:1);
 const a=restoreBroto(serializeBroto(end)),b=restoreBroto(serializeBroto(a));assert.deepEqual(b,end);const rematch=rematchBroto(end);assert.equal(rematch.firstStarter,1);assert.equal(rematch.player,1);assert.deepEqual(rematch.totals,[0,0]);assert.deepEqual(rematch.completedRounds,[]);assert.throws(()=>rematchBroto(createBroto()));
});
test('undo/redo restores complete harvested state; new branch discards redo',()=>{
 const before=moves([1,5,7,6]),after=applyBrotoMove(before,3).state,undo=undoBroto(after);assert.deepEqual({...undo,future:[]},before);assert.deepEqual(redoBroto(undo),after);assert(restoreBroto(undo));const branch=applyBrotoMove(undo,0).state;assert.deepEqual(branch.future,[]);assert.equal(redoBroto(branch),branch);
});
test('undo final turn reopens round and redo restores closure, no consolidated round undo',()=>{
 const first=finish(createBroto()),second=nextBrotoRound(first),end=finish(second),undo=undoBroto(end);assert(!undo.roundOver);assert(!undo.duelOver);assert.equal(undo.winner,null);assert.deepEqual(redoBroto(undo),end);let u=end;for(let i=0;i<20;i++)u=undoBroto(u);assert.equal(u.round,2);assert.deepEqual(u.completedRounds,second.completedRounds);assert.deepEqual(u.totals,first.scores);
});
test('restart round two preserves first result and clears only current history',()=>{
 const first=finish(createBroto()),s=moves([1,5,7,6,3],nextBrotoRound(first)),r=resetBrotoRound(s);assert.deepEqual(r,nextBrotoRound(first));assert(restoreBroto(r));
});
test('restoration rejects malformed/adulterated derived fields, histories and prior scores',()=>{
 const end=finish(nextBrotoRound(finish(createBroto())));
 for(const mutate of [s=>s.totals[0]++,s=>s.scores[0]++,s=>s.reserves[0]++,s=>s.turn--,s=>s.player=1-s.player,s=>s.board[0]=piece(0),s=>s.completedRounds[0].scores[0]++,s=>s.completedRounds[0].history[1]=s.completedRounds[0].history[0],s=>s.rulesVersion=2,s=>s.future=[0],s=>s.winner='anything',s=>s.extra=true]){const bad=structuredClone(end);mutate(bad);assert.equal(restoreBroto(bad),null);}
 for(const raw of [null,{},'broken','[]','null'])assert.equal(restoreBroto(raw),null);
});
test('seeded 500 full duels: invariants, replay, round boundaries, previews and histories',()=>{
 let rng=1937;const rand=n=>{rng=(Math.imul(rng,1664525)+1013904223)>>>0;return rng%n;};
 for(let duel=0;duel<500;duel++){
  let s=createBroto(duel%2);
  for(let round=1;round<=2;round++){
   while(!s.roundOver){const legal=legalBrotoMoves(s);assert(legal.length);const cell=legal[rand(legal.length)],before=JSON.stringify(s),result=previewBrotoMove(s,cell);assert.equal(JSON.stringify(s),before);s=applyBrotoMove(s,cell).state;assert.deepEqual(s,result.state);assert.equal(s.board.filter(Boolean).length+s.scores[0]+s.scores[1],s.turn);assert.equal(s.reserves[0]+s.reserves[1],16-s.turn);assert(s.board.every(p=>!p||!(p.h&&p.v)));assert(restoreBroto(s));}
   if(round===1)s=nextBrotoRound(s);
  }
  assert(s.duelOver);assert.deepEqual(restoreBroto(serializeBroto(s)),s);
 }
});

test('last seed can harvest both owners before round result, without bonus for leftovers',()=>{
 const s=fixture({1:piece(0,false,true),7:piece(1,true,false),12:piece(0,true,false)});s.turn=15;s.reserves=[1,0];s.history=Array(15).fill(0);
 const result=applyBrotoMove(s,3);assert(result.state.roundOver);assert.deepEqual(result.state.scores,[1,1]);assert.deepEqual(result.state.reserves,[0,0]);assert.deepEqual(result.state.board[12],piece(0,true,false));assert.equal(result.events.blooms.length,2);
});
test('second-round ties have no invented tiebreak and winner uses summed flowers',()=>{
 const s=fixture({});Object.assign(s,{round:2,turn:15,reserves:[1,0],totals:[3,3],history:Array(15).fill(0)});assert.equal(applyBrotoMove(s,0).state.winner,'draw');
 s.totals=[2,5];assert.equal(applyBrotoMove(s,0).state.winner,1);s.totals=[7,1];assert.equal(applyBrotoMove(s,0).state.winner,0);
});

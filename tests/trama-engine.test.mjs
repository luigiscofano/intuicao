import test from 'node:test';
import assert from 'node:assert/strict';
import * as E from '../dist/trama/engine.mjs';
import {chooseTramaMove, chooseTramaMoveAsync} from '../dist/trama/bot.mjs';
const board = (zero = [], one = []) => {const b = Array(36).fill(null);zero.forEach(c => b[c] = 0);one.forEach(c => b[c] = 1);return b;};
const fixture = (b, player = 0) => ({...E.createTrama(), board: b, player, turn: b.filter(x => x !== null).length, ...E.analyzeBoard(b)});
const edges = b => E.analyzeBoard(b).graphs[0].edges.map(e => [e.from, e.to]);
const play = (moves, starter = 0) => moves.reduce((s, c) => E.applyTramaMove(s, c).state, E.createTrama(starter));
test('01 — 36 vazias, vez e casa legal, erro não muda estado', () => {
 const s = E.createTrama(); assert.equal(s.board.length, 36);assert.equal(E.legalTramaMoves(s).length,36);
 assert.deepEqual(E.legalTramaMoves(s,1),[]);assert.throws(()=>E.applyTramaMove(s,0,{expectedPlayer:1}));
 assert.throws(()=>E.applyTramaMove(s,0,{expectedTurn:2}));
 const next=E.applyTramaMove(s,0).state;assert.throws(()=>E.applyTramaMove(next,0));assert.equal(s.turn,0);
 for(const c of [-1,36,1.2,null,'1',undefined])assert.throws(()=>E.applyTramaMove(s,c));
});
test('02/03 — exemplos lineares, diagonais e sem ligação longa sobre peça',()=>{
 assert.deepEqual(edges(board([0,1])),[[0,1]]);assert.deepEqual(edges(board([0,2])),[[0,2]]);
 assert.deepEqual(edges(board([0,3])),[]);assert.deepEqual(edges(board([0,2],[1])),[]);
 assert.deepEqual(edges(board([0,1,2])),[[0,1],[1,2]]);
 assert.deepEqual(edges(board([0,2,4])),[[0,2],[2,4]]);assert.equal(E.analyzeBoard(board([0,2,4])).maxSizes[0],3);
 assert.deepEqual(edges(board([0,7,14])),[]);assert.deepEqual(edges(board([5,6])),[]);
});
test('04 — grupos separados não somam; ciclos e ramificações contam peças',()=>{
 assert.equal(E.analyzeBoard(board([0,1,2,30,31,32])).maxSizes[0],3);
 assert.equal(E.analyzeBoard(board([0,1,6,7])).maxSizes[0],4);
 assert.equal(E.applyTramaMove(fixture(board([0,1,2,6,7])),8).state.winner,0);
 const b=board([2,8,20,32,13,15]);assert.equal(E.analyzeBoard(b).maxSizes[0],4);
 assert.equal(E.applyTramaMove(fixture(b),14).state.winner,0);
 assert.equal(E.applyTramaMove(fixture(b),14).events.winningComponent.length,7);
});
test('05/06 — interposição separa ponte, adjacência permanece',()=>{
 const s=fixture(board([0,2,4]),1),r=E.applyTramaMove(s,1);
 assert.equal(s.maxSizes[0],3);assert.equal(r.state.maxSizes[0],2);assert.equal(r.events.removedEdges.length,1);
 const adjacent=E.applyTramaMove(fixture(board([0,1]),1),7).state;
 assert.deepEqual(adjacent.graphs[0].edges.map(e=>[e.from,e.to]),[[0,1]]);
});
test('07 — cruzamento da mesma cor não é nó',()=>{
 const a=E.analyzeBoard(board([8,20,13,15]));assert.deepEqual(a.components[0].map(c=>c.length),[2,2]);assert.equal(a.maxSizes[0],2);
});
test('08 — L1C3 + cruzamento: centro une 3+2+1 e vence',()=>{
 const s=fixture(board([2,8,20,13,15]));assert.deepEqual(s.components[0].map(c=>c.length),[3,2]);
 const r=E.applyTramaMove(s,14);assert.equal(r.state.winner,0);assert.equal(r.events.winningComponent.length,6);
 assert.equal(r.events.removedEdges.length,2);assert.equal(r.events.addedEdges.length,4);
});
test('09 — centro adversário rompe ambas as pontes sem nó/diagonal',()=>{
 const r=E.applyTramaMove(fixture(board([2,8,20,13,15]),1),14);
 assert.equal(r.events.removedEdges.length,2);assert.deepEqual(r.state.components[0].map(c=>c.length),[2,1,1,1]);assert.equal(r.state.maxSizes[1],1);
});
test('10 — cruzamento entre cores permitido, centro livre para ambos',()=>{
 const b=board([8,20],[13,15]);assert.equal(E.analyzeBoard(b).graphs.every(g=>g.edges.length===1),true);
 for(const p of [0,1]) {const s=fixture(b,p);assert.ok(E.legalTramaMoves(s).includes(14));assert.equal(E.applyTramaMove(s,14).state.board[14],p);}
});
test('11 — cheio sem rede é empate; vitória tem prioridade na última casa',()=>{
 const b=Array.from({length:36},(_,i)=>(Math.floor(i/6)+i%6)%2);
 const before=[...b];before[35]=null;const draw=E.applyTramaMove(fixture(before,b[35]),35).state;assert.equal(draw.winner,'draw');
 // 18 peças de cada cor: nenhuma rede vencedora antes da 36ª colocação.
 const winning=[1,0,1,1,0,1,1,0,0,0,1,0,0,1,1,1,0,0,0,1,0,1,0,1,1,0,1,1,0,1,0,0,0,0,1,1];winning[13]=null;
 assert.ok(E.analyzeBoard(winning).maxSizes.every(n=>n<6));
 const win=E.applyTramaMove(fixture(winning,1),13).state;assert.equal(win.turn,36);assert.equal(win.winner,1);assert.ok(win.maxSizes[1]>=6);
});
test('12 — prévia pura, histórico estável, desfazer/refazer/replay/restauração',()=>{
 let s=play([0,35,2,33,4,31]);const raw=E.serializeTrama(s);
 const p=E.previewTramaMove(s,6);assert.equal(E.serializeTrama(s),raw);assert.deepEqual(p,E.applyTramaMove(s,6));
 assert.deepEqual(E.redoTrama(E.undoTrama(s)),s);assert.deepEqual(E.restoreTrama(raw),s);
 const undone=E.undoTrama(E.undoTrama(s));assert.deepEqual(E.restoreTrama(E.serializeTrama(undone)),undone);
 const branch=E.applyTramaMove(undone,12).state;assert.deepEqual(branch.future,[]);assert.equal(E.serializeTrama(s),raw);
 for(const key of ['board','maxSizes','graphs','turn','winner','rulesVersion']){const bad=JSON.parse(raw);bad[key]=key==='winner'?0:null;assert.equal(E.restoreTrama(bad),null);}
 const invalid=JSON.parse(raw);invalid.future=[0];assert.equal(E.restoreTrama(invalid),null);
 assert.equal(E.restoreTrama('{'),null);assert.equal(E.restoreTrama({...JSON.parse(raw),extra:1}),null);
});
test('13 — colocação não move nem converte; inspeção não consome turno',()=>{
 const s=play([0,35,2]);const before=E.serializeTrama(s);assert.deepEqual(E.inspectTramaComponent(s,0),[0,2]);
 assert.deepEqual(E.inspectTramaComponent(s,1),[]);assert.equal(E.serializeTrama(s),before);
 const r=E.applyTramaMove(s,34).state;s.board.forEach((p,i)=>{if(p!==null)assert.equal(r.board[i],p);});
 assert.throws(()=>{s.board[0]=1;});
});
test('reinício mantém iniciador; revanche alterna; terminal é imutável',()=>{
 const s=play([0,35,1,33,2,31,6,29,7,27,8]);assert.equal(s.winner,0);
 assert.deepEqual(E.resetTrama(s),E.createTrama(0));assert.deepEqual(E.rematchTrama(s),E.createTrama(1));
 assert.throws(()=>E.rematchTrama(E.createTrama()));assert.deepEqual(E.legalTramaMoves(s),[]);
 const raw=E.serializeTrama(s);assert.throws(()=>E.applyTramaMove(s,9));assert.equal(E.serializeTrama(s),raw);
 assert.equal(E.undoTrama(s).over,false);
});
test('histórico contra bot retorna à decisão humana e refaz rodada',()=>{
 const s=play([0,35,2,33]);const undone=E.undoTramaToHuman(s,0);assert.equal(undone.turn,2);assert.equal(undone.player,0);
 assert.deepEqual(E.redoTramaToHuman(undone,0),s);
 const waiting=play([0,35,2]);assert.equal(E.undoTramaToHuman(waiting,0).turn,2);
 const opening=play([35],1);assert.equal(E.undoTramaToHuman(opening,0),opening);
 const botStarts=play([35,0,33],1);assert.equal(E.undoTramaToHuman(botStarts,0).turn,1);
});
// Oráculo independente: todos os pares + fecho transitivo, sem percorrer o grafo do motor.
function oracle(b,p){
 const nodes=b.flatMap((x,i)=>x===p?[i]:[]),sets=nodes.map(c=>new Set([c])),es=[];
 for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
  const a=nodes[i],z=nodes[j],r=Math.abs(Math.floor(a/6)-Math.floor(z/6)),c=Math.abs(a%6-z%6);
  if((r===0||c===0)&&((r+c===1)||(r+c===2&&b[(a+z)/2]===null))){es.push([a,z]);const union=new Set([...sets[i],...sets[j]]);for(let k=0;k<sets.length;k++)if([...sets[k]].some(x=>union.has(x)))sets[k]=union;}
 }
 const unique=[...new Set(sets)].map(s=>[...s].sort((a,b)=>a-b)).sort((a,b)=>a[0]-b[0]);return {components:unique,edges:es};
}
test('oráculo independente: 600 tabuleiros e 80 partidas/replays alternando iniciador',()=>{
 let seed=12345;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(let n=0;n<600;n++){const b=Array.from({length:36},()=>[null,0,1][Math.floor(random()*3)]),a=E.analyzeBoard(b);
  for(const p of [0,1]){const o=oracle(b,p);assert.deepEqual(a.components[p],o.components);assert.deepEqual(a.graphs[p].edges.map(e=>[e.from,e.to]).sort((a,b)=>a[0]-b[0]||a[1]-b[1]),o.edges);}
 }
 for(let n=0;n<80;n++){let s=E.createTrama(n%2);while(!s.over){const legal=E.legalTramaMoves(s),c=legal[Math.floor(random()*legal.length)],old=s;
  s=E.applyTramaMove(s,c).state;assert.equal(s.turn,old.turn+1);assert.deepEqual(E.undoTrama(s).board,old.board);
  assert.deepEqual(E.restoreTrama(E.serializeTrama(s)),s);
 }assert.ok(s.turn<=36);if(s.winner!=='draw')assert.ok(s.turn>=11);}
});
test('bot: três níveis legais, vitória imediata e bloqueio de ameaça',()=>{
 const s=fixture(board([2,8,20,13,15]));for(const difficulty of ['intermediate','strong'])assert.equal(E.applyTramaMove(s,chooseTramaMove(s,{difficulty}).move).state.winner,0);
 const threatened=fixture(board([1,5,25,30,33],[2,4,8,16,34]),0);
 for(const difficulty of ['intermediate','strong']){const r=chooseTramaMove(threatened,{difficulty,nodeBudget:1400});assert.ok([3,10,22,28].includes(r.move));assert.ok(r.nodes<=r.nodeBudget);assert.equal(r.limited,true);}
 const weak=chooseTramaMove(E.createTrama(),{difficulty:'beginner',seed:1});assert.ok(E.legalTramaMoves(E.createTrama()).includes(weak.move));
 assert.equal(chooseTramaMove({...s,over:true}).move,null);
});
test('fallback cooperativo permite cancelar sem alterar estado',async()=>{
 const s=E.createTrama(),raw=E.serializeTrama(s),controller=new AbortController();
 const pending=chooseTramaMoveAsync(s,{difficulty:'strong',signal:controller.signal});setTimeout(()=>controller.abort(),0);
 await assert.rejects(pending,{name:'AbortError'});assert.equal(E.serializeTrama(s),raw);
});

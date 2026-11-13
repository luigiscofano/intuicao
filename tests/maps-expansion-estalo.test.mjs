import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import * as engine from '../dist/versus/games/estalo/engine.mjs';
import {chooseMove} from '../dist/versus/search.mjs';
const added=engine.ESTALO_MAPS.filter(m=>m.id.startsWith('varandas-'));
test('Estalo: 48 mapas, seis Varandas inéditos e 42 originais idênticos',async()=>{
 assert.equal(engine.ESTALO_MAPS.length,48);assert.equal(added.length,6);
 const old = { ESTALO_MAPS: JSON.parse(readFileSync(new URL('./fixtures/maps-legacy-estalo.json', import.meta.url), 'utf8')) };
 for(const m of old.ESTALO_MAPS)assert.deepEqual(engine.ESTALO_MAPS.find(n=>n.id===m.id),m);
 for(const map of added){
  assert.equal(map.blocked.length,2);assert.equal(map.targets[0],map.targets[1]);
  assert(map.targets[0]>=7);
  for(let cell=0;cell<map.board.length;cell++){
   const pod=map.board[cell],other=map.board[map.board.length-1-cell];
   if(!pod)assert.equal(other,null);else{assert.equal(other.owner,1-pod.owner);assert.equal(other.direction,(pod.direction+2)%4);}
  }
  for(const prior of old.ESTALO_MAPS.filter(m=>m.rows===map.rows&&m.columns===map.columns))assert.notDeepEqual(map.board,prior.board);
 }
});
let seed=9876;const random=()=>seed=(Math.imul(seed,1664525)+1013904223)>>>0;
test('Estalo: 600 partidas completas nas seis novas geometrias',()=>{
 for(const map of added)for(let trial=0;trial<100;trial++){
  let state=engine.createState({mapId:map.id});
  while(!state.result){const legal=engine.getLegalMoves(state);assert(legal.length);const snapshot=JSON.stringify(state);const next=engine.applyMove(state,legal[random()%legal.length]);assert.equal(JSON.stringify(state),snapshot);state=next;assert(state.moveCount<=map.targets[0]+map.targets[1]);}
  for(const owner of[0,1])assert.equal(state.scores[owner]+state.board.filter(p=>p?.owner===owner).length,map.targets[owner]);
 }
});
test('Estalo: 18 partidas IA completas, três dificuldades em cada mapa',()=>{
 for(const map of added)for(const difficulty of['beginner','intermediate','strong']){
  let state=engine.createState({mapId:map.id});
  while(!state.result){
   const answer=chooseMove(engine,state,difficulty,{milliseconds:20,nodes:80});
   assert(engine.getLegalMoves(state).some(m=>JSON.stringify(m)===JSON.stringify(answer.move)));
   assert(answer.nodes<=80);
   state=engine.applyMove(state,answer.move);assert(state.moveCount<=map.targets[0]+map.targets[1]);
  }
 }
});

// Compara a posição completa, inclusive direções, não só o recorte do contorno.
test('Varandas não é reflexão/rotação e troca de cores de um mapa anterior',()=>{
 for(const map of added)for(const prior of engine.ESTALO_MAPS.filter(m=>!m.id.startsWith('varandas-')&&m.rows===map.rows&&m.columns===map.columns)){
  for(const transpose of (map.rows===map.columns?[false,true]:[false]))for(const flipRow of[false,true])for(const flipColumn of[false,true])for(const swap of[false,true]){
   const board=Array(map.board.length).fill(null);
   prior.board.forEach((pod,cell)=>{
    if(!pod)return;
    let row=Math.floor(cell/map.columns),column=cell%map.columns;
    let {row:dr,column:dc}=engine.DIRECTIONS[pod.direction];
    if(transpose){[row,column]=[column,row];[dr,dc]=[dc,dr];}
    if(flipRow){row=map.rows-1-row;dr=-dr;}
    if(flipColumn){column=map.columns-1-column;dc=-dc;}
    board[row*map.columns+column]={owner:swap?1-pod.owner:pod.owner,direction:engine.DIRECTIONS.findIndex(d=>d.row===dr&&d.column===dc)};
   });
   assert.notDeepEqual(board,map.board,`${map.id} versus ${prior.id}`);
  }
 }
});

import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {generateCollectionEndless,normalizeCollectionOptions,collectionOptionSpec} from '../dist/endless-collection.mjs';
import {applyDirectAction} from '../dist/direct-actions.mjs';
import {validateGeometry,initialGeometryState,eloEdges,supportCells} from '../dist/geometry-games.mjs';
import {validateSymbols} from '../dist/symbol-games.mjs';
import {createDesvio,legalDesvioMoves,applyDesvioMove,chooseDesvioBotMove} from '../dist/desvio.mjs';
let cases=0;
function verify(game,seed,options){const generated=generateCollectionEndless(game,seed,options),{level,answer}=generated;cases++;
 assert.equal(level.endless,true);assert.equal(level.game,game);assert.deepEqual(generated.options,normalizeCollectionOptions(game,options));
 if(game==='elo'||game==='prumo'){const result=validateGeometry(level,answer);assert.equal(result.complete,true,JSON.stringify({game,seed,options,result}));assert.equal(result.valid,true);}
 if(game==='elo'){assert.equal(answer.positions.length,options.regions);assert.equal(eloEdges(level,answer.positions).length,options.regions);assert.equal(Object.keys(level.fixed).length,options.fixed?1:0);assert.equal(new Set(level.regions).size,options.regions);}
 if(game==='prumo'){assert.equal(validateGeometry(level,applyDirectAction('prumo',level,initialGeometryState(level),{type:'initialize'})).complete,false,'initialized puzzle must still require solving');assert.equal(level.supports.length,options.pieces);const incident=level.supports.flatMap(p=>supportCells(level,p));assert.equal(new Set(incident).size,incident.length,'no colliding support incidence');}
 if(game==='pacto'){assert.equal(validateSymbols(level,answer.values).complete,true);assert.equal(validateSymbols(level,answer.values).valid,true);assert.equal(level.clues.filter(v=>v>=0).length,options.clues);assert.equal(level.rows,8);assert.equal(level.cols,8);}
 if(game==='desvio'){let state=createDesvio(level);let moves=0;while(state.winner===null){const legal=legalDesvioMoves(level,state);assert.ok(legal.length);state=applyDesvioMove(level,state,legal[(seed+moves)%legal.length]);moves++;assert.ok(moves<=16);}assert.ok([0,1].includes(state.winner));}
 return generated;
}
for(const size of [4,5,6,7,8,9,10]){
 for(const regions of [4,6,8])for(const fixed of [false,true])for(let seed=0;seed<100;seed++)verify('elo',seed,{size,regions,fixed});
 for(let pieces=2;pieces<=10;pieces++)for(let seed=0;seed<100;seed++)verify('prumo',seed,{size,pieces});
}
for(const clues of [24,32,40])for(let seed=0;seed<1000;seed++)verify('pacto',seed,{clues});
for(const size of ['3x3','3x4','4x4'])for(let seed=0;seed<500;seed++)verify('desvio',seed,{size});
for(const game of ['elo','prumo','pacto','desvio']){
 const spec=collectionOptionSpec(game);assert.ok(spec.length);assert.ok(spec.every(s=>s.type==='checkbox'||Array.isArray(s.values)));
 const a=generateCollectionEndless(game,'repeat');assert.deepEqual(a,generateCollectionEndless(game,'repeat'));
 const fingerprints=new Set(Array.from({length:200},(_,i)=>{const {level}=generateCollectionEndless(game,i);const {id,seed,...structure}=level;return JSON.stringify(structure);}));assert.ok(fingerprints.size>=180,`${game}: insufficient random structural variation ${fingerprints.size}`);
}
assert.deepEqual(normalizeCollectionOptions('prumo',{size:999,pieces:-8}),{size:10,pieces:2});
assert.deepEqual(normalizeCollectionOptions('pacto',{size:4,clues:99}),{clues:32});
for(const game of ['elo','prumo','pacto','desvio'])for(const malformed of [null,undefined,'size=10',42,true,[],[10],new Date(0)]){
 assert.deepEqual(normalizeCollectionOptions(game,malformed),normalizeCollectionOptions(game,{}));
 assert.deepEqual(generateCollectionEndless(game,'malformed',malformed),generateCollectionEndless(game,'malformed',{}));
}
assert.deepEqual(normalizeCollectionOptions('elo',Object.assign(Object.create(null),{size:9})),normalizeCollectionOptions('elo',{size:9}));
assert.throws(()=>generateCollectionEndless('unknown',1));
const source=readFileSync(new URL('../dist/endless-collection.mjs',import.meta.url),'utf8');assert.ok(!/from ['"].*(?:levels|answers)\.mjs/.test(source),'generator must not select campaign catalog or answer keys');
// The concave cycles must have a turning direction change, not rectangles with
// merely inserted collinear points. Points are labeled in random region order.
for(const regions of [6,8])for(let seed=0;seed<50;seed++){
 const {level,answer}=generateCollectionEndless('elo',seed,{size:8,regions,fixed:false});const edges=eloEdges(level,answer.positions),path=[0];let prev=-1,at=0;
 while(path.length<regions){const next=edges.filter(e=>e.includes(at)).map(e=>e[0]===at?e[1]:e[0]).find(x=>x!==prev);prev=at;at=next;path.push(at);}
 const signs=path.map((r,i)=>{const p=answer.positions[path[(i+regions-1)%regions]],q=answer.positions[r],t=answer.positions[path[(i+1)%regions]];return Math.sign((q%8-p%8)*((t/8|0)-(q/8|0))-((q/8|0)-(p/8|0))*(t%8-q%8));});assert.ok(signs.includes(-1)&&signs.includes(1));
}
for(const size of ['3x3','3x4','4x4'])for(let seed=0;seed<25;seed++){const {level}=generateCollectionEndless('desvio',seed,{size});let state=createDesvio(level);while(state.winner===null){const cell=chooseDesvioBotMove(level,state,'perfect');assert.ok(legalDesvioMoves(level,state).includes(cell));state=applyDesvioMove(level,state,cell);}}
console.log(`PASS ${cases} seeded configurations + determinism, diversity, concavity, terminal duels, exact validation, and campaign isolation.`);

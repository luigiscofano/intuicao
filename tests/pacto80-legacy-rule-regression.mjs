import assert from 'node:assert/strict';
import {validateSymbolEditing,validateSymbols,symbolCandidates} from '../dist/symbol-games.mjs';
import {SYMBOL_LEVELS} from './fixtures/pacto-legacy-levels.mjs';
const empty=()=>Array(64).fill(-1);
const level={game:'pacto',rows:8,cols:8,clues:empty()};
const board=entries=>{const values=empty();for(const [i,v] of entries)values[i]=v;return values;};
const tests=[];const test=(name,run)=>tests.push([name,run]);
test('Jogada não canônica sem erro explícito não é hachurada',()=>{
 const l=SYMBOL_LEVELS.pacto[0],values=l.clues.slice();values[10]=1;
 assert.notEqual(values[10],l.solution[10]);
 assert.ok(validateSymbols(l,values).violations.some(v=>v.kind==='impossible'));
 assert.deepEqual(validateSymbolEditing(l,values).violations,[]);
 assert.ok(symbolCandidates(l,values).every(a=>a.length===0),'A análise de candidatos continua rigorosa');
});
test('Par válido e parceiro ainda possível não são erros',()=>{
 assert.deepEqual(validateSymbolEditing(level,board([[0,0],[1,0]])).violations,[]);
 const check=validateSymbolEditing(level,board([[0,0],[1,1]]));
 assert.deepEqual(check.violations,[]);assert.ok(check.pending.some(p=>p.kind==='partner'));
});
test('Trio reto, trio dobrado e grupo maior são erros imediatos',()=>{
 for(const cells of [[0,1,2],[0,1,8],[0,1,8,9]]){
  const check=validateSymbolEditing(level,board(cells.map(i=>[i,0])));
  assert.deepEqual(check.violations.map(v=>v.cells),[cells]);
  assert.equal(check.violations[0].kind,'pair');
 }
});
test('Isolamento fechado é erro; vizinho vazio ainda pode formar par',()=>{
 const open=board([[0,0],[1,1]]);assert.deepEqual(validateSymbolEditing(level,open).violations,[]);
 open[8]=2;const check=validateSymbolEditing(level,open);
 assert.deepEqual(check.violations.map(v=>v.cells),[[0,8,1]]);
 assert.equal(check.violations[0].kind,'pair');
});
test('Cotas só hachuram linha/coluna completa, mesmo após ultrapassar dois',()=>{
 for(const indices of [Array.from({length:8},(_,i)=>i),Array.from({length:8},(_,i)=>i*8)]){
  const values=empty(),symbols=[0,1,0,2,0,1,2,3];
  for(let i=0;i<7;i++)values[indices[i]]=symbols[i];
  assert.deepEqual(validateSymbolEditing(level,values).violations,[]);
  assert.ok(validateSymbols(level,values).violations.some(v=>v.kind==='quota'));
  values[indices[7]]=symbols[7];
  const quota=validateSymbolEditing(level,values).violations.filter(v=>v.kind==='quota');
  assert.ok(quota.length);for(const v of quota)assert.deepEqual(v.cells,indices);
 }
});
test('Cota válida completa não é erro',()=>{
 const values=board([0,0,1,1,2,2,3,3].map((v,i)=>[i,v]));
 assert.deepEqual(validateSymbolEditing(level,values).violations,[]);
});
test('Vitória valida regras, não a igualdade com uma solução canônica',()=>{
 const canonical=SYMBOL_LEVELS.pacto[0].solution;
 const other=canonical.map(v=>(v+1)%4);
 assert.notDeepEqual(other,canonical);
 const l={...level,solution:canonical};
 for(const check of [validateSymbols(l,other),validateSymbolEditing(l,other)]){
  assert.equal(check.complete,true);assert.equal(check.valid,true);assert.deepEqual(check.violations,[]);
 }
 Object.defineProperty(l,'solution',{get(){throw new Error('Gabarito não deve ser consultado');}});
 assert.equal(validateSymbols(l,other).valid,true);assert.equal(validateSymbolEditing(l,other).valid,true);
});
test('200 inícios, 200 soluções e 600 estados parciais corretos sem hachuras',()=>{
 for(const l of SYMBOL_LEVELS.pacto){
  assert.deepEqual(validateSymbolEditing(l).violations,[]);
  const final=validateSymbols(l,l.solution);assert.ok(final.complete&&final.valid);
  assert.deepEqual(validateSymbolEditing(l,l.solution).violations,[]);
  for(const period of [2,3,5]){
   const values=l.solution.map((v,i)=>l.clues[i]>=0||i%period===0?v:-1);
   assert.deepEqual(validateSymbolEditing(l,values).violations,[]);
  }
 }
});
test('Entradas inválidas e pistas alteradas continuam protegidas',()=>{
 assert.equal(validateSymbolEditing(level,[]).valid,false);
 assert.equal(validateSymbolEditing({...level,rows:4}).valid,false);
 const invalid=empty();invalid[0]=4;assert.equal(validateSymbolEditing(level,invalid).valid,false);
 const l=SYMBOL_LEVELS.pacto[0],values=l.clues.slice(),i=values.findIndex(v=>v>=0);values[i]=-1;
 assert.ok(validateSymbolEditing(l,values).violations.some(v=>v.kind==='input'));
});
for(const [name,run] of tests){run();console.log('PASS',name);}
console.log(`${tests.length}/${tests.length} grupos de regressão PACTO passaram.`);

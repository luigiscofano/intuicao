import test from 'node:test';
import assert from 'node:assert/strict';
import { LOGIC_RULE_EXAMPLES as examples, LOGIC_EXAMPLE_FIXTURES as fixtures } from '../dist/rules-logic-examples.mjs';
const ids=['divisa','pulso','foz','refugio','mirante','renovo'];
const engines=Object.fromEntries(await Promise.all(ids.map(async id=>[id,await import(`../dist/logica/games/${id}/engine.mjs`)])));

for(const id of ids){
 test(`${id}: exemplo completo, estático final e uma ação real do motor`,()=>{
  const example=examples[id], {level,before,action,after}=fixtures[id],engine=engines[id];
  assert.ok(example.steps.length>=3 && example.steps.length<=4);
  assert.ok(example.steps.every(s=>s.length>50));
  assert.match(example.steps.join(' '),/automaticamente/);
  assert.match(example.steps.join(' '),/Checar/);
  assert.ok(example.description.length>80);
  assert.match(example.svg,/viewBox="0 0 240 140"/);
  assert.match(example.svg,/rpx-logic-reveal/);
  assert.match(example.svg,/rpx-logic-cue/);
  assert.doesNotMatch(example.svg,/script|onload|foreignObject|opacity="0"|<animate|<set\b/);
  // RENOVO reuses approved SVG art with static placement; no animation dependency.
  if (id !== 'renovo') assert.doesNotMatch(example.svg,/transform=/);
  else for (const [,value] of example.svg.matchAll(/transform="([^"]+)"/g)) {
    assert.match(value,/^(?:translate\(-?[\d.]+ -?[\d.]+\) scale\([\d.]+\)|rotate\(-30\))$/);
  }
  assert.equal(engine.isStateValid(level,before),true);
  assert.equal(engine.checkState(level,before).valid,false);
  const snapshot=JSON.stringify({level,before});
  const next=engine.applyAction(level,before,action);
  assert.deepEqual(next,after);
  assert.equal(JSON.stringify({level,before}),snapshot,'The illustration must not mutate its teaching inputs.');
  const checked=engine.checkState(level,next);
  assert.equal(checked.valid,true,checked.message);
  assert.equal(checked.complete,true);
 });
}
test('DIVISA: dois lados compartilhados, não quatro nem diagonais',()=>{
 const {level,before,after}=fixtures.divisa;
 assert.equal(engines.divisa.contactCounts(level,before.cells).AB,1);
 assert.equal(engines.divisa.contactCounts(level,after.cells).AB,2);
 assert.equal(engines.divisa.checkState({...level,contacts:{AB:3}},after).valid,false);
});
test('PULSO: intervalos iguais e todas as cotas, com vazios explícitos',()=>{
 const {level,after}=fixtures.pulso;
 assert.deepEqual(after.cells.flatMap((s,i)=>s===1?[i+1]:[]),[1,3,5]);
 assert.equal(engines.pulso.checkState({...level,quotas:[1,1,0,0,1]},{cells:[1,1,0,0,1]}).valid,false);
 assert.equal(engines.pulso.checkState(level,{cells:[1,null,1,0,1]}).complete,false);
});
test('FOZ: a distância é em trechos e os três pontos chegam à mesma foz',()=>{
 const {level,after}=fixtures.foz;
 assert.deepEqual(engines.foz.checkState(level,after).distances,[2,1,1,0]);
 assert.equal(engines.foz.checkState(level,{arrows:[1,0,3,-1]}).valid,false,'cycle must fail');
 assert.equal(engines.foz.checkState({...level,clues:{0:3,3:0}},after).valid,false);
});
test('REFÚGIO: a barreira toca duas regiões, cada qual com um marco',()=>{
 const {level,after}=fixtures.refugio;
 const result=engines.refugio.checkState(level,after);
 assert.equal(result.regions,2);
 assert.deepEqual(result.wallContacts,{1:2});
 assert.equal(engines.refugio.checkState(level,{cells:[0,0,0],lastChanged:null}).valid,false);
});
test('MIRANTE: observadores opostos são duas testemunhas da mesma peça',()=>{
 const {level,after}=fixtures.mirante;
 assert.deepEqual(engines.mirante.checkState(level,after).witnesses,[0,2,0]);
 assert.equal(engines.mirante.checkState({...level,observers:{...level.observers,right:[null]}},after).valid,false);
 assert.equal(engines.mirante.checkState(level,{cells:[0,2,0]}).valid,false);
});
test('RENOVO: somente o botão compartilha os dois trechos perpendiculares',()=>{
 const {level,before,after}=fixtures.renovo,engine=engines.renovo;
 assert.equal(engine.segmentsIntersect(level,...after.links),false);
 const selected=engine.applyAction(level,before,{type:'cell',index:1,tool:'select'});
 assert.deepEqual(engine.applyAction(level,selected,{type:'cell',index:3,tool:'select'}),after);
 assert.deepEqual(engine.applyAction(level,after,{type:'link',from:1,to:3}),before);
 assert.equal(engine.checkState({width:3,height:2,pieces:{0:'S',1:'B',2:'F'}},{links:[[0,1],[1,2]],selected:null}).valid,false,'a straight trio must fail');
});
test('O catálogo contém exatamente os seis jogos lógicos solicitados',()=>assert.deepEqual(Object.keys(examples),ids));
for(const id of ids){
 test(`${id}: a campanha existente continua válida no motor sem dependências offline`,async()=>{
  const {CAMPAIGN}=await import(`../dist/logica/games/${id}/campaign.mjs`);
  assert.ok(CAMPAIGN.length>0);
  for(const level of CAMPAIGN){
   const result=engines[id].checkState(level,engines[id].solutionState(level));
   assert.equal(result.valid,true,`${level.id}: ${result.message}`);
  }
 });
}

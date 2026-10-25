import test from 'node:test';
import assert from 'node:assert/strict';
import {CAMPAIGN,CHAPTERS,DIFFICULTIES,CONCEPTS} from '../dist/repasse/campaign.mjs';
import {FALLBACK_LEVELS,selectFallback} from '../dist/repasse/fallback.mjs';
import {configurationOf,validateLevel,replay,initialState,transition,isWon} from '../dist/repasse/engine.mjs';
import {GENERATOR_VERSION,generateRepasse,levelSignature,topologySignature,analyzeAlternatives,describeReplay} from '../dist/repasse/generator.mjs';
const kinds=l=>[...new Set(l.pieces.map(p=>configurationOf(p.directions)))];
const original=l=>kinds(l).every(k=>k==='original');
const partition=(items,key)=>Object.fromEntries([...new Set(items.map(x=>x[key]))].map(k=>[k,items.filter(x=>x[key]===k).length]));

test('500 IDs consecutivos,20capítulos,categorias e etapas completas',()=>{
 assert.equal(CAMPAIGN.length,500);assert.equal(CHAPTERS.length,20);assert.equal(DIFFICULTIES.length,8);
 assert.deepEqual(CAMPAIGN.map(l=>l.id),Array.from({length:500},(_,i)=>i+1));
 assert.deepEqual(partition(CAMPAIGN,'category'),{'Básico':200,'Intermediário':100,'Avançado':100,'Mestre':100});
 assert.deepEqual(partition(CAMPAIGN,'stage'),{'Descoberta':25,'Muito fácil':50,'Fácil':50,'Básico consolidado':75,'Intermediário':100,'Avançado':100,'Especialista':50,'Mestre':50});
 for(let c=1;c<=20;c++)assert.equal(CAMPAIGN.filter(l=>l.chapter===c).length,25);
});

test('350originais150expandidas,distribuição e estreias exatas',()=>{
 assert.equal(CAMPAIGN.filter(original).length,350);
 for(let c=1;c<=20;c++){const group=CAMPAIGN.filter(l=>l.chapter===c);assert.equal(group.filter(original).length,c<=8?25:c%2?12:13);}
 for(const [kind,id] of [['single',201],['corner',276],['four',351]]){
  assert.equal(CAMPAIGN.find(l=>kinds(l).includes(kind)).id,id);
  const level=CAMPAIGN[id-1];assert(level.pieces.length>=3&&level.pieces.length<=5);
  assert.equal(level.pieces.filter(p=>configurationOf(p.directions)===kind).length,1);
  assert(kinds(level).every(k=>k==='original'||k===kind));
 }
 assert(original(CAMPAIGN.at(-1)));
});

test('as500soluções são reproduzidas e cada registro tem metadados e valores legíveis',()=>{
 for(const l of CAMPAIGN){
  assert.equal(validateLevel(l).valid,true,`fase${l.id}`);assert.equal(l.solution.length,l.pieces.length);
  const result=replay(l,l.solution);assert(result.valid&&result.solved,`fase${l.id}`);
  assert.equal(Object.values(l.targets).flat().length,2*l.rows+2*l.cols);
  assert(l.pieces.every(p=>p.value>0));assert(l.rows<=4&&l.cols<=4);
  assert(l.validation.maxValue<=99);assert(l.validation.maxTarget<=99);
  assert(l.pieces.filter(p=>configurationOf(p.directions)==='four').length<=1);
  for(const key of ['category','stage','role','discovery','name','primaryConcept'])assert.equal(typeof l[key],'string');
  assert(l.discovery.startsWith('Nesta fase, o jogador precisa perceber que'));
  assert(Array.isArray(l.hints)&&l.hints.length===3);assert(Array.isArray(l.secondaryConcepts));
  assert.equal(l.validation.signature,levelSignature(l));assert.equal(l.validation.topology,topologySignature(l));
  assert.deepEqual(new Set(l.configurations),new Set(kinds(l)));
 }
});

test('não há duplicatas exatas e equivalências didáticas são explícitas',()=>{
 const exact=new Set(),normalized=new Map(),topology=new Map();let equivalents=0,topologyRepeats=0;
 for(const l of CAMPAIGN){
  const key=JSON.stringify([l.rows,l.cols,l.pieces.map(({row,col,value,directions})=>({row,col,value,directions})),l.targets]);
  assert(!exact.has(key),`duplicata exata${l.id}`);exact.add(key);
  const sig=levelSignature(l),top=topologySignature(l);
  if(normalized.has(sig)){assert(l.validation.intentionalPair,`equivalência injustificada${l.id}`);equivalents++;}
  if(topology.has(top)){assert(l.validation.intentionalPair,`topologia repetida sem intenção${l.id}`);topologyRepeats++;}
  normalized.set(sig,l.id);topology.set(top,l.id);
 }
 assert.equal(equivalents,2);assert(topologyRepeats<=6);
});

test('análise exata independente da ordem testemunha confere500contagens e precedências',()=>{
 for(const l of CAMPAIGN){
  const again=analyzeAlternatives(l,{maxStates:60000}),saved=l.validation.alternatives;
  assert(again.complete,`orçamento fase${l.id}`);assert(again.solutionCount>0);
  for(const k of ['solutionCount','firstMoves','lastMoves','requiredPrecedences'])assert.deepEqual(again[k],saved[k],`fase${l.id}campo${k}`);
 }
 assert.equal(CAMPAIGN[6].validation.alternatives.solutionCount,2);
 assert.equal(CAMPAIGN[7].validation.alternatives.solutionCount,1);
 assert.equal(CAMPAIGN[8].validation.alternatives.solutionCount,1);
 assert.equal(CAMPAIGN[9].validation.alternatives.solutionCount,1);
 const join=CAMPAIGN[6];assert(replay(join,['p3','p1','p2']).solved,'ordem alternativa é aceita');
});

test('contador memoizado concorda com enumeração direta em uma amostra pequena',()=>{
 function count(l,state=initialState(l)){if(!state.values.some(Boolean))return Number(isWon(l,state));let n=0;for(let i=0;i<l.pieces.length;i++)if(state.values[i]){const tr=transition(l,state,l.pieces[i].id);n+=count(l,tr.state);}return n;}
 for(const l of CAMPAIGN.filter(l=>l.pieces.length<=5).filter((_,i)=>i%5===0).slice(0,20))assert.equal(count(l),l.validation.alternatives.solutionCount,`fase${l.id}`);
});

test('ritmo editorial,conceitos antigos e timing persistem até o final',()=>{
 for(let c=2;c<=20;c++)assert.deepEqual(partition(CAMPAIGN.filter(l=>l.chapter===c),'role'),{'variação':4,'retomada':4,'combinação':11,'aprofundamento':4,'marcante':2});
 for(const concept of Object.keys(CONCEPTS)){assert(CAMPAIGN.some(l=>l.primaryConcept===concept),`falta família principal${concept}`);assert(CAMPAIGN.some(l=>l.id>400&&l.validation.conceptsObserved.includes(concept)),`conceito sumiu${concept}`);}
 assert(CAMPAIGN.filter(l=>l.validation.timedPieces>0).length>=250);
 const last=CAMPAIGN.at(-1);assert(last.validation.timedPieces>0&&last.validation.dependencyDepth>=4&&last.validation.alternatives.requiredPrecedences.length>=16);
 for(const l of CAMPAIGN.filter(l=>l.role==='retomada'))assert(l.validation.dependencyDepth<=3&&l.validation.alternatives.requiredPrecedences.length<=9);
 for(const l of CAMPAIGN.slice(14))assert(l.validation.primaryPrecedenceSupported,`descoberta sem apoio de precedências${l.id}`);
});

test('80reservas independentes e certificadas,com introduções compatíveis',()=>{
 assert.equal(FALLBACK_LEVELS.length,80);const campaign=new Set(CAMPAIGN.map(levelSignature)),reserve=new Set();
 for(const l of FALLBACK_LEVELS){assert(replay(l,l.solution).solved);const sig=levelSignature(l);assert(!campaign.has(sig));assert(!reserve.has(sig));reserve.add(sig);}
 for(let d=0;d<=7;d++)for(const introduction of [undefined,'single','corner','four']){
  const options={difficulty:d,allowedConfigurations:introduction?['original',introduction]:['original'],...(introduction?{introduction}:{})};
  const a=selectFallback(8100+d,options),b=selectFallback(String(8100+d),options);assert.deepEqual(a,b);assert(replay(a.level,a.level.solution).solved);
  assert(kinds(a.level).every(k=>options.allowedConfigurations.includes(k)));
  if(introduction){assert(a.level.pieces.length<=5);assert.equal(a.level.pieces.filter(p=>configurationOf(p.directions)===introduction).length,1);}
 }
});

test('120 desafios Endless sequenciais com histórico recente: determinísticos, certificados e distintos',()=>{
 const campaign=new Set(CAMPAIGN.map(levelSignature)),seen=new Set();let recentSignatures=[],recentFamilies=[];
 for(let d=0;d<=7;d++)for(let i=0;i<15;i++){
  const options={difficulty:d,allowedConfigurations:d<2?['original']:d<4?['original','single']:d<6?['original','single','corner']:['original','single','corner','four'],recentSignatures,recentFamilies};
  const seed=701335+i*1147+d*104729,a=generateRepasse(seed,options),b=generateRepasse(String(seed),options);
  assert.deepEqual(a,b);assert.equal(a.generatorVersion,GENERATOR_VERSION);assert(replay(a.level,a.level.solution).solved);
  assert(kinds(a.level).every(k=>options.allowedConfigurations.includes(k)));assert(a.level.validation.maxValue<=99);
  assert(!campaign.has(a.signature),`seed${seed} repetiu campanha`);assert(!seen.has(a.signature),`seed${seed} repetiu amostra`);seen.add(a.signature);recentSignatures=[...recentSignatures,a.signature].slice(-24);recentFamilies=[...recentFamilies,a.family].slice(-24);
 }
});

test('gerador respeita introduções e evita a assinatura recente quando há alternativa',()=>{
 for(const introduction of ['single','corner','four'])for(let i=0;i<8;i++){
  const options={difficulty:7,allowedConfigurations:['original','single','corner','four'],introduction},a=generateRepasse(98137+i,options);
  assert(a.level.pieces.length>=3&&a.level.pieces.length<=5);assert.equal(a.level.pieces.filter(p=>configurationOf(p.directions)===introduction).length,1);
  assert(kinds(a.level).every(k=>k==='original'||k===introduction));assert(replay(a.level,a.level.solution).solved);
  const b=generateRepasse(98137+i,{...options,recentSignatures:[a.signature],recentFamilies:[a.family]});assert.notEqual(b.signature,a.signature);
 }
});

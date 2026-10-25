/** Offline authorship. Generates materialized records; never imported by the UI. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {RULES_VERSION,DIRECTIONS,SIDES,configurationOf,replay,validateLevel} from '../dist/repasse/engine.mjs';
import {GENERATOR_VERSION,CHAPTERS,DIFFICULTIES,CONCEPTS,seedNumber,randomFor,buildCandidate,describeReplay,analyzeAlternatives,levelSignature,topologySignature} from '../dist/repasse/generator.mjs';
const H=['left','right'],V=['up','down'];
const zeros=(r,c)=>({top:Array(c).fill(0),bottom:Array(c).fill(0),left:Array(r).fill(0),right:Array(r).fill(0)});
const roles=['variação','retomada','combinação','variação','combinação','aprofundamento','retomada','combinação','variação','combinação','aprofundamento','combinação','marcante','retomada','combinação','variação','combinação','aprofundamento','combinação','retomada','combinação','aprofundamento','combinação','combinação','marcante'];
const focus=['receive','receive','passage','accumulate','timing','destinations','reunite','linked','asymmetry','shared','protect','destinations','endgame','linked','destinations','roles','timing','asymmetry','linked','timing'];
const debut={201:'single',276:'corner',351:'four'};
const conceptFrom={receive:1,destinations:1,asymmetry:2,accumulate:2,passage:3,protect:3,timing:4,handoff:5,endgame:5,shared:6,unequal:6,reunite:7,roles:8,linked:8};
const levels=[],signatureSeen=new Map(),topologySeen=new Map(),attemptRecords=[];
const stageFor=id=>id<=25?0:id<=75?1:id<=125?2:id<=200?3:id<=300?4:id<=400?5:id<=450?6:7;
const categoryFor=id=>id<=200?'Básico':id<=300?'Intermediário':id<=400?'Avançado':'Mestre';
const isExpanded=id=>{if(id<=200)return false;const chapter=Math.ceil(id/25),slot=(id-1)%25+1;return slot%2===1&&(chapter%2===1||slot<25);};
const familyFor=(id,role)=>{
 const chapter=Math.ceil(id/25),slot=(id-1)%25;
 if(debut[id])return 'receive';
 if(role==='variação')return focus[chapter-1];
 const available=Object.keys(CONCEPTS).filter(f=>conceptFrom[f]<=chapter);
 if(role==='retomada')return ['receive','accumulate','passage','timing'].filter(f=>available.includes(f))[(chapter+slot)%Math.min(4,available.filter(f=>['receive','accumulate','passage','timing'].includes(f)).length)];
 if(role==='marcante'&&chapter>=7)return chapter%3===0?'reunite':chapter%3===1?'timing':'linked';
 const weighted=[...available,...(chapter>=5?['timing','timing','handoff']:[])];
 return weighted[(id*7+chapter+slot)%weighted.length];
};
const configsFor=id=>{
 if(!isExpanded(id))return [];
 if(debut[id])return[debut[id]];
 const available=id<276?['single']:id<351?['single','corner']:['single','corner','four'];
 const primary=available[Math.floor((id-201)/2)%available.length];
 return id>300&&id%7===0?[primary,...available.filter(x=>x!==primary).slice(0,id>400?2:1)]:[primary];
};
function materialize({name,rows,cols,pieces,order,primaryConcept,discovery,intentionalPair}){
 const list=pieces.map(([row,col,value,directions],i)=>({id:'p'+(i+1),row,col,value,directions:[...directions]}));
 const draft={id:'tutorial',version:1,rulesVersion:RULES_VERSION,rows,cols,pieces:list,targets:zeros(rows,cols),solution:order.map(i=>list[i].id)};
 const solved=replay(draft,draft.solution);assert(solved.valid);
 const level={...draft,targets:solved.state.boxes,name,primaryConcept,family:primaryConcept,discovery:'Nesta fase, o jogador precisa perceber que '+discovery,configurations:['original'],hints:['Observe as direções e as metas ligadas à peça.','Quem recebe o repasse continua esperando a própria vez.','A dica da partida verifica uma sequência a partir da situação atual.']};
 const trace=describeReplay(level),alternatives=analyzeAlternatives(level);
 level.secondaryConcepts=trace.concepts.filter(x=>x!==primaryConcept);
 level.validation={replayed:true,generatorVersion:GENERATOR_VERSION,authorship:'tutorial dirigido',maxValue:trace.maxValue,maxTarget:trace.maxTarget,interactions:trace.interactions,dependencyDepth:trace.maxDepth,timedPieces:trace.timedPieces,reunions:trace.reunions,conceptsObserved:trace.concepts,alternatives,signature:levelSignature(level),topology:topologySignature(level),...(intentionalPair?{intentionalPair}: {})};
 return {level,trace,alternatives};
}
const tutorials=[
 {name:'Um clique, dois repasses',rows:1,cols:1,pieces:[[0,0,1,H]],order:[0],primaryConcept:'endgame',discovery:'o valor inteiro vai uma vez para cada lado e a peça desaparece.'},
 {name:'Também para cima e para baixo',rows:1,cols:1,pieces:[[0,0,2,V]],order:[0],primaryConcept:'endgame',discovery:'as setas verticais levam o valor inteiro às caixas de cima e de baixo.',intentionalPair:'Introdução das duas orientações: equivalente à fase 1 por rotação e escala.'},
 {name:'Quem recebe fica',rows:1,cols:2,pieces:[[0,0,1,H],[0,1,2,V]],order:[0,1],primaryConcept:'receive',discovery:'receber aumenta o número, mas não retira nem dispara a outra peça.'},
 {name:'O valor atual é o que segue',rows:1,cols:2,pieces:[[0,0,1,H],[0,1,2,H]],order:[0,1],primaryConcept:'receive',discovery:'uma peça que recebeu1 passa de2 para3 e depois envia3 em cada direção.'},
 {name:'O vazio deixa passar',rows:1,cols:3,pieces:[[0,0,1,H],[0,2,2,V]],order:[0,1],primaryConcept:'receive',discovery:'o repasse atravessa a casa vazia e para no primeiro número.',intentionalPair:'Introdução explícita de espaço vazio: mesmas relações da fase 3, com uma casa vazia.'},
 {name:'Receber de outro eixo',rows:2,cols:2,pieces:[[0,0,1,H],[0,1,1,V],[1,1,1,H]],order:[0,1,2],primaryConcept:'receive',discovery:'as setas definem a emissão; a peça pode receber de qualquer lado.'},
 {name:'Juntar no centro',rows:1,cols:3,pieces:[[0,0,1,H],[0,1,2,V],[0,2,3,H]],order:[0,2,1],primaryConcept:'accumulate',discovery:'o centro precisa reunir as duas contribuições antes de sair.',intentionalPair:'ExemploB/Juntar; a mesma grade volta nas fases 8 e 9 com metas e raciocínios diferentes.'},
 {name:'Na hora certa',rows:1,cols:3,pieces:[[0,0,1,H],[0,1,2,V],[0,2,3,H]],order:[0,1,2],primaryConcept:'timing',discovery:'o centro recebe a primeira contribuição e sai antes da segunda.',intentionalPair:'ExemploB/Na hora certa; mesmas peças da fase 7, metas e precedências diferentes.'},
 {name:'Abrir o caminho',rows:1,cols:3,pieces:[[0,0,1,H],[0,1,2,V],[0,2,3,H]],order:[1,0,2],primaryConcept:'passage',discovery:'o centro precisa sair antes para deixar o repasse atravessar.',intentionalPair:'ExemploB/Abrir caminho; mesmas peças da fase 7, metas e precedências diferentes.'},
 {name:'Quatro retiradas conectadas',rows:2,cols:2,pieces:[[0,0,1,H],[0,1,2,V],[1,0,3,V],[1,1,4,H]],order:[0,1,3,2],primaryConcept:'receive',discovery:'cada retirada prepara o valor da próxima: 1, 3, 7 e 10.',intentionalPair:'ExemploA original do documento: solução única verificada por enumeração com cache.'},
 {name:'Duas peças recebem',rows:1,cols:3,pieces:[[0,0,1,V],[0,1,1,H],[0,2,2,V]],order:[1,0,2],primaryConcept:'destinations',discovery:'um único clique pode preparar dois receptores que permanecem na grade.'},
 {name:'Os primeiros vizinhos',rows:2,cols:2,pieces:[[0,0,1,H],[0,1,1,H],[1,0,1,V],[1,1,1,V]],order:[0,2,1,3],primaryConcept:'receive',discovery:'o primeiro número encontrado interrompe o repasse naquele sentido.'},
 {name:'A soma muda de direção',rows:2,cols:3,pieces:[[0,0,1,H],[0,1,1,V],[1,1,1,H],[1,2,1,V]],order:[0,1,2,3],primaryConcept:'receive',discovery:'cada receptor conserva as próprias setas ao receber uma soma.'},
 {name:'As caixas também somam',rows:3,cols:1,pieces:[[0,0,1,V],[1,0,1,V],[2,0,1,V]],order:[1,0,2],primaryConcept:'asymmetry',discovery:'mais de uma retirada pode contribuir para a mesma caixa da borda.'}
];
function attach(candidate,id,role,difficulty){
 const l=candidate.level;
 Object.assign(l,{id,category:categoryFor(id),stage:DIFFICULTIES[stageFor(id)],chapter:Math.ceil(id/25),role,difficulty});
 l.validation.signature=levelSignature(l);l.validation.topology=topologySignature(l);
 if(debut[id])l.introduction=debut[id];
 if(id<=14)l.tutorial=true;
 if(id===201){l.name='Uma seta, um destino';l.discovery='Nesta fase, o jogador precisa perceber que uma seta envia o valor inteiro só naquele sentido. A peça ainda recebe de qualquer direção.';}
 if(id===276){l.name='Duas direções em curva';l.discovery='Nesta fase, o jogador precisa perceber que as duas setas perpendiculares enviam o valor inteiro em dois eixos, sem movimento diagonal.';}
 if(id===351){l.name='Quatro destinos, um clique';l.discovery='Nesta fase, o jogador precisa perceber que quatro setas fazem quatro repasses do valor inteiro.';}
 if(id===500)l.name='A hora de cada um';
 return l;
}

for(let id=1;id<=500;id++){
 const chapter=Math.ceil(id/25),slot=(id-1)%25,role=id<=25?'introdução':roles[slot],baseDifficulty=stageFor(id),difficulty=debut[id]?Math.min(baseDifficulty,2):role==='retomada'?Math.max(1,baseDifficulty-2):baseDifficulty;
 let selected,attempts=0;
 if(id<=tutorials.length)selected=materialize(tutorials[id-1]);
 else{
  const family=familyFor(id,role),requiredConfigurations=configsFor(id),rng=randomFor(id*4817+197609),pool=[];
  const expectedN=debut[id]?4:role==='retomada'?Math.min(6,3+Math.floor(chapter/4)):chapter===17?6+(id%2):id<=25?4+(id%2):Math.min(10,3+Math.ceil(baseDifficulty*.8)+(role==='aprofundamento'||role==='marcante'?1:0)+(id%2));
  const maxAttempts=1600;
  for(let a=0;a<maxAttempts;a++){
   attempts=a+1;
   const seed=seedNumber(Math.imul(id,0x9e3779b9)+Math.imul(a+1,0x85ebca6b));
   const count=Math.max(3,Math.min(10,expectedN+(a%5===0?1:a%11===0?-1:0)));
   const candidate=buildCandidate(seed,{difficulty,family,pieceCount:count,requiredConfigurations,introduction:debut[id],maxInitial:id<=25?2:role==='retomada'?2:3,maxValue:id<=25?24:id<=75?32:id<=200?72:99,requireComplete:true,requireNecessary:true,maxStates:60000,randomStructure:a%3===0});
   if(!candidate)continue;
   const {level,trace,alternatives}=candidate,signature=level.validation.signature,topology=level.validation.topology;
   if(signatureSeen.has(signature)||topologySeen.has(topology))continue;
   if(requiredConfigurations.some(k=>!level.configurations.includes(k)))continue;
   if(!requiredConfigurations.length&&level.configurations.some(k=>k!=='original'))continue;
   if(id===500&&!(trace.timedPieces&&trace.accumulators>=1&&trace.maxDepth>=4&&alternatives.requiredPrecedences.length>=16))continue;
   if(role==='retomada'&&(trace.maxDepth>3||alternatives.requiredPrecedences.length>9||alternatives.winningFraction<.015))continue;
   const density=alternatives.requiredPrecedences.length/(level.pieces.length*(level.pieces.length-1)/2);
   const burden=Math.log2(alternatives.totalOrders/alternatives.solutionCount);
   const actualDifficulty=trace.maxDepth+trace.timedPieces*.7+burden*.5+density*2;
   const desired=role==='retomada'?4+baseDifficulty*.25:role==='aprofundamento'||role==='marcante'?6+baseDifficulty*1.2:4+baseDifficulty*.9;
   let score=-Math.abs(actualDifficulty-desired)+Math.min(2,trace.timedPieces*.35);
   if(role==='combinação')score+=Math.min(3,trace.concepts.filter(c=>!['receive','asymmetry','endgame'].includes(c)).length*.5);
   if(role==='marcante')score+=Math.min(2,trace.maxDepth*.25)+Math.min(2,trace.reunions);
   if(chapter===17)score+=density*3;
   pool.push({...candidate,score});
   if(pool.length>=12||pool.length>=4&&a>140)break;
  }
  if(!pool.length)throw new Error(`Sem candidata ${id}, família${family}, n${expectedN}, tipos${requiredConfigurations}, tentativas${attempts}`);
  pool.sort((a,b)=>b.score-a.score);selected=pool[0];
 }
 const level=attach(selected,id,role,difficulty),sig=level.validation.signature,top=level.validation.topology;
 if(signatureSeen.has(sig)){assert(level.validation.intentionalPair,'duplicata sem justificativa');level.validation.equivalentTo=signatureSeen.get(sig);}
 if(topologySeen.has(top))level.validation.sameTopologyAs=topologySeen.get(top);
 signatureSeen.set(sig,id);topologySeen.set(top,id);levels.push(level);
 attemptRecords.push({id,attempts});
 if(id%25===0)console.log(`capítulo${chapter}: ${levels.length} fases; última ${level.primaryConcept}, ${level.pieces.length}peças, ${level.validation.alternatives.solutionCount} ordens, ${attempts}tentativas`);
}

const reserves=[],reserveSignatures=new Set(signatureSeen.keys());
for(let difficulty=0;difficulty<=7;difficulty++){
 const specs=[[],[],[],[],['single'],['single'],['corner'],['corner'],['four'],['four']];
 for(let slot=0;slot<specs.length;slot++){
  const configuration=specs[slot][0],introduction=configuration;
  let chosen;
  for(let attempt=0;attempt<600;attempt++){
   const seed=seedNumber(0x602ea51+Math.imul(difficulty+1,0x9e3779b9)+Math.imul(slot+1,0x85ebca6b)+attempt*977);
   const family=configuration?['receive','destinations','shared','endgame'][attempt%4]:['receive','accumulate','passage','timing','reunite','protect','handoff','shared'][(difficulty+slot+attempt)%8];
   const candidate=buildCandidate(seed,{difficulty,family,pieceCount:configuration?4:Math.min(9,4+Math.floor(difficulty/2)),introduction,requiredConfigurations:specs[slot],maxValue:difficulty<2?24:99,maxInitial:difficulty<2?2:3,requireComplete:true,requireNecessary:true,randomStructure:attempt%3===0});
   if(!candidate||reserveSignatures.has(candidate.level.validation.signature))continue;
   chosen=candidate.level;reserveSignatures.add(chosen.validation.signature);break;
  }
  assert(chosen,`reserva indisponível${difficulty}/${slot}`);
  Object.assign(chosen,{id:`reserve-${difficulty}-${slot}`,category:'Modo livre',stage:DIFFICULTIES[difficulty],chapter:0,role:configuration?'introdução':'retomada',difficulty,...(configuration?{introduction:configuration}:{})});
  reserves.push(chosen);
 }
}

fs.writeFileSync(new URL('../dist/repasse/campaign.mjs',import.meta.url),`/** Catálogo estável:500 definições materializadas e certificadas. Gerado offline por tests/repasse-build-campaign.mjs. */\nexport {CHAPTERS, DIFFICULTIES, CONCEPTS} from './generator.mjs';\nexport const CAMPAIGN = ${JSON.stringify(levels)};\n`);
const fallbackCode=`/** Reserva independente da campanha. Cada registro foi reproduzido pelo motor. */
import {GENERATOR_VERSION,normalizeGeneratorOptions,seedNumber,levelSignature} from './generator.mjs';
import {replay,configurationOf} from './engine.mjs';
export const FALLBACK_LEVELS=${JSON.stringify(reserves)};
export function selectFallback(seed,options={}){
 const normalized=normalizeGeneratorOptions(options),numericSeed=seedNumber(seed),allowed=new Set(normalized.allowedConfigurations);
 const eligible=FALLBACK_LEVELS.filter(level=>level.pieces.every(p=>allowed.has(configurationOf(p.directions)))&&(!normalized.introduction||(level.pieces.length>=3&&level.pieces.length<=5&&level.pieces.filter(p=>configurationOf(p.directions)===normalized.introduction).length===1&&level.pieces.every(p=>['original',normalized.introduction].includes(configurationOf(p.directions))))));
 if(!eligible.length)throw new Error('Não há reserva compatível com as configurações permitidas.');
 const ranked=eligible.map((level,index)=>({level,score:Math.abs(level.difficulty-normalized.difficulty)*20+(normalized.recentSignatures.includes(levelSignature(level))?1000:0)+normalized.recentFamilies.filter(x=>x===level.primaryConcept).length*8,tie:(index+numericSeed)%eligible.length})).sort((a,b)=>a.score-b.score||a.tie-b.tie);
 const level=JSON.parse(JSON.stringify(ranked[0].level)),verified=replay(level,level.solution);if(!verified.valid||!verified.solved)throw new Error('Reserva sem solução certificada.');
 const reserveId=level.id;level.id='endless-'+GENERATOR_VERSION+'-'+numericSeed;level.generation={seed:numericSeed,generatorVersion:GENERATOR_VERSION,options:normalized,source:'reserve',reserveId};
 return {level,seed:numericSeed,generatorVersion:GENERATOR_VERSION,options:normalized,signature:levelSignature(level),family:level.primaryConcept,source:'reserve',diagnostics:{replayed:true,reserveId,maxValue:level.validation.maxValue}};
}
`;
fs.writeFileSync(new URL('../dist/repasse/fallback.mjs',import.meta.url),fallbackCode);
fs.writeFileSync(new URL('./repasse-build-attempts.json',import.meta.url),JSON.stringify(attemptRecords,null,2)+'\n');
console.log(`MATERIALIZADO: ${levels.length} fases e ${reserves.length} reservas independentes.`);

/** Reproducible content build. Run from the checkout with Node. No dependencies. */
import {writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {generateLevel,structuralSignature,antiSpamAudit,analyzeSolution,CHAPTERS,DIFFICULTIES,MECHANICS,GENERATOR_VERSION} from '../dist/sintonia/generator.mjs';
import {replay,validateLevel,solveLevel,RULES_VERSION} from '../dist/sintonia/engine.mjs';

const ROOT=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const roles=['focus','mix','focus','compact','revisit','mix','focus','mix','deep','revisit','mix','compact','focus','mix','revisit','mix','deep','compact','mix','revisit','mix','compact','deep','revisit','synthesis'];
const primaryByChapter=['walls','walls','walls','plate','switch','key','key','box','ice','portal','oneway','alternate','fragile','handoff','and','and','selector','delivery','delivery','selector'];
function animalCount(chapter,position){
  if(chapter<=6)return 2;
  const role=roles[position-1];
  if(chapter===7)return ['revisit','compact'].includes(role)||position===14?2:3;
  if(chapter===8)return ['revisit','compact'].includes(role)||[1,3,7].includes(position)?2:3;
  if(chapter===9)return ['revisit','compact','focus'].includes(role)?2:3;
  if(chapter<=14)return ['revisit','compact'].includes(role)?2:3;
  if(chapter===15)return role==='revisit'?2:3;
  if(role==='revisit')return 2;
  return [1,6,8,11,14,16,17,19,21,25].includes(position)?4:3;
}
function difficulty(number){return number<=25?0:number<=100?1:number<=225?2:number<=350?3:number<=450?4:5;}
function profileFor(chapter,position){
  const role=roles[position-1],known=MECHANICS.filter(m=>m.introducedChapter<chapter).map(m=>m.id);
  let primary=primaryByChapter[chapter-1],secondary=null;
  const old=known.filter(m=>!['walls','handoff','and','selector','delivery'].includes(m));
  if(role==='revisit'){
    const revisitIndex=[5,10,15,20,24].indexOf(position);
    primary=revisitIndex===0||!old.length?'walls':old[(chapter+revisitIndex*2)%old.length];
  }
  if(chapter===7&&role!=='revisit')primary=['plate','switch','key'][(position-1)%3];
  if(chapter===16&&role!=='revisit')primary=['plate','key','box','alternate','and'][(position-1)%5];
  if(chapter>=19&&role!=='revisit')primary=['and','selector','delivery','alternate','handoff','box','fragile','portal'][(chapter+position)%8];
  if(['mix','deep','synthesis'].includes(role)){
    const secondaryPool=known.filter(m=>['ice','portal','oneway','fragile','box'].includes(m)&&m!==primary);
    secondary=secondaryPool.length?secondaryPool[(chapter+position)%secondaryPool.length]:null;
  }
  const result={primary,secondary,role,introduction:position===1&&chapter!==2&&chapter!==3&&chapter!==7&&chapter!==16&&chapter<19};
  if(chapter===1){result.minDepth=position===1?1:position<9?2:position<16?3:4;result.maxDepth=position===1?1:position===2?2:Math.min(8,result.minDepth+3);}
  if(chapter===2){result.minDepth=role==='revisit'?4:5;result.maxDepth=role==='deep'?13:10;}
  if(chapter===3){result.minDepth=role==='revisit'?5:6;result.maxDepth=role==='deep'?14:12;}
  return result;
}
function fixture(){return {
  id:'sintonia-0051',version:1,rulesVersion:1,generatorVersion:GENERATOR_VERSION,number:51,name:'Antes do fim',chapter:3,difficulty:1,family:'intermediate-stop',secondaryFamilies:['goal-transit','unequal-loop'],
  lesson:'Mude de direção antes do fim do corredor e use o destino como passagem.',
  hints:['O corredor do tuiuiú tem uma casa a mais.','Use essa diferença para desalinhar os animais antes de descer.','Peça uma dica concreta para a configuração atual.'],mechanics:['walls'],prerequisites:['walls'],introduction:[],
  boards:[{id:'b0',animal:'capivara',rows:2,cols:3,walkable:[0,1,4],start:0,goal:1},{id:'b1',animal:'tuiuiu',rows:2,cols:3,walkable:[0,1,2,4],start:0,goal:4}],solution:['right','right','left','down','right'],seed:'reference-2x3-v1',parameters:{difficulty:1,animals:2,primary:'walls',secondary:null,role:'focus'},
  certificate:{method:'breadth-first-witness-and-engine-replay',rulesVersion:1,commands:5,optimal:true,replayed:true},editorial:{source:'authored-reference',humanPlaytested:false,compatibility:'validated',alternatives:'A exploração completa demonstra que cinco comandos são suficientes e mínimos.',deadEnds:'As paredes não consomem recursos; desfazer continua disponível.'}
};}
const levels=[],seen=new Set(),topologies=new Set(),failures=[],started=Date.now();
for(let number=1;number<=500;number++){
  const chapter=Math.ceil(number/25),position=(number-1)%25+1,animals=animalCount(chapter,position),profile=profileFor(chapter,position),d=difficulty(number);let level;
  if(number===51)level=fixture();
  else{
    let generated;
    for(let retry=0;retry<15;retry++){
      const seed=`sintonia-campaign-v1:${String(number).padStart(4,'0')}:${retry}`;
      try{generated=generateLevel(seed,{difficulty:d,animals,profile,strictSweep:number>12,maxStates:65000,maxMs:15000,recentSignatures:[...seen,...topologies]});break;}
      catch(error){failures.push({number,retry,diagnostics:error.diagnostics});}
    }
    if(!generated)throw new Error(`Could not generate ${number}: ${JSON.stringify(failures.at(-1))}`);
    level=generated.level;
    level.id=`sintonia-${String(number).padStart(4,'0')}`;level.number=number;level.chapter=chapter;
    level.name=`${level.name} ${String(position).padStart(2,'0')}`;
    if(number===1){level.name='Uma seta para todos';level.lesson='O mesmo comando move todos os animais. Leve cada um ao seu destino.';level.hints=['Todos recebem a mesma seta.','Compare a direção entre cada animal e seu destino.','Peça uma dica concreta para a configuração atual.'];level.editorial.discovery='Aqui o jogador precisa descobrir que o mesmo comando pode levar todos aos destinos.';}
  }
  level.signature=structuralSignature(level);level.topologySignature=structuralSignature(level,{topologyOnly:true});
  if(seen.has(level.signature)||topologies.has(level.topologySignature))throw new Error(`Duplicate content at ${number}`);
  seen.add(level.signature);topologies.add(level.topologySignature);
  level.editorial.role=roles[position-1];level.editorial.discovery ||= 'Aqui o jogador precisa descobrir que é necessário mudar de direção antes do fim de um corredor e sair de um destino para preparar a chegada conjunta.';
  level.editorial.reasoning=analyzeSolution(level,level.solution);
  level.editorial.prerequisiteChapters=[...new Set(level.mechanics.map(id=>MECHANICS.find(m=>m.id===id)?.introducedChapter||1))].sort((a,b)=>a-b);
  if(level.editorial.prerequisiteChapters.some(c=>c>chapter))throw new Error(`Early mechanism at ${number}`);
  if(!validateLevel(level).valid||!replay(level,level.solution).won)throw new Error(`Certificate failed at ${number}`);
  level.editorial.antiSpam=antiSpamAudit(level,{maxMs:5000,randomRuns:12});
  level.editorial.repetition={structuralSignature:level.signature,topologySignature:level.topologySignature,globallyRotatedOrReflectedDuplicate:false};
  levels.push(level);
  if(number%25===0)console.log(JSON.stringify({chapter,levels:number,seconds:Math.round((Date.now()-started)/1000),lastMoves:level.solution.length,lastMechanics:level.mechanics}));
}
mkdirSync(resolve(ROOT,'dist/sintonia'),{recursive:true});
writeFileSync(resolve(ROOT,'dist/sintonia/campaign.mjs'),`/** 500 materialized SINTONIA levels; regenerate with tests/sintonia-build-campaign.mjs. */\nexport {CHAPTERS, DIFFICULTIES} from './generator.mjs';\nexport const CAMPAIGN = ${JSON.stringify(levels,null,2)};\n`);
const ranges=[[1,25],[26,100],[101,225],[226,350],[351,450],[451,500]].map(([from,to])=>({from,to,counts:[2,3,4].map(n=>levels.slice(from-1,to).filter(l=>l.boards.length===n).length)}));
const report={schemaVersion:1,rulesVersion:RULES_VERSION,generatorVersion:GENERATOR_VERSION,total:levels.length,ranges,animals:[2,3,4].map(n=>({animals:n,count:levels.filter(l=>l.boards.length===n).length})),uniqueDefinitions:seen.size,uniqueTopologies:topologies.size,certified:levels.filter(l=>replay(l,l.solution).won).length,optimalCertificates:levels.filter(l=>l.certificate.optimal).length,
  mechanics:Object.fromEntries(MECHANICS.map(m=>[m.id,{count:levels.filter(l=>l.mechanics.includes(m.id)).length,first:levels.find(l=>l.mechanics.includes(m.id))?.number}])),families:Object.fromEntries([...new Set(levels.map(l=>l.family))].map(f=>[f,levels.filter(l=>l.family===f).length])),
  antiSpam:{singleDirectionSolvable:levels.filter(l=>l.editorial.antiSpam.singleDirection.winningDirections.length).map(l=>l.number),sweepSolvable:levels.filter(l=>l.editorial.antiSpam.sweeps.solves).map(l=>l.number),sweepInconclusive:levels.filter(l=>l.editorial.antiSpam.sweeps.status!=='complete').map(l=>l.number),shortCycleSolvable:levels.filter(l=>l.editorial.antiSpam.shortCycles.winningPatterns.length).map(l=>l.number),biasedRandomWins:levels.reduce((sum,l)=>sum+l.editorial.antiSpam.biasedRandom.wins,0),biasedRandomRuns:levels.reduce((sum,l)=>sum+l.editorial.antiSpam.biasedRandom.runs,0),uniformRandomWins:levels.reduce((sum,l)=>sum+l.editorial.antiSpam.uniformRandom.wins,0),uniformRandomRuns:levels.reduce((sum,l)=>sum+l.editorial.antiSpam.uniformRandom.runs,0)},
  chapters:CHAPTERS.map((title,i)=>{const chapter=levels.slice(i*25,i*25+25);return {number:i+1,title,roleCounts:Object.fromEntries([...new Set(roles)].map(role=>[role,chapter.filter(l=>l.editorial.role===role).length])),moves:{min:Math.min(...chapter.map(l=>l.solution.length)),max:Math.max(...chapter.map(l=>l.solution.length)),mean:Math.round(chapter.reduce((s,l)=>s+l.solution.length,0)/25*10)/10},animals:[2,3,4].map(n=>chapter.filter(l=>l.boards.length===n).length)};}),
  humanPlaytesting:false,notes:['Solubilidade, condições, diversidade estrutural e padrões automáticos foram verificados pelo motor.','A dificuldade é uma hipótese de design baseada em dependências, estados e ritmo; não representa um estudo com jogadores.','Comandos sem efeito são excluídos das soluções. Todas as fases continuam acessíveis sem limite de movimentos.'],generationRetries:failures.length};
writeFileSync(resolve(ROOT,'tests/sintonia-campaign-audit.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({done:true,total:levels.length,ranges,seconds:Math.round((Date.now()-started)/1000)}));

// A separate bank is generated from different seeds, never copied from the 500
// campaign entries. It is useful even when Worker cannot be created.
const bank=[];
for(let d=0;d<6;d++)for(let i=0;i<6;i++){
  const palette=d===0?['walls']:d===1?['walls','plate']:d===2?['walls','plate','switch','key','box','ice']:d===3?['walls','portal','oneway','alternate','fragile','handoff']:['walls','plate','and','selector','delivery','box'];
  const primary=palette[i%palette.length],animals=i<3?2:d<2?2:d<4?3:i===5?4:3;
  const generated=generateLevel(`sintonia-fallback-v1:${d}:${i}`,{difficulty:d,animals,profile:{primary,role:i===0?'revisit':'focus'},maxStates:60000,maxMs:18000,strictSweep:d>0,recentSignatures:[...seen,...topologies,...bank.map(l=>l.signature)]});
  const level=generated.level;level.id=`sintonia-fallback-${d}-${i}`;level.editorial.source='separate-certified-fallback-bank';bank.push(level);
}
const fallbackSource=`/** Separate replay-certified safety bank. No synchronous search is performed. */\nimport {replay} from './engine.mjs';\nimport {hashString,familyRecencyPenalty} from './generator.mjs';\nexport const FALLBACK_LEVELS=${JSON.stringify(bank)};\nexport function selectCertifiedFallback(seed,{difficulty=0,learnedMechanics,recentSignatures=[],recentFamilies=[],usedFallbackIds=[],animals}={}) {\n const learned=Array.isArray(learnedMechanics)?new Set(['walls',...learnedMechanics]):null,recent=new Set(recentSignatures),used=new Set(usedFallbackIds);\n let pool=FALLBACK_LEVELS.filter(level=>(!learned||level.mechanics.filter(m=>!learned.has(m)).length<=1)&&(!animals||level.boards.length===animals));\n if(!pool.length)pool=FALLBACK_LEVELS.filter(level=>level.mechanics.length===1);\n const rotation=hashString(seed);\n pool=pool.map((level,index)=>({level,index,score:Math.abs(level.difficulty-difficulty)*20+(recent.has(level.signature)?100:0)+(used.has(level.id)?50:0)+familyRecencyPenalty(level.family,recentFamilies)})).sort((a,b)=>a.score-b.score||((a.index+rotation)%FALLBACK_LEVELS.length)-((b.index+rotation)%FALLBACK_LEVELS.length));\n for(const {level:stored} of pool){const level=JSON.parse(JSON.stringify(stored)),checked=replay(level,level.solution);if(!checked.valid||!checked.won)continue;level.introduction=learned?level.mechanics.filter(m=>!learned.has(m)):[];return {level,solution:level.solution,signature:level.signature,validation:{valid:true,replayed:true,origin:'fallback',requestSeed:String(seed),fallbackId:level.id}};}\n throw new Error('Nenhum desafio de segurança certificado está disponível.');\n}\n`;
writeFileSync(resolve(ROOT,'dist/sintonia/fallback.mjs'),fallbackSource);
console.log(JSON.stringify({fallback:bank.length,seconds:Math.round((Date.now()-started)/1000)}));

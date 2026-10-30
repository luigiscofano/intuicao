/** Offline editorial selection/recomposition; never loaded by the application. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {ELO_CAMPAIGN as originals} from './fixtures/elo200-campaign.mjs';
import {ELO_CAMPAIGN_ANSWERS as oldAnswers} from './fixtures/elo200-answers.mjs';
import {productionSolve} from './elo-campaign-build.mjs';
import {validateElo,analyzeEloLocal} from '../dist/elo-rules.mjs';
import {levelHash,explainElo,reasoningEngineHash,reasoningMethodVersion} from './elo-campaign-reasoning.mjs';
const read=p=>JSON.parse(fs.readFileSync(new URL(p,import.meta.url)));
const certificates=read('./elo-campaign-certificates.json').levels;
const recompositions=read('./elo80-recompositions.json');
const selected=[1,2,3,6,4,7,5,8,9,21,37,10,22,23,26,41,11,46,38,42,12,57,39,61,58,62,13,63,59,77,81,82,14,97,66,84,53,99,101,102,98,105,92,119,95,121,122,54,126,118,132,139,136,141,142,138,143,152,147,155,161,162,146,166,172,169,177,181,182,178,186,159,185,192,189,109,157,171,190,198];
assert.equal(selected.length,80);
const names=['Básico','Aprendiz','Intermediário','Avançado','Mestre','Modo Sábio'];
const keys={shapes:['shapes'],passages:['passages'],forbiddenEdges:['forbiddenEdges'],counts:['rowCounts','colCounts'],distances:['distances'],neighbors:['neighbors'],order:['order'],cuts:['cuts'],exclusivePassages:['exclusivePassages']};
const familyOf=k=>Object.keys(keys).find(f=>keys[f].includes(k));
const intro={shapes:10,passages:16,forbiddenEdges:24,counts:31,distances:39,neighbors:46,order:54,cuts:61,exclusivePassages:68};
const ideas={shapes:'O formato do ponto elimina alinhamentos com a orientação errada.',passages:'A casa vazia exige extremos alinhados em lados opostos; um terceiro ponto redefine a visibilidade.',forbiddenEdges:'Uma ligação automática não pode percorrer o trecho vedado; mudar os pontos, não esconder a ligação.',counts:'As cotas incluem os fixos e disputam a capacidade das regiões na linha ou coluna.',distances:'Somar os intervalos entre centros dos dois vizinhos visíveis restringe o segundo extremo.',neighbors:'O par deve ser diretamente visível: um terceiro ponto entre os dois destrói a vizinhança.',order:'Alternativas locais precisam respeitar a ordem relativa dos marcos no circuito único.',cuts:'O circuito cruza cada corte um número par de vezes; a cota limita a conectividade.',exclusivePassages:'Exatamente uma casa do grupo deve ser atravessada e nenhuma recebe ponto; a escolha propaga-se às regiões distantes.'};
const levels=[],answers={},records=[],proofs={};
const output=()=>{fs.writeFileSync(new URL('../dist/elo-campaign.mjs',import.meta.url),'// ELO80: curated/recomposed offline; mathematical engine and visual presentation unchanged.\nexport const ELO_CAMPAIGN = '+JSON.stringify(levels)+';\n');fs.writeFileSync(new URL('../dist/elo-campaign-answers.mjs',import.meta.url),'// Optional reference answers, separate from solver proofs.\nexport const ELO_CAMPAIGN_ANSWERS = '+JSON.stringify(answers)+';\n');};
for(const [i,n] of selected.entries()){
 const source=originals[n-1],l=structuredClone(source),num=i+1,stage=Math.min(5,Math.floor(i/15)),p=oldAnswers[source.id];
 if(num===80){l.id='elo-v4-080';l.version=4;l.constraints={exclusivePassages:[structuredClone(source.constraints.exclusivePassages[1])],order:[0,1,9,6,4]};l.mechanics=['core','exclusivePassages','order'];l.logicIdea='Uma escolha exclusiva determina extremos e altera a ordem relativa dos marcos; refute a alternativa sem empilhar pistas.';}
 if(recompositions[num]){l.id=`elo-v4-${String(num).padStart(3,'0')}`;l.version=4;l.constraints=recompositions[num].constraints;}
 l.name=`${names[stage]} ${String(num-stage*15).padStart(2,'0')}`;l.campaignNumber=num;l.stage=stage+1;l.stageName=names[stage];l.stagePosition=num-stage*15;l.difficulty=names[stage];l.campaignVersion='elo80-v1';l.sourceLevelId=source.id;
 const present=Object.keys(keys).filter(f=>keys[f].some(k=>Object.keys(l.constraints?.[k]??{}).length));
 for(const f of present)assert.ok(num>=intro[f],`${num} prematurely introduces ${f}`);
 if(num<13)assert.ok(!Object.values(l.constraints?.shapes??{}).includes('straight'));
 const originalPrimary=['core','shapes','passages','forbiddenEdges','counts','distances','neighbors','order','cuts','exclusivePassages'][source.stage-1];
 const main=num===76?'distances':num===77?'order':num===78?'cuts':num===79||num===80?'exclusivePassages':present.includes(originalPrimary)?originalPrimary:present.at(-1)||'core';
 l.primaryFamily=main;l.secondaryFamilies=present.filter(f=>f!==main);l.mechanics=['core',...present];
 l.origin={sourceId:source.id,sourceCampaignNumber:n,sourceLevelHash:levelHash(source),mode:num===80||recompositions[num]?'recomposed':'curated-unchanged',preservedStableId:!recompositions[num]&&num!==80,changes:recompositions[num]?recompositions[num].changes:num===80?['Replace first exclusive-passage group by a decisive relative-order clue; preserve regions, fixed points and answer.']:[]};
 if(num===39)l.lesson='A distância é contada em intervalos entre centros, não em casas: as duas ligações da região 5 devem somar 3.';
 if(num>=76)l.lesson=['Síntese: distâncias e cotas.','Síntese: vizinhanças diretas e ordem relativa.','Síntese: travessias, ordem e conectividade.','Síntese: escolha exclusiva com consequências em várias regiões e distâncias.','Síntese compacta: somente duas pistas decisivas, escolha exclusiva e ordem.'][num-76];
 levels.push(l);answers[l.id]=p;
}
output(); // Make selected immutable puzzles available to independent QA immediately.
for(const l of levels){
 const start=performance.now(),p=answers[l.id],hash=levelHash(l),recomposed=l.origin.mode==='recomposed';
 assert.ok(validateElo(l,{positions:p}).complete,l.id+' solution');
 const solved=productionSolve(l,{maxNodes:3000000});assert.ok(solved.exhaustive&&solved.count===1,l.id+' exhaustive uniqueness');
 const proof=recomposed?explainElo(l,{maxDepth:2,maxEvaluations:15000}):certificates[l.id];
 assert.ok(proof?.solved&&!proof.limited&&!proof.contradiction,l.id+' explanatory proof');
 if(!recomposed){assert.equal(proof.levelHash,hash);assert.equal(proof.engineHash,reasoningEngineHash);}
 proofs[l.id]={...proof,levelHash:hash,engineHash:reasoningEngineHash,methodVersion:reasoningMethodVersion};
 const summaries=proof.steps.flatMap(s=>s.kind==='hypothesis-refutation'?[{kind:s.kind,region:s.region,cell:s.cell,text:s.explanation}]:[...(s.eliminations??[]).map(e=>({kind:'rule-elimination',region:e.index,cell:e.value,rule:e.technique,text:e.explanation})),...(s.forced??[]).map(e=>({kind:'forced-position',region:e.index,cell:e.value,rule:e.technique,text:e.explanation}))]);
 l.reasoningTrace={status:'complete',summary:summaries.slice(0,12),certificate:`tests/elo80-reasoning-certificates.json#${l.id}`,levelHash:hash};
 const candidateCores=[...new Set(proof.steps.flatMap(s=>s.kind==='hypothesis-refutation'?['hypothesis-refutation']:s.eliminations?.map(e=>e.technique)||[]))];
 let core=l.primaryFamily;
 if(core==='core')core=['crossing','closed-circuit',...(proof.refutations?['hypothesis-refutation']:[]),'third-direction'].find(c=>candidateCores.includes(c))||Object.entries(proof.techniques).sort((a,b)=>b[1]-a[1])[0][0];
 if(core==='shapes')core=Object.values(l.constraints.shapes).includes('straight')?'straight-shape':'turn-shape';
 assert.ok(!(records.length>=2&&records.at(-1).deductionCore===core&&records.at(-2).deductionCore===core),'Recurate three consecutive identical cores: '+l.campaignNumber);
 const sequence=summaries.filter(s=>l.primaryFamily==='core'?(s.rule===core||s.kind===core):s.rule?.includes(l.primaryFamily)).slice(0,4);if(!sequence.length)sequence.push(...summaries.slice(0,4));
 l.logicIdea=(l.primaryFamily==='core'?sequence[0]?.text:ideas[l.primaryFamily])||l.logicIdea;l.deductionCore=core;
 l.uniqueness={status:'unique',count:1,exhaustive:true,method:'Complete production search after sound local propagation; no reference-answer comparison.',nodes:solved.stats.nodes,levelHash:hash};
 const local=analyzeEloLocal(l,{}, {maxMs:Infinity,maxOperations:Infinity});
 l.profile={...l.profile,classification:'Editorial estimate by dependency chains; not player-calibrated.',humanCalibration:false,localDeduction:{solved:local.solved,forcedMoves:local.forced.length,eliminations:local.eliminations.length,rounds:local.rounds},searchProfile:{nodes:solved.stats.nodes,branches:solved.stats.branches,scope:'Computational audit; not a human difficulty measurement.'},boundedReasoning:{solved:proof.solved,maxSimultaneousHypotheses:proof.maxSimultaneousHypotheses,evaluations:proof.evaluations,refutations:proof.refutations,humanCalibration:false}};
 l.designAudit={sourceAudit:l.origin.mode==='curated-unchanged'?'tests/fixtures/elo200-campaign.mjs#'+l.id:null,semanticNecessity:l.mechanics.length===1?'not-applicable':'see-clue-ablation',explanationStatus:'complete-bounded-certificate',review:'Machine-checked mathematical proof and assisted editorial curation; no claim of human playtesting.',clueUtility:'tests/elo80-validation-metadata.json#'+l.id};
 l.validation={solutionVerified:true,solutionCount:1,method:'Full automatic-visibility rule evaluation plus exhaustive solver',levelHash:hash};
 records.push({campaignNumber:l.campaignNumber,id:l.id,tier:l.stageName,dimensions:[l.rows,l.cols],primaryFamily:l.primaryFamily,secondaryFamilies:l.secondaryFamilies,deductionCore:core,centralDeduction:l.logicIdea,explainedSequence:sequence,completeSequence:summaries,origin:l.origin,validation:l.validation,uniqueness:l.uniqueness,proof:{solved:true,maxSimultaneousHypotheses:proof.maxSimultaneousHypotheses,evaluations:proof.evaluations,humanCalibration:false},clueAblations:[],elapsedMs:Math.round(performance.now()-start)});
 console.log('validated',l.campaignNumber,l.id,records.at(-1).elapsedMs);
}
output();
fs.writeFileSync(new URL('./elo80-reasoning-certificates.json',import.meta.url),JSON.stringify({engineHash:reasoningEngineHash,methodVersion:reasoningMethodVersion,levels:proofs}));
function save(){fs.writeFileSync(new URL('./elo80-validation-metadata.json',import.meta.url),JSON.stringify({campaign:'elo80-v1',total:80,tiers:names.map((name,i)=>({name,count:i===5?5:15})),introductions:{turn:10,straight:13,...intro},humanPlaytesting:false,engineHash:reasoningEngineHash,records},null,2));}
save();
for(const [i,l]of levels.entries()){
 const rec=records[i],c=l.constraints??{},ban=new Set([...(c.passages??[]),...(c.exclusivePassages??[]).flatMap(g=>g.cells)]);
 const domains=answers[l.id].map((_,r)=>l.regions.flatMap((v,x)=>v===r&&!ban.has(x)?[x]:[]));
 for(const key of Object.keys(c))for(const idx of key==='order'?['all']:Array.isArray(c[key])?c[key].map((_,i)=>i):Object.keys(c[key])){
  const trial=structuredClone(l);if(key==='order')delete trial.constraints.order;else if(Array.isArray(c[key])){trial.constraints[key].splice(idx,1);if(!trial.constraints[key].length)delete trial.constraints[key];}else{delete trial.constraints[key][idx];if(!Object.keys(trial.constraints[key]).length)delete trial.constraints[key];}
  const result=productionSolve(trial,{maxNodes:400000,domains:['passages','exclusivePassages'].includes(key)?domains:undefined});
  rec.clueAblations.push({key,index:idx,semanticTest:['passages','exclusivePassages'].includes(key)?'Remove crossing obligation while retaining no-point domains':'Remove only this clue',count:result.count,exhaustive:result.exhaustive,cutoffReason:result.cutoffReason,essential:result.count>=2,alternativeSolutions:result.solutions});
 }
 console.log('ablated',l.campaignNumber,rec.clueAblations.map(a=>a.essential?'essential':a.exhaustive?'redundant':'inconclusive').join(','));save();
}
console.log('ELO80 complete');

/** Editorial selection, not uniform sampling. Original immutable puzzle data live in source-selected.json. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {replay,validateLevel,configurationOf,SIDES} from '../dist/repasse/engine.mjs';
import {CONCEPTS,describeReplay,analyzeAlternatives,levelSignature,topologySignature} from '../dist/repasse/generator.mjs';
const root=fileURLToPath(new URL('..',import.meta.url));
const source=JSON.parse(fs.readFileSync(root+'/docs/repasse80/source-selected.json'));
const tiers=['Básico','Aprendiz','Intermediário','Avançado','Mestre','Modo Sábio'];
const relabel={342:'timing',362:'accumulate',384:'timing',319:'roles'};
const reasons=[
 'Emissão integral, primeiro receptor e metas zero: exemplos mínimos alternam com preparações de dois destinos e leitura de assimetria. Casas vazias e a cadeia final mostram recepção sem deslocamento.',
 'Contraste controlado: antigas 7, 8, 9 usam exatamente as mesmas peças e valores, mas metas derivadas de ordens diferentes. Seguem acumulação, janelas e preparação simultânea; retornos curtos reduzem carga secundária.',
 'Uma seta única no 31; as quatro orientações reaparecem em janela, proteção, revezamento e acumuladores diferentes. Cinco retornos HV mantêm foco em relações e finalização.',
 'Um par perpendicular no 46; orientações variadas exigem conciliar eixos. Retornos HV isolam reencontro e encadeamento; uma mesma peça recebe, protege e depois libera passagem.',
 'Uma peça de quatro setas no 61, valor inicial 1, quatro peças totais. Retornos compactos HV têm 6 peças e valores baixos; expansões alternam funções, não apenas volume.',
 'Sínteses 76–80: proteção e janela; bifurcação com reencontro; compartilhamento e revezamento; destinos múltiplos; encerramento global HV. A última reúne cadeias, quatro janelas e 27 precedências sem ampliar o teto.'
];
const levels=[];
for(const [i,original] of source.entries()){
 const n=i+1,tier=Math.min(5,Math.floor(i/15)),l=structuredClone(original);
 // Goals are generated anew by the unmodified gameplay engine and must equal the preserved definition.
 const zero=Object.fromEntries(SIDES.map(s=>[s,Array(s==='top'||s==='bottom'?l.cols:l.rows).fill(0)]));
 const generated=replay({...l,targets:zero},l.solution);assert(generated.valid);assert.deepEqual(generated.state.boxes,l.targets);
 l.targets=generated.state.boxes;const checked=replay(l,l.solution);assert(checked.valid&&checked.solved);assert(validateLevel(l).valid);
 const alternatives=analyzeAlternatives(l,{maxStates:1000000});assert(alternatives.complete&&alternatives.solutionCount>0);
 const trace=describeReplay(l),order=new Map(l.solution.map((id,j)=>[id,j]));
 const roles=trace.evidence.protect.flatMap(p=>trace.evidence.receive.filter(r=>r.receiver===p.receiver&&order.get(r.source)<order.get(p.source)).flatMap(r=>trace.evidence.passage.filter(q=>q.blocker===p.receiver).map(q=>({piece:p.receiver,receive:r,protect:p,passage:q,chronology:[r.source,p.source,p.receiver,q.source]}))));
 const primary=relabel[l.id]??l.primaryConcept;
 if(primary==='roles')assert(roles.length,'Real receive-protect-open role evidence');else assert(trace.evidence[primary].length);
 Object.assign(l,{displayNumber:n,campaignVersion:2,category:tiers[tier],stage:tiers[tier],chapter:tier+1,difficulty:tier,primaryConcept:primary,family:primary,secondaryConcepts:trace.concepts.filter(x=>x!==primary),origin:{kind:'curated-identical',catalogue:'REPASSE500-v1',id:original.id,version:original.version,definitionUnchanged:true},editorial:{tierRationale:reasons[tier],primaryEvidence:primary==='roles'?roles:trace.evidence[primary],evidenceScope:'Eventos observados na solução certificada; somente requiredPrecedences são necessidades em todas as vitórias.',difficultyBasis:{dependencyDepth:trace.maxDepth,retirementWindows:trace.timedPieces,requiredRelations:alternatives.requiredPrecedences.length,legalFirstChoices:alternatives.firstMoves.length,legalLastChoices:alternatives.lastMoves.length,winningOrders:alternatives.solutionCount},rolesReceiveProtectOpen:roles}});
 if(relabel[l.id]){l.discovery=primary==='roles'?'Nesta fase, a mesma peça recebe uma contribuição, intercepta outra para proteger uma meta e depois sai, liberando passagem. A sequência certificada registra cada função.':primary==='accumulate'?'Nesta fase, contribuições se reúnem numa peça antes de sua retirada; compare as metas para decidir a janela de saída.':'Nesta fase, uma peça recebe primeiro e precisa sair para que uma contribuição posterior atravesse sua posição.';l.hints=[`Observe as metas ligadas a ${CONCEPTS[primary].toLowerCase()}.`,'Compare quem recebe agora com quem receberia depois de abrir uma passagem.','A análise da partida verifica uma continuação a partir da situação atual.'];l.name=primary==='roles'?'Receber, proteger, liberar':primary==='accumulate'?'Reunir antes de abrir':'A janela entre contribuições';}
 l.validation={...l.validation,replayed:true,targetsGeneratedByEngine:true,finalDefinitionReplayed:true,alternatives,trace,signature:levelSignature(l),topology:topologySignature(l),campaign80:true};
 levels.push(l);
}
assert.equal(levels.length,80);assert.equal(new Set(levels.map(l=>l.id)).size,80);assert.equal(new Set(levels.map(l=>l.family)).size,14);
const hv=l=>l.pieces.every(p=>configurationOf(p.directions)==='original');
assert(levels.slice(0,30).every(hv));assert(levels.filter(hv).length>=48);
for(const start of [30,45,60])assert(levels.slice(start,start+15).filter(hv).length>=5);
assert(levels.slice(75).filter(hv).length>=3&&hv(levels[79]));
for(const [index,kind] of [[30,'single'],[45,'corner'],[60,'four']])assert.equal(levels[index].pieces.filter(p=>configurationOf(p.directions)===kind).length,1);
for(let i=2;i<80;i++)assert(!(levels[i].family===levels[i-1].family&&levels[i].family===levels[i-2].family));
const shapeUses=new Map();for(const l of levels)for(const p of l.pieces){const k=[...p.directions].sort().join(',');if(!shapeUses.has(k))shapeUses.set(k,new Set());shapeUses.get(k).add(l.displayNumber);}assert.equal(shapeUses.size,11);assert([...shapeUses.values()].every(v=>v.size>=2));
assert(levels.every(l=>l.rows<=4&&l.cols<=4&&l.pieces.length<=10));
const output=`/** REPASSE80: curated immutable definitions; displayNumber is not persistent identity. */\nexport {CONCEPTS} from './generator.mjs';\nexport const CAMPAIGN_VERSION = 2;\nexport const CHAPTERS = Object.freeze(${JSON.stringify(tiers)});\nexport const DIFFICULTIES = CHAPTERS;\nexport const CAMPAIGN = ${JSON.stringify(levels)};\n`;
fs.writeFileSync(root+'/dist/repasse/campaign.mjs',output);
fs.writeFileSync(root+'/docs/repasse80/catalogue.json',JSON.stringify(levels,null,2));
const cells=x=>JSON.stringify(x).replaceAll('|','/');
let table='# REPASSE — curadoria de 80 níveis\n\nTodos os IDs/version originais foram preservados porque peças, valores, posições e metas são idênticos. displayNumber é somente apresentação. Metas regeneradas pelo motor e comparadas ao original; todas as caixas e esvaziamento reproduzidos. Nenhuma sequência obrigatória é imposta à interface.\n\n';
table+='Dificuldade usa relações obrigatórias, janelas de retirada e escolhas válidas, não quantidade bruta de busca. Eventos causais são testemunhos da sequência certificada, não alegações de unicidade; relações necessárias são enumeradas sobre todas as vitórias.\n\n';
for(let j=0;j<6;j++)table+=`## ${tiers[j]}\n${reasons[j]}\n\n`;
table+='|Nível/ID|Grade|Peças:ID(linha,coluna;valor;setas)|Metas cima/direita/baixo/esquerda|Família|Dependências obrigatórias|Origem|Sequência|Validação|\n|---|---|---|---|---|---|---|---|---|\n';
for(const l of levels)table+=`|${l.displayNumber}/${l.id}v${l.version}|${l.rows}×${l.cols}|${l.pieces.map(p=>`${p.id}(${p.row+1},${p.col+1};${p.value};${p.directions.join('+')})`).join(' ')}|${SIDES.map(s=>s+':'+l.targets[s].join(',')).join('; ')}|${CONCEPTS[l.family]}|${l.validation.alternatives.requiredPrecedences.map(p=>p.join('≺')).join(', ')||'nenhuma'}|REPASSE500#${l.origin.id}; idêntica|${l.solution.join(' → ')}|Metas pelo motor + replay; ${l.validation.alternatives.solutionCount}/${l.validation.alternatives.totalOrders} ordens; enumeração completa|\n`;
fs.writeFileSync(root+'/docs/repasse80/TABELA.md',table);
const summary={levels:80,tiers:tiers.map((name,i)=>({name,count:levels.filter(l=>l.chapter===i+1).length,hv:levels.filter(l=>l.chapter===i+1&&hv(l)).length})),hv:levels.filter(hv).length,families:[...new Set(levels.map(l=>l.family))],configurations:11,allReplayed:true,allAlternativesComplete:true,allDefinitionsIdentical:true,maxRows:Math.max(...levels.map(l=>l.rows)),maxCols:Math.max(...levels.map(l=>l.cols)),maxPieces:Math.max(...levels.map(l=>l.pieces.length)),maxTarget:Math.max(...levels.map(l=>l.validation.trace.maxTarget)),ids:levels.map(l=>l.id)};
fs.writeFileSync(root+'/docs/repasse80/validation.json',JSON.stringify(summary,null,2));console.log(JSON.stringify(summary,null,2));

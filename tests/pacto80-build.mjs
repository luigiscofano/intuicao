import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {SYMBOL_LEVELS} from './fixtures/pacto-legacy-levels.mjs';
import {reason,neighbors,cellName} from './pacto80-reasoning.mjs';
import {solveSymbols,profileSymbols,validateSymbols,canonicalSymbols} from '../dist/symbol-games.mjs';
const old=SYMBOL_LEVELS.pacto, clone=structuredClone;
export function topology(l){let keys=[];for(let refl=0;refl<2;refl++)for(let rot=0;rot<4;rot++){const trans=i=>{let r=i/8|0,c=i%8;if(refl)c=7-c;for(let t=0;t<rot;t++)[r,c]=[c,7-r];return r*8+c;};const a=Array(64);for(let i=0;i<64;i++)a[trans(i)]=trans(neighbors(i).find(j=>l.solution[j]===l.solution[i]));keys.push(a.join(','));}return keys.sort()[0];}
function candidate(l,source=l.id){const r=reason(l);let last=Array(64).fill(-1),paths=[];for(let k=0;k<r.trace.length;k++){const st=r.trace[k],deps=[...new Set([...st.premises,st.cell].map(i=>last[i]).filter(i=>i>=0))];st.dependencies=deps;const prev=deps.sort((a,b)=>paths[b].length-paths[a].length)[0];paths.push([...(prev===undefined?[]:paths[prev]),k]);last[st.cell]=k;}
 const orientation=r.trace.find(st=>st.kind==='mandatory-partner'&&(()=>{const i=st.premises[0],v=st.after[0],ns=neighbors(i).filter(j=>l.clues[j]<0||l.clues[j]===v);return ns.some(j=>j%8===i%8)&&ns.some(j=>j%8!==i%8);})());
 const border=r.trace.find(st=>st.kind==='mandatory-partner'&&neighbors(st.premises[0]).length<4);
 let remote=null;for(let k=0;k<paths.length;k++){const path=paths[k],cells=path.map(j=>r.trace[j].cell),span=Math.max(0,...cells.flatMap(i=>cells.map(j=>Math.abs((i/8|0)-(j/8|0))+Math.abs(i%8-j%8))));if(span>=6&&path.some(j=>r.trace[j].kind.includes('quota'))&&path.some(j=>['mandatory-partner','closed-pair','isolation'].includes(r.trace[j].kind))&&(!remote||path.length>remote.indices.length))remote={indices:path,cells,span,steps:path.map(j=>r.trace[j].text)};}
 return {l,r,source,orientation,border,remote,topology:topology(l),clues:l.clues.filter(x=>x>=0).length,refs:r.trace.filter(x=>x.kind==='refutation').map(x=>x.chain.length),score:r.maxDepth};}
let pool=old.map(l=>candidate(clone(l)));for(const x of JSON.parse(fs.readFileSync('tests/pacto80-build-recompositions.json')))pool.push(candidate(x.level,x.sourceId));for(const x of JSON.parse(fs.readFileSync('tests/pacto80-build-compact.json')))pool.push(candidate(x.level,x.sourceId));let used=new Set(),selected=[];
const reserved=new Set(['pacto-124','pacto-123','pacto-154','pacto-172','pacto-141']);
const stages=['Básico','Aprendiz','Intermediário','Avançado','Mestre','Modo Sábio'];
function add(c,focus){if(!c.r.solved)throw Error('not solved');selected.push({...c,focus});used.add(c.source);}
function diverse(c){return selected.length<2||c.topology!==selected.at(-1).topology||c.topology!==selected.at(-2).topology;}
function focusEvidence(c,focus){
 if(focus.includes('canto'))return c.border;
 if(focus.includes('Horizontal')||focus.includes('orientação decisiva')||focus.includes('Orientação')||focus.includes('Orientações'))return c.orientation;
 if(focus.includes('Duas ocorrências'))return c.r.trace.find(s=>s.kind==='quota-remaining');
 if(focus.includes('coletiva')||focus.includes('Conjunto'))return c.r.trace.find(s=>s.kind==='candidate-group');
 if(focus.includes('Hipótese')||focus.includes('hipótese'))return c.r.trace.find(s=>s.kind==='refutation');
 if(focus.includes('isolamento'))return c.r.trace.find(s=>s.kind==='isolation');
 if(focus.includes('Dupla')||focus.includes('dupla')||focus.includes('Compatibilidade'))return c.r.trace.find(s=>s.kind==='closed-pair');
 if(focus.includes('remoto')||focus.includes('região')||focus.includes('sequência')||focus.includes('profunda')||focus.includes('sutil'))return c.remote;
 if(focus.includes('Parceiro')||focus.includes('parceiros'))return c.r.trace.find(s=>s.kind==='mandatory-partner');
 if(focus.includes('integração'))return {group:c.r.trace.find(s=>s.kind==='candidate-group'),refutation:c.r.trace.find(s=>s.kind==='refutation'),orientation:c.orientation,remote:c.remote};
 return c.r.trace.find(s=>s.kind==='quota-saturated');
}
function pick(filter,target,focus){let eligible=pool.filter(c=>!used.has(c.source)&&!reserved.has(c.source)&&filter(c)&&diverse(c)&&focusEvidence(c,focus));eligible.sort((a,b)=>Math.abs(a.score-target)-Math.abs(b.score-target)||a.source.localeCompare(b.source));if(!eligible.length)throw Error('no candidate '+focus+' '+target);add(eligible[0],focus);}
// Opening recompositions: add local anchors, rather than dropping arbitrary late puzzles.
for(let pos=0;pos<15;pos++){
 let source=old[[0,3,6,9,12,15,18,21,24,27,30,33,36,39,42][pos]],best=null,target=3+Math.floor(pos/3);
 for(let attempt=0;attempt<30;attempt++){let l=clone(source),seed=(pos+1)*9127+attempt*117;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};const free=l.clues.flatMap((x,i)=>x<0?[i]:[]).sort(()=>rand()-.5);let count=pos<5?48:pos<10?43:39;for(const i of free.slice(0,count-l.clues.filter(x=>x>=0).length))l.clues[i]=l.solution[i];let c=candidate(l,source.id);if(c.refs.length||!diverse(c))continue;const focus=pos<5?'quota-saturated':pos<10?'mandatory-partner':'closed-pair';if(!c.r.counts[focus])continue;const error=Math.abs(c.score-target);if(!best||error<best.error)best={...c,error};}
 if(!best)throw Error('basic '+pos);best.l.id=`pacto-v2-${String(pos+1).padStart(3,'0')}`;add(best,pos<5?'Cotas por linha e coluna':pos<10?'Parceiro ortogonal obrigatório':'Dupla fechada impede o terceiro');
}
for(let j=0;j<15;j++)pick(c=>!c.refs.length&&c.score>=8&&c.score<=14,8+j*.4,['Parceiro de canto e borda','Duas ocorrências, duas posições','Horizontal ou vertical','Exclusão ao redor da dupla','Linha e coluna em sequência'][j%5]);
for(let j=0;j<15;j++)pick(c=>!c.refs.length&&c.score>=13&&c.score<=22&&c.r.counts.isolation&&!c.r.counts['candidate-group'],14+j*.45,['Cota e parceria retornam à região','Evitar isolamento mesmo com cota livre','Orientação comunica duas faixas'][j%3]);
// Collective constraints and short concrete refutations, interleaved with consolidation.
for(let j=0;j<15;j++){const focus=j%3===0?'Conjunto de candidatas e capacidade da faixa':j%3===1?'Hipótese curta termina em contradição':'Compatibilidade entre vários pares';
 if(j%3===0)pick(c=>!!c.r.counts['candidate-group']&&c.score<=24&&Math.max(0,...c.refs)<=10,19+j*.3,focus);
 else pick(c=>c.score>=15&&c.score<=26&&Math.max(0,...c.refs)<=10&&(j%3===1?c.refs.length>0:true),17+j*.45,focus);
}
for(let j=0;j<15;j++){if([2,7,12].includes(j))add(pool.find(c=>c.l.id===`pacto-v2-${201+[2,7,12].indexOf(j)}`),'Compacto: hipótese curta necessária apesar das pistas');else pick(c=>c.score>=21&&Math.max(0,...c.refs)<=10,22+j*.45,['Entrada evidente, desenvolvimento remoto','Orientações encadeadas entre linhas e colunas','Cadeia profunda de cotas e parceiros'][j%3]);}
for(const [id,focus] of [['pacto-124','Síntese 1: orientação decisiva'],['pacto-123','Síntese 2: restrição coletiva de uma faixa'],['pacto-154','Síntese 3: parceiros obrigatórios com efeito remoto'],['pacto-172','Síntese 4: hipótese refutada por cotas e duplas'],['pacto-141','Síntese 5: integração final']])add(pool.find(c=>c.source===id),focus);
if(selected.length!==80)throw Error('count');
const certificates=[],levels=[];const techniqueNames={'quota-saturated':'cota saturada','quota-remaining':'posições restantes','mandatory-partner':'parceiro obrigatório / orientação','closed-pair':'exclusão junto à dupla','isolation':'prevenção de isolamento',trio:'prevenção de trio','candidate-group':'restrição coletiva de candidatas',refutation:'hipótese refutada'};
for(let index=0;index<80;index++){const c=selected[index],l=c.l,r=c.r,stage=Math.min(5,Math.floor(index/15));const exact=solveSymbols(l,l.clues,2);const gac=profileSymbols(l);if(!exact.complete||exact.count!==1||!gac.logical||!validateSymbols(l,l.solution).valid||JSON.stringify(exact.solutions[0])!==JSON.stringify(l.solution))throw Error('validation '+l.id);
 const relevant=Object.keys(r.counts).filter(k=>r.counts[k]);let witness=focusEvidence(c,c.focus);if(!witness)throw Error('missing focus evidence '+l.id+' '+c.focus);
 const clueFunctions=l.clues.flatMap((v,i)=>v<0?[]:[{cell:i,coordinate:cellName(i),value:v,roles:r.trace.some(s=>s.premises.includes(i))?[...new Set(r.trace.filter(s=>s.premises.includes(i)).map(s=>techniqueNames[s.kind]))]:['andaime visual: reduz escolhas simultâneas; redundante nesta trilha de prova'],proofUsed:r.trace.some(s=>s.premises.includes(i)),firstUse:r.trace.findIndex(s=>s.premises.includes(i))}]);
 const meta={number:index+1,discovery:c.focus,combinedTechniques:relevant.map(k=>techniqueNames[k]),clueCount:c.clues,clueFunctions,logicalSequence:r.trace.map(s=>s.text),origin:{sourceId:c.source,kind:l.id===c.source?'curadoria e reordenação':'recomposição de pistas',changedClues:l.clues.flatMap((v,i)=>v!==old.find(x=>x.id===c.source).clues[i]?[{cell:i,old:old.find(x=>x.id===c.source).clues[i],value:v}]:[])},reasoning:{counts:r.counts,steps:r.trace.length,dependencyDepth:r.maxDepth,refutationLengths:c.refs,focusWitness:witness},validation:{solutionCount:exact.count,searchComplete:exact.complete,nodes:exact.nodes,method:'completed exhaustive search; independent named-rule human trace',propagationSolved:gac.logical,humanTraceSolved:r.solved,allRowsAndColumnsQuota2:true,allOrthogonalComponentsSize2:true,fixedClues:true},topologyHash:createHash('sha256').update(c.topology).digest('hex'),canonicalClueHash:createHash('sha256').update(canonicalSymbols(l)).digest('hex')};
 certificates.push({id:l.id,...meta,trace:r.trace,solution:l.solution,clues:l.clues});
 levels.push({...l,rulesVersion:1,campaignVersion:2,stage:stage+1,stageName:stages[stage],difficulty:stages[stage],lesson:c.focus,techniques:relevant,profile:gac,validation:meta.validation,design:{...meta,clueFunctions:undefined,logicalSequence:undefined,reasoning:{...meta.reasoning,focusWitness:undefined}}});
}
fs.writeFileSync('dist/pacto-campaign.mjs','// PACTO campaign v2: curated and recomposed; full certificates in tests/pacto80-reasoning-certificates.json.\nexport const PACTO_CAMPAIGN_VERSION=2;\nexport const PACTO_LEVELS='+JSON.stringify(levels)+';\n');
fs.writeFileSync('tests/pacto80-reasoning-certificates.json',JSON.stringify(certificates,null,2));
fs.writeFileSync('tests/pacto80-build-audit.json',JSON.stringify(certificates.map(({trace,logicalSequence,clueFunctions,solution,clues,...rest})=>rest),null,2));
fs.writeFileSync('dist/PACTO80-VALIDACAO.md',document(certificates));
console.log(JSON.stringify(stages.map((name,s)=>{const a=certificates.slice(s*15,s===5?80:s*15+15);return{name,depths:a.map(x=>x.reasoning.dependencyDepth),clues:a.map(x=>x.clueCount),groups:a.filter(x=>x.reasoning.counts['candidate-group']).length,refs:a.filter(x=>x.reasoning.counts.refutation).length}}),null,2));

function document(certs){let md=`# PACTO — campanha de 80 níveis

Versão editorial 2. Seis faixas: 15/15/15/15/15/5. Grade 8×8, quatro símbolos, duas ocorrências por linha/coluna e exatamente um parceiro ortogonal valem desde o primeiro nível. Duplas não são pré-fixadas.

## Critérios e limites

A curadoria mede relações e técnicas, não só pistas. O Básico recompõe pistas de apoio; Aprendiz e Intermediário alongam cadeias. Avançado exige conjuntos coletivos e hipóteses curtas. Mestre alterna cadeias longas e três estados compactos que conservam um impasse real: 38, 34 e 37 pistas; mesmo com menos vazios ainda é necessária uma refutação. As quedas locais de profundidade desses compactos são intencionais, não regressão para contagem simples. As cinco sínteses finais têm profundidades 21, 23, 27, 29 e 33 e focos distintos.

Todas as fases têm solução única por busca concluída sem limite de nós; passaram também pela propagação do motor e por uma trilha independente com regras nomeadas. Hipóteses só entram depois de esgotar deduções diretas e conjuntos coletivos; cada refutação termina numa contradição concreta, sem tentativa aleatória. GAC não é usado como substituto da explicação. Profundidade é uma métrica de dependência da trilha, não uma medida empiricamente calibrada com jogadores. Não houve teste com jogadores humanos.

O arquivo de certificados que acompanha a entrega contém as 80 grades, soluções, função de cada pista, todos os passos e subpassos de refutação. As sequências abaixo são completas, usam L/C para linha/coluna e nomes dos quatro símbolos. Pistas não usadas nesta prova são explicitamente marcadas como andaimes visuais, sem alegação de necessidade lógica. IDs antigos são mantidos somente para pistas idênticas; recomposições têm IDs novos.

`;
 for(const c of certs){md+=`## ${c.number}. ${stages[Math.min(5,Math.floor((c.number-1)/15))]} — ${c.id}

**Descoberta:** ${c.discovery}.

**Técnicas combinadas:** ${c.combinedTechniques.join('; ')}.

**Origem:** ${c.origin.sourceId}; ${c.origin.kind}; ${c.origin.changedClues.length} pistas alteradas. **Pistas:** ${c.clueCount}; ${64-c.clueCount} casas vazias.

**Validação:** solução única; busca concluída (${c.validation.nodes} nós); cotas, componentes de tamanho dois, pistas fixas, propagação e trilha explicável aprovados. Profundidade ${c.reasoning.dependencyDepth}; ${c.reasoning.steps} eliminações explicadas. Refutações: ${c.reasoning.refutationLengths.length?c.reasoning.refutationLengths.join(', ')+' passos':'nenhuma'}.

### Função das pistas

`;
 for(const f of c.clueFunctions)md+=`- ${f.coordinate}: ${['círculo','triângulo','quadrado','losango'][f.value]} — ${f.roles.join('; ')}${f.proofUsed?`; primeira participação no passo ${f.firstUse+1}`:''}.
`;
 md+=`
### Sequência lógica

`;for(const [j,s]of c.trace.entries()){md+=`${j+1}. ${s.text}
`;if(s.kind==='refutation'){for(const [k,t]of s.chain.entries())md+=`   - Hipótese, passo ${k+1}: ${t.text}
`;md+=`   - Contradição final: ${s.contradiction.text}
`;}}
 md+=`
`;}return md;
}

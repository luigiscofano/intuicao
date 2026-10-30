/** Editorial curriculum: selections follow decisions and prerequisites, never index spacing. */
import {writeFileSync,readFileSync} from 'node:fs';
import {CAMPAIGN as OLD} from '../dist/sintonia/campaign-v2.mjs';
import {MECHANICS,generateLevel,antiSpamAudit,analyzeSolution,summarizePurpose,structuralSignature} from '../dist/sintonia/generator.mjs';
import {analyzePurpose} from '../dist/sintonia/purpose.mjs';
import {validateLevel,replay} from '../dist/sintonia/engine.mjs';
export const ORIGINS=[1,21,5,8,23,15,40,20,32,14,51,52,55,64,56,76,78,46,79,37,114,108,94,102,60,137,126,115,128,122,151,161,165,176,179,177,193,201,204,157,212,247,237,187,231,268,399,224,251,287,279,210,296,312,304,197,337,326,240,350,354,362,490,376,388,424,null,422,415,418,426,437,449,439,470,null,200,423,473,500];
const names=['Básico','Aprendiz','Intermediário','Avançado','Mestre','Modo Sábio'];
const intros={1:'walls',16:'plate',21:'switch',26:'key',34:'box',38:'ice',42:'portal',46:'oneway',50:'alternate',54:'fragile',57:'handoff',61:'and',67:'selector',71:'delivery'};
const reasons=[
'Um único comando apresenta a chegada conjunta; exceção introdutória deliberada à resistência a repetição.',
'Bloqueio assimétrico compacto: a parede separa os movimentos.',
'A ordem dos eixos substitui a repetição de uma direção.',
'Virar antes do extremo cria uma parada intermediária.',
'O recuo funciona como lugar de espera, não como distância artificial.',
'Os percursos desiguais precisam ser compensados.',
'Outra ordem de eixos retoma a coordenação depois da volta desigual.',
'Trocar qual animal avança primeiro evita tratar um painel como líder fixo.',
'Volta desigual mais articulada, ainda sem símbolos novos.',
'Preparar posições compatíveis antes do comando de chegada.',
'Referência compacta: passar pelo destino e virar antes do fim.',
'Sair deliberadamente do destino para permitir o ajuste do parceiro.',
'Retomada curta de espera útil entre problemas de trânsito.',
'Alinhar chegadas depois de movimentos e bloqueios diferentes.',
'Síntese geométrica: preparar conjuntamente o comando final.',
'Placa em dupla: ocupar agora autoriza a passagem no comando seguinte.',
'Consolidar apoio temporário com outra sequência de espera.',
'Retomada geométrica sem novo símbolo entre duas dependências.',
'Sustentar apoio enquanto o receptor completa sua travessia.',
'Retomar destino como passagem antes de uma regra nova.',
'Interruptor compacto em dupla: entrar alterna; sair mantém a configuração.',
'Consolidar acesso ao interruptor e preparação da saída remota.',
'Comparar o apoio temporário da placa com a configuração persistente.',
'Escolher quando configurar e quando abandonar o desvio.',
'Retomada geométrica de volta desigual antes da chave.',
'Chave em dupla: obter abertura permanente no desvio antes de partir.',
'Consolidar prioridade da preparação permanente.',
'Retomada de placa explicita que a ajuda temporária ainda depende do ocupante.',
'Planejar preparação e chegada depois de adquirir a chave.',
'Retomar interruptor, cuja configuração pode ser revertida ao contrário da chave.',
'Primeiro trio com placas já conhecidas; somente a quantidade de responsabilidades é nova.',
'Consolidar trio com preparação de interruptor e tarefas distintas.',
'Retomada de dupla com chave separa quantidade de animais de dificuldade.',
'A caixa assume a placa e libera seu animal: um empurrão introdutório com função de acesso.',
'Mudar de face orienta a caixa para um apoio necessário.',
'Estacionar e recuperar preserva a face de empurrão: decisão da antiga 177.',
'Apoiar e depois retirar libera o destino, em dupla.',
'Gelo em dupla: só a posição final do deslizamento conta.',
'Consolidar a parada em piso comum ou bloqueio.',
'Retomar três responsabilidades sem acumular gelo e novidade.',
'Outro ponto de parada do gelo muda a preparação da chegada.',
'Portal em dupla: transportar dentro do painel para preparar a chave e retornar.',
'Consolidar ida e volta pelo portal com a preparação permanente.',
'Retomar orientação e apoio da caixa entre problemas de portal.',
'Trio com portal: cada acesso possui preparação conhecida.',
'Sentido único em dupla: preparar o controle antes de abandonar seu acesso.',
'Retorno por outro caminho contrasta com o compromisso sem volta.',
'Retomada curta de configuração sem restrição direcional.',
'Configurar interruptor antes do compromisso; conserva a prova temporal da antiga 251.',
'Sol/lua em dupla é composição do interruptor, não regra de movimento nova.',
'Consolidar passagens alternadas antes da retomada de caixa.',
'Retomar outra face de empurrão e apoio em dupla.',
'Combinar a configuração conhecida com a parada do gelo, em trio.',
'Ponte frágil em dupla: preparar antes de abandonar o acesso que desaparece.',
'Consolidar a perda de acesso e a preparação do interruptor.',
'A caixa sustenta e depois deixa a casa necessária ao destino.',
'Revezamento em dupla: o primeiro apoio permite alcançar o apoio de retorno.',
'Trio consolida a cadeia de ajuda sem introduzir outro símbolo.',
'Retomada compacta de gelo entre cadeias de apoio.',
'Síntese de revezamento com perda de acesso já apresentada.',
'Duas condições: dois apoios conhecidos precisam coincidir para autorizar a passagem.',
'Consolidar simultaneidade das condições sem quarteto novo.',
'Retomar dupla compacta de preparação antes de compromisso.',
'Primeiro quarteto usa somente placas conhecidas; cada painel recebe responsabilidade de acesso.',
'Trio retoma estacionar e recuperar a caixa.',
'Dupla retoma configuração sol/lua antes do seletor.',
'Seletor em dupla: escolher A/B não substitui a ocupação da placa.',
'Trio consolida escolha da conexão e preparação da chegada.',
'Retomada de dupla com orientação de caixa antes de outra escolha de destinatário.',
'Escolher destinatário em trio sem somar mecanismo novo.',
'Entrega em dupla: liberar saída antes, enviar, alcançar outra face e apoiar depois.',
'Trio combina entrega com apoio do remetente para o retorno.',
'Dupla retoma ponte e preparação sem entrega.',
'Quarteto usa a entrega já conhecida e distribui as ajudas de acesso.',
'Dupla de configuração oferece contraste antes das cinco sínteses.',
'Coordenação compacta de duas responsabilidades, sem recursos novos.',
'A caixa assume e depois deixa apoio; chave e retorno tornam a retirada significativa.',
'Configurar o destinatário e preservar o retorno; caixa apoia e depois oferece espera física comprovável.',
'Entrega com reorientação e ajuda entre três animais; o remetente preserva o retorno.',
'Quatro responsabilidades distintas: preparar, enviar, receber, devolver apoio e chegar conjuntamente.'
];
const roles=['focus','variation','mix','compact','revisit','mix','focus','variation','deep','revisit','mix','compact','revisit','deep','synthesis'];
const generated = {};
for (const number of [67,76]) {
 const file=new URL(`../docs/sintonia80-generated-${number}.json`,import.meta.url);
 try{generated[number]=JSON.parse(readFileSync(file));continue;}catch{}
 const profile=number===67?{primary:'selector',introduction:true,role:'focus',minDepth:6,maxDepth:13,shapeDifficulty:1}:{primary:'plate',role:'compact',minDepth:9,maxDepth:13,shapeDifficulty:2};
 for(let retry=0;retry<12;retry++){
  try{const g=generateLevel(`sintonia80-curated:${number}:${retry}`,{difficulty:number===67?4:5,animals:2,profile,strictSweep:true,maxStates:65000,maxMs:15000});let spam=antiSpamAudit(g.level,{maxMs:10000,randomRuns:12});if(spam.singleDirection.winningDirections.length||spam.sweeps.solves||spam.shortCycles.winningPatterns.length)continue;generated[number]=g.level;generated[number].editorial.antiSpam=spam;writeFileSync(file,JSON.stringify(g.level,null,2));console.log('composed',number,g.level.solution.length);break;}catch(e){console.log('retry',number,retry,e.code);}
 }
 if(!generated[number])throw Error(`Cannot compose ${number}`);
}
const levels=ORIGINS.map((origin,i)=>{
 const number=i+1,l=structuredClone(origin?OLD[origin-1]:generated[number]);
 const chapter=Math.min(6,Math.floor(i/15)+1); const previousRevision=l.contentRevision;
 if(!origin){l.id=`sintonia80-${String(number).padStart(4,'0')}-v3`;l.version=1;}
 l.originNumber=origin;l.origin={kind:origin?'curated-identical-logical-definition':'role-first-new-composition',catalog:origin?'sintonia-content-2':null,number:origin,id:origin?OLD[origin-1].id:null,version:origin?OLD[origin-1].version:null,reason:reasons[i]};
 l.number=number;l.chapter=chapter;l.difficulty=chapter-1;l.contentRevision='sintonia-content-3';
 l.name=number===67?'Escolher a ligação':number===76?'Duas vozes, pouco espaço':l.name.replace(/ \d{2}$/,'');
 l.introduction=intros[number]?[intros[number]]:[]; l.prerequisites=l.mechanics.filter(m=>!l.introduction.includes(m));
 l.actorIntroduction=number===31?3:number===64?4:null;
 if(l.introduction.length){l.ruleExplanation=MECHANICS.find(m=>m.id===l.introduction[0]).description;l.lesson=`${l.ruleExplanation} ${l.lesson}`;}
 if(l.actorIntroduction)l.lesson=`Agora são ${l.actorIntroduction} animais com o mesmo comando. Nenhuma regra nova: ${l.lesson}`;
 l.editorial.role=number>=76?'synthesis':intros[number]||l.actorIntroduction?'focus':roles[i%15];
 l.editorial.decision=origin?'retain-logical-definition':'recompose'; l.editorial.retentionReason=reasons[i];l.editorial.curriculumReason=reasons[i];
 l.editorial.prerequisiteChapters=[...new Set(l.prerequisites.map(m=>Math.min(6,Math.floor((Number(Object.entries(intros).find(([,v])=>v===m)?.[0]||1)-1)/15)+1)))];
 l.editorial.purpose=summarizePurpose(analyzePurpose(l,l.solution));
 l.editorial.reasoning=analyzeSolution(l,l.solution);
 l.editorial.animalRoles=l.boards.map((b,j)=>({board:j,logicalAnimal:b.animal,role:l.editorial.design?.roles?.[j]||`Coordenar a própria chegada com ${l.editorial.purpose.boardRoles[j]?.waited||0} esperas observadas; ${l.editorial.purpose.dependencies.filter(d=>d.receiverBoard===j).length} passagem(ns) condicionada(s) recebida(s).`,controls:l.editorial.purpose.dependencies.flatMap(d=>d.controllers.filter(c=>c.board===j).map(c=>({id:c.id,type:c.type,receiverBoard:d.receiverBoard}))),goal:b.goal}));
 l.editorial.objectRoles=l.boards.flatMap((b,j)=>['boxes','plates','switches','keys','selectors','gates','portals','ice','fragile','oneWays'].flatMap(type=>(b[type]||[]).map((o,k)=>({board:j,type,id:o.id??`${type}-${k}`,definition:o,role:type==='boxes'?(l.editorial.design?.boxRoles||l.editorial.purpose.boxes.find(x=>x.id===o.id)?.observedRoles||['apoio observado']):type==='gates'?{condition:o.condition,crossings:l.editorial.purpose.dependencies.find(d=>d.gateId===o.id)?.crossingCommands||[]}:type==='plates'?'Ocupação por animal ou caixa controla a passagem no estado anterior ao comando.':type==='switches'?'Entrada e permanência final alternam a configuração, preservada ao sair.':type==='keys'?'Aquisição pelo animal mantém a abertura até reiniciar.':type==='selectors'?'Escolhe conexão A/B; a placa correspondente ainda precisa de ocupação.':type==='portals'?'Transporta uma vez dentro do painel e encerra o deslocamento.':type==='ice'?'Prolonga o movimento até piso comum ou bloqueio.':type==='fragile'?'Desaparece ao abandonar a casa; exige preservar a preparação.':'Restringe a travessia ao sentido indicado.',evidenceScope:'definition-and-certified-witness; necessity requires separate audit'}))));
 for(const r of l.editorial.animalRoles){
  const observed=l.editorial.purpose.boardRoles[r.board];
  if(typeof r.role==='string'&&r.role.startsWith('Coordenar a própria')){
   const incoming=l.editorial.purpose.dependencies.filter(d=>d.receiverBoard===r.board);
   r.role=[r.controls.length?`Preparar ${[...new Set(r.controls.map(c=>`${c.type} ${c.id}`))].join(', ')} para ${[...new Set(r.controls.map(c=>`painel ${c.receiverBoard+1}`))].join(', ')}.`:'',incoming.length?`Aproveitar ${incoming.map(d=>`${d.gateId} nos comandos ${d.crossingCommands.join('/')}`).join('; ')}.`:'',observed.waited?'Usar bloqueios como esperas enquanto os parceiros avançam.':'Avançar em cada comando enquanto os parceiros usam esperas.',observed.goalDepartures?'Abandonar temporariamente o destino para completar o ajuste conjunto.':'Preparar a chegada conjunta sem depender de congelar no destino.'].filter(Boolean).join(' ');
  }
 }
 l.editorial.objectRoles.push(...(l.channels||[]).map((c,i)=>({type:'channel',id:c.id??`channel-${i}`,definition:c,role:'Preparar saída livre antes do comando; enviar somente a caixa, receber, alcançar outra face e usar o apoio no destino. Entrega é atômica, sem prioridade entre painéis.',evidenceScope:'definition-and-certified-witness; necessity requires separate audit'})));
 l.editorial.causalityReport='tests/sintonia80-purpose-audit.json';
 const valid=validateLevel(l),result=replay(l,l.solution);if(!valid.valid||!result.won)throw Error(`Invalid ${number}: ${JSON.stringify(valid)}`);
 l.certificate={...l.certificate,replayed:true,commands:l.solution.length,engine:'unchanged-rules-1'};
 return l;
});
if(levels.length!==80)throw Error('count');
for(let i=0;i<80;i++){for(const m of levels[i].mechanics){const first=Number(Object.entries(intros).find(([,v])=>v===m)?.[0]||1);if(i+1<first)throw Error(`early ${m} at${i+1}`);}if(i>1&&levels[i].family===levels[i-1].family&&levels[i].family===levels[i-2].family)throw Error(`triple family at${i+1}`);}
writeFileSync(new URL('../dist/sintonia/campaign.mjs',import.meta.url),`/** 80 curated SINTONIA levels; exact engine definitions retained or newly certified. Build: tests/sintonia-build-80.mjs. */\nexport const CONTENT_REVISION = 'sintonia-content-3';\nexport const DIFFICULTIES = Object.freeze(${JSON.stringify(names)});\nexport const CHAPTERS = DIFFICULTIES;\nexport const CAMPAIGN = ${JSON.stringify(levels,null,2)};\n`);
console.log(JSON.stringify({count:levels.length,retained:ORIGINS.filter(Boolean).length,recomposed:2,families:[...new Set(levels.map(l=>l.family))],animals:[2,3,4].map(n=>[n,levels.filter(l=>l.boards.length===n).length])}));

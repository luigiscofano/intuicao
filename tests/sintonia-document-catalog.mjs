/** Rebuild documentation from the exact, final materialized revision. */
import {writeFileSync,readFileSync,mkdirSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {CAMPAIGN,CHAPTERS,DIFFICULTIES,CONTENT_REVISION} from '../dist/sintonia/campaign.mjs';
import {LEGACY_CAMPAIGN} from '../dist/sintonia/campaign-v1.mjs';
import {FALLBACK_LEVELS} from '../dist/sintonia/fallback.mjs';
import {MECHANICS,GENERATOR_VERSION,structuralSignature} from '../dist/sintonia/generator.mjs';
import {BOX_PATTERNS} from '../dist/sintonia/box-design.mjs';
import {DELIVERY_PATTERNS} from '../dist/sintonia/delivery-design.mjs';
import {analyzePurpose} from '../dist/sintonia/purpose.mjs';
import {RULES_VERSION,replay,validateLevel} from '../dist/sintonia/engine.mjs';
import {levelFingerprint} from './sintonia-audit-purpose.mjs';
const audit=JSON.parse(readFileSync(new URL('./sintonia-campaign-audit.json',import.meta.url)));
const docs=new URL('../docs/',import.meta.url);mkdirSync(docs,{recursive:true});
const BASE_ENGINE_SHA256='db5503ca8fcff67526cab621be89c472c1afb75b2083b9c69d9f98859fe8eece';
const engineHash=createHash('sha256').update(readFileSync(new URL('../dist/sintonia/engine.mjs',import.meta.url))).digest('hex');
const fail=message=>{throw new Error(`Documentação recusou dados desatualizados: ${message}`);};
if(CAMPAIGN.length!==500||CHAPTERS.length!==20||FALLBACK_LEVELS.length!==36)fail('catálogo incompleto');
if(audit.contentRevision!==CONTENT_REVISION||audit.generatorVersion!==GENERATOR_VERSION||audit.rulesVersion!==RULES_VERSION)fail('auditoria e gerador de revisões diferentes');
if([...CAMPAIGN,...FALLBACK_LEVELS].some(level=>level.contentRevision!==CONTENT_REVISION||level.generatorVersion!==GENERATOR_VERSION))fail('campanha ou reserva de revisão anterior');
if(engineHash!==BASE_ENGINE_SHA256)fail('o motor deixou de ser byte-idêntico à base v81');
for(const level of [...CAMPAIGN,...FALLBACK_LEVELS])if(!validateLevel(level).valid||!replay(level,level.solution).won)fail(`certificado inválido: ${level.id}`);
const definition=level=>JSON.stringify({boards:level.boards,channels:level.channels||[],initialSwitches:level.initialSwitches||{},initialSelectors:level.initialSelectors||{}});
const retained=CAMPAIGN.filter((level,index)=>definition(level)===definition(LEGACY_CAMPAIGN[index]));
const rebuilt=CAMPAIGN.length-retained.length;
if(audit.retained!==retained.length||audit.rebuilt!==rebuilt)fail('contagens de mapas mantidos/reconstruídos não conferem');
if(audit.certified!==CAMPAIGN.length||audit.uniqueDefinitions!==new Set(CAMPAIGN.map(level=>structuralSignature(level))).size||audit.uniqueTopologies!==new Set(CAMPAIGN.map(level=>structuralSignature(level,{topologyOnly:true}))).size)fail('métricas de certificação/topologia não conferem');
for(const chapter of audit.chapters){
  const group=CAMPAIGN.filter(level=>level.chapter===chapter.number),moves=group.map(level=>level.solution.length),actual={min:Math.min(...moves),max:Math.max(...moves),mean:Math.round(moves.reduce((sum,n)=>sum+n,0)/group.length*10)/10};
  if(group.length!==25||JSON.stringify(chapter.animals)!==JSON.stringify([2,3,4].map(n=>group.filter(level=>level.boards.length===n).length))||JSON.stringify(chapter.moves)!==JSON.stringify(actual))fail(`métricas do capítulo ${chapter.number}`);
  for(const [role,count]of Object.entries(chapter.roleCounts))if(group.filter(level=>level.editorial.role===role).length!==count)fail(`cadência do capítulo ${chapter.number}`);
}
for(const mechanic of MECHANICS){const levels=CAMPAIGN.filter(level=>level.mechanics.includes(mechanic.id)),item=audit.mechanics[mechanic.id];if(item.count!==levels.length||item.first!==levels[0]?.number)fail(`métrica de mecânica: ${mechanic.id}`);}
const labels=Object.fromEntries(MECHANICS.map(m=>[m.id,m.label]));
const arrows={up:'↑',right:'→',down:'↓',left:'←'};
const cell=text=>String(text??'—').replaceAll('|','\\|').replaceAll('\n',' ');
const pattern=level=>level.editorial?.design?.pattern??level.parameters?.pattern??null;
const listed=values=>values.length?values.join(', '):'nenhuma';
function ranges(values){const sorted=[...values].sort((a,b)=>a-b),out=[];for(let i=0;i<sorted.length;i++){const start=sorted[i];let end=start;while(sorted[i+1]===end+1){i++;end=sorted[i];}out.push(start===end?String(start):`${start}–${end}`);}return out.join(', ');}
const countBy=(values,selector)=>values.reduce((out,value)=>{const key=selector(value);out[key]=(out[key]||0)+1;return out;},{});
const patterns=countBy(CAMPAIGN,level=>pattern(level)||'sem-padrão-tipificado');
const bankPatterns=countBy(FALLBACK_LEVELS,level=>pattern(level)||'sem-padrão-tipificado');
const purposeURL=new URL('./sintonia-purpose-audit.json',import.meta.url),purposeReport=existsSync(purposeURL)?JSON.parse(readFileSync(purposeURL)):null;
const verifiedPurposeRecord=level=>purposeReport?.sourceHashes?.engine===engineHash?purposeReport.levels.find(record=>record.id===level.id&&record.fingerprint===levelFingerprint(level)):null;
const stopExamples=CAMPAIGN.filter(level=>level.editorial?.secondaryPattern==='support-and-necessary-stop'||level.editorial?.design?.secondaryPatterns?.includes('support-and-necessary-stop'));
const commitmentURL=new URL('./sintonia-commitment-evidence.json',import.meta.url),commitmentReport=existsSync(commitmentURL)?JSON.parse(readFileSync(commitmentURL)):null;
const validCommitment=commitmentReport?.fingerprint===levelFingerprint(CAMPAIGN[250])&&commitmentReport?.engineSha256===engineHash?commitmentReport:null;


function boxMetrics(levels){const records=levels.map(level=>({level,purpose:analyzePurpose(level)})),boxes=records.flatMap(record=>record.purpose.boxes);return {levels:records.filter(record=>record.purpose.boxes.length).length,boxes:boxes.length,onePush:boxes.filter(box=>box.pushes.length===1).length,multiple:boxes.filter(box=>box.pushes.length>1).length,turns:boxes.filter(box=>box.directionChanges>0).length,releases:boxes.filter(box=>box.plateReleases.some(release=>release.afterGateSupport)).length,delivered:boxes.filter(box=>box.deliveries.length).length,recipient:boxes.filter(box=>box.postDeliveryPushes.length).length};}
const before=boxMetrics(LEGACY_CAMPAIGN),after=boxMetrics(CAMPAIGN),fallbackBoxes=boxMetrics(FALLBACK_LEVELS);
const animalCounts=[2,3,4].map(animals=>CAMPAIGN.filter(level=>level.boards.length===animals).length);
const roleFirst=CAMPAIGN.filter(level=>level.editorial?.source==='role-first-structure-and-automatic-curation').length;
const optimal=CAMPAIGN.filter(level=>level.certificate?.optimal===true).length;

let catalogue=`# SINTONIA — catálogo editorial das ${CAMPAIGN.length} fases\n\n`;
catalogue+=`Revisão de conteúdo **\`${CONTENT_REVISION}\`** · gerador **${GENERATOR_VERSION}** · regras **${RULES_VERSION}**. Este índice é gerado das definições completas de \`dist/sintonia/campaign.mjs\`, sem copiar números de uma revisão anterior.\n\n`;
catalogue+=`${retained.length} mapas foram mantidos (${ranges(retained.map(level=>level.number))}); ${rebuilt} foram reconstruídos. A coluna “Padrão” identifica a composição declarada; “não tipificado” não inventa uma classificação para as demais geometrias. Famílias e padrões são classificações editoriais, não provas de descobertas distintas.\n\n`;
catalogue+=`Todas as ${CAMPAIGN.length} soluções foram validadas e reproduzidas com vitória no motor do jogo. ${optimal} certificados registram optimalidade; somente esses recebem “mínimo”. Os demais seriam apresentados como testemunhos, nunca como mínimos. Comprimento não mede dificuldade humana. **Não há testes humanos concluídos nem aprovação automática pela rubrica editorial.**\n\n`;
catalogue+='As fichas integrais registram descoberta, dicas, justificativa de manutenção/reconstrução, papéis e testemunho de eventos. Necessidade e limites das consultas ficam separados em `tests/sintonia-purpose-audit.json` e [evidências de propósito](sintonia-purpose-evidence.md). Uma utilização no certificado não basta para chamar um elemento de indispensável.\n\n';
catalogue+='Setas: ↑ cima · → direita · ↓ baixo · ← esquerda. Cada seta vale para todos os animais.\n\n';
for(let chapter=1;chapter<=CHAPTERS.length;chapter++){
  const group=CAMPAIGN.filter(level=>level.chapter===chapter),metrics=audit.chapters.find(item=>item.number===chapter);
  catalogue+=`## ${chapter}. ${CHAPTERS[chapter-1]}\n\n`;
  catalogue+=`${group[0].number}–${group.at(-1).number} · duplas/trios/quartetos: ${metrics.animals.join(' / ')} · certificados: ${metrics.moves.min}–${metrics.moves.max} comandos, média ${metrics.moves.mean.toFixed(1)}.\n\n`;
  catalogue+='| ID | Nome | Animais | Decisão | Padrão | Família | Mecânicas | Descoberta principal | Certificado | Solução verificada |\n|---|---|---:|---|---|---|---|---|---|---|\n';
  for(const level of group)catalogue+=`| ${level.id} | ${cell(level.name)} | ${level.boards.length} | ${level.editorial.decision==='retain'?'mantida':'reconstruída'} | ${pattern(level)||'não tipificado'} | ${level.family} | ${level.mechanics.map(id=>labels[id]).join(', ')} | ${cell(level.editorial.discovery)} | ${level.solution.length} (${level.certificate.optimal?'mínimo':'testemunho'}) | ${level.solution.map(direction=>arrows[direction]).join(' ')} |\n`;
  catalogue+='\n';
}
writeFileSync(new URL('sintonia-catalogo.md',docs),catalogue);

let design='# SINTONIA — redesign de conteúdo, geração e evidências\n\n';
design+=`## Revisão e escopo\n\n**Conteúdo \`${CONTENT_REVISION}\`; gerador ${GENERATOR_VERSION}; regras ${RULES_VERSION}.** A revisão altera problemas, posições, caminhos, recursos e dependências, não regras de movimento, desenhos, estilos ou animações. O motor \`dist/sintonia/engine.mjs\` permanece byte-idêntico à base v81 (commit \`a9f4bd4d58218f474a5eba3cd54700ff6b1b134b\`): SHA-256 \`${engineHash}\`. A migração usa textos explicativos na interface existente; não cria um layout novo.\n\n`;
design+=`A campanha contém ${CAMPAIGN.length} fases, ${CHAPTERS.length} capítulos de 25 e ${DIFFICULTIES.length} faixas: ${animalCounts[0]} duplas, ${animalCounts[1]} trios e ${animalCounts[2]} quartetos. O primeiro trio está na ${CAMPAIGN.find(level=>level.boards.length===3).number}; o primeiro quarteto, na ${CAMPAIGN.find(level=>level.boards.length===4).number}. As primeiras ocorrências de mecânicas são conferidas na tabela abaixo.\n\n`;
design+=`Foram mantidos **${retained.length} mapas (${ranges(retained.map(level=>level.number))})** e reconstruídos **${rebuilt}**. A fase 1 conserva o primeiro comando conjunto; a 51 conserva o caso compacto de parada intermediária e saída temporária da meta; a 176 conserva a demonstração deliberada de um único empurrão. As primeiras 75 permanecem como base geométrica introdutória, com a justificativa e os diagnósticos registrados — isso não equivale a testes humanos. A 426 apresenta a entrega com ${CAMPAIGN[425].boards.length} animais; a troca com a 430 (${CAMPAIGN[429].boards.length} animais) conserva a quota do capítulo 18.\n\n`;
design+=`${roleFirst} definições da campanha usam os construtores com papéis e relações declarados antes da busca de metas. As demais reconstruções usam a gramática geométrica e as condições do gerador, com certificação e análise de eventos. “Reconstruída” indica mudança real de definição, não aprovação editorial automática nem garantia de originalidade de raciocínio.\n\n`;
design+=`As ${audit.certified} fases possuem replay vencedor; ${optimal} certificados registram optimalidade. Há ${audit.uniqueDefinitions} assinaturas de definição e ${audit.uniqueTopologies} topologias conjuntas distintas após retirar margens/translação, permutar painéis e normalizar rotação/reflexão global. Geometria distinta não demonstra descoberta distinta. A assinatura lógica complementar e suas repetições são publicadas na auditoria de propósito, sem prometer equivalência matemática.\n\n`;

design+='## Caixas: orientação, acesso, apoio e liberação\n\n';
design+='A receita única “caixa adjacente → alcova com placa → esquecer” deixa de orientar o conteúdo reconstruído. Os padrões escolhem primeiro o papel do recurso e as regiões que ele precisa relacionar; não aumentam um corredor apenas para produzir mais empurrões. Remover lados de um circuito altera as faces de empurrão acessíveis, em vez de acrescentar decoração. A proximidade entre caixa e placa não é proibida: a apresentação da 176 mantém sua justificativa.\n\n';
design+='| Padrão | Decisão que organiza a composição | Campanha | Reservas |\n|---|---|---:|---:|\n';
const boxDescriptions={'turn-and-support':'Alcançar outra face da caixa para orientar o apoio, mantendo a saída acessível.','park-and-retrieve':'Afastar a caixa do apoio, estacionar sem prendê-la e recuperar a face oposta.','support-then-release':'Sustentar a passagem até uma chave; depois retirar a caixa da casa que precisa receber o animal.','remote-relay':'A caixa assume uma ajuda enquanto outro animal ainda preserva o acesso de retorno.','support-and-necessary-stop':'Sustentar uma travessia e depois oferecer um bloqueio físico indispensável à coordenação; consultar a prova do predicado.'};
for(const id of BOX_PATTERNS)design+=`| \`${id}\` | ${boxDescriptions[id]??'Composição específica; consulte a ficha e a evidência do predicado correspondente.'} | ${patterns[id]||0} | ${bankPatterns[id]||0} |\n`;
design+='\nA família `dual-use-object` não é mais atribuída só porque o certificado encostou numa caixa imóvel. No padrão `support-then-release`, descreve a transição entre sustentar uma travessia e liberar a chegada. Um bloqueio observado continua sendo apenas um evento do testemunho; só uma comparação ou busca de evasão adequada pode sustentar uma alegação de segunda função necessária.\n\n';
if(stopExamples.length){
  design+='### Apoio e bloqueio real: o oitavo padrão do plano\n\n';
  for(const level of stopExamples){
    const record=verifiedPurposeRecord(level),query=record?.avoidance.find(item=>item.id==='box-supported-stop:box0');
    design+=`Na fase **${level.number}**, o padrão principal é \`${pattern(level)}\` e a função secundária é \`support-and-necessary-stop\`. A caixa do bem-te-vi sustenta uma cancela e, em um comando posterior, serve como bloqueio físico enquanto outro animal se move. Isso não é inferido apenas de um empurrão bloqueado no certificado.\n\n`;
    design+='O predicado exige que a passagem entre animal e caixa esteja aberta, que o empurrão seja fisicamente impossível e que o apoio da mesma caixa já tenha sido consumido por uma travessia em comando anterior. Uma cancela fechada no caminho até a caixa não conta; uma travessia no mesmo comando não fabrica a ordem de funções.\n\n';
    if(query?.result.status==='unsolvable'&&query.result.exhaustive)design+=`A busca de evasão \`${query.id}\`, no fingerprint desta definição, esgotou **${query.result.visited} estados** sem vitória evitando esse papel: necessidade demonstrada sob esse predicado exato. Não demonstra solução única, dificuldade humana nem que todo bloqueio de outra fase seja necessário.\n\n`;
    else design+=`O resultado da consulta \`box-supported-stop:box0\` precisa ser lido na auditoria correspondente ao fingerprint atual${query?`: estado **${query.result.status}**`:'; este documento ainda não incorporou um resultado atualizado'}. Não é tratado aqui como prova automática de necessidade.\n\n`;
  }
  if(BOX_PATTERNS.some(id=>/stop/.test(id)))design+='O Endless também dispõe de uma composição compacta própria de apoio seguido de bloqueio, sem reciclar a fase 423. Cada candidata aceita nessa ramificação exige replay e busca de evasão exaustiva do bloqueio após apoio; resultado inconclusivo ou contraexemplo impede sua aceitação. Não se estende a prova de uma orientação às demais sem repetir a consulta.\n\n';
}
design+='Os números seguintes contam **eventos dos certificados**, não propriedades universais de todas as soluções. Uma caixa pode ser necessária e ainda representar uma decisão trivial; mais empurrões, isoladamente, não resolvem essa questão.\n\n';
design+='| Evidência no certificado da campanha | Base v1 | Revisão atual |\n|---|---:|---:|\n';
for(const [label,key]of [['Fases com caixas','levels'],['Caixas','boxes'],['Caixas com exatamente um empurrão','onePush'],['Caixas com mais de um empurrão','multiple'],['Caixas com mudança de direção','turns'],['Caixas retiradas após sustentar uma travessia','releases'],['Caixas entregues','delivered'],['Caixas empurradas pelo receptor após entrega','recipient']])design+=`| ${label} | ${before[key]} | ${after[key]} |\n`;

design+='\n## Entrega: preparar os dois lados e reutilizar o recurso\n\n';
design+='A saída do canal começa ocupada pelo receptor e precisa ser liberada em um comando anterior. A caixa não chega diretamente à placa de destino: o receptor ainda precisa encontrar a face útil de empurrão. Nas variantes de remetente preparado pelo lado errado, é necessário preservar o contorno antes do envio. Em trios/quartetos, os ajudantes possuem condições próprias na cadeia de apoio, em vez de serem simplesmente mapas independentes adicionados ao conjunto.\n\n';
design+='| Padrão | Relação principal | Campanha | Reservas |\n|---|---|---:|---:|\n';
const deliveryDescriptions={'receive-turn-support':'Liberar a saída, receber, reorientar e sustentar os acessos.','receive-hold-return':'Após receber e orientar, preservar a placa do remetente até o retorno do receptor.','receive-clear-circuit':'Deslocar a caixa recebida lateralmente e conservar o circuito para alcançar outra face.'};
for(const id of DELIVERY_PATTERNS)design+=`| \`${id}\` | ${deliveryDescriptions[id]??'Composição específica; consulte a ficha e a evidência correspondente.'} | ${patterns[id]||0} | ${bankPatterns[id]||0} |\n`;
design+='\nA prova de orientação no receptor precisa ignorar empurrões anteriores do remetente. Uma mudança de direção entre painéis não conta automaticamente como reposicionamento no painel de destino. O relatório de propósito usa um monitor específico para esse predicado.\n\n';

design+='## Obstáculos e relações sem caixas\n\n';
design+='`obstacle-design.mjs` seleciona braços e regiões com trabalhos distintos antes da escolha final de metas. Chaves e interruptores ficam em desvios de preparação, não apenas no meio do trajeto obrigatório. Passagens de sentido único e pontes podem separar o controle ainda necessário; outra composição de sentido único exige um retorno por uma saída diferente. O portal leva à preparação em outra ilha e precisa ser usado novamente para voltar à região de chegada. Animais adicionais recebem controles que liberam cortes separados.\n\n';
design+='| Padrão declarado | Campanha | Reservas |\n|---|---:|---:|\n';
for(const id of ['key-fork-before-exit','switch-fork-before-exit','oneway-prepare-before-commit','oneway-independent-return','fragile-prepare-before-commit','portal-retrieve-and-return'])design+=`| \`${id}\` | ${patterns[id]||0} | ${bankPatterns[id]||0} |\n`;
design+='\n### Configurar antes do compromisso: o décimo padrão do plano\n\n';
design+='Na fase **251**, a capivara prepara um interruptor antes de abandonar a região de controle pela aresta de sentido único. O tuiuiú precisa aproveitar a configuração da cancela; o bem-te-vi conserva sua tarefa distinta de chave. O Endless pode construir essa família com interruptor ou chave já conhecidos, sem antecipar mecânicas novas.\n\n';
if(validCommitment?.globalOrderCounterexample.status==='unsolvable'&&validCommitment.globalOrderCounterexample.exhaustive){
  design+=`O prefixo **${validCommitment.prematurePrefix.commands.map(direction=>arrows[direction]).join(' ')}** cruza cedo demais. A continuação no mapa original é insolúvel por exaustão de **${validCommitment.originalFromPrematureState.visited} estados**. Retirar apenas a restrição direcional, preservando exatamente o mesmo estado, permite recuperar em **${validCommitment.sameStateWithoutDirectedRestriction.commands} comandos**, com ${validCommitment.sameStateWithoutDirectedRestriction.visited} estados visitados.\n\n`;
  design+=`Uma busca global com estado completo mais memória de preparação e violação esgotou **${validCommitment.globalOrderCounterexample.visited} estados**: nenhuma vitória atravessa antes de um comando anterior ter configurado o interruptor como verdadeiro. Os limites e fingerprints ficam em \`tests/sintonia-commitment-evidence.json\`, reproduzidos por \`tests/sintonia-commitment.test.mjs\`.\n\n`;
  if(validCommitment.currentValueAtCommitmentCounterexample.status==='solved')design+=`A alegação mais forte “o interruptor ainda precisa estar verdadeiro no momento do compromisso” foi **refutada** por uma solução de ${validCommitment.currentValueAtCommitmentCounterexample.commands} comandos. Depois que o receptor já atravessou, é possível desligar e partir. Preparar antes não significa manter a ajuda para sempre. Esse contraexemplo é preservado no relatório, não ocultado.\n\n`;
}else design+='A prova temporal deve ser consultada em \`tests/sintonia-commitment-evidence.json\` quando seu fingerprint corresponder à definição atual; não se presume necessidade só pela ordem do certificado.\n\n';
design+='\nPlacas, gelo, sol/lua, revezamento, AND e seletores continuam no catálogo e nas regras existentes. As condições escolhidas e os eventos do certificado são verificáveis; não se afirma que cada parede, espera ou restrição recebeu uma prova universal de necessidade. Exceções, variantes equivalentes e limites de orçamento não são ocultados pela classificação editorial.\n\n';

design+='## Ritmo, distribuição e introduções\n\n';
design+='Cada capítulo conserva quatro focos, oito combinações, cinco retomadas acessíveis, quatro desafios compactos, três desafios de planejamento profundo e uma síntese. Ordem: foco, combinação, foco, compacto, retomada, combinação, foco, combinação, profundo, retomada, combinação, compacto, foco, combinação, retomada, combinação, profundo, compacto, combinação, retomada, combinação, compacto, profundo, retomada, síntese. “Foco” tardio reinterpreta uma relação conhecida; “síntese” não obriga reunir todos os ícones.\n\n';
design+='Os comandos abaixo descrevem os certificados efetivos por capítulo, não metas artificiais de comprimento nem notas de dificuldade humana. Dependências antecipadas, alternativas, recuperação e carga de coordenação precisam de avaliação separada.\n\n';
design+='| Capítulo | Fases | Duplas/trios/quartetos | Mantidas/reconstruídas | Comandos mín.–máx. | Média |\n|---|---|---|---|---|---:|\n';
for(const chapter of audit.chapters){const group=CAMPAIGN.filter(level=>level.chapter===chapter.number),keep=group.filter(level=>level.editorial.decision==='retain').length;design+=`| ${chapter.number}. ${chapter.title} | ${(chapter.number-1)*25+1}–${chapter.number*25} | ${chapter.animals.join(' / ')} | ${keep} / ${group.length-keep} | ${chapter.moves.min}–${chapter.moves.max} | ${chapter.moves.mean.toFixed(1)} |\n`;}
design+='\n| Mecânica | Primeira fase | Fases com a mecânica |\n|---|---:|---:|\n';
for(const mechanic of MECHANICS){const item=audit.mechanics[mechanic.id];design+=`| ${mechanic.label} | ${item.first} | ${item.count} |\n`;}

design+='\n## Propósito: três tipos de evidência, sem confundi-los\n\n';
design+='1. **Testemunho de uso:** `analyzePurpose` reproduz a sequência fornecida e registra caminhos da caixa, mudanças de direção, ocupações/liberações de placas, travessias sustentadas, entregas, movimentos/esperas e saída das metas. Prova o que ocorreu nessa sequência.\n';
design+='2. **Ablação controlada:** uma cópia válida remove a caixa, substitui-a por parede quando possível, começa na posição final, abre uma cancela/grupo de controles, torna gelo piso comum ou ponte permanente, retira sentido único ou desativa portal. A hipótese e a comparabilidade precisam ser lidas junto do resultado. Desconectar uma região não demonstra um bom atalho.\n';
design+='3. **Busca de evasão:** procura uma vitória sem o evento ou a ordem anunciados. Usa o estado lógico completo mais os monitores relevantes. Um contraexemplo refuta necessidade; esgotar completamente o espaço prova apenas o predicado exato. Atingir orçamento de estados, tempo ou profundidade é **inconclusivo**, nunca “insolúvel” nem “necessário”.\n\n';
design+='`tests/sintonia-purpose-audit.json` registra sementes, revisões, fingerprints, limites, testemunhos, ablações, contraexemplos e consultas inconclusivas para campanha e banco. [O relatório separado](sintonia-purpose-evidence.md) resume as evidências e as fases 177, 200, 426 e 500. A assinatura lógica é uma classificação revisável de dependências/papéis/ordem observada, não promessa matemática de que duas fases exigem raciocínios diferentes. A verificação de fingerprint impede reutilizar uma prova após alterar mapa ou solução.\n\n';
design+='**Rubrica e testes humanos permanecem pendentes.** As seis dimensões propostas — propósito, descoberta, interdependência, clareza causal, economia espacial e variedade — não recebem aprovação automática a partir de replay, número de estados ou contagem de empurrões. Não foram observados jogadores nem confirmadas empiricamente compreensão, diversão, dificuldade ou variedade percebida. Os requisitos humanos do plano não são declarados concluídos.\n\n';

design+='## Diagnósticos de repetição\n\n';
design+=`Repetição de uma única direção vence nas fases: **${listed(audit.antiSpam.singleDirectionSolvable)}**. A varredura até bloqueio, com vitória conferida em cada passo intermediário, vence em ${audit.antiSpam.sweepSolvable.length} fases: ${listed(audit.antiSpam.sweepSolvable)}. Consultas de varredura inconclusivas: ${listed(audit.antiSpam.sweepInconclusive)}. Não se transforma busca incompleta em resistência provada.\n\n`;
const sweepLater=audit.antiSpam.sweepSolvable.filter(number=>number>=13);
design+=sweepLater.length?`Exceções posteriores à introdução: ${sweepLater.join(', ')}; exigem leitura individual, não extensão artificial do mapa para vencer o teste.\n\n`:'Nenhuma fase de 13 a 500 foi resolvida por esse procedimento nas auditorias completas registradas.\n\n';
design+=`Foram testados ${CAMPAIGN[0].editorial.antiSpam.shortCycles.tested} padrões cíclicos curtos por fase. ${audit.antiSpam.shortCycleSolvable.length} fases aceitam pelo menos um: ${listed(audit.antiSpam.shortCycleSolvable)}. O detector inclui estado lógico completo e índice no padrão e verifica vitória depois de cada comando.\n\n`;
design+=`Nas amostras fixas de ${CAMPAIGN[0].editorial.antiSpam.biasedRandom.commandsPerRun} comandos: ${audit.antiSpam.biasedRandomWins}/${audit.antiSpam.biasedRandomRuns} tentativas com tendência a repetir uma direção venceram; nas uniformes, ${audit.antiSpam.uniformRandomWins}/${audit.antiSpam.uniformRandomRuns}. São diagnósticos reproduzíveis, não estimativas de dificuldade humana nem prova de ausência de raciocínio. Repetições legítimas continuam permitidas na partida.\n\n`;

design+='## Endless e banco de segurança\n\n';
design+='O gerador 2 usa a mesma seleção de papéis de caixa, preparação, entrega e dependências antes de selecionar metas certificadas. Não carrega a campanha para reciclá-la. Geometrias, pontos de espera, faces disponíveis, orientação relativa e responsabilidades variam; giros não são contados como topologias novas. Nem toda classe de raciocínio é infinita, e a família editorial não promete unicidade lógica.\n\n';
design+='Semente, versão e parâmetros controlam as escolhas. O teto de estados/profundidade é determinístico; se o relógio esgota o orçamento, a chamada falha em vez de escolher uma meta de um conjunto parcial dependente da máquina. Só retorna definição validada e replay vencedor. Uma falha de orçamento não é prova de insolubilidade.\n\n';
design+='O histórico limita a introdução a uma regra desconhecida. Sem quantidade de animais explícita, a introdução usa uma dupla e até 14 comandos; combinações posteriores podem recuperar regras conhecidas. As últimas 24 assinaturas e famílias orientam uma preferência determinística e suave de variedade, sem sacrificar validade. Não há promessa de unicidade global do Endless.\n\n';
design+=`O banco foi recurado para a revisão atual: **${FALLBACK_LEVELS.length} definições próprias, seis por faixa**, com sementes separadas da campanha. Seus ${fallbackBoxes.boxes} objetos-caixa possuem ${fallbackBoxes.multiple} testemunhos de múltiplos empurrões e ${fallbackBoxes.turns} de mudança de direção; ${fallbackBoxes.delivered} são entregues, ${fallbackBoxes.recipient} com empurrões posteriores no receptor. Esses números continuam sendo observações, não provas universais. A seleção prioriza conteúdo não usado/recente e confere replay, sem busca síncrona durante a interação.\n\n`;

design+='## Preservação do progresso\n\n';
design+='Revisão de conteúdo não altera `rulesVersion`. Conclusões históricas e desbloqueios permanecem. Tentativas antigas sem definição são resolvidas contra o arquivo imutável `campaign-v1.mjs`, nunca reinterpretadas sobre coordenadas novas; tentativas novas usam o catálogo atual. Os novos salvamentos incluem a definição jogável integral, a revisão, comandos, cursor e estado. Relatórios editoriais volumosos não são duplicados no armazenamento local.\n\n';
design+='O histórico de desfazer/refazer é reconstituído no mesmo mapa e o estado é conferido. Incompatibilidade ou definição ausente bloqueia a retomada sem sobrescrever silenciosamente o salvamento. Reiniciar uma tentativa antiga pede confirmação explícita e informa que apenas aquela tentativa passará ao mapa atualizado. Sessões Endless guardam suas próprias definições; importação/exportação não pode misturar uma solução antiga com um mapa novo. A evidência de retomada está nos testes de serviço/estado da interface, separada da auditoria de level design.\n\n';

design+='## Regras preservadas\n\n';
design+='| Relação | Regra existente |\n|---|---|\n';
for(const row of [
 ['Comando e destinos','Todos os animais recebem a mesma seta, inclusive sobre os destinos; vitória exige chegada conjunta.'],
 ['Controles e cancelas','A passagem usa a configuração capturada no início do comando; a nova ocupação/configuração vale no seguinte.'],
 ['Caixas','Um empurrão de uma casa, sem puxar ou empurrar cadeias; cancelas e sentidos únicos também condicionam caixas.'],
 ['Caixa e terreno especial','Gelo, portal e ponte conservadoramente alcançáveis por uma caixa continuam inválidos; combine em painéis separados.'],
 ['Gelo e portal','Gelo continua até piso comum/bloqueio; entrar no portal transporta uma vez dentro do painel e encerra o movimento.'],
 ['Ponte frágil','Desaparece na saída, sem temporizador; desfazer restaura o estado completo.'],
 ['AND e seletor','AND exige todas as placas; seletor continua exigindo ocupação e estado 0/1 da conexão.'],
 ['Entrega','Saída livre no início e sem ocupação concorrente; conflito cancela envio e empurrão, sem prioridade por painel; ciclos de canais são inválidos.']])design+=`| ${row[0]} | ${row[1]} |\n`;

design+='\n## Arquivos e reprodução\n\n';
design+='- `campaign.mjs`: catálogo atual; `campaign-v1.mjs`: definições antigas exclusivamente para retomada.\n';
design+='- `generator.mjs`, `box-design.mjs`, `delivery-design.mjs`, `obstacle-design.mjs`: geração e composição de conteúdo.\n';
design+='- `fallback.mjs`: banco independente certificado da mesma revisão.\n';
design+='- `purpose.mjs`: testemunhos, ablações e buscas instrumentadas; não altera regras.\n';
design+='- `tests/sintonia-campaign-audit.json`: métricas exatas do catálogo, agenda, ritmo e repetição.\n';
design+='- `tests/sintonia-purpose-audit.json` e `docs/sintonia-purpose-evidence.md`: necessidade, contraexemplos, limites e classificação lógica.\n- `tests/sintonia-commitment-evidence.json`: prova temporal e contraexemplo específico da configuração antes do compromisso na fase 251.\n';
design+='- `docs/sintonia-catalogo.md`: índice por fase, incluindo padrão, decisão e certificado.\n\n';
design+='```sh\nnode tests/sintonia-build-campaign.mjs\nnode tests/sintonia-audit-purpose.mjs\nnode tests/sintonia-commitment.test.mjs --write-evidence\nnode --test tests/sintonia-engine.test.mjs tests/sintonia-engine-analysis.test.mjs tests/sintonia-catalog.test.mjs tests/sintonia-purpose.test.mjs tests/sintonia-redesign.test.mjs tests/sintonia-commitment.test.mjs tests/sintonia-service.test.mjs tests/sintonia-ui-state.test.mjs tests/sintonia-integration.test.mjs\nnode tests/sintonia-document-catalog.mjs\n```\n\n';
design+='O gerador desta documentação recusa campanha/reservas de revisões diferentes, replay inválido, métricas incompatíveis ou mudança no hash do motor. Os comandos acima são instruções de reprodução, não uma alegação de que cada suíte foi executada por este script. Avaliação humana e inspeção visual continuam complementares aos certificados.\n';
writeFileSync(new URL('sintonia-level-design.md',docs),design);
console.log(JSON.stringify({contentRevision:CONTENT_REVISION,generatorVersion:GENERATOR_VERSION,catalogue:CAMPAIGN.length,retained:retained.length,rebuilt,engineHash,design:true}));

import fs from 'node:fs/promises';
import {requireSensorInDebut} from './orbita80-sensor-debut.mjs';
import {CATALOG as source} from '../dist/orbita/catalog-legacy1000.mjs';
import {normalizeLegacyCircleCoordinates} from './orbita80-geometry-repair.mjs';
import {createEngine,replay,validateLevel} from '../dist/orbita/engine.mjs';
import {describeReplay,invertMoves,randomFor,shortSolutionSearch} from '../dist/orbita/generator.mjs';
import {validateCircleGeometryV3} from '../dist/orbita/topology-circles-v3.mjs';
const bands=['Básico','Aprendiz','Intermediário','Avançado','Mestre','Modo Sábio'];
const origins=[
1,2,3,5,6,8,9,10,13,14,20,23,28,30,35,
40,45,55,60,65,95,100,125,165,185,190,201,252,526,576,
854,203,301,275,213,302,453,239,278,284,351,335,368,244,590,
376,500,241,401,382,450,602,533,510,609,614,434,490,220,610,
616,207,730,735,885,752,782,803,820,827,840,901,920,975,997,
245,290,898,825,982];
const orbit=(l)=>{const e=createEngine(l),s=e.initialState();for(const c of l.commands){let q=s;const seen=new Set([e.key(q)]);for(let i=0;i<10000;i++){const t=e.transition(q,{command:c.id,direction:1});if(!t.allowed)break;if(e.isWon(t.state))return true;q=t.state;const k=e.key(q);if(seen.has(k))break;seen.add(k);}}return false;};
function debut(l,kind){const solved=replay(l,l.solution).state;const rng=randomFor(l.id*197);for(let attempt=0;attempt<2000;attempt++){
 const x=structuredClone(l);x.targets=Object.fromEntries(Object.entries(x.targets).slice(0,kind==='sensor'?3:2));x.initial={...solved.occupancy};const e=createEngine(x);let q=e.initialState(),path=[];for(let k=0;k<(kind==='sensor'?4:3);k++){let ms=e.allowedMoves(q).filter(m=>m.command!==path.at(-1)?.command);if(!ms.length)ms=e.allowedMoves(q);const m=ms[Math.floor(rng()*ms.length)];const t=e.transition(q,m);q=t.state;path.push(m);}x.initial={...q.occupancy};x.solution=invertMoves(path);const en=createEngine(x);const trace=describeReplay(x);if(en.isWon(en.initialState())||orbit(x)||!replay(x,x.solution).solved||new Set(path.map(m=>m.command)).size<2)continue;
 if(kind==='sensor'&&(!trace.sensorChanges||x.commands.filter(c=>c.requires.length).every(c=>en.commandStatus(en.initialState(),c.id).allowed)))continue;
 if(kind==='gear'&&!path.some(m=>m.command==='G'))continue;
 if(kind==='step'&&!path.some(m=>x.commands.find(c=>c.id===m.command).turns.some(t=>x.rings.find(r=>r.id===t.ring).step===2)))continue;
 return x;}throw Error('No debut '+kind);}
const focused=[
'clockwise','counterclockwise','neutral','shared-house','staging','receiver','restore','last-command','deliveries','equivalent','receiver','deliveries','deliveries','restore','receiver',
'joint-delivery','mixed-lengths','restore','cross-restoration','reserve','restore','reserve','mixed-lengths','cross-restoration','intermediate','last-command','localized','triangle','intermediate','two-doors',
'step','restore','step','reserve','localized','step','joint-delivery','reserve','intermediate','reserve','gear','last-command','gear','localized','intermediate',
'satellites','circuit','reserve','sensor','cross-restoration','ladder','intermediate','gear','sensor','cross-restoration','intermediate','alternative-sensor','localized','two-doors','satellites',
'step','compact-restore','mesh','cross-restoration','compact-mechanism','reserve','sensor','coordinated-mechanisms','localized','intermediate','cross-restoration','alternative-sensor','mesh','gear','global-restore',
'compact-restore','reserve-route','localized-mechanism','sensor-gear','global-restore'];
const focusText={
'clockwise':'Leve o símbolo ao alvo com um giro horário.', 'counterclockwise':'Compare os sentidos e use o giro anti-horário.', 'neutral':'Os alvos ficam fixos; a peça neutra ocupa uma casa e gira junto.',
'shared-house':'A casa do encontro pertence aos dois anéis; veja qual anel move a peça agora.', 'staging':'Posicione a peça na casa compartilhada antes de escolher seu próximo anel.', 'receiver':'Prepare a posição de chegada e observe a peça que o receptor leva ao encontro.',
'restore':'Acompanhe um alvo que sai do lugar e planeje sua restauração.', 'last-command':'Planeje o comando final a partir dos alvos que ele deve deixar corretos juntos.', 'deliveries':'Compare a ordem das entregas pela passagem compartilhada.', 'equivalent':'Peças iguais podem trocar de função; escolha o exemplar bem posicionado.',
'joint-delivery':'Um giro desloca várias peças: coordene a entrega com a próxima preparação.', 'mixed-lengths':'Compare os comprimentos dos anéis ao preparar a posição de chegada.', 'cross-restoration':'Planeje transferência e retorno de alvos entre regiões diferentes.', 'reserve':'Use uma região de reserva para organizar as próximas transferências.', 'intermediate':'Prepare o anel intermediário antes de encaminhar peças aos destinos.', 'localized':'Explore sequências de ida e volta para restaurar parte do tabuleiro.', 'triangle':'Compare as rotas pelo circuito triangular antes de entregar as peças.', 'two-doors':'Observe as duas portas do encontro: o giro altera ambas ao mesmo tempo.', 'satellites':'Coordene a órbita central com os satélites sem perder as preparações.', 'circuit':'Compare as rotas do circuito e a ordem das restaurações.', 'ladder':'Organize a passagem entre os lados da escada e a condição do sensor.', 'alternative-sensor':'Compare rotas alternativas mantendo a condição externa do sensor.', 'mesh':'Organize transferências e restaurações entre várias conexões da malha.', 'compact-restore':'Restaure vários alvos numa rede compacta: tamanho não determina dificuldade.', 'compact-mechanism':'Combine periodicidade e condição externa numa rede compacta.', 'coordinated-mechanisms':'Coordene passo, engrenagem e condição externa antes das entregas.', 'global-restore':'Planeje as entregas da rede e a restauração simultânea dos alvos.', 'reserve-route':'Compare encontros e reserva ao escolher a ordem das entregas.', 'localized-mechanism':'Combine o passo conhecido com idas e voltas de efeito localizado.', 'sensor-gear':'Prepare e preserve a condição externa enquanto coordena os anéis acoplados.'};
const levels=[];
for(let i=0;i<80;i++){
 const old=source.find(l=>l.id===origins[i]);let l=structuredClone(old);if(i<30)l=normalizeLegacyCircleCoordinates(l);
 const kind=i===30?'step':i===40?'gear':i===48?'sensor':null;if(kind)l=debut(l,kind);if(kind==='sensor')l=requireSensorInDebut(l);
 const tier=Math.min(5,Math.floor(i/15));l.editorialLevel=i+1;l.editorialTierIndex=tier;l.difficulty=[0,1,2,3,4,4][tier];l.difficultyBand=bands[tier];l.chapter=tier+1;l.name=`Órbita · ${i+1}`;l.catalogVersion=4;l.definitionVersion='orbita80-1';
 const tr=describeReplay(l);const primary=kind??(l.authorship?.pattern??l.concepts?.[0]??'transfer');
 l.editorialDiscovery=focused[i]; if(focusText[focused[i]])l.discovery=focusText[focused[i]];l.editorialOrigin={catalog:'orbita-campaign-3',sourceLevel:old.id,action:kind?'recomposed-short-introduction':i<30?'selected-and-exact-circle-normalized':'selected-full-catalog'};
 if(i===2)l.discovery='Os alvos ficam fixos; a peça neutra também ocupa uma casa e gira junto com as demais.';
 if(kind==='step')l.discovery='Compare a alternância do anel de passo 2 com a transferência pelo outro anel: cada clique avança duas casas de uma vez.';
 if(kind==='gear')l.discovery='Prepare as duas regiões separadas: a engrenagem move os dois anéis juntos, em sentidos opostos, sem disputar casas.';
 if(kind==='sensor')l.discovery='Prepare o símbolo na casa externa antes de acionar o comando. O sensor não é consumido e permite o inverso imediato.';
 // Every definition has an explicit legal solved-to-initial certificate, independently replayed below.
 const finish=replay(l,l.solution);l.authorship??={};l.authorship.solvedArrangement={...finish.state.occupancy};l.authorship.scramble=invertMoves(l.solution);l.authorship.difficultyCalibration='editorial planning progression; not human-playtested';
 l.validation={...l.validation,trace:tr,minimumProven:false,minimum:null,solutionUpperBound:l.solution.length,campaign80:true};
 if(kind){l.family=l.authorship.baseTopologyFamily??'chain';l.authorship.primaryFamily=l.family;l.authorship.secondaryFamilies=(l.authorship.secondaryFamilies??[]).filter(f=>['mixed-lengths','step-network','separate-gears'].includes(f));l.authorship.evidence=undefined;l.authorship.pattern=kind;l.validation.complexity=undefined;}
 const v=validateLevel(l),g=validateCircleGeometryV3(l);if(!v.valid||!g.valid||!finish.solved)throw Error(`${i+1}/${l.id}: ${JSON.stringify({v,g})}`);if(i>=4&&orbit(l))throw Error(`single orbit ${i+1}/${l.id}`);
 levels.push(l);
}
if(levels.length!==80)throw Error('Count');
await fs.writeFile(new URL('../dist/orbita/catalog.mjs',import.meta.url),'// Curated/recomposed from the entire legacy1000 catalog; reproducible authoring: tests/orbita80-build.mjs.\nexport const CATALOG='+JSON.stringify(levels)+';\n');
console.log(JSON.stringify({levels:levels.length,normal:levels.filter(l=>!l.specialRules.length).length,tiers:bands.map((b,i)=>({b,normal:levels.filter(l=>l.editorialTierIndex===i&&!l.specialRules.length).length})),origins},null,2));

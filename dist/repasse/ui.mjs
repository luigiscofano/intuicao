import {rulesPreviewMarkup} from '../rules-preview.mjs';
import {CAMPAIGN, CHAPTERS, DIFFICULTIES, CONCEPTS} from './campaign.mjs';
import {DIFFICULTIES as ENDLESS_DIFFICULTIES} from './generator.mjs';
import {RULES_VERSION, initialState, validateLevel, validateState, transition, preview, evaluateState, isWon, stateKey, replay} from './engine.mjs';
import {hintFromSolution} from './analysis.mjs';
import {createRepasseService} from './service.mjs';
import {createRestartConfirmation} from '../restart-confirmation.mjs';
import {createResultMotion} from '../result-motion.mjs';
import {dailyIndex, recordEvent} from '../collection-state.mjs';

export const REPASSE_STORAGE_KEY = 'intuicao.repasse.v1';
const CONFIGURATIONS = ['original','single','corner','four'];
const CONFIGURATION_TEXT = {
  original:['Duas direções','↔ envia para os dois lados; ↕ envia para cima e para baixo. Cada direção recebe o valor inteiro.'],
  single:['Uma seta','Esta peça envia seu valor inteiro somente para a direção desenhada. Ela pode receber de qualquer lado.'],
  corner:['Duas direções em curva','As duas setas apontam para direções cardeais diferentes. Cada uma recebe o valor inteiro; não há repasse na diagonal.'],
  four:['Quatro destinos','Esta peça envia o valor inteiro para cima, direita, baixo e esquerda. Prepare os quatro destinatários antes de retirá-la.']
};
const ARROWS = {up:'↑',right:'→',down:'↓',left:'←'};
const DIRECTION_NAMES = {up:'cima',right:'direita',down:'baixo',left:'esquerda'};
const TUTORIAL = [
  'Toque em uma peça para retirá-la. Ela desaparece e envia seu valor nas direções das setas.',
  'O valor não é dividido: uma peça de valor 3 com duas setas envia 3 em cada direção.',
  'A peça que recebe soma a contribuição ao próprio valor e continua esperando sua decisão.',
  'As setas controlam a saída. Uma peça pode receber de qualquer lado, mesmo sem seta naquele sentido.',
  'O repasse atravessa os espaços vazios até encontrar uma peça ou chegar à borda.',
  'O primeiro número ainda presente recebe o repasse. Quem está atrás dele não recebe agora.',
  'Todas as caixas precisam terminar exatamente na meta, inclusive as metas zero.',
  'A ordem muda os valores e também quem será o próximo receptor. Use desfazer para comparar.',
  'Algumas peças precisam esperar uma contribuição antes de sair. Compare suas setas com as metas.',
  'Outras precisam sair para abrir passagem. Observe o caminho que fica livre depois de uma retirada.'
];
const clone = value => structuredClone(value);
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const bounded = (value,min,max,fallback=min) => Number.isSafeInteger(value)&&value>=min&&value<=max?value:fallback;
const objectRecord = value => value&&typeof value==='object'&&!Array.isArray(value);
const coordinates = piece => 'linha '+(piece.row+1)+', coluna '+(piece.col+1);
const shortNumber = value => String(value).padStart(2,'0');
const pieceConfigurations = level => [...new Set(level.pieces.map(piece=>piece.directions.length===1?'single':piece.directions.length===4?'four':piece.directions.includes('left')&&piece.directions.includes('right')||piece.directions.includes('up')&&piece.directions.includes('down')?'original':'corner'))];
const campaignNumber = level => level.displayNumber ?? CAMPAIGN.findIndex(item=>item.id===level.id)+1;
const campaignIdentity = id => typeof id==='string' && /^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/.test(id);
const definitionKey = level => JSON.stringify([level.version,level.rulesVersion,level.rows,level.cols,level.pieces,level.targets]);

export function freshRepasseData() {
  return {version:1,rulesVersion:RULES_VERSION,prefs:{advanced:false,coordinates:false,autoAdvance:true},campaign:{lastId:null,completed:{},sessions:{},archive:{completed:{},sessions:{},lastId:null}},endless:null,custom:null,learnedConfigurations:['original'],events:[],lastView:{active:false,screen:'selection',mode:'campaign',daily:false}};
}

export function normalizeRepasseData(value) {
  const data=freshRepasseData();
  if(!objectRecord(value))return data;
  if(objectRecord(value.prefs))for(const key of Object.keys(data.prefs))if(typeof value.prefs[key]==='boolean')data.prefs[key]=value.prefs[key];
  if(objectRecord(value.campaign)){
    const currentIds=new Set(CAMPAIGN.map(level=>String(level.id)));
    const prior=value.campaign;
    const last=prior.lastId;
    data.campaign.lastId=currentIds.has(String(last))?CAMPAIGN.find(level=>String(level.id)===String(last)).id:null;
    const archive=objectRecord(prior.archive)?prior.archive:{};
    data.campaign.archive.lastId=archive.lastId??(last??null);
    for(const key of ['completed','sessions']){
      const records=Object.assign({},objectRecord(archive[key])?archive[key]:{},objectRecord(prior[key])?prior[key]:{});
      for(const [id,item] of Object.entries(records)){
        if(!campaignIdentity(id)||!objectRecord(item))continue;
        // Identity is stable across the curation, never inferred from the displayed position.
        if(currentIds.has(id))data.campaign[key][id]=item;
        else data.campaign.archive[key][id]=item;
      }
    }
  }
  if(objectRecord(value.endless)){
    const run=value.endless;
    data.endless={version:1,baseSeed:bounded(run.baseSeed,0,0xffffffff),startDifficulty:bounded(run.startDifficulty,0,7),number:bounded(run.number,0,Number.MAX_SAFE_INTEGER),solved:bounded(run.solved,0,Number.MAX_SAFE_INTEGER),recentSignatures:Array.isArray(run.recentSignatures)?run.recentSignatures.filter(x=>typeof x==='string').slice(-24):[],recentFamilies:Array.isArray(run.recentFamilies)?run.recentFamilies.filter(x=>typeof x==='string').slice(-24):[],current:objectRecord(run.current)?run.current:null};
  }
  if(objectRecord(value.custom))data.custom=value.custom;
  if(Array.isArray(value.learnedConfigurations))data.learnedConfigurations=[...new Set(['original',...value.learnedConfigurations.filter(x=>CONFIGURATIONS.includes(x))])];
  // Recover configuration discoveries from stable historical milestones, not new display positions.
  // Older exports may contain completion/session history but omit learnedConfigurations.
  const historicalRecords=[data.campaign.completed,data.campaign.sessions,data.campaign.archive.completed,data.campaign.archive.sessions];
  for(const [id,configuration] of [[201,'single'],[276,'corner'],[351,'four']]){
    if(historicalRecords.some(records=>Object.hasOwn(records,id)))data.learnedConfigurations.push(configuration);
  }
  for(const candidate of [data.endless?.current?.level,data.custom?.level]){
    if(Array.isArray(candidate?.pieces)&&candidate.pieces.every(piece=>Array.isArray(piece.directions)))data.learnedConfigurations.push(...pieceConfigurations(candidate));
  }
  data.learnedConfigurations=[...new Set(data.learnedConfigurations)];
  data.events=Array.isArray(value.events)?value.events.filter(objectRecord).slice(-500):[];
  if(objectRecord(value.lastView))data.lastView={active:value.lastView.active===true,screen:value.lastView.screen==='play'?'play':'selection',mode:['campaign','endless','custom'].includes(value.lastView.mode)?value.lastView.mode:'campaign',daily:value.lastView.daily===true};
  return data;
}

export function restoreRepasseSession(level,saved) {
  const empty=issue=>({commands:[],cursor:0,states:[initialState(level)],assisted:false,failures:0,winRecorded:false,restored:false,restoreIssue:issue??''});
  if(!saved)return empty();
  const incompatible=()=>empty('A tentativa salva não corresponde a esta fase. O progresso das fases concluídas foi preservado.');
  if(!objectRecord(saved)||saved.rulesVersion!==RULES_VERSION||saved.levelVersion!==level.version||saved.levelId!==level.id||saved.definition!==definitionKey(level)||!Array.isArray(saved.commands)||saved.commands.length>level.pieces.length||!Number.isInteger(saved.cursor)||saved.cursor<0||saved.cursor>saved.commands.length)return incompatible();
  try{
    const ids=new Set(level.pieces.map(piece=>piece.id));
    if(saved.commands.some(id=>typeof id!=='string'||!ids.has(id))||new Set(saved.commands).size!==saved.commands.length)return incompatible();
    const session=empty();let state=session.states[0];
    for(const id of saved.commands){const next=transition(level,state,id);if(!next.changed)return incompatible();state=next.state;session.states.push(state);}
    if(!validateState(level,saved.state).valid||stateKey(session.states[saved.cursor])!==stateKey(saved.state))return incompatible();
    return {...session,commands:saved.commands.slice(),cursor:saved.cursor,assisted:saved.assisted===true,failures:bounded(saved.failures,0,Number.MAX_SAFE_INTEGER),winRecorded:saved.winRecorded===true,restored:true};
  }catch{return incompatible();}
}

export function serializeRepasseSession(level,session) {
  return {rulesVersion:RULES_VERSION,levelId:level.id,levelVersion:level.version,definition:definitionKey(level),commands:session.commands.slice(),cursor:session.cursor,state:clone(session.states[session.cursor]),assisted:session.assisted,failures:session.failures,winRecorded:session.winRecorded};
}

export function commitRepasseCommand(level,session,pieceId) {
  const next=transition(level,session.states[session.cursor],pieceId);
  if(!next.changed)return {session,transition:next};
  return {session:{...session,commands:[...session.commands.slice(0,session.cursor),pieceId],states:[...session.states.slice(0,session.cursor+1),next.state],cursor:session.cursor+1,restoreIssue:''},transition:next};
}

export function recordRepasseCompletion(data,level,session,mode,now=new Date().toISOString()) {
  if(!isWon(level,session.states[session.cursor]))return false;
  let previouslyRecorded=session.winRecorded;
  if(mode==='campaign'){
    const previous=data.campaign.completed[level.id];
    previouslyRecorded=previouslyRecorded||!!previous;
    data.campaign.completed[level.id]={firstCompletedAt:previous?.firstCompletedAt??now,assisted:previous?previous.assisted===true&&session.assisted:session.assisted};
  }
  if(mode==='endless'&&data.endless?.current?.level?.id===level.id){
    previouslyRecorded=previouslyRecorded||data.endless.current.completed===true;
    data.endless.current.completed=true;
  }
  session.winRecorded=true;
  if(previouslyRecorded)return false;
  if(mode==='endless'&&data.endless)data.endless.solved=Math.min(Number.MAX_SAFE_INTEGER,bounded(data.endless.solved,0,Number.MAX_SAFE_INTEGER)+1);
  return true;
}

export function endlessOptions(startDifficulty,solved,learnedConfigurations=['original'],recentSignatures=[],recentFamilies=[]) {
  const wins=bounded(solved,0,Number.MAX_SAFE_INTEGER),base=bounded(startDifficulty,0,7);
  const rising=Math.min(7,base+Math.floor(wins/8));
  const difficulty=Math.max(0,rising-(wins>0&&wins%5===4?1:0));
  const learned=new Set(learnedConfigurations),threshold={single:2,corner:4,four:6};
  const introduction=['single','corner','four'].find(key=>difficulty>=threshold[key]&&!learned.has(key));
  return {difficulty:introduction?threshold[introduction]:difficulty,allowedConfigurations:introduction?['original',introduction]:['original',...['single','corner','four'].filter(key=>difficulty>=threshold[key]&&learned.has(key))],...(introduction?{introduction}:{}),recentSignatures:recentSignatures.filter(x=>typeof x==='string').slice(-24),recentFamilies:recentFamilies.filter(x=>typeof x==='string').slice(-24)};
}

function boxName(side,index) {
  return side==='top'?'caixa acima da coluna '+(index+1):side==='bottom'?'caixa abaixo da coluna '+(index+1):'caixa à '+(side==='left'?'esquerda':'direita')+' da linha '+(index+1);
}
function recipientName(to,level) {return to.kind==='box'?boxName(to.side,to.index):'peça da '+coordinates(level.pieces[to.index]);}
function transferSummary(transfers,level) {return transfers.map(t=>recipientName(t.to,level)+' recebe +'+t.value).join('; ');}
function levelLesson(level) {return String(level.discovery??'Observe quem precisa receber antes de sair.').replace(/^Nesta fase, o jogador precisa perceber que\s*/i,'');}

export function initRepasse({hideOthers=()=>{}}={}) {
  let host=document.getElementById('repasse');
  if(!host){host=document.createElement('section');host.id='repasse';host.hidden=true;host.setAttribute('aria-label','REPASSE');document.querySelector('main').append(host);}
  const $=id=>host.querySelector('#'+id);
  let data;try{data=normalizeRepasseData(JSON.parse(localStorage.getItem(REPASSE_STORAGE_KEY)||'null'));}catch{data=freshRepasseData();}
  let level=null,session=null,mode='campaign',index=0,screen='selection',daily=false;
  let rulesOpen=true,advanced=data.prefs.advanced,activePiece=null,hoverPiece=null;
  let message='',hintText='',hintTier=0,hintPlan=null,answerPlan=null,hintBusy=false,storageWarning=false,motion=null;
  let revision=0,hintRevision=0,generationRevision=0,importRevision=0,animationRevision=0;
  let generationBusy=false,prefetch=null,prefetchTask=null,autoTimer=null,animationTimer=null;
  const generator=createRepasseService(),advisor=createRepasseService();
  const restart=createRestartConfirmation('restart-repasse');
  const current=()=>session?.states[session.cursor];
  const isOpen=()=>!host.hidden;
  const log=(type,details={})=>recordEvent(data,type,{game:'repasse',mode,level:level?.id,...(mode==='campaign'&&level?{displayNumber:campaignNumber(level),campaignVersion:2}:{}),...details});
  const difficultyName=value=>(mode==='endless'?ENDLESS_DIFFICULTIES:DIFFICULTIES)[bounded(value,0,7)]??'Básico';
  const safeError=error=>error?.name==='AbortError'?'':error instanceof SyntaxError?'JSON inválido. Confira aspas, vírgulas e colchetes.':error?.message??'Não foi possível concluir esta ação.';
  const seedNow=()=>{const values=new Uint32Array(1);if(globalThis.crypto?.getRandomValues)globalThis.crypto.getRandomValues(values);else values[0]=(Date.now()^Math.floor(Math.random()*0xffffffff))>>>0;return values[0];};
  const makeSeed=(base,number)=>(base+Math.imul(number,0x9e3779b9))>>>0;
  const optionsKey=options=>JSON.stringify(options);

  function save() {
    if(level&&session){
      const saved=serializeRepasseSession(level,session);
      if(mode==='campaign'){data.campaign.lastId=level.id;data.campaign.sessions[level.id]=saved;}
      else if(mode==='endless'&&data.endless?.current?.level?.id===level.id)data.endless.current.session=saved;
      else if(mode==='custom')data.custom={level:clone(level),session:saved};
    }
    data.prefs.advanced=advanced;
    try{localStorage.setItem(REPASSE_STORAGE_KEY,JSON.stringify(data));storageWarning=false;}catch{storageWarning=true;}
  }
  function cancelAuto(){if(autoTimer!==null)clearTimeout(autoTimer);autoTimer=null;}
  function cancelHint(){hintRevision++;hintBusy=false;advisor.cancel();host.querySelectorAll('#r-hint,#r-answer').forEach(button=>button.disabled=false);}
  function clearAnimation(){
    animationRevision++;if(animationTimer!==null)clearTimeout(animationTimer);animationTimer=null;
    $('r-transfer-layer')?.replaceChildren();
    host.querySelectorAll('.r-receiving').forEach(element=>element.classList.remove('r-receiving'));
  }
  function invalidate(){revision++;cancelAuto();cancelHint();importRevision++;clearAnimation();restart.dismiss();motion?.clear();hintPlan=null;answerPlan=null;hintTier=0;hintText='';hoverPiece=null;}
  function cancelGeneration(){generationRevision++;generator.cancel();generationBusy=false;prefetch=null;prefetchTask=null;}
  function showHost(){
    hideOthers();host.hidden=false;data.lastView.active=true;
    document.querySelectorAll('[data-game],[data-collection],[data-sintonia]').forEach(button=>button.setAttribute('aria-pressed','false'));
    document.querySelector('[data-repasse]')?.setAttribute('aria-pressed','true');
  }
  function hide(){
    save();cancelGeneration();invalidate();host.hidden=true;host.querySelector('.repasse-lab')?.setAttribute('hidden','');
    data.lastView.active=false;document.querySelector('[data-repasse]')?.setAttribute('aria-pressed','false');save();
  }
  function activate(){showHost();selection();}
  function restoreOnLoad(){
    if(!data.lastView.active)return false;
    const view={...data.lastView};showHost();
    if(view.screen!=='play'){selection();return true;}
    if(view.mode==='endless'&&data.endless?.current?.level){resumeEndless();return true;}
    if(view.mode==='custom'&&data.custom?.level&&certifiedDefinition(data.custom.level)){start(data.custom.level,{mode:'custom',saved:data.custom.session});return true;}
    const last=CAMPAIGN.findIndex(item=>item.id===data.campaign.lastId);
    if(last>=0){startCampaign(last,view.daily);return true;}
    selection();return true;
  }
  function validDefinition(candidate){try{return validateLevel(candidate).valid;}catch{return false;}}
  function certifiedDefinition(candidate){try{return validDefinition(candidate)&&Array.isArray(candidate.solution)&&replay(candidate,candidate.solution).solved;}catch{return false;}}
  function selection(){
    save();cancelGeneration();invalidate();screen='selection';mode='campaign';level=null;session=null;
    data.lastView={active:true,screen,mode:'campaign',daily:false};
    const completed=Object.keys(data.campaign.completed).filter(id=>CAMPAIGN.some(item=>String(item.id)===id)).length;
    host.innerHTML='<div class="level-screen repasse-selection"><p class="eyebrow">COLEÇÃO LÓGICA</p><h2 id="r-selection-title" tabindex="-1">REPASSE ·</h2><p>Quem precisa ficar, e até quando? Retire as peças na ordem certa para completar todas as metas.</p><div class="collection-toolbar selection-actions" role="group" aria-label="Ações do jogo"><button id="r-endless-entry" class="primary">Modo Sem Parar</button><button id="r-daily" class="primary">Desafio de hoje</button></div><p class="collection-small">'+completed+' '+(completed===1?'concluído':'concluídos')+'. Progresso salvo neste navegador.</p><p id="r-selection-status" role="status" aria-live="polite"></p>'+rulesPreviewMarkup('repasse')+'<div id="r-catalog">'+CHAPTERS.map((chapter,chapterIndex)=>'<section class="r-chapter" aria-label="Faixa '+(chapterIndex+1)+'"><h3 class="stage-heading">'+shortNumber(chapterIndex+1)+' · '+esc(typeof chapter==='string'?chapter:chapter.name)+' <small>Níveis '+(chapterIndex*15+1)+'–'+(Math.min(chapterIndex*15+15,CAMPAIGN.length))+'</small></h3><div class="level-group">'+CAMPAIGN.slice(chapterIndex*15,Math.min(chapterIndex*15+15,CAMPAIGN.length)).map((item,offset)=>{
      const number=chapterIndex*15+offset+1,done=data.campaign.completed[item.id],selected=item.id===data.campaign.lastId;
      return '<button class="level-tile '+(done?'done':'')+'" data-r-level="'+(number-1)+'" aria-label="Nível '+number+', '+esc(item.name)+', '+esc(difficultyName(item.difficulty))+', '+(done?'concluído':'disponível')+'" '+(selected?'aria-current="true"':'')+'><span>'+number+'</span><small>'+(done?(done.assisted?'✓ assistido':'✓ concluído'):selected?'atual':'explorar')+'</small></button>';
    }).join('')+'</div></section>').join('')+'</div>'+importPanel()+'</div>';
    host.querySelectorAll('[data-r-level]').forEach(button=>button.onclick=()=>startCampaign(Number(button.dataset.rLevel)));
    $('r-daily').onclick=()=>startCampaign(dailyIndex('repasse',new Date().toLocaleDateString('sv-SE'),CAMPAIGN.length),true);
    $('r-endless-entry').onclick=()=>data.endless?.current?.level?resumeEndless():newEndless(bounded(data.endless?.startDifficulty,0,7));
    bindImport();save();$('r-selection-title').focus({preventScroll:true});
  }
  function startCampaign(next,dailyChallenge=false){
    if(!CAMPAIGN[next])return;
    save();cancelGeneration();index=next;daily=dailyChallenge;start(CAMPAIGN[next],{mode:'campaign',saved:data.campaign.sessions[CAMPAIGN[next].id]});
  }
  function start(next,{mode:nextMode='campaign',saved=null,fresh=false}={}){
    invalidate();level=next;mode=nextMode;screen='play';rulesOpen=true;
    session=restoreRepasseSession(level,fresh?null:saved);
    if(mode==='endless'&&data.endless?.current?.completed===true)session.winRecorded=true;
    activePiece=level.pieces.find((piece,i)=>current().values[i]>0)?.id??null;
    const configurations=pieceConfigurations(level),unknown=configurations.filter(key=>!data.learnedConfigurations.includes(key));
    data.learnedConfigurations=[...new Set([...data.learnedConfigurations,...configurations])];
    data.lastView={active:true,screen,mode,daily:mode==='campaign'&&daily};
    message=session.restoreIssue||'';
    render(unknown);log('level-start',{resumed:session.restored});save();focusBoard(false);
    const outcome=evaluateState(level,current());
    if(outcome.won){recordWin();motion.show('repasse',true,{animate:false});scheduleAuto();}
    else if(outcome.status==='overrun'||outcome.status==='exhausted')motion.show('repasse',false);
    if(mode==='endless')fillPrefetch();
  }
  function resumeEndless(){
    const saved=data.endless?.current;
    if(!saved?.level){newEndless(0);return;}
    if(!certifiedDefinition(saved.level)){selection();$('r-selection-status').textContent='A partida infinita salva usa uma definição incompatível. Seu progresso foi preservado. Você pode começar uma nova sequência.';const button=document.createElement('button');button.textContent='Começar nova sequência';button.onclick=()=>newEndless(bounded(data.endless?.startDifficulty,0,7));$('r-selection-status').after(button);return;}
    save();cancelGeneration();daily=false;start(saved.level,{mode:'endless',saved:saved.session});
  }
  function verifyGenerated(result){
    if(!result?.level||!validDefinition(result.level)||!Array.isArray(result.level.solution)||!replay(result.level,result.level.solution).solved)throw Error('O desafio não passou na verificação. Tente gerar novamente.');
  }
  function generationStatus(text){
    const target=$('r-generation-status')??$('r-selection-status')??$('r-status');if(target)target.textContent=text;
    host.querySelectorAll('#r-endless-new,#r-endless-apply,#r-endless-entry').forEach(button=>button.disabled=generationBusy);
    if(mode==='endless'&&$('r-next'))$('r-next').disabled=generationBusy;
  }
  async function newEndless(startDifficulty){
    save();cancelGeneration();cancelAuto();
    const token=generationRevision,run={version:1,baseSeed:seedNow(),startDifficulty:bounded(startDifficulty,0,7),number:0,solved:0,recentSignatures:[],recentFamilies:[],current:null};
    const options=endlessOptions(run.startDifficulty,0,data.learnedConfigurations,[],[]),seed=makeSeed(run.baseSeed,1);
    generationBusy=true;generationStatus('Preparando um desafio… A partida anterior continua salva.');
    try{
      const result=await generator.generate(seed,options);
      if(token!==generationRevision||host.hidden)return;
      verifyGenerated(result);save();run.number=1;run.recentSignatures=[result.signature];run.recentFamilies=[result.family??result.level.primaryConcept].filter(value=>typeof value==='string');
      run.current={level:result.level,seed,parameters:clone(options),signature:result.signature,generatorVersion:result.generatorVersion??1,rulesVersion:RULES_VERSION,session:null,completed:false};
      data.endless=run;generationBusy=false;daily=false;start(result.level,{mode:'endless',fresh:true});
    }catch(error){if(token!==generationRevision)return;generationBusy=false;generationStatus((safeError(error)||'A geração foi cancelada.')+' A partida anterior foi preservada.');}
  }
  async function fillPrefetch(){
    if(mode!=='endless'||host.hidden||prefetchTask||generationBusy||!data.endless)return;
    const run=data.endless,token=generationRevision,number=run.number+1,expectedWins=run.solved+(isWon(level,current())?0:1);
    const options=endlessOptions(run.startDifficulty,expectedWins,data.learnedConfigurations,run.recentSignatures,run.recentFamilies),seed=makeSeed(run.baseSeed,number);
    prefetchTask=(async()=>{
      try{
        const result=await generator.generate(seed,options);
        if(token!==generationRevision||mode!=='endless'||host.hidden||data.endless!==run)return;
        verifyGenerated(result);prefetch={number,seed,parameters:options,key:optionsKey(options),result};
      }catch{/* Uma falha de antecipação não altera a partida. O próximo pedido usa o serviço novamente. */}
    })().finally(()=>{if(token===generationRevision)prefetchTask=null;});
  }
  async function nextEndless(){
    if(mode!=='endless'||generationBusy||!data.endless)return;
    save();cancelAuto();const run=data.endless,number=run.number+1,options=endlessOptions(run.startDifficulty,run.solved,data.learnedConfigurations,run.recentSignatures,run.recentFamilies);
    const cached=prefetch?.number===number&&prefetch.key===optionsKey(options)?prefetch:null;
    if(cached){cancelGeneration();acceptEndless(cached.result,cached.seed,number,options);return;}
    cancelGeneration();const token=generationRevision,seed=makeSeed(run.baseSeed,number);generationBusy=true;generationStatus('Preparando o próximo desafio… O atual continua salvo.');
    try{
      const result=await generator.generate(seed,options);
      if(token!==generationRevision||mode!=='endless'||host.hidden||data.endless!==run)return;
      verifyGenerated(result);generationBusy=false;acceptEndless(result,seed,number,options);
    }catch(error){if(token!==generationRevision)return;generationBusy=false;generationStatus((safeError(error)||'A geração foi cancelada.')+' Seu desafio foi preservado.');}
  }
  function acceptEndless(result,seed,number,parameters){
    save();const run=data.endless;run.number=number;
    run.recentSignatures=[...run.recentSignatures,result.signature].slice(-24);run.recentFamilies=[...run.recentFamilies,result.family??result.level.primaryConcept].filter(x=>typeof x==='string').slice(-24);
    run.current={level:result.level,seed,parameters:clone(parameters),signature:result.signature,generatorVersion:result.generatorVersion??1,rulesVersion:RULES_VERSION,session:null,completed:false};
    daily=false;start(result.level,{mode:'endless',fresh:true});
  }
  function recordWin(){if(recordRepasseCompletion(data,level,session,mode))log('win',{assisted:session.assisted});save();}
  function scheduleAuto(){
    cancelAuto();if(mode!=='endless'||!data.prefs.autoAdvance||!isWon(level,current())||host.hidden||restart.isOpen)return;
    const token=revision;autoTimer=setTimeout(()=>{autoTimer=null;if(token===revision&&!host.hidden&&!restart.isOpen&&mode==='endless'&&isWon(level,current()))nextEndless();},1800);
  }
  function removePiece(pieceId,{assisted=false,silent=false}={}){
    if(!level||host.hidden||restart.isOpen)return;
    const next=commitRepasseCommand(level,session,pieceId);
    if(!next.transition.changed)return;
    cancelAuto();cancelHint();clearAnimation();hintPlan=null;answerPlan=null;hintTier=0;hintText='';hoverPiece=null;revision++;motion?.clear();
    session=next.session;if(assisted)session.assisted=true;
    const piece=next.transition.removed;
    message='Retirada a peça da '+coordinates(piece)+' de valor '+piece.value+'. '+transferSummary(next.transition.transfers,level)+'.';
    activePiece=nextFocusable(piece)?.id??null;
    log('remove',{piece:pieceId,value:piece.value,removed:session.cursor});
    if(next.transition.result.won)recordWin();else save();
    if(!silent){
      renderBoard();renderStatus();animateTransfer(next.transition);focusBoard(true);
      if(next.transition.result.won){motion.show('repasse',true);scheduleAuto();}
      else if(next.transition.result.status==='overrun'||next.transition.result.status==='exhausted')motion.show('repasse',false);
    }
  }
  function nextFocusable(from){
    const present=level.pieces.filter((piece,i)=>current().values[i]>0);
    return present.sort((a,b)=>Math.abs(a.row-from.row)+Math.abs(a.col-from.col)-Math.abs(b.row-from.row)-Math.abs(b.col-from.col)||a.row-b.row||a.col-b.col)[0];
  }
  function travelHistory(delta){
    if(!session||restart.isOpen)return;
    const next=session.cursor+delta;if(next<0||next>=session.states.length)return;
    const restoredId=delta<0?session.commands[session.cursor-1]:null;invalidate();session.cursor=next;
    activePiece=restoredId??level.pieces.find((piece,i)=>current().values[i]>0)?.id??null;
    message=delta<0?'Retirada desfeita. A peça, todos os valores recebidos e todas as caixas foram restaurados.':'Retirada refeita.';
    log(delta<0?'undo':'redo');save();renderBoard();renderStatus();focusBoard(true);
    const outcome=evaluateState(level,current());
    if(outcome.won)motion.show('repasse',true);
    else if(delta>0&&(outcome.status==='overrun'||outcome.status==='exhausted'))motion.show('repasse',false);
  }
  function restartCurrentImmediately(){
    if(!session||host.hidden||screen!=='play')return;
    const old=session;cancelGeneration();invalidate();session=restoreRepasseSession(level,null);
    session.winRecorded=old.winRecorded;session.failures=old.failures;session.assisted=old.assisted;
    activePiece=level.pieces[0]?.id??null;message='';
    log('restart');save();renderBoard();renderStatus();focusBoard(true);
    if(mode==='endless'){generationStatus('');fillPrefetch();}
  }
  function restartLevel(trigger){
    if(!session)return;cancelAuto();cancelHint();const token=revision;
    restart.open({trigger,match:mode==='endless',isCurrent:()=>revision===token&&!host.hidden&&screen==='play',onConfirm:restartCurrentImmediately,onCancel:scheduleAuto,fallbackFocus:()=>$('r-board')});
  }
  function confirm(){
    if(!session||restart.isOpen)return;
    if(isWon(level,current())){recordWin();message='Todas as peças foram retiradas e todas as metas estão exatas.';motion.show('repasse',true);scheduleAuto();}
    else{session.failures++;message='Confira as caixas e as peças que ainda precisam sair. Você pode experimentar, desfazer ou pedir uma dica.';log('check',{complete:false});save();motion.show('repasse',false);}
    renderStatus();
  }
  function solutionValid(solution,state){try{return Array.isArray(solution)&&replay(level,solution,{state}).solved;}catch{return false;}}
  async function hint(){
    if(!session||restart.isOpen||hintBusy)return;cancelAuto();
    if(isWon(level,current())){hintText='Todas as metas já estão exatas. Você pode repetir a fase ou seguir para outra.';renderStatus();return;}
    const context=stateKey(current());
    if(hintPlan?.context===context){hintTier=Math.min(3,hintTier+1);showHintTier();return;}
    cancelHint();const token=hintRevision,requestLevel=level,requestState=clone(current());hintBusy=true;hintText='Observando as peças e as metas desta posição…';renderStatus();
    try{
      const result=await advisor.analyze(requestLevel,requestState);
      if(token!==hintRevision||host.hidden||requestLevel!==level||stateKey(current())!==context)return;
      hintBusy=false;
      if(result.status==='solved'&&result.solution?.length&&solutionValid(result.solution,current())){hintPlan={context,solution:result.solution};hintTier=1;showHintTier();}
      else if(result.status==='unsolvable'){hintText='Esta posição não tem uma continuação até todas as metas. Desfaça uma retirada para recuperar um receptor ou reinicie o mesmo desafio.';motion.show('repasse',false);renderStatus();}
      else{hintText='A análise não terminou dentro do limite. Isso não prova que a posição seja impossível. Seu tabuleiro continua disponível para explorar.';renderStatus();}
      log('hint',{status:result.status,tier:hintTier});save();
    }catch(error){if(token!==hintRevision)return;hintBusy=false;hintText=safeError(error)||'A dica foi cancelada.';renderStatus();}
  }
  function showHintTier(){
    if(!hintPlan||hintPlan.context!==stateKey(current()))return;
    const result=hintFromSolution(level,current(),hintPlan.solution,hintTier);
    hintText=result.text;session.assisted=true;log('hint-layer',{tier:hintTier});save();renderStatus();
    if(hintTier===3)showPreview(hintPlan.solution[0]);
  }
  async function showAnswer(){
    if(!session||session.failures<3||hintBusy||restart.isOpen)return;
    cancelAuto();cancelHint();const token=hintRevision,context=stateKey(current()),requestLevel=level;hintBusy=true;hintText='Procurando uma sequência a partir da posição atual…';renderStatus();
    try{
      const result=await advisor.analyze(requestLevel,clone(current()));
      if(token!==hintRevision||requestLevel!==level||host.hidden||stateKey(current())!==context)return;
      hintBusy=false;
      if(result.status==='solved'&&solutionValid(result.solution,current())){
        answerPlan={context,solution:result.solution};session.assisted=true;
        hintText='Uma solução a partir daqui: '+result.solution.map(id=>{const p=level.pieces.find(piece=>piece.id===id);return '('+(p.row+1)+', '+(p.col+1)+')';}).join(' → ')+'. Os pares indicam (linha, coluna). A resolução será marcada como assistida.';
      }else if(result.status==='unsolvable'){hintText='Esta posição não pode completar todas as metas. Desfaça ou reinicie este desafio antes de pedir uma nova sequência.';motion.show('repasse',false);}
      else hintText='A busca não terminou dentro do limite. Isso não permite concluir se esta posição tem solução. Você pode continuar explorando.';
      save();renderStatus();
    }catch(error){if(token!==hintRevision)return;hintBusy=false;hintText=safeError(error)||'A análise foi cancelada.';renderStatus();}
  }
  function applyAnswer(){
    if(!answerPlan||answerPlan.context!==stateKey(current())||!solutionValid(answerPlan.solution,current()))return;
    const solution=answerPlan.solution.slice();for(const id of solution)removePiece(id,{assisted:true,silent:true});
    renderBoard();renderStatus();focusBoard(true);if(isWon(level,current())){motion.show('repasse',true);scheduleAuto();}
  }
  function navigate(delta){if(mode==='endless'){if(delta>0)nextEndless();return;}if(mode==='campaign'&&index+delta>=0&&index+delta<CAMPAIGN.length)startCampaign(index+delta);}

  function tutorialMarkup(unknown){
    const configurationIntro=mode==='campaign'&&[31,46,61].includes(campaignNumber(level))?pieceConfigurations(level).filter(key=>key!=='original'):unknown.filter(key=>key!=='original');
    const tutorial=mode==='campaign'&&campaignNumber(level)<=10?levelLesson(level):null;
    if(!tutorial&&!configurationIntro.length)return '';
    return '<details class="r-tutorial" open><summary>'+esc(configurationIntro.length?'Uma nova configuração':'Experimente')+'</summary>'+(tutorial?'<p>'+esc(tutorial)+'</p>':'')+configurationIntro.map(key=>'<p><strong>'+esc(CONFIGURATION_TEXT[key][0])+'.</strong> '+esc(CONFIGURATION_TEXT[key][1])+'</p>').join('')+'</details>';
  }
  function render(unknown=[]){
    const retryVisible=$('r-motion')?.dataset.outcome==='loss';
    motion?.clear();
    host.innerHTML='<div class="lab collection-lab repasse-lab"><button id="r-back" class="quiet">← Seleção de níveis</button><div class="lab-heading"><div><p id="r-kicker" class="eyebrow">'+(mode==='endless'?'Modo Sem Parar · DESAFIO '+data.endless.number+' · '+data.endless.solved+(data.endless.solved===1?' CONCLUÍDO':' CONCLUÍDOS'):mode==='custom'?'EDITOR · FASE PERSONALIZADA':'EXPERIMENTO 08')+'</p><h2 id="r-title" tabindex="-1">REPASSE ·</h2><p class="r-level-name">'+esc(level.name??'A ordem dos repasses')+' <span>'+esc(difficultyName(level.difficulty))+' · '+level.pieces.length+' '+(level.pieces.length===1?'peça':'peças')+'</span></p></div><div class="modes collection-mode-switch" role="group" aria-label="Modo de jogo"><button id="r-mode-campaign" aria-pressed="'+(mode!=='endless')+'">Desafios</button><button id="r-mode-endless" aria-pressed="'+(mode==='endless')+'">Modo Sem Parar</button></div></div>'+(mode==='endless'?endlessControls():'')+'<div class="collection-workspace r-workspace '+(rulesOpen?'rules-open ':'')+(advanced?'':'closed')+'"><div class="collection-surface experiment r-surface"><div class="stage-top">'+(mode==='campaign'?'<div class="level-stepper"><span id="r-stage-label">'+(daily?'DESAFIO DO DIA':'DESAFIO')+' '+shortNumber(index+1)+' / '+CAMPAIGN.length+'</span></div>':'')+'<div class="stage-tools"><button id="r-undo" type="button" aria-label="Desfazer" title="Desfazer (Ctrl+Z)">↶</button><button id="r-redo" type="button" aria-label="Refazer" title="Refazer (Ctrl+Shift+Z)">↷</button><button id="r-reset" class="action-reset">↺ Reiniciar</button><details id="r-rules-panel" class="rules-card" '+(rulesOpen?'open':'')+'><summary aria-controls="r-rules-sidebar" aria-expanded="'+rulesOpen+'"><span>Regras e como jogar</span><span class="rules-show">Mostrar</span><span class="rules-hide">Ocultar</span></summary></details><button id="r-advanced-toggle" aria-controls="r-advanced" aria-expanded="'+advanced+'">'+(advanced?'Ocultar':'Mostrar')+' opções avançadas</button></div></div>'+tutorialMarkup(unknown)+'<div class="board-navigation r-board-navigation" role="group" aria-label="Área do jogo e navegação de níveis">'+(mode==='campaign'?'<button id="r-level-prev" class="level-arrow" aria-label="Nível anterior" title="Nível anterior">←</button>':'')+'<div id="r-board-surface" class="r-board-surface"><div id="r-board-scroll" class="r-board-scroll" tabindex="0" role="region" aria-label="Tabuleiro e caixas das bordas, com rolagem horizontal" aria-describedby="r-scroll-help"><div id="r-board" class="r-board" tabindex="-1" role="group" aria-label="Tabuleiro de REPASSE" aria-describedby="r-keyboard-help r-preview"></div></div><p id="r-scroll-help" class="r-scroll-help">Se precisar, deslize o tabuleiro para ver as caixas dos lados. Com a área de rolagem em foco, use ← e →.</p><div id="r-motion" class="result-motion" aria-hidden="true"></div></div>'+(mode==='campaign'?'<button id="r-level-next" class="level-arrow" aria-label="Próximo nível" title="Próximo nível">→</button>':'')+'</div><p id="r-keyboard-help" class="sr-only">Toque para retirar. Setas movem o foco; Enter ou espaço retira. Ctrl+Z desfaz.</p><p id="r-preview" class="sr-only" role="status" aria-live="polite"></p><div class="r-box-legend" aria-label="Estados das metas"><span>○ incompleta</span><span>✓ exata</span><span>! ultrapassada</span><span>Caixas: acumulado / meta</span></div><p id="r-status" class="r-feedback" role="status" aria-live="polite" aria-atomic="true"></p><div class="level-actions"><button id="r-confirm" class="primary confirm" hidden>Confirmar resposta</button><div class="actions"><button id="r-answer" hidden>Ver gabarito</button><button id="r-hint" class="action-hint">✦ Dicas</button><button id="r-next" '+(mode==='custom'?'hidden':'')+'>'+(mode==='endless'?'Novo desafio':'Próximo nível')+' →</button></div><button id="r-hint-apply" hidden>Aplicar esta retirada</button><button id="r-answer-apply" hidden>Aplicar sequência do gabarito</button><p id="r-hint-text" class="hint" role="status" aria-live="polite"></p><p id="r-assisted" class="collection-small" hidden>Resolução assistida. Desfazer continua disponível para explorar qualquer passo.</p></div></div><aside id="r-rules-sidebar" class="rules-sidebar" aria-label="Regras e como jogar" '+(rulesOpen?'':'hidden')+'>'+rulesMarkup()+'</aside><aside id="r-advanced" class="controls" '+(advanced?'':'hidden')+'>'+advancedMarkup()+'</aside></div></div>';
    motion=createResultMotion($('r-motion'),$('r-board-surface'),globalThis,{getVictoryState:current,onRetry:restartCurrentImmediately});
    $('r-back').onclick=selection;$('r-mode-campaign').onclick=selection;$('r-mode-endless').onclick=()=>{if(mode!=='endless')data.endless?.current?.level?resumeEndless():newEndless(bounded(level.difficulty,0,7));};
    $('r-undo').onclick=()=>travelHistory(-1);$('r-redo').onclick=()=>travelHistory(1);$('r-reset').onclick=event=>restartLevel(event.currentTarget);
    if($('r-level-prev'))$('r-level-prev').onclick=()=>navigate(-1);if($('r-level-next'))$('r-level-next').onclick=()=>navigate(1);
    $('r-confirm').onclick=confirm;$('r-next').onclick=()=>navigate(1);$('r-hint').onclick=hint;$('r-answer').onclick=showAnswer;$('r-answer-apply').onclick=applyAnswer;
    $('r-hint-apply').onclick=()=>{if(hintPlan?.context===stateKey(current())&&solutionValid(hintPlan.solution,current()))removePiece(hintPlan.solution[0],{assisted:true});};
    const rulesPanel=$('r-rules-panel');rulesPanel.ontoggle=()=>{if($('r-rules-panel')!==rulesPanel)return;rulesOpen=rulesPanel.open;syncPanels();};
    $('r-advanced-toggle').onclick=()=>{advanced=!advanced;syncPanels();save();};
    bindAdvanced();if(mode==='endless')bindEndless();renderBoard();renderStatus();syncPanels();
    if(retryVisible&&!isWon(level,current()))motion.show('repasse',false);
  }
  function syncPanels(){
    const workspace=$('r-rules-sidebar').parentElement;workspace.classList.toggle('rules-open',rulesOpen);workspace.classList.toggle('closed',!advanced);
    $('r-rules-sidebar').hidden=!rulesOpen;$('r-advanced').hidden=!advanced;
    $('r-rules-panel').querySelector('summary').setAttribute('aria-expanded',String(rulesOpen));
    $('r-advanced-toggle').setAttribute('aria-expanded',String(advanced));$('r-advanced-toggle').textContent=(advanced?'Ocultar':'Mostrar')+' opções avançadas';
  }
  function endlessControls(){
    return '<details class="rules-card endless-settings endless-panel" open><summary>Modo Sem Parar · personalizar desafios</summary><div class="rules-body"><p>Desafios novos, no seu ritmo. A dificuldade cresce com as conclusões e alterna retomadas. Cada configuração nova recebe uma apresentação curta.</p><div class="collection-toolbar endless-options"><label>Dificuldade inicial<select id="r-endless-difficulty">'+ENDLESS_DIFFICULTIES.map((name,i)=>'<option value="'+i+'" '+(i===data.endless.startDifficulty?'selected':'')+'>'+esc(name)+'</option>').join('')+'</select></label><label><input id="r-auto-advance" type="checkbox" '+(data.prefs.autoAdvance?'checked':'')+'> Avançar automaticamente após concluir</label></div><div class="collection-toolbar"><button id="r-endless-apply">Aplicar opções e gerar</button><button id="r-endless-new">Novo desafio</button></div><p>Novo desafio não conta como vitória. Reiniciar conserva exatamente as mesmas peças e metas.</p><p id="r-generation-status" role="status" aria-live="polite"></p></div></details>';
  }
  function bindEndless(){
    $('r-endless-apply').onclick=()=>newEndless(Number($('r-endless-difficulty').value));$('r-endless-new').onclick=nextEndless;
    $('r-auto-advance').onchange=event=>{data.prefs.autoAdvance=event.target.checked;save();if(data.prefs.autoAdvance)scheduleAuto();else cancelAuto();};
  }
  function rulesMarkup(){
    return '<h3>Quem precisa esperar?</h3><p class="rules-context">Retire todas as peças e faça cada caixa terminar exatamente na meta. A ordem muda os valores e os destinatários.</p><div class="rules-body"><p>Ao retirar uma peça, ela desaparece. <strong>Cada seta envia seu valor atual inteiro.</strong> O repasse atravessa vazios e para no primeiro número presente; sem receptor, chega à caixa da borda correspondente.</p><p>Quem recebe soma o valor e continua no mesmo lugar. Receber não dispara outra retirada. As setas controlam apenas a saída: todas as peças podem receber de qualquer lado.</p><p>As caixas mostram <strong>acumulado / meta</strong>. Metas zero também devem ser respeitadas. Ultrapassar uma meta não pode ser corrigido por outra retirada; desfaça para explorar outra ordem.</p><p>A vitória exige tabuleiro vazio e todas as metas exatas. Não há cronômetro, vidas, limite de tentativas ou pontuação por rapidez.</p><div class="collection-notes"><p><strong>Foco desta fase:</strong> '+esc(levelLesson(level))+'</p><p>'+esc(difficultyName(level.difficulty))+'. Você pode escolher qualquer nível.</p></div><h4>Peças desta fase</h4>'+pieceConfigurations(level).map(key=>'<p><strong>'+esc(CONFIGURATION_TEXT[key][0])+'.</strong> '+esc(CONFIGURATION_TEXT[key][1])+'</p>').join('')+'<details class="rules-more"><summary>Estratégias e acessibilidade</summary><div><p>Compare as metas e imagine quem ainda precisa receber. Uma peça pode receber primeiro e sair a tempo de liberar outro caminho. Desfazer restaura uma retirada inteira, com todos os seus repasses.</p><p>Ao apontar ou focar uma peça, veja os destinos e o valor que receberiam. No celular, toque retira diretamente.</p><p>Tab entra e sai do tabuleiro. As setas percorrem as peças; Enter ou espaço retira a peça em foco. Ctrl+Z desfaz e Ctrl+Shift+Z refaz. A preferência de movimento reduzido do dispositivo é respeitada.</p></div></details></div>';
  }

  function arrowsMarkup(piece){return piece.directions.map(direction=>'<span class="r-arrow r-arrow-'+direction+'" aria-hidden="true">'+ARROWS[direction]+'</span>').join('');}
  function boxMarkup(side,index,row,col){
    const value=current().boxes[side][index],target=level.targets[side][index],status=value===target?'exact':value>target?'over':'pending',symbol=status==='exact'?'✓':status==='over'?'!':'○';
    return '<div id="r-box-'+side+'-'+index+'" class="r-edge-box '+status+'" style="grid-row:'+row+';grid-column:'+col+'" role="img" aria-label="'+esc(boxName(side,index))+': '+value+' de '+target+', '+(status==='exact'?'meta exata':status==='over'?'meta ultrapassada':'meta incompleta')+'"><span class="r-box-state" aria-hidden="true">'+symbol+'</span><span class="r-box-total"><span class="r-box-current">'+value+'</span><span class="r-box-target"><span class="r-box-divider">/ </span>'+target+'</span></span><span class="r-gain" aria-hidden="true"></span></div>';
  }
  function renderBoard(){
    const board=$('r-board');if(!board)return;
    const state=current(),byCell=new Map(level.pieces.map((piece,i)=>[piece.row*level.cols+piece.col,i]));
    const digits=Math.max(...state.values.map(value=>String(value).length),...Object.values(state.boxes).flat().map(value=>String(value).length),...Object.values(level.targets).flat().map(value=>String(value).length));
    const cellMin=digits<=2?44:digits*17+28,cellWidth=Math.max(62,cellMin);
    board.style.setProperty('--r-cols',level.cols+2);board.style.setProperty('--r-rows',level.rows+2);
    board.style.setProperty('--r-grid-width',((level.cols+2)*cellWidth+(level.cols+1)*5)+'px');
    board.style.setProperty('--r-min-width',((level.cols+2)*cellMin+(level.cols+1)*5)+'px');
    board.setAttribute('aria-label','Tabuleiro de REPASSE, '+level.rows+' '+(level.rows===1?'linha':'linhas')+' e '+level.cols+' '+(level.cols===1?'coluna':'colunas')+'. '+state.values.filter(value=>value>0).length+' '+(state.values.filter(value=>value>0).length===1?'peça restante.':'peças restantes.'));
    const boxes=[];
    for(let col=0;col<level.cols;col++){boxes.push(boxMarkup('top',col,1,col+2));boxes.push(boxMarkup('bottom',col,level.rows+2,col+2));}
    for(let row=0;row<level.rows;row++){boxes.push(boxMarkup('left',row,row+2,1));boxes.push(boxMarkup('right',row,row+2,level.cols+2));}
    const cells=[];
    for(let row=0;row<level.rows;row++)for(let col=0;col<level.cols;col++){
      const cell=row*level.cols+col,position=byCell.get(cell),piece=level.pieces[position],value=piece?state.values[position]:0;
      const style='grid-row:'+(row+2)+';grid-column:'+(col+2),coordinate=data.prefs.coordinates?'<small class="r-coordinate" aria-hidden="true">'+(row+1)+','+(col+1)+'</small>':'';
      if(value>0)cells.push('<button id="r-piece-'+position+'" class="r-piece" type="button" data-r-piece="'+position+'" data-r-cell="'+cell+'" style="'+style+'" tabindex="'+(piece.id===activePiece?'0':'-1')+'" aria-label="'+esc(coordinates(piece))+', valor '+value+', envia para '+esc(piece.directions.map(direction=>DIRECTION_NAMES[direction]).join(' e '))+'" aria-describedby="r-preview"><strong class="r-piece-value">'+value+'</strong>'+arrowsMarkup(piece)+coordinate+'<span class="r-gain" aria-hidden="true"></span></button>');
      else cells.push('<div class="r-empty" data-r-cell="'+cell+'" style="'+style+'" role="img" aria-label="Vazio, linha '+(row+1)+', coluna '+(col+1)+'">'+coordinate+'</div>');
    }
    board.innerHTML=boxes.join('')+cells.join('')+'<div id="r-transfer-layer" class="r-transfer-layer" aria-hidden="true"></div>';
    board.querySelectorAll('[data-r-piece]').forEach(button=>{
      const piece=level.pieces[Number(button.dataset.rPiece)];
      button.onclick=()=>removePiece(piece.id);
      button.onpointerenter=event=>{if(event.pointerType!=='touch'){hoverPiece=piece.id;showPreview(piece.id);}};
      button.onpointerleave=()=>{hoverPiece=null;const focused=document.activeElement?.dataset?.rPiece;showPreview(focused!==undefined?level.pieces[Number(focused)]?.id:null);};
      button.onfocus=()=>{activePiece=piece.id;board.querySelectorAll('[data-r-piece]').forEach(item=>item.tabIndex=item===button?0:-1);showPreview(piece.id);};
      button.onblur=()=>{if(!hoverPiece)showPreview(null);};
    });
    showPreview(null);
  }
  function showPreview(pieceId){
    const text=$('r-preview');if(!text)return;
    host.querySelectorAll('.r-preview-source,.r-preview-target').forEach(element=>element.classList.remove('r-preview-source','r-preview-target'));
    host.querySelectorAll('.r-gain').forEach(element=>element.textContent='');
    const pieceIndex=level.pieces.findIndex(piece=>piece.id===pieceId);
    if(pieceIndex<0||current().values[pieceIndex]===0){text.textContent='Aponte ou foque uma peça para ver os destinatários atuais.';return;}
    const transfers=preview(level,current(),pieceId);$('r-piece-'+pieceIndex)?.classList.add('r-preview-source');
    for(const transfer of transfers){
      const target=transfer.to.kind==='piece'?$('r-piece-'+transfer.to.index):$('r-box-'+transfer.to.side+'-'+transfer.to.index);
      if(target){target.classList.add('r-preview-target');target.querySelector('.r-gain').textContent='+'+transfer.value;}
    }
    text.textContent='Prévia: '+transferSummary(transfers,level)+'. Quem recebe permanece no tabuleiro.';
  }
  function focusBoard(preventScroll=true){
    if(activePiece){const position=level.pieces.findIndex(piece=>piece.id===activePiece);const button=$('r-piece-'+position);if(button){button.focus({preventScroll});return;}}
    $('r-board')?.focus({preventScroll});
  }
  function animateTransfer(result){
    const layer=$('r-transfer-layer'),board=$('r-board');if(!layer||!board)return;
    const token=animationRevision,rect=board.getBoundingClientRect(),from=board.querySelector('[data-r-cell="'+(result.removed.row*level.cols+result.removed.col)+'"]')?.getBoundingClientRect();
    if(!from)return;
    const start={x:from.left-rect.left+from.width/2,y:from.top-rect.top+from.height/2};
    const reduced=globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches===true;
    for(const transfer of result.transfers){
      const target=transfer.to.kind==='piece'?$('r-piece-'+transfer.to.index):$('r-box-'+transfer.to.side+'-'+transfer.to.index);if(!target)continue;
      const targetRect=target.getBoundingClientRect(),end={x:targetRect.left-rect.left+targetRect.width/2,y:targetRect.top-rect.top+targetRect.height/2};
      target.classList.add('r-receiving');
      const amount=document.createElement('span');amount.className='r-transfer'+(reduced?' r-transfer-static':'');amount.textContent='+'+transfer.value;
      amount.style.left=(reduced?end.x:start.x)+'px';amount.style.top=(reduced?end.y:start.y)+'px';amount.style.setProperty('--r-travel-x',(end.x-start.x)+'px');amount.style.setProperty('--r-travel-y',(end.y-start.y)+'px');layer.append(amount);
    }
    animationTimer=setTimeout(()=>{if(token!==animationRevision)return;layer.replaceChildren();host.querySelectorAll('.r-receiving').forEach(element=>element.classList.remove('r-receiving'));animationTimer=null;},520);
  }
  function renderStatus(){
    if(!$('r-status'))return;
    const result=evaluateState(level,current()),total=2*level.rows+2*level.cols;
    let explanation='';
    if(result.won)explanation='Todas as peças retiradas e todas as metas exatas. Parabéns!';
    else if(result.overruns.length)explanation=result.overruns.map(item=>boxName(item.side,item.index)+' ultrapassou a meta: '+current().boxes[item.side][item.index]+' / '+level.targets[item.side][item.index]+'.').join(' ')+' Desfaça uma retirada ou reinicie para explorar outra ordem.';
    else if(result.remaining===0)explanation='O tabuleiro ficou vazio, mas algumas metas ainda não foram atingidas. Desfaça para tentar outra ordem.';
    $('r-status').textContent=(explanation||message)+(storageWarning?' O navegador não permitiu salvar. Mantenha esta página aberta para preservar esta tentativa.':'');
    $('r-status').classList.toggle('success',result.won);$('r-status').classList.toggle('r-overrun',result.overruns.length>0);
    $('r-undo').disabled=session.cursor===0;$('r-redo').disabled=session.cursor===session.commands.length;
    $('r-hint').disabled=hintBusy;$('r-answer').disabled=hintBusy;$('r-answer').hidden=session.failures<3;
    $('r-hint-text').textContent=hintText;$('r-assisted').hidden=!session.assisted;
    $('r-hint-apply').hidden=!(hintTier===3&&hintPlan?.context===stateKey(current()));$('r-answer-apply').hidden=!(answerPlan?.context===stateKey(current())&&answerPlan.solution.length);
    if($('r-level-prev'))$('r-level-prev').disabled=index===0;if($('r-level-next'))$('r-level-next').disabled=index===CAMPAIGN.length-1;
    $('r-next').disabled=mode==='campaign'?index===CAMPAIGN.length-1:generationBusy;
    if(mode==='endless')$('r-kicker').textContent='Modo Sem Parar · DESAFIO '+data.endless.number+' · '+data.endless.solved+(data.endless.solved===1?' CONCLUÍDO':' CONCLUÍDOS');
  }
  function keyboard(event){
    if(host.hidden||screen!=='play'||!level||restart.isOpen||event.defaultPrevented||document.querySelector('dialog[open]')||!host.contains(event.target))return;
    if(event.target.closest?.('input,textarea,select,[contenteditable="true"],summary,a'))return;
    if((event.ctrlKey||event.metaKey)&&!event.altKey&&event.key.toLowerCase()==='z'){event.preventDefault();if(!event.repeat)travelHistory(event.shiftKey?1:-1);return;}
    const button=event.target.closest?.('[data-r-piece]');if(!button||event.ctrlKey||event.metaKey||event.altKey)return;
    if(event.repeat&&['Enter',' ','Spacebar'].includes(event.key)){event.preventDefault();return;}
    const delta={ArrowUp:[-1,0],ArrowRight:[0,1],ArrowDown:[1,0],ArrowLeft:[0,-1]}[event.key];if(!delta)return;
    event.preventDefault();
    const from=level.pieces[Number(button.dataset.rPiece)],present=level.pieces.filter((piece,i)=>current().values[i]>0&&piece.id!==from.id);
    const next=present.filter(piece=>delta[0]?Math.sign(piece.row-from.row)===delta[0]:Math.sign(piece.col-from.col)===delta[1]).sort((a,b)=>{
      const score=piece=>delta[0]?Math.abs(piece.col-from.col)*100+Math.abs(piece.row-from.row):Math.abs(piece.row-from.row)*100+Math.abs(piece.col-from.col);
      return score(a)-score(b);
    })[0];
    if(next){activePiece=next.id;focusBoard(false);}
  }

  function advancedMarkup(){
    return '<h3>Opções avançadas</h3><label class="r-checkbox"><input id="r-coordinates" type="checkbox" '+(data.prefs.coordinates?'checked':'')+'> Mostrar coordenadas</label><p>Editor local. Verifique as peças, as metas e uma solução antes de jogar uma fase personalizada.</p><label for="r-editor-json">Dados da fase</label><textarea id="r-editor-json" rows="14" maxlength="200000" spellcheck="false"></textarea><button id="r-editor-check">Verificar fase</button><button id="r-editor-play">Jogar fase editada</button><p id="r-editor-status" role="status" aria-live="polite"></p><button id="r-export">Exportar fase JSON</button><button id="r-export-stats">Exportar métricas locais</button><p>Progresso e métricas ficam neste navegador. Não há ranking por número de retiradas: vencer sempre exige retirar todas as peças.</p>'+(mode==='endless'?'<p class="collection-small">Seed: '+data.endless.current.seed+' · Gerador: '+data.endless.current.generatorVersion+'. A definição deste desafio fica salva para retomada.</p>':'');
  }
  function cleanLevel(input){return {...clone(input),game:'repasse'};}
  function download(name,value){
    const url=URL.createObjectURL(new Blob([JSON.stringify(value,null,2)],{type:'application/json'})),link=document.createElement('a');link.href=url;link.download=name.replace(/[^a-zA-Z0-9._-]/g,'-');link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function bindAdvanced(){
    $('r-editor-json').value=JSON.stringify(cleanLevel(level),null,2);
    $('r-editor-json').oninput=()=>{importRevision++;cancelHint();$('r-editor-status').textContent='JSON alterado. Verifique novamente antes de jogar.';};
    $('r-editor-check').onclick=()=>verifyCustom($('r-editor-json'),$('r-editor-status'),false);$('r-editor-play').onclick=()=>verifyCustom($('r-editor-json'),$('r-editor-status'),true);
    $('r-export').onclick=()=>download('repasse-'+level.id+'.json',cleanLevel(level));
    $('r-export-stats').onclick=()=>{save();download('repasse-metricas-locais.json',{version:1,game:'repasse',exportedAt:new Date().toISOString(),campaignVersion:2,completed:data.campaign.completed,archive:data.campaign.archive,endless:{solved:data.endless?.solved??0,number:data.endless?.number??0},events:data.events});};
    $('r-coordinates').onchange=event=>{data.prefs.coordinates=event.target.checked;save();renderBoard();};
  }
  function importPanel(){
    return '<details class="level-json-import json-import-disclosure" aria-labelledby="r-import-title"><summary id="r-import-title">Adicionar seu próprio nível em JSON</summary><p>Escolha um arquivo de REPASSE. A verificação acontece neste navegador e preserva sua partida se o arquivo não for válido.</p><label class="file-button">Importar fase JSON<input id="r-import-file" type="file" accept="application/json,.json" aria-describedby="r-import-help r-import-status"></label><p id="r-import-help" class="collection-small">Máximo de 200 KB. Inclua peças com posição, valor e direções, além das metas de todas as bordas. Uma solução será conferida antes de jogar.</p><details><summary>Formato e exemplo de REPASSE</summary><p>Linhas e colunas do JSON começam em zero. As caixas top e bottom têm uma meta por coluna; left e right, uma por linha. Valores são inteiros positivos e metas são inteiros não negativos. Você pode exportar qualquer fase pelas opções avançadas.</p><pre>'+esc(JSON.stringify(cleanLevel(CAMPAIGN[0]),null,2))+'</pre><button id="r-import-example">Baixar exemplo JSON</button></details><details><summary>Colar JSON</summary><label for="r-import-json">Dados do nível personalizado</label><textarea id="r-import-json" rows="10" maxlength="200000" spellcheck="false"></textarea><button id="r-import-paste">Verificar e jogar JSON</button></details><p id="r-import-status" role="status" aria-live="polite"></p></details>';
  }
  function bindImport(){
    $('r-import-example').onclick=()=>download('repasse-exemplo.json',cleanLevel(CAMPAIGN[0]));$('r-import-paste').onclick=()=>verifyCustom($('r-import-json'),$('r-import-status'),true);
    $('r-import-json').oninput=()=>{importRevision++;cancelHint();$('r-import-status').textContent='JSON alterado. Clique em Verificar e jogar JSON quando terminar.';};
    $('r-import-file').onchange=async event=>{
      const input=event.target,file=input.files?.[0];if(!file)return;const target=$('r-import-status'),token=++importRevision;target.textContent='Lendo o arquivo…';
      try{if(file.size>200000)throw Error('Arquivo muito grande. O limite é 200 KB.');const text=await file.text();if(token!==importRevision||!target.isConnected||host.hidden)return;await verifyCustom({value:text},target,true);}
      catch(error){if(token===importRevision&&target.isConnected)target.textContent=safeError(error);}finally{input.value='';}
    };
  }
  async function verifyCustom(input,target,play){
    cancelHint();cancelAuto();const token=++importRevision,text=input.value,requestRevision=revision;target.textContent='Verificando peças, metas e solução…';
    const currentRequest=()=>token===importRevision&&requestRevision===revision&&!host.hidden&&target.isConnected&&input.value===text;
    try{
      if(new Blob([text]).size>200000)throw Error('Arquivo muito grande. O limite é 200 KB.');
      const candidate=JSON.parse(text);
      if(!objectRecord(candidate))throw Error('O JSON precisa conter a definição de uma fase de REPASSE.');
      if(candidate.game&&candidate.game!=='repasse')throw Error('Este arquivo pertence a outro jogo. Use uma fase de REPASSE.');
      const checked=validateLevel(candidate);if(!checked.valid)throw Error(checked.errors.slice(0,4).join(' '));
      let solution=candidate.solution,certified=false;try{certified=Array.isArray(solution)&&replay(candidate,solution).solved;}catch{}
      if(!certified){
        const result=await advisor.analyze(candidate,initialState(candidate));if(!currentRequest())return;
        if(result.status==='unsolvable')throw Error('Esta definição não tem solução. Confira as metas e as direções das peças.');
        if(result.status!=='solved'||!replay(candidate,result.solution).solved)throw Error('A análise não terminou dentro do limite. Inclua uma sequência de solução válida ou simplifique a fase.');
        solution=result.solution;
      }
      if(!currentRequest())return;
      candidate.solution=solution;candidate.name=String(candidate.name??'Repasses personalizados');candidate.id='custom-'+String(candidate.id??'repasse').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,60);
      candidate.configurations=pieceConfigurations(candidate);
      target.textContent='Fase válida. Uma ordem vencedora com '+solution.length+' '+(solution.length===1?'retirada':'retiradas')+' foi reproduzida. Outras ordens que completem as metas também são aceitas.';
      if(play){save();cancelGeneration();daily=false;start(candidate,{mode:'custom',fresh:true});}
    }catch(error){if(currentRequest())target.textContent=safeError(error);}
  }
  host.addEventListener('keydown',keyboard);globalThis.addEventListener('pagehide',save);
  function destroy(){save();cancelGeneration();invalidate();generator.destroy();advisor.destroy();host.removeEventListener('keydown',keyboard);globalThis.removeEventListener('pagehide',save);}
  return {activate,hide,destroy,isOpen,restoreOnLoad};
}

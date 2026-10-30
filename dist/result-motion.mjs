import {gameVictoryMarkup} from './game-victory.mjs';
const distinctGames=new Set(['elo','prumo','pacto','sintonia','repasse','orbita','desvio']);
const celebratedStates=new WeakSet();
// Feedback visual de resultado. Não calcula física nem decide se a resposta venceu.
// Cada confirmação troca o conteúdo: efeitos CSS reiniciam sem timers acumulados.
const names={light:'Reflexos',cut:'Corte certo',elo:'ELO',prumo:'PRUMO',pacto:'PACTO',desvio:'DESVIO',sintonia:'SINTONIA',repasse:'REPASSE',orbita:'ÓRBITA'};
const captions={light:['Um caminho até o alvo.','Gire os espelhos e tente novamente.'],cut:['As áreas ficaram na medida.','Ajuste o corte e tente novamente.'],sintonia:['Todos encontraram seu lugar.','Observe os caminhos e experimente novamente.'],repasse:['Cada repasse chegou à medida certa.','Observe as metas e experimente outra ordem.'],orbita:['Todos os símbolos encontraram seu lugar.','Prepare os encontros e experimente outra sequência.']};
// Letras seguem um arco suave sem deformar a leitura nem depender de fontes externas.
export function celebrationMarkup(){
 const word=[...'PARABÉNS!'];
 const letters=word.map((letter,i)=>{const x=90+i*40,t=(i-4)/4;return `<text x="${x}" y="${76+14*t*t}" transform="rotate(${t*9} ${x} ${76+14*t*t})">${letter}</text>`;}).join('');
 const stars=[[46,61,8],[111,34,5],[184,28,6],[308,29,5],[387,37,6],[453,66,8],[134,111,5],[365,110,5]];
 const sparkles=stars.map(([x,y,r],i)=>`<path class="victory-sparkle" style="--spark-delay:${i*25}ms" d="M${x-r} ${y} Q${x} ${y} ${x} ${y-r} Q${x} ${y} ${x+r} ${y} Q${x} ${y} ${x} ${y+r} Q${x} ${y} ${x-r} ${y}Z"/>`).join('');
 return `<div class="victory-celebration" aria-hidden="true"><svg viewBox="0 0 500 140" focusable="false"><title>PARABÉNS!</title><g class="victory-word">${letters}</g><g>${sparkles}</g></svg></div>`;
}
export function resultMarkup(game,success,options={}){
 if(!(game in names))throw new Error('Jogo desconhecido');
 const retry=(!success||options.retry===true)?retryMarkup(game):'';
 if(!success)return retry;
 const outcome='win';
 if(distinctGames.has(game)){
  const copy={elo:'As ligações fecharam o circuito.',prumo:'Cada peça encontrou seu equilíbrio.',pacto:'As duplas estão em acordo.',sintonia:'Um comando, todos nos seus destinos.',repasse:'Cada repasse chegou à medida certa.',orbita:'Os giros alinharam todos os alvos.',desvio:'Seu caminho decidiu a partida.'};
  return `<div class="result-badge result-${game} result-win${options.animate===false?' game-victory-static':''}" data-outcome="win">${gameVictoryMarkup(game)}<div><strong>${options.winner?'✓ Jogador '+options.winner+' venceu!':'✓ Vitória!'}</strong><span>${copy[game]}</span></div></div>${retry}`;
 }

 const shapes={
  light:`<circle class="fx-target" cx="64" cy="17" r="10"/><circle class="fx-target" cx="64" cy="17" r="3"/><path class="fx-mirror" d="M28 38 L48 58"/><path class="fx-ray" d="${success?'M10 48 H38 L64 17':'M10 48 H38 L65 48'}"/>${success?'':'<path class="fx-wall" d="M65 35 V59"/>'}`,
  cut:`<path class="fx-piece fx-piece-a" d="M13 14 H40 V58 H13 Z"/><path class="fx-piece fx-piece-b" d="M40 14 H67 V58 H40 Z"/><path class="fx-cut" d="M40 8 V64"/>`
 };
 return `${celebrationMarkup()}<div class="result-badge result-${game} result-${outcome}" data-outcome="${outcome}"><svg viewBox="0 0 80 72" aria-hidden="true" focusable="false">${shapes[game]??'<path class="fx-piece" d="M15 36 L32 52 L66 18"/>'}</svg><div><strong>${options.winner?'✓ Jogador '+options.winner+' venceu!':success?'✓ Vitória!':'↻ Ainda não!'}</strong><span>${captions[game]?.[success?0:1]??'Cada escolha encontrou seu lugar.'}</span></div></div>${retry}`;
}
function retryMarkup(game){
 const label=game==='desvio'?'Reiniciar partida imediatamente':'Reiniciar fase imediatamente';
 return `<div class="result-retry-actions"><button type="button" class="result-retry" data-result-retry aria-label="${label}" title="${label}"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg></button></div>`;
}
export function createResultMotion(host,surface,clock=globalThis,{onRetry,getVictoryState}={}){
 let serial=0,timer=null;
 const stop=()=>{if(timer!==null)clock.clearTimeout(timer);timer=null;surface.classList.remove('result-failure');surface.classList.remove('result-success');};
 return {
  clear(){serial++;stop();host.innerHTML='';host.dataset.state='idle';delete host.dataset.outcome;delete host.dataset.retry;delete host.dataset.victoryGame;host.setAttribute('aria-hidden','true');},
  show(game,success,options={}){
   // Only the seven new scenes are deduplicated. Original experiments keep their exact lifecycle.
   const distinct=success&&distinctGames.has(game);
   if(distinct){
    const state=getVictoryState?.();
    const seen=state&&celebratedStates.has(state);
    if(seen&&host.dataset.outcome==='win'&&host.dataset.victoryGame===game)return;
    options={...options,animate:options.animate!==false&&!seen};
    if(state&&typeof state==='object')celebratedStates.add(state);
    host.dataset.victoryGame=game;
   }
   stop();const token=++serial;host.dataset.state='result';host.dataset.outcome=success?'win':'loss';host.dataset.attempt=String(serial);
   host.innerHTML=resultMarkup(game,success,options);
   const retry=host.querySelector('[data-result-retry]');
   host.setAttribute('aria-hidden',retry?'false':'true');
   if(retry){
    host.dataset.retry='true';
    retry.disabled=typeof onRetry!=='function';
    retry.onclick=()=>{if(token!==serial||retry.disabled)return;retry.disabled=true;onRetry();};
   }else delete host.dataset.retry;
   if(success&&(!distinct||options.animate!==false)){
    void surface.offsetWidth;surface.classList.add('result-success');
    timer=clock.setTimeout(()=>{if(token!==serial)return;surface.classList.remove('result-success');timer=null;},1100);
   }else if(!success){
    // Força um novo ciclo CSS inclusive em confirmações muito próximas.
    void surface.offsetWidth;surface.classList.add('result-failure');
    timer=clock.setTimeout(()=>{if(token!==serial)return;surface.classList.remove('result-failure');timer=null;},300);
   }
  },
  get serial(){return serial;}
 };
}

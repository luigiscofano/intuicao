// Feedback visual de resultado. Não calcula física nem decide se a resposta venceu.
// Cada confirmação troca o conteúdo: efeitos CSS reiniciam sem timers acumulados.
const names={light:'Reflexos',cut:'Corte certo',elo:'ELO',prumo:'PRUMO',pacto:'PACTO',desvio:'DESVIO'};
const captions={light:['Um caminho até o alvo.','Gire os espelhos e tente novamente.'],cut:['As áreas ficaram na medida.','Ajuste o corte e tente novamente.']};
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
 if(!success)return ''; // Derrota não cria texto, ícone ou faixa visual.
 const outcome='win';
 const shapes={
  light:`<circle class="fx-target" cx="64" cy="17" r="10"/><circle class="fx-target" cx="64" cy="17" r="3"/><path class="fx-mirror" d="M28 38 L48 58"/><path class="fx-ray" d="${success?'M10 48 H38 L64 17':'M10 48 H38 L65 48'}"/>${success?'':'<path class="fx-wall" d="M65 35 V59"/>'}`,
  cut:`<path class="fx-piece fx-piece-a" d="M13 14 H40 V58 H13 Z"/><path class="fx-piece fx-piece-b" d="M40 14 H67 V58 H40 Z"/><path class="fx-cut" d="M40 8 V64"/>`
 };
 return `${celebrationMarkup()}<div class="result-badge result-${game} result-${outcome}" data-outcome="${outcome}"><svg viewBox="0 0 80 72" aria-hidden="true" focusable="false">${shapes[game]??'<path class="fx-piece" d="M15 36 L32 52 L66 18"/>'}</svg><div><strong>${options.winner?'✓ Jogador '+options.winner+' venceu!':success?'✓ Vitória!':'↻ Ainda não!'}</strong><span>${captions[game]?.[success?0:1]??'Cada escolha encontrou seu lugar.'}</span></div></div>`;
}
export function createResultMotion(host,surface,clock=globalThis){
 let serial=0,timer=null;
 const stop=()=>{if(timer!==null)clock.clearTimeout(timer);timer=null;surface.classList.remove('result-failure');surface.classList.remove('result-success');};
 return {
  clear(){serial++;stop();host.innerHTML='';host.dataset.state='idle';delete host.dataset.outcome;},
  show(game,success,options={}){
   stop();const token=++serial;host.dataset.state='result';host.dataset.outcome=success?'win':'loss';host.dataset.attempt=String(serial);
   host.innerHTML=resultMarkup(game,success,options);
   if(success){
    void surface.offsetWidth;surface.classList.add('result-success');
    timer=clock.setTimeout(()=>{if(token!==serial)return;surface.classList.remove('result-success');timer=null;},1100);
   }else{
    // Força um novo ciclo CSS inclusive em confirmações muito próximas.
    void surface.offsetWidth;surface.classList.add('result-failure');
    timer=clock.setTimeout(()=>{if(token!==serial)return;surface.classList.remove('result-failure');timer=null;},300);
   }
  },
  get serial(){return serial;}
 };
}

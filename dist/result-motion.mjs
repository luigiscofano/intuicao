// Feedback visual de resultado. Não calcula física nem decide se a resposta venceu.
// Cada confirmação troca o conteúdo: efeitos CSS reiniciam sem timers acumulados.
const names={balance:'Equilíbrio',light:'Reflexos',cut:'Corte certo'};
const captions={balance:['Os torques se encontraram.','Ajuste os pesos e tente novamente.'],light:['Um caminho até o alvo.','Gire os espelhos e tente novamente.'],cut:['As áreas ficaram na medida.','Ajuste o corte e tente novamente.']};
export function resultMarkup(game,success){
 if(!(game in names))throw new Error('Jogo desconhecido');
 if(!success)return ''; // Derrota não cria texto, ícone ou faixa visual.
 const outcome='win';
 const shapes={
  balance:`<path class="fx-base" d="M40 35 L29 54 H51 Z"/><g class="fx-beam"><path d="M12 32 H68"/><rect x="17" y="19" width="12" height="12" rx="2"/><rect x="51" y="19" width="12" height="12" rx="2"/></g>`,
  light:`<circle class="fx-target" cx="64" cy="17" r="10"/><circle class="fx-target" cx="64" cy="17" r="3"/><path class="fx-mirror" d="M28 38 L48 58"/><path class="fx-ray" d="${success?'M10 48 H38 L64 17':'M10 48 H38 L65 48'}"/>${success?'':'<path class="fx-wall" d="M65 35 V59"/>'}`,
  cut:`<path class="fx-piece fx-piece-a" d="M13 14 H40 V58 H13 Z"/><path class="fx-piece fx-piece-b" d="M40 14 H67 V58 H40 Z"/><path class="fx-cut" d="M40 8 V64"/>`
 };
 return `<div class="result-badge result-${game} result-${outcome}" data-outcome="${outcome}"><svg viewBox="0 0 80 72" aria-hidden="true" focusable="false">${shapes[game]}</svg><div><strong>${success?'✓ Vitória!':'↻ Ainda não!'}</strong><span>${captions[game][success?0:1]}</span></div></div>`;
}
export function createResultMotion(host,surface,clock=globalThis){
 let serial=0,timer=null;
 const stop=()=>{if(timer!==null)clock.clearTimeout(timer);timer=null;surface.classList.remove('result-failure');};
 return {
  clear(){serial++;stop();host.innerHTML='';host.dataset.state='idle';delete host.dataset.outcome;},
  show(game,success){
   stop();const token=++serial;host.dataset.state='result';host.dataset.outcome=success?'win':'loss';host.dataset.attempt=String(serial);
   host.innerHTML=resultMarkup(game,success);
   if(!success){
    // Força um novo ciclo CSS inclusive em confirmações muito próximas.
    void surface.offsetWidth;surface.classList.add('result-failure');
    timer=clock.setTimeout(()=>{if(token!==serial)return;surface.classList.remove('result-failure');timer=null;},300);
   }
  },
  get serial(){return serial;}
 };
}

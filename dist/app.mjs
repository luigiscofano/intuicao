import {bindMiddleConfirm} from './middle-confirm.mjs';
import {createRestartConfirmation} from './restart-confirmation.mjs';
import {initCollection} from './collection-ui.mjs';
import {traceLightWorld,traceLightAttempt,lightAttemptFrame,lightScene} from './light-world.mjs';
import {worldRaysSVG,portalSVG,lightEndpointsSVG,beamName} from './light-world-render.mjs';
import {createResultMotion} from './result-motion.mjs';
import {lightRaysSVG} from './light-render.mjs';
import {curvedCut,shapePolygon,shapes,families,basicCutState} from './curves.mjs';
// Implementação de referência gerada com OpenAI/Codex. Comentários explicam decisões, não autoria do aluno.
import {clamp,segment,cutSuccess,mirrorAngle,wallPolygon} from './math.mjs';
import {lightLevels,cutLevels} from './levels.mjs';
import {createAnswerProgress} from './answer-progress.mjs';
import {getOriginalAnswer} from './original-answers.mjs';
const $=id=>document.getElementById(id), scene=$('scene'), drawing=$('drawing');
const restartConfirmation=createRestartConfirmation('restart-original');
let restartRevision=0;
let middleConfirm=null;
const resultMotion=createResultMotion($('result-motion'),document.querySelector('.experiment'));
const catalogue={light:lightLevels,cut:cutLevels};
const answerProgress=createAnswerProgress();
// Fica perto de Confirmar, inclusive quando as opções avançadas estão recolhidas.
const answerButton=document.createElement('button');
answerButton.id='answer-key';answerButton.type='button';answerButton.className='quiet answer-key';
answerButton.textContent='Ver gabarito';answerButton.hidden=true;
answerButton.title='Aplica a configuração correta padrão e marca o nível como assistido. Depois, confirme a resposta para testar.';
answerButton.setAttribute('aria-label','Ver gabarito: aplicar a configuração correta padrão, sem confirmar automaticamente.');
document.querySelector('.level-actions .actions').appendChild(answerButton);
function answerKey(){return `${game}:${catalogue[game][level].id??level}`;}
function updateAnswerButton(){
 const progress=answerProgress.get(answerKey());
 answerButton.hidden=free||!answerProgress.unlocked(answerKey());
 answerButton.dataset.assisted=String(progress.assisted);
 answerButton.textContent=progress.assisted?'Reaplicar gabarito':'Ver gabarito';
 answerButton.setAttribute('aria-label',`${answerButton.textContent}: aplicar a configuração correta padrão e marcar como assistido, sem confirmar automaticamente.`);
}
function applyAnswerKey(){
 if(free||!answerProgress.unlocked(answerKey()))return;
 const answer=getOriginalAnswer(game,level);
 // Troca atômica pela configuração certificada, sem mover fixos ou criar pilhas ilegais.
 invalidate();drag=null;pendingSlot=null;placementMessage='';state=answer;if(game==='cut'){cutMode='basic';cutDrafts={basic:null,advanced:null};}
 selected=game==='light'?state.objects.findIndex(o=>o.type==='mirror'):0;
 answerProgress.assist(answerKey());
 $('hint-text').textContent='Gabarito aplicado. Este desafio está marcado como assistido. Confira a configuração e clique em Confirmar resposta para testar.';
 render();
}
answerButton.onclick=applyAnswerKey;
// Preferência visual independente do progresso. Falhas de armazenamento não bloqueiam o jogo.
let controlsHidden=false;
try{controlsHidden=globalThis.localStorage?.getItem('intuicao.advanced-hidden')==='true';}catch{}
function applyControlsVisibility(){
 $('advanced-controls').hidden=controlsHidden;
 document.querySelector('.workspace').classList.toggle('controls-hidden',controlsHidden);
 $('toggle-controls').setAttribute('aria-expanded',String(!controlsHidden));
 $('toggle-controls').textContent=controlsHidden?'Mostrar opções avançadas':'Ocultar opções avançadas';
}
function toggleControls(){controlsHidden=!controlsHidden;applyControlsVisibility();try{globalThis.localStorage?.setItem('intuicao.advanced-hidden',String(controlsHidden));}catch{}}
let placementMessage='',pendingSlot=null;
let game='light',free=false,level=0,state={},selected=0,drag=null;
const completed=new Set();const lastLevel={light:null,cut:null};
function showSelection(){restartConfirmation.dismiss();restartRevision++;placementMessage='';pendingSlot=null;invalidate();drag=null;document.querySelector('.lab').hidden=true;$('selection').hidden=false;document.querySelectorAll('[data-game]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.game===game)));$('selection-title').textContent={light:`Reflexos · ${lightLevels.length} níveis`,cut:'Corte certo · 100 níveis'}[game];let html='';for(let k=0;k<catalogue[game].length;k+=10){if(game==='light')html+=`<h3 class="stage-heading">${catalogue.light[k].stage} · ${catalogue.light[k].stageName}</h3>`;if(game==='cut')html+=`<h3 class="stage-heading">${['1 · Uma direção por vez','2 · Parábolas e vazios','3 · Ondas e recortes','4 · Curvas em S','5 · Silhuetas irregulares','6 · Vazios maiores','7 · Bordas abertas','8 · Recortes combinados','9 · Área que resta','10 · Síntese de formas'][k/10]}</h3>`;html+='<div class="level-group">'+catalogue[game].slice(k,k+10).map((l,j)=>{const i=k+j,done=completed.has(game+i),assisted=answerProgress.get(`${game}:${l.id??i}`).assisted,current=lastLevel[game]===i;return `<button class="level-tile ${done?'done':''}" data-level="${i}" aria-current="${current}" aria-label="Nível ${i+1}: ${l.name}${done?', concluído':''}${assisted?', assistido por gabarito':''}${current?', atual':''}"><span>${i+1}</span><small>${done?(assisted?'✓ com gabarito':'✓ concluído'):assisted?'com gabarito':current?'atual':'explorar'}</small></button>`;}).join('')+'</div>';}$('level-grid').innerHTML=html;$('level-grid').querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=Number(b.dataset.level);free=false;start();});$('selection-title').focus();}

let phase='editing',evaluation=null,frame=0,animationToken=0,revealed=[],lightDistance=0,lightFired=[];
function invalidate(){middleConfirm?.cancel();resultMotion.clear();cancelAnimationFrame(frame);animationToken++;phase='editing';evaluation=null;revealed=[];lightDistance=0;lightFired=[];scene.setAttribute('aria-busy','false');}
function finishResult(){
 // Exploração parcial não é uma resposta errada nem libera o próximo nível.
 if(game==='light'&&!evaluation.ray.complete){phase='partial';scene.setAttribute('aria-busy','false');draw();return;}
 const success=game==='light'?evaluation.ray.status==='target':cutSuccess(evaluation.cut.ratio*100,evaluation.snapshot.target);
 // Só uma confirmação errada concluída conta; desenhar, editar ou cancelar o raio não conta.
 if(!free&&!success&&!evaluation.counted){answerProgress.fail(answerKey());evaluation.counted=true;}
 phase='result';scene.setAttribute('aria-busy','false');draw();
 resultMotion.show(game,success);
}
function confirmAnswer(){
 if(phase==='animating')return;
 resultMotion.clear();cancelAnimationFrame(frame);const token=++animationToken;
 const snapshot=structuredClone(state);evaluation={snapshot};
 if(game!=='light'){evaluation.cut=curvedCut(shapePolygon(snapshot.shape),snapshot);finishResult();return;}
 lightFired=lightScene(snapshot).sources.map((_,i)=>i);
 evaluation.ray=traceLightAttempt(snapshot,lightFired);
 animateLight(token);
}
function fireLightSource(index){
 if(game!=='light'||phase==='animating'||!Number.isInteger(index)||index<0||index>=lightScene(state).sources.length)return;
 if(phase==='result')invalidate();
 if(lightFired.includes(index))return; // Idempotente: não duplica disparos nem tentativas.
 const previous=evaluation?.ray??null;
 resultMotion.clear();cancelAnimationFrame(frame);const token=++animationToken;
 const snapshot=structuredClone(state);lightFired.push(index);
 evaluation={snapshot,ray:traceLightAttempt(snapshot,lightFired,{previous})};
 animateLight(token);
}
function animateLight(token){
 const total=evaluation.ray.animationDistance;
 phase='animating';scene.setAttribute('aria-busy','true');lightDistance=0;draw();
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){lightDistance=Infinity;finishResult();return;}
 const began=performance.now();
 function tick(now){if(token!==animationToken||phase!=='animating')return;lightDistance=(now-began)*.5;if(lightDistance>=total){finishResult();return;}draw();frame=requestAnimationFrame(tick);}
 frame=requestAnimationFrame(tick);
}
const titles={light:['01','Encontre um caminho para a luz.'],cut:['02','Um corte. Duas novas perspectivas.']};
const fmt=(n,d=1)=>Number(n).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const points=p=>p.map(v=>`${v.x},${v.y}`).join(' ');
const line=(a,b,attrs='')=>`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" ${attrs}/>`;
let cutMode='basic',cutDrafts={basic:null,advanced:null},cutDragOrigin=null;
const allowed=key=>free||(cutMode==='advanced'&&(['x','y','rotate','offset'].includes(key)||Boolean(cutLevels[level].permissions?.[key])));
const cutDirection=()=>{const a=cutLevels[level].basicDirection*Math.PI/180;return {x:Math.cos(a),y:Math.sin(a)};};
function setCutMode(mode){
 if(game!=='cut'||free||mode===cutMode)return;
 cutDrafts[cutMode]=structuredClone(state);cutMode=mode;
 state=structuredClone(cutDrafts[mode]??state);invalidate();drag=null;editor();draw();$('cut-mode-'+mode)?.focus();
}
function setBasicTravel(value){
 const l=cutLevels[level];state=basicCutState(l,clamp(value,l.basicMin,l.basicMax));
}
// Os símbolos descrevem ações, não apenas cores. O alvo transparente facilita o toque.
function cutHandle(id,x,y,label,detail,kind,angle=0){
 const rotation=kind==='rotate', move=kind==='move';
 const shell=move?'<rect class="cut-grip-face" x="-17" y="-17" width="34" height="34" rx="10"/>':'<circle class="cut-grip-face" r="17"/>';
 const glyph=rotation?'<path d="M-7 3 A8 8 0 1 1 6 6 M-7 3 L-8-3 M-7 3 L-1 2"/>':move?'<path d="M-9 0 H9 M0-9 V9 M-9 0 L-6-3 M-9 0 L-6 3 M9 0 L6-3 M9 0 L6 3 M0-9 L-3-6 M0-9 L3-6 M0 9 L-3 6 M0 9 L3 6"/>':`<path transform="rotate(${angle})" d="M-9 0 H9 M-9 0 L-5-4 M-9 0 L-5 4 M9 0 L5-4 M9 0 L5 4"/>`;
 const tooltipX=Math.max(-x+8,Math.min(-54,800-x-116)),tooltipY=y<62?29:-47;
 return `<g data-item="${id}" class="handle cut-grip cut-grip-${kind}" tabindex="0" role="button" aria-label="${label}. ${detail}" transform="translate(${x} ${y})"><title>${label} · ${detail}</title><circle class="cut-grip-hit" r="24"/>${shell}<g class="cut-grip-icon">${glyph}</g><g class="cut-grip-tip" transform="translate(${tooltipX} ${tooltipY})" aria-hidden="true"><rect width="108" height="23" rx="7"/><text x="54" y="15" text-anchor="middle">${label}</text></g></g>`;
}
function advancedCutHandles(c,p){
 const clampPoint=q=>({x:clamp(q.x,24,776),y:clamp(q.y,24,408)});
 let positions=[clampPoint({x:p.x+c.n.y*80,y:p.y-c.n.x*80}),clampPoint({x:state.centerX,y:state.centerY}),clampPoint({x:state.centerX-c.n.y*80,y:state.centerY+c.n.x*80})];
 const crowded=positions.some((a,i)=>positions.some((b,j)=>j>i&&Math.hypot(a.x-b.x,a.y-b.y)<48));
 if(crowded)positions=[{x:320,y:40},{x:400,y:40},{x:480,y:40}];
 const [slide,move,rotate]=positions;
 return `${crowded?'<text x="400" y="78" text-anchor="middle" font-size="11" fill="#686270">Alças reposicionadas para não se sobrepor</text>':''}${cutHandle('cut',slide.x,slide.y,'Deslizar curva','Arraste na direção das setas ou use as teclas de seta.','offset',state.angle)}${cutHandle('move-curve',move.x,move.y,'Mover curva','Arraste para mover livremente ou use as teclas de seta.','move')}${cutHandle('rotate-curve',rotate.x,rotate.y,'Girar curva','Arraste ao redor do centro ou use as teclas de seta.','rotate')}`;
}
function cutControlGuide(){
 const l=cutLevels[level];
 const tabs=free?'':`<div class="cut-mode-tabs" role="tablist" aria-label="Modo de controle da curva"><button id="cut-mode-basic" role="tab" aria-selected="${cutMode==='basic'}" aria-controls="cut-control-panel">Desafio básico</button><button id="cut-mode-advanced" role="tab" aria-selected="${cutMode==='advanced'}" aria-controls="cut-control-panel">Controles da curva</button></div>`;
 if(!free&&cutMode==='basic')return `${tabs}<div id="cut-control-panel" role="tabpanel" aria-labelledby="cut-mode-basic" class="cut-basic-panel"><strong>Uma direção, um movimento</strong><p>A seta indica o único eixo desta fase: ${l.basicDirection}°. Arraste a alça ou ajuste o deslocamento abaixo. A curva não gira neste modo.</p>${field('basicTravel','Deslocamento na direção indicada',l.basicMin,l.basicMax,.1,state.basicTravel??l.initialTravel)}<small>Trocar de aba guarda seu ajuste; voltar ao básico recupera a tentativa anterior.</small></div>`;
 const entries=[['move','↔','Mover curva','Arraste o quadrado para mover livremente.'],['rotate','↻','Girar curva','Arraste a alça dourada ao redor do centro.'],['offset','↔','Deslizar curva','Arraste o círculo na direção das setas.']];
 return `${tabs}<div id="cut-control-panel" role="tabpanel" ${free?'':'aria-labelledby="cut-mode-advanced"'} class="cut-control-guide"><strong>Controles da curva · exploração avançada</strong>${entries.map(([kind,icon,label,detail])=>`<div class="cut-guide-row"><span class="cut-guide-icon cut-guide-${kind}" aria-hidden="true">${icon}</span><span><b>${label}</b><small>${detail}</small></span></div>`).join('')}<p>Tab seleciona uma alça; as setas ajustam. Os valores precisos ficam no painel de opções avançadas. ${free?'':'Voltar ao básico restaura seu último ajuste nessa aba.'}</p></div>`;
}

const field=(key,label,min,max,step,value,unit='',disabled=false)=>`<div class="field"><header><label for="${key}">${label}</label><output id="${key}-out" for="${key}">${fmt(value,step<.1?2:1)}${unit}</output></header><div class="precision"><input id="${key}" data-bind="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label}" ${disabled?'disabled':''}><input id="${key}-number" data-bind="${key}" type="number" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label} (valor)" ${disabled?'disabled':''}></div></div>`;
function start(){
 restartConfirmation.dismiss();restartRevision++;
 placementMessage='';pendingSlot=null;invalidate();drag=null;$('selection').hidden=true;document.querySelector('.lab').hidden=false;if(!free)lastLevel[game]=level; selected=0; const l=catalogue[game][level];
 if(game==='light'){state={objects:structuredClone(l.objects),target:{...l.target,radius:22},sourceAngle:l.sourceAngle??0,...(!free?{sources:structuredClone(l.sources),targets:structuredClone(l.targets),portals:structuredClone(l.portals??[])}:{})};selected=state.objects.findIndex(o=>o.type==='mirror');}
 if(game==='cut'){cutMode=free?'advanced':'basic';cutDrafts={basic:null,advanced:null};state=basicCutState(l);if(free)state.holes=[];}
 $('hint-text').textContent=!free&&answerProgress.get(answerKey()).assisted?'Este desafio está marcado como assistido por gabarito.':''; render();$('game-title').setAttribute('tabindex','-1');$('game-title').focus();
}
function render(){
 document.querySelectorAll('[data-game]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.game===game)));
 $('challenge').setAttribute('aria-pressed',String(!free));$('free').setAttribute('aria-pressed',String(free));
 $('game-kicker').textContent='EXPERIMENTO '+titles[game][0];$('game-title').textContent=titles[game][1];
 $('scene-title').textContent=titles[game][1];$('scene-desc').textContent=game==='light'?'Gire os espelhos pelas alças. Clique nas fontes, ou use Tab e Enter ou Espaço, para disparar um raio de cada vez. Confirmar todos dispara o conjunto. Editar limpa os rastros.':'Use os controles rotulados abaixo ou ao lado. Arraste os elementos ajustáveis; o teclado também funciona nos controles. Clique na rodinha do mouse sobre o tabuleiro para avaliar a resposta.';
 $('level').innerHTML=catalogue[game].map((l,i)=>`<option value="${i}">${i+1}. ${l.name}</option>`).join('');$('level').value=level;$('level').disabled=free;
 $('level-prev').hidden=free;$('level-next').hidden=free;$('level-prev').disabled=level===0;$('level-next').disabled=level===catalogue[game].length-1;
 $('confirm').title=game==='cut'?'Também pode avaliar clicando na rodinha do mouse sobre o tabuleiro.':'';
 $('stage-label').textContent=free?'SEU ESPAÇO PARA EXPERIMENTAR':`DESAFIO ${String(level+1).padStart(2,'0')} / ${String(catalogue[game].length).padStart(2,'0')}`;
 $('mission').textContent=game==='light'?(free?'Crie um caminho com espelhos, paredes e um alvo. Clique na fonte para disparar ou em Confirmar todos.':'Gire os espelhos. Clique em cada fonte para disparar separadamente, ou em Confirmar todos. Os raios ficam no palco; editar limpa todos. Cada cor deve alcançar seu próprio alvo, sem cruzar outra cor. Os símbolos também identificam cada par. Alvos aceitam 22 unidades de tolerância; espelhos e paredes têm posições fixas.'):(free?'Escolha uma forma, uma meta e experimente seu corte.':`Deixe ${state.target}% da área no lado roxo. Tolerância: ±3 pontos percentuais, incluindo o limite.`);
 if(game==='light'&&!free)$('mission').textContent+=' '+(lightLevels[level].wallPurpose??[]).join(' ');
 if(game==='cut'&&!free)$('mission').textContent+=` No modo básico, mova somente na direção indicada (${cutLevels[level].basicDirection}°). Os controles livres ficam na aba Controles da curva.`;
 if(game==='cut')$('mission').textContent+=` Corte: ${state.family}. ${state.family==='Reta'?'':`Amplitude ${state.amplitude}${state.family==='Seno'?`; frequência ${state.frequency}`:''}.`}`;
 if(game==='cut'&&state.holes.length)$('mission').textContent+=` ${state.holes.length} espaço(s) vazio(s): não pertencem à área. Divida apenas a parte preenchida.`;
 $('hint').hidden=free;$('next').hidden=free;$('next').disabled=level===catalogue[game].length-1;
 const texts={light:'A cada trecho, o raio encontra a superfície mais próxima. Paredes são retângulos sólidos com espessura real e absorvem a luz; espelhos refletem segundo d′ = d − 2(d·n)n. O disco da mesma cor aceita o raio: raio geométrico de 22 unidades do palco. A primeira entrada no disco precisa estar antes da próxima superfície; uma parede vence o empate. Cada raio para em 12 reflexões ou 40 eventos, sem loop infinito. Portais mantêm a direção e pulam para o par; o salto não é um segmento físico. Cores diferentes não podem cruzar nem tocar trajetórias. Portais seletivos bloqueiam cores não permitidas. Os ângulos são medidos em coordenadas de tela, com y para baixo. A normal pontilhada é perpendicular ao espelho no ponto de impacto. As setas indicam a direção de propagação. As bordas são paredes. Evite sobrepor objetos: paredes têm prioridade em empates.',cut:'Retas usam recorte exato. Curvas são gráficos sem autointerseção, aproximados por segmentos de passo máximo 1; cada faixa é recortada geometricamente. Um limite de segunda derivada controla o erro de área, muito menor que a margem de jogo. O contorno roxo é calculado pelas interseções reais da linha com as arestas; sua área usa a fórmula do cadarço. A proporção exibida é área roxa útil ÷ área total útil. Buracos são subtraídos de ambas: espaços vazios nunca contam, mesmo quando atravessados pela curva. O ângulo controla a normal da linha: 0° produz um corte vertical. Deslocamento positivo aumenta a região roxa. Não usamos contagem de pixels. Acerto: erro absoluto de até 3 pontos percentuais, incluindo os dois limites; isso não é 3% relativo à meta.'};
 $('explanation').textContent=texts[game];applyControlsVisibility();updateAnswerButton();editor();draw();
}
function renderLevelNotes(){
 let notes='';
 if(game==='light'){
  if(!free){const l=lightLevels[level];if(l.tutorial)notes+=`<div class="light-note" role="note"><strong>Nova ideia</strong>${l.tutorial}</div>`;if(state.portals?.length)notes+='<div class="light-note"><strong>Como usar os portais</strong>Portais com a mesma letra formam um par. A luz entra em um e sai do outro mantendo a direção. Branco aceita todas as cores; os símbolos coloridos indicam as cores permitidas. Uma cor não permitida é bloqueada. O salto entre portais não cruza outros raios.</div>';if(state.sources?.length>1)notes+='<div class="light-note"><strong>Disparo individual</strong>Clique na fonte de cada cor, ou use Tab e Enter/Espaço. O anel e o ✓ mostram quais já dispararam. Clicar novamente em uma fonte já usada não repete a tentativa; após o resultado, inicia outra. Só disparar todas as fontes conclui a tentativa. Confirmar todos dispara o conjunto de uma vez. Editar qualquer ajuste ou recomeçar limpa todos os raios.<br><strong>Caminhos separados</strong>Cada raio deve chegar ao alvo da mesma cor e símbolo. Cruzar ou encostar na trajetória de outra cor é colisão, mesmo em disparos separados. Raios parados não voltam a avançar.</div>';} 
 }
 if(game==='cut')notes=cutControlGuide();
 $('level-notes').innerHTML=notes;
 $('level-notes').hidden=!notes;
}
function editor(){
 renderLevelNotes();
 let html='';
 if(game==='light'){
  html=`<label for="selected">Elemento selecionado</label><select id="selected">${state.objects.map((o,i)=>o.type==='mirror'||free?`<option value="${i}">${o.type==='mirror'?'Espelho':'Parede'} ${i+1}</option>`:'').join('')}${free?'<option value="target">Alvo</option>':''}</select>`;
  const o=selected==='target'?state.target:state.objects[selected];
  if(free)html+=field('objectX','Posição horizontal',30,770,1,o.x)+field('objectY','Posição vertical',30,430,1,o.y);
  if(selected!=='target'){html+=field('angle','Ângulo do elemento',-90,90,.1,o.angle,'°');if(free)html+=field('length','Comprimento',40,220,.1,o.length);}
  if(free)html+=field('sourceAngle','Direção da fonte',-180,180,1,state.sourceAngle,'°')+`<div class="inline-buttons"><button id="add">+ Espelho</button><button id="wall">+ Parede</button><button id="remove" ${selected==='target'?'disabled':''}>Remover</button></div>`;

 }
 if(game==='cut'){
  if(!free&&cutMode==='basic')html='<p class="cut-panel-note">O desafio básico tem um único controle, abaixo do nível. Abra a aba Controles da curva para mover, girar e deslizar livremente.</p>';
  else{
   if(free)html+=`<label for="shape">Forma</label><select id="shape">${shapes.map(n=>`<option>${n}</option>`).join('')}</select>`+field('target','Meta de área',10,90,1,state.target,'%')+`<label for="family">Tipo de corte</label><select id="family">${families.map(n=>`<option>${n}</option>`).join('')}</select>`;
   html+=field('centerX','Mover · horizontal',-400,1200,.1,state.centerX)+field('centerY','Mover · vertical',-400,860,.1,state.centerY)+field('cutAngle','Girar curva',0,360,.1,state.angle,'°')+field('offset','Deslizar curva',-600,600,.1,state.offset);
   if(allowed('amplitude'))html+=field('amplitude','Amplitude da curva',-120,120,1,state.amplitude);
   if(allowed('frequency')&&['Seno','Cosseno'].includes(state.family))html+=field('frequency','Frequência da onda',.5,2,.5,state.frequency);
  }
 }
 $('editor').innerHTML=html;
 if($('cut-mode-basic'))$('cut-mode-basic').onclick=()=>setCutMode('basic');
 if($('cut-mode-advanced'))$('cut-mode-advanced').onclick=()=>setCutMode('advanced');
 if($('selected')){$('selected').value=selected;$('selected').onchange=e=>{selected=e.target.value==='target'?'target':Number(e.target.value);editor();draw();};}
 if($('shape')){$('shape').value=state.shape;$('shape').onchange=e=>{invalidate();state.shape=e.target.value;draw();};}
 if($('family')){$('family').value=state.family;$('family').onchange=e=>{invalidate();state.family=e.target.value;editor();draw();};}
 document.querySelectorAll('#editor [data-bind], #level-notes [data-bind]').forEach(el=>el.addEventListener('input',()=>{if(el.value!==''&&el.validity.valid)change(el.dataset.bind,Number(el.value));}));
 if($('add'))$('add').onclick=()=>{invalidate();
  if(game==='light'&&state.objects.length<24){state.objects.push({type:'mirror',x:400,y:200,length:156,angle:0});selected=state.objects.length-1;}editor();draw();
 };
 if($('wall'))$('wall').onclick=()=>{invalidate();if(state.objects.length<24){state.objects.push({type:'wall',x:500,y:260,length:120,angle:90});selected=state.objects.length-1;}editor();draw();};
 if($('remove'))$('remove').onclick=()=>{invalidate();const list=state.objects;if(list.length>1&&selected!=='target'){list.splice(selected,1);selected=Math.min(selected,list.length-1);placementMessage='';editor();draw();}};
 if(free&&$('add'))$('add').disabled=state.objects.length>=24;
 if(free&&$('wall'))$('wall').disabled=state.objects.length>=24;
 if(free&&$('remove'))$('remove').disabled=selected==='target'||state.objects.length<=1;
}
function change(key,v){
 // Tanto os sliders quanto os campos numéricos passam pelo mesmo caminho de atualização.
 if(!Number.isFinite(v))return;invalidate();const slider=$(key);v=clamp(v,Number(slider.min),Number(slider.max));slider.value=v;$(key+'-number').value=v;
 if(game==='light'){const o=selected==='target'?state.target:state.objects[selected];if(key==='objectX'&&free)o.x=v;if(key==='objectY'&&free)o.y=v;if(key==='angle')o.angle=v;if(key==='length'&&free)o.length=v;if(key==='sourceAngle'&&free)state.sourceAngle=v;}
 if(game==='cut'){if(key==='basicTravel'&&cutMode==='basic')setBasicTravel(v);if(key==='cutAngle'&&allowed('rotate'))state.angle=v;if(key==='offset'&&allowed('offset'))state.offset=v;if(key==='target')state.target=v;if(key==='centerX'&&allowed('x'))state.centerX=v;if(key==='centerY'&&allowed('y'))state.centerY=v;if(key==='amplitude'&&allowed('amplitude'))state.amplitude=v;if(key==='frequency'&&allowed('frequency'))state.frequency=v;}
 const units={angle:'°',cutAngle:'°',sourceAngle:'°',target:'%'};
 if($(key+'-out'))$(key+'-out').textContent=fmt(v,key==='position'?2:1)+(units[key]??'');
 draw();
}
function status(label,value,message,success){
 updateAnswerButton();
 if(success&&!free&&answerProgress.get(answerKey()).assisted)message+=' Concluído com gabarito.';
 const partial=game==='light'&&phase==='partial';
 $('confirm').disabled=phase==='animating';
 $('confirm').textContent=phase==='animating'?'Raio em percurso…':game==='light'?'Confirmar todos':'Confirmar resposta';
 // O quadro de regras fica disponível durante a edição e o resultado.
 if(phase!=='result'){
  success=false;
  if(partial){label='Disparo parcial';message=`${lightFired.length} de ${lightScene(state).sources.length} fontes disparadas. ${evaluation.ray.outcome==='collision'?'Houve colisão; os raios pararam no impacto. ':''}Clique em outra fonte ou em Confirmar todos. Editar limpa os rastros. Ainda não conta como tentativa completa.`;}
  else{label=phase==='animating'?'Experimento em andamento':'Prepare sua resposta';value='—';message=phase==='animating'?'Aguarde a luz percorrer o caminho. Editar cancela o disparo.':game==='light'?'Ajuste os espelhos. Clique em uma fonte ou em Confirmar todos para disparar.':'Ajuste os controles e confirme para revelar o resultado.';}
 }
 $('metric-label').textContent=label;$('metric').textContent=value;
 $('feedback').textContent=placementMessage||(phase==='result'?(success?'Vitória! ':'Ainda não. ')+message:message);
 $('feedback').classList.toggle('success',success);$('feedback').classList.toggle('sr-only',phase==='result'&&!success&&!placementMessage);
 if(success&&!free)completed.add(game+level);
 $('next').disabled=phase!=='result'||!success;$('next').textContent=level===catalogue[game].length-1?'Voltar ao início ↺':'Próximo desafio →';
}
function draw(){
 const focusedSource=document.activeElement?.closest?.('[data-light-source]')?.dataset.lightSource;
 let svg='<defs><pattern id="dots" width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#d8ded0"/></pattern></defs><rect width="800" height="460" fill="url(#dots)"/>';
 if(game==='light'){
  const r=evaluation?.ray??{rays:[],collisions:[],bounces:0,status:'pending'};
  if(phase!=='editing'){const distance=phase==='animating'?lightDistance:Infinity;svg+=worldRaysSVG(lightAttemptFrame(r,distance),distance,true);}
  svg+=portalSVG(state.portals??[],performance.now()/1000);
  svg+=lightEndpointsSVG(state,free,{firedSourceIndices:lightFired,busy:phase==='animating',complete:phase==='result'});
  state.objects.map((o,i)=>({o,i})).sort((a,b)=>(a.o.type==='wall'?0:1)-(b.o.type==='wall'?0:1)).forEach(({o,i})=>{const s=segment(o);
   // A alça fica sobre o vidro, na posição confortável anterior; a superfície usa o comprimento inteiro.
   const grip=o.type==='mirror'?segment({...o,length:Math.min(o.length,104)}).b:s.b;
   if(o.type==='wall'){svg+=`<g ${free?`data-item="${i}" tabindex="0" role="button" class="handle"`:''} aria-label="Parede sólida"><polygon points="${points(wallPolygon(o))}" class="light-wall-body"/><path d="M${s.a.x},${s.a.y} L${s.b.x},${s.b.y}" class="light-wall-inset"/></g>`;return;}
   svg+=`<g data-item="${i}" tabindex="0" role="button" class="handle" aria-label="Espelho ${i+1}, ${o.angle} graus">${line(s.a,s.b,'stroke="transparent" stroke-width="30"')}${line(s.a,s.b,'class="mirror-frame"')}${line(s.a,s.b,'class="mirror-glass"')}${line(s.a,s.b,'stroke="#ffffff" stroke-width="1" stroke-dasharray="18 9"')}<circle cx="${o.x}" cy="${o.y}" r="${selected===i?6:3}" fill="${selected===i?'#c76b42':'#fffefa'}"/><text x="${o.x+10}" y="${o.y-10}" font-size="11">${i+1}</text><circle data-rotate="${i}" cx="${grip.x}" cy="${grip.y}" r="14" fill="#fffefa" stroke="#c76b42" stroke-width="1.5"/><text x="${grip.x}" y="${grip.y+4}" text-anchor="middle" pointer-events="none" font-size="14">↻</text></g>`;
  });
  const message=r.status==='target'?'Todos os alvos alcançados, sem cruzamentos!':r.status==='collision'?`Colisão entre ${r.collisions[0].colors.map(beamName).join(' e ')}. Separe as trajetórias; o ponto está marcado.`:'Algum raio não alcançou seu alvo. Reveja espelhos, paredes e cores dos portais.';
  status('Alvos',`${r.rays.filter(v=>v.status==='target').length} / ${lightScene(state).sources.length}`,message,r.status==='target');
  if(phase==='result'&&r.status==='collision')$('feedback').classList.remove('sr-only');

 }
 if(game==='cut'){
  const poly=shapePolygon(state.shape),c=phase==='result'?evaluation.cut:curvedCut(poly,state),p={x:state.centerX+c.n.x*state.offset,y:state.centerY+c.n.y*state.offset};
  const holes=state.holes.map(r=>`<polygon points="${points(r)}" fill="black"/>`).join('');
  svg+=`<defs><mask id="shape-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="460"><rect width="800" height="460" fill="black"/><polygon points="${points(poly)}" fill="white"/>${holes}</mask><clipPath id="outer-clip"><polygon points="${points(poly)}"/></clipPath></defs><g mask="url(#shape-mask)"><polygon data-shape="cut-region" points="${points(poly)}" fill="#e5e8df"/><polygon points="${points(c.region)}" fill="#a89bc9"/></g><polyline points="${points(c.curve)}" fill="none" stroke="#584976" stroke-width="3" stroke-dasharray="9 6"/>`;
  if(!free&&cutMode==='basic'){
   const d=cutDirection(),h={x:clamp(p.x,48,752),y:clamp(p.y,48,398)};
   svg+=`<g class="cut-direction" aria-hidden="true"><line x1="${h.x-d.x*48}" y1="${h.y-d.y*48}" x2="${h.x+d.x*48}" y2="${h.y+d.y*48}" stroke="#75618d" stroke-width="2" stroke-dasharray="3 5"/><path transform="translate(${h.x} ${h.y}) rotate(${cutLevels[level].basicDirection})" d="M-48 0 l8-5 m-8 5 l8 5 M48 0 l-8-5 m8 5 l-8 5" fill="none" stroke="#75618d" stroke-width="2"/></g>${cutHandle('basic-cut',h.x,h.y,'Mover no eixo',`Única direção liberada: ${cutLevels[level].basicDirection} graus. Arraste ou use as setas.`,'offset',cutLevels[level].basicDirection)}`;
  }else svg+=advancedCutHandles(c,p);
  svg+=`<text x="24" y="430" font-size="13">Lado roxo · meta ${state.target}%${!free&&cutMode==='basic'?' · um único eixo':''}</text>`;
  const err=c.ratio*100-state.target, ok=cutSuccess(c.ratio*100,state.target);status('Área roxa',fmt(c.ratio*100)+'%',ok?'Corte encontrado! Dentro de ±3 pontos percentuais (limite incluído).':`Fora da margem de ±3 pp: ${fmt(Math.abs(err),2)} pontos percentuais ${err>0?'acima':'abaixo'} da meta.`,ok);
 }
 drawing.innerHTML=svg;
 if(focusedSource!==undefined)drawing.querySelector(`[data-light-source="${focusedSource}"]`)?.focus({preventScroll:true});
}
// O SVG mantém a captura do ponteiro enquanto o desenho interno é atualizado.
function localPoint(e){const p=scene.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(scene.getScreenCTM().inverse());}
middleConfirm=bindMiddleConfirm(scene,{enabled:()=>game==='cut'&&!document.querySelector('.lab').hidden&&!restartConfirmation.isOpen&&drag===null,onConfirm:confirmAnswer});
scene.addEventListener('pointerdown',e=>{
 if(game==='cut'&&e.button===1)return;
 const el=e.target.closest('[data-item]');if(!el)return;const id=el.dataset.item, rotate=e.target.closest('[data-rotate]');
 if(game==='light'){if(!free&&id==='target')return;if(!free&&state.objects[Number(id)].type==='wall')return;selected=id==='target'?'target':Number(id);editor();draw();if(!free&&!rotate)return;}
 if(game==='cut')cutDragOrigin={point:localPoint(e),travel:state.basicTravel??0,centerX:state.centerX,centerY:state.centerY,offset:state.offset,angle:state.angle};
 if(game==='cut'&&id==='cut'&&!allowed('offset'))return;drag=rotate?'rotate':id;scene.setPointerCapture(e.pointerId);e.preventDefault();
});
scene.addEventListener('pointermove',e=>{if(drag===null)return;const p=localPoint(e);
 if(game==='light'){const o=selected==='target'?state.target:state.objects[selected];if(drag==='rotate'){if(Math.hypot(p.x-o.x,p.y-o.y)>10)change('angle',Math.round(mirrorAngle(p.x-o.x,p.y-o.y)*10)/10);}else if(free){change('objectX',Math.round(p.x));change('objectY',Math.round(p.y));}}
 if(game==='cut'){if(drag==='basic-cut'&&!free&&cutMode==='basic'){const d=cutDirection();change('basicTravel',cutDragOrigin.travel+(p.x-cutDragOrigin.point.x)*d.x+(p.y-cutDragOrigin.point.y)*d.y);}else if(drag==='move-curve'){if(allowed('x'))change('centerX',cutDragOrigin.centerX+p.x-cutDragOrigin.point.x);if(allowed('y'))change('centerY',cutDragOrigin.centerY+p.y-cutDragOrigin.point.y);}else if(drag==='rotate-curve'&&allowed('rotate')){const originAngle=Math.atan2(cutDragOrigin.point.y-state.centerY,cutDragOrigin.point.x-state.centerX),nowAngle=Math.atan2(p.y-state.centerY,p.x-state.centerX);const a=(cutDragOrigin.angle+(nowAngle-originAngle)*180/Math.PI+720)%360;change('cutAngle',Math.round(a*10)/10);}else if(allowed('offset')){const a=state.angle*Math.PI/180,v=cutDragOrigin.offset+(p.x-cutDragOrigin.point.x)*Math.cos(a)+(p.y-cutDragOrigin.point.y)*Math.sin(a);change('offset',v);}}
});
const endDrag=()=>{drag=null;pendingSlot=null;cutDragOrigin=null;};scene.addEventListener('pointerup',()=>{if(drag===null)return;endDrag();draw();});scene.addEventListener('pointercancel',()=>{endDrag();draw();});scene.addEventListener('lostpointercapture',endDrag);
scene.addEventListener('click',e=>{const source=e.target.closest('[data-light-source]');if(source){e.preventDefault();fireLightSource(Number(source.dataset.lightSource));}});
scene.addEventListener('keydown',e=>{
 const source=e.target.closest('[data-light-source]');
 if(source){if(['Enter',' ','Spacebar'].includes(e.key)){e.preventDefault();if(!e.repeat)fireLightSource(Number(source.dataset.lightSource));}return;}
 const el=e.target.closest('[data-item]');if(!el||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();invalidate();const id=el.dataset.item,step=e.key==='ArrowLeft'||e.key==='ArrowDown'?-1:1;
 if(game==='light'){if(id==='target'||(!free&&state.objects[Number(id)].type==='wall'))return;selected=Number(id);state.objects[selected].angle=clamp(state.objects[selected].angle+step,-90,90);}
 if(game==='cut'){if(id==='basic-cut'&&!free&&cutMode==='basic')setBasicTravel((state.basicTravel??0)+step);else if(id==='rotate-curve'&&allowed('rotate'))state.angle=(state.angle+step+360)%360;else if(id==='move-curve'){if(['ArrowLeft','ArrowRight'].includes(e.key)&&allowed('x'))state.centerX=clamp(state.centerX+step,-400,1200);if(['ArrowUp','ArrowDown'].includes(e.key)&&allowed('y'))state.centerY=clamp(state.centerY+(e.key==='ArrowUp'?-1:1),-400,860);}else if(allowed('offset'))state.offset=clamp(state.offset+step,-600,600);}editor();draw();drawing.querySelector(`[data-item="${id}"]`)?.focus();
});
document.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{if(!catalogue[b.dataset.game])return;collection.hide();game=b.dataset.game;showSelection();});
$('free').onclick=()=>{free=true;start();};$('challenge').onclick=()=>{free=false;showSelection();};$('level').onchange=e=>{level=Number(e.target.value);start();};$('reset').onclick=()=>{middleConfirm?.cancel();const revision=restartRevision;restartConfirmation.open({trigger:$('reset'),isCurrent:()=>revision===restartRevision&&!document.querySelector('.lab').hidden,onConfirm:start});};
$('selection-free').onclick=()=>{free=true;level=lastLevel[game]??0;start();};$('back-selection').onclick=showSelection;
$('toggle-controls').onclick=toggleControls;
applyControlsVisibility();
$('confirm').onclick=confirmAnswer;
function navigateLevel(delta){const next=level+delta;if(free||next<0||next>=catalogue[game].length)return;level=next;start();}
$('level-prev').onclick=()=>navigateLevel(-1);$('level-next').onclick=()=>navigateLevel(1);
$('next').onclick=()=>navigateLevel(1);$('hint').onclick=()=>{$('hint-text').textContent=game==='cut'?'Mova a linha até se aproximar da meta. A porcentagem depende da área, não do comprimento dos lados.':catalogue[game][level].hint;};
showSelection();

const collection=initCollection({hideOriginal(){restartConfirmation.dismiss();restartRevision++;invalidate();document.querySelector('.lab').hidden=true;$('selection').hidden=true;}});

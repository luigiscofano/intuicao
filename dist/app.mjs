import {initCollection} from './collection-ui.mjs';
import {traceLightWorld,lightScene} from './light-world.mjs';
import {worldRaysSVG,portalSVG,lightEndpointsSVG,beamName} from './light-world-render.mjs';
import {createResultMotion} from './result-motion.mjs';
import {lightRaysSVG} from './light-render.mjs';
import {layout,moveBlock,movable,editBlock,legal} from './balance.mjs';
import {curvedCut,shapePolygon,shapes,families} from './curves.mjs';
// Implementação de referência gerada com OpenAI/Codex. Comentários explicam decisões, não autoria do aluno.
import {clamp,torque,segment,traceRay,polygon,cut,cutSuccess,mirrorAngle,pathAtDistance,wallPolygon} from './math.mjs';
import {balanceLevels,lightLevels,cutLevels} from './levels.mjs';
const $=id=>document.getElementById(id), scene=$('scene'), drawing=$('drawing');
const resultMotion=createResultMotion($('result-motion'),document.querySelector('.experiment'));
const catalogue={balance:balanceLevels,light:lightLevels,cut:cutLevels};
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
let game='balance',free=false,level=0,state={},selected=0,drag=null;
const completed=new Set();const lastLevel={balance:null,light:null,cut:null};
function showSelection(){placementMessage='';pendingSlot=null;invalidate();drag=null;document.querySelector('.lab').hidden=true;$('selection').hidden=false;document.querySelectorAll('[data-game]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.game===game)));$('selection-title').textContent={balance:'Equilíbrio · 100 níveis',light:'Reflexos · 100 níveis',cut:'Corte certo · 100 níveis'}[game];let html='';for(let k=0;k<catalogue[game].length;k+=10){if(game==='light')html+=`<h3 class="stage-heading">${catalogue.light[k].stage} · ${catalogue.light[k].stageName}</h3>`;if(game==='cut')html+=`<h3 class="stage-heading">${['1 · Retas e proporções','2 · Parábolas','3 · Ondas senoidais','4 · Curvas em S','5 · Síntese e restrições','6 · Translação por eixos e diagonais','7 · Entradas opostas e rotação','8 · Forma ajustável','9 · Curvas em S no espaço','10 · Síntese de transformações'][k/10]}</h3>`;html+='<div class="level-group">'+catalogue[game].slice(k,k+10).map((l,j)=>{const i=k+j,done=completed.has(game+i),current=lastLevel[game]===i;return `<button class="level-tile ${done?'done':''}" data-level="${i}" aria-current="${current}" aria-label="Nível ${i+1}: ${l.name}${done?', concluído':''}${current?', atual':''}"><span>${i+1}</span><small>${done?'✓ concluído':current?'atual':'explorar'}</small></button>`;}).join('')+'</div>';}$('level-grid').innerHTML=html;$('level-grid').querySelectorAll('[data-level]').forEach(b=>b.onclick=()=>{level=Number(b.dataset.level);free=false;start();});$('selection-title').focus();}

let phase='editing',evaluation=null,frame=0,animationToken=0,revealed=[],lightDistance=0;
function invalidate(){resultMotion.clear();cancelAnimationFrame(frame);animationToken++;phase='editing';evaluation=null;revealed=[];lightDistance=0;scene.setAttribute('aria-busy','false');}
function finishResult(){
 phase='result';scene.setAttribute('aria-busy','false');draw();
 const success=game==='balance'?Math.abs(evaluation.torque)<=1.18:game==='light'?evaluation.ray.status==='target':cutSuccess(evaluation.cut.ratio*100,state.target);
 resultMotion.show(game,success);
}
function confirmAnswer(){
 if(phase==='animating')return;
 resultMotion.clear();cancelAnimationFrame(frame);const token=++animationToken;
 const snapshot=structuredClone(state);evaluation={snapshot};
 if(game!=='light'){if(game==='balance')evaluation.torque=torque(snapshot.weights);else evaluation.cut=curvedCut(shapePolygon(snapshot.shape),snapshot);finishResult();return;}
 evaluation.ray=traceLightWorld(snapshot);
 const total=evaluation.ray.totalDistance;
 phase='animating';scene.setAttribute('aria-busy','true');lightDistance=0;draw();
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){lightDistance=Infinity;finishResult();return;}
 const began=performance.now();
 function tick(now){if(token!==animationToken||phase!=='animating')return;lightDistance=(now-began)*.5;if(lightDistance>=total){finishResult();return;}draw();frame=requestAnimationFrame(tick);}
 frame=requestAnimationFrame(tick);
}
const titles={balance:['01','Tudo tem seu ponto de equilíbrio.'],light:['02','Encontre um caminho para a luz.'],cut:['03','Um corte. Duas novas perspectivas.']};
const fmt=(n,d=1)=>Number(n).toLocaleString('pt-BR',{minimumFractionDigits:d,maximumFractionDigits:d});
const points=p=>p.map(v=>`${v.x},${v.y}`).join(' ');
const line=(a,b,attrs='')=>`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" ${attrs}/>`;
const allowed=key=>free||Boolean(cutLevels[level].permissions?.[key]);
// Os símbolos descrevem ações, não apenas cores. O alvo transparente facilita o toque.
function cutHandle(id,x,y,label,detail,kind,angle=0){
 const rotation=kind==='rotate', move=kind==='move';
 const shell=move?'<rect class="cut-grip-face" x="-17" y="-17" width="34" height="34" rx="10"/>':'<circle class="cut-grip-face" r="17"/>';
 const glyph=rotation?'<path d="M-7 3 A8 8 0 1 1 6 6 M-7 3 L-8-3 M-7 3 L-1 2"/>':move?'<path d="M-9 0 H9 M0-9 V9 M-9 0 L-6-3 M-9 0 L-6 3 M9 0 L6-3 M9 0 L6 3 M0-9 L-3-6 M0-9 L3-6 M0 9 L-3 6 M0 9 L3 6"/>':`<path transform="rotate(${angle})" d="M-9 0 H9 M-9 0 L-5-4 M-9 0 L-5 4 M9 0 L5-4 M9 0 L5 4"/>`;
 const tooltipX=Math.max(-x+8,Math.min(-54,800-x-116)),tooltipY=y<62?29:-47;
 return `<g data-item="${id}" class="handle cut-grip cut-grip-${kind}" tabindex="0" role="button" aria-label="${label}. ${detail}" transform="translate(${x} ${y})"><title>${label} · ${detail}</title><circle class="cut-grip-hit" r="24"/>${shell}<g class="cut-grip-icon">${glyph}</g><g class="cut-grip-tip" transform="translate(${tooltipX} ${tooltipY})" aria-hidden="true"><rect width="108" height="23" rx="7"/><text x="54" y="15" text-anchor="middle">${label}</text></g></g>`;
}
function cutControlGuide(){
 const entries=[];
 if(allowed('x')||allowed('y'))entries.push(['move','↔','Mover curva',allowed('x')&&allowed('y')?'Arraste o quadrado para reposicionar.':`Arraste o quadrado no eixo ${allowed('x')?'horizontal':'vertical'}.`]);
 if(allowed('rotate'))entries.push(['rotate','↻','Girar curva','Arraste a alça dourada ao redor do centro.']);
 if(allowed('offset'))entries.push(['offset','↔','Deslizar corte','Arraste a alça redonda na direção das setas.']);
 return `<div class="cut-control-guide"><strong>Alças do corte</strong>${entries.map(([kind,icon,label,detail])=>`<div class="cut-guide-row"><span class="cut-guide-icon cut-guide-${kind}" aria-hidden="true">${icon}</span><span><b>${label}</b><small>${detail}</small></span></div>`).join('')}<p>Tab seleciona uma alça; as setas ajustam. Só aparecem as ações liberadas neste nível.</p></div>`;
}

const field=(key,label,min,max,step,value,unit='',disabled=false)=>`<div class="field"><header><label for="${key}">${label}</label><output id="${key}-out" for="${key}">${fmt(value,step<.1?2:1)}${unit}</output></header><div class="precision"><input id="${key}" data-bind="${key}" type="range" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label}" ${disabled?'disabled':''}><input id="${key}-number" data-bind="${key}" type="number" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label} (valor)" ${disabled?'disabled':''}></div></div>`;
function start(){
 placementMessage='';pendingSlot=null;invalidate();drag=null;$('selection').hidden=true;document.querySelector('.lab').hidden=false;if(!free)lastLevel[game]=level; selected=0; const l=catalogue[game][level];
 if(game==='balance'){state={weights:structuredClone(l.weights)};selected=state.weights.findIndex(w=>!w.fixed);if(free)state.weights.forEach(w=>w.fixed=false);}
 if(game==='light'){state={objects:structuredClone(l.objects),target:{...l.target,radius:22},sourceAngle:l.sourceAngle??0,...(!free?{sources:structuredClone(l.sources),targets:structuredClone(l.targets),portals:structuredClone(l.portals??[])}:{})};selected=state.objects.findIndex(o=>o.type==='mirror');}
 if(game==='cut')state={shape:l.shape,target:l.target,angle:l.angle??0,offset:l.initialOffset??80,family:l.family,amplitude:l.amplitude,frequency:l.frequency,centerX:l.centerX??400,centerY:l.centerY??230,holes:free?[]:structuredClone(l.holes??[])};
 $('hint-text').textContent=''; render();$('game-title').setAttribute('tabindex','-1');$('game-title').focus();
}
function render(){
 document.querySelectorAll('[data-game]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.game===game)));
 $('challenge').setAttribute('aria-pressed',String(!free));$('free').setAttribute('aria-pressed',String(free));
 $('game-kicker').textContent='EXPERIMENTO '+titles[game][0];$('game-title').textContent=titles[game][1];
 $('scene-title').textContent=titles[game][1];$('scene-desc').textContent='Use os controles rotulados abaixo ou ao lado. Arraste os elementos ajustáveis; o teclado também funciona nos controles.';
 $('level').innerHTML=catalogue[game].map((l,i)=>`<option value="${i}">${i+1}. ${l.name}</option>`).join('');$('level').value=level;$('level').disabled=free;
 $('stage-label').textContent=free?'SEU ESPAÇO PARA EXPERIMENTAR':`DESAFIO ${String(level+1).padStart(2,'0')} / ${String(catalogue[game].length).padStart(2,'0')}`;
 $('mission').textContent=game==='balance'?(free?'Explore blocos retangulares e triangulares. Mesma posição empilha; só o topo pode sair. Triângulos não sustentam blocos.':'Mova os blocos livres para equilibrar. F/FIXO identifica os imóveis. Mesma posição empilha. Só o topo pode sair; triângulos não sustentam blocos. Arraste e solte em uma das nove posições. Altura máxima: 200 unidades.') : game==='light'?(free?'Crie um caminho com espelhos, paredes e um alvo.':'Gire os espelhos e confirme para disparar. Cada cor deve alcançar seu próprio alvo, sem cruzar outra cor. Os símbolos também identificam cada par. Alvos aceitam 22 unidades de tolerância; espelhos e paredes têm posições fixas.'):(free?'Escolha uma forma, uma meta e experimente seu corte.':`Deixe ${state.target}% da área no lado roxo. Tolerância: ±3 pontos percentuais, incluindo o limite.`);
 if(game==='light'&&!free)$('mission').textContent+=' '+(lightLevels[level].wallPurpose??[]).join(' ');
 if(game==='cut'&&!free)$('mission').textContent+=` Entrada: ${cutLevels[level].entry??'orientação indicada'}. Liberados: ${Object.entries({x:'horizontal',y:'vertical',rotate:'rotação',amplitude:'amplitude',frequency:'frequência',offset:'deslocamento normal'}).filter(([key])=>allowed(key)).map(([,label])=>label).join(', ')}. Os outros controles estão bloqueados.`;
 if(game==='cut')$('mission').textContent+=` Corte: ${state.family}. ${state.family==='Reta'?'':`Amplitude ${state.amplitude}${state.family==='Seno'?`; frequência ${state.frequency}`:''}.`}`;
 if(game==='cut'&&state.holes.length)$('mission').textContent+=` ${state.holes.length} espaço(s) vazio(s): não pertencem à área. Divida apenas a parte preenchida.`;
 $('hint').hidden=free;$('next').hidden=free;
 const texts={balance:'O torque é massa × gravidade × distância horizontal ao apoio. À direita ele é positivo (sentido horário); à esquerda, negativo. O painel mostra a soma em N·m. O equilíbrio é aceito até 1,18 N·m de diferença. A inclinação da viga é uma indicação visual do torque calculado na posição horizontal, não uma simulação dinâmica de movimento ou queda. O apoio está no centro; não há atrito.',light:'A cada trecho, o raio encontra a superfície mais próxima. Paredes são retângulos sólidos com espessura real e absorvem a luz; espelhos refletem segundo d′ = d − 2(d·n)n. O disco da mesma cor aceita o raio: raio geométrico de 22 unidades do palco. A primeira entrada no disco precisa estar antes da próxima superfície; uma parede vence o empate. Cada raio para em 12 reflexões ou 40 eventos, sem loop infinito. Portais mantêm a direção e pulam para o par; o salto não é um segmento físico. Cores diferentes não podem cruzar nem tocar trajetórias. Portais seletivos bloqueiam cores não permitidas. Os ângulos são medidos em coordenadas de tela, com y para baixo. A normal pontilhada é perpendicular ao espelho no ponto de impacto. As setas indicam a direção de propagação. As bordas são paredes. Evite sobrepor objetos: paredes têm prioridade em empates.',cut:'Retas usam recorte exato. Curvas são gráficos sem autointerseção, aproximados por segmentos de passo máximo 1; cada faixa é recortada geometricamente. Um limite de segunda derivada controla o erro de área, muito menor que a margem de jogo. O contorno roxo é calculado pelas interseções reais da linha com as arestas; sua área usa a fórmula do cadarço. A proporção exibida é área roxa útil ÷ área total útil. Buracos são subtraídos de ambas: espaços vazios nunca contam, mesmo quando atravessados pela curva. O ângulo controla a normal da linha: 0° produz um corte vertical. Deslocamento positivo aumenta a região roxa. Não usamos contagem de pixels. Acerto: erro absoluto de até 3 pontos percentuais, incluindo os dois limites; isso não é 3% relativo à meta.'};
 $('explanation').textContent=texts[game];applyControlsVisibility();editor();draw();
}
function renderLevelNotes(){
 let notes='';
 if(game==='light'){
  if(!free){const l=lightLevels[level];if(l.tutorial)notes+=`<div class="light-note" role="note"><strong>Nova ideia</strong>${l.tutorial}</div>`;if(state.portals?.length)notes+='<div class="light-note"><strong>Como usar os portais</strong>Portais com a mesma letra formam um par. A luz entra em um e sai do outro mantendo a direção. Branco aceita todas as cores; os símbolos coloridos indicam as cores permitidas. Uma cor não permitida é bloqueada. O salto entre portais não cruza outros raios.</div>';if(state.sources?.length>1)notes+='<div class="light-note"><strong>Caminhos separados</strong>Cada raio deve chegar ao alvo da mesma cor e símbolo. Cruzar ou encostar na trajetória de outra cor é colisão, mesmo que cheguem em momentos diferentes.</div>';} 
 }
 if(game==='cut')notes=cutControlGuide();
 $('level-notes').innerHTML=notes;
 $('level-notes').hidden=!notes;
}
function editor(){
 renderLevelNotes();
 let html='';
 if(game==='balance'){
  const w=state.weights[selected];html=`<label for="selected">Peso selecionado</label><select id="selected">${state.weights.map((w,i)=>`<option value="${i}">${i+1} · ${fmt(w.mass)} kg${w.fixed?' • fixo':''}</option>`).join('')}</select>`;
  html+=field('mass','Massa',1,6,1,w.mass,' kg',!free)+field('position','Posição no braço',-4,4,1,w.x,' m',w.fixed);
  html+='<ul id="block-list" class="block-list" aria-label="Blocos e posições"></ul>';
  if(free)html+=`<label for="block-shape">Formato</label><select id="block-shape"><option value="rectangle">Retângulo</option><option value="triangle">Triângulo</option></select><div class="inline-buttons"><button id="add">+ Peso</button><button id="remove">Remover peso</button></div>`;
 }
 if(game==='light'){
  html=`<label for="selected">Elemento selecionado</label><select id="selected">${state.objects.map((o,i)=>o.type==='mirror'||free?`<option value="${i}">${o.type==='mirror'?'Espelho':'Parede'} ${i+1}</option>`:'').join('')}${free?'<option value="target">Alvo</option>':''}</select>`;
  const o=selected==='target'?state.target:state.objects[selected];
  if(free)html+=field('objectX','Posição horizontal',30,770,1,o.x)+field('objectY','Posição vertical',30,430,1,o.y);
  if(selected!=='target'){html+=field('angle','Ângulo do elemento',-90,90,.1,o.angle,'°');if(free)html+=field('length','Comprimento',40,220,5,o.length);}
  if(free)html+=field('sourceAngle','Direção da fonte',-180,180,1,state.sourceAngle,'°')+`<div class="inline-buttons"><button id="add">+ Espelho</button><button id="wall">+ Parede</button><button id="remove" ${selected==='target'?'disabled':''}>Remover</button></div>`;

 }
 if(game==='cut'){
  html='';
  if(free)html+=`<label for="shape">Forma</label><select id="shape">${shapes.map(n=>`<option>${n}</option>`).join('')}</select>`+field('target','Meta de área',10,90,1,state.target,'%');
  if(free)html+=`<label for="family">Tipo de corte</label><select id="family">${families.map(n=>`<option>${n}</option>`).join('')}</select>`;html+=field('centerX','Posição horizontal da curva',40,760,.1,state.centerX,'',!allowed('x'))+field('centerY','Posição vertical da curva',40,420,.1,state.centerY,'',!allowed('y'))+field('amplitude','Amplitude da curva',-120,120,1,state.amplitude,'',!allowed('amplitude'))+field('frequency','Frequência da onda',.5,2,.5,state.frequency,'',!allowed('frequency')||!['Seno','Cosseno'].includes(state.family));
  html+=field('cutAngle','Ângulo da normal',0,360,.1,state.angle,'°',!allowed('rotate'))+field('offset','Deslocamento do corte',-600,600,1,state.offset,'',!allowed('offset'));
 }
 $('editor').innerHTML=html;
 if($('block-shape')){$('block-shape').value=state.weights[selected].shape??'rectangle';$('block-shape').onchange=e=>{const r=editBlock(state.weights,selected,{shape:e.target.value});applyPlacement(r);editor();draw();};}
 if($('selected')){$('selected').value=selected;$('selected').onchange=e=>{selected=e.target.value==='target'?'target':Number(e.target.value);editor();draw();};}
 if($('shape')){$('shape').value=state.shape;$('shape').onchange=e=>{invalidate();state.shape=e.target.value;draw();};}
 if($('family')){$('family').value=state.family;$('family').onchange=e=>{invalidate();state.family=e.target.value;editor();draw();};}
 $('editor').querySelectorAll('[data-bind]').forEach(el=>el.addEventListener('input',()=>{if(el.value!==''&&el.validity.valid)change(el.dataset.bind,Number(el.value));}));
 if($('add'))$('add').onclick=()=>{invalidate();
  if(game==='balance'&&state.weights.length<8){const next=[...state.weights,{mass:1,x:0,fixed:false,shape:'rectangle',ratio:1.2,order:1+Math.max(...state.weights.map((w,i)=>w.order??i))}];const error=legal(next);if(error)placementMessage=error;else{state.weights=next;selected=next.length-1;placementMessage='';}}
  if(game==='light'&&state.objects.length<24){state.objects.push({type:'mirror',x:400,y:200,length:130,angle:0});selected=state.objects.length-1;}editor();draw();
 };
 if($('wall'))$('wall').onclick=()=>{invalidate();if(state.objects.length<24){state.objects.push({type:'wall',x:500,y:260,length:120,angle:90});selected=state.objects.length-1;}editor();draw();};
 if($('remove'))$('remove').onclick=()=>{invalidate();const list=game==='balance'?state.weights:state.objects;if(list.length>1&&selected!=='target'){if(game==='balance'&&movable(list,selected)){placementMessage=movable(list,selected);}else{list.splice(selected,1);selected=Math.min(selected,list.length-1);placementMessage='';}editor();draw();}};
 if(free&&$('add'))$('add').disabled=(game==='balance'?state.weights.length>=8:state.objects.length>=24);
 if(free&&$('wall'))$('wall').disabled=state.objects.length>=24;
 if(free&&$('remove'))$('remove').disabled=selected==='target'||(game==='balance'?state.weights:state.objects).length<=1;
}
function applyPlacement(r){if(r.ok){state.weights=r.weights;placementMessage='';invalidate();}else placementMessage=r.reason;}
function change(key,v){
 // Tanto os sliders quanto os campos numéricos passam pelo mesmo caminho de atualização.
 if(!Number.isFinite(v))return;invalidate();const slider=$(key);v=clamp(v,Number(slider.min),Number(slider.max));slider.value=v;$(key+'-number').value=v;
 if(game==='balance'){if(key==='mass'&&free)applyPlacement(editBlock(state.weights,selected,{mass:v}));if(key==='position')applyPlacement(moveBlock(state.weights,selected,Math.round(v)));v=key==='mass'?state.weights[selected].mass:state.weights[selected].x;slider.value=v;$(key+'-number').value=v;}
 if(game==='light'){const o=selected==='target'?state.target:state.objects[selected];if(key==='objectX'&&free)o.x=v;if(key==='objectY'&&free)o.y=v;if(key==='angle')o.angle=v;if(key==='length'&&free)o.length=v;if(key==='sourceAngle'&&free)state.sourceAngle=v;}
 if(game==='cut'){if(key==='cutAngle'&&allowed('rotate'))state.angle=v;if(key==='offset'&&allowed('offset'))state.offset=v;if(key==='target')state.target=v;if(key==='centerX'&&allowed('x'))state.centerX=v;if(key==='centerY'&&allowed('y'))state.centerY=v;if(key==='amplitude'&&allowed('amplitude'))state.amplitude=v;if(key==='frequency'&&allowed('frequency'))state.frequency=v;}
 const units={mass:' kg',position:' m',angle:'°',cutAngle:'°',sourceAngle:'°',target:'%'};
 if($(key+'-out'))$(key+'-out').textContent=fmt(v,key==='position'?2:1)+(units[key]??'');
 if(key==='mass')$('selected').options[selected].textContent=`${selected+1} · ${fmt(v)} kg`;
 draw();
}
function status(label,value,message,success){$('confirm').disabled=phase==='animating';$('confirm').textContent=phase==='animating'?'Raio em percurso…':'Confirmar resposta';document.querySelector('.explanation').hidden=phase!=='result';if(phase!=='result'){label=phase==='animating'?'Experimento em andamento':'Prepare sua resposta';value='—';message=phase==='animating'?'Aguarde a luz percorrer o caminho. Editar cancela o disparo.':'Ajuste os controles e confirme para revelar o resultado.';success=false;}$('metric-label').textContent=label;$('metric').textContent=value;$('feedback').textContent=placementMessage||(phase==='result'?(success?'Vitória! ':'Ainda não. ')+message:message);$('feedback').classList.toggle('success',success);$('feedback').classList.toggle('sr-only',phase==='result'&&!success&&!placementMessage);if(success&&!free)completed.add(game+level);$('next').disabled=phase!=='result'||!success;$('next').textContent=level===catalogue[game].length-1?'Voltar ao início ↺':'Próximo desafio →';}
function draw(){
 let svg='<defs><pattern id="dots" width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#d8ded0"/></pattern></defs><rect width="800" height="460" fill="url(#dots)"/>';
 if(game==='balance'){
  const t=evaluation?.torque??0, angle=phase==='result'?clamp(t/12,-5,5):0, rad=angle*Math.PI/180, ok=Math.abs(t)<=1.18;
  svg+='<line x1="70" y1="350" x2="730" y2="350" stroke="#cbd2c2"/><path d="M400 266 L372 350 L428 350 Z" fill="#ced7bf"/><circle cx="400" cy="266" r="9" fill="#486c4d"/>';
  svg+=`<g transform="rotate(${angle} 400 260)"><rect x="75" y="253" width="650" height="14" rx="7" fill="#486c4d"/>${Array.from({length:9},(_,i)=>`<line x1="${80+i*80}" y1="254" x2="${80+i*80}" y2="267" stroke="#e7eedc"/>`).join('')}</g>`;
  const blocks=layout(state.weights);if($('block-list'))$('block-list').innerHTML=state.weights.map((w,i)=>`<li><strong>${i+1} · ${w.mass} kg</strong> · ${w.x} m · ${w.shape==='triangle'?'triângulo':'retângulo'} · ${w.fixed?'FIXO':'móvel'}</li>`).join('');
  state.weights.forEach((w,i)=>{const d=blocks[i],x=d.x,y=d.top,fill=w.fixed?'#a9b99a':'#e6a777';
   const shape=w.shape==='triangle'?`<polygon points="${x-d.width/2},${d.bottom} ${x+d.width/2},${d.bottom} ${x},${y}"`:`<rect x="${x-d.width/2}" y="${y}" width="${d.width}" height="${d.height}"`;
   svg+=`<g transform="rotate(${angle} 400 260)" data-item="${i}" class="handle" tabindex="0" role="button" aria-label="Bloco ${i+1}, ${w.mass} kg, posição ${w.x}, ${w.shape==='triangle'?'triângulo':'retângulo'}${w.fixed?', FIXO':', móvel'}">${shape} fill="${fill}" stroke="${selected===i?'#25372e':'#65775c'}" stroke-width="${selected===i?3:1}"/><text x="${x}" y="${w.shape==='triangle'?d.bottom-4:y+d.height/2+4}" text-anchor="middle" font-size="11" pointer-events="none">${w.mass}</text><text x="${x+d.width/2+3}" y="${d.bottom-4}" font-size="9" pointer-events="none">${i+1}${w.fixed?' F':''}</text></g>`;
  });
  if(pendingSlot!==null)svg+=`<line x1="${400+pendingSlot*80}" x2="${400+pendingSlot*80}" y1="45" y2="280" stroke="#c76b42" stroke-dasharray="5 5"/><text x="400" y="425" text-anchor="middle">Solte para colocar na posição ${pendingSlot}</text>`;
  svg+='<text x="80" y="395" font-size="12">−4 m</text><text x="400" y="395" text-anchor="middle" font-size="12">apoio · 0</text><text x="720" y="395" text-anchor="end" font-size="12">+4 m</text>';
  status('Torque resultante',fmt(t)+' N·m',ok?'Em equilíbrio. Os torques se compensam.':t>0?'O lado direito tem mais torque.':'O lado esquerdo tem mais torque.',ok);
 }
 if(game==='light'){
  const r=evaluation?.ray??{rays:[],collisions:[],bounces:0,status:'pending'};
  if(phase!=='editing')svg+=worldRaysSVG(r,phase==='animating'?lightDistance:Infinity,true);
  svg+=portalSVG(state.portals??[],performance.now()/1000);
  svg+=lightEndpointsSVG(state,free);
  state.objects.map((o,i)=>({o,i})).sort((a,b)=>(a.o.type==='wall'?0:1)-(b.o.type==='wall'?0:1)).forEach(({o,i})=>{const s=segment(o);
   if(o.type==='wall'){svg+=`<g ${free?`data-item="${i}" tabindex="0" role="button" class="handle"`:''} aria-label="Parede sólida"><polygon points="${points(wallPolygon(o))}" class="light-wall-body"/><path d="M${s.a.x},${s.a.y} L${s.b.x},${s.b.y}" class="light-wall-inset"/></g>`;return;}
   svg+=`<g data-item="${i}" tabindex="0" role="button" class="handle" aria-label="Espelho ${i+1}, ${o.angle} graus">${line(s.a,s.b,'stroke="transparent" stroke-width="30"')}${line(s.a,s.b,'class="mirror-frame"')}${line(s.a,s.b,'class="mirror-glass"')}${line(s.a,s.b,'stroke="#ffffff" stroke-width="1" stroke-dasharray="18 9"')}<circle cx="${o.x}" cy="${o.y}" r="${selected===i?6:3}" fill="${selected===i?'#c76b42':'#fffefa'}"/><text x="${o.x+10}" y="${o.y-10}" font-size="11">${i+1}</text><circle data-rotate="${i}" cx="${s.b.x}" cy="${s.b.y}" r="14" fill="#fffefa" stroke="#c76b42" stroke-width="1.5"/><text x="${s.b.x}" y="${s.b.y+4}" text-anchor="middle" pointer-events="none" font-size="14">↻</text></g>`;
  });
  const message=r.status==='target'?'Todos os alvos alcançados, sem cruzamentos!':r.status==='collision'?`Colisão entre ${r.collisions[0].colors.map(beamName).join(' e ')}. Separe as trajetórias; o ponto está marcado.`:'Algum raio não alcançou seu alvo. Reveja espelhos, paredes e cores dos portais.';
  status('Alvos',`${r.rays.filter(v=>v.status==='target').length} / ${lightScene(state).sources.length}`,message,r.status==='target');
  if(phase==='result'&&r.status==='collision')$('feedback').classList.remove('sr-only');

 }
 if(game==='cut'){
  const poly=shapePolygon(state.shape),shapePath=[poly,...state.holes].map(r=>'M'+r.map(v=>`${v.x},${v.y}`).join(' L')+' Z').join(' '),c=phase==='result'?evaluation.cut:curvedCut(poly,state),p={x:state.centerX+c.n.x*state.offset,y:state.centerY+c.n.y*state.offset},v={x:-c.n.y*900,y:c.n.x*900};
  svg+=`<path data-shape="cut-region" d="${shapePath}" fill-rule="evenodd" fill="#e5e8df" stroke="#bcc8b5" stroke-width="2"/><defs><clipPath id="shape-clip"><path d="${shapePath}" clip-rule="evenodd"/></clipPath></defs><polygon points="${points(c.region)}" fill="#a89bc9" clip-path="url(#shape-clip)"/><polyline points="${points(c.curve)}" fill="none" stroke="#584976" stroke-width="3" stroke-dasharray="9 6"/>${allowed('offset')?cutHandle('cut',clamp(p.x,24,776),clamp(p.y,24,436),'Deslizar corte','Arraste na direção das setas ou use as teclas de seta.','offset',state.angle):''}${allowed('x')||allowed('y')?cutHandle('move-curve',state.centerX,state.centerY,'Mover curva',`Arraste para mover no eixo ${allowed('x')&&allowed('y')?'horizontal e vertical':allowed('x')?'horizontal':'vertical'} ou use as teclas de seta.`,'move'):''}${allowed('rotate')?cutHandle('rotate-curve',state.centerX-c.n.y*80,state.centerY+c.n.x*80,'Girar curva','Arraste ao redor do centro ou use as teclas de seta.','rotate'):''}<text x="24" y="430" font-size="13">Lado roxo · meta ${state.target}%</text>`;
  const err=c.ratio*100-state.target, ok=cutSuccess(c.ratio*100,state.target);status('Área roxa',fmt(c.ratio*100)+'%',ok?'Corte encontrado! Dentro de ±3 pontos percentuais (limite incluído).':`Fora da margem de ±3 pp: ${fmt(Math.abs(err),2)} pontos percentuais ${err>0?'acima':'abaixo'} da meta.`,ok);
 }
 drawing.innerHTML=svg;
}
// O SVG mantém a captura do ponteiro enquanto o desenho interno é atualizado.
function localPoint(e){const p=scene.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(scene.getScreenCTM().inverse());}
scene.addEventListener('pointerdown',e=>{
 const el=e.target.closest('[data-item]');if(!el)return;const id=el.dataset.item, rotate=e.target.closest('[data-rotate]');
 if(game==='balance'){selected=Number(id);placementMessage=movable(state.weights,selected);if(!placementMessage)invalidate();editor();draw();if(placementMessage)return;}
 if(game==='light'){if(!free&&id==='target')return;if(!free&&state.objects[Number(id)].type==='wall')return;selected=id==='target'?'target':Number(id);editor();draw();if(!free&&!rotate)return;}
 if(game==='cut'&&id==='cut'&&!allowed('offset'))return;drag=rotate?'rotate':id;scene.setPointerCapture(e.pointerId);e.preventDefault();
});
scene.addEventListener('pointermove',e=>{if(drag===null)return;const p=localPoint(e);
 if(game==='balance'){pendingSlot=Math.round(clamp((p.x-400)/80,-4,4));draw();}
 if(game==='light'){const o=selected==='target'?state.target:state.objects[selected];if(drag==='rotate'){if(Math.hypot(p.x-o.x,p.y-o.y)>10)change('angle',Math.round(mirrorAngle(p.x-o.x,p.y-o.y)*10)/10);}else if(free){change('objectX',Math.round(p.x));change('objectY',Math.round(p.y));}}
 if(game==='cut'){if(drag==='move-curve'){if(allowed('x'))change('centerX',clamp(Math.round(p.x*10)/10,40,760));if(allowed('y'))change('centerY',clamp(Math.round(p.y*10)/10,40,420));}else if(drag==='rotate-curve'&&allowed('rotate')){let a=(Math.atan2(p.y-state.centerY,p.x-state.centerX)*180/Math.PI-90+360)%360;change('cutAngle',Math.round(a*10)/10);}else if(allowed('offset')){const a=state.angle*Math.PI/180,v=clamp(Math.round((p.x-state.centerX)*Math.cos(a)+(p.y-state.centerY)*Math.sin(a)),-600,600);change('offset',v);}}
});
const endDrag=()=>{drag=null;pendingSlot=null;};scene.addEventListener('pointerup',()=>{if(game==='balance'&&drag!==null&&pendingSlot!==null){applyPlacement(moveBlock(state.weights,selected,pendingSlot));editor();}endDrag();draw();});scene.addEventListener('pointercancel',()=>{endDrag();draw();});scene.addEventListener('lostpointercapture',endDrag);
scene.addEventListener('keydown',e=>{const el=e.target.closest('[data-item]');if(!el||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();invalidate();const id=el.dataset.item,step=e.key==='ArrowLeft'||e.key==='ArrowDown'?-1:1;
 if(game==='balance'){selected=Number(id);applyPlacement(moveBlock(state.weights,selected,clamp(state.weights[selected].x+step,-4,4)));}
 if(game==='light'){if(id==='target'||(!free&&state.objects[Number(id)].type==='wall'))return;selected=Number(id);state.objects[selected].angle=clamp(state.objects[selected].angle+step,-90,90);}
 if(game==='cut'){if(id==='rotate-curve'&&allowed('rotate'))state.angle=(state.angle+step+360)%360;else if(id==='move-curve'){if(['ArrowLeft','ArrowRight'].includes(e.key)&&allowed('x'))state.centerX=clamp(state.centerX+step,40,760);if(['ArrowUp','ArrowDown'].includes(e.key)&&allowed('y'))state.centerY=clamp(state.centerY+(e.key==='ArrowUp'?-1:1),40,420);}else if(allowed('offset'))state.offset=clamp(state.offset+step,-600,600);}editor();draw();drawing.querySelector(`[data-item="${id}"]`)?.focus();
});
document.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{collection.hide();game=b.dataset.game;showSelection();});
$('free').onclick=()=>{free=true;start();};$('challenge').onclick=()=>{free=false;showSelection();};$('level').onchange=e=>{level=Number(e.target.value);start();};$('reset').onclick=start;
$('selection-free').onclick=()=>{free=true;level=lastLevel[game]??0;start();};$('back-selection').onclick=showSelection;
$('toggle-controls').onclick=toggleControls;
applyControlsVisibility();
$('confirm').onclick=confirmAnswer;
$('next').onclick=()=>{level=(level+1)%catalogue[game].length;start();};$('hint').onclick=()=>{$('hint-text').textContent=game==='cut'?'Mova a linha até se aproximar da meta. A porcentagem depende da área, não do comprimento dos lados.':catalogue[game][level].hint;};
showSelection();

const collection=initCollection({hideOriginal(){invalidate();document.querySelector('.lab').hidden=true;$('selection').hidden=true;}});

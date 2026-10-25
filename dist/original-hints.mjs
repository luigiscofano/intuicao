// Orientações sobre a configuração atual, nunca uma busca por uma resposta.
// Usa apenas rastros já disparados ou um recorte de área; sem alterar a partida.
import {lightScene} from './light-world.mjs';
import {curvedCut,shapePolygon} from './curves.mjs';
import {cutSuccess} from './math.mjs';

const names={gold:'dourado',blue:'azul',pink:'rosa'};
const color=c=>names[c]??String(c??'sem cor');
const plan=(focusText,explanation,nextStep)=>({focusText,explanation,nextStep});
const where=(p,scene)=>!p?'no tabuleiro':`na parte ${p.y<scene.height/3?'superior':p.y>scene.height*2/3?'inferior':'central'}${p.x<scene.width/3?' esquerda':p.x>scene.width*2/3?' direita':''} do tabuleiro`;
const lastMirror=ray=>ray?.reflections?.at(-1)?.objectIndex;
const mirrorAdvice=(ray,scene)=>{
 const index=lastMirror(ray);
 return Number.isInteger(index)?`Revise o espelho ${index+1}, o último que esse raio atingiu. Gire um pouco e compare a direção de saída com o próximo destino visível; depois dispare novamente.`:`Siga a direção indicada na fonte ${color(ray?.color)} e procure o primeiro espelho que ela pode alcançar. Um espelho só muda o raio quando seu segmento é atingido${scene.portals.length?'; confira também as entradas dos portais nesse trecho':''}.`;
};
function lightHint(level,state,context){
 const scene=lightScene(state),colors=scene.sources.map(s=>color(s.color));
 if(context.phase==='animating')return plan('Observe o raio que ainda está em percurso.','Espere o disparo terminar para examinar onde a luz parou. Pedir uma dica não altera nem reinicia esse percurso.','Depois do disparo, peça outra dica para examinar a configuração atual; editar um espelho cancela e limpa os rastros.');
 // Guardas para cenas importadas: a campanha usa no máximo três fontes.
 if(scene.sources.length>8||scene.objects.length>128||scene.portals.length>64)return plan('Examine um caminho de luz por vez.','Esta cena é maior que o limite da análise local de dicas. Não foi procurada uma solução.','Compare a cor da fonte com seu alvo e as permissões dos portais antes de ajustar os espelhos.');
 // Antes de disparar, descreve somente o que já está visível. Não simula nem
 // antecipa impactos, colisões, trajetos ou um eventual acerto dos espelhos.
 if(!context.ray||!['partial','result'].includes(context.phase)){
  const selected=Number.isInteger(context.selected)&&scene.objects[context.selected]?.type==='mirror'?context.selected:scene.objects.findIndex(o=>o.type==='mirror'),mirror=scene.objects[selected];
  const focus=mirror?`Observe o espelho ${selected+1}, ${where(mirror,scene)}, no ângulo atual de ${Number(mirror.angle).toLocaleString('pt-BR')}°.`:`Comece pela fonte ${colors[0]} e pelo alvo da mesma cor.`;
  const destinations=scene.targets.map(t=>`o alvo ${color(t.color)} ${where(t,scene)}`).join('; '),walls=scene.objects.filter(o=>o.type==='wall').length,selective=scene.portals.filter(p=>p.colors!=null);
  const obstacles=scene.portals.length?` Há ${scene.portals.length} entradas e saídas de portais${selective.length?', algumas seletivas por cor':''}; confira a letra do par e os símbolos nos dois lados.`:walls?` Há ${walls} ${walls===1?'parede fixa':'paredes fixas'}: compare os espaços livres entre elas antes de escolher um trecho.`:' Compare a direção desenhada na fonte com a posição do alvo.';
  const explanation=`Localize ${destinations}.${obstacles} O caminho ainda precisa ser observado com um disparo; mudar a inclinação não desloca o centro do espelho.`;
  const next=mirror?`No espelho ${selected+1}, pense em dois trechos: por onde a luz deve chegar e por onde você quer que saia. A normal é perpendicular ao espelho, e os ângulos de entrada e saída são iguais em relação a ela.`:'Siga a seta de cada fonte e identifique um primeiro destino visível, sem supor que o raio atravessa paredes.';
  return plan(focus,explanation,`${next} ${scene.sources.length>1?'Dispare uma fonte de cada vez para observar ou use Confirmar todos; só todas as fontes completam a tentativa.':'Dispare a fonte ou use Confirmar todos para observar o caminho.'}`);
 }
 const world=context.ray;
 const collision=world.collisions?.[0];
 if(collision){
  const pair=collision.colors.map(color).join(' e '),ray=collision.rayIndices.map(i=>world.rays[i]).find(r=>Number.isInteger(lastMirror(r)))??world.rays[collision.rayIndices[0]];
  return plan(`Compare os caminhos ${pair} ${where(collision.point,scene)}.`,`Nesta configuração, os raios ${pair} se cruzam ou se encostam. Mesmo um rastro que já parou bloqueia outra cor; acertar os destinos separadamente não basta.`,`${mirrorAdvice(ray,scene)} Preserve espaço entre os trechos físicos das duas cores${scene.portals.length?'; o salto entre portais não é um trecho físico':''}.`);
 }
 const failed=world.rays.filter(r=>r.status!=='target');
 const ray=failed.find(r=>r.reflections?.some(h=>h.objectIndex===context.selected))??failed[0];
 if(!ray){
  if(world.complete===false){const missing=scene.sources.filter((_,i)=>!world.firedSourceIndices.includes(i)).map(s=>color(s.color));return plan(`Ainda falta observar ${missing.map(c=>`a fonte ${c}`).join(' e ')}.`,`Os disparos já feitos alcançam seus alvos, mas a tentativa é parcial. O conjunto só pode ser conferido depois de todas as fontes dispararem.`,`Dispare ${missing.join(' e ')} ou use Confirmar todos. Compare os novos trechos com os rastros já presentes; editar qualquer espelho limpa todos os disparos.`);}
  return plan(`Confira a chegada ${colors.length===1?`da luz ${colors[0]}`:`das luzes ${colors.join(', ')}`}.`,'Compare a entrada de cada raio no disco da mesma cor e símbolo, não apenas a proximidade do centro. Preserve também a separação entre trajetórias.',context.phase==='result'?'A confirmação já verificou esta configuração. Você pode observar as reflexões sem precisar mudar os espelhos.':'Use Confirmar todos para testar esta configuração. Uma dica não dispara os raios, registra uma tentativa nem conclui o desafio.');
 }
 const shade=color(ray.color),end=ray.segments.at(-1)?.b;
 if(ray.status==='portal-blocked'){
  const portal=scene.portals.find(p=>end&&Math.abs(Math.hypot(end.x-p.x,end.y-p.y)-(p.radius??16))<.01),label=portal?` ${portal.label??portal.id??''}`:'';
  return plan(`Observe o acesso ao portal${label} pelo raio ${shade}.`,`O raio ${shade} encontra um portal que não permite completar a passagem. Confira a cor aceita tanto na entrada quanto na saída do mesmo par.`,`Procure um par que aceite ${shade} nos dois lados. A saída conserva a direção de entrada: o portal muda a posição, não vira o raio. ${mirrorAdvice(ray,scene)}`);
 }
 if(ray.status==='limit')return plan(`Acompanhe as repetições do caminho ${shade}.`,`O traçado ${shade} atingiu o limite seguro de reflexões ou eventos antes do alvo. Repetir um ciclo não aproxima a luz do destino.`,`${mirrorAdvice(ray,scene)} Busque uma saída do ciclo em vez de acrescentar novas voltas.`);
 if(ray.status==='wall'||ray.status==='escape'){
  const border=end&&(Math.abs(end.x)<.001||Math.abs(end.y)<.001||Math.abs(end.x-scene.width)<.001||Math.abs(end.y-scene.height)<.001),obstacle=border||ray.status==='escape'?'borda':'parede';
  return plan(`Observe o raio ${shade} antes da ${obstacle} ${where(end,scene)}.`,`Neste ajuste, a luz ${shade} termina na ${obstacle}${ray.reflections.length?` depois de ${ray.reflections.length} ${ray.reflections.length===1?'reflexão':'reflexões'}`:' antes de refletir em um espelho'}. A superfície mais próxima interrompe o trecho, mesmo que o alvo esteja alinhado depois dela.`,mirrorAdvice(ray,scene));
 }
 return plan(`Examine o caminho da luz ${shade}.`,`Ela precisa entrar no disco ${shade}, sem tocar o caminho de outra cor. Observe o último trecho que o ajuste atual produz.`,mirrorAdvice(ray,scene));
}
function cutHint(level,state,context){
 const shape=state.shape??level.shape,family=state.family??'Reta',holes=state.holes??[],basic=!context.free&&context.cutMode!=='advanced';
 if(holes.length>32||holes.some(h=>h.length>128))return plan(`Observe a parte preenchida do ${shape}.`,'Este recorte excede o limite da análise local de dicas. Os espaços vazios continuam fora da proporção.','Faça um pequeno ajuste e confirme para comparar o resultado com a meta; nenhuma solução foi procurada.');
 const cut=curvedCut(shapePolygon(shape),state),percent=cut.ratio*100,near=cutSuccess(percent,state.target),increase=percent<state.target;
 const shapeIdea=/Triângulo|Trapézio|Pentágono|irregular/.test(shape)?'A largura da figura muda ao longo do corte: distâncias iguais podem acrescentar áreas diferentes.':/Losango|Hexágono|Heptágono|Octógono|Decágono|Dodecágono/.test(shape)?'Observe as pontas e as partes mais largas: o meio da largura não representa necessariamente a proporção pedida.':'Compare a área preenchida de cada lado, não o comprimento da linha que separa as partes.';
 const curveIdea=family==='Reta'?'A reta desloca uma fronteira inteira.':family==='Parábola'?'O arco da parábola seleciona larguras diferentes em cada altura.':family==='Seno'||family==='Cosseno'?'Os vales e as cristas da onda entram juntos na soma da área roxa.':family==='Cúbica'?'Os dois braços do S devem ser considerados juntos na soma da área roxa.':'As duas curvaturas contribuem para a área total; observe a parte preenchida entre elas.';
 const emptyIdea=holes.length?` ${holes.length===1?'O espaço vazio não conta':'Os espaços vazios não contam'} em nenhum dos lados${level.hasEdgeOpening?', inclusive os recortes abertos na borda':''}.`:'';
 const relation=near?'Seu ajuste está perto da meta; concentre-se em movimentos pequenos e use Confirmar resposta para avaliar.':`Neste ajuste, há área roxa ${increase?'de menos':'demais'} para a meta de ${state.target}%.`;
 let adjustment;
 if(near)adjustment='Antes de mexer mais, confirme a configuração atual. A margem aceita é de 3 pontos percentuais para cada lado da meta, incluindo o limite.';
 else if(basic){
  const direction=typeof level.basicDirection==='number'?level.basicDirection:level.basicDirection?.angle??state.angle,aligned=Math.cos((direction-state.angle)*Math.PI/180)>.999999;
  adjustment=aligned?`${increase?'Aumente':'Diminua'} um pouco o deslocamento no eixo de ${direction}°, usando a alça ou o controle básico. Isso ${increase?'acrescenta':'retira'} área roxa; compare e reduza o tamanho dos ajustes ao se aproximar da meta.`:'Mantenha o eixo indicado nesta fase. Faça um deslocamento pequeno, compare a área roxa e inverta o sentido se ela se afastar da meta.';
 }else adjustment=`Na alça Deslizar curva, ${increase?'aumentar':'diminuir'} o deslocamento ${increase?'acrescenta':'retira'} área roxa sem mudar a ${family==='Reta'?'inclinação da reta':'família da curva'}. Experimente passos pequenos antes de combinar esse movimento com Mover ou Girar.`;
 return plan(`No ${shape}, observe como ${family==='Reta'?'a reta':`a curva ${family}`} separa a meta de ${state.target}% no lado roxo${holes.length?' sem contar os vazios':''}.`,`${relation} ${shapeIdea} ${curveIdea}${emptyIdea}`,adjustment);
}
export function buildOriginalHint(game,level,state,context={}){
 if(game==='light')return lightHint(level,state,context);
 if(game==='cut')return cutHint(level,state,context);
 return plan('Escolha um experimento para pedir uma dica.','As orientações dependem das regras e da configuração do jogo.','Nenhuma jogada foi aplicada.');
}

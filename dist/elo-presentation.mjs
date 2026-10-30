/** Player-facing ELO clues. No reference answer or development trace is read. */
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const ELO_STAGES=Object.freeze([
 ['Básico','Circuito clássico · ∟ Curvas e ↔ retas',1,15],
 ['Aprendiz','○ Passagens · ⊣ Trechos vedados',16,30],
 ['Intermediário','● Contagens · Σ Distâncias',31,45],
 ['Avançado','A—B Vizinhanças · ① Ordem no circuito',46,60],
 ['Mestre','┆ Travessias · ◇ Escolhas interligadas',61,75],
 ['Modo Sábio','Cinco sínteses de dedução',76,80]
]);
export function eloRegionName(region){let n=Number(region)+1,s='';while(n>0){n--;s=String.fromCharCode(65+n%26)+s;n=Math.floor(n/26);}return s||'?';}
const coord=(l,c)=>`L${Math.floor(c/l.cols)+1}C${c%l.cols+1}`;
export function eloActiveMechanics(l){const c=l.constraints??{},active=[];
 if(Object.keys(c.shapes??{}).length)active.push('shapes');
 if(c.passages?.length)active.push('passages');
 if(c.forbiddenEdges?.length)active.push('forbiddenEdges');
 if(Object.keys(c.rowCounts??{}).length||Object.keys(c.colCounts??{}).length)active.push('counts');
 if(Object.keys(c.distances??{}).length)active.push('distances');
 if(c.neighbors?.length)active.push('neighbors');
 if(c.order?.length)active.push('order');
 if(c.cuts?.length)active.push('cuts');
 if(c.exclusivePassages?.length)active.push('exclusivePassages');
 return active;
}
const MECHANIC_TEXT={
 shapes:['∟ / ↔ Curvas e retas','A marca pertence à região, não a uma casa: ∟ exige duas ligações perpendiculares; ↔ exige duas direções opostas. A posição do ponto continua à sua escolha.'],
 passages:['○ Passagem obrigatória','O centro desta casa precisa ser atravessado pelo interior de uma ligação. Não recebe ponto, não interrompe a visão e não cria ligações.'],
 forbiddenEdges:['⊣ Trecho vedado','O pequeno traço cobre o intervalo entre duas casas vizinhas. Nenhuma ligação final pode percorrê-lo. Uma ligação automática que o atravessa continua visível, mas viola a pista.'],
 counts:['● Contagens de pontos','As pistas L e C exigem exatamente a quantidade indicada de pontos na linha ou coluna, incluindo os fixos. Segmentos sem ponto não contam.'],
 distances:['Σ Distância da região','O número Σ é a soma dos comprimentos das duas ligações do ponto da região, em intervalos entre centros. De C2 a C5 são 3 intervalos. Não fixa a posição do ponto.'],
 neighbors:['A—B Vizinhança direta','Os pontos das duas regiões indicadas precisam se conectar diretamente. Um ponto intermediário interrompe a ligação e não satisfaz o par.'],
 order:['① Ordem no circuito','Percorra os marcos na ordem indicada, permitindo outras regiões entre eles. Qualquer início e os dois sentidos valem. Não é a ordem de colocar os pontos.'],
 cuts:['┆ Travessias do corte','A linha tracejada entre duas linhas ou colunas é apenas uma referência: exatamente a quantidade indicada de ligações deve cruzá-la. Ela não bloqueia nada.'],
 exclusivePassages:['◇ Escolha exclusiva','Cada grupo reúne casas sem ponto. Exatamente uma casa de cada grupo deve ser atravessada pelo interior de uma ligação; as outras ficam sem ligação no centro.']
};
export function eloMechanicNames(l){const keys=eloActiveMechanics(l);return keys.length?keys.map(k=>MECHANIC_TEXT[k][0]).join(' · '):'Circuito clássico';}
export function eloRulesMarkup(l){return `<ul class="elo-rule-list">${eloActiveMechanics(l).map(k=>`<li><strong>${MECHANIC_TEXT[k][0]}.</strong> ${MECHANIC_TEXT[k][1]}</li>`).join('')}</ul>`;}
export function eloPublicLevel(l){
 // An allowlist keeps solver traces/answers out of both the editor and JSON export.
 const keys=['game','id','name','rows','cols','regions','fixed','constraints','version','rulesVersion','regrasVersion','stage','stageName','difficulty','tutorial'];
 return Object.fromEntries(keys.filter(k=>Object.hasOwn(l,k)).map(k=>[k,structuredClone(l[k])]));
}
export function eloRegionDescription(l,r){const c=l.constraints??{},parts=[];
 if(c.shapes?.[r])parts.push(c.shapes[r]==='turn'?'curva: duas ligações perpendiculares':'reta: duas ligações opostas');
 if(c.distances?.[r]!==undefined)parts.push(`soma das distâncias ${c.distances[r]}`);
 const order=c.order?.indexOf(r)??-1;if(order>=0)parts.push(`marco ${order+1} da ordem do circuito`);
 const peers=(c.neighbors??[]).flatMap(([a,b])=>a===r?[b]:b===r?[a]:[]);if(peers.length)parts.push(`ligação direta com ${peers.map(eloRegionName).join(', ')}`);
 return parts.join('; ');
}
export function eloCellClue(l,cell){const c=l.constraints??{},required=(c.passages??[]).includes(cell),groups=(c.exclusivePassages??[]).filter(g=>g.cells.includes(cell));
 return {restricted:required||groups.length>0,markup:(required?'<span class="elo-passage" aria-hidden="true">○</span>':'')+groups.map(g=>`<span class="elo-exclusive" aria-hidden="true">◇<small>${esc(g.id)}</small></span>`).join(''),description:[required?'passagem obrigatória, sem ponto':'',...groups.map(g=>`passagem do grupo ${g.id}, exatamente uma por grupo, sem ponto`)].filter(Boolean).join('; ')};
}
export function eloLegendMarkup(l,colors,showExplanations=true){
 const c=l.constraints??{},keys=eloActiveMechanics(l);if(!keys.length)return '';
 // Explanations use only the public clues. IDs never contain imported group names.
 const explanationIds=[];
 const explain=(key,text)=>{
  const id=`c-elo-clue-${key}-explanation`;explanationIds.push(id);
  return ` <span id="${id}" class="elo-clue-explanation"${showExplanations?'':' hidden'}>${esc(text)}</span>`;
 };
 const quantity=(n,singular,plural)=>`${n} ${Number(n)===1?singular:plural}`;
 const regional=Array.from({length:Math.max(...l.regions)+1},(_,r)=>r).filter(r=>eloRegionDescription(l,r));
 const chips=regional.map(r=>{
  const name=eloRegionName(r),shape=c.shapes?.[r],order=c.order?.indexOf(r)??-1,parts=[];
  if(shape)parts.push(shape==='turn'
   ?`O ponto da região ${name} deve formar uma curva: uma ligação horizontal e outra vertical, perpendiculares entre si.`
   :`O ponto da região ${name} deve formar uma reta: as duas ligações seguem em direções opostas, ambas na horizontal ou ambas na vertical.`);
  if(c.distances?.[r]!==undefined)parts.push(`No ponto da região ${name}, some o comprimento das duas ligações: o total deve ser exatamente ${quantity(c.distances[r],'intervalo','intervalos')} entre centros de casas vizinhas. Por exemplo, de C2 a C5 são 3 intervalos. Não é o tamanho de cada ligação separadamente.`);
  if(order>=0)parts.push(`A região ${name} é o marco ${order+1} da sequência indicada abaixo. Os marcos devem aparecer nessa ordem ao percorrer o circuito, com outras regiões entre eles se necessário. Pode começar em qualquer marco e percorrer no sentido inverso; não é a ordem de colocar os pontos.`);
  const peers=(c.neighbors??[]).flatMap(([a,b])=>a===r?[b]:b===r?[a]:[]);
  if(peers.length)parts.push(`O ponto da região ${name} deve se ligar diretamente ${peers.length===1?'ao ponto da região':'aos pontos das regiões'} ${peers.map(eloRegionName).join(', ')}, sem ponto intermediário. As regiões não precisam compartilhar uma fronteira.`);
  return `<li class="elo-region-chip" style="--elo-region:${colors[r%colors.length]}" title="${esc(eloRegionDescription(l,r))}"><strong>Região ${name}</strong>${shape?` <span>${shape==='turn'?'∟ curva':'↔ reta'}</span>`:''}${c.distances?.[r]!==undefined?` <span>Σ ${c.distances[r]}</span>`:''}${order>=0?` <span>marco ${order+1}</span>`:''}${explain(`region-${r}`,parts.join(' '))}</li>`;
 }).join('');
 const lines=[];
 const line=(key,code,explanation)=>lines.push(`<li>${esc(code)}${explain(key,explanation)}</li>`);
 if(c.passages?.length)line('passages',`○ Passagens: ${c.passages.map(i=>coord(l,i)).join(', ')}.`,
  `Cada casa indicada (${c.passages.map(i=>coord(l,i)).join(', ')}) deve ficar sem ponto e ter seu centro atravessado pelo interior de uma ligação. Passar ao lado não vale. A passagem não interrompe nem cria uma ligação.`);
 if(c.forbiddenEdges?.length)line('forbidden-edges',`⊣ Trechos vedados: ${c.forbiddenEdges.map(([a,b])=>`${coord(l,a)}–${coord(l,b)}`).join('; ')}.`,
  `Nenhuma ligação pode percorrer os intervalos entre os centros de ${c.forbiddenEdges.map(([a,b])=>`${coord(l,a)} e ${coord(l,b)}`).join('; ')}. A proibição vale para esses intervalos, não bloqueia as casas nas extremidades. Uma ligação automática que percorra um deles viola a pista.`);
 const counts=[...Object.entries(c.rowCounts??{}).map(([r,n])=>`L${+r+1}: ${n}`),...Object.entries(c.colCounts??{}).map(([col,n])=>`C${+col+1}: ${n}`)];
 if(counts.length){
  const quotas=[...Object.entries(c.rowCounts??{}).map(([r,n])=>`Na linha L${+r+1}, deve haver exatamente ${quantity(n,'ponto','pontos')}.`),...Object.entries(c.colCounts??{}).map(([col,n])=>`Na coluna C${+col+1}, deve haver exatamente ${quantity(n,'ponto','pontos')}.`)];
  line('counts',`● Pontos exatos: ${counts.join(' · ')}.`,`${quotas.join(' ')} Os pontos fixos também entram nessas contagens. Uma ligação que só atravessa uma casa não conta como ponto.${[...Object.values(c.rowCounts??{}),...Object.values(c.colCounts??{})].some(n=>Number(n)===0)?' Zero significa que não pode haver nenhum ponto naquela linha ou coluna.':''}`);
 }
 if(c.neighbors?.length)line('neighbors',`Vizinhanças diretas: ${c.neighbors.map(([a,b])=>`${eloRegionName(a)}—${eloRegionName(b)}`).join(' · ')}.`,
  `${c.neighbors.map(([a,b])=>`O ponto da região ${eloRegionName(a)} deve se ligar diretamente ao ponto da região ${eloRegionName(b)}.`).join(' ')} Não pode haver outro ponto entre os dois na mesma linha ou coluna. As regiões não precisam compartilhar uma fronteira.`);
 if(c.order?.length)line('order',`① Ordem: ${c.order.map(eloRegionName).join(' → ')} → ${eloRegionName(c.order[0])}. Vale também o sentido inverso, sem início obrigatório.`,
  `Ao percorrer o circuito, os pontos das regiões ${c.order.map(eloRegionName).join(' → ')} devem aparecer nessa ordem relativa. Pode haver outras regiões entre esses marcos. Pode começar por qualquer marco (rotacionar a sequência) ou percorrer no sentido inverso. Não é a ordem de colocar os pontos nem exige ligações diretas entre marcos consecutivos.`);
 if(c.cuts?.length)line('cuts',`┆ Travessias: ${c.cuts.map(cut=>`${cut.axis==='row'?'L':'C'}${cut.index+1}|${cut.axis==='row'?'L':'C'}${cut.index+2} = ${cut.count}`).join(' · ')}.`,
  `${c.cuts.map(cut=>{const row=cut.axis==='row',axis=row?'L':'C';return `Entre as ${row?'linhas':'colunas'} ${axis}${cut.index+1} e ${axis}${cut.index+2}, exatamente ${quantity(cut.count,'ligação deve','ligações devem')} cruzar a linha tracejada.`;}).join(' ')} Conte ligações, não pontos nem casas. O corte é só uma referência, não uma barreira.`);
 for(const [index,g] of (c.exclusivePassages??[]).entries())line(`exclusive-${index}`,`◇ Grupo ${g.id}: ${g.cells.map(i=>coord(l,i)).join(' ou ')}. Exatamente uma passagem.`,
  `No grupo ${g.id}, todas as casas indicadas (${g.cells.map(i=>coord(l,i)).join(', ')}) devem ficar sem ponto. Exatamente uma dessas casas deve ter seu centro atravessado pelo interior de uma ligação; as demais não podem ter o centro atravessado. Nem zero nem duas casas valem: até uma única ligação que atravesse duas casas do mesmo grupo viola a pista.`);
 return `<section id="c-elo-clue-legend" class="elo-clue-legend" aria-label="Pistas desta fase"><div class="elo-clue-heading"><strong>Pistas desta fase</strong><button id="c-elo-explanations-toggle" type="button" aria-expanded="${showExplanations?'true':'false'}" aria-controls="${explanationIds.join(' ')}">${showExplanations?'Ocultar explicações':'Mostrar explicações'}</button></div>${chips?`<ul class="elo-region-clues">${chips}</ul><p class="elo-region-help">As marcas das regiões acompanham seus pontos, onde quer que sejam colocados.</p>`:''}<ul class="elo-specific-clues">${lines.join('')}</ul></section>`;
}
/** Labels live in the board's CSS coordinate space, not its scalable SVG viewBox.
 * This keeps a 12×12 clue readable and a compact board's clue inside its gutter.
 * The whole board still pans/zooms together; labels never intercept input. */
export function eloBoardLabels(l,showCoordinates=false){const c=l.constraints??{};let markup='';
 const label=(side,at,text,count=false)=>`<span aria-hidden="true" class="elo-board-label elo-label-${side}${count?' elo-count-label':''}" style="${side==='row'||side==='cut-row'?'top':'left'}:${at}%">${esc(text)}</span>`;
 for(let r=0;r<l.rows;r++){const n=c.rowCounts?.[r];if(n!==undefined||showCoordinates)markup+=label('row',(r+.5)/l.rows*100,`L${r+1}${n!==undefined?`·${n}`:''}`,n!==undefined);}
 for(let col=0;col<l.cols;col++){const n=c.colCounts?.[col];if(n!==undefined||showCoordinates)markup+=label('col',(col+.5)/l.cols*100,`C${col+1}${n!==undefined?`·${n}`:''}`,n!==undefined);}
 for(const cut of c.cuts??[])markup+=label(cut.axis==='row'?'cut-row':'cut-col',(cut.index+1)/(cut.axis==='row'?l.rows:l.cols)*100,cut.count);
 return markup;
}
export function eloOverlayClues(l){const c=l.constraints??{},w=l.cols*100,h=l.rows*100,center=i=>[(i%l.cols)*100+50,Math.floor(i/l.cols)*100+50];let markup='';
 for(const [a,b] of c.forbiddenEdges??[]){const p=center(a),q=center(b),x=(p[0]+q[0])/2,y=(p[1]+q[1])/2,horizontal=p[1]===q[1];markup+=`<g class="elo-forbidden" aria-label="Trecho vedado entre ${coord(l,a)} e ${coord(l,b)}"><line x1="${x-(horizontal?0:17)}" y1="${y-(horizontal?17:0)}" x2="${x+(horizontal?0:17)}" y2="${y+(horizontal?17:0)}"/><circle cx="${x}" cy="${y}" r="6"/></g>`;}
 for(const cut of c.cuts??[]){const row=cut.axis==='row',at=(cut.index+1)*100;markup+=`<g class="elo-cut"><line x1="${row?0:at}" y1="${row?at:0}" x2="${row?w:at}" y2="${row?at:h}"/></g>`;}
 return markup;
}

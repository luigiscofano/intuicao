/** Player-facing ELO clues. No reference answer or development trace is read. */
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const ELO_STAGES=Object.freeze([
 ['Fundamentos','Circuito clássico'],['Curvas e retas','∟ Curvas e ↔ retas'],['Passagens','○ Passagens obrigatórias'],['Trechos vedados','⊣ Intervalos vedados'],['Contagens','● Contagem de pontos'],['Distâncias','Σ Soma das duas ligações'],['Vizinhanças','A—B Vizinhança direta'],['Ordem no circuito','① Ordem relativa'],['Travessias','┆ Contagem de travessias'],['Escolhas interligadas','◇ Uma passagem por grupo']
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
export function eloLegendMarkup(l,colors){const c=l.constraints??{},keys=eloActiveMechanics(l);if(!keys.length)return '';
 const regional=Array.from({length:Math.max(...l.regions)+1},(_,r)=>r).filter(r=>eloRegionDescription(l,r));
 const chips=regional.map(r=>{const shape=c.shapes?.[r],order=c.order?.indexOf(r)??-1;return `<li class="elo-region-chip" style="--elo-region:${colors[r%colors.length]}" title="${esc(eloRegionDescription(l,r))}"><strong>Região ${eloRegionName(r)}</strong>${shape?` <span>${shape==='turn'?'∟ curva':'↔ reta'}</span>`:''}${c.distances?.[r]!==undefined?` <span>Σ ${c.distances[r]}</span>`:''}${order>=0?` <span>marco ${order+1}</span>`:''}</li>`;}).join('');
 const lines=[];
 if(c.passages?.length)lines.push(`○ Passagens: ${c.passages.map(i=>coord(l,i)).join(', ')}.`);
 if(c.forbiddenEdges?.length)lines.push(`⊣ Trechos vedados: ${c.forbiddenEdges.map(([a,b])=>`${coord(l,a)}–${coord(l,b)}`).join('; ')}.`);
 const counts=[...Object.entries(c.rowCounts??{}).map(([r,n])=>`L${+r+1}: ${n}`),...Object.entries(c.colCounts??{}).map(([col,n])=>`C${+col+1}: ${n}`)];if(counts.length)lines.push(`● Pontos exatos: ${counts.join(' · ')}.`);
 if(c.neighbors?.length)lines.push(`Vizinhanças diretas: ${c.neighbors.map(([a,b])=>`${eloRegionName(a)}—${eloRegionName(b)}`).join(' · ')}.`);
 if(c.order?.length)lines.push(`① Ordem: ${c.order.map(eloRegionName).join(' → ')} → ${eloRegionName(c.order[0])}. Vale também o sentido inverso, sem início obrigatório.`);
 if(c.cuts?.length)lines.push(`┆ Travessias: ${c.cuts.map(cut=>`${cut.axis==='row'?'L':'C'}${cut.index+1}|${cut.axis==='row'?'L':'C'}${cut.index+2} = ${cut.count}`).join(' · ')}.`);
 for(const g of c.exclusivePassages??[])lines.push(`◇ Grupo ${g.id}: ${g.cells.map(i=>coord(l,i)).join(' ou ')}. Exatamente uma passagem.`);
 return `<section class="elo-clue-legend" aria-label="Pistas desta fase"><strong>Pistas desta fase</strong>${chips?`<ul class="elo-region-clues">${chips}</ul><p class="elo-region-help">As marcas das regiões acompanham seus pontos, onde quer que sejam colocados.</p>`:''}<ul class="elo-specific-clues">${lines.map(text=>`<li>${esc(text)}</li>`).join('')}</ul></section>`;
}
export function eloOverlayClues(l){const c=l.constraints??{},w=l.cols*100,h=l.rows*100,center=i=>[(i%l.cols)*100+50,Math.floor(i/l.cols)*100+50];let markup='';
 for(const [r,n] of Object.entries(c.rowCounts??{}))markup+=`<text x="-14" y="${+r*100+57}" text-anchor="end" class="elo-count-label">L${+r+1}·${n}</text>`;
 for(const [col,n] of Object.entries(c.colCounts??{}))markup+=`<text x="${+col*100+50}" y="-15" text-anchor="middle" class="elo-count-label">C${+col+1}·${n}</text>`;
 for(const [a,b] of c.forbiddenEdges??[]){const p=center(a),q=center(b),x=(p[0]+q[0])/2,y=(p[1]+q[1])/2,horizontal=p[1]===q[1];markup+=`<g class="elo-forbidden" aria-label="Trecho vedado entre ${coord(l,a)} e ${coord(l,b)}"><line x1="${x-(horizontal?0:17)}" y1="${y-(horizontal?17:0)}" x2="${x+(horizontal?0:17)}" y2="${y+(horizontal?17:0)}"/><circle cx="${x}" cy="${y}" r="6"/></g>`;}
 for(const cut of c.cuts??[]){const row=cut.axis==='row',at=(cut.index+1)*100;markup+=`<g class="elo-cut"><line x1="${row?0:at}" y1="${row?at:0}" x2="${row?w:at}" y2="${row?at:h}"/><text x="${row?w+12:at+8}" y="${row?at+7:h+25}">${cut.count}</text></g>`;}
 return markup;
}

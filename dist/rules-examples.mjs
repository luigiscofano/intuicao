// Small illustrative states, not playable levels. Grounded in the shipped engines.
// No campaign counts: these examples teach one action while the text states the goal.
const ink='#304c38',green='#486c4d',pale='#e6eedb',purple='#8b78b4',gold='#d6a53a';
const txt=(x,y,s,size=11)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-family="system-ui,sans-serif">${s}</text>`;
const rect=(x,y,w,h,fill=pale)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${fill}" stroke="#a8b79c"/>`;
const line=(x1,y1,x2,y2,color=green,width=3)=>`<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
const circle=(x,y,r=6,fill=green)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const wrap=s=>`<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${s}</svg>`;
const arrow=()=>`<g class="rpd-action">${line(109,72,129,72)}<path d="M123 66l7 6-7 6" fill="none" stroke="${green}" stroke-width="2"/></g>`;
const panels=(before,after,caption)=>wrap(txt(56,17,'Antes')+txt(183,17,'Depois')+before+arrow()+`<g class="rpd-result">${after}</g>`+txt(120,131,caption,10));
const animal=(x,y,frame)=>`<svg x="${x}" y="${y}" width="24" height="24" style="width:24px;height:24px;overflow:hidden" viewBox="${frame*313.5} 0 313.5 313.5" overflow="hidden"><image href="sintonia/assets/chibi-user-atlas.svg" width="1254" height="313.5"/></svg>`;
const orb=(x,after)=>{
 const points=[[x,40],[x+30,70],[x,100],[x-30,70]],symbols=after?['◆','●','▲','■']:['●','▲','■','◆'];
 return `<circle cx="${x}" cy="70" r="30" fill="none" stroke="#a8b79c" stroke-width="2"/>`+`<g class="${after?'rpx-orbit-turn':''}">`+points.map(([a,b],i)=>circle(a,b,10,'#f9faf5')+txt(a,b+4,symbols[i],14)).join('')+'</g>';
};
export const RULE_EXAMPLES={
 light:{steps:['Gire os espelhos e dispare a luz. As posições são fixas.','Leve cada raio ao alvo da mesma cor e símbolo.','Raios de cores diferentes não podem se cruzar nem se tocar.'],svg:wrap(
 txt(120,16,'Gire o espelho → dispare')+circle(29,97,10,gold)+txt(29,101,'●',10)+line(40,97,112,97,gold,4)+`<g class="rpd-action">${line(96,113,128,81,ink,4)}</g>`+`<g class="rpd-result"><g class="rpx-beam">${line(112,96,112,43,gold,4)}</g><circle cx="112" cy="30" r="13" fill="#fff8db" stroke="${gold}" stroke-width="2"/>${txt(112,34,'●',12)}</g>`+txt(180,64,'Reflexão',11)+txt(120,131,'Um espelho inclinado muda a direção.',10))},
 cut:{steps:['Observe a porcentagem pedida para o lado roxo.','Mova o corte na direção indicada; vazios não contam como área.','Confirme: a margem aceita é de 3 pontos percentuais para mais ou para menos.'],svg:panels(
 rect(18,35,76,70,'#f8f8f0')+rect(18,35,19,70,purple)+line(37,35,37,105,ink,2)+txt(56,118,'25%',10),
 rect(145,35,76,70,'#f8f8f0')+`<g class="rpx-cut-fill">${rect(145,35,38,70,purple)}</g><g class="rpx-cut-line">${line(183,35,183,105,ink,2)}</g>`+txt(183,118,'50%',10),'Exemplo: meta de 50% da área.')},
 elo:{steps:['Coloque exatamente um ponto por região; preserve os pontos fixos.','As ligações ao primeiro ponto em cada direção são automáticas.','Forme um circuito único: duas ligações por ponto, sem cruzamentos. Respeite as pistas da fase.'],svg:wrap(
 txt(120,16,'Um ponto em cada região')+rect(68,29,52,42,'#f5d56b')+rect(120,29,52,42,'#83b5ee')+rect(68,71,52,42,'#71cda3')+rect(120,71,52,42,'#f09fbc')+line(92,49,148,49)+line(92,49,92,93)+circle(92,49)+circle(148,49)+circle(92,93)+`<g class="rpd-result">${circle(148,93)}<g class="rpx-circuit">${line(148,49,148,93)}${line(92,93,148,93)}</g></g>`+txt(120,131,'Alinhe os pontos para fechar o circuito.',10))},
 prumo:{steps:['Pinte toda a grade com uma peça conectada pelos lados para cada apoio.','As casas que tocam um apoio pertencem à sua peça.','Equilibre o centro de massa sobre o apoio nos dois eixos. Todas as casas têm a mesma massa.'],svg:panels(
 rect(21,51,24,24)+rect(45,51,24,24)+`<path d="M57 59l7 12H50z" fill="${ink}"/>`+txt(57,96,'pesa à esquerda',9),
 rect(147,51,24,24)+rect(171,51,24,24)+`<g class="rpx-add-house">${rect(195,51,24,24)}</g>`+`<path d="M183 59l7 12h-14z" fill="${ink}"/>`+txt(183,96,'centro no apoio',9),'Uma casa à direita compensa a da esquerda.')},
 pacto:{steps:['Complete a grade 8 × 8: dois de cada símbolo em toda linha e coluna.','Cada casa deve tocar exatamente um símbolo igual pelos lados.','Forme duplas, nunca trios. Diagonais não contam e pistas fixas não mudam.'],svg:panels(
 rect(21,48,34,34)+rect(55,48,34,34,'#fafbf7')+circle(38,65,9)+txt(72,70,'?',17),
 rect(147,48,34,34)+rect(181,48,34,34)+circle(164,65,9)+`<g class="rpx-pair">${circle(198,65,9)}</g>`+line(164,92,198,92),
 'Exemplo local: cada círculo tem um par.')},
 sintonia:{steps:['Uma seta comanda todos os animais: cada um tenta andar uma casa.','Quem encontra uma parede fica parado; use isso para combinar os caminhos.','Todos devem chegar aos destinos juntos. Estar no destino não impede novos movimentos.'],svg:panels(
 [0,1,2].map(i=>rect(19+i*25,33,25,27,'#fafbf7')+rect(19+i*25,77,25,27,i===2?'#7a856c':'#fafbf7')).join('')+animal(19,34,1)+animal(44,78,0)+txt(56,118,'Comando: →',10),
 [0,1,2].map(i=>rect(145+i*25,33,25,27,'#fafbf7')+rect(145+i*25,77,25,27,i===2?'#7a856c':'#fafbf7')).join('')+`<g class="rpx-animal-step">${animal(170,34,1)}</g>`+animal(170,78,0),
 'Um avança; o outro encontra a parede.')},
 repasse:{steps:['Retire uma peça: seu valor inteiro vai em cada direção das setas, sem dividir.','O repasse atravessa vazios e soma na primeira peça presente; sem receptor, chega à borda.','Planeje a ordem até esvaziar a grade com todas as metas exatas.'],svg:panels(
 rect(13,48,32,35)+txt(29,70,'2 →',12)+rect(64,48,32,35)+txt(80,70,'3 →',12)+line(46,65,61,65),
 rect(140,48,32,35,'#fafbf7')+txt(156,70,'·',16)+rect(191,48,32,35)+txt(207,70,'5 →',12)+txt(183,103,'2 + 3 = 5',11)+`<g class="rpx-transfer">${circle(156,36,9,'#e6eedb')}${txt(156,40,'+2',9)}</g>`,
 'Retirar o 2 aumenta o primeiro receptor.')},
 orbita:{steps:['Escolha um anel e gire: todas as peças dele avançam juntas.','Casas e alvos ficam fixos. Use os encontros dos anéis para transferir peças.','Complete todos os alvos ao mesmo tempo. Observe passos especiais e mecanismos da fase.'],svg:panels(orb(56,false),orb(183,true),'Um giro horário de uma casa move todas.')},
 desvio:{steps:['Escolha uma casa disponível e confirme. A primeira escolha é livre.','↔ manda o rival para a mesma linha; ↕, para a mesma coluna. A casa usada desaparece.','Quem não tiver jogada legal perde. Casas consumidas não bloqueiam o caminho.'],svg:panels(
 [0,1,2].flatMap(r=>[0,1,2].map(c=>rect(22+c*24,30+r*24,24,24,r===1&&c===1?pale:'#fafbf7')+txt(34+c*24,47+r*24,r===1&&c===1?'↔':'↕',13))).join(''),
 [0,1,2].flatMap(r=>[0,1,2].map(c=>rect(148+c*24,30+r*24,24,24,r===1&&c!==1?pale:'#fafbf7')+txt(160+c*24,47+r*24,r===1&&c===1?'×':'↕',13))).join(''),
 'Escolha ↔: o rival só joga nessa linha.')}
};

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
 light:{steps:["Gire os espelhos para mudar a direção da luz. Suas posições são fixas; paredes interrompem o raio.", "Leve cada raio ao alvo da mesma cor e símbolo. Clique nas fontes para disparar ou use Confirmar todos.", "Todos os raios devem acertar seus alvos. Cores diferentes não podem se cruzar nem se tocar, mesmo em disparos separados."],svg:wrap(
 txt(120,16,'Gire o espelho → dispare')+circle(29,97,10,gold)+txt(29,101,'●',10)+line(40,97,112,97,gold,4)+`<g class="rpd-action">${line(96,113,128,81,ink,4)}</g>`+`<g class="rpd-result"><g class="rpx-beam">${line(112,96,112,53,gold,4)}</g><circle cx="112" cy="40" r="13" fill="#fff8db" stroke="${gold}" stroke-width="2"/>${txt(112,44,'●',12)}</g>`+txt(180,64,'Reflexão',11)+txt(120,131,'Um espelho inclinado muda a direção.',10))},
 cut:{steps:["A meta indica quanto da área preenchida deve ficar no lado roxo: 50% significa metade.", "Ajuste a linha ou curva. No Desafio básico, mova na direção da seta; buracos e recortes vazios não entram na conta.", "Confirme quando chegar à meta. A margem é de 3 pontos percentuais para mais ou para menos: 50% aceita de 47% a 53%."],svg:panels(
 rect(18,35,76,70,'#f8f8f0')+rect(18,35,19,70,purple)+line(37,35,37,105,ink,2)+txt(56,118,'25%',10),
 rect(145,35,76,70,'#f8f8f0')+`<g class="rpx-cut-fill">${rect(145,35,38,70,purple)}</g><g class="rpx-cut-line">${line(183,35,183,105,ink,2)}</g>`+txt(183,118,'50%',10),'Exemplo: meta de 50% da área.')},
 elo:{steps:["Coloque exatamente um ponto em cada região colorida, sem mover os pontos fixos.", "Cada ponto se liga automaticamente ao primeiro ponto que encontra na horizontal ou vertical. As fronteiras das regiões não bloqueiam a ligação.", "Forme um circuito único: duas ligações por ponto, sem cruzamentos fora dos pontos. Respeite também as pistas da fase."],svg:wrap(
 txt(120,16,'Um ponto em cada região')+rect(68,29,52,42,'#f5d56b')+rect(120,29,52,42,'#83b5ee')+rect(68,71,52,42,'#71cda3')+rect(120,71,52,42,'#f09fbc')+line(92,49,148,49)+line(92,49,92,93)+circle(92,49)+circle(148,49)+circle(92,93)+`<g class="rpd-result">${circle(148,93)}<g class="rpx-circuit">${line(148,49,148,93)}${line(92,93,148,93)}</g></g>`+txt(120,131,'Alinhe os pontos para fechar o circuito.',10))},
 prumo:{steps:["Escolha um apoio e pinte sua peça. Preencha toda a grade, sem sobreposição; as casas de cada peça se conectam pelos lados.", "Cada peça deve conter seu apoio. Se ele fica entre duas casas, ambas pertencem à peça. Todas as casas têm a mesma massa.", "Equilibre o centro de massa sobre o apoio nos dois eixos. Conte as casas de cada lado e suas distâncias ao apoio; depois, confirme."],svg:panels(
 rect(21,51,24,24)+rect(45,51,24,24)+`<path d="M57 59l7 12H50z" fill="${ink}"/>`+txt(57,96,'pesa à esquerda',9),
 rect(147,51,24,24)+rect(171,51,24,24)+`<g class="rpx-add-house">${rect(195,51,24,24)}</g>`+`<path d="M183 59l7 12h-14z" fill="${ink}"/>`+txt(183,96,'centro no apoio',9),'Uma casa à direita compensa a da esquerda.')},
 pacto:{steps:["Complete a grade 8 × 8 com círculo, triângulo, quadrado e losango. Toda linha e coluna deve ter exatamente dois de cada símbolo.", "Cada casa precisa tocar exatamente uma casa igual pelos lados. Isso forma duplas: diagonais não contam e trios não são permitidos.", "Preserve as pistas fixas. Cruze as contagens com as duplas possíveis; o lápis serve só para anotar. A grade correta e completa vence automaticamente."],svg:panels(
 rect(21,48,34,34)+rect(55,48,34,34,'#fafbf7')+circle(38,65,9)+txt(72,70,'?',17),
 rect(147,48,34,34)+rect(181,48,34,34)+circle(164,65,9)+`<g class="rpx-pair">${circle(198,65,9)}</g>`+line(164,92,198,92),
 'Exemplo local: cada círculo tem um par.')},
 sintonia:{steps:["Use as setas ou WASD: todos os animais recebem o mesmo comando e tentam andar uma casa, cada um no seu tabuleiro.", "Quem encontra uma parede fica parado; os outros podem avançar. Use os bloqueios para combinar os caminhos.", "Todos precisam ocupar seus destinos ao final do mesmo comando. Chegar antes não prende ninguém: o animal pode sair e voltar."],svg:panels(
 [0,1,2].map(i=>rect(19+i*25,33,25,27,'#fafbf7')+rect(19+i*25,77,25,27,i===2?'#7a856c':'#fafbf7')).join('')+animal(19,34,1)+animal(44,78,0)+txt(56,118,'Comando: →',10),
 [0,1,2].map(i=>rect(145+i*25,33,25,27,'#fafbf7')+rect(145+i*25,77,25,27,i===2?'#7a856c':'#fafbf7')).join('')+`<g class="rpx-animal-step">${animal(170,34,1)}</g>`+animal(170,78,0),
 'Um avança; o outro encontra a parede.')},
 repasse:{steps:["Toque em uma peça para retirá-la. Seu valor atual inteiro vai em cada direção das setas, sem dividir.", "O repasse atravessa vazios e soma na primeira peça presente, que espera sua vez com o novo valor. Sem receptor, chega à borda.", "Esvazie a grade com todas as metas exatas, inclusive as de valor zero. As caixas mostram acumulado / meta; desfaça se ultrapassar."],svg:panels(
 rect(13,48,32,35)+txt(29,70,'2 →',12)+rect(64,48,32,35)+txt(80,70,'3 →',12)+line(46,65,61,65),
 rect(140,48,32,35,'#fafbf7')+txt(156,70,'·',16)+rect(191,48,32,35)+txt(207,70,'5 →',12)+txt(183,103,'2 + 3 = 5',11)+`<g class="rpx-transfer">${circle(156,36,9,'#e6eedb')}${txt(156,40,'+2',9)}</g>`,
 'Retirar o 2 aumenta o primeiro receptor.')},
 orbita:{steps:["Escolha um anel e gire: todas as peças dele avançam juntas uma casa, salvo quando o controle indicar outro passo.", "Casas e alvos ficam fixos. Para transferir uma peça, leve-a ao encontro dos anéis e gire o outro anel.", "Complete todos os alvos ao mesmo tempo. Peças corretas ainda podem sair do lugar; símbolos iguais são equivalentes. Observe os mecanismos da fase."],svg:panels(orb(56,false),orb(183,true),'Um giro horário de uma casa move todas.')},
 desvio:{steps:["Na partida comum, a primeira escolha é livre. Escolha uma casa disponível e confirme; os jogadores se alternam.", "↔ manda o rival para a mesma linha; ↕, para a mesma coluna. A casa escolhida é consumida e não pode ser usada de novo.", "Escolha qualquer casa disponível no destino indicado, mesmo distante: casas consumidas não bloqueiam o caminho. Quem ficar sem jogada legal perde."],svg:panels(
 [0,1,2].flatMap(r=>[0,1,2].map(c=>rect(22+c*24,30+r*24,24,24,r===1&&c===1?pale:'#fafbf7')+txt(34+c*24,47+r*24,r===1&&c===1?'↔':'↕',13))).join(''),
 [0,1,2].flatMap(r=>[0,1,2].map(c=>rect(148+c*24,30+r*24,24,24,r===1&&c!==1?pale:'#fafbf7')+txt(160+c*24,47+r*24,r===1&&c===1?'×':'↕',13))).join(''),
 'Escolha ↔: o rival só joga nessa linha.')}
};

// BROTO: the upper sprout already has H; planting below adds V and harvests it.
RULE_EXAMPLES.broto={steps:[
 'Escolha uma casa vazia, observe a prévia e confirme. A semente nova estimula o primeiro broto em cada direção, mesmo distante e de qualquer jogador.',
 'Horizontal ↔ e vertical ↕ juntos fazem o broto florescer: um ponto para seu dono, e a peça sai. Repetir um eixo não basta; a colheita não continua o estímulo nem devolve sementes.',
 'Cada pessoa planta oito sementes por rodada. Joguem duas rodadas, alternando quem começa. Vence quem somar mais flores; brotos restantes não pontuam e totais iguais dão empate.'
],svg:wrap(
 txt(120,14,'Já tem ↔. Plante abaixo para dar ↕.',10)+
 rect(29,25,50,36)+rect(29,61,50,36,'#fafbf7')+
 `<path d="M54 47V35m0 6c-9 0-11-5-10-8 7 0 10 3 10 8m0-3c0-7 7-10 11-8 0 6-5 9-11 8" fill="none" stroke="${green}" stroke-width="2"/>`+txt(54,57,'↔',11)+
 `<g class="rpx-broto-plant">${circle(54,81,6,purple)}${txt(54,95,'nova',8)}</g>`+
 `<g class="rpx-broto-ray">${line(54,74,54,62,purple,2)}</g>`+arrow()+
 rect(158,25,50,36,'#fafbf7')+rect(158,61,50,36,'#fafbf7')+circle(183,81,6,purple)+
 `<g class="rpx-broto-flower"><path d="M183 29c-7-9-14 1-6 6-11 3-5 14 3 8 1 11 13 8 9-2 10 4 13-8 3-9 6-8-5-14-9-3Z" fill="${green}"/><circle cx="183" cy="36" r="4" fill="${gold}"/></g>`+
 `<g class="rpx-broto-point">${txt(183,48,'+1 ao dono',10)}</g>`+
 txt(120,116,'A flor sai; a semente nova fica sem marcas.',9)+txt(120,132,'A prévia não altera a partida.',9))};

// Exemplo CERCO reproduzível: abertura oficial, Verde L1C3 → L2C3.
const cercoExampleGrid=x=>Array.from({length:25},(_,i)=>rect(x+(i%5)*16,27+Math.floor(i/5)*16,16,16,'#fafbf7')).join('');
const cercoExamplePiece=(x,y,team)=>circle(x,y,5.5,team==='V'?green:gold)+`<text x="${x}" y="${y+2.5}" text-anchor="middle" font-size="7" font-family="system-ui" style="fill:${team==='V'?'#fff':ink}">${team}</text>`;
const cercoExampleTeam=(x,after)=>[0,2,4].map(c=>(after&&c===2?'':cercoExamplePiece(x+c*16+8,35,'V'))+cercoExamplePiece(x+c*16+8,99,'A')).join('');
RULE_EXAMPLES.cerco={steps:[
 'Mova uma peça sua uma casa para cima, baixo, esquerda ou direita. Escolha um destino vazio e sem barreira, observe a prévia e confirme.',
 'A casa que a peça deixou vira uma barreira para os dois times. Não há saltos, diagonais ou capturas: as seis peças continuam no tabuleiro.',
 'Quem começar a própria vez sem nenhum movimento perde. Uma peça presa não basta: outra peça do mesmo time ainda pode ter saída.'
],svg:wrap(txt(54,15,'Antes',10)+txt(184,15,'Depois',10)+cercoExampleGrid(14)+cercoExampleTeam(14,false)+arrow()+cercoExampleGrid(144)+cercoExampleTeam(144,true)+
 `<g class="rpx-cerco-barrier">${rect(177,28,14,14,'#d4dacd')}${line(180,32,188,32,'#7c8973',1)}${line(180,37,188,37,'#7c8973',1)}</g>`+
 `<g class="rpx-cerco-move">${cercoExamplePiece(184,51,'V')}</g>`+
 txt(120,120,'Verde: L1C3 → L2C3. A origem fecha.',9)+txt(120,134,'As seis peças permanecem no tabuleiro.',9))};

// Recorte de linha: círculo . círculo; um losango intermediário rompe a ponte.
RULE_EXAMPLES.trama={steps:[
 'Coloque uma peça em uma casa vazia e confirme. Peças suas se conectam na horizontal e na vertical se forem vizinhas ou tiverem exatamente uma casa vazia entre elas.',
 'Uma peça adversária no meio interrompe a ponte. Fios cruzados em uma casa vazia não unem redes; somente peças reais podem formar uma junção.',
 'Forme uma única rede com pelo menos seis peças suas. Conte peças, não fios nem grupos separados. As peças ficam onde foram colocadas; tabuleiro cheio sem vencedor dá empate.'
],svg:wrap(txt(56,18,'Ponte: rede de 2',10)+txt(184,18,'Ponte interrompida',10)+
 [0,1,2].map(c=>rect(14+c*28,43,28,34,'#fafbf7')).join('')+line(28,60,84,60,'#608cae',2)+circle(28,60,8,'#91cbd9')+circle(84,60,8,'#91cbd9')+arrow()+
 [0,1,2].map(c=>rect(142+c*28,43,28,34,'#fafbf7')).join('')+circle(156,60,8,'#91cbd9')+circle(212,60,8,'#91cbd9')+
 `<g class="rpx-trama-block"><path d="m184 51 9 9-9 9-9-9z" fill="${purple}" stroke="#675187" stroke-width="1.5"/></g>`+
 txt(184,96,'Duas redes azuis de 1',9)+txt(56,96,'O meio está vazio',9)+txt(120,125,'Colocar no meio separa os círculos.',10))};

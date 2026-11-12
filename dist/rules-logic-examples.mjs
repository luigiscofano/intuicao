// Teaching miniatures, not campaign levels. Fixtures are replayed against the shipped engines.
const ink='#304c38', green='#486c4d', pale='#e6eedb', gold='#d6a53a', purple='#8b78b4';
const text=(x,y,label,size=10)=>`<text x="${x}" y="${y}" text-anchor="middle" fill="${ink}" font-size="${size}" font-family="system-ui,sans-serif">${label}</text>`;
const line=(x,y,a,b,color=green,width=2)=>`<path d="M${x} ${y}L${a} ${b}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
const box=(x,y,w=24,h=24,fill=pale)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${fill}" stroke="#a8b79c" stroke-width="1"/>`;
const dot=(x,y,r=5,fill=green)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const reveal=s=>`<g class="rpx-logic-reveal">${s}</g>`;
const panels=(before,after,label)=>`<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${text(54,16,'Antes')}${text(185,16,'Depois')}${before}<g class="rpx-logic-cue">${line(108,67,130,67)}<path d="M124 62l6 5-6 5" fill="none" stroke="${green}" stroke-width="2"/></g>${after}${text(120,131,label,9)}</svg>`;
const done='A solução completa e correta conclui a fase automaticamente. Use Checar para conferir sua tentativa.';
export const LOGIC_EXAMPLE_FIXTURES={
 divisa:{level:{rows:2,cols:2,letters:['A','B'],givens:['A','B','A',null],contacts:{AB:2}},before:{cells:['A','B','A',null],lastChanged:null},action:{type:'cell',index:3,tool:'B'},after:{cells:['A','B','A','B'],lastChanged:3}},
 pulso:{level:{rows:1,cols:5,quotas:[1,0,1,0,1],givens:{}},before:{cells:[1,0,1,0,null]},action:{type:'cell',index:4,tool:'mark'},after:{cells:[1,0,1,0,1]}},
 foz:{level:{width:2,height:2,root:3,channels:[[0,1],[1,3],[2,3]],clues:{0:2,3:0}},before:{arrows:[1,-1,3,-1]},action:{type:'link',from:1,to:3},after:{arrows:[1,3,3,-1]}},
 refugio:{level:{rows:1,cols:3,givens:[0,null,0],markers:[{index:0,label:1},{index:2,label:2}]},before:{cells:[0,null,0],lastChanged:null},action:{type:'cell',index:1,tool:'wall'},after:{cells:[0,1,0],lastChanged:1}},
 mirante:{level:{rows:1,cols:3,inventory:{circle:1,triangle:0},observers:{left:[1],right:[1],top:[null,null,null],bottom:[null,null,null]}},before:{cells:[0,null,0]},action:{type:'cell',index:1,tool:'circle'},after:{cells:[0,1,0]}},
 renovo:{level:{width:2,height:2,pieces:{0:'S',1:'B',3:'F'}},before:{links:[[0,1]],selected:null},action:{type:'link',from:1,to:3},after:{links:[[0,1],[1,3]],selected:null}}
};
function territories(x,after){return ['A','B','A',after?'B':'·'].map((s,i)=>box(x+i%2*26,37+Math.floor(i/2)*26,26,26,i%2? '#ece7f3':pale)+(i===3&&after?reveal(text(x+39,80,s,13)):text(x+i%2*26+13,54+Math.floor(i/2)*26,s,13))).join('')+line(x+26,37,x+26,63,gold,3)+(after?reveal(line(x+26,63,x+26,89,gold,3)):'')+text(x+26,107,after?'A–B: 2 lados':'A–B: 1 lado',9);}
function beats(x,after){return [1,0,1,0,after?1:null].map((s,i)=>text(x+i*17+8,43,[1,0,1,0,1][i],8)+box(x+i*17,51,17,25)+ (s===1?(i===4?reveal(dot(x+i*17+8,63,4)):dot(x+i*17+8,63,4)):text(x+i*17+8,67,s===0?'×':'·',11))).join('')+text(x+42,95,after?'1 → 3 → 5':'Cotas acima',9)+(after?text(x+42,109,'intervalos: 2 e 2',9):'');}
function river(x,after){return line(x,41,x+45,41,'#a8b79c')+line(x+45,41,x+45,89,'#a8b79c')+line(x,89,x+45,89,'#a8b79c')+text(x+22,44,'→',17)+text(x+22,92,'→',17)+(after?reveal(text(x+45,70,'↓',17)):'')+[[0,0,'2'],[45,0,''],[0,48,''],[45,48,'0']].map(([a,b,s])=>dot(x+a,41+b,10,s==='0'?gold:pale)+text(x+a,45+b,s,11)).join('')+text(x+22,110,after?'2 trechos até 0':'Falta uma seta',9);}
function shelter(x,after){return [0,1,2].map(i=>box(x+i*25,48,25,30,i===1&&after?'#d6ddce':pale)+(i===1?(after?reveal(line(x+28,74,x+43,52,green,2)+line(x+33,76,x+47,56,green,2)):text(x+37,67,'·',14)):text(x+i*25+12,67,i===0?'①':'②',15))).join('')+text(x+37,103,after?'2 regiões distintas':'Marcos livres',9);}
function lookout(x,after){return [0,1,2].map(i=>box(x+i*21,51,21,25)+(i!==1?text(x+i*21+10,68,'×',11):after?reveal(dot(x+31,63,6)):text(x+31,68,'·',13))).join('')+text(x-7,67,'○',12)+text(x+70,67,'○',12)+line(x-7,43,x+23,43,gold,1)+line(x+70,43,x+40,43,gold,1)+text(x+9,46,'→',11)+text(x+52,46,'←',11)+text(x+31,98,after?'2 testemunhas':'Estoque: 1 ○, 0 △',9);}
function trio(x,after){return line(x,43,x+44,43)+(after?reveal(line(x+44,43,x+44,89)):'')+dot(x,43,7)+`<path d="M${x+44} 34l9 9-9 9-9-9Z" fill="${purple}"/>`+`<path d="M${x+36} 97Q${x+31} 79 ${x+52} 81Q${x+57} 99 ${x+36} 97Z" fill="${green}"/>`+text(x,28,'semente',8)+text(x+44,28,'botão',8)+text(x+44,111,'folha',8)+(after?reveal(`<path d="M${x+35} 43v9h9" fill="none" stroke="${gold}" stroke-width="1.5"/>`):'');}
export const LOGIC_RULE_EXAMPLES={
 divisa:{steps:[
 'Escolha uma letra e toque em uma casa, ou use Alternar. Preencha todas as casas e preserve as letras fixas, indicadas por pinos.',
 'Todas as casas de cada letra devem formar um único território ligado pelos lados. Não há exigência de área nem de formato.',
 'Cada par de territórios deve compartilhar exatamente o número de lados unitários do painel, inclusive quando a meta é zero. Diagonais e borda externa não contam.',done],
 svg:panels(territories(28,false),territories(158,true),'Complete B: a fronteira passa a ter 2 lados.'),description:'Miniatura: A ocupa a coluna esquerda e B a direita. Ao completar B embaixo, os dois territórios conectados compartilham dois lados.'},
 pulso:{steps:[
 'Coloque exatamente três batidas em cada linha. Os intervalos entre a primeira e a segunda e entre a segunda e a terceira precisam ser iguais; distância 1 também vale.',
 'O número acima de cada coluna indica sua quantidade exata de batidas. Os intervalos podem ser diferentes de uma linha para outra.',
 'Preserve as pistas com pino. Escolha Batida ou Vazia e toque nas casas, ou use Alternar. Marque todos os vazios com ×: uma casa indecisa não é um vazio confirmado.',done],
 svg:panels(beats(12,false),beats(143,true),'Três batidas nas colunas 1, 3 e 5.'),description:'Miniatura de uma linha: marcar a quinta casa completa três batidas com distâncias 2 e 2. Os vazios estão confirmados e todas as cotas conferem.'},
 foz:{steps:[
 'Em cada ponto, exceto na foz 0, coloque uma única seta para um vizinho ligado por um canal desenhado. Clique para alternar a seta ou escolha uma direção; a foz fica fixa.',
 'Seguindo as setas, todos os pontos precisam chegar à foz, sem ciclos. Caminhos podem se juntar; não é necessário usar todos os canais.',
 'Cada número indica a distância exata daquele ponto até a foz. Conte os trechos percorridos, não os pontos; um trecho entre vizinhos vale 1.',done],
 svg:panels(river(30,false),river(161,true),'Da pista 2 à foz 0: direita, depois baixo.'),description:'A nova seta para baixo completa a rota de dois trechos da pista 2 até a foz 0. O ponto inferior esquerdo também chega à mesma foz.'},
 refugio:{steps:[
 'Escolha Livre ou Barreira e toque nas casas, ou use Alternar. Decida todas as casas sem alterar as pistas com pino; os marcos são sempre livres.',
 'Cada região de casas livres conectadas pelos lados deve conter exatamente um marco. Os números identificam os marcos, não o tamanho das regiões; diagonais não conectam.',
 'Cada casa de barreira deve tocar pelos lados exatamente duas regiões livres diferentes. Várias casas da mesma região contam uma vez; o exterior não conta. As barreiras não precisam estar conectadas.',done],
 svg:panels(shelter(17,false),shelter(148,true),'Uma barreira separa os dois marcos.'),description:'A casa central vira barreira. Ela toca exatamente duas regiões livres distintas, cada uma com seu marco. O exterior não é contado.'},
 mirante:{steps:[
 'Escolha círculo, triângulo ou vazio e toque nas casas. Use exatamente o estoque indicado, com no máximo uma peça por casa, e confirme todos os vazios com ×.',
 'Cada placa âmbar é um observador fixo: a primeira peça na direção da seta deve ter a forma indicada. Vazios deixam a visão passar; a primeira peça a bloqueia. Não há visão diagonal, e uma direção toda vazia não satisfaz a placa.',
 'Cada peça precisa ser vista por pelo menos dois observadores. Observadores em lados opostos contam separadamente; uma borda sem placa não dá informação e não conta como testemunha.',done],
 svg:panels(lookout(23,false),lookout(153,true),'O círculo é visto pelos dois lados.'),description:'Estoque de um círculo e nenhum triângulo. A peça central é a primeira vista por dois observadores opostos; os dois vazios deixam a visão passar.'},
 renovo:{steps:[
 'Clique em duas peças alinhadas para ligá-las. Cada botão (losango) deve se ligar a uma semente (círculo) e a uma folha. Use todas as peças em um único trio cada.',
 'Os dois trechos de cada botão devem formar um ângulo reto: um horizontal e outro vertical. Cada trecho termina na primeira peça encontrada; pode atravessar casas vazias, mas nunca outra peça.',
 'As ligações não podem cruzar nem se sobrepor. Só os dois trechos do mesmo trio podem se encontrar, em seu botão. Não é preciso cobrir as casas vazias.',
 'Repita uma ligação para removê-la; toque de novo na peça selecionada para cancelar, ou use Limpar peça para retirar seus trechos. '+done],
 svg:panels(trio(29,false),trio(160,true),'Semente → botão → folha: uma curva de 90°.'),description:'A ligação vertical do botão à folha completa o trio. Ela encontra a ligação horizontal da semente somente no botão e forma um ângulo reto.'}
};

// Instructional examples only. Engine-backed fixtures are in rules-versus-examples.test.mjs.
const ink='#304c38', green='#486c4d', pale='#e6eedb', gold='#d6a53a', purple='#8b78b4';
const text=(x,y,s,size=10)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-family="system-ui,sans-serif" fill="${ink}">${s}</text>`;
const box=(x,y,w=20,h=20,fill='#fafbf7')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${fill}" stroke="#a8b79c" stroke-width=".8"/>`;
const line=(x,y,a,b,color=green,width=2)=>`<path d="M${x} ${y}L${a} ${b}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round"/>`;
const dot=(x,y,r=4,color=green)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
const move=(s,x=0,y=-12)=>`<g class="rpx-versus-move" style="--rpx-from-x:${x}px;--rpx-from-y:${y}px">${s}</g>`;
const panels=(before,after,caption)=>`<svg viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${text(55,15,'Antes')}${text(185,15,'Depois')}${before}<g class="rpd-action">${line(108,66,130,66)}<path d="M124 61l6 5-6 5" fill="none" stroke="${green}" stroke-width="2"/></g><g class="rpd-result">${after}</g>${text(120,131,caption,9)}</svg>`;
const loom=(x,after)=>Array.from({length:9},(_,i)=>dot(x+i%3*28,34+Math.floor(i/3)*28,3,'#a8b79c')).join('')+(after?move(line(x,62,x+28,62,green,3)+line(x,62,x,34,gold,3),0,0)+dot(x,62,4)+dot(x+28,62,4):'')+text(x+28,109,after?'2 fios, 1 presilha':'Recorte A1–C3',8);
const convoy=(x,after)=>[0,1,2,3].map(i=>box(x+i*21,47,21,27)).join('')+(after?move(dot(x+31.5,60,7,gold)+text(x+31.5,63,'◆',7)+dot(x+52.5,60,7)+text(x+52.5,63,'●',7),-21,0):dot(x+10.5,60,7,gold)+text(x+10.5,63,'◆',7)+dot(x+31.5,60,7)+text(x+31.5,63,'●',7))+text(x+42,96,after?'fila inteira avança':'barco verde →',9);
// Corner order is NW, NE, SE, SW, exactly as in MOSAICO's engine.
const corners=[[0,0,1,1],[1,0,0,1],[1,1,0,0],[0,1,1,0]];
const tile=(x,y,orientation)=>box(x,y,30,30)+corners[orientation].map((c,i)=>dot(x+[7,23,23,7][i],y+[7,7,23,23][i],4,c===0?green:gold)).join('');
const mosaic=(x,after)=>tile(x,32,2)+tile(x+32,32,2)+tile(x,64,0)+(after?move(tile(x+32,64,1),0,18)+dot(x+31,63,6,pale)+text(x+31,66,'●',8):box(x+32,64,30,30))+text(x+31,112,after?'3 verdes: +1 Verde':'Falta o 4º azulejo',8);
const fruit=(x,y,label,color)=>dot(x,y,9,color)+text(x,y+3,label,8);
const estaloArrows=['→','↓','←','↓','↑','→','↓','←','→','↑','←','↓','↑','→','↑','←'];
const chain=[0,1,5,6,10,9];
// Cada casa aberta aparece na ordem real do pulso. O número mostra o percurso.
const pods = (x, after) => Array.from({ length: 16 }, (_, i) => {
 const cx = x + i % 4 * 19, cy = 29 + Math.floor(i / 4) * 19;
 const order = chain.indexOf(i);
 const closed = dot(cx + 9.5, cy + 9.5, 8, i % 4 < 2 ? green : gold)
  + `<text x="${cx + 9.5}" y="${cy + 13}" text-anchor="middle" font-size="11" style="fill:${i % 4 < 2 ? '#fff' : ink}">${estaloArrows[i]}</text>`;
 const opened = after && order >= 0
  ? `<g class="rp-chain-step rp-chain-step-${order}">${box(cx, cy, 19, 19, pale)}${text(cx + 9.5, cy + 13, String(order + 1), 10)}</g>` : '';
 return box(cx, cy, 19, 19) + closed + opened;
}).join('') + (after
 ? `<g class="rp-chain-score">${text(x + 38, 117, 'Verde +4 · Âmbar +2', 8)}</g>`
 : text(x + 38, 117, 'Abra A1 sem girar', 8));

const atlas=(x,after)=>Array.from({length:after?30:36},(_,i)=>box(x+i%6*12,29+Math.floor(i/6)*12,12,12,after&&i<6?pale:'#fafbf7')+(after&&i<6?text(x+i*12+6,37,'2',7):'')).join('')+(after?move(dot(x+6,35,3),0,-12):dot(x+6,35,3))+text(x+36,113,after?'5 × 6 · área 36':'Selo A1; dobre norte',8);
const bells=['F','G','O','S','G','O','S','F','O','S','F','G','S','F','G','O'];
const bellGrid=(x,after)=>bells.map((s,i)=>box(x+i%4*19,28+Math.floor(i/4)*19,19,19,(after?i%4===1:Math.floor(i/4)===1)?pale:'#fafbf7')+text(x+i%4*19+9.5,41+Math.floor(i/4)*19,after&&i===5?'×':s,9)).join('')+text(x+38,116,after?'Âmbar: coluna B':'Verde: linha 2',8);
const rail=(x,after)=>line(x,58,x+69,58)+[0,1,2,3].map(i=>line(x+i*23,54,x+i*23,62,'#a8b79c',1)+text(x+i*23,77,String(i+1),8)).join('')+(after?move(dot(x+23,58,9,purple)+text(x+23,61,'2',9),-23,0):dot(x,58,9,purple)+text(x,61,'2',9))+text(x+34.5,36,'Peso D2',10)+text(x+34.5,103,after?'Δ = 12 − 10 = +2':'Δ = 10 − 10 = 0',9);

export const VERSUS_RULE_EXAMPLES={
 enlace:{steps:[
 'No tear 5 × 5, Verde liga a margem esquerda à direita; Âmbar liga cima a baixo. Os cinco pinos de entrada de cada cor já estão acesos. Verde começa e os turnos se alternam.',
 'Coloque dois fios perpendiculares no mesmo pino: um verde e um âmbar, em trechos vazios. Escolha qual braço recebe cada cor. A presilha pode ficar isolada; reta e diagonal não valem. Fios colocados não mudam nem saem.',
 'Os dois fios entram juntos. Cada rede acende os pinos alcançáveis desde suas entradas por fios da mesma cor. As cores podem compartilhar pinos, sem se misturar. Quem atravessar vence, mesmo com o lance do rival; duas travessias simultâneas empatam.',
 'Sem travessia e sem espaço para outro cotovelo, vence a rede com mais pinos acesos; igualdade empata. Não há passe voluntário. São no máximo 20 presilhas.'
 ],svg:panels(loom(26,false),loom(156,true),'A2–B2 verde; A2–A1 âmbar.'),description:'Recorte do tear: uma presilha em A2 adiciona os fios A2–B2 verde e A2–A1 âmbar. B2 se acende para Verde; as redes continuam independentes.'},
 vazante:{steps:[
 'Verde começa em A1, C1 e E1; Âmbar, em A5, C5 e E5. Na grade 5 × 5, alterne turnos e mova um barco seu uma casa para um destino vazio, na horizontal ou vertical. Não há salto, diagonal ou empurrão.',
 'Atrás da origem, na direção oposta à remada, todos os barcos consecutivos formam uma fila, de qualquer cor. O barco ativo e a fila inteira avançam juntos uma casa. Uma casa vazia ou a borda encerra a fila; barcos ao lado ou à frente não são puxados.',
 'Ao entrar na margem oposta, o barco sai e marca uma entrega para seu dono: Verde na linha 5, Âmbar na linha 1. Quem completar duas entregas vence. Voltar à própria margem não pontua.',
 'Só passa quem não tem remada legal. Há empate com dois passes seguidos, a terceira ocorrência da mesma posição com o mesmo jogador da vez e entregas, ou 80 turnos sem vencedor. Uma segunda entrega no turno 80 ainda vence.'
 ],svg:panels(convoy(13,false),convoy(143,true),'Recorte da linha 3: B3 → C3 puxa A3 → B3.'),description:'Exemplo local: Âmbar em A3 e Verde em B3. Verde rema para C3 vazia; ambos se deslocam para a direita, sem entrega.'},
 mosaico:{steps:[
 'O painel 5 × 5 começa vazio. Verde começa; a cada turno escolha uma das quatro orientações de um azulejo comum e coloque-o em qualquer casa vazia. Cada peça tem dois cantos verdes adjacentes e dois âmbar adjacentes.',
 'Não é preciso encostar nem combinar bordas. Depois de colocado, o azulejo não sai, não se move e não gira. Os azulejos são compartilhados; apenas os selos têm dono.',
 'Cada uma das 16 junções reúne os quatro cantos voltados para o centro de um bloco 2 × 2. Com o bloco completo, 3 ou 4 cantos da mesma cor dão 1 ponto a essa cor; 2–2 não pontua. Quatro cantos não dão bônus.',
 'Uma colocação pode concluir vários selos e pontuar para ambas as equipes, independentemente de quem jogou. Cada selo conta uma vez. Não há passe: após os 25 azulejos, vence quem tem mais selos; igualdade empata.'
 ],svg:panels(mosaic(24,false),mosaic(154,true),'Complete a junção; conte só os cantos internos.'),description:'Bloco A1–B2: orientações 2, 2, 0 e, por último, 1. Os cantos internos são verde, verde, verde e âmbar. O selo vale um ponto para Verde.'},
 quinhao:{steps:[
 'Há 24 cestos em anel: duas castanhas-do-pará, duas pitangas e duas jabuticabas, repetidas quatro vezes. Verde propõe primeiro. Escolha três cestos consecutivos entre os que ainda existem; o último e o primeiro são vizinhos, mesmo com lacunas.',
 'O adversário escolhe um dos três e recebe esse fruto; você recebe os outros dois. Essa resposta completa o turno. Retire os três cestos e una os vizinhos restantes; quem escolheu será o próximo proponente. Não há passe nem troca.',
 'Após oito ofertas e oito respostas, cada pessoa terá 12 frutos. Forme primeiro todos os trios de uma castanha-do-pará, uma pitanga e uma jabuticaba: cada trio vale 5 pontos.',
 'Nas sobras, forme todos os pares possíveis de tipos diferentes: cada par vale 2. Nenhum fruto conta duas vezes; frutos isolados não pontuam. Vence o maior total; igualdade é empate.'
 ],svg:panels(fruit(27,57,'C',gold)+fruit(55,57,'C',gold)+fruit(83,57,'P',purple)+text(55,90,'Oferta: cestos 1, 2, 3',8),move(fruit(164,51,'C',gold)+fruit(190,51,'C',gold),0,-12)+text(179,73,'Verde recebe dois',8)+move(fruit(179,94,'P',purple),0,-12)+text(179,114,'Âmbar escolhe P',8),'C = castanha-do-pará · P = pitanga.'),description:'Abertura: Verde oferece cestos 1, 2 e 3. Âmbar escolhe a pitanga do cesto 3; Verde recebe duas castanhas-do-pará. Os cestos saem e Âmbar passa a propor.'},
 estalo:{steps:[
 'No tabuleiro 4 × 4, Verde tem as oito vagens das colunas A e B; Âmbar, as de C e D. Verde começa. Escolha uma vagem fechada sua e mantenha sua seta ou gire-a exatamente 90° para um dos lados, nunca 180°.',
 'A origem abre e pontua para seu dono. O pulso segue a seta para a casa vizinha: se a vagem estiver fechada, ela abre, pontua para o próprio dono e redireciona o pulso pela seta dela. Só a origem pode girar.',
 'A cadeia para na borda ou numa casa já aberta. Não salta vazios nem continua por cascas; até um circuito para ao reencontrar uma casa aberta. Não há captura, mudança de dono ou reposição.',
 'Resolva a cadeia inteira antes de conferir o resultado: quem abrir suas oito vagens vence; completar as duas equipes na mesma cadeia empata. Se ninguém venceu, alterne a vez. Não há passe e cada vagem pontua uma única vez.'
 ],svg:panels(pods(17,false),pods(147,true),'A1 → B1 → B2 → C2 → C3 → B3.'),description:'Abertura oficial: abrir A1 sem girar percorre A1, B1, B2, C2, C3 e B3. São quatro pontos verdes e dois âmbar; a seta de B3 encontra B2 já aberta e encerra a cadeia.'},
 dobra:{steps:[
 'O mapa começa com 6 × 6 painéis, cada um com área 1 e sem selos. Cada equipe tem quatro selos; Verde começa. Em cada turno coloque um selo seu em qualquer pilha, mesmo com selos rivais, e depois dobre uma borda inteira para dentro.',
 'Norte ou sul sobrepõem a linha externa à vizinha; oeste ou leste fazem o mesmo com uma coluna. Some áreas e todos os selos das duas pilhas. Nada fica oculto ou é descartado; não pode dobrar só parte da borda nem desdobrar.',
 'Só dobre linhas enquanto houver mais de duas; colunas, enquanto houver mais de duas. As coordenadas são recontadas após cada dobra. São oito turnos até 2 × 2, quatro por equipe, sem passe. A área total continua 36.',
 'No atlas final, a maioria de selos em cada distrito dá toda a área dele à equipe. Selos empatados, inclusive 0–0, deixam a área neutra. Some as áreas controladas: o maior total vence e igualdade empata.'
 ],svg:panels(atlas(19,false),atlas(149,true),'A primeira linha soma suas áreas à segunda.'),description:'Abertura: coloque um selo verde em A1 e dobre o norte. O mapa vira 5 × 6; a nova primeira linha tem área 2 por pilha, e A1 conserva o selo. A área total permanece 36.'},
 acorde:{steps:[
 'Na grade 4 × 4 há quatro sinos de cada símbolo: folha, gota, onda e sol. Verde começa recolhendo qualquer sino da linha 2. Verde sempre recolhe na horizontal; Âmbar, na vertical. Os sinos são públicos e não há reposição.',
 'Recolha um sino presente no seu eixo e deixe o carrinho nessa casa vazia. Pode atravessar vazios e outros sinos sem recolhê-los. Sua escolha determina o eixo do rival: a coluna para Âmbar ou a linha para Verde.',
 'Cada símbolo com pelo menos dois sinos na sua coleção vale um par; três ou quatro cópias continuam valendo só um par. Quem completar pares de três símbolos diferentes vence imediatamente.',
 'Sem sino no seu eixo, passe obrigatoriamente e deixe o carrinho parado. Dois passes seguidos ou o esgotamento dos 16 sinos encerram a partida: vence quem tiver mais pares diferentes; igualdade empata. Na revanche, troquem as pessoas que controlam as cores e os eixos.'
 ],svg:panels(bellGrid(17,false),bellGrid(147,true),'Recolha O em B2: o rival joga na coluna B.'),description:'Abertura: Verde recolhe a onda de B2, ganha um sino e deixa o carrinho em B2. Âmbar pode escolher B1, B3 ou B4. F = folha, G = gota, O = onda, S = sol.'},
 lastro:{steps:[
 'Os seis pesos são compartilhados, um por trilho: E1, E2 e E7 à esquerda; D2, D3 e D5 à direita. Todos começam na distância 1, com carga 10 de cada lado. Cada trilho tem marcas de 1 a 4, contadas do centro para fora.',
 'Avance um peso uma ou duas marcas para fora, sem ultrapassar 4. Calcule Δ = carga direita − carga esquerda, somando valor × distância de cada peso. O desvio final deve ficar entre −4 e +4, inclusive. Não há recuo, troca de trilho ou passe.',
 'Escolha peso e destino, confira a prévia e confirme. Passe a vez: quem não tiver nenhum ajuste legal perde a rodada. Um peso travado não basta se outro ainda puder avançar. Cada rodada tem no máximo 18 ajustes.',
 'Joguem duas rodadas com o mesmo aparelho inicial: Jogador 1 começa a primeira; Jogador 2, a segunda. Reponha os pesos na marca 1 entre elas. Duas vitórias vencem o duelo; uma para cada pessoa dá empate, sem desempate automático.'
 ],svg:panels(rail(20,false),rail(150,true),'D2: marca 1 → 2. O desvio +2 é permitido.'),description:'Na abertura, avance o peso compartilhado D2 da marca 1 para a 2. A carga direita passa de 10 a 12, a esquerda continua 10; Δ = +2 está no intervalo permitido.'}
};

// Textos de orientação baseados nas regras atuais dos jogos.
// Os objetivos descrevem propostas de prática, não benefícios comprovados.
export const GAME_INFO = {
  light: {
    name: 'Reflexos',
    description: 'Um puzzle de luz e espelhos em que você constrói percursos para raios coloridos.',
    summary: 'Gire espelhos para levar cada raio ao alvo da mesma cor e símbolo, sem encostar nas trajetórias de outras cores.',
    rules: [
      'Gire os espelhos para guiar a luz. As posições dos espelhos e das paredes são fixas; paredes e bordas interrompem os raios.',
      'Cada raio precisa alcançar o alvo da mesma cor e símbolo. Trajetórias de cores diferentes não podem se cruzar nem se tocar, mesmo em disparos separados.',
      'Quando houver portais, os que têm a mesma letra formam um par. A luz sai mantendo a direção; portais seletivos bloqueiam cores não permitidas. O salto entre portais não conta como trajetória de luz.',
      'Clique em cada fonte para disparar ou use Confirmar todos. A tentativa só termina após todos os disparos; mudar um ajuste limpa os raios para uma nova tentativa.'
    ],
    purpose: 'Praticar orientação espacial, leitura de ângulos e planejamento de trajetórias. Observar uma tentativa e ajustar os espelhos convida a formular e revisar hipóteses.',
    why: 'A proposta pedagógica é tornar a reflexão da luz explorável: pequenas mudanças de direção produzem efeitos visíveis, e os percursos precisam funcionar em conjunto.'
  },
  cut: {
    name: 'Corte certo',
    description: 'Um puzzle de estimativa de áreas em que uma linha ou curva divide uma figura.',
    summary: 'Ajuste a linha ou curva até que o lado roxo tenha a porcentagem pedida da área útil da figura. Espaços vazios não contam.',
    rules: [
      'Observe a meta e ajuste a linha ou curva para deixar essa porcentagem da área útil no lado roxo.',
      'No Desafio básico, mova o corte apenas na direção indicada pela seta. A aba Controles da curva oferece outros ajustes, sem mudar a família de curva da fase.',
      'Conte somente a parte preenchida da figura: buracos e recortes vazios não entram na área, mesmo quando o corte passa por eles.',
      'Confirme sua resposta. É aceito um resultado até 3 pontos percentuais acima ou abaixo da meta, incluindo os limites.'
    ],
    purpose: 'Praticar estimativa de áreas, proporções e porcentagens, comparando a impressão visual com a medida apresentada pelo jogo.',
    why: 'A proposta pedagógica é explorar a diferença entre tamanho aparente e área: formas, curvas e vazios convidam a testar estimativas e refinar o raciocínio proporcional.'
  },
  elo: {
    name: 'ELO',
    description: 'Um puzzle de lógica em que pontos de regiões diferentes formam um circuito fechado.',
    summary: 'Coloque um ponto por região para formar um único circuito. As ligações são automáticas; observe também as pistas especiais de cada fase.',
    rules: [
      'Coloque exatamente um ponto em cada região, mantendo os pontos fixos. Cada ponto se liga automaticamente ao primeiro ponto encontrado em cada direção horizontal ou vertical; fronteiras e anotações X não bloqueiam essas ligações.',
      'Todos os pontos devem formar um único circuito fechado, com exatamente duas ligações por ponto e sem cruzamentos fora dos pontos. Trechos retos são permitidos e não é preciso ocupar todas as casas.',
      'Nas fases com pistas especiais, respeite curvas ou retas obrigatórias, contagens exatas de pontos por linha ou coluna e a soma indicada dos comprimentos das duas ligações de uma região.',
      'Passagens marcadas ficam sem ponto e devem ser atravessadas pelo interior de uma ligação; trechos vedados não podem ser percorridos. Nos grupos de escolha, atravesse exatamente uma das passagens, deixando as demais sem travessia.',
      'Outras pistas exigem ligação direta entre regiões, ordem dos marcos no circuito ou número exato de travessias de uma linha de referência. A ordem aceita os dois sentidos e pode ter outras regiões entre os marcos. Confira as pistas da fase e confirme a resposta.'
    ],
    purpose: 'Praticar dedução lógica, visão espacial e articulação entre condições locais e globais, acompanhando como mover um ponto altera o circuito inteiro.',
    why: 'A proposta pedagógica é transformar conexões simples em um problema de planejamento: cada escolha precisa respeitar sua região e, ao mesmo tempo, contribuir para uma estrutura única.'
  },
  prumo: {
    name: 'PRUMO',
    description: 'Um puzzle de equilíbrio em que você desenha peças ao redor de seus apoios.',
    summary: 'Divida a grade em peças conectadas e equilibradas. O centro de massa de cada peça deve coincidir com seu apoio.',
    rules: [
      'Pinte todas as casas, sem sobreposição, formando uma peça para cada apoio. As casas de uma peça devem estar conectadas pelos lados.',
      'Cada peça contém seu próprio apoio. As casas que tocam um apoio pertencem à sua peça; se o apoio fica entre duas casas, ambas precisam fazer parte dela.',
      'Todas as casas têm a mesma massa. O centro de massa de cada peça deve coincidir exatamente com o apoio, tanto na horizontal quanto na vertical.',
      'Considere a quantidade de casas e suas distâncias ao apoio: formas assimétricas também podem se equilibrar. Confirme quando toda a grade estiver preenchida.'
    ],
    purpose: 'Praticar raciocínio espacial e explorar centro de massa, equilíbrio e compensação entre quantidade e distância.',
    why: 'A proposta pedagógica é permitir que o equilíbrio seja investigado com formas: uma peça não precisa ser simétrica para compensar seus dois lados.'
  },
  pacto: {
    name: 'PACTO',
    description: 'Um puzzle de dedução em que quatro símbolos precisam formar parcerias numa grade.',
    summary: 'Complete a grade com quatro símbolos: dois de cada por linha e coluna. Cada casa deve tocar exatamente uma casa igual pelos lados.',
    rules: [
      'Complete a grade 8 × 8 com círculo, triângulo, quadrado e losango, sem alterar as pistas fixas.',
      'Cada linha e cada coluna deve conter exatamente dois de cada símbolo.',
      'Cada casa deve ter exatamente um vizinho igual pelos lados. Diagonais não contam: os símbolos formam duplas, nunca trios ou grupos maiores.',
      'Cruze as contagens com as possibilidades de parceria. Marcações a lápis são apenas anotações; a vitória é reconhecida automaticamente quando a grade está completa e correta.'
    ],
    purpose: 'Praticar contagem, exclusão de possibilidades e dedução, combinando uma regra de vizinhança com restrições de linhas e colunas.',
    why: 'A proposta pedagógica é mostrar como regras simples se complementam: uma dupla possível num canto pode mudar as opções de toda uma linha ou coluna.'
  },
  sintonia: {
    name: 'SINTONIA',
    description: 'Um puzzle de coordenação em que um único comando move vários animais, cada um no seu tabuleiro.',
    summary: 'Leve todos aos seus destinos na mesma configuração. Use paredes e mecanismos para combinar os caminhos.',
    rules: [
      'Use as setas, WASD ou o controle direcional. Todos recebem o mesmo comando; cada animal tenta andar uma casa. Quem encontra um bloqueio permanece parado.',
      'Todos precisam ocupar seus destinos ao final de um comando. Chegar antes não prende ninguém: um animal pode sair do destino e voltar depois.',
      'Observe os símbolos das placas, cancelas e objetos. Uma passagem aberta no início do comando pode ser atravessada enquanto outro animal sai da placa que a mantinha aberta.',
      'As mecânicas aparecem aos poucos, com explicações na própria fase. Desfaça e reinicie livremente; não há cronômetro, vidas ou limite obrigatório de movimentos.',
      'Explore 500 desafios em 20 capítulos ou escolha o Modo Sem Parar para continuar com novas combinações. As dicas consideram a configuração atual dos tabuleiros.'
    ],
    purpose: 'Praticar planejamento, antecipação de consequências e raciocínio espacial, articulando objetivos individuais com uma condição conjunta.',
    why: 'Cada seta pode ajudar um animal e afastar outro do destino. Experimentar paredes, apoios e sequências convida a pensar nas relações entre os caminhos.'
  },
  repasse: {
    name: 'REPASSE',
    description: 'Um puzzle de planejamento em que retirar uma peça transforma os valores e os caminhos das próximas.',
    summary: 'Retire todas as peças e complete exatamente as metas das bordas. Decida quem precisa receber, esperar ou sair para abrir passagem.',
    rules: [
      'Clique ou toque em uma peça para retirá-la. Seu valor atual inteiro é enviado uma vez em cada direção indicada pelas setas; ele não é dividido.',
      'Cada repasse atravessa vazios e para na primeira peça presente. Quem recebe soma o valor e continua esperando sua vez, independentemente da orientação das próprias setas.',
      'Se não houver receptor, o valor chega à caixa correspondente na borda. Todas as caixas mostram acumulado / meta, inclusive as de meta zero.',
      'Você vence quando a grade estiver vazia e todas as metas forem exatas. Um excesso pode ser revisto com Desfazer; experimentar outra ordem faz parte do jogo.',
      'As setas e posições são fixas. Ao longo da campanha aparecem peças de uma seta, duas setas perpendiculares e quatro setas, sempre com a mesma regra de repasse.',
      'Use o mouse, toque ou navegue pelas peças com as setas do teclado e retire com Enter ou espaço. A prévia mostra os destinatários atuais. Explore 80 fases ou continue com desafios novos no Modo Sem Parar, sem cronômetro.'
    ],
    purpose: 'Praticar planejamento de ordem, antecipação de consequências e leitura de relações entre valores, receptores e metas.',
    why: 'Uma peça pode precisar receber primeiro e desaparecer depois para liberar um caminho. Comparar as metas com essas funções convida a formular, testar e revisar hipóteses.'
  },
  orbita: {
    name: 'ÓRBITA',
    description: 'Um puzzle de planejamento em que peças circulam por anéis conectados e precisam encontrar seus alvos ao mesmo tempo.',
    summary: 'Gire um anel para mover todas as suas peças juntas. Use as casas compartilhadas para preparar transferências e restaurar o que já estava certo.',
    rules: [
      'Escolha um anel e use as setas curvas para girar no sentido horário ou anti-horário. Cada giro avança uma casa, salvo quando o controle indicar um passo diferente.',
      'As casas e os alvos ficam no lugar. Todas as peças do anel escolhido se movem juntas; uma casa compartilhada pertence aos dois anéis, mas contém uma única peça.',
      'Leve uma peça ao encontro dos anéis e gire o outro anel para transferi-la. Peças que já estão corretas continuam podendo se mover e voltar depois.',
      'Complete todos os alvos simultaneamente. Símbolos iguais são equivalentes, e fichas neutras circulam normalmente pelas casas sem exigir um destino próprio.',
      'Mais adiante, alguns anéis avançam duas casas, engrenagens movem anéis juntos e sensores liberam comandos quando o símbolo indicado ocupa a casa marcada. Cada novidade é explicada na própria fase.',
      'Desfaça, refaça e reinicie livremente. Checar avalia sua configuração; movimentos de exploração não contam como erros. São 500 fases e desafios novos no Modo Sem Parar, sem cronômetro.'
    ],
    purpose: 'Praticar planejamento de sequências, orientação espacial e antecipação de efeitos sobre objetivos simultâneos, usando posições temporárias e movimentos reversíveis.',
    why: 'Um giro pode entregar uma peça e tirar outra do lugar. Preparar a chegada, escolher a ordem das transferências e restaurar regiões convida a pensar nas relações entre as partes do tabuleiro.'
  },
  desvio: {
    name: 'DESVIO',
    description: 'Um duelo de estratégia por turnos em que cada escolha limita as opções do adversário.',
    summary: 'Escolha uma casa e envie o adversário para a linha ou coluna indicada. Quem ficar sem jogada disponível perde.',
    rules: [
      'Na partida comum, a primeira escolha é livre. Depois, escolha uma casa disponível no destino indicado e confirme a jogada.',
      'Uma casa com ↔ envia o adversário para a mesma linha; uma casa com ↕ o envia para a mesma coluna.',
      'A casa escolhida é consumida e não pode ser usada de novo. Casas consumidas não bloqueiam o caminho: qualquer casa disponível na linha ou coluna obrigatória pode ser escolhida.',
      'Os jogadores alternam as escolhas. Quem não tiver jogada legal na sua vez perde. Há partidas locais, contra o bot e treino com análise.'
    ],
    purpose: 'Praticar antecipação, planejamento por turnos e comparação de alternativas, considerando não só a própria jogada, mas também as respostas do adversário.',
    why: 'A proposta pedagógica é explorar as consequências de uma decisão: cada escolha retira uma opção do tabuleiro e determina quais escolhas o outro jogador terá.'
  }
};

// BROTO is registered independently; the existing game descriptions are unchanged.
GAME_INFO.broto={
 name:'BROTO',
 description:'Plante sementes, complete estímulos e escolha quem floresce.',
 summary:'Você planta. Mas quem floresce? Um duelo local para duas pessoas: cada plantio pode completar flores suas ou do adversário.',
 rules:[
  'Plante uma semente em qualquer casa vazia do tabuleiro 4 × 4. Escolha a casa, observe a prévia e confirme a jogada.',
  'A semente nova estimula somente o primeiro broto encontrado em cada direção horizontal e vertical, atravessando casas vazias. Não há estímulos diagonais nem devolução de estímulos.',
  'Um broto floresce quando recebe os dois eixos: horizontal ↔ e vertical ↕. Repetir um eixo não substitui o outro. A flor vale um ponto para o dono da peça, mesmo quando o adversário a completa.',
  'Todas as peças atingidas são determinadas antes da colheita. A peça colhida sai do tabuleiro; a passagem aberta só vale em jogadas futuras. Colher não devolve sementes.',
  'Cada pessoa tem oito sementes por rodada. Depois dos dezesseis plantios, os brotos restantes não pontuam. O duelo tem duas rodadas, com iniciador alternado; vence quem somar mais flores. Totais iguais dão empate.'
 ],
 purpose:'Praticar antecipação e planejamento por turnos, acompanhando os efeitos imediatos de um plantio e as possibilidades que ele deixa para a próxima pessoa.',
 why:'A proposta é explorar decisões com consequências compartilhadas: uma semente pode preparar um broto próprio, completar uma flor adversária ou abrir passagem para uma jogada futura.'
};

// CERCO: conteúdo local, sem modificar as descrições dos jogos anteriores.
GAME_INFO.cerco={
 name:'CERCO',
 description:'Mova suas peças, feche caminhos e deixe o adversário sem saída.',
 summary:'Faça a última jogada: quem ficar sem movimentos na sua vez perde.',
 rules:[
  'Cada time controla três peças. Na preparação, escolha uma grade de 5 × 5 a 8 × 8, com sete mapas por tamanho. Escolha uma peça sua e mova exatamente uma casa para cima, baixo, esquerda ou direita, para um destino vazio e sem barreira.',
  'Selecione a peça, escolha um destino, observe a prévia e confirme. A casa de origem vira uma barreira neutra e permanente para os dois times; só a origem fica bloqueada.',
  'Não há diagonais, saltos, empurrões ou capturas. As seis peças permanecem no tabuleiro. Não é permitido passar a vez.',
  'Depois de cada jogada, confira o próximo time: se nenhuma de suas três peças puder se mover, ele perde. Uma peça presa não encerra o jogo enquanto outra do mesmo time tiver uma saída.',
  'O Verde começa a primeira partida. A revanche alterna o iniciador e mantém as equipes e os mascotes. Todos os mascotes têm exatamente os mesmos movimentos: a escolha é apenas visual.'
 ],
 purpose:'Praticar planejamento por turnos e leitura de caminhos, observando como a casa abandonada altera as opções de ambos os times.',
 why:'A proposta é tornar visíveis as consequências de uma decisão: mover uma peça também fecha uma passagem, e cada equipe precisa conservar alguma saída para sua próxima vez.'
};

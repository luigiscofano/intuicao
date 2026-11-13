import { VERSUS_GAME_INFO } from "./versus/info.mjs";
import { LOGIC_GAME_INFO } from "./logica/info.mjs";
// Textos de orientação baseados nas regras atuais dos jogos.
// Os objetivos descrevem propostas de prática, não benefícios comprovados.
export const GAME_INFO = {
  ...LOGIC_GAME_INFO,
  ...VERSUS_GAME_INFO,
  light: {
    name: "Reflexos",
    description:
      "Um puzzle de luz e espelhos em que você constrói percursos para raios coloridos.",
    summary:
      "Leve cada raio ao alvo da mesma cor e símbolo.",
    rules: [
      "Gire os espelhos. Eles mudam a direção da luz, mas não saem do lugar.",
      "Clique em uma fonte para disparar ou use Confirmar todos. Todos os raios precisam chegar aos seus alvos.",
      "Raios de cores diferentes não podem se cruzar nem se tocar, mesmo se forem disparados separadamente. Paredes e bordas interrompem a luz.",
      "Quando houver portais, a mesma letra indica entrada e saída. A luz sai na mesma direção. Alguns portais só aceitam certas cores; o salto entre eles não conta como caminho.",
      "A tentativa termina após todos os disparos. Ao mudar um ajuste, os raios são limpos para você tentar de novo.",
    ],
    purpose:
      "Praticar orientação espacial, leitura de ângulos e planejamento de trajetórias. Observar uma tentativa e ajustar os espelhos convida a formular e revisar hipóteses.",
    why: "A proposta pedagógica é tornar a reflexão da luz explorável: pequenas mudanças de direção produzem efeitos visíveis, e os percursos precisam funcionar em conjunto.",
  },
  cut: {
    name: "Corte certo",
    description:
      "Um puzzle de estimativa de áreas em que uma linha ou curva divide uma figura.",
    summary:
      "Deixe no lado roxo a porcentagem pedida. Por exemplo: 50% é metade da figura.",
    rules: [
      "Confira a meta. Mova a linha ou ajuste a curva para mudar o tamanho da parte roxa.",
      "Conte só a parte preenchida da figura. Buracos e espaços vazios não entram na conta.",
      "No Desafio básico, mova o corte na direção da seta. Use Controles da curva para os outros ajustes disponíveis, sem trocar o tipo de curva da fase.",
      "Confirme sua resposta. A margem aceita é de 3 pontos percentuais para mais ou para menos: uma meta de 50% aceita de 47% a 53%.",
    ],
    purpose:
      "Praticar estimativa de áreas, proporções e porcentagens, comparando a impressão visual com a medida apresentada pelo jogo.",
    why: "A proposta pedagógica é explorar a diferença entre tamanho aparente e área: formas, curvas e vazios convidam a testar estimativas e refinar o raciocínio proporcional.",
  },
  elo: {
    name: "ELO",
    description:
      "Um puzzle de lógica em que pontos de regiões diferentes formam um circuito fechado.",
    summary:
      "Coloque um ponto em cada região e forme um único caminho fechado.",
    rules: [
      "Coloque exatamente um ponto em cada região. Os pontos fixos não podem ser movidos.",
      "As ligações aparecem sozinhas: cada ponto se liga ao primeiro que encontra em cada direção horizontal ou vertical. Fronteiras e anotações X não bloqueiam as ligações.",
      "Cada ponto precisa ter duas ligações. Juntas, elas devem formar um único circuito, sem cruzamentos fora dos pontos. Trechos retos valem; não é preciso usar todas as casas.",
      "Algumas fases pedem curvas ou retas em pontos específicos, quantidades de pontos em linhas ou colunas, ou uma soma dos comprimentos das duas ligações de uma região.",
      "Uma passagem marcada precisa ser atravessada por uma ligação, sem colocar ponto nela. Trechos vedados não podem ser usados. Nos grupos de escolha, atravesse apenas uma das passagens.",
      "Outras pistas pedem ligação direta entre regiões, ordem dos marcos ou número de travessias de uma linha. A ordem pode ser lida nos dois sentidos e permite outras regiões entre os marcos. Confira as pistas da fase e confirme.",
    ],
    purpose:
      "Praticar dedução lógica, visão espacial e articulação entre condições locais e globais, acompanhando como mover um ponto altera o circuito inteiro.",
    why: "A proposta pedagógica é transformar conexões simples em um problema de planejamento: cada escolha precisa respeitar sua região e, ao mesmo tempo, contribuir para uma estrutura única.",
  },
  prumo: {
    name: "PRUMO",
    description:
      "Um puzzle de equilíbrio em que você desenha peças ao redor de seus apoios.",
    summary:
      "Pinte uma peça para cada apoio. Todas precisam se equilibrar sobre ele.",
    rules: [
      "Escolha um apoio e pinte sua peça. Preencha toda a grade, sem sobrepor peças. As casas da mesma peça se ligam pelos lados.",
      "O apoio pertence à sua peça. Se ele fica entre casas, todas as casas que o tocam entram nessa peça.",
      "Cada casa pesa o mesmo. O peso total precisa se equilibrar sobre o apoio, tanto da esquerda para a direita quanto de cima para baixo.",
      "Conte também a distância: uma casa mais longe pesa mais para aquele lado. A peça não precisa ser simétrica. Confirme quando terminar de pintar.",
    ],
    purpose:
      "Praticar raciocínio espacial e explorar centro de massa, equilíbrio e compensação entre quantidade e distância.",
    why: "A proposta pedagógica é permitir que o equilíbrio seja investigado com formas: uma peça não precisa ser simétrica para compensar seus dois lados.",
  },
  pacto: {
    name: "PACTO",
    description:
      "Um puzzle de dedução em que quatro símbolos precisam formar parcerias numa grade.",
    summary:
      "Forme duplas iguais e deixe dois de cada símbolo em toda linha e coluna.",
    rules: [
      "Preencha a grade com círculo, triângulo, quadrado e losango. Não altere as pistas fixas.",
      "Cada linha e cada coluna precisam ter exatamente dois de cada símbolo.",
      "Cada casa deve tocar exatamente uma casa com o mesmo símbolo pelos lados. Diagonais não contam; duplas valem, trios não.",
      "Use o lápis só para anotar possibilidades. Quando toda a grade estiver correta, o jogo reconhece a vitória automaticamente.",
    ],
    purpose:
      "Praticar contagem, exclusão de possibilidades e dedução, combinando uma regra de vizinhança com restrições de linhas e colunas.",
    why: "A proposta pedagógica é mostrar como regras simples se complementam: uma dupla possível num canto pode mudar as opções de toda uma linha ou coluna.",
  },
  sintonia: {
    name: "SINTONIA",
    description:
      "Um puzzle de coordenação em que um único comando move vários animais, cada um no seu tabuleiro.",
    summary:
      "Leve todos os animais aos seus destinos ao mesmo tempo.",
    rules: [
      "Use as setas, WASD ou o controle na tela. O mesmo comando faz todos tentarem andar uma casa.",
      "Quem encontra uma parede ou bloqueio fica parado; os outros podem avançar. Use isso para ajustar os caminhos.",
      "Todos precisam terminar o mesmo comando sobre seus destinos. Um animal que chegou pode sair e voltar depois.",
      "Placas, cancelas, interruptores, chaves e gelo aparecem aos poucos e têm explicações na fase. Uma passagem aberta no início do comando ainda pode ser atravessada enquanto outro animal sai da placa.",
      "Desfaça ou reinicie para experimentar. Não há cronômetro, vidas ou limite obrigatório de movimentos. As dicas consideram a posição atual dos animais.",
    ],
    purpose:
      "Praticar planejamento, antecipação de consequências e raciocínio espacial, articulando objetivos individuais com uma condição conjunta.",
    why: "Cada seta pode ajudar um animal e afastar outro do destino. Experimentar paredes, apoios e sequências convida a pensar nas relações entre os caminhos.",
  },
  repasse: {
    name: "REPASSE",
    description:
      "Um puzzle de planejamento em que retirar uma peça transforma os valores e os caminhos das próximas.",
    summary:
      "Retire todas as peças e faça cada caixa da borda receber o valor exato da meta.",
    rules: [
      "Toque em uma peça para retirá-la. O valor inteiro dela segue uma vez por cada seta, sem ser dividido.",
      "O valor atravessa casas vazias e soma na primeira peça que encontra. Essa peça espera sua vez com o novo valor; as setas dela não mudam o recebimento.",
      "Se não houver peça no caminho, o valor vai para a caixa da borda. Cada caixa mostra quanto já recebeu e quanto precisa receber, inclusive quando a meta é zero.",
      "Esvazie a grade com todas as metas exatas. Se passar de uma meta, use Desfazer e tente outra ordem.",
      "As posições e as setas são fixas. Você também pode selecionar peças com as setas do teclado e retirar com Enter ou espaço; a prévia mostra quem vai receber.",
    ],
    purpose:
      "Praticar planejamento de ordem, antecipação de consequências e leitura de relações entre valores, receptores e metas.",
    why: "Uma peça pode precisar receber primeiro e desaparecer depois para liberar um caminho. Comparar as metas com essas funções convida a formular, testar e revisar hipóteses.",
  },
  orbita: {
    name: "ÓRBITA",
    description:
      "Um puzzle de planejamento em que peças circulam por anéis conectados e precisam encontrar seus alvos ao mesmo tempo.",
    summary:
      "Gire um anel para mover todas as suas peças juntas. Use as casas compartilhadas para preparar transferências e restaurar o que já estava certo.",
    rules: [
      "Escolha um anel e use as setas curvas para girar no sentido horário ou anti-horário. Cada giro avança uma casa, salvo quando o controle indicar um passo diferente.",
      "As casas e os alvos ficam no lugar. Todas as peças do anel escolhido se movem juntas; uma casa compartilhada pertence aos dois anéis, mas contém uma única peça.",
      "Leve uma peça ao encontro dos anéis e gire o outro anel para transferi-la. Peças que já estão corretas continuam podendo se mover e voltar depois.",
      "Complete todos os alvos simultaneamente. Símbolos iguais são equivalentes, e fichas neutras circulam normalmente pelas casas sem exigir um destino próprio.",
      "Mais adiante, alguns anéis avançam duas casas, engrenagens movem anéis juntos e sensores liberam comandos quando o símbolo indicado ocupa a casa marcada. Cada novidade é explicada na própria fase.",
      "Desfaça, refaça e reinicie livremente. Checar avalia sua configuração; movimentos de exploração não contam como erros. São 500 fases e desafios novos no Modo Sem Parar, sem cronômetro.",
    ],
    purpose:
      "Praticar planejamento de sequências, orientação espacial e antecipação de efeitos sobre objetivos simultâneos, usando posições temporárias e movimentos reversíveis.",
    why: "Um giro pode entregar uma peça e tirar outra do lugar. Preparar a chegada, escolher a ordem das transferências e restaurar regiões convida a pensar nas relações entre as partes do tabuleiro.",
  },
  desvio: {
    name: "DESVIO",
    description:
      "Um duelo de estratégia por turnos em que cada escolha limita as opções do adversário.",
    summary:
      "Deixe o adversário sem casa disponível para escolher.",
    rules: [
      "Na partida comum, a primeira escolha é livre. Depois, escolha uma casa disponível na linha ou coluna destacada e confirme.",
      "A seta ↔ manda o adversário para a mesma linha. A seta ↕ manda para a mesma coluna.",
      "A casa escolhida sai das opções. Casas usadas não bloqueiam passagem: você pode escolher qualquer casa disponível na linha ou coluna indicada.",
      "Os jogadores alternam as escolhas. Quem chega à sua vez sem opção perde.",
    ],
    purpose:
      "Praticar antecipação, planejamento por turnos e comparação de alternativas, considerando não só a própria jogada, mas também as respostas do adversário.",
    why: "A proposta pedagógica é explorar as consequências de uma decisão: cada escolha retira uma opção do tabuleiro e determina quais escolhas o outro jogador terá.",
  },
};

// O registro de BROTO é independente das descrições dos demais jogos.
GAME_INFO.broto = {
  name: "BROTO",
  description: "Plante sementes, complete estímulos e escolha quem floresce.",
  summary:
    "Faça suas sementes florescerem. Vence quem colher mais flores nas duas rodadas.",
  rules: [
      "Escolha uma casa vazia, veja a prévia e confirme o plantio. Cada pessoa tem oito sementes por rodada.",
      "A semente nova estimula o primeiro broto que encontra para cima, baixo, esquerda e direita. O estímulo atravessa espaços vazios, mas não vai na diagonal nem volta para a semente nova.",
      "Para florescer, um broto precisa receber estímulo dos dois eixos: horizontal ↔ e vertical ↕. Receber duas vezes o mesmo eixo não basta.",
      "A flor vale um ponto para o dono do broto, mesmo quando foi o adversário que a completou. Depois, ela sai do tabuleiro, sem devolver uma semente à reserva.",
      "Os brotos atingidos são definidos antes da colheita. Uma passagem aberta pela retirada de uma flor só ajuda a partir da próxima jogada.",
      "Após os 16 plantios, brotos que não floresceram não pontuam. Na segunda rodada, o outro jogador começa. Some as flores das duas rodadas: mais flores vence; totais iguais empatam.",
    ],
  purpose:
    "Praticar antecipação e planejamento por turnos, acompanhando os efeitos imediatos de um plantio e as possibilidades que ele deixa para a próxima pessoa.",
  why: "A proposta é explorar decisões com consequências compartilhadas: uma semente pode preparar um broto próprio, completar uma flor adversária ou abrir passagem para uma jogada futura.",
};

// CERCO: conteúdo local, sem modificar as descrições dos jogos anteriores.
GAME_INFO.cerco = {
  name: "CERCO",
  description:
    "Mova suas peças, feche caminhos e deixe o adversário sem saída.",
  summary: "Feche os caminhos do rival sem deixar suas próprias peças presas.",
  rules: [
      "Escolha uma das suas três peças e uma casa vizinha vazia, sem barreira. Mova uma casa para cima, baixo, esquerda ou direita e confirme.",
      "A casa que você deixou vira uma barreira permanente para os dois times. O destino não vira barreira.",
      "Não vale mover na diagonal, saltar, empurrar, capturar ou passar a vez. Todas as peças continuam no tabuleiro.",
      "Quem não consegue mover nenhuma das três peças na sua vez perde. Uma peça presa não encerra a partida se outra ainda puder sair.",
      "Na preparação, escolha a grade e o mapa. O Verde começa a primeira partida; a revanche alterna quem começa. Os mascotes mudam só o visual, não os movimentos.",
    ],
  purpose:
    "Praticar planejamento por turnos e leitura de caminhos, observando como a casa abandonada altera as opções de ambos os times.",
  why: "A proposta é tornar visíveis as consequências de uma decisão: mover uma peça também fecha uma passagem, e cada equipe precisa conservar alguma saída para sua próxima vez.",
};

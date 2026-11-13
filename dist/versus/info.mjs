import { VERSUS_GAMES } from "./metadata.mjs";

/** Resumos da biblioteca não carregam motores, bots ou estados de partida. */
export const VERSUS_GUIDANCE = Object.freeze({
  enlace:
    "Coloque dois fios em L. Ligue sua cor de uma margem à outra.",
  vazante:
    "Selecione seu barco e uma casa vizinha vazia. Todos os barcos alinhados atrás dele serão rebocados, inclusive os do rival.",
  mosaico:
    "Gire e coloque azulejos para formar encontros com mais cantos da sua cor.",
  quinhao:
    "Ofereça três cestos. O rival fica com um, e você recebe os outros dois.",
  estalo:
    "Abra todas as suas vagens antes do rival, planejando a sequência das setas.",
  dobra:
    "Coloque seus selos e dobre o mapa para terminar com a maior área.",
  acorde:
    "Recolha sinos até formar um par de cada um de três símbolos diferentes.",
  lastro:
    "Escolha qualquer contrapeso e avance uma ou duas marcas. O desvio final precisa permanecer entre −4 e +4.",
});

const summaries = {
  enlace: [
    "O Verde precisa ligar a esquerda à direita. O Âmbar precisa ligar o topo à base.",
    "Escolha um pino e dois trechos vazios que formem um L. Coloque um fio verde e um âmbar, confira a prévia e confirme.",
    "Fios da mesma cor se ligam ao tocar o mesmo pino. As cores podem usar o mesmo pino, mas não se misturam. Fios colocados não podem ser movidos.",
    "Vence quem completar sua travessia, mesmo que tenha sido o rival que colocou o último fio. Se as duas cores atravessarem juntas, há empate.",
    "Se não couber mais nenhum L e ninguém atravessou, vence quem tiver mais pinos ligados à própria entrada. Se as quantidades forem iguais, empata.",
  ],
  vazante: [
    "Entregue dois de seus três barcos na margem oposta.",
    "Uma remada move uma casa e reboca a fila contínua imediatamente atrás, de qualquer equipe.",
    "Três ocorrências da mesma posição, dois passes ou 80 turnos sem vencedor empatam.",
  ],
  mosaico: [
    "Escolha uma casa vazia e a orientação do azulejo. Confira a prévia e confirme a colocação.",
    "Olhe onde quatro azulejos se encontram. Quando os quatro cantos desse encontro estiverem preenchidos, três ou quatro da mesma cor dão um selo para essa equipe.",
    "Se houver dois cantos de cada cor, ninguém ganha o selo. Um azulejo pode completar mais de um encontro e também dar pontos ao rival.",
    "Quando as 25 casas estiverem preenchidas, vence quem tiver mais selos. Quantidades iguais empatam.",
  ],
  quinhao: [
    "Na sua vez de oferecer, escolha três cestos vizinhos no anel e confirme. O último e o primeiro também são vizinhos; espaços já vazios não separam os cestos.",
    "O rival escolhe um dos três. Ele recebe esse fruto e você recebe os outros dois. Depois, os cestos retirados somem e os que sobraram voltam a ser vizinhos.",
    "Quem acabou de escolher faz a próxima oferta. Continue até distribuir os 24 frutos.",
    "No seu depósito, cada trio com uma castanha-do-pará, uma pitanga e uma jabuticaba vale 5 pontos. Forme primeiro todos os trios possíveis.",
    "Com as sobras, cada par de tipos diferentes vale 2 pontos. Um fruto só pode pontuar uma vez. Vence quem somar mais pontos; empate continua empate.",
  ],
  estalo: [
    "Escolha uma vagem da sua cor. Mantenha a seta ou gire 90° para um dos lados. Veja a sequência prevista e confirme.",
    "A vagem abre e a sequência segue a seta para a casa ao lado. Cada nova vagem alcançada abre e manda a sequência na direção da própria seta.",
    "A sequência pode abrir vagens dos dois times. Ela para na borda, num recorte vazio ou numa casa que já foi aberta, inclusive se voltar a uma casa da mesma sequência.",
    "Cada vagem aberta dá um ponto ao seu dono. Só depois de toda a sequência terminar se verifica a vitória: quem abrir todas as suas vagens vence. Se os dois completarem juntos, empata.",
  ],
  dobra: [
    "Escolha uma casa para colocar seu selo e uma borda para dobrar. Confira a prévia e confirme.",
    "A linha ou coluna da borda se dobra sobre a vizinha. As áreas e os selos dos dois times se somam; nenhum selo fica escondido ou é apagado.",
    "Quando restar um mapa 2 × 2, cada casa dá sua área ao time com mais selos nela. Se os selos empatarem, ninguém recebe aquela área.",
    "Some as áreas conquistadas. Quem tiver mais vence; totais iguais empatam.",
  ],
  acorde: [
    "O Verde escolhe um sino na linha do carrinho; o Âmbar, na coluna. O eixo disponível fica destacado. Escolha um sino e confirme.",
    "O sino vai para sua coleção, e o carrinho fica na casa escolhida. Essa posição define as opções do outro jogador.",
    "Um par são dois sinos com o mesmo símbolo. Você vence ao ter pares de três símbolos diferentes, por exemplo: duas folhas, duas gotas e dois sóis.",
    "Se não houver sino no seu eixo, passe a vez. Se os dois passarem seguidamente ou os sinos acabarem, vence quem tiver pares de mais tipos. Quantidades iguais empatam.",
  ],
  lastro: [
    "Os seis contrapesos são compartilhados e só avançam uma ou duas marcas.",
    "A soma valor × distância da direita menos a da esquerda precisa ficar entre −4 e +4.",
    "Quem não tiver ajuste perde a rodada. São duas rodadas com início alternado; 1–1 empata.",
  ],
};

const purposes = {
  enlace:
    "Planejar conexões e avaliar consequências simultâneas para os dois jogadores.",
  vazante:
    "Antecipar deslocamentos coletivos e a ordem das embarcações em um comboio.",
  mosaico:
    "Relacionar orientação espacial com maiorias em encontros compartilhados.",
  quinhao: "Comparar ofertas, escolhas adversariais e combinações de recursos.",
  estalo:
    "Seguir percursos dirigidos e prever as interrupções criadas por uma cadeia.",
  dobra: "Antecipar transformações do mapa, somas de área e maiorias de selos.",
  acorde:
    "Relacionar uma coleta imediata às opções que ela oferece ao adversário.",
  lastro:
    "Comparar variações aritméticas e a disponibilidade dos movimentos seguintes.",
};

export const VERSUS_GAME_INFO = Object.freeze(
  Object.fromEntries(
    VERSUS_GAMES.map((game) => [
      game.id,
      {
        name: game.name,
        description: game.description,
        summary: VERSUS_GUIDANCE[game.id],
        rules: summaries[game.id],
        purpose: purposes[game.id],
        why: "A proposta é explorar decisões visíveis e consequências previsíveis em uma partida de duas pessoas, sem depender de reflexos ou precisão do mouse.",
      },
    ]),
  ),
);

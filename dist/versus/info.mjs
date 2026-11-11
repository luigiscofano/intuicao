import { VERSUS_GAMES } from "./metadata.mjs";

/** Resumos da biblioteca não carregam motores, bots ou estados de partida. */
export const VERSUS_GUIDANCE = Object.freeze({
  enlace:
    "Escolha um pino e dois braços perpendiculares. A presilha coloca um fio verde e um âmbar; confira as duas redes antes de confirmar.",
  vazante:
    "Selecione seu barco e uma casa vizinha vazia. Todos os barcos alinhados atrás dele serão rebocados, inclusive os do rival.",
  mosaico:
    "Escolha uma casa vazia e a orientação do azulejo. Observe os quatro cantos de cada junção completada antes de confirmar.",
  quinhao:
    "O ofertante reúne três cestos vizinhos; o outro jogador escolhe um. Observe a próxima vizinhança que a retirada vai formar.",
  estalo:
    "Escolha uma vagem sua e mantenha ou gire sua seta em 90°. A prévia mostra toda a cadeia e os pontos das duas equipes.",
  dobra:
    "Escolha onde colocar seu selo e qual borda dobrar. Áreas e selos se somam nas pilhas de destino.",
  acorde:
    "Recolha um sino no eixo destacado. A casa escolhida define a linha ou coluna disponível ao rival.",
  lastro:
    "Escolha qualquer contrapeso e avance uma ou duas marcas. O desvio final precisa permanecer entre −4 e +4.",
});

const summaries = {
  enlace: [
    "Conecte sua entrada à margem oposta usando fios da sua cor.",
    "Cada presilha ocupa dois trechos perpendiculares vazios: um verde e um âmbar.",
    "Duas travessias simultâneas empatam. Se acabarem os encaixes, compare os pinos acesos.",
  ],
  vazante: [
    "Entregue dois de seus três barcos na margem oposta.",
    "Uma remada move uma casa e reboca a fila contínua imediatamente atrás, de qualquer equipe.",
    "Três ocorrências da mesma posição, dois passes ou 80 turnos sem vencedor empatam.",
  ],
  mosaico: [
    "Coloque um azulejo em uma casa vazia, escolhendo sua orientação.",
    "Ao completar uma junção, três ou quatro cantos da mesma cor concedem um selo à equipe.",
    "Depois dos 25 azulejos, mais selos vence; igualdade empata.",
  ],
  quinhao: [
    "Ofereça três cestos consecutivos do anel; o rival escolhe um e você recebe dois.",
    "Os cestos restantes voltam a ser vizinhos. As equipes alternam quem oferece.",
    "Trios de tipos diferentes valem cinco pontos; depois, pares diferentes valem dois.",
  ],
  estalo: [
    "Ative uma vagem sua, mantendo a seta ou girando 90° para qualquer lado.",
    "O pulso abre vagens das duas equipes e para numa casca aberta ou na borda.",
    "Depois de toda a cadeia, completar oito vagens vence; conclusão simultânea empata.",
  ],
  dobra: [
    "Em cada turno, coloque um selo e dobre uma borda inteira para dentro.",
    "A dobra reúne áreas e reivindicações, sem esconder selos.",
    "No mapa final 2 × 2, maiorias controlam a área de cada distrito. Mais área vence.",
  ],
  acorde: [
    "Verde coleta na linha do carrinho; âmbar, na coluna.",
    "Cada sino recolhido deixa o carrinho naquela casa e restringe a próxima escolha.",
    "Complete pares de três símbolos diferentes. Se houver bloqueio, compare os tipos de pares.",
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

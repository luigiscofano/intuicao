import { isRetiredGame } from "../retired-games.mjs";
/** A biblioteca importa somente estes metadados; os motores carregam sob demanda. */
const HISTORICAL_VERSUS_GAMES = Object.freeze([
  {
    id: "enlace",
    name: "ENLACE",
    number: "18",
    description: "Ligue sua rede. Escolha qual fio oferecer ao rival.",
    headline: "Construa a ligação.\nAntecipe o outro fio.",
    scoreLabel: "pinos acesos",
  },
  {
    id: "vazante",
    name: "VAZANTE",
    number: "19",
    description: "Cruze o estuário e puxe os barcos na sua esteira.",
    headline: "Observe a corrente.\nConduza o comboio.",
    scoreLabel: "entregas",
  },
  {
    id: "mosaico",
    name: "MOSAICO",
    number: "20",
    description: "Oriente os azulejos. Conquiste os encontros.",
    headline: "Encontre os cantos.\nAssine o painel.",
    scoreLabel: "selos",
  },
  {
    id: "quinhao",
    name: "QUINHÃO",
    number: "21",
    description: "Ofereça três cestos. O rival escolhe primeiro.",
    headline: "Prepare a partilha.\nEscolha seu quinhão.",
    scoreLabel: "pontos",
  },
  {
    id: "estalo",
    name: "ESTALO",
    number: "22",
    description: "Siga as setas e decida quem ganha com cada estalo.",
    headline: "Preveja a cadeia.\nPrepare o estalo.",
    scoreLabel: "vagens abertas",
  },
  {
    id: "dobra",
    name: "DOBRA",
    number: "23",
    description: "Marque uma região e transforme o atlas inteiro.",
    headline: "Imagine o próximo mapa.\nEncontre a melhor dobra.",
    scoreLabel: "área controlada",
  },
  {
    id: "acorde",
    name: "ACORDE",
    number: "24",
    description: "Reúna seus pares e escolha o próximo eixo do rival.",
    headline: "Escolha uma voz.\nComplete o acorde.",
    scoreLabel: "tipos de pares",
  },
  {
    id: "lastro",
    name: "LASTRO",
    number: "25",
    description: "Ajuste os pesos. Reserve o último movimento seguro.",
    headline: "Leia o equilíbrio.\nPrepare o último ajuste.",
    scoreLabel: "rodadas vencidas",
  },
]);

// Os registros históricos continuam aceitos pelo armazenamento e pelo backup.
export const STORED_VERSUS_GAME_IDS = Object.freeze(HISTORICAL_VERSUS_GAMES.map(({ id }) => id));
export const VERSUS_GAMES = Object.freeze(HISTORICAL_VERSUS_GAMES.filter(({ id }) => !isRetiredGame(id)));

export const VERSUS_GAME_IDS = Object.freeze(VERSUS_GAMES.map(({ id }) => id));

const loaders = Object.freeze({
  enlace: () => import("./games/enlace/index.mjs"),
  vazante: () => import("./games/vazante/index.mjs"),
  mosaico: () => import("./games/mosaico/index.mjs"),
  quinhao: () => import("./games/quinhao/index.mjs"),
  estalo: () => import("./games/estalo/index.mjs"),
  dobra: () => import("./games/dobra/index.mjs"),
  acorde: () => import("./games/acorde/index.mjs"),
  lastro: () => import("./games/lastro/index.mjs"),
});

export async function loadVersusGame(id) {
  if (!Object.hasOwn(loaders, id)) throw new Error("Jogo versus desconhecido.");
  const module = await loaders[id]();
  return module.game;
}

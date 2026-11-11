/**
 * Missões comprováveis pela definição de uma fase concluída.
 * Não inferimos velocidade, ausência de ajuda ou decisões que o save não registra.
 * O chamador fornece somente as fases atuais com conclusão já validada.
 */
import {
  LOGIC_MISSION_INDEX,
  matchesIndexedMission,
} from "./logic-mission-index.mjs";

const gameNames = Object.freeze({
  light: "REFLEXOS",
  cut: "CORTE CERTO",
  elo: "ELO",
  prumo: "PRUMO",
  pacto: "PACTO",
  sintonia: "SINTONIA",
  repasse: "REPASSE",
  orbita: "ÓRBITA",
  divisa: "DIVISA",
  pulso: "PULSO",
  foz: "FOZ",
  refugio: "REFÚGIO",
  mirante: "MIRANTE",
  renovo: "RENOVO",
});

function mission(gameId, suffix, name, description, matchesLevel) {
  const id = `${gameId}-${suffix}`;
  return Object.freeze({
    id,
    gameId,
    gameName: gameNames[gameId],
    name,
    description,
    icon: id,
    matchesLevel,
  });
}

function hasRemoteSwitch(level) {
  return level.boards.some((board, boardIndex) =>
    (board.switches ?? []).some((button) =>
      level.boards.some(
        (other, otherIndex) =>
          boardIndex !== otherIndex &&
          (other.gates ?? []).some(
            (gate) =>
              gate.condition?.type === "switch" &&
              gate.condition.id === (button.group ?? button.id),
          ),
      ),
    ),
  );
}

function hasNoGivenPair(level) {
  for (let index = 0; index < level.clues.length; index++) {
    const symbol = level.clues[index];
    if (symbol < 0) continue;
    if (
      index % level.cols < level.cols - 1 &&
      level.clues[index + 1] === symbol
    )
      return false;
    if (
      index + level.cols < level.clues.length &&
      level.clues[index + level.cols] === symbol
    )
      return false;
  }
  return true;
}

function hasEmptyGivenRow(level) {
  return Array.from({ length: level.rows }, (_, row) =>
    level.clues.slice(row * level.cols, (row + 1) * level.cols),
  ).some((row) => row.every((symbol) => symbol < 0));
}

function pulseIntervals(level) {
  return Array.from({ length: level.rows }, (_, row) => {
    const beats = level.solution
      .slice(row * level.cols, (row + 1) * level.cols)
      .flatMap((value, column) => (value === 1 ? [column] : []));
    return beats[1] - beats[0];
  });
}

function hasTripleConfluence(level) {
  const incoming = new Map();
  for (const destination of level.solution) {
    if (destination < 0 || destination === level.root) continue;
    incoming.set(destination, (incoming.get(destination) ?? 0) + 1);
  }
  return [...incoming.values()].some((count) => count >= 3);
}

function landNeighbors(index, level) {
  const row = Math.floor(index / level.cols);
  const column = index % level.cols;
  return [
    row > 0 ? index - level.cols : -1,
    row < level.rows - 1 ? index + level.cols : -1,
    column > 0 ? index - 1 : -1,
    column < level.cols - 1 ? index + 1 : -1,
  ].filter((neighbor) => neighbor >= 0 && level.solution[neighbor] === 0);
}

function hasInteriorRefuge(level) {
  const visited = new Set();
  for (let start = 0; start < level.solution.length; start++) {
    if (visited.has(start) || level.solution[start] !== 0) continue;
    const pending = [start];
    let touchesBorder = false;
    while (pending.length) {
      const index = pending.pop();
      if (visited.has(index)) continue;
      visited.add(index);
      const row = Math.floor(index / level.cols);
      const column = index % level.cols;
      touchesBorder ||=
        row === 0 ||
        row === level.rows - 1 ||
        column === 0 ||
        column === level.cols - 1;
      for (const neighbor of landNeighbors(index, level)) {
        if (!visited.has(neighbor)) pending.push(neighbor);
      }
    }
    if (!touchesBorder) return true;
  }
  return false;
}

function armLength(from, to, width) {
  return (
    Math.abs((from % width) - (to % width)) +
    Math.abs(Math.floor(from / width) - Math.floor(to / width))
  );
}

function hasUnequalLongArms(level) {
  return level.solution.some(([seed, bud, leaf]) => {
    const seedArm = armLength(seed, bud, level.width);
    const leafArm = armLength(leaf, bud, level.width);
    return seedArm >= 2 && leafArm >= 2 && seedArm !== leafArm;
  });
}

function hasFourTurnDirections(level) {
  const orientations = level.solution.map(([seed, bud, leaf]) => {
    const horizontal =
      Math.sign((seed % level.width) - (bud % level.width)) +
      Math.sign((leaf % level.width) - (bud % level.width));
    const vertical =
      Math.sign(
        Math.floor(seed / level.width) - Math.floor(bud / level.width),
      ) +
      Math.sign(Math.floor(leaf / level.width) - Math.floor(bud / level.width));
    return `${horizontal},${vertical}`;
  });
  return new Set(orientations).size === 4;
}

export const CAMPAIGN_MISSIONS = Object.freeze([
  mission(
    "light",
    "color-gates",
    "Passaporte de luz",
    "Conclua uma fase com portais que aceitam somente determinadas cores de luz.",
    (level) => level.portals.some((portal) => portal.colors?.length),
  ),
  mission(
    "light",
    "three-colors",
    "Três cores, três caminhos",
    "Conclua uma fase com fontes de três cores diferentes, levando todos os raios aos alvos.",
    (level) => new Set(level.sources.map((source) => source.color)).size >= 3,
  ),
  mission(
    "cut",
    "hollow-shape",
    "O peso do vazio",
    "Acerte a área pedida em uma figura com um recorte interno que não toca a borda.",
    (level) => level.holes?.length > 0 && !level.hasEdgeOpening,
  ),
  mission(
    "cut",
    "wave",
    "A medida da onda",
    "Acerte a área pedida usando uma curva Seno ou Cosseno.",
    (level) => ["Seno", "Cosseno"].includes(level.family),
  ),
  mission(
    "elo",
    "distance",
    "Elo sob medida",
    "Feche um circuito em uma fase com pistas de distância entre as peças.",
    (level) => Object.keys(level.constraints?.distances ?? {}).length > 0,
  ),
  mission(
    "elo",
    "exclusive",
    "Uma passagem, uma escolha",
    "Feche um circuito em uma fase com um grupo de passagens exclusivas.",
    (level) => level.constraints?.exclusivePassages?.length > 0,
  ),
  mission(
    "prumo",
    "asymmetric",
    "Equilíbrio improvável",
    "Conclua uma fase que admite uma partição equilibrada com pelo menos uma peça assimétrica.",
    (level) =>
      level.designEvidence?.pieces?.some((piece) => piece.asymmetric === true),
  ),
  mission(
    "prumo",
    "corridor",
    "Quem fica com a ponte?",
    "Conclua uma fase em que duas formas equilibradas candidatas disputam o mesmo corredor.",
    (level) =>
      level.designEvidence?.teachingWitness?.kind ===
      "competing-connected-balanced-shapes",
  ),
  mission(
    "pacto",
    "unpaired",
    "Pares do zero",
    "Complete um tabuleiro em que nenhum dos quatro símbolos começa com um par pronto nas pistas.",
    hasNoGivenPair,
  ),
  mission(
    "pacto",
    "blank-row",
    "Linha em branco",
    "Complete um tabuleiro que começa com uma linha inteira sem pistas.",
    hasEmptyGivenRow,
  ),
  mission(
    "sintonia",
    "remote-switch",
    "Ajuda do outro lado",
    "Conclua uma fase em que um botão de um animal controla uma cancela em outro tabuleiro.",
    hasRemoteSwitch,
  ),
  mission(
    "sintonia",
    "ice",
    "Até a próxima parada",
    "Leve todos os animais aos destinos em uma fase com casas de gelo.",
    (level) => level.boards.some((board) => board.ice?.length > 0),
  ),
  mission(
    "repasse",
    "four-directions",
    "Quatro destinos",
    "Conclua uma fase com uma peça que repassa seu valor para as quatro direções.",
    (level) => level.pieces.some((piece) => piece.directions.length === 4),
  ),
  mission(
    "repasse",
    "handoff",
    "Passar o bastão",
    "Conclua uma fase de troca de receptor: a retirada de uma peça prepara quem receberá o próximo repasse.",
    (level) =>
      level.primaryConcept === "handoff" &&
      level.validation?.trace?.evidence?.handoff?.length > 0,
  ),
  mission(
    "orbita",
    "gears",
    "Engrenagens em acordo",
    "Conclua uma fase com um comando que gira dois ou mais anéis juntos.",
    (level) => level.commands.some((command) => command.turns.length >= 2),
  ),
  mission(
    "orbita",
    "sensor",
    "Chave em órbita",
    "Conclua uma fase em que um sensor exige um símbolo na posição certa para liberar um comando.",
    (level) => level.commands.some((command) => command.requires?.length > 0),
  ),
  mission(
    "divisa",
    "no-contact",
    "Vizinhos à distância",
    "Complete um mapa com uma cota zero: dois territórios não podem compartilhar fronteira.",
    (level) => Object.values(level.contacts).some((contact) => contact === 0),
  ),
  mission(
    "divisa",
    "four-territories",
    "Quatro territórios",
    "Reparta um mapa entre quatro territórios, respeitando todas as cotas de fronteira.",
    (level) => level.letters.length >= 4,
  ),
  mission(
    "pulso",
    "three-intervals",
    "Três compassos",
    "Complete um painel cuja solução combina três espaçamentos diferentes entre as batidas.",
    (level) => new Set(pulseIntervals(level)).size >= 3,
  ),
  mission(
    "pulso",
    "wide-beat",
    "Pausa longa",
    "Complete um painel cuja solução tem um trio com pelo menos duas casas vazias entre cada batida.",
    (level) => pulseIntervals(level).some((interval) => interval >= 3),
  ),
  mission(
    "foz",
    "long-course",
    "Rio de sete passos",
    "Conclua uma fase com uma pista que pede ao menos sete canais até a foz.",
    (level) => Object.values(level.clues).some((distance) => distance >= 7),
  ),
  mission(
    "foz",
    "confluence",
    "Três águas se encontram",
    "Conclua uma fase cuja solução reúne três canais em uma casa antes da foz.",
    hasTripleConfluence,
  ),
  mission(
    "refugio",
    "interior",
    "Abrigo no coração",
    "Conclua uma fase cuja solução contém um refúgio que não encosta em nenhuma borda.",
    hasInteriorRefuge,
  ),
  mission(
    "refugio",
    "four-markers",
    "Cada um no seu lugar",
    "Separe quatro marcos em quatro refúgios, mantendo todas as barreiras necessárias.",
    (level) => level.markers.length === 4,
  ),
  mission(
    "mirante",
    "four-witnesses",
    "Todos os olhares",
    "Conclua uma fase cuja solução tem uma peça vista por quatro observadores.",
    (level) => level.certificate?.sharing?.four > 0,
  ),
  mission(
    "mirante",
    "witness-rule",
    "A segunda testemunha",
    "Conclua uma fase em que exigir duas testemunhas por peça é indispensável para a solução única.",
    (level) => level.certificate?.witnessesEssential === true,
  ),
  mission(
    "renovo",
    "unequal-arms",
    "Raízes de longo alcance",
    "Conclua uma fase cuja solução tem um trio com dois braços de pelo menos duas casas e comprimentos diferentes.",
    hasUnequalLongArms,
  ),
  mission(
    "renovo",
    "four-turns",
    "Quatro direções de vida",
    "Conclua uma fase cuja solução contém trios nas quatro orientações de ângulo reto.",
    hasFourTurnDirections,
  ),
]);

/** Cada missão é binária; repetir uma fase ou um save não soma descobertas. */
export function campaignMissionUnlocks(gameId, completedLevels) {
  if (!Array.isArray(completedLevels)) return [];
  return CAMPAIGN_MISSIONS.filter(
    (item) =>
      item.gameId === gameId &&
      completedLevels.some((level) =>
        // As seis campanhas novas chegam como resumo: o índice confere ID e versão.
        Object.hasOwn(LOGIC_MISSION_INDEX, item.id)
          ? matchesIndexedMission(item.id, level)
          : item.matchesLevel(level),
      ),
  ).map((item) => item.id);
}

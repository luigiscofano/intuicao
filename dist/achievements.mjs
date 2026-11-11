import { LOGIC_CAMPAIGNS } from "./logica/catalog-summary.mjs";
import { normalizeLogicData, LOGIC_STORAGE_KEY } from "./logica/storage.mjs";
// Projeção somente de leitura: preserva saves e compara identidades, nunca posições.
import { lightLevels, cutLevels } from "./levels.mjs";
import { GEOMETRY_LEVELS } from "./geometry-levels.mjs";
import { SYMBOL_LEVELS } from "./symbol-levels.mjs";
import {
  CAMPAIGN as sintonia,
  DIFFICULTIES as sintoniaTiers,
} from "./sintonia/campaign.mjs";
import {
  CAMPAIGN as repasse,
  DIFFICULTIES as repasseTiers,
} from "./repasse/campaign.mjs";
import { CAMPAIGN as orbita, campaignTier } from "./orbita/campaign.mjs";
import { normalizeSintoniaData } from "./sintonia/ui.mjs";
import { normalizeRepasseData } from "./repasse/ui.mjs";
import { normalizeOrbitaData } from "./orbita/ui.mjs";
import { readApprovedAttempts } from "./achievements/approved-store.mjs";
import { MISSION_CATALOG } from "./achievements/catalog.mjs";
import { campaignMissionUnlocks } from "./achievements/campaign-missions.mjs";
import { readMissionLedger } from "./achievements/mission-store.mjs";
import { renderAchievementView } from "./achievements/view.mjs";
const record = (x) => !!x && typeof x === "object" && !Array.isArray(x);
const tiers = [
  "Básico",
  "Aprendiz",
  "Intermediário",
  "Avançado",
  "Mestre",
  "Modo Sábio",
];
const lightBands = [
  "basic",
  "apprentice",
  "intermediate",
  "advanced",
  "master",
  "sage",
];
export const ACHIEVEMENT_GAMES = Object.freeze([
  ...LOGIC_CAMPAIGNS.map((game) => ({
    ...game,
    tier: (level) => tiers[level.difficulty],
  })),
  {
    id: "light",
    name: "Reflexos",
    levels: lightLevels,
    tier: (l, i) =>
      tiers[lightBands.indexOf(l.campaignBand)] ??
      tiers[Math.min(5, Math.floor(((l.campaignNumber ?? i + 1) - 1) / 15))],
  },
  { id: "cut", name: "Corte certo", levels: cutLevels, tier: (l) => l.tier },
  {
    id: "elo",
    name: "ELO",
    levels: GEOMETRY_LEVELS.elo,
    tier: (l) => l.difficulty,
  },
  {
    id: "prumo",
    name: "PRUMO",
    levels: GEOMETRY_LEVELS.prumo,
    tier: (l) => l.difficulty,
  },
  {
    id: "pacto",
    name: "PACTO",
    levels: SYMBOL_LEVELS.pacto,
    tier: (l) => l.difficulty,
  },
  {
    id: "sintonia",
    name: "SINTONIA",
    levels: sintonia,
    tier: (l) => sintoniaTiers[l.difficulty],
  },
  {
    id: "repasse",
    name: "REPASSE",
    levels: repasse,
    tier: (l) => repasseTiers[l.difficulty],
  },
  {
    id: "orbita",
    name: "ÓRBITA",
    levels: orbita,
    tier: (_, i) => campaignTier(i + 1)?.name,
  },
]);
const campaignCount = ACHIEVEMENT_GAMES.length;
const totalCampaignLevels = ACHIEVEMENT_GAMES.reduce(
  (total, game) => total + game.levels.length,
  0,
);
const halfwayTarget = Math.ceil(totalCampaignLevels / 2);
const definitions = [
  ["first", "Primeira descoberta", "Conclua 1 nível de campanha.", 1, "total"],
  [
    "ten",
    "Dez descobertas",
    "Conclua 10 níveis diferentes de campanha.",
    10,
    "total",
  ],
  [
    "fifty",
    "Caminho de descobertas",
    "Conclua 50 níveis diferentes de campanha.",
    50,
    "total",
  ],
  [
    "hundred",
    "Cem possibilidades",
    "Conclua 100 níveis diferentes de campanha.",
    100,
    "total",
  ],
  [
    "hard",
    "Além do primeiro olhar",
    "Conclua 1 nível Avançado, Mestre ou Modo Sábio.",
    1,
    "hard",
  ],
  [
    "all-games",
    "Muitas formas de pensar",
    `Conclua ao menos 1 nível em cada uma das ${campaignCount} campanhas.`,
    campaignCount,
    "explored",
  ],
  [
    "campaign",
    "Um caminho completo",
    "Conclua os 80 níveis de uma campanha atual.",
    1,
    "finishedCampaigns",
  ],
  [
    "tiers",
    "Novas perspectivas",
    "Conclua ao menos 1 nível em cada uma das 6 etapas de dificuldade.",
    6,
    "exploredTiers",
  ],
  [
    "half",
    "Metade do laboratório",
    `Conclua ${halfwayTarget} níveis diferentes das campanhas atuais.`,
    halfwayTarget,
    "total",
  ],
  [
    "collection",
    "Um laboratório inteiro",
    `Conclua os ${totalCampaignLevels} níveis das campanhas atuais.`,
    totalCampaignLevels,
    "total",
  ],
];
export function readAchievements(storage) {
  const warnings = [];
  if (arguments.length === 0) {
    try {
      storage = globalThis.localStorage;
    } catch {
      warnings.push(
        "Não foi possível acessar o armazenamento deste navegador.",
      );
    }
  }
  function read(key) {
    try {
      const raw = storage?.getItem(key);
      if (!raw) return null;
      if (raw.length > 8000000) throw Error("oversize");
      return JSON.parse(raw);
    } catch {
      warnings.push("Um registro local não pôde ser lido. Ele foi preservado.");
      return null;
    }
  }
  const collection = read("intuicao.collection.v1");
  const collected = new Set(
    collection?.version === 1 && Array.isArray(collection.completed)
      ? collection.completed.filter((x) => typeof x === "string")
      : [],
  );
  const completed = { elo: collected, prumo: collected, pacto: collected };
  for (const game of ["light", "cut"]) {
    const data = read(`intuicao.campaign.${game}.progress.v1`);
    completed[game] = new Set(
      data?.version === 1 && Array.isArray(data.completedIds)
        ? data.completedIds.filter((x) => typeof x === "string")
        : [],
    );
  }
  for (const [game, normalize] of [
    ["sintonia", normalizeSintoniaData],
    ["repasse", normalizeRepasseData],
    ["orbita", normalizeOrbitaData],
  ]) {
    const data = read(`intuicao.${game}.v1`);
    try {
      // Itens inválidos não comprovam conclusão. Normaliza apenas a cópia desserializada.
      if (record(data?.campaign?.completed))
        data.campaign.completed = Object.fromEntries(
          Object.entries(data.campaign.completed).filter(([, value]) =>
            record(value),
          ),
        );
      const normalized = normalize(data);
      completed[game] = new Set(Object.keys(normalized.campaign.completed));
    } catch {
      completed[game] = new Set();
      warnings.push(
        "Um registro de campanha não pôde ser interpretado. Ele foi preservado.",
      );
    }
  }
  const logic = normalizeLogicData(read(LOGIC_STORAGE_KEY));
  for (const game of LOGIC_CAMPAIGNS) {
    const records = logic.games[game.id]?.completed ?? {};
    completed[game.id] = new Set(
      game.levels
        .filter((level) => records[level.id]?.version === level.version)
        .map((level) => level.id),
    );
  }
  let total = 0,
    hard = 0,
    explored = 0,
    finishedCampaigns = 0;
  const exploredTierNames = new Set();
  const completedMissionIds = new Set();
  const games = ACHIEVEMENT_GAMES.map((game) => {
    const levels = game.levels.filter((level) =>
      completed[game.id].has(
        typeof level.id === "number" ? String(level.id) : level.id,
      ),
    );
    const count = levels.length;
    const completedLevels = new Set(levels);
    for (const id of campaignMissionUnlocks(game.id, levels)) {
      completedMissionIds.add(id);
    }
    total += count;
    if (count) explored++;
    if (count === game.levels.length && count > 0) finishedCampaigns++;
    for (const [i, level] of game.levels.entries()) {
      if (!completedLevels.has(level)) continue;
      const tier = game.tier(level, i);
      if (tiers.includes(tier)) exploredTierNames.add(tier);
      if (tiers.slice(3).includes(tier)) hard++;
    }
    return {
      id: game.id,
      name: game.name,
      total: game.levels.length,
      completed: count,
    };
  });
  const stats = {
    total,
    hard,
    explored,
    finishedCampaigns,
    exploredTiers: exploredTierNames.size,
  };
  const ledger = readMissionLedger(storage);
  if (ledger.warning) warnings.push(ledger.warning);
  const attempts = readApprovedAttempts(storage);
  if (attempts.warning) warnings.push(attempts.warning);
  const missions = MISSION_CATALOG.map((mission) => {
    const unlocked =
      completedMissionIds.has(mission.id) ||
      Object.hasOwn(ledger.unlocked, mission.id);
    return {
      id: mission.id,
      kind: "mission",
      gameId: mission.gameId,
      gameName: mission.gameName,
      gameIds: mission.gameIds ?? [mission.gameId],
      games: mission.games ?? [{id: mission.gameId, name: mission.gameName}],
      name: mission.name,
      description: mission.description,
      icon: mission.icon,
      target: mission.id === "precision-three-first-tries" ? 3 : 1,
      current: mission.id === "precision-three-first-tries" ? (unlocked ? 3 : attempts.firstWins.length) : Number(unlocked),
      unlocked,
      unlockedAt: ledger.unlocked[mission.id]?.unlockedAt ?? null,
    };
  });
  const missionGames = [...new Map(missions.flatMap(mission => mission.games).map(game => [game.id, game])).values()];
  return {
    ...stats,
    available: games.reduce((sum, g) => sum + g.total, 0),
    games,
    missions,
    missionGames,
    warnings: [...new Set(warnings)],
    achievements: definitions.map(
      ([id, name, description, target, metric]) => ({
        id,
        kind: "general",
        name,
        description,
        target,
        icon: id,
        current: Math.min(target, stats[metric]),
        unlocked: stats[metric] >= target,
      }),
    ),
  };
}
// A consulta continua somente de leitura; a view cuida dos filtros e da apresentação.
export function renderAchievements(container, storage) {
  const data =
    arguments.length > 1 ? readAchievements(storage) : readAchievements();
  renderAchievementView(container, data);
  return data;
}

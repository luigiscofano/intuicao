import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { CAMPAIGN_MISSIONS } from "../dist/achievements/campaign-missions.mjs";

const LOGIC_GAME_IDS = Object.freeze([
  "divisa",
  "foz",
  "mirante",
  "pulso",
  "refugio",
  "renovo",
]);
const destination = new URL(
  "../dist/achievements/logic-mission-index.mjs",
  import.meta.url,
);

/** Os dados completos entram apenas na geração; o navegador recebe identidades. */
export async function buildLogicMissionIndex() {
  const campaigns = new Map(
    await Promise.all(
      LOGIC_GAME_IDS.map(async (gameId) => {
        const { CAMPAIGN } = await import(
          `../dist/logica/games/${gameId}/campaign.mjs`
        );
        return [gameId, CAMPAIGN];
      }),
    ),
  );
  const index = {};
  for (const mission of CAMPAIGN_MISSIONS) {
    if (!campaigns.has(mission.gameId)) continue;
    const levels = campaigns.get(mission.gameId).filter(mission.matchesLevel);
    if (levels.length === 0)
      throw new Error(`A missão ${mission.id} não possui fase comprovável.`);
    index[mission.id] = {};
    for (const level of levels) {
      if (
        typeof level.id !== "string" ||
        !Number.isInteger(level.version) ||
        level.version < 1
      ) {
        throw new Error(`Identidade inválida na missão ${mission.id}.`);
      }
      if (Object.hasOwn(index[mission.id], level.id)) {
        throw new Error(`Fase repetida na missão ${mission.id}: ${level.id}.`);
      }
      index[mission.id][level.id] = level.version;
    }
  }
  return index;
}

export function renderLogicMissionIndex(index) {
  const missions = Object.entries(index)
    .map(([missionId, levels]) => {
      const entries = Object.entries(levels)
        .map(([id, version]) => `    ${JSON.stringify(id)}: ${version},`)
        .join("\n");
      return `  ${JSON.stringify(missionId)}: Object.freeze({\n${entries}\n  }),`;
    })
    .join("\n");
  return `/** Índice de fases atuais; gerado por scripts/build-achievement-index.mjs. */
export const LOGIC_MISSION_INDEX = Object.freeze({
${missions}
});

/** Identidade e versão precisam coincidir; a posição exibida não prova conclusão. */
export function matchesIndexedMission(missionId, level) {
  if (
    !level ||
    typeof level.id !== "string" ||
    !Number.isInteger(level.version) ||
    !Object.hasOwn(LOGIC_MISSION_INDEX, missionId)
  )
    return false;
  const levels = LOGIC_MISSION_INDEX[missionId];
  return Boolean(
    levels &&
    Object.hasOwn(levels, level.id) &&
    levels[level.id] === level.version,
  );
}
`;
}

async function main() {
  const index = await buildLogicMissionIndex();
  const source = renderLogicMissionIndex(index);
  if (process.argv.includes("--check")) {
    if ((await readFile(destination, "utf8")) !== source) {
      throw new Error(
        "O índice das missões está desatualizado. Execute node scripts/build-achievement-index.mjs.",
      );
    }
    console.log(
      `Índice conferido: ${Object.keys(index).length} missões de seis campanhas.`,
    );
    return;
  }
  await writeFile(destination, source);
  console.log(`Índice salvo em ${fileURLToPath(destination)}.`);
}

if (
  process.argv[1] &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url
) {
  await main();
}

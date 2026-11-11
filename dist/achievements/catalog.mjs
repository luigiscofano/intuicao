import { CAMPAIGN_MISSIONS } from "./campaign-missions.mjs";
import { LEGACY_VERSUS_MISSIONS } from "./legacy-versus-missions.mjs";
import { VERSUS_MISSIONS } from "./versus-missions.mjs";

// O catálogo contém apenas metadados e predicados: não carrega motores de jogos.
export const ACTION_MISSIONS = Object.freeze([
  ...LEGACY_VERSUS_MISSIONS,
  ...VERSUS_MISSIONS,
]);

export const MISSION_CATALOG = Object.freeze([
  ...CAMPAIGN_MISSIONS,
  ...ACTION_MISSIONS,
]);

export const MISSION_BY_ID = new Map(
  MISSION_CATALOG.map((mission) => [mission.id, mission]),
);

export const ACTION_MISSION_IDS = new Set(
  ACTION_MISSIONS.map((mission) => mission.id),
);

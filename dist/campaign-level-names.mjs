import { CAMPAIGN_LEVEL_NAMES } from './campaign-level-names-data.mjs';
import { displayCampaignName } from './campaign-display-names.mjs';

/**
 * Nome editorial de uma fase existente. IDs continuam sendo a identidade dos
 * saves: títulos não participam de regras, respostas, migrações nem conquistas.
 * Chame apenas para a campanha (incluindo o desafio diário do mesmo catálogo).
 * Fases externas ou arquivadas desconhecidas conservam seu nome de origem.
 */
export function campaignLevelName(game, level) {
  const names = CAMPAIGN_LEVEL_NAMES[game];
  const id = String(level?.id ?? '');
  return names && Object.hasOwn(names, id)
    ? names[id]
    : displayCampaignName(level);
}

import {CATALOG} from './catalog.mjs';
export {CHAPTERS,DIFFICULTIES,CONCEPTS} from './generator.mjs';
export const CAMPAIGN=Object.freeze(CATALOG);
export const CAMPAIGN_VERSION='orbita-campaign-3';
export function campaignLevel(id){return CAMPAIGN.find(level=>level.id===Number(id))??null;}

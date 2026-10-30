import {CATALOG} from './catalog.mjs';
export {DIFFICULTIES,CONCEPTS} from './generator.mjs';
export const CAMPAIGN=Object.freeze(CATALOG);
export const CAMPAIGN_VERSION='orbita-campaign-80-v1';
// Six editorial groups deliberately map to five internal generator strengths.
export const EDITORIAL_TO_INTERNAL=Object.freeze([0,1,2,3,4,4]);
export const CAMPAIGN_TIERS=Object.freeze(['Básico','Aprendiz','Intermediário','Avançado','Mestre','Modo Sábio'].map((name,index)=>Object.freeze({name,index,start:index*15+1,end:index===5?80:index*15+15,internalDifficulty:EDITORIAL_TO_INTERNAL[index]})));
export const CHAPTERS=CAMPAIGN_TIERS;
export function campaignTier(number){return CAMPAIGN_TIERS.find(tier=>number>=tier.start&&number<=tier.end)??null;}
export function campaignLevel(id){return CAMPAIGN.find(level=>level.id===Number(id))??null;}

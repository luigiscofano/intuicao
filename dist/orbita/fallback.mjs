import {CAMPAIGN} from './campaign.mjs';
import {seedNumber,levelSignature} from './generator.mjs';
import {validateLevel,replay,initialState,isWon,RULES_VERSION} from './engine.mjs';

/** A finite, certified reservoir, not a cosmetically relabeled generated board. */
export function selectFallback(seed,options={}){
 const normalized=seedNumber(seed),difficulty=Number.isInteger(options.difficulty)?Math.max(0,Math.min(4,options.difficulty)):0;
 const recent=new Set(options.recentSignatures??[]),families=(options.recentFamilies??[]).slice(-2);
 const pool=CAMPAIGN.filter(level=>level.id>10&&level.difficulty===difficulty);
 const offset=normalized%pool.length;
 for(const avoidFamilies of [true,false])for(let i=0;i<pool.length;i++){
  const source=pool[(offset+i)%pool.length];if(avoidFamilies&&families.includes(source.family))continue;
  const signature=source.validation.signature??levelSignature(source);if(recent.has(signature))continue;
  const level=structuredClone(source);
  if(!validateLevel(level).valid||isWon(level,initialState(level))||!replay(level,level.solution).solved)continue;
  level.id='endless-'+normalized.toString(16)+'-reserve-1';level.seed=normalized;
  level.generation={seed:normalized,version:1,difficulty,source:'certified-reservoir',sourceLevel:source.id};
  return {level,signature,validation:level.validation,seed:normalized,generatorVersion:'orbita-generator-1',rulesVersion:RULES_VERSION,source:'fallback',attempts:0};
 }
 const error=new Error('A reserva desta faixa já apareceu nas rodadas recentes.');error.code='RESERVOIR_EXHAUSTED';throw error;
}

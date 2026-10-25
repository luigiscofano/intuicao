import {CATALOG} from './catalog.mjs';
import {validateLevel,replay,initialState,isWon,RULES_VERSION} from './engine.mjs';

export const ENDLESS_VERSION='orbita-generator-2';
export function topologyRecency(level){
 const matrix=level.rings.map(a=>level.rings.map(b=>a===b?0:a.cells.filter(id=>b.cells.includes(id)).length));
 return {rings:level.rings.length,intersections:level.cells.filter(c=>level.rings.filter(r=>r.cells.includes(c.id)).length===2).length,family:level.family,matrix};
}
const normalizedSeed=value=>{if(Number.isSafeInteger(value))return value>>>0;let h=2166136261;for(const c of String(value??0)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
/** Seed selects a fully certified definition, never reinterprets an existing saved seed. */
export function selectCertifiedV2(seed,options={},source='generated'){
 const normalized=normalizedSeed(seed),difficulty=Number.isInteger(options.difficulty)?Math.max(0,Math.min(4,options.difficulty)):0;
 const [lo,hi]=[[11,50],[51,200],[201,300],[301,650],[651,1000]][difficulty];
 const pool=CATALOG.filter(l=>l.id>=lo&&l.id<=hi),recent=new Set(options.recentSignatures??[]);
 const previous=(options.recentTopologies??[]).at(-1),previousFamily=(options.recentFamilies??[]).at(-1);
 const offset=normalized%pool.length;
 for(let i=0;i<pool.length;i++){
  const candidate=pool[(offset+i)%pool.length],topology=topologyRecency(candidate);
  if(difficulty>=2&&topology.intersections<2)continue;
  if(difficulty>=2&&previous&&(topology.rings===previous.rings||topology.intersections===previous.intersections||topology.family===previous.family))continue;
  if(difficulty>=2&&previousFamily===topology.family)continue;
  const signature=candidate.validation?.signature??JSON.stringify([candidate.rings,candidate.targets,candidate.initial]);
  if(recent.has(signature))continue;
  if(!validateLevel(candidate).valid||isWon(candidate,initialState(candidate))||!replay(candidate,candidate.solution).solved)continue;
  const level=structuredClone(candidate);level.id='endless-'+normalized.toString(16)+'-2';level.seed=normalized;level.difficulty=difficulty;
  level.generation={seed:normalized,version:2,difficulty,source:'certified-reservoir',sourceLevel:candidate.id,topology};
  return {level,signature,topology,validation:level.validation,seed:normalized,generatorVersion:ENDLESS_VERSION,rulesVersion:RULES_VERSION,source,attempts:i+1};
 }
 const error=new Error('A reserva desta faixa não contém outro desafio diferente dos recentes. Seu desafio atual foi preservado.');error.code='RESERVOIR_EXHAUSTED';throw error;
}

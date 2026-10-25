import {selectCertifiedV2} from './endless-v2.mjs';
/** Replay-certified reserve with the same diversity constraints as worker generation. */
export function selectFallback(seed,options={}){return selectCertifiedV2(seed,options,'fallback');}

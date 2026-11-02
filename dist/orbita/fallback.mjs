// Seleção da reserva certificada quando a geração de ÓRBITA precisa de alternativa.
import { selectCertifiedV2 } from './endless-v2.mjs';
/** Replay-certified reserve with the same diversity constraints as worker generation. */
export function selectFallback(seed, options = {}) {
  return selectCertifiedV2(seed, options, 'fallback');
}

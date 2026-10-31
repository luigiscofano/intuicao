// Somente Versus: limites da arte original, com seis pixels de respiro branco.
import {FAUNA_ASSETS} from './fauna-art.mjs';
export const VERSUS_FRONT_CROPS=Object.freeze({
 tuiuiu:Object.freeze([116, 59, 191, 316]),
 capivara:Object.freeze([394, 82, 280, 277]),
 bemtevi:Object.freeze([740, 132, 247, 222]),
 mico:Object.freeze([50, 394, 319, 240]),
 micoLeao:Object.freeze([394, 379, 286, 259]),
 tatu:Object.freeze([721, 377, 297, 286]),
 onca:Object.freeze([52, 684, 309, 270]),
 lobo:Object.freeze([408, 649, 257, 310]),
 coral:Object.freeze([708, 700, 312, 255]),
 jacare:Object.freeze([66, 970, 278, 245]),
 arara:Object.freeze([417, 969, 234, 242]),
 peixeBoi:Object.freeze([708, 969, 312, 232]),
 piranha:Object.freeze([89, 1224, 222, 210]),
 tucano:Object.freeze([413, 1219, 239, 218]),
 tamandua:Object.freeze([729, 1211, 265, 234]),
});
/** O viewport interno recorta a folha antes do ajuste de proporção externo.
 * Sem redesenho, recoloração, IDs duplicados ou alteração do hero e dos modais. */
export function versusFrontIcon(id,className='vs-mascot'){
 const crop=VERSUS_FRONT_CROPS[id];if(!crop)throw Error('Personagem inválido.');
 if(!['vs-mascot','ce-mascot'].includes(className))throw Error('Classe de personagem inválida.');
 const [x,y,w,h]=crop,s=FAUNA_ASSETS.front;
 return `<svg class="${className}" viewBox="${crop.join(' ')}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"><svg x="${x}" y="${y}" width="${w}" height="${h}" overflow="hidden"><image href="${s.url}" x="${-x}" y="${-y}" width="${s.width}" height="${s.height}"/></svg></svg>`;
}

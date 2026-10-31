// O mesmo catálogo frontal e enquadramento original utilizados em CERCO.
import {FAUNA_ART,FAUNA_ASSETS} from './fauna-art.mjs';
import {FAUNA_INFO} from './fauna-info-content.mjs';
export const DEFAULT_MASCOTS=Object.freeze(['capivara','onca']);
export const MASCOT_IDS=Object.freeze(FAUNA_ART.map(a=>a.id));
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Saves anteriores recebem só a aparência padrão; a partida não é migrada.
export function normalizeMascots(value){if(value===undefined)return [...DEFAULT_MASCOTS];return Array.isArray(value)&&value.length===2&&value.every(id=>MASCOT_IDS.includes(id))?[...value]:null;}
export function mascotName(id){return FAUNA_INFO[id]?.name||id;}
export function mascotOptions(selected){return FAUNA_ART.map(a=>`<option value="${a.id}" ${selected===a.id?'selected':''}>${esc(mascotName(a.id))}</option>`).join('');}
export function mascotIcon(id){const a=FAUNA_ART.find(a=>a.id===id);if(!a)throw Error('Personagem inválido.');const s=FAUNA_ASSETS.front;return `<svg class="vs-mascot" viewBox="${a.front.join(' ')}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"><image href="${s.url}" width="${s.width}" height="${s.height}"/></svg>`;}

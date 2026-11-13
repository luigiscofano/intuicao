/** Ordem pública da coleção. Os IDs continuam estáveis para rotas e progresso. */
export const ACTIVE_GAME_IDS = Object.freeze(['light', 'cut', 'elo', 'prumo', 'pacto', 'sintonia', 'repasse', 'pulso', 'foz', 'refugio', 'mirante', 'renovo', 'desvio', 'broto', 'cerco', 'mosaico', 'quinhao', 'estalo', 'acorde']);
export const ACTIVE_GAME_COUNT = ACTIVE_GAME_IDS.length;
const numbers = new Map(ACTIVE_GAME_IDS.map((id, index) => [id, String(index + 1).padStart(2, '0')]));
/** Número editorial: nunca use este valor como chave de armazenamento. */
export function gameDisplayNumber(id) { return numbers.get(id); }

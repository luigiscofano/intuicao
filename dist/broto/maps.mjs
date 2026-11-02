// Mapas de BROTO com limites, pedras e células disponíveis para plantar.
/** Mapas locais de BROTO. Pedras e pontos fora do jardim interrompem os estímulos. */
const freeze = (x) => {
  if (x && typeof x === 'object') {
    Object.values(x).forEach(freeze);
    Object.freeze(x);
  }
  return x;
};
function map(id, name, description, { rows = 5, cols = 5, walls = [], outside = [] } = {}) {
  const excluded = [...walls, ...outside];
  if (
    new Set(excluded).size !== excluded.length ||
    excluded.some((c) => !Number.isInteger(c) || c < 0 || c >= rows * cols) ||
    rows * cols - excluded.length < 16
  )
    throw Error('Mapa de BROTO inválido.');
  return freeze({
    id,
    version: 1,
    name,
    description,
    rows,
    cols,
    walls,
    outside,
    playableCount: rows * cols - excluded.length,
  });
}
export const BROTO_MAPS = freeze([
  map(
    'classic',
    'Jardim clássico',
    'O jardim original: quatro linhas e quatro colunas, sem obstáculos.',
    { rows: 4, cols: 4 },
  ),
  map(
    'clareira',
    'Clareira',
    'Uma pedra central separa os estímulos que atravessariam o coração do jardim.',
    { walls: [12] },
  ),
  map(
    'quatro-pedras',
    'Quatro pedras',
    'Quatro pedras criam corredores nas bordas e caminhos entre os canteiros.',
    { walls: [6, 8, 16, 18] },
  ),
  map(
    'passagens',
    'Passagens',
    'Duas pedras interrompem a coluna central e valorizam as passagens laterais.',
    { walls: [7, 17] },
  ),
  map('ampulheta', 'Ampulheta', 'Duas áreas largas se encontram em um corredor de três colunas.', {
    outside: [5, 9, 10, 14, 15, 19],
  }),
  map(
    'cruz',
    'Jardim em cruz',
    'Dezessete canteiros: braços laterais largos e duas pontas estreitas.',
    { outside: [0, 1, 3, 4, 20, 21, 23, 24] },
  ),
  map(
    'recantos',
    'Recantos',
    'Cantos recortados e duas pedras diagonais criam caminhos assimétricos por linha.',
    { outside: [0, 4, 20, 24], walls: [6, 18] },
  ),
]);
/** Ausência de identidade é somente o legado clássico; IDs desconhecidos nunca caem em fallback. */
export function getBrotoMap(idOrState = 'classic') {
  const isState = idOrState && typeof idOrState === 'object';
  const id = isState
    ? Object.hasOwn(idOrState, 'mapId')
      ? idOrState.mapId
      : 'classic'
    : idOrState;
  const selected = BROTO_MAPS.find((m) => m.id === id);
  if (
    !selected ||
    (isState && Object.hasOwn(idOrState, 'mapVersion') && idOrState.mapVersion !== selected.version)
  )
    throw Error('Mapa de BROTO desconhecido ou incompatível.');
  return selected;
}

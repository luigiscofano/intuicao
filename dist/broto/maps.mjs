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
const originalMaps = freeze([
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
// Jardins maiores mantêm oito sementes por pessoa e as duas rodadas originais.
// O obstáculo muda linhas de estímulo, não adiciona regras ou plantas especiais.
export const BROTO_GRID_SIZES = freeze([4,5,6,7,8]);
const expandedMaps = [5,6,7,8].flatMap(size => {
 const last = size*size-1;
 const pair = cells => [...new Set(cells.flatMap(cell => [cell,last-cell]))].sort((a,b) => a-b);
 const plans = [
  {family:'campo',name:'Campo aberto',description:'Linhas longas sem pedras: cada semente pode alcançar mais longe.'},
  {family:'veredas',name:'Veredas',description:'Duas pedras desencontradas desviam os estímulos entre canteiros.',walls:pair([size+1])},
  {family:'margens',name:'Margens',description:'Reentrâncias em margens opostas criam faixas de plantio distintas.',outside:pair([size])},
  {family:'ilhas',name:'Ilhas',description:'Pedras separadas interrompem quatro linhas de estímulo.',walls:pair([size+1,size+2])},
  {family:'varandas',name:'Varandas',description:'Duas entradas nas bordas recortam os canteiros extremos.',outside:pair([1,2])},
  {family:'travessias',name:'Travessias',description:'Uma pedra e uma margem recortada reorganizam as travessias.',walls:pair([size+size-2]),outside:pair([2*size])},
  {family:'diagonais',name:'Diagonais',description:'Pedras em duas diagonais interrompem encontros previsíveis.',walls:pair([2])},
  {family:'recifes',name:'Recifes',description:'Obstáculos junto à borda deixam um miolo livre para as colheitas.',walls:pair([size, size+1])},
 ];
 return plans.map(plan => freeze({...map(`${plan.family}-${size}`,plan.name,plan.description,{rows:size,cols:size,walls:plan.walls||[],outside:plan.outside||[]}),family:plan.family}));
});
export const BROTO_MAPS = freeze([...originalMaps,...expandedMaps]);
export function getBrotoMapsForSize(size=4) { return BROTO_MAPS.filter(m => m.rows===size && m.cols===size); }
export function getBrotoMapVariant(idOrState='classic',size=4) {
 const current=getBrotoMap(idOrState);
 if(!BROTO_GRID_SIZES.includes(size)) return null;
 const family=current.family||current.id;
 return getBrotoMapsForSize(size).find(m => (m.family||m.id)===family)||getBrotoMapsForSize(size)[0]||null;
}
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

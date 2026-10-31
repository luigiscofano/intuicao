// The complete 16-animal set, independent of each board's logical identity.
const entries = [
  ['tuiuiu','Tuiuiú'],
  ['capivara','Capivara'],
  ['bemtevi','Bem-te-vi'],
  ['mico','Mico-leão-dourado'],
  ['tamandua','Tamanduá-bandeira'],
  ['onca','Onça-pintada'],
  ['lobo','Lobo-guará'],
  ['coral','Cobra-coral'],
  ['jacare','Jacaré-do-papo-amarelo'],
  ['tatu','Tatu-bola'],
  ['arara','Arara-azul'],
  ['peixeboi','Peixe-boi-da-Amazônia'],
  ['piranha','Piranha-vermelha'],
  ['tucano','Tucano'],
  ['macaco','Macaco'],
  ['quati','Quati']
];
// Historical saves and the original SVG metadata used 'anta' for this same frame.
// Normalize only the cosmetic ID: never redraw the roster or alter game history.
export const normalizeAnimalId=id=>id==='anta'?'peixeboi':id;
export const ANIMAL_IDS=Object.freeze(entries.map(([id])=>id));
export const ANIMAL_NAMES=Object.freeze(Object.fromEntries(entries.map(([id,name])=>[id,name])));
const atlasURL=new URL('./assets/chibi-user-roster.svg',import.meta.url).href;
export const ANIMAL_SPRITES=Object.freeze(Object.fromEntries(entries.map(([id],frame)=>[
  id,Object.freeze({url:atlasURL,columns:4,rows:4,frame})
])));

// Fisher–Yates samples without replacement. Never called during rendering,
// movement, undo/redo or an ordinary restart of the current attempt.
export function resolveAnimalRoster(count,saved,random=Math.random) {
  if(!Number.isInteger(count)||count<1||count>ANIMAL_IDS.length)throw new RangeError('Quantidade de animais inválida.');
  if(Array.isArray(saved))saved=saved.map(normalizeAnimalId);
  if(Array.isArray(saved)&&saved.length===count&&new Set(saved).size===count&&saved.every(id=>ANIMAL_IDS.includes(id)))return saved.slice();
  const pool=ANIMAL_IDS.slice();
  for(let i=0;i<count;i++){
    const j=i+Math.floor(random()*(pool.length-i));
    [pool[i],pool[j]]=[pool[j],pool[i]];
  }
  return pool.slice(0,count);
}

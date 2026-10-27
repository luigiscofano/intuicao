// The complete 16-animal set, independent of each board's logical identity.
const entries = [
  ['tuiuiu','Tuiuiú','01_tuiuiu'],
  ['capivara','Capivara','02_capivara'],
  ['bemtevi','Bem-te-vi','03_bem_te_vi'],
  ['mico','Mico-leão-dourado','04_mico_leao_dourado'],
  ['tamandua','Tamanduá-bandeira','05_tamandua_bandeira'],
  ['onca','Onça-pintada','06_onca_pintada'],
  ['lobo','Lobo-guará','07_lobo_guara'],
  ['coral','Cobra-coral','08_cobra_coral'],
  ['jacare','Jacaré-do-papo-amarelo','09_jacare_do_papo_amarelo'],
  ['tatu','Tatu-bola','10_tatu_bola'],
  ['arara','Arara-azul','11_arara_azul'],
  ['anta','Anta','12_anta'],
  ['piranha','Piranha-vermelha','13_piranha_vermelha'],
  ['tucano','Tucano','14_tucano'],
  ['macaco','Macaco','15_macaco'],
  ['quati','Quati','16_quati']
];
export const ANIMAL_IDS=Object.freeze(entries.map(([id])=>id));
export const ANIMAL_NAMES=Object.freeze(Object.fromEntries(entries.map(([id,name])=>[id,name])));
export const ANIMAL_SPRITES=Object.freeze(Object.fromEntries(entries.map(([id,,file])=>[
  id,Object.freeze({url:new URL(`./assets/roster/${file}.svg`,import.meta.url).href,columns:1,rows:1,frame:0})
])));

// Fisher–Yates samples without replacement. Never called during rendering,
// movement, undo/redo or an ordinary restart of the current attempt.
export function resolveAnimalRoster(count,saved,random=Math.random) {
  if(!Number.isInteger(count)||count<1||count>ANIMAL_IDS.length)throw new RangeError('Quantidade de animais inválida.');
  if(Array.isArray(saved)&&saved.length===count&&new Set(saved).size===count&&saved.every(id=>ANIMAL_IDS.includes(id)))return saved.slice();
  const pool=ANIMAL_IDS.slice();
  for(let i=0;i<count;i++){
    const j=i+Math.floor(random()*(pool.length-i));
    [pool[i],pool[j]]=[pool[j],pool[i]];
  }
  return pool.slice(0,count);
}

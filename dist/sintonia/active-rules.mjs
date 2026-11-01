import {validateLevel} from './engine.mjs';
// O motor antigo continua legível para arquivos; a interface ativa aceita só este conjunto.
const removed={boxes:'caixas',portals:'portais',fragile:'pontes frágeis',oneWays:'passagens de sentido único',selectors:'seletores de conexão'};
const tags={box:'caixas',portal:'portais',delivery:'entrega de caixas',oneway:'passagens de sentido único',fragile:'pontes frágeis',selector:'seletores de conexão'};
export function removedSintoniaMechanics(level){
 const found=new Set();
 for(const board of Array.isArray(level?.boards)?level.boards:[]){
  for(const [field,label] of Object.entries(removed))if(board?.[field]?.length)found.add(label);
  if(Array.isArray(board?.gates)&&board.gates.some(gate=>gate?.condition?.type==='selected'))found.add(tags.selector);
 }
 if(level?.channels?.length)found.add(tags.delivery);
 if(level?.initialSelectors&&Object.keys(level.initialSelectors).length)found.add(tags.selector);
 for(const tag of Array.isArray(level?.mechanics)?level.mechanics:[])if(tags[tag])found.add(tags[tag]);
 return [...found];
}
/** Destinos nunca compartilham a casa de uma placa ou interruptor. */
export function goalButtonSintoniaOverlaps(level){
 const found=[];
 for(const [index,board] of (Array.isArray(level?.boards)?level.boards:[]).entries()){
  if(!Number.isInteger(board?.goal))continue;
  for(const [field,kind] of [['plates','placa de pressão'],['switches','interruptor']]){
   for(const item of Array.isArray(board[field])?board[field]:[])if(item?.cell===board.goal)found.push({board:index,boardId:board.id,cell:board.goal,kind});
  }
 }
 return found;
}
export function validateActiveSintoniaLevel(level){
 const banned=removedSintoniaMechanics(level);
 if(banned.length)return {valid:false,errors:[`Este nível usa elementos retirados de SINTONIA: ${banned.join(', ')}. Use paredes, gelo, placas, interruptores, chaves e cancelas.`],removedMechanics:banned};
 const overlaps=goalButtonSintoniaOverlaps(level);
 if(overlaps.length)return {valid:false,errors:overlaps.map(item=>`Tabuleiro ${item.board+1}: o destino ocupa a mesma célula que ${item.kind==='interruptor'?'um interruptor':'uma placa de pressão'} (${item.cell}). Separe o destino dos botões; o arquivo não foi alterado.`),goalButtonOverlaps:overlaps};
 return validateLevel(level);
}

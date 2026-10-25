/** Dicas limitadas e baseadas nas regras, sem ler gabaritos, notas ou executar busca.
 * Primeiro destaca casas, depois explica; aplicar exige comando explícito separado.
 * Recalcular depois de cada edição lógica.
 * Identificadores canônicos: 0 círculo, 1 triângulo, 2 quadrado, 3 losango.
 */
import {validateGeometry,geometryLocalAnalysis,neighbors} from './geometry-games.mjs';
const names=['círculo','triângulo','quadrado','losango'];
const coord=(l,c)=>`L${Math.floor(c/l.cols)+1}C${c%l.cols+1}`;
const result=(cells,focusText,explanation,action=null)=>({cells:[...new Set(cells)],focusText,explanation,action});
const unavailable=()=>result([],'Nenhuma dedução direta disponível.','Não encontrei uma conclusão demonstrada pelas técnicas locais disponíveis. Isso não prova que a posição esteja correta ou que não exista outra dedução. Nenhuma resposta foi revelada.');
function conflict(l,cells,text){const where=cells.length?cells.map(c=>coord(l,c)).join(', '):'o tabuleiro';return result(cells,`Revise ${where}.`,`Contradição na configuração atual: ${text} Revise ${where} antes de continuar.`);}
function geometry(l,state){
 const check=validateGeometry(l,state);
 if(check.violations.length){const v=check.violations[0];return conflict(l,v.cells||[],v.message);}
 if(check.complete)return result([],'Todas as regras foram satisfeitas.','O tabuleiro está completo e válido pelas regras.');
 // PRUMO retains its import guard. ELO uses bounded, local-only propagation
 // across the published campaign, including 10–12-cell-wide boards.
 if(l.game!=='elo'&&l.rows*l.cols>64)return unavailable();
 const d=geometryLocalAnalysis(l,state);
 if(l.game==='elo'&&d.contradiction&&d.diagnostic?.message)return conflict(l,d.diagnostic.cells??[],d.diagnostic.message);
 if(d.contradiction){const empty=d.candidates.findIndex(x=>!x.length),cells=l.game==='elo'?l.regions.flatMap((r,c)=>r===empty?[c]:[]):[empty];return conflict(l,cells,`As restrições locais deixam ${l.game==='elo'?`a região ${empty+1}`:coord(l,empty)} sem alternativa. ${d.eliminations.map(e=>e.explanation).join(' ')}`);}
 const f=d.forced[0];
 if(f){const cell=l.game==='elo'?f.value:f.index;
  // Include the preceding propagation trace, not an invented rationale for a
  // value selected from a solution. Stop at the event that forced this value.
  const at=d.eliminations.findIndex(e=>e.index===f.index&&Array.isArray(f.premises)&&f.premises.includes(e)&&e===f.premises.at(-1));
  const trace=at>=0?d.eliminations.slice(0,at+1):[];
  const conclusion=l.game==='elo'?`Portanto, o ponto da região ${f.index+1} deve ficar em ${coord(l,cell)}.`:`Portanto, ${coord(l,cell)} pertence ao apoio ${String.fromCharCode(65+f.value)} (${f.value+1}).`;
  return result([cell],`Observe ${coord(l,cell)}${l.game==='elo'?` na região ${f.index+1}`:''}.`,[...new Set([...trace.map(e=>e.explanation),f.explanation,conclusion])].join(' '),{type:l.game==='elo'?'place-point':'paint',cell,value:f.value});
 }
 // Singleton regions need no eliminations to force their only location.
 if(l.game==='elo')for(let r=0;r<d.candidates.length;r++)if((state.positions?.[r]??-1)<0&&d.candidates[r].length===1){const cell=d.candidates[r][0];return result([cell],`Observe a região ${r+1}, em ${coord(l,cell)}.`,`A região ${r+1} tem somente ${coord(l,cell)} como posição permitida pelas pistas e pelas deduções locais. Como cada região precisa de exatamente um ponto, ele deve ocupar essa casa.`,{type:'place-point',cell,value:cell});}
 const e=d.eliminations[0];if(e){const cell=l.game==='elo'?e.value:e.index;return result([cell],`Observe ${coord(l,cell)}.`,e.explanation);}
 return unavailable();
}
function symbolConflict(l,v){
 const n=l.rows*l.cols;
 if(l.rows!==8||l.cols!==8||l.clues?.length!==64||v?.length!==64)return {cells:[],text:'O PACTO clássico exige uma grade 8 × 8.'};
 for(let c=0;c<n;c++){
  if(!Number.isInteger(v[c])||v[c]<-1||v[c]>3)return {cells:[c],text:'Símbolo inválido.'};
  if(l.clues[c]>=0&&v[c]!==l.clues[c])return {cells:[c],text:'A pista fixa foi alterada.'};
 }
 for(let axis=0;axis<2;axis++)for(let i=0;i<8;i++){
  const cells=Array.from({length:8},(_,j)=>axis?j*8+i:i*8+j),empty=cells.filter(c=>v[c]<0).length;
  for(let value=0;value<4;value++){
   const count=cells.filter(c=>v[c]===value).length;
   if(count>2)return {cells,text:`A ${axis?'coluna':'linha'} ${i+1} já contém ${count} exemplares de ${names[value]}; o limite é dois.`};
   if(count+empty<2)return {cells,text:`A ${axis?'coluna':'linha'} ${i+1} não tem casas livres suficientes para completar dois exemplares de ${names[value]}.`};
  }
 }
 for(let c=0;c<n;c++)if(v[c]>=0){const ns=neighbors(c,8,8),same=ns.filter(j=>v[j]===v[c]);
  if(same.length>1)return {cells:[c,...same],text:`${coord(l,c)} toca ${same.length} vizinhos de ${names[v[c]]}, mas precisa tocar exatamente um.`};
  if(!same.length&&ns.every(j=>v[j]>=0))return {cells:[c,...ns],text:`${coord(l,c)} não tem vizinho de ${names[v[c]]}, e todas as casas vizinhas já estão preenchidas.`};
 }
 return null;
}
function symbols(l,state){
 const v=Array.isArray(state)?state:state.values,first=symbolConflict(l,v);if(first)return conflict(l,first.cells,first.text);
 if(v.every(x=>x>=0))return result([],'Todas as regras foram satisfeitas.','Cada linha e coluna tem dois exemplares de cada símbolo, e cada casa tem exatamente um vizinho igual.');
 const deductions=[];
 // Test four values only against monotone, direct rule violations. No tree
 // search, complete answer, automatic candidates or manual notes are consulted.
 for(let c=0;c<v.length;c++)if(v[c]<0){const allowed=[],removed=[];
  for(let value=0;value<4;value++){const trial=v.slice();trial[c]=value;const why=symbolConflict(l,trial);if(why)removed.push({value,...why});else allowed.push(value);}
  if(!allowed.length)return conflict(l,[c,...removed.flatMap(e=>e.cells)],`${coord(l,c)} não admite nenhum símbolo. ${removed.map(e=>`${names[e.value]} é impossível: ${e.text}`).join(' ')}`);
  deductions.push({c,allowed,removed});
 }
 const forced=deductions.find(d=>d.allowed.length===1);
 if(forced){const {c,allowed,removed}=forced;return result([c,...removed.flatMap(e=>e.cells)],`Observe ${coord(l,c)} e suas restrições.`,`${removed.map(e=>`${coord(l,c)} não pode ser ${names[e.value]}: ${e.text}`).join(' ')} Portanto, ${coord(l,c)} é ${names[allowed[0]]}.`,{type:'set',cell:c,value:allowed[0]});}
 const elimination=deductions.find(d=>d.removed.length);
 if(elimination){const {c,removed}=elimination;return result([c,...removed.flatMap(e=>e.cells)],`Observe as possibilidades de ${coord(l,c)}.`,removed.map(e=>`${coord(l,c)} não pode ser ${names[e.value]}: ${e.text}`).join(' ')+' Ainda não há um único valor demonstrado para esta casa.');}
 return unavailable();
}
export function buildDirectHint(game,level,state){
 if(game==='pacto')return symbols(level,state);
 if(game==='elo'||game==='prumo')return geometry(level,state);
 return result([],'Dica não disponível neste modo.','Dicas de melhor jogada do DESVIO pertencem apenas ao treino. Nenhuma jogada será aplicada.');
}

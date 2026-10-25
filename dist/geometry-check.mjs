import {validateGeometry,supportCells} from './geometry-games.mjs';
import {comparePactoReference,createPactoCheck} from './pacto-check.mjs';
import {validateSymbols} from './symbol-games.mjs';

export const CHECK_SEARCH_DEADLINE=1200;
const correct=()=>({kind:'correct',cells:[],text:'Tudo certo até aqui!'});
const inconclusive=()=>({kind:'inconclusive',cells:[],text:'Não foi possível concluir a checagem agora. Suas escolhas foram preservadas.'});
export function checkReferenceAvailable(level,reference){
 if(level.game==='pacto')return comparePactoReference(level,level.clues,reference).kind!=='unavailable';
 try{return Array.isArray(reference)&&validateGeometry(level,reference).complete&&validateGeometry(level,reference).valid;}catch{return false;}
}
export function playerCells(level,state){
 if(level.game==='elo')return state.positions.flatMap((cell,r)=>cell>=0&&level.fixed?.[r]===undefined?[cell]:[]);
 const fixed=new Set(level.supports.flatMap(p=>supportCells(level,p)));
 return state.assignments.flatMap((support,cell)=>support>=0&&!fixed.has(cell)?[cell]:[]);
}
// A reference is a cheap certificate of compatibility, never the definition of
// a geometric solution. Alternative configurations are checked by the rules.
export function prepareManualCheck(level,state,reference){
 if(!checkReferenceAvailable(level,reference))return {kind:'unavailable',cells:[],text:'Checagem indisponível: este mapa não tem gabarito de referência válido.'};
 if(level.game==='pacto'){
  const comparison=comparePactoReference(level,state.values,reference);if(comparison.kind==='empty')return comparison;
  if(state.values.every(v=>v>=0)){const check=validateSymbols(level,state.values);if(check.complete&&check.valid)return correct();}
  return comparison;
 }
 const filled=playerCells(level,state);
 if(!filled.length)return {kind:'empty',cells:[],text:'Preencha algumas casas para checar.'};
 const check=validateGeometry(level,state);
 if(check.complete&&check.valid)return correct();
 const values=state[level.game==='elo'?'positions':'assignments'];
 if(values.every((v,i)=>v<0||v===reference[i]))return correct();
 if(check.violations.length){
  const placed=new Set(filled);
  const cells=[...new Set(check.violations.flatMap(v=>v.cells??[]))].filter(c=>placed.has(c));
  return {kind:'error',cells,text:'Há escolhas que não atendem às regras. '+check.violations[0].message};
 }
 return {kind:'pending',cells:[],text:'Checando se suas escolhas permitem uma solução…'};
}
export function finishGeometryCheck(result){
 if(result?.count>0)return correct();
 if(result?.count===0&&result.exhaustive===true)return {kind:'error',cells:[],text:'As escolhas atuais não permitem concluir uma solução pelas regras. Revise as peças preenchidas.'};
 return inconclusive();
}
export function createManualCheck(onChange,clock=globalThis,makeWorker=()=>new Worker(new URL('./geometry-check-worker.mjs',import.meta.url),{type:'module'})){
 const feedback=createPactoCheck(onChange,clock);let worker=null,deadline=null,revision=0;
 function stop(){revision++;worker?.terminate();worker=null;if(deadline!==null)clock.clearTimeout(deadline);deadline=null;}
 function reset(){stop();feedback.reset();}
 return {get:feedback.get,reset,check(level,state,reference){
  reset();let result;try{result=prepareManualCheck(level,state,reference);}catch{result=inconclusive();}
  if(result.kind!=='pending'){feedback.show(result);return;}
  feedback.show(result);const token=revision;
  const finish=result=>{if(token!==revision)return;stop();feedback.show(result);};
  try{
   worker=makeWorker();worker.onmessage=event=>finish(finishGeometryCheck(event.data));worker.onerror=()=>finish(inconclusive());
   deadline=clock.setTimeout(()=>finish(inconclusive()),CHECK_SEARCH_DEADLINE);
   worker.postMessage({level,state});
  }catch{finish(inconclusive());}
 }};
}

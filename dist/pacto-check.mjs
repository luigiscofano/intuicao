// Manual reference comparison, deliberately separate from rule validation.
export const PACTO_CHECK_DURATION=10000;
export function comparePactoReference(level,values,reference){
 if(!Array.isArray(reference)||reference.length!==level.rows*level.cols||reference.some(v=>!Number.isInteger(v)||v<0||v>3))return {kind:'unavailable',cells:[],text:'Checagem indisponível: este mapa não tem gabarito de referência.'};
 const filled=values.flatMap((v,i)=>level.clues[i]<0&&Number.isInteger(v)&&v>=0&&v<=3?[i]:[]);
 const cells=filled.filter(i=>values[i]!==reference[i]);
 return !filled.length?{kind:'empty',cells:[],text:'Preencha algumas casas para checar.'}:cells.length?{kind:'mismatch',cells,text:'Algumas casas diferem do gabarito de referência.'}:{kind:'correct',cells:[],text:'Tudo certo até aqui!'};
}
export function createPactoCheck(onChange,clock=globalThis){
 let state=null,timer=null,revision=0;
 function reset(){revision++;if(timer!==null)clock.clearTimeout(timer);timer=null;state=null;}
 return {reset,get:()=>state?{...state,elapsed:Math.max(0,clock.Date.now()-state.startedAt)}:null,
  check(level,values,reference){reset();state={...comparePactoReference(level,values,reference),revision,startedAt:clock.Date.now()};const token=revision;
   timer=clock.setTimeout(()=>{if(token!==revision)return;reset();onChange();},PACTO_CHECK_DURATION);
   onChange();return state;
  }
 };
}

// Atraso apenas do feedback de edição; não interfere nas regras ou tentativas.
export const PACTO_ERROR_DELAY=2000;
export const PACTO_ERROR_FADE=300;
export function createPactoFeedback(onChange,clock=globalThis){
 const entries=new Map(),now=()=>clock.Date.now();
 const keyOf=(v,values)=>JSON.stringify([v.kind,v.symbol,v.cells.map(i=>[i,values[i]])]);
 function reset(){for(const e of entries.values())clock.clearTimeout(e.timer);entries.clear();}
 return {
  reset,
  sync(violations,values,{immediate=false}={}){
   const keys=new Set(violations.map(v=>keyOf(v,values)));
   for(const [key,e] of entries)if(!keys.has(key)){clock.clearTimeout(e.timer);entries.delete(key);}
   for(const violation of violations){
    const key=keyOf(violation,values);let e=entries.get(key);
    if(!e){
     e={violation,visible:false,revealedAt:null,timer:null};entries.set(key,e);
     e.timer=clock.setTimeout(()=>{
      // Um callback já enfileirado nunca pode ressuscitar um erro corrigido.
      if(entries.get(key)!==e)return;
      e.timer=null;e.visible=true;e.revealedAt=now();onChange();
     },PACTO_ERROR_DELAY);
    }
    if(immediate&&!e.visible){clock.clearTimeout(e.timer);e.timer=null;e.visible=true;e.revealedAt=now();}
   }
   const visible=[],fadeByCell=new Map();
   for(const e of entries.values())if(e.visible){
    visible.push(e.violation);
    // Preserva o instante de entrada ao recriar o DOM: não reinicia o fade.
    for(const cell of e.violation.cells)fadeByCell.set(cell,Math.max(fadeByCell.get(cell)??0,Math.max(0,now()-e.revealedAt)));
   }
   return {violations:visible,fadeByCell};
  }
 };
}

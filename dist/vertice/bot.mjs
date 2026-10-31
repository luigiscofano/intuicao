import {legalVerticeMoves,applyVerticeMove} from './engine.mjs';
export const VERTICE_BOT_LEVELS={beginner:{depth:1,nodes:64},intermediate:{depth:2,nodes:2000},strong:{depth:6,nodes:12000}};
const next=(s,m)=>applyVerticeMove(s,m).state;
export function evaluateVertice(s,p){if(s.over)return s.winner==='draw'?0:s.winner===p?10000:-10000;const mobility=legalVerticeMoves(s,p).length-legalVerticeMoves(s,1-p).length;const pressure=s.board.reduce((sum,v,c)=>v===null?sum+Math.min(2,s.influence[c][p])-Math.min(2,s.influence[c][1-p]):sum,0);return 80*(s.scores[p]-s.scores[1-p])+5*mobility+3*pressure;}
/** Busca limitada: controle e mobilidade são heurísticas, não prova de vitória. */
export function* verticeSearch(state,options={}){
 const difficulty=Object.hasOwn(VERTICE_BOT_LEVELS,options.difficulty)?options.difficulty:'intermediate',spec=VERTICE_BOT_LEVELS[difficulty];
 const budget=Math.max(difficulty==='beginner'?1:512,Math.min(50000,Number.isInteger(options.nodeBudget)?options.nodeBudget:spec.nodes));
 const depthLimit=Math.max(1,Math.min(6,Number.isInteger(options.depth)?options.depth:spec.depth)),root=state.player,legal=legalVerticeMoves(state);let nodes=0,depth=0;
 const result=(move,extra={})=>({move,nodes,depth,limited:true,nodeBudget:budget,difficulty,...extra});
 if(!legal.length)return result(null);
 if(difficulty==='beginner'){const seed=Number.isInteger(options.seed)?options.seed:0;return result(legal[(seed>>>0)%legal.length]);}
 // Verificação tática explícita em todas as candidatas antes da heurística.
 let candidates=[];
 for(const move of legal){const s=next(state,move);nodes++;if(nodes%64===0)yield;
  if(s.over&&s.winner===root)return result(move,{immediateWin:true});
  let unsafe=s.over&&s.winner!==root&&s.winner!=='draw';for(const reply of legalVerticeMoves(s)){nodes++;const after=next(s,reply);if(nodes%64===0)yield;if(after.over&&after.winner===1-root){unsafe=true;break;}}
  candidates.push({move,state:s,unsafe,score:evaluateVertice(s,root)});
 }
 const safe=candidates.filter(c=>!c.unsafe);if(safe.length)candidates=safe;
 candidates.sort((a,b)=>b.score-a.score);let best=candidates[0].move;
 function* search(s,left,alpha,beta){
  if(s.over)return s.winner==='draw'?0:s.winner===root?10000+left:-10000-left;
  if(left===0||nodes>=budget)return evaluateVertice(s,root);
  const maximize=s.player===root;let value=maximize?-Infinity:Infinity;
  for(const move of legalVerticeMoves(s)){if(nodes>=budget)break;nodes++;if(nodes%64===0)yield;const v=yield* search(next(s,move),left-1,alpha,beta);value=maximize?Math.max(value,v):Math.min(value,v);if(maximize)alpha=Math.max(alpha,value);else beta=Math.min(beta,value);if(beta<=alpha)break;}
  return Number.isFinite(value)?value:evaluateVertice(s,root);
 }
 for(let d=1;d<=depthLimit&&nodes<budget;d++){
  let score=-Infinity,choice=best,complete=true;
  for(const candidate of candidates){if(nodes>=budget){complete=false;break;}const v=yield* search(candidate.state,d-1,-Infinity,Infinity);if(v>score){score=v;choice=candidate.move;}}
  if(complete){best=choice;depth=d;}else break;
 }
 return result(best,{avoidedImmediateLoss:safe.length>0&&safe.length<legal.length});
}
export function chooseVerticeMove(state,options={}){const task=verticeSearch(state,options);let step;do{step=task.next();}while(!step.done);return step.value;}
/** Fallback cooperativo: devolve a thread a cada lote e aceita cancelamento. */
export async function chooseVerticeMoveAsync(state,options={}){const task=verticeSearch(state,options);for(;;){if(options.signal?.aborted)throw new DOMException('Busca cancelada','AbortError');const step=task.next();if(step.done)return step.value;await new Promise(resolve=>setTimeout(resolve,0));}}

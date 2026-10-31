import {legalCercoMoves,applyCercoMove,cercoNeighbors} from './engine.mjs';
export const CERCO_BOT_LEVELS={beginner:{depth:1,nodes:64},intermediate:{depth:2,nodes:2000},strong:{depth:5,nodes:12000}};
const next=(s,m)=>applyCercoMove(s,m).state;
const mobility=(s,p)=>legalCercoMoves({...s,over:false},p).length;
function features(s,p){
 const pieces=s.board.flatMap((x,i)=>x===p?[i]:[]),seen=new Set(pieces),queue=[...pieces];let exits=0;
 for(const c of pieces)for(const d of cercoNeighbors(c))if(s.board[d]===null)exits+=cercoNeighbors(d).filter(n=>n!==c&&s.board[n]===null).length;
 for(let i=0;i<queue.length;i++)for(const d of cercoNeighbors(queue[i]))if(s.board[d]===null&&!seen.has(d)){seen.add(d);queue.push(d);}
 return {mobility:mobility(s,p),exits,region:seen.size-pieces.length};
}
export function evaluateCerco(s,p){if(s.over)return s.winner===p?10000:-10000;const a=features(s,p),b=features(s,1-p);return 12*(a.mobility-b.mobility)+3*(a.exits-b.exits)+2*(a.region-b.region);}
/** Busca limitada: regiões são uma heurística, não prova de vitória/paridade. */
export function* cercoSearch(state,options={}){
 const difficulty=Object.hasOwn(CERCO_BOT_LEVELS,options.difficulty)?options.difficulty:'intermediate',spec=CERCO_BOT_LEVELS[difficulty];
 const budget=Math.max(difficulty==='beginner'?1:512,Math.min(50000,Number.isInteger(options.nodeBudget)?options.nodeBudget:spec.nodes));
 const depthLimit=Math.max(1,Math.min(6,Number.isInteger(options.depth)?options.depth:spec.depth)),root=state.player,legal=legalCercoMoves(state);let nodes=0,depth=0;
 const result=(move,extra={})=>({move,nodes,depth,limited:true,nodeBudget:budget,difficulty,...extra});
 if(!legal.length)return result(null);
 if(difficulty==='beginner'){const seed=Number.isInteger(options.seed)?options.seed:0;return result(legal[(seed>>>0)%legal.length]);}
 // Verificação tática explícita em todas as candidatas antes da heurística.
 let candidates=[];
 for(const move of legal){const s=next(state,move);nodes++;if(nodes%64===0)yield;
  if(s.over)return result(move,{immediateWin:true});
  let unsafe=false;for(const reply of legalCercoMoves(s)){nodes++;const after=next(s,reply);if(nodes%64===0)yield;if(after.over){unsafe=true;break;}}
  candidates.push({move,state:s,unsafe,score:evaluateCerco(s,root)});
 }
 const safe=candidates.filter(c=>!c.unsafe);if(safe.length)candidates=safe;
 candidates.sort((a,b)=>b.score-a.score);let best=candidates[0].move;
 function* search(s,left,alpha,beta){
  if(s.over)return s.winner===root?10000+left:-10000-left;
  if(left===0||nodes>=budget)return evaluateCerco(s,root);
  const maximize=s.player===root;let value=maximize?-Infinity:Infinity;
  for(const move of legalCercoMoves(s)){if(nodes>=budget)break;nodes++;if(nodes%64===0)yield;const v=yield* search(next(s,move),left-1,alpha,beta);value=maximize?Math.max(value,v):Math.min(value,v);if(maximize)alpha=Math.max(alpha,value);else beta=Math.min(beta,value);if(beta<=alpha)break;}
  return Number.isFinite(value)?value:evaluateCerco(s,root);
 }
 for(let d=1;d<=depthLimit&&nodes<budget;d++){
  let score=-Infinity,choice=best,complete=true;
  for(const candidate of candidates){if(nodes>=budget){complete=false;break;}const v=yield* search(candidate.state,d-1,-Infinity,Infinity);if(v>score){score=v;choice=candidate.move;}}
  if(complete){best=choice;depth=d;}else break;
 }
 return result(best,{avoidedImmediateLoss:safe.length>0&&safe.length<legal.length});
}
export function chooseCercoMove(state,options={}){const task=cercoSearch(state,options);let step;do{step=task.next();}while(!step.done);return step.value;}
/** Fallback cooperativo: devolve a thread a cada lote e aceita cancelamento. */
export async function chooseCercoMoveAsync(state,options={}){const task=cercoSearch(state,options);for(;;){if(options.signal?.aborted)throw new DOMException('Busca cancelada','AbortError');const step=task.next();if(step.done)return step.value;await new Promise(resolve=>setTimeout(resolve,0));}}

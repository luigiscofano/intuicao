/** BROTO rules v1. Pure, deterministic, zero-based cells and owners. No UI/storage effects. */
export const BROTO_RULES_VERSION = 1;
const frozen = value => { if(value && typeof value==='object'){Object.values(value).forEach(frozen);Object.freeze(value);}return value; };
const copy = value => structuredClone(value);
const playerOK = n => n===0||n===1;
const cellOK = n => Number.isInteger(n)&&n>=0&&n<16;
const fail = message => {throw new Error(message);};
function base(starter,round=1,firstStarter=starter,completedRounds=[]){
 return {rulesVersion:BROTO_RULES_VERSION,board:Array(16).fill(null),reserves:[8,8],scores:[0,0],totals:completedRounds.reduce((a,r)=>a.map((n,p)=>n+r.scores[p]),[0,0]),player:starter,turn:0,round,starter,firstStarter,roundOver:false,duelOver:false,winner:null,completedRounds:copy(completedRounds),history:[],future:[]};
}
export function createBroto(starter=0){if(!playerOK(starter))fail('Iniciador inválido.');return frozen(base(starter));}
export function legalBrotoMoves(state){return state.roundOver||state.reserves[state.player]<=0?[]:state.board.flatMap((piece,cell)=>piece===null?[cell]:[]);}
/** All four ray endpoints are found in one snapshot before any mark/removal. */
function resolve(state,cell){
 if(state.roundOver||!cellOK(cell)||state.board[cell]!==null||state.reserves[state.player]<=0)fail('Escolha uma casa vazia durante sua vez.');
 const next=copy(state),owner=state.player;next.future=[];
 next.board[cell]={owner,h:false,v:false};next.reserves[owner]--;
 const receivers=[];
 for(const [dr,dc,axis] of [[-1,0,'v'],[1,0,'v'],[0,-1,'h'],[0,1,'h']]){
  let row=Math.floor(cell/4)+dr,col=cell%4+dc;const path=[];
  while(row>=0&&row<4&&col>=0&&col<4){const target=row*4+col;path.push(target);const piece=next.board[target];if(piece){receivers.push({cell:target,owner:piece.owner,axis,from:cell,to:target,path,alreadyReceived:piece[axis]});break;}row+=dr;col+=dc;}
 }
 for(const hit of receivers)next.board[hit.cell][hit.axis]=true;
 const blooms=receivers.filter(hit=>next.board[hit.cell].h&&next.board[hit.cell].v).map(hit=>({cell:hit.cell,...next.board[hit.cell]}));
 const points=[0,0];for(const bloom of blooms){points[bloom.owner]++;next.board[bloom.cell]=null;}
 next.scores=next.scores.map((n,p)=>n+points[p]);next.totals=next.totals.map((n,p)=>n+points[p]);
 next.turn++;next.history.push(cell);next.player=1-owner;next.roundOver=next.turn===16;next.duelOver=next.roundOver&&next.round===2;
 next.winner=next.duelOver?(next.totals[0]===next.totals[1]?'draw':next.totals[0]>next.totals[1]?0:1):null;
 return {state:next,events:{planted:{cell,owner},receivers,blooms,points,roundOver:next.roundOver,duelOver:next.duelOver}};
}
export function applyBrotoMove(state,cell,{expectedPlayer=state.player,expectedTurn=state.turn}={}){
 if(expectedPlayer!==state.player)fail('Não é a vez deste jogador.');if(expectedTurn!==state.turn)fail('O turno mudou; escolha novamente.');
 return frozen(resolve(state,cell));
}
export function previewBrotoMove(state,cell,guards){return applyBrotoMove(state,cell,guards);}
function replayRound(starter,moves,round=1,firstStarter=starter,completedRounds=[]){
 let state=base(starter,round,firstStarter,completedRounds);for(const cell of moves)state=resolve(state,cell).state;return state;
}
export function undoBroto(state){
 if(!state.history.length)return state;
 const history=state.history.slice(0,-1),next=replayRound(state.starter,history,state.round,state.firstStarter,state.completedRounds);
 next.future=[state.history.at(-1),...state.future];return frozen(next);
}
export function redoBroto(state){
 if(!state.future.length)return state;
 const next=resolve(state,state.future[0]).state;next.future=state.future.slice(1);return frozen(next);
}
export function resetBrotoRound(state){return frozen(base(state.starter,state.round,state.firstStarter,state.completedRounds));}
export function nextBrotoRound(state){
 if(state.round!==1||!state.roundOver)fail('Conclua a primeira rodada antes de avançar.');
 const record={starter:state.starter,history:[...state.history],scores:[...state.scores]};
 return frozen(base(1-state.starter,2,state.firstStarter,[record]));
}
export function rematchBroto(state){if(!state.duelOver)fail('Conclua o duelo antes da revanche.');return createBroto(1-state.firstStarter);}
function equal(a,b){
 if(a===b)return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b))return false;
 const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(k=>Object.hasOwn(b,k)&&equal(a[k],b[k]));
}
/** Replay both rounds and redo branch, then compare every field; never trust saved points/marks. */
export function restoreBroto(raw){
 try{
  const s=typeof raw==='string'?JSON.parse(raw):raw;
  if(!s||s.rulesVersion!==BROTO_RULES_VERSION||!playerOK(s.firstStarter)||![1,2].includes(s.round)||!Array.isArray(s.history)||!Array.isArray(s.future)||s.history.length+s.future.length>16||!Array.isArray(s.completedRounds)||s.completedRounds.length!==s.round-1)return null;
  let completed=[];
  if(s.round===2){const old=s.completedRounds[0];if(!old||old.starter!==s.firstStarter||!Array.isArray(old.history)||old.history.length!==16)return null;const previous=replayRound(s.firstStarter,old.history);const record={starter:s.firstStarter,history:old.history,scores:previous.scores};if(!equal(old,record))return null;completed=[record];}
  const starter=s.round===1?s.firstStarter:1-s.firstStarter;
  const canonical=replayRound(starter,s.history,s.round,s.firstStarter,completed);
  let futureState=canonical;for(const cell of s.future)futureState=resolve(futureState,cell).state;
  canonical.future=[...s.future];return equal(s,canonical)?frozen(canonical):null;
 }catch{return null;}
}
export function serializeBroto(state){if(!restoreBroto(state))fail('Estado de BROTO inválido.');return JSON.stringify(state);}

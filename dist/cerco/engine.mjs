/** CERCO: motor puro. Casas e equipes usam índices a partir de zero. */
export const CERCO_RULES_VERSION='cerco-1';
const freeze=x=>{if(x&&typeof x==='object'){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
const team=p=>p===0||p===1;
const cell=c=>Number.isInteger(c)&&c>=0&&c<25;
const copy=x=>structuredClone(x);
function initial(starter){const board=Array(25).fill(null);for(const c of [0,2,4])board[c]=0;for(const c of [20,22,24])board[c]=1;return {rulesVersion:CERCO_RULES_VERSION,board,player:starter,starter,turn:0,over:false,winner:null,history:[],future:[]};}
export function createCerco(starter=0){if(!team(starter))throw Error('Iniciador inválido.');return freeze(initial(starter));}
export function cercoNeighbors(c){if(!cell(c))return [];const row=Math.floor(c/5),col=c%5;return [row>0?c-5:-1,row<4?c+5:-1,col>0?c-1:-1,col<4?c+1:-1].filter(cell);}
export function legalCercoMoves(state,player=state.player){if(state.over||!team(player))return [];const out=[];state.board.forEach((p,from)=>{if(p===player)for(const to of cercoNeighbors(from))if(state.board[to]===null)out.push({from,to});});return out;}
export function applyCercoMove(state,move,{expectedPlayer=state.player,expectedTurn=state.turn}={}){
 if(expectedPlayer!==state.player||expectedTurn!==state.turn)throw Error('O turno mudou; escolha novamente.');
 const from=move?.from,to=move?.to;
 if(state.over||!cell(from)||!cell(to)||state.board[from]!==state.player||state.board[to]!==null||!cercoNeighbors(from).includes(to))throw Error('Mova uma peça sua para uma casa vizinha livre.');
 const next=copy(state),owner=state.player;next.board[from]='barrier';next.board[to]=owner;next.player=1-owner;next.turn++;next.history.push({from,to});next.future=[];
 // Examina toda a equipe seguinte, após a transação completa.
 if(!legalCercoMoves(next).length){next.over=true;next.winner=owner;}
 return freeze({state:next,events:{moved:{from,to,owner},barrier:from,over:next.over,winner:next.winner}});
}
export function previewCercoMove(state,move,guards){return applyCercoMove(state,move,guards);}
function replay(starter,moves){let s=createCerco(starter);for(const m of moves)s=applyCercoMove(s,m).state;return s;}
export function undoCerco(state){if(!state.history.length)return state;const s=copy(replay(state.starter,state.history.slice(0,-1)));s.future=[state.history.at(-1),...copy(state.future)];return freeze(s);}
export function redoCerco(state){if(!state.future.length)return state;const s=copy(applyCercoMove(state,state.future[0]).state);s.future=copy(state.future.slice(1));return freeze(s);}
export function resetCerco(state){return createCerco(state.starter);}
export function rematchCerco(state){if(!state.over)throw Error('Conclua a partida antes da revanche.');return createCerco(1-state.starter);}
function equal(a,b){if(a===b)return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b))return false;const keys=Object.keys(a);return keys.length===Object.keys(b).length&&keys.every(k=>Object.hasOwn(b,k)&&equal(a[k],b[k]));}
/** Reproduz os lances e confere todos os campos derivados, inclusive o futuro. */
export function restoreCerco(raw){try{const s=typeof raw==='string'?JSON.parse(raw):raw;if(!s||s.rulesVersion!==CERCO_RULES_VERSION||!team(s.starter)||!Array.isArray(s.history)||!Array.isArray(s.future)||s.history.length+s.future.length>19)return null;const canonical=copy(replay(s.starter,s.history));let future=canonical;for(const m of s.future)future=applyCercoMove(future,m).state;canonical.future=copy(s.future);return equal(s,canonical)?freeze(canonical):null;}catch{return null;}}
export function serializeCerco(state){if(!restoreCerco(state))throw Error('Estado de CERCO inválido.');return JSON.stringify(state);}
/** Exemplo reproduzível: Amarelo em L5C2 preso; L4C2 e L5C5 ainda móveis. */
export const CERCO_ISOLATED_EXAMPLE=freeze([{from:2,to:7},{from:20,to:15},{from:7,to:6},{from:22,to:21},{from:6,to:5},{from:15,to:16},{from:4,to:3}]);

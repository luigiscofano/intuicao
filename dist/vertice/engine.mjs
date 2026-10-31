/** VÉRTICE: pontos e jogadores usam índices a partir de zero. */
export const VERTICE_RULES_VERSION='vertice-1';
const freeze=x=>{if(x&&typeof x==='object'&&!Object.isFrozen(x)){Object.values(x).forEach(freeze);Object.freeze(x);}return x;};
const copy=x=>structuredClone(x),team=p=>p===0||p===1,cell=c=>Number.isInteger(c)&&c>=0&&c<9;
export function verticeNeighbors(c){if(!cell(c))return [];const r=Math.floor(c/3),col=c%3;return [r>0?c-3:-1,r<2?c+3:-1,col>0?c-1:-1,col<2?c+1:-1].filter(cell);}
export const VERTICE_EDGES=freeze(Array.from({length:9},(_,c)=>verticeNeighbors(c).filter(d=>d>c).map(d=>[c,d])).flat());
export function deriveControl(board){
 if(!Array.isArray(board)||board.length!==9||!Array.from(board).every(x=>x===null||team(x)))throw Error('Ocupação inválida.');
 const supports=board.map((_,c)=>[0,1].map(p=>verticeNeighbors(c).filter(d=>board[d]===p))),influence=supports.map(pair=>pair.map(a=>a.length)),scores=[0,0];
 const control=board.map((p,c)=>{if(p!==null)return 'occupied';const [a,b]=influence[c];if(a>=2&&b>=2)return 'disputed';if(a>=2){scores[0]++;return 0;}if(b>=2){scores[1]++;return 1;}return 'neutral';});
 if(scores[0]>=3&&scores[1]>=3)throw Error('Controle exclusivo simultâneo inválido.');
 return freeze({control,scores,influence,supports});
}
export const analyzeBoard=deriveControl;
export function verticePositionKey(state){return state.board.map(p=>p===null?'.':p).join('')+':'+state.player;}
export function createVertice(starter=0){if(!team(starter))throw Error('Iniciador inválido.');const board=[0,0,null,0,null,1,null,1,1],s={rulesVersion:VERTICE_RULES_VERSION,board,player:starter,starter,turn:0,over:false,winner:null,reason:null,...deriveControl(board),occurrences:{},history:[],future:[]};s.occurrences[verticePositionKey(s)]=1;return freeze(s);}
export function legalVerticeMoves(state,player=state.player){if(state.over||!team(player))return [];const moves=[];state.board.forEach((p,from)=>{if(p===player)for(const to of verticeNeighbors(from))if(state.board[to]===null)moves.push({from,to});});return moves;}
export function applyVerticeMove(state,move,{expectedPlayer=state.player,expectedTurn=state.turn}={}){
 if(expectedPlayer!==state.player||expectedTurn!==state.turn)throw Error('O turno mudou; escolha novamente.');const from=move?.from,to=move?.to;
 if(state.over||!cell(from)||!cell(to)||state.board[from]!==state.player||state.board[to]!==null||!verticeNeighbors(from).includes(to))throw Error('Mova uma peça sua por um segmento até um ponto vazio.');
 const next=copy(state),owner=state.player;next.board[from]=null;next.board[to]=owner;Object.assign(next,deriveControl(next.board));next.turn++;next.history.push({from,to});next.future=[];next.player=1-owner;
 const win=next.scores.findIndex(n=>n===3);
 // Vitória dos dois lados é conferida antes de bloqueio, repetição e limite.
 if(win>=0){next.over=true;next.winner=win;next.reason='control';}
 else if(!legalVerticeMoves(next).length){next.over=true;next.winner='draw';next.reason='blocked';}
 else{const key=verticePositionKey(next);next.occurrences[key]=(next.occurrences[key]||0)+1;if(next.occurrences[key]>=3){next.over=true;next.winner='draw';next.reason='repetition';}else if(next.turn>=60){next.over=true;next.winner='draw';next.reason='limit';}}
 const changedControl=next.control.flatMap((after,cell)=>after===state.control[cell]?[]:[{cell,before:state.control[cell],after}]);
 return freeze({state:next,events:{moved:{from,to,owner},changedControl,over:next.over,winner:next.winner,reason:next.reason}});
}
export function previewVerticeMove(state,move,guards){return applyVerticeMove(state,move,guards);}
function replay(starter,moves){let s=createVertice(starter);for(const move of moves)s=applyVerticeMove(s,move).state;return s;}
export function undoVertice(state){if(!state.history.length)return state;const next=copy(replay(state.starter,state.history.slice(0,-1)));next.future=[copy(state.history.at(-1)),...copy(state.future)];return freeze(next);}
export function redoVertice(state){if(!state.future.length)return state;const next=copy(applyVerticeMove(state,state.future[0]).state);next.future=copy(state.future.slice(1));return freeze(next);}
export function undoVerticeToHuman(state,human=0){if(!state.history.some((_,i)=>(state.starter+i)%2===human))return state;let s=undoVertice(state);while(s.player!==human&&s.history.length)s=undoVertice(s);return s;}
export function redoVerticeToHuman(state,human=0){let s=redoVertice(state);while(s.player!==human&&!s.over&&s.future.length)s=redoVertice(s);return s;}
export function resetVertice(state){return createVertice(state.starter);}
export function rematchVertice(state){if(!state.over)throw Error('Conclua a partida antes da revanche.');return createVertice(1-state.starter);}
function equal(a,b){if(a===b)return true;if(!a||!b||typeof a!=='object'||typeof b!=='object'||Array.isArray(a)!==Array.isArray(b))return false;const ks=Object.keys(a);return ks.length===Object.keys(b).length&&ks.every(k=>Object.hasOwn(b,k)&&equal(a[k],b[k]));}
/** Restauração reproduz todo o histórico; pontuação e repetições não são confiadas ao save. */
export function restoreVertice(raw){try{const s=typeof raw==='string'?JSON.parse(raw):raw;if(!s||s.rulesVersion!==VERTICE_RULES_VERSION||!team(s.starter)||!Array.isArray(s.history)||!Array.isArray(s.future)||s.history.length+s.future.length>60)return null;const canonical=copy(replay(s.starter,s.history));let future=canonical;for(const move of s.future)future=applyVerticeMove(future,move).state;canonical.future=copy(s.future);return equal(canonical,s)?freeze(canonical):null;}catch{return null;}}
export function serializeVertice(state){if(!restoreVertice(state))throw Error('Estado de VÉRTICE inválido.');return JSON.stringify(state);}
export const VERTICE_WIN_EXAMPLE=freeze([{from:1,to:2},{from:5,to:4},{from:0,to:1},{from:7,to:6},{from:3,to:0}]);

/** Seeded SINTONIA authoring and Endless generation. Every returned level is replay-certified. */
import {RULES_VERSION, DIRECTIONS, initialState, transition, stateKey, isWon, validateLevel, replay, solveLevel} from './engine.mjs';

import {buildBoxBoard,buildBoxDesign} from './box-design.mjs';
import {buildDeliveryDesign} from './delivery-design.mjs';
import {buildObstacleDesign,OBSTACLE_PRIMARIES} from './obstacle-design.mjs';
import {analyzePurpose,findAvoidingSolution} from './purpose.mjs';
export const GENERATOR_VERSION = 2;
export const CONTENT_REVISION = 'sintonia-content-2';
export const DIFFICULTIES = Object.freeze(['Muito fácil','Básico','Intermediário','Avançado','Especialista','Mestre']);
export const CHAPTERS = Object.freeze(['Primeiros passos','Paredes que ajudam','Ir para voltar','Um ajuda o outro','O cenário muda','Preparar caminhos','A terceira voz','Construir apoios','Distâncias diferentes','Atalhos','Escolher quando passar','Dois caminhos','Antes de voltar','Revezamento','Duas condições','A quarta voz','Conexões','Um recurso compartilhado','Tudo se encaixa','Sintonia']);
export const MECHANICS = Object.freeze([
  {id:'walls',label:'Paredes e recuos',description:'Todos recebem a mesma seta. Quem encontra uma parede fica parado.',introducedChapter:1,difficulty:0},
  {id:'plate',label:'Placas de pressão',description:'Animal ou caixa sobre uma placa mantém aberta a cancela com o mesmo símbolo. A posição final vale para o próximo comando.',introducedChapter:4,difficulty:1},
  {id:'switch',label:'Interruptores',description:'Entrar no interruptor alterna a cancela. Sair preserva a configuração; ficar parado não aciona novamente.',introducedChapter:5,difficulty:2},
  {id:'key',label:'Chaves',description:'Terminar sobre uma chave libera permanentemente a cancela com o mesmo símbolo.',introducedChapter:6,difficulty:2},
  {id:'box',label:'Caixas',description:'Empurre uma caixa por vez. Uma caixa pode sustentar uma placa; só bloqueia quando não pode ser empurrada.',introducedChapter:8,difficulty:2},
  {id:'ice',label:'Gelo',description:'Ao entrar no gelo, o animal segue na direção da seta até o primeiro piso comum ou bloqueio.',introducedChapter:9,difficulty:2},
  {id:'portal',label:'Portais',description:'Entrar em um portal leva ao seu par no mesmo tabuleiro e encerra aquele deslocamento.',introducedChapter:10,difficulty:3},
  {id:'oneway',label:'Sentido único',description:'A seta na divisória permite atravessar apenas no sentido indicado. Ela não move o animal sozinha.',introducedChapter:11,difficulty:3},
  {id:'alternate',label:'Sol e lua',description:'Um interruptor alterna dois conjuntos de cancelas: enquanto um abre, o outro fecha.',introducedChapter:12,difficulty:3},
  {id:'fragile',label:'Pontes frágeis',description:'A ponte permanece enquanto o animal está nela. Quando ele sai, a casa desaparece. Desfazer restaura a ponte.',introducedChapter:13,difficulty:3},
  {id:'handoff',label:'Revezamento',description:'Uma ajuda prepara a seguinte: atravesse, ocupe a próxima placa e libere o caminho de quem ajudou.',introducedChapter:14,difficulty:3},
  {id:'and',label:'Duas condições',description:'A cancela só abre quando as duas placas indicadas estão ocupadas. Observe os dois símbolos.',introducedChapter:15,difficulty:4},
  {id:'selector',label:'Seletores',description:'Entrar no seletor muda qual cancela recebe a ajuda da placa. A nova ligação vale no próximo comando.',introducedChapter:17,difficulty:4},
  {id:'delivery',label:'Entrega de caixas',description:'Empurre a caixa na entrada para enviá-la a outro tabuleiro. Se a saída não estiver livre, o empurrão inteiro é bloqueado.',introducedChapter:18,difficulty:4}
]);
export const REASONING_FAMILIES = Object.freeze([
  'wall-adjust','waiting-place','intermediate-stop','unequal-loop','axis-order','goal-transit','priority-change','final-command','remote-support','support-handoff','dual-use-object','preserve-access','scenario-choice','help-recipient'
]);
const FAMILY_BY_MECHANIC={plate:'remote-support',switch:'scenario-choice',key:'priority-change',box:'support-handoff',ice:'intermediate-stop',portal:'waiting-place',oneway:'preserve-access',alternate:'scenario-choice',fragile:'preserve-access',handoff:'support-handoff',and:'remote-support',selector:'help-recipient',delivery:'support-handoff'};
const WALL_FAMILIES=REASONING_FAMILIES.slice(0,8);
/** Chronological history, capped at 24. The newest entries count most. */
export function familyRecencyPenalty(family,recentFamilies=[]){
  const history=Array.isArray(recentFamilies)?recentFamilies.filter(value=>typeof value==='string').slice(-24):[];
  return history.reduce((sum,value,index)=>sum+(value===family?(index+1)/history.length:0),0);
}
const ANIMALS=['capivara','tuiuiu','bemtevi','mico'];
const VECTORS=[[-1,0],[0,1],[1,0],[0,-1]];
const clock=()=>globalThis.performance?.now?.()??Date.now();
function timeout(){const error=new Error('O orçamento de tempo da geração foi esgotado.');error.code='GENERATION_TIMEOUT';return error;}
const clone=value=>JSON.parse(JSON.stringify(value));
const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
export function hashString(value) {let h=2166136261;for(const c of String(value)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
export function seededRandom(seed) {let a=hashString(seed);return ()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296;};}
const pick=(rng,values)=>values[Math.floor(rng()*values.length)];
function preferUnrecent(rng,values,recentFamilies,familiesFor){
  // Preserve the exact old RNG sequence when no history is supplied. With
  // history, weighting chooses once: it never adds retries or rejects puzzles.
  if(!Array.isArray(recentFamilies)||!recentFamilies.length||!values.length)return pick(rng,values);
  const weights=values.map(value=>1/(1+4*Math.min(...familiesFor(value).map(f=>familyRecencyPenalty(f,recentFamilies)))));
  let draw=rng()*weights.reduce((sum,weight)=>sum+weight,0);
  for(let i=0;i<values.length;i++){draw-=weights[i];if(draw<=0)return values[i];}
  return values.at(-1);
}
const integer=(rng,lo,hi)=>lo+Math.floor(rng()*(hi-lo+1));
function shuffled(rng,values){const result=[...values];for(let i=result.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[result[i],result[j]]=[result[j],result[i]];}return result;}
function neighbors(board,cell){const row=Math.floor(cell/board.cols),col=cell%board.cols;return VECTORS.map(([dr,dc])=>[row+dr,col+dc]).filter(([r,c])=>r>=0&&r<board.rows&&c>=0&&c<board.cols).map(([r,c])=>r*board.cols+c);}
function reachable(board,from,blocked=[]){const free=new Set(board.walkable),ban=new Set(blocked.map(([a,b])=>a<b?`${a}:${b}`:`${b}:${a}`)),seen=new Set([from]),queue=[from];for(let i=0;i<queue.length;i++)for(const next of neighbors(board,queue[i])){const edge=queue[i]<next?`${queue[i]}:${next}`:`${next}:${queue[i]}`;if(free.has(next)&&!seen.has(next)&&!ban.has(edge)){seen.add(next);queue.push(next);}}return seen;}
function shortestPath(board,from,to){const free=new Set(board.walkable),queue=[from],parents=new Map([[from,null]]);for(let i=0;i<queue.length;i++){const at=queue[i];if(at===to){const path=[];for(let p=to;p!==null;p=parents.get(p))path.push(p);return path.reverse();}for(const next of neighbors(board,at))if(free.has(next)&&!parents.has(next)){parents.set(next,at);queue.push(next);}}return [];}
function bridges(board){const result=[];for(const a of board.walkable)for(const b of neighbors(board,a))if(a<b&&board.walkable.includes(b)){const side=reachable(board,a,[[a,b]]);if(!side.has(b))result.push({a,b,side,other:new Set(board.walkable.filter(cell=>!side.has(cell)))});}return result;}
function longestPath(board){let best=[];for(const a of board.walkable)for(const b of board.walkable){const path=shortestPath(board,a,b);if(path.length>best.length)best=path;}return best;}
function makeBoard(rng,index,difficulty,style='mixed'){
  const size=difficulty===0?integer(rng,2,3):integer(rng,3,difficulty>=3?5:4);
  const rows=size,cols=difficulty===0?integer(rng,3,4):integer(rng,3,difficulty>=3?5:4);
  const board={id:`b${index}`,animal:ANIMALS[index],rows,cols,walkable:[],start:0,goal:0};
  const capacity=rows*cols,target=clamp(integer(rng,5+difficulty,8+difficulty*2),4,Math.min(capacity-1,16));
  const cells=new Set([integer(rng,0,capacity-1)]);
  for(let guard=0;cells.size<target&&guard<300;guard++){
    const candidates=[...new Set([...cells].flatMap(cell=>neighbors(board,cell)).filter(cell=>!cells.has(cell)))];
    if(!candidates.length)break;
    const tree=candidates.filter(cell=>neighbors(board,cell).filter(n=>cells.has(n)).length===1);
    const useTree=style==='tree'||(style==='mixed'&&rng()<.65);
    cells.add(pick(rng,useTree&&tree.length?tree:candidates));
  }
  board.walkable=[...cells].sort((a,b)=>a-b);board.start=pick(rng,board.walkable);board.goal=board.start;return board;
}
function ensurePathBoard(rng,index,difficulty,minLength=5){for(let t=0;t<40;t++){const board=makeBoard(rng,index,Math.max(1,difficulty),'tree'),path=longestPath(board);if(path.length>=minLength){if(rng()<.5)path.reverse();board.start=path[0];return {board,path};}}throw new Error('topology-budget');}
function gateTarget(rng,board,{minimumSide=1}={}){
  const available=bridges(board).flatMap(edge=>[{from:edge.a,to:edge.b,near:edge.side,far:edge.other},{from:edge.b,to:edge.a,near:edge.other,far:edge.side}]).filter(edge=>edge.near.size>=2&&edge.far.size>=minimumSide&&edge.near.has(board.start));
  if(!available.length)throw new Error('no-bridge');
  return pick(rng,available);
}
function specialCells(board){return new Set([...(board.plates||[]).map(x=>x.cell),...(board.switches||[]).map(x=>x.cell),...(board.keys||[]).map(x=>x.cell),...(board.selectors||[]).map(x=>x.cell),...(board.portals||[]).flatMap(x=>[x.a,x.b]),...(board.ice||[]),...(board.fragile||[])]);}
function cellFor(rng,board,extra=[]){const banned=new Set([board.start,...specialCells(board),...extra,...(board.boxes||[]).map(x=>x.cell)]);const choices=board.walkable.filter(cell=>!banned.has(cell));if(!choices.length)throw new Error('no-trigger-cell');return pick(rng,choices);}
function decorateGrowth(rng,board,protectedEdges=[],extra=3){
  const cut=protectedEdges.map(([a,b])=>({a,b,side:reachable(board,a,[[a,b]])}));
  for(let step=0;step<extra;step++){
    const candidates=shuffled(rng,[...new Set(board.walkable.flatMap(cell=>neighbors(board,cell)).filter(cell=>!board.walkable.includes(cell)))]);
    for(const cell of candidates){const candidate={...board,walkable:[...board.walkable,cell]};if(cut.every(({a,b})=>!reachable(candidate,a,[[a,b]]).has(b))){board.walkable.push(cell);break;}}
  }
  board.walkable.sort((a,b)=>a-b);return board;
}
function boxBoard(rng,index,difficulty){
  return buildBoxBoard(rng,index,{pattern:pick(rng,['turn-and-support','park-and-retrieve'])});
}
function portalBoard(rng,index,difficulty){
  const rows=integer(rng,3,4),cols=5;
  const board={id:`b${index}`,animal:ANIMALS[index],rows,cols,walkable:[],start:0,goal:4};
  const left=[],right=[];for(let r=0;r<rows;r++){left.push(r*cols,r*cols+1);right.push(r*cols+3,r*cols+4);}
  const grow=allowed=>{const cells=new Set([pick(rng,allowed)]);for(let i=0;i<100&&cells.size<integer(rng,3,Math.min(6,allowed.length));i++){const options=allowed.filter(cell=>!cells.has(cell)&&neighbors(board,cell).some(n=>cells.has(n)));if(!options.length)break;cells.add(pick(rng,options));}return [...cells];};
  const a=grow(left),b=grow(right);board.walkable=[...a,...b].sort((x,y)=>x-y);board.start=pick(rng,a);const entrance=pick(rng,a.filter(cell=>cell!==board.start)),exit=pick(rng,b);board.portals=[{id:`portal${index}`,a:entrance,b:exit}];return {board,region:new Set(b.filter(cell=>cell!==exit))};
}
function straightSpecialBoard(rng,index,difficulty,type){
  const {board,path}=ensurePathBoard(rng,index,difficulty,5);
  const straight=path.slice(1,-1).filter((cell,i)=>path[i+2]-cell===cell-path[i]);
  const selected=type==='ice'?pick(rng,straight):pick(rng,path.slice(1,-2));
  if(selected===undefined)throw new Error('no-straight-special');
  board[type]=[selected];
  const before=path[path.indexOf(selected)-1],after=path[path.indexOf(selected)+1];
  const region=reachable(board,after,[[selected,after]]);
  if(region.has(before))throw new Error('special-bypass');
  return {board,region};
}

const PRIMARY_REQUIRED={walls:[],plate:['plate-gate'],switch:['switch','switch-gate'],key:['key','key-gate'],box:['push','box-support-gate'],ice:['ice'],portal:['portal'],oneway:['oneway'],alternate:['switch','sun-gate','moon-gate'],fragile:['fragile'],handoff:['handoff-0','handoff-1'],and:['and-gate'],selector:['selector','selected-0','selected-1'],delivery:['delivery','delivery-gate']};
function candidate(rng,{difficulty,animals,primary,secondary,introduction=false,pattern,orientations,prepareSender,includeSupportedStop=false,preparationControl}){
  const level={id:'candidate',version:1,rulesVersion:RULES_VERSION,boards:Array.from({length:animals},(_,index)=>makeBoard(rng,index,difficulty)),mechanics:['walls'],initialSwitches:{},initialSelectors:{}};
  const constraints=new Map(),required=new Set(PRIMARY_REQUIRED[primary]||[]),used=new Set();
  let design=null;
  const applyDesign=built=>{level.boards=built.boards;level.mechanics=built.mechanics; if(built.channels)level.channels=built.channels;for(const [i,cells] of built.constraints)constraints.set(i,cells);for(const flag of built.required)required.add(flag);built.boards.forEach((b,i)=>used.add(i));design=built.design;};
  const putConstraint=(index,region)=>constraints.set(index,region);
  const replacePath=(index,min=5)=>{const result=ensurePathBoard(rng,index,difficulty,min);level.boards[index]=result.board;return result;};
  const addMechanic=(mechanic)=>{if(!level.mechanics.includes(mechanic))level.mechanics.push(mechanic);};
  const ordinaryPair=(type)=>{
    const helper=level.boards[0],{board:receiver}=replacePath(1,5),edge=gateTarget(rng,receiver);
    let condition;
    if(type==='plate'){helper.plates=[{id:'support',cell:cellFor(rng,helper)}];condition={type:'plate',id:'support'};}
    if(type==='switch'){helper.switches=[{id:'toggle',cell:cellFor(rng,helper),group:'toggle'}];condition={type:'switch',id:'toggle',value:true};}
    if(type==='key'){helper.keys=[{id:'key0',cell:cellFor(rng,helper)}];condition={type:'key',id:'key0'};}
    receiver.gates=[{id:`${type}-gate`,from:edge.from,to:edge.to,condition}];putConstraint(1,edge.far);used.add(0);used.add(1);addMechanic(type);
  };
  if(OBSTACLE_PRIMARIES.includes(primary))applyDesign(buildObstacleDesign(rng,{primary,animals,difficulty,introduction,makeBoard,preparationControl}));
  else if(['plate','switch','key'].includes(primary))ordinaryPair(primary);
  else if(primary==='box'){
    applyDesign(buildBoxDesign(rng,{animals,difficulty,pattern,includeSupportedStop}));
  }else if(primary==='portal'){
    const {board,region}=portalBoard(rng,0,difficulty);level.boards[0]=board;putConstraint(0,region);used.add(0);addMechanic('portal');
  }else if(['ice','fragile'].includes(primary)){
    const {board,region}=straightSpecialBoard(rng,0,difficulty,primary);level.boards[0]=board;putConstraint(0,region);used.add(0);addMechanic(primary);
  }else if(primary==='oneway'){
    const {board}=replacePath(0,5),edge=gateTarget(rng,board);board.oneWays=[{from:edge.from,to:edge.to}];putConstraint(0,edge.far);used.add(0);addMechanic(primary);
  }else if(primary==='alternate'||primary==='selector'){
    const helper=level.boards[0],{board,path}=replacePath(1,6);
    const edges=bridges(board).map(({a,b})=>[a,b]).filter(([a,b])=>path.includes(a)&&path.includes(b));
    if(edges.length<3)throw new Error('no-serial-gates');
    const firstIndex=integer(rng,1,Math.max(1,path.length-4)),lastIndex=integer(rng,firstIndex+2,path.length-2);
    const first=[path[firstIndex-1],path[firstIndex]],last=[path[lastIndex-1],path[lastIndex]];
    if(reachable(board,board.start,[first]).has(path.at(-1))||reachable(board,board.start,[last]).has(path.at(-1)))throw new Error('serial-gate-bypass');
    if(primary==='alternate'){
      helper.switches=[{id:'sky',cell:cellFor(rng,helper),group:'sky'}];
      board.gates=[{id:'moon',from:first[0],to:first[1],condition:{type:'switch',id:'sky',value:false}},{id:'sun',from:last[0],to:last[1],condition:{type:'switch',id:'sky',value:true}}];addMechanic('switch');
    }else{
      helper.plates=[{id:'choice-plate',cell:cellFor(rng,helper)}];helper.selectors=[{id:'choice',cell:cellFor(rng,helper),group:'choice'}];
      board.gates=[{id:'choice-left',from:first[0],to:first[1],condition:{type:'selected',plate:'choice-plate',selector:'choice',value:0}},{id:'choice-right',from:last[0],to:last[1],condition:{type:'selected',plate:'choice-plate',selector:'choice',value:1}}];addMechanic('plate');
    }
    addMechanic(primary);putConstraint(1,reachable(board,last[1],[last]));used.add(0);used.add(1);
  }else if(primary==='handoff'){
    const {board:a}=replacePath(0,5),{board:b}=replacePath(1,5),ea=gateTarget(rng,a),eb=gateTarget(rng,b);
    const pa=pick(rng,[...ea.near].filter(cell=>cell!==a.start)),pb=pick(rng,[...eb.far]);
    if(pa===undefined||pb===undefined)throw new Error('no-handoff-cell');
    a.plates=[{id:'relay-a',cell:pa}];b.plates=[{id:'relay-b',cell:pb}];
    a.gates=[{id:'relay-return',from:ea.from,to:ea.to,condition:{type:'plate',id:'relay-b'}}];b.gates=[{id:'relay-out',from:eb.from,to:eb.to,condition:{type:'plate',id:'relay-a'}}];
    putConstraint(0,ea.far);putConstraint(1,eb.far);used.add(0);used.add(1);addMechanic('plate');addMechanic('handoff');
  }else if(primary==='and'){
    if(animals===2){
      const {board,region}=boxBoard(rng,0,difficulty);board.gates[0].condition={type:'all',ids:['weight','second']};level.boards[0]=board;level.boards[1].plates=[{id:'second',cell:cellFor(rng,level.boards[1])}];putConstraint(0,region);addMechanic('box');
    }else{
      level.boards[0].plates=[{id:'first',cell:cellFor(rng,level.boards[0])}];level.boards[1].plates=[{id:'second',cell:cellFor(rng,level.boards[1])}];const {board}=replacePath(2,5),edge=gateTarget(rng,board);board.gates=[{id:'together',from:edge.from,to:edge.to,condition:{type:'all',ids:['first','second']}}];putConstraint(2,edge.far);used.add(2);
    }
    used.add(0);used.add(1);addMechanic('plate');addMechanic('and');
  }else if(primary==='delivery'){
    applyDesign(buildDeliveryDesign(rng,{animals,difficulty,introduction,variant:pattern,prepareSender}));
  }
  // Secondary concepts occupy another board, or a separate uncomplicated
  // corridor. Never place box-accessible ice, portals or fragile tiles.
  if(secondary&&secondary!==primary){
    const free=Array.from({length:animals},(_,i)=>i).filter(i=>!used.has(i));
    const index=free.length?pick(rng,free):null;
    if(index!==null&&['ice','fragile','portal','oneway'].includes(secondary)){
      if(secondary==='portal'){const result=portalBoard(rng,index,difficulty);level.boards[index]=result.board;putConstraint(index,result.region);}
      else if(secondary==='oneway'){const {board}=replacePath(index,5),edge=gateTarget(rng,board);board.oneWays=[{from:edge.from,to:edge.to}];putConstraint(index,edge.far);}
      else{const result=straightSpecialBoard(rng,index,difficulty,secondary);level.boards[index]=result.board;putConstraint(index,result.region);}
      addMechanic(secondary);required.add(secondary);used.add(index);
    }else if(index!==null&&secondary==='box'){
      const result=boxBoard(rng,index,difficulty);level.boards[index]=result.board;putConstraint(index,result.region);addMechanic('plate');addMechanic('box');required.add('box-support-gate');used.add(index);
    }else if(primary==='walls'&&['plate','switch','key'].includes(secondary)){
      ordinaryPair(secondary);for(const item of PRIMARY_REQUIRED[secondary])required.add(item);
    }
  }
  // Every additional animal in a control composition owns a preparation cut.
  // Do not leave a fourth panel as a copy or a decorative independent corridor.
  if(['plate','alternate','selector','handoff','and'].includes(primary))for(let index=0;index<animals;index++)if(!used.has(index)){
    const available=[];
    for(const [target,goals] of constraints){const board=level.boards[target];for(const edge of bridges(board)){
      const near=edge.side.has(board.start)?edge.side:edge.other,far=edge.side.has(board.start)?edge.other:edge.side;
      if([...goals].every(c=>far.has(c))&&!(board.gates||[]).some(g=>(g.from===edge.a&&g.to===edge.b)||(g.from===edge.b&&g.to===edge.a)))available.push({target,from:edge.a,to:edge.b});
    }}
    if(!available.length)throw new Error('contributor-needs-distinct-cut');
    const edge=pick(rng,available),id=`auxiliary-${index}`,helper=level.boards[index];helper.plates=[{id,cell:cellFor(rng,helper)}];
    (level.boards[edge.target].gates||=[]).push({id:`auxiliary-gate-${index}`,from:edge.from,to:edge.to,condition:{type:'plate',id}});
    used.add(index);addMechanic('plate');required.add('plate-gate');
  }
  // Different orientations change shared coordination, but uniqueness is judged
  // after normalizing global rotations/reflections, not by these transformations.
  for(let i=0;i<level.boards.length;i++){
    const transform=orientations?.[i]??integer(rng,0,7),old=level.boards[i],result=transformBoard(old,transform);
    level.boards[i]=result.board;
    if(constraints.has(i))constraints.set(i,new Set([...constraints.get(i)].map(result.cell)));
    if(design){for(const role of design.roles||[])if(role&&typeof role==='object'&&role.board===i){if(Number.isInteger(role.control))role.control=result.cell(role.control);for(const field of ['commit','goalRegion'])if(Array.isArray(role[field]))role[field]=role[field].map(result.cell);}for(const structure of Array.isArray(design.structures)?design.structures:[])if(structure.board===i)for(const field of ['cells','edge'])if(Array.isArray(structure[field]))structure[field]=structure[field].map(result.cell);}
    for(const channel of level.channels||[]){if(channel.fromBoard===i)channel.entry=result.cell(channel.entry);if(channel.toBoard===i)channel.exit=result.cell(channel.exit);}
  }
  return {level,constraints,required,design};
}

export function transformBoard(board,transform){
  const mirror=transform>=4,rotation=transform%4;
  const cell=old=>{let r=Math.floor(old/board.cols),c=old%board.cols,rows=board.rows,cols=board.cols;if(mirror)c=cols-1-c;for(let i=0;i<rotation;i++){[r,c]=[c,rows-1-r];[rows,cols]=[cols,rows];}return r*cols+c;};
  const transformed={...clone(board),rows:rotation%2?board.cols:board.rows,cols:rotation%2?board.rows:board.cols,walkable:board.walkable.map(cell).sort((a,b)=>a-b),start:cell(board.start),goal:cell(board.goal)};
  for(const field of ['boxes','plates','switches','keys','selectors'])if(board[field])transformed[field]=board[field].map(item=>({...item,cell:cell(item.cell)}));
  for(const field of ['ice','fragile'])if(board[field])transformed[field]=board[field].map(cell).sort((a,b)=>a-b);
  if(board.portals)transformed.portals=board.portals.map(item=>({...item,a:cell(item.a),b:cell(item.b)}));
  for(const field of ['gates','oneWays'])if(board[field])transformed[field]=board[field].map(item=>({...clone(item),from:cell(item.from),to:cell(item.to)}));
  return {board:transformed,cell};
}
function canonicalValue(value){if(Array.isArray(value))return value.map(canonicalValue);if(value&&typeof value==='object')return Object.fromEntries(Object.keys(value).sort().map(key=>[key,canonicalValue(value[key])]));return value;}
/** Empty outside margins have no game meaning; translation is not new content. */
function normalizeBoard(board){
  const occupied=board.walkable,rs=occupied.map(c=>Math.floor(c/board.cols)),cs=occupied.map(c=>c%board.cols),top=Math.min(...rs),left=Math.min(...cs),rows=Math.max(...rs)-top+1,cols=Math.max(...cs)-left+1;
  const cell=old=>(Math.floor(old/board.cols)-top)*cols+old%board.cols-left;
  const result={...clone(board),rows,cols,walkable:occupied.map(cell).sort((a,b)=>a-b),start:cell(board.start),goal:cell(board.goal)};
  for(const field of ['boxes','plates','switches','keys','selectors'])if(board[field])result[field]=board[field].map(item=>({...item,cell:cell(item.cell)}));
  for(const field of ['ice','fragile'])if(board[field])result[field]=board[field].map(cell).sort((a,b)=>a-b);
  if(board.portals)result.portals=board.portals.map(item=>({...item,a:cell(item.a),b:cell(item.b)}));
  for(const field of ['gates','oneWays'])if(board[field])result[field]=board[field].map(item=>({...clone(item),from:cell(item.from),to:cell(item.to)}));
  return {board:result,cell};
}
export function structuralSignature(level,{topologyOnly=false}={}){
  const forms=[];
  for(let transform=0;transform<8;transform++){
    const transformed=level.boards.map(board=>{const rotated=transformBoard(board,transform),trimmed=normalizeBoard(rotated.board);return {board:trimmed.board,cell:old=>trimmed.cell(rotated.cell(old))};});
    const indexed=transformed.map(({board},index)=>{
      const copy={rows:board.rows,cols:board.cols,walkable:board.walkable};
      if(!topologyOnly){copy.start=board.start;copy.goal=board.goal;for(const field of ['boxes','plates','switches','keys','selectors','ice','fragile','portals','gates','oneWays'])if(board[field]?.length)copy[field]=board[field];}
      return {copy,index,key:JSON.stringify(canonicalValue(copy))};
    });
    indexed.sort((a,b)=>a.key.localeCompare(b.key));const order=new Map(indexed.map((item,index)=>[item.index,index])),boards=indexed.map(item=>item.copy);
    // Mechanisms use global IDs, so sorting boards is safe when channel board
    // references are remapped. Animal artwork and panel order add no puzzle.
    const channels=(level.channels||[]).map(channel=>({...channel,fromBoard:order.get(channel.fromBoard),toBoard:order.get(channel.toBoard),entry:transformed[channel.fromBoard].cell(channel.entry),exit:transformed[channel.toBoard].cell(channel.exit)})).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
    forms.push(JSON.stringify(canonicalValue({boards,...(!topologyOnly?{channels,initialSwitches:level.initialSwitches||{},initialSelectors:level.initialSelectors||{}}:{})})));
  }
  const canonical=forms.sort()[0];return `${topologyOnly?'top':'st'}1-${hashString(canonical).toString(16).padStart(8,'0')}-${canonical.length}`;
}

function observed(previous,next,events){
  const flags=new Set();
  for(const event of events){
    if(['push','ice','portal','fragile','switch','key','selector','delivery','oneway'].includes(event.type))flags.add(event.type);
    if(event.type==='gate'){
      const c=event.condition;
      if(c.type==='plate')flags.add('plate-gate');
      if(c.type==='switch'){flags.add('switch-gate');if(c.id==='sky')flags.add(c.value?'sun-gate':'moon-gate');}
      if(c.type==='key')flags.add('key-gate');
      if(c.type==='all')flags.add('and-gate');
      if(c.type==='selected')flags.add(`selected-${c.value}`);
      if(c.id==='weight')flags.add('box-support-gate');
      if(c.id==='arrival')flags.add('delivery-gate');
      if(c.id==='relay-a')flags.add('handoff-0');
      if(c.id==='relay-b')flags.add('handoff-1');
    }
  }
  return flags;
}
function hasFlags(flags,required){for(const flag of required)if(!flags.has(flag))return false;return true;}
function restorePath(nodes,index){const result=[];for(let i=index;nodes[i].parent>=0;i=nodes[i].parent)result.push(nodes[i].direction);return result.reverse();}
function statePositions(state){return state.positions.join(',');}

/** Exhaustive macro search when completed; visits victory candidates after every
 * microstep, not merely after a sweep reaches its endpoint. */
export function sweepReachability(level,{maxStates=1800,maxSteps=64,maxMs=1500}={}){
  const start=initialState(level),nodes=[start],seen=new Set([stateKey(start)]),positions=new Set([statePositions(start)]),deadline=clock()+maxMs;let operations=0;
  for(let i=0;i<nodes.length;i++){
    if(clock()>deadline)return {status:'inconclusive',reason:'time',positions,visited:seen.size,operations};
    if(nodes.length>maxStates)return {status:'inconclusive',reason:'states',positions,visited:seen.size,operations};
    for(const direction of DIRECTIONS){let state=nodes[i],local=new Set([stateKey(state)]),terminated=false;
      for(let step=0;step<maxSteps;step++){const result=transition(level,state,direction);state=result.state;operations++;positions.add(statePositions(state));const key=stateKey(state);if(!result.changed||local.has(key)){terminated=true;break;}local.add(key);}
      if(!terminated)return {status:'inconclusive',reason:'steps',positions,visited:seen.size,operations};
      const key=stateKey(state);if(!seen.has(key)){seen.add(key);nodes.push(state);}
    }
  }
  return {status:'complete',positions,visited:seen.size,operations};
}

function searchTargets(level,constraints,required,{rng,minDepth,maxDepth,maxStates,maxMs,avoidSweep,strictSweep}){
  if(constraints.size===level.boards.length&&[...constraints.values()].every(cells=>cells.size===1)){
    const fixed=clone(level);fixed.boards.forEach((board,i)=>board.goal=[...constraints.get(i)][0]);
    const solved=solveLevel(fixed,{maxStates,maxMs,maxDepth});if(solved.status==='inconclusive'){if(solved.reason==='time-budget')throw timeout();throw new Error('fixed-goal-budget');}if(solved.status!=='solved')throw new Error('fixed-goal-unsolvable');
    if(solved.solution.length<minDepth||solved.solution.length>maxDepth)throw new Error('fixed-goal-depth');
    const analysis=analyzeSolution(fixed,solved.solution);if(!hasFlags(new Set(analysis.used),required))throw new Error('fixed-goal-unused-role');
    const sweep=avoidSweep?sweepReachability(fixed,{maxStates:Math.min(maxStates,3000),maxMs:Math.min(maxMs,900)}):null;
    if(sweep?.reason==='time')throw timeout();if(strictSweep&&sweep?.status!=='complete')throw new Error('sweep-budget');if(sweep?.positions.has(fixed.boards.map(b=>b.goal).join(',')))throw new Error('fixed-goal-sweep');
    return {level:fixed,solution:solved.solution,search:{visited:solved.visited,depth:solved.solution.length,optimal:solved.optimal,frontierExhausted:false,limits:{maxStates,maxDepth}},sweep:{status:sweep?.status||'not-run',visited:sweep?.visited||0,resistant:sweep?.status==='complete'?true:null}};
  }
  const deadline=clock()+maxMs,start=initialState(level),nodes=[{state:start,parent:-1,direction:null,depth:0,flags:new Set()}],seen=new Map([[stateKey(start),0]]),goals=new Map();
  const sweep=avoidSweep?sweepReachability(level,{maxStates:Math.min(maxStates,2000),maxMs:Math.min(maxMs*.25,900)}):null;
  if(sweep?.reason==='time')throw timeout();
  if(strictSweep&&sweep?.status!=='complete')throw new Error('sweep-budget');
  const bannedGoals=level.boards.map(board=>new Set([...(board.switches||[]).map(x=>x.cell),...(board.keys||[]).map(x=>x.cell),...(board.selectors||[]).map(x=>x.cell),...(board.portals||[]).flatMap(x=>[x.a,x.b]),...(board.ice||[]),...(board.fragile||[])]));
  let depthLimited=false,stateLimited=false;
  for(let head=0;head<nodes.length;head++){
    if(clock()>deadline)throw timeout();
    if(nodes.length>=maxStates){stateLimited=true;break;}
    const node=nodes[head],positions=node.state.positions,keyPositions=statePositions(node.state);
    if(!goals.has(keyPositions))goals.set(keyPositions,head); // first breadth-first occurrence is shortest for these goals
    if(node.depth>=maxDepth){depthLimited=true;continue;}
    for(const direction of DIRECTIONS){const result=transition(level,node.state,direction);if(!result.changed)continue;const key=stateKey(result.state);if(seen.has(key))continue;const flags=new Set([...node.flags,...observed(node.state,result.state,result.events)]);seen.set(key,nodes.length);nodes.push({state:result.state,parent:head,direction,depth:node.depth+1,flags});}
  }
  const options=[];
  for(const [positionKey,index] of goals){const node=nodes[index];if(node.depth<minDepth||node.depth>maxDepth||!hasFlags(node.flags,required))continue;
    if(sweep?.positions.has(positionKey))continue;
    if(node.state.positions.some((cell,i)=>cell===level.boards[i].start||bannedGoals[i].has(cell)||(constraints.has(i)&&!constraints.get(i).has(cell))))continue;
    const solution=restorePath(nodes,index),turns=solution.filter((direction,i)=>i>0&&direction!==solution[i-1]).length;
    if(solution.length>4&&turns<2)continue;
    options.push({index,solution,turns,depth:node.depth});
  }
  if(!options.length)throw new Error('no-target');
  // Pick inside a depth band instead of always maximizing length. The campaign
  // rhythm and mechanism dependencies remain separate difficulty dimensions.
  const wanted=integer(rng,minDepth,maxDepth),ranked=options.sort((a,b)=>Math.abs(a.depth-wanted)-Math.abs(b.depth-wanted));
  const selected=pick(rng,ranked.slice(0,Math.min(12,ranked.length))),target=nodes[selected.index];
  const result=clone(level);result.boards.forEach((board,i)=>board.goal=target.state.positions[i]);
  return {level:result,solution:selected.solution,search:{visited:seen.size,depth:selected.depth,optimal:true,frontierExhausted:!stateLimited&&!depthLimited,limits:{maxStates,maxDepth}},sweep:{status:sweep?.status||'not-run',visited:sweep?.visited||0,resistant:sweep?.status==='complete'?!sweep.positions.has(statePositions(target.state)):null}};
}

const FAMILY_TEXT={
  'wall-adjust':['A parede também ajuda','um bloqueio de um tabuleiro permite ajustar o outro','Observe qual animal pode continuar quando o outro encontra uma parede.','Procure uma direção que mude apenas as posições ainda desalinhadas.'],
  'waiting-place':['Um lugar para esperar','um recuo permite manter um animal parado durante a preparação do outro','Um canto pode segurar um animal em algumas direções.','Prepare esse lugar antes de completar o outro caminho.'],
  'intermediate-stop':['Antes do fim','mudar de direção antes do fim de um corredor permite um alinhamento que insistir na seta não produz','Nem todo trecho precisa ser percorrido até o fim.','Experimente mudar de direção numa casa intermediária.'],
  'unequal-loop':['Uma volta diferente','uma volta pode devolver um animal e reposicionar outro','Compare o efeito de uma pequena volta nos tabuleiros.','Uma parede pode interromper apenas parte dessa volta.'],
  'axis-order':['Primeiro este ajuste','a ordem de preparar os eixos muda o alinhamento conjunto','Compare o ajuste horizontal com o vertical.','Prepare um eixo antes de completar o outro.'],
  'goal-transit':['Chegar, sair, voltar','um destino também pode servir como casa de passagem','Chegar ao destino não prende o animal.','Pode ser útil sair dele para preparar a chegada conjunta.'],
  'priority-change':['A vez de ajudar','o personagem que precisa avançar pode mudar durante a sequência','Observe quem precisa de espaço agora.','Depois de preparar um caminho, transfira a atenção para o outro.'],
  'final-command':['Preparar a última seta','a vitória depende de preparar posições compatíveis com o último comando','Imagine onde cada animal estaria uma seta antes do destino.','Quem já está no destino precisa permanecer bloqueado ou voltar depois.'],
  'remote-support':['Uma passagem para o outro','a ocupação de uma placa prepara a passagem de outro tabuleiro','Encontre a placa e a cancela com o mesmo símbolo.','Prepare a placa antes de tentar atravessar; o estado inicial do comando vale para todos.'],
  'support-handoff':['Um apoio que fica','uma caixa pode sustentar a condição enquanto o animal segue para outra tarefa','A caixa pode substituir um animal sobre a placa.','Empurre o peso até o apoio e preserve um caminho para sair.'],
  'dual-use-object':['Dois usos para a caixa','a mesma caixa pode sustentar uma placa e oferecer um ponto de bloqueio','Observe a casa atrás da caixa antes de tentar usá-la como parede.','Ela só bloqueia quando não há espaço válido para empurrá-la.'],
  'preserve-access':['Antes de atravessar','um acesso de uso limitado exige preparar as outras posições antes de abandoná-lo','Observe o que impede uma volta pelo mesmo caminho.','Prepare o restante antes de consumir esse acesso.'],
  'scenario-choice':['A configuração certa','a configuração das passagens precisa mudar entre duas etapas','Identifique as passagens que dependem do mesmo controle.','Atravesse a primeira região antes de preparar a configuração seguinte.'],
  'help-recipient':['Quem recebe a ajuda','a mesma placa precisa ajudar passagens diferentes em momentos distintos','Siga o símbolo da placa até a conexão selecionada.','Prepare uma travessia, mude a ligação e volte a sustentar a placa.']
};
const PLAYER_LESSONS={
  'wall-adjust':'Use um bloqueio de um tabuleiro para ajustar o outro.',
  'waiting-place':'Procure um recuo que permita esperar enquanto o outro caminho é preparado.',
  'intermediate-stop':'Experimente mudar de direção antes do fim do corredor.',
  'unequal-loop':'Uma pequena volta pode produzir resultados diferentes nos tabuleiros.',
  'axis-order':'Prepare os ajustes horizontais e verticais numa ordem que funcione para todos.',
  'goal-transit':'Um destino também pode ser uma passagem: chegar, sair e voltar faz parte.',
  'priority-change':'Alterne quem avança e quem ajuda a preparar o próximo passo.',
  'final-command':'Prepare posições que possam terminar juntas no mesmo comando.',
  'remote-support':'Relacione as placas às cancelas e prepare a ajuda antes da travessia.',
  'support-handoff':'Deixe um apoio preparado para liberar quem precisa continuar.',
  'dual-use-object':'A caixa pode sustentar uma placa e depois servir como ponto de bloqueio.',
  'preserve-access':'Prepare o restante antes de abandonar um caminho de retorno limitado.',
  'scenario-choice':'Escolha a configuração das passagens para cada etapa do percurso.',
  'help-recipient':'Mude a ligação para que a mesma placa ajude passagens diferentes.'
};
function primaryText(level,primary,family){
  const familyText=FAMILY_TEXT[family],base={name:familyText[0],lesson:PLAYER_LESSONS[family],discovery:`Aqui o jogador precisa descobrir que ${familyText[1]}.`,hints:[familyText[2],familyText[3],'Peça uma dica concreta para a configuração atual.']};
  const hasBox=level.boards.some(board=>board.boxes?.length);
  const specialized={
    plate:['Uma passagem para o outro','Prepare a placa que abre o caminho do outro animal.','a ocupação de uma placa prepara a passagem de outro tabuleiro','Encontre a placa e a cancela com o mesmo símbolo.','O estado no início da seta decide a travessia: é possível sair da placa enquanto o outro atravessa.'],
    switch:['Uma escolha que permanece','Entre no interruptor para preparar a configuração das passagens.','um interruptor mantém a configuração depois que o animal sai dele','O interruptor alterna a passagem quando o animal entra e termina sobre ele.','Depois de preparar a abertura, você pode sair do interruptor sem perder essa configuração.'],
    key:['Caminho liberado','Recolha a chave antes de coordenar a travessia da cancela.','uma chave libera permanentemente uma passagem para a etapa seguinte','Encontre a chave e a cancela que compartilham o símbolo.','Termine um movimento sobre a chave; depois, prepare o outro percurso com a passagem liberada.'],
    ice:['Distâncias diferentes','Prepare a entrada no gelo pensando na posição em que o animal vai parar.','o gelo permite deslocamentos de comprimentos diferentes com a mesma seta','No gelo, o animal segue até o primeiro piso comum ou bloqueio.','Você não precisa interromper o deslizamento. Ajuste a posição de entrada para coordenar a chegada.'],
    portal:['Do outro lado','Use a entrada e a saída do portal para preparar o alinhamento conjunto.','um portal muda a região de preparação dentro do mesmo tabuleiro','Os dois portais com o mesmo símbolo formam um par neste tabuleiro.','Entrar no portal encerra esse deslocamento na saída; prepare a posição dos outros animais antes da entrada.'],
    oneway:['Escolha a travessia','Prepare os outros caminhos antes de cruzar a passagem de sentido único.','uma passagem de sentido único impede voltar pela mesma divisória','A seta está na divisória: ela permite cruzar somente no sentido indicado.','Confira o alinhamento dos outros animais antes de atravessar, porque o caminho de volta é limitado.'],
    alternate:['Entre sol e lua','Atravesse uma etapa e mude a configuração para preparar a seguinte.','as passagens de sol e lua precisam ser atravessadas em configurações diferentes','O mesmo interruptor troca quais cancelas de sol e lua estão abertas.','Prepare a primeira travessia antes de alternar para a configuração que abre o próximo trecho.'],
    fragile:['Antes de partir','Prepare o restante antes de sair da ponte frágil.','sair de uma ponte frágil consome esse acesso para os próximos movimentos','A ponte não desaparece enquanto o animal fica sobre ela.','Ao sair, essa casa deixa de existir. Prepare o que precisa ser feito antes; desfazer restaura a ponte.'],
    handoff:['Ajuda em revezamento','Quem atravessou pode assumir a próxima ajuda entre os animais.','um animal precisa atravessar e ocupar a próxima placa para liberar quem o ajudou','Uma das placas está numa região que a outra ajuda a abrir.','Prepare a primeira placa, atravesse e ocupe a próxima para que o primeiro ajudante possa continuar.'],
    and:['Dois apoios juntos','Prepare as duas placas ao mesmo tempo para abrir a cancela.',hasBox?'uma caixa e um animal podem sustentar as duas condições necessárias à passagem':'dois animais precisam sustentar simultaneamente as condições de uma passagem','A cancela precisa das duas placas indicadas ocupadas, não apenas de uma.',hasBox?'Uma caixa pode manter um apoio enquanto um animal prepara o outro.':'Prepare as duas posições de apoio antes de tentar a travessia.'],
    selector:['Quem recebe a ajuda','Mude a ligação para que a mesma placa ajude passagens diferentes.','a placa precisa ajudar uma passagem antes de ser ligada à outra','Siga o símbolo da placa até a cancela selecionada.','Prepare uma travessia, entre no seletor e volte a sustentar a placa para a próxima ligação.'],
    delivery:['Um recurso que viaja','Entregue a caixa para sustentar um apoio no outro tabuleiro.','transferir a caixa permite sustentar uma placa que o animal destinatário não alcança','A entrada do canal envia a caixa ao outro tabuleiro; os animais permanecem nos próprios mapas.','Deixe a saída livre antes de empurrar a caixa para a entrada. Depois da entrega, observe a passagem que ela ajuda a abrir.']
  }[primary];
  if(!specialized)return base;
  const [name,lesson,discovery,first,second]=specialized;
  return {name,lesson,discovery:`Aqui o jogador precisa descobrir que ${discovery}.`,hints:[first,second,base.hints[2]]};
}

/** Editorial-only refresh: coordinates, rules, certificate and seed stay intact. */
export function refreshEditorial(level){
  if(level.number===1||level.editorial?.source==='authored-reference')return clone(level);
  const text=primaryText(level,level.parameters?.primary||'walls',level.family),result=clone(level);
  Object.assign(result,text);if(result.number)result.name+=` ${String((result.number-1)%25+1).padStart(2,'0')}`;
  result.editorial={...result.editorial,discovery:text.discovery};
  if(!result.secondaryFamilies?.length)result.secondaryFamilies=['shared-command','individual-goals'];
  return result;
}

export function analyzeSolution(level,solution){
  let state=initialState(level);const states=[state],events=[],used=new Set();
  for(const direction of solution){const result=transition(level,state,direction);for(const flag of observed(state,result.state,result.events))used.add(flag);events.push(result.events);state=result.state;states.push(state);}
  const partialBlocks=events.filter(items=>new Set(items.filter(e=>e.type==='move').map(e=>e.board)).size<level.boards.length).length;
  const goalDepartures=level.boards.map((board,index)=>states.slice(0,-1).some((s,i)=>s.positions[index]===board.goal&&states[i+1].positions[index]!==board.goal));
  let unequalLoops=0;for(let a=0;a<states.length;a++)for(let b=a+2;b<Math.min(states.length,a+7);b++){const equal=states[a].positions.map((p,i)=>p===states[b].positions[i]);if(equal.some(Boolean)&&equal.some(value=>!value))unequalLoops++;}
  const directionChanges=solution.filter((d,i)=>i>0&&d!==solution[i-1]).length;
  const earlyTurns=solution.filter((d,i)=>i>0&&d!==solution[i-1]&&transition(level,states[i],solution[i-1]).changed).length;
  const occupiedBoxPlate=states.some(s=>s.boxes.some(box=>(level.boards[box.board].plates||[]).some(p=>p.cell===box.cell)));
  let boxAsStopAfterSupport=false;
  for(let i=0;i<solution.length;i++){
    const before=states[i],after=states[i+1],[dr,dc]=VECTORS[DIRECTIONS.indexOf(solution[i])];
    for(const box of before.boxes){
      const board=level.boards[box.board],cell=before.positions[box.board],row=Math.floor(cell/board.cols),col=cell%board.cols;
      const adjacent=(row+dr)*board.cols+col+dc;
      if(row+dr<0||row+dr>=board.rows||col+dc<0||col+dc>=board.cols||adjacent!==box.cell)continue;
      const sustained=(board.plates||[]).some(p=>p.cell===box.cell);
      const still=after.boxes.find(b=>b.id===box.id);
      const otherMoves=after.positions.some((p,j)=>j!==box.board&&p!==before.positions[j]);
      if(sustained&&still?.board===box.board&&still.cell===box.cell&&after.positions[box.board]===cell&&otherMoves&&!events[i].some(e=>e.type==='push'&&e.id===box.id))boxAsStopAfterSupport=true;
    }
  }
  return {used:[...used].sort(),partialBlocks,goalDepartures,unequalLoops,directionChanges,earlyTurns,occupiedBoxPlate,boxAsStopAfterSupport,finalApproach:states.at(-2)?.positions.map((p,i)=>p===level.boards[i].goal)||[]};
}

/** Compact runtime authoring record; full traces and searches stay in offline reports. */
export function summarizePurpose(purpose){return {valid:purpose.valid,won:purpose.won,evidenceScope:purpose.evidenceScope,commands:purpose.commands,boxes:(purpose.boxes||[]).map(({id,origin,final,pushes,directionChanges,deliveries,postDeliveryPushes,plateEntries,plateReleases,supportUses,observedRoles})=>({id,origin,final,pushes,directionChanges,deliveries,postDeliveryPushes,plateEntries,plateReleases,supportUses,observedRoles})),dependencies:(purpose.dependencies||[]).map(({gateId,receiverBoard,condition,controllers,crossings})=>({gateId,receiverBoard,condition,controllers,crossingCommands:crossings.map(c=>c.command)})),boardRoles:(purpose.boards||[]).map(b=>({board:b.board,moved:b.movedCommands.length,waited:b.waitingCommands.length,goalDepartures:b.goalDepartures.length})),caveat:'Uso neste certificado não prova necessidade. Consulte tests/sintonia-purpose-audit.json para ablações e limites.'};}
export function editorialReview(){return {status:'human-review-pending',dimensions:['purpose','discovery','interdependence','causal-clarity','spatial-economy','variety'],scores:null,humanPlaytesting:false,reason:'Replay e ablações são evidências automáticas, não substitutos de avaliação editorial e testes humanos.'};}

function reasoningFor(level,analysis,primary,rng,recentFamilies=[]){
  let family=FAMILY_BY_MECHANIC[primary];
  const observedFamilies=['final-command'];
  if(analysis.partialBlocks)observedFamilies.push('wall-adjust','waiting-place');
  if(analysis.earlyTurns)observedFamilies.push('intermediate-stop','axis-order');
  if(analysis.unequalLoops)observedFamilies.push('unequal-loop');
  if(analysis.goalDepartures.some(Boolean))observedFamilies.push('goal-transit');
  if(analysis.directionChanges>=3)observedFamilies.push('priority-change');
  if(!family)family=preferUnrecent(rng,observedFamilies,recentFamilies,value=>[value]);
  // A blocked push after the box reaches its plate can also serve as the
  // asymmetric waiting point, giving the object a second genuine function.
  // A blocked push in one witness does not establish a second necessary role.
  // Dual-use claims are assigned only by the support-then-release construction.
  const secondary=shuffled(rng,observedFamilies.filter(f=>f!==family)).slice(0,2),text=FAMILY_TEXT[family];
  if(!secondary.length)secondary.push('shared-command','individual-goals');
  return {family,secondaryFamilies:secondary,...primaryText(level,primary,family)};
}

export function antiSpamAudit(level,{maxMs=2000,sweep=true,randomRuns=16}={}){
  const start=initialState(level),win=s=>isWon(level,s),single=[];
  for(const direction of DIRECTIONS){let state=start;const seen=new Set();for(let i=0;i<256;i++){const key=stateKey(state);if(seen.has(key))break;seen.add(key);state=transition(level,state,direction).state;if(win(state)){single.push(direction);break;}}}
  const patterns=[];for(const a of DIRECTIONS)for(const b of DIRECTIONS)if(a!==b){patterns.push([a,b],[a,a,b],[a,b,b]);}patterns.push(['up','right','down','left'],['up','left','down','right'],['right','up','left','down'],['right','down','left','up']);
  const solvedPatterns=[];
  for(const pattern of patterns){let state=start,index=0;const seen=new Set();for(let step=0;step<256;step++){const key=`${stateKey(state)}|${index}`;if(seen.has(key))break;seen.add(key);state=transition(level,state,pattern[index]).state;index=(index+1)%pattern.length;if(win(state)){solvedPatterns.push(pattern.join(','));break;}}}
  let randomWins=0,uniformWins=0;const rng=seededRandom(`audit:biased:${structuralSignature(level)}`),uniformRng=seededRandom(`audit:uniform:${structuralSignature(level)}`);
  for(let run=0;run<randomRuns;run++){let state=start,direction=pick(rng,DIRECTIONS);for(let step=0;step<128;step++){if(rng()>.7)direction=pick(rng,DIRECTIONS);state=transition(level,state,direction).state;if(win(state)){randomWins++;break;}}}
  for(let run=0;run<randomRuns;run++){let state=start;for(let step=0;step<128;step++){state=transition(level,state,pick(uniformRng,DIRECTIONS)).state;if(win(state)){uniformWins++;break;}}}
  const macro=sweep?sweepReachability(level,{maxMs}):null;
  return {singleDirection:{tested:4,winningDirections:single},sweeps:macro?{status:macro.status,visited:macro.visited,solves:macro.positions.has(level.boards.map(b=>b.goal).join(','))}:{status:'not-run'},shortCycles:{tested:patterns.length,winningPatterns:solvedPatterns},biasedRandom:{runs:randomRuns,commandsPerRun:128,wins:randomWins},uniformRandom:{runs:randomRuns,commandsPerRun:128,wins:uniformWins},interpretation:'Diagnóstico automático; ciclos curtos e acertos aleatórios não provam ausência de raciocínio. A varredura testa vitória após cada movimento.'};
}

function chooseMechanics(rng,difficulty,learnedMechanics,requested,recentFamilies=[]){
  if(requested)return {primary:requested.primary||'walls',secondary:requested.secondary||null,introduction:requested.introduction||false};
  const unlocked=MECHANICS.filter(m=>m.difficulty<=difficulty).map(m=>m.id),learned=Array.isArray(learnedMechanics)?new Set(['walls',...learnedMechanics]):null;
  const available=learned?unlocked.filter(m=>learned.has(m)):unlocked;
  const unknown=learned?unlocked.filter(m=>!learned.has(m)):[];
  // The next unknown concept is introduced alone. A selected high difficulty
  // remains available immediately, but does not silently require several rules.
  const mechanicFamilies=mechanic=>mechanic==='walls'?WALL_FAMILIES:[FAMILY_BY_MECHANIC[mechanic]];
  const primary=unknown.length?unknown[0]:preferUnrecent(rng,available.length?available:['walls'],recentFamilies,mechanicFamilies);
  const secondary=!unknown.length&&difficulty>=2&&rng()<.65?preferUnrecent(rng,available.filter(m=>m!==primary&&['box','ice','portal','oneway','fragile'].includes(m)),recentFamilies,mechanicFamilies):null;
  return {primary,secondary,introduction:unknown.length>0};
}

/** Generate a complete definition. A timeout throws; it is never interpreted as
 * a proof of impossibility and no unverified candidate escapes this function. */
export function generateLevel(seed,{difficulty=0,animals,learnedMechanics,recentSignatures=[],recentFamilies=[],maxStates=18000,maxMs=6500,profile,strictSweep=false}={}){
  difficulty=clamp(Math.floor(Number(difficulty)||0),0,5);
  if(!Number.isFinite(maxStates)||maxStates<16||!Number.isFinite(maxMs)||maxMs<=0)throw new Error('generation-budget');
  const rng=seededRandom(`${GENERATOR_VERSION}:${seed}`),choice=chooseMechanics(rng,difficulty,learnedMechanics,profile,recentFamilies);
  const count=clamp(Number(animals)|| (choice.introduction||difficulty<2?2:difficulty<4?(rng()<.55?3:2):(rng()<.3?4:rng()<.65?3:2)),2,4);
  const shapeDifficulty=profile?.shapeDifficulty??(choice.introduction?Math.min(2,Math.max(0,difficulty-1)):count===4?Math.min(2,difficulty):difficulty);
  const depthRanges=[[1,7],[5,12],[7,18],[9,24],[11,28],[13,32]];
  let [minDepth,maxDepth]=depthRanges[difficulty];
  if(choice.introduction||profile?.role==='revisit'){minDepth=Math.max(2,minDepth-4);maxDepth=Math.max(minDepth+3,maxDepth-6);}
  if(choice.introduction&&!profile){minDepth=3;maxDepth=14;}
  if(profile?.role==='compact'){minDepth=Math.max(4,minDepth-2);maxDepth=Math.max(minDepth+3,maxDepth-3);}
  if(profile?.role==='deep'||profile?.role==='synthesis'){minDepth+=2;maxDepth+=4;}
  if(profile?.minDepth!==undefined)minDepth=profile.minDepth;if(profile?.maxDepth!==undefined)maxDepth=profile.maxDepth;
  const deadline=clock()+maxMs,recent=new Set(recentSignatures),failures={};let attempts=0;
  while(attempts++<100&&clock()<deadline){
    try{
      const built=candidate(rng,{difficulty:shapeDifficulty,animals:count,primary:choice.primary,secondary:choice.secondary,introduction:choice.introduction,pattern:profile?.pattern,orientations:profile?.orientations,prepareSender:profile?.prepareSender,includeSupportedStop:!profile,preparationControl:profile?.preparationControl??(!profile&&choice.primary==='oneway'?(rng()<.5?'switch':'key'):undefined)});
      const valid=validateLevel(built.level);if(!valid.valid)throw new Error(`invalid:${valid.errors[0]}`);
      const result=searchTargets(built.level,built.constraints,built.required,{rng,minDepth:built.design?.pattern==='support-and-necessary-stop'?Math.min(8,minDepth):minDepth,maxDepth,maxStates,maxMs:Math.max(30,Math.min(deadline-clock(),5000)),avoidSweep:strictSweep||difficulty>0||minDepth>=4,strictSweep});
      const signature=structuralSignature(result.level);if(recent.has(signature)||recent.has(structuralSignature(result.level,{topologyOnly:true})))throw new Error('recent-repeat');
      const checked=replay(result.level,result.solution);if(!checked.valid||!checked.won)throw new Error('certificate-replay-failed');
      const analysis=analyzeSolution(result.level,result.solution),reasoning=reasoningFor(result.level,analysis,choice.primary,rng,recentFamilies),purpose=analyzePurpose(result.level,result.solution);
      if(built.design){
        const d=built.design;
        if(['support-then-release','support-and-necessary-stop'].includes(d.pattern))reasoning.family='dual-use-object';
        if(d.pattern==='park-and-retrieve')reasoning.family='preserve-access';
        if(d.name)reasoning.name=d.name;if(d.lesson)reasoning.lesson=d.lesson;if(d.hints)reasoning.hints=d.hints;
        reasoning.discovery=d.discovery.startsWith('Aqui o jogador')?d.discovery:`Aqui o jogador precisa descobrir que ${d.discovery}.`;
        if(choice.primary==='delivery'){reasoning.name='Preparar a entrega';reasoning.lesson='Libere a saída do canal e reposicione a caixa recebida antes de usar o apoio.';reasoning.hints=['O canal precisa de uma saída livre antes do envio.','Receber ainda não basta: encontre a face que permite orientar a caixa para a placa.','Prepare as ajudas de retorno antes de abandonar uma placa.'];}
        if(purpose.boxes.some(b=>b.pushes.length<2||b.directionChanges===0))throw new Error('box-role-not-realized');
        if(d.pattern==='support-then-release'&&!purpose.boxes.some(b=>b.plateReleases.some(r=>r.afterGateSupport)))throw new Error('support-release-not-realized');
        if(choice.primary==='delivery'&&purpose.boxes.some(b=>b.postDeliveryPushes.length<2))throw new Error('recipient-role-not-realized');
        if(d.pattern==='support-and-necessary-stop'){const proof=findAvoidingSolution(result.level,{avoid:{type:'box-supported-stop',boxId:'box0'},maxStates:Math.min(maxStates,20000),maxMs:Math.max(1,Math.min(1200,deadline-clock()))});if(proof.status==='inconclusive'&&String(proof.reason).includes('time'))throw timeout();if(proof.status!=='unsolvable')throw new Error('supported-stop-not-proven');d.necessity={predicate:'box-supported-stop',status:proof.status,visited:proof.visited,maxStates:Math.min(maxStates,20000),scope:'full-state monitored exhaustive avoidance'};}
      }
      if(reasoning.hints[2]==='Peça uma dica concreta para a configuração atual.')reasoning.hints[2]=`Na configuração inicial, comece para ${{up:'cima',right:'a direita',down:'baixo',left:'a esquerda'}[result.solution[0]]}; observe quem avança e quem espera.`;
      const level={...result.level,...reasoning,id:`endless-v${GENERATOR_VERSION}-${hashString(seed).toString(16)}`,version:1,rulesVersion:RULES_VERSION,generatorVersion:GENERATOR_VERSION,contentRevision:CONTENT_REVISION,seed:String(seed),difficulty,solution:result.solution,signature,
        prerequisites:result.level.mechanics.filter(m=>m!==choice.primary),introduction:choice.introduction?[choice.primary]:[],
        parameters:{difficulty,animals:count,primary:choice.primary,secondary:result.level.mechanics.includes(choice.secondary)?choice.secondary:null,role:profile?.role||'varied',pattern:built.design?.pattern||null},
        certificate:{method:'breadth-first-witness-and-engine-replay',rulesVersion:RULES_VERSION,commands:result.solution.length,optimal:result.search.optimal,visited:result.search.visited,replayed:true},
        editorial:{source:built.design?'role-first-structure-and-automatic-curation':'procedural-structure-and-automatic-curation',design:built.design,purpose:summarizePurpose(purpose),rubric:editorialReview(),humanPlaytested:false,discovery:reasoning.discovery,reasoning:analysis,sweep:result.sweep,compatibility:'validated',alternatives:'Uma sequência verificada é fornecida; outras soluções podem existir.',deadEnds:result.level.mechanics.some(m=>['box','fragile','oneway','delivery'].includes(m))?'A fase permite estados sem saída; desfazer e reiniciar são livres.':'Mudanças de configuração podem exigir retornar a uma posição anterior.'}};
      return {level,solution:level.solution,signature,validation:{valid:true,replayed:true,search:result.search,sweep:result.sweep,attempts}};
    }catch(error){if(error.code==='GENERATION_TIMEOUT')throw error;const message=String(error.message||error);failures[message]=(failures[message]||0)+1;}
  }
  const error=new Error('Não foi possível certificar um novo desafio dentro do orçamento.');error.code='GENERATION_BUDGET';error.diagnostics={attempts,failures,primary:choice.primary,secondary:choice.secondary,animals:count,difficulty};throw error;
}

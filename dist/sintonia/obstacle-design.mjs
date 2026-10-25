/** Role-first non-box designs. These are content constructors, not game rules.
 * Controls are placed on preparatory branches before goals are selected. Every
 * gate is a cut between regions; an irreversible edge separates a still-needed
 * preparation region, or deliberately requires an independent return route.
 */
export const OBSTACLE_PRIMARIES = Object.freeze(['key','switch','oneway','fragile','portal']);
const ANIMALS=['capivara','tuiuiu','bemtevi','mico'];
const pick=(rng,values)=>values[Math.floor(rng()*values.length)];
const clone=value=>JSON.parse(JSON.stringify(value));
const edgeKey=(a,b)=>a<b?`${a}:${b}`:`${b}:${a}`;
function board(index,rows,cols,walkable,start,goal){return {id:`b${index}`,animal:ANIMALS[index],rows,cols,walkable:[...walkable].sort((a,b)=>a-b),start,goal};}
function neighbors(b,c){const r=Math.floor(c/b.cols),x=c%b.cols;return [[r-1,x],[r,x+1],[r+1,x],[r,x-1]].filter(([y,z])=>y>=0&&z>=0&&y<b.rows&&z<b.cols).map(([y,z])=>y*b.cols+z).filter(v=>b.walkable.includes(v));}
function reached(b,start,blocked=[]){const ban=new Set(blocked.map(([a,c])=>edgeKey(a,c))),seen=new Set([start]),queue=[start];for(let i=0;i<queue.length;i++)for(const n of neighbors(b,queue[i]))if(!seen.has(n)&&!ban.has(edgeKey(n,queue[i]))){seen.add(n);queue.push(n);}return seen;}
function path(b,start,goal){const queue=[start],parents=new Map([[start,null]]);for(let i=0;i<queue.length;i++){const c=queue[i];if(c===goal){const result=[];for(let p=c;p!==null;p=parents.get(p))result.push(p);return result.reverse();}for(const n of neighbors(b,c))if(!parents.has(n)){parents.set(n,c);queue.push(n);}}return [];}
function cutEdges(b){const out=[];for(const a of b.walkable)for(const c of neighbors(b,a))if(a<c&&!reached(b,a,[[a,c]]).has(c))out.push([a,c]);return out;}
function fixedFork(){return board(0,4,4,[1,2,5,6,7,10,14,15],7,15);}
function fallbackReceiver(){return board(1,3,3,[0,1,2,4,7,8],0,8);}
function gate(id,from,to,condition){return {id,from,to,condition:clone(condition)};}

/** Select three arms with different jobs: origin, off-route preparation, exit.
 * A cut at commit leaves the preparation arm behind. This is deliberately not
 * a random icon on the shortest path to a retrospectively selected goal.
 */
function preparationFork(rng,{difficulty,makeBoard}){
  for(let attempt=0;attempt<12;attempt++){
    const b=makeBoard?makeBoard(rng,0,Math.max(2,difficulty),'tree'):fixedFork();
    const cuts=new Set(cutEdges(b).map(([a,c])=>edgeKey(a,c))),choices=[];
    for(const start of b.walkable)for(const goal of b.walkable){
      const route=path(b,start,goal);if(route.length<5||route.length>9)continue;
      const last=[route.at(-2),goal];if(!cuts.has(edgeKey(...last)))continue;
      for(let k=1;k<route.length-2;k++){
        const commit=[route[k],route[k+1]];if(!cuts.has(edgeKey(...commit)))continue;
        const near=reached(b,start,[commit]);
        const controls=b.walkable.filter(c=>near.has(c)&&!route.includes(c)&&path(b,start,c).length>=2&&neighbors(b,c).length<=2);
        for(const control of controls)choices.push({b,start,goal,control,commit,last,route});
      }
    }
    if(choices.length){const selected=pick(rng,choices);selected.b.start=selected.start;selected.b.goal=selected.goal;return selected;}
  }
  const b=fixedFork();return {b,start:7,goal:15,control:1,commit:[6,10],last:[14,15],route:[7,6,10,14,15]};
}
function receiver(rng,{difficulty,makeBoard},condition){
  for(let attempt=0;attempt<16;attempt++){
    const b=makeBoard?makeBoard(rng,1,Math.max(2,difficulty),'tree'):fallbackReceiver();
    const cuts=new Set(cutEdges(b).map(([a,c])=>edgeKey(a,c))),choices=[];
    for(const start of b.walkable)for(const goal of b.walkable){const route=path(b,start,goal);if(route.length<5||route.length>9)continue;if(!route.slice(1).every((c,i)=>cuts.has(edgeKey(c,route[i]))))continue;choices.push({start,goal,route});}
    if(!choices.length)continue;const selected=pick(rng,choices);b.start=selected.start;b.goal=selected.goal;
    const offset=Math.min(selected.route.length-2,2),from=selected.route[offset-1],to=selected.route[offset];
    b.gates=[gate('preparation-remote',from,to,condition)];
    const region=reached(b,to,[[from,to]]);
    return {b,region,route:selected.route};
  }
  const b=fallbackReceiver();b.gates=[gate('preparation-remote',4,7,condition)];return {b,region:new Set([7,8]),route:[0,1,4,7,8]};
}
function controlField(b,type,cell,id='prepare'){
  if(type==='switch'){b.switches=[{id,cell,group:id}];return {type:'switch',id,value:true};}
  b.keys=[{id,cell}];return {type:'key',id};
}
function forkDesign(rng,options){
  const {primary}=options,selected=preparationFork(rng,options),a=selected.b;
  const controlType=primary==='oneway'&&options.preparationControl?options.preparationControl:primary==='switch'?'switch':primary==='fragile'&&rng()<.5?'switch':'key';
  const condition=controlField(a,controlType,selected.control);
  a.gates=[];
  if(primary==='oneway')a.oneWays=[{from:selected.commit[0],to:selected.commit[1]}];
  if(primary==='fragile')a.fragile=[selected.commit[1]];
  const target=receiver(rng,options,condition);
  const irreversible=['oneway','fragile'].includes(primary);
  return {boards:[a,target.b],constraints:new Map([[0,new Set([a.goal])],[1,target.region]]),mechanics:['walls',controlType,...(irreversible?[primary]:[])],required:new Set([controlType,`${controlType}-gate`,...(irreversible?[primary]:[])]),
    design:{preparationControl:controlType,pattern:irreversible?`${primary}-prepare-before-commit`:`${primary}-fork-before-exit`,
      discovery:irreversible?'o controle no desvio precisa estar preparado antes de abandonar seu acesso':'o desvio de preparação libera o outro animal, mudando qual caminho precisa de atenção',
      roles:[{board:0,role:'preparer-and-committer',control:selected.control,commit:irreversible?selected.commit:null,goalRegion:[a.goal]},{board:1,role:'receiver-and-aligner',goalRegion:[...target.region]}],
      structures:[{board:0,role:'prepare',cells:path(a,a.start,selected.control)},{board:0,role:irreversible?'preserve-access':'separate',edge:selected.commit},{board:0,role:'exit',edge:selected.last},{board:1,role:'remote-exit',edge:[target.b.gates[0].from,target.b.gates[0].to]}],
      dependencies:[{fromBoard:0,toBoard:1,control:'prepare',role:'prepare-remote-exit'}],
      order:irreversible?['prepare-control','commit-access','cross-prepared-exits','joint-arrival']:['visit-side-branch','leave-control-with-configuration','cross-exits','joint-arrival'],
      counterfactual:irreversible?'Crossing before preparation strands the control behind a one-way edge or collapsed bridge; verify the specific prefix on the final definition.':'Opening the preparation gate removes the obligation to visit the side branch.',
      proofStatus:'structural-design-hypothesis; replay and budgeted ablations recorded separately'}};
}
function returnCircuit(rng,options){
  const a=board(0,4,4,[2,5,6,9,10,13,14],6,2),condition=controlField(a,'key',14);
  a.oneWays=[{from:6,to:10}];a.gates=[gate('prepared-return',5,9,condition)];
  // The extra branch is an alternate waiting position, never a shortcut across
  // either controlled cut. Its presence changes which shared directions wait.
  if(rng()<.5)a.walkable.push(1);a.walkable.sort((x,y)=>x-y);
  const target=receiver(rng,options,condition);
  return {boards:[a,target.b],constraints:new Map([[0,new Set([2])],[1,target.region]]),mechanics:['walls','key','oneway'],required:new Set(['key','key-gate','oneway']),
    design:{pattern:'oneway-independent-return',discovery:'depois da passagem de sentido único, o retorno usa uma saída diferente, liberada pela chave',roles:[{board:0,role:'committer-and-returner',goalRegion:[2]},{board:1,role:'receiver-and-aligner',goalRegion:[...target.region]}],structures:[{board:0,role:'commit',edge:[6,10]},{board:0,role:'preserve-return',edge:[5,9]},{board:0,role:'prepare',cells:[14]}],dependencies:[{fromBoard:0,toBoard:0,control:'prepare',role:'open-independent-return'},{fromBoard:0,toBoard:1,control:'prepare',role:'open-recipient'}],order:['commit-outward','collect-key','return-by-other-edge','joint-arrival'],counterfactual:'Removing the directed restriction permits a direct return from the key instead of the independent return branch.',proofStatus:'structural-design-hypothesis; replay and budgeted ablations recorded separately'}};
}
function portalReturn(rng,options){
  const mode=Math.floor(rng()*3),left=mode===0?[0,1,6,7,12]:[0,1,6,7,12,13],right=mode===0?[4,5,10,11,16,17]:mode===1?[4,5,11,16,17]:[4,10,11,16,17];
  const a=board(0,3,6,[...left,...right],0,12);
  const entrance=mode===2?7:1,exit=4,control=mode===1?16:17;
  a.portals=[{id:'preparation-portal',a:entrance,b:exit}];
  const condition=controlField(a,'key',control);
  // Two empty columns separate the islands even in the larger variants.
  // The goal returns to the initial island; only the key unlocks the receiver.
  const target=receiver(rng,options,condition);
  return {boards:[a,target.b],constraints:new Map([[0,new Set([12])],[1,target.region]]),mechanics:['walls','key','portal'],required:new Set(['key','key-gate','portal']),
    design:{pattern:'portal-retrieve-and-return',discovery:'o portal serve para buscar a preparação e voltar; a chegada precisa ser alinhada na região inicial',roles:[{board:0,role:'retriever-and-returner',goalRegion:[12]},{board:1,role:'receiver-and-aligner',goalRegion:[...target.region]}],structures:[{board:0,role:'reorganize-access',cells:[entrance,exit]},{board:0,role:'prepare',cells:[control]},{board:0,role:'return-home',cells:[12]}],dependencies:[{fromBoard:0,toBoard:1,control:'prepare',role:'unlock-recipient'}],order:['enter-portal','retrieve-key','return-through-portal','joint-arrival'],counterfactual:'Without the portal the key component is disconnected. Fixing the key gate open removes the need to retrieve and return.',proofStatus:'structural-design-hypothesis; replay and budgeted ablations recorded separately'}};
}
function addContributors(rng,design,options){
  const type=options.primary==='switch'?'switch':'key';
  for(let index=2;index<options.animals;index++){
    const available=[];
    for(let bi=0;bi<design.boards.length;bi++){
      const b=design.boards[bi],goals=[...design.constraints.get(bi)||[b.goal]],occupied=new Set((b.gates||[]).map(g=>edgeKey(g.from,g.to)));
      for(const [from,to]of cutEdges(b))if(!occupied.has(edgeKey(from,to))){const near=reached(b,b.start,[[from,to]]);if(goals.every(c=>!near.has(c)))available.push({bi,from,to});}
    }
    if(!available.length)throw new Error('obstacle-contributor-no-cut');
    const target=pick(rng,available),id=`contributor-${index}`;
    let b=options.makeBoard?options.makeBoard(rng,index,Math.max(1,options.difficulty),'tree'):board(index,3,3,[0,1,2,4,7,8],0,8);
    b.id=`b${index}`;b.animal=ANIMALS[index];
    const choices=b.walkable.filter(c=>c!==b.start&&neighbors(b,c).length===1);
    const control=pick(rng,choices.length?choices:b.walkable.filter(c=>c!==b.start));
    const condition=controlField(b,type,control,id),goals=b.walkable.filter(c=>c!==b.start&&c!==control);
    if(!goals.length)throw new Error('obstacle-contributor-no-goal');b.goal=pick(rng,goals);
    design.boards.push(b);design.constraints.set(index,new Set(goals));
    (design.boards[target.bi].gates||=[]).push(gate(`contributor-gate-${index}`,target.from,target.to,condition));
    if(!design.mechanics.includes(type))design.mechanics.push(type);design.required.add(type);design.required.add(`${type}-gate`);
    design.design.roles.push({board:index,role:'independent-preparer-and-aligner',control,goalRegion:goals});
    design.design.dependencies.push({fromBoard:index,toBoard:target.bi,control:id,role:'prepare-separate-cut'});
    design.design.structures.push({board:index,role:'prepare',cells:[control]},{board:target.bi,role:'contributor-exit',edge:[target.from,target.to]});
  }
  return design;
}

/** Returns null for mechanics handled by the caller. No solver or RNG-dependent
 * wall-clock choice occurs here. The caller must certify the complete level. */
export function buildObstacleDesign(rng,{primary,animals=2,difficulty=2,introduction=false,makeBoard,preparationControl}={}){
  if(!OBSTACLE_PRIMARIES.includes(primary))return null;
  const options={primary,animals,difficulty,introduction,makeBoard,preparationControl};
  const result=primary==='portal'?portalReturn(rng,options):primary==='oneway'&&!introduction&&preparationControl!=='switch'&&rng()<.35?returnCircuit(rng,options):forkDesign(rng,options);
  return addContributors(rng,result,options);
}

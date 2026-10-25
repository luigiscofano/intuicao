import {createEngine} from './engine.mjs';
import {encounterMatrix} from './diversity.mjs';
import {graphRouteEvidence} from './design-evidence.mjs';
const identity=level=>Object.fromEntries(level.cells.map(c=>[c.id,c.id]));
const advance=(tokens,movements)=>{const next={...tokens};for(const m of movements)next[m.to]=tokens[m.from];return next;};
function shadowTrace(level){
 const engine=createEngine(level);let state=engine.initialState(),tokens=identity(level);const frames=[{state,tokens}],routes=new Map(level.cells.map(c=>[c.id,[]]));
 for(let index=0;index<(level.solution??[]).length;index++){
  const result=engine.transition(state,level.solution[index]);if(!result.allowed)return {valid:false,invalidMove:index};
  for(const movement of result.movements){const route=routes.get(tokens[movement.from]);if(route.at(-1)?.ring!==movement.ring)route.push({ring:movement.ring,move:index,at:movement.from});}
  state=result.state;tokens=advance(tokens,result.movements);frames.push({state,tokens,movement:result});
 }
 return {valid:true,engine,frames,routes};
}
function components(matrix,removed=new Set()){
 const seen=new Set(removed),out=[];
 for(let seed=0;seed<matrix.length;seed++)if(!seen.has(seed)){const queue=[seed];seen.add(seed);for(const at of queue)for(let next=0;next<matrix.length;next++)if(matrix[at][next]&&!seen.has(next)){queue.push(next);seen.add(next);}out.push(queue);}
 return out;
}
/** Exact small-network cuts, separately reported from puzzle difficulty. */
export function bottleneckEvidence(level){
 const matrix=encounterMatrix(level),names=level.rings.map(r=>r.id),base=components(matrix).length,articulations=[],twoRingCuts=[];
 for(let i=0;i<matrix.length;i++){const parts=components(matrix,new Set([i]));if(parts.length>base)articulations.push({ring:names[i],regions:parts.map(p=>p.map(j=>names[j]))});}
 for(let i=0;i<matrix.length;i++)for(let j=i+1;j<matrix.length;j++){
  if(articulations.some(a=>a.ring===names[i]||a.ring===names[j]))continue;
  const parts=components(matrix,new Set([i,j]));if(parts.length>base)twoRingCuts.push({rings:[names[i],names[j]],regions:parts.map(p=>p.map(k=>names[k]))});
 }
 const trace=shadowTrace(level),pairs=graphRouteEvidence(level).pairs,corridors=[];
 function observed(path){
  if(!trace.valid)return null;
  for(const [token,route] of trace.routes)for(let start=0;start<=route.length-path.length;start++){
   const section=route.slice(start,start+path.length),rings=section.map(s=>s.ring);
   if(rings.every((r,i)=>r===path[i])||rings.every((r,i)=>r===path[path.length-1-i]))return {token,fromMove:section[0].move,toMove:section.at(-1).move,transfers:section.slice(1)};
  }
  return null;
 }
 for(const pair of pairs)for(let a=0;a<pair.paths.length;a++)for(let b=a+1;b<pair.paths.length;b++){
  const left=pair.paths[a].rings,right=pair.paths[b].rings,li=left.slice(1,-1),ri=right.slice(1,-1);
  if(!li.length||!ri.length||li.some(r=>ri.includes(r)))continue;
  if([...li,...ri].some(r=>matrix[names.indexOf(r)].filter(Boolean).length!==2))continue;
  const first=observed(left),second=observed(right);
  corridors.push({from:pair.from,to:pair.to,paths:[left,right],internallyDisjoint:true,interiorDegreeTwo:true,referenceTraversals:[first,second],bothTraversed:!!first&&!!second});
 }
 return {articulations,twoRingCuts,corridors,multipleBottleneckWitness:corridors.find(c=>c.bothTraversed)??null,interpretation:'Graph cuts and observed reference traversals; no claim that every solution must use these corridors.'};
}
/** Two doors plus an actual outside token held in exclusive storage during >=2 other moves. */
export function reserveMemoryEvidence(level){
 const trace=shadowTrace(level);if(!trace.valid)return {valid:false,witnesses:[]};
 const matrix=encounterMatrix(level),witnesses=[];
 for(let ri=0;ri<level.rings.length;ri++){
  const ring=level.rings[ri],neighbors=matrix[ri].map((n,i)=>n?i:-1).filter(i=>i>=0);
  if(neighbors.length!==1||matrix[ri][neighbors[0]]<2||ring.cells.length>8)continue;
  const exclusive=ring.cells.filter(c=>level.rings.filter(r=>r.cells.includes(c)).length===1),doors=ring.cells.filter(c=>!exclusive.includes(c));
  for(const token of level.cells.map(c=>c.id)){
   if(ring.cells.includes(token)||level.initial[token]==='n')continue;
   const position=frame=>Object.keys(frame.tokens).find(c=>frame.tokens[c]===token);
   for(let entry=1;entry<trace.frames.length;entry++){
    if(!exclusive.includes(position(trace.frames[entry]))||exclusive.includes(position(trace.frames[entry-1])))continue;
    let exit=entry+1,otherMoves=0;
    for(;exit<trace.frames.length;exit++){
     const frame=trace.frames[exit];
     if(!exclusive.includes(position(frame)))break;
     if(!frame.movement.affectedRings.includes(ring.id))otherMoves++;
    }
    if(exit>=trace.frames.length||otherMoves<2)continue;
    const outsideIndex=trace.frames.findIndex((frame,index)=>index>=exit&&!ring.cells.includes(position(frame)));
    if(outsideIndex<0)continue;
    const before=trace.frames[entry-1].tokens,after=trace.frames[exit].tokens;
    witnesses.push({ring:ring.id,token,doors,entryMove:entry-1,exitMove:exit-1,outsideMove:outsideIndex-1,heldDuringOtherMoves:otherMoves,exclusiveCells:exclusive,ringRestoredAtExit:ring.cells.every(c=>before[c]===after[c]),tokenExitCell:position(trace.frames[outsideIndex])});
    break;
   }
  }
 }
 return {valid:true,witnesses,interpretation:'Observed two-door temporary storage, not proof of necessary storage or minimum solution.'};
}
/** Find a legal A B A^-1 B^-1 with only 2–4 positional changes, from a replayed prefix. */
export function findLocalizedCommutator(level,{maxReferenceStates=8}={}){
 const trace=shadowTrace(level);if(!trace.valid)return null;
 for(let prefix=0;prefix<Math.min(trace.frames.length,maxReferenceStates);prefix++)for(let a=0;a<level.commands.length;a++)for(let b=a+1;b<level.commands.length;b++)for(const da of [1,-1])for(const db of [1,-1]){
  const moves=[{command:level.commands[a].id,direction:da},{command:level.commands[b].id,direction:db},{command:level.commands[a].id,direction:-da},{command:level.commands[b].id,direction:-db}];
  let state=trace.frames[prefix].state,tokens=identity(level),valid=true;const rings=new Set();
  for(const move of moves){const result=trace.engine.transition(state,move);if(!result.allowed){valid=false;break;}state=result.state;tokens=advance(tokens,result.movements);result.affectedRings.forEach(r=>rings.add(r));}
  if(!valid||rings.size<2)continue;
  const support=Object.keys(tokens).filter(c=>tokens[c]!==c);
  if(support.length>=2&&support.length<=4)return {prefix:(level.solution??[]).slice(0,prefix),moves,support,supportSize:support.length,restoredCells:level.cells.length-support.length,fromReferenceIndex:prefix,verifiedLegal:true,interpretation:'A legal localized sequence; not claimed to solve the puzzle.'};
 }
 return null;
}
export function semanticFamilyEvidence(level,{commutator=false}={}){
 const reserve=reserveMemoryEvidence(level),bottlenecks=bottleneckEvidence(level);
 return {reserve,bottlenecks,...(commutator?{localizedCommutator:findLocalizedCommutator(level)}:{}),certifiedRoles:[...(reserve.witnesses.length?['two-door-reserve']:[]),...(bottlenecks.multipleBottleneckWitness?['multiple-bottlenecks']:[])]};
}

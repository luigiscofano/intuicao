/** Concrete editorial witnesses from exact cells and sound production deduction records. */
import {geometryLocalAnalysis,supportCells,neighbors} from '../dist/geometry-games.mjs';
const connected=(cs,l)=>{if(!cs.length)return false;const set=new Set(cs),q=[cs[0]],seen=new Set(q);for(const c of q)for(const d of neighbors(c,l.rows,l.cols))if(set.has(d)&&!seen.has(d)){seen.add(d);q.push(d);}return seen.size===set.size;};
export function counterexample(l,kind){
 const n=l.rows*l.cols;if(n>20)return null;
 const incidences=l.supports.map(p=>supportCells(l,p));
 for(const [s,p]of l.supports.entries()){
  const required=incidences[s],banned=new Set(incidences.flatMap((v,j)=>j===s?[]:v)),optional=Array.from({length:n},(_,i)=>i).filter(i=>!required.includes(i)&&!banned.has(i));
  for(let mask=0;mask<2**optional.length;mask++){
   const cs=required.concat(optional.filter((_,i)=>mask&(1<<i))),x=cs.reduce((v,c)=>v+2*(c%l.cols)-p.x2,0),y=cs.reduce((v,c)=>v+2*Math.floor(c/l.cols)-p.y2,0),conn=connected(cs,l);
   if(kind==='balanced-disconnected'?(x===0&&y===0&&!conn):(conn&&(x!==0||y!==0))){return {kind,support:s,cells:cs,incidentCells:required,momentX:x,momentY:y,connected:conn,scope:'Contraexemplo parcial de uma peça; não é uma derrota durante a edição. A propriedade ausente é exigida na resposta completa.'};}
  }
 }
 return null;
}
export function cascadeWitness(l,state={}){
 const analysis=geometryLocalAnalysis(l,state),as=state.assignments??[],n=l.rows*l.cols,k=l.supports.length,domains=Array.from({length:n},(_,c)=>as[c]>=0?[as[c]]:Array.from({length:k},(_,s)=>s));
 const events=new Map(),eliminationsByCell=new Map();
 for(const [s,p]of l.supports.entries())for(const c of supportCells(l,p)){domains[c]=[s];events.set(c,{cell:c,support:s,kind:'incident-or-prefix',chain:[s],steps:[]});}
 for(let c=0;c<n;c++)if(as[c]>=0)events.set(c,{cell:c,support:as[c],kind:'certified-prefix',chain:[as[c]],steps:[]});
 let best=null;
 for(const [index,e]of analysis.eliminations.entries()){
  if(!domains[e.index].includes(e.value))continue;
  domains[e.index]=domains[e.index].filter(v=>v!==e.value);
  const premises=e.premises||{},required=Array.isArray(premises.requiredCells)?premises.requiredCells.filter(c=>c!==e.index):[];
  const parents=required.map(c=>events.get(c)).filter(p=>{if(!p||p.support!==e.value||e.technique!=='moment-bounds')return false;const anchor=l.supports[e.value],d=premises.axis==='x'?2*(p.cell%l.cols)-anchor.x2:2*Math.floor(p.cell/l.cols)-anchor.y2;const relaxedMin=premises.minimum-Math.max(d,0),relaxedMax=premises.maximum-Math.min(d,0);return relaxedMin<=0&&relaxedMax>=0;});
  const entry={index,cell:e.index,excludedSupport:e.value,rule:e.technique,explanation:e.explanation,premises};
  if(!eliminationsByCell.has(e.index))eliminationsByCell.set(e.index,[]);eliminationsByCell.get(e.index).push({entry,parents});
  if(domains[e.index].length===1&&!events.has(e.index)){
   const support=domains[e.index][0],proofs=eliminationsByCell.get(e.index);let path={chain:[support],steps:[]};
   for(const proof of proofs)for(const p of proof.parents){const chain=[...p.chain,support];if(new Set(chain).size>new Set(path.chain).size)path={chain,steps:[...p.steps,{...proof.entry,forcedCell:e.index,forcedSupport:support,dependsOnCell:p.cell,dependencyCheck:'Relaxing this required cell into optional makes this recorded moment interval include zero'}]};}
   const event={cell:e.index,support,kind:'forced-by-eliminations',...path};events.set(e.index,event);if(!best||new Set(event.chain).size>new Set(best.chain).size)best=event;
  }
 }
 return {analysis,best:best&&{...best,distinctSupports:new Set(best.chain).size,scope:'Cadeia de dependência de deduções locais sob o estado parcial indicado, não medida de dificuldade humana.'}};
}
export function combinedWitness(l,state={}){
 const a=geometryLocalAnalysis(l,state),bounds=a.eliminations.filter(e=>e.technique==='moment-bounds'),access=a.eliminations.filter(e=>e.technique==='connectivity-path');
 if(!bounds.length||!access.length)return null;
 let pair;for(const b of bounds){const c=access.find(e=>e.index===b.index||e.value===b.value||e.premises?.requiredCells?.includes(b.index));if(c){pair=[b,c];break;}}
 pair??=[bounds[0],access[0]];
 return {kind:'compensation-and-access',sameCell:pair[0].index===pair[1].index,sameSupport:pair[0].value===pair[1].value,steps:pair,scope:'Duas exclusões locais verificadas no mesmo estado: intervalo de compensação sem zero e falta de caminho até o apoio. Não afirma por si uma dependência entre exclusões.'};
}
export function findSageEvidence(l,answer){
 const contexts=[{name:'initial',state:{}}];
 for(const divisor of [5,4,3,2])for(let offset=0;offset<divisor;offset++)contexts.push({name:`certified-cell-prefix-${divisor}-${offset}`,state:{assignments:answer.map((v,c)=>c%divisor===offset?v:-1)}});
 let chain=null,combined=null;
 for(const context of contexts){const a=cascadeWitness(l,context.state);if(a.best&&(!chain||a.best.distinctSupports>chain.witness.distinctSupports))chain={...context,witness:a.best};const b=combinedWitness(l,context.state);if(b&&(!combined||b.sameCell&&!combined.witness.sameCell))combined={...context,witness:b};if(chain?.witness.distinctSupports>=3&&combined?.witness.sameCell)break;}
 return {chain,combined};
}

/** Initial-state-independent canonical incidence structure. Coordinates, symbols,
 * ring/cell names, cyclic origins and traversal reflections do not distinguish it.
 * Shared cell identities survive normalization (unlike a sorted pair histogram). */
export function structuralSignature(level,{includeGoals=false}={}){
 const rings=level.rings,owners=new Map(level.cells.map(c=>[c.id,[]]));
 rings.forEach((r,i)=>r.cells.forEach(c=>owners.get(c).push(i)));
 let best=null;
 function walk(queue,seenR,seenC,rows,orient){
  if(rows.length===rings.length){
   const typeIds=new Map(),typeId=type=>{if(!typeIds.has(type))typeIds.set(type,typeIds.size);return typeIds.get(type);};
   const targetPattern=includeGoals?[...seenC.entries()].sort((a,b)=>a[1]-b[1]).map(([id])=>Object.hasOwn(level.targets??{},id)?typeId(level.targets[id]):null):null;
   const unbound=includeGoals?[...new Set(level.commands.flatMap(c=>(c.requires??[]).map(s=>s.type)))].filter(t=>!typeIds.has(t)):[];
   // Sensor-only types have no target encounter that can establish a canonical name.
   // Explore their bijections, never depend on caller command ordering.
   if(unbound.length>8)throw new RangeError('Authored canonicalization supports at most eight sensor-only equivalence classes.');
   function emit(rest,ids){
    if(rest.length){for(const t of rest){const next=new Map(ids);next.set(t,next.size);emit(rest.filter(x=>x!==t),next);}return;}
    const commandRows=level.commands.map(c=>{
     const turns=c.turns.map(t=>[seenR.get(rings.findIndex(r=>r.id===t.ring)),t.delta*orient.get(rings.findIndex(r=>r.id===t.ring))]).sort((a,b)=>a[0]-b[0]);
     const inverted=turns.map(([r,d])=>[r,-d]);
     return [JSON.stringify(turns)<JSON.stringify(inverted)?turns:inverted,(c.requires??[]).slice().sort((a,b)=>seenC.get(a.cell)-seenC.get(b.cell)).map(s=>includeGoals?[seenC.get(s.cell),ids.get(s.type)]:seenC.get(s.cell))];
    }).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)));
    const s=JSON.stringify(includeGoals?[rows,commandRows,targetPattern]:[rows,commandRows]);if(best===null||s<best)best=s;
   }
   emit(unbound,typeIds);return;
  }
  const index=queue[rows.length];
  if(index===undefined){ // disconnected definitions are encoded, not silently collapsed
   for(let i=0;i<rings.length;i++)if(!seenR.has(i)){const nr=new Map(seenR);nr.set(i,nr.size);walk([...queue,i],nr,seenC,rows,orient);}return;
  }
  const r=rings[index];
  const known=r.cells.filter(c=>seenC.has(c)).sort((a,b)=>seenC.get(a)-seenC.get(b));
  const starts=known.length?[r.cells.indexOf(known[0])]:r.cells.map((_,i)=>i);
  for(const start of starts)for(const dir of [1,-1]){
   const nc=new Map(seenC),nr=new Map(seenR),q=[...queue],o=new Map(orient);o.set(index,dir);
   const ids=[];
   for(let k=0;k<r.cells.length;k++){
    const c=r.cells[(start+dir*k+r.cells.length)%r.cells.length];
    if(!nc.has(c))nc.set(c,nc.size);ids.push(nc.get(c));
    for(const other of owners.get(c))if(!nr.has(other)){nr.set(other,nr.size);q.push(other);}
   }
   walk(q,nr,nc,[...rows,[r.step??1,ids]],o);
  }
 }
 for(let seed=0;seed<rings.length;seed++)walk([seed],new Map([[seed,0]]),new Map(),[],new Map());
 return best;
}
export function canonicalEncounterMatrix(level){
 const m=encounterMatrix(level);let best=null;
 function permute(prefix,rest){if(!rest.length){const s=JSON.stringify(prefix.map(a=>prefix.map(b=>m[a][b])));if(best===null||s<best)best=s;return;}for(const n of rest)permute([...prefix,n],rest.filter(x=>x!==n));}
 permute([],m.map((_,i)=>i));return best;
}
export function encounterMatrix(level){return level.rings.map((a,i)=>level.rings.map((b,j)=>i===j?0:a.cells.filter(c=>b.cells.includes(c)).length));}
export function structuralMetrics(level){
 const m=encounterMatrix(level),n=m.length,edges=m.reduce((s,row,i)=>s+row.filter((v,j)=>j>i&&v>0).length,0);
 let depth=0,components=0;const visited=new Set();
 for(let s=0;s<n;s++){
  const dist=Array(n).fill(Infinity);dist[s]=0;const queue=[s];
  for(const a of queue)for(let b=0;b<n;b++)if(m[a][b]&&dist[b]===Infinity){dist[b]=dist[a]+1;queue.push(b);}
  depth=Math.max(depth,...dist.filter(Number.isFinite));if(!visited.has(s)){components++;queue.forEach(x=>visited.add(x));}
 }
 return {ringCount:n,ringLengths:level.rings.map(r=>r.cells.length).sort((a,b)=>a-b),intersectionCount:m.flat().reduce((a,b)=>a+b,0)/2,intersectionMatrix:m,pairVector:m.flatMap((row,i)=>row.slice(i+1)),alternativeNetworkCycles:edges-n+components,maximumRegionTransportDistance:depth,connectedComponents:components,usesStep2:level.rings.some(r=>r.step===2),usesGears:level.commands.some(c=>c.turns.length>1),usesSensors:level.commands.some(c=>c.requires?.length>0)};
}

/** Full authored definition: target placement/equivalence counts, never the scramble. */
export const authoredSignature=level=>structuralSignature(level,{includeGoals:true});

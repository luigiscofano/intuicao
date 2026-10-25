/** Planar closed rails. Every contact is a physical cell; territories prevent hidden crossings.
 * Odd numbers of encounters use isolated tangencies (closed Jordan curves cannot cross transversely an odd number of times).
 */
const EPS=1e-7;
const mix=(a,b,t)=>({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t});
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const pointSegmentDistance=(p,a,b)=>{const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy)));return distance(p,{x:a.x+t*dx,y:a.y+t*dy});};
const cross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
function rngFor(seed){let n=seed>>>0;return()=>{n+=0x6D2B79F5;let t=n;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};}
function clip(poly,nx,ny,c){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],fa=a.x*nx+a.y*ny-c,fb=b.x*nx+b.y*ny-c;if(fa<=EPS)out.push(a);if((fa< -EPS&&fb>EPS)||(fa>EPS&&fb< -EPS))out.push(mix(a,b,fa/(fa-fb)));}return out;}
function sitesFor(n,kind,rng){
 if(kind==='chain')return Array.from({length:n},(_,i)=>({x:100+(800/(n-1))*i,y:500+130*Math.sin(i*1.8)+60*(rng()-.5)}));
 if(kind==='star'||kind==='wheel')return [{x:500,y:500},...Array.from({length:n-1},(_,i)=>{const a=2*Math.PI*i/(n-1)+.17;return{x:500+340*Math.cos(a),y:500+340*Math.sin(a)};})];
 return Array.from({length:n},(_,i)=>{const a=2*Math.PI*i/n+.23;return{x:500+(300+40*rng())*Math.cos(a),y:500+(300+40*rng())*Math.sin(a)};});
}
function territories(sites){return sites.map((a,i)=>{let p=[{x:0,y:0},{x:1000,y:0},{x:1000,y:1000},{x:0,y:1000}];sites.forEach((b,j)=>{if(i!==j)p=clip(p,b.x-a.x,b.y-a.y,(b.x*b.x+b.y*b.y-a.x*a.x-a.y*a.y)/2);});return p;});}
function sharedEdges(polys){const edges=[];for(let i=0;i<polys.length;i++)for(let j=i+1;j<polys.length;j++)for(let k=0;k<polys[i].length;k++){const a=polys[i][k],b=polys[i][(k+1)%polys[i].length];if(distance(a,b)<120)continue;for(let l=0;l<polys[j].length;l++){const c=polys[j][l],d=polys[j][(l+1)%polys[j].length];if(distance(a,d)<.001&&distance(b,c)<.001)edges.push({i,j,a,b,ki:k,kj:l,count:0});}}return edges;}
function chooseEdges(edges,n,total,kind,rng){
 const scored=edges.map(e=>({...e,score:rng()}));
 if(kind==='star')scored.sort((a,b)=>(a.i!==0)-(b.i!==0)||a.score-b.score);
 else if(kind==='cycle')scored.sort((a,b)=>Number(!(a.j-a.i===1||a.i===0&&a.j===n-1))-Number(!(b.j-b.i===1||b.i===0&&b.j===n-1))||a.score-b.score);
 else scored.sort((a,b)=>a.score-b.score);
 const parents=Array.from({length:n},(_,i)=>i),root=i=>parents[i]===i?i:parents[i]=root(parents[i]);let used=0;
 for(const e of scored)if(root(e.i)!==root(e.j)){parents[root(e.i)]=root(e.j);e.count=1;used++;}
 if(new Set(parents.map((_,i)=>root(i))).size!==1)throw new Error('Territories are disconnected');
 // Prefer genuinely different graph edges before increasing pair multiplicity in mesh/circuit recipes.
 while(used<total){let candidates=scored.filter(e=>e.count<5);if(!candidates.length)throw new Error('Requested encounters exceed available planar edges');
  if(['cycle','wheel','mesh'].includes(kind)&&candidates.some(e=>!e.count))candidates=candidates.filter(e=>!e.count);
  else if(['chain','star'].includes(kind)&&candidates.some(e=>e.count))candidates=candidates.filter(e=>e.count);
  const e=candidates[Math.floor(rng()*candidates.length)];e.count++;used++;
 }
 return scored.filter(e=>e.count);
}
function classify(n,edges){const degrees=Array(n).fill(0);edges.forEach(e=>{degrees[e.i]++;degrees[e.j]++;});const max=Math.max(...edges.map(e=>e.count));if(n===2)return max===2?'lens':max===3?'braid-three':'braid-many';if(edges.length===n-1)return Math.max(...degrees)===n-1?(n===3?'chain':'satellites'):'chain';if(degrees.every(d=>d===2))return n===3?'triangle':'circuit';if(n===5&&edges.length>=7)return 'star-five';return 'mesh';}
export function makeTopologyV2({ringCount=3,intersections=3,variant=0,family}={}){
 if(ringCount===2&&family!=='nested'&&variant%3===0)return makeCrossingTopologyV2({intersections,variant});
 if(family==='nested'&&intersections>=ringCount&&intersections<=ringCount+3)return makeNestedTopologyV2({ringCount,intersections,variant});
 if(!Number.isInteger(ringCount)||ringCount<2||ringCount>5||!Number.isInteger(intersections)||intersections<ringCount-1||intersections<2||intersections>14||ringCount===2&&intersections>5)throw new Error('Unrealizable ring/encounter request');
 const rng=rngFor(variant*7193+ringCount*191+intersections*991);
 let kind=family&&/chain|reserve|bottleneck/.test(family)?'chain':family&&/satellite/.test(family)?'star':family&&/star|wheel/.test(family)?'wheel':family&&/circuit|triangle|pinwheel|clover|redundant/.test(family)?'cycle':['chain','star','cycle','wheel','mesh'][Math.abs(variant)%5];
 if(ringCount<4&&kind==='star')kind='chain';if(ringCount===2)kind='chain';
 if(intersections>5*(ringCount-1))kind='cycle';
 const sites=sitesFor(ringCount,kind,rng),polys=territories(sites),edges=chooseEdges(sharedEdges(polys),ringCount,intersections,kind,rng),cells=[],rings=[];
 for(const e of edges){e.ids=[];for(let k=0;k<e.count;k++){const p=mix(e.a,e.b,(k+1)/(e.count+1)),id='j'+cells.length;e.ids.push(id);cells.push({id,...p,rings:[String.fromCharCode(65+e.i),String.fromCharCode(65+e.j)]});}}
 for(let i=0;i<ringCount;i++){
  const id=String.fromCharCode(65+i),poly=polys[i],center={x:poly.reduce((s,p)=>s+p.x,0)/poly.length,y:poly.reduce((s,p)=>s+p.y,0)/poly.length},ids=[];
  const add=p=>{const cid='x'+cells.length;cells.push({id:cid,...p,rings:[id]});ids.push(cid);};
  for(let k=0;k<poly.length;k++){
   const a=poly[k],b=poly[(k+1)%poly.length],innerA=mix(a,center,.24),innerB=mix(b,center,.24);if(distance(a,poly[(k+poly.length-1)%poly.length])>=80)add(innerA);
   const e=edges.find(e=>e.i===i&&e.ki===k||e.j===i&&e.kj===k);
   if(e){const contacts=e.i===i?e.ids:e.ids.slice().reverse();contacts.forEach((cid,j)=>{ids.push(cid);if(j<contacts.length-1){const ca=cells.find(c=>c.id===cid),cb=cells.find(c=>c.id===contacts[j+1]);add(mix(mix(ca,cb,.5),center,.28));}});}
   // Exclusive arc subdivisions are real changes to permutation periods, not cosmetic variants.
   else if(distance(a,b)>200&&(variant+i*3+k*7)%4===0)add(mix(innerA,innerB,.35+.3*rng()));
  }
  rings.push({id,cells:ids,step:1,labelPosition:{...center}});
 }
 // Subdivide selected exclusive arcs: this changes cyclic gap lengths and ring periods.
 for(const ring of rings){const ids=[];for(let k=0;k<ring.cells.length;k++){
  const id=ring.cells[k],a=cells.find(c=>c.id===id),b=cells.find(c=>c.id===ring.cells[(k+1)%ring.cells.length]);ids.push(id);
  if(cells.length<76&&ring.cells.length+ids.filter(x=>x.startsWith('v')).length<30&&distance(a,b)>100&&rng()<.42){const cid='v'+cells.length;cells.push({id:cid,...mix(a,b,.4+.2*rng()),rings:[ring.id]});ids.push(cid);}
 }ring.cells=ids;}
 compactRails(cells,rings,rng);roundRails(cells,rings);
 const layout=scaleRails(cells,rings);
 const topology={family:classify(ringCount,edges),cells,rings,layout,topologyRecipe:kind};
 const validation=validateGeometryV2(topology);if(!validation.valid)throw new Error('Invalid generated geometry: '+validation.errors.join('; '));
 return topology;
}
function segmentIntersection(a,b,c,d){
 if(Math.max(a.x,b.x)<Math.min(c.x,d.x)-EPS||Math.max(c.x,d.x)<Math.min(a.x,b.x)-EPS||Math.max(a.y,b.y)<Math.min(c.y,d.y)-EPS||Math.max(c.y,d.y)<Math.min(a.y,b.y)-EPS)return null;
 const dx=b.x-a.x,dy=b.y-a.y,ex=d.x-c.x,ey=d.y-c.y,den=dx*ey-dy*ex;
 if(Math.abs(den)<EPS){if(Math.abs(cross(a,b,c))>.001)return null;const len=dx*dx+dy*dy,t0=((c.x-a.x)*dx+(c.y-a.y)*dy)/len,t1=((d.x-a.x)*dx+(d.y-a.y)*dy)/len,lo=Math.max(0,Math.min(t0,t1)),hi=Math.min(1,Math.max(t0,t1));if(hi<lo-EPS)return null;if(hi-lo>EPS)return{overlap:true};return mix(a,b,(lo+hi)/2);}
 const t=((c.x-a.x)*ey-(c.y-a.y)*ex)/den,u=((c.x-a.x)*dy-(c.y-a.y)*dx)/den;if(t< -EPS||t>1+EPS||u< -EPS||u>1+EPS)return null;return mix(a,b,t);
}
/** Independent geometric check against every rail segment, including self crossings and unmarked tangencies. */
export function validateGeometryV2(level){
 const fail=message=>({valid:false,errors:[message]});
 if(!level||!Array.isArray(level.cells)||!Array.isArray(level.rings)||!level.cells.length||level.cells.length>80||!level.rings.length||level.rings.length>5)return fail('Invalid geometry collection');
 const width=level.layout?.width,height=level.layout?.height;
 if(!Number.isFinite(width)||!Number.isFinite(height)||width<100||height<100||width>16384||height>16384)return fail('Invalid geometry bounds');
 const validPoint=p=>p&&typeof p==='object'&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=0&&p.y>=0&&p.x<=width&&p.y<=height;
 if(level.cells.some(c=>!validPoint(c)||typeof c.id!=='string')||new Set(level.cells.map(c=>c.id)).size!==level.cells.length)return fail('Invalid physical house coordinates or identities');
 for(const ring of level.rings){if(!ring||typeof ring.id!=='string'||!Array.isArray(ring.cells)||ring.cells.length<3||ring.cells.length>32||new Set(ring.cells).size!==ring.cells.length)return fail('Invalid cyclic ring');
  if(ring.path!==undefined&&(!Array.isArray(ring.path)||ring.path.length<3||ring.path.length>256||ring.path.some(p=>!validPoint(p)||p.cell!==undefined&&(typeof p.cell!=='string'||!ring.cells.includes(p.cell)))))return fail('Invalid rail path coordinates or marker identity');
 }
 const errors=[],map=new Map(level.cells.map(c=>[c.id,c])),segments=[],members=new Map(level.cells.map(c=>[c.id,[]]));
 for(const ring of level.rings){
 if(ring.path){const marked=ring.path.filter(p=>p.cell);if(JSON.stringify(marked.map(p=>p.cell))!==JSON.stringify(ring.cells))errors.push('Rail markers disagree with cyclic engine order');for(const p of marked){const c=map.get(p.cell);if(!c||distance(p,c)>.001)errors.push('Rail marker is not its physical house');}}
 for(const id of ring.cells){if(!members.has(id))errors.push('Missing rail cell');else members.get(id).push(ring.id);}
 const points=ring.path?ring.path.map((p,i)=>({...p,id:p.cell??Symbol(ring.id+'-bend-'+i)})):ring.cells.map(id=>map.get(id));
 const incidence=logicalIncidences(points);for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length];if(!a||!b){errors.push('Missing rail point');continue;}if(distance(a,b)<.001)errors.push('Zero rail segment');segments.push({ring:ring.id,index:i,length:points.length,a,b,incident:incidence[i]});}}
 for(let i=0;i<segments.length;i++)for(let j=i+1;j<segments.length;j++){
  const a=segments[i],b=segments[j];
  const hit=segmentIntersection(a.a,a.b,b.a,b.b);if(!hit)continue;if(hit.overlap){errors.push('Overlapping rails');continue;}
  const shared=[a.a,a.b].find(p=>(p.id===b.a.id||p.id===b.b.id)&&distance(p,hit)<.001);
  if(!shared)errors.push(a.ring===b.ring?'Self crossing':'Unmarked visual intersection');
 }
 let minimumCellDistance=Infinity;for(let i=0;i<level.cells.length;i++)for(let j=i+1;j<level.cells.length;j++)minimumCellDistance=Math.min(minimumCellDistance,distance(level.cells[i],level.cells[j]));
 if(minimumCellDistance<75.9)errors.push('Unreadably close physical cells');
 let minimumCellRailClearance=Infinity,minimumRailClearance=Infinity;
 const pairJunctions=new Map();for(const a of level.rings)for(const b of level.rings)pairJunctions.set(a.id+'|'+b.id,level.cells.filter(c=>members.get(c.id).includes(a.id)&&members.get(c.id).includes(b.id)));
 for(const s of segments)for(const c of level.cells)if(!s.incident.includes(c.id))minimumCellRailClearance=Math.min(minimumCellRailClearance,pointSegmentDistance(c,s.a,s.b));
 for(let i=0;i<segments.length;i++)for(let j=i+1;j<segments.length;j++){const a=segments[i],b=segments[j];if(a.ring===b.ring&&a.incident.some(id=>b.incident.includes(id)))continue;const junctions=pairJunctions.get(a.ring+'|'+b.ring);const dx=Math.max(0,Math.min(a.a.x,a.b.x)-Math.max(b.a.x,b.b.x),Math.min(b.a.x,b.b.x)-Math.max(a.a.x,a.b.x)),dy=Math.max(0,Math.min(a.a.y,a.b.y)-Math.max(b.a.y,b.b.y),Math.min(b.a.y,b.b.y)-Math.max(a.a.y,a.b.y));if(Math.hypot(dx,dy)>=minimumRailClearance)continue;if(junctions.some(c=>[a.a,a.b,b.a,b.b].some(p=>distance(c,p)<60)))continue;if([a.a.id,a.b.id].some(id=>id===b.a.id||id===b.b.id))continue;minimumRailClearance=Math.min(minimumRailClearance,pointSegmentDistance(a.a,b.a,b.b),pointSegmentDistance(a.b,b.a,b.b),pointSegmentDistance(b.a,a.a,a.b),pointSegmentDistance(b.b,a.a,a.b));}
 if(minimumCellRailClearance<32.9)errors.push('Rail too close to a nonincident house');
 if(minimumRailClearance<8)errors.push('Ambiguously close separate rails');
 if([...members.values()].some(m=>m.length>2))errors.push('Triple contact');
 const intersections=[...members.values()].filter(m=>m.length===2).length;
 return {valid:errors.length===0,errors:[...new Set(errors)],intersections,minimumCellDistance,minimumCellRailClearance,minimumRailClearance,segmentPairsChecked:segments.length*(segments.length-1)/2};
}

/** A genuinely contained orbit with separate doors, plus exterior reserve satellites. */
export function makeNestedTopologyV2({ringCount=2,intersections=2,variant=0}={}){
 const k=intersections-(ringCount-2);if(k<2||k>5||ringCount<2||ringCount>5)throw new Error('Nested doors require 2–5 inner contacts');
 const rng=rngFor(variant+7759),count=k+ringCount-2,cells=[],rings=[],outer=[],inner=[];
 const add=(id,x,y,owners)=>{cells.push({id,x,y,rings:owners});return id;};
 const polar=(a,r)=>({x:500+r*Math.cos(a),y:500+r*Math.sin(a)});
 for(let i=0;i<count;i++){
  const angle=2*Math.PI*i/count+.13,p=polar(angle,350),owners=i<k?['A','B']:['A',String.fromCharCode(67+i-k)];
  const id=add('j'+i,p.x,p.y,owners);outer.push(id);
  // Two exclusive cells preserve the outer perimeter between neighboring doors.
  for(let j=1;j<=2;j++){const q=polar(angle+2*Math.PI/count*j/3,350);outer.push(add('a'+i+'_'+j,q.x,q.y,['A']));}
  if(i<k){inner.push(id);const next=2*Math.PI*((i+1)%k)/count+.13;let gap=(next-angle+2*Math.PI)%(2*Math.PI);if(!gap)gap=2*Math.PI;
   const parts=2+(variant+i)%3;for(let j=1;j<parts;j++){const q=polar(angle+gap*j/parts,150+30*rng());inner.push(add('b'+i+'_'+j,q.x,q.y,['B']));}
  }else{const rid=owners[1],ids=[id],ux=Math.cos(angle),uy=Math.sin(angle),vx=-uy,vy=ux;
   for(const [j,u,v] of [[0,90,-65],[1,180,0],[2,90,65]])ids.push(add(rid+j,p.x+u*ux+v*vx,p.y+u*uy+v*vy,[rid]));
   rings.push({id:rid,cells:ids,step:1,labelPosition:{x:p.x+90*ux,y:p.y+90*uy}});
  }
 }
 rings.unshift({id:'A',cells:outer,step:1,labelPosition:polar(.13+Math.PI/count,290)},{id:'B',cells:inner,step:1,labelPosition:{x:500,y:500}});
 compactRails(cells,rings,rng);roundRails(cells,rings);
 const t={family:'nested',topologyRecipe:'nested-doors',cells,rings,layout:scaleRails(cells,rings)};
 const check=validateGeometryV2(t);if(!check.valid)throw new Error(check.errors.join('; '));return t;
}

// Rail bends are not automatically game houses. Keep all junctions, then choose only
// a small, distributed set of exclusive houses; this keeps dense boards readable.
function compactRails(cells,rings,rng){
 const keep=new Set(cells.filter(c=>c.rings.length===2).map(c=>c.id));
 for(const ring of rings){
  const exclusive=ring.cells.filter(id=>!keep.has(id)).filter(id=>{const p=cells.find(c=>c.id===id);return rings.filter(r=>r.id!==ring.id).every(r=>r.cells.every((cid,i)=>pointSegmentDistance(p,cells.find(c=>c.id===cid),cells.find(c=>c.id===r.cells[(i+1)%r.cells.length]))>=30));}),wanted=Math.min(exclusive.length,2+Math.floor(rng()*(rings.length===2?7:4)));
  const chosen=[];for(let i=0;i<wanted;i++){
   const candidates=exclusive.filter(id=>!chosen.includes(id));let best=null,bestScore=-1;
   for(const id of candidates){const p=cells.find(c=>c.id===id),anchors=[...chosen,...ring.cells.filter(id=>keep.has(id))].map(id=>cells.find(c=>c.id===id));const score=(anchors.length?Math.min(...anchors.map(a=>distance(p,a))):1)*(0.7+.6*rng());if(score>bestScore){best=id;bestScore=score;}}
   chosen.push(best);
  }
  chosen.forEach(id=>keep.add(id));
  ring.path=ring.cells.map(id=>{const p=cells.find(c=>c.id===id);return{x:p.x,y:p.y,...(keep.has(id)?{cell:id}:{})};});
  ring.cells=ring.cells.filter(id=>keep.has(id));
  // Collinear unoccupied subdivision points are not bends. Removing them avoids
  // an artificial tiny edge beside a junction and keeps movement paths minimal.
  for(let changed=true;changed;){changed=false;for(let i=0;i<ring.path.length;i++){const p=ring.path[i],a=ring.path[(i+ring.path.length-1)%ring.path.length],b=ring.path[(i+1)%ring.path.length];if(!p.cell&&pointSegmentDistance(p,a,b)<.001){ring.path.splice(i,1);changed=true;break;}}}
 }
 for(let i=cells.length-1;i>=0;i--)if(!keep.has(cells[i].id))cells.splice(i,1);
}
function scaleRails(cells,rings){
 const points=rings.flatMap(r=>r.path),segments=rings.flatMap(r=>{const incidence=logicalIncidences(r.path);return r.path.map((a,i)=>({ring:r.id,a,b:r.path[(i+1)%r.path.length],incident:incidence[i]}));});
 let min=Infinity,clear=Infinity,rails=Infinity;
 for(let i=0;i<cells.length;i++)for(let j=i+1;j<cells.length;j++)min=Math.min(min,distance(cells[i],cells[j]));
 for(const {incident,a,b} of segments)for(const c of cells)if(!incident.includes(c.id))clear=Math.min(clear,pointSegmentDistance(c,a,b));
 const scale=Math.max(76/min,33/clear),minX=Math.min(...points.map(c=>c.x)),minY=Math.min(...points.map(c=>c.y));
 const transform=p=>{p.x=(p.x-minX)*scale+60;p.y=(p.y-minY)*scale+60;};cells.forEach(transform);points.forEach(transform);rings.forEach(r=>transform(r.labelPosition));
 return {width:Math.max(...points.map(c=>c.x))+60,height:Math.max(...points.map(c=>c.y))+70,padding:60,pieceRadius:19};
}

/** Transverse braids supplement the isolated-contact layouts; odd counts add one explicit tangent door. */
export function makeCrossingTopologyV2({intersections=4,variant=0}={}){
 if(intersections<2||intersections>5)throw new Error('A compact braid has 2–5 doors');
 const rng=rngFor(variant+9953),A=[{x:-200,y:-200},{x:200,y:-200},{x:200,y:200},{x:-200,y:200}];
 const B=intersections===2?[{x:50,y:-50},{x:350,y:-50},{x:350,y:300},{x:50,y:300}]:intersections===3?[{x:50,y:-50},{x:150,y:-200},{x:350,y:-50},{x:350,y:300},{x:50,y:300}]:intersections===4?[{x:-300,y:-90},{x:300,y:-90},{x:300,y:110},{x:-300,y:110}]:[{x:-300,y:-90},{x:0,y:-200},{x:300,y:-90},{x:300,y:110},{x:-300,y:110}];
 const polygons=[A,B],cuts=polygons.map(p=>p.map(()=>[]));
 for(let i=0;i<A.length;i++)for(let j=0;j<B.length;j++){const hit=segmentIntersection(A[i],A[(i+1)%A.length],B[j],B[(j+1)%B.length]);if(hit&&!hit.overlap){cuts[0][i].push(hit);cuts[1][j].push(hit);}}
 const cells=[],rings=[];function add(p,ring){let c=cells.find(c=>distance(c,p)<.001);if(!c){c={id:'c'+cells.length,...p,rings:[]};cells.push(c);}if(!c.rings.includes(ring))c.rings.push(ring);return c.id;}
 for(let r=0;r<2;r++){const p=polygons[r],id=String.fromCharCode(65+r),ids=[];
  for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length],points=[a,...cuts[r][i],mix(a,b,.22),mix(a,b,.65)];points.sort((x,y)=>distance(a,x)-distance(a,y));for(const q of points){if(distance(q,b)<.001)continue;const cid=add(q,id);if(ids.at(-1)!==cid)ids.push(cid);}}
  rings.push({id,cells:ids,step:1,labelPosition:r?{x:275,y:10}:{x:-90,y:20}});
 }
 compactRails(cells,rings,rng);roundRails(cells,rings);const t={family:intersections===2?'lens':intersections===3?'braid-three':'braid-many',topologyRecipe:'transverse-braid',cells,rings,layout:scaleRails(cells,rings)};
 const check=validateGeometryV2(t);if(!check.valid||check.intersections!==intersections)throw new Error('Crossing braid: '+check.errors.join('; '));return t;
}

/** Round exclusive corners into organic rails, without moving any shared door.
 * The sampled curve is the rendered and validated path, never an invisible approximation.
 */
function roundRails(cells,rings){
 const shared=new Set(cells.filter(c=>c.rings.length===2).map(c=>c.id));
 for(const ring of rings){const original=ring.path,next=[];
  for(let i=0;i<original.length;i++){const p=original[i],before=original[(i+original.length-1)%original.length],after=original[(i+1)%original.length];
   if(shared.has(p.cell)){next.push({...p});continue;}
   const a=mix(p,before,.43),b=mix(p,after,.43);
   for(let j=0;j<=4;j++){const t=j/4,q={x:(1-t)*(1-t)*a.x+2*(1-t)*t*p.x+t*t*b.x,y:(1-t)*(1-t)*a.y+2*(1-t)*t*p.y+t*t*b.y};if(j===2&&p.cell){q.cell=p.cell;const cell=cells.find(c=>c.id===p.cell);cell.x=q.x;cell.y=q.y;}next.push(q);}
  }
  ring.path=next;
 }
}

function logicalIncidences(points){const marker=p=>typeof p.cell==='string'?p.cell:typeof p.id==='string'?p.id:null;return points.map((_,i)=>{let a=null,b=null;for(let k=0;k<points.length;k++){a=marker(points[(i-k+points.length)%points.length]);if(a)break;}for(let k=1;k<=points.length;k++){b=marker(points[(i+k)%points.length]);if(b)break;}return[a,b];});}

/** Three/four genuine orbital petals, each adjacent pair meeting twice.
 * Clover: balanced circular leaves. Pinwheel: deliberately unequal circular leaves
 * and alternating exclusive periods, with an off-axis rotor arrangement.
 */
export function makePetalTopologyV2({ringCount=3,intersections=ringCount*2,variant=0}={}){
 if(![3,4].includes(ringCount)||intersections!==ringCount*2)throw new Error('Petal networks require three/six or four/eight rings/doors');
 const rng=rngFor(variant+41273),pinwheel=variant%2!==0,phase=.19+(variant%7)*.07,centerRadius=120;
 const circles=Array.from({length:ringCount},(_,i)=>{const theta=phase+2*Math.PI*i/ringCount+(pinwheel?.025*Math.sin(i*2.3):0),r=ringCount===3?(pinwheel?106+3*rng():107):(pinwheel?94+5*rng():97);return{id:String.fromCharCode(65+i),x:300+centerRadius*Math.cos(theta),y:300+centerRadius*Math.sin(theta),r};});
 const cells=[],anchors=circles.map(()=>[]),rings=[];
 const angle=(p,c)=>(Math.atan2(p.y-c.y,p.x-c.x)+2*Math.PI)%(2*Math.PI);
 for(let i=0;i<ringCount;i++)for(let j=i+1;j<ringCount;j++){
  const a=circles[i],b=circles[j],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d>=a.r+b.r||d<=Math.abs(a.r-b.r))continue;
  const along=(a.r*a.r-b.r*b.r+d*d)/(2*d),height=Math.sqrt(a.r*a.r-along*along),mx=a.x+along*dx/d,my=a.y+along*dy/d;
  for(const sign of [-1,1]){const p={id:'j'+cells.length,x:mx-sign*height*dy/d,y:my+sign*height*dx/d,rings:[a.id,b.id]};cells.push(p);anchors[i].push({theta:angle(p,a),cell:p.id});anchors[j].push({theta:angle(p,b),cell:p.id});}
 }
 if(cells.length!==intersections)throw new Error('Petal circles produced an unexpected meeting graph');
 for(let i=0;i<ringCount;i++){
  const c=circles[i],points=anchors[i].map(p=>({...p})),wanted=2+((variant+i*(pinwheel?2:1))%4);
  // Greedy farthest angular spacing among real houses, not arbitrary drawing vertices.
  for(let k=0;k<wanted;k++){let best=null,bestScore=-1;for(let j=0;j<32;j++){
   const theta=(j+.17+rng()*.12)*Math.PI/16,p={x:c.x+c.r*Math.cos(theta),y:c.y+c.r*Math.sin(theta)};
   if(circles.some((other,oi)=>oi!==i&&Math.abs(distance(p,other)-other.r)<22))continue;const local=[...cells,...points.map(a=>({x:c.x+c.r*Math.cos(a.theta),y:c.y+c.r*Math.sin(a.theta)}))],score=Math.min(...local.map(q=>distance(p,q)))*(0.8+.4*rng());
   if(score>bestScore){best={theta,p};bestScore=score;}
  }const id='x'+cells.length;cells.push({id,...best.p,rings:[c.id]});points.push({theta:best.theta,cell:id});}
  for(let j=0;j<48;j++)points.push({theta:j*Math.PI/24});points.sort((a,b)=>a.theta-b.theta);
  const path=[];for(const p of points){if(path.length&&Math.abs(path.at(-1).theta-p.theta)<1e-8){if(p.cell)path.at(-1).cell=p.cell;continue;}const house=p.cell?cells.find(x=>x.id===p.cell):null;path.push({theta:p.theta,x:house?.x??c.x+c.r*Math.cos(p.theta),y:house?.y??c.y+c.r*Math.sin(p.theta),...(p.cell?{cell:p.cell}:{})});}
  rings.push({id:c.id,cells:path.filter(p=>p.cell).map(p=>p.cell),step:1,path:path.map(({theta,...p})=>p),labelPosition:{x:c.x,y:c.y}});
 }
 const topology={family:pinwheel?'pinwheel':'clover',topologyRecipe:pinwheel?'unequal-orbital-petals':'balanced-orbital-petals',cells,rings,layout:scaleRails(cells,rings)};
 const check=validateGeometryV2(topology);if(!check.valid)throw new Error('Petal geometry: '+check.errors.join('; '));return topology;
}

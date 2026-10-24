// Motor puro de Reflexos: cada segmento corresponde apenas a um trecho físico.
// A ligação entre portais não é um segmento e nunca entra nos testes de colisão.
import {EPS,add,sub,scale,dot,cross,unit,segment,raySegment,rayCircle,reflect,wallPolygon} from './math.mjs';
const NUDGE=1e-6, CONTACT=1e-6;
export function lightScene(state){
 const sources=state.sources?.length?state.sources:[{x:70,y:350,angle:state.sourceAngle??0,color:'gold'}];
 const targets=state.targets?.length?state.targets:state.target?[{...state.target,color:sources[0].color??'gold'}]:[];
 return {objects:state.objects??[],sources:sources.map(s=>({...s,angle:s.angle??0,color:s.color??'gold'})),targets:targets.map(t=>({...t,radius:t.radius??22,color:t.color??'gold'})),portals:state.portals??[],width:state.width??800,height:state.height??460};
}
function insideWall(p,o){const r=o.angle*Math.PI/180,q=sub(p,o);return Math.abs(q.x*Math.cos(r)+q.y*Math.sin(r))<=o.length/2+EPS&&Math.abs(-q.x*Math.sin(r)+q.y*Math.cos(r))<=(o.width??12)/2+EPS;}
function portalPartner(portal,portals){if(portal.pairId==null)return null;return portals.find(p=>p!==portal&&p.id===portal.pairId)??portals.find(p=>p!==portal&&p.pairId===portal.pairId);}
function accepts(p,color){return p.colors==null||p.colors.includes(color);}
function traceSource(source,scene,maxBounces,maxEvents){
 const {objects,targets,portals,width,height}=scene;
 let p={x:source.x,y:source.y},d={x:Math.cos(source.angle*Math.PI/180),y:Math.sin(source.angle*Math.PI/180)},distance=0,bounces=0;
 const segments=[],reflections=[],teleports=[];
 const finish=status=>({color:source.color,source:{...source},segments,reflections,teleports,bounces,status,totalDistance:distance});
 const walls=objects.filter(o=>o.type==='wall');
 if(p.x<0||p.x>width||p.y<0||p.y>height)return finish('escape');
 if(walls.some(o=>insideWall(p,o)))return finish('wall');
 const corners=[{x:0,y:0},{x:width,y:0},{x:width,y:height},{x:0,y:height}];
 const surfaces=[...corners.map((a,i)=>({a,b:corners[(i+1)%4],type:'wall'})),...walls.flatMap(o=>{const poly=wallPolygon(o);return poly.map((a,i)=>({a,b:poly[(i+1)%4],type:'wall'}));}),...objects.map((o,index)=>({...o,index})).filter(o=>o.type==='mirror').map(o=>({...segment(o),index:o.index,type:'mirror'}))];
 const append=q=>{const len=Math.hypot(q.x-p.x,q.y-p.y);if(len>EPS){segments.push({a:{...p},b:{...q},startDistance:distance,endDistance:distance+len});distance+=len;}};
 for(let event=0;event<maxEvents;event++){
  let hit=null;
  // Paredes são avaliadas primeiro e vencem empates com espelhos/portais/alvos.
  for(const s of surfaces){const h=raySegment(p,d,s.a,s.b);if(h&&(!hit||h.t<hit.t-EPS))hit={...s,...h};}
  for(const portal of portals){const t=rayCircle(p,d,portal,portal.radius??16);if(t!==null&&(!hit||t<hit.t-EPS))hit={type:'portal',portal,t,point:add(p,scale(d,t))};}
  for(const target of targets.filter(t=>t.color===source.color)){const t=rayCircle(p,d,target,target.radius);if(t!==null&&(!hit||t<hit.t-EPS))hit={type:'target',target,t,point:add(p,scale(d,t))};}
  if(!hit)return finish('escape');
  append(hit.point);
  if(hit.type==='target')return finish('target');
  if(hit.type==='wall')return finish('wall');
  if(hit.type==='portal'){
   const entrance=hit.portal,exit=portalPartner(entrance,portals);
   if(!accepts(entrance,source.color)||!exit||!accepts(exit,source.color))return finish('portal-blocked');
   const out=add(exit,scale(d,(exit.radius??16)+NUDGE));
   teleports.push({point:{...hit.point},from:{x:entrance.x,y:entrance.y},to:{x:exit.x,y:exit.y},exit:{...out},distance,portalId:entrance.id,pairId:exit.id,direction:{...d}});
   p=out;
   if(p.x<0||p.x>width||p.y<0||p.y>height)return finish('escape');
   if(walls.some(o=>insideWall(p,o)))return finish('wall');
   continue;
  }
  if(bounces>=maxBounces)return finish('limit');
  const tangent=unit(sub(hit.b,hit.a)),normal={x:-tangent.y,y:tangent.x},outgoing=reflect(d,hit.a,hit.b);
  reflections.push({point:{...hit.point},normal,incoming:{...d},outgoing:{...outgoing},distance,objectIndex:hit.index});
  bounces++;d=outgoing;p=add(hit.point,scale(d,NUDGE));
 }
 return finish('limit');
}
// Interseção fechada: contato e sobreposição também contam como cruzamento.
export function lightSegmentIntersection(a,b,c,d){
 const r=sub(b,a),s=sub(d,c),rr=dot(r,r),ss=dot(s,s),q=sub(c,a),den=cross(r,s);
 if(rr<EPS||ss<EPS)return null;
 if(Math.abs(den)>1e-12*Math.sqrt(rr*ss)){
  const t=cross(q,s)/den,u=cross(q,r)/den;
  if(t>=-CONTACT&&t<=1+CONTACT&&u>=-CONTACT&&u<=1+CONTACT){const tc=Math.max(0,Math.min(1,t)),uc=Math.max(0,Math.min(1,u));return {point:add(a,scale(r,tc)),t:tc,u:uc};}
  return null;
 }
 if(Math.abs(cross(q,r))>CONTACT*Math.sqrt(rr))return null;
 const t0=dot(q,r)/rr,t1=t0+dot(s,r)/rr,lo=Math.max(0,Math.min(t0,t1)),hi=Math.min(1,Math.max(t0,t1));
 if(lo>hi+CONTACT)return null;
 const t=Math.max(0,Math.min(1,lo)),point=add(a,scale(r,t)),u=Math.max(0,Math.min(1,dot(sub(point,c),s)/ss));
 return {point,t,u,overlap:hi-lo>CONTACT};
}
export function traceLightWorld(state,{maxBounces=12,maxEvents=40}={}){
 const scene=lightScene(state),rays=scene.sources.map(s=>traceSource(s,scene,maxBounces,maxEvents)),collisions=[];
 for(let i=0;i<rays.length;i++)for(let j=i+1;j<rays.length;j++){
  if(rays[i].color===rays[j].color)continue;
  for(const a of rays[i].segments)for(const b of rays[j].segments){const h=lightSegmentIntersection(a.a,a.b,b.a,b.b);if(!h)continue;
   if(collisions.some(c=>c.rayIndices[0]===i&&c.rayIndices[1]===j&&Math.hypot(c.point.x-h.point.x,c.point.y-h.point.y)<CONTACT))continue;
   collisions.push({point:h.point,colors:[rays[i].color,rays[j].color],rayIndices:[i,j],distances:[a.startDistance+(a.endDistance-a.startDistance)*h.t,b.startDistance+(b.endDistance-b.startDistance)*h.u],overlap:!!h.overlap});
  }
 }
 collisions.sort((a,b)=>Math.max(...a.distances)-Math.max(...b.distances));
 return {rays,collisions,status:collisions.length?'collision':rays.length&&rays.every(r=>r.status==='target')?'target':'miss',totalDistance:Math.max(0,...rays.map(r=>r.totalDistance)),bounces:rays.reduce((n,r)=>n+r.bounces,0)};
}
export function visibleLightSegments(ray,distance){
 const limit=Math.max(0,distance),out=[];
 for(const s of ray.segments){if(limit<s.startDistance-EPS)break;const len=s.endDistance-s.startDistance,t=Math.min(1,Math.max(0,(limit-s.startDistance)/len));if(t<=0)continue;out.push({...s,b:add(s.a,scale(sub(s.b,s.a),t)),endDistance:s.startDistance+len*t});if(t<1)break;}
 return out;
}

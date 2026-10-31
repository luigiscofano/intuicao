import {isFaunaShape,getFaunaGeometry,cutFaunaArea} from './cut-fauna-geometry.mjs';
// Referência IA. Curvas como gráficos em uma base ortonormal, sem autointerseções.
import {polygon,regularPolygon,clipHalfPlane,area,cut,dot} from './math.mjs';
export const families=['Reta','Parábola','Seno','Cúbica','Cosseno','Dupla curva'];
export const shapes=['Retângulo','Quadrado','Triângulo','Trapézio','Paralelogramo','Losango','Pentágono','Hexágono','Heptágono','Octógono','Decágono','Dodecágono','Hexágono irregular','Triângulo largo','Trapézio estreito','Pentágono alongado','Octógono achatado'];
export function shapePolygon(name){
 if(isFaunaShape(name))return getFaunaGeometry(name).envelope;
 const variants={'Triângulo largo':['Triângulo',1.35,.8],'Trapézio estreito':['Trapézio',.7,1.2],'Pentágono alongado':['Pentágono',.8,1.15],'Octógono achatado':['Octógono',1.3,.7]};if(variants[name]){const [base,sx,sy]=variants[name];return shapePolygon(base).map(p=>({x:400+(p.x-400)*sx,y:230+(p.y-230)*sy}));}
 const custom={Trapézio:[[235,110],[565,110],[650,350],[150,350]],Paralelogramo:[[270,100],[620,100],[530,360],[180,360]],Losango:[[400,65],[620,230],[400,395],[180,230]],'Hexágono irregular':[[280,75],[505,90],[620,210],[535,365],[310,385],[175,250]]};
 if(custom[name])return custom[name].map(([x,y])=>({x,y}));
 const sides={'Heptágono':7,'Decágono':10,'Dodecágono':12};return sides[name]?regularPolygon(sides[name]):polygon(name);
}
export function curveValue(u,family,amplitude=60,frequency=1){const z=u/160;if(family==='Parábola')return amplitude*z*z;if(family==='Seno')return amplitude*Math.sin(frequency*Math.PI*z);if(family==='Cúbica')return amplitude*z*z*z;if(family==='Cosseno')return amplitude*Math.cos(frequency*Math.PI*z);if(family==='Dupla curva')return amplitude*(z**4-z*z);return 0;}
// Limite superior de |f''|: certifica o erro da interpolação linear por segmento.
export function secondBound(family,amplitude,frequency,maxU){const a=Math.abs(amplitude);return family==='Parábola'?2*a/160**2:(family==='Seno'||family==='Cosseno')?a*(frequency*Math.PI/160)**2:family==='Cúbica'?6*a*maxU/160**3:family==='Dupla curva'?a*(12*(maxU/160)**2+2)/160**2:0;}
function cutSolid(poly,config,step=1){
 const {family='Reta',angle=0,offset=0,amplitude=60,frequency=1,centerX=400,centerY=230}=config;
 const rad=angle*Math.PI/180,n={x:Math.cos(rad),y:Math.sin(rad)},t={x:-n.y,y:n.x};
 const local=poly.map(p=>({x:dot(t,{x:p.x-centerX,y:p.y-centerY}),y:dot(n,{x:p.x-centerX,y:p.y-centerY})}));
 const toWorld=p=>({x:centerX+t.x*p.x+n.x*p.y,y:centerY+t.y*p.x+n.y*p.y});
 const lo=Math.min(...local.map(p=>p.x)),hi=Math.max(...local.map(p=>p.x));
 const value=u=>offset+curveValue(u,family,amplitude,frequency),total=area(poly);
 if(family==='Reta'){const c=cut(poly,angle,offset+n.x*(centerX-400)+n.y*(centerY-230));return {...c,cells:[c.clipped],region:c.clipped,curve:[toWorld({x:lo-40,y:offset}),toWorld({x:hi+40,y:offset})],errorPP:0};}
 if(!(step>0&&Number.isFinite(step)))throw Error('Passo inválido');
 const maxU=Math.max(Math.abs(lo),Math.abs(hi)),M=secondBound(family,amplitude,frequency,maxU);
 // Escolhe passo suficiente para erro de interpolação de no máximo 0,01 pp.
 const safeStep=M>0?Math.min(step,Math.sqrt(.0001*total*8/((hi-lo)*M))):step;
 const count=Math.ceil((hi-lo)/safeStep),h=(hi-lo)/count,cells=[];let selected=0;
 for(let i=0;i<count;i++){
  const a=lo+i*h,b=a+h,fa=value(a),fb=value(b),slope=(fb-fa)/h;
  let cell=clipHalfPlane(local,{x:-1,y:0},-a);cell=clipHalfPlane(cell,{x:1,y:0},b);
  cell=clipHalfPlane(cell,{x:-slope,y:1},fa-slope*a);
  if(cell.length>=3){selected+=area(cell);cells.push(cell.map(toWorld));}
 }
 const u0=lo-40,u1=hi+40,visualCount=Math.ceil((u1-u0)/Math.min(1,safeStep));const curve=Array.from({length:visualCount+1},(_,i)=>{const u=u0+(u1-u0)*i/visualCount;return toWorld({x:u,y:value(u)});});
 const floor=Math.min(...local.map(p=>p.y),...curve.map(p=>dot(n,{x:p.x-centerX,y:p.y-centerY})))-100;
 const bound=(hi-lo)*secondBound(family,amplitude,frequency,Math.max(Math.abs(lo),Math.abs(hi)))*h*h/8;
 return {ratio:Math.max(0,Math.min(1,selected/total)),cells,curve,region:[toWorld({x:u0,y:floor}),...curve,toWorld({x:u1,y:floor})],n,errorPP:100*bound/total};
}

// Diferença poligonal exata por partição convexa. Cada recorte é subtraído
// das partes restantes: regiões sobrepostas nunca são descontadas duas vezes.
function signedArea(poly){return poly.reduce((s,p,i)=>s+p.x*poly[(i+1)%poly.length].y-p.y*poly[(i+1)%poly.length].x,0)/2;}
function subtractConvex(poly,hole){
 let inside=poly;const outside=[],sign=signedArea(hole)>=0?1:-1;
 for(let i=0;i<hole.length&&inside.length>=3;i++){
  const a=hole[i],b=hole[(i+1)%hole.length],n={x:sign*(b.y-a.y),y:sign*(a.x-b.x)},d=dot(n,a);
  const part=clipHalfPlane(inside,{x:-n.x,y:-n.y},-d);
  if(part.length>=3&&area(part)>1e-7)outside.push(part);
  inside=clipHalfPlane(inside,n,d);
 }
 return outside;
}
// Decomposição de recortes simples côncavos em triângulos (ear clipping).
function convexParts(poly){
 if(poly.length<3||area(poly)<1e-9)return [];
 const ps=signedArea(poly)>0?poly.slice():poly.slice().reverse();
 const turn=(a,b,c)=>(b.x-a.x)*(c.y-b.y)-(b.y-a.y)*(c.x-b.x);
 if(ps.every((p,i)=>turn(p,ps[(i+1)%ps.length],ps[(i+2)%ps.length])>=-1e-9))return [ps];
 const result=[];let guard=0;
 while(ps.length>3&&guard++<poly.length*poly.length){let found=false;
  for(let i=0;i<ps.length;i++){const a=ps[(i+ps.length-1)%ps.length],b=ps[i],c=ps[(i+1)%ps.length];if(turn(a,b,c)<=1e-9)continue;
   const inTriangle=p=>turn(a,b,p)>=-1e-9&&turn(b,c,p)>=-1e-9&&turn(c,a,p)>=-1e-9;
   if(ps.some(p=>p!==a&&p!==b&&p!==c&&inTriangle(p)))continue;
   result.push([a,b,c]);ps.splice(i,1);found=true;break;
  }if(!found)throw Error('Recorte inválido ou autointersectante');
 }
 if(ps.length===3)result.push(ps);return result;
}
const geometryCache=new Map();
export function regionGeometry(poly,holes=[]){
 const key=JSON.stringify([poly,holes]);if(geometryCache.has(key))return geometryCache.get(key);
 let pieces=convexParts(poly);
 for(const hole of holes)for(const convex of convexParts(hole))pieces=pieces.flatMap(p=>subtractConvex(p,convex));
 const totalArea=pieces.reduce((sum,p)=>sum+area(p),0),outerArea=area(poly);
 if(!(totalArea>1e-7))throw Error('A figura precisa ter área útil positiva');
 const result={pieces,totalArea,outerArea,removedArea:outerArea-totalArea};
 if(geometryCache.size>200)geometryCache.clear();geometryCache.set(key,result);return result;
}
export function basicCutState(level,travel=level.initialTravel??0){
 const angle=typeof level.basicDirection==='number'?level.basicDirection:level.basicDirection?.angle??level.angle;
 const a=angle*Math.PI/180,origin=level.basicOrigin??{x:level.centerX??400,y:level.centerY??230};
 return {shape:level.shape,target:level.target,family:level.family,angle:level.angle,amplitude:level.amplitude,frequency:level.frequency,
 centerX:origin.x+Math.cos(a)*travel,centerY:origin.y+Math.sin(a)*travel,offset:level.initialOffset??0,holes:structuredClone(level.holes??[]),basicTravel:travel};
}
export function curvedCut(poly,config,step=1){
 if(isFaunaShape(config.shape)){
  const geometry=getFaunaGeometry(config.shape),rad=(config.angle??0)*Math.PI/180,t={x:-Math.sin(rad),y:Math.cos(rad)},u=geometry.envelope.map(p=>t.x*(p.x-(config.centerX??400))+t.y*(p.y-(config.centerY??230))),lo=Math.min(...u),hi=Math.max(...u);
  const M=secondBound(config.family??'Reta',config.amplitude??60,config.frequency??1,Math.max(Math.abs(lo),Math.abs(hi)));
  const visualStep=M>0?Math.min(step,Math.sqrt(.0001*geometry.totalArea*8/((hi-lo)*M))):step;
  const visual=cutSolid(geometry.envelope,config,visualStep);
  return {...visual,...cutFaunaArea(config.shape,config),cells:[],visualErrorPP:visual.errorPP*area(geometry.envelope)/geometry.totalArea};
 }
 const geometry=regionGeometry(poly,config.holes??[]),{pieces,totalArea}=geometry;
 const result=cutSolid(poly,config,step);
 let selectedArea=0,error=0;const cells=[];
 for(const piece of pieces){const r=cutSolid(piece,config,step),a=area(piece);selectedArea+=r.ratio*a;error+=r.errorPP*a;cells.push(...r.cells);}
 return {...result,cells,ratio:Math.max(0,Math.min(1,selectedArea/totalArea)),errorPP:error/totalArea,totalArea,selectedArea,solidPieces:pieces,removedArea:geometry.removedArea};
}

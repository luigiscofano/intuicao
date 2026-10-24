// Referência IA. Curvas como gráficos em uma base ortonormal, sem autointerseções.
import {polygon,regularPolygon,clipHalfPlane,area,cut,dot} from './math.mjs';
export const families=['Reta','Parábola','Seno','Cúbica','Cosseno','Dupla curva'];
export const shapes=['Retângulo','Quadrado','Triângulo','Trapézio','Paralelogramo','Losango','Pentágono','Hexágono','Heptágono','Octógono','Decágono','Dodecágono','Hexágono irregular','Triângulo largo','Trapézio estreito','Pentágono alongado','Octógono achatado'];
export function shapePolygon(name){
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

// Uma região com vazios é o contorno exterior menos buracos convexos disjuntos.
// Os níveis validam contenção e não sobreposição. Os buracos não se movem com a curva.
export function curvedCut(poly,config,step=1){
 const holes=config.holes??[], outerArea=area(poly);
 if(!holes.length)return cutSolid(poly,config,step);
 const total=outerArea-holes.reduce((sum,h)=>sum+area(h),0);
 if(!(total>0))throw Error('A figura precisa ter área útil positiva');
 let result,removed,errorPP,selected;
 // Refinamento limita o erro absoluto combinado, após subtrair os vazios.
 for(let attempt=0;attempt<16;attempt++){
  result=cutSolid(poly,config,step);
  removed=holes.map(h=>cutSolid(h,config,step));
  selected=result.ratio*outerArea-removed.reduce((sum,r,i)=>sum+r.ratio*area(holes[i]),0);
  errorPP=(result.errorPP*outerArea+removed.reduce((sum,r,i)=>sum+r.errorPP*area(holes[i]),0))/total;
  if(errorPP<=.01+1e-12)break;
  step/=2;
 }
 if(errorPP>.01+1e-12)throw Error('Precisão insuficiente para a figura com vazios');
 return {...result,ratio:Math.max(0,Math.min(1,selected/total)),errorPP,totalArea:total,selectedArea:selected,holeCuts:removed};
}

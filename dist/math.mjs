// Referência produzida com IA (OpenAI/Codex). Matemática independente da interface.
export const EPS = 1e-8;
export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
export const dot = (a, b) => a.x * b.x + a.y * b.y;
export const cross = (a, b) => a.x * b.y - a.y * b.x;
export const sub = (a, b) => ({x: a.x - b.x, y: a.y - b.y});
export const add = (a, b) => ({x: a.x + b.x, y: a.y + b.y});
export const scale = (a, k) => ({x: a.x * k, y: a.y * k});
export function unit(v) { const n = Math.hypot(v.x, v.y); if (n < EPS) throw Error('Vetor nulo'); return scale(v, 1 / n); }
export function torque(weights, g = 9.81) { return weights.reduce((s, w) => s + w.mass * g * w.x, 0); }
// Coordenadas de tela: y cresce para baixo. O ângulo positivo é horário.
export function segment(o) { const a = o.angle * Math.PI / 180, d = {x: Math.cos(a) * o.length / 2, y: Math.sin(a) * o.length / 2}; return {a: sub(o, d), b: add(o, d)}; }
export function raySegment(p, d, a, b) {
  const s = sub(b, a), den = cross(d, s);
  if (Math.abs(den) < EPS) return null; // Paralelos/colineares não têm impacto transversal único.
  const q = sub(a, p), t = cross(q, s) / den, u = cross(q, d) / den;
  return t > EPS && u >= -EPS && u <= 1 + EPS ? {t, point: add(p, scale(d, t))} : null;
}
export function reflect(d, a, b) {
  const tangent = unit(sub(b, a)), n = {x: -tangent.y, y: tangent.x};
  return unit(sub(d, scale(n, 2 * dot(d, n))));
}
export function rayCircle(p, d, c, r) {
  const q = sub(p, c), b = dot(q, d), disc = b * b - (dot(q, q) - r * r);
  if (dot(q, q) <= r * r) return 0;
  if (disc < -EPS) return null;
  const t = -b - Math.sqrt(Math.max(0,disc)); return t > EPS ? t : null;
}
// Paredes têm espessura física igual ao desenho; espelhos são superfícies ideais.
export function wallPolygon(o) {
 const s=segment(o),r=o.angle*Math.PI/180,n={x:-Math.sin(r)*(o.width??12)/2,y:Math.cos(r)*(o.width??12)/2};
 return [add(s.a,n),add(s.b,n),sub(s.b,n),sub(s.a,n)];
}
export function traceRay(source, direction, objects, target, maxBounces = 12, width = 800, height = 460) {
 let p={...source},d=unit(direction),points=[p],bounces=0,reflections=[],distance=0;
 const finish=status=>({points,bounces,status,reflections});
 const border=[{a:{x:0,y:0},b:{x:width,y:0}},{a:{x:width,y:0},b:{x:width,y:height}},{a:{x:width,y:height},b:{x:0,y:height}},{a:{x:0,y:height},b:{x:0,y:0}}];
 const walls=objects.filter(o=>o.type==='wall');
 for(const o of walls){const r=o.angle*Math.PI/180,q=sub(p,o),u=q.x*Math.cos(r)+q.y*Math.sin(r),v=-q.x*Math.sin(r)+q.y*Math.cos(r);if(Math.abs(u)<=o.length/2+EPS&&Math.abs(v)<=(o.width??12)/2+EPS)return finish('wall');}
 const surfaces=[...border.map(s=>({...s,type:'wall'})),...walls.flatMap(o=>{const v=wallPolygon(o);return v.map((a,i)=>({a,b:v[(i+1)%4],type:'wall'}));}),...objects.map((o,index)=>({...o,index})).filter(o=>o.type==='mirror').map(o=>({...segment(o),type:'mirror',index:o.index}))];
 for(let i=0;i<=maxBounces;i++){
  let hit=null;
  for(const s of surfaces){const h=raySegment(p,d,s.a,s.b);if(h&&(!hit||h.t<hit.t-EPS))hit={...h,...s};}
  const t=rayCircle(p,d,target,target.radius??18);
  if(t!==null&&(!hit||t<hit.t-EPS)){points.push(add(p,scale(d,t)));return finish('target');}
  if(!hit)return finish('escape');
  const last=points[points.length-1];distance+=Math.hypot(hit.point.x-last.x,hit.point.y-last.y);points.push(hit.point);
  if(hit.type==='wall')return finish('wall');
  if(bounces>=maxBounces)return finish('limit');
  const tangent=unit(sub(hit.b,hit.a)),normal={x:-tangent.y,y:tangent.x},outgoing=reflect(d,hit.a,hit.b);
  reflections.push({point:hit.point,normal,incoming:{...d},outgoing:{...outgoing},distance,objectIndex:hit.index});
  d=outgoing;bounces++;p=add(hit.point,scale(d,1e-6));
 }
}
export function area(poly) { return Math.abs(poly.reduce((s,p,i)=>s+cross(p,poly[(i+1)%poly.length]),0))/2; }
// Sutherland–Hodgman: conserva a parte n·p <= offset. Funciona em ambas as orientações.
export function clipHalfPlane(poly, normal, offset) {
  const out=[]; if (!poly.length) return out;
  for(let i=0;i<poly.length;i++) {
    const a=poly[i], b=poly[(i+1)%poly.length], da=dot(normal,a)-offset, db=dot(normal,b)-offset;
    if(da<=EPS) out.push(a);
    if((da < -EPS && db > EPS)||(da > EPS && db < -EPS)) out.push(add(a,scale(sub(b,a),da/(da-db))));
  }
  return out;
}
export function regularPolygon(n, radius=165, cx=400, cy=230) { return Array.from({length:n},(_,i)=>({x:cx+radius*Math.cos(-Math.PI/2+i*2*Math.PI/n),y:cy+radius*Math.sin(-Math.PI/2+i*2*Math.PI/n)})); }
export function polygon(name) {
  if(name==='Retângulo') return [{x:170,y:110},{x:630,y:110},{x:630,y:350},{x:170,y:350}];
  if(name==='Quadrado') return [{x:250,y:80},{x:550,y:80},{x:550,y:380},{x:250,y:380}];
  const sides={'Triângulo':3,'Pentágono':5,'Hexágono':6,'Octógono':8};return regularPolygon(sides[name]??6);
}
export function cut(poly,angle,offset) { const a=angle*Math.PI/180, n={x:Math.cos(a),y:Math.sin(a)}, d=dot(n,{x:400,y:230})+offset, clipped=clipHalfPlane(poly,n,d);return {clipped,ratio:area(clipped)/area(poly),n,d}; }

// Tolerância absoluta em pontos percentuais, inclusive nos dois limites.
export const CUT_TOLERANCE = 3;
export function cutSuccess(percent, target) { return Math.abs(percent-target) <= CUT_TOLERANCE + 1e-9; }
// Um espelho é uma reta sem orientação: 180° descreve a mesma superfície.
export function mirrorAngle(dx,dy) { let a=Math.atan2(dy,dx)*180/Math.PI; if(a>90)a-=180;if(a< -90)a+=180;return a; }

// Revela um prefixo por distância, nunca por quantidade de segmentos.
export function pathAtDistance(points, distance) {
 const out=[points[0]];let left=Math.max(0,distance);
 for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],len=Math.hypot(b.x-a.x,b.y-a.y);if(left<len){out.push({x:a.x+(b.x-a.x)*left/len,y:a.y+(b.y-a.y)*left/len});return out;}out.push(b);left-=len;}
 return out;
}

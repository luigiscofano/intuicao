// Desenho puro: permite testar ausência de spoilers e chegada de cada normal sem DOM.
export function lightRaysSVG(ray,visible){
 const points=p=>p.map(v=>`${v.x},${v.y}`).join(' ');
 let svg='',travelled=visible.slice(1).reduce((sum,b,i)=>sum+Math.hypot(b.x-visible[i].x,b.y-visible[i].y),0);
 for(const h of ray.reflections??[])if(h.distance<=travelled+1e-6){const n=h.normal,p=h.point;svg+=`<line data-normal="true" x1="${p.x-n.x*42}" y1="${p.y-n.y*42}" x2="${p.x+n.x*42}" y2="${p.y+n.y*42}" stroke="#526274" stroke-width="1" stroke-opacity=".24" stroke-dasharray="3 5" pointer-events="none"/>`;}
 svg+=`<polyline data-ray="true" points="${points(visible)}" fill="none" stroke="#d99a32" stroke-width="2.4" stroke-linejoin="round" pointer-events="none"/>`;
 for(let j=1;j<visible.length;j++){const a=visible[j-1],b=visible[j],len=Math.hypot(b.x-a.x,b.y-a.y);if(len<24)continue;const ux=(b.x-a.x)/len,uy=(b.y-a.y)/len;
  for(let d=24;d<len-3;d+=76){const x=a.x+ux*d,y=a.y+uy*d;svg+=`<path data-ray-arrow="true" d="M${x-ux*7-uy*3.5},${y-uy*7+ux*3.5} L${x},${y} L${x-ux*7+uy*3.5},${y-uy*7-ux*3.5}" fill="none" stroke="#bd7f23" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" pointer-events="none"/>`;}
 }
 return svg;
}

// Screen-space presentation only: never write coordinates back into saved levels.
export const ORBITA_COLORS=['#f4b942','#438de3','#eb6683','#35b597','#a477db','#f18a4b'];
export function orbitaColor(level,type){const list=(level.pieceTypes??[]).filter(x=>!x.neutral&&!['n','neutral','0'].includes(x.id));return ORBITA_COLORS[Math.max(0,list.findIndex(x=>x.id===type))%ORBITA_COLORS.length];}
const corners=l=>l.rings.map(r=>r.geometry);
function extent(level,angle){const c=Math.cos(angle),s=Math.sin(angle),p=corners(level).map(g=>({x:g.cx*c-g.cy*s,y:g.cx*s+g.cy*c,r:g.r}));const left=Math.min(...p.map(g=>g.x-g.r)),right=Math.max(...p.map(g=>g.x+g.r)),top=Math.min(...p.map(g=>g.y-g.r)),bottom=Math.max(...p.map(g=>g.y+g.r));return {left,top,width:right-left,height:bottom-top,c,s};}
export function projectOrbita(level,width=600){
 width=Math.max(224,Math.min(680,Number(width)||600));const maxHeight=width<380?650:600;let best=null;
 for(let d=0;d<180;d++){const b=extent(level,d*Math.PI/180),scale=Math.min((width-44)/b.width,(maxHeight-64)/b.height);if(!best||scale>best.scale)best={...b,scale,angle:d};}
 const {c,s,scale}=best,ox=(width-best.width*scale)/2-best.left*scale,oy=32-best.top*scale;
 const point=p=>({x:(p.x*c-p.y*s)*scale+ox,y:(p.x*s+p.y*c)*scale+oy});
 const cells=level.cells.map(cell=>({...cell,...point(cell)}));
 const projected={...level,cells,rings:level.rings.map(r=>{const q=point({x:r.geometry.cx,y:r.geometry.cy}),radius=r.geometry.r*scale;return {...r,geometry:{...r.geometry,cx:q.x,cy:q.y,r:radius,rx:radius,ry:radius}};}),layout:{...level.layout,width,height:Math.ceil(best.height*scale+64),pieceRadius:13},presentation:true};
 const minDistance=Math.min(...cells.flatMap((a,i)=>cells.slice(i+1).map(b=>Math.hypot(a.x-b.x,a.y-b.y))));
 return {level:projected,point,angle:best.angle,scale,minDistance};
}
export function presentationBadges(level){
 const radius=level.layout.pieceRadius,width=level.layout.width,height=level.layout.height,targets=[],sensors=[],errors=[];
 const overlap=(a,b,gap=2)=>a.x<b.x+b.width+gap&&a.x+a.width+gap>b.x&&a.y<b.y+b.height+gap&&a.y+a.height+gap>b.y;
 const inside=r=>r.x>=2&&r.y>=2&&r.x+r.width<=width-2&&r.y+r.height<=height-2;
 function place(cell,w,h,extra){
  const offsets=[];for(const distance of [27,34,43,55,70,90,115,145,180,230,290])for(let i=0;i<16;i++){const a=(90+i*22.5)*Math.PI/180;offsets.push([Math.cos(a)*distance,Math.sin(a)*distance]);}
  for(const [dx,dy]of offsets){const b={cell:cell.id,cx:cell.x+dx,cy:cell.y+dy,x:cell.x+dx-w/2,y:cell.y+dy-h/2,width:w,height:h,...extra};if(!inside(b)||targets.some(t=>overlap(b,t))||sensors.some(t=>overlap(b,t)))continue;
   if(level.cells.some(p=>{const x=Math.max(b.x,Math.min(p.x,b.x+w)),y=Math.max(b.y,Math.min(p.y,b.y+h));return Math.hypot(p.x-x,p.y-y)<radius+4;}))continue;
   const length=Math.hypot(dx,dy),ux=dx/length,uy=dy/length,edge=Math.min(Math.abs(ux)<1e-9?Infinity:w/2/Math.abs(ux),Math.abs(uy)<1e-9?Infinity:h/2/Math.abs(uy));
   b.connector={x1:cell.x+ux*(radius+3),y1:cell.y+uy*(radius+3),x2:b.cx-ux*edge,y2:b.cy-uy*edge};return b;
  }errors.push('Marcador sem espaço: '+cell.id);return null;
 }
 for(const cell of level.cells)if(Object.hasOwn(level.targets,cell.id)){const b=place(cell,22,18,{type:level.targets[cell.id]});if(b)targets.push(b);}
 const conditions=new Map();for(const cmd of level.commands)for(const r of cmd.requires??[]){if(!conditions.has(r.cell))conditions.set(r.cell,new Set());conditions.get(r.cell).add(r.type);}
 for(const [id,types]of conditions){const cell=level.cells.find(c=>c.id===id),label='S'+(sensors.length+1),b=place(cell,24,18,{types:[...types],label});if(b)sensors.push(b);}
 return {valid:errors.length===0,errors,targets,sensors};
}
export function compactOrbitaAudit(level,width=265){const p=projectOrbita(level,width),badges=presentationBadges(p.level);return {valid:p.minDistance>=28&&badges.valid,minDistance:p.minDistance,height:p.level.layout.height,angle:p.angle,badges};}
export function presentationRingLabels(level,badges=presentationBadges(level)){
 const labels=[],r=11;
 const hits=(p,b)=>{const x=Math.max(b.x,Math.min(p.x,b.x+b.width)),y=Math.max(b.y,Math.min(p.y,b.y+b.height));return Math.hypot(x-p.x,y-p.y)<r+2;};
 for(const ring of level.rings){const g=ring.geometry,candidates=[];for(let y=14;y<level.layout.height-14;y+=8)for(let x=14;x<level.layout.width-14;x+=8)candidates.push({x,y,score:Math.hypot(x-g.cx,y-g.cy)+(Math.hypot(x-g.cx,y-g.cy)>g.r?1000:0)});candidates.sort((a,b)=>a.score-b.score);const p=candidates.find(p=>!level.cells.some(c=>Math.hypot(p.x-c.x,p.y-c.y)<28)&&![...badges.targets,...badges.sensors].some(b=>hits(p,b))&&!labels.some(q=>Math.hypot(p.x-q.x,p.y-q.y)<25));labels.push({id:ring.id,...(p??{x:g.cx,y:g.cy,unplaced:true})});}
 return labels;
}

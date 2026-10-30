import {circleMeetings} from '../dist/orbita/topology-circles-v3.mjs';
/** Authoring-only repair of decimal-rounded coordinates. Never changes logical ownership,
 * ring order, centres, radii, commands, pieces or targets. Throws if the rail graph differs. */
export function normalizeLegacyCircleCoordinates(input){
 const level=structuredClone(input),byID=new Map(level.cells.map(c=>[c.id,c]));
 for(const r of level.rings){const g=r.geometry;if(g?.type!=='circle'||!(g.r>0))throw Error('Legacy rail is not circular');g.rx=g.ry=g.r;}
 for(const cell of level.cells){const owners=level.rings.filter(r=>r.cells.includes(cell.id));if(owners.length===1){const g=owners[0].geometry,a=Math.atan2(cell.y-g.cy,cell.x-g.cx);cell.x=g.cx+g.r*Math.cos(a);cell.y=g.cy+g.r*Math.sin(a);}else if(owners.length===2){const hits=circleMeetings(owners[0].geometry,owners[1].geometry);if(!hits?.length)throw Error('Legacy shared house has no analytic intersection');const p=hits.toSorted?hits.toSorted((a,b)=>Math.hypot(a.x-cell.x,a.y-cell.y)-Math.hypot(b.x-cell.x,b.y-cell.y))[0]:[...hits].sort((a,b)=>Math.hypot(a.x-cell.x,a.y-cell.y)-Math.hypot(b.x-cell.x,b.y-cell.y))[0];if(Math.hypot(p.x-cell.x,p.y-cell.y)>.01)throw Error('Legacy shared house differs materially from analytic intersection');cell.x=p.x;cell.y=p.y;}else throw Error('Invalid legacy ownership');}
 for(let i=0;i<level.rings.length;i++)for(let j=i+1;j<level.rings.length;j++){const a=level.rings[i],b=level.rings[j],hits=circleMeetings(a.geometry,b.geometry),shared=a.cells.filter(id=>b.cells.includes(id));if(hits===null||hits.length!==shared.length||hits.some(p=>shared.filter(id=>Math.hypot(byID.get(id).x-p.x,byID.get(id).y-p.y)<1e-5).length!==1))throw Error('Legacy visual/logical pair topology mismatch');}
 return level;
}

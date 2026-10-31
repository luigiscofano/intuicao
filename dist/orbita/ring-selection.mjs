/**
 * Pick a circular rail in the same coordinate system as its projected geometry.
 * The caller converts pointer coordinates AND CSS-pixel tolerance into SVG units.
 * Equal-distance intersections choose the first ring in authored geometry order.
 */
export function pickOrbitaRing(level,point,tolerance=16){
  if(!Number.isFinite(point?.x)||!Number.isFinite(point?.y)||!Number.isFinite(tolerance)||tolerance<0)return null;
  let nearest=null,best=Infinity;
  for(const ring of level?.rings??[]){
    const g=ring.geometry;
    if(!g||![g.cx,g.cy,g.r].every(Number.isFinite)||g.r<=0)continue;
    const distance=Math.abs(Math.hypot(point.x-g.cx,point.y-g.cy)-g.r);
    if(distance<=tolerance+1e-7&&distance<best-1e-7){nearest=ring.id;best=distance;}
  }
  return nearest??null;
}

/** Explicit ring labels bypass picking and resolve their exact ID here. */
export function commandForOrbitaRing(level,ringId,selectedId){
  if(!(level?.rings??[]).some(ring=>ring.id===ringId))return null;
  const matches=(level.commands??[]).filter(command=>(command.turns??[]).some(turn=>turn.ring===ringId));
  return matches.find(command=>command.turns.length===1)?.id
    ??matches.find(command=>command.id===selectedId)?.id
    ??matches[0]?.id??null;
}

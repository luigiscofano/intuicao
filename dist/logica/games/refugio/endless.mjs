import { neighbors, freeComponents, checkState, initialState, solutionState } from './engine.mjs';

function hash(value) { let h = 2166136261; for (const c of String(value)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; }
function random(seed) { let s = hash(seed); return () => { s += 0x6D2B79F5; let t = Math.imul(s ^ s >>> 15, 1 | s); t ^= t + Math.imul(t ^ t >>> 7, 61 | t); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function shuffle(a, rng) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function band(d) { return Math.max(0, Math.min(5, Math.floor(Number(d) || 0))); }
function finish(level, seed) {
  level.version = 1; level.id = `${level.game}-endless-${hash(`${seed}:${structuralSignature(level)}`).toString(36)}`;
  level.name = 'Sem parar';
  if (!checkState(level, solutionState(level)).valid || checkState(level, initialState(level)).valid) throw new Error(`Invalid procedural ${level.game} level`);
  return level;
}

export function structuralSignature(level) {
  let grid=Array.from({length:level.rows},(_,r)=>Array.from({length:level.cols},(_,c)=>r*level.cols+c)); const keys=[],markers=new Set(level.markers.map(m=>m.index));
  for(let t=0;t<4;t++) {for(const g of [grid,grid.map(row=>row.slice().reverse())]) keys.push(JSON.stringify([g.length,g[0].length,g.flat().map(i=>[level.givens[i],markers.has(i)?1:0])]));grid=grid[0].map((_,c)=>grid.map(row=>row[c]).reverse());}return keys.sort()[0];
}
function unique(level) {
  const cells=level.givens.slice(),open=cells.flatMap((v,i)=>v===null?[i]:[]),anchors=new Set(level.markers.map(m=>m.index));let count=0,nodes=0,aborted=false;
  function visit(k) {
    if(++nodes>1500){aborted=true;return;}
    const {components,componentOf}=freeComponents(level,cells);
    if(components.some(comp=>comp.filter(i=>anchors.has(i)).length>1))return;
    for(let i=0;i<cells.length;i++) if(cells[i]===1) {const adj=neighbors(level,i);if(new Set(adj.filter(j=>cells[j]===0).map(j=>componentOf[j])).size+adj.filter(j=>cells[j]===null).length<2)return;}
    if(k===open.length){if(checkState(level,{cells,lastChanged:null}).valid)count++;return;}
    for(const v of [0,1]){cells[open[k]]=v;visit(k+1);if(count>1||aborted)break;}cells[open[k]]=null;
  }
  visit(0);return count===1&&!aborted;
}
export function generateEndlessLevel(seed, difficulty = 0, options = {}) {
  const d=band(difficulty),rng=random(`refugio:${seed}:${d}`),rows=3+Math.floor(d/2),cols=Math.max(4,3+Math.ceil(d/2));
  const level={game:'refugio',difficulty:d,rows,cols};let found=false;
  // Bounded random partitions; no finite authored pool is involved.
  const attempts=options.maxAttempts===0?0:192;
  for(let attempt=0;attempt<attempts;attempt++) {
    level.solution=Array.from({length:rows*cols},()=>Number(rng()<.26));
    const {components}=freeComponents(level,level.solution);if(components.length<2||components.length>4)continue;
    level.markers=components.map((comp,i)=>({index:comp[Math.floor(rng()*comp.length)],label:i+1}));level.givens=level.solution.slice();
    if(checkState(level,solutionState(level)).valid){found=true;break;}
  }
  if(!found) {
    // Guaranteed procedural fallback: a new random-walk separator, with
    // independently sampled anchors. It is not a stored campaign board.
    let wall=1+Math.floor(rng()*(cols-2)); const path=[];
    for(let r=0;r<rows;r++) { const next=[wall-1,wall,wall+1].filter(c=>c>0&&c<cols-1); wall=next[Math.floor(rng()*next.length)]; path.push(wall); }
    // Adjacent rows differ by at most one: each wall has a connected free
    // region to its left and another to its right, and no passage across it.
    level.solution=Array.from({length:rows*cols},(_,i)=>Number(i%cols===path[Math.floor(i/cols)]));
    level.markers=freeComponents(level,level.solution).components.map((comp,i)=>({index:comp[Math.floor(rng()*comp.length)],label:i+1}));level.givens=level.solution.slice();
  }
  const anchors=new Set(level.markers.map(m=>m.index)),goal=3+2*d;let removed=0;
  for(const i of shuffle(level.solution.map((_,i)=>i).filter(i=>!anchors.has(i)),rng)) {
    level.givens[i]=null;if(unique(level))removed++;else level.givens[i]=level.solution[i];if(removed>=goal)break;
  }
  level.generation={algorithm:'random-separator-v1',unique:true,unknown:removed,fallback:!found};
  return finish(level,seed);
}

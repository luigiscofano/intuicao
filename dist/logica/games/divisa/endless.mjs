import { neighbors, contactCounts, checkState, initialState, solutionState } from './engine.mjs';

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

/** Canonical under rectangular/square dihedral symmetries and territory renaming. */
export function structuralSignature(level) {
  let grid = Array.from({length:level.rows}, (_, r) => Array.from({length:level.cols}, (_, c) => r * level.cols + c));
  const keys = [];
  for (let turn = 0; turn < 4; turn++) {
    for (const g of [grid, grid.map(row => row.slice().reverse())]) {
      const map = new Map();
      // Use the actual partition to normalize letters, not their arbitrary names.
      const normalized = g.flat().map(i => { const v = level.solution[i]; if (!map.has(v)) map.set(v, map.size); return map.get(v); });
      keys.push(JSON.stringify([g.length,g[0].length,normalized,g.flat().map(i => level.givens[i] === null ? null : map.get(level.givens[i])),Object.entries(level.contacts).map(([p,n]) => [p.split('').map(x=>map.get(x)).sort().join(''),n]).sort()]));
    }
    grid = grid[0].map((_, c) => grid.map(row => row[c]).reverse());
  }
  return keys.sort()[0];
}
function unique(level, budget = 1200) {
  const cells = level.givens.slice(), open = cells.flatMap((v,i) => v === null ? [i] : []);
  const edges = cells.flatMap((_,i) => neighbors(level,i).filter(j=>j>i).map(j=>[i,j]));
  const pairs=Object.keys(level.contacts), targets=pairs.map(p=>level.contacts[p]);
  const pairIndex=new Map();pairs.forEach((p,i)=>{pairIndex.set(p,i);pairIndex.set(p[1]+p[0],i);});
  let nodes = 0, count = 0, exhausted = false;
  function visit(k) {
    if (++nodes > budget) { exhausted = true; return; }
    const lower=Array(pairs.length).fill(0), upper=Array(pairs.length).fill(0);
    for (const [i,j] of edges) {
      const a=cells[i],b=cells[j];
      if(a!==null&&b!==null) {if(a!==b){const p=pairIndex.get(a+b);lower[p]++;upper[p]++;}}
      else for(let p=0;p<pairs.length;p++) if((a===null||pairs[p].includes(a))&&(b===null||pairs[p].includes(b)))upper[p]++;
    }
    if (targets.some((n,p)=>lower[p]>n || upper[p]<n)) return;
    if (k === open.length) { if(checkState(level,{cells,lastChanged:null}).valid) count++; return; }
    for (const v of level.letters) { cells[open[k]]=v; visit(k+1); if(count>1 || exhausted) break; }
    cells[open[k]]=null;
  }
  visit(0); return !exhausted && count === 1;
}
export function generateEndlessLevel(seed, difficulty = 0, options = {}) {
  const d = band(difficulty), rng = random(`divisa:${seed}:${d}`);
  const rows = 3 + Math.floor(d/2), cols = 3 + Math.ceil(d/2), letters = ['A','B','C','D'].slice(0,d < 3 ? 3 : 4);
  const level = {game:'divisa',difficulty:d,rows,cols,letters,solution:Array(rows*cols).fill(null),contacts:{}};
  const positions = shuffle(Array.from({length:rows*cols},(_,i)=>i),rng);
  letters.forEach((v,i)=>level.solution[positions[i]]=v);
  // Every new square attaches to an existing territory, preserving connectivity.
  while(level.solution.includes(null)) {
    const frontier = [];
    level.solution.forEach((v,i)=>{ if(v !== null) for(const j of neighbors(level,i)) if(level.solution[j] === null) frontier.push([j,v]); });
    const [i,v] = frontier[Math.floor(rng()*frontier.length)]; level.solution[i]=v;
  }
  letters.forEach((a,i)=>letters.slice(i+1).forEach(b=>level.contacts[a+b]=0));
  level.contacts = contactCounts(level,level.solution); level.givens = level.solution.slice();
  const goal = 3+d*2;
  for(const i of shuffle(positions.slice(),rng)) {
    const old=level.givens[i]; level.givens[i]=null;
    if(!unique(level)) level.givens[i]=old;
    if(level.givens.filter(v=>v===null).length>=goal) break;
  }
  level.generation = {algorithm:'connected-growth-v1',unique:true,unknown:level.givens.filter(v=>v===null).length};
  return finish(level,seed);
}

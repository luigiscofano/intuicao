import { checkState, initialState, solutionState } from './engine.mjs';

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

function patterns(cols) {
  const out=[]; for(let gap=1;gap*2<cols;gap++) for(let start=0;start+gap*2<cols;start++) out.push(Array.from({length:cols},(_,c)=>Number(c===start || c===start+gap || c===start+gap*2))); return out;
}
export function structuralSignature(level) {
  // Row permutations and horizontal reflection do not change this puzzle's rules.
  return [false,true].map(flip=>JSON.stringify([level.cols,flip?level.quotas.slice().reverse():level.quotas,Array.from({length:level.rows},(_,r)=>Array.from({length:level.cols},(_,c)=>level.givens[r*level.cols+(flip?level.cols-1-c:c)]??null)).sort((a,b)=>JSON.stringify(a).localeCompare(JSON.stringify(b)))])).sort()[0];
}
function unique(level, all) {
  const domains=Array.from({length:level.rows},(_,r)=>all.filter(p=>p.every((v,c)=>level.givens[r*level.cols+c]===undefined || level.givens[r*level.cols+c]===v))).sort((a,b)=>a.length-b.length);
  let count=0,nodes=0,aborted=false; const sums=Array(level.cols).fill(0);
  const mins=domains.map(d=>Array.from({length:level.cols},(_,c)=>Math.min(...d.map(p=>p[c]))));
  const maxs=domains.map(d=>Array.from({length:level.cols},(_,c)=>Math.max(...d.map(p=>p[c]))));
  function visit(r) {
    if(++nodes>2500) {aborted=true;return;}
    for(let c=0;c<level.cols;c++) { let lo=sums[c],hi=lo; for(let k=r;k<domains.length;k++) {lo+=mins[k][c];hi+=maxs[k][c];} if(lo>level.quotas[c] || hi<level.quotas[c])return; }
    if(r===domains.length) {count++;return;}
    for(const p of domains[r]) {p.forEach((v,c)=>sums[c]+=v);visit(r+1);p.forEach((v,c)=>sums[c]-=v);if(count>1||aborted)return;}
  }
  visit(0);return count===1&&!aborted;
}
export function generateEndlessLevel(seed, difficulty = 0, options = {}) {
  const d=band(difficulty),rng=random(`pulso:${seed}:${d}`),rows=3+Math.floor(d/2),cols=5+d,all=patterns(cols);
  const solution=Array.from({length:rows},()=>all[Math.floor(rng()*all.length)]).flat();
  const quotas=Array.from({length:cols},(_,c)=>solution.reduce((n,v,i)=>n+(i%cols===c?v:0),0));
  const level={game:'pulso',difficulty:d,rows,cols,solution,quotas,givens:Object.fromEntries(solution.map((v,i)=>[i,v]))};
  const goal=Math.floor(solution.length*(.55+.07*d));let removed=0;
  for(const i of shuffle(solution.map((_,i)=>i),rng)) {delete level.givens[i]; if(unique(level,all)) removed++; else level.givens[i]=solution[i]; if(removed>=goal)break;}
  level.generation={algorithm:'arithmetic-rows-v1',unique:true,unknown:removed};
  return finish(level,seed);
}

import { checkState, initialState, solutionState } from './engine.mjs';

// Local deterministic PRNG: no clock, network, catalog, or platform dependencies.
function randomSource(seed, difficulty) {
  let state = 2166136261;
  for (const c of `${String(seed)}:${difficulty}`) state = Math.imul(state ^ c.charCodeAt(0), 16777619);
  return n => { state += 0x6d2b79f5; let t = state; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return Math.floor(((t ^ t >>> 14) >>> 0) / 4294967296 * n); };
}
function band(value) { return Math.max(0, Math.min(5, Math.floor(Number(value) || 0))); }
function shuffled(items, random) { const out = [...items]; for (let i = out.length - 1; i > 0; i--) { const j = random(i + 1); [out[i], out[j]] = [out[j], out[i]]; } return out; }
function identifier(text) { let h = 2166136261; for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return (h >>> 0).toString(36); }

// Canonicalize the actual puzzle over all eight grid symmetries, not its ID.
export function structuralSignature(level) {
  const variants = [];
  for (const transpose of [false, true]) for (const sx of [false, true]) for (const sy of [false, true]) {
    const w = transpose ? level.height : level.width, h = transpose ? level.width : level.height;
    const map = i => { let x = i % level.width, y = Math.floor(i / level.width); if (transpose) [x, y] = [y, x]; return (sy ? h - 1 - y : y) * w + (sx ? w - 1 - x : x); };
    variants.push(JSON.stringify([w, h, map(level.root), level.channels.map(e => e.map(map).sort((a,b)=>a-b)).sort((a,b)=>a[0]-b[0]||a[1]-b[1]), Object.entries(level.clues).map(([i,d])=>[map(+i),d]).sort((a,b)=>a[0]-b[0])]));
  }
  return variants.sort()[0];
}
// Sound distance-domain propagation. Singleton outgoing choices prove uniqueness;
// incomplete propagation is not represented as proof of ambiguity or difficulty.
function forced(level) {
  const n = level.width * level.height, adj = Array.from({length:n},()=>[]);
  for (const [a,b] of level.channels) { adj[a].push(b); adj[b].push(a); }
  const domains = Array.from({length:n},(_,i)=>new Set(i===level.root ? [0] : Object.hasOwn(level.clues,i) ? [level.clues[i]] : Array.from({length:n-1},(_,j)=>j+1)));
  let change = true;
  while (change) {
    change = false;
    for (let i=0;i<n;i++) if (i!==level.root) for (const d of domains[i]) {
      if (!adj[i].some(j=>domains[j].has(d-1))) { domains[i].delete(d); change=true; }
    }
  }
  return adj.every((neighbors,i)=>i===level.root || neighbors.filter(j=>[...domains[i]].some(d=>domains[j].has(d-1))).length===1);
}
export function generateEndlessLevel(seed, difficulty=0, options={}) {
  const d=band(difficulty), random=randomSource(seed,d), width=4+Math.floor(d/2), height=3+Math.floor((d+1)/2), n=width*height;
  const root=random(n), solution=Array(n).fill(-1), distances=Array(n).fill(-1), channels=[], seen=new Set([root]), stack=[root]; distances[root]=0;
  const neighbors=i=>[i-width,i%width<width-1?i+1:-1,i+width,i%width?i-1:-1].filter(j=>j>=0&&j<n);
  // A randomized depth-first tree constructs a legal complete answer from scratch.
  while(stack.length) { const at=stack.at(-1), next=shuffled(neighbors(at).filter(i=>!seen.has(i)),random)[0]; if(next===undefined) {stack.pop();continue;} seen.add(next); solution[next]=at; distances[next]=distances[at]+1; channels.push([at,next]); stack.push(next); }
  const clues=Object.fromEntries(distances.map((v,i)=>[i,v]));
  const level={version:1,game:'foz',id:'',name:'Foz sem parar',difficulty:d,width,height,root,channels,clues,solution};
  // Add only chords compatible with a proven unique orientation. The full clue
  // set makes these checks cheap; subsequent clue removal must preserve proof.
  for(const a of shuffled([...seen],random)) for(const b of neighbors(a)) if(a<b && !channels.some(e=>e.includes(a)&&e.includes(b)) && random(6)<d+1) {
    channels.push([a,b]); if(!forced(level)) channels.pop();
  }
  const target=Math.max(1,Math.floor(n*(0.60-d*0.075)));
  for(const i of shuffled([...seen],random)) { if(Object.keys(clues).length<=target)break; const old=clues[i]; delete clues[i]; if(!forced(level)) clues[i]=old; }
  level.generation={method:'random-tree-distance-propagation',unique:true,clues:Object.keys(clues).length,decisions:n-1,calibrated:false};
  level.id=`foz-endless-${identifier(structuralSignature(level))}`;
  if(!checkState(level,solutionState(level)).valid||checkState(level,initialState(level)).valid) throw Error('Invalid procedural FOZ');
  return level;
}

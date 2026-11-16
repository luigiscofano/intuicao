import { checkState, initialState, solutionState, observerRays } from './engine.mjs';

// Local deterministic PRNG: no clock, network, catalog, or platform dependencies.
function randomSource(seed, difficulty) {
  let state = 2166136261;
  for (const c of `${String(seed)}:${difficulty}`) state = Math.imul(state ^ c.charCodeAt(0), 16777619);
  return n => { state += 0x6d2b79f5; let t = state; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return Math.floor(((t ^ t >>> 14) >>> 0) / 4294967296 * n); };
}
function band(value) { return Math.max(0, Math.min(5, Math.floor(Number(value) || 0))); }
function shuffled(items, random) { const out = [...items]; for (let i = out.length - 1; i > 0; i--) { const j = random(i + 1); [out[i], out[j]] = [out[j], out[i]]; } return out; }
function identifier(text) { let h = 2166136261; for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return (h >>> 0).toString(36); }

const bitCount = value => (value & 1) + ((value >> 1) & 1) + ((value >> 2) & 1);

/** Propagação segura; a busca posterior enumera todas as extensões restantes.
 * Não consulta level.solution. Limite de duas respostas só encerra casos ambíguos.
 */
function solveMirante(level, { witnesses = true, limit = 2, maxNodes = 100000 } = {}) {
  const rays = observerRays(level), size = level.rows * level.cols;
  const totals = [size - level.inventory.circle - level.inventory.triangle, level.inventory.circle, level.inventory.triangle];
  const metrics = { nodes: 0, branches: 0, maxDepth: 0, rounds: 0, sightRemovals: 0, stockRemovals: 0, witnessRemovals: 0, protectedCorridors: 0 };
  const answers = [];
  let exhausted = true;
  function narrow(domains, index, allowed, kind) {
    const next = domains[index] & allowed;
    if (next === domains[index]) return 0;
    metrics[kind] += bitCount(domains[index]) - bitCount(next);
    domains[index] = next;
    return next ? 1 : -1;
  }
  function propagate(domains) {
    let changed = true;
    while (changed) {
      changed = false;
      metrics.rounds++;
      for (let value = 0; value < 3; value++) {
        const bit = 1 << value;
        let certain = 0, possible = 0;
        domains.forEach(domain => { certain += domain === bit; possible += Boolean(domain & bit); });
        if (certain > totals[value] || possible < totals[value]) return false;
        if (certain === totals[value] || possible === totals[value]) {
          for (let index = 0; index < size; index++) {
            if (!(domains[index] & bit) || domains[index] === bit) continue;
            const result = narrow(domains, index, certain === totals[value] ? 7 ^ bit : bit, 'stockRemovals');
            if (result < 0) return false;
            changed ||= result > 0;
          }
        }
      }
      for (const ray of rays) {
        const candidates = [];
        for (let p = 0; p < ray.cells.length; p++) {
          const domain = domains[ray.cells[p]];
          if (domain & (1 << ray.shape)) candidates.push(p);
          if (!(domain & 1)) break;
        }
        if (!candidates.length) return false;
        const first = candidates[0], last = candidates.at(-1);
        for (let p = 0; p < ray.cells.length; p++) {
          let allowed = 0;
          if (first < p) allowed = 7;
          else {
            if (last > p) allowed |= 1;
            if (candidates.includes(p)) allowed |= 1 << ray.shape;
          }
          const result = narrow(domains, ray.cells[p], allowed, 'sightRemovals');
          if (result < 0) return false;
          changed ||= result > 0;
        }
      }
      if (!witnesses) continue;
      const supports = Array.from({ length: size }, () => [[], [], []]);
      for (const ray of rays) {
        const before = [];
        for (const index of ray.cells) {
          if (domains[index] & (1 << ray.shape)) supports[index][ray.shape].push(before.slice());
          if (!(domains[index] & 1)) break;
          before.push(index);
        }
      }
      for (let index = 0; index < size; index++) for (const shape of [1, 2]) {
        const bit = 1 << shape;
        if (!(domains[index] & bit)) continue;
        const seen = supports[index][shape];
        if (seen.length < 2) {
          const result = narrow(domains, index, 7 ^ bit, 'witnessRemovals');
          if (result < 0) return false;
          changed ||= result > 0;
        } else if (domains[index] === bit && seen.length === 2) {
          for (const before of seen) for (const empty of before) {
            const result = narrow(domains, empty, 1, 'protectedCorridors');
            if (result < 0) return false;
            changed ||= result > 0;
          }
        }
      }
    }
    return true;
  }
  function visit(domains, depth) {
    if (++metrics.nodes > maxNodes) { exhausted = false; return; }
    metrics.maxDepth = Math.max(metrics.maxDepth, depth);
    if (!propagate(domains)) return;
    let chosen = -1, width = 4;
    for (let index = 0; index < size; index++) {
      const count = bitCount(domains[index]);
      if (count > 1 && count < width) { chosen = index; width = count; }
    }
    if (chosen < 0) {
      answers.push(domains.map(bit => bit === 1 ? 0 : bit === 2 ? 1 : 2));
      return;
    }
    metrics.branches++;
    for (const bit of [1, 2, 4]) if (domains[chosen] & bit) {
      const next = domains.slice(); next[chosen] = bit;
      visit(next, depth + 1);
      if (answers.length >= limit || !exhausted) { exhausted = false; return; }
    }
  }
  visit(Array(size).fill(7), 0);
  return { count: answers.length, solutions: answers, complete: exhausted, metrics };
}

function fromBoard(rows,cols,cells) {
  const observers={left:Array(rows).fill(1),right:Array(rows).fill(1),top:Array(cols).fill(1),bottom:Array(cols).fill(1)};
  for(const ray of observerRays({rows,cols,observers})) { const hit=ray.cells.find(i=>cells[i]); observers[ray.side][ray.lane]=hit===undefined?null:cells[hit]; }
  return {rows,cols,observers,inventory:{circle:cells.filter(v=>v===1).length,triangle:cells.filter(v=>v===2).length},solution:cells};
}
export function structuralSignature(level) {
  // Board geometry canonicalization deliberately ignores metadata and extra
  // observers: changing only clues cannot masquerade as a new layout.
  const variants=[];
  for(const transpose of [false,true]) for(const sx of [false,true]) for(const sy of [false,true]) for(const swap of [false,true]) {
    const w=transpose?level.rows:level.cols,h=transpose?level.cols:level.rows,cells=Array(w*h);
    level.solution.forEach((v,i)=>{let x=i%level.cols,y=Math.floor(i/level.cols);if(transpose)[x,y]=[y,x];cells[(sy?h-1-y:y)*w+(sx?w-1-x:x)]=swap&&v?3-v:v;});
    variants.push(`${w}x${h}:${cells.join('')}`);
  }
  return variants.sort()[0];
}
export function generateEndlessLevel(seed,difficulty=0,options={}) {
  const d=band(difficulty),random=randomSource(seed,d),rows=d<2?3:4,cols=d<4?4:5;
  let chosen=null, proof=null;
  // Fixed work budgets, independent of machine timing. Reject hidden pieces.
  for(let attempt=0;attempt<Math.min(64,Math.max(0,Math.floor(options.maxAttempts ?? 64)));attempt++) {
    const cells=Array(rows*cols).fill(0),count=Math.max(rows,cols)+random(2+Math.min(1,d));
    for(const i of shuffled(cells.map((_,i)=>i),random).slice(0,count)) cells[i]=1+random(2);
    if(!cells.includes(1)||!cells.includes(2))continue;
    const candidate=fromBoard(rows,cols,cells);
    if(!checkState(candidate,{cells}).valid)continue;
    chosen ||= candidate;
    const result=solveMirante(candidate,{maxNodes:400});
    if(result.complete&&result.count===1) {chosen=candidate;proof=result;break;}
  }
  if(!chosen) {
    // A fresh permutation placement always gives every piece two horizontal
    // witnesses, plus vertical witnesses when alone in its column.
    const cells=Array(rows*cols).fill(0),columns=shuffled(Array.from({length:cols},(_,i)=>i),random);
    for(let r=0;r<rows;r++)cells[r*cols+columns[r]]=r===0?1:r===1?2:1+random(2);
    chosen=fromBoard(rows,cols,cells);
    const result=solveMirante(chosen,{maxNodes:400}); if(result.complete&&result.count===1)proof=result;
  }
  // Fewer observers at higher bands, only with full witness and uniqueness checks.
  let removed=0;
  if(proof)for(const ray of shuffled(observerRays(chosen),random)) {
    if(removed>=d)break;
    const old=chosen.observers[ray.side][ray.lane]; chosen.observers[ray.side][ray.lane]=null;
    if(!checkState(chosen,solutionState(chosen)).valid){chosen.observers[ray.side][ray.lane]=old;continue;}
    const result=solveMirante(chosen,{maxNodes:400});
    if(result.complete&&result.count===1){removed++;proof=result;}else chosen.observers[ray.side][ray.lane]=old;
  }
  const level={version:1,game:'mirante',id:'',name:'Mirante sem parar',difficulty:d,...chosen,generation:{method:'random-witness-board',unique:Boolean(proof),uniquenessChecked:Boolean(proof),decisions:rows*cols,removedObservers:removed,calibrated:false}};
  level.id=`mirante-endless-${identifier(structuralSignature(level)+JSON.stringify(level.observers))}`;
  if(!checkState(level,solutionState(level)).valid||checkState(level,initialState(level)).valid)throw Error('Invalid procedural MIRANTE');
  return level;
}

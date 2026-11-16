import { checkState, initialState, solutionState, visiblePieces, segmentsIntersect } from './engine.mjs';

// Local deterministic PRNG: no clock, network, catalog, or platform dependencies.
function randomSource(seed, difficulty) {
  let state = 2166136261;
  for (const c of `${String(seed)}:${difficulty}`) state = Math.imul(state ^ c.charCodeAt(0), 16777619);
  return n => { state += 0x6d2b79f5; let t = state; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return Math.floor(((t ^ t >>> 14) >>> 0) / 4294967296 * n); };
}
function band(value) { return Math.max(0, Math.min(5, Math.floor(Number(value) || 0))); }
function shuffled(items, random) { const out = [...items]; for (let i = out.length - 1; i > 0; i--) { const j = random(i + 1); [out[i], out[j]] = [out[j], out[i]]; } return out; }
function identifier(text) { let h = 2166136261; for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return (h >>> 0).toString(36); }

const edges=t=>[[t[0],t[1]],[t[1],t[2]]];
function clash(level,t,u) {return t[0]===u[0]||t[2]===u[2]||edges(t).some(a=>edges(u).some(b=>segmentsIntersect(level,a,b)));}
function candidates(level) {
  return Object.keys(level.pieces).map(Number).filter(b=>level.pieces[b]==='B').map(b=>{
    const v=visiblePieces(level,b), horizontal=i=>Math.floor(i/level.width)===Math.floor(b/level.width);
    return v.filter(s=>level.pieces[s]==='S').flatMap(s=>v.filter(f=>level.pieces[f]==='F'&&horizontal(s)!==horizontal(f)).map(f=>[s,b,f]));
  });
}
function certify(level) {
  let nodes=0,count=0,complete=true;
  function visit(domains) {
    if(++nodes>1000){complete=false;return;}
    if(!domains.length){count++;return;}
    domains.sort((a,b)=>a.length-b.length);
    for(const trio of domains[0]) {
      visit(domains.slice(1).map(list=>list.filter(other=>!clash(level,trio,other))));
      if(count>=2||!complete)return;
    }
  }
  visit(candidates(level)); return {unique:complete&&count===1,nodes};
}
export function structuralSignature(level) {
  const variants=[],points=Object.entries(level.pieces).map(([i,t])=>[+i%level.width,Math.floor(+i/level.width),t]);
  for(const transpose of [false,true])for(const sx of [-1,1])for(const sy of [-1,1])for(const swap of [false,true]) {
    const pts=points.map(([x,y,t])=>[(transpose?y:x)*sx,(transpose?x:y)*sy,swap?(t==='S'?'F':t==='F'?'S':t):t]);
    const xs=[...new Set(pts.map(p=>p[0]))].sort((a,b)=>a-b),ys=[...new Set(pts.map(p=>p[1]))].sort((a,b)=>a-b);
    variants.push(JSON.stringify(pts.map(([x,y,t])=>[xs.indexOf(x),ys.indexOf(y),t]).sort((a,b)=>a[0]-b[0]||a[1]-b[1])));
  }
  return variants.sort()[0];
}
export function generateEndlessLevel(seed,difficulty=0,options={}) {
  const d=band(difficulty),random=randomSource(seed,d),width=5+Math.floor(d/2),height=5+Math.floor((d+1)/2),count=3+d;
  let chosen=null,proof=null;
  for(let attempt=0;attempt<Math.min(24,Math.max(0,Math.floor(options.maxAttempts ?? 24)));attempt++) {
    const level={width,height,pieces:{},solution:[]};
    for(let k=0;k<count;k++) {
      let placed=false;
      for(let trial=0;trial<70;trial++) {
        const b=random(width*height),x=b%width,y=Math.floor(b/width);
        let xx=random(width-1),yy=random(height-1);if(xx>=x)xx++;if(yy>=y)yy++;
        let s=y*width+xx,f=yy*width+x;if(random(2))[s,f]=[f,s];
        if([s,b,f].some(i=>Object.hasOwn(level.pieces,i)))continue;
        const t=[s,b,f],pieces={...level.pieces,[s]:'S',[b]:'B',[f]:'F'},candidate={...level,pieces,solution:[...level.solution,t]};
        if(level.solution.some(u=>clash(candidate,t,u)))continue;
        if(!checkState(candidate,solutionState(candidate)).valid)continue;
        level.pieces=pieces;level.solution.push(t);placed=true;break;
      }
      if(!placed)break;
    }
    if(level.solution.length!==count)continue;
    chosen ||= level;
    const result=certify(level);if(result.unique){chosen=level;proof=result;break;}
  }
  if(!chosen) {
    // Guaranteed bounded procedural fallback: randomized adjacent Ls in disjoint
    // 2x2 tiles. Empty spacing and all corner orientations are generated anew.
    const tileCols=Math.ceil(Math.sqrt(count)),w=tileCols*2,h=Math.ceil(count/tileCols)*2;
    const pieces={},solution=[];
    for(let k=0;k<count;k++) {
      const x=(k%tileCols)*2+random(2),y=Math.floor(k/tileCols)*2+random(2),b=y*w+x;
      let s=y*w+(x%2?x-1:x+1),f=(y%2?y-1:y+1)*w+x;if(random(2))[s,f]=[f,s];
      pieces[s]='S';pieces[b]='B';pieces[f]='F';solution.push([s,b,f]);
    }
    chosen={width:w,height:h,pieces,solution};proof=certify(chosen);
  }
  const level={version:1,game:'renovo',id:'',name:'Renovo sem parar',difficulty:d,...chosen,generation:{method:'random-noncrossing-trios',unique:Boolean(proof?.unique),decisions:count,calibrated:false}};
  level.id=`renovo-endless-${identifier(structuralSignature(level))}`;
  if(!checkState(level,solutionState(level)).valid||checkState(level,initialState(level)).valid)throw Error('Invalid procedural RENOVO');
  return level;
}

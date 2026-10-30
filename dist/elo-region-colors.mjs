/** ELO presentation only: four-colour the real shared-edge region graph.
 * Valid campaign/import/endless regions are connected planar map regions.
 * The exact search has no budget cutoff: those graphs always admit four colours.
 * IDs, cells, clues and solutions are never mutated. Non-neighbours may reuse a colour.
 */
export const ELO_REGION_PALETTE=Object.freeze(['#f5d56b','#83b5ee','#f09fbc','#71cda3']);
export const ELO_REGION_MIN_DELTA_E=45; // CIELAB 1976, D65; not a colour-blindness guarantee.
const cache=new WeakMap();
const linear=v=>(v/=255)<=.04045?v/12.92:((v+.055)/1.055)**2.4;
const rgb=hex=>hex.slice(1).match(/../g).map(x=>parseInt(x,16));
export function eloColorLab(hex){
 const [r,g,b]=rgb(hex).map(linear),f=t=>t>216/24389?Math.cbrt(t):(24389/27*t+16)/116;
 const x=f((.4124564*r+.3575761*g+.1804375*b)/.95047),y=f(.2126729*r+.7151522*g+.072175*b),z=f((.0193339*r+.119192*g+.9503041*b)/1.08883);
 return [116*y-16,500*(x-y),200*(y-z)];
}
export function eloColorDistance(a,b){const x=eloColorLab(a),y=eloColorLab(b);return Math.hypot(...x.map((v,i)=>v-y[i]));}
export function eloTextContrast(color,text='#344633'){
 const luminance=hex=>{const [r,g,b]=rgb(hex).map(linear);return .2126*r+.7152*g+.0722*b;};
 const a=luminance(color),b=luminance(text);return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);
}
export function eloRegionAdjacency(level){
 const {rows,cols,regions}=level,count=Math.max(...regions)+1,graph=Array.from({length:count},()=>new Set());
 const join=(a,b)=>{if(a!==b){graph[a].add(b);graph[b].add(a);}};
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const i=y*cols+x;if(x+1<cols)join(regions[i],regions[i+1]);if(y+1<rows)join(regions[i],regions[i+cols]);}
 return graph.map(neighbors=>[...neighbors].sort((a,b)=>a-b));
}
const distances=ELO_REGION_PALETTE.map(a=>ELO_REGION_PALETTE.map(b=>eloColorDistance(a,b)));
function fourColor(graph){
 const assigned=Array(graph.length).fill(-1),uses=Array(4).fill(0);let visits=0;
 function search(left){
  if(!left)return true;visits++;
  let region=-1,saturation=-1,degree=-1;
  for(let r=0;r<graph.length;r++)if(assigned[r]<0){const s=new Set(graph[r].map(n=>assigned[n]).filter(n=>n>=0)).size;if(s>saturation||s===saturation&&graph[r].length>degree){region=r;saturation=s;degree=graph[r].length;}}
  const adjacent=graph[region].map(n=>assigned[n]).filter(c=>c>=0),forbidden=new Set(adjacent);
  // First try the largest perceptual separation from the already coloured neighbours.
  const candidates=[0,1,2,3].filter(c=>!forbidden.has(c));
  candidates.sort((a,b)=>{const separation=c=>adjacent.length?Math.min(...adjacent.map(n=>distances[c][n])):0;return separation(b)-separation(a)||uses[a]-uses[b]||a-b;});
  // Colour names are interchangeable before the first assignment.
  if(left===graph.length)candidates.splice(1);
  for(const c of candidates){assigned[region]=c;uses[c]++;if(search(left-1))return true;uses[c]--;assigned[region]=-1;}
  return false;
 }
 return {indices:search(graph.length)?assigned:null,visits};
}
function invalidGraphFallback(graph){
 // Unvalidated disconnected regions may form a non-planar graph. Never alias a
 // neighbouring colour: use a deterministic distinct fallback and report the
 // measured threshold, rather than silently claiming the planar guarantee.
 const candidates=[...ELO_REGION_PALETTE];
 for(const r of [128,160,192,224,255])for(const g of [128,160,192,224,255])for(const b of [128,160,192,224,255]){
  const hex='#'+[r,g,b].map(n=>n.toString(16).padStart(2,'0')).join('');if(eloTextContrast(hex)>=4.5&&!candidates.includes(hex))candidates.push(hex);
 }
 const colors=[];
 for(let region=0;region<graph.length;region++){
  const neighbors=graph[region].filter(n=>n<region).map(n=>colors[n]);
  const available=candidates.filter(c=>!neighbors.includes(c));
  available.sort((a,b)=>{const score=c=>neighbors.length?Math.min(...neighbors.map(n=>eloColorDistance(c,n))):0;return score(b)-score(a)||candidates.indexOf(a)-candidates.indexOf(b);});
  colors.push(available[0]??'#fffefa');
 }
 return colors;
}
export function eloRegionColorReport(level){
 const signature=`${level.rows}x${level.cols}:${level.regions.join(',')}`;
 const old=cache.get(level);if(old?.signature===signature)return old.report;
 const graph=eloRegionAdjacency(level),result=fourColor(graph),fallback=result.indices===null;
 const colors=Object.freeze(fallback?invalidGraphFallback(graph):result.indices.map(c=>ELO_REGION_PALETTE[c]));
 let minDeltaE=Infinity,edges=0,adjacentDuplicates=0;
 graph.forEach((neighbors,r)=>neighbors.forEach(n=>{if(n>r){edges++;minDeltaE=Math.min(minDeltaE,eloColorDistance(colors[r],colors[n]));if(colors[r]===colors[n])adjacentDuplicates++;}}));
 const report=Object.freeze({colors,edges,minDeltaE,minimumTextContrast:Math.min(...colors.map(c=>eloTextContrast(c))),passesThreshold:minDeltaE>=ELO_REGION_MIN_DELTA_E&&adjacentDuplicates===0,fallback,searchNodes:result.visits,adjacentDuplicates});
 cache.set(level,{signature,report});return report;
}
export function eloRegionColors(level){return eloRegionColorReport(level).colors;}

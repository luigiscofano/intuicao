/** ELO presentation only: unique colours where possible on the shared-edge graph.
 * Valid campaign/import/endless regions are connected planar map regions.
 * The exact four-colour safety fallback has no budget cutoff; unique-colour
 * search is bounded to keep interaction responsive on adversarial input.
 * IDs, cells, clues and solutions are never mutated. Non-neighbours may reuse a colour.
 */
// Exact PRUMO tones, copied without tinting; the regression test checks its source palette.
export const PRUMO_REGION_PALETTE=Object.freeze(['#a9d69b','#c6b0e4','#f0bf80','#91cbd9','#e3d173','#e7a4a0','#aabfe3','#86cbbb','#d5b18b','#b9a4da']);
// Maximin quartet among all210 subsets: gold, salmon, sea-green and lilac.
// Its weakest pair is ΔE76=37.140044; a45 threshold is impossible for four
// mutually adjacent regions with the unchanged PRUMO palette.
export const ELO_REGION_BASE_PALETTE=Object.freeze([4,5,7,9].map(i=>PRUMO_REGION_PALETTE[i]));
// Preserve all ten PRUMO tones and add soft, light colours in the same family.
// Every colour contrasts >=4.5:1 against the existing region lettering.
export const ELO_REGION_PALETTE=Object.freeze([
 ...ELO_REGION_BASE_PALETTE,...PRUMO_REGION_PALETTE.filter(c=>!ELO_REGION_BASE_PALETTE.includes(c)),
 '#f098c8','#f0c0d8','#80e8b8','#d8d8b0','#d8a0f0','#c8e088',
 '#f0a080','#c8c080','#a0b890','#98b0f0','#b8e0c0','#80c8f0',
 '#80c880','#80c098','#f0b8f0','#e8a0b8','#80e8e0','#f0c0b0'
]);
export const ELO_REGION_MIN_DELTA_E=37; // CIELAB 1976, D65; not a colour-blindness guarantee.
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
// First seek a different colour for every region, while retaining the same
// hard perceptual boundary constraint. MRV + future-neighbour freedom ordering
// keep the bounded search fast; fallback never sacrifices valid-map contrast.
function uniqueColor(graph){
 const assigned=Array(graph.length).fill(-1),used=new Set();let visits=0;
 function allowed(region,color){return !used.has(color)&&graph[region].every(n=>assigned[n]<0||distances[color][assigned[n]]>=ELO_REGION_MIN_DELTA_E);}
 function search(left){
  if(!left)return true;if(++visits>12000)return false;
  let region=-1,choices=null;
  for(let r=0;r<graph.length;r++)if(assigned[r]<0){const available=ELO_REGION_PALETTE.map((_,i)=>i).filter(c=>allowed(r,c));if(!available.length)return false;if(choices===null||available.length<choices.length||available.length===choices.length&&graph[r].length>graph[region].length){region=r;choices=available;}}
  const freedom=color=>graph[region].filter(n=>assigned[n]<0).reduce((sum,n)=>sum+ELO_REGION_PALETTE.filter((_,c)=>c!==color&&distances[color][c]>=ELO_REGION_MIN_DELTA_E&&allowed(n,c)).length,0);
  const scores=new Map(choices.map(c=>[c,freedom(c)]));choices.sort((a,b)=>scores.get(b)-scores.get(a)||a-b);
  for(const c of choices){assigned[region]=c;used.add(c);if(search(left-1))return true;used.delete(c);assigned[region]=-1;}
  return false;
 }
 return {indices:graph.length<=ELO_REGION_PALETTE.length&&search(graph.length)?assigned:null,visits};
}
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
 // Only unvalidated/disconnected maps can reach this fallback. Keep the exact
 // PRUMO colours even here and report threshold/duplicate failures explicitly;
 // do not invent extra tones or silently promise contrast for an invalid map.
 const candidates=[...PRUMO_REGION_PALETTE];
 const colors=[];
 for(let region=0;region<graph.length;region++){
  const neighbors=graph[region].filter(n=>n<region).map(n=>colors[n]);
  const available=candidates.filter(c=>!neighbors.includes(c));
  available.sort((a,b)=>{const score=c=>neighbors.length?Math.min(...neighbors.map(n=>eloColorDistance(c,n))):0;return score(b)-score(a)||candidates.indexOf(a)-candidates.indexOf(b);});
  colors.push(available[0]??candidates[region%candidates.length]);
 }
 return colors;
}
export function eloRegionColorReport(level){
 const signature=`${level.rows}x${level.cols}:${level.regions.join(',')}`;
 const old=cache.get(level);if(old?.signature===signature)return old.report;
 const graph=eloRegionAdjacency(level),unique=uniqueColor(graph),result=unique.indices?unique:fourColor(graph),fallback=result.indices===null;
 const colors=Object.freeze(fallback?invalidGraphFallback(graph):result.indices.map(c=>ELO_REGION_PALETTE[c]));
 let minDeltaE=Infinity,edges=0,adjacentDuplicates=0;
 graph.forEach((neighbors,r)=>neighbors.forEach(n=>{if(n>r){edges++;minDeltaE=Math.min(minDeltaE,eloColorDistance(colors[r],colors[n]));if(colors[r]===colors[n])adjacentDuplicates++;}}));
 const report=Object.freeze({colors,edges,minDeltaE,minimumTextContrast:Math.min(...colors.map(c=>eloTextContrast(c))),passesThreshold:minDeltaE>=ELO_REGION_MIN_DELTA_E&&adjacentDuplicates===0,fallback,searchNodes:unique.visits+(unique.indices?0:result.visits),adjacentDuplicates,uniqueRegions:new Set(colors).size,regionCount:graph.length,varietyComplete:new Set(colors).size===graph.length});
 cache.set(level,{signature,report});return report;
}
export function eloRegionColors(level){return eloRegionColorReport(level).colors;}

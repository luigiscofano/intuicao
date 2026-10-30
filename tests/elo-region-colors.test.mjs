import assert from 'node:assert/strict';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {generateCollectionEndless} from '../dist/endless-collection.mjs';
import {normalizeCollectionLevel,COLLECTION_JSON_EXAMPLES} from '../dist/collection-json.mjs';
import {eloRegionColors,eloRegionAdjacency,eloRegionColorReport,ELO_REGION_MIN_DELTA_E} from '../dist/elo-region-colors.mjs';
const start=performance.now(),summary={campaigns:0,endless:0,normalizedImports:0,borders:0,minDeltaE:Infinity,minTextContrast:Infinity,maxSearchNodes:0};
function check(level,kind){
 const snapshot=JSON.stringify(level),report=eloRegionColorReport(level),colors=eloRegionColors(level);
 assert.equal(JSON.stringify(level),snapshot,'colouring must not mutate any game data');
 assert.equal(report.fallback,false,'valid planar region map uses exact four-colour result');
 assert.equal(report.passesThreshold,true);assert.equal(report.adjacentDuplicates,0);
 assert.ok(report.minDeltaE>=ELO_REGION_MIN_DELTA_E);assert.ok(report.minimumTextContrast>=4.5);
 const copy=JSON.parse(snapshot);assert.deepEqual(eloRegionColors(copy),colors,'deterministic independent of object identity');
 assert.equal(eloRegionColors(level),colors,'cached result stays stable');
 const graph=eloRegionAdjacency(level);for(let r=0;r<graph.length;r++)for(const n of graph[r])assert.notEqual(colors[r],colors[n]);
 summary[kind]++;summary.borders+=report.edges;summary.minDeltaE=Math.min(summary.minDeltaE,report.minDeltaE);summary.minTextContrast=Math.min(summary.minTextContrast,report.minimumTextContrast);summary.maxSearchNodes=Math.max(summary.maxSearchNodes,report.searchNodes);
}
assert.equal(GEOMETRY_LEVELS.elo.length,80);for(const level of GEOMETRY_LEVELS.elo)check(level,'campaigns');
for(const size of [4,5,6,7,8,9,10])for(const regions of [4,6,8])for(const fixed of [true,false])for(let seed=0;seed<20;seed++){
 const generated=generateCollectionEndless('elo',`colour-regression-${seed}`,{size,regions,fixed});check(generated.level,'endless');
 // Imported levels share the same adjacency path; exercise the actual JSON normalizer.
 if(size<=7&&seed<4)check(normalizeCollectionLevel(generated.level,'elo'),'normalizedImports');
}
check(normalizeCollectionLevel(COLLECTION_JSON_EXAMPLES.elo,'elo'),'normalizedImports');
// Connected flood partitions stress imported topologies all the way to16 regions.
for(let seed=1;seed<=160;seed++){
 let x=seed;const random=()=>{x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296;};
 const rows=7,cols=7,count=1+seed%16,regions=Array(49).fill(-1),front=[];
 const neighbours=i=>[i>=7?i-7:-1,i<42?i+7:-1,i%7?i-1:-1,i%7<6?i+1:-1].filter(n=>n>=0);
 const available=Array.from({length:49},(_,i)=>i);for(let r=0;r<count;r++){const j=Math.floor(random()*available.length),cell=available.splice(j,1)[0];regions[cell]=r;for(const n of neighbours(cell))front.push([n,r]);}
 while(front.length){const j=Math.floor(random()*front.length),[cell,r]=front[j];front[j]=front.at(-1);front.pop();if(regions[cell]>=0)continue;regions[cell]=r;for(const n of neighbours(cell))if(regions[n]<0)front.push([n,r]);}
 check(normalizeCollectionLevel({game:'elo',rows,cols,regions,fixed:{}},'elo'),'normalizedImports');
}
// Disconnected unvalidated input can encode K5, unlike an accepted map.
const pairs=[];for(let a=0;a<5;a++)for(let b=a+1;b<5;b++)pairs.push(a,b);
const invalid={game:'elo',rows:5,cols:4,regions:pairs,fixed:{}};
assert.throws(()=>normalizeCollectionLevel(invalid,'elo'),/conectada/);
const fallback=eloRegionColorReport(invalid);assert.equal(fallback.fallback,true);assert.equal(fallback.adjacentDuplicates,0);assert.deepEqual(eloRegionColors(structuredClone(invalid)),fallback.colors);
assert.equal(fallback.passesThreshold,fallback.minDeltaE>=ELO_REGION_MIN_DELTA_E,'fallback reports its measured limit honestly');
// Extreme invalid K16 cannot meet the four-colour promise; diagnostics must not hide it.
const crowded=[];for(let a=0;a<16;a++)for(let b=a+1;b<16;b++)crowded.push(a,b);
const crowdedReport=eloRegionColorReport({rows:15,cols:16,regions:crowded});
assert.equal(crowdedReport.fallback,true);assert.equal(crowdedReport.adjacentDuplicates,0);assert.equal(crowdedReport.passesThreshold,false);
// A diagonal-only touch is not a shared boundary.
assert.deepEqual(eloRegionAdjacency({rows:2,cols:2,regions:[0,1,2,3]}),[[1,2],[0,3],[0,3],[1,2]]);
console.log(JSON.stringify({...summary,threshold:ELO_REGION_MIN_DELTA_E,fallbackMinDeltaE:fallback.minDeltaE,durationMs:Math.round(performance.now()-start)},null,2));

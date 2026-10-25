// Portable campaign accounting; metadata does not prove pedagogical quality.
import crypto from 'node:crypto';
import {isMain, readJSON, artifactURL, printReport} from './light-v4-artifacts.mjs';

const sha = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const COLORS = ['gold', 'blue', 'pink'];
const TRANSFORMS = [[1,0,0,1],[-1,0,0,1],[1,0,0,-1],[-1,0,0,-1],[0,1,1,0],[0,-1,1,0],[0,1,-1,0],[0,-1,-1,0]];
const permutations = a => a.length ? a.flatMap((x,i) => permutations(a.filter((_,j)=>i!==j)).map(r=>[x,...r])) : [[]];
const round = n => Math.round(n*1000)/1000;
const norm = (a,p) => round(((a%p)+p)%p);
function canonicalLevel(level) {
  const versions=[];
  for(const [a,b,c,d] of TRANSFORMS) for(const perm of permutations(COLORS)) {
    const colorMap = Object.fromEntries(COLORS.map((color,i)=>[color,perm[i]]));
    const point=p=>({x:a*p.x+b*p.y,y:c*p.x+d*p.y});
    const elements=[...level.objects,...level.sources,...level.targets,...(level.portals??[])].map(point);
    const minX=Math.min(...elements.map(p=>p.x)),minY=Math.min(...elements.map(p=>p.y));
    const location=p=>{const q=point(p);return [round(q.x-minX),round(q.y-minY)]};
    const orientation=(angle,period)=>{const r=angle*Math.PI/180;return norm(Math.atan2(c*Math.cos(r)+d*Math.sin(r),a*Math.cos(r)+b*Math.sin(r))*180/Math.PI,period)};
    const portals=level.portals??[];
    const partner=p=>portals.find(q=>q!==p&&q.id===p.pairId)??portals.find(q=>q!==p&&q.pairId===p.pairId);
    const sorted=items=>items.map(x=>JSON.stringify(x)).sort();
    versions.push(JSON.stringify({
      objects:sorted(level.objects.map(o=>o.type==='wall'?['wall',location(o),round(o.length),round(o.width??12),orientation(o.angle,180)]:['mirror',location(o),round(o.length)])),
      sources:sorted(level.sources.map(s=>[location(s),orientation(s.angle??0,360),colorMap[s.color]])),
      targets:sorted(level.targets.map(t=>[location(t),t.radius??22,colorMap[t.color]])),
      portals:sorted(portals.map(p=>[location(p),p.radius??16,p.colors?.map(x=>colorMap[x]).sort()??null,partner(p)?location(partner(p)):null]))
    }));
  }
  return versions.sort()[0];
}
export function geometrySignature(level) { return sha(canonicalLevel(level)); }
export function auditCampaign(records, { introEnd=30, complete=true }={}) {
  const bands=['basic','intermediate','advanced','master'];
  const counts=Object.fromEntries(bands.map(b=>[b,0]));
  const openCounts=Object.fromEntries(bands.map(b=>[b,0]));
  const noWalls=Object.fromEntries(bands.map(b=>[b,0]));
  const combinations=Object.fromEntries(bands.map(b=>[b,0]));
  const taggedButUncertifiedCombinations=Object.fromEntries(bands.map(b=>[b,0]));
  const conceptCounts=Object.fromEntries(bands.map(b=>[b,Object.fromEntries(Array.from({length:16},(_,i)=>[i+1,0]))]));
  const ids=new Set(), geometries=new Map(), signatures=new Map(), errors=[];
  const concepts=r=>[r.editorial.primaryConcept,...(r.editorial.complementaryConcepts??[])];
  records.forEach((r,i)=>{
    const l=r.level,b=l.campaignBand??r.editorial.suggestedBand;
    if(ids.has(l.id)) errors.push(`duplicate-id:${l.id}`); ids.add(l.id);
    if(!bands.includes(b)){errors.push(`invalid-band:${l.id}`);return;}
    counts[b]++;if(concepts(r).includes(7))openCounts[b]++;if(!l.objects.some(o=>o.type==='wall'))noWalls[b]++;if(new Set(concepts(r)).size>=2){if(r.editorial.combinationIsRelated===true)combinations[b]++;else taggedButUncertifiedCombinations[b]++;}else if(r.editorial.combinationIsRelated===true)errors.push(`related-combination-needs-two-concepts:${l.id}`);
    for(const c of new Set(concepts(r))){if(!(c>=1&&c<=16))errors.push(`invalid-concept:${l.id}:${c}`);else conceptCounts[b][c]++;}
    const g=geometrySignature(l);geometries.set(g,[...(geometries.get(g)??[]),l.id]);
    const s=r.editorial.logicalSignature;if(s)signatures.set(s,[...(signatures.get(s)??[]),l.id]);
    if(complete&&b!==(i<200?'basic':i<300?'intermediate':i<400?'advanced':'master'))errors.push(`band-position:${l.id}:${b}`);
    if(complete&&l.campaignNumber!==i+1)errors.push(`display-number:${l.id}:${l.campaignNumber}`);
    if(complete&&b!=='basic'&&(l.stage!=null||l.stageName))errors.push(`upper-didactic-subdivision:${l.id}`);
  });
  const exactGeometryDuplicates=[...geometries.values()].filter(ids=>ids.length>1);
  const equalLogicalSignatures=[...signatures.values()].filter(ids=>ids.length>1);
  const windows=[];
  for(let i=0;i<=records.length-10;i++){
    const slice=records.slice(i,i+10), main=new Set(slice.map(r=>r.editorial.primaryConcept)), idea7=slice.filter(r=>concepts(r).includes(7)).length;
    if(i+1>introEnd&&(main.size<5||idea7<3))windows.push({from:i+1,to:i+10,distinctPrimary:main.size,idea7});
  }
  const runs=[];for(let i=2;i<records.length;i++)if(records[i].editorial.primaryConcept===records[i-1].editorial.primaryConcept&&records[i].editorial.primaryConcept===records[i-2].editorial.primaryConcept)runs.push({ending:i+1,concept:records[i].editorial.primaryConcept});
  const blocks=[];for(let i=200;i<records.length;i+=50){const seen=new Set(records.slice(i,i+50).flatMap(concepts));blocks.push({from:i+1,to:Math.min(i+50,records.length),missingConcepts:Array.from({length:16},(_,j)=>j+1).filter(c=>!seen.has(c))});}
  if(complete){
    if(records.length!==500)errors.push('not-500-levels');
    for(const [band,want]of Object.entries({basic:200,intermediate:100,advanced:100,master:100}))if(counts[band]!==want)errors.push(`band-count:${band}:${counts[band]}`);
    for(const [band,want]of Object.entries({basic:80,intermediate:40,advanced:40,master:40}))if(openCounts[band]<want)errors.push(`idea7-quota:${band}:${openCounts[band]}`);
    for(const [band,want]of Object.entries({intermediate:70,advanced:80,master:90}))if(combinations[band]<want)errors.push(`combination-quota:${band}:${combinations[band]}`);
    if(records.filter(r=>concepts(r).includes(7)&&!r.level.objects.some(o=>o.type==='wall')).length<100)errors.push('zero-wall-idea7-quota');
    for(const band of bands)for(let c=1;c<=16;c++)if(!conceptCounts[band][c])errors.push(`missing-band-concept:${band}:${c}`);
    for(const block of blocks)if(block.missingConcepts.length)errors.push(`block-coverage:${block.from}:${block.missingConcepts}`);
    if(runs.length)errors.push('three-consecutive-same-primary');
    if(windows.length)errors.push('ten-level-variety-windows');
    if(exactGeometryDuplicates.length)errors.push('symmetry-color-translation-duplicates');
  }
  return {passed:!errors.length,total:records.length,errors,counts,openCounts,noWalls,combinations,taggedButUncertifiedCombinations,conceptCounts,blocks,windows,runs,exactGeometryDuplicates,equalLogicalSignatures,limits:'Exact geometric duplicates normalize rotations/reflections, color permutations and translations. Different geometry or different metadata is not itself a proof of pedagogical novelty; logical signatures require editorial review. Concept counts require editorial review; a combination counts only with two or more concepts and editorial.combinationIsRelated === true. The flag is a review decision, not an automatic proof of causal dependence.'};
}
if (isMain(import.meta.url)) {
  try {
    const input = process.argv.slice(2).find(arg => !arg.startsWith('--'));
    const records = readJSON(input ?? artifactURL('evidence-records.json.gz'));
    if (!Array.isArray(records)) throw new Error('Expected an array of evidence records.');
    const result = auditCampaign(records, { complete: !process.argv.includes('--candidates') });
    printReport(result);
    if (!result.passed) process.exitCode = 1;
  } catch (error) {
    printReport({passed:false,error:error.message,limitations:'Audit did not complete; no campaign approval is implied.'});
    process.exitCode = 1;
  }
}

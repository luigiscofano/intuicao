import fs from'node:fs';import{traceLightWorld}from'../dist/light-world.mjs';import{applyAngles,auditRecord}from'./reflexos80-independent.mjs';import{auditSpace}from'./reflexos-spacious-space.mjs';
const records=JSON.parse(fs.readFileSync('dist/development/reflexos80/records.json')),results=[];
for(const n of[64,78]){let best=null,bestScore=-Infinity;let tested=0,physicsPass=0;const base=records[n-1];
for(const scale of[1.15,1.2,1.25,1.3,1.35,1.4])for(const offset of[30,31.2,32,33,34,35,36])for(const dy of[-15,0,15]){
 tested++;const r=structuredClone(base),l=r.level;for(const group of[l.sources,l.targets,l.objects,l.portals])for(const p of group){p.x=400+(p.x-400)*scale;p.y=230+(p.y-230)*scale+dy;}
 l.sources[0].y=230-offset+dy;l.sources[1].y=230+offset+dy;l.targets[0].x=400-offset;l.targets[1].x=400+offset;
 l.portals.find(p=>p.id==='Ga').y=l.sources[0].y;l.portals.find(p=>p.id==='Ba').y=l.sources[1].y;
 if([...l.sources,...l.targets,...l.portals].some(p=>p.x<30||p.x>770||p.y<30||p.y>430))continue;
 if(r.cases.filter(c=>c.expectedStatus!=='miss').some(c=>{const s=applyAngles(l,c.angles);if(c.sourceIndices)s.sources=c.sourceIndices.map(i=>s.sources[i]);return traceLightWorld(s).status!==c.expectedStatus;}))continue;
 const a=auditRecord(r);if(a.issues.length||!a.witnesses.length||a.metrics.minIncidence<30)continue;const m=a.perturbation.minima;if(m.minMirrorEndpointMargin<10||['minWallClearance','minTargetTransverseMargin','minPortalTransverseMargin','minDifferentColorPathDistance'].some(k=>m[k]!=null&&m[k]<5))continue;physicsPass++;
 const sp=auditSpace(r),score=Math.min(sp.initial.minimum,sp.reference.minimum,sp.perturbations.minimum);if(score>bestScore){bestScore=score;best={record:r,audit:a,space:sp,edits:{scale,offset,dy}};}
}
results.push({number:n,best,tested,physicsPass});}
fs.writeFileSync('tests/reflexos-spacious-shared-candidates.json',JSON.stringify(results,null,2));console.log(results.map(r=>({n:r.number,best:r.best?.edits,score:r.best?.space.reference.minimum,tested:r.tested,physicsPass:r.physicsPass})));

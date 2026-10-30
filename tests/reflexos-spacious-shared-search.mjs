import fs from'node:fs';import{traceLightWorld}from'../dist/light-world.mjs';import{applyAngles,auditRecord}from'./reflexos80-independent.mjs';import{auditSpace,spacing}from'./reflexos-spacious-space.mjs';
const records=JSON.parse(fs.readFileSync('dist/development/reflexos80/records.json'));
const shift=(p,angle,t)=>{p.x+=Math.cos(angle*Math.PI/180)*t;p.y+=Math.sin(angle*Math.PI/180)*t;};
const results=[];
for(const n of[64,78]){const base=records[n-1],attempts=[];let best=null,bestScore=-Infinity;
for(const ka of[10,20,30,40,50,60,70,-10,-20])for(const kb of[10,20,30,40,50]){
 const r=structuredClone(base),l=r.level;shift(l.portals.find(p=>p.id==='Ka'),-120.8,ka);shift(l.portals.find(p=>p.id==='Kb'),-120.8,kb);
 const checks=r.cases.filter(c=>c.expectedStatus!=='miss').map(c=>{const s=applyAngles(l,c.angles);if(c.sourceIndices)s.sources=c.sourceIndices.map(i=>s.sources[i]);return traceLightWorld(s).status===c.expectedStatus;});if(checks.some(v=>!v))continue;
 const a=auditRecord(r);if(a.issues.length||!a.witnesses.length||a.metrics.minIncidence<30)continue;
 const m=a.perturbation.minima;if(m.minMirrorEndpointMargin<10||['minWallClearance','minTargetTransverseMargin','minPortalTransverseMargin','minDifferentColorPathDistance'].some(k=>m[k]!=null&&m[k]<5))continue;
 const sp=auditSpace(r),score=Math.min(sp.initial.minimum,sp.reference.minimum,sp.perturbations.minimum);attempts.push({ka,kb,score});if(score>bestScore){bestScore=score;best={record:r,audit:a,space:sp,edits:{ka,kb}};}
}
results.push({number:n,best,attempts});}
fs.writeFileSync('tests/reflexos-spacious-shared-candidates.json',JSON.stringify(results,null,2));console.log(results.map(r=>({n:r.number,best:r.best?.edits,score:r.best?.space.reference.minimum,attempts:r.attempts.length})));

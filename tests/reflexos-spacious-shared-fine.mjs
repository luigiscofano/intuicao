import fs from'node:fs';import{traceLightWorld}from'../dist/light-world.mjs';import{applyAngles,auditRecord}from'./reflexos80-independent.mjs';import{auditSpace}from'./reflexos-spacious-space.mjs';
const seeds=JSON.parse(fs.readFileSync('/tmp/shared-seed.json')),out=[];
for(const seed of seeds){let best=seed.best,score=Math.min(best.space.initial.minimum,best.space.reference.minimum,best.space.perturbations.minimum),tested=0,pass=0;
for(const offset of[36,36.25,36.5])for(const dx of[-4.5,-4,-3.5,-3,-2.5,-2])for(const dy of[2,2.5,3,3.5,4,4.5]){tested++;const r=structuredClone(seed.best.record),l=r.level,y=l.objects[0].y;
l.sources[0].y=y-offset;l.sources[1].y=y+offset;l.targets[0].x=400-offset;l.targets[1].x=400+offset;l.portals.find(p=>p.id==='Ga').y=l.sources[0].y;l.portals.find(p=>p.id==='Ba').y=l.sources[1].y;l.portals[4].x+=dx;l.portals[4].y+=dy;
if(r.cases.filter(c=>c.expectedStatus!=='miss').some(c=>{const s=applyAngles(l,c.angles);if(c.sourceIndices)s.sources=c.sourceIndices.map(i=>s.sources[i]);return traceLightWorld(s).status!==c.expectedStatus;}))continue;
const a=auditRecord(r);if(a.issues.length||!a.witnesses.length||a.metrics.minIncidence<30)continue;const m=a.perturbation.minima;if(m.minMirrorEndpointMargin<10||['minWallClearance','minTargetTransverseMargin','minPortalTransverseMargin','minDifferentColorPathDistance'].some(k=>m[k]!=null&&m[k]<5))continue;pass++;
const sp=auditSpace(r),q=Math.min(sp.initial.minimum,sp.reference.minimum,sp.perturbations.minimum);if(q>score){score=q;best={record:r,audit:a,space:sp,edits:{...seed.best.edits,offset,portalKaDelta:{dx,dy}}};}}
out.push({number:seed.number,best,tested,physicsPass:pass});}
fs.writeFileSync('tests/reflexos-spacious-shared-candidates.json',JSON.stringify(out,null,2));console.log(out.map(r=>({n:r.number,edits:r.best.edits,min:r.best.space.reference.minimum,minEnd:r.best.audit.perturbation.minima.minMirrorEndpointMargin,tested:r.tested,pass:r.physicsPass})));

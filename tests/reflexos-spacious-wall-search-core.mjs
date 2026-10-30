import fs from 'node:fs';import {traceLightWorld,lightSegmentIntersection} from '../dist/light-world.mjs';import {applyAngles,metrics} from './reflexos80-independent.mjs';
const records=JSON.parse(fs.readFileSync('dist/development/reflexos80/records.json')),prior=JSON.parse(fs.readFileSync('tests/reflexos80-independent-validation.json')).levels;
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),ps=(p,a,b)=>{const d={x:b.x-a.x,y:b.y-a.y},t=Math.max(0,Math.min(1,((p.x-a.x)*d.x+(p.y-a.y)*d.y)/(d.x*d.x+d.y*d.y||1)));return dist(p,{x:a.x+t*d.x,y:a.y+t*d.y})},sd=(a,b,c,d)=>lightSegmentIntersection(a,b,c,d)?0:Math.min(ps(a,c,d),ps(b,c,d),ps(c,a,b),ps(d,a,b));
const points=w=>w.rays.flatMap(r=>r.segments),ends=o=>{const a=o.angle*Math.PI/180,dx=Math.cos(a)*o.length/2,dy=Math.sin(a)*o.length/2;return[{x:o.x-dx,y:o.y-dy},{x:o.x+dx,y:o.y+dy}]};
const candidates=[];
for(const rec of records){const l=rec.level;if(l.number<13||l.objects.some(o=>o.type==='wall')||[18,29,40,52,64,78].includes(l.number))continue;const pa=prior.find(x=>x.id===l.id);if(!pa.witnesses.length)continue;
 const m=l.solution.length,probes=[l.solution,...l.solution.flatMap((_,i)=>[-.5,.5].map(d=>l.solution.map((a,j)=>a+(i===j?d:0)))),...Array.from({length:2**m},(_,b)=>l.solution.map((a,i)=>a+((b>>i&1)?.5:-.5)))];
 const refSegs=probes.flatMap(a=>points(traceLightWorld(applyAngles(l,a))));const witnessChoices=pa.witnesses.slice(0,8).map(w=>({w,segs:w.individualRoutes.flat()}));
 const objs=[...l.objects.map(o=>({p:o,r:o.length/2,type:'mirror'})),...l.sources.map(p=>({p,r:12,type:'source'})),...l.targets.map(p=>({p,r:p.radius??22,type:'target'})),...l.portals.map(p=>({p,r:p.radius??16,type:'portal'}))];
 const coreSegments=[];const coreSeen=new Set;for(const c of rec.cases){if(!c.angles||c.angles.length!==m)continue;const k=JSON.stringify(c.angles);if(coreSeen.has(k))continue;coreSeen.add(k);const st=applyAngles(l,c.angles);for(const src of l.sources){const w=traceLightWorld({...st,sources:[src]});if(w.status==='target')coreSegments.push(...points(w));}}
 const configs=[...rec.cases,...(rec.validation.finiteAngleCatalogue??[])],seen=new Set;let best=null;
 for(const c of configs){if(!c.angles||c.angles.length!==m)continue;const key=JSON.stringify(c.angles);if(seen.has(key))continue;seen.add(key);const s=applyAngles(l,c.angles),full=traceLightWorld(s);
  for(let si=0;si<l.sources.length;si++){const alone=traceLightWorld({...s,sources:[l.sources[si]]});if(alone.status!=='target')continue;
   for(const seg of alone.rays[0].segments){const length=dist(seg.a,seg.b);if(length<75)continue;
    for(const frac of [.25,.35,.45,.55,.65,.75]){const p={x:seg.a.x+(seg.b.x-seg.a.x)*frac,y:seg.a.y+(seg.b.y-seg.a.y)*frac};
     for(const len of [70,54,40]){const wall={type:'wall',x:p.x,y:p.y,length:len,width:12,angle:Math.atan2(seg.b.y-seg.a.y,seg.b.x-seg.a.x)*180/Math.PI+90},[a,b]=ends(wall);
      if(Math.min(a.x,b.x,a.y,b.y,800-a.x,800-b.x,460-a.y,460-b.y)<20)continue;
      const objectSpacing=Math.min(...objs.map(o=>ps(o.p,a,b)-o.r-6));if(objectSpacing<20)continue;
      const referenceClearance=Math.min(...refSegs.map(t=>sd(a,b,t.a,t.b)-6));if(referenceClearance<12)continue;
      if(coreSegments.some(t=>sd(a,b,t.a,t.b)<6.2))continue;
      const chosen=witnessChoices.find(q=>q.segs.every(t=>sd(a,b,t.a,t.b)>8));if(!chosen)continue;
      const altered={...l,objects:[...l.objects,wall]},withS=applyAngles(altered,c.angles),blocked=traceLightWorld({...withS,sources:[l.sources[si]]});if(blocked.status==='target'||blocked.rays[0].status!=='wall')continue;
      const ws=applyAngles(altered,chosen.w.angles),joint=traceLightWorld(ws),individual=ws.sources.map(source=>traceLightWorld({...ws,sources:[source]}));if(!joint.collisions.length||!individual.every(w=>w.status==='target'))continue;
      const failures=probes.filter(a=>traceLightWorld(applyAngles(altered,a)).status!=='target');if(failures.length)continue;
      const score=Math.min(objectSpacing,40)+Math.min(referenceClearance,40)+len/10+(full.status==='target'?8:0);
      if(!best||score>best.score)best={number:l.number,id:l.id,coreLocalPathsPreserved:coreSeen.size,wall,score,objectSpacing,referenceClearance,ablation:{caseId:c.id??c.origin??'catalogue',angles:c.angles,sourceIndex:si,color:l.sources[si].color,withoutWallIndividualStatus:alone.status,withoutWallJointStatus:full.status,withWallIndividualStatus:blocked.status,blockedRayStatus:blocked.rays[0].status,alternativeMirrorRoute:alone.rays[0].reflections.map(h=>h.objectIndex),alternativePortalRoute:alone.rays[0].teleports.map(t=>t.portalId),segment:seg},preservedConflictWitness:{caseId:chosen.w.caseId,angles:chosen.w.angles,individualStatuses:individual.map(w=>w.status),jointStatus:joint.status},perturbation:{tests:probes.length,failures:0},purpose:`A parede bloqueia uma chegada alternativa ${l.sources[si].color} antes válida isoladamente (${c.id??'catálogo'}), preservando a referência conjunta e outra contraprova completa de conflito. A ablação física verifica que a parede, não uma regra oculta, elimina esse percurso.`};
     }
    }
   }
  }
 }
 if(best){candidates.push(best);console.log('found',l.number,best.objectSpacing.toFixed(1),best.referenceClearance.toFixed(1));}
}
fs.writeFileSync('tests/reflexos-spacious-wall-core-candidates.json',JSON.stringify({count:candidates.length,candidates},null,2));console.log('DONE',candidates.length);

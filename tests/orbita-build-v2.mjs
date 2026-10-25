import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {CATALOG as previous} from '../dist/orbita/catalog.mjs';
import {createCandidateV2,designForNumberV2} from '../dist/orbita/generator-v2.mjs';
import {structuralSignature,authoredSignature,canonicalEncounterMatrix} from '../dist/orbita/diversity.mjs';
import {validateLevel,replay,initialState,isWon} from '../dist/orbita/engine.mjs';
import {validateOrbitaPresentation} from '../dist/orbita/ui.mjs';
const prefix=previous.slice(0,200),levels=[...prefix],seen=new Set(),attempts=[];
const prefixHash=createHash('sha256').update(JSON.stringify(prefix)).digest('hex');
for(let number=201;number<=1000;number++){
 const design=designForNumberV2(number);let accepted;
 for(let attempt=0;attempt<300;attempt++){
  const seed=(0x4f524232+Math.imul(number,2654435761)+Math.imul(attempt,2246822519))>>>0;
  const level=createCandidateV2(seed,{...design,family:attempt<100?design.family:['mesh','chain','circuit','satellites'][attempt%4],variant:design.variant+attempt*997});if(!level||!validateOrbitaPresentation(level).valid)continue;
  const signature=structuralSignature(level);if(seen.has(signature))continue;
  level.validation.signature=authoredSignature(level);level.validation.candidateAttempts=attempt+1;
  if(levels.slice(-3).every(l=>l.family===level.family)){
   const alternate=[level.authorship.baseTopologyFamily,...level.authorship.secondaryFamilies].find(f=>f!==level.family);
   if(!alternate)continue;
   level.authorship.secondaryFamilies=[level.family,...level.authorship.secondaryFamilies.filter(f=>f!==alternate)];level.family=alternate;level.authorship.primaryFamily=alternate;
  }
  seen.add(signature);accepted=level;attempts.push(attempt+1);break;
 }
 if(!accepted)throw Error('No accepted v2 candidate: '+JSON.stringify(design));
 levels.push(accepted);if(number%25===0)console.log('Órbita v2',number,'family',accepted.family,'attempts',attempts.at(-1));
}
const counts=xs=>xs.reduce((a,x)=>(a[x]=(a[x]??0)+1,a),{}),fresh=levels.slice(200);
const intersectionCount=l=>l.cells.filter(c=>l.rings.filter(r=>r.cells.includes(c.id)).length===2).length;
const bin=n=>n<=5?String(n):n<=7?'6–7':n<=10?'8–10':'11–14';
for(const l of levels){const v=validateLevel(l);if(!v.valid)throw Error(l.id+': '+v.errors.join('; '));if(isWon(l,initialState(l))||!replay(l,l.solution).solved)throw Error('Replay/start '+l.id);}
const ringCounts=counts(fresh.map(l=>l.rings.length)),intersectionBins=counts(fresh.map(l=>bin(intersectionCount(l))));
if(JSON.stringify(ringCounts)!==JSON.stringify({2:120,3:220,4:250,5:210}))throw Error('Ring quotas '+JSON.stringify(ringCounts));
for(const [key,n] of Object.entries({'2':100,'3':150,'4':170,'5':150,'6–7':130,'8–10':70,'11–14':30}))if(intersectionBins[key]!==n)throw Error('Intersection quota '+key);
const summary=group=>({count:group.length,rings:counts(group.map(l=>l.rings.length)),intersections:counts(group.map(intersectionCount)),families:counts(group.map(l=>l.family)),mechanics:counts(group.flatMap(l=>l.specialRules.map(s=>s.kind)))});
const matrices=counts(fresh.map(canonicalEncounterMatrix));
const requiredFamilies=['lens','braid-three','braid-many','chain','triangle','satellites','circuit','orbital-ladder','pinwheel','clover','reserve-orbit','nested','star-five','mesh','redundant-circuit','multiple-bottlenecks','inverted-encounters','mixed-lengths','step-network','separate-gears','alternative-sensor','cross-restoration','localized-effect','master-compact'];
const familyCoverage=Object.fromEntries(requiredFamilies.map(family=>[family,fresh.filter(l=>[l.family,...l.authorship.secondaryFamilies].includes(family)).map(l=>l.id)]));
for(const [family,ids] of Object.entries(familyCoverage))if(!ids.length)throw Error('Missing evidenced family '+family);
const report={version:2,total:1000,requiredFamiliesCovered:Object.keys(familyCoverage).length,familyCoverage,preservedPrefix:{count:200,sha256:prefixHash},replayed:1000,initiallySolved:0,newDefinitions:800,uniqueStructuralSignatures:seen.size,uniqueAuthoredSignatures:new Set(fresh.map(authoredSignature)).size,ringCounts,intersectionBins,exactIntersections:counts(fresh.map(intersectionCount)),families:counts(fresh.map(l=>l.family)),uniqueEncounterMatrices:Object.keys(matrices).length,maxEncounterMatrixReuse:Math.max(...Object.values(matrices)),encounterMatrixCounts:matrices,matrixReuseByRingAndIntersection:Object.fromEntries([...new Set(fresh.map(l=>l.rings.length+' rings / '+intersectionCount(l)+' shared'))].map(key=>{const group=fresh.filter(l=>l.rings.length+' rings / '+intersectionCount(l)+' shared'===key),hist=counts(group.map(canonicalEncounterMatrix));return [key,{levels:group.length,distinctMatrices:Object.keys(hist).length,maximumReuse:Math.max(...Object.values(hist)),interpretation:'Matrix multiplicity is constrained by connected-graph edge counts; cyclic gap sequences are audited separately.'}]})),physicalFamilies:counts(fresh.map(l=>l.authorship.baseTopologyFamily)),evidencedFamilies:counts(fresh.flatMap(l=>[l.family,...l.authorship.secondaryFamilies])),mechanics:counts(fresh.flatMap(l=>l.specialRules.map(r=>r.kind))),chapters:Array.from({length:32},(_,i)=>({chapter:i+9,...summary(fresh.slice(i*25,i*25+25))})),bands:['Intermediário','Avançado','Especialista','Expert','Mestre'].map(band=>({band,...summary(fresh.filter(l=>l.difficultyBand===band))})),levels:fresh.map(l=>({id:l.id,primaryFamily:l.family,secondaryFamilies:l.authorship.secondaryFamilies,concepts:l.concepts,complexity:l.validation.complexity})),maximumCandidateAttempts:Math.max(...attempts),notes:['Difficulty band ranges are predominant, not strict; chapter19 explicitly requires two rings. Exact quotas take priority.','Reference replay proves reachability, never optimality. Trivial search covers depth3 where completed.','Trace measurements are observed effects, not proofs that all valid solutions require them.','All structural signatures omit initial occupancy and symbol spelling. Authored signatures additionally encode goal placement and equivalence.', 'Family evidence distinguishes actual geometry, graph connectivity, and observations in the certified route; functional labels do not establish necessity in every solution.']};
await fs.writeFile(new URL('../dist/orbita/catalog.mjs',import.meta.url),'// Generated by tests/orbita-build-v2.mjs. First 200 preserved; every solution replays through engine.mjs.\nexport const CATALOG='+JSON.stringify(levels)+';\n');
await fs.writeFile(new URL('./orbita-v2-audit.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,levels:undefined,encounterMatrixCounts:undefined,chapters:undefined},null,2));

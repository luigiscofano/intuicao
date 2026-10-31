import assert from 'node:assert/strict';
import {CATALOG} from '../dist/orbita/catalog.mjs';
import {COMPACT_CAMPAIGN,CHANGED_PHASES,COMPACT_REPLACEMENT_REPORT} from '../dist/orbita/compact-catalog.mjs';
import {compactOrbitaAudit} from '../dist/orbita/presentation-fit.mjs';
import {validateLevel,replay,initialState,isWon,transition,stateKey} from '../dist/orbita/engine.mjs';
import {validateCircleGeometryV3} from '../dist/orbita/topology-circles-v3.mjs';
const flags=level=>[level.rings.some(r=>r.step===2),level.commands.some(c=>c.turns.length>1),level.commands.some(c=>c.requires.length>0)];
assert.equal(COMPACT_CAMPAIGN.length,80);assert.equal(CHANGED_PHASES.length,8);
const signatures=new Set(),ids=new Set();let minimum=Infinity;
for(let i=0;i<80;i++){
 const level=COMPACT_CAMPAIGN[i],old=CATALOG[i],changed=CHANGED_PHASES.includes(i+1);
 if(!changed)assert.equal(level,old);else{assert.notEqual(level.id,old.id);assert.equal(level.catalogVersion,5);assert.equal(level.editorialOrigin.replacesId,old.id);assert.equal(compactOrbitaAudit(old,265).valid,false);}
 assert.equal(level.editorialLevel,i+1);assert.equal(level.editorialTierIndex,old.editorialTierIndex);assert.deepEqual(flags(level),flags(old));
 assert.ok(validateLevel(level).valid,`engine ${i+1}`);assert.ok(validateCircleGeometryV3(level).valid,`circles ${i+1}`);assert.ok(replay(level,level.solution).solved,`certificate ${i+1}`);
 assert.ok(!isWon(level,initialState(level)),`not already solved ${i+1}`);
 const audit=compactOrbitaAudit(level,265);assert.ok(audit.valid,`fit ${i+1}: ${audit.minDistance}`);minimum=Math.min(minimum,audit.minDistance);
 assert.ok(!ids.has(level.id));ids.add(level.id);const exact=JSON.stringify([level.rings.map(r=>[r.cells,r.step]),level.initial,level.targets,level.commands]);assert.ok(!signatures.has(exact),`unique exact puzzle ${i+1}`);signatures.add(exact);
 if(changed)assert.ok(!CATALOG.some(other=>other.validation.signature===level.validation.signature),`no reused canonical puzzle ${i+1}`);
}
console.log(JSON.stringify({passed:true,campaign:80,changed:CHANGED_PHASES,unchangedReferences:72,uniqueSignatures:signatures.size,minCenterDistance:minimum,reports:COMPACT_REPLACEMENT_REPORT}));

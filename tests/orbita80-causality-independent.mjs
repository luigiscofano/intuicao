import fs from 'node:fs';
import assert from 'node:assert/strict';
import {CATALOG} from '../dist/orbita/catalog.mjs';
import {createEngine,replay,validateLevel} from '../dist/orbita/engine.mjs';
import {solve} from '../dist/orbita/analysis.mjs';
import {commandAblationEvidence,referencePermutationEvidence} from '../dist/orbita/design-evidence.mjs';
export function isolatedCommandOrbits(level){
 const e=createEngine(level);return level.commands.map(c=>{let s=e.initialState(),seen=new Set([e.key(s)]);for(let i=1;i<=10000;i++){
  const n=e.transition(s,{command:c.id,direction:1});if(!n.allowed)return {command:c.id,status:'blocked',states:seen.size};s=n.state;
  if(e.isWon(s))return {command:c.id,status:'solved',length:i,states:seen.size};const k=e.key(s);
  if(seen.has(k))return {command:c.id,status:'orbit-exhausted',states:seen.size};seen.add(k);
 }return {command:c.id,status:'inconclusive',states:seen.size};});
}
function trace(level){
 const e=createEngine(level);let s=e.initialState(),departed=new Set(),restored=new Set(),unlocked=new Set(),used=new Set(),moves=[];
 for(let i=0;i<level.solution.length;i++){
  const m=level.solution[i],n=e.transition(s,m);assert(n.allowed,`${level.id} illegal certificate ${i}`);
  const inverse=e.transition(n.state,{command:m.command,direction:-m.direction});assert(inverse.allowed&&e.key(inverse.state)===e.key(s),`${level.id} inverse ${i}`);
  for(const [cell,type] of Object.entries(level.targets)){if(s.occupancy[cell]===type&&n.state.occupancy[cell]!==type)departed.add(cell);if(departed.has(cell)&&n.state.occupancy[cell]===type)restored.add(cell);}
  for(const c of level.commands)if(!e.commandStatus(s,c.id).allowed&&e.commandStatus(n.state,c.id).allowed)unlocked.add(c.id);
  used.add(m.command);moves.push({command:m.command,direction:m.direction});s=n.state;
 }
 assert(e.isWon(s));
 const reverse=level.solution.slice().reverse().map(m=>({command:m.command,direction:-m.direction}));
 const shuffle=replay(level,reverse,{state:s});assert(shuffle.valid&&e.key(shuffle.state)===e.key(e.initialState()),`${level.id} reverse shuffle`);
 const permutation=referencePermutationEvidence(level);
 return {legalCertificate:true,immediateInverses:true,solvedToInitialLegalShuffle:true,commandsUsed:[...used],targetDepartures:departed.size,targetsRestored:restored.size,sensorsUnlocked:[...unlocked],localizedWindows:permutation.localizedSearch.found,localizedWitness:permutation.localizedCertificates[0]?{moves:permutation.localizedCertificates[0].moves,supportSize:permutation.localizedCertificates[0].supportSize}:null,interpretation:'Observed in certified route, not a proof that every solution needs these effects.'};
}
const summarize=r=>({status:r.status,reason:r.reason,visited:r.visited,minimumLength:r.optimal?r.solution?.length:undefined,lowerBound:r.lowerBound});
const levels=[];
for(let i=0;i<CATALOG.length;i++){
 const l=CATALOG[i];assert(validateLevel(l).valid);const e=createEngine(l);assert(!e.isWon(e.initialState()));
 const orbit=isolatedCommandOrbits(l);const observed=trace(l);
 const shortSearch=solve(l,undefined,{maxDepth:3,maxStates:10000,timeoutMs:250});
 const ablations=commandAblationEvidence(l,{maxDepth:5,maxStates:2500});
 const commandNecessityWitnesses=l.commands.flatMap(c=>{
  const moving=new Set(c.turns.flatMap(t=>l.rings.find(r=>r.id===t.ring).cells));
  const other=new Set(l.commands.filter(d=>d.id!==c.id).flatMap(d=>d.turns.flatMap(t=>l.rings.find(r=>r.id===t.ring).cells)));
  return Object.entries(l.targets).filter(([cell,type])=>moving.has(cell)&&!other.has(cell)&&l.initial[cell]!==type).map(([cell,type])=>({command:c.id,cell,initial:l.initial[cell],target:type,proof:'An initially mismatched target can be moved only by this command.'}));
 });
 const specialAblations=[];
 if(l.commands.some(c=>c.requires?.length)){
  const ungated=structuredClone(l);ungated.commands.forEach(c=>c.requires=[]);
  specialAblations.push({resource:'sensor-condition-removed',...summarize(solve(ungated,undefined,{maxDepth:5,maxStates:5000,timeoutMs:250})),interpretation:'Removing the condition tests an easier alternate rule, not necessity under the original rules.'});
 }
 if(l.rings.some(r=>r.step===2)){
  const unit=structuredClone(l);unit.rings.forEach(r=>r.step=1);
  specialAblations.push({resource:'step-two-replaced-by-unit',...summarize(solve(unit,undefined,{maxDepth:5,maxStates:5000,timeoutMs:250})),interpretation:'Counterfactual rule comparison; inconclusive is not impossible.'});
 }
 levels.push({number:i+1,id:l.id,origin:l.origin??l.authorship?.origin,orbits:orbit,observed,commandNecessityWitnesses,shortSearch:summarize(shortSearch),commandAblations:ablations.commands.map(({solution,...r})=>({...r,...(solution?{solutionLength:solution.length}:{} )})),specialAblations});
}
const unexpectedShortcuts=levels.filter(l=>l.number>4&&l.orbits.some(o=>o.status==='solved'));
const report={catalogLength:CATALOG.length,allCertificates:true,allImmediateInverses:true,allInitialUnsolved:true,allLegalReverseShuffles:true,deliberateDebutOrbits:levels.filter(l=>l.number<=4&&l.orbits.some(o=>o.status==='solved')).map(l=>l.number),unexpectedShortcuts:unexpectedShortcuts.map(l=>l.number),interpretation:'Bounded search reports only proved minima or explicit inconclusive results; reference features are observations, not necessity claims.',levels};
fs.writeFileSync(new URL('./orbita80-causality-independent.json',import.meta.url),JSON.stringify(report));
assert.equal(CATALOG.length,80,'Run against final 80-level catalog');assert.equal(unexpectedShortcuts.length,0,'Nonlesson isolated-command shortcut');
console.log(JSON.stringify({levels:levels.length,certificates:true,reverseShuffles:true,isolatedShortcuts:unexpectedShortcuts.length,referenceRestorations:levels.filter(l=>l.observed.targetsRestored).length,localized:levels.filter(l=>l.observed.localizedWindows).length,resourceSearches:levels.reduce((n,l)=>n+l.commandAblations.length+l.specialAblations.length,0)}));

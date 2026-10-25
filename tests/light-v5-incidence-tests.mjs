// Portable v5 finite-evidence incidence gate. No engine changes, authoring paths,
// implicit output files, browser access, or real user storage. Run from any cwd.
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {traceLightWorld} from '../dist/light-world.mjs';
import {readJSON, printReport, isMain} from './light-v4-artifacts.mjs';
export const artifactURL = name => new URL('../dist/development/reflexos-v5/' + name, import.meta.url);
export const MINIMUM_ANGLE=20, PREFERRED_ANGLE=30, DEGREE_EPSILON=1e-8;
const degrees=180/Math.PI, distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const below=(angle,threshold,epsilon=DEGREE_EPSILON)=>angle<threshold-epsilon;
const minimum=a=>a.length?Math.min(...a):null;
export function referenceState(level,angles=level.solution){let k=0;return {...structuredClone(level),objects:level.objects.map(o=>({...o,...(o.type==='mirror'?{angle:angles[k++]}:{})}))};}
export function reflectionMetrics(state,world,{selected=state.sources.map((_,i)=>i)}={}){
 return world.rays.flatMap((ray,ri)=>ray.reflections.map((r,ei)=>{
  const mirror=state.objects[r.objectIndex],a=mirror.angle/degrees,t={x:Math.cos(a),y:Math.sin(a)};
  // atan2 avoids acos' loss of precision near parallel/antiparallel vectors.
  // Absolute tangent dot makes the line angle acute; outgoing dot stays signed.
  const angle=Math.atan2(Math.abs(r.incoming.x*t.y-r.incoming.y*t.x),Math.abs(r.incoming.x*t.x+r.incoming.y*t.y))*degrees;
  const deflection=Math.atan2(Math.abs(r.incoming.x*r.outgoing.y-r.incoming.y*r.outgoing.x),r.incoming.x*r.outgoing.x+r.incoming.y*r.outgoing.y)*degrees;
  const segment=ray.segments.find(s=>distance(s.b,r.point)<1e-5&&Math.abs(s.endDistance-r.distance)<1e-5);
  if(!segment)throw Error('Physical incident segment not found.');
  if(Math.abs(deflection-2*angle)>1e-6)throw Error('Reflection identity failed.');
  return {sourceIndex:selected[ri],color:ray.color,reflectionIndex:ei,objectIndex:r.objectIndex,incidenceToLineDegrees:angle,deflectionDegrees:deflection,incidentLength:distance(segment.a,segment.b),sourceToMirrorCenterDistance:distance(ray.source,mirror),sourceToHitDistance:distance(ray.source,r.point),pathLengthToHit:r.distance,endpointMargin:mirror.length/2-distance(r.point,mirror),projectedWidth:mirror.length*Math.sin(angle/degrees),point:r.point,incoming:r.incoming,outgoing:r.outgoing};
 }));
}
const topology=world=>JSON.stringify(world.rays.map(r=>({status:r.status,mirrors:r.reflections.map(x=>x.objectIndex),portals:r.teleports.map(x=>x.portalId)})));
const eventSummary=(events,minAngle,preferredAngle,epsilon)=>({eventCount:events.length,minAngle:minimum(events.map(e=>e.incidenceToLineDegrees)),minEndpointMargin:minimum(events.map(e=>e.endpointMargin)),belowMinimum:events.filter(e=>below(e.incidenceToLineDegrees,minAngle,epsilon)).length,betweenMinimumAndPreferred:events.filter(e=>!below(e.incidenceToLineDegrees,minAngle,epsilon)&&below(e.incidenceToLineDegrees,preferredAngle,epsilon)).length});
const evidence=w=>({status:w.status,collisions:w.collisions.map(c=>({point:c.point,colors:c.colors,overlap:c.overlap})),rays:w.rays.map(r=>({color:r.color,status:r.status,mirrors:r.reflections.map(x=>x.objectIndex),portals:r.teleports.map(x=>x.portalId),segments:r.segments.map(s=>({a:s.a,b:s.b}))}))});
const complexity=w=>({reflections:w.rays.reduce((n,r)=>n+r.reflections.length,0),portalJumps:w.rays.reduce((n,r)=>n+r.teleports.length,0),operations:w.rays.reduce((n,r)=>n+r.reflections.length+r.teleports.length,0),physicalLength:w.rays.reduce((n,r)=>n+r.totalDistance,0),byRay:w.rays.map(r=>({color:r.color,reflections:r.reflections.length,portalJumps:r.teleports.length,physicalLength:r.totalDistance}))});
export function cataloguedConfigurations(record){
 const out=[],add=(items,origin,assumeTarget=false)=>{for(const [i,c]of (items??[]).entries()){
  if(!Array.isArray(c.angles)) throw Error('Current catalogue entry lacks angles: '+record.level.id+':'+origin+'['+i+']');
  out.push({...c,angles:c.angles,expectedStatus:c.expectedStatus??c.status??c.evidence?.status??c.result?.status??c.trace?.status??(assumeTarget?'target':undefined),sourceIndices:c.sourceIndices,origin:origin+'['+i+']'});
 }};
 add(record.validation?.angularRedesign?.knownConfigurations,'validation.angularRedesign.knownConfigurations');
 for(const k of ['configurations','solutions','winning','winningAlternatives']){
  let items=record.validation?.finiteShortcutSearch?.[k];
  if(k==='winningAlternatives')items=items?.map(c=>{
   if(Array.isArray(c.angles))return c;
   if(record.validation.finiteShortcutSearch.type!=='single mirror grid against solved remaining mirrors'||!Number.isInteger(c.mirror)||c.mirror<0||c.mirror>=record.level.solution.length||!Number.isFinite(c.angle))throw Error('Incomplete single-mirror finite winner: '+record.level.id);
   const angles=[...record.level.solution];angles[c.mirror]=c.angle;return {...c,angles};
  });
  add(items,'validation.finiteShortcutSearch.'+k,k!=='configurations');
 }
 for(const k of ['found','solutions','shortcuts'])add(record.validation?.finiteShortcutAudit?.[k],'validation.finiteShortcutAudit.'+k,true);
 add(record.validation?.finiteAngleCatalogue,'validation.finiteAngleCatalogue');
 add(record.validation?.documentedBinaryDomain,'validation.documentedBinaryDomain');
 const selectColors=colors=>colors.map(color=>{const indices=record.level.sources.flatMap((source,i)=>source.color===color?[i]:[]);if(indices.length!==1)throw Error('Ambiguous source color in finite catalogue: '+record.level.id+':'+color);return indices[0];});
 const explicitScope=c=>({...c,sourceIndices:c.sourceIndices??(c.evidence?.rays?.length&&c.evidence.rays.length!==record.level.sources.length?selectColors(c.evidence.rays.map(r=>r.color)):undefined)});
 add(record.validation?.angularRedesign?.afterCases?.map(explicitScope),'validation.angularRedesign.afterCases');
 for(const [i,detail]of (record.validation?.expandedAngularRelations?.details??[]).entries())if(detail.first)add([explicitScope(detail.first)],'validation.expandedAngularRelations.details['+i+'].first');
 const targetChange=record.validation?.sharedTargetChange;
 if(targetChange)for(const kind of ['base','variant']){
  const target=targetChange[kind+'Target'],current=target&&record.level.targets.find(t=>t.color===target.color);
  if(current&&['x','y','radius','color'].every(key=>current[key]===target[key]))add(targetChange[kind+'Catalogue'],'validation.sharedTargetChange.'+kind+'Catalogue');
 }
 for(const [i,paired]of (record.validation?.pairedMapDifferences??[]).entries()){
  const role=paired.changedLevelId===record.level.id?'changed':paired.baseLevelId===record.level.id?'base':null;
  if(role&&paired[role+'Result'])add([{...paired,evidence:paired[role+'Result'],expectedStatus:paired[role+'Result'].status}],'validation.pairedMapDifferences['+i+']');
 }
 for(const kind of ['oldStrategy','retainedStrategy']){
  const comparison=record.validation?.singleFilterComparison?.[kind];
  if(comparison?.after)add([{...comparison,evidence:comparison.after,expectedStatus:comparison.after.status}],'validation.singleFilterComparison.'+kind);
 }
 for(const [i,matrix]of (record.editorial?.choiceMatrices??[]).entries()){
  // Numeric compatibility matrices carry no angle configuration. Their actual
  // witnesses are inventoried/replayed from the separate finite angle catalogue.
  if(!Array.isArray(matrix.matrix))continue;
  const selected=selectColors(matrix.colors);
  const resolved=matrix.matrix?.map(c=>{
   if(Array.isArray(c.angles))return {...c,sourceIndices:c.sourceIndices??selected};
   const desired=matrix.colors.map((color,j)=>record.editorial.choiceDomains?.find(d=>d.color===color)?.alternatives?.[c.choices?.[j]]);
   if(desired.some(route=>!Array.isArray(route)))throw Error('Unresolved choice-domain routes: '+record.level.id);
   const candidates=record.validation?.finiteShortcutSearch?.configurations?.filter(x=>Array.isArray(x.angles)&&selected.every((source,j)=>JSON.stringify(x.routes?.[source])===JSON.stringify(desired[j])))??[];
   const candidate=candidates.find(x=>{const state=referenceState(record.level,x.angles);state.sources=selected.map(source=>state.sources[source]);return cachedEvidenceIssues(c,traceLightWorld(state)).length===0;});
   if(!candidate)throw Error('Choice matrix cannot be resolved to fresh matching finite-catalogue geometry: '+record.level.id+':'+i+':'+JSON.stringify(c.choices));
   return {...c,angles:candidate.angles,sourceIndices:selected};
  });
  add(resolved,'editorial.choiceMatrices['+i+'].matrix');
 }
 for(const key of ['longerRouteWarnings','knownExistingEquivalentRoutes','newRouteWinners','lowWinners'])add(record.incidenceRepair?.finiteAudit?.[key],'incidenceRepair.finiteAudit.'+key,true);
 add(record.validation?.finiteSweep?.strategies,'validation.finiteSweep.strategies',true);
 add(record.validation?.alternativeSolutions,'validation.alternativeSolutions',true);
 add(record.validation?.completeSampledReturnCheck?.winningItineraries,'validation.completeSampledReturnCheck.winningItineraries',true);
 for(const k of ['backwardDepartureAudit','lastApproachAudit'])add(record.editorial?.[k]?.solutions,'editorial.'+k+'.solutions',true);
 return out.map(c=>({...c,origin:c.origin.replace(/(\.first|\.oldStrategy|\.retainedStrategy|pairedMapDifferences\[\d+\])\[0\]$/,'$1')}));
}
export function auditIncidenceRecords(records,{minAngle=MINIMUM_ANGLE,preferredAngle=PREFERRED_ANGLE,epsilon=DEGREE_EPSILON,perturb=true,includeReplayGeometry=true}={}){
 if(!Array.isArray(records)||!records.length)throw Error('A nonempty array of records or levels is required.');
 if(minAngle!==MINIMUM_ANGLE||preferredAngle!==PREFERRED_ANGLE||epsilon!==DEGREE_EPSILON)throw Error('The v5 policy is fixed at 20 degrees, preferred 30, reporting epsilon 1e-8.');
 const ids=new Set();for(const raw of records){const id=(raw.level??raw).id;if(ids.has(id))throw Error('Duplicate level ID: '+id);ids.add(id);}
 const errors=[],reviewFindings=[],levels=[],referenceEvents=[],knownWinnerEvents=[],caseResults=[],catalogueResults=[],perturbations=[],metadataInventory=[];
 for(const raw of records){
  const record=raw.level?raw:{level:raw},level=record.level,mirrors=level.objects.filter(o=>o.type==='mirror');
  if(!level.id)throw Error('Level id is required.');
  if(!Array.isArray(level.solution)||level.solution.length!==mirrors.length||level.solution.some(x=>!Number.isFinite(x)))throw Error('Invalid solution angles: '+level.id);
  const state=referenceState(level),world=traceLightWorld(state),baseComplexity=complexity(world),sig=topology(world),ev=reflectionMetrics(state,world).map(e=>({levelId:level.id,campaignNumber:level.campaignNumber,band:level.campaignBand,caseId:'reference',caseScope:'full-world',...e}));
  referenceEvents.push(...ev);if(world.status!=='target')errors.push({id:level.id,type:'reference-not-solved',status:world.status});
  for(const e of ev.filter(e=>below(e.incidenceToLineDegrees,minAngle,epsilon)))errors.push({id:level.id,type:'reference-incidence',sourceIndex:e.sourceIndex,reflectionIndex:e.reflectionIndex,angle:e.incidenceToLineDegrees});
  let localWinnerCases=0,fullWinnerCases=0,conflictWitnesses=0;const witnesses=[];
  for(const c of record.cases??[]){
   const selected=c.sourceIndices??level.sources.map((_,i)=>i);
   if(!Array.isArray(selected)||!selected.length||new Set(selected).size!==selected.length||selected.some(i=>!Number.isInteger(i)||i<0||i>=level.sources.length))throw Error('Invalid source subset '+level.id+':'+c.id);
   if(!Array.isArray(c.angles)||c.angles.length!==mirrors.length||c.angles.some(a=>!Number.isFinite(a)))throw Error('Invalid case angles '+level.id+':'+c.id);
   const s=referenceState(level,c.angles);s.sources=selected.map(i=>s.sources[i]);const w=traceLightWorld(s),full=selected.length===level.sources.length;
   const isolated=selected.map((originalIndex,k)=>({sourceIndex:originalIndex,status:traceLightWorld({...s,sources:[s.sources[k]]}).status}));
   const witness=selected.length>=2&&w.status==='collision'&&isolated.every(r=>r.status==='target');
   if(witness){conflictWitnesses++;witnesses.push(c.id);}
   const routeComplexity=complexity(w),hardIncidence=full&&routeComplexity.operations<=baseComplexity.operations;
   const row={levelId:level.id,campaignNumber:level.campaignNumber,caseId:c.id,scope:full?'full-world':'source-subset',selected,expectedStatus:c.expectedStatus,actualStatus:w.status,statusMatched:w.status===c.expectedStatus,isolated,individuallyValidJointConflict:witness,routeComplexity,referenceComplexity:baseComplexity,incidenceClassification:hardIncidence?'hard-no-additional-route-operations':full?'review-longer-route':'review-local-route',...(includeReplayGeometry?{evidence:evidence(w)}:{})};
   if(!row.statusMatched)errors.push({id:level.id,type:'case-status',caseId:c.id,expected:c.expectedStatus,actual:w.status});
   for(const issue of cachedEvidenceIssues(c,w))errors.push({id:level.id,type:'case-stale-cached-evidence',caseId:c.id,...issue});
   if(w.status==='target'){
    full?fullWinnerCases++:localWinnerCases++;
    const metrics=reflectionMetrics(s,w,{selected}).map(e=>({levelId:level.id,campaignNumber:level.campaignNumber,band:level.campaignBand,caseId:c.id,caseScope:row.scope,incidenceClassification:row.incidenceClassification,...e}));
    knownWinnerEvents.push(...metrics);row.incidence=eventSummary(metrics,minAngle,preferredAngle,epsilon);
    for(const e of metrics.filter(e=>below(e.incidenceToLineDegrees,minAngle,epsilon)))(hardIncidence?errors:reviewFindings).push({id:level.id,type:'known-target-case-incidence',classification:row.incidenceClassification,scope:row.scope,caseId:c.id,sourceIndex:e.sourceIndex,reflectionIndex:e.reflectionIndex,angle:e.incidenceToLineDegrees});
   }
   caseResults.push(row);
  }
  const seenCatalogue=new Set();
  for(const c of cataloguedConfigurations(record)){
   if(c.angles.length!==mirrors.length||!c.angles.every(Number.isFinite))throw Error('Invalid catalogue angles '+level.id+':'+c.origin);
   const selected=c.sourceIndices??level.sources.map((_,i)=>i),key=JSON.stringify([selected,c.angles]),duplicate=seenCatalogue.has(key);seenCatalogue.add(key);
   if(!Array.isArray(selected)||!selected.length||new Set(selected).size!==selected.length||selected.some(i=>!Number.isInteger(i)||i<0||i>=level.sources.length))throw Error('Invalid catalogue source subset '+level.id+':'+c.origin);
   const s=referenceState(level,c.angles);s.sources=selected.map(i=>s.sources[i]);const w=traceLightWorld(s),routeComplexity=complexity(w),full=selected.length===level.sources.length,hardIncidence=full&&routeComplexity.operations<=baseComplexity.operations;
   const row={levelId:level.id,campaignNumber:level.campaignNumber,origin:c.origin,selected,duplicateAngles:duplicate,expectedStatus:c.expectedStatus,actualStatus:w.status,statusMatched:!c.expectedStatus||w.status===c.expectedStatus,routeComplexity,referenceComplexity:baseComplexity,incidenceClassification:hardIncidence?'hard-no-additional-route-operations':full?'review-longer-route':'review-local-route'};
   if(!row.statusMatched)errors.push({id:level.id,type:'catalogue-status-or-stale-evidence',origin:c.origin,expected:c.expectedStatus,actual:w.status});
   for(const issue of cachedEvidenceIssues(c,w))errors.push({id:level.id,type:'catalogue-stale-cached-evidence',origin:c.origin,...issue});
   if(w.status==='target'){
    const metrics=reflectionMetrics(s,w,{selected}).map(e=>({levelId:level.id,campaignNumber:level.campaignNumber,band:level.campaignBand,caseId:c.origin,caseScope:full?'full-world':'source-subset',incidenceClassification:row.incidenceClassification,...e}));row.incidence=eventSummary(metrics,minAngle,preferredAngle,epsilon);
    if(!duplicate){knownWinnerEvents.push(...metrics);for(const e of metrics.filter(e=>below(e.incidenceToLineDegrees,minAngle,epsilon)))(hardIncidence?errors:reviewFindings).push({id:level.id,type:'known-catalogue-winner-incidence',classification:row.incidenceClassification,origin:c.origin,sourceIndex:e.sourceIndex,reflectionIndex:e.reflectionIndex,angle:e.incidenceToLineDegrees});}
   }
   catalogueResults.push(row);
  }
  metadataInventory.push(...inventoryAngleMetadata(record));
  const concepts=[record.editorial?.primaryConcept,...(record.editorial?.complementaryConcepts??[])];
  if(concepts.includes(7)&&!conflictWitnesses)errors.push({id:level.id,type:'concept7-no-real-individually-valid-joint-conflict'});
  const perLevel={id:level.id,campaignNumber:level.campaignNumber,band:level.campaignBand,referenceStatus:world.status,reference:eventSummary(ev,minAngle,preferredAngle,epsilon),caseCount:record.cases?.length??0,fullWinnerCases,localWinnerCases,conflictWitnesses,witnessCaseIds:witnesses};
  if(perturb){
   const tests=[];
   const test=(angles,extra)=>{const s=referenceState(level,angles),w=traceLightWorld(s),metrics=reflectionMetrics(s,w),row={id:level.id,...extra,status:w.status,sameTopology:topology(w)===sig,minEndpointMargin:minimum(metrics.map(e=>e.endpointMargin)),minIncidence:minimum(metrics.map(e=>e.incidenceToLineDegrees))};tests.push(row);if(w.status!=='target')errors.push({id:level.id,type:'half-degree-perturbation',...extra,status:w.status});};
   for(let i=0;i<mirrors.length;i++)for(const delta of [-.5,.5]){const angles=[...level.solution];angles[i]+=delta;test(angles,{mode:'individual',mirrorOrdinal:i,delta});}
   if(mirrors.length>10)throw Error('Too many mirrors for exhaustive corner preservation gate: '+level.id);
   for(let mask=0;mask<2**mirrors.length;mask++)test(level.solution.map((a,i)=>a+(mask>>i&1?.5:-.5)),{mode:'simultaneous-corner',mask});
   perturbations.push(...tests);perLevel.halfDegree={tests:tests.length,failures:tests.filter(t=>t.status!=='target').length,topologyChanges:tests.filter(t=>!t.sameTopology).length,minEndpointMargin:minimum(tests.flatMap(t=>t.minEndpointMargin==null?[]:[t.minEndpointMargin])),minIncidence:minimum(tests.flatMap(t=>t.minIncidence==null?[]:[t.minIncidence]))};
  }
  levels.push(perLevel);
 }
 const fullCases=caseResults.filter(c=>c.expectedStatus==='target'&&c.scope==='full-world'),partialCases=caseResults.filter(c=>c.expectedStatus==='target'&&c.scope==='source-subset');
 return {passed:errors.length===0,policy:{minAngle,preferredAngle,epsilon,perturbationDegrees:perturb?.5:null,hardKnownWinnerScope:'Full-world known winner with no more total reflections plus portal jumps than the reference. Other winners are review findings. Operation count is only a bounded geometric simplicity proxy, not logical difficulty.',knownTargetCasesIncludeSourceSubsets:'measured and reported, not a hard angle gate'},scope:'Fresh runtime replay of references, all supplied cases, selected explicit current finite catalogues, each source in isolation for each case, and reference ±0.5 degree single and simultaneous-corner perturbations. Known successful subsets are local routes, not full-world solutions. Angles are measured against mirror lines, not normals. Near-boundary epsilon is only reporting noise guard, never a physics change.',limitations:['Finite documented routes and sampled perturbations, not a proof about all continuous configurations.','A real isolated/joint conflict certifies geometry, not obviousness, novelty, difficulty or causal necessity of every tagged concept.','Topology changes, endpoint margins, longer winners and local winners are diagnostics. Current metadata that claims a catalogue winner but no longer replays is a stale-evidence failure.','Existing independent geometry, UI, identity/history and editorial tests remain necessary.'],summary:{levelCount:levels.length,references:eventSummary(referenceEvents,minAngle,preferredAngle,epsilon),levelsBelowMinimum:levels.filter(l=>l.reference.belowMinimum).length,levelsBetweenMinimumAndPreferred:levels.filter(l=>l.reference.betweenMinimumAndPreferred).length,knownFullWinnerCaseCount:fullCases.length,knownLocalWinnerCaseCount:partialCases.length,knownWinnerEventSummary:eventSummary(knownWinnerEvents,minAngle,preferredAngle,epsilon),catalogueCount:catalogueResults.length,catalogueMismatches:catalogueResults.filter(c=>!c.statusMatched).length,caseCount:caseResults.length,caseMismatches:caseResults.filter(c=>!c.statusMatched).length,realConflictWitnessCount:caseResults.filter(c=>c.individuallyValidJointConflict).length,realConflictLevelCount:levels.filter(l=>l.conflictWitnesses).length,halfDegreeTests:perturbations.length,halfDegreeFailures:perturbations.filter(t=>t.status!=='target').length,halfDegreeTopologyChanges:perturbations.filter(t=>!t.sameTopology).length,minPerturbedEndpointMargin:minimum(perturbations.flatMap(t=>t.minEndpointMargin==null?[]:[t.minEndpointMargin])),reviewFindings:reviewFindings.length,metadataReviewItems:metadataInventory.filter(x=>x.classification==='review-unsupported-metadata').length},errors,reviewFindings,levels,referenceEvents,knownWinnerEvents,caseResults,catalogueResults,perturbations,metadataInventory};
}

// Validate cached CURRENT replay data as well as asserted status. Historical or
// ablated geometry is inventoried separately, never silently treated as a winner
// on the current full map. Only fields actually supplied are compared.
function cachedEvidenceIssues(configuration, world) {
 const issues=[];
 for (const key of ['result','evidence','trace']) {
  const saved=configuration[key]; if(!saved||typeof saved!=='object')continue;
  if(saved.status!==undefined&&saved.status!==world.status)issues.push({field:key+'.status',expected:saved.status,actual:world.status});
  if(!Array.isArray(saved.rays))continue;
  if(saved.rays.length!==world.rays.length){issues.push({field:key+'.rays.length',expected:saved.rays.length,actual:world.rays.length});continue;}
  saved.rays.forEach((ray,i)=>{
   const fresh=world.rays[i],prefix=key+'.rays['+i+']';
   for(const field of ['color','status','bounces'])if(ray[field]!==undefined&&ray[field]!==fresh[field])issues.push({field:prefix+'.'+field,expected:ray[field],actual:fresh[field]});
   const suppliedMirrors=ray.mirrors??ray.reflections?.map(r=>r.objectIndex),suppliedPortals=ray.portals??ray.teleports?.map(r=>r.portalId);
   for(const [field,actual,expected] of [['mirrors',fresh.reflections.map(r=>r.objectIndex),suppliedMirrors],['portals',fresh.teleports.map(r=>r.portalId),suppliedPortals]])if(expected!==undefined&&JSON.stringify(actual)!==JSON.stringify(expected))issues.push({field:prefix+'.'+field,expected,actual});
   if(Array.isArray(ray.segments)){
    if(ray.segments.length!==fresh.segments.length)issues.push({field:prefix+'.segments.length',expected:ray.segments.length,actual:fresh.segments.length});
    else ray.segments.forEach((segment,j)=>{for(const point of ['a','b'])if(!segment[point]||!Number.isFinite(segment[point].x)||!Number.isFinite(segment[point].y)||distance(segment[point],fresh.segments[j][point])>1e-6)issues.push({field:prefix+'.segments['+j+'].'+point,expected:segment[point],actual:fresh.segments[j][point]});});
   }
  });
 }
 return issues;
}

export function inventoryAngleMetadata(record) {
 const supported=new Set(cataloguedConfigurations(record).map(c=>c.origin)),out=[];
 const visit=(node,origin)=>{
  if(!node||typeof node!=='object')return;
  if(Array.isArray(node)){node.forEach((item,i)=>visit(item,origin+'['+i+']'));return;}
  if(Array.isArray(node.angles)){
   let classification=supported.has(origin)||/^cases\[\d+\]$/.test(origin)?'replayed-current-configuration':
    /(?:historical|archive|previous|baseline|originalShortcut|baseCatalogue|retired|beforeCases)/i.test(origin)?'review-historical-snapshot':
    /Ablation/i.test(origin)?'review-ablated-map':
    /(?:robustRouteAudit\.pairCompatibilityWitnesses|angularStrategyAudit\.(?:scan|pairTests)|crossContextAngularAudit\.unplanned)/.test(origin)?'review-local-route-metadata':
    /sharedTargetChange\.(?:base|variant)Catalogue/.test(origin)?'review-other-map':
    /(?:individualHalfDegree|angularMargin|angularPerturbations)/.test(origin)?'reference-perturbation-metadata':'review-unsupported-metadata';
   out.push({levelId:record.level.id,origin,classification,angleCount:node.angles.length,claimedStatus:node.expectedStatus??node.status??node.evidence?.status??node.result?.status??node.trace?.status??null});
  }
  for(const [key,value]of Object.entries(node))if(key!=='angles')visit(value,origin?origin+'.'+key:key);
 };
 visit(record,'');return out;
}

export function runIncidenceSelfTests() {
 const makeLevel=(angle=45)=>({id:'test-angle-'+angle,objects:[{type:'mirror',x:300,y:230,length:124.8,angle:0}],sources:[{x:100,y:230,angle:0,color:'gold'}],targets:[{x:300+150*Math.cos(2*angle/degrees),y:230+150*Math.sin(2*angle/degrees),radius:22,color:'gold'}],portals:[],solution:[angle]});
 const passed=auditIncidenceRecords([{level:makeLevel(20)}]);assert.equal(passed.passed,true);assert.equal(passed.summary.halfDegreeTests,4);
 assert.equal(auditIncidenceRecords([{level:makeLevel(19.99)}],{perturb:false}).passed,false);
 for(const [angle,want]of [[0,0],[180,0],[-180,0],[90,90],[-90,90],[160,20],[-160,20],[20,20]]){
  const radians=angle/degrees,got=Math.atan2(Math.abs(Math.sin(radians)),Math.abs(Math.cos(radians)))*degrees;assert.ok(Math.abs(got-want)<1e-10);
 }
 const l=makeLevel(45),s=referenceState(l),w=traceLightWorld(s),m=reflectionMetrics(s,w)[0];assert.ok(Math.abs(m.incidenceToLineDegrees-45)<1e-9);assert.ok(Math.abs(m.deflectionDegrees-90)<1e-9);
 const twoTargets=makeLevel(60);twoTargets.targets.push(...makeLevel(10).targets);
 const hard=auditIncidenceRecords([{level:twoTargets,cases:[{id:'simple-shallow-winner',angles:[10],expectedStatus:'target'}]}],{perturb:false});
 assert.ok(hard.errors.some(e=>e.type==='known-target-case-incidence'));assert.equal(hard.caseResults[0].routeComplexity.operations,hard.caseResults[0].referenceComplexity.operations);
 const localLevel=structuredClone(twoTargets);localLevel.id='test-local-scope';localLevel.sources.push({x:100,y:40,angle:0,color:'blue'});localLevel.targets.push({x:700,y:40,radius:22,color:'blue'});
 const local=auditIncidenceRecords([{level:localLevel,cases:[{id:'local-shallow-winner',angles:[10],sourceIndices:[0],expectedStatus:'target'}]}],{perturb:false});
 assert.equal(local.passed,true);assert.ok(local.reviewFindings.some(e=>e.classification==='review-local-route'));assert.equal(local.caseResults[0].scope,'source-subset');
 const longerLevel=makeLevel(60),second={type:'mirror',x:500,y:230+200*Math.tan(20/degrees),length:124.8,angle:0};longerLevel.id='test-longer-scope';longerLevel.objects.push(second);longerLevel.solution.push(60);longerLevel.targets.push({x:second.x+120*Math.cos(100/degrees),y:second.y+120*Math.sin(100/degrees),radius:22,color:'gold'});
 const longer=auditIncidenceRecords([{level:longerLevel,cases:[{id:'longer-shallow-winner',angles:[10,60],expectedStatus:'target'}]}],{perturb:false});
 assert.equal(longer.passed,true);assert.ok(longer.reviewFindings.some(e=>e.classification==='review-longer-route'));assert.equal(longer.caseResults[0].routeComplexity.operations,2);assert.equal(longer.caseResults[0].referenceComplexity.operations,1);
 const stale=auditIncidenceRecords([{level:l,validation:{alternativeSolutions:[{angles:[0],status:'target'}]}}],{perturb:false});assert.ok(stale.errors.some(e=>e.type==='catalogue-status-or-stale-evidence'));
 const badCache=structuredClone(w);badCache.rays[0].segments[0].a.x+=1;
 const staleGeometry=auditIncidenceRecords([{level:l,cases:[{id:'stale-coordinates',angles:[45],expectedStatus:'target',result:badCache}]}],{perturb:false});assert.ok(staleGeometry.errors.some(e=>e.type==='case-stale-cached-evidence'));
 assert.throws(()=>auditIncidenceRecords([{level:l,validation:{alternativeSolutions:[{angles:[45],sourceIndices:[0,0]}]}}],{perturb:false}),/source subset/);
 assert.throws(()=>auditIncidenceRecords([{level:l}],{minAngle:19}),/fixed/);
 assert.throws(()=>auditIncidenceRecords([{level:l},{level:l}]),/Duplicate/);
 return {passed:true,checks:['20-degree boundary','acute line angle including antiparallel','real-engine reflection and deflection identity','all individual and simultaneous half-degree corners','simple known winner angle rejection','local subset measured separately','longer route measured separately','stale catalogue status rejection','stale cached geometry rejection','invalid source subset rejection','fixed policy','unique identities']};
}

export function testV5Incidence({records=readJSON(artifactURL('evidence-records.json.gz')),review=readJSON(artifactURL('incidence-review.json.gz'))}={}) {
 assert.equal(records.length,500,'The compiled campaign must contain exactly 500 evidence records.');
 const selfTests=runIncidenceSelfTests(),report=auditIncidenceRecords(records);
 assert.deepEqual(review,JSON.parse(JSON.stringify(report)),'incidence-review.json.gz differs from a fresh engine replay. Rebuild the review; stale or reduced coverage is not a pass.');
 return {...report,selfTests,reviewVerified:true,artifactSHA256:crypto.createHash('sha256').update(JSON.stringify(records)).digest('hex')};
}
if(isMain(import.meta.url)) {
 try {
  if(process.argv[2]==='--self-test')printReport(runIncidenceSelfTests(),process.argv[3]);
  else {
   const report=process.argv[2]?auditIncidenceRecords(readJSON(process.argv[2])):testV5Incidence();
   if(process.argv[3])printReport(report,process.argv[3]);
   else printReport({passed:report.passed,summary:report.summary,errors:report.errors,reviewFindings:report.reviewFindings,limitations:report.limitations});
   if(!report.passed)process.exitCode=1;
  }
 } catch(error) {
  printReport({passed:false,pending:error.code==='ENOENT',error:error.message,limitations:'Missing artifacts are pending, never a successful skip. Finite route replay is not continuous uniqueness or human difficulty proof.'});process.exitCode=1;
 }
}

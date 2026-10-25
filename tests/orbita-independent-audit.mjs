import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {CAMPAIGN} from '../dist/orbita/campaign.mjs';
import {RULES_VERSION,createEngine,validateLevel,validateState,replay,invertMove} from '../dist/orbita/engine.mjs';
import {solve,safeSolution,certifyGenerated} from '../dist/orbita/analysis.mjs';
import {generateEndless,levelSignature} from '../dist/orbita/generator.mjs';
import {selectFallback} from '../dist/orbita/fallback.mjs';

const counts = values => values.reduce((out,value) => (out[value]=(out[value]??0)+1,out),{});
const fixedWrongTarget = (level,excludedCommands) => {
  const movable = new Set(level.commands.filter(command => !excludedCommands.has(command.id)).flatMap(command => command.turns.flatMap(turn => level.rings.find(ring => ring.id === turn.ring).cells)));
  return Object.entries(level.targets).find(([cell,type]) => !movable.has(cell) && level.initial[cell] !== type)?.[0] ?? null;
};
// This search restricts which commands may be selected, but every remaining
// transition is the production engine's transition. No second ruleset.
function restrictedSearch(level,excludedCommands,maxStates = 12000) {
  const engine = createEngine(level), start = engine.initialState(), queue = [start], seen = new Set([engine.key(start)]);
  for (let head = 0; head < queue.length; head++) {
    const state = queue[head];
    if (engine.isWon(state)) return {status:'solved',visited:seen.size};
    for (const move of engine.allowedMoves(state).filter(move => !excludedCommands.has(move.command))) {
      const next = engine.transition(state,move), key = engine.key(next.state);
      if (seen.has(key)) continue;
      if (seen.size >= maxStates) return {status:'inconclusive',visited:seen.size};
      seen.add(key);queue.push(next.state);
    }
  }
  return {status:'unsolvable',visited:seen.size};
}

const report = {
  rulesVersion:RULES_VERSION,
  sourceHash:createHash('sha256').update(await fs.readFile(new URL('../dist/orbita/catalog.mjs',import.meta.url))).digest('hex'),
  total:CAMPAIGN.length,validated:0,replayVerified:0,currentStateAdviceVerified:0,
  duplicateGroups:[],specialActions:[],singleCommandSolutions:[],minimumCrossChecks:[],difficultySamples:[],
  endless:{tested:0,reproducible:0,signatures:[],families:[],fallbackTests:0,rollingWindow:30,sequence:[]},
  notes:[
    'Independent review: certificates are replayed and special-action necessity is checked separately from generator trace metadata.',
    'Minimum claims are cross-checked only where declared; bounded searches without a result remain inconclusive.',
    'Tutorial levels 1 and 2 intentionally mirror the one-step lesson to teach both directions.',
    'Difficulties also reflect topology, coupled goals, restoration and special rules; stored sequence length alone is not treated as a difficulty proof.'
  ]
};
assert.equal(CAMPAIGN.length,500);
assert.deepEqual([0,1,2,3,4].map(value => CAMPAIGN.filter(level => level.difficulty === value).length),[50,150,100,100,100]);
const signatures = new Map();

for (const [index,level] of CAMPAIGN.entries()) {
  assert.equal(level.id,index+1);
  assert.equal(validateLevel(level).valid,true,`Invalid level ${level.id}`);report.validated++;
  const engine = createEngine(level), start = engine.initialState();
  assert.equal(engine.isWon(start),false,`Already solved ${level.id}`);
  const result = replay(level,level.solution);
  assert.equal(result.valid,true,`Illegal solution ${level.id}`);
  assert.equal(result.solved,true,`Wrong solution ${level.id}`);report.replayVerified++;
  assert.equal(level.validation.solutionUpperBound,level.solution.length);
  assert.ok(level.discovery && level.hints?.length >= 2 && level.layout?.width > 0 && level.layout?.height > 0);
  const signature = levelSignature(level);
  assert.equal(signature,level.validation.signature,`Stale signature ${level.id}`);
  const duplicates = signatures.get(signature) ?? [];duplicates.push(level.id);signatures.set(signature,duplicates);
  const history = [];let current = start;
  for (let offset = 0; offset < 5; offset++) {
    const moves = engine.allowedMoves(current), action = moves[(level.id * 7 + offset * 11) % moves.length];
    const next = engine.transition(current,action);
    assert.deepEqual(engine.transition(next.state,invertMove(action)).state.occupancy,current.occupancy);
    assert.equal(validateState(level,next.state).valid,true);
    history.push(action);current=next.state;
  }
  const continuation = safeSolution(level,current,{history});
  assert.equal(continuation.status,'solved',`Current-state proof ${level.id}`);
  assert.equal(replay(level,continuation.solution,{state:current}).solved,true);
  report.currentStateAdviceVerified++;

  for (const command of level.commands) for (const direction of [1,-1]) {
    let state=start;
    const visited=new Set([engine.key(start)]);
    for(let count=1;count<=256;count++) {
      const next=engine.transition(state,{command:command.id,direction});if(!next.allowed)break;
      state=next.state;
      if(engine.isWon(state)){report.singleCommandSolutions.push({level:level.id,command:command.id,direction,repetitions:count,knownLength:level.solution.length});break;}
      const key=engine.key(state);if(visited.has(key))break;visited.add(key);
    }
  }
  for(const kind of new Set(level.specialRules.map(rule=>rule.kind))) {
    const commands = level.commands.filter(command => kind==='gear' ? command.turns.length>1 : kind==='sensor' ? command.requires?.length : command.turns.some(turn=>level.rings.find(ring=>ring.id===turn.ring).step===2));
    const excluded = new Set(commands.map(command=>command.id));
    assert.ok(level.solution.some(move=>excluded.has(move.command)),`Unused ${kind} ${level.id}`);
    const fixedWitness=fixedWrongTarget(level,excluded);
    const proof=fixedWitness ? {status:'unsolvable',method:'incorrect-target-in-immovable-cell',witness:fixedWitness} : {...restrictedSearch(level,excluded),method:'restricted-reachable-graph-exhausted'};
    assert.equal(proof.status,'unsolvable',`Potential decorative ${kind} ${level.id}`);
    const entry={level:level.id,kind,necessary:true,proof};
    if(kind==='sensor')entry.initiallyBlocked=commands.some(command=>!engine.commandStatus(start,command.id).allowed);
    report.specialActions.push(entry);
  }
  if(level.validation.minimumProven) {
    const search=solve(level,start,{maxDepth:level.validation.minimum,maxStates:100000,timeoutMs:1200});
    assert.equal(search.status,'solved',`Unconfirmed minimum ${level.id}`);
    assert.equal(search.solution.length,level.validation.minimum,`Wrong minimum ${level.id}`);
    assert.equal(search.optimal,true);
    report.minimumCrossChecks.push({level:level.id,minimum:search.solution.length,visited:search.visited});
  }
}
report.uniqueSignatures=signatures.size;
report.duplicateGroups=[...signatures.values()].filter(ids=>ids.length>1);
assert.deepEqual(report.duplicateGroups,[[1,2]]);
assert.equal(report.singleCommandSolutions.some(item=>item.level>200),false);
report.familyCounts=counts(CAMPAIGN.map(level=>level.family));
report.ringCounts=counts(CAMPAIGN.map(level=>level.rings.length));
report.basicRulesByBand=Array.from({length:10},(_,band)=>CAMPAIGN.slice(band*50,band*50+50).filter(level=>!level.specialRules.length).length);
assert.ok(report.basicRulesByBand.every(count=>count>0));

// Tutorial, special introductions, and final synthesis are checked explicitly.
assert.deepEqual(CAMPAIGN.slice(0,4).map(level=>level.rings.length),[1,1,1,1]);
assert.deepEqual(CAMPAIGN.slice(4,10).map(level=>level.rings.length),[2,2,2,2,2,2]);
assert.deepEqual(CAMPAIGN[9].solution,[{command:'B',direction:1},{command:'A',direction:1},{command:'B',direction:1},{command:'A',direction:-1}]);
assert.deepEqual(CAMPAIGN[9].initial,{J:'n',Abaixo:'2',Aesquerda:'n',Atopo:'1',Btopo:'3',Bdireita:'n',Bbaixo:'n'});
for(const id of [307,352,411]){assert.ok(CAMPAIGN[id-1].solution.length<=4);assert.ok(CAMPAIGN[id-1].cells.length<=10);}
assert.deepEqual(CAMPAIGN[499].specialRules.map(rule=>rule.kind).sort(),['gear','sensor','step']);

for(const id of [10,242,352,500]) {
  const level=CAMPAIGN[id-1], equivalent=structuredClone(level);
  const command=equivalent.commands.find(item=>item.turns.length>1)??equivalent.commands[0];
  for(const turn of command.turns)turn.delta=-turn.delta;
  assert.equal(levelSignature(equivalent),levelSignature(level),`Inverse-control equivalence ${id}`);
}
for(const id of [201,225,250,275,300,325,350,375,400,425,450,475,499,500]) {
  const level=CAMPAIGN[id-1], result=solve(level,undefined,{maxDepth:5,maxStates:18000,timeoutMs:200});
  if(result.status==='solved')assert.equal(replay(level,result.solution).solved,true);
  report.difficultySamples.push({level:id,status:result.status,optimal:result.optimal,foundLength:result.solution?.length??null,knownLength:level.solution.length,visited:result.visited,reason:result.reason??null});
}

const extremes=[0,1,0x7fffffff,0xffffffff];
for(let difficulty=0;difficulty<5;difficulty++)for(const seed of extremes) {
  const options={difficulty,maxAttempts:32};let result;
  try {result=generateEndless(seed,options);} catch(error) {assert.equal(error.code,'GENERATION_BUDGET');result=selectFallback(seed,options);}
  const again=result.source==='fallback'?selectFallback(seed,options):generateEndless(seed,options);
  assert.deepEqual(again,result);
  assert.equal(result.seed,seed);assert.equal(result.level.seed,seed);
  assert.equal(result.level.difficulty,difficulty);
  assert.equal(certifyGenerated(result,options).validation.replay,true);
  assert.equal(result.signature,levelSignature(result.level));
  report.endless.tested++;report.endless.reproducible++;
  report.endless.signatures.push(result.signature);report.endless.families.push(result.level.family);
}
report.endless.uniqueSignatures=new Set(report.endless.signatures).size;
report.endless.families=counts(report.endless.families);delete report.endless.signatures;
assert.ok(report.endless.uniqueSignatures>=18);
assert.throws(()=>generateEndless(0,{maxAttempts:0}),error=>error.code==='GENERATION_BUDGET');
for(let difficulty=0;difficulty<5;difficulty++){
  let recent=[],families=[];
  for(let round=0;round<32;round++){
    const options={difficulty,recentSignatures:recent,recentFamilies:families},result=selectFallback(0xffffffff,options);
    assert.ok(!recent.includes(result.signature));
    assert.deepEqual(selectFallback(0xffffffff,options),result);
    assert.equal(certifyGenerated(result,options).validation.replay,true);
    recent=[...recent,result.signature].slice(-30);families=[...families,result.level.family].slice(-30);report.endless.fallbackTests++;
  }
  const all=CAMPAIGN.filter(level=>level.id>10&&level.difficulty===difficulty).map(level=>level.validation.signature);
  assert.throws(()=>selectFallback(0,{difficulty,recentSignatures:all}),error=>error.code==='RESERVOIR_EXHAUSTED');
}
// A real run's seed progression and recent-family filter should explore all
// structural families, not just pass isolated seed reproducibility checks.
let recentSignatures=[],recentFamilies=[];
for(let round=1;round<=24;round++){
  const seed=(0xdeadbeef+Math.imul(round,0x9e3779b9))>>>0,options={difficulty:4,maxAttempts:20,recentSignatures,recentFamilies};let result;
  try{result=generateEndless(seed,options);}catch(error){assert.equal(error.code,'GENERATION_BUDGET');result=selectFallback(seed,options);}
  assert.equal(certifyGenerated(result,options).validation.replay,true);
  recentSignatures=[...recentSignatures,result.signature].slice(-30);recentFamilies=[...recentFamilies,result.level.family].slice(-30);
  report.endless.sequence.push({seed,family:result.level.family,rings:result.level.rings.length,source:result.source});
}
report.endless.sequenceFamilies=counts(report.endless.sequence.map(item=>item.family));
assert.equal(Object.keys(report.endless.sequenceFamilies).length,9);
report.completed=true;
await fs.writeFile(new URL('../docs/orbita-independent-audit.json',import.meta.url),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({completed:report.completed,total:report.total,replayVerified:report.replayVerified,currentStateAdviceVerified:report.currentStateAdviceVerified,minimumCrossChecks:report.minimumCrossChecks.length,necessarySpecialActions:report.specialActions.length,sensorsInitiallyBlocked:report.specialActions.filter(item=>item.kind==='sensor'&&item.initiallyBlocked).length,uniqueSignatures:report.uniqueSignatures,duplicates:report.duplicateGroups,noSingleCommandSolutionsAfter200:true,endless:{...report.endless,sequence:report.endless.sequence.length}},null,2));

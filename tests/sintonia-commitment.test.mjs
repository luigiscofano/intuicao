/** Configuration before one-way commitment. Reproduce the recorded evidence:
 * node tests/sintonia-commitment.test.mjs --write-evidence
 * Normal test runs never overwrite the evidence file.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {CAMPAIGN} from '../dist/sintonia/campaign.mjs';
import {RULES_VERSION,DIRECTIONS,initialState,transition,stateKey,isWon,validateLevel,validateState,replay,solveLevel} from '../dist/sintonia/engine.mjs';
import {levelFingerprint} from './sintonia-audit-purpose.mjs';

const LEVEL_NUMBER=251;
const BUDGET={maxStates:100000,maxMs:30000,maxDepth:240};
const evidenceURL=new URL('./sintonia-commitment-evidence.json',import.meta.url);
const now=()=>globalThis.performance?.now?.()??Date.now();
const clone=value=>JSON.parse(JSON.stringify(value));
const summarized=result=>({...result,...(result.status==='solved'?{commands:result.solution.length}:{})});
function specification(level){
  const board=level.boards.findIndex(definition=>definition.switches?.some(control=>control.group==='prepare'));
  assert.ok(board>=0,'phase 251 must configure the prepare switch, not collect a key');
  const control=level.boards[board].switches.find(item=>item.group==='prepare');
  const edge=level.boards[board].oneWays?.[0];
  assert.ok(edge,'preparing animal must own the one-way commitment');
  assert.ok(level.boards.some(definition=>definition.gates?.some(gate=>gate.condition.type==='switch'&&gate.condition.id==='prepare'&&gate.condition.value===true)),'prepare=true must control a real gate');
  return {board,control,edge};
}
function crossesCommitment(events,spec){return events.some(event=>event.type==='oneway'&&event.board===spec.board&&event.from===spec.edge.from&&event.to===spec.edge.to);}
function restore(nodes,index){const commands=[];for(let at=index;nodes[at].parent>=0;at=nodes[at].parent)commands.push(nodes[at].direction);return commands.reverse();}

/** Search for the shortest reachable command prefix that commits while false.
 * Full state is the key. A later failure is not used to prune this search. */
function prematurePrefix(level,spec,{maxStates,maxMs,maxDepth}){
  const first=initialState(level),nodes=[{state:first,parent:-1,direction:null,depth:0}],seen=new Set([stateKey(first)]),deadline=now()+maxMs;let depthLimited=false;
  for(let head=0;head<nodes.length;head++){
    if(now()>=deadline)return {status:'inconclusive',reason:'time-budget',visited:seen.size};
    const node=nodes[head];
    if(node.depth>=maxDepth){depthLimited=true;continue;}
    for(const direction of DIRECTIONS){
      const moved=transition(level,node.state,direction);if(!moved.changed)continue;
      if(node.state.switches.prepare!==true&&crossesCommitment(moved.events,spec))return {status:'found',commands:[...restore(nodes,head),direction],state:moved.state,visited:seen.size,configurationAtCommitment:false};
      const key=stateKey(moved.state);if(seen.has(key))continue;
      if(seen.size>=maxStates)return {status:'inconclusive',reason:'state-budget',visited:seen.size};
      seen.add(key);nodes.push({state:moved.state,parent:head,direction,depth:node.depth+1});
    }
  }
  return {status:depthLimited?'inconclusive':'absent',...(depthLimited?{reason:'depth-budget'}:{exhaustive:true}),visited:seen.size};
}

/** Does ANY winning solution commit before preparing the switch?
 * currentValue=true separately tests the stronger (not assumed) requirement
 * that the switch remain true at commitment, even after its job is finished.
 * The violation monitor is part of the key; merging it with an ordinary state
 * would invalidate the order proof. The captured initial configuration, not a
 * switch changed later in the command, controls this predicate.
 */
function findOrderCounterexample(level,spec,{maxStates,maxMs,maxDepth},{currentValue=false}={}){
  const first=initialState(level),preparedInitially=first.switches.prepare===true,nodes=[{state:first,prepared:preparedInitially,violated:false,parent:-1,direction:null,depth:0}],keyFor=(state,prepared,violated)=>`${stateKey(state)}|prepared:${prepared?1:0}|premature:${violated?1:0}`,seen=new Set([keyFor(first,preparedInitially,false)]),deadline=now()+maxMs;let depthLimited=false;
  for(let head=0;head<nodes.length;head++){
    if(now()>=deadline)return {status:'inconclusive',reason:'time-budget',visited:seen.size};
    const node=nodes[head];
    if(node.violated&&isWon(level,node.state))return {status:'solved',solution:restore(nodes,head),visited:seen.size,optimal:true,optimalScope:'counterexample-predicate-only'};
    if(node.depth>=maxDepth){depthLimited=true;continue;}
    for(const direction of DIRECTIONS){
      const moved=transition(level,node.state,direction);if(!moved.changed)continue;
      const violated=node.violated||((currentValue?node.state.switches.prepare!==true:!node.prepared)&&crossesCommitment(moved.events,spec)),prepared=node.prepared||moved.state.switches.prepare===true,key=keyFor(moved.state,prepared,violated);
      if(seen.has(key))continue;
      if(seen.size>=maxStates)return {status:'inconclusive',reason:'state-budget',visited:seen.size};
      seen.add(key);nodes.push({state:moved.state,prepared,violated,parent:head,direction,depth:node.depth+1});
    }
  }
  return depthLimited?{status:'inconclusive',reason:'depth-budget',visited:seen.size}:{status:'unsolvable',visited:seen.size,exhaustive:true,conclusion:currentValue?'No winning solution commits this edge with the preparation switch false.':'No winning solution commits this edge before an earlier command has configured prepare=true.'};
}

export function buildCommitmentEvidence(level=CAMPAIGN[LEVEL_NUMBER-1]){
  assert.deepEqual(validateLevel(level),{valid:true,errors:[]});
  const spec=specification(level),baseline=solveLevel(level,BUDGET),prefix=prematurePrefix(level,spec,BUDGET);
  assert.equal(prefix.status,'found','a visible premature commitment must actually be reachable');
  assert.deepEqual(validateState(level,prefix.state),{valid:true,errors:[]});
  const stranded=solveLevel(level,{...BUDGET,state:prefix.state});
  const reversible=clone(level);
  reversible.boards[spec.board].oneWays=reversible.boards[spec.board].oneWays.filter(edge=>edge.from!==spec.edge.from||edge.to!==spec.edge.to);
  assert.deepEqual(validateLevel(reversible),{valid:true,errors:[]});
  assert.deepEqual(validateState(reversible,prefix.state),{valid:true,errors:[]});
  const recovery=solveLevel(reversible,{...BUDGET,state:prefix.state}),order=findOrderCounterexample(level,spec,BUDGET),currentValue=findOrderCounterexample(level,spec,BUDGET,{currentValue:true});
  return {schemaVersion:1,levelId:level.id,number:level.number,contentRevision:level.contentRevision,rulesVersion:RULES_VERSION,fingerprint:levelFingerprint(level),engineSha256:createHash('sha256').update(readFileSync(new URL('../dist/sintonia/engine.mjs',import.meta.url))).digest('hex'),
    budget:BUDGET,control:{board:spec.board,id:spec.control.id,group:spec.control.group,cell:spec.control.cell},commitment:{board:spec.board,...spec.edge},baseline:summarized(baseline),prematurePrefix:prefix,
    originalFromPrematureState:summarized(stranded),sameStateWithoutDirectedRestriction:summarized(recovery),globalOrderCounterexample:summarized(order),currentValueAtCommitmentCounterexample:summarized(currentValue),
    interpretation:'The exhaustive global order result concerns configuring prepare=true in an earlier command, not keeping it true forever. The stronger current-value query intentionally records a counterexample: after the receiver crosses, a winning solution may toggle false before commitment. No human difficulty, uniqueness, or playtesting claim.'};
}

let evidence;
const currentEvidence=()=>evidence??=buildCommitmentEvidence();
if(process.argv.includes('--write-evidence'))writeFileSync(evidenceURL,`${JSON.stringify(currentEvidence(),null,2)}\n`);

test('phase 251 retains known switch rules before the new one-way rule',()=>{
  const level=CAMPAIGN[LEVEL_NUMBER-1],spec=specification(level);
  assert.equal(level.number,251);assert.equal(level.boards.length,3);assert.equal(level.rulesVersion,1);assert.equal(initialState(level).switches.prepare,false);
  assert.ok(level.mechanics.includes('switch'));assert.ok(level.mechanics.includes('oneway'));assert.equal(replay(level,level.solution).won,true);
  assert.ok(level.boards[spec.board].keys?.every(key=>key.id!=='prepare')??true);
});

test('premature commitment strands the control; making only that edge reversible rescues the same state',()=>{
  const record=currentEvidence(),level=CAMPAIGN[LEVEL_NUMBER-1];
  assert.equal(record.baseline.status,'solved');assert.equal(record.baseline.optimal,true);
  assert.equal(record.prematurePrefix.state.switches.prepare,false);
  const replayed=replay(level,record.prematurePrefix.commands);assert.equal(replayed.valid,true);assert.equal(stateKey(replayed.state),stateKey(record.prematurePrefix.state));
  assert.equal(record.originalFromPrematureState.status,'unsolvable','engine must exhaust the continuation space, not time out');
  assert.equal(record.sameStateWithoutDirectedRestriction.status,'solved');
  const reversible=clone(level),spec=specification(level);reversible.boards[spec.board].oneWays=reversible.boards[spec.board].oneWays.filter(edge=>edge.from!==spec.edge.from||edge.to!==spec.edge.to);
  assert.equal(replay(reversible,record.sameStateWithoutDirectedRestriction.solution,{state:record.prematurePrefix.state}).won,true);
});

test('complete state plus violation monitor exhaustively rejects every winning order counterexample',()=>{
  const result=currentEvidence().globalOrderCounterexample;
  assert.equal(result.status,'unsolvable');assert.equal(result.exhaustive,true);assert.ok(result.visited>0);assert.ok(result.visited<BUDGET.maxStates);
});

test('preparation need not remain true after the receiver has already crossed',()=>{
  const result=currentEvidence().currentValueAtCommitmentCounterexample;
  assert.equal(result.status,'solved');assert.equal(replay(CAMPAIGN[LEVEL_NUMBER-1],result.solution).won,true);
});

test('stored commitment evidence matches the exact current definition and reproducible proof',()=>{
  assert.ok(existsSync(evidenceURL),'run with --write-evidence after an authorized content edit');
  const stored=JSON.parse(readFileSync(evidenceURL,'utf8')),actual=currentEvidence();
  assert.equal(stored.fingerprint,actual.fingerprint);assert.equal(stored.engineSha256,actual.engineSha256);
  assert.deepEqual(stored.prematurePrefix,actual.prematurePrefix);
  for(const field of ['baseline','originalFromPrematureState','sameStateWithoutDirectedRestriction','globalOrderCounterexample','currentValueAtCommitmentCounterexample'])assert.deepEqual(stored[field],actual[field],field);
});

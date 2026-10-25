import test from 'node:test';
import assert from 'node:assert/strict';
import {createEngine,initialState,transition,preview,commandStatus,evaluateState,isWon,stateKey,validateLevel,validateState,replay,invertMove} from '../dist/orbita/engine.mjs';
import {solve,safeSolution,analyzePosition,hintFromSolution,certifyAnalysis,certifyGenerated} from '../dist/orbita/analysis.mjs';
import {exampleLevel,distinctLevel,gearLevel,stepLevel,move} from './orbita-engine-fixtures.mjs';

test('the required seven-cell tutorial solves in the specified four turns, which BFS proves minimal',() => {
  const level = exampleLevel(), start = initialState(level), result = replay(level,level.solution);
  assert.equal(validateLevel(level).valid,true);
  assert.equal(isWon(level,start),false);
  assert.equal(start.occupancy.A1,'2');
  assert.notEqual(result.steps[1].state.occupancy.A1,'2');
  assert.equal(result.state.occupancy.A1,'2');
  assert.equal(result.state.occupancy.B1,'1');
  assert.equal(result.state.occupancy.B3,'3');
  assert.equal(result.solved,true);
  const optimum = solve(level);
  assert.equal(optimum.status,'solved');
  assert.equal(optimum.solution.length,4);
  assert.equal(optimum.optimal,true);
  assert.equal(optimum.proof.allShorterPathsExhausted,true);
});

test('the required commutator changes exactly three positions',() => {
  const level = distinctLevel(), before = initialState(level);
  const result = replay(level,[move('A'),move('B'),move('A',-1),move('B',-1)]);
  const values = level.cells.map(cell => Number(result.state.occupancy[cell.id]));
  assert.deepEqual(values,[3,1,2,6,4,5,0]);
  assert.equal(level.cells.filter(cell => before.occupancy[cell.id] !== result.state.occupancy[cell.id]).length,3);
});

test('one shared cell is one record; exclusive cells of the inactive ring do not move',() => {
  const level = exampleLevel(), before = initialState(level), after = transition(level,before,move('A'));
  assert.equal(Object.keys(after.state.occupancy).length,7);
  for (const id of ['B1','B2','B3']) assert.equal(after.state.occupancy[id],before.occupancy[id]);
  assert.equal(after.state.occupancy.J,'1');
  const transferred = transition(level,after.state,move('B'));
  assert.equal(transferred.state.occupancy.B1,'1');
  assert.deepEqual(level.targets,{B1:'1',A1:'2',B3:'3'});
});

test('targets and presentation metadata cannot alter the logical permutation',() => {
  const level = exampleLevel(), other = structuredClone(level);
  for (const cell of other.cells) {cell.x *= 3;cell.y += 600;}
  for (const ring of other.rings) ring.geometry = {type:'circle',cx:20,cy:40,r:5};
  const left = replay(level,[move('A'),move('B',-1)]), right = replay(other,[move('A'),move('B',-1)]);
  assert.deepEqual(left.state,right.state);
  assert.deepEqual(other.targets,level.targets);
});

test('same visible types are equivalent and a legal rotation still counts when equal symbols exchange',() => {
  const level = stepLevel();
  level.pieceTypes = [{id:'same',symbol:'1',name:'um'}];
  level.initial = {a:'same',b:'same',c:'same',d:'same'};
  level.targets = {b:'same'};
  const before = initialState(level), result = transition(level,before,move('A'));
  assert.equal(result.changed,true);
  assert.equal(result.positionChanged,false);
  assert.equal(result.state.moves,1);
  assert.equal(isWon(level,result.state),true);
  assert.equal(stateKey(before),stateKey(result.state));
});

test('step 2 is atomic, skips an intermediate solved arrangement and has an inverse',() => {
  const level = stepLevel(), start = initialState(level), next = transition(level,start,move('A'));
  assert.equal(next.state.moves,1);
  assert.equal(next.movements.length,4);
  assert.equal(next.state.occupancy.c,'1');
  assert.equal(next.state.occupancy.b,'n');
  assert.equal(next.result.won,false);
  assert.deepEqual(transition(level,next.state,move('A',-1)).state.occupancy,start.occupancy);
  assert.equal(solve(level).status,'unsolvable');
  assert.equal(solve(level).reason,'reachable-graph-exhausted');
});

test('disjoint gears use one source state, count once and affect the middle ring only at shared cells',() => {
  const level = gearLevel({step:2}), start = initialState(level), next = transition(level,start,move('AC'));
  assert.equal(next.state.moves,1);
  assert.deepEqual(next.affectedRings,['A','C']);
  assert.equal(new Set(next.movements.map(item => item.to)).size,8);
  assert.equal(next.state.occupancy.A2,start.occupancy.J1);
  assert.equal(next.state.occupancy.J2,start.occupancy.C1);
  assert.equal(next.state.occupancy.B1,start.occupancy.B1);
  assert.equal(next.state.occupancy.B3,start.occupancy.B3);
  assert.deepEqual(transition(level,next.state,invertMove(move('AC'))).state.occupancy,start.occupancy);
});

test('a sensor stays outside every moving ring and preserves immediate inverse availability',() => {
  const level = gearLevel({sensor:true}), start = initialState(level), first = transition(level,start,move('AC'));
  assert.equal(first.allowed,true);
  assert.equal(first.state.occupancy.B1,start.occupancy.B1);
  assert.equal(commandStatus(level,first.state,'AC',-1).allowed,true);
  assert.deepEqual(transition(level,first.state,move('AC',-1)).state.occupancy,start.occupancy);
  const blockedState = transition(level,start,move('B')).state;
  const blocked = transition(level,blockedState,move('AC'));
  assert.equal(blocked.allowed,false);
  assert.equal(blocked.changed,false);
  assert.equal(blocked.reasonCode,'sensor');
  assert.equal(blocked.state,blockedState);
  assert.match(blocked.reason,/sensor/);
});

test('previews are read-only, contain all gear cells and do not sample intermediate sensor states',() => {
  const level = gearLevel({sensor:true,step:2}), before = initialState(level), saved = structuredClone(before);
  const result = preview(level,before,move('AC'));
  assert.equal(result.allowed,true);
  assert.equal(result.affectedCells.length,8);
  assert.deepEqual(result.steps,[{ring:'A',steps:2,direction:1},{ring:'C',steps:1,direction:-1}]);
  assert.deepEqual(before,saved);
  assert.equal(Object.isFrozen(before),true);
  assert.equal(Object.isFrozen(before.occupancy),true);
});

test('conservation and inverse properties hold across ordinary, step, gear and sensor paths',() => {
  let seed = 712;
  const random = n => {seed = (Math.imul(seed,1664525)+1013904223) >>> 0;return seed%n;};
  for (const level of [exampleLevel(),distinctLevel(),gearLevel(),gearLevel({step:2}),gearLevel({sensor:true,step:2})]) {
    const engine = createEngine(level), start = engine.initialState(), counts = Object.values(start.occupancy).sort();
    let state = start;
    const targets = structuredClone(level.targets);
    for (let turn = 0; turn < 120; turn++) {
      const moves = engine.allowedMoves(state), chosen = moves[random(moves.length)];
      const next = engine.transition(state,chosen);
      assert.equal(next.allowed,true);
      assert.deepEqual(Object.values(next.state.occupancy).sort(),counts);
      assert.equal(Object.keys(next.state.occupancy).length,level.cells.length);
      assert.equal(engine.commandStatus(next.state,chosen.command,-chosen.direction).allowed,true);
      assert.deepEqual(engine.transition(next.state,invertMove(chosen)).state.occupancy,state.occupancy);
      assert.equal(validateState(level,next.state).valid,true);
      state = next.state;
    }
    assert.deepEqual(level.targets,targets);
  }
});

test('malformed topologies, concurrent gears and hidden sensor conditions are rejected',() => {
  const broken = modifier => {const level = gearLevel();modifier(level);assert.equal(validateLevel(level).valid,false);};
  broken(level => level.cells.push({...level.cells[0]}));
  broken(level => level.rings[0].cells.push('J1'));
  broken(level => level.rings[0].cells[0] = 'missing');
  broken(level => level.rings[2].cells[0] = 'J1');
  broken(level => level.commands[0].turns[1].ring = 'B');
  broken(level => level.commands[0].requires = [{cell:'J2',type:'0'}]);
  broken(level => level.commands[0].requires = [{cell:'B1',type:'0'},{cell:'B1',type:'1'}]);
  broken(level => level.commands[0].turns[0].delta = 4);
  broken(level => level.rings[0].step = 0);
  broken(level => delete level.initial.A1);
  broken(level => level.targets = {J1:'0',A1:'0'});
  broken(level => level.pieceTypes[1].symbol = level.pieceTypes[0].symbol);
  const manyShared = exampleLevel();
  manyShared.rings[1].cells = ['J','A1','A2','B1','B2','B3'];
  assert.equal(validateLevel(manyShared).valid,true); // v2 permits three distinct meetings.
  const overLimit=exampleLevel();overLimit.rings[0].cells=['J','A1','A2','A3','B1','B2'];overLimit.rings[1].cells=['J','A1','A2','A3','B1','B2','B3'];
  assert.equal(validateLevel(overLimit).valid,true); // Six meetings support non-dihedral encounter order.
  const tooMany=structuredClone(overLimit);tooMany.cells=Array.from({length:15},(_,i)=>({id:'c'+i}));tooMany.rings=tooMany.rings.map(r=>({...r,cells:tooMany.cells.map(c=>c.id)}));tooMany.initial=Object.fromEntries(tooMany.cells.map(c=>[c.id,'0']));assert.equal(validateLevel(tooMany).valid,false);assert.ok(validateLevel(tooMany).errors.some(e=>e.includes('catorze')));
});

test('bad states and unknown directions cannot become legal no-op moves',() => {
  const level = exampleLevel(), start = initialState(level);
  for (const bad of [{command:'A'},{command:'A',direction:0},{command:'A',direction:2},{command:'missing',direction:1},null]) {
    const result = transition(level,start,bad);
    assert.equal(result.changed,false);
    assert.equal(result.state,start);
  }
  const badState = structuredClone(start);badState.occupancy.A1 = '1';
  assert.equal(validateState(level,badState).valid,false);
  assert.throws(() => transition(level,badState,move('A')),/quantidade/);
  assert.equal(replay(level,[{command:'A'}]).valid,false);
});

test('budget exhaustion means inconclusive, never impossible or optimal',() => {
  const level = exampleLevel();
  for (const options of [{maxStates:1},{timeoutMs:0},{maxDepth:2}]) {
    const result = solve(level,undefined,options);
    assert.equal(result.status,'inconclusive');
    assert.equal(result.optimal,false);
    assert.equal(result.solution,null);
  }
  assert.equal(solve(level,undefined,{maxStates:1}).visited,1);
});

test('advice follows the current freely moved board and the safe route is not claimed minimal',() => {
  const level = exampleLevel(), history = [move('A',-1),move('B'),move('A'),move('B',-1),move('B',-1)];
  const current = replay(level,history).state;
  const safe = safeSolution(level,current,{history});
  assert.equal(safe.status,'solved');
  assert.equal(safe.optimal,false);
  assert.equal(replay(level,safe.solution,{state:current}).solved,true);
  const bounded = analyzePosition(level,current,{history,maxStates:0});
  assert.equal(bounded.status,'solved');
  assert.equal(bounded.source,'safe-history');
  assert.equal(bounded.searchStatus,'inconclusive');
  for (let tier = 0; tier < 4; tier++) {
    const hint = hintFromSolution(level,current,safe.solution,tier);
    assert.equal(hint.verified,true);
    assert.ok(hint.text.length > 20);
    if (hint.move) assert.equal(transition(level,current,hint.move).allowed,true);
  }
});

test('safe advice refuses mismatched history and invalid initial certificates',() => {
  const level = exampleLevel(), history = [move('A',-1),move('B',-1),move('A',-1)];
  const state = replay(level,history).state;
  assert.equal(safeSolution(level,state,{history:[move('B')]}).status,'inconclusive');
  assert.equal(safeSolution(level,state,{history,initialSolution:[move('B')]}).status,'inconclusive');
  assert.equal(hintFromSolution(level,state,[move('B')],2).verified,false);
  assert.throws(() => certifyAnalysis(level,state,{status:'solved',solution:[move('B')],optimal:true}),/posição atual/);
  assert.equal(certifyAnalysis(level,state,{status:'unsolvable',reason:'timeout'}).status,'inconclusive');
});

test('loop erasure removes cycles from a history-derived continuation without changing the rules',() => {
  const level = exampleLevel(), history = [move('A'),move('A',-1),move('B',-1),move('A'),move('A',-1)];
  const state = replay(level,history).state;
  const safe = safeSolution(level,state,{history});
  assert.equal(safe.status,'solved');
  assert.ok(safe.solution.length < history.length + level.solution.length);
  assert.equal(replay(level,safe.solution,{state}).solved,true);
  assert.equal(safe.optimal,false);
});

test('generated phases must begin unsolved, carry reproducibility metadata and pass replay',() => {
  const level = exampleLevel();
  const generated = {level,seed:123,generatorVersion:'orbita-test-1',signature:'sample'};
  assert.equal(certifyGenerated(generated).validation.replay,true);
  assert.throws(() => certifyGenerated(generated,{recentSignatures:['sample']}),/repete/);
  assert.throws(() => certifyGenerated({...generated,seed:-1}),/seed/);
  assert.throws(() => certifyGenerated({...generated,level:{...level,solution:[move('B')]}}),/solução/);
  const solved = structuredClone(level);solved.initial = {...replay(level,level.solution).state.occupancy};solved.solution = [];
  assert.throws(() => certifyGenerated({...generated,level:solved}),/resolvida/);
});

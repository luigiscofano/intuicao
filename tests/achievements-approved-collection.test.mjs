import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  createCollectionMissionRound, observePuzzleConfirmation, pactoPairs,
  observePactoEdit, resetPactoSequence, hasAsymmetricPrumoPiece,
  approvedCollectionUnlocks, createCercoMissionRound,
  invalidateCercoMissionRound, observeCercoMission,
} from '../dist/achievements/approved-collection.mjs';
import { GEOMETRY_LEVELS } from '../dist/geometry-levels.mjs';
import { GEOMETRY_ANSWERS } from '../dist/geometry-answers.mjs';
import { initialGeometryState, validateGeometry } from '../dist/geometry-games.mjs';
import { SYMBOL_LEVELS } from '../dist/symbol-levels.mjs';
import { validateSymbols } from '../dist/symbol-games.mjs';
import { applyDirectAction } from '../dist/direct-actions.mjs';
import { createCerco, applyCercoMove, legalCercoMoves } from '../dist/cerco/engine.mjs';

const moves = [[2,1],[24,23],[0,5],[22,21],[5,6],[21,16],[4,3],[16,15],[6,11],[23,18],[11,10],[18,17],[3,8],[17,12],[8,13],[12,7],[13,14]];
function replayCerco(options = {}) {
  let state = createCerco();
  const round = createCercoMissionRound(), unlocked = [], mobile = [];
  for (const [from,to] of moves) {
    const legalBefore = legalCercoMoves(state), after = applyCercoMove(state, {from,to}).state;
    if (state.player === 0 && new Set(legalBefore.map(move => move.from)).size === 1)
      mobile.push({turn:state.turn, destinations:legalBefore.length});
    const context = {confirmed:true, mode:'local', before:state, after, legalBefore, ...options};
    unlocked.push(...observeCercoMission(round, context));
    assert.deepEqual(observeCercoMission(round, context), [], 'repeated transition never increments');
    state = after;
  }
  return { state, round, unlocked, mobile };
}

test('CERCO legal classic witness: three own turns with ONE PIECE, possibly multiple destinations, then win', () => {
  const result = replayCerco();
  assert.equal(result.state.winner, 0);
  assert.deepEqual(result.unlocked, ['cerco-last-exit']);
  assert.equal(result.mobile.length, 3);
  assert(result.mobile.some(turn => turn.destinations > 1));
});

test('CERCO preview, bot, imports and invalid modes never create evidence', () => {
  for (const options of [{confirmed:false}, {computer:true}, {custom:true}, {mode:'preview'}])
    assert.deepEqual(replayCerco(options).unlocked, []);
  const round = createCercoMissionRound();
  invalidateCercoMissionRound(round);
  const before = createCerco(), after = applyCercoMove(before, {from:2,to:1}).state;
  assert.deepEqual(observeCercoMission(round,{confirmed:true,mode:'local',before,after,legalBefore:legalCercoMoves(before)}), []);
  assert.deepEqual(round.counts, [0,0]);
  assert.equal(createCercoMissionRound().invalidated, false);
});

test('PRUMO official level 16 asymmetry is measured on an engine-validated answer, not metadata', () => {
  const level = GEOMETRY_LEVELS.prumo[15], state = {assignments:GEOMETRY_ANSWERS[level.id]};
  assert(validateGeometry(level,state).complete);
  assert(hasAsymmetricPrumoPiece(level,state));
  const context = {confirmed:true,official:true,success:true,level,state};
  assert.deepEqual(approvedCollectionUnlocks('prumo',context), ['prumo-unlikely-balance']);
  for (const options of [{confirmed:false},{official:false},{success:false}])
    assert.deepEqual(approvedCollectionUnlocks('prumo',{...context,...options}),[]);
  const symmetric = GEOMETRY_LEVELS.prumo[0];
  assert.equal(hasAsymmetricPrumoPiece(symmetric,{assignments:GEOMETRY_ANSWERS[symmetric.id]}),false);
});

function pactoWitness() {
  const level = SYMBOL_LEVELS.pacto[0], round = createCollectionMissionRound();
  let state = {values:[...level.clues],candidates:Array.from({length:64},()=>[])};
  const initialPairs = pactoPairs(level,state.values);
  const missing = [...pactoPairs(level,level.solution)].filter(([key])=>!initialPairs.has(key));
  const selected = [0,1,2,3].map(symbol => missing.find(([,value])=>value===symbol));
  const edits = [];
  const edit = cell => {
    const next = applyDirectAction('pacto',level,state,{type:'set',cell,value:level.solution[cell]});
    observePactoEdit(round,level,state,next);
    edits.push(cell); state = next;
  };
  for (const [key] of selected) for (const cell of key.split(':').slice(0,2).map(Number))
    if (state.values[cell] < 0) edit(cell);
  assert.equal(round.quartetComplete,true);
  for(let cell=0;cell<64;cell++) if(state.values[cell]<0) edit(cell);
  return {level,round,state,edits};
}

test('PACTO official level 1: four consecutive different pairs followed by legal victory', () => {
  const {level,round,state} = pactoWitness();
  assert.equal(validateSymbols(level,state.values).complete,true);
  assert.deepEqual(approvedCollectionUnlocks('pacto',{confirmed:true,official:true,success:true,level,state,round}),['pacto-quartet']);
  resetPactoSequence(round);
  assert.deepEqual(approvedCollectionUnlocks('pacto',{confirmed:true,official:true,success:true,level,state,round}),[]);
});

test('PACTO fixed pairs, triples, annotations, repeated snapshots and answer application are not a quartet', () => {
  const {level,state} = pactoWitness(), round = createCollectionMissionRound();
  observePactoEdit(round,level,state,state);
  assert.equal(round.quartetComplete,false);
  observePactoEdit(round,level,{values:level.clues},state,{human:false});
  assert.equal(round.quartetComplete,false);
  assert.equal(pactoPairs({rows:1,cols:3},[0,0,0]).size,0);
  assert.equal(pactoPairs({rows:2,cols:2},[0,0,1,1]).size,2);
});

test('First confirmation counts attempts, survives restore, and resets only on a new round', () => {
  const round = createCollectionMissionRound();
  assert.equal(observePuzzleConfirmation(round),true);
  assert.equal(observePuzzleConfirmation(round),false);
  const restored = createCollectionMissionRound({restored:true,confirmations:round.confirmations});
  assert.equal(observePuzzleConfirmation(restored),false);
  assert.equal(observePuzzleConfirmation(createCollectionMissionRound({restored:true})),false);
  assert.equal(observePuzzleConfirmation(createCollectionMissionRound()),true);
  for (const game of ['elo','prumo']) for(const level of GEOMETRY_LEVELS[game].slice(0,3)) {
    const answer = GEOMETRY_ANSWERS[level.id];
    assert(validateGeometry(level,game==='elo'?{positions:answer}:{assignments:answer}).complete);
    assert.equal(observePuzzleConfirmation(createCollectionMissionRound()),true);
    assert(initialGeometryState(level));
  }
});

test('Controller integration keeps confirmation evidence outside renders and resets CERCO history evidence', () => {
  const collection = readFileSync(new URL('../dist/collection-ui.mjs',import.meta.url),'utf8');
  const cerco = readFileSync(new URL('../dist/cerco/ui.mjs',import.meta.url),'utf8');
  assert.match(collection,/missionConfirmations: missionRound.confirmations/);
  assert.equal((collection.match(/observePuzzleConfirmation\(missionRound\)/g)||[]).length,1);
  assert.match(collection,/recordApprovedAttemptWin\(\{ gameId: game, levelId: level.id, firstConfirmation \}\)/);
  assert.match(cerco,/invalidateCercoMissionRound\(missionRound\);\s*state = redo/);
});

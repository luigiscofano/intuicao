import test from 'node:test';
import assert from 'node:assert/strict';
import { originalMissionRound, confirmOriginalMissionRound, evaluateApprovedOriginal } from '../dist/achievements/approved-original.mjs';
import { lightLevels, cutLevels } from '../dist/levels.mjs';
import { getOriginalAnswer } from '../dist/original-answers.mjs';
import { traceLightAttempt } from '../dist/light-world.mjs';
import { curvedCut, shapePolygon } from '../dist/curves.mjs';
const base = { official: true, humanConfirmed: true, success: true };
test('Salto de luz: testemunha oficial 14, três espelhos distintos e portal no mesmo raio', () => {
  assert.equal(lightLevels[13].id, 'light-v7-spacious-014');
  const state = getOriginalAnswer('light', 13);
  assert.deepEqual(lightLevels[13].solution, [45,45,45,45]);
  const ray = traceLightAttempt(state, [0,1]);
  assert.equal(ray.status, 'target');
  assert.deepEqual(ray.rays[0].reflections.map(r=>r.objectIndex), [0,1,2]);
  assert.equal(ray.rays[0].teleports[0].portalId, 'A1');
  const evidence = { ...base, gameId: 'light', ray };
  assert.deepEqual(evaluateApprovedOriginal(evidence), ['light-light-jump']);
  for (const patch of [{official:false},{humanConfirmed:false},{assisted:true},{success:false}])
    assert.deepEqual(evaluateApprovedOriginal({...evidence,...patch}), []);
  assert.deepEqual(evaluateApprovedOriginal({...evidence,ray:traceLightAttempt(state,[0])}), []);
  const separated = structuredClone(ray);
  separated.rays[1].teleports = separated.rays[0].teleports;
  separated.rays[0].teleports = [];
  assert.deepEqual(evaluateApprovedOriginal({...evidence,ray:separated}), []);
  const repeated = structuredClone(ray);
  repeated.rays[0].reflections.forEach(r=>r.objectIndex=0);
  assert.deepEqual(evaluateApprovedOriginal({...evidence,ray:repeated}), []);
});
test('Olho milimétrico: testemunha oficial e limites em pontos percentuais', () => {
  assert.equal(cutLevels[0].id,'corte-v2-1');
  const state=getOriginalAnswer('cut',0), cut=curvedCut(shapePolygon(state.shape),state);
  const evidence={...base,gameId:'cut',firstConfirmation:true,ratio:cut.ratio,target:state.target};
  assert.deepEqual(evaluateApprovedOriginal(evidence),['cut-millimetric-eye']);
  for(const ratio of [.495,.505]) assert.equal(evaluateApprovedOriginal({...evidence,ratio}).length,1);
  for(const ratio of [.494999,.505001,NaN,Infinity]) assert.deepEqual(evaluateApprovedOriginal({...evidence,ratio}),[]);
  for(const patch of [{firstConfirmation:false},{official:false},{humanConfirmed:false},{assisted:true},{success:false}])
    assert.deepEqual(evaluateApprovedOriginal({...evidence,...patch}),[]);
});
test('rodada persiste falhas/assistência, reinicia explicitamente, não confunde visita com tentativa', () => {
  const round=originalMissionRound();
  assert.equal(confirmOriginalMissionRound(round),true);
  assert.equal(confirmOriginalMissionRound(round),false);
  round.assisted=true;
  const resumed=originalMissionRound(JSON.parse(JSON.stringify(round)),{resumed:true});
  assert.deepEqual(resumed,{confirmations:2,assisted:true});
  assert.equal(confirmOriginalMissionRound(resumed),false);
  const fresh=originalMissionRound(resumed,{fresh:true,resumed:true});
  assert.deepEqual(fresh,{confirmations:0,assisted:false});
  assert.equal(confirmOriginalMissionRound(fresh),true);
  for(const saved of [undefined,{}, {confirmations:-1,assisted:false},{confirmations:NaN,assisted:false}])
    assert.deepEqual(originalMissionRound(saved,{resumed:true}),{confirmations:1,assisted:true});
});

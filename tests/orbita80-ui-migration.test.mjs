import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {CAMPAIGN,CAMPAIGN_VERSION,CAMPAIGN_TIERS,EDITORIAL_TO_INTERNAL,campaignTier} from '../dist/orbita/campaign.mjs';
import {freshOrbitaData,normalizeOrbitaData,restoreOrbitaSession,serializeOrbitaSession,commitOrbitaCommand,recordOrbitaCompletion} from '../dist/orbita/ui.mjs';
import {isWon,stateKey} from '../dist/orbita/engine.mjs';
const play=level=>level.solution.reduce((session,move)=>commitOrbitaCommand(level,session,move).session,restoreOrbitaSession(level,null));
test('six editorial ranges explicitly map to the five internal generator strengths',()=>{
 assert.deepEqual(CAMPAIGN_TIERS.map(t=>[t.start,t.end]),[[1,15],[16,30],[31,45],[46,60],[61,75],[76,80]]);
 assert.deepEqual(EDITORIAL_TO_INTERNAL,[0,1,2,3,4,4]);assert.equal(campaignTier(80).name,'Modo Sábio');assert.equal(campaignTier(81),null);
});
test('old campaign records without geometry evidence are archived, never assigned to new boards by ID',()=>{
 const level=CAMPAIGN[0],session=serializeOrbitaSession(level,play(level));delete session.geometryDefinition;
 const previous={lastId:level.id,completed:{[level.id]:{firstCompletedAt:'then'}},sessions:{[level.id]:session}};
 const data=normalizeOrbitaData({catalogVersion:'orbita-campaign-3',campaign:previous,lastView:{active:true,screen:'play',mode:'campaign'}});
 assert.deepEqual(data.legacyCampaignArchive[0].campaign,previous);assert.deepEqual(data.campaign,{lastId:null,completed:{},sessions:{}});assert.ok(data.campaignMigrationNotice);
 const again=normalizeOrbitaData(JSON.parse(JSON.stringify(data)));assert.equal(again.legacyCampaignArchive.length,1);assert.deepEqual(again.legacyCampaignArchive,data.legacyCampaignArchive);
});
test('exact definition and geometry evidence preserves unchanged history and completion across editorial revision',()=>{
 const level=CAMPAIGN[0],saved=serializeOrbitaSession(level,play(level));
 const data=normalizeOrbitaData({catalogVersion:'prior-editorial-version',campaign:{lastId:level.id,completed:{[level.id]:{firstCompletedAt:'then'}},sessions:{[level.id]:saved}}});
 assert.equal(data.campaign.lastId,level.id);assert.equal(data.campaign.completed[level.id].firstCompletedAt,'then');assert.deepEqual(data.campaign.sessions[level.id],saved);
 const changed=structuredClone(level);changed.cells[0].x+=1;assert.equal(restoreOrbitaSession(changed,saved).restored,false);
});
test('current completion, undo, redo, reset and session replay remain motor based',()=>{
 for(const level of CAMPAIGN){
  const session=play(level);assert.ok(isWon(level,session.states[session.cursor]));
  const data=freshOrbitaData();assert.equal(recordOrbitaCompletion(data,level,session,'campaign','now'),true);
  assert.equal(recordOrbitaCompletion(data,level,session,'campaign','later'),false);
  session.cursor=Math.max(0,session.cursor-1);const restored=restoreOrbitaSession(level,serializeOrbitaSession(level,session));
  assert.equal(restored.restored,true);assert.equal(stateKey(restored.states[restored.cursor]),stateKey(session.states[session.cursor]));
  restored.cursor=restored.commands.length;assert.ok(isWon(level,restored.states[restored.cursor]));
  const reset=restoreOrbitaSession(level,null);assert.equal(reset.cursor,0);assert.equal(reset.commands.length,0);assert.equal(isWon(level,reset.states[0]),false);
  const roundtrip=normalizeOrbitaData(JSON.parse(JSON.stringify(data)));assert.equal(roundtrip.catalogVersion,CAMPAIGN_VERSION);assert.deepEqual(roundtrip.campaign,data.campaign);
 }
});
test('current global control overrides and UI numbering stay intact',()=>{
 const css=fs.readFileSync(new URL('../dist/standard-controls.css',import.meta.url),'utf8');
 const ui=fs.readFileSync(new URL('../dist/orbita/ui.mjs',import.meta.url),'utf8');
 assert.ok(css.includes('#orbita :is(#o-advanced-toggle,#o-advanced){display:none!important}'));assert.ok(css.includes('#hint,#s-hint,#r-hint,#o-hint,'));
 assert.ok(ui.includes('id="o-confirm" class="primary confirm" hidden'));assert.ok(ui.includes('CAMPAIGN.slice(tier.start-1,tier.end)'));assert.ok(ui.includes('Modo Sem Parar'));assert.ok(!ui.includes('40 capítulos'));
});

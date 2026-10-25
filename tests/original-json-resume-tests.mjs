import assert from 'node:assert/strict';
import fs from 'node:fs';
import {root,store,$,timers} from './direct-ui-harness.mjs';
import {lightLevels,cutLevels} from '../dist/levels.mjs';
import {originalJSONExample,validateOriginalLevel,originalLevelIdentity,originalLevelState,validOriginalSnapshot} from '../dist/original-json.mjs';
import {generateOriginalEndless} from '../dist/endless-original.mjs';
const custom={},campaign={},endless={},expected={};
for(const [game,levels] of Object.entries({light:lightLevels,cut:cutLevels})){
 const level=validateOriginalLevel(originalJSONExample(game),game),id=originalLevelIdentity(level),state=originalLevelState(level),campaignState=originalLevelState({...levels[0],game});
 if(game==='light'){state.objects[0].angle=-60;campaignState.objects[0].angle=-58;}else{state.offset=31;campaignState.offset=23;}
 custom[id]={state,failures:3,assisted:true,cutMode:'advanced',cutDrafts:{basic:originalLevelState(level),advanced:state}};
 campaign[`${game}:${levels[0].id}`]={state:campaignState,cutMode:'advanced',cutDrafts:{basic:originalLevelState({...levels[0],game}),advanced:campaignState}};
 const generated=generateOriginalEndless(game,991,game==='light'?{sources:2,mirrors:2,walls:true,portals:true}:{shape:'Losango',holes:true,curves:true});endless[game]={seed:991,options:generated.options,state:generated.initial,count:4};expected[game]={id,state,campaignState};
}
store.set('intuicao.custom.original.v1',JSON.stringify(custom));store.set('intuicao.campaign.original.v1',JSON.stringify(campaign));store.set('intuicao.endless.original.v1',JSON.stringify(endless));
root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');document.body=root;globalThis.cancelAnimationFrame=id=>timers.delete(id);globalThis.matchMedia=()=>({matches:true});await import('../dist/app.mjs');
for(const game of ['light','cut']){
 root.querySelector(`[data-game="${game}"]`).click();$('original-json-text').value=JSON.stringify(originalJSONExample(game));$('original-json-play').click();
 assert.deepEqual(JSON.parse(store.get('intuicao.custom.original.v1'))[expected[game].id].state,expected[game].state);assert.equal($('answer-key').hidden,false);assert.equal($('answer-key').dataset.assisted,'true');
 if(game==='light')assert.equal(Number($('angle').value),-60);else{assert.equal(Number($('offset').value),31);$('cut-mode-basic').click();assert.equal(Number($('basicTravel').value),80);$('cut-mode-advanced').click();assert.equal(Number($('offset').value),31);}
 $('free').click();assert.equal(JSON.parse(store.get('intuicao.endless.original.v1'))[game].seed,991);$('challenge').click();$('level-grid').querySelector('[data-level="0"]').click();
 if(game==='light')assert.equal(Number($('angle').value),-58);else assert.equal(Number($('offset').value),23);
 $('free').click();assert.deepEqual(JSON.parse(store.get('intuicao.campaign.original.v1'))[`${game}:${game==='light'?'light-v3-1':'corte-v2-1'}`].state,expected[game].campaignState);
 console.log('PASS',game,'fresh-page custom/campaign/Endless restore, assistance and separate cut-mode drafts');
}
const definition=validateOriginalLevel(originalJSONExample('cut'),'cut'),forged=originalLevelState(definition);forged.offset=99;assert.equal(validOriginalSnapshot(definition,forged,'basic'),false);assert.equal(validOriginalSnapshot(definition,forged,'advanced'),true);forged.shape='unknown';assert.equal(validOriginalSnapshot(definition,forged,'advanced'),false);
console.log('PASS immutable snapshot fields and basic-control restrictions');

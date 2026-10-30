import assert from 'node:assert/strict';
import fs from 'node:fs';
import {lightLevels,cutLevels} from '../dist/levels.mjs';
import {root,store,$,timers} from './direct-ui-harness.mjs';
import {originalJSONExample,validateOriginalLevel,originalLevelIdentity,originalLevelAnswer,originalLevelState} from '../dist/original-json.mjs';
root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');document.body=root;
globalThis.cancelAnimationFrame=id=>timers.delete(id);globalThis.matchMedia=()=>({matches:true});
const downloads=[];URL.createObjectURL=blob=>{downloads.push(blob);return 'blob:local-test';};URL.revokeObjectURL=()=>{};
await import('../dist/app.mjs');
const customKey='intuicao.custom.original.v1',endlessKey='intuicao.endless.original.v1',campaignKey='intuicao.campaign.original.v1';
const records=()=>JSON.parse(store.get(customKey)||'{}');
const pick=game=>root.querySelector(`[data-game="${game}"]`).click();
const play=game=>{$('original-json-text').value=JSON.stringify(originalJSONExample(game));$('original-json-play').click();};
const edit=game=>$('scene').dispatch('keydown',{target:$('drawing').querySelector(game==='light'?'[data-item="0"]':'[data-item="basic-cut"]'),key:'ArrowRight'});
for(const game of ['light','cut']){
 pick(game);const count=(game==='light'?lightLevels:cutLevels).length,all=$('level-grid').querySelectorAll('[data-level]');
 assert.equal(all.length,count);assert.ok($('selection').nodes.filter(n=>n.parentElement===$('selection')).indexOf($('original-json-import'))>$('selection').nodes.filter(n=>n.parentElement===$('selection')).indexOf($('level-grid')));assert.equal($('selection-title').textContent,game==='light'?'Reflexos ·':'Corte certo ·');
 $('original-json-download').click();assert.equal(JSON.parse(await downloads.at(-1).text()).game,game);
 $('original-json-example').click();assert.equal(JSON.parse($('original-json-text').value).game,game);
 const definition=validateOriginalLevel(originalJSONExample(game),game),id=originalLevelIdentity(definition);
 play(game);assert.equal($('original-rules-panel').open,true,'Custom original entry defaults open');assert.equal($('stage-label').textContent,'FASE PERSONALIZADA');assert.equal($('level-prev').hidden,true);assert.equal($('level-next').hidden,true);assert.equal($('next').hidden,true);assert.equal($('original-custom-export').hidden,false);assert.equal($('original-endless').hidden,true);
 assert.deepEqual(records()[id].state,originalLevelState(definition));
 edit(game);const modified=records()[id].state;assert.notDeepEqual(modified,originalLevelState(definition));
 $('hint').click();assert.ok($('hint-text').textContent.length>10);
 const board=$('drawing').innerHTML,storage=[...store];$('original-json-text').value='{"game":';$('original-json-play').click();assert.equal($('original-json-status').attrs.role,'alert');assert.equal($('drawing').innerHTML,board);assert.deepEqual([...store],storage);
 $('original-json-text').value=JSON.stringify(originalJSONExample(game==='light'?'cut':'light'));$('original-json-play').click();assert.equal($('drawing').innerHTML,board);assert.deepEqual([...store],storage);
 // A direct shortcut saves the current custom puzzle and resumes Endless without regeneration.
 $('free').click();const firstEndless=JSON.parse(store.get(endlessKey))[game];assert.equal($('original-endless').hidden,false);
 $('challenge').click();play(game);assert.deepEqual(records()[id].state,modified);$('free').click();const secondEndless=JSON.parse(store.get(endlessKey))[game];assert.equal(secondEndless.seed,firstEndless.seed);assert.deepEqual(secondEndless.options,firstEndless.options);
 $('challenge').click();play(game);assert.deepEqual(records()[id].state,modified);
 for(let i=0;i<3;i++)$('confirm').click();assert.equal($('answer-key').hidden,false);assert.equal(records()[id].failures,3);assert.ok(Object.keys(JSON.parse(store.get('intuicao.answers.v1')||'{}')).every(k=>!k.startsWith('custom')));
 $('answer-key').click();assert.deepEqual(records()[id].state,originalLevelAnswer(definition));assert.equal(records()[id].assisted,true);$('confirm').click();
 assert.equal($('next').hidden,true);$('original-custom-export').click();const exported=JSON.parse(await downloads.at(-1).text());assert.equal(exported.game,game);assert.equal(originalLevelIdentity(validateOriginalLevel(exported,game)),id);
 $('reset').click();$('restart-original-confirm').click();assert.deepEqual(records()[id].state,originalLevelState(definition));assert.equal(records()[id].failures,3);assert.equal(records()[id].assisted,true);
 $('back-selection').click();assert.ok(!$('level-grid').querySelector('[data-level="0"]').attrs.class.includes('done'),'Custom completion cannot finish campaign level 1');
 // Campaign adjustments survive the direct shortcut and reopening, while Reset remains explicit.
 $('level-grid').querySelector('[data-level="0"]').click();const initial=$('drawing').innerHTML;edit(game);const edited=$('drawing').innerHTML;assert.notEqual(edited,initial);
 $('free').click();const checkpoint=JSON.parse(store.get(campaignKey))[`${game}:${game==='light'?'light-v3-1':'corte-v2-1'}`];assert.ok(checkpoint);$('challenge').click();$('level-grid').querySelector('[data-level="0"]').click();assert.equal($('drawing').innerHTML,edited);
 $('reset').click();$('restart-original-confirm').click();assert.equal($('drawing').innerHTML,initial);
 console.log('PASS',game,'JSON placement/example/download/import/export, atomic failures, hints, gabarito, isolated saves, explicit reset and direct Endless shortcut preserving both modes');
}
// A pending file read must not replace the newer game selection or a newer import.
pick('light');let resolveText;const input=$('original-json-file');input.files=[{size:300,text:()=>new Promise(resolve=>{resolveText=resolve;})}];const pending=input.onchange({target:input});pick('cut');resolveText(JSON.stringify(originalJSONExample('light')));await pending;assert.equal($('selection-title').textContent,'Corte certo ·');assert.equal(document.querySelector('.lab').hidden,true);
pick('light');const concurrent=$('original-json-file');let firstRead,secondRead;concurrent.files=[{size:300,text:()=>new Promise(resolve=>{firstRead=resolve;})}];const firstPending=concurrent.onchange({target:concurrent});concurrent.files=[{size:300,text:()=>new Promise(resolve=>{secondRead=resolve;})}];const secondPending=concurrent.onchange({target:concurrent});firstRead(JSON.stringify(originalJSONExample('light')));await firstPending;assert.equal(document.querySelector('.lab').hidden,true,'A superseded import must not open before the newer one');const newest=originalJSONExample('light');newest.name='Newest request';secondRead(JSON.stringify(newest));await secondPending;assert.equal($('game-title').textContent,'Newest request');
pick('light');const fileInput=$('original-json-file');fileInput.files=[{size:300,text:async()=>JSON.stringify(originalJSONExample('light'))}];await fileInput.onchange({target:fileInput});assert.equal($('stage-label').textContent,'FASE PERSONALIZADA');
const before=[...store],state=$('drawing').innerHTML;fileInput.files=[{size:200001,text:async()=>{throw Error('Oversized file must not be read');}}];await fileInput.onchange({target:fileInput});assert.equal($('drawing').innerHTML,state);assert.deepEqual([...store],before);
const write=localStorage.setItem;localStorage.setItem=()=>{throw Error('quota');};edit('light');assert.equal($('original-custom-storage').hidden,false);assert.equal(document.querySelector('.lab').hidden,false);localStorage.setItem=write;
console.log('PASS asynchronous navigation cancellation, real file path, oversized-file atomicity and storage warning');

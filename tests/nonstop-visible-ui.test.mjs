import assert from 'node:assert/strict';
import {host,store,$} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
const app=initCollection({hideOriginal(){}});
const visibleCopy=()=>host.innerHTML.replace(/<[^>]*>/g,' ');
for(const game of ['elo','prumo','pacto','desvio']){
 app.activate(game);$('c-free').click();
 const level=JSON.parse($('c-editor-json').value),saved=store.get('intuicao.collection.v1');
 assert.ok(level.id.startsWith('endless-'),'internal identity retained');
 assert.match(visibleCopy(),/Modo Sem Parar/);
 assert.doesNotMatch(visibleCopy(),/endlesss?/i,`${game}: no raw internal ID in header or old user-facing term`);
 const id=level.id;$('c-back').click();$('c-free').click();
 assert.equal(JSON.parse($('c-editor-json').value).id,id,'resuming retains exact internal identity');
 assert.doesNotMatch(visibleCopy(),/endlesss?/i,`${game}: resume copy`);
 assert.ok(JSON.parse(saved).sessions[`endless:${game}`],'existing session key unchanged');
 console.log('PASS',game,'new/resumed visible copy and preserved identity/session keys');
}

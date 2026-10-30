import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {host,store,$} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {GEOMETRY_ANSWERS} from '../dist/geometry-answers.mjs';
const baseline=execFileSync('git',['show','cf3cb986d34e47bbca3519e3b3e1421b326d6f10:dist/geometry-levels.mjs'],{encoding:'utf8',maxBuffer:30e6});
const old=JSON.parse(baseline.match(/export const GEOMETRY_LEVELS = (.*);/)[1]).prumo;
const levels=GEOMETRY_LEVELS.prumo,active=new Set(levels.map(l=>l.id));
const retired=old.find(l=>!active.has(l.id));assert.ok(retired);
const retained=levels.find(l=>old.some(o=>o.id===l.id));
const h=id=>({past:[],present:{assignments:GEOMETRY_ANSWERS[id]},future:[]});
const data={version:1,sessions:{[retired.id]:{history:h(retired.id),assistance:true}},completed:[retired.id],events:[],lastSessions:{prumo:retired.id}};
if(retained){data.sessions[retained.id]={history:h(retained.id),assistance:true};data.completed.push(retained.id);}
const initial=structuredClone(data);store.set('intuicao.collection.v1',JSON.stringify(data));
store.set('intuicao.answers.v1',JSON.stringify({['prumo:'+retired.id]:{failures:3,assisted:true},...(retained?{['prumo:'+retained.id]:{failures:3,assisted:true}}:{})}));
const app=initCollection({hideOriginal(){}});app.activate('prumo');
const saved=()=>JSON.parse(store.get('intuicao.collection.v1'));
assert.deepEqual(saved().sessions,initial.sessions);
assert.deepEqual(saved().prumoLegacy.campaign80.records[retired.id].session,initial.sessions[retired.id]);
assert.equal(saved().lastSessions.prumo,undefined);
assert.equal(host.querySelectorAll('.done').length,retained?1:0);
if(retained){host.querySelector(`[data-new-level="${levels.indexOf(retained)}"]`).click();assert.deepEqual(saved().sessions[retained.id].history.present.assignments,GEOMETRY_ANSWERS[retained.id]);assert.equal($('c-answer').hidden,false);$('c-back').click();}
const changed=levels.find(l=>!old.some(o=>o.id===l.id));assert.ok(changed);
host.querySelector(`[data-new-level="${levels.indexOf(changed)}"]`).click();
assert.ok(!saved().completed.includes(changed.id));assert.equal($('c-answer').hidden,true);
assert.deepEqual(saved().sessions[retired.id],initial.sessions[retired.id]);
console.log(JSON.stringify({passed:true,retiredRecord:retired.id,retainedIdentity:retained?.id??null,newIdentity:changed.id,noOrdinalTransfer:true}));

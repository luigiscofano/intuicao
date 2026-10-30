import assert from 'node:assert/strict';
import {host,store,$} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {GEOMETRY_ANSWERS} from '../dist/geometry-answers.mjs';
import {protectedPrumoCells} from '../dist/direct-actions.mjs';
const levels=GEOMETRY_LEVELS.prumo,app=initCollection({hideOriginal(){}});
let checked=0;
for(const index of [0,15,30,45,60,75,...levels.flatMap((l,i)=>l.rows===10&&l.cols===10?[i]:[])]){
 app.activate('prumo');host.querySelector(`[data-new-level="${index}"]`).click();
 const l=levels[index],answer=GEOMETRY_ANSWERS[l.id],snapshot=()=>JSON.parse(store.get('intuicao.collection.v1')).sessions[l.id].history.present.assignments;
 const initial=snapshot(),cell=initial.findIndex(v=>v<0);assert.ok(cell>=0);
 host.querySelector(`[data-value="${answer[cell]}"]`).click();$('c-board').querySelector(`[data-cell="${cell}"]`).dispatch('keydown',{key:'Enter'});assert.equal(snapshot()[cell],answer[cell]);
 $('c-check').click();assert.equal($('c-check-status').textContent,'Tudo certo até aqui!');
 $('c-undo').click();assert.deepEqual(snapshot(),initial);$('c-redo').click();assert.equal(snapshot()[cell],answer[cell]);
 const painted=snapshot();$('c-reset').click();assert.equal($('restart-collection').open,true);$('restart-collection-cancel').click();assert.deepEqual(snapshot(),painted);
 $('c-reset').click();$('restart-collection-confirm').click();assert.deepEqual(snapshot(),initial);
 for(let i=0;i<3;i++)$('c-confirm').click();$('c-answer').click();assert.deepEqual(snapshot(),answer);
 const other=(answer[cell]+1)%l.supports.length;host.querySelector(`[data-value="${other}"]`).click();$('c-board').querySelector(`[data-cell="${cell}"]`).dispatch('keydown',{key:'Enter'});assert.equal(snapshot()[cell],other);
 $('c-check').click();assert.match($('c-check-ring').className,/manual-check-error/);assert.match($('c-check-status').textContent,/Há escolhas/);
 for(const c of protectedPrumoCells(l))assert.equal(snapshot()[c],answer[c]);
 checked++;
}
console.log(JSON.stringify({passed:true,interactiveLevels:checked,flows:['keyboard paint','protected anchors','green/red Checar','undo/redo','restart cancel/confirm'],tenByTen:levels.filter(l=>l.rows===10&&l.cols===10).length,nativeBrowser:false}));

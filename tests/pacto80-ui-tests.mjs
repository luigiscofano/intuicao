/** Production UI handlers exercised in synthetic deterministic DOM, NOT native browser/layout QA. */
import assert from 'node:assert/strict';
import {host,store,$} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {validateSymbols} from '../dist/symbol-games.mjs';
import {SYMBOL_CYCLE} from '../dist/direct-actions.mjs';
const levels=SYMBOL_LEVELS.pacto,read=()=>JSON.parse(store.get('intuicao.collection.v1'));let app=initCollection({hideOriginal(){}});app.activate('pacto');
assert.equal(levels.length,80);assert.equal(host.querySelectorAll('[data-new-level]').length,80);assert.deepEqual(host.querySelectorAll('.level-group').map(g=>g.querySelectorAll('[data-new-level]').length),[15,15,15,15,15,5]);
let reloads=0;
for(let index=0;index<80;index++){
 const l=levels[index];host.querySelector(`[data-new-level="${index}"]`).click();const snapshot=()=>read().sessions[l.id].history.present.values;
 assert.match(host.innerHTML,new RegExp('DESAFIO '+(index+1)+' / 80'));assert.equal($('c-level-prev').disabled,index===0);assert.equal($('c-level-next').disabled,index===79);assert.equal($('c-board').querySelectorAll('[data-cell]').length,64);
 assert.equal(validateSymbols(l,snapshot()).complete,false);assert.equal($('c-answer').hidden,true);
 const free=l.clues.findIndex(v=>v<0),fixed=l.clues.findIndex(v=>v>=0),input=(i,v)=>$('c-board').querySelector(`[data-cell="${i}"]`).dispatch('keydown',{key:String(SYMBOL_CYCLE.indexOf(v)+1)});
 input(fixed,(l.clues[fixed]+1)%4);assert.equal(snapshot()[fixed],l.clues[fixed]);
 $('c-hint').click();assert.ok($('c-hint-text').textContent.length>15);assert.ok(!$('c-hint').textContent.includes('1/3'));assert.ok(!$('c-hint-text').textContent.includes('undefined'));
 input(free,l.solution[free]);assert.equal(snapshot()[free],l.solution[free]);const before=JSON.stringify(read());$('c-check').click();assert.equal(JSON.stringify(read()),before);assert.match($('c-check-status').textContent,/Tudo certo/);assert.notEqual($('c-motion').dataset.outcome,'win');
 $('c-undo').click();assert.deepEqual(snapshot(),l.clues);$('c-redo').click();assert.equal(snapshot()[free],l.solution[free]);
 $('c-reset').click();assert.equal($('restart-collection').open,true);$('restart-collection-cancel').click();assert.equal(snapshot()[free],l.solution[free]);$('c-reset').click();$('restart-collection-confirm').click();assert.deepEqual(snapshot(),l.clues);
 for(let i=0;i<3;i++){$('c-confirm').click();assert.notEqual($('c-motion').dataset.outcome,'win');assert.equal($('c-answer').hidden,i<2);}
 $('c-answer').click();assert.deepEqual(snapshot(),l.solution);assert.ok(validateSymbols(l,snapshot()).valid);assert.notEqual($('c-motion').dataset.outcome,'win');assert.ok(!read().completed.includes(l.id));
 $('c-check').click();assert.match($('c-check-status').textContent,/Tudo certo/);$('c-confirm').click();assert.equal($('c-motion').dataset.outcome,'win');assert.ok(read().completed.includes(l.id));assert.match($('c-status').textContent,/assistida/);$('c-back').click();
 if(index%15===14){app=initCollection({hideOriginal(){}});app.activate('pacto');host.querySelector(`[data-new-level="${index}"]`).click();assert.deepEqual(snapshot(),l.solution);assert.equal($('c-answer').hidden,false);assert.ok(read().completed.includes(l.id));$('c-back').click();reloads++;}
 console.log('PASS UI',index+1,l.id);
}
assert.equal(read().completed.filter(id=>levels.some(l=>l.id===id)).length,80);$('c-daily').click();assert.match(host.innerHTML,/DESAFIO DO DIA/);$('c-back').click();
for(const game of ['elo','prumo']){app.activate(game);assert.equal(host.querySelectorAll('[data-new-level]').length,80);assert.equal(host.querySelectorAll('.level-group').length,6);}
console.log(JSON.stringify({passed:true,campaignLevels:80,confirmedFailures:240,verifiedAnswers:80,explicitWins:80,hints:80,undoRedo:80,restartCancelConfirm:80,clueProtection:80,reloads,nativeBrowser:false}));

/** Every published ELO phase traverses the actual UI flow in the deterministic DOM harness. */
import assert from 'node:assert/strict';
import {host,store,$} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {GEOMETRY_LEVELS} from '../dist/geometry-levels.mjs';
import {GEOMETRY_ANSWERS} from '../dist/geometry-answers.mjs';
import {validateGeometry} from '../dist/geometry-games.mjs';
const levels=GEOMETRY_LEVELS.elo,read=()=>JSON.parse(store.get('intuicao.collection.v1'));
assert.equal(levels.length,80);let app=initCollection({hideOriginal(){}});app.activate('elo');
assert.equal(host.querySelectorAll('[data-new-level]').length,80);
assert.equal(host.querySelectorAll('.elo-stage').length,6);
assert.deepEqual(host.querySelectorAll('.level-group').map(g=>g.querySelectorAll('[data-new-level]').length),[15,15,15,15,15,5]);
let failures=0,answers=0,reloads=0;
for(let index=0;index<levels.length;index++){
 const l=levels[index];host.querySelector(`[data-new-level="${index}"]`).click();
 const session=()=>read().sessions[l.id].history.present;
 assert.match(host.innerHTML,new RegExp('DESAFIO '+(index+1)+' / 80'));
 assert.equal($('c-level-prev').disabled,index===0);assert.equal($('c-level-next').disabled,index===79);
 assert.equal($('c-board').querySelectorAll('[data-cell]').length,l.rows*l.cols);
 assert.equal(validateGeometry(l,session()).complete,false,l.id+' begins as a puzzle');
 assert.equal($('c-answer').hidden,true,l.id+' answer initially hidden');
 for(let i=0;i<3;i++){$('c-confirm').click();failures++;assert.notEqual($('c-motion').dataset.outcome,'win');assert.equal($('c-answer').hidden,i<2);}
 $('c-answer').click();answers++;
 assert.deepEqual(session().positions,GEOMETRY_ANSWERS[l.id]);
 for(const [r,c]of Object.entries(l.fixed??{}))assert.equal(session().positions[r],c);
 assert.equal(validateGeometry(l,session()).complete,true,l.id+' applied answer satisfies rules');
 assert.notEqual($('c-motion').dataset.outcome,'win','answer application never auto-wins');
 assert.ok(!read().completed.includes(l.id));
 $('c-confirm').click();assert.equal($('c-motion').dataset.outcome,'win');assert.ok(read().completed.includes(l.id));
 assert.match($('c-status').textContent,/assistida/);
 $('c-back').click();
 if(index%15===14){app=initCollection({hideOriginal(){}});app.activate('elo');host.querySelector(`[data-new-level="${index}"]`).click();assert.ok(validateGeometry(l,session()).complete);assert.equal($('c-answer').hidden,false);assert.ok(read().completed.includes(l.id));$('c-back').click();reloads++;}
}
assert.equal(read().completed.filter(id=>levels.some(l=>l.id===id)).length,80);
console.log(JSON.stringify({passed:true,campaignLevels:80,confirmedFailures:failures,verifiedAnswers:answers,reloadChecks:reloads,explicitWins:80}));
$('c-daily').click();assert.match(host.innerHTML,/DESAFIO DO DIA/);assert.ok(levels.some(l=>host.innerHTML.includes(l.id)),'Daily picks only current campaign');$('c-back').click();
app.activate('prumo');assert.equal(host.querySelectorAll('[data-new-level]').length,200);assert.equal(host.querySelectorAll('.level-group').length,4);
app.activate('pacto');assert.equal(host.querySelectorAll('[data-new-level]').length,200);
console.log('PASS daily campaign bounds and other campaign grouping/count isolation');

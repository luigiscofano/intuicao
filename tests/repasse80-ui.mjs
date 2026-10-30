// Actual UI handlers in deterministic DOM. This does not claim native-browser/mobile layout coverage.
import assert from 'node:assert/strict';
import {host,store,$,Element} from './direct-ui-harness.mjs';
import {CAMPAIGN,CHAPTERS,DIFFICULTIES} from '../dist/repasse/campaign.mjs';
import {initRepasse} from '../dist/repasse/ui.mjs';
import {initialState,stateKey,isWon,preview} from '../dist/repasse/engine.mjs';
Element.prototype.append=function(...children){children.forEach(child=>this.appendChild(child));};
Element.prototype.replaceChildren=function(...children){this.innerHTML='';this.append(...children);};
host.id='repasse';globalThis.addEventListener=()=>{};globalThis.removeEventListener=()=>{};
const key='intuicao.repasse.v1',read=()=>JSON.parse(store.get(key));
assert.equal(CAMPAIGN.length,80);
assert.deepEqual(CHAPTERS,['Básico','Aprendiz','Intermediário','Avançado','Mestre','Modo Sábio']);
assert.deepEqual(DIFFICULTIES,CHAPTERS);
const app=initRepasse();app.activate();
assert.equal(host.querySelectorAll('[data-r-level]').length,80);
assert.equal(host.querySelectorAll('.r-chapter').length,6);
assert.match(host.innerHTML,/80 níveis em seis faixas/);
assert.match(host.innerHTML,/Níveis 76–80/);
assert.doesNotMatch(host.innerHTML,/500 níveis|20 capítulos/);
for(let i=0;i<CAMPAIGN.length;i++){
 const level=CAMPAIGN[i];host.querySelector(`[data-r-level="${i}"]`).click();
 assert.match(host.innerHTML,new RegExp(`${String(i+1).padStart(2,'0')} / 80`));
 const saved=()=>read().campaign.sessions[level.id];
 assert.equal($('r-level-prev').disabled,i===0);assert.equal($('r-level-next').disabled,i===79);
 if([30,45,60].includes(i))assert.match(host.innerHTML,/Uma nova configuração/);
 for(const pieceId of level.solution){
  const position=level.pieces.findIndex(piece=>piece.id===pieceId),before=saved().state;
  const button=$('r-piece-'+position);button.onfocus();
  for(const transfer of preview(level,before,pieceId))assert.ok($('r-preview').textContent.includes('+'+transfer.value),'full-value recipient preview');
  button.click();
 }
 assert.equal(isWon(level,saved().state),true,`automatic win ${i+1}`);
 assert.ok(read().campaign.completed[level.id],`stable-ID recorded win ${i+1}`);
 const won=structuredClone(saved());
 $('r-undo').click();assert.equal(saved().cursor,won.cursor-1);
 $('r-redo').click();assert.equal(stateKey(saved().state),stateKey(won.state));
 $('r-reset').click();assert.equal($('restart-repasse').open,true);
 $('restart-repasse-cancel').click();assert.deepEqual(saved(),won);
 $('r-reset').click();$('restart-repasse-confirm').click();
 assert.equal(saved().cursor,0);assert.equal(stateKey(saved().state),stateKey(initialState(level)));
 assert.ok(read().campaign.completed[level.id],'reset keeps completion');
 $('r-back').click();
}
assert.equal(Object.keys(read().campaign.completed).length,80);
assert.deepEqual(read().learnedConfigurations,['original','single','corner','four']);
assert.ok(read().events.some(event=>event.displayNumber===80&&event.campaignVersion===2));
// Resume an in-progress retained identity, not a historical/display ordinal.
host.querySelector('[data-r-level="30"]').click();
const resumeLevel=CAMPAIGN[30],firstPosition=resumeLevel.pieces.findIndex(piece=>piece.id===resumeLevel.solution[0]);
$('r-piece-'+firstPosition).click();
const partial=structuredClone(read().campaign.sessions[resumeLevel.id]);
app.destroy();const resumed=initRepasse();assert.equal(resumed.restoreOnLoad(),true);
assert.match(host.innerHTML,/31 \/ 80/);
assert.equal(stateKey(read().campaign.sessions[resumeLevel.id].state),stateKey(partial.state));
assert.equal(read().campaign.sessions[resumeLevel.id].cursor,1);
$('r-back').click();
// Current JSON import panel rejects malformed files without changing progress and accepts engine-certified definitions.
$('r-import-json').value='{invalid';await $('r-import-paste').onclick();assert.match($('r-import-status').textContent,/JSON inválido/);
assert.equal(Object.keys(read().campaign.completed).length,80);
$('r-import-json').value=JSON.stringify({...CAMPAIGN[0],game:'repasse'});await $('r-import-paste').onclick();
assert.match(host.innerHTML,/EDITOR · FASE PERSONALIZADA/);
assert.equal(read().custom.level.id,'custom-'+CAMPAIGN[0].id);
for(const id of CAMPAIGN[0].solution)$('r-piece-'+CAMPAIGN[0].pieces.findIndex(piece=>piece.id===id)).click();
assert.equal(isWon(read().custom.level,read().custom.session.state),true);
assert.equal(Object.keys(read().campaign.completed).length,80,'custom victory is outside campaign');
$('r-back').click();$('r-daily').click();assert.equal(read().lastView.daily,true);
assert.match(host.innerHTML,/DESAFIO DO DIA/);
resumed.hide();console.log('PASS REPASSE80: 80 selections and actual-handler automatic wins, exact preview values, complete-state undo/redo, confirmed reset/cancel, stable identities, limits, six tiers/milestones, partial resume, invalid/valid custom import, and daily flow. Deterministic DOM, not native browser/mobile layout.');

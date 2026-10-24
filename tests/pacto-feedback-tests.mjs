import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createPactoFeedback} from '../dist/pacto-feedback.mjs';
import {host,$,store} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
function fakeClock(){
 let time=0,id=0;const pending=new Map();
 return {Date:{now:()=>time},setTimeout(fn,delay=0){pending.set(++id,{fn,at:time+delay});return id;},clearTimeout(id){pending.delete(id);},pending,
  tick(ms){const end=time+ms;while(true){const next=[...pending].filter(([,e])=>e.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!next)break;time=next[1].at;pending.delete(next[0]);next[1].fn();}time=end;}};
}
const clock=fakeClock();let changes=0;const feedback=createPactoFeedback(()=>changes++,clock);
const a={kind:'pair',cells:[0,1,2]},b={kind:'pair',cells:[8,9,10]},values=Array(64).fill(0);
assert.equal(feedback.sync([a],values).violations.length,0);clock.tick(2999);
assert.equal(feedback.sync([a],values).violations.length,0);assert.equal(changes,0);
clock.tick(1);assert.equal(changes,1);assert.equal(feedback.sync([a],values).violations.length,1);
clock.tick(150);assert.equal(feedback.sync([a],values).fadeByCell.get(0),150);
assert.equal(feedback.sync([a,b],values).violations.length,1);clock.tick(2999);
assert.equal(feedback.sync([a,b],values).violations.length,1);clock.tick(1);
assert.equal(feedback.sync([a,b],values).violations.length,2);
feedback.reset();feedback.sync([a],values);const stale=[...clock.pending.values()][0].fn;
feedback.sync([],values);const previous=changes;stale();clock.tick(5000);assert.equal(changes,previous,'Callback obsoleto é inerte');
feedback.sync([a],values);clock.tick(1000);feedback.reset();feedback.sync([a],values);clock.tick(2999);
assert.equal(feedback.sync([a],values).violations.length,0);clock.tick(1);assert.equal(feedback.sync([a],values).violations.length,1);
feedback.reset();feedback.sync([a],values);assert.equal(feedback.sync([a],values,{immediate:true}).violations.length,1);assert.equal(clock.pending.size,0);
console.log('PASS relógio unitário: 2999/3000 ms, rerender, novos conflitos, cancelamento, callback obsoleto, reset e confirmação');

const uiClock=fakeClock();globalThis.setTimeout=uiClock.setTimeout;globalThis.clearTimeout=uiClock.clearTimeout;
const originalNow=Date.now;Date.now=uiClock.Date.now;
const app=initCollection({hideOriginal(){}}),l=SYMBOL_LEVELS.pacto[0];
const cell=i=>$('c-board').querySelector(`[data-cell="${i}"]`);
const key=(i,key)=>cell(i).dispatch('keydown',{key});
const triple=Array.from({length:64},(_,i)=>[i,i+1,i+2]).find(c=>c[0]%8<6&&c.every(i=>l.clues[i]<0));
function start(){app.activate('pacto');host.querySelector('[data-new-level="0"]').click();$('c-reset').click();$('restart-collection-confirm').click();}
function error(){for(const i of triple)key(i,'1');}
const marked=()=>$('c-board').querySelectorAll('.cell-conflict').length;
function concealed(){assert.equal(marked(),0);assert.equal($('c-live-errors').hidden,true);assert.equal($('c-live-errors').textContent,'');for(const i of triple){assert.equal(cell(i).attrs['aria-invalid'],undefined);assert.ok(!cell(i).attrs['aria-label'].includes('conflito'));}}
try{
 start();error();concealed();uiClock.tick(2999);concealed();$('c-advanced-toggle').click();concealed();uiClock.tick(1);
 for(const i of triple){assert.ok(cell(i).matches('.cell-conflict'));assert.ok(cell(i).matches('.pacto-conflict-enter'));assert.equal(cell(i).attrs['aria-invalid'],'true');}
 uiClock.tick(150);$('c-advanced-toggle').click();assert.match(cell(triple[0]).attrs.style,/--pacto-fade-offset:-150ms/);
 uiClock.tick(200);$('c-advanced-toggle').click();assert.ok(!cell(triple[0]).matches('.pacto-conflict-enter'));
 console.log('PASS integração: aviso e ARIA atrasados, rerender preserva timer e andamento do fade');
 start();error();uiClock.tick(1000);for(const i of triple)key(i,'Delete');uiClock.tick(4000);concealed();
 start();error();uiClock.tick(1000);$('c-direct-undo').click();$('c-direct-redo').click();uiClock.tick(2999);concealed();uiClock.tick(1);assert.ok(marked()>0);
 console.log('PASS integração: correção cancela aviso; desfazer/refazer inicia novo prazo');
 start();error();$('c-reset').click();$('restart-collection-confirm').click();uiClock.tick(4000);concealed();
 start();error();$('c-back').click();host.querySelector('[data-new-level="1"]').click();uiClock.tick(4000);assert.equal(marked(),0);
 start();error();app.activate('elo');host.querySelector('[data-new-level="0"]').click();uiClock.tick(4000);assert.equal(marked(),0);
 start();error();app.hide();uiClock.tick(4000);assert.equal(host.hidden,true);
 console.log('PASS integração: reinício, outro nível, outro jogo e saída descartam timers');
 start();error();$('c-confirm').click();assert.equal($('c-motion').dataset.outcome,'loss');assert.ok(marked()>0,'Confirmação revela erros explícitos imediatamente');
 for(let i=0;i<2;i++)$('c-confirm').click();$('c-answer').click();uiClock.tick(4000);assert.equal(marked(),0);
 assert.deepEqual(JSON.parse(store.get('intuicao.collection.v1')).sessions[l.id].history.present.values,l.solution);
 console.log('PASS integração: confirmação imediata e gabarito sem avisos obsoletos');
}finally{Date.now=originalNow;}
const css=readFileSync(new URL('../dist/style.css',import.meta.url),'utf8');
assert.match(css,/background:repeating-linear-gradient\(135deg,transparent 0 7px,#c5434336 7px 8px\);box-shadow:inset 0 0 0 1px #b94242a6/);
assert.match(css,/@media\(prefers-reduced-motion:no-preference\)\{\s*\.board-pacto \.grid-cell\.pacto-conflict-enter::after\{animation:pacto-hatch-enter \.3s/);
assert.match(css,/@keyframes pacto-hatch-enter\{from\{opacity:0\}to\{opacity:1\}\}/);
console.log('PASS CSS: desenho original preservado; fade só na camada de erro, desativado com movimento reduzido');

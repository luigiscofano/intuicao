import assert from 'node:assert/strict';
import {host,$,store} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
import {SYMBOL_LEVELS} from '../dist/symbol-levels.mjs';
import {validateSymbolEditing,validateSymbols} from '../dist/symbol-games.mjs';
import {prepareManualCheck} from '../dist/geometry-check.mjs';
import {createPactoFeedback} from '../dist/pacto-feedback.mjs';
import {SYMBOL_CYCLE} from '../dist/direct-actions.mjs';
function clock(){let t=0,n=0;const pending=new Map();return {Date:{now:()=>t},setTimeout(fn,ms=0){pending.set(++n,{at:t+ms,fn});return n;},clearTimeout(id){pending.delete(id);},tick(ms){const end=t+ms;for(;;){const q=[...pending].filter(([,x])=>x.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!q)break;t=q[1].at;pending.delete(q[0]);q[1].fn();}t=end;}};}
const c=clock();globalThis.setTimeout=c.setTimeout;globalThis.clearTimeout=c.clearTimeout;const originalNow=Date.now;Date.now=c.Date.now;
const levels=SYMBOL_LEVELS.pacto,app=initCollection({hideOriginal(){}}),cell=i=>$('c-board').querySelector(`[data-cell="${i}"]`),input=(i,v)=>cell(i).dispatch('keydown',{key:String(SYMBOL_CYCLE.indexOf(v)+1)}),marked=()=>$('c-board').querySelectorAll('.cell-conflict').length;
let fixture;
for(const [index,l] of levels.entries()){for(let i=0;i<62;i++){const triple=[i,i+1,i+2];if(i%8<6&&triple.every(j=>l.clues[j]<0)){fixture={index,l,triple};break;}}if(fixture)break;}
assert.ok(fixture,'campaign has a mutable triple for real UI feedback fixture');const {index,l,triple}=fixture;
const read=()=>JSON.parse(store.get('intuicao.collection.v1'));
function start(){app.activate('pacto');host.querySelector(`[data-new-level="${index}"]`).click();$('c-reset').click();$('restart-collection-confirm').click();}
function err(){for(const i of triple)input(i,0);}
try{
 start();const failures=localStorage.getItem('intuicao.answers.v1');err();assert.equal(marked(),0);assert.equal(localStorage.getItem('intuicao.answers.v1'),failures);c.tick(1999);assert.equal(marked(),0);c.tick(1);for(const i of triple){assert.ok(cell(i).matches('.cell-conflict'));assert.ok(cell(i).matches('.pacto-conflict-enter'));assert.equal(cell(i).attrs['aria-invalid'],'true');}
 for(const i of triple)cell(i).dispatch('keydown',{key:'Delete'});c.tick(4000);assert.equal(marked(),0);
 start();err();c.tick(1000);for(const i of triple)cell(i).dispatch('keydown',{key:'Delete'});c.tick(4000);assert.equal(marked(),0,'repair before delay suppresses stale hatch');
 start();err();c.tick(1000);$('c-undo').click();$('c-redo').click();assert.equal(marked(),0);c.tick(1999);assert.equal(marked(),0);c.tick(1);assert.ok(marked()>0);
 start();err();$('c-reset').click();$('restart-collection-confirm').click();c.tick(4000);assert.equal(marked(),0);
 start();err();$('c-back').click();host.querySelector('[data-new-level="79"]').click();c.tick(4000);assert.equal(marked(),0);
 // Find a nonreference choice which has no explicit violation and remains merely pending.
 let partial;for(const [ix,p] of levels.entries()){for(let i=0;i<64;i++)if(p.clues[i]<0)for(let v=0;v<4;v++)if(v!==p.solution[i]){const a=p.clues.slice();a[i]=v;if(!validateSymbolEditing(p,a).violations.length){partial={ix,p,i,v};break;}}if(partial)break;}
 assert.ok(partial);app.activate('pacto');host.querySelector(`[data-new-level="${partial.ix}"]`).click();$('c-reset').click();$('restart-collection-confirm').click();input(partial.i,partial.v);c.tick(4000);assert.equal(marked(),0,'partial reference mismatch is not an automatic explicit error');
 const before=JSON.stringify(read());$('c-check').click();assert.equal(JSON.stringify(read()),before);assert.match($('c-check-status').textContent,/referência/);assert.ok(!/impossível|sem solução/.test($('c-check-status').textContent));
 // Complete valid alternate must win according to rules, independently of answer key.
 const alternate=levels[0].solution.map(v=>(v+1)%4),free={...levels[0],clues:Array(64).fill(-1)};assert.ok(validateSymbols(free,alternate).valid);assert.equal(prepareManualCheck(free,{values:alternate},levels[0].solution).kind,'correct');Object.defineProperty(free,'solution',{get(){throw Error('reference must not be read');}});assert.ok(validateSymbols(free,alternate).valid);
 const blank={game:'pacto',rows:8,cols:8,clues:Array(64).fill(-1)},a=blank.clues.slice();a[0]=0;a[1]=1;assert.equal(validateSymbolEditing(blank,a).violations.length,0);a[8]=2;assert.ok(validateSymbolEditing(blank,a).violations.length);a[8]=-1;a[2]=0;a[4]=0;assert.equal(validateSymbolEditing(blank,a).violations.length,0,'incomplete overquota is not hatched');
 console.log(JSON.stringify({passed:true,fixture:l.id,delay1999:true,delay2000:true,cancelBeforeAfterRepair:true,undoRedoTimer:true,resetNavigation:true,partialMismatchNotImpossible:true,alternateValidRuleAccepted:true,nativeBrowser:false}));
}finally{Date.now=originalNow;}

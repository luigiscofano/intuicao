import assert from 'node:assert/strict';
import fs from 'node:fs';
import {root,store,$,timers,Element} from './direct-ui-harness.mjs';
import {originalJSONExample} from '../dist/original-json.mjs';
// Only DOM geometry and native input properties are simulated here, not rendering.
for(const key of ['min','max','type'])Object.defineProperty(Element.prototype,key,{get(){return this.attrs[key]??'';},set(value){this.attrs[key]=String(value);},configurable:true});
root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');document.body=root;
globalThis.cancelAnimationFrame=id=>timers.delete(id);globalThis.matchMedia=()=>({matches:true});
store.set('intuicao.endless.original.v1',JSON.stringify({light:{seed:211,options:{sources:1,mirrors:1,walls:false,portals:false},count:0},cut:{seed:301,options:{shape:'Retângulo',curves:false,holes:false},count:0}}));
await import('../dist/app.mjs');
$('scene').createSVGPoint=()=>({x:0,y:0,matrixTransform(){return {x:this.x,y:this.y};}});$('scene').getScreenCTM=()=>({inverse(){return {};}});
const pick=game=>root.querySelector(`[data-game="${game}"]`).click();
const reset=()=>{$('reset').click();$('restart-original-confirm').click();};
const controls=game=>game==='light'?'angle':$('basicTravel')?'basicTravel':'offset';
const value=game=>Number($(controls(game)).value);
const handle=game=>$('drawing').querySelector(game==='light'?'[data-item="0"]':$('basicTravel')?'[data-item="basic-cut"]':'[data-item="cut"]');
const key=(game,k='ArrowRight')=>$('scene').dispatch('keydown',{target:handle(game),key:k});
const pointer=(type,game,x=400,y=230,id=1)=>$('scene').dispatch(type,{target:game==='light'?$('drawing').querySelector('[data-rotate="0"]'):handle(game),clientX:x,clientY:y,pointerId:id});
const ctrl=(shift=false,target=$('scene'))=>target.dispatch('keydown',{key:'z',ctrlKey:true,shiftKey:shift});
const input=(game,n,valid=true)=>{const el=$(controls(game));el.validity={valid};el.value=String(n);el.dispatch('input');return el;};
for(const game of ['light','cut'])for(const mode of ['campaign','custom','endless']){
 pick(game);if(mode==='campaign')$('level-grid').querySelector('[data-level="0"]').click();else if(mode==='custom'){$('original-json-text').value=JSON.stringify(originalJSONExample(game));$('original-json-play').click();}else $('selection-free').click();reset();
 const toolbar=$('undo').parentElement,siblings=toolbar.nodes.filter(n=>n.parentElement===toolbar).map(n=>n.id);assert.deepEqual(siblings,['undo','redo','reset','original-rules-panel','toggle-controls']);
 assert.equal($('undo').disabled,true);assert.equal($('redo').disabled,true);const initial=value(game);
 key(game);const edited=value(game);assert.notEqual(edited,initial);assert.equal($('undo').disabled,false);ctrl();assert.equal(value(game),initial);assert.equal($('undo').disabled,true);assert.equal($('redo').disabled,false);ctrl(true);assert.equal(value(game),edited);assert.equal($('redo').disabled,true);
 $('undo').click();key(game,'ArrowLeft');assert.equal($('redo').disabled,true,'New edit discards redo');
 reset();input(game,initial+2);const field=input(game,initial+4);field.dispatch('change');assert.equal(value(game),initial+4);$('undo').click();assert.equal(value(game),initial);assert.equal($('undo').disabled,true,'One field session is one undo');$('redo').click();assert.equal(value(game),initial+4);
 reset();const invalid=input(game,initial+5,false);invalid.dispatch('change');assert.equal($('undo').disabled,true);input(game,initial).dispatch('change');assert.equal($('undo').disabled,true,'No-op input is not history');
 reset();pointer('pointerdown',game);pointer('pointerup',game);assert.equal($('undo').disabled,true,'No-op drag is not history');
 pointer('pointerdown',game);pointer('pointermove',game,450,280);pointer('pointermove',game,475,310);const dragged=value(game);assert.notEqual(dragged,initial);pointer('pointermove',game,650,450,99);assert.equal(value(game),dragged,'Second pointer cannot alter active gesture');pointer('pointerup',game);$('undo').click();assert.equal(value(game),initial);assert.equal($('undo').disabled,true,'Many drag frames are one undo');$('redo').click();assert.equal(value(game),dragged);
 for(const cancel of ['pointercancel','lostpointercapture','Escape']){reset();pointer('pointerdown',game);pointer('pointermove',game,450,280);assert.notEqual(value(game),initial);if(cancel==='Escape')$('scene').dispatch('keydown',{key:'Escape'});else pointer(cancel,game);assert.equal(value(game),initial);assert.equal($('undo').disabled,true,'Cancelled gesture does not enter history');assert.equal($('redo').disabled,true);}
 reset();input(game,initial+8);$('scene').dispatch('keydown',{key:'Escape'});assert.equal(value(game),initial);assert.equal($('undo').disabled,true);
 key(game);const beforeTextarea=value(game);ctrl(false,$('original-json-text'));assert.equal(value(game),beforeTextarea,'JSON textarea keeps native text undo');
 $('reset').click();assert.equal($('undo').disabled,true);$('restart-original-cancel').click();assert.equal($('undo').disabled,false);$('undo').click();assert.equal(value(game),initial);
 reset();for(let i=0;i<100;i++)key(game,i%2?'ArrowLeft':'ArrowRight');let undoCount=0;while(!$('undo').disabled&&undoCount<120){$('undo').click();undoCount++;}assert.equal(undoCount,80,'History is bounded to 80 changes');
 reset();for(let i=0;i<3;i++)$('confirm').click();assert.equal($('answer-key').hidden,false);const beforeAnswer=value(game);$('answer-key').click();const solved=value(game);assert.notEqual(solved,beforeAnswer);assert.equal($('undo').disabled,false);$('undo').click();assert.equal(value(game),beforeAnswer);assert.equal($('answer-key').dataset.assisted,'true');$('redo').click();assert.equal(value(game),solved);assert.equal($('metric').textContent,'—','Redo must not evaluate automatically');assert.equal($('drawing').innerHTML.includes('data-ray='),false,'History edits must not reveal rays');
 $('confirm').click();const endlessBefore=mode==='endless'?JSON.parse(store.get('intuicao.endless.original.v1'))[game]:null;$('undo').click();assert.equal(value(game),beforeAnswer);assert.equal($('answer-key').hidden,false);
 if(mode==='endless'){const after=JSON.parse(store.get('intuicao.endless.original.v1'))[game];assert.equal(after.count,endlessBefore.count);assert.equal(after.seed,endlessBefore.seed);$('redo').click();$('confirm').click();assert.equal(JSON.parse(store.get('intuicao.endless.original.v1'))[game].count,endlessBefore.count,'Undo/redo cannot award one seed twice');}
 else if(mode==='campaign'){$('back-selection').click();assert.ok($('level-grid').querySelector('[data-level="0"]').attrs.class.includes('done'),'Undo cannot revoke recorded campaign completion');}
 if(mode!=='campaign'){reset();assert.equal($('undo').disabled,true);assert.equal($('redo').disabled,true);}
 console.log('PASS',game,mode,'toolbar order, keyboard/field/atomic drag history, cancel, bounded stacks, gabarito, reset, no evaluation or progress rollback');
}
// An undo interrupts the in-flight trace without turning it into a failed attempt.
pick('light');$('level-grid').querySelector('[data-level="0"]').click();reset();key('light');globalThis.matchMedia=()=>({matches:false});const progress=store.get('intuicao.answers.v1');$('confirm').click();assert.equal($('scene').attrs['aria-busy'],'true');$('undo').click();assert.equal($('scene').attrs['aria-busy'],'false');assert.equal(store.get('intuicao.answers.v1'),progress);assert.equal($('drawing').innerHTML.includes('data-ray='),false);
console.log('PASS undo cancels active ray frames without a fake attempt');

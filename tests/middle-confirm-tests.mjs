import assert from 'node:assert/strict';
import {Element,host} from './direct-ui-harness.mjs';
import {bindMiddleConfirm} from '../dist/middle-confirm.mjs';
const board=host.appendChild(new Element()),cell=board.appendChild(new Element('button',{'data-cell':'0'})),link=board.appendChild(new Element('a'));let count=0,enabled=true;
const binding=bindMiddleConfirm(board,{enabled:()=>enabled,onConfirm:()=>count++});
const opts={button:1,buttons:4};
const down=(target=cell)=>target.dispatch('pointerdown',opts),up=(target=cell)=>target.dispatch('pointerup',{...opts,buttons:0});
for(let i=0;i<3;i++){assert.ok(down().defaultPrevented);assert.ok(cell.dispatch('mousedown',opts).defaultPrevented);up();cell.dispatch('auxclick',opts);cell.dispatch('auxclick',opts);assert.equal(count,i+1);}
for(const type of ['pointercancel','lostpointercapture']){down();cell.dispatch(type,opts);up();assert.equal(count,3);}
down();cell.dispatch('pointermove',{...opts,clientX:90});up();assert.equal(count,3);
down();cell.dispatch('keydown',{key:'Escape'});up();assert.equal(count,3);
down();for(const f of document.defaultView.listeners.get('blur'))f();up();assert.equal(count,3);
down();binding.cancel();up();assert.equal(count,3);
down();cell.dispatch('pointerup',{...opts,clientX:900});assert.equal(count,3);
for(const button of [0,2]){cell.dispatch('pointerdown',{button});cell.dispatch('pointerup',{button});assert.equal(count,3);}
assert.ok(!down(link).defaultPrevented);up(link);assert.equal(count,3);
enabled=false;assert.ok(!down().defaultPrevented);up();assert.equal(count,3);enabled=true;
document.hasFocus=()=>false;down();up();assert.equal(count,3);document.hasFocus=()=>true;
cell.dispatch('pointerdown',{...opts,buttons:5});up();assert.equal(count,3);
cell.dispatch('pointerdown',{...opts,pointerType:'touch'});up();assert.equal(count,3);
binding.destroy();down();up();assert.equal(count,3);
console.log('PASS middle: one confirmation per gesture; native defaults suppressed; cancellation/movement/outside/blur/focus/chords/touch/links/other buttons/cleanup');

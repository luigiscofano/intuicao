import assert from 'node:assert/strict';
import {validateGeometry} from '../dist/geometry-games.mjs';
import {prumoBalanceModel,prumoBalanceMarkup} from '../dist/prumo-balance.mjs';
import {host,$} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
const level={game:'prumo',rows:3,cols:3,supports:[{id:0,x2:2,y2:2}]};
for(let row=0;row<3;row++)for(let col=0;col<3;col++){
 const state={assignments:Array(9).fill(-1)};state.assignments[row*3+col]=0;
 const moment=validateGeometry(level,state).moments[0],snapshot=JSON.stringify(state),m=prumoBalanceModel(level,state,0,moment),html=prumoBalanceMarkup(level,state,0,moment);
 assert.equal(m.dx,col-1);assert.equal(m.dy,row-1);assert.equal(m.centerX,col);assert.equal(m.centerY,row);assert.equal(m.balanced,row===1&&col===1);
 assert.match(html,new RegExp(`horizontal ${moment.x}; vertical ${moment.y}`));assert.match(html,/pb-support/);assert.match(html,/pb-center/);assert.equal(JSON.stringify(state),snapshot);
}
const empty={assignments:Array(9).fill(-1)},zero=validateGeometry(level,empty).moments[0];
assert.equal(prumoBalanceModel(level,empty,0,zero).balanced,false);assert.equal(prumoBalanceModel(level,empty,0,zero).centerX,null);assert.match(prumoBalanceMarkup(level,empty,0,zero),/Peça sem casas/);assert.doesNotMatch(prumoBalanceMarkup(level,empty,0,zero),/class="pb-center"/);
const app=initCollection({hideOriginal(){}});app.activate('prumo');host.querySelector('[data-new-level="0"]').click();
assert.equal($('c-details').hidden,true);host.querySelector('[data-value="0"]').click();$('c-moments').click();assert.equal($('c-details').hidden,false);assert.match($('c-details').innerHTML,/prumo-balance/);
host.querySelector('[data-value="0"]').click();const before=$('c-details').innerHTML;
$('c-board').querySelector('[data-cell="0"]').dispatch('keydown',{key:'Enter'});const edited=$('c-details').innerHTML;assert.notEqual(edited,before);
$('c-undo').click();assert.equal($('c-details').innerHTML,before);$('c-redo').click();assert.equal($('c-details').innerHTML,edited);
host.querySelector('[data-value="1"]').click();assert.match($('c-details').innerHTML,/Peça B/);
$('c-moments').click();assert.equal($('c-details').hidden,true);assert.equal($('c-details').innerHTML,'');
console.log('PASS PRUMO: all nine signed-axis combinations, empty piece, true COM, no mutation, toggle, selection, editing, undo and redo.');

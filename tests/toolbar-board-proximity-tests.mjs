import assert from 'node:assert/strict';
import fs from 'node:fs';
import {host,root,$} from './direct-ui-harness.mjs';
import {initCollection} from '../dist/collection-ui.mjs';
const app=initCollection({hideOriginal(){}});
function adjacent(stage,board){const siblings=stage.parentElement.nodes.filter(n=>n.parentElement===stage.parentElement);assert.equal(siblings[siblings.indexOf(stage)+1],board,'Toolbar immediately precedes board navigation');}
for(const game of ['elo','prumo','pacto','desvio']){
 app.activate(game);host.querySelector(game==='desvio'?'[data-map="0"]':'[data-new-level="0"]').click();
 const stage=host.querySelector('.collection-stage-top'),board=host.querySelector('.board-navigation');adjacent(stage,board);
 assert.ok(host.nodes.indexOf($('c-tools'))<host.nodes.indexOf(stage),'Tools precede final action sequence');
 assert.ok(host.nodes.indexOf($('c-direct-controls'))<host.nodes.indexOf(stage),'Direct controls precede action sequence');
 assert.ok(!$('c-open-palette'),'No global values/candidates button');
 assert.ok($('c-local-palette'),'Local candidate UI retained');
 for(const open of [false,true]){const panel=$('c-rules-panel');panel.open=open;panel.dispatch('toggle');$('c-advanced-toggle').click();adjacent(host.querySelector('.collection-stage-top'),host.querySelector('.board-navigation'));}
}
root.innerHTML=fs.readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
adjacent(root.querySelector('.stage-top'),root.querySelector('.board-navigation'));
assert.ok(root.nodes.indexOf(root.querySelector('.level-picker'))<root.nodes.indexOf(root.querySelector('.stage-top')),'Original picker precedes final toolbar');
const css=fs.readFileSync(new URL('../dist/style.css',import.meta.url),'utf8');
assert.ok(css.includes('.experiment>.stage-top+.board-navigation{margin-top:0}'));
assert.ok(css.includes('.experiment>.stage-top>.stage-tools{justify-content:flex-end;margin-left:auto;flex-wrap:wrap}'));
assert.ok(css.includes('.stage-top>.stage-tools>#toggle-controls{min-height:44px!important}'));
console.log('PASS toolbar immediately before map after tools/picker, right aligned/responsive, six shared game layouts, no global candidate button, local palette retained; native spacing pending browser QA.');

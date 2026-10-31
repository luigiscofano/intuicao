// Actual UI DOM order plus scoped CSS contracts; native layout checked separately.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {host,$} from './direct-ui-harness.mjs';
import {CAMPAIGN} from '../dist/sintonia/campaign.mjs';
import {initSintonia} from '../dist/sintonia/ui.mjs';
host.id='sintonia';globalThis.addEventListener=()=>{};
const app=initSintonia({hideOtherGames(){}});app.open();
for(let i=0;i<CAMPAIGN.length;i++){
 host.querySelector(`[data-s-level="${i}"]`).click();
 const board=host.querySelector('.s-board-navigation'),actions=host.querySelector('.level-actions'),readout=host.querySelector('.s-readout');
 assert.equal(board.parentElement,actions.parentElement);
 assert.ok(host.nodes.indexOf(board)<host.nodes.indexOf(actions));
 assert.ok(host.nodes.indexOf(actions)<host.nodes.indexOf(readout));
 assert.ok('hidden' in $('s-confirm').attrs,'auto-completion keeps confirmation hidden');
 assert.equal($('s-moves').parentElement.parentElement,host.querySelector('.s-command-row'));
 assert.equal(host.querySelectorAll('[data-s-direction]').length,4);
 assert.equal(host.querySelectorAll('.s-map').length,CAMPAIGN[i].boards.length);
 $('s-back').click();
}
const css=readFileSync(new URL('../dist/sintonia/scenery.css',import.meta.url),'utf8');
assert.match(css,/@media\(min-width:681px\)\{[\s\S]*--s-cell-max:54px[\s\S]*--s-cell-max:48px[\s\S]*--s-cell-max:40px/);
assert.match(css,/margin:8px 0 0;padding-top:8px/);
const ui=readFileSync(new URL('../dist/sintonia/ui.css',import.meta.url),'utf8');
assert.match(ui,/#sintonia \.s-readout\{min-height:0/);
console.log('PASS 80 Sintonia layouts: actions directly after board, hidden confirm, arrows/counter intact, desktop-only cap reduction.');

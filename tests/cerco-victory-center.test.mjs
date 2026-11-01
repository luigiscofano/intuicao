import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
const base='18e176c8c5457494cb9b84181e67d3de35510032';
test('somente apresentação CERCO mudou; motores, mapas, BROTO e animações preservados',()=>{
 const paths=execFileSync('git',['diff','--name-only',base,'--','dist'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
 assert.deepEqual(paths.sort(),['dist/cerco/ui.css','dist/cerco/ui.mjs']);
});
test('tabuleiro e vitória usam a mesma linha; controles ficam separados',()=>{
 const ui=readFileSync('dist/cerco/ui.mjs','utf8'),css=readFileSync('dist/cerco/ui.css','utf8');
 assert.match(ui,/class="ce-board-extras"><div class="board-check-controls ce-check">/);
 assert.match(css,/grid-template-rows:subgrid/);
 assert.match(css,/#ce-result\{grid-area:1 \/ 2 \/ 2 \/ 3;align-self:center\}/);
 assert.match(css,/\.ce-board-extras\{grid-row:2\}/);
});

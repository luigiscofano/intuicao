import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SELECTION_GAMES, presentSelection, initSelectionPresentation } from '../dist/selection-presentation.mjs';
import { CATEGORY_GAMES } from '../dist/category-navigation.mjs';
const source=readFileSync(new URL('../dist/selection-presentation.mjs',import.meta.url),'utf8');
const css=readFileSync(new URL('../dist/selection-presentation.css',import.meta.url),'utf8');
test('seleção cobre 25 jogos: 14 campanhas e 11 Versus sem modos solo',()=>{
 assert.deepEqual(Object.keys(SELECTION_GAMES).sort(),Object.values(CATEGORY_GAMES).flat().sort());
 assert.equal(Object.values(SELECTION_GAMES).filter(x=>x==='campaign').length,14);
 assert.equal(Object.values(SELECTION_GAMES).filter(x=>x==='versus').length,11);
 assert.match(source,/daily=campaign\?root.querySelector/);assert.match(source,/endless=campaign\?root.querySelector/);
});
test('apresentação não escreve saves nem clona ou dispara controles',()=>{
 assert.doesNotMatch(source,/localStorage|sessionStorage|\.click\(|dispatchEvent|innerHTML|outerHTML|cloneNode|Math.random|fetch\(/);
 assert.match(source,/parent\.append\(item\)/);assert.match(source,/observer\.disconnect\(\)/);
 assert.doesNotThrow(()=>presentSelection(null,'light'));assert.doesNotThrow(()=>initSelectionPresentation(null,null)());
});
test('níveis compartilham grade, estados, foco e nomes acessíveis',()=>{
 assert.match(css,/:is\(\.level-tile,\.logic-level\)/);assert.match(css,/:is\(\.level-tile.done,\.logic-level.completed\)/);
 assert.match(css,/grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/);assert.match(css,/focus-visible/);assert.match(source,/tile.title=name.textContent/);
 assert.match(source,/Continue explorando no seu ritmo/);assert.doesNotMatch(source,/80 fases existentes/);
});
test('Desvio preserva dados e mapas mas não oferece Sem parar',()=>{
 const ui=readFileSync(new URL('../dist/collection-ui.mjs',import.meta.url),'utf8');
 assert.match(ui,/<button id="c-free" class="primary" \$\{game === "desvio" \? "hidden" : ""\}/);
 assert.match(ui,/<button id="c-mode-endless" type="button" \$\{game === "desvio" \? "hidden" : ""\}/);
 assert.match(ui,/data-map=/);assert.match(ui,/c-tactical/);
});
test('camada vem depois do shell, com diário original único',()=>{
 const html=readFileSync(new URL('../dist/index.html',import.meta.url),'utf8');
 assert.ok(html.indexOf('selection-presentation.css')>html.indexOf('campaign-action-buttons.css'));
 assert.ok(html.indexOf('selection-presentation.mjs')>html.indexOf('approved-game-shell.mjs'));
 assert.equal((html.match(/id="selection-daily"/g)||[]).length,1);
});

import test from 'node:test';import assert from 'node:assert/strict';import{readFileSync}from'node:fs';
import{CATEGORY_GAMES}from'../dist/category-navigation.mjs';import{GAME_INFO}from'../dist/game-info-content.mjs';import{GAME_NAV_ICONS}from'../dist/game-nav-icons.mjs';import{RULE_EXAMPLES}from'../dist/rules-examples.mjs';import{rulesPreviewMarkup}from'../dist/rules-preview.mjs';import{selectionSelector}from'../dist/game-nav-scroll.mjs';import{deriveControl,VERTICE_EDGES}from'../dist/vertice/engine.mjs';
const read=n=>readFileSync(new URL('../dist/'+n,import.meta.url),'utf8');
test('VÉRTICE appended after TRAMA, exact card/objective and isolated route',()=>{
 assert.deepEqual(CATEGORY_GAMES.versus,['desvio','broto','cerco','trama','vertice']);const html=read('index.html');assert.equal((html.match(/data-vertice="vertice"/g)||[]).length,1);assert.equal((html.match(/id="vertice"/g)||[]).length,1);assert.ok(html.indexOf('data-trama="trama"')<html.indexOf('data-vertice="vertice"'));assert.match(html,/VÉRTICE <small>Mova suas peças e controle três pontos de encontro\.<\/small>/);assert.equal(GAME_INFO.vertice.summary,'Controle simultaneamente os três pontos vazios do tabuleiro.');assert.equal((read('app.mjs').match(/vertice\.hide\(\)/g)||[]).length,9);
});
test('VÉRTICE inherits info32/card52/monoicon/selection and curved-support teaching',()=>{
 assert.equal(selectionSelector({dataset:{vertice:'vertice'}}),'#vertice > .level-screen');assert.equal(selectionSelector({dataset:{vertice:'vertice',infoGame:'vertice'}}),null);assert.equal((GAME_NAV_ICONS.vertice.match(/<circle/g)||[]).length,9);assert.doesNotMatch(GAME_NAV_ICONS.vertice,/#|fill=|stroke=/);assert.match(read('game-info.css'),/\[data-vertice\]\)\{padding-right:52px\}/);assert.match(read('game-info.css'),/#ve-selection-title,#ve-title/);const html=rulesPreviewMarkup('vertice');assert.match(html,/Como jogar VÉRTICE/);assert.match(html,/Não altera a partida/);assert.match(html,/linha reta ou em L/);assert.doesNotMatch(html,/pistas da fase|<script|onload=|onclick=|animal|mascote/);assert.equal(RULE_EXAMPLES.vertice.steps.length,3);
});
test('Illustrated 12-edge meshes and L/disputed positions agree with actual motor',()=>{
 assert.equal(VERTICE_EDGES.length,12);assert.ok(VERTICE_EDGES.every(([a,b])=>Math.abs(a-b)===3||Math.floor(a/3)===Math.floor(b/3)));
 const left=[0,null,0,null,0,null,1,1,1],right=[0,0,null,0,null,1,null,1,1];const a=deriveControl(left),b=deriveControl(right);
 assert.deepEqual(a.scores,[3,0]);assert.equal(a.control[3],0);assert.deepEqual([...a.supports[3][0]].sort(),[0,4]);assert.deepEqual(b.scores,[0,0]);assert.equal(b.control[4],'disputed');assert.equal(b.control[2],'neutral');assert.equal(b.control[6],'neutral');
});

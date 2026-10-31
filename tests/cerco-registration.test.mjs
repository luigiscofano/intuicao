import test from 'node:test';
import {createCerco,applyCercoMove} from '../dist/cerco/engine.mjs';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {CATEGORY_GAMES} from '../dist/category-navigation.mjs';
import {GAME_INFO} from '../dist/game-info-content.mjs';
import {GAME_NAV_ICONS} from '../dist/game-nav-icons.mjs';
import {RULE_EXAMPLES} from '../dist/rules-examples.mjs';
import {rulesPreviewMarkup} from '../dist/rules-preview.mjs';
import {selectionSelector} from '../dist/game-nav-scroll.mjs';
const read=name=>readFileSync(new URL('../dist/'+name,import.meta.url),'utf8');
test('CERCO is appended after existing Versus games with exact description',()=>{
 assert.deepEqual(CATEGORY_GAMES,{intuicao:['light','cut'],logica:['elo','prumo','pacto','sintonia','repasse','orbita'],versus:['desvio','broto','cerco','trama','vertice']});
 const html=read('index.html');assert.equal((html.match(/data-cerco="cerco"/g)||[]).length,1);assert.equal((html.match(/id="cerco"/g)||[]).length,1);
 assert.ok(html.indexOf('data-broto="broto"')<html.indexOf('data-cerco="cerco"'));
 assert.match(html,/CERCO <small>Mova suas peças, feche caminhos e deixe o adversário sem saída\.<\/small>/);
 assert.match(html,/href="cerco\/ui.css"/);assert.match(read('app.mjs'),/createCercoRoute\(\{hideOthers\(\)/);
 assert.equal((read('app.mjs').match(/cerco\.hide\(\)/g)||[]).length,9);
});
test('CERCO reuses card icons, info32, padding52, preview and navigation contracts',()=>{
 assert.equal(selectionSelector({dataset:{cerco:'cerco'}}),'#cerco > .level-screen');
 assert.equal(selectionSelector({dataset:{cerco:'cerco',infoGame:'cerco'}}),null);
 assert.match(GAME_NAV_ICONS.cerco,/<path/);assert.doesNotMatch(GAME_NAV_ICONS.cerco,/#|fill=|stroke=/);
 assert.equal(GAME_INFO.cerco.summary,'Faça a última jogada: quem ficar sem movimentos na sua vez perde.');
 assert.match(read('game-info.css'),/\[data-cerco\],\[data-trama\],\[data-vertice\]\)\{padding-right:52px\}/);
 assert.match(read('game-info.css'),/#ce-selection-title,#ce-title/);
 const html=rulesPreviewMarkup('cerco');assert.match(html,/Como jogar CERCO/);assert.match(html,/Não altera a partida/);assert.doesNotMatch(html,/pistas da fase|<script|onload=|onclick=/);
 assert.equal(RULE_EXAMPLES.cerco.steps.length,3);assert.match(html,/L1C3 → L2C3/);assert.match(html,/seis peças permanecem/);
});
test('Existing ten illustrations, information texts and pictograms are unchanged',async()=>{
 const base='f2a6422a5b1f6573b989dc3871530ec960c006c0';
 for(const [file,key,next] of [['rules-examples.mjs','RULE_EXAMPLES',RULE_EXAMPLES],['game-info-content.mjs','GAME_INFO',GAME_INFO],['game-nav-icons.mjs','GAME_NAV_ICONS',GAME_NAV_ICONS]]){
  const old=execFileSync('git',['show',base+':dist/'+file],{encoding:'utf8'});const prev=(await import('data:text/javascript;base64,'+Buffer.from(old).toString('base64')))[key];
  assert.equal(Object.keys(prev).length,10);for(const name of Object.keys(prev))assert.deepEqual(next[name],prev[name],name);
 }
 const oldCSS=execFileSync('git',['show',base+':dist/platform.css'],{encoding:'utf8'});
 assert.equal(read('platform.css').replaceAll(', #vertice > .level-screen','').replaceAll(', #vertice:not([hidden]) > .level-screen','').replaceAll(', #trama > .level-screen','').replaceAll(', #trama:not([hidden]) > .level-screen','').replaceAll(', #cerco > .level-screen','').replaceAll(', #cerco:not([hidden]) > .level-screen',''),oldCSS);
});

test('CERCO illustrated example executes in the actual engine',()=>{
 const start=createCerco(),next=applyCercoMove(start,{from:2,to:7}).state;
 assert.equal(start.board[2],0);assert.equal(next.board[2],'barrier');assert.equal(next.board[7],0);
 assert.equal(next.board.filter(x=>x===0||x===1).length,6);assert.equal(next.board.filter(x=>x===null).length,18);
 assert.equal(next.board.filter(x=>x==='barrier').length,1);assert.equal(next.player,1);
 for(const cell of [0,4,20,22,24])assert.equal(next.board[cell],start.board[cell]);
 assert.match(RULE_EXAMPLES.cerco.svg,/L1C3 → L2C3/);
});

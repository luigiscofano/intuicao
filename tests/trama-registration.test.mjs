import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CATEGORY_GAMES} from '../dist/category-navigation.mjs';
import {GAME_INFO} from '../dist/game-info-content.mjs';
import {GAME_NAV_ICONS} from '../dist/game-nav-icons.mjs';
import {RULE_EXAMPLES} from '../dist/rules-examples.mjs';
import {rulesPreviewMarkup} from '../dist/rules-preview.mjs';
import {selectionSelector} from '../dist/game-nav-scroll.mjs';
import {analyzeBoard} from '../dist/trama/engine.mjs';
const read=name=>readFileSync(new URL('../dist/'+name,import.meta.url),'utf8');
test('TRAMA is appended after CERCO with exact card and objective',()=>{
 assert.deepEqual(CATEGORY_GAMES.versus,['desvio','broto','cerco','trama']);
 const html=read('index.html');assert.equal((html.match(/data-trama="trama"/g)||[]).length,1);assert.equal((html.match(/id="trama"/g)||[]).length,1);
 assert.ok(html.indexOf('data-cerco="cerco"')<html.indexOf('data-trama="trama"'));
 assert.match(html,/TRAMA <small>Conecte seis peças e interrompa as pontes do adversário\.<\/small>/);
 assert.equal(GAME_INFO.trama.summary,'Forme uma única rede com pelo menos seis peças suas.');
 assert.equal((read('app.mjs').match(/trama\.hide\(\)/g)||[]).length,8);
});
test('TRAMA inherits info32/card52/monoicon/selection and correct teaching text',()=>{
 assert.equal(selectionSelector({dataset:{trama:'trama'}}),'#trama > .level-screen');
 assert.equal(selectionSelector({dataset:{trama:'trama',infoGame:'trama'}}),null);
 assert.match(GAME_NAV_ICONS.trama,/<path/);assert.doesNotMatch(GAME_NAV_ICONS.trama,/#|fill=|stroke=/);
 assert.match(read('game-info.css'),/\[data-trama\]\)\{padding-right:52px\}/);
 assert.match(read('game-info.css'),/#tr-selection-title,#tr-title/);
 const html=rulesPreviewMarkup('trama');assert.match(html,/Como jogar TRAMA/);assert.match(html,/Não altera a partida/);assert.doesNotMatch(html,/pistas da fase|<script|onload=|onclick=|animal|mascote|verde|amarelo/);
 assert.equal(RULE_EXAMPLES.trama.steps.length,3);
});
test('TRAMA bridge-interruption illustration agrees with actual graph analysis',()=>{
 const board=Array(36).fill(null);board[0]=board[2]=0;const before=analyzeBoard(board);board[1]=1;const after=analyzeBoard(board);
 assert.deepEqual(before.maxSizes,[2,0]);assert.deepEqual(after.maxSizes,[1,1]);assert.equal(before.graphs[0].edges.length,1);assert.equal(after.graphs[0].edges.length,0);
 assert.match(RULE_EXAMPLES.trama.svg,/Duas redes azuis de 1/);
});

test('all eleven prior information objects, diagrams, pictograms and game modules are preserved',async()=>{
 const {execFileSync}=await import('node:child_process');const base='39b553cd754e908dd56f36a01bf1c81db83b2e9c';
 for(const [file,key,next] of [['rules-examples.mjs','RULE_EXAMPLES',RULE_EXAMPLES],['game-info-content.mjs','GAME_INFO',GAME_INFO],['game-nav-icons.mjs','GAME_NAV_ICONS',GAME_NAV_ICONS]]){
 const old=execFileSync('git',['show',base+':dist/'+file],{encoding:'utf8'});const previous=(await import('data:text/javascript;base64,'+Buffer.from(old).toString('base64')))[key];assert.equal(Object.keys(previous).length,11);for(const name of Object.keys(previous))assert.deepEqual(next[name],previous[name],name);}
 const changed=execFileSync('git',['diff',base,'--name-only','--','dist/cerco','dist/broto','dist/sintonia','dist/repasse','dist/orbita'],{encoding:'utf8'});assert.equal(changed,'');
});

test('compact board reserves at least the measured 44px target without changing other games',()=>{
 const css=read('trama/ui.css');assert.match(css,/@media\(max-width:360px\)\{#trama \.tr-lab\{padding-inline:0\}#trama \.tr-board-wrap\{padding:2px\}\}/);
 assert.match(css,/prefers-reduced-motion:reduce/);assert.match(css,/\.tr-connections\{[^}]*pointer-events:none/);
});

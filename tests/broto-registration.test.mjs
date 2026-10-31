import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {CATEGORY_GAMES} from '../dist/category-navigation.mjs';
import {GAME_INFO} from '../dist/game-info-content.mjs';
import {GAME_NAV_ICONS} from '../dist/game-nav-icons.mjs';
import {RULE_EXAMPLES} from '../dist/rules-examples.mjs';
import {rulesPreviewMarkup} from '../dist/rules-preview.mjs';
import {selectionSelector} from '../dist/game-nav-scroll.mjs';
const read=name=>readFileSync(new URL('../dist/'+name,import.meta.url),'utf8');
test('BROTO is the second Versus game without reorganizing existing categories',()=>{
 assert.deepEqual(CATEGORY_GAMES,{intuicao:['light','cut'],logica:['elo','prumo','pacto','sintonia','repasse','orbita'],versus:['desvio','broto']});
 const html=read('index.html');assert.equal((html.match(/data-broto="broto"/g)||[]).length,1);assert.equal((html.match(/id="broto"/g)||[]).length,1);
 assert.match(html,/BROTO <small>Plante sementes, complete estímulos e escolha quem floresce\.<\/small>/);
 assert.match(html,/href="broto\/ui.css"/);assert.match(read('app.mjs'),/createBrotoRoute\(\{hideOthers\(\)/);
});
test('BROTO reuses navigation, mono pictogram, information and instructional components',()=>{
 assert.equal(selectionSelector({dataset:{broto:'broto'}}),'#broto > .level-screen');
 assert.equal(selectionSelector({dataset:{broto:'broto',infoGame:'broto'}}),null);
 assert.match(GAME_NAV_ICONS.broto,/<path/);assert.doesNotMatch(GAME_NAV_ICONS.broto,/#|fill=|stroke=/);
 assert.equal(GAME_INFO.broto.name,'BROTO');assert.match(GAME_INFO.broto.summary,/Você planta\. Mas quem floresce\?/);
 assert.match(GAME_INFO.broto.rules.join(' '),/somente o primeiro/);assert.match(GAME_INFO.broto.rules.join(' '),/iniciador alternado/);
 const html=rulesPreviewMarkup('broto');assert.match(html,/Como jogar BROTO/);assert.match(html,/Não altera a partida/);assert.doesNotMatch(html,/pistas da fase|<script|onload=|onclick=/);
 assert.equal(RULE_EXAMPLES.broto.steps.length,3);assert.match(html,/rpx-broto-flower/);
});
test('BROTO routes participate in hide and information title contracts',()=>{
 const app=read('app.mjs');assert.equal((app.match(/broto\.hide\(\)/g)||[]).length,6);
 const info=read('game-info.mjs');assert.match(info,/#b-selection-title,#b-title/);assert.match(info,/'#broto'/);assert.match(info,/dataset\.broto/);
});

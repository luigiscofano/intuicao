import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { APPROVED_GAME_ART, updateGameArt } from '../dist/game-aiij.mjs';
test('somente as dezenove artes aprovadas do shell entram no catálogo',()=>{assert.deepEqual(Object.keys(APPROVED_GAME_ART),['light','cut','elo','repasse','broto','cerco','mosaico','acorde','prumo','pacto','quinhao','sintonia','estalo','foz','mirante','renovo','pulso','refugio','desvio']);});
test('SVGs com dimensões explícitas e sem execução externa',()=>{for(const source of Object.values(APPROVED_GAME_ART)){const svg=readFileSync(new URL('../dist/'+source,import.meta.url),'utf8');assert.match(svg,/viewBox="-?[0-9.]+ -?[0-9.]+ [0-9.]+ [0-9.]+"/);assert.doesNotMatch(svg,/<script|onload=|(?:href|xlink:href)=["']https?:|<foreignObject/);}});
test('troca de jogo não deixa a arte anterior em jogos sem aprovação',()=>{const node={setAttribute(k,v){this[k]=v},removeAttribute(k){delete this[k]}};updateGameArt(node,'light');assert.equal(node.hidden,false);assert.match(node.src,/light/);updateGameArt(node,'inexistente');assert.equal(node.hidden,true);assert.equal(node.src,undefined);updateGameArt(node,'acorde');assert.match(node.src,/acorde/);});

import { ACTIVE_GAME_IDS } from '../dist/game-catalog.mjs';
test('coleção cobre os 19 jogos pelo mesmo registro',()=>{assert.deepEqual(Object.keys(APPROVED_GAME_ART).sort(),[...ACTIVE_GAME_IDS].sort());assert.equal(APPROVED_GAME_ART.desvio,'assets/desvio-aiij.svg');const ui=readFileSync(new URL('../dist/collection-ui.mjs',import.meta.url),'utf8');assert.doesNotMatch(ui,/class="desvio-aiij"/);});
test('tamanho único por breakpoint e nenhuma duplicação específica',()=>{const css=readFileSync(new URL('../dist/approved-game-shell.css',import.meta.url),'utf8');assert.match(css,/width:120px; height:76px/);assert.match(css,/width:72px; height:46px/);const legacy=readFileSync(new URL('../dist/desvio-presentation.css',import.meta.url),'utf8');assert.doesNotMatch(legacy,/\.desvio-aiij/);});

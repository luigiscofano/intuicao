import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { APPROVED_GAME_ART, updateGameArt } from '../dist/game-aiij.mjs';
test('somente as dezoito artes aprovadas do shell entram no catálogo',()=>{assert.deepEqual(Object.keys(APPROVED_GAME_ART),['light','cut','elo','repasse','broto','cerco','mosaico','acorde','prumo','pacto','quinhao','sintonia','estalo','foz','mirante','renovo','pulso','refugio']);});
test('SVGs com dimensões explícitas e sem execução externa',()=>{for(const source of Object.values(APPROVED_GAME_ART)){const svg=readFileSync(new URL('../dist/'+source,import.meta.url),'utf8');assert.match(svg,/viewBox="0 0 [0-9.]+ [0-9.]+"/);assert.doesNotMatch(svg,/<script|onload=|(?:href|xlink:href)=["']https?:|<foreignObject/);}});
test('troca de jogo não deixa a arte anterior em jogos sem aprovação',()=>{const node={setAttribute(k,v){this[k]=v},removeAttribute(k){delete this[k]}};updateGameArt(node,'light');assert.equal(node.hidden,false);assert.match(node.src,/light/);updateGameArt(node,'desvio');assert.equal(node.hidden,true);assert.equal(node.src,undefined);updateGameArt(node,'acorde');assert.match(node.src,/acorde/);});

import { ACTIVE_GAME_IDS } from '../dist/game-catalog.mjs';
test('coleção cobre 19 jogos sem duplicar a AIIJ de Desvio',()=>{assert.deepEqual([...Object.keys(APPROVED_GAME_ART),'desvio'].sort(),[...ACTIVE_GAME_IDS].sort());assert.equal(APPROVED_GAME_ART.desvio,undefined);const ui=readFileSync(new URL('../dist/collection-ui.mjs',import.meta.url),'utf8');assert.match(ui,/assets\/desvio-aiij.svg/);});

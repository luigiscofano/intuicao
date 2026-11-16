import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { APPROVED_GAME_ART, updateGameArt } from '../dist/game-aiij.mjs';
test('somente as oito artes aprovadas entram no catálogo',()=>{assert.deepEqual(Object.keys(APPROVED_GAME_ART),['light','cut','elo','repasse','broto','cerco','mosaico','acorde']);});
test('SVGs autossuficientes, transparentes e sem execução',()=>{for(const source of Object.values(APPROVED_GAME_ART)){const svg=readFileSync(new URL('../dist/'+source,import.meta.url),'utf8');assert.match(svg,/viewBox="0 0 300 190"/);assert.doesNotMatch(svg,/<script|onload=|https?:.*href=|<foreignObject/);}});
test('troca de jogo não deixa a arte anterior em jogos sem aprovação',()=>{const node={setAttribute(k,v){this[k]=v},removeAttribute(k){delete this[k]}};updateGameArt(node,'light');assert.equal(node.hidden,false);assert.match(node.src,/light/);updateGameArt(node,'sintonia');assert.equal(node.hidden,true);assert.equal(node.src,undefined);updateGameArt(node,'acorde');assert.match(node.src,/acorde/);});

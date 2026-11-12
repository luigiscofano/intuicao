import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FRUIT_LABELS, renderFruitArt } from '../../dist/versus/games/quinhao/fruit-art.mjs';
import * as engine from '../../dist/versus/games/quinhao/engine.mjs';
import * as view from '../../dist/versus/games/quinhao/view.mjs';

test('Frutos aprovados: espécies e SVGs decorativos acessíveis', () => {
  assert.deepEqual(FRUIT_LABELS, ['castanha-do-pará','pitanga','jabuticaba']);
  for (let fruit=0; fruit<3; fruit++) {
    const svg=renderFruitArt(fruit,true);
    assert.match(svg, /viewBox="0 0 100 100"/);
    assert.match(svg, /aria-hidden="true" focusable="false"/);
    assert.doesNotMatch(svg, /undefined|NaN|<image/);
    assert.equal(svg.match(/<svg\b/g).length,1);
  }
});
test('Pitanga mantém o traço aprovado e castanha deixa a forma antiga', () => {
  assert.match(renderFruitArt(1), /#DE8C78/);
  assert.equal(renderFruitArt(1).match(/<ellipse/g).length, 5);
  assert.match(renderFruitArt(0), /#EED7A5/);
  assert.match(renderFruitArt(0), /#A46B42/);
  assert.doesNotMatch(renderFruitArt(0), /M31 21C8 37/);
});
test('Cestos e descrições usam o nome específico sem alterar o estado', () => {
  const state=engine.createState(); const before=structuredClone(state);
  const board=view.renderBoard(state);
  assert.match(board, /castanha-do-pará/);
  assert.deepEqual(state,before);
  const next=engine.applyMove(state,{type:'offer',start:1});
  assert.match(view.renderBoard(next), /castanha-do-pará/);
  assert.deepEqual(engine.getScores(next),[0,0]);
});
test('Vitória usa a mesma arte de cestos sem copiar o SVG antigo', () => {
  const source=readFileSync(new URL('../../dist/versus-victory-art.mjs',import.meta.url),'utf8');
  assert.match(source,/renderFruitArt\(fruit, true, true\)/);
  assert.doesNotMatch(source,/#D88959|#B89462/);
  assert.match(renderFruitArt(0,true,true),/class="vva-quinhao-fruit"/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { sproutMarkup } from '../dist/broto/piece-art.mjs';
const ui = readFileSync(new URL('../dist/broto/ui.mjs', import.meta.url), 'utf8');
const css = readFileSync(new URL('../dist/broto/ui.css', import.meta.url), 'utf8').replace(/\s+/g, '');

test('cada dono tem uma silhueta diferente, mesmo sem informação de cor', () => {
  const wide = sproutMarkup(0), pointed = sproutMarkup(1);
  const leaf = svg => svg.match(/class="b-plant-leaves" d="([^"]+)"/)[1];
  assert.notEqual(leaf(wide), leaf(pointed));
  for (const art of [wide, pointed]) {
    assert.match(art, /viewBox="0 0 48 40"/);
    assert.match(art, /aria-hidden="true"/);
    assert.match(art, /b-plant-veins/);
    assert.doesNotMatch(art, /undefined/);
  }
});

test('peças, prévias e exemplos conservam dono, eixos e colheita', () => {
  assert.match(ui, /bloom \? flower : sproutMarkup\(piece.owner\)/);
  assert.match(ui, /symbols\[piece.owner\]/);
  assert.match(ui, /piece.h \? "received"/);
  assert.match(ui, /piece.v \? "received"/);
  assert.match(ui, /ghost \? " b-ghost"/);
  assert.match(ui, /folhas largas/);
  assert.match(ui, /folhas pontudas/);
  assert.match(ui, /Falta horizontal/);
  assert.match(ui, /falta vertical/);
});

test('paleta aprovada mantém texto escuro no estímulo dourado', () => {
  assert.match(css, /--b-plant:#245a40/);
  assert.match(css, /--b-plant:#b5800a/);
  assert.match(css, /--b-axis-text:#583c04/);
  assert.match(css, /\.b-axes>\.received\{[^}]*color:var\(--b-axis-text\)/);
  assert.match(css, /\.b-dense/);
  assert.match(css, /@media\(max-width:500px\)/);
});

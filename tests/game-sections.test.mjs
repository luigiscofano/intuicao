// Testes e verificações de componentes compartilhados do Intuição.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const root = new URL('..', import.meta.url),
  html = readFileSync(new URL('dist/index.html', root), 'utf8');
const nav = html.match(/<nav class="games"[^>]*>([\s\S]*?)<\/nav>/)[1];
const key = (card) => card.match(/data-(?:game|collection|sintonia|repasse|orbita)="([^"]+)"/)[1];
const cards = (s) => [...s.matchAll(/<button\b[^>]*>[\s\S]*?<\/button>/g)].map((m) => m[0]);
test('nine original cards appear once in the three requested sections', () => {
  const sections = [
    ...nav.matchAll(
      /<h2 class="game-section-title" id="([^"]+)">([^<]+)<\/h2>([\s\S]*?)(?=<h2|$)/g,
    ),
  ];
  assert.deepEqual(
    sections.map((m) => [m[2], cards(m[3]).map(key)]),
    [
      ['INTUIÇÃO', ['light', 'cut']],
      ['RACIOCÍNIO LÓGICO', ['elo', 'prumo', 'pacto', 'sintonia', 'repasse', 'orbita']],
      ['VERSUS', ['desvio']],
    ],
  );
  assert.equal(cards(nav).length, 9);
  assert.equal(new Set(cards(nav).map(key)).size, 9);
});
test('card markup, routing attributes, hero and direct-child navigation contract are preserved', () => {
  const before = execFileSync(
    'git',
    ['show', 'b4fb5d6afdeaf8f72e6a5aac3deab505fa7024d9:dist/index.html'],
    { cwd: root, encoding: 'utf8' },
  );
  const priorNav = before.match(/<nav class="games"[^>]*>([\s\S]*?)<\/nav>/)[1];
  const old = new Map(cards(priorNav).map((c) => [key(c), c]));
  for (const card of cards(nav)) assert.equal(card, old.get(key(card)));
  assert.ok(!/<(?:section|div|nav)\b/.test(nav));
  assert.equal(
    html.match(/<section class="intro">[\s\S]*?<\/section>/)[0],
    before.match(/<section class="intro">[\s\S]*?<\/section>/)[0],
  );
  assert.ok(html.includes('<link rel="stylesheet" href="game-sections.css">'));
  const css = readFileSync(new URL('dist/game-sections.css', root), 'utf8');
  assert.ok(css.includes('grid-column:1/-1'));
  assert.ok(css.includes('@media(max-width:760px)'));
});

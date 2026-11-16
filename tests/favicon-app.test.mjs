import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

test('favicon usa a matriz aprovada do app sem redesenho', () => {
  const actual = readFileSync('dist/platform-assets/intuicao-app-icon.svg', 'utf8');
  const approved = readFileSync('docs/identidade/app-futuro/intuicao-app-esmalte-acetinado.svg', 'utf8');
  const paths = svg => [...svg.matchAll(/<path[^>]+>/g)].map(match => match[0]);
  assert.deepEqual(paths(actual), paths(approved));
  assert.ok(!actual.includes('<rect'));
  assert.match(actual, /viewBox="6 6 88 88"/);
});
test('ícones têm caminhos relativos válidos também no GitHub Pages', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  const links = [...html.matchAll(/<link rel="icon"[^>]+href="([^"]+)"[^>]*>/g)];
  assert.equal(links.length, 2);
  for (const [, href] of links) {
    assert.ok(existsSync(resolve('dist', href.split('?')[0])));
    assert.equal(new URL(href, 'https://luigiscofano.github.io/intuicao/').pathname,
      '/intuicao/' + href.split('?')[0]);
  }
  const png = readFileSync('dist/platform-assets/intuicao-app-icon-32.png');
  assert.equal(png.readUInt32BE(16), 32);
  assert.equal(png.readUInt32BE(20), 32);
});

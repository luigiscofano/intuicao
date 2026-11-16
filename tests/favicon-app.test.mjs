import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

test('favicon usa a matriz aprovada do app sem redesenho', () => {
  assert.deepEqual(readFileSync('dist/platform-assets/intuicao-app-icon.svg'),
    readFileSync('docs/identidade/app-futuro/intuicao-app-esmalte-acetinado.svg'));
});
test('ícones têm caminhos relativos válidos também no GitHub Pages', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  const links = [...html.matchAll(/<link rel="icon"[^>]+href="([^"]+)"[^>]*>/g)];
  assert.equal(links.length, 2);
  for (const [, href] of links) {
    assert.ok(existsSync(resolve('dist', href)));
    assert.equal(new URL(href, 'https://luigiscofano.github.io/intuicao/').pathname,
      '/intuicao/' + href);
  }
  const png = readFileSync('dist/platform-assets/intuicao-app-icon-32.png');
  assert.equal(png.readUInt32BE(16), 32);
  assert.equal(png.readUInt32BE(20), 32);
});

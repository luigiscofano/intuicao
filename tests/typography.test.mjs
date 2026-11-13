// Verifica o contrato global sem simular que substitui a inspeção no navegador.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
test('carrega o sistema comum na página que contém todos os jogos', () => {
  assert.match(read('dist/index.html'), /href="typography.css"/);
  const css = read('dist/typography.css');
  assert.match(css, /h1, h2, h3, h4, h5, h6/);
  assert.match(css, /tabular-nums/);
  assert.match(css, /font-display: swap/);
  assert.doesNotMatch(css, /https?:/);
});
test('fontes locais são WOFF2 válidos com licenças preservadas', () => {
  for (const name of ['literata-latin-variable', 'source-sans-3-latin-variable']) {
    const data = fs.readFileSync(path.join(root, `dist/assets/fonts/${name}.woff2`));
    assert.equal(data.subarray(0, 4).toString(), 'wOF2');
    assert.ok(data.length < 250_000);
  }
  for (const name of ['literata', 'sourcesans3']) {
    assert.match(read(`dist/assets/fonts/${name}-OFL.txt`), /SIL OPEN FONT LICENSE Version 1.1/);
  }
});
test('não altera a imagem de marca e unifica famílias antigas', () => {
  assert.match(read('dist/index.html'), /brand-image/);
  assert.match(read('dist/platform.css'), /font-family:\s*var\(--font-ui\)/);
  assert.match(read('dist/rules-preview.css'), /font-family:\s*var\(--font-ui\)/);
});

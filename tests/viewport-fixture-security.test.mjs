import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = name => readFileSync(new URL(`viewport/${name}.html`, import.meta.url), 'utf8');

test('matriz filtra pedidos usando os identificadores constantes dos 25 jogos', () => {
  assert.match(read('matrix'), /games\.filter\(game=>selected\.includes\(game\)\)/);
  assert.match(read('matrix'), /for\(const game of requested\)/);
});
for (const name of ['matrix', 'conditional', 'inspect']) {
  test(`${name}: identificador é codificado como parâmetro, nunca reinterpretado`, () => {
    const source = read(name);
    assert.match(source, /index\.html\?game=\$\{encodeURIComponent\(/);
    assert.doesNotMatch(source, /index\.html\?game=\$\{(?:game|p\.get)/);
    for (const value of ['<script>alert(1)</script>', '\" onload=alert(1)', 'a&game=b#fragment']) {
      const target = new URL(`index.html?game=${encodeURIComponent(value)}`, 'https://example.test/');
      assert.equal(target.pathname, '/index.html');
      assert.equal(target.searchParams.get('game'), value);
      assert.equal(target.hash, '');
      assert.equal([...target.searchParams].length, 1);
    }
  });
}

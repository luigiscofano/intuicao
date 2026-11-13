import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
test('Conquistas mantém sua rota e recebe somente o selo decorativo aprovado', () => {
  const button = read('dist/index.html').match(/<button[^>]*data-screen="achievements"[\s\S]*?<\/button>/)[0];
  assert.match(button, /Conquistas/);
  assert.match(button, /class="library-achievements-icon"/);
  assert.match(button, /alt="" aria-hidden="true"/);
  assert.doesNotMatch(button, /✦/);
  const svg = read('dist/platform-assets/conquistas-selo-botanico.svg');
  assert.equal((svg.match(/<path /g) || []).length, 3);
  for (const [, color] of svg.matchAll(/(?:fill|stroke)="([^"]+)"/g)) {
    assert.ok(['none', '#000'].includes(color));
  }
  const css = read('dist/library.css');
  assert.match(css, /flex: 0 0 24px/);
  assert.match(css, /button\[aria-current="page"\] \.library-achievements-icon/);
});

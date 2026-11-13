import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
test('Conquistas mantém sua rota e recebe somente o selo decorativo aprovado', () => {
  const button = read('dist/index.html').match(/<button[^>]*id="achievements-open"[\s\S]*?<\/button>/)[0];
  assert.match(button, /Conquistas/);
  assert.match(button, /class="header-achievements"/);
  assert.match(button, /alt="" aria-hidden="true"/);
  assert.doesNotMatch(button, /✦/);
  const svg = read('dist/platform-assets/conquistas-selo-botanico.svg');
  assert.equal((svg.match(/<path /g) || []).length, 3);
  for (const [, color] of svg.matchAll(/(?:fill|stroke)="([^"]+)"/g)) {
    assert.ok(['none', '#000'].includes(color));
  }
  const css = read('dist/achievements-panel.css');
  assert.match(css, /aria-expanded/);
  assert.match(css, /width:24px; height:24px/);
});

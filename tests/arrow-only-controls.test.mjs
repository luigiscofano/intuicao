// Testes e verificações de componentes compartilhados do Intuição.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const entries = [
  ['index.html', ''],
  ['collection-ui.mjs', 'c-'],
  ['sintonia/ui.mjs', 's-'],
  ['repasse/ui.mjs', 'r-'],
  ['orbita/ui.mjs', 'o-'],
];
test('all nine games expose arrow-only undo/redo, with accessible names and native buttons retained', () => {
  for (const [file, prefix] of entries) {
    const source = readFileSync(new URL('../dist/' + file, import.meta.url), 'utf8');
    for (const [action, glyph, label] of [
      ['undo', '↶', 'Desfazer'],
      ['redo', '↷', 'Refazer'],
    ]) {
      const button = source.match(
        new RegExp(`<button\\b[^>]*id="${prefix + action}"[^>]*>(.*?)</button>`),
      );
      assert.ok(button, `${file} ${action}`);
      assert.equal(button[1], glyph, `${file} ${action} visible content`);
      assert.ok(button[0].includes(`aria-label="${label}"`));
      assert.ok(button[0].includes(`title="${label}`));
    }
  }
});

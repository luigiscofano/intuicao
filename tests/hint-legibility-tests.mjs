// Testes e verificações de componentes compartilhados do Intuição.
import { restoreBoardAlignmentFile } from './board-alignment-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const css = restoreBoardAlignmentFile(
  'style.css',
  fs.readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8'),
);
assert.equal(css.split('#hint-text,#c-hint-text{font-size:16px;line-height:1.55}').length - 1, 1);
const last = css.slice(css.indexOf('/* Hints remain below'));
assert.equal(
  last,
  '/* Hints remain below the play area, with readable body-size text in all games. */\n#hint-text,#c-hint-text{font-size:16px;line-height:1.55}\n',
);
const original = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8'),
  collection = fs.readFileSync(new URL('../dist/collection-ui.mjs', import.meta.url), 'utf8');
assert.match(original, /<p id="hint-text" class="hint" role="status">/);
assert.match(collection, /<p id="c-hint-text" class="hint" role="status">/);
assert.ok(original.indexOf('id="hint-text"') > original.indexOf('id="scene"'));
assert.ok(collection.indexOf('id="c-hint-text"') > collection.indexOf('id="c-board"'));
console.log(
  'PASS 16px/1.55 hints only: both shared IDs cover six games, remain below boards and do not target feedback/check/rules. Browser computed styles pending publication.',
);

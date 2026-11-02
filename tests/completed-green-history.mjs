// Testes e verificações de componentes compartilhados do Intuição.
import { restoreActiveFlowerCSS } from './active-flower-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m = JSON.parse(
  fs.readFileSync(new URL('./completed-green-authorized-change.json', import.meta.url), 'utf8'),
);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
export function restoreCompletedGreenCSS(css) {
  if (sha(css) === m.priorCssSHA256) return css;
  css = restoreActiveFlowerCSS(css);
  assert.equal(sha(css), m.afterCssSHA256, 'Exact authorized completed-green CSS');
  for (const { before, after } of m.replacements) {
    assert.equal(css.split(after).length - 1, 1, 'Exactly one completed-tile rule');
    css = css.replace(after, before);
  }
  assert.equal(
    sha(css),
    m.priorCssSHA256,
    'All styles outside the two completed-tile rules remain byte-identical',
  );
  return css;
}

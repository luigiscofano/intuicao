// Testes e verificações de componentes compartilhados do Intuição.
import { restoreBottomAlignmentCSS } from './bottom-alignment-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m = JSON.parse(
  fs.readFileSync(new URL('./game-spacing-authorized-change.json', import.meta.url), 'utf8'),
);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
export function restoreGameSpacingCSS(css) {
  // Older historical routes are permitted only at this exact prior state.
  if (sha(css) === m.priorCssSHA256) return css;
  css = restoreBottomAlignmentCSS(css);
  assert.equal(sha(css), m.afterCssSHA256, 'Exact authorized game-spacing CSS');
  assert.ok(css.endsWith(m.append), 'One exact appended game-spacing block');
  css = css.slice(0, -m.append.length);
  assert.equal(sha(css), m.priorCssSHA256, 'Every prior platform style remains byte-identical');
  return css;
}

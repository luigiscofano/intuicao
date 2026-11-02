// Testes e verificações de componentes compartilhados do Intuição.
import { restoreBoardAlignmentFile } from './board-alignment-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m = JSON.parse(
    fs.readFileSync(new URL('./board-toolbar-authorized-change.json', import.meta.url)),
  ),
  sha = (x) => crypto.createHash('sha256').update(x).digest('hex');
export function restoreBoardToolbarFile(path, bytes) {
  bytes = restoreBoardAlignmentFile(path, bytes);
  const c = m.files[path.replace(/^dist\//, '')];
  if (!c) return bytes;
  let text = Buffer.isBuffer(bytes) ? bytes.toString() : bytes;
  if (sha(text) !== c.afterSha256) return bytes;
  for (const b of [...c.blocks].reverse()) {
    assert.equal(text.split(b.after).length - 1, 1);
    text = text.replace(b.after, b.before);
  }
  assert.equal(sha(text), c.beforeSha256);
  return Buffer.isBuffer(bytes) ? Buffer.from(text) : text;
}

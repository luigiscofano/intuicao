// Testes e verificações de componentes compartilhados do Intuição.
import { restoreRulesDefaultOpenFile } from './rules-default-open-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const m = JSON.parse(
    fs.readFileSync(new URL('./board-alignment-authorized-change.json', import.meta.url)),
  ),
  sha = (x) => crypto.createHash('sha256').update(x).digest('hex');
export function restoreBoardAlignmentFile(path, bytes) {
  bytes = restoreRulesDefaultOpenFile(path, bytes);
  if (path.replace(/^dist\//, '') !== m.file) return bytes;
  const text = Buffer.isBuffer(bytes) ? bytes.toString() : bytes;
  if (sha(text) !== m.afterSha256) return bytes;
  assert.ok(text.endsWith(m.append));
  const old = text.slice(0, -m.append.length);
  assert.equal(sha(old), m.beforeSha256);
  return Buffer.isBuffer(bytes) ? Buffer.from(old) : old;
}

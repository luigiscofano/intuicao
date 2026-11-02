// Testes e verificações de componentes compartilhados do Intuição.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const manifest = JSON.parse(
  fs.readFileSync(new URL('./info-refinement-authorized-change.json', import.meta.url)),
);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
export function restoreInfoRefinementFile(path, bytes) {
  const name = path.replace(/^dist\//, ''),
    change = manifest.files[name];
  if (!change) return bytes;
  let text = Buffer.isBuffer(bytes) ? bytes.toString() : bytes;
  if (sha(text) === change.beforeSha256) return bytes;
  assert.equal(sha(text), change.afterSha256, 'Exact authorized information refinement: ' + path);
  for (const { before, after } of [...change.replacements].reverse()) {
    assert.equal(
      text.split(after).length - 1,
      1,
      'Unique exact information refinement block: ' + path,
    );
    text = text.replace(after, before);
  }
  assert.equal(sha(text), change.beforeSha256, 'All earlier information source retained: ' + path);
  return Buffer.isBuffer(bytes) ? Buffer.from(text) : text;
}

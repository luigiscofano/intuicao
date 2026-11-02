// Testes e verificações de componentes compartilhados do Intuição.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const manifest = JSON.parse(
  fs.readFileSync(new URL('./green-sparkles-authorized-change.json', import.meta.url)),
);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
export function restoreGreenSparklesFile(path, bytes) {
  const name = path.replace(/^dist\//, ''),
    change = manifest.files[name];
  if (!change) return bytes;
  let text = Buffer.isBuffer(bytes) ? bytes.toString() : bytes;
  if (sha(text) === change.beforeSha256) return bytes;
  assert.equal(sha(text), change.afterSha256, 'Exact authorized green sparkle source: ' + name);
  if (change.append !== undefined) {
    assert.ok(text.endsWith(change.append));
    text = text.slice(0, -change.append.length);
  } else
    for (const block of [...change.blocks].reverse()) {
      assert.equal(text.split(block.after).length - 1, 1, 'Unique green sparkle block: ' + name);
      text = text.replace(block.after, block.before);
    }
  assert.equal(sha(text), change.beforeSha256, 'All original About source preserved: ' + name);
  return Buffer.isBuffer(bytes) ? Buffer.from(text) : text;
}

// Testes e verificações de componentes compartilhados do Intuição.
import { restoreGreenSparklesFile } from './green-sparkles-history.mjs';
import { restoreRulesSidebarFile } from './rules-sidebar-history.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const manifest = JSON.parse(
  fs.readFileSync(new URL('./hints-rules-authorized-change.json', import.meta.url)),
);
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const priorHTML = [
  'game-info-authorized-change.json',
  'original-logo-authorized-change.json',
].flatMap((name) => {
  const m = JSON.parse(fs.readFileSync(new URL('./' + name, import.meta.url)));
  return [m.priorHtmlSHA256, m.afterHtmlSHA256];
});
export function restoreHintsRulesFile(path, bytes) {
  bytes = restoreGreenSparklesFile(path, bytes);
  bytes = restoreRulesSidebarFile(path, bytes);
  const name = path.replace(/^dist\//, ''),
    change = manifest.files[name];
  if (!change) return bytes;
  let text = Buffer.isBuffer(bytes) ? bytes.toString() : bytes;
  const hash = sha(text);
  if (hash === change.beforeSha256 || (name === 'index.html' && priorHTML.includes(hash)))
    return bytes;
  assert.equal(hash, change.afterSha256, 'Exact authorized hints/rules update: ' + path);
  for (const block of [...change.blocks].reverse()) {
    assert.equal(text.split(block.after).length - 1, 1, 'Unique exact hints/rules block: ' + path);
    text = text.replace(block.after, block.before);
  }
  assert.equal(sha(text), change.beforeSha256, 'All earlier source retained: ' + path);
  return Buffer.isBuffer(bytes) ? Buffer.from(text) : text;
}

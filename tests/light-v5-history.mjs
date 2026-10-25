// Reverse only exact v5 data/document bytes to the previous published version.
import fs from'node:fs';import crypto from'node:crypto';import assert from'node:assert/strict';
const manifest=JSON.parse(fs.readFileSync(new URL('./light-v5-authorized-change.json',import.meta.url))),sha=x=>crypto.createHash('sha256').update(x).digest('hex');
export function restoreLightV5File(path,bytes){const change=manifest.files[path.replace(/^dist\//,'')];if(!change)return bytes;const text=Buffer.isBuffer(bytes)?bytes.toString():bytes;if(sha(text)!==change.afterSha256)return bytes;assert.equal(sha(change.before),change.beforeSha256);return Buffer.isBuffer(bytes)?Buffer.from(change.before):change.before;}

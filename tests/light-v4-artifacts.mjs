// Shared portable I/O for the compiled campaign tests. No authoring paths, shell,
// network, application mutation, or implicit writes to development artifacts.
import fs from 'node:fs';
import {gunzipSync} from 'node:zlib';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';

export const artifactURL = name => new URL('../dist/development/reflexos-v4/' + name, import.meta.url);
export function isMain(url) { return !!process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === url; }
export function readJSON(file) {
  const bytes = fs.readFileSync(file);
  const text = bytes[0] === 0x1f && bytes[1] === 0x8b ? gunzipSync(bytes).toString('utf8') : bytes.toString('utf8');
  return JSON.parse(text);
}
export function printReport(report, output) {
  const text = JSON.stringify(report, null, 2) + '\n';
  if (output) fs.writeFileSync(output, text);
  process.stdout.write(text);
}
export const expectedBand = index => index < 200 ? 'basic' : index < 300 ? 'intermediate' : index < 400 ? 'advanced' : 'master';

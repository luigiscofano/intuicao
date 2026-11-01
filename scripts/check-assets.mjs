import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'docs/recursos/inventario.json'), 'utf8'));
const visual = /\.(png|jpe?g|svg|woff2?|ttf|otf|gif|webp|piskel)$/i;
const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' }).split('\0').filter(name => visual.test(name));
const expected = new Set(tracked);
const seen = new Set();
const failures = [];
let pending = 0;
for (const asset of manifest.assets) {
  if (seen.has(asset.path)) failures.push(`Entrada duplicada: ${asset.path}`);
  seen.add(asset.path);
  if (!expected.has(asset.path)) { failures.push(`Recurso não versionado: ${asset.path}`); continue; }
  const actual = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, asset.path))).digest('hex');
  if (actual !== asset.sha256) failures.push(`Atualize o hash e revise os direitos: ${asset.path}`);
  if (!manifest.groups[asset.group]) failures.push(`Grupo ausente: ${asset.path}`);
  if (!['pending', 'cleared'].includes(asset.status)) failures.push(`Status inválido: ${asset.path}`);
  if (asset.status === 'cleared' && ![asset.rightsHolder, asset.license, asset.permissionEvidence].every(value => typeof value === 'string' && value.trim())) failures.push(`Autorização sem evidência: ${asset.path}`);
  if (asset.status !== 'cleared') pending++;
}
for (const name of tracked) if (!seen.has(name)) failures.push(`Recurso sem inventário: ${name}`);
for (const group of Object.values(manifest.groups)) for (const evidence of group.evidence) {
  if (!fs.existsSync(path.join(root, evidence))) failures.push(`Evidência ausente: ${evidence}`);
}
if (process.argv.includes('--release') && pending) failures.push(`${pending} recursos sem autorização de redistribuição comprovada. Publicação pendente.`);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`${tracked.length} recursos inventariados; ${pending} permissões pendentes.`);
  console.log('Cobertura e hashes verificados. Isso não valida juridicamente uma licença nem autoriza versões históricas.');
}

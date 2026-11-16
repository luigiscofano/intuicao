// Confere Markdown e HTML de todos os READMEs e do manifesto documental.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractLocalLinks, exactPathExists } from './doc-links.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'scripts/docs-manifest.json'), 'utf8'));
const failures = [];
let links = 0;
function findReadmes(directory, prefix = '') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    if (['.git', 'node_modules'].includes(entry.name)) return [];
    const name = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return findReadmes(path.join(directory, entry.name), name);
    return /^readme\.md$/i.test(entry.name) ? [name] : [];
  });
}
const documents = [...new Set([...manifest.files, ...findReadmes(root)])];
for (const name of documents) {
  const absolute = path.resolve(root, name);
  if (!fs.existsSync(absolute)) { failures.push(`${name}: arquivo ausente`); continue; }
  for (const target of extractLocalLinks(fs.readFileSync(absolute, 'utf8'))) {
    let relative;
    try { relative = decodeURIComponent(target.split(/[?#]/)[0]); }
    catch { failures.push(`${name}: URL inválida: ${target}`); continue; }
    const resolved = path.resolve(path.dirname(absolute), relative);
    links++;
    if (!resolved.startsWith(root + path.sep) && resolved !== root)
      failures.push(`${name}: link fora do repositório: ${target}`);
    else if (!exactPathExists(root, resolved))
      failures.push(`${name}: link quebrado ou capitalização incorreta: ${target}`);
  }
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`${documents.length} documentos e ${links} links locais verificados.`);
  console.log('Links externos, fragmentos e correção semântica exigem revisão separada.');
}

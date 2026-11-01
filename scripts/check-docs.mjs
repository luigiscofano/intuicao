import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Verifica somente os documentos declarados; relatórios históricos mantêm seu contexto.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'scripts/docs-manifest.json'), 'utf8'));
const failures = [];
let links = 0;
for (const name of manifest.files) {
  const absolute = path.resolve(root, name);
  if (!fs.existsSync(absolute)) { failures.push(`${name}: arquivo ausente`); continue; }
  const source = fs.readFileSync(absolute, 'utf8');
  // Blocos de código podem conter exemplos de Markdown que não são links da página.
  const prose = source.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '');
  for (const match of prose.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
    const target = match[1];
    if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('#')) continue;
    const relative = decodeURIComponent(target.split('#')[0]);
    const resolved = path.resolve(path.dirname(absolute), relative);
    links++;
    if (!resolved.startsWith(root + path.sep) && resolved !== root) failures.push(`${name}: link fora do repositório: ${target}`);
    else if (!fs.existsSync(resolved)) failures.push(`${name}: link quebrado: ${target}`);
  }
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`${manifest.files.length} documentos e ${links} links locais verificados.`);
  console.log('Links externos, fragmentos e correção semântica exigem revisão separada.');
}

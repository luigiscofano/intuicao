import fs from 'node:fs';
import path from 'node:path';

/** Captura Markdown e HTML: a existência da imagem não basta se o caminho estiver errado. */
export function extractLocalLinks(source) {
  const prose = source.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '');
  const targets = [...prose.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)].map(match => match[1]);
  for (const tag of prose.matchAll(/<(?:img|a|source)\b[^>]*>/gi)) {
    for (const attr of tag[0].matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)) targets.push(attr[1]);
  }
  return targets.filter(target => !/^[a-z][a-z0-9+.-]*:/i.test(target) && !target.startsWith('#') && !target.startsWith('//'));
}

/** Compara nomes exatamente também no Windows, pois o GitHub diferencia maiúsculas. */
export function exactPathExists(root, resolved) {
  const segments = path.relative(root, resolved).split(path.sep).filter(Boolean);
  let current = root;
  for (const segment of segments) {
    if (!fs.existsSync(current) || !fs.statSync(current).isDirectory()) return false;
    if (!fs.readdirSync(current).includes(segment)) return false;
    current = path.join(current, segment);
  }
  return fs.existsSync(current);
}

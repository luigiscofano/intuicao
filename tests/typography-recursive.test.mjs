// A família dos jogos não pode divergir ao adicionar folhas em subpastas.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function cssFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? cssFiles(full) : full.endsWith('.css') ? [full] : [];
  });
}
test('todos os CSS ativos, inclusive subpastas, seguem as famílias C', () => {
  const failures = [];
  for (const file of cssFiles(path.join(root, 'dist'))) {
    const relative = path.relative(root, file);
    // Órbita foi retirado do catálogo; seu código histórico não é reestilizado.
    if (relative.includes('/orbita/') || relative.endsWith('/typography.css')) continue;
    for (const block of fs.readFileSync(file, 'utf8').matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const selector = block[1];
      // Marca como arte, diagramas de setas e editores de código têm exceções documentadas.
      if (/\.brand\b|\.map-preview\b|\btextarea\b|\bpre\b/.test(selector)) continue;
      for (const declaration of block[2].matchAll(/(?:font-family|font)\s*:[^;}]+/g)) {
        if (/system-ui|ui-sans-serif|Georgia|Times New Roman|Courier New|ui-monospace|SFMono|Consolas/.test(declaration[0])) {
          failures.push(`${relative}: ${selector.trim()} → ${declaration[0]}`);
        }
      }
    }
  }
  assert.deepEqual(failures, []);
});
test('rótulos ELO, seleções Sintonia e interface Repasse usam tokens', () => {
  for (const file of ['dist/sintonia/ui.css', 'dist/sintonia/scenery.css', 'dist/repasse/ui.css', 'dist/logica/ui.css']) {
    const css = fs.readFileSync(path.join(root, file), 'utf8');
    assert.match(css, /var\(--font-ui\)/, file);
    assert.doesNotMatch(css, /system-ui|Courier New|Georgia/, file);
  }
});

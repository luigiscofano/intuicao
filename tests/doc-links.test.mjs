import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { extractLocalLinks, exactPathExists } from '../scripts/doc-links.mjs';

test('captura imagens HTML, links HTML e Markdown', () => {
  assert.deepEqual(extractLocalLinks('<img src="../logo.png"><a href="guide.pdf">Guia</a> ![foto](photo.png)'), ['photo.png', '../logo.png', 'guide.pdf']);
});
test('ignora URLs externas, âncoras e exemplos cercados', () => {
  assert.deepEqual(extractLocalLinks('<img src="https://example.org/a.png"> [a](#top)\n```html\n<img src="missing.png">\n```'), []);
});
test('rejeita diretório errado e diferenças de capitalização', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'intuicao-doc-links-'));
  try {
    fs.mkdirSync(path.join(root, 'assets'));
    fs.writeFileSync(path.join(root, 'assets', 'Logo.png'), 'fixture');
    assert.equal(exactPathExists(root, path.join(root, 'assets', 'Logo.png')), true);
    assert.equal(exactPathExists(root, path.join(root, 'assets', 'logo.png')), false);
    assert.equal(exactPathExists(root, path.join(root, '.github', 'assets', 'Logo.png')), false);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const root = new URL('../', import.meta.url);
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
const before = '75a0e19e4e5cbfeab47d222e31c04738910d97fa';
const after = '211ec22671383ce4e7387b35398e4c1dc7079e96';

// A revisão é fixa: o teste protege esta migração sem impedir futuras edições legítimas.
test('acordeões preservam integralmente os 132 READMEs reorganizados', () => {
  const paths = git('diff', '--name-only', before, after).trim().split('\n');
  assert.equal(paths.length, 132);
  for (const path of paths) {
    assert.match(path, /(^|\/)README\.md$/);
    const original = git('show', `${before}:${path}`);
    const reorganized = git('show', `${after}:${path}`);
    // Retira apenas as marcações inseridas, sem normalizar texto, espaços ou imagens.
    const restored = reorganized
      .replace(/\n<details>\n<summary>Expandir [^\n]*<\/summary>\n/g, '')
      .replace(/\n<\/details>\n\n?/g, '');
    assert.equal(restored, original, path);
    assert.equal((reorganized.match(/<details>/g) || []).length,
      (reorganized.match(/<\/details>/g) || []).length, path);
  }
});

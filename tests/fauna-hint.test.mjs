// Testes e verificações de informações e arte da fauna.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const base = '5c0c238563c37fe86c25ede921745a3be4064f08',
  git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();
test('convite isolado; comportamento, artes e conteúdo anteriores preservados', () => {
  for (const line of git('ls-tree', '-r', base, '--', 'dist').split('\n')) {
    const [meta, path] = line.split('\t');
    if (['dist/fauna-info.css', 'dist/fauna-info.mjs'].includes(path)) continue;
    assert.equal(git('hash-object', path), meta.split(' ')[2], path);
  }
  const js = readFileSync('dist/fauna-info.mjs', 'utf8');
  assert.equal(
    js.replace(/^ const hint=doc.createElement\('p'\);.*\n/m, '').trim(),
    git('show', base + ':dist/fauna-info.mjs'),
  );
  assert(js.includes('Clique nos animais para conhecer'));
  assert(js.includes('Toque nos animais para conhecer'));
  assert(
    readFileSync('dist/fauna-info.css', 'utf8').startsWith(
      git('show', base + ':dist/fauna-info.css'),
    ),
  );
});

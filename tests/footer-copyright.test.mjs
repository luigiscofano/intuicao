// Testes e verificações de componentes compartilhados do Intuição.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
test('aviso exato único no rodapé comum', () => {
  const html = readFileSync('dist/index.html', 'utf8');
  const text = '© 2026 Luigi Scofano de Araujo. Todos os direitos reservados.';
  assert.equal(html.split(text).length - 1, 1);
  assert.match(
    html,
    /<footer>[\s\S]*<p class="footer-copyright">© 2026 Luigi Scofano de Araujo\. Todos os direitos reservados\.<\/p><\/footer>/,
  );
});
test('só aviso HTML e estilo de rodapé mudam em produção', () => {
  const changed = execFileSync(
    'git',
    ['diff', '--name-only', '0064c4b7b253db7ac2f816ee32ea37659c0b0aed', '--', 'dist'],
    { encoding: 'utf8' },
  )
    .trim()
    .split('\n')
    .filter(Boolean);
  assert.deepEqual(changed.sort(), ['dist/footer-transition.css', 'dist/index.html']);
  const prior = execFileSync(
    'git',
    ['show', '0064c4b7b253db7ac2f816ee32ea37659c0b0aed:dist/footer-transition.css'],
    { encoding: 'utf8' },
  );
  assert.ok(readFileSync('dist/footer-transition.css', 'utf8').startsWith(prior));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
const root = new URL('../', import.meta.url);
// A entrega original permanece protegida; PNGs têm seu próprio contrato de escopo.
const base = '909b9244568ff4af411753dd737b74ee589c6e4c';
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
const read = path => readFileSync(new URL(path, root), 'utf8');
const allowed = ['selection-presentation.mjs', 'selection-presentation.css', 'logica/ui.mjs', 'orbita/ui.mjs', 'repasse/ui.mjs', 'sintonia/ui.mjs'].map(path => 'dist/' + path);

test('contadores preservam toda a distribuição fora das seis apresentações autorizadas', () => {
  assert.equal(git('diff', '--name-only', base, '3c0609db77b66aa27d4d61753e7db7f438b14ba9', '--', 'dist', ...allowed.map(path => ':(exclude)' + path)), '');
  // Arquivos novos da entrega atual são protegidos em game-viewport-scope.test.mjs.
  assert.equal(git('diff', '--name-only', '--diff-filter=A', base, '3c0609db77b66aa27d4d61753e7db7f438b14ba9', '--', 'dist'), '');
});

test('remoções nas interfaces individuais não alteram ações, campanhas ou gravação', () => {
  const removals = {
    "logica/ui.mjs": [
        "    const completed = adapter.CAMPAIGN.filter(isCompleted).length;\n",
        "<p class=\"logic-progress\">${completed} <span>/ 80 concluídas</span></p>",
        "<p class=\"logic-selection-note\">Todas as fases estão disponíveis. O Modo sem parar percorre as 80 fases existentes e repete o ciclo, sem gerar fases inéditas nem alterar a campanha. Sua sequência fica salva separadamente.</p>"
    ],
    "sintonia/ui.mjs": [
        "    const completed = Object.keys(data.campaign.completed).filter((id) =>\n      CAMPAIGN.some((l) => l.id === id),\n    ).length;\n",
        "<p class=\"collection-small\">${completed} concluídos. Progresso salvo neste navegador.</p>"
    ],
    "orbita/ui.mjs": [
        "    const completed = Object.keys(data.campaign.completed).filter((id) =>\n      CAMPAIGN.some((item) => String(item.id) === id),\n    ).length;\n",
        "<p class=\"collection-small\">' +\n      completed +\n      ' ' +\n      (completed === 1 ? 'concluído' : 'concluídos') +\n      '. Progresso salvo neste navegador.</p>"
    ],
    "repasse/ui.mjs": [
        "    const completed = Object.keys(data.campaign.completed).filter((id) =>\n      CAMPAIGN.some((item) => String(item.id) === id),\n    ).length;\n",
        "<p class=\"collection-small\">' +\n      completed +\n      ' ' +\n      (completed === 1 ? 'concluído' : 'concluídos') +\n      '. Progresso salvo neste navegador.</p>"
    ]
};
  for (const [path, snippets] of Object.entries(removals)) {
    let previous = git('show', `${base}:dist/${path}`);
    for (const snippet of snippets) {
      assert.ok(previous.includes(snippet), path);
      previous = previous.replace(snippet, '');
    }
    // RENOVO altera depois a UI lógica; seu delta atual tem contrato próprio.
    const actual = path === 'logica/ui.mjs'
      ? git('show', `938709655ecbf248469e106fa740586c25b7ac97:dist/${path}`)
      : read('dist/' + path);
    assert.equal(actual, previous, path);
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Os avisos removidos não participam dos controles nem das regras dos jogos.
test('versus mantém Como jogar e remove os dois avisos adicionais', () => {
  const ui = readFileSync(new URL('../dist/versus/ui.mjs', import.meta.url), 'utf8');
  assert.match(ui, /rulesPreviewMarkup\(game.id\)/);
  assert.doesNotMatch(ui, /nv-control-help|nv-help-more|Use Tab para percorrer os controles|Modos e análise do computador/);
  const css = readFileSync(new URL('../dist/versus/ui.css', import.meta.url), 'utf8');
  assert.doesNotMatch(css, /nv-control-help|nv-help-more/);
});

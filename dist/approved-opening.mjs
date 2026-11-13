/** Biblioteca sem faixa introdutória; preserva as fichas e a contagem das categorias. */
import { initFaunaInfo } from './fauna-info.mjs';
import { CATEGORY_GAMES } from './category-navigation.mjs';

export function initApprovedOpening(doc = document) {
  const intro = doc.querySelector('#main > .intro');
  if (!intro) return;
  initFaunaInfo(doc);
  // Inicializa as fichas antes de retirar a faixa: Sobre continua abrindo os mascotes.
  intro.remove();
  for (const [category, games] of Object.entries(CATEGORY_GAMES)) {
    const heading = doc.getElementById(`games-${category}`);
    if (!heading) continue;
    const count = doc.createElement('small');
    count.className = 'opening-category-count';
    count.textContent = `${games.length} jogos`;
    heading.append(count);
  }
}
if (typeof document !== 'undefined') initApprovedOpening();

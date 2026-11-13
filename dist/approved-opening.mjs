/** Abertura aprovada: composição e divulgação da fauna, sem rotas ou saves novos. */
import { initFaunaInfo } from './fauna-info.mjs';
import { CATEGORY_GAMES } from './category-navigation.mjs';

export const FEATURED_FAUNA = Object.freeze(['capivara', 'bemtevi', 'onca']);
export function faunaVisibility(ids, expanded = false) {
  return ids.map(id => expanded || FEATURED_FAUNA.includes(id));
}

export function initApprovedOpening(doc = document) {
  const intro = doc.querySelector('#main > .intro');
  if (!intro || intro.dataset.approvedOpening) return;
  initFaunaInfo(doc);
  const gallery = intro.querySelector('.hero-fauna');
  const animals = [...(gallery?.querySelectorAll('button[data-fauna]') || [])];
  if (!animals.length) return;
  intro.dataset.approvedOpening = 'true';
  gallery.id = 'opening-fauna';
  gallery.querySelector('.hero-fauna-hint')?.remove();
  gallery.removeAttribute('aria-describedby');
  const toggle = doc.createElement('button');
  toggle.type = 'button';
  toggle.className = 'opening-fauna-toggle';
  toggle.setAttribute('aria-controls', gallery.id);
  let expanded = false;
  const render = () => {
    faunaVisibility(animals.map(animal => animal.dataset.fauna), expanded)
      .forEach((visible, index) => { animals[index].hidden = !visible; });
    gallery.classList.toggle('opening-fauna-expanded', expanded);
    intro.classList.toggle('opening-fauna-expanded', expanded);
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? 'Recolher os animais ↑' : `Conheça os ${animals.length} animais →`;
  };
  toggle.addEventListener('click', () => { expanded = !expanded; render(); });
  // Mantém os botões originais e seus eventos ao agrupá-los na faixa editorial.
  const title = intro.querySelector('h1');
  if (title) {
    // Ênfase só na palavra pedida: a frase continua sendo um único título acessível.
    const curiosity = doc.createElement('em');
    curiosity.className = 'opening-curiosity';
    curiosity.textContent = 'curiosidade';
    title.textContent = '';
    title.append('A ', curiosity, ' é a primeira lição.');
  }
  intro.querySelector(':scope > p')?.remove();
  const faunaGroup = doc.createElement('div');
  faunaGroup.className = 'opening-fauna-group';
  faunaGroup.append(gallery, toggle);
  intro.append(faunaGroup);
  render();
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

/** Galeria dos mascotes: reutiliza as artes e fichas oficiais, sem duplicar conteúdo. */
import { FAUNA_ART } from './fauna-art.mjs';
import { FAUNA_INFO } from './fauna-info-content.mjs';
import { faunaCropMarkup, initFaunaInfo } from './fauna-info.mjs';

export function mascotCardsMarkup() {
  return FAUNA_ART.map(art => `
    <li>
      <button type="button" data-fauna="${art.id}"
        aria-haspopup="dialog" aria-controls="fauna-dialog">
        ${faunaCropMarkup(art, 'front')}
        <span>${FAUNA_INFO[art.id].name}</span>
      </button>
    </li>
  `).join('');
}

export function initMascotsDialog(doc = document) {
  const about = doc.getElementById('about-dialog');
  if (!about || doc.getElementById('mascots-dialog')) return;
  initFaunaInfo(doc);

  const trigger = doc.createElement('button');
  trigger.type = 'button';
  trigger.className = 'mascots-open';
  trigger.textContent = 'Conhecer os mascotes';
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-controls', 'mascots-dialog');
  about.querySelector('.about-actions').prepend(trigger);

  const dialog = doc.createElement('dialog');
  dialog.id = 'mascots-dialog';
  dialog.setAttribute('aria-labelledby', 'mascots-title');
  dialog.setAttribute('aria-modal', 'true');
  dialog.innerHTML = `
    <div class="mascots-shell">
      <header>
        <div>
          <h2 id="mascots-title" tabindex="-1">Conheça os mascotes</h2>
          <p>15 animais brasileiros. Escolha um para conhecer sua história.</p>
        </div>
        <button type="button" data-mascots-close
          aria-label="Voltar para Sobre o projeto">×</button>
      </header>
      <ul class="mascots-grid">${mascotCardsMarkup()}</ul>
      <footer>
        <button type="button" data-mascots-close>Voltar ao projeto</button>
      </footer>
    </div>`;
  doc.body.append(dialog);

  let priorOverflow = '';
  trigger.addEventListener('click', () => {
    priorOverflow = doc.body.style.overflow;
    doc.body.style.overflow = 'hidden';
    dialog.showModal();
    dialog.scrollTop = 0;
    dialog.querySelector('h2').focus({ preventScroll: true });
  });
  dialog.querySelectorAll('[data-mascots-close]').forEach(button => {
    button.addEventListener('click', () => dialog.close());
  });
  dialog.querySelectorAll('[data-fauna]').forEach(button => {
    button.addEventListener('click', () => {
      doc.dispatchEvent(new CustomEvent('fauna:open', { detail: { button } }));
    });
  });
  dialog.addEventListener('close', () => {
    doc.body.style.overflow = priorOverflow;
    trigger.focus({ preventScroll: true });
  });
  // O diálogo nativo mantém os anteriores inertes; o ciclo evita foco no navegador.
  dialog.addEventListener('keydown', event => {
    event.stopPropagation();
    if (event.key === 'Escape') {
      event.preventDefault();
      dialog.close();
      return;
    }
    if (event.key !== 'Tab') return;
    const stops = [...dialog.querySelectorAll('button:not([disabled])')];
    const first = stops[0];
    const last = stops.at(-1);
    const current = doc.activeElement;
    if (event.shiftKey && (current === first || current === dialog.querySelector('h2'))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && current === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

if (typeof document !== 'undefined') initMascotsDialog();

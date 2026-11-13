// Abertura, foco e fechamento do diálogo Sobre o projeto.
const trigger = document.querySelector('#about-open');
const dialog = document.querySelector('#about-dialog');
if (trigger && dialog) {
  const title = dialog.querySelector('#about-title');
  let returnFocus = null,
    pointerStartedOutside = false;
  trigger.addEventListener('click', () => {
    if (dialog.open) return;
    returnFocus = document.activeElement;
    dialog.showModal();
    title.focus({ preventScroll: true });
  });
  dialog
    .querySelectorAll('[data-about-close]')
    .forEach((button) => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('close', () => {
    pointerStartedOutside = false;
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  });
  const outside = (event) => {
    const r = dialog.getBoundingClientRect();
    return (
      event.clientX < r.left ||
      event.clientX > r.right ||
      event.clientY < r.top ||
      event.clientY > r.bottom
    );
  };
  dialog.addEventListener('pointerdown', (event) => {
    pointerStartedOutside = event.target === dialog && outside(event);
  });
  dialog.addEventListener('click', (event) => {
    if (pointerStartedOutside && event.target === dialog && outside(event)) dialog.close();
    pointerStartedOutside = false;
  });
  dialog.addEventListener('keydown', (event) => {
    event.stopPropagation(); // Teclas do modal não devem acionar atalhos dos jogos.
    if (event.key === 'Escape') {
      event.preventDefault();
      dialog.close();
      return;
    }
    if (event.key !== 'Tab') return;
    const buttons = [...dialog.querySelectorAll('button:not([disabled])')];
    const first = buttons[0],
      last = buttons.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === title)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

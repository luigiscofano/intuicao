// Diálogo compartilhado para confirmar o reinício e controlar o foco.
// Confirmação visual reutilizável. O dialog nativo isola o foco e torna o fundo inerte.
export function createRestartConfirmation(id) {
  let dialog = null,
    pending = null;
  function mount() {
    if (dialog) return;
    dialog = document.createElement('dialog');
    dialog.id = id;
    dialog.className = 'restart-dialog';
    dialog.setAttribute('aria-labelledby', id + '-title');
    dialog.setAttribute('aria-describedby', id + '-description');
    dialog.innerHTML = `<p class="eyebrow">UM NOVO COMEÇO</p><h2 id="${id}-title"></h2><p id="${id}-description"></p><div class="restart-dialog-actions"><button id="${id}-cancel" type="button">Cancelar</button><button id="${id}-confirm" type="button" class="action-reset"></button></div>`;
    document.body.appendChild(dialog);
    dialog.querySelector('#' + id + '-cancel').onclick = () => finish(false);
    dialog.querySelector('#' + id + '-confirm').onclick = () => finish(true);
    dialog.addEventListener('cancel', (event) => {
      event.preventDefault();
      finish(false);
    });
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        finish(false);
      }
      if (event.key === 'Tab') {
        const first = dialog.querySelector('#' + id + '-cancel'),
          last = dialog.querySelector('#' + id + '-confirm');
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }
  function dismiss(restoreFocus = false) {
    const previous = pending;
    pending = null;
    if (dialog?.open) dialog.close();
    if (restoreFocus) {
      const target = previous?.trigger?.isConnected
        ? previous.trigger
        : previous?.fallbackFocus?.();
      target?.focus({ preventScroll: true });
    }
    return previous;
  }
  function finish(confirmed) {
    if (!pending) return;
    const valid = pending.isCurrent();
    const request = dismiss(!confirmed && valid);
    if (!valid) return;
    if (confirmed) request.onConfirm();
    else request.onCancel?.();
  }
  return {
    open({
      match = false,
      trigger = document.activeElement,
      isCurrent = () => true,
      onConfirm,
      onCancel,
      fallbackFocus,
    }) {
      if (pending) return; // Cliques repetidos nunca empilham confirmações.
      mount();
      pending = { trigger, isCurrent, onConfirm, onCancel, fallbackFocus };
      dialog.querySelector('#' + id + '-title').textContent = match
        ? 'Reiniciar esta partida?'
        : 'Reiniciar este nível?';
      dialog.querySelector('#' + id + '-description').textContent = match
        ? 'Suas jogadas nesta partida serão apagadas. O progresso dos outros níveis será mantido.'
        : 'Suas jogadas nesta tentativa serão apagadas. O progresso dos outros níveis será mantido.';
      dialog.querySelector('#' + id + '-confirm').textContent = match
        ? 'Reiniciar partida'
        : 'Reiniciar nível';
      dialog.showModal();
      dialog.querySelector('#' + id + '-cancel').focus();
    },
    dismiss,
    get isOpen() {
      return pending !== null;
    },
  };
}

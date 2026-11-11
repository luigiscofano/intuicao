/** Um único diálogo preserva foco e impede duas decisões simultâneas no mesmo duelo. */
export function createDuelConfirmation() {
  let dialog = null;
  let pending = null;

  function mount() {
    if (dialog) return;
    dialog = document.createElement("dialog");
    dialog.className = "restart-dialog";
    dialog.setAttribute("aria-labelledby", "nv-dialog-title");
    dialog.innerHTML = `
      <p class="eyebrow">DECIDIR JUNTOS</p>
      <h2 id="nv-dialog-title"></h2>
      <p id="nv-dialog-description"></p>
      <div class="restart-dialog-actions">
        <button type="button" data-dialog-cancel>Cancelar</button>
        <button type="button" class="primary" data-dialog-confirm>Confirmar</button>
      </div>`;
    document.body.append(dialog);
    dialog.querySelector("[data-dialog-cancel]").onclick = () => finish(false);
    dialog.querySelector("[data-dialog-confirm]").onclick = () => finish(true);
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      finish(false);
    });
  }

  function dismiss() {
    pending = null;
    if (dialog?.open) dialog.close();
  }

  function finish(approved) {
    const request = pending;
    dismiss();
    if (!request?.isCurrent()) return;
    if (approved) request.onConfirm();
    else request.onCancel?.();
    if (request.trigger?.isConnected)
      request.trigger.focus({ preventScroll: true });
  }

  function open(request) {
    if (pending) return;
    mount();
    pending = { ...request, trigger: document.activeElement };
    dialog.querySelector("#nv-dialog-title").textContent = request.title;
    dialog.querySelector("#nv-dialog-description").textContent =
      request.description;
    dialog.showModal();
    dialog.querySelector("[data-dialog-cancel]").focus();
  }

  return {
    open,
    dismiss,
    get isOpen() {
      return Boolean(pending);
    },
  };
}

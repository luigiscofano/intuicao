import {
  MAX_BACKUP_BYTES,
  createProgressBackup,
  parseProgressBackup,
  previewProgressRestore,
  applyProgressRestore,
} from "./progress-backup.mjs";
import {
  canWriteProgress,
  RESTORE_REVISION_KEY,
} from "./progress-write-guard.mjs";

const RECORD_NAMES = Object.freeze({
  "intuicao.advanced-hidden": "Preferência de opções avançadas",
  "intuicao.answers.v1": "Dicas e respostas consultadas",
  "intuicao.broto.v1": "Broto · partida e preferências",
  "intuicao.campaign.cut.progress.v1": "Campanha Corte certo · conclusões",
  "intuicao.campaign.light.progress.v1": "Campanha Reflexos · conclusões",
  "intuicao.campaign.original.v1": "Reflexos e Corte certo · tentativas",
  "intuicao.cerco.v1": "Cerco · partida e preferências",
  "intuicao.collection.v1": "Elo, Prumo, Pacto e Desvio · progresso e sessões",
  "intuicao.custom.original.v1": "Reflexos e Corte certo · níveis importados",
  "intuicao.endless.original.v1": "Reflexos e Corte certo · Sem Parar",
  "intuicao.orbita.v1": "Órbita · progresso, sessões e arquivos antigos",
  "intuicao.repasse.v1": "Repasse · progresso, sessões e arquivos antigos",
  "intuicao.sintonia.v1": "Sintonia · progresso, sessões e arquivos antigos",
});
const ACTION_NAMES = Object.freeze({
  igual: "Manter sem alteração",
  adicionar: "Adicionar ao navegador",
  substituir: "Substituir pelo arquivo",
  remover: "Remover para recuperar a ausência anterior",
});

function downloadBackup(backup, prefix = "intuicao-progresso") {
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${prefix}-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function initProgressBackup(container) {
  if (!container) return;
  container.innerHTML = `
    <details class="progress-backup">
      <summary>Proteger ou restaurar meu progresso</summary>
      <p>Os dados ficam neste navegador. Salve uma cópia antes de trocar de dispositivo ou limpar seus dados.</p>
      <button type="button" data-backup-export>Baixar backup</button>
      <label class="backup-file">Selecionar backup para conferir
        <input type="file" data-backup-file accept=".json,application/json">
      </label>
      <p data-backup-status role="status" aria-live="polite"></p>
    </details>
    <dialog class="backup-dialog" aria-labelledby="backup-title">
      <h2 id="backup-title">Conferir restauração</h2>
      <p>Feche outras abas do Intuição antes de continuar. Esta operação substitui os registros indicados abaixo, sem combinar campanhas. Substituir por um backup mais antigo pode reduzir seu progresso.</p>
      <p>Registros ausentes no arquivo permanecem intactos. Uma cópia de recuperação pode indicar remoções explícitas para voltar ao estado anterior.</p>
      <ul data-backup-preview></ul>
      <p>Primeiro baixe a cópia do estado atual e confirme que o arquivo foi salvo. Ela permite desfazer esta restauração.</p>
      <button type="button" data-backup-recovery>Baixar cópia de recuperação</button>
      <label><input type="checkbox" data-backup-confirm disabled> Salvei a cópia e autorizo as alterações listadas.</label>
      <div class="backup-actions"><button type="button" data-backup-cancel>Cancelar</button><button type="button" data-backup-apply disabled>Restaurar e recarregar</button></div>
      <p data-backup-error role="alert"></p>
    </dialog>`;
  const find = (selector) => container.querySelector(selector);
  const dialog = find("dialog");
  const status = find("[data-backup-status]");
  const confirm = find("[data-backup-confirm]");
  const apply = find("[data-backup-apply]");
  let selected = null;
  let preview = null;
  let recovery = null;
  let fileRevision = 0;
  const storage = () => globalThis.localStorage;
  const fail = (error) => {
    status.textContent = error.message;
  };

  find("[data-backup-export]").onclick = () => {
    try {
      downloadBackup(createProgressBackup(storage()));
      status.textContent = "Backup preparado. Confira se o download foi salvo.";
    } catch (error) {
      fail(error);
    }
  };
  find("[data-backup-file]").onchange = async (event) => {
    const revision = ++fileRevision;
    const file = event.target.files?.[0];
    selected = null;
    if (!file) return;
    try {
      if (file.size > MAX_BACKUP_BYTES)
        throw new Error("O arquivo excede o limite de 16 MB.");
      const text = await file.text();
      if (revision !== fileRevision) return;
      selected = parseProgressBackup(text);
      preview = previewProgressRestore(selected, storage());
      recovery = createProgressBackup(storage(), new Date(), true);
      const list = find("[data-backup-preview]");
      list.replaceChildren(
        ...preview.map((record) => {
          const item = document.createElement("li");
          const title = document.createElement("strong");
          title.textContent = RECORD_NAMES[record.key];
          const action = document.createElement("span");
          action.textContent = ` — ${ACTION_NAMES[record.action]}`;
          const technical = document.createElement("small");
          technical.textContent = record.key;
          item.append(title, action, technical);
          return item;
        }),
      );
      confirm.checked = false;
      confirm.disabled = true;
      apply.disabled = true;
      find("[data-backup-error]").textContent = "";
      dialog.showModal();
    } catch (error) {
      fail(error);
    }
  };
  find("[data-backup-cancel]").onclick = () => dialog.close();
  dialog.addEventListener("close", () => {
    find("[data-backup-file]").value = "";
  });
  find("[data-backup-recovery]").onclick = () => {
    downloadBackup(recovery, "intuicao-recuperacao");
    confirm.disabled = false;
  };
  confirm.onchange = () => {
    apply.disabled = !confirm.checked;
  };
  apply.onclick = () => {
    if (!confirm.checked || !selected || apply.disabled) return;
    apply.disabled = true;
    try {
      applyProgressRestore(selected, preview, storage());
      location.reload();
    } catch (error) {
      find("[data-backup-error]").textContent = error.message;
      if (error.recovery) recovery = error.recovery;
      confirm.checked = false;
      confirm.disabled = true;
    }
  };
  // Uma aba antiga não pode salvar por cima de um progresso recém-restaurado.
  const checkOtherTab = () => {
    if (canWriteProgress(storage())) return;
    status.textContent =
      "O progresso foi restaurado em outra aba. Recarregue esta página antes de continuar; novos salvamentos estão bloqueados.";
    container.querySelector("details").open = true;
  };
  window.addEventListener("storage", (event) => {
    if (event.key === RESTORE_REVISION_KEY) checkOtherTab();
  });
  window.addEventListener("pageshow", checkOtherTab);
}

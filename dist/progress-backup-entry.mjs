import { initProgressBackup } from './progress-backup-ui.mjs';

// O painel usa apenas armazenamento local; não envia dados para um servidor.
initProgressBackup(document.getElementById('progress-backup-panel'));

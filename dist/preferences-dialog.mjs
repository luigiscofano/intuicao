import { initMotionPreference } from './motion-preference.mjs';

export const INTERFACE_SIZE_KEY = 'intuicao.interface-size.v1';
export function normalizeInterfaceSize(value) { return value === 'large' ? 'large' : 'standard'; }

/** Reúne preferências existentes; não copia jogos nem recria seus controles. */
export function initPreferencesDialog(doc = globalThis.document, win = doc?.defaultView) {
  const trigger = doc?.getElementById('preferences-open');
  if (!trigger || doc.getElementById('preferences-dialog')) return;
  const dialog = doc.createElement('dialog');
  dialog.id = 'preferences-dialog';
  dialog.setAttribute('aria-labelledby', 'preferences-title');
  dialog.innerHTML = `
    <div class="preferences-heading"><h2 id="preferences-title">Configurações</h2><button type="button" data-preferences-close aria-label="Fechar configurações">Fechar</button></div>
    <p class="preferences-intro">Suas preferências ficam neste navegador. Elas não alteram fases, partidas ou conquistas.</p>
    <section aria-labelledby="preferences-visual-title"><h3 id="preferences-visual-title">Visual do jogo</h3>
      <p data-skin-description></p><div data-skin-options class="preferences-options"></div></section>
    <section data-motion-slot aria-labelledby="preferences-motion-title"><h3 id="preferences-motion-title">Movimento</h3></section>
    <section aria-labelledby="preferences-size-title"><h3 id="preferences-size-title">Tamanho da interface</h3>
      <div class="preferences-options" role="group" aria-label="Tamanho dos textos e controles">
        <button type="button" data-interface-size="standard">Padrão</button><button type="button" data-interface-size="large">Ampliado</button>
      </div><p>Amplia textos e controles de navegação. O zoom do navegador continua disponível.</p></section>
    <section data-backup-slot aria-labelledby="preferences-backup-title"><h3 id="preferences-backup-title">Progresso e backup</h3></section>`;
  doc.body.append(dialog);
  const motion = doc.querySelector('.motion-preferences');
  if (motion) dialog.querySelector('[data-motion-slot]').append(motion);
  initMotionPreference(doc, win);
  const backup = doc.getElementById('progress-backup-panel');
  if (backup) { backup.hidden = false; dialog.querySelector('[data-backup-slot]').append(backup); }
  let storage;
  try { storage = win.localStorage; } catch { /* Preferências continuam na sessão. */ }
  let size = 'standard';
  try { size = normalizeInterfaceSize(storage?.getItem(INTERFACE_SIZE_KEY)); } catch {}
  const applySize = () => {
    doc.documentElement.dataset.interfaceSize = size;
    dialog.querySelectorAll('[data-interface-size]').forEach(button =>
      button.setAttribute('aria-pressed', String(button.dataset.interfaceSize === size)));
    win.dispatchEvent(new win.Event('resize'));
  };
  applySize();
  dialog.addEventListener('click', event => {
    const button = event.target.closest('[data-interface-size]');
    if (!button) return;
    size = normalizeInterfaceSize(button.dataset.interfaceSize);
    try { storage?.setItem(INTERFACE_SIZE_KEY, size); } catch {}
    applySize();
  });
  const updateSkins = () => {
    const host = dialog.querySelector('[data-skin-options]');
    host.replaceChildren();
    const current = [...doc.querySelectorAll('button[data-pulso-skin], button[data-refugio-skin]')]
      .filter(button => !button.closest('[hidden]'));
    dialog.querySelector('[data-skin-description]').textContent = current.length
      ? 'A escolha usa o controle do jogo aberto e preserva a jogada atual.'
      : 'Abra Refúgio para escolher entre o visual normal e a identidade própria. Os demais jogos mantêm seu visual atual.';
    for (const original of current) {
      const button = doc.createElement('button');
      button.type = 'button'; button.textContent = original.textContent;
      button.setAttribute('aria-pressed', original.getAttribute('aria-pressed') || 'false');
      button.addEventListener('click', () => {
        const label = original.textContent;
        original.click(); updateSkins();
        [...host.querySelectorAll('button')].find(option => option.textContent === label)?.focus();
      });
      host.append(button);
    }
  };
  trigger.addEventListener('click', () => {
    updateSkins(); if (backup) backup.hidden = false;
    dialog.showModal(); dialog.querySelector('[data-preferences-close]').focus();
  });
  dialog.querySelector('[data-preferences-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => trigger.focus({ preventScroll: true }));
  win.addEventListener('storage', event => {
    if (event.key === INTERFACE_SIZE_KEY) { size = normalizeInterfaceSize(event.newValue); applySize(); }
  });
}
if (typeof document !== 'undefined') initPreferencesDialog();

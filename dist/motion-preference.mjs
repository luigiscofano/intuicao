import { setReducedMotion } from './ui-motion.mjs';

export const MOTION_PREFERENCE_KEY = 'intuicao.ui-motion.v1';

// Preferência de apresentação independente dos saves, campanhas e backups.
export function initMotionPreference(doc = globalThis.document, win = doc?.defaultView) {
  const checkbox = doc?.getElementById('motion-reduce');
  const description = doc?.getElementById('motion-description');
  if (!checkbox || checkbox.dataset.motionReady) return;
  checkbox.dataset.motionReady = 'true';
  let storage = null;
  let manual = false;
  try {
    storage = win?.localStorage;
    manual = storage?.getItem(MOTION_PREFERENCE_KEY) === 'reduce';
  } catch { /* Sem armazenamento, a preferência vale durante esta visita. */ }
  const media = win?.matchMedia?.('(prefers-reduced-motion: reduce)');
  function apply() {
    setReducedMotion(manual, doc);
    checkbox.checked = manual || Boolean(media?.matches);
    checkbox.disabled = Boolean(media?.matches);
    if (description) description.textContent = media?.matches
      ? 'Seu aparelho já solicita menos movimento. Essa preferência é respeitada.'
      : 'Menos deslocamentos, giros e partículas. As confirmações continuam visíveis.';
  }
  checkbox.addEventListener('change', () => {
    manual = checkbox.checked;
    try { storage?.setItem(MOTION_PREFERENCE_KEY, manual ? 'reduce' : 'system'); } catch {}
    apply();
  });
  media?.addEventListener?.('change', apply);
  win?.addEventListener?.('storage', event => {
    if (event.key !== MOTION_PREFERENCE_KEY) return;
    manual = event.newValue === 'reduce';
    apply();
  });
  apply();
}

if (typeof document !== 'undefined') initMotionPreference();

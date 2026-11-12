/** Preferência visual separada dos saves, fases, histórico e conquistas. */
export const PULSO_SKIN_KEY = 'intuicao:pulso:skin:v1';
let memory = 'identity';
let memoryOverridesStorage = false;

export function readPulsoSkin(storage) {
  if (memoryOverridesStorage) return memory;
  try {
    const value = (storage ?? globalThis.localStorage)?.getItem(PULSO_SKIN_KEY);
    if (value === 'normal' || value === 'identity') memory = value;
  } catch {
    // Navegação privada mantém a escolha nesta sessão.
  }
  return memory;
}

export function writePulsoSkin(value, storage) {
  if (!['normal', 'identity'].includes(value)) return false;
  memory = value;
  try {
    (storage ?? globalThis.localStorage)?.setItem(PULSO_SKIN_KEY, value);
    memoryOverridesStorage = false;
  } catch {
    memoryOverridesStorage = true;
    // Uma leitura antiga não pode desfazer a escolha cuja gravação falhou.
  }
  return true;
}

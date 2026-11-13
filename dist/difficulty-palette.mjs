/** Paleta Cerâmica aprovada: somente apresentação, sem mudar fases ou progresso. */
export const DIFFICULTY_PALETTE = Object.freeze([
  { name: 'Básico', color: '#7B817A' },
  { name: 'Aprendiz', color: '#285D7C' },
  { name: 'Intermediário', color: '#725580' },
  { name: 'Avançado', color: '#805D43' },
  { name: 'Mestre', color: '#2C302D' },
  { name: 'Modo Sábio', color: '#A7443D' }
].map(Object.freeze));

// A graduação vem do nome do grupo, nunca da posição ou do número da fase.
// Assim, grupos ausentes e catálogos futuros não recebem uma cor incorreta.
export function difficultyIndex(label) {
  const normalized = String(label).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  return DIFFICULTY_PALETTE.findIndex(({ name }) => {
    const key = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return new RegExp(`(^|[^a-z])${key}([^a-z]|$)`).test(normalized);
  });
}

export function presentDifficultyPalette(root) {
  for (const heading of root.querySelectorAll('.stage-heading, .logic-tier-heading')) {
    const index = difficultyIndex(heading.textContent);
    if (index >= 0) heading.dataset.difficultyTier = String(index);
    else delete heading.dataset.difficultyTier;
  }
}

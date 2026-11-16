// Procedural generators are lazy-loaded outside the campaign path.
const loaders = {
  divisa: () => import('./games/divisa/endless.mjs'),
  pulso: () => import('./games/pulso/endless.mjs'),
  foz: () => import('./games/foz/endless.mjs'),
  refugio: () => import('./games/refugio/endless.mjs'),
  mirante: () => import('./games/mirante/endless.mjs'),
  renovo: () => import('./games/renovo/endless.mjs'),
};
export const GENERATOR_VERSION = 1;
export const RECENT_LIMIT = 64;
export const normalizeDifficulty = value => Math.max(0, Math.min(5, Math.floor(Number(value) || 0)));
export function mixSeed(base, step = 0, attempt = 0) {
  let x = (Number(base) >>> 0) ^ Math.imul((step % 0x100000000) >>> 0, 0x9e3779b1) ^ Math.imul(Math.floor(step / 0x100000000), 0x85ebca6b) ^ Math.imul(attempt, 0xc2b2ae35);
  x = Math.imul(x ^ x >>> 16, 0x7feb352d); x = Math.imul(x ^ x >>> 15, 0x846ca68b);
  return (x ^ x >>> 16) >>> 0;
}
// Two independent 32-bit hashes keep a bounded, compact recent-history record.
export function fingerprint(text) {
  let a = 2166136261, b = 0x9e3779b9;
  for (const char of String(text)) { a = Math.imul(a ^ char.charCodeAt(0), 16777619); b = Math.imul(b ^ char.charCodeAt(0), 2246822519); }
  return (a >>> 0).toString(16).padStart(8, '0') + (b >>> 0).toString(16).padStart(8, '0');
}
export async function generateLogicChallenge({ game, baseSeed, step = 0, difficulty = 0, recentSignatures = [] }) {
  if (!Object.hasOwn(loaders, game)) throw new Error('Jogo desconhecido.');
  if (!Number.isSafeInteger(step) || step < 0) throw new Error('Número de desafio inválido.');
  const generator = await loaders[game]();
  const seen = new Set(recentSignatures.slice(-RECENT_LIMIT));
  const tier = normalizeDifficulty(difficulty);
  for (let attempt = 0; attempt < 48; attempt++) {
    const seed = mixSeed(baseSeed, step, attempt);
    const level = generator.generateEndlessLevel(seed, tier);
    const signature = fingerprint(`${game}:${generator.structuralSignature(level)}`);
    if (seen.has(signature)) continue;
    return { level: { ...level, id: `endless-${game}-v${GENERATOR_VERSION}-${seed}-${tier}`, number: step + 1, difficulty: tier }, seed, signature, generatorVersion: GENERATOR_VERSION };
  }
  throw new Error('Não foi possível encontrar uma fase diferente das recentes. Tente gerar novamente ou altere a dificuldade.');
}

// Limites, leitura segura e identificação de fases JSON importadas.
/** Data-only JSON boundary shared by local level importers. No DOM or storage. */
export const LEVEL_JSON_LIMITS = Object.freeze({
  bytes: 200000,
  depth: 16,
  nodes: 10000,
  array: 4096,
  string: 4096,
  keys: 512,
});
const forbiddenKeys = new Set(['__proto__', 'constructor', 'prototype']);
const fail = (message) => {
  throw new Error(message);
};
const plain = (value) =>
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
export function assertJSONData(value) {
  const stack = [{ value, depth: 0 }],
    seen = new WeakSet();
  let nodes = 0,
    bytes = 0;
  const addBytes = (size) => {
    bytes += size;
    if (bytes > LEVEL_JSON_LIMITS.bytes)
      fail('Os dados JSON ultrapassam o limite de 200.000 bytes.');
  };
  const encoded = (value) => new TextEncoder().encode(JSON.stringify(value)).byteLength;
  while (stack.length) {
    const { value: item, depth } = stack.pop();
    if (++nodes > LEVEL_JSON_LIMITS.nodes) fail('JSON com dados demais. Simplifique a fase.');
    if (depth > LEVEL_JSON_LIMITS.depth) fail('JSON muito aninhado. Simplifique a estrutura.');
    if (item === null || typeof item === 'boolean') {
      addBytes(encoded(item));
      continue;
    }
    if (typeof item === 'number') {
      if (!Number.isFinite(item)) fail('Use somente números finitos no JSON.');
      addBytes(encoded(item));
      continue;
    }
    if (typeof item === 'string') {
      if (item.length > LEVEL_JSON_LIMITS.string) fail('Um texto do JSON é muito longo.');
      addBytes(encoded(item));
      continue;
    }
    if (typeof item !== 'object') fail('Use somente dados JSON, sem funções ou valores especiais.');
    if (seen.has(item)) fail('O JSON precisa ser uma árvore de dados, sem referências circulares.');
    seen.add(item);
    if (!Array.isArray(item) && !plain(item)) fail('Use somente objetos simples no JSON.');
    const descriptors = Object.getOwnPropertyDescriptors(item),
      keys = Reflect.ownKeys(descriptors);
    if (Array.isArray(item) && item.length > LEVEL_JSON_LIMITS.array)
      fail('Um array do JSON tem elementos demais.');
    if (!Array.isArray(item) && keys.length > LEVEL_JSON_LIMITS.keys)
      fail('Um objeto do JSON tem campos demais.');
    addBytes(2 + Math.max(0, (Array.isArray(item) ? item.length : keys.length) - 1));
    for (const key of keys) {
      if (typeof key !== 'string' || forbiddenKeys.has(key))
        fail('O JSON contém uma chave não permitida.');
      if (key.length > LEVEL_JSON_LIMITS.string) fail('Uma chave do JSON é muito longa.');
      if (Array.isArray(item) && key === 'length') continue;
      if (!Array.isArray(item)) addBytes(encoded(key) + 1);
      const descriptor = descriptors[key];
      if (!Object.hasOwn(descriptor, 'value') || !descriptor.enumerable)
        fail('Use somente propriedades de dados no JSON.');
      if (Array.isArray(item) && (!/^(0|[1-9]\d*)$/.test(key) || Number(key) >= item.length))
        fail('Um array do JSON contém campos inválidos.');
      stack.push({ value: descriptor.value, depth: depth + 1 });
    }
    if (Array.isArray(item) && keys.length !== item.length + 1)
      fail('Arrays JSON não podem ter casas ausentes.');
  }
  return value;
}
export function parseLevelJSON(text, expectedGame, { allowLegacyDesvio = false } = {}) {
  if (typeof text !== 'string') fail('Selecione um arquivo de texto JSON.');
  if (
    text.length > LEVEL_JSON_LIMITS.bytes ||
    new TextEncoder().encode(text).byteLength > LEVEL_JSON_LIMITS.bytes
  )
    fail('Arquivo muito grande. O limite é 200.000 bytes.');
  let input;
  try {
    input = JSON.parse(text.replace(/^\uFEFF/, ''));
  } catch {
    fail('JSON inválido. Confira aspas, vírgulas e colchetes.');
  }
  assertJSONData(input);
  if (!plain(input)) fail('A fase deve ser um objeto JSON.');
  if (
    allowLegacyDesvio &&
    expectedGame === 'desvio' &&
    !Object.hasOwn(input, 'game') &&
    Array.isArray(input.arrows)
  )
    input = { ...input, game: 'desvio' };
  if (
    !Object.hasOwn(input, 'game') ||
    typeof input.game !== 'string' ||
    input.game !== expectedGame
  )
    fail('Use um JSON do jogo selecionado, com o campo game correto.');
  return input;
}
function canonical(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']';
  return (
    '{' +
    Object.keys(value)
      .sort()
      .map((key) => JSON.stringify(key) + ':' + canonical(value[key]))
      .join(',') +
    '}'
  );
}
/** Pass only normalized rule data. Root id is ignored to make this idempotent. */
export function customIdentity(game, puzzle) {
  if (typeof game !== 'string' || !/^[a-z][a-z0-9-]{0,31}$/.test(game))
    fail('Identificador de jogo inválido.');
  assertJSONData(puzzle);
  const data = {};
  for (const key of Object.keys(puzzle).sort()) if (key !== 'id') data[key] = puzzle[key];
  const source = game + ':' + canonical(data);
  let a = 2166136261,
    b = 0x9e3779b9;
  for (let i = 0; i < source.length; i++) {
    const c = source.charCodeAt(i);
    a = Math.imul(a ^ c, 16777619);
    b = Math.imul(b ^ c, 0x85ebca6b);
    b ^= b >>> 13;
  }
  return `custom-${game}-${(a >>> 0).toString(16).padStart(8, '0')}${(b >>> 0).toString(16).padStart(8, '0')}-${source.length.toString(36)}`;
}

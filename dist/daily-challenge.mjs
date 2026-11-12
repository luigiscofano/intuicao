// Mesmo dia civil e hash usados pelos jogos lógicos; nenhuma persistência paralela.
export function dailyChallenge(game, date = new Date(), count = 80) {
  const key = typeof game === 'string' ? game.trim().toLowerCase() : '';
  if (!['light', 'cut'].includes(key)) throw new RangeError('Jogo diário inválido.');
  if (!Number.isSafeInteger(count) || count < 1)
    throw new RangeError('O catálogo diário precisa ter ao menos uma fase.');
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  const day = ['year', 'month', 'day'].map(type => parts.find(part => part.type === type).value).join('-');
  let hash = 2166136261;
  for (const character of `${key}:${day}`)
    hash = Math.imul(hash ^ character.charCodeAt(0), 16777619) >>> 0;
  return { game: key, day, index: hash % count };
}

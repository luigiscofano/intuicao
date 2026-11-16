/** Artes decorativas aprovadas. Não representam controles nem alteram regras. */
export const APPROVED_GAME_ART = Object.freeze({
  "light": "platform-assets/light-aiij-aprovada.svg",
  "cut": "platform-assets/cut-aiij-aprovada.svg",
  "elo": "platform-assets/elo-aiij-aprovada.svg",
  "repasse": "platform-assets/repasse-aiij-aprovada.svg",
  "broto": "platform-assets/broto-aiij-aprovada.svg",
  "cerco": "platform-assets/cerco-aiij-aprovada.svg",
  "mosaico": "platform-assets/mosaico-aiij-aprovada.svg",
  "acorde": "platform-assets/acorde-aiij-aprovada.svg"
});
export function updateGameArt(image, gameId) {
  const source = APPROVED_GAME_ART[gameId];
  image.hidden = !source;
  if (source) image.setAttribute('src', source);
  else image.removeAttribute('src');
}

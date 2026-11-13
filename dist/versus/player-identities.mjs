/** Identidade visual fixa por jogo; nunca participa do motor ou do save. */
import { ANIMAL_SPRITES, ANIMAL_NAMES } from '../sintonia/animal-roster.mjs';
import { escapeHTML, playerName as colorName } from './shared/markup.mjs';

export const PLAYER_ANIMALS = Object.freeze({
  broto: Object.freeze(['capivara', 'tuiuiu']),
  acorde: Object.freeze(['bemtevi', 'arara']),
  dobra: Object.freeze(['tatu', 'tamandua']),
  estalo: Object.freeze(['piranha', 'coral']),
  quinhao: Object.freeze(['mico', 'quati']),
});

export function gamePlayerName(game, player) {
  return PLAYER_ANIMALS[game] ? `Jogador ${player + 1}` : colorName(player);
}

/** Reutiliza a mesma folha de sprites do Sintonia, sem recolorir os animais. */
export function playerAvatar(game, player) {
  const animal = PLAYER_ANIMALS[game]?.[player];
  if (!animal) return '';
  const sprite = ANIMAL_SPRITES[animal];
  const x = sprite.frame % sprite.columns;
  const y = Math.floor(sprite.frame / sprite.columns);
  return `<span class="player-animal" role="img" aria-label="${escapeHTML(ANIMAL_NAMES[animal])}" title="${escapeHTML(ANIMAL_NAMES[animal])}" style="background-image:url('${sprite.url}');background-size:${sprite.columns * 100}% ${sprite.rows * 100}%;background-position:${x / (sprite.columns - 1) * 100}% ${y / (sprite.rows - 1) * 100}%"></span>`;
}

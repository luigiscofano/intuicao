// Exact PNG atlases extracted from the existing approved Intuição artwork.
// All four sheets contain a 4 × 4 grid of 256px frames; no pixel was redrawn.
const sprite = name => Object.freeze({url: new URL(`./assets/${name}.png`, import.meta.url).href, columns: 4, rows: 4, frame: 0});
export const ANIMAL_SPRITES = Object.freeze({
  capivara: sprite('capivara'),
  tuiuiu: sprite('tuiuiu'),
  bemtevi: sprite('bemtevi'),
  mico: sprite('mico')
});

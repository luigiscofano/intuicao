// Caminhos e recortes do atlas original de sprites usado por SINTONIA.
// Exact artwork from the user's sprites_chibi_ituicao.png (Library v0).
// One self-contained 4 × 1 SVG atlas clips the unchanged PNG's top row:
// tuiuiú, capivara, bem-te-vi, mico. No artwork is redrawn or recolored.
const atlasURL = new URL('./assets/chibi-user-atlas.svg', import.meta.url).href;
const sprite = (frame) => Object.freeze({ url: atlasURL, columns: 4, rows: 1, frame });
export const ANIMAL_SPRITES = Object.freeze({
  capivara: sprite(1),
  tuiuiu: sprite(0),
  bemtevi: sprite(2),
  mico: sprite(3),
});

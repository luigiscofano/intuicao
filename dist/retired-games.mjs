// A retirada afeta o catálogo, não apaga os saves nem os módulos de recuperação.
export const RETIRED_GAME_IDS = Object.freeze(["divisa", "orbita"]);
export const isRetiredGame = (id) => RETIRED_GAME_IDS.includes(id);

// Links antigos continuam válidos como entrada para a biblioteca de lógica.
export function retiredGameFromLocation(location) {
  const game = new URLSearchParams(location.search).get("game");
  if (isRetiredGame(game)) return game;
  const path = location.pathname.match(/\/(divisa|orbita)\/?$/i)?.[1]?.toLowerCase();
  if (path) return path;
  return location.hash.match(/^#(?:game=)?(divisa|orbita)(?:$|[/?&])/i)?.[1]?.toLowerCase() ?? null;
}

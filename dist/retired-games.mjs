// A retirada afeta o catálogo, não apaga os saves nem os módulos de recuperação.
export const RETIRED_GAME_IDS = Object.freeze(["divisa", "orbita", "lastro", "vazante", "enlace"]);
export const isRetiredGame = (id) => RETIRED_GAME_IDS.includes(id);

// Links antigos levam à categoria original, sem reabrir ou apagar partidas.
export const retiredGameCategory = (id) => ["lastro", "vazante", "enlace"].includes(id) ? "versus" : "logica";
export function retiredGameFromLocation(location) {
  const game = new URLSearchParams(location.search).get("game");
  if (isRetiredGame(game)) return game;
  const path = location.pathname.match(/\/(divisa|orbita|lastro|vazante|enlace)\/?$/i)?.[1]?.toLowerCase();
  if (path) return path;
  return location.hash.match(/^#(?:game=)?(divisa|orbita|lastro|vazante|enlace)(?:$|[/?&])/i)?.[1]?.toLowerCase() ?? null;
}

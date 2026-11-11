import { VERSUS_ICON_PATHS } from "./versus/icons.mjs";
// Pictogramas monocromáticos da navegação, sem acesso ao estado das partidas.
export const GAME_NAV_ICONS = {
  ...VERSUS_ICON_PATHS,
  divisa:
    '<rect x="3" y="3" width="26" height="26" rx="3"/><path d="M14 3v11H3m11 0h15M20 14v15"/>',
  pulso:
    '<path d="M4 7h24M4 16h24M4 25h24"/><circle cx="6" cy="7" r="2"/><circle cx="16" cy="7" r="2"/><circle cx="26" cy="7" r="2"/><circle cx="12" cy="25" r="2"/><circle cx="18" cy="25" r="2"/><circle cx="24" cy="25" r="2"/>',
  foz: '<path d="M4 5v10h12v12m12-22v10H16M12 23l4 4 4-4"/><circle cx="4" cy="5" r="2"/><circle cx="28" cy="5" r="2"/>',
  refugio:
    '<rect x="3" y="3" width="26" height="26" rx="3"/><path d="M13 3v26m6-26v26m-6-18 6-6m-6 14 6-6m-6 14 6-6"/><circle cx="8" cy="16" r="2"/><circle cx="24" cy="16" r="2"/>',
  mirante:
    '<rect x="7" y="7" width="18" height="18" rx="2"/><path d="M1 16h5m-2-2 2 2-2 2M16 1v5m-2-2 2 2 2-2"/><circle cx="16" cy="16" r="4"/>',
  renovo:
    '<path d="M6 24h18V8"/><circle cx="6" cy="24" r="3"/><path d="m24 20 4 4-4 4-4-4ZM24 8c-5-1-6-5-4-7 5 1 7 3 4 7Z"/>',
  cerco:
    '<rect x="3" y="3" width="26" height="26" rx="3"/><path d="M3 16h26M16 3v26M6 7h7M6 11h7M22 7v7m-3-3 3 3 3-3"/><circle cx="22" cy="22" r="4"/>',
  broto:
    '<path d="M16 28V15M16 19C6 20 4 13 4 9c8-1 12 3 12 10ZM16 15C16 7 22 4 28 5c0 7-4 11-12 10ZM7 28h18"/>',
  light:
    '<path d="M3 23h13V5M10 29l12-12"/><circle cx="16" cy="4" r="2"/><path d="M2 20l3 3-3 3"/>',
  cut: '<rect x="4" y="5" width="24" height="22" rx="2"/><path d="M7 30L25 2M5 22l8 4M5 16l11 6M5 10l14 7"/>',
  elo: '<path d="M6 7h20v18H6z"/><circle cx="6" cy="7" r="3"/><circle cx="26" cy="7" r="3"/><circle cx="26" cy="25" r="3"/><circle cx="6" cy="25" r="3"/>',
  prumo:
    '<path d="M4 7h8v8h8V7h8v16H4zM16 24l-5 6h10z"/><path d="M12 15H4m16 0h8"/>',
  pacto:
    '<rect x="3" y="5" width="26" height="22" rx="3"/><path d="M16 5v22"/><circle cx="9.5" cy="16" r="4"/><circle cx="22.5" cy="16" r="4"/>',
  sintonia:
    '<path d="M4 8h10v20H4zM18 8h10v20H18zM6 17h6m8 0h6M9 14l3 3-3 3m14-6 3 3-3 3M10 3h12"/><circle cx="9" cy="24" r="1.5"/><circle cx="23" cy="24" r="1.5"/>',
  repasse:
    '<rect x="2" y="9" width="9" height="14" rx="2"/><rect x="21" y="9" width="9" height="14" rx="2"/><path d="M12 16h7m-3-3 3 3-3 3M24 16h3m-1.5-1.5v3M5 16h3"/>',
  orbita:
    '<circle cx="11" cy="16" r="8"/><circle cx="21" cy="16" r="8"/><path d="M5 5l5-2-1 5M4 6a13 13 0 0 1 6-3"/><circle cx="16" cy="10" r="2"/>',
  desvio:
    '<rect x="3" y="3" width="26" height="26" rx="3"/><path d="M3 12h26M3 21h26M12 3v26M21 3v26M5 16.5h5m-2-2 2 2-2 2M16.5 23v4m-2-2 2 2 2-2"/>',
};
export function initGameNavIcons(doc = document) {
  const cards = doc.querySelectorAll(
    ".games > button[data-game],.games > button[data-collection],.games > button[data-sintonia],.games > button[data-repasse],.games > button[data-orbita],.games > button[data-broto],.games > button[data-cerco],.games > button[data-logic],.games > button[data-versus]",
  );
  for (const card of cards) {
    const key =
      card.dataset.game ||
      card.dataset.collection ||
      card.dataset.sintonia ||
      card.dataset.repasse ||
      card.dataset.orbita ||
      card.dataset.broto ||
      card.dataset.cerco ||
      card.dataset.logic ||
      card.dataset.versus;
    if (!GAME_NAV_ICONS[key] || card.querySelector(".game-nav-icon")) continue;
    const mark = doc.createElement("i");
    mark.className = "game-nav-icon";
    mark.setAttribute("aria-hidden", "true");
    mark.innerHTML = `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">${GAME_NAV_ICONS[key]}</svg>`;
    card.prepend(mark);
    card.classList.add("has-game-nav-icon");
  }
}
if (typeof document !== "undefined") {
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", () => initGameNavIcons(), {
      once: true,
    });
  else initGameNavIcons();
}

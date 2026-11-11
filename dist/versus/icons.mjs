const DRAWINGS = Object.freeze({
  enlace:
    '<path d="M5 25V15h11V5m0 10h11v12"/><circle cx="5" cy="25" r="3"/><circle cx="16" cy="5" r="3"/><circle cx="27" cy="27" r="3"/>',
  vazante: '<path d="M4 18h24l-5 8H9Zm12 0V5l9 10H16M3 29q4-3 8 0t8 0t10 0"/>',
  mosaico:
    '<rect x="3" y="3" width="26" height="26" rx="4"/><path d="M16 3v26M3 16h26"/><path d="m16 10 6 6-6 6-6-6Z"/>',
  quinhao:
    '<path d="M4 18h24l-3 11H7ZM7 18C7 5 25 5 25 18"/><circle cx="11" cy="15" r="3"/><circle cx="21" cy="15" r="3"/><path d="m16 12-2-5 5 2"/>',
  estalo:
    '<path d="M5 26C2 12 8 3 25 6c3 17-6 26-20 20ZM10 22 23 9m-7 0h7v7"/>',
  dobra:
    '<path d="M4 4h24v24H4ZM4 4l12 12L28 4M16 16v12M4 16h24"/><circle cx="10" cy="22" r="2"/><path d="m23 18 3 3-3 3-3-3Z"/>',
  acorde:
    '<path d="M7 20c2-3 1-9 5-11V5h8v4c4 2 3 8 5 11l2 3H5ZM13 27h6M4 3h24"/>',
  lastro:
    '<path d="M16 5v22M8 28h16M3 10h26M7 10 3 21h8L7 10Zm18 0-4 11h8l-4-11Z"/>',
});

export function versusIcon(id, className = "") {
  return `<svg class="${className}" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${DRAWINGS[id] ?? DRAWINGS.enlace}</svg>`;
}

export const VERSUS_ICON_PATHS = DRAWINGS;

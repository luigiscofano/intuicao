// Crisp, code-native scenery only. Animal artwork lives in animal-roster.mjs.
const paths = {
  box: '<rect x="4" y="4" width="24" height="24" rx="3"/><path d="M8 8l16 16M24 8L8 24"/>',
  key: '<circle cx="11" cy="11" r="6"/><path d="M15.5 15.5L27 27m-4-4 4-4m-8 0 4-4"/>',
  switch: '<rect x="4" y="9" width="24" height="14" rx="7"/><circle cx="11" cy="16" r="4" fill="currentColor" stroke="none"/>',
  switchOn: '<rect x="4" y="9" width="24" height="14" rx="7"/><circle cx="21" cy="16" r="4" fill="currentColor" stroke="none"/>',
  selector: '<path d="M6 24V14a6 6 0 016-6h13M20 3l5 5-5 5M12 14h8a5 5 0 015 5v5m-5-5 5 5 5-5"/>',
  deliveryIn: '<path d="M5 19v8h22v-8M8 17L24 5M15 5h9v9"/>',
  deliveryOut: '<path d="M5 19v8h22v-8M24 5L8 17M8 8v9h9"/>',
  up: '<path d="M16 26V6M8 14l8-8 8 8"/>',
  right: '<path d="M6 16h20M18 8l8 8-8 8"/>',
  down: '<path d="M16 6v20M8 18l8 8 8-8"/>',
  left: '<path d="M26 16H6M14 8l-8 8 8 8"/>'
};
export function sceneryIcon(name) {
  if(!Object.hasOwn(paths,name))throw new Error('Unknown scenery icon');
  return `<svg class="s-scenery-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
}

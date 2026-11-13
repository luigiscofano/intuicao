// A silhueta identifica o dono, nunca o estímulo recebido ou a pontuação.
// As duas formas reproduzem a opção B aprovada: folhas largas e pontudas.
const LEAF_PATHS = [
  "M24 25C10 28 5 19 10 12C20 8 28 15 24 25ZM24 18C20 8 31 1 40 7C44 16 32 23 24 18Z",
  "M24 25C10 24 7 16 5 7C18 9 25 14 24 25ZM24 18C25 8 33 3 44 2C43 13 35 21 24 18Z",
];

export function sproutMarkup(owner) {
  return `<svg class="b-sprout" viewBox="0 0 48 40" aria-hidden="true"><path class="b-plant-stem" d="M24 35V18M17 36Q24 32 31 36" fill="none" stroke-width="2.8" stroke-linecap="round"/><path class="b-plant-leaves" d="${LEAF_PATHS[owner]}" stroke-width="1.2" stroke-linejoin="round"/><path class="b-plant-veins" d="M24 24L13 17M25 17L36 10" fill="none" stroke-width="1.3"/></svg>`;
}

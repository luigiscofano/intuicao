// Ilustrações de vitória associadas à mecânica de cada jogo.
// Decorative summaries of each game's mechanics. Never evaluates or changes play.
const animal = (x, y, frame) =>
  `<svg x="${x}" y="${y}" width="25" height="25" viewBox="${frame.join(' ')}"><image href="./platform-assets/fauna-green-original.png" width="1079" height="1458"/></svg>`;
const shapes = {
  elo: `<rect class="gv-paper" x="27" y="13" width="106" height="74" rx="15"/><path class="gv-guide" d="M80 13V87M27 50H133"/><path class="gv-loop" pathLength="100" d="M53 30H107V70H53Z"/>${[
    [53, 30],
    [107, 30],
    [107, 70],
    [53, 70],
  ]
    .map(
      ([x, y], i) =>
        `<circle class="gv-node gv-link-node" style="--gv-delay:${i * 150}ms" cx="${x}" cy="${y}" r="7"/>`,
    )
    .join('')}`,
  prumo: `<path class="gv-guide" d="M25 83H135"/><path class="gv-support" d="M70 81L80 63L90 81Z"/><g class="gv-balance"><path class="gv-piece" d="M38 33H66V19H94V33H122V47H94V61H66V47H38Z"/><path class="gv-seams" d="M66 33H94M66 47H94M66 19V61M94 19V61"/><circle class="gv-pivot" cx="80" cy="40" r="4"/><path class="gv-plumb" d="M80 40V63"/></g><path class="gv-level" d="M29 25H40M120 25H131"/>`,
  pacto: `${[
    [31, 29, 'circle'],
    [91, 29, 'triangle'],
    [31, 70, 'square'],
    [91, 70, 'diamond'],
  ]
    .map(([x, y, s], i) => {
      const mark = (dx, side) => {
        let body =
          s === 'circle'
            ? `<circle cx="0" cy="0" r="7"/>`
            : s === 'triangle'
              ? '<path d="M0-8L8 7H-8Z"/>'
              : s === 'square'
                ? '<rect x="-7" y="-7" width="14" height="14" rx="1"/>'
                : '<path d="M0-9L8 0L0 9L-8 0Z"/>';
        return `<g transform="translate(${dx} ${y})"><g class="gv-pair-${side}" style="--gv-delay:${i * 80}ms">${body}</g></g>`;
      };
      return `<rect class="gv-pair-frame" style="--gv-delay:${i * 80}ms" x="${x - 15}" y="${y - 15}" width="51" height="30" rx="10"/>${mark(x, 'a')}${mark(x + 21, 'b')}`;
    })
    .join('')}`,
  sintonia: `<path class="gv-command" d="M15 42H29M24 37L29 42L24 47"/>${[0, 1, 2]
    .map((i) => {
      let y = 10 + i * 29;
      return `<rect class="gv-paper" x="39" y="${y}" width="97" height="25" rx="8"/><path class="gv-guide" d="M65 ${y + 4}V${y + 21}M91 ${y + 4}V${y + 21}"/><circle class="gv-destination" cx="119" cy="${y + 12.5}" r="11"/><g class="gv-together">${animal(
        106,
        y,
        [
          [110, 55, 200, 320],
          [390, 80, 290, 280],
          [735, 125, 255, 235],
        ][i],
      )}</g>`;
    })
    .join('')}`,
  repasse: `<rect class="gv-empty" x="24" y="32" width="35" height="35" rx="9"/><path class="gv-transfer-line" pathLength="100" d="M60 49H105M99 43L105 49L99 55"/><rect class="gv-receiver" x="109" y="27" width="36" height="46" rx="9"/><g class="gv-repass-tile"><rect class="gv-piece" x="24" y="32" width="35" height="35" rx="9"/><text x="41.5" y="55">2</text></g><text class="gv-before" x="127" y="54">3/5</text><text class="gv-after" x="127" y="54">5/5</text><path class="gv-exact" d="M117 82L123 88L136 75"/>`,
  orbita: `<circle class="gv-orbit-track" cx="56" cy="50" r="27"/><circle class="gv-orbit-track" cx="104" cy="50" r="27"/><path class="gv-target-mark" d="M56 14L65 23L56 32L47 23Z"/><circle class="gv-target-mark" cx="104" cy="77" r="9"/><g class="gv-orbit-a"><path class="gv-orbit-piece" d="M56 17L62 23L56 29L50 23Z"/></g><g class="gv-orbit-b"><circle class="gv-orbit-piece" cx="104" cy="77" r="6"/></g><circle class="gv-meeting" cx="80" cy="50" r="5"/>`,
  desvio: `<rect class="gv-paper" x="38" y="10" width="84" height="80" rx="10"/><path class="gv-guide" d="M66 10V90M94 10V90M38 37H122M38 63H122"/><path class="gv-row" d="M43 50H116"/><path class="gv-column" d="M108 16V84"/><g class="gv-used-a"><rect class="gv-piece" x="43" y="42" width="18" height="17" rx="5"/><path d="M47 50H57M54 47L57 50L54 53"/></g><g class="gv-used-b"><rect class="gv-piece" x="99" y="42" width="18" height="17" rx="5"/><path d="M108 45V55M105 52L108 55L111 52"/></g><g class="gv-last-choice"><circle class="gv-node" cx="108" cy="77" r="10"/><path class="gv-white" d="M103 77L107 81L114 73"/></g>`,
};
export const GAME_VICTORY_GAMES = Object.freeze(Object.keys(shapes));
export function gameVictoryMarkup(game) {
  if (!Object.hasOwn(shapes, game)) return '';
  return `<svg class="game-victory game-victory-${game}" viewBox="0 0 160 100" aria-hidden="true" focusable="false">${shapes[game]}</svg>`;
}

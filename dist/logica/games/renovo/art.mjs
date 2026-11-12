// Exact approved C1 / P1 / B3 paths; logical piece roles remain S, B and F.
export const COLORS = { ink: '#30412f', green: '#39654c', gold: '#cca034', blue: '#244b63', paper: '#fffaf0', cell: '#f4f5ec', edge: '#c6d1c5' };
const line = (d, width) => `<path d="${d}" fill="none" stroke="${COLORS.paper}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
export function pieceSymbol(kind, x, y, r = 19) {
  const C = COLORS;
  if (kind === 'F') return `<path d="M${x-r*1.2} ${y}Q${x} ${y-r*1.2} ${x+r*1.2} ${y}Q${x} ${y+r*1.2} ${x-r*1.2} ${y}Z" fill="${C.blue}" stroke="${C.blue}" stroke-width="1.8"/>` + line(`M${x-r*.55} ${y}H${x+r*.55}`, 1.7) + line(`M${x-r*.40} ${y}l${r*.28} ${-r*.31}M${x-r*.40} ${y}l${r*.28} ${r*.31}M${x+r*.02} ${y}l${r*.26} ${-r*.24}M${x+r*.02} ${y}l${r*.26} ${r*.24}`, 1.3);
  const shape = d => `<path d="${d}" fill="${kind === 'S' ? C.green : C.gold}" stroke="${C.ink}" stroke-width="1.7" stroke-linejoin="round"/>`;
  const body = kind === 'S'
    ? shape('M-14-10C-24 0-15 18-2 17C10 16 19 7 16-2C14-10 7-7 2-12C-2-17-9-16-14-10Z') + `<ellipse cx="0" cy="1" rx="2.5" ry="5" transform="rotate(-30)" fill="${C.paper}"/>`
    : shape('M-16-8C-11-18 4-21 13-11C23-1 17 13 6 17C-7 22-20 10-18-2Z') + line('M-11-1C-7-10 7-12 10-3C12 5 1 12-5 6C-11 0-3-6 3-3C7-1 4 4 0 3', 1.6);
  return `<g transform="translate(${x} ${y}) scale(${r/19})">${body}</g>`;
}

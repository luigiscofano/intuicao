// Desenho da cena de Reflexos a partir dos resultados do motor.
import { visibleLightSegments, lightScene } from './light-world.mjs';
const palette = { gold: '#d99a32', blue: '#478bd2', pink: '#ce6b9f' };
const names = { gold: 'dourado', blue: 'azul', pink: 'rosa' };
const marks = { gold: '●', blue: '◆', pink: '▲' };
export const beamColor = (c) => palette[c] ?? c;
export const beamName = (c) => names[c] ?? c;
// O salto entre portais não é desenhado como um segmento: não existe luz no intervalo.
export function worldRaysSVG(world, distance = Infinity, showCollision = false) {
  let svg = '';
  for (const ray of world.rays) {
    const color = beamColor(ray.color),
      rayDistance = ray.visibleDistance ?? distance;
    for (const h of ray.reflections ?? [])
      if (h.distance <= rayDistance + 1e-6) {
        const n = h.normal,
          p = h.point;
        svg += `<line data-normal="true" x1="${p.x - n.x * 32}" y1="${p.y - n.y * 32}" x2="${p.x + n.x * 32}" y2="${p.y + n.y * 32}" stroke="#526274" stroke-width="1" stroke-opacity=".24" stroke-dasharray="3 5" pointer-events="none"/>`;
      }
    for (const s of visibleLightSegments(ray, rayDistance)) {
      const a = s.a,
        b = s.b,
        len = Math.hypot(b.x - a.x, b.y - a.y);
      svg += `<line data-ray="${ray.color}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="${color}" stroke-width="2.4" stroke-linecap="round" pointer-events="none"/>`;
      if (len < 24) continue;
      const ux = (b.x - a.x) / len,
        uy = (b.y - a.y) / len;
      for (let d = 24; d < len - 3; d += 76) {
        const x = a.x + ux * d,
          y = a.y + uy * d;
        svg += `<path data-ray-arrow="true" d="M${x - ux * 7 - uy * 3.5},${y - uy * 7 + ux * 3.5} L${x},${y} L${x - ux * 7 + uy * 3.5},${y - uy * 7 - ux * 3.5}" fill="none" stroke="${color}" stroke-width="1.7" stroke-linecap="round" pointer-events="none"/>`;
      }
    }
  }
  if (showCollision)
    for (const c of world.collisions ?? []) {
      if (distance + 1e-6 < (c.triggerDistance ?? Math.max(...c.distances))) continue;
      const p = c.point,
        age = Math.max(
          0,
          ((Number.isFinite(distance) ? distance : world.totalDistance) -
            (c.triggerDistance ?? 0)) /
            500,
        );
      svg += `<g transform="translate(${p.x} ${p.y})" class="light-collision" data-collision-distance="${c.triggerDistance}" aria-label="Colisão entre ${c.colors.map(beamName).join(' e ')}"><circle class="collision-ring" r="17" style="animation-delay:-${Math.min(0.45, age)}s"/><path d="M-6-6 L6 6 M6-6 L-6 6" stroke="#ac4054" stroke-width="2.4"/><circle r="4" fill="#fffefa"/></g>`;
    }
  return svg;
}
export function portalSVG(portals, clockSeconds = 0) {
  return portals
    .map((p, i) => {
      const colors = p.colors,
        universal = colors == null;
      const r = p.radius ?? 15;
      const tint = universal ? '#ffffff' : beamColor(colors[0] ?? '#526274');
      const label = universal ? 'Todas as cores' : colors.map(beamName).join(' + ');
      const pair = String(p.label ?? p.pairId);
      return `<g class="portal" transform="translate(${p.x} ${p.y})" aria-label="Portal ${pair}: ${label}"><title>Portal ${pair} · ${label} · mantém a direção</title><circle class="portal-halo" r="${r + 5}" fill="${universal ? '#e3e8e7' : tint}" fill-opacity="${universal ? '.65' : '.12'}"/><circle class="portal-rim" r="${r + 2}" fill="#fbfcf9" stroke="${universal ? '#9daeb2' : tint}" stroke-opacity=".6" stroke-width="1"/><circle class="portal-window" r="${r}" fill="${universal ? '#fff' : tint}" fill-opacity="${universal ? '.9' : '.055'}" stroke="${tint}" stroke-width="2"/>${!universal && colors.length > 1 ? colors.map((c, j) => `<circle r="${r}" fill="none" stroke="${beamColor(c)}" stroke-width="2" stroke-dasharray="${(2 * Math.PI * r) / colors.length - 3} ${2 * Math.PI * r * (1 - 1 / colors.length) + 3}" transform="rotate(${(j * 360) / colors.length - 90})"/>`).join('') : ''}<g class="portal-spin" style="animation-delay:-${clockSeconds % 12}s">${[0, 120, 240].map((a) => `<path transform="rotate(${a})" d="M0 ${-r + 3} Q${r - 2} ${-r + 2} ${r - 4} 3" fill="none" stroke="${universal ? '#a1b1b7' : tint}" stroke-opacity=".65" stroke-width="1.3" stroke-linecap="round"/>`).join('')}</g><text y="4" text-anchor="middle" font-size="9" font-weight="700" fill="#40545a">${pair}</text><text y="${r + 19}" text-anchor="middle" class="portal-label">${universal ? 'TODAS' : colors.map((c) => `<tspan fill="${beamColor(c)}">${marks[c] ?? c}</tspan>`).join(' ')}</text></g>`;
    })
    .join('');
}
export function lightEndpointsSVG(
  state,
  free = false,
  { firedSourceIndices = [], busy = false, complete = false } = {},
) {
  const { sources, targets } = lightScene(state);
  let svg = '';
  for (const [index, s] of sources.entries()) {
    const color = beamColor(s.color),
      fired = firedSourceIndices.includes(index),
      disabled = busy || (fired && !complete),
      label = `Disparador ${beamName(s.color)}. Disparar raio${fired && !complete ? '. Já disparado nesta tentativa' : complete ? '. Iniciar nova tentativa' : ''}`;
    svg += `<g data-light-source="${index}" data-fired="${fired}" class="light-source" transform="translate(${s.x} ${s.y})" tabindex="0" role="button" aria-disabled="${disabled}" aria-label="${label}"><title>${label} · clique, Enter ou Espaço</title><circle class="light-source-hit" r="24" fill="transparent"/><circle class="light-source-ring" r="20" fill="none" stroke="${color}" stroke-width="2" opacity="${fired ? '.8' : '.2'}"/><g transform="rotate(${s.angle})" pointer-events="none"><path data-source-nozzle="true" d="M7-9 L22 0 L7 9 Z" fill="#242c36"/><circle data-source-body="true" r="14" fill="#242c36"/><circle data-source-core="true" r="7" fill="${color}"/></g>${fired ? `<text x="-18" y="-16" class="light-source-check" fill="${color}" aria-hidden="true" pointer-events="none">✓</text>` : ''}</g>`;
  }
  for (const t of targets) {
    const color = beamColor(t.color);
    svg += `<g ${free ? 'data-item="target" class="handle" tabindex="0" role="button"' : ''} aria-label="Alvo ${beamName(t.color)}"><circle cx="${t.x}" cy="${t.y}" r="${t.radius ?? 22}" fill="${color}" fill-opacity=".10" stroke="${color}" stroke-width="2"/><circle cx="${t.x}" cy="${t.y}" r="14" fill="none" stroke="${color}" stroke-width="1.5"/><text x="${t.x}" y="${t.y + 4}" text-anchor="middle" font-size="11" fill="${color}">${marks[t.color] ?? '●'}</text></g>`;
  }
  return svg;
}

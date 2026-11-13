import { escapeHTML as esc } from './shared/markup.mjs';

/** Dimensão é configuração, não dificuldade nem uma campanha de níveis. */
export function mapGroupKey(map) {
  return map.group ?? `${map.rows}x${map.columns ?? map.cols}`;
}

export function mapGroupLabel(map) {
  return map.groupLabel ?? `${map.rows} × ${map.columns ?? map.cols}`;
}

/** Mantém a família ao trocar tamanho quando existe uma variante equivalente. */
export function selectMapInGroup(maps, selectedId, group) {
  const current = maps.find(map => map.id === selectedId) ?? maps[0];
  const candidates = maps.filter(map => mapGroupKey(map) === group);
  return candidates.find(map => map.family && map.family === current.family) ?? candidates[0];
}

/** Um único seletor para os sete duelos; a miniatura respeita a mecânica de cada um. */
export function renderMapSelection({ id, maps, selectedId, preview, note = '', groupLabel = 'Tamanho do tabuleiro' }) {
  const selected = maps.find(map => map.id === selectedId) ?? maps[0];
  if (!selected) return '';
  const groups = [...new Map(maps.map(map => [mapGroupKey(map), map])).values()];
  const visible = maps.filter(map => mapGroupKey(map) === mapGroupKey(selected));
  return `<section class="vs-map-setup" data-map-game="${esc(id)}" aria-labelledby="${esc(id)}-maps-title">
    <div class="vs-map-heading"><h3 id="${esc(id)}-maps-title">Escolha o mapa</h3><span>${maps.length} mapas · ${groups.length} ${selected.rows ? 'formatos' : 'coleções'}</span></div>
    <p id="${esc(id)}-map-group-label" class="vs-map-label">${esc(groupLabel)}</p>
    <div class="vs-map-sizes" role="group" aria-labelledby="${esc(id)}-map-group-label">${groups.map(map => `<button type="button" data-vs-group="${esc(mapGroupKey(map))}" aria-pressed="${mapGroupKey(map) === mapGroupKey(selected)}">${esc(mapGroupLabel(map))}</button>`).join('')}</div>
    <div class="vs-map-cards" role="group" aria-labelledby="${esc(id)}-maps-title">${visible.map(map => `<button type="button" data-vs-map="${esc(map.id)}" aria-pressed="${map.id === selected.id}" aria-describedby="${esc(id)}-map-description"><span class="vs-map-art" aria-hidden="true">${preview(map)}</span><strong>${esc(map.name ?? map.id)}</strong><small>${map.id === selected.id ? '✓ Selecionado' : 'Escolher'}</small></button>`).join('')}</div>
    <div class="vs-map-description" id="${esc(id)}-map-description" aria-live="polite"><p><strong>${esc(selected.name ?? selected.id)}</strong> · ${esc(mapGroupLabel(selected))}</p><p>${esc(selected.description ?? '')}</p>${note ? `<small>${esc(note)}</small>` : ''}</div>
    <p class="vs-map-hint">Escolher um mapa não inicia nem substitui a partida salva.</p>
  </section>`;
}

/** Liga somente a preparação. O controlador decide quando iniciar/substituir um save. */
export function bindMapSelection(root, { maps, selectedId, onSelect }) {
  const setup = root.querySelector('.vs-map-setup');
  if (!setup) return;
  setup.onclick = event => {
    const button = event.target.closest('button[data-vs-map], button[data-vs-group]');
    if (!button || !setup.contains(button)) return;
    const map = button.dataset.vsMap
      ? maps.find(item => item.id === button.dataset.vsMap)
      : selectMapInGroup(maps, selectedId, button.dataset.vsGroup);
    if (!map) return;
    const selector = button.dataset.vsGroup ? `[data-vs-group="${mapGroupKey(map)}"]` : `[data-vs-map="${map.id}"]`;
    onSelect(map);
    // A apresentação comum reorganiza seções no próximo microtask; restaure o foco depois.
    const focus = () => root.querySelector(selector)?.focus({ preventScroll: true });
    (root.ownerDocument.defaultView?.requestAnimationFrame ?? (fn => fn()))(focus);
  };
}

/** Pedras, recortes e equipes usam sinais além da cor. */
export function terrainMapPreview(map) {
  const cols = map.columns ?? map.cols;
  const cells = Array.from({ length: map.rows * cols }, (_, cell) => {
    const kind = map.outside?.includes(cell) ? 'gap' : map.walls?.includes(cell) ? 'wall' : map.starts?.[0]?.includes(cell) ? 'team-0' : map.starts?.[1]?.includes(cell) ? 'team-1' : 'ground';
    return `<span class="vs-mini-${kind}">${kind === 'wall' ? '▪' : kind === 'team-0' ? '●' : kind === 'team-1' ? '◆' : ''}</span>`;
  }).join('');
  return `<span class="vs-map-grid" style="--map-cols:${cols};--map-rows:${map.rows}">${cells}</span>`;
}

import { renderAchievementIcon } from "./icons.mjs";

const views = new WeakMap();
const DEFAULT_FILTERS = Object.freeze({
  kind: "missions",
  gameId: "all",
  status: "all",
});

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );
}

function missionGames(data) {
  if (Array.isArray(data.missionGames)) return data.missionGames;

  return Array.from(
    new Map(
      (data.missions ?? []).map((mission) => [
        mission.gameId,
        { id: mission.gameId, name: mission.gameName },
      ]),
    ).values(),
  );
}

export function filterAchievements(data, filters = DEFAULT_FILTERS) {
  const entries =
    filters.kind === "general" ? data.achievements : data.missions;

  return (entries ?? []).filter((entry) => {
    const matchesGame =
      filters.kind === "general" ||
      filters.gameId === "all" ||
      !filters.gameId ||
      entry.gameId === filters.gameId ||
      entry.gameIds?.includes(filters.gameId);
    const matchesStatus =
      !filters.status ||
      filters.status === "all" ||
      (filters.status === "unlocked" && entry.unlocked) ||
      (filters.status === "locked" && !entry.unlocked);

    return matchesGame && matchesStatus;
  });
}

function renderSummary(data) {
  const missions = data.missions ?? [];
  const generalUnlocked = data.achievements.filter(
    (item) => item.unlocked,
  ).length;
  const missionsUnlocked = missions.filter((item) => item.unlocked).length;

  return `
    <div class="achievement-summary" aria-label="Resumo do progresso">
      <div>
        <strong>${missionsUnlocked}<span> / ${missions.length}</span></strong>
        <p>Missões descobertas</p>
      </div>
      <div>
        <strong>${generalUnlocked}<span> / ${data.achievements.length}</span></strong>
        <p>Conquistas gerais</p>
      </div>
      <div>
        <strong>${data.total}<span> / ${data.available}</span></strong>
        <p>Níveis de campanha concluídos</p>
      </div>
    </div>
  `;
}

function renderFilters(data, filters) {
  const isMission = filters.kind === "missions";
  const games = missionGames(data);
  const gameOptions = games
    .map(
      (game) => `
        <option value="${escapeHtml(game.id)}" ${filters.gameId === game.id ? "selected" : ""}>
          ${escapeHtml(game.name)}
        </option>
      `,
    )
    .join("");
  const statusOptions = [
    ["all", "Todas"],
    ["unlocked", "Conquistadas"],
    ["locked", "A descobrir"],
  ]
    .map(
      ([value, label]) =>
        `<option value="${value}" ${filters.status === value ? "selected" : ""}>${label}</option>`,
    )
    .join("");

  return `
    <div class="achievement-toolbar">
      <div class="achievement-tabs" role="group" aria-label="Tipo de conquista">
        <button type="button" data-achievement-kind="missions" aria-pressed="${isMission}">
          Missões dos jogos <span>${data.missions?.length ?? 0}</span>
        </button>
        <button type="button" data-achievement-kind="general" aria-pressed="${!isMission}">
          Gerais <span>${data.achievements.length}</span>
        </button>
      </div>
      <div class="achievement-selects">
        ${
          isMission
            ? `<label for="achievement-game-filter">Jogo
                <select id="achievement-game-filter" data-achievement-filter="gameId">
                  <option value="all" ${filters.gameId === "all" ? "selected" : ""}>Todos os jogos</option>
                  ${gameOptions}
                </select>
              </label>`
            : ""
        }
        <label for="achievement-status-filter">Mostrar
          <select id="achievement-status-filter" data-achievement-filter="status">
            ${statusOptions}
          </select>
        </label>
      </div>
    </div>
  `;
}

function renderCard(achievement, kind) {
  const isMission = kind === "missions";
  const id = escapeHtml(achievement.id);
  const progressText = isMission
    ? achievement.unlocked
      ? "Condição cumprida"
      : achievement.target > 1 ? `${achievement.current} de ${achievement.target} fases` : "Condição ainda não atingida"
    : `${achievement.current} de ${achievement.target}`;
  const gameLabel = isMission
    ? `<p class="achievement-game">${escapeHtml(achievement.gameName)}</p>`
    : "";
  const gameLink = isMission
    ? (achievement.games ?? [{id: achievement.gameId, name: achievement.gameName}]).map(game => `<a class="achievement-play" href="?game=${encodeURIComponent(game.id)}" aria-label="Jogar ${escapeHtml(game.name)} para explorar ${escapeHtml(achievement.name)}">Jogar ${escapeHtml(game.name)} <svg class="achievement-play-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 19 19 5M7 5h12v12"/></svg></a>`).join('')
    : "";

  return `
    <li class="achievement-card ${achievement.unlocked ? "is-unlocked" : ""}" data-achievement-id="${id}">
      <div class="achievement-card-top">
        <span class="achievement-symbol">${renderAchievementIcon(achievement.icon ?? achievement.id)}</span>
        <span class="achievement-state">${achievement.unlocked ? "Conquistada" : "A descobrir"}</span>
      </div>
      ${gameLabel}
      <h3>${escapeHtml(achievement.name)}</h3>
      <p class="achievement-description">${escapeHtml(achievement.description)}</p>
      <div class="achievement-card-bottom">
        <label for="achievement-${id}">${progressText}</label>
        <progress id="achievement-${id}" value="${achievement.current}" max="${achievement.target}">
          ${achievement.current} de ${achievement.target}
        </progress>
        ${gameLink}
      </div>
    </li>
  `;
}

function renderCollection(data, filters) {
  const filtered = filterAchievements(data, filters);
  const isMission = filters.kind === "missions";
  const allEntries = isMission ? (data.missions ?? []) : data.achievements;
  const selectedGame = missionGames(data).find(
    (game) => game.id === filters.gameId,
  );
  const title = isMission
    ? (selectedGame?.name ?? "Pequenas missões, grandes descobertas")
    : "Seu caminho pelo laboratório";
  const description = isMission
    ? "Cada símbolo guarda uma ideia do jogo. Explore a condição, prepare a jogada e descubra uma nova forma de pensar."
    : "As conquistas gerais continuam acompanhando suas descobertas em todas as campanhas.";
  const cards = filtered
    .map((entry) => renderCard(entry, filters.kind))
    .join("");

  return `
    <section class="achievement-collection" aria-labelledby="achievement-collection-title">
      <div class="achievement-collection-heading">
        <div>
          <h3 id="achievement-collection-title">${escapeHtml(title)}</h3>
          <p>${description}</p>
        </div>
        <p class="achievement-result-count" role="status" aria-live="polite" aria-atomic="true">
          ${filtered.length} de ${allEntries.length} ${isMission ? "missões" : "conquistas"}
        </p>
      </div>
      ${
        filtered.length
          ? `<ul class="achievement-grid" aria-label="${isMission ? "Missões dos jogos" : "Conquistas gerais"}">${cards}</ul>`
          : `<div class="achievement-empty"><p>Nenhuma conquista neste filtro.</p><p>Escolha outro jogo ou mostre todas para encontrar a próxima descoberta.</p></div>`
      }
    </section>
  `;
}

function renderCampaigns(data) {
  const links = data.games
    .map(
      (game) => `
        <li>
          <a href="?game=${encodeURIComponent(game.id)}">
            ${escapeHtml(game.name)}
            <span>${game.completed} / ${game.total} concluídos <span aria-hidden="true">→</span></span>
          </a>
        </li>
      `,
    )
    .join("");

  return `
    <details class="achievement-campaigns">
      <summary>Seu caminho em cada campanha</summary>
      <ul>${links}</ul>
    </details>
  `;
}

function renderCriteria(data) {
  return `
    <details class="achievement-criteria">
      <summary>Como as conquistas são contadas</summary>
      <p>As conquistas gerais contam uma vez cada nível das ${data.games.length} campanhas atuais cuja conclusão está salva neste navegador. Repetir o nível não aumenta o total. Conclusões assistidas também contam.</p>
      <p>Nas missões de campanha, a conclusão precisa corresponder a uma fase oficial com a característica descrita. Registros de fases atuais já concluídas podem comprovar essas missões.</p>
      <p>As missões de jogadas reconhecem ações confirmadas de uma pessoa, inclusive no treino. A ajuda pode orientar sua escolha: é a jogada confirmada que conta. Prévias e ações do computador não desbloqueiam essas missões.</p>
      <p>As missões de precisão e eficiência registram novas rodadas em fases oficiais. Primeira confirmação não significa primeira visita: é permitido ajustar antes de confirmar. Aplicar uma solução automaticamente não comprova uma tentativa humana. O progresso anterior continua preservado.</p>
      <p>Cada missão é conquistada uma única vez. Desfazer uma jogada não remove uma descoberta já registrada.</p>
      <p>Desafios avançados são os níveis das etapas Avançado, Mestre e Modo Sábio, conforme a classificação editorial de cada jogo. Modo Sem Parar, fases importadas e campanhas antigas arquivadas não aumentam a contagem geral.</p>
      <p>Seu progresso continua local: não é sincronizado entre dispositivos. Limpar os dados do navegador pode removê-lo. Use o backup do progresso para guardar suas conquistas. Abrir esta tela não altera nem apaga seus saves.</p>
    </details>
  `;
}

function renderMarkup(container, view) {
  const { data, filters } = view;
  const warnings = (data.warnings ?? [])
    .map(
      (warning) =>
        `<p class="achievement-warning" role="status">${escapeHtml(warning)}</p>`,
    )
    .join("");

  container.innerHTML = `
    <div class="achievement-heading">
      <p class="eyebrow">CADA DESCOBERTA TEM SUA MARCA</p>
      <h2 id="achievements-title" tabindex="-1">Suas conquistas</h2>
      <p>Novos jeitos de jogar. Símbolos para guardar cada descoberta.</p>
    </div>
    ${renderSummary(data)}
    ${warnings}
    ${renderFilters(data, filters)}
    ${renderCollection(data, filters)}
    ${renderCampaigns(data)}
    ${renderCriteria(data)}
  `;
}

function updateFilter(container, view, field, value, focusSelector) {
  view.filters[field] = value;
  renderMarkup(container, view);
  container.querySelector?.(focusSelector)?.focus({ preventScroll: true });
}

function bindFilters(container, view) {
  if (typeof container.addEventListener !== "function") return;

  // Um único par de ouvintes acompanha as renderizações, sem acumular callbacks.
  container.addEventListener("click", (event) => {
    const button = event.target.closest?.("[data-achievement-kind]");
    if (!button || !container.contains(button)) return;

    const kind = button.dataset.achievementKind;
    if (!["missions", "general"].includes(kind)) return;

    updateFilter(
      container,
      view,
      "kind",
      kind,
      `[data-achievement-kind="${kind}"]`,
    );
  });
  container.addEventListener("change", (event) => {
    const field = event.target.dataset?.achievementFilter;
    if (!["gameId", "status"].includes(field)) return;

    const value = event.target.value;
    const valid =
      field === "gameId"
        ? value === "all" ||
          missionGames(view.data).some((game) => game.id === value)
        : ["all", "unlocked", "locked"].includes(value);
    if (!valid) return;

    updateFilter(
      container,
      view,
      field,
      value,
      `[data-achievement-filter="${field}"]`,
    );
  });
}

export function renderAchievementView(container, data) {
  let view = views.get(container);

  if (!view) {
    view = { data, filters: { ...DEFAULT_FILTERS } };
    views.set(container, view);
    bindFilters(container, view);
  }

  // Uma atualização de progresso preserva a escolha de jogo e o filtro da pessoa.
  view.data = data;
  if (
    view.filters.gameId !== "all" &&
    !missionGames(data).some((game) => game.id === view.filters.gameId)
  ) {
    view.filters.gameId = "all";
  }

  renderMarkup(container, view);
}

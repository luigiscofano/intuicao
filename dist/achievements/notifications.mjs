import { MISSION_BY_ID } from "./catalog.mjs";
import { MISSION_UNLOCK_EVENT } from "./mission-store.mjs";
import { renderAchievementIcon } from "./icons.mjs";

let initialized = false;

export function initMissionNotifications() {
  if (initialized || typeof document === "undefined") return;
  initialized = true;
  const notice = document.createElement("aside");
  notice.className = "mission-notice";
  notice.hidden = true;
  notice.setAttribute("aria-label", "Nova conquista");
  notice.innerHTML = `
    <span class="mission-notice-icon" aria-hidden="true"></span>
    <div class="mission-notice-content">
      <p class="mission-notice-label">MISSÃO CONQUISTADA</p>
      <p class="mission-notice-message" role="status" aria-live="polite"></p>
      <a href="?screen=achievements">Ver minhas conquistas</a>
    </div>
    <button type="button" aria-label="Fechar aviso de conquista">×</button>
  `;
  document.body.append(notice);
  let dismissTimer;
  const dismiss = () => {
    clearTimeout(dismissTimer);
    notice.hidden = true;
  };
  const scheduleDismiss = () => {
    clearTimeout(dismissTimer);
    if (!notice.contains(document.activeElement)) {
      dismissTimer = setTimeout(dismiss, 10000);
    }
  };
  notice.querySelector("button").addEventListener("click", dismiss);
  window.addEventListener(MISSION_UNLOCK_EVENT, (event) => {
    const missions = (event.detail?.ids ?? [])
      .map((id) => MISSION_BY_ID.get(id))
      .filter(Boolean);
    if (!missions.length) return;
    clearTimeout(dismissTimer);
    notice.querySelector(".mission-notice-icon").innerHTML =
      `<span class="mission-notice-emblem">
        ${renderAchievementIcon(missions[0].icon)}
        <svg class="mission-notice-light" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
          <circle cx="32" cy="25.5" r="23" pathLength="1" />
        </svg>
      </span>`;
    notice.querySelector(".mission-notice-message").textContent = missions
      .map((mission) => `${mission.name} · ${mission.gameName}`)
      .join(" e ");
    notice.hidden = false;
    // O aviso não desloca o foco nem interrompe a escolha da próxima jogada.
    scheduleDismiss();
  });
  notice.addEventListener("focusin", () => clearTimeout(dismissTimer));
  notice.addEventListener("focusout", (event) => {
    if (notice.contains(event.relatedTarget)) return;
    clearTimeout(dismissTimer);
    dismissTimer = setTimeout(dismiss, 10000);
  });
}

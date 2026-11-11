import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(
  new URL("../dist/achievements/notifications.mjs", import.meta.url),
  "utf8",
);

/** Relógio controlável: os testes não aguardam dez segundos reais. */
function createClock() {
  let now = 0;
  let nextId = 1;
  let fired = 0;
  const pending = new Map();
  return {
    setTimeout(callback, delay) {
      const id = nextId++;
      pending.set(id, { callback, due: now + delay });
      return id;
    },
    clearTimeout(id) {
      pending.delete(id);
    },
    advance(milliseconds) {
      const destination = now + milliseconds;
      while (true) {
        const next = [...pending.entries()]
          .filter(([, timer]) => timer.due <= destination)
          .sort(([, first], [, second]) => first.due - second.due)[0];
        if (!next) break;
        const [id, timer] = next;
        now = timer.due;
        pending.delete(id);
        fired++;
        timer.callback();
      }
      now = destination;
    },
    get pendingCount() {
      return pending.size;
    },
    get firedCount() {
      return fired;
    },
  };
}

function createElement() {
  const listeners = new Map();
  return {
    hidden: false,
    attributes: {},
    innerHTML: "",
    textContent: "",
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    addEventListener(type, callback) {
      const callbacks = listeners.get(type) ?? [];
      listeners.set(type, [...callbacks, callback]);
    },
    dispatch(type, event = {}) {
      for (const callback of listeners.get(type) ?? []) callback(event);
    },
  };
}

function harness() {
  const clock = createClock();
  const notice = createElement();
  const link = createElement();
  const close = createElement();
  const icon = createElement();
  const message = createElement();
  const outside = createElement();
  const children = new Set([link, close, icon, message]);
  notice.contains = (element) => element === notice || children.has(element);
  notice.querySelector = (selector) =>
    ({
      button: close,
      a: link,
      ".mission-notice-icon": icon,
      ".mission-notice-message": message,
    })[selector];
  const document = {
    activeElement: outside,
    body: { append() {} },
    createElement: () => notice,
  };
  const window = createElement();
  const context = vm.createContext({
    document,
    window,
    setTimeout: clock.setTimeout,
    clearTimeout: clock.clearTimeout,
    MISSION_UNLOCK_EVENT: "intuicao:missions-unlocked",
    MISSION_BY_ID: new Map([
      ["first", { name: "Corrente acesa", gameName: "ENLACE", icon: "first" }],
      [
        "second",
        { name: "Volta ao centro", gameName: "LASTRO", icon: "second" },
      ],
    ]),
    renderAchievementIcon: (id) => `<svg data-icon="${id}"></svg>`,
  });
  vm.runInContext(
    source.replace(/^import .*\n/gm, "").replaceAll("export ", ""),
    context,
  );
  context.initMissionNotifications();
  return {
    clock,
    notice,
    link,
    close,
    message,
    document,
    outside,
    unlock(id) {
      window.dispatch("intuicao:missions-unlocked", { detail: { ids: [id] } });
    },
    focus(element) {
      document.activeElement = element;
      notice.dispatch("focusin");
    },
    leaveFocus(element) {
      document.activeElement = element;
      notice.dispatch("focusout", { relatedTarget: element });
    },
  };
}

test("um novo aviso não esconde o link ou botão que ainda tem o foco", () => {
  for (const control of ["link", "close"]) {
    const ui = harness();
    ui.unlock("first");
    assert.equal(ui.notice.hidden, false);
    assert.equal(ui.clock.pendingCount, 1);
    ui.focus(ui[control]);
    assert.equal(ui.clock.pendingCount, 0);
    ui.unlock("second");
    assert.equal(ui.message.textContent, "Volta ao centro · LASTRO");
    assert.equal(ui.clock.pendingCount, 0);
    ui.clock.advance(20000);
    assert.equal(ui.notice.hidden, false);
    assert.equal(ui.document.activeElement, ui[control]);
    assert.equal(ui.clock.firedCount, 0);
  }
});

test("mover o foco dentro do aviso mantém a leitura; sair inicia dez segundos completos", () => {
  const ui = harness();
  ui.unlock("first");
  ui.focus(ui.link);
  // O focusout interno não pode criar um temporizador, mesmo antes do focusin seguinte.
  ui.leaveFocus(ui.close);
  assert.equal(ui.clock.pendingCount, 0);
  ui.clock.advance(10000);
  assert.equal(ui.notice.hidden, false);
  ui.leaveFocus(ui.outside);
  assert.equal(ui.clock.pendingCount, 1);
  ui.clock.advance(9999);
  assert.equal(ui.notice.hidden, false);
  ui.clock.advance(1);
  assert.equal(ui.notice.hidden, true);
  assert.equal(ui.clock.firedCount, 1);
});

test("fechar o aviso cancela o descarte pendente e permite uma notificação posterior", () => {
  const ui = harness();
  ui.unlock("first");
  ui.clock.advance(5000);
  ui.close.dispatch("click");
  assert.equal(ui.notice.hidden, true);
  assert.equal(ui.clock.pendingCount, 0);
  ui.clock.advance(10000);
  assert.equal(ui.clock.firedCount, 0);
  ui.unlock("second");
  assert.equal(ui.notice.hidden, false);
  assert.equal(ui.clock.pendingCount, 1);
  ui.clock.advance(9999);
  assert.equal(ui.notice.hidden, false);
  ui.clock.advance(1);
  assert.equal(ui.notice.hidden, true);
});

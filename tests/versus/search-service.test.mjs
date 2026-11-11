import test from "node:test";
import assert from "node:assert/strict";
import { createSearchService } from "../../dist/versus/search-service.mjs";
import * as engine from "../../dist/versus/games/estalo/engine.mjs";

const game = { id: "estalo", engine };

function controlledEnvironment(
  t,
  { workerAvailable = true, postMessageThrows = false } = {},
) {
  const instances = [];
  const timers = new Map();
  const scheduled = [];
  let nextTimer = 0;

  // Nenhum teste precisa esperar os três segundos do fallback real.
  t.mock.method(globalThis, "setTimeout", (callback, delay, ...args) => {
    const timer = { id: ++nextTimer, delay, run: () => callback(...args) };
    timers.set(timer.id, timer);
    scheduled.push(timer);
    return timer.id;
  });
  t.mock.method(globalThis, "clearTimeout", (id) => timers.delete(id));

  class FakeWorker {
    constructor(url, options) {
      this.url = String(url);
      this.options = options;
      this.messages = [];
      this.terminations = 0;
      instances.push(this);
    }

    postMessage(message) {
      if (postMessageThrows) throw new Error("Falha simulada de postMessage.");
      this.messages.push(structuredClone(message));
    }

    terminate() {
      this.terminations += 1;
    }

    // Uma entrega já enfileirada pode chegar depois de terminate().
    deliver(data) {
      this.onmessage?.({ data });
    }

    fail() {
      this.onerror?.(new Error("Falha simulada do Worker."));
    }
  }

  const previousWorker = Object.getOwnPropertyDescriptor(globalThis, "Worker");
  Object.defineProperty(globalThis, "Worker", {
    value: workerAvailable ? FakeWorker : undefined,
    writable: true,
    configurable: true,
  });
  t.after(() => {
    if (previousWorker) {
      Object.defineProperty(globalThis, "Worker", previousWorker);
    } else {
      delete globalThis.Worker;
    }
  });

  return {
    instances,
    timers,
    scheduled,
    runTimer(delay) {
      const timer = [...timers.values()].find((entry) => entry.delay === delay);
      assert.ok(timer, `Deveria haver um callback agendado para ${delay} ms.`);
      timers.delete(timer.id);
      timer.run();
    },
  };
}

function legalAnswer(state, index = 0) {
  return { move: engine.getLegalMoves(state)[index], nodes: 1, depth: 1 };
}

test("análise cancelada termina o Worker, limpa o timer e rejeita AbortError", async (t) => {
  const { instances, scheduled, timers } = controlledEnvironment(t);
  const service = createSearchService();
  const state = engine.createState();
  const pending = service.analyze(game, state, "strong");
  const rejected = assert.rejects(pending, { name: "AbortError" });
  const worker = instances[0];
  assert.equal(instances.length, 1);
  assert.match(worker.url, /search-worker\.mjs$/);
  assert.equal(worker.options.type, "module");
  assert.deepEqual(worker.messages[0].state, state);
  assert.equal(worker.messages[0].gameId, "estalo");
  assert.equal(worker.messages[0].difficulty, "strong");
  assert.equal(timers.size, 1);

  service.cancel();
  service.cancel();
  await rejected;
  assert.equal(worker.terminations, 1);
  assert.equal(timers.size, 0);

  worker.deliver({
    requestId: worker.messages[0].requestId,
    answer: legalAnswer(state),
  });
  scheduled[0].run();
  assert.equal(worker.terminations, 1);
});

test("respostas e falhas antigas não resolvem nem encerram uma análise nova", async (t) => {
  const { instances, scheduled, timers } = controlledEnvironment(t);
  const service = createSearchService();
  const initial = engine.createState();
  const first = service.analyze(game, initial, "beginner");
  const firstRejected = assert.rejects(first, { name: "AbortError" });
  const oldWorker = instances[0];
  const oldRequestId = oldWorker.messages[0].requestId;
  const oldFallback = scheduled[0];

  const current = engine.applyMove(initial, {
    type: "burst",
    cell: 0,
    turn: 0,
  });
  let resolved = false;
  const second = service
    .analyze(game, current, "intermediate")
    .then((answer) => {
      resolved = true;
      return answer;
    });
  const newWorker = instances[1];
  const newRequestId = newWorker.messages[0].requestId;
  assert.notEqual(newRequestId, oldRequestId);
  assert.equal(timers.size, 1);
  assert.equal(timers.has(oldFallback.id), false);
  await firstRejected;

  const stale = { requestId: oldRequestId, answer: legalAnswer(initial) };
  oldWorker.deliver(stale);
  oldWorker.fail();
  newWorker.deliver(stale);
  oldFallback.run();
  await Promise.resolve();
  assert.equal(resolved, false);
  assert.equal(oldWorker.terminations, 1);
  assert.equal(newWorker.terminations, 0);

  const answer = legalAnswer(current, 1);
  newWorker.deliver({ requestId: newRequestId, answer });
  assert.deepEqual(await second, answer);
  assert.equal(newWorker.terminations, 1);
  assert.equal(timers.size, 0);
});

test("uma resposta válida resolve a análise, encerra o Worker e desagenda o fallback", async (t) => {
  const { instances, timers } = controlledEnvironment(t);
  const service = createSearchService();
  const state = engine.createState();
  const pending = service.analyze(game, state, "intermediate");
  const worker = instances[0];
  const requestId = worker.messages[0].requestId;
  const answer = legalAnswer(state);
  assert.equal(timers.size, 1);

  worker.deliver({ requestId, answer });
  assert.deepEqual(await pending, answer);
  assert.equal(worker.terminations, 1);
  assert.equal(timers.size, 0);

  worker.deliver({ requestId, answer: legalAnswer(state, 1) });
  service.cancel();
  assert.equal(worker.terminations, 1);
});

test("sem Worker a análise usa fallback assíncrono e devolve uma jogada legal", async (t) => {
  const { instances, runTimer, timers } = controlledEnvironment(t, {
    workerAvailable: false,
  });
  const service = createSearchService();
  const state = engine.createState();
  const snapshot = structuredClone(state);
  let resolved = false;
  const pending = service.analyze(game, state, "strong").then((answer) => {
    resolved = true;
    return answer;
  });
  await Promise.resolve();
  assert.equal(resolved, false);
  assert.equal(instances.length, 0);

  runTimer(0);
  const answer = await pending;
  assert.ok(
    engine
      .getLegalMoves(state)
      .some((move) => JSON.stringify(move) === JSON.stringify(answer.move)),
  );
  assert.doesNotThrow(() => engine.applyMove(state, answer.move));
  assert.deepEqual(state, snapshot);
  assert.ok(answer.nodes <= 30);
  assert.equal(timers.size, 0);
  service.cancel();
});

test("cancelar antes do fallback sem Worker limpa o timer de 0 ms e rejeita AbortError", async (t) => {
  const { timers, scheduled } = controlledEnvironment(t, {
    workerAvailable: false,
  });
  const service = createSearchService();
  const pending = service.analyze(game, engine.createState(), "strong");
  const rejected = assert.rejects(pending, { name: "AbortError" });
  assert.equal(timers.size, 1);
  assert.equal(scheduled[0].delay, 0);

  service.cancel();
  await rejected;
  assert.equal(timers.size, 0);
  scheduled[0].run();
  assert.equal(timers.size, 0);
});

test("falha síncrona de postMessage usa fallback sem deixar o timer anterior pendente", async (t) => {
  const { instances, timers, runTimer } = controlledEnvironment(t, {
    postMessageThrows: true,
  });
  const service = createSearchService();
  const state = engine.createState();
  const pending = service.analyze(game, state, "strong");
  assert.equal(timers.size, 1);
  assert.equal([...timers.values()][0].delay, 0);

  runTimer(0);
  const answer = await pending;
  assert.doesNotThrow(() => engine.applyMove(state, answer.move));
  assert.equal(instances[0].terminations, 1);
  assert.equal(timers.size, 0);
});

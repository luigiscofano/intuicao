import { chooseMove } from "./search.mjs";

export function createSearchService() {
  let worker = null;
  let request = 0;
  let rejectPending = null;
  let fallbackTimer = null;

  function cancel() {
    request += 1;
    clearTimeout(fallbackTimer);
    fallbackTimer = null;
    worker?.terminate();
    worker = null;
    if (rejectPending) {
      const error = new Error("Análise cancelada.");
      error.name = "AbortError";
      rejectPending(error);
      rejectPending = null;
    }
  }

  function analyze(game, state, difficulty) {
    cancel();
    const requestId = request;
    return new Promise((resolve, reject) => {
      rejectPending = reject;
      let finished = false;

      function finish(answer) {
        if (finished || requestId !== request) return;
        finished = true;
        clearTimeout(fallbackTimer);
        fallbackTimer = null;
        worker?.terminate();
        worker = null;
        rejectPending = null;
        resolve(answer);
      }

      function fallback() {
        if (finished || requestId !== request) return;
        worker?.terminate();
        worker = null;
        try {
          finish(
            chooseMove(game.engine, state, "beginner", {
              nodes: 30,
              milliseconds: 25,
            }),
          );
        } catch (error) {
          finished = true;
          clearTimeout(fallbackTimer);
          fallbackTimer = null;
          rejectPending = null;
          reject(error);
        }
      }

      try {
        worker = new Worker(new URL("./search-worker.mjs", import.meta.url), {
          type: "module",
        });
        worker.onmessage = ({ data }) => {
          if (data.requestId !== requestId) return;
          if (data.error) fallback();
          else finish(data.answer);
        };
        worker.onerror = fallback;
        fallbackTimer = setTimeout(fallback, 3000);
        worker.postMessage({ requestId, gameId: game.id, state, difficulty });
      } catch {
        // O jogo continua disponível se o navegador não permitir workers.
        clearTimeout(fallbackTimer);
        fallbackTimer = setTimeout(fallback, 0);
      }
    });
  }

  return { analyze, cancel };
}

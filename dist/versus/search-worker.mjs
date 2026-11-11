import { loadVersusGame } from "./metadata.mjs";
import { chooseMove } from "./search.mjs";

self.onmessage = async ({ data }) => {
  try {
    const game = await loadVersusGame(data.gameId);
    const answer = chooseMove(game.engine, data.state, data.difficulty);
    self.postMessage({ requestId: data.requestId, answer });
  } catch {
    self.postMessage({
      requestId: data.requestId,
      error: "Não foi possível analisar esta posição.",
    });
  }
};

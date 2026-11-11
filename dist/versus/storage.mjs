import { writeProgress } from "../progress-write-guard.mjs";
import { VERSUS_GAME_IDS } from "./metadata.mjs";

export const VERSUS_STORAGE_KEY = "intuicao.versus.v1";
const MAX_STORAGE_CHARACTERS = 2_000_000;

function readEnvelope(storage) {
  const raw = storage?.getItem(VERSUS_STORAGE_KEY);
  if (!raw) return { version: 1, games: {} };
  if (raw.length > MAX_STORAGE_CHARACTERS)
    throw new Error("Registro muito grande.");
  const value = JSON.parse(raw);
  if (
    value?.version !== 1 ||
    !value.games ||
    typeof value.games !== "object" ||
    Array.isArray(value.games)
  ) {
    throw new Error("Versão de registro incompatível.");
  }
  return value;
}

export function createVersusStorage(storage) {
  return {
    warning: "",

    read(gameId) {
      try {
        this.warning = "";
        return readEnvelope(storage).games[gameId] ?? null;
      } catch {
        this.warning =
          "Não foi possível ler a partida salva. O registro original foi preservado.";
        return null;
      }
    },

    save(gameId, record) {
      if (!VERSUS_GAME_IDS.includes(gameId)) return false;
      try {
        // Ler de novo preserva partidas de outros jogos atualizadas em outra aba.
        const envelope = readEnvelope(storage);
        envelope.games[gameId] = record;
        writeProgress(storage, VERSUS_STORAGE_KEY, JSON.stringify(envelope));
        this.warning = "";
        return true;
      } catch {
        this.warning =
          "Não foi possível salvar neste navegador. Você pode continuar nesta página.";
        return false;
      }
    },
  };
}

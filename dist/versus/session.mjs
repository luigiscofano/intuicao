const MAX_ACTIONS = 180;

export function createSession(engine) {
  return { actions: [], states: [engine.createState()], cursor: 0 };
}

export function currentState(session) {
  return session.states[session.cursor];
}

/** Reproduzir as ações valida saves sem confiar em tabuleiros recebidos do navegador. */
export function restoreSession(engine, record) {
  if (
    !record ||
    !Array.isArray(record.actions) ||
    record.actions.length > MAX_ACTIONS ||
    !Number.isInteger(record.cursor) ||
    record.cursor < 0 ||
    record.cursor > record.actions.length
  ) {
    throw new Error("O histórico salvo não é compatível com esta partida.");
  }
  const session = createSession(engine);
  for (const action of record.actions) {
    if (!action || typeof action !== "object" || Array.isArray(action)) {
      throw new Error("Há uma jogada inválida no registro da partida.");
    }
    const next = engine.applyMove(session.states.at(-1), action);
    session.actions.push(structuredClone(action));
    session.states.push(next);
  }
  session.cursor = record.cursor;
  return session;
}

export function applySessionMove(engine, session, move) {
  if (session.cursor >= MAX_ACTIONS)
    throw new Error("Limite de histórico excedido.");
  const next = engine.applyMove(currentState(session), move);
  return {
    actions: [
      ...session.actions.slice(0, session.cursor),
      structuredClone(move),
    ],
    states: [...session.states.slice(0, session.cursor + 1), next],
    cursor: session.cursor + 1,
  };
}

/** Contra o computador, o histórico volta a uma decisão humana, inclusive em QUINHÃO. */
export function travelHistory(session, direction, humanOnly = false) {
  const last = session.states.length - 1;
  let cursor = Math.max(0, Math.min(last, session.cursor + direction));
  while (
    humanOnly &&
    cursor > 0 &&
    cursor < last &&
    session.states[cursor].player !== 0 &&
    !session.states[cursor].result
  ) {
    cursor += direction;
  }
  return { ...session, cursor };
}

export function serializeSession(session, config) {
  return {
    version: 1,
    config: structuredClone(config),
    actions: structuredClone(session.actions),
    cursor: session.cursor,
  };
}

const WIN_SCORE = 1_000_000;

export const SEARCH_LIMITS = Object.freeze({
  beginner: { depth: 1, nodes: 100, milliseconds: 90, width: 12 },
  intermediate: { depth: 2, nodes: 1800, milliseconds: 280, width: 20 },
  strong: { depth: 4, nodes: 9000, milliseconds: 750, width: 24 },
});

function positionValue(engine, state, perspective) {
  if (state.result) {
    if (state.result.winner === null) return 0;
    return state.result.winner === perspective ? WIN_SCORE : -WIN_SCORE;
  }
  return engine.evaluate(state, perspective);
}

/** Busca determinística e limitada: a regra do jogo nunca depende do orçamento do bot. */
export function chooseMove(
  engine,
  state,
  difficulty = "intermediate",
  options = {},
) {
  const limits = {
    ...(SEARCH_LIMITS[difficulty] ?? SEARCH_LIMITS.intermediate),
    ...options,
  };
  const clock = options.clock ?? (() => performance.now());
  const deadline = clock() + limits.milliseconds;
  const perspective = state.player;
  let visited = 0;
  let interrupted = false;
  const initialMoves = engine.getLegalMoves(state);
  if (!initialMoves.length) return { move: null, nodes: 0, depth: 0 };

  function expired() {
    const exhausted = visited >= limits.nodes || clock() >= deadline;
    if (exhausted) interrupted = true;
    return exhausted;
  }

  function orderedChildren(position) {
    const children = [];
    for (const move of engine.getLegalMoves(position)) {
      const next = engine.applyMove(position, move);
      children.push({
        move,
        state: next,
        value: positionValue(engine, next, perspective),
      });
      visited += 1;
      if (expired()) break;
    }
    const sign = position.player === perspective ? -1 : 1;
    children.sort((left, right) => sign * (left.value - right.value));
    return children.slice(0, limits.width);
  }

  function search(position, depth, alpha, beta) {
    if (position.result || depth === 0 || expired()) {
      return positionValue(engine, position, perspective);
    }
    const maximizing = position.player === perspective;
    let best = maximizing ? -Infinity : Infinity;
    const children = orderedChildren(position);
    if (!children.length) return positionValue(engine, position, perspective);

    for (const child of children) {
      const value = search(child.state, depth - 1, alpha, beta);
      best = maximizing ? Math.max(best, value) : Math.min(best, value);
      if (maximizing) alpha = Math.max(alpha, best);
      else beta = Math.min(beta, best);
      if (beta <= alpha || expired()) break;
    }
    return best;
  }

  // A primeira ação legal continua disponível mesmo em um dispositivo muito lento.
  let chosen = initialMoves[0];
  let completedDepth = 0;
  let chosenValue = positionValue(
    engine,
    engine.applyMove(state, chosen),
    perspective,
  );
  const roots = orderedChildren(state);
  if (roots.length) {
    chosen = roots[0].move;
    chosenValue = roots[0].value;
  }
  for (let depth = 1; depth <= limits.depth && !expired(); depth += 1) {
    let bestMove = chosen;
    let bestValue = -Infinity;
    for (const child of roots) {
      const value = search(child.state, depth - 1, -Infinity, Infinity);
      if (value > bestValue) {
        bestValue = value;
        bestMove = child.move;
      }
      if (expired()) break;
    }
    // Uma camada parcial não substitui a análise completa da camada anterior.
    if (!interrupted) {
      chosen = bestMove;
      chosenValue = bestValue;
      completedDepth = depth;
    }
  }
  return {
    move: chosen,
    value: chosenValue,
    nodes: visited,
    depth: completedDepth,
  };
}

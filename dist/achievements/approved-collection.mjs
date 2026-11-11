/** Evidence belongs to live rounds, never to renders, previews or replayed history. */
export function createCollectionMissionRound({ restored = false, confirmations, assisted } = {}) {
  return {
    // Old saves do not prove how often their answer was confirmed.
    confirmations: Number.isSafeInteger(confirmations) && confirmations >= 0
      ? confirmations : restored ? null : 0,
    assisted: typeof assisted === "boolean" ? assisted : restored,
    quartet: [],
    quartetComplete: false,
  };
}

export function observePuzzleConfirmation(round) {
  const first = round.confirmations === 0;
  if (round.confirmations !== null) round.confirmations++;
  return first;
}

function neighbors(cell, level) {
  const row = Math.floor(cell / level.cols), col = cell % level.cols;
  return [row > 0 ? cell - level.cols : -1,
    row + 1 < level.rows ? cell + level.cols : -1,
    col > 0 ? cell - 1 : -1, col + 1 < level.cols ? cell + 1 : -1]
    .filter(cell => cell >= 0);
}

/** Exact two-cell partnerships, not adjacent cells inside a triple. */
export function pactoPairs(level, values) {
  const pairs = new Map();
  for (let cell = 0; cell < values.length; cell++) {
    const symbol = values[cell];
    if (!Number.isInteger(symbol) || symbol < 0 || symbol > 3) continue;
    const partners = neighbors(cell, level).filter(other => values[other] === symbol);
    if (partners.length !== 1 || partners[0] < cell) continue;
    const other = partners[0];
    if (neighbors(other, level).filter(i => values[i] === symbol).length === 1)
      pairs.set(`${cell}:${other}:${symbol}`, symbol);
  }
  return pairs;
}

export function resetPactoSequence(round) {
  round.quartet = [];
  round.quartetComplete = false;
}

/** Called only after a person's committed board edit, not hint/answer application. */
export function observePactoEdit(round, level, before, after, { human = true } = {}) {
  if (!human) { resetPactoSequence(round); return; }
  const oldPairs = pactoPairs(level, before.values), newPairs = pactoPairs(level, after.values);
  if ([...oldPairs.keys()].some(key => !newPairs.has(key))) resetPactoSequence(round);
  const added = [...newPairs].filter(([key]) => !oldPairs.has(key));
  // A single edit cannot be credited with an invented ordering of several pairs.
  if (added.length > 1) { resetPactoSequence(round); return; }
  if (added.length === 1) {
    round.quartet.push(added[0][1]);
    round.quartet = round.quartet.slice(-4);
    if (round.quartet.length === 4 && new Set(round.quartet).size === 4)
      round.quartetComplete = true;
  }
}

/** Same half-turn symmetry criterion used by the official PRUMO campaign. */
export function hasAsymmetricPrumoPiece(level, state) {
  const assignments = state.assignments;
  if (!Array.isArray(assignments)) return false;
  return level.supports.some((support, index) => {
    const cells = assignments.flatMap((value, cell) => value === index ? [cell] : []);
    const set = new Set(cells);
    return cells.some(cell => {
      const x = support.x2 - cell % level.cols;
      const y = support.y2 - Math.floor(cell / level.cols);
      return x < 0 || x >= level.cols || y < 0 || y >= level.rows || !set.has(y * level.cols + x);
    });
  });
}

export function approvedCollectionUnlocks(gameId, { confirmed, official, success, level, state, round } = {}) {
  if (confirmed !== true || official !== true || success !== true) return [];
  if (gameId === 'prumo' && hasAsymmetricPrumoPiece(level, state)) return ['prumo-unlikely-balance'];
  if (gameId === 'pacto' && round?.quartetComplete) return ['pacto-quartet'];
  return [];
}

export function createCercoMissionRound() {
  return { counts: [0, 0], observed: new Set(), invalidated: false };
}

/** Undo/redo invalidates this round rather than manufacturing observations from history. */
export function invalidateCercoMissionRound(round) { round.invalidated = true; }

export function observeCercoMission(round, { confirmed, computer, custom, mode, before, after, legalBefore } = {}) {
  if (round.invalidated || confirmed !== true || computer === true || custom === true ||
      !['local', 'competitive', 'bot', 'training'].includes(mode) ||
      !before || !after || before.over || after.turn !== before.turn + 1 ||
      round.observed.has(before.turn)) return [];
  round.observed.add(before.turn);
  // Count pieces, not destinations. Three turns need not be consecutive.
  if (new Set((legalBefore ?? []).map(move => move.from)).size === 1)
    round.counts[before.player]++;
  return after.over && after.winner === before.player && round.counts[before.player] >= 3
    ? ['cerco-last-exit'] : [];
}

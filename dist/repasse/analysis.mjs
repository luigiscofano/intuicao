// Análise de posições e dicas de REPASSE com reprodução das ordens de retirada.
import {
  initialState,
  validateLevel,
  validateState,
  evaluateState,
  stateKey,
  transition,
  preview,
  replay,
  solve,
} from './engine.mjs';

// A certificate is useful only after replaying it against the complete state.
export function certifiedSuffix(level, state) {
  if (
    !validateLevel(level).valid ||
    !validateState(level, state).valid ||
    !Array.isArray(level.solution)
  )
    return null;
  const witness = replay(level, level.solution);
  if (!witness.valid || !witness.solved) return null;
  const wanted = stateKey(state),
    start = initialState(level);
  const states = [start, ...witness.steps.map((step) => step.state)];
  const at = states.findIndex((candidate) => stateKey(candidate) === wanted);
  if (at < 0) return null;
  const solution = level.solution.slice(at),
    check = replay(level, solution, { state });
  if (!check.valid || !check.solved) return null;
  return { status: 'solved', solution, visited: 0, source: 'replayed-witness' };
}

export function analyzePosition(
  level,
  state,
  { allowSearch = true, maxStates = 100000, timeoutMs = 2200 } = {},
) {
  const definition = validateLevel(level);
  if (!definition.valid)
    return {
      status: 'inconclusive',
      solution: null,
      visited: 0,
      reason: 'invalid-level',
      errors: definition.errors,
    };
  const validation = validateState(level, state);
  if (!validation.valid)
    return {
      status: 'inconclusive',
      solution: null,
      visited: 0,
      reason: 'invalid-state',
      errors: validation.errors,
    };
  const current = evaluateState(level, state);
  if (current.won) return { status: 'solved', solution: [], visited: 0, source: 'already-won' };
  if (current.overruns.length)
    return {
      status: 'unsolvable',
      solution: null,
      visited: 0,
      reason: 'target-overrun',
      overruns: current.overruns,
    };
  if (current.remaining === 0)
    return { status: 'unsolvable', solution: null, visited: 0, reason: 'empty-with-wrong-targets' };
  const suffix = certifiedSuffix(level, state);
  if (suffix) return suffix;
  if (!allowSearch)
    return { status: 'inconclusive', solution: null, visited: 0, reason: 'worker-unavailable' };
  const result = solve(level, state, { maxStates, timeoutMs });
  if (result.status === 'solved') {
    const check = replay(level, result.solution, { state });
    if (!check.valid || !check.solved)
      return {
        status: 'inconclusive',
        solution: null,
        visited: result.visited,
        reason: 'verification-failed',
      };
  }
  return result;
}

const pieceName = (piece) => `peça da linha ${piece.row + 1}, coluna ${piece.col + 1}`;
const borderName = (to) =>
  ({
    top: `caixa acima da coluna ${to.index + 1}`,
    bottom: `caixa abaixo da coluna ${to.index + 1}`,
    left: `caixa à esquerda da linha ${to.index + 1}`,
    right: `caixa à direita da linha ${to.index + 1}`,
  })[to.side];
const destinationName = (to) => (to.kind === 'piece' ? pieceName(to) : borderName(to));
const join = (values) =>
  values.length < 2 ? (values[0] ?? '') : `${values.slice(0, -1).join('; ')}; e ${values.at(-1)}`;

export function hintFromSolution(level, state, solution, tier = 1) {
  if (!validateLevel(level).valid || !validateState(level, state).valid)
    return {
      text: 'Não foi possível verificar esta posição. Reabra a fase para recuperar um estado válido.',
      recipients: [],
    };
  const checked = replay(level, solution, { state });
  if (!checked.valid || !checked.solved)
    return {
      text: 'Não há uma continuação confirmada para mostrar. Peça uma nova análise ou use Desfazer para revisar sua hipótese.',
      recipients: [],
    };
  if (!solution.length)
    return {
      text: 'O tabuleiro está vazio e todas as caixas atingiram exatamente suas metas.',
      recipients: [],
    };
  const pieceId = solution[0],
    piece = level.pieces.find((p) => p.id === pieceId);
  const transfers = preview(level, state, pieceId),
    value = transfers[0].value;
  const receiver = transfers.find((t) => t.to.kind === 'piece'),
    border = transfers.find((t) => t.to.kind === 'box');
  const recipients = transfers.map((t) => t.to);
  if (tier <= 1) {
    if (receiver)
      return {
        text: `Observe a ${destinationName(receiver.to)}. Ela ainda pode receber uma contribuição antes de sair. Compare as setas dessa região com o que falta nas caixas.`,
        recipients: [receiver.to],
      };
    const box = border.to,
      missing = level.targets[box.side][box.index] - state.boxes[box.side][box.index];
    return {
      text: `Observe a ${borderName(box)}: ela tem ${state.boxes[box.side][box.index]} de ${level.targets[box.side][box.index]}; faltam ${missing}. Procure uma retirada que contribua para essa meta sem exceder as outras.`,
      recipients: [box],
    };
  }
  if (tier === 2) {
    const parts = [];
    if (receiver) {
      const current = state.values[receiver.to.index];
      parts.push(
        `Uma continuação possível começa enviando +${value} à ${destinationName(receiver.to)}: ela passa de ${current} para ${current + value} e permanece esperando sua retirada.`,
      );
      const later = checked.steps.find((step) => step.removed.id === receiver.to.id);
      if (later)
        parts.push(
          `Nessa continuação verificada, esse receptor é retirado depois com valor ${later.removed.value}.`,
        );
    }
    if (border) {
      const box = border.to,
        present = state.boxes[box.side][box.index],
        target = level.targets[box.side][box.index];
      parts.push(
        `O mesmo repasse acrescenta ${value} à ${borderName(box)}, passando de ${present}/${target} para ${present + value}/${target}.`,
      );
    }
    if (!border)
      parts.push(
        'Cada direção recebe o valor inteiro; os receptores só enviam quando você os retira.',
      );
    return { text: parts.join(' '), recipients };
  }
  const effects = join(transfers.map((t) => `+${value} para a ${destinationName(t.to)}`));
  return {
    text: `Retire a ${pieceName(piece)}, que vale ${value}. Ela envia ${effects}. Há uma continuação verificada que completa todas as metas após essa retirada.`,
    pieceId,
    recipients,
  };
}

// Confere o desafio gerado antes de aceitá-lo na sessão.
export function verifyGenerated(result) {
  if (!result?.level || !validateLevel(result.level).valid)
    throw new Error('A fase gerada não passou pela validação.');
  const solution = result.level.solution;
  const check = replay(result.level, solution);
  if (!check.valid || !check.solved)
    throw new Error('A solução da fase gerada não pôde ser confirmada.');
  return {
    ...result,
    level: { ...result.level, solution: [...solution] },
    validation: { ...result.validation, replay: true, valid: true },
  };
}

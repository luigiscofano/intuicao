// Verificação de fases e soluções de REPASSE antes de aceitar resultados externos.
import {
  validateLevel,
  validateState,
  initialState,
  replay,
  configurationOf as configurationForDirections,
} from './engine.mjs';

// Publication, reserves and worker responses all use the gameplay engine.
export function configurationOf(piece) {
  return configurationForDirections(piece.directions);
}

export function certifyGenerated(result, options = {}) {
  const level = result?.level;
  const validation = validateLevel(level);
  if (!validation.valid)
    throw new Error('Definição de desafio inválida: ' + validation.errors.join('; '));
  if (!Array.isArray(level.solution))
    throw new Error('O desafio não possui uma solução certificada.');
  const certificate = replay(level, level.solution);
  if (!certificate.valid || !certificate.solved)
    throw new Error('A solução do desafio não foi confirmada.');
  const allowed = new Set(options.allowedConfigurations ?? ['original']);
  if (level.pieces.some((piece) => !allowed.has(configurationOf(piece))))
    throw new Error('O desafio usa uma configuração ainda não apresentada.');
  if (options.introduction) {
    if (
      level.pieces.filter((piece) => configurationOf(piece) === options.introduction).length !==
        1 ||
      level.pieces.length > 5
    ) {
      throw new Error('A introdução precisa apresentar uma única peça nova em um desafio curto.');
    }
  }
  return result;
}

export function certifyAnalysis(level, state, result) {
  if (!validateState(level, state).valid)
    throw new Error('Não foi possível validar a posição atual.');
  if (!['solved', 'unsolvable', 'inconclusive'].includes(result?.status))
    throw new Error('Resultado de análise desconhecido.');
  if (result.status === 'solved') {
    const certificate = replay(level, result.solution ?? [], {
      state: state ?? initialState(level),
    });
    if (!certificate.valid || !certificate.solved)
      throw new Error('A continuação proposta não resolve esta posição.');
  }
  return result;
}

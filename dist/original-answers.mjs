// Acesso aos gabaritos de Reflexos e Corte certo conforme o desbloqueio.
// Gabaritos dos níveis de Reflexos e Corte certo. Sem vitória automática.
import { lightLevels, cutLevels } from './levels.mjs';
import { basicCutState } from './curves.mjs';
export const originalAnswerCounts = Object.freeze({
  light: lightLevels.length,
  cut: cutLevels.length,
});
export function getOriginalAnswer(game, index) {
  if (!Number.isInteger(index) || index < 0 || index >= (originalAnswerCounts[game] ?? 0))
    throw new RangeError('Gabarito não encontrado.');
  if (game === 'light') {
    const level = lightLevels[index],
      answer = level.solution;
    let mirror = 0;
    return {
      objects: level.objects.map((object) => ({
        ...structuredClone(object),
        ...(object.type === 'mirror' ? { angle: answer[mirror++] } : {}),
      })),
      target: { ...level.target, radius: 22 },
      sourceAngle: level.sourceAngle ?? 0,
      sources: structuredClone(level.sources),
      targets: structuredClone(level.targets),
      portals: structuredClone(level.portals ?? []),
    };
  }
  if (game === 'cut') {
    const level = cutLevels[index];
    return basicCutState(level, level.solutionTravel);
  }
  throw new RangeError('Jogo não disponível.');
}

import { applyDesvioMove, legalDesvioMoves } from './desvio.mjs';

/** Prévia descritiva: conta opções sem revelar a análise estratégica do bot. */
export function desvioSelectionText(map, state, cell) {
  if (state.winner !== null) return `Jogador ${state.winner + 1} venceu: o adversário ficou sem opções.`;
  const legal = legalDesvioMoves(map, state);
  if (!legal.includes(cell)) return `Escolha um azulejo verde. ${legal.length} ${legal.length === 1 ? 'opção disponível' : 'opções disponíveis'}. ↔ mesma linha · ↕ mesma coluna.`;
  const next = applyDesvioMove(map, state, cell);
  const target = `${next.restriction.axis === 'row' ? 'linha' : 'coluna'} ${next.restriction.index + 1}`;
  const count = legalDesvioMoves(map, next).length;
  return `Seleção: L${Math.floor(cell / map.cols) + 1}C${cell % map.cols + 1}. Envia o rival à ${target}. ${count ? `Restarão ${count} ${count === 1 ? 'opção' : 'opções'}.` : 'Sem opções para o rival: esta jogada vence.'}`;
}

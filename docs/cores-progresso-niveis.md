# Cores do progresso das campanhas

Padrão aprovado em 13/11/2026 para as 12 campanhas de Intuição e Raciocínio Lógico.

| Estado | Fundo | Texto | Significado |
| --- | --- | --- | --- |
| `independent` | `#28543B` | `#FFFAF0` | Fase concluída sem assistência segundo o registro do jogo |
| `assisted` | `#E8BE4A` | `#342D18` | Fase concluída com assistência segundo o registro do jogo |
| `available` | padrão neutro existente | padrão existente | Fase ainda não concluída |

## Sem alterar os dados

Cada renderizador passa a conclusão e a assistência reais para `levelCompletionState`.
A função apenas classifica o estado, sem gravar, migrar ou reinterpretar os saves.
O motor lógico continua validando a versão da fase e preservando uma conclusão
independente anterior. Nos jogos com histórico de assistência permanente, essa
política existente permanece intacta. Usar assistência em uma fase ainda não
concluída não a transforma visualmente em uma conclusão.

`data-completion-state` é compartilhado pelos cinco renderizadores que atendem
às 12 campanhas. A camada de apresentação normaliza o texto visível e acrescenta
a descrição de assistência ao nome acessível, sem alterar número ou dificuldade.

## Aparência e acessibilidade

- Os botões continuam com 64 × 64 px.
- Hover e seleção não substituem a cor do progresso. Seleção/foco usam contorno.
- Os rótulos `✓ concluído` e `✓ assistido` permanecem visíveis.
- Contrastes calculados: 8,34:1 no verde; 7,75:1 no amarelo.
- Os azulejos das seis dificuldades e suas cores aprovadas não mudam.
- Os jogos Versus não recebem este estado de campanha.

## Testes

`node --test tests/level-completion-state.test.mjs`

Inclui estado incompleto, assistência, acessibilidade idempotente, integração dos
cinco renderizadores, política existente de conclusão independente, cores e hover.

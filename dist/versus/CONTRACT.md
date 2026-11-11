# Contrato dos oito jogos versus

Os motores são módulos ES puros. Não acessam DOM, armazenamento, relógio ou rede.
O controlador compartilhado mantém histórico, confirmação, persistência e bot.

## Arquivos por jogo

`games/<id>/engine.mjs`, `view.mjs`, `view.css`, `index.mjs`, `README.md`.
Testes: `tests/versus/<id>.test.mjs`, com `node:test` e `node:assert/strict`.

## Motor

- `createState()` retorna o estado inicial serializável.
- Todo estado tem `player: 0 | 1`, `moveCount: number`, `result: null | { winner: 0 | 1 | null, reason: string }`.
- `getLegalMoves(state)` retorna objetos de ação serializáveis, em ordem determinística. Resultado final retorna `[]`.
- `applyMove(state, move)` valida a ação e retorna NOVO estado; ação inválida lança Error. Nunca modifica o estado recebido.
- `getScores(state)` retorna `[number, number]` para os painéis.
- `evaluate(state, player)` retorna avaliação heurística numérica a favor do jogador informado; sem sorte nem busca recursiva.
- Passes obrigatórios, quando necessários, são ações explícitas `{ type: 'pass' }`.
- QUINHÃO tem ações separadas de oferta e escolha: `state.player` sempre aponta quem decide agora, mesmo se a mesma pessoa decide duas ações consecutivas.
- LASTRO pode usar `{ type: 'next-round' }` depois da primeira rodada. `result` só existe quando o duelo inteiro terminou.

## Apresentação

- `renderBoard(state, context)` retorna HTML/SVG completo somente da área de jogo.
- Contexto: `{ selection: object | null, pendingMove: object | null, previewState: object | null, legalMoves: Array, config: { mode, difficulty, mascots }, disabled: boolean }`.
- Botões interativos usam `data-action` com JSON escapado. Ex.: `<button data-action="{&quot;type&quot;:&quot;cell&quot;,&quot;cell&quot;:4}">…</button>`.
- `interact(state, selection, action)` retorna `{ selection, move: object | null }`. Uma ação completa vira prévia, jamais é aplicada pelo desenho.
- `describeMove(state, move, nextState)` explica a consequência em português, como texto simples.
- `getStatus(state)` fornece a instrução da posição atual, como texto simples.
- `renderResult(state)` opcional: pequena cena SVG/HTML relacionada à vitória, sem controles.
- Use nomes de classes com prefixo do jogo dentro de `#versus-games`. Componentes comuns usam `nv-`.
- `view.css` é carregado sob demanda pelo controlador. Layout responsivo e alvos clicáveis acessíveis. Evitar texto de produção sobre validação técnica.

## Exportação

`index.mjs` exporta `game` com `{ id, name, tagline, objective, duration, rules: string[], engine, view }`; importe `* as engine` e `* as view`.
`rules` deve permitir jogar sem informação omitida. Incluir início, fim, empate, repetição e passes.

## Utilitários compartilhados

De `../../shared/markup.mjs`: `escapeHTML(value)`, `actionAttributes(action)`, `coordinate(cell, columns)`, `playerMark(player)`, `playerName(player)`.
`actionAttributes` retorna somente `data-action="..."`.
De `../../../versus-mascot-art.mjs`: `versusFrontIcon(id)` produz o animal oficial para VAZANTE; use dentro de um casco próprio e preserve o desenho original.

Código completo, formatado, funções pequenas com nomes claros. Comentários e documentação em português explicam decisões e invariantes, sem repetir cada linha.

## Recuperação de sugestões

Uma view pode exportar `selectionForMove(state, move)` para reconstruir a seleção
quando a busca oferece uma jogada no treino. Isso permite editar o giro, a borda,
a peça ou o destino sugerido antes da confirmação. A função mantém o estado
recebido intacto e retorna o mesmo formato de seleção usado por `interact`.

# REPASSE — contrato de implementação

Especificação autoritativa: `upload/Pasted text(7).txt`, fornecida pelo usuário em 25/10/2026. O código fica em `dist/repasse/`; o estado usa exclusivamente `intuicao.repasse.v1`. As sete experiências existentes e seus dados são preservados.

## Definição da fase

```js
{
  id: 1, version: 1, rulesVersion: 1, name: '...',
  rows: 3, cols: 3,
  pieces: [{id: 'p1', row: 0, col: 0, value: 1, directions: ['left','right']}],
  targets: {top: [0,0,0], bottom: [0,0,0], left: [0,0,0], right: [0,0,0]},
  solution: ['p1'],
  category: 'Básico', stage: 'Descoberta', chapter: 1,
  role: 'introdução', primaryConcept: 'receive', secondaryConcepts: [],
  configurations: ['original'], difficulty: 0,
  discovery: 'Nesta fase, o jogador precisa perceber que…',
  hints: [], validation: {}
}
```

IDs da campanha: números inteiros consecutivos de 1 a 500; IDs de peças: strings estáveis e únicas. Coordenadas internas começam em zero. Configurações: `original` (horizontal/vertical), `single`, `corner`, `four`. Dificuldade editorial de 0 a 7, distinta do número da fase, da categoria e da etapa. Valores inteiros positivos; metas inteiras não negativas. Direções internas: `up`, `right`, `down`, `left`. Caixas: `top`, `right`, `bottom`, `left`.

## Estado e motor puro

Estado: `{values: number[], boxes: {top: number[], bottom: number[], left: number[], right: number[]}}`. `values[i] === 0` significa peça retirada. Os índices seguem `level.pieces` e nunca são reordenados. Não há estado de animação no motor.

- `RULES_VERSION`, `DIRECTIONS`.
- `validateLevel(level)` → `{valid, errors}`. Valida estrutura e limites seguros; solução certificada é responsabilidade de `replay`.
- `initialState(level)` → estado novo.
- `validateState(level, state)` → `{valid, errors}`.
- `preview(level, state, pieceId)` → array de repasses `{direction, value, to}`; `to` é `{kind:'piece', id, index, row, col}` ou `{kind:'box', side, index}`.
- `transition(level, state, pieceId)` → `{state, changed, transfers, removed, result}`; `removed` é `{id,index,row,col,value}` ou `null`; `result` é o retorno de `evaluateState`. Entradas repetidas/vazias não alteram o estado. A mesma retirada é atômica.
- `evaluateState(level, state)` → `{status, won, remaining, overruns}`; status `playing`, `won`, `overrun` ou `exhausted`. Um excesso não desabilita todas as hipóteses; desfazer continua livre.
- `isWon(level, state)`, `stateKey(state)`.
- `replay(level, order, {state} = {})` → `{valid, solved, state, steps, error?}`; cada passo conserva a transição.
- `solve(level, state = initialState(level), options = {})` → `{status:'solved'|'unsolvable'|'inconclusive', solution, visited, reason?}`. Cache inclui valores, peças presentes e caixas. `maxStates` limita a busca; `timeoutMs` é uma salvaguarda operacional, nunca prova de impossibilidade.
- `analyzePosition(level, state, options = {})` → resultado da busca, usando primeiro um sufixo certificado quando ele realmente corresponde ao estado atual.
- `hintFromSolution(level, state, solution, tier)` → `{text, pieceId?, recipients?}`; tiers 1 a 3, sem modificar a partida.

As exportações do motor ficam em `engine.mjs`; análise/dicas podem ficar em `analysis.mjs`, importando o mesmo motor.

## Catálogo e geração

- `campaign.mjs`: exporta `CAMPAIGN` (500 definições materializadas), `CHAPTERS` (20 nomes), `DIFFICULTIES` (8 nomes), `CONCEPTS` (mapa de código para rótulo). Nenhuma geração em tempo de carregamento substitui o catálogo.
- `generator.mjs`: exporta `GENERATOR_VERSION`, `generateRepasse(seed, options)`, `levelSignature(level)`. Opções: `difficulty` (0–7), `allowedConfigurations`, `recentSignatures`, `recentFamilies`. Resultado: `{level, seed, generatorVersion, signature, family, source, diagnostics}`. Determinismo considera todos esses parâmetros. Todas as candidatas são reproduzidas pelo motor antes da entrega.
- `fallback.mjs`: exporta `FALLBACK_LEVELS`, reserva independente e certificada, e `selectFallback(seed, options)` com o mesmo formato de resultado. Não reciclar as 500 fases como modo infinito.

## Serviço assíncrono (responsabilidade da integração)

`createRepasseService()` em `service.mjs` retorna:

- `generate(seed, options)` → Promise do resultado de `generateRepasse` ou reserva certificada.
- `analyze(level, state, options)` → Promise do resultado de `analyzePosition`.
- `cancel()` → cancela trabalhos e descarta resultados antigos.
- `destroy()` → encerra os workers.

Geração e análise usam workers separados. `cancel` rejeita com `AbortError`. Interface trata limites/inconclusão sem declarar impossibilidade. A interface pode antecipar uma fase usando `generate`; resultados devem manter sua seed e parâmetros e ser descartados ao trocar de modo.

## Interface

`initRepasse({hideOthers})` em `ui.mjs` retorna `{activate, hide, destroy}`. `activate()` abre a seleção; `hide()` persiste e cancela trabalhos. Host `#repasse`. Elementos locais usam prefixo `r-`.

Reutilizar `.level-screen`, `.level-group`, `.level-tile`, `.collection-toolbar.selection-actions`, `.lab`, `.lab-heading`, `.stage-top`, `.stage-tools`, `.level-stepper`, `.level-arrow`, `.rules-card`, `.rules-sidebar`, `.level-actions`, `.primary`, diálogos e animações compartilhados. Ações da seleção ficam lado a lado. Partida mostra `DESAFIO N / 500`, sem seletor de fase. Nenhum ranking fictício por quantidade de retiradas.

O histórico guarda IDs das retiradas e cursor, e a restauração reproduz todos os comandos e confere o snapshot. Campanha e Endless guardam suas sessões separadamente. Vitória e animações são idempotentes.

# Como jogar: objetivo, ação e exemplo

A revisão cobre os 20 jogos ativos após a retirada de Enlace, Lastro e Vazante.

## Estrutura

- Objetivo em uma frase e três passos curtos, definidos em `dist/rules-quick-start.mjs`.
- Regras completas acessíveis em um bloco recolhível, sem eliminar exceções.
- Exemplo próprio de cada jogo, legenda visível e três indicações: observar, agir e conferir.
- Ajuda disponível antes de jogar e durante a partida. Nos jogos antigos, pistas e controles específicos da fase ficam preservados em outro bloco recolhível.

## Movimento

O ciclo passa de seis para 4,8 segundos e repete enquanto o exemplo está visível. O observador suspende trabalho fora da tela ou com a aba oculta, retomando automaticamente. Não há botão de pausa. O gesto marca onde começa a ação. Estalo agora revela as seis casas da cadeia em sequência, numeradas, antes da pontuação. Broto espera a colheita para destacar o ponto.

Preferência do sistema ou do site por movimento reduzido mantém um exemplo estático legível, sem gesto animado. Nenhuma animação modifica o tabuleiro, o histórico ou o armazenamento de progresso.

## Verificação

Executar:

```sh
node --test tests/rules-quick-start.test.mjs tests/rules-preview.test.mjs tests/rules-logic-examples.test.mjs tests/rules-versus-examples.test.mjs
```

36 testes aprovados, incluindo exemplos conferidos com motores reais. Conferência no navegador: os 20 jogos ativos renderizam objetivo, três passos, SVG e detalhes, sem transbordamento horizontal do painel na largura desktop testada. Ajuda em partida conferida em ELO e Acorde; abertura de detalhes e reprodução visível conferidas. Os pontos de quebra para telas estreitas e preferência de movimento reduzido têm cobertura estática, não equivalem a uma auditoria completa em aparelhos físicos.

Testes históricos que congelam catálogos/hashes anteriores não foram reescritos para ocultar divergências. Esta alteração não modifica motores, campanhas, geradores, saves, catálogo ou conquistas.

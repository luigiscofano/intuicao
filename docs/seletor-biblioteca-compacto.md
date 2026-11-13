# Seletor compacto da biblioteca

A opção A aprovada agrupa Todos, Favoritos e Recentes em um controle compacto. Editar favoritos fica próximo, separado por uma linha discreta no desktop e abaixo em telas pequenas. O título antecede o seletor e informa a quantidade de jogos do filtro/categoria atual.

## Compatibilidade

- IDs, eventos, preferências, favoritos e histórico recentes foram preservados.
- Botões nativos mantêm navegação por teclado e `aria-pressed`; SVGs decorativos não duplicam nomes acessíveis.
- Área de toque mínima de 44 px; controles reorganizados abaixo de 760 px.
- Nenhum tabuleiro, regra, save, gerador ou conquista foi alterado.

## Verificação

Executar `node --test tests/library-preferences.test.mjs tests/cohesion-contract.test.mjs tests/library-navigation.test.mjs`.

Os testes cobrem navegação, rotas, preferências, filtros e contador; a revisão visual usa desktop e larguras de 320/390 px. A contagem é calculada sobre os jogos ativos, sem manter um segundo catálogo.

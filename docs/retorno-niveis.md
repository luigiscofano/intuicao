# Retorno padronizado à seleção de níveis

As 12 campanhas exibem o botão compacto **Níveis** acima dos controles laterais.
O componente visual move o botão nativo, mantendo IDs, handlers, navegação,
progresso, estados e foco. Versus não recebe esse botão.

O nome acessível é **Voltar à seleção de níveis**, com foco visível e alvo mínimo
44 px. O estilo usa fundo claro, borda discreta e a fonte comum do site.

Verificação: `node --test tests/approved-game-shell.test.mjs` cobre os 12 jogos,
reaplicação do layout sem duplicatas, handler original e estados preservados.

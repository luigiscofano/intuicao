# Cabeçalho compacto da biblioteca

- O retorno «Ver todos os jogos» aparece somente quando um jogo está aberto.
- Categorias filtradas usam o próprio filtro «Todos» para retornar ao catálogo.
- Título e contador ficam à esquerda, com filtros de categoria à direita na mesma linha quando há espaço.
- Em telas estreitas, o título antecede os filtros, que quebram linha sem overflow.
- O agrupamento não recria controles, não modifica os identificadores dos jogos e não escreve progresso.
- A identificação do jogo continua antes do controle de retorno.

Validação: testes de navegação cobrem filtros, links diretos, jogos, histórico e retorno; testes do shell verificam preservação de controles. QA visual deve verificar 320, 390 e 1280 px antes da publicação.

# Início direto dos jogos

A partir desta alteração, as páginas de jogos começam com número, categoria e
nome. Foram retirados a chamada promocional, o subtítulo genérico e o mosaico ou
AIIJ que apareciam acima dessa identificação.

A faixa de identificação passa a usar um `h1` com o mesmo acabamento compacto.
O cabeçalho de navegação do site continua disponível. Seleção de modos/fases,
regras, ações, motores, campanhas, progresso e diferenças entre campanhas e
duelos não foram alterados.

Os arquivos de arte existentes continuam preservados no repositório e no
histórico. A mudança não apaga dados nem reativa jogos retirados.

## Verificação

- O contrato do shell percorre todas as 23 apresentações ativas, troca rotas,
  verifica ausência da chamada/AIIJ superior e preservação de controles/eventos.
- Retorno à biblioteca e conquistas continua restaurando a navegação.
- Testes de arte continuam verificando transparência e bytes preservados, sem
  exigir uma exibição do cabeçalho que deixou de fazer parte da interface.

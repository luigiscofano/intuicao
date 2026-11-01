# CERCO — centro do tabuleiro e resultado

O alinhamento anterior usava a coluna inteira do jogo, incluindo confirmação, status e ajuda, como referência vertical. Agora o tabuleiro real e o painel de resultado compartilham a primeira linha do grid; controles e mensagens ocupam uma segunda linha independente. Subgrid mantém o elemento existente usado pela animação de deslocamento, sem mudar seus gatilhos ou cancelamento. No5×5, a coluna passou de390 para374px para coincidir com o tabuleiro e eliminar um deslocamento visual horizontal de4px.

A mudança está restrita a ui.mjs/ui.css do CERCO. Motores,28mapas, saves, BROTO, mascotes, animações e demais jogos permanecem byte-idênticos. Em largura insuficiente, o resultado continua abaixo do jogo, sem encolher células. A reestruturação de SINTONIA continua pendente e não foi aplicada.

QA:46testes Node passaram. No navegador nativo,1.413 verificações em148cenários sem falhas:28mapas em1366/1920/390/320px e os4tamanhos em1024px; ambos vencedores, treino/status longo, vitória por jogada real, undo/redo/reset/revanche e retomada explícita. Desvio máximo entre centros verticais do tabuleiro e painel no desktop:0,0078125px (arredondamento subpixel); centro horizontal conjunto:0px de desvio. Compacto mantém painel abaixo, sem overflow ou sobreposição. Capturas reais1366/1920/320 inspecionadas. Fixture temporária removida e saves originais restaurados exatamente antes do empacotamento.

Limite: o layout utiliza CSS subgrid, como suportado pelo navegador nativo testado; não foi feita matriz de navegadores antigos. O painel pode ser mais alto que o tabuleiro5×5, mantendo respiro sob o tabuleiro no pós-vitória para acomodar o resultado sem sobreposição.

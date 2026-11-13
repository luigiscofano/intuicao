# Cores exclusivas no Refúgio

A renderização não alterna mais verde e amarelo por paridade. Cada marco recebe uma cor estável pela ordem de seus identificadores: verde, amarelo, azul e roxo. A campanha atual possui no máximo quatro marcos por fase.

Folhas, molduras, identificadores numéricos e nomes acessíveis são preservados. Não se colore antecipadamente a solução das regiões. As duas skins usam a mesma identidade cromática. Nenhuma regra, pista, identificação de fase ou chave de progresso muda.

Para futuros mapas com mais de quatro marcos, existe uma reserva determinística de tons sem reciclar a paleta. Novas campanhas maiores devem passar por revisão visual de distinção cromática; os números continuam sendo a referência que não depende de cor.

## Verificação

`node --test tests/logica/refugio-region-colors.test.mjs tests/logica/refugio-visual-approved.test.mjs tests/logica/refugio.test.mjs`

A verificação cobre as 80 fases nas duas skins, as quatro cores aprovadas, um mapa sintético maior, preservação dos dados e a regressão dos controles. A versão publicada no Sites, que também possui geração procedural, recebeu teste separado de 72 gerações sem repetição de cores.

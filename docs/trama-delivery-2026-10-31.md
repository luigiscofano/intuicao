# TRAMA — entrega

Novo jogo Versus 6×6, colocação alternada, círculo azul/losango lilás. Uma ligação existe entre vizinhos ortogonais ou peças separadas por uma única casa vazia. Os dois grafos são reconstruídos a cada colocação; cruzamentos vazios nunca viram nós. Vitória em componente com pelo menos seis peças distintas; empate somente após 36 colocações sem vencedor.

## Arquivos e reuso
- `dist/trama/{engine,bot,worker,service,ui,route}.mjs` e `ui.css`: motor puro, preview, grafo/inspeção, bot com orçamento/cancelamento, persistência versionada própria, UI e rota.
- Registro aditivo em app/index/category-navigation/game-info/game-nav-icons/game-nav-scroll/rules-examples/rules-preview/platform; testes de registro atualizados para o 12º jogo.
- Reaproveitados shell, controles, diálogo de reinício, informações, pictogramas monocromáticos, Como jogar, regras abaixo abertas, confirmação de jogada e celebração. Nenhum mascote em TRAMA; CERCO e demais jogos não tiveram seus módulos alterados.

## Testes
- 40 testes de motor, bot/Worker, integração independente, registro e componentes compartilhados aprovados. Incluem oráculos de 600 + 1.000 tabuleiros, 80 + 200 partidas/replays, cruzamento com grupos 3+2 e união central, interrupção das duas pontes, adjacência/ciclos/ramificação, prioridade de vitória na casa 36, restauração estrita e histórico humano.
- 50 verificações de navegador aprovadas em 1366/390/320: três vitórias por sequência real de 11 colocações, prévia sem alterar placar/estado, cancelamento, consulta, gap visual nos cruzamentos, interrupção/recomputação de ambos os grafos, reload, retry, revanche, undo/redo, bot, competitivo, treino e save inválido preservado.
- Células mínimas: 63,33 /54,16 /44,16 px. Em 320, padding local foi reduzido para manter o alvo mínimo de 44 px sem overflow. Confirmar a 12 px abaixo da moldura (15–19 px do grid), regras abaixo abertas.
- Cliques e teclado reais usados para colocar/confirmar, diálogo de reinício e informações; demais cenários usam fixtures com eventos DOM no navegador nativo.
- Onze conjuntos anteriores de informações, diagramas e pictogramas iguais à versão CERCO; módulos anteriores sem diff.

## Limites
Bot heurístico com orçamento, não minimax exato nem prova de vitória ou equilíbrio. Simulações não substituem teste humano de usabilidade. Nenhum servidor/multiplayer online, campanha ou modo infinito foi criado. Nenhum reset de saves de outros jogos. Fixtures temporários não são publicados.

- Ciclo de vida no navegador: 33 verificações passaram, incluindo cancelamento do bot ao sair/reiniciar, retomada uma única vez, undo preservando abertura do bot, empate real na casa 36 sem PARABÉNS, retry neutro e recuperação explícita de save inválido.
- Regressão de navegação: 33 entradas (onze jogos anteriores × 1366/390/320) passaram, sem overflow horizontal e com TRAMA corretamente oculto.
- Captura compacta 320 inspecionada com cruzamento real: redes azuis 3+2 continuam separadas, círculo/losango legíveis e controles abaixo do quadro; informação TRAMA abre pelo botão nativo.
- Um primeiro ensaio de reinício assíncrono apresentou divergência não reproduzida; repetição isolada com diagnóstico passou, seguida de cinco reinícios consecutivos durante busca, todos mantendo estado e DOM vazios/turno humano e novo matchId estável após 650 ms. Nenhuma alteração especulativa do motor foi feita.

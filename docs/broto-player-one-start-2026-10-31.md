# BROTO: Jogador1 inicia cada novo duelo

Causa: o botão Iniciar já criava partida comJogador1, mas a revanche alternava firstStarter paraJogador2. O pedido atual substitui essa alternância entre duelos: rematchBroto agora inicia rodada1 comJogador1; rótulo passa a “Revanche · Jogador 1 começa”.

A segunda rodada segue começando com o adversário de quem abriu o duelo. Reiniciar a rodada mantém seu iniciador, inclusiveJogador2 na rodada2 normal. Saves ativos não são migrados nem têm turno alterado; revanche de registro legado adota novo padrão.

QA:33 testes Node aprovados;641 verificações nativas sem falhas, nos7mapas×2modos×1366/390/320px, incluindo novo duelo,revanche,rodada2,indicadores,modo/mapapreservados e registroslegados. Saves originais restaurados.

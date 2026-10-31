# TRAMA e VÉRTICE: identificação verde/amarela de CERCO

Alteração exclusivamente visual aprovada: tokens exatos de CERCO para o Jogador 1 (base #e1edce, borda #73965e, tinta #315e35) e Jogador 2 (base #f5e7b2, borda #b99b46, tinta #705a1d). As peças agora têm fundo do time, ícone original sobre branco e borda dupla no amarelo, além dos marcadores ●/◆. A distinção permanece quando ambos escolhem o mesmo animal.

Aplicado às peças, cabeçalhos, preparação, prévias, demonstrações, resultado, conexões TRAMA e halos VÉRTICE. Os halos continuam vazios, sem animais. Textos de identidade foram atualizados. Em rules-preview.mjs, apenas os exemplos dos dois jogos recebem substituição cromática em tempo de renderização; geometrias, animações e texto das regras permanecem. Os onze exemplos dos demais jogos são byte a byte iguais à versão anterior.

Arquivos de produção: quatro ui.mjs/ui.css de TRAMA/VÉRTICE e rules-preview.mjs. Nenhum motor, bot, asset, save schema ou arquivo de CERCO mudou. Comparação por hash contra835a415aeb2b312cc11b2ca9bfe111ded847165f comprova preservação de todos os outros arquivos de produção.

QA: 79 testes Node aprovados. 171 verificações no navegador em1366/390/320px, incluindo tokens computados, preenchimentos/bordas, mesmo mascote nos dois times, conexões/halos, prévias, sequência vencedora contra motor puro, reload/histórico/reinício e manutenção da escolha. Sem overflow horizontal, hitboxes preservadas. Seleção e consulta nativas de VÉRTICE com ambas capivaras testadas; capturas desktop e320px dos dois tabuleiros inspecionadas. Mobile verificado em iframe de navegador real, não em hardware de toque.

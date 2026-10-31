# Corte certo — recortes variados

As vinte fases Mestre/Modo Sábio agora combinam ovais rotacionados, triângulos, losangos, pentágonos, hexágonos e polígonos irregulares côncavos. Cada fase tem pelo menos dois tipos; os tamanhos variam no conjunto. Vazios circulares que pertencem à arte original (olhos/detalhes) permanecem, pois não são os recortes adicionais alterados pelo pedido.

Os contornos exteriores e detalhes originais dos animais continuam extraídos dos mesmos PNGs, sem redesenho. As novas formas são subtraídas da máscara preenchida, sem sobreposição nem subtração duplicada. A menor folga medida até bordas/vazios anteriores é 7,616 pixels-fonte. A largura mínima projetada dos recortes é 6,15 px para o tabuleiro de 273 px de referência compacta.

Somente três arquivos de produção mudaram: `cut-fauna-master-data.mjs`, `cut-fauna-master-levels.mjs` e aliases em `cut-campaign.mjs`. Motor, renderização, controles, retorno final corrigido, tolerância, animações, primeiras sessenta fases e demais jogos ficam idênticos ao commit eb22d3088fa9de23c9e4ea38a62623bef5d05ad4. Os vinte IDs v3 não herdam vitórias/rascunhos de máscaras diferentes; os antigos registros v2 continuam guardados e seus aliases servem apenas à seleção.

Famílias de curvas, metas, ângulos, amplitudes, frequências, direções e permissões das fases foram preservados. Soluções foram recalculadas e certificadas: posição inteira e seus vizinhos ±2 permanecem dentro dos ±3 pontos percentuais. Sábio conserva curvas oblíquas, vazios de tamanhos assimétricos distribuídos entre os lados e 4,84–12,23% de área retirada. A dificuldade não depende de acertar um ângulo diminuto.

## Verificação
- 30 testes geométricos/integração passaram: máscara PNG menos formas == partição de retângulos == contornos evenodd; componentes e contornos preservados; 80 soluções; 600 estados extremos; primeiras 60 definições/120 cálculos/dicas iguais; histórico e hashes fora do escopo.
- 217 verificações do importador, 205 de dicas, 19 casos de orçamento e 2 testes do retorno final passaram.
- 1.037 verificações nativas em 1366/390/320 px passaram, incluindo vinte fases por largura, 240 percentuais, masks reais, tipos, drafts/reload, vitória original única, retorno80→seleção e restauração integral dos saves de teste.
- Capturas dos vinte tabuleiros e dos Sábio compactos revisadas: contornos reconhecíveis, vazios de formas distintas sem recortar extremidades.
- Nesta sessão: máximos observados de 35,7 ms no cálculo, 37,8 ms de input síncrono e 36,9 ms na confirmação. Não são garantias de desempenho para todo hardware.

Limites: QA compacta em navegador com viewports responsivos, não em aparelhos físicos. Silhuetas seguem a resolução da máscara dos PNGs originais, com fidelidade pixel a pixel; não se trata de vetorização suavizada nem de nova arte.

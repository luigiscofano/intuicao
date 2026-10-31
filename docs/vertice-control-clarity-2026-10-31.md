# VÉRTICE — controle dos pontos vazios mais explícito

Base: 4423bc252a85d4a06e44ee4522c071915872a9ff. Pedido: deixar claro qual jogador domina a casa branca.

Apenas `dist/vertice/ui.mjs` e `dist/vertice/ui.css` foram alterados em produção. Anéis controlados agora têm borda de 3 px, halo verde/amarelo do CERCO, centro branco e identificação `● J1` / `◆ J2`. O ponto disputado usa anel dividido e rótulo `Disputa`; pontos neutros continuam pequenos e sem rótulo de dono. Legenda curta explica os marcadores. Pontos vazios nunca recebem mascote ou aparência de peça ocupada. A mesma função cobre a prévia e o exemplo guiado.

Lógica, listeners, cálculo de controle, vitória, bot, persistência, desenhos e demais jogos são idênticos ao baseline. Comparação normalizada de ui.mjs permite apenas a função de markup e a legenda; todos os outros arquivos de produção têm hashes preservados.

## Testes
- 44 testes Node passaram: `node --test tests/vertice*.test.mjs tests/versus-colors.test.mjs`.
- Dois testes históricos de invariância agora comparam os sete arquivos de mapas autorizados ao commit 4423bc2, em vez de exigir a versão anterior aos mapas. Não houve relaxamento para outros arquivos.
- 174 checagens em navegador real, larguras 1366, 390 e 320 px: estados de cada jogador, neutro, disputado, prévia, inspeção por foco, cancelamento, confirmação, undo/redo e recarga.
- Mesmo mascote (capivara) nas duas equipes: identificação permanece independente do animal.
- Área clicável mínima 48 px; rótulos com fonte mínima 10 px; nenhuma colisão com outros pontos, nenhum rótulo fora do tabuleiro e nenhum overflow horizontal.
- Inspeção visual real de 320/390 px confirmou rótulos J1/J2 e Disputa legíveis, centro branco vazio e cores preservadas.

Limite: larguras móveis foram exercitadas em iframes responsivos do navegador real, não em aparelho físico. Fixtures removidos de dist antes de empacotar.

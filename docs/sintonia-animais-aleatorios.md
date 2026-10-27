# Animais aleatórios no Sintonia

Cada fase sorteia, sem reposição, os personagens necessários entre os 16 animais. A escolha é visual e não altera a definição do tabuleiro, sua solução ou as regras de movimento. Campanha, desafio diário, Endless e níveis importados passam pelo mesmo início de partida.

A seleção fica salva junto à tentativa, fora da definição lógica da fase. Movimentos, dicas, desfazer, refazer, reiniciar e retomar a página mantêm a seleção. Tentativas antigas recebem uma seleção na primeira abertura; nenhum histórico é descartado por não ter esse campo. Outras fases recebem seus próprios sorteios. Não há garantia de exclusividade entre fases diferentes.

Os nomes dos cabeçalhos, das descrições acessíveis e das dicas usam a mesma seleção dos sprites. Os 16 arquivos individuais mais recentes de 26/10/2026, versões de pixels sólidos, estão incorporados sem reescrever seus PNGs. Envoltórios SVG recortam o fundo externo e centralizam as silhuetas, mantendo as cores originais. Identidade e hashes das fontes constam em `sintonia-sprites/roster-sources.json`.

Verificações: `sintonia-animal-roster.test.mjs` e `sintonia-animal-roster-ui.test.mjs`, além das suítes existentes de motor, estado e migração de conteúdo. Os testes antigos de `sintonia-sprites.test.mjs` e de integração de redesenho são auditorias históricas que fixam a versão anterior de quatro animais; não representam o contrato desta ampliação autorizada para 16.

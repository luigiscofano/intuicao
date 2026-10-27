# Animais aleatórios no Sintonia

Cada fase sorteia, sem reposição, os personagens necessários entre os 16 animais. A escolha é visual e não altera a definição do tabuleiro, sua solução ou as regras de movimento. Campanha, desafio diário, Endless e níveis importados passam pelo mesmo início de partida.

A seleção fica salva junto à tentativa, fora da definição lógica da fase. Movimentos, dicas, desfazer, refazer, reiniciar e retomar a página mantêm a seleção. Tentativas antigas recebem uma seleção na primeira abertura; nenhum histórico é descartado por não ter esse campo. Outras fases recebem seus próprios sorteios. Não há garantia de exclusividade entre fases diferentes.

Os nomes dos cabeçalhos, das descrições acessíveis e das dicas usam a mesma seleção dos sprites. A fonte correta é a prancha `sprites_chibi_ituicao.png` anexada pelo usuário, de 1254 × 1254 pixels e 16 animais. O PNG está incorporado integralmente, sem reescrever seus bytes, em um único atlas SVG de 4 × 4. Recortes vetoriais selecionam as silhuetas originais, preservando cores, olhos, plumagem e resolução. As versões individuais simplificadas usadas por engano foram removidas. Identidade e hashes da fonte constam em `sintonia-sprites/roster-sources.json`.

Verificações: `sintonia-animal-roster.test.mjs` e `sintonia-animal-roster-ui.test.mjs`, além das suítes existentes de motor, estado e migração de conteúdo. Os testes antigos de `sintonia-sprites.test.mjs` e de integração de redesenho são auditorias históricas que fixam a versão anterior de quatro animais; não representam o contrato desta ampliação autorizada para 16.

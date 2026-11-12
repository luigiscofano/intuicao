# Auditoria de enquadramento

A implementação mede título, tabuleiro e ações reais em conjunto. A navegação abre a partida centralizada e redimensionamentos recalculam o espaço. Não altera o zoom, as regras, os motores, a campanha ou o armazenamento.

## Limite físico

Não há promessa de mostrar simultaneamente um tabuleiro arbitrariamente grande, textos expandidos e todos os controles em qualquer janela. Quando reduzir mais tornaria os alvos menores que 24 CSS px, o tabuleiro mantém rolagem local. Os comandos permanecem fora dessa rolagem. A região aceita teclado, e as quatro setas “Mover tabuleiro” permitem deslocá-la por toque sem confundir o gesto com pintar/arrastar peças. As ações principais têm altura de 44 px; as setas locais têm 32 px.

Instruções extensas, objetivos repetidos e personalização ficam abaixo do conjunto principal, ainda acessíveis. No modo Sem Parar, Novo desafio e Opções dão acesso direto às funções. Nenhum conteúdo é apagado. As regras, a biblioteca, o rodapé e as outras seções continuam acessíveis pela rolagem normal da página. O movimento automático é instantâneo e é cancelado por interação do jogador antes de começar.

## Reprodução visual

Os HTMLs deste diretório são somente fixtures locais. Copie matrix.html, conditional.html e inspect.html para dist com nomes __viewport-qa.html, __viewport-states.html e __viewport-inspect.html, respectivamente. Abra na prévia local e clique Run viewport matrix. Exclua essas cópias de dist antes de empacotar ou publicar. A navegação e os movimentos usam controles reais da aplicação. Use um perfil descartável de QA, pois partidas de teste podem substituir saves desse perfil.

- matrix.html: 25 jogos por padrão, seis dimensões: 1440×900, 1180×757, 768×1024, 390×844, 320×568 e 844×390.
- Parâmetros opcionais: games (IDs separados por espaço), sizes (ex.: 320x568,844x390), modes (first,last,daily,endless ou local,competitive,bot,training).
- conditional.html: seleção e prévia de Estalo/Dobra, oferta e escolha de Quinhão, passe em Acorde e duas rodadas de Lastro.
- inspect.html: game, w, h e last para inspeção manual.
- A matriz mede os limites da área principal e dos controles visíveis, além de overflow horizontal. Botões dentro do tabuleiro rolável são verificados no contexto da região, e não como ações fixas.

Esses testes de navegador são em viewports de iframe no Chromium da prévia. Não equivalem a testar aparelhos físicos ou todos os navegadores. A verificação de estados legais isolada está em ../viewport-conditional-states.mjs.

## Resultado de 12/11/2026

396 combinações verificadas, com repetição dos casos corrigidos: 150 aberturas/retomadas (25 jogos × seis dimensões), 126 combinações das 14 campanhas (fase final, diário e Sem Parar × três dimensões), 84 combinações dos modos Versus (42 modos suportados × duas dimensões), e 36 estados intermediários. Nenhum controle essencial fora do viewport e nenhum overflow horizontal da página nos registros finais. O JSON guarda a matriz incremental com os resultados das repetições substituindo o caso anterior.

O fixture matrix usa iframe credentialless no Chromium para permitir testes isolados de modos sem tocar os saves do perfil principal. Faça uma nova navegação do fixture entre os modos de BROTO/CERCO se houver confirmação nativa de substituição de uma partida de QA.

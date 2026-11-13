# Desvio: peças de oficina

Visual B/D2 aprovado por Luigi: peças independentes de cantos discretos, verde-mata, azul profundo e amarelo na seleção. A AIIJ A usa azulejos direcionais vetoriais no cabeçalho compacto da partida, sem restaurar o bloco superior removido.

## Componentes

- `dist/desvio-presentation.css`: estilos restritos ao tabuleiro do Desvio.
- `dist/desvio-presentation.mjs`: descrição pura da seleção, sem alterar o estado ou revelar a estratégia do bot.
- `dist/assets/desvio-aiij.svg`: desenho vetorial original, sem fundo retangular.
- `dist/collection-ui.mjs`: integração, seleção acessível e marcas de casas usadas.

## Invariantes

Motor, mapas, IA, vitória, replay, armazenamento e condições dos modos não foram modificados. H continua enviando à mesma linha; V, à mesma coluna. Casas consumidas não bloqueiam caminhos. A nova descrição não é uma dica de estratégia: informa apenas destino e quantidade de opções.

A seleção também possui check e `aria-pressed`; o foco de teclado tem contorno tracejado. Cores não são o único indicador. Animações respeitam redução de movimento. Laterais recentes preservadas.

## Verificação

Testes de apresentação, dicas contextuais, opções de duelo e cabeçalho. Verificação no navegador em desktop e em viewport de 390 × 844 por iframe de QA: seleção, confirmação, casas usadas e três opções após L2C2. Bot verificado nos três níveis por teste automatizado até estado terminal. O iframe de QA não integra a publicação.

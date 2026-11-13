# BROTO e CERCO: expansão conservadora de mapas

## Catálogo

- BROTO: 39 mapas. O clássico 4×4 e os seis mapas 5×5 existentes permanecem idênticos. Oito novas famílias de jardim possuem versões 5×5, 6×6, 7×7 e 8×8: Campo aberto, Veredas, Margens, Ilhas, Varandas, Travessias, Diagonais e Recifes. O jardim continua com oito sementes por jogador e duas rodadas; mapas maiores valorizam o alcance e a preparação de linhas, não aumentam a duração obrigatória.
- CERCO: 40 mapas, dez em cada tamanho 5×5, 6×6, 7×7 e 8×8. As 28 geometrias existentes não mudam. Veredas, Enseadas e Travessias acrescentam desvios internos, reentrâncias de borda e passagens escalonadas. Três peças por jogador, movimentos ortogonais e origem bloqueada continuam iguais.

Novos IDs/versionamento são aditivos. Nenhum save antigo é migrado ou substituído. Paredes e recortes são distintos. Todas as geometrias são conectadas e invariantes sob rotação de 180°; todas as peças iniciais de CERCO possuem saída. BROTO conserva pelo menos 16 casas livres.

## APIs para apresentação

BROTO exporta `BROTO_GRID_SIZES`, `getBrotoMapsForSize(size)` e `getBrotoMapVariant(idOrState,size)` de `broto/maps.mjs`. A mudança de tamanho preserva família quando disponível e escolhe o primeiro mapa válido quando não existe equivalente. CERCO mantém suas APIs anteriores, incluindo família entre tamanhos.

## Verificação executada

`node --test tests/maps-expansion-broto-cerco.test.mjs`: sete testes aprovados.

- Geometria, IDs/versões, imutabilidade, unicidade, simetria e conectividade nos 79 mapas.
- Comparação de todos os mapas antigos com o source v254 (`2f456e66`): dados serializados idênticos.
- 1.560 duelos completos de BROTO, 49.920 plantios, ambos iniciadores, replay canônico, desfazer/refazer.
- 1.600 partidas completas de CERCO, ambos iniciadores, conservação de peças, teto finito, replay e histórico.
- 120 escolhas reais de IA CERCO, todos os mapas e três dificuldades; jogadas legais e orçamento respeitado, sem alteração do bot.
- 34 testes existentes dos motores e bot também aprovados.

A simetria não comprova equilíbrio competitivo. Não houve estudo com jogadores humanos nem medição em celular físico. A ampliação não altera alvos móveis ou CSS: a apresentação deve ser validada pelo integrador no seletor compartilhado e no tabuleiro. BROTO não possui bot nesse motor independente, portanto não se reivindica teste de IA para ele.

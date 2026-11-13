# ACORDE e MOSAICO: catálogo de preparação

## Escopo

Cada jogo oferece 42 arranjos em seis tamanhos, sete por tamanho. São partidas versus, não uma campanha. Não há fases bloqueadas, mudança da meta de vitória, modo diário ou sem parar. O clássico mantém exatamente seu estado inicial anterior, sem acrescentar campos aos saves legados.

ACORDE: 4×4, 4×5, 5×4, 4×6, 6×4 e 6×6. As distribuições são dados fixos versionados, não sorteadas a cada partida. Todos os símbolos aparecem em quantidades iguais, pelo menos quatro vezes; a segunda linha, onde começa o carrinho, oferece pelo menos três símbolos distintos. Continuam valendo três pares diferentes para vencer e os eixos horizontal/vertical originais. As posições distintas mudam as opções oferecidas ao rival, não somente a cor das peças.

MOSAICO: 5×5, 4×4, 4×6, 6×4, 6×6 e 7×7. Um painel vazio e seis aberturas por tamanho. Cada abertura começa com dois azulejos comuns já assentados: um prefixo legal de duas colocações, sem qualquer selo concluído ou ponto inicial. A rotação de 180° combinada com troca de cores conserva a abertura. O verde começa como antes. O contador de colocações inclui os dois azulejos iniciais e a reserva mostra apenas as casas ainda vazias. Essas aberturas são descritas explicitamente no seletor; não são obstáculos e não alteram a regra das maiorias.

## Contrato e compatibilidade

- `game.maps` oferece `id`, `version`, `name`, `description`, `rows`, `cols`, `columns` e `group`; `game.mapPreview(map)` desenha a disposição real.
- `createState({mapId, mapVersion})`; IDs/versões desconhecidos são rejeitados.
- Clássicos sem `mapId` continuam restaurando o tabuleiro original. Novos mapas guardam identidade versionada.
- O controlador compartilhado serializa a configuração e reproduz o histórico a partir da abertura. Desfazer/refazer não apaga os azulejos da abertura.
- Dimensões são propriedades do mapa, não do andamento da partida. Nenhum controle de tamanho aparece durante a jogada.

## Validação executada

- 19 testes existentes de ACORDE/MOSAICO e oito testes novos aprovados.
- 1.680 partidas completas, 20 por mapa, com imutabilidade, término, renderização e replay exato do resultado.
- 252 sugestões legais de IA nos três níveis, com orçamento reduzido de teste (35 ms/500 nós), além de 84 aberturas no orçamento avançado de produção.
- Todos os cenários MOSAICO reconstruídos como prefixo legal, sem pontuação prévia; todos os arranjos ACORDE conservam a quantidade de cada símbolo.

Limites: simulações e simetria não provam equilíbrio competitivo nem medem desempenho em telefone físico. As grades densas exigem revisão responsiva pelo integrador; não se promete alvo de 44 px por célula em todos os aparelhos. Nenhuma publicação ou merge foi realizado por esta tarefa parcial.

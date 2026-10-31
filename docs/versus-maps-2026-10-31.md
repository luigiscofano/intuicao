# CERCO e BROTO — mapas selecionáveis

Base: 2a236d9eec01eda9dc09d5f022a3e1dcab7b40ea. Pedido explícito de novos mapas com paredes naturais e formatos diferentes. Publicação preserva acesso privado.

## Entrega

Seis mapas novos por jogo, além dos clássicos originais. Seleção nativa na preparação, miniatura coerente com o catálogo e regras de obstáculos no próprio jogo. Os exemplos guiados antigos estão identificados como exemplos clássicos; sua sequência e arte continuam intactas.

CERCO: Clássico (25 casas, 19 ações no máximo), Lago central (24/18), Quatro pilares (21/15), Portais (23/17), Ampulheta (21/15), Cantos recortados (21/15), Canais (20/14). Todos os mapas têm seis peças, espaço conectado e simetria de rotação de 180 graus; cada peça tem uma saída inicial. A origem de cada movimento ainda vira uma barreira. Paredes naturais são neutras e permanentes; recortes não são casas. O teto de ações é a quantidade inicial de casas vazias, não um limite artificial de 19 para todos os mapas.

BROTO: Jardim clássico (4×4, 16 casas), Clareira (24), Quatro pedras (21), Passagens (23), Ampulheta (19), Jardim em cruz (17), Recantos (19). Os novos mapas usam uma malha máxima de 5×5, conectada e simétrica em 180 graus. Paredes e recortes interrompem o estímulo antes de qualquer receptor. A resolução continua simultânea por snapshot, sem cadeias nem devolução de sementes. Oito sementes por jogador e duas rodadas mantidas. Como existem pelo menos 16 casas jogáveis e cada plantio ocupa no máximo uma nova casa, sempre há espaço para o 16º plantio, mesmo sem colheitas.

## Persistência e isolamento

Identidade canônica `mapId` + `mapVersion`; versões desconhecidas, identidade incompleta e tabuleiros adulterados são rejeitados por replay. Saves antigos sem identidade de mapa são clássicos e mantêm esquema/conteúdo exatos, inclusive após histórico e reinício. Mapa persiste em segunda rodada, reset e revanche; alternância de iniciador mantida.

Alterações de produção limitadas a `dist/broto/{engine,maps,ui}.mjs`, `dist/broto/ui.css`, `dist/cerco/{engine,maps,bot,ui}.mjs`, `dist/cerco/ui.css`. Worker e serviço CERCO reutilizados sem alteração. Os demais onze jogos, a plataforma compartilhada e todos os assets são idênticos por hash ao baseline.

## Verificação

- 77 testes Node aprovados: `node --test tests/broto*.test.mjs tests/cerco*.test.mjs tests/versus-maps-integration.test.mjs`.
- 1.400 duelos completos de BROTO, 44.800 plantios, ambos iniciadores; sem travamento. Oráculo independente de raios e transações.
- 2.800 partidas completas de CERCO, ambos iniciadores, conservação de seis peças e obstáculos, término finito; bots em todos os mapas e dificuldades. Simulações não são prova de equilíbrio competitivo ou de jogo perfeito.
- Comparação de transições clássicas com os motores reais extraídos do commit baseline; save/replay/undo/redo/versões/muros inválidos.
- Navegador real: 525 checagens em 14 mapas × 1366/390/320 px. Seleção/miniatura, geometria, prévia sem mutação, partida completa, duas rodadas, resultado, recarga, histórico, revanche e reinício por modal.
- Menor dimensão clicável: 45,390625 px. Sem overflow horizontal; confirmar sempre após o tabuleiro.
- 49 checagens complementares: worker real CERCO, recomendações legais no treino, cancelamento ao sair, reset dos 14 mapas e 1.176 casos de teclado nas bordas/obstáculos.
- Inspeção visual de ambos os jogos em 320 px e interação nativa de plantio/movimento. Paredes e recortes distintos; peças e indicadores permanecem dentro das células.
- Erro de escopo na mensagem de prévia CERCO foi encontrado pelo navegador, corrigido e coberto por teste de regressão antes da publicação.

Limites: mobile validado em iframes responsivos no navegador real, não em aparelho físico. Não houve estudo de equilíbrio humano; bots continuam heurísticos com orçamento limitado. Fixtures de QA removidos de `dist` antes de empacotar.

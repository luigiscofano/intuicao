# Evidência de validação · expansão lógica

## Método

Cada puzzle de campanha é validado pelas regras e recebe contagem de soluções exata, interrompida apenas ao encontrar uma segunda solução. Somente instâncias únicas entram no catálogo. A resposta de referência não decide a vitória.

- ELO: enumeração de uma posição por região, grafo de visibilidade, graus, conectividade e cruzamentos. As 200 fases também são confrontadas com enumeração independente sem as podas do motor.
- PRUMO: enumeração de todos os subconjuntos conectados e equilibrados, seguida de cobertura exata. Um oráculo independente confere os subconjuntos 4 × 4, incluindo peças assimétricas.
- PACTO/NEXO: propagação por tabelas válidas de cotas e vizinhança, busca exata quando necessária, contagem até duas. Um verificador independente confere cotas e regras locais.
- DESVIO: minimax memoizado, confrontado com oráculo independente em 25.868 posições pequenas exaustivas. As posições D-00 e D-01 e suas continuações reproduzem o PDF.

## Catálogo e dificuldade

Há 200 níveis por puzzle novo, sem equivalências por rotações/reflexões. Nos jogos de símbolos, renomeações também contam como equivalência. ELO ainda deduplica regiões ignorando pistas; PRUMO deduplica apoios e partições. A auditoria de símbolos também exige diversidade de soluções-base e emparelhamentos.

A ordem é técnica, não uma promessa sobre a percepção de cada pessoa. Perfis registram técnicas, refinamentos/dependências ou decisões de busca. ELO e PRUMO registram score explícito: primeiro os casos que fecham pelas técnicas locais implementadas, depois a faixa das técnicas, rodadas e eliminações; busca só desempata. São 179 ELO e 77 PRUMO fechados por essa propagação. Os demais podem ter soluções humanas melhores que as técnicas implementadas, portanto isso não prova necessidade de adivinhar. Cada eliminação e jogada local foi confrontada com soluções exatas em todos os níveis e estados parciais. Ainda não houve calibragem com jogadores independentes.

## Regressões de interface

Os testes de eventos conferem:

- 200 opções em cada tela de seleção e navegação entre níveis;
- lápis separado da resposta, marcas de descarte, pistas fixas, desfazer/refazer;
- ausência de vitória automática durante a edição e confirmação explícita;
- solução completa inserida pelos mesmos eventos de clique da interface;
- restauração do progresso, rejeição de histórico corrompido e importação inválida;
- duelo: turnos, prévia, bot, replay, cancelamento de timers, mapas personalizados e revanche;
- 4.802 verificações de efeitos nos 800 puzzles e no duelo;
- histórico imutável, diário determinístico, armazenamento indisponível e métricas limitadas;
- importação do app completo mantendo a seleção dos jogos originais.

As 11 suítes antigas continuam sendo executadas contra o código atual. Elas cobrem os 300 níveis originais, física, curvas, buracos, luz, portais, caminhos, controles e animações.

## Limites da evidência

Testes de DOM/relógio são simulações, não uma sessão visual em navegador. As pranchas SVG/PNG conferem a geometria emitida dos tabuleiros, mas não substituem layout, toque e foco num navegador real. A revisão visual em navegador e os testes com jogadores permanecem necessários antes de afirmar qualidade humana validada.

Os arquivos completos de testes, geradores, soluções de auditoria e relatórios estão na cópia do projeto. Execute bash expansion-tests/run-all.sh a partir da raiz correspondente. Não há serviço externo necessário para os motores.

## Universo finito do NEXO clássico

Dois enumeradores independentes concordaram: depois de normalizar os três símbolos no canto superior esquerdo e seus dois vizinhos, existem 1.162 grades completas. Ao identificar rotações, reflexões e renomeações, restam exatamente 183 classes. O segundo enumerador não importa o motor do jogo: constrói as 90 permutações válidas de cada linha e verifica cotas de coluna e vizinhanças.

Por isso, 200 desenhos finais não equivalentes seriam impossíveis sem mudar as regras clássicas. Os 200 puzzles da campanha usam todas as 183 classes; somente 17 classes reaparecem uma vez, com conjuntos de pistas não equivalentes. São 200 problemas de dedução distintos, não 200 classes de respostas finais. A limitação é matemática e está documentada, não escondida por rotações ou símbolos trocados.

## Reprodutibilidade

Os scripts e sementes fornecidos reproduzem o pipeline completo de geração. Nos níveis geométricos, o campo seed registra o estado do gerador no pipeline; não é apresentado como comando que reconstrói isoladamente uma fase sem as etapas anteriores. O catálogo e as soluções de auditoria estão incluídos para verificação direta.

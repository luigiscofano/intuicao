# REPASSE — implementação e validação

Data: 25/10/2026. Projeto: Intuição. Base de preservação dos jogos existentes: `2a528fcf4e846576c9bb9b89864153bfb4e03a86`.

## Resultado entregue

REPASSE foi integrado como o oitavo experimento do Intuição. A implementação inclui motor determinístico, campanha materializada de 500 níveis, modo Endless com geração de desafios, desafio diário, ajuda contextual, retomada, histórico completo e editor/importação JSON. A distribuição, as regras e as três estreias seguem o documento solicitado.

Uma retirada é uma transação: a peça desaparece e seu valor atual inteiro é enviado uma vez por direção. O repasse atravessa vazios, para no primeiro receptor presente e só alcança a caixa da borda se não encontrar receptor. Receber não retira a peça nem dispara outra emissão. A vitória exige grade vazia e todas as caixas exatamente nas metas. Não há pontuação fictícia por menos retiradas.

## O que foi reutilizado e preservado

Foram reutilizados os cartões de nível em squircle, o cabeçalho, a navegação, a seleção, as abas Desafios/Endless, os painéis de regras e opções, o diálogo de reinício, a celebração de vitória, a informação do jogo e o padrão de dicas/gabarito. Modo livre e desafio diário aparecem lado a lado. A partida informa o número do nível e oferece as setas de navegação, sem barra ou seletor de fase. A seleção não possui filtro de dificuldade.

As alterações compartilhadas se limitam à inclusão do oitavo jogo, suas informações e a extensão dos seletores existentes ao novo contêiner. Um teste compara os estilos compartilhados com a base depois de retirar as novas ramificações de REPASSE. Os motores, catálogos, recursos visuais e namespaces de progresso dos sete jogos anteriores permanecem preservados. O progresso novo usa `intuicao.repasse.v1`.

## Campanha auditada

| Critério | Resultado |
|---|---:|
| Fases materializadas, com IDs consecutivos | 500 |
| Capítulos de 25 fases | 20 |
| Básico / Intermediário / Avançado / Mestre | 200 / 100 / 100 / 100 |
| Somente configurações originais / expandidas | 350 / 150 |
| Estreia de uma seta | 201 |
| Estreia de duas setas perpendiculares | 276 |
| Estreia de quatro setas | 351 |
| Fase 500 | Somente peças originais |
| Soluções certificadas reproduzidas | 500/500 |
| Análises exatas de ordens vencedoras concluídas | 500/500 |
| Famílias de raciocínio | 14 |
| Retomadas distribuídas ao longo da campanha | 76 |
| Máximo de peças / dimensões | 10 / 4 × 4 |
| Maior valor nas soluções certificadas e metas | 37 |

A distribuição de originais e expandidas foi conferida capítulo a capítulo. As estreias contêm 3, 5 e 4 peças, respectivamente, sempre com exatamente uma peça da configuração apresentada. Todas as direções são cardeais; as duas setas perpendiculares não sugerem movimento diagonal.

Há 498 classes completas e 496 topologias normalizadas. As equivalências didáticas são explícitas: 1/2 apresentam orientações, 3/5 apresentam travessia de vazio e 7/8/9 usam a mesma estrutura com metas e relações diferentes, conforme o Exemplo B. Não se afirma que existam 500 topologias diferentes.

A auditoria independente usa um segundo simulador, escrito por percurso das casas, sem reutilizar a transição ou a busca da produção. Em 64 fases representativas dos 20 capítulos, das 14 famílias e das estreias, percorreu 8.360.434 nós e confirmou contagens, primeiras e últimas retiradas e precedências obrigatórias. A fase 500 tem 561 ordens vencedoras e 27 precedências obrigatórias; o jogo aceita qualquer ordem vencedora.

## Endless validado

O modo livre cria definições novas com seed, versão e parâmetros. Não escolhe índices da campanha. Cada desafio recebe uma solução reproduzida pelo mesmo motor e é salvo integralmente, incluindo histórico, valores e caixas. Reiniciar preserva a definição; novo desafio solicita outra. O gerador controla assinaturas e famílias recentes, alterna retomadas e introduz uma configuração desconhecida por vez.

Geração e análise usam workers com canais separados, cancelamento, limite de trabalho e descarte de respostas antigas. Há pré-carregamento do próximo desafio e 80 reservas certificadas, independentes entre si e da campanha. A origem de uma reserva é identificada na definição.

Uma amostra de 120 desafios sequenciais, com histórico recente ativo e as oito faixas de dificuldade, produziu 120 assinaturas diferentes. Todos eram solucionáveis e reproduzíveis com os mesmos parâmetros. Foram verificados também indisponibilidade de worker, tempo esgotado, certificado inválido, cancelamento de tarefas e preservação do tipo da seed.

## Testes automatizados

| Arquivo | Casos/grupos aprovados | Escopo |
|---|---:|---|
| `tests/repasse-engine.test.mjs` | 24 | Regras, atomicidade, inteiros exatos, exemplos, busca e dicas |
| `tests/repasse-catalog.test.mjs` | 10 | 500 definições, alternativas, distribuição, reservas e geração |
| `tests/repasse-ui-state.test.mjs` | 10 | Histórico, retomada, isolamento e idempotência das conclusões |
| `tests/repasse-service.test.mjs` | 10 | Workers, certificação, cancelamento, timeout e reservas |
| `tests/repasse-integration.test.mjs` | 4 | Navegação e preservação dos sete jogos existentes |
| **Total** | **58** | Sem falhas na versão entregue |

Além desses testes, o script `tests/repasse-independent-audit.mjs` reproduziu a auditoria independente. As verificações de sintaxe e `git diff --check` passaram. A contagem de 58 não inclui os milhares de replays/estados analisados dentro desses grupos.

## Verificação no navegador

Os seguintes fluxos foram exercitados na prévia real do site:

- Seleção com 500 cartões e 20 capítulos; ausência de filtros ou seletor de fase; ações da seleção lado a lado, inclusive a 320 px.
- Retirada com Enter, foco por setas, prévia de recebimento e modo explícito de inspeção. Uma ativação comum retira diretamente a peça.
- Vitória no nível 1; desfazer, recarregar com o futuro de refazer preservado e refazer até a vitória.
- Exemplo B na fase 7, resolvido pela ordem alternativa C → A → B. Retirar B primeiro foi reconhecido como impossível sem haver excesso em nenhuma caixa; desfazer recuperou a tentativa.
- As três camadas de dica: observação de uma região, explicação de um repasse e indicação de uma retirada com continuação certificada. A ação de aplicar a terceira dica retirou somente aquela peça.
- Resoluções completas das estreias 201, 276 e 351. A prévia da peça de quatro setas, após receber, mostrou quatro envios de +4 e manteve o receptor presente durante a inspeção.
- Resolução completa da fase 500: 10/10 peças retiradas e 14/14 caixas exatas. Os botões de próximo nível estavam desabilitados no final da campanha.
- No Endless, uma retirada seguida de recarga preservou exatamente a definição, a seed, os valores, as caixas e a opção de avanço. Reinício manteve a mesma definição; novo desafio mudou a definição e a seed sem contabilizar vitória.
- Gabarito liberado após três confirmações, solução a partir do estado atual e aplicação completa. A vitória contou uma vez; desfazer, refazer e recarregar mantiveram uma conclusão.
- Desafio do dia, informação do jogo e abertura/fechamento do painel lateral de regras.
- Editor: uma fase válida teve seu certificado reproduzido; uma peça de valor zero foi rejeitada com mensagem específica, preservando o desafio aberto.
- Navegação entre REPASSE, Reflexos, ELO e SINTONIA, sem sobreposição de telas; a sessão anterior de SINTONIA foi retomada durante a inspeção inicial.

O layout foi conferido em desktop e em duas molduras reais do mesmo site, com 320 e 390 px, no navegador Chromium. Essas molduras exercitam o CSS responsivo, mas não equivalem a testes em aparelhos físicos ou em todos os navegadores.

Em 390 px, a grade de 4 × 4 com as 16 caixas coube sem rolagem horizontal. Em 320 px, o conteúdo manteve alvos de pelo menos 44 px e rolou dentro da área do tabuleiro, sem alargar a página. A região de rolagem possui foco, nome acessível e orientação textual; a tecla → alcançou as caixas da direita. O valor 14, entre duas setas laterais em uma célula de 44 px, apresentou separação positiva de aproximadamente 1,3 px dos dois lados, sem colisão. Valores de três ou mais dígitos ampliam a célula.

Capturas conferidas:

- `docs/repasse-desktop-1792949728100.jpg`
- `docs/repasse-mobile-1792949692761.jpg`

A página temporária usada para as molduras de QA foi removida de `dist` antes do empacotamento.

## Limites reais

A dificuldade é editorial e apoiada por medidas estruturais; não houve calibração humana das 500 fases. Conceitos observados em uma solução certificada e precedências obrigatórias são evidências diferentes. A análise não prova que toda pessoa precise formular mentalmente a mesma descoberta, nem que toda ordem vencedora apresente o mesmo motivo semântico.

O espaço de desafios do Endless é finito. Sementes diferentes podem coincidir, especialmente em fases pequenas sem histórico. O controle de recência e as reservas reduzem repetições, sem prometer unicidade infinita.

Os valores máximos reportados descrevem soluções certificadas e metas, não todas as tentativas perdedoras possíveis. O motor valida limites conservadores de aritmética exata e não trunca os valores para adequá-los ao layout. Progresso e métricas permanecem locais ao navegador, como no padrão do site.

## Documentação complementar

- `docs/repasse-catalogo.md`: tabela das 500 fases.
- `docs/repasse-level-design.md`: autoria, famílias, progressão e geração.
- `docs/repasse-auditoria-independente.md`: método e resultados da segunda auditoria.
- `docs/repasse-engine.md`: regras, busca e limites aritméticos.
- `docs/repasse-ui.md`: interface, persistência, acessibilidade e trabalho assíncrono.
- `tests/repasse-campaign-audit.json`: resultados estruturados do catálogo.

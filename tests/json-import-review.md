# JSON, modos e barra de ações: revisão de integração

## Escopo autorizado

Base publicada: `1f6c0bc7d67599ded7e8da227f92aa6435f42f6d`.

- Importação local JSON nos seis jogos, ao fim da seleção de níveis/mapas; arquivo e texto, exemplos, esquema, erros em português e validação antes de mudar a partida.
- Remover somente os botões Continuar partida e Tutorial do PDF e palavras dos títulos indicadas nas referências. Preservar separador `·`, informação `i`, conteúdo, documentos e progresso.
- Atalho direto para Endless, reutilizando configuração/seed/sessão; partida de campanha e custom preservadas.
- Ordem final: desfazer, refazer, Reiniciar, regras, opções avançadas. Reutilizar histórico da coleção e adicionar histórico efêmero limitado aos originais.
- Aproximar Checar em ELO/PRUMO/PACTO: reduzir reserva vazia de resultado de 86 para 24 px; reserva de vitória segue 86 px.

Flor branca e partículas verdes do About são camadas separadas, com seus próprios responsáveis, manifestos e testes.

## Fronteira de confiança

`level-json-common.mjs` recusa tamanho/profundidade/quantidade excessivos, valores não finitos, arrays esparsos, protótipos especiais, acessores e chaves perigosas. Nenhum `eval`, importação de código ou URL externa é usado.

Os importadores normalizam apenas campos de regras, geram IDs personalizados por conteúdo e desconsideram flags externas de progresso/modo. Soluções de coleção são recalculadas; zero, múltiplas ou busca inconclusiva não são confundidas. Workers de coleção são terminados em cancelamento ou prazo, e resultados antigos não podem substituir navegação ou edição nova.

Reflexos verifica a solução de ângulos fornecida, sem alegar unicidade. Corte verifica área e uma solução dentro da tolerância normal. Os catálogos e motores globais não foram modificados.

## Saves e histórico

- Os saves e conclusões existentes da coleção permanecem no mesmo formato. Importar custom não apaga a pilha da campanha anterior. Gabarito custom não gera conclusão de campanha.
- Originais acrescentam snapshots em `intuicao.campaign.original.v1` para retornar após troca de modo, e até 20 sessões custom em `intuicao.custom.original.v1`. Não migram nem substituem a campanha, o progresso de gabarito ou o armazenamento Endless anterior.
- O histórico original contém apenas estado editável, modo de corte, rascunhos e seleção; é limitado a 80 entradas e não persiste desnecessariamente. Não desfaz tentativas, assistência ou conclusões. Arrastos/campos contínuos são atômicos; cancelamento restaura; edição não avalia resultado nem revela raios.

## Revisões e testes

- Revisão independente dos quatro importadores de coleção identificou três bugs de contexto/identidade e um status ocupado obsoleto. Todos foram corrigidos com regressão: colagem editada durante Worker, editor de desafio diário, renomeação preservando desbloqueio e cancelamento limpando status.
- Revisão independente de integração executou 11 suítes e não encontrou outro erro confirmado de saves/transições. Identificou um caso adversarial de lasca quase degenerada em Corte que exige rejeição conservadora antes da primeira avaliação curva. Correção: rejeição de lascas e estimativa conservadora de segmentos antes de qualquer curva, cobrindo os controles futuros e snapshots. `original-json-budget-tests.mjs` executa 19 variantes em subprocesso com prazo externo de 3 s; as variantes são recusadas em milissegundos, enquanto Reta mantém a geometria exata.
- `json-import-ui-tests.mjs`: importação nas quatro coleções, localização, erros atômicos, ausência de progresso falso, referência calculada, gabarito, reimportação, seeds, cancelamento/stale e ordem final.
- `original-json-tests.mjs`: validação dos originais e round-trip das 200 fases de Reflexos e 100 de Corte.
- `original-json-ui-tests.mjs`, `original-json-resume-tests.mjs`, `original-history-ui-tests.mjs`: ambos jogos em campanha/custom/Endless, histórico, cancelamento, confirmação e preservação de assistência.
- `collection-json-tests.mjs`: limites, exemplos, 400 exports PRUMO/PACTO, mapas DESVIO e 87 ELO compatíveis com o limite do editor 7×7; resultados zero/múltiplo/inconclusivo e Workers.
- `rules-toolbar-tests.mjs`: todos seis, ordem DOM, uma única instância, regras/ARIA/foco, reset, política competitiva DESVIO e estilos responsivos sem sobreposição.
- `json-import-preservation-tests.mjs`: restaura exatamente a base publicada, rejeita alteração não autorizada, confere todos os novos módulos/documentação/exemplos. Manifestos antigos não são regravados.
- Relatório agregado: `json-import-suite-results.json`, produzido por `node tests/run-json-import-suite.mjs`. O relatório mantém falhas, não as omite.

## Falha histórica conhecida

`curiosity-brand-tests.mjs` exige 10 folhas decorativas, mas a própria base publicada contém 16 nós `.platform-leaf`. Isso já existia antes desta mudança. Não houve alteração das folhas neste escopo nem ajuste oportunista da expectativa. Não declarar a suíte inteira verde enquanto essa divergência estiver registrada.

## Limites e QA de publicação

Testes de UI usam DOM determinístico, não um navegador real. Ainda é necessário conferir no publicado: localização dos importadores após o último nível; arquivo/colagem e erro de jogo incorreto; toolbar e ativação pelo teclado; undo/redo; reset cancelar/confirmar; campanha→Endless→retorno; custom→Endless→reimportar; Checar perto do mapa sem recorte de pistas; ícones `i` e textos dos títulos; ausência de overflow.

A infraestrutura de QA disponível alcança o publicado em viewport 1180, não localhost. Resize/mobile reais não estão comprovados; os contratos CSS responsivos e alvos de 44 px são verificação estrutural, não substituem teste de dispositivo.

Importação ELO continua limitada a 7×7 e não abrange todas as grades grandes da campanha. PRUMO até 6×6, PACTO8×8 e DESVIO até16 casas; a busca pode recusar uma fase válida por prazo. Nenhum importador certifica dificuldade humana. Os exemplos são didáticos e deliberadamente simples.

## Resultado final antes da publicação

Em 2026-10-25, a execução completa terminou com **75 de 76 execuções aprovadas**. A única falha é `curiosity-brand-tests.mjs`, a divergência histórica de folhas descrita acima. Todas as suítes novas, a cadeia de preservação, os jogos/campanhas, o About verde e a flor branca passaram. `git diff --check` e a sintaxe dos dois módulos de UI estão limpos. A revisão independente confirmou a correção do P1 de Corte; a repro foi recusada em aproximadamente 2 ms.

Estado: fonte congelada para publicação pelo responsável e QA de interação/layout no site publicado. Nenhuma confirmação de navegador real está implícita neste resultado.

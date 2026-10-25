# Reflexos v4: campanha de 500 níveis

Registro de desenvolvimento da revisão de 25/10/2026. Este documento separa requisitos, evidências de autoria e resultados automatizados da integração. Não é uma declaração de publicação ou de teste com jogadores.

**Estado: 500 níveis compilados e validação automatizada concluída.** O [relatório do motor e da distribuição](validation-report.json) e o [relatório de preservação](progress-validation.json) estão aprovados dentro de seus escopos. A inspeção em navegador real ainda não foi executada nesta etapa. A regressão geral final fica em relatório separado (`regression-report.json`), sem pressupor aprovação neste documento. Os testes históricos da v3 não foram renomeados nem ampliados retroativamente para representar 500 níveis.

## 1. Escopo e estrutura

A intervenção autorizada é exclusivamente no conteúdo e na organização de Reflexos, nas referências necessárias da campanha e nas dicas específicas das fases. Não autoriza reescrever ou refatorar o motor, alterar regras, tolerâncias, controles, design, sprites, animações, sons ou outros jogos.

| Faixa | Números de exibição | Quantidade exigida | Papel editorial |
|---|---:|---:|---|
| Básico | 1–200 | 200 | Apresentar os recursos e consolidar escolhas entre trajetos |
| Intermediário | 201–300 | 100 | Relacionar decisões e revisar soluções locais |
| Avançado | 301–400 | 100 | Antecipar consequências, inclusive distantes |
| Mestre | 401–500 | 100 | Combinar deduções e, quando pertinente, hipóteses curtas |
| Total | 1–500 | 500 | Progressão por relações lógicas |

Subdivisões didáticas são permitidas somente no Básico. As três faixas superiores devem misturar conceitos. Blocos de dez ou 50 níveis são recortes de auditoria, não capítulos ou novos componentes visuais.

Com Corte certo (100), ELO (200), PRUMO (200) e PACTO (200), a coleção fica com **1200 níveis de campanha**. DESVIO continua sendo um duelo, fora dessa soma. NEXO e Equilíbrio permanecem retirados. Veja o [catálogo da revisão](../../CATALOGO-ATUAL.md).

### O que permanece igual

- Propagação, reflexão, colisões, contatos e sobreposições são avaliados pelo motor existente.
- Portais conservam pareamento, seletividade, orientação e comportamento por face. O salto não cria um segmento físico entre os extremos.
- Fontes, alvos e o término dos trajetos conservam seu comportamento. Não há retenção de luz nem ordem temporal de solução criada para uma fase.
- A rotação e a precisão dos controles não são convertidas em escolhas discretas. Alternativas nomeadas nas fichas são uma ferramenta de análise, não uma regra nova.
- Não é obrigatório usar todos os espelhos ou portais, reproduzir o gabarito nem cumprir tempo limite.
- Dicas e gabaritos continuam no fluxo existente. Fichas, matrizes, contraprovas e explicações de atalhos não devem aparecer na interface normal.

Na autoria nova foram mantidos tabuleiros 800×460, espelhos de comprimento 124,8 e alvos de raio 22, sem criar peças. As margens angulares e os limites geométricos passaram pela verificação automatizada; três sobreposições visuais legadas foram aceitas explicitamente em revisão estática, conforme a seção 2.1. A precisão de entrada e a legibilidade em navegador real ainda não foram verificadas nesta etapa. Esses parâmetros não são novos requisitos impostos ao jogador.

## 2. Identidade estável e preservação

O identificador interno não é o número exibido na seleção.

1. Uma fase reaproveitada sem redesenho conserva seu ID, mesmo mudando de faixa ou posição.
2. Uma fase nova ou redesenhada recebe identidade de versão própria e relação documental com sua base, quando existir.
3. Reutilizar um número não transfere conclusão, tentativas, assistência ou rascunho para outro desafio.
4. Registros históricos, preferências, acesso adquirido e dados dos demais jogos não devem ser apagados nem globalmente reiniciados.
5. Ausência de um ID no catálogo ativo não autoriza apagar seu registro histórico.

É necessário distinguir evidências de conclusão de rascunhos e de gabaritos desbloqueados. Um estado salvo, três erros ou a aplicação de um gabarito não provam vitória. A preservação não deve inventar conclusões antigas que nunca foram persistidas. O novo registro de conclusão e retomada por ID, quando usado, é separado das respostas, rascunhos, níveis personalizados e modo livre.

| Conferência | Resultado integrado |
|---|---|
| Fases anteriores inventariadas | 200 definições em [legacy-200.json](legacy-200.json), com digest de origem conferido |
| Fases inalteradas mantidas com o mesmo ID | 158, com conteúdo de puzzle idêntico nos campos comparados; [mapa completo](legacy-map.json) |
| Fases redesenhadas/versionadas | Dois reparos de enquadramento: antigas 180 e 190, detalhados abaixo |
| Identidades novas no catálogo | 342, incluindo os dois reparos; isso não equivale a 342 famílias lógicas inéditas |
| Registros fora do catálogo preservados | 42 IDs antigos não selecionados; definições arquivadas, sem exclusão ou reassociação de chaves |
| Reordenação, retomada, erros e assistência por ID | Testes de preservação e integração aprovados com armazenamento simulado |
| Preferências, outros jogos, editor e modo livre | Isolamento das chaves aprovado; comparação de 97 arquivos de execução/visual aprovada; regressão geral final em relatório separado |

A comparação de conteúdo usa `objects`, `sources`, `targets`, `portals`, `solution`, `sourceAngle`, `target` e `requiredBounces`. Apresentação e número de campanha podem mudar. Houve 28 reclassificações editoriais na seleção, sem usar o número anterior como identidade. Nenhum teste acessou o armazenamento real de um jogador.

### 2.1. Exceções visuais e reparos legados

| Definição antiga | Número atual / ID | Tratamento registrado |
|---|---|---|
| 121 | 362 · `light-v3-121` | Conteúdo e ID preservados. Sobreposição parcial entre a ponta do terceiro espelho e o aro de um portal na referência. |
| 123 | 387 · `light-v3-123` | Conteúdo e ID preservados. Mesma espécie de sobreposição parcial de ponta e aro, no par comparativo com a antiga 121. |
| 138 | 357 · `light-v3-138` | Conteúdo e ID preservados. A ponta do terceiro espelho aproxima-se/sobrepõe-se parcialmente ao aro W. |
| 180 | 378 · `light-v4-legacy-180-labels` | Translação uniforme de 5,5 px para cima, para enquadrar os rótulos de portal. ID novo; original arquivado. |
| 190 | 313 · `light-v4-legacy-190-labels` | Mesma correção de enquadramento de 5,5 px para cima. ID novo; original arquivado. |

As três sobreposições foram aceitas em revisão visual estática por não ocultarem centros, letras, fontes, alvos ou controles. Os casos físicos e as margens passaram. Não se declara folga visual perfeita nem se muda a colisão para acomodá-las. Os dois reparos preservam o repertório e não são contados como novas arquiteturas. Seus históricos antigos não são transferidos automaticamente para os IDs novos.

O armazenamento continua local ao navegador. A revisão não promete sincronização entre aparelhos nem recuperação após o usuário limpar os dados do site.

## 3. Critérios de composição e distribuição

A dificuldade depende da quantidade e profundidade de decisões relacionadas, da necessidade de comparar alternativas e da distância entre escolha e consequência. Tamanho do mapa, número de peças, percurso longo, cliques, precisão angular ou tempo do solver não são provas de dificuldade.

Os 16 conceitos são: última curva; alvo nas costas; duas janelas; falsa simetria; feixe já certo que precisa ser revisto; uma decisão puxa três; tabuleiro quase sem paredes; troca de lados; salto invisível; portal escolhido pela utilidade da saída; problema em outra sala; sair para voltar; arquipélago; quatro decisões; hipótese contraditória; detalhe que muda as dependências.

Um conceito só conta quando uma relação concreta da fase o demonstra. Ter um portal não demonstra comparação de saídas; ter paredes não demonstra janelas; três cores não demonstram propagação; uma colisão direta não é uma cadeia de hipótese. Uma combinação exige dependência entre conceitos, não dois problemas independentes no mesmo tabuleiro.

### Metas e medições do catálogo compilado

| Métrica | Critério | Resultado do catálogo final |
|---|---|---|
| Total Reflexos | Exatamente 500 IDs distintos | 500 |
| Quantidade por faixa | 200 / 100 / 100 / 100 | 200 / 100 / 100 / 100 |
| Total da coleção | 1200 níveis de campanha | 1200; DESVIO fora da soma |
| Ideia 7 por faixa | Pelo menos 80 / 40 / 40 / 40 | 136 / 97 / 90 / 76 |
| Ideia 7 no total | Pelo menos 200 conflitos relevantes | 399, com contraprova de conflito certificada |
| Ideia 7 inteiramente sem paredes | Pelo menos 100 fases | 327: 119 / 68 / 67 / 73 |
| Todos os mapas sem paredes | Informar por faixa | 335: 127 / 68 / 67 / 73 |
| Layout com poucas paredes | Informar por faixa | 109: 54 / 29 / 23 / 3 |
| Layout compartimentado | Informar por faixa | 56: 19 / 3 / 10 / 24 |
| Dois ou mais princípios relacionados | Pelo menos 70 / 80 / 90 nas faixas superiores | 135 Básicos; 99 / 100 / 100 nas superiores; total 434 |
| Recorrência por faixa | Os 16 conceitos em cada faixa | 16/16 nas quatro faixas |
| Recorrência nos blocos superiores | Os 16 conceitos em cada bloco de 50 | 16/16 em 201–250, 251–300, 301–350, 351–400, 401–450 e 451–500 |
| Repetição consecutiva | Evitar três principais iguais seguidos | Nenhuma sequência de três |
| Variedade em cada sequência de dez | Ao menos cinco principais após as introduções | Todas as janelas móveis iniciadas após a fase 30 atendem |
| Ideia 7 em cada sequência de dez | Ao menos três após as introduções | Todas as janelas móveis iniciadas após a fase 30 atendem |
| Duplicação geométrica exata | Comparar cores, reflexões, rotações e translações | Nenhuma duplicata segundo a normalização do auditor |

A contagem de combinações exige dois ou mais conceitos e aprovação editorial explícita de sua relação. Duas fases básicas com múltiplas tags, mas sem essa aprovação, ficaram fora da contagem. O campo de aprovação registra uma decisão de revisão, não uma prova automática de causalidade.

Há seis grupos com assinaturas lógicas textuais iguais no [relatório de distribuição](distribution.json), incluindo consolidações legadas e pares comparativos. Ausência de duplicata geométrica não demonstra, sozinha, novidade pedagógica. A revisão de dependências e as distinções de cada ficha continuam relevantes.

### Recorrência dos 16 conceitos

| Conceito | Básico | Intermediário | Avançado | Mestre |
|---|---:|---:|---:|---:|
| 1 · Última curva | 64 | 30 | 36 | 28 |
| 2 · Alvo nas costas | 14 | 3 | 2 | 2 |
| 3 · Duas janelas | 2 | 2 | 7 | 22 |
| 4 · Falsa simetria | 8 | 6 | 5 | 3 |
| 5 · Revisar o feixe já certo | 115 | 63 | 76 | 76 |
| 6 · Uma decisão puxa três | 6 | 15 | 25 | 98 |
| 7 · Tabuleiro quase sem paredes | 136 | 97 | 90 | 76 |
| 8 · Troca de lados | 33 | 17 | 21 | 39 |
| 9 · Salto invisível | 46 | 49 | 48 | 61 |
| 10 · Portal escolhido pela saída | 6 | 6 | 25 | 31 |
| 11 · Problema em outra sala | 9 | 10 | 34 | 34 |
| 12 · Sair para voltar | 2 | 2 | 2 | 5 |
| 13 · Arquipélago | 1 | 3 | 11 | 2 |
| 14 · Quatro decisões | 20 | 24 | 59 | 98 |
| 15 · Hipótese contraditória | 1 | 2 | 2 | 87 |
| 16 · Um detalhe muda tudo | 7 | 6 | 6 | 11 |

Para a ideia 7, a evidência deve incluir uma configuração plausível em que cada cor alcance seu alvo isoladamente e o conjunto apresente incompatibilidade real, além de uma solução conjunta. Um mapa de uma única cor sem paredes não preenche essa meta. Para o conceito 16, identificar base e variante e verificar uma alteração relevante nas dependências; não contar a base apenas porque será comparada depois.

### Exemplos efetivamente selecionados por faixa

| Faixa e fase | ID | Combinação e dedução concreta |
|---|---|---|
| Básico · 29, “Parecidas, mas diferentes” | `light-v4-deduction-pair-00-filter` | Conceitos 4, 7, 14 e 16. Comparada à base na fase 28, a entrada superior deixa de aceitar dourado. A diferença de filtro entre metades aparentemente simétricas modifica as rotas compatíveis e exige reajustar a última curva azul. |
| Intermediário · 213, “Do outro lado 34” | `light-v4-deduction-open-035` | Conceitos 11, 7 e 5. Uma rota dourada válida isoladamente pelo portal colide perto da saída em (470; 99,5), a mais de 300 unidades da entrada. A decisão local precisa considerar a aproximação distante das outras cores. |
| Avançado · 301, “A curva depende da escolha” | `light-v4-deduction-four-05` | Conceitos 14, 7, 1 e 5. Duas incidências douradas exigem orientações diferentes do quarto espelho; trocar a primeira decisão sem adaptar a última curva perde o alvo, e os pares restantes precisam acomodar as outras cores. |
| Mestre · 488, “As janelas da última curva” | Fase 488 · `light-v4-deduction-master-window-1-1` | Conceitos 3, 14, 15, 1 e 6. Duas restrições de visibilidade, chegada azul condicional e hipótese triangular se relacionam, como detalhado a seguir. |

Os IDs, posições, casos e justificativas completos estão em [records.json](records.json); as decisões de seleção estão em [selection.json](selection.json).

## 4. Exemplos geométricos documentados

As **22 composições de duas janelas e as duas variantes de filtro** foram selecionadas na faixa Mestre e passaram pela reprodução integrada de suas soluções e casos. As fichas estão em [records.json](records.json), com evidências completas em [evidence-records.json.gz](evidence-records.json.gz) e trajetos recalculados em [replay-results.json.gz](replay-results.json.gz). A validação dos casos finitos não certifica unicidade contínua.

### Duas janelas ligadas à última curva

As 22 composições combinam duas divisórias com aberturas, uma rede de incompatibilidades entre três cores e um último espelho cuja orientação depende da chegada escolhida. A diversidade foi comparada pela rede de compatibilidades e pelo papel da decisão que recebeu esse último espelho, considerando permutações de cores e de alternativas. As 22 assinaturas conjuntas são distintas nesse critério; apenas mudar a largura ou a posição da abertura não foi contado como nova relação.

Em cada composição foram registrados dois ensaios independentes de remoção de divisórias. Um atalho chega ao alvo sem paredes e também com somente a outra divisória; a divisória examinada o intercepta. Isso demonstra a contribuição de cada abertura para a visibilidade **local**. Não demonstra que o atalho completaria simultaneamente todas as cores se as paredes fossem removidas.

| Exemplo | Geometria relevante | Relações demonstradas |
|---|---|---|
| Fase 488 · `light-v4-deduction-master-window-1-1` | Divisórias verticais em x=280 e x=500. Espelhos iniciais em (207,5; 152,5), (575,9; 119,4) e (418,6; 270,5); último espelho em (100,6; 326,4). | A primeira divisória corta a alternativa dourada que usa o espelho rosa; a segunda corta outra alternativa dourada que usa o espelho azul. A chegada azul determina a última orientação. |
| Fase 453 · `light-v4-deduction-master-window-5-1` | Divisórias verticais em x=290 e x=470. Espelhos iniciais em (215,5; 106,8), (607,1; 142,7) e (396,8; 260,8); último espelho em (647,5; 390,8). | A primeira corta uma alternativa rosa que usa o espelho dourado; a segunda corta uma alternativa azul que usa o espelho rosa. A rede restante tem duas alternativas nomeadas por cor. |

No primeiro exemplo, o domínio documentado contém três rotas douradas, duas azuis e duas rosas. A hipótese “dourada direta” só é compatível com a alternativa azul por portal, que exige a alternativa rosa por portal; esta é incompatível com a dourada direta. As três relações são necessárias para essa contradição no domínio examinado. Antes da hipótese, cada alternativa conserva algum suporte nos pares: não se trata de prolongar artificialmente a rejeição de uma rota que já era impossível sozinha.

A curva final azul também é condicional. Na chegada direta, a orientação de referência do último espelho é 17°; na chegada por portal, é −18,3°. Manter apenas o ângulo da chegada anterior não resolve os pares de alternativas documentados. A configuração conjunta de referência, na ordem dos quatro espelhos, é `[-72.9, -22.3, -50.4, 17]`. Ela exemplifica o acoplamento entre visibilidade, incidência final e decisões das outras cores; não é o único vetor permitido pelo jogo.

No segundo exemplo, as orientações finais de referência da chegada azul são 14,1° e 64,7°. As duas divisórias restringem cores diferentes e a rede é 2×2×2, em vez da rede 3×2×2 do primeiro exemplo. A diferença editorial não é um recolorir ou deslocar do mesmo mapa.

As seis composições iniciais também tiveram reprodução cruzada de casos, produtos de alternativas, trajetos isolados, pares e remoções de divisórias. As demais não devem herdar essa afirmação por pertencerem à mesma família. A reprodução integrada dos 22 registros consta do relatório final; ela não repete automaticamente todas as buscas angulares e análises causais arquivadas na autoria.

### Um único filtro muda o conjunto de escolhas

O par das fases **463 → 487**, `light-v4-master-001` → `light-v4-deduction-master-detail-1`, compara duas versões normalizadas com a mesma geometria, fontes, alvos, orientações iniciais, rótulos e pareamentos. A única alteração física é o filtro de entrada do portal A, `gold1a`, em (419,3; 41,8): de dourado para azul. A outra extremidade do par fica em (532,9; 405,9) e não é alterada.

O vetor `[-5.1, -18.5, 55.7]`, que resolve a base, não resolve a variante. Nesta, `[50.2, -44.5, -79.9]` é uma solução reproduzida. O domínio dourado perde a opção pela entrada alterada, mas a rede restante ainda contém duas alternativas douradas, três azuis e duas rosas; a hipótese documentada continua dependendo das três relações entre cores. Portanto, a comparação não se limita a constatar que o antigo raio parou: o conjunto remanescente de decisões também foi examinado.

O segundo par, nas fases **457 → 470**, `light-v4-master-002` → `light-v4-deduction-master-detail-2`, aplica a mesma espécie de mudança única a outra rede. O vetor da base `[57.4, -62.4, 78.2]` deixa de resolver a variante; `[-47.2, -62.4, 78.2]` resolve. Nesse caso, as três cores conservam duas alternativas nomeadas cada. As coordenadas e orientações iniciais devem permanecer iguais dentro de cada par ao integrar; uma correção visual comum precisa ser aplicada às duas versões antes da comparação.

Esses pares justificam o conceito 16 nas **variantes**. Não demonstram que todo caminho não nomeado foi eliminado, nem autorizam uma regra que exija a nova solução de referência.

## 5. Evidências por fase e limites das buscas

Uma ficha completa precisa guardar ID estável, posição, faixa, subdivisão apenas no Básico, recursos utilizados, conceito principal e complementares, layout, solução, dedução central, resultado de validação e relação com uma fase anterior. Contraprovas devem identificar o vetor completo, as fontes disparadas e os estados observados no motor real.

Separar, no mínimo, estas verificações:

1. **Solução e início:** reproduzir a configuração de referência e verificar que a configuração inicial não completa a fase inadvertidamente.
2. **Fontes em conjunto e separadas:** testar as ordens individuais aplicáveis, sem criar dependência temporal de vitória.
3. **Conforto e geometria:** verificar limites do tabuleiro, sobreposições físicas, rótulos, margens e perturbações angulares. Registrar exatamente as amplitudes e os cantos testados.
4. **Contraprovas e alternativas:** reproduzir trajetos locais, colisões conjuntas, saídas remotas, mudanças de filtro e remoções de paredes que sustentem os conceitos declarados.
5. **Atalhos:** procurar uso de outros espelhos, combinações não previstas e vizinhanças angulares. Documentar domínio, passo e condições mantidas fixas em cada busca.
6. **Diversidade e dificuldade:** comparar relações efetivas, eliminar rótulos sem evidência e revisar a faixa se um atalho realmente esvaziar o raciocínio planejado.

Uma tabela 3×2×2 cobre integralmente suas 12 combinações nomeadas, não todo o espaço contínuo de orientação. Uma malha de 0,25° com os outros controles fixos nas orientações nomeadas não equivale a variar todos os controles conjuntamente. Perturbações de ±0,5° verificam uma margem amostrada em torno da referência, não todo intervalo possível nem todos os caminhos. O passo usado em um caso não deve ser atribuído a todos os demais.

Soluções adicionais são permitidas. Quando descobertas, devem ampliar a análise: uma hipótese específica pode deixar de ser válida sem tornar a fase automaticamente trivial. A classificação só se mantém se houver outras dependências relevantes demonstradas. Não se ajusta o motor para impedir uma solução legítima.

## 6. Resultados da integração e limites remanescentes

Execuções registradas em 25/10/2026, em Node.js e DOM determinístico. A base de comparação é `50d2d4338a37b52187cb2aed39449a3842ff2e8e`; o catálogo v4 é a revisão local compilada, não um commit ou uma publicação presumida.

| Evidência | Resultado |
|---|---|
| Soluções finais no motor real | 500/500 aprovadas; nenhum registro reprovado |
| Configurações iniciais | 500/500 não resolvidas |
| Contraprovas e alternativas | 11.150 casos reproduzidos |
| Ordens individuais de disparo da solução | 2254 aprovadas |
| Ordens individuais das contraprovas com colisão | 2156 reproduzidas |
| Perturbações individuais de ±0,5° | 3732 aprovadas |
| Cantos simultâneos de ±0,5° | 9922 aprovados; enumeração completa desses cantos nos 500 registros |
| Certificados de conflito da ideia 7 | 399 |
| Máximos observados nos trajetos examinados | Três reflexões e sete eventos por raio; não são limites novos do jogo |
| Identidade e arquivo histórico | 200 definições conferidas; 158 IDs mantidos, 42 antigos fora da seleção, 342 novos |
| Comparação da integração autorizada | Aprovada, com 97 arquivos de execução/visual intactos |
| Progresso por ID e histórico | Testes de isolamento, retomada, reconciliação, armazenamento indisponível e rejeição de alterações não autorizadas aprovados |
| App com catálogo real em DOM determinístico | 500 Reflexos + 100 Corte; 600 fluxos, 1800 confirmações incorretas, 1279 cliques individuais de fontes, 500 conclusões Reflexos no armazenamento de teste |
| Navegador real, mouse, toque, teclado e leitura visual | Ainda não executado nesta etapa |
| Regressão geral final | Em relatório separado (`regression-report.json`); não se presume aprovação antes desse relatório |

Os resultados de motor e distribuição estão em [validation-report.json](validation-report.json); identidade e arquivo histórico, em [progress-validation.json](progress-validation.json). O fluxo do app foi executado pela suíte `tests/light-v4-campaign-ui.mjs` com o catálogo real. Isso é diferente da suíte `tests/light-v4-integration-ui.mjs`, que usa 500 fixtures sintéticas para testar organização, limites entre faixas e isolamento de estado.

Comandos de reprodução, a partir da raiz do projeto:

- `node tests/light-v4-evidence-tests.mjs`: soluções, casos, ordens, margens e distribuição do catálogo compilado.
- `node tests/light-v4-legacy-preservation-tests.mjs`: correspondência de seleção, IDs, conteúdo e armazenamento simulado.
- `node tests/light-v4-campaign-ui.mjs`: fluxo do app com as 500 fases reais e 100 Corte em DOM determinístico.
- `node tests/light-v4-integration-preservation.mjs`: comparação exata da integração autorizada e dos 97 arquivos protegidos.
- `node tests/light-v4-integration-progress.mjs`: semântica do armazenamento por ID, sem tocar saves reais.
- `node tests/light-v4-history-tests.mjs`: reversão estrita das alterações autorizadas e rejeição de mudanças desconhecidas.

A geometria automatizada cobre as verificações expressas da suíte, não uma garantia de ausência de qualquer contato visual: as três exceções legadas da seção 2.1 continuam documentadas. Buscas finitas de atalhos e justificativas causais de autoria foram arquivadas; a suíte final reproduz os casos, mas não refaz automaticamente toda busca nem prova cada conclusão editorial. As margens amostradas não são uma prova sobre todo o contínuo angular.

A classificação não foi calibrada por sessões com jogadores. Testes de motor e DOM simulado não substituem validação interativa em navegador real. Não se afirma publicação ou ausência irrestrita de defeitos em toda a plataforma.

### Arquivos de desenvolvimento distribuídos

- [selection.json](selection.json): seleção, faixa, revisão e subdivisão do Básico.
- [records.json](records.json): fichas selecionadas, soluções, casos e resultados resumidos.
- [distribution.json](distribution.json): contagens, recorrência, ordem e avisos de assinaturas.
- [legacy-map.json](legacy-map.json): tratamento dos 200 IDs anteriores e números atuais.
- [legacy-200.json](legacy-200.json): definições originais preservadas.
- [evidence-records.json.gz](evidence-records.json.gz): evidências completas de autoria.
- [replay-results.json.gz](replay-results.json.gz): trajetos recalculados da validação integrada.
- [validation-report.json](validation-report.json) e [progress-validation.json](progress-validation.json): resultados das duas suítes finais de conteúdo e preservação.

## 7. Registros históricos

- [Campanha Reflexos v3, de 200 níveis](../../REFLEXOS-V3.md).
- [Validação histórica de Reflexos v3](../../QA-REFLEXOS-V3.md).
- [Resultados e gabaritos](../../GABARITOS.md).
- [README da coleção](../../README.md).

Relatórios de 800 ou 900 níveis da coleção descrevem suas respectivas revisões. Eles não devem ser reescritos para aparentar uma aprovação anterior de 1200 níveis ou uma execução anterior de 500 Reflexos.

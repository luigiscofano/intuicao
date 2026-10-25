# REPASSE — autoria, progressão e geração

## O conteúdo entregue

A campanha contém 500 definições materializadas e estáveis em `dist/repasse/campaign.mjs`. Não há geração da campanha durante o carregamento: cada registro já inclui suas peças, metas, solução certificada e dados editoriais. O script `tests/repasse-build-campaign.mjs` é uma ferramenta de autoria offline.

Os capítulos mantêm a distribuição pedida: os oito primeiros contêm somente as peças horizontais e verticais. Depois, os capítulos ímpares contêm 12 fases originais e 13 expandidas; os pares contêm 13 originais e 12 expandidas. As 150 fases expandidas se alternam com as originais ao longo desses capítulos. A fase 500 usa somente as orientações originais.

As estreias têm poucas peças e valores pequenos:

| Fase | Novidade | Peças | Maior valor na solução |
|---|---|---:|---:|
| 201 | Uma seta | 3 | 5 |
| 276 | Duas setas perpendiculares | 5 | 10 |
| 351 | Quatro setas | 4 | 11 |

Cada estreia contém exatamente uma peça da configuração nova e somente peças originais como apoio. Nenhuma regra adicional aparece no Mestre.

## Como uma fase é construída

A autoria parte de uma relação concreta entre peças: acumular, retirar entre duas contribuições, abrir passagem, revezar receptores, dividir e reunir caminhos, proteger uma caixa ou preparar um encerramento. Uma estrutura inicial expressa essa relação. O construtor acrescenta peças alinhadas, varia as posições e orientações permitidas e intercala suas retiradas na ordem conhecida. Em parte das candidatas, ele também varia a sequência e as orientações para explorar interações diferentes.

Todas as metas são calculadas por `engine.mjs`, executando a sequência completa. Não há somas especiais nem metas corrigidas manualmente para satisfazer a interface. A definição final é reproduzida novamente com as metas calculadas. Candidatas com valores acima do limite editorial, sem interação entre peças ou sem o conceito pretendido no caminho certificado são descartadas.

O replay registra quais peças receberam, quais posições desocupadas foram atravessadas, quais valores foram enviados, a profundidade das dependências e a origem das contribuições. A contabilidade de origens identifica bifurcação e reunião: quando duas contribuições com uma origem comum chegam ao mesmo receptor, uma parcela inicial passa a participar duas vezes do valor acumulado. Isso é uma análise do replay, sem alterar as regras do motor.

A fase candidata passa então por análise de alternativas. O cache contém o estado completo: peças ainda presentes, seus valores atuais e todas as caixas. Estados que certamente ultrapassam uma meta ou não conseguem mais alimentar uma caixa são podados pelas mesmas condições necessárias do motor. A contagem soma ordens diferentes mesmo quando elas chegam ao mesmo estado intermediário.

Foram concluídas análises exatas para todas as 500 fases. O maior problema percorreu 1.597 estados distintos. Há 13 fases com uma única ordem vencedora; as outras aceitam todas as permutações que satisfaçam suas metas. A solução salva é um certificado e uma possibilidade de resolução, não uma ordem imposta ao jogador.

## Variedade que muda o raciocínio

As assinaturas de comparação ignoram translação, faixas de linhas ou colunas vazias, as oito simetrias do retângulo e uma escala numérica uniforme. Uma assinatura considera peças, direções, valores e metas; outra considera somente a topologia com suas direções.

O catálogo tem 496 topologias distintas e 498 classes completas normalizadas. As repetições restantes são didáticas e explícitas:

- As fases 1 e 2 ensinam as emissões horizontal e vertical com uma única peça.
- As fases 3 e 5 comparam recepção direta e recepção através de uma casa vazia.
- As fases 7, 8 e 9 usam o exemplo B do documento: a mesma grade exige juntar, retirar no momento certo ou abrir caminho porque as metas mudam. Suas assinaturas completas são diferentes.

Nenhuma outra repetição de topologia foi utilizada para preencher a contagem. Valores, nomes, cores, espelhamento e espaços extras não substituem a diversidade de relações.

As 14 famílias aparecem como foco principal de diferentes fases. Retirar no momento certo é o foco de 78 fases e aparece em 401 soluções certificadas. Bifurcação e reunião aparece em 117; proteção de metas, em 451; revezamento de receptores, em 65. Esses números descrevem o caminho certificado de cada fase, não provam que toda solução alternativa use exatamente o mesmo motivo visual.

## O que foi demonstrado e o que é estimativa

`validation.alternatives` guarda a contagem exata de ordens vencedoras, as primeiras e últimas retiradas possíveis e as relações de precedência presentes em todas as soluções. Por exemplo, uma relação A → B nessa lista significa que todas as ordens vencedoras retiram A antes de B.

`validation.conceptsObserved` descreve motivos encontrados em uma solução certificada. `primaryPrecedenceSupported` verifica relações necessárias compatíveis com o foco escolhido. Para timing, por exemplo, procura uma contribuição anterior à retirada de uma peça e uma passagem posterior a ela, ambas sustentadas por precedências necessárias. O campo não deve ser apresentado como prova de que um motivo semântico inteiro ocorre em todas as soluções. A interface não faz essa alegação.

A dificuldade é editorial. A seleção de candidatas considera profundidade das dependências, quantidade de precedências obrigatórias, interações, timing e proporção de ordens vencedoras. O número de estados visitados por um solver que conhece a solução não é utilizado como nota de dificuldade.

A medida `log2(N! / ordens vencedoras)` descreve quanto as metas restringem as permutações das retiradas. Ela não mede diretamente a dificuldade humana. Não houve calibração com jogadores, e essa avaliação permanece uma limitação explícita.

## Ritmo da campanha

Depois do tutorial, cada capítulo mantém 4 retomadas, 4 variações do foco, 11 combinações, 4 aprofundamentos e 2 fases marcantes, distribuídos ao longo das 25 posições. As estreias das configurações ocupam uma posição de variação e recebem uma explicação específica.

As 76 retomadas continuam presentes até o capítulo 20. Foram selecionadas com profundidade de dependência de até três peças e no máximo nove precedências obrigatórias. Elas revisitam ideias conhecidas sem exigir que a fase seja visualmente idêntica a uma anterior.

O número médio de precedências cresce de 2,76 no primeiro capítulo para 15,96 no último, com pequenas oscilações. O capítulo 17 reduz deliberadamente a quantidade de peças e concentra relações em enigmas compactos. O tamanho da grade, a duração, a posição na campanha e a dificuldade editorial são propriedades separadas.

A grade máxima da campanha é 4 × 4; há de uma a dez peças. O maior número encontrado nas soluções é 37. Não é necessário elevar a aritmética a centenas para criar relações mais exigentes. Uma tentativa perdedora ainda pode acumular valores maiores; o motor os mantém exatos e não os trunca.

## Modo infinito

`generateRepasse(seed, options)` usa o mesmo construtor de estruturas e o mesmo motor. O módulo não importa a campanha nem escolhe um de seus índices. Ele cria posições, direções, valores, sequência e metas, confirma a sequência e entrega a definição completa.

O gerador avalia no máximo 96 candidatas. O orçamento é uma contagem determinística; não usa tempo de execução para escolher uma candidata diferente. A escolha leva em conta a dificuldade, as configurações permitidas, as últimas 24 assinaturas e as últimas 24 famílias. A mesma seed, versão e opções normalizadas reproduzem o mesmo resultado. Seeds inteiras e suas representações decimais em texto são equivalentes.

Quando `introduction` indica uma configuração desconhecida, o desafio contém de três a cinco peças, exatamente uma peça nova e somente orientações originais como apoio. Essa regra também se aplica às reservas. As opções relevantes e a definição gerada são salvas para retomar a partida mesmo que uma versão futura do gerador mude.

A reserva contém 80 definições certificadas, independentes da campanha e com oito faixas de dificuldade. A seleção respeita as configurações permitidas, a introdução em curso e o histórico recente. Ela registra `source: 'reserve'` e `reserveId` na definição, além da seed e dos parâmetros. Essa identificação distingue a entrega de uma reserva da geração normal em uma reprodução técnica.

A geração e as buscas são executadas pelo serviço em workers. O serviço pode cancelar tarefas obsoletas, usar reservas diante de falhas e preparar um desafio futuro. Reiniciar a partida não chama o gerador: restaura a mesma definição.

Na auditoria, 120 desafios sequenciais, distribuídos pelas oito faixas e com histórico recente ativo, produziram 120 assinaturas diferentes, nenhuma equivalente à campanha. Todos foram reproduzidos e a repetição da seed e dos parâmetros devolveu o mesmo resultado. Também foram verificadas introduções das três configurações novas e a seleção de reservas compatíveis.

O espaço de desafios é finito. Sementes diferentes podem ocasionalmente coincidir, sobretudo em fases muito pequenas sem histórico. O controle de recência reduz repetições; não há promessa de unicidade infinita.

## Reproduzir a validação

```bash
node tests/repasse-build-campaign.mjs
node tests/repasse-catalog.test.mjs
node tests/repasse-audit.mjs
```

A primeira execução recria as definições materializadas; as demais conferem os resultados e atualizam a auditoria e o catálogo documentado. O relatório detalhado fica em `tests/repasse-campaign-audit.json`. As coordenadas do catálogo são apresentadas a partir de 1, embora o motor use índices a partir de zero.

Uma segunda implementação de auditoria, independente do motor de produção, está em `tests/repasse-independent-audit.mjs`. Seu método e resultados estão documentados em `docs/repasse-auditoria-independente.md`.

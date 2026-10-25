# REPASSE — auditoria independente do catálogo

Data: 25/10/2026. Escopo: as 500 definições materializadas da campanha e as 80 reservas do modo infinito. A auditoria foi realizada separadamente da autoria do catálogo, sem alterar fases, regras ou metadados para fazer os resultados coincidirem.

## Reprodução

```sh
node tests/repasse-independent-audit.mjs
```

O script conserva a seleção e o oráculo da execução independente original. Ele emite um relatório JSON no terminal e verifica por asserções os números registrados abaixo. Não grava arquivos nem modifica o catálogo.

Há duas verificações distintas. O replay completo das 580 definições usa o motor compartilhado para conferir que as soluções entregues realmente resolvem as fases. A amostra de alternativas usa um oráculo separado, que percorre as casas da grade, sem importar transição, vitória, busca, chave de estado, assinatura ou podas da produção. Esse oráculo enumera ordens com aplicação e desfazimento locais; sua única poda é interromper um ramo quando uma caixa já excedeu a meta, pois valores positivos nunca a diminuem.

## Estrutura da campanha

| Critério | Resultado conferido |
|---|---:|
| IDs únicos e consecutivos | 1 a 500 |
| Capítulos | 20, com 25 fases cada |
| Básico | 200 fases |
| Intermediário | 100 fases |
| Avançado | 100 fases |
| Mestre | 100 fases |
| Somente configurações originais | 350 fases |
| Pelo menos uma configuração nova | 150 fases |
| Replays de campanha aprovados | 500/500 |
| Replays de reservas aprovados | 80/80 |

A distribuição por capítulo confere exatamente com a especificação: capítulos 1–8 possuem 25 fases originais cada; capítulos 9, 11, 13, 15, 17 e 19 possuem 12 originais e 13 expandidas; capítulos 10, 12, 14, 16, 18 e 20 possuem 13 originais e 12 expandidas.

| Estreia | Fase | Peças | Grade | Maior meta |
|---|---:|---:|---:|---:|
| Uma seta | 201 | 3 | 2 × 2 | 5 |
| Duas setas perpendiculares | 276 | 5 | 2 × 3 | 10 |
| Quatro setas | 351 | 4 | 2 × 2 | 11 |

Nenhuma dessas configurações aparece antes da respectiva estreia. Cada estreia contém exatamente uma peça da configuração apresentada e apoio somente de peças originais. A fase 500 usa exclusivamente peças horizontais e verticais originais.

## Equivalências verificadas de forma independente

Uma segunda canonicalização foi escrita para esta auditoria. Ela transforma coordenadas e vetores de direção, representa as caixas por pontos externos à grade, remove faixas vazias e normaliza valores e metas pelo divisor comum. Assim, identifica equivalências por translação, espaços vazios, rotações, reflexões e escala numérica uniforme sem reutilizar as funções de assinatura do gerador.

O resultado concordou com as assinaturas da autoria:

- **498 assinaturas normalizadas distintas** para as 500 fases.
- **496 topologias normalizadas distintas**.
- **Duas equivalências didáticas documentadas:** fases 1/2 e fases 3/5.
- **Um trio com topologia compartilhada e metas diferentes:** fases 7/8/9, correspondentes às três variantes do Exemplo B.
- Nenhuma equivalência entre as 80 reservas e nenhuma reserva equivalente a uma fase da campanha.

As fases 1/2 apresentam as duas orientações, com mudança de valor; as fases 3/5 apresentam explicitamente a travessia de uma casa vazia. Essas duas revisões são ocasionais e estão identificadas em `validation.intentionalPair`. As fases 7/8/9 não possuem a mesma assinatura de puzzle: as metas diferentes mudam a ordem e o raciocínio. Portanto, não se deve descrever o catálogo como isento de toda equivalência; existem as revisões intencionais acima, conforme permitido pela especificação.

## Contagem exata de alternativas e precedências

A amostra contém **64 fases**, cobrindo:

- As primeiras 14 lições dirigidas.
- O encerramento de todos os 20 capítulos.
- As três estreias de setas.
- A fase 500.
- A primeira e a última ocorrência, depois da fase 100, de cada uma das 14 famílias principais.

O oráculo independente percorreu **8.360.434 nós**. Não houve divergência em nenhum dos campos comparados:

- Quantidade de ordens vencedoras (`solutionCount`).
- Quantidade de soluções para cada primeira retirada (`firstCounts`).
- Primeiras retiradas que não excedem imediatamente uma meta (`safeFirstMoves`).
- Últimas peças possíveis (`lastMoves`).
- Todas as precedências obrigatórias entre pares de peças (`requiredPrecedences`).

A primeira retirada sem excesso não é apresentada como necessariamente solucionável. O script conserva essa distinção ao comparar separadamente as primeiras retiradas com continuação vencedora e as primeiras retiradas apenas sem excesso imediato.

Na fase **500 — A hora de cada um**, o oráculo confirmou 10 peças, **561 ordens vencedoras** e **27 precedências obrigatórias**. A solução certificada apresenta profundidade de dependências 4 e valor máximo 13. A fase aceita ordens alternativas em vez de impor o testemunho armazenado.

## Dimensões, números e progressão

Na campanha, o maior tabuleiro é 4 × 4, o maior desafio tem 10 peças e o maior valor encontrado nas metas e trajetórias certificadas é 37. Nas reservas, os máximos são 4 × 4, 7 peças e valor 20. Esses valores descrevem as soluções certificadas; não constituem uma prova de máximo sobre todas as ordens perdedoras possíveis. O motor mantém inteiros exatos também nas hipóteses erradas.

| Categoria | Média de peças | Média de precedências obrigatórias | Retomadas |
|---|---:|---:|---:|
| Básico | 5,745 | 6,625 | 28 |
| Intermediário | 7,460 | 10,190 | 16 |
| Avançado | 7,600 | 11,940 | 16 |
| Mestre | 8,390 | 14,710 | 16 |

As relações verificadas crescem em média, e o bloco Mestre conserva 16 retomadas. Esses indicadores mostram diferenças estruturais do catálogo; não medem diretamente a dificuldade percebida por pessoas.

## Limites das afirmações sobre conceitos e dificuldade

`conceptsObserved` registra padrões encontrados em uma solução testemunha. Não prova, por si só, que todas as ordens vencedoras contenham exatamente o mesmo padrão.

`primaryPrecedenceSupported`, presente em 486 fases posteriores às primeiras lições dirigidas, relaciona evidências do testemunho a precedências verificadas entre peças. O campo não é uma prova universal de necessidade semântica do conceito em toda solução. Também não prova que o jogador precise formular mentalmente a descoberta editorial usando aquelas palavras ou aquele caminho de raciocínio.

As contagens de ordens e as precedências são resultados matemáticos de análise de alternativas. Os nomes das famílias, as descobertas e os níveis de dificuldade são classificações editoriais. Não houve calibração humana nem teste com jogadores de todas as fases nesta auditoria.

A formulação sustentada pela evidência é: **conceitos observados em soluções certificadas, com análise de alternativas e precedências verificadas**. Não são sustentadas alegações de necessidade cognitiva comprovada, de dificuldade humana calibrada ou de inexistência absoluta de equivalências didáticas.

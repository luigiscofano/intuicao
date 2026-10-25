# Sintonia — validação da revisão de conteúdo 2

## Escopo e preservação

- 500 fases, 20 capítulos e as mesmas cotas por capítulo: 260 duplas, 190 trios e 50 quartetos. As introduções das mecânicas permanecem nas fases originais.
- 424 mapas reconstruídos; 76 preservados com justificativa: os primeiros 75 desafios geométricos e a apresentação deliberadamente curta da caixa na fase 176.
- A fase 426 apresenta a entrega em dupla. A troca com a fase 430 preserva a cota do capítulo 18, sem aumentar a carga do primeiro contato.
- `rulesVersion` permanece **1**; `generatorVersion` é **2** e `contentRevision` é `sintonia-content-2`.
- `engine.mjs` permanece byte a byte igual à base v81 (`a9f4bd4d58218f474a5eba3cd54700ff6b1b134b`), SHA-256 `db5503ca8fcff67526cab621be89c472c1afb75b2083b9c69d9f98859fe8eece`.
- CSS, desenhos, animais, animações e outros jogos não foram alterados. As mudanças de UI são exclusivamente de preservação/explicação da retomada de conteúdo antigo, tratadas pela migração.

## Descobertas concretas

| Fase | Mudança e evidência |
|---|---|
| 1 / 51 / 176 | Mapas e soluções originais preservados: comando compartilhado, parada intermediária/saída da meta e demonstração inicial de apoio. |
| 177 | Estacionamento recuperável: primeiro afastar a caixa da placa, contornar e empurrá-la de volta. Não é distância adicional até o mesmo encaixe. |
| 200 | Apoio temporário permite buscar uma chave; depois a caixa precisa liberar a própria casa de chegada. |
| 251 | Interruptor preparado antes do sentido único. O prefixo ↓,↓ sem preparação torna a conclusão impossível (65 estados exauridos); remover apenas a restrição de retorno permite recuperação. A configuração precisa ter sido preparada antes; ela não precisa permanecer ligada depois que o receptor já atravessou. |
| 423 | Apoio e bloqueio físico da mesma caixa. A prova monitora uma travessia realmente sustentada em comando anterior, acesso livre entre animal e caixa, empurrão impossível e movimento de outro animal. O relatório distingue essa necessidade de um simples bloqueio observado. |
| 426 | Desocupar a saída antes de enviar; depois receber e reorientar a caixa, em vez de entregá-la diretamente à placa. |
| 500 | Preparar a face de envio, redistribuir a caixa e manter ajudas recíprocas antes da chegada conjunta; os quatro animais possuem condições remotas necessárias. |

Os demais capítulos recebem desvios de preparação, escolhas de acesso e retorno, ajuda em revezamento, condições simultâneas e destinatários sucessivos. O Endless usa as mesmas gramáticas de papéis, inclui uma dupla compacta de apoio/bloqueio somente após prova exaustiva do predicado, e mantém o histórico determinístico de 24 assinaturas/famílias. O banco de segurança foi recomposto com 36 definições certificadas, seis por faixa.

## Evidência reproduzível

- `tests/sintonia-campaign-audit.json`: cotas, introduções, certificados e diagnósticos de repetição das 500 fases.
- `tests/sintonia-purpose-audit.json`: cada uma das 536 definições, impressão digital, solução observada, ablações, buscas instrumentadas, resultados e limites.
- `docs/sintonia-purpose-evidence.md`: resumo legível desse relatório; uma solução alternativa refuta a necessidade alegada, e um limite esgotado permanece **inconclusivo**.
- `tests/sintonia-commitment-evidence.json`: prova do compromisso após configuração na fase 251, recuperação na variante controlada e contraexemplo para uma alegação mais forte que seria falsa.
- `tests/sintonia-content-migration*.test.mjs`: retomada de mapas antigos, histórico de desfazer, importação/exportação e rejeição de geração de uma revisão obsoleta.

Reprodução: `node tests/sintonia-build-campaign.mjs`, `node tests/sintonia-audit-purpose.mjs`, `node --test tests/sintonia-*.test.mjs` e `node tests/sintonia-document-catalog.mjs`.

## Resultado da auditoria final

As **536 definições** passam em validação e replay. Nas 97 caixas de campanha e reserva, a remoção individual é impossível de compensar; 95 também exigem mudança de direção do empurrão no predicado testado. O relatório prova oito retiradas após apoio, 28 reorientações pelo receptor depois da entrega e um bloqueio posterior ao apoio (fase 423, 15.854 estados exauridos). Os casos críticos têm resultados exaustivos.

Das 3.286 consultas controladas, 33 atingem o teto determinístico de estados e continuam **inconclusivas**; 52 comparações não são aplicáveis estruturalmente. Onze contraexemplos de predicados mais fortes permanecem registrados, não escondidos. Isso não afeta os 536 certificados de vitória.

O diagnóstico de ciclos curtos aceita 14 fases, contra 12 na base; as novas exceções 80 e 105 são retomadas geométricas de três comandos, e 81 é uma combinação inicial de placa de cinco comandos. Repetições legítimas não são proibidas. A lista e os resultados de direção única/varreduras estão no relatório, sem inflar mapas para vencer uma métrica.

## Limites explícitos

Replay prova vitória; uso no certificado não prova necessidade. Ablações e predicados instrumentados são relatados separadamente, sem transformar um orçamento esgotado em impossibilidade. A classificação lógica é editorial e revisável, não uma prova matemática de que toda fase exige raciocínio diferente.

**Testes humanos de compreensão, variedade e dificuldade continuam pendentes.** A rubrica de seis dimensões está registrada sem notas humanas fabricadas; `humanPlaytested` permanece falso. A cobertura mecânica e automática não é apresentada como validação subjetiva concluída. O arquivo legado e seus testes históricos são a linha de base preservada, não 500 fases novas adicionais.

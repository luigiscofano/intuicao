# Reflexos v5: reflexão confortável e dedução

## Escopo

500 fases: Básico 200, Intermediário 100, Avançado 100, Mestre 100. Somente o Básico tem subdivisões. 380 mapas redesenhados, 120 identidades da v4 preservadas. Motor, tolerâncias, controles, renderização, sprites e os demais jogos mantêm os bytes da publicação 7e99fc3.

## Critério definido antes da reautoria

Ângulo agudo entre o vetor incidente e a LINHA física do espelho, calculado por atan2 do produto vetorial e do produto escalar absolutos em cada evento real. Não é o ângulo com a normal. Referências e vitórias completas conhecidas com no máximo as operações da referência (reflexões+teleportes) devem ter pelo menos 20°; preferência 30°. A deflexão é conferida como duas vezes esse ângulo. Não há exceção abaixo 20° nas referências. Operações são apenas uma comparação geométrica finita, não uma medida de dificuldade lógica.

Na v4 havia 607 eventos abaixo 20° em 312 fases: 106 / 54 / 54 / 98 por faixa. Na v5 há 0 desses eventos em 0 referências. 88 fases têm algum evento entre 20° e 30°. O gate de 20° aplica-se às referências e às alternativas catalogadas, não a toda a caixa de perturbação ±0,5°: algumas perturbações vencedoras podem usar eventos mais rasantes, descritos em review-summary.json. Isso não altera a regra física de vitória nem força o jogador a usar essas configurações. Os dados completos incluem distâncias físicas, largura projetada do espelho, margem às pontas e respostas a perturbações. 162 perturbações ainda mudam a sequência de espelhos/portais, embora terminem em vitória; a menor folga à ponta observada nessas perturbações é 0,384 px. Essa ressalva mecânica permanece documentada, sem alegar ergonomia perfeita. Os testes antigos de ±0,5° já passavam e não bastavam para detectar incidência rasante; por isso o gate angular é independente e obrigatório.

## Lógica e evidência

399 fases têm a estrutura: todas as trajetórias locais alcançam o alvo quando traçadas isoladamente; juntas colidem; uma configuração compatível exige rever rotas. 327 dessas fases não têm paredes. As escolhas, matrizes, ciclos, ablações, detalhes de pares e saltos não físicos são reexecutados no motor. Onde houve reautoria, relações e contraprovas antigas que mudaram são arquivadas, não rotuladas como preservadas. Nenhuma combinação conta apenas por possuir etiquetas.

As quotas e a alternância estão em [distribution.json](distribution.json). [records.json](records.json) é o índice legível; [evidence-records.json.gz](evidence-records.json.gz) reúne evidências completas; [replay-results.json.gz](replay-results.json.gz) contém a execução atual. A [síntese da revisão](review-summary.json), os [exemplos causais](logic-examples.json), o [registro editorial](editorial-review.json), a [síntese angular](incidence-summary.json) e [auditoria completa comprimida](incidence-review.json.gz) são reproduzíveis por tests/light-v5-incidence-tests.mjs.

## Identidade e histórico

[previous-500.json](previous-500.json) preserva exatamente as definições publicadas na v4. [previous-500-map.json](previous-500-map.json) registra retenção ou substituição, sem trocar números por conclusão. O arquivo v4 inteiro continua intacto e as 200 originais permanecem em legacy-200.json. Nos dois mapas 180-labels e 190-labels, caches de coordenadas de casos ainda anteriores à translação histórica de 5,5 px foram reexecutados: geometria, expectativas e IDs atuais não mudam. Uma fase redesenhada é um novo desafio; seu ID novo não herda conclusão, tentativas ou rascunho de outra geometria. Os IDs antigos continuam no armazenamento; não há reset global nem limpeza de dados.

## Validação e limites

[validation-report.json](validation-report.json), preservation-report.json, ui-validation.json e regression-report.json documentam o que foi realmente testado. Os testes incluem 500 referências, contraprovas, todas as ordens individuais e colisões, perturbações individuais e todos os cantos ±0,5° e invariância de arquivos protegidos. Armazenamento de teste é sintético.

Vencedores locais e alternativas completas mais longas podem usar incidências menores: são relatados, não proibidos pela física. Foram confrontadas apenas alternativas conhecidas e catálogos finitos, não o contínuo inteiro. Não se afirma unicidade contínua, ausência de qualquer solução desconhecida, calibração humana de dificuldade, teste de migração em navegador real ou validação responsiva móvel. Inspeção visual estática, DOM determinístico e navegador são evidências distintas.

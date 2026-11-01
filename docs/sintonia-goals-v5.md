# SINTONIA v5 — destinos separados de placas e interruptores

## Escopo verificado
Nove fases alteradas:16,31,36,45,57,58,60,74,79. Havia10placas sobre destinos (duas na74); nenhum interruptor atual coincidia, mas a proibição cobre ambos. Os71outros objetos de fase permanecem exatamente iguais ao catálogo v4. Nove IDs novos impedem herança indevida de conclusão. Não houve edição de arte neste ajuste.

## QA independente
- `tests/sintonia-goals-v5-independent.test.mjs`:4/4.80fases,6faixas15/15/15/15/15/5,71preservadas,IDsnovos,nenhuma sobreposição,certificados válidos e primeira vitória exatamente no último comando. Guard rejeita campos de placa/switch sem tags e não modifica o objeto recebido.
- Nas9novas definições,44padrões finitos repetitivos por até256comandos não venceram. Todos os painéis começam fora do destino e participam do certificado.
- BFS própria de evasão:22consultas exaustivas sem solução, máximo3.120estados. Predicados: não atravessar cancela dependente do ajudante remoto indicado ou não executar gelo. Isso comprova esses eventos necessários, não unicidade nem toda narrativa editorial.
-36fallbacks e18gerações independentes (6faixas×2/3/4animais) válidos, certificados resolvidos e metas separadas; nenhum orçamento esgotado nessa amostra.

## Navegador real
-80fases×1366/390/320=240execuções completas usando botões reais. Estado salvo comparado ao motor após cada comando; destino separado no DOM inicial e durante movimentos; paleta, tamanho/posição dos tabuleiros, histórico e vitória preservados.18.120asserções repetidas,zero falhas.
- Complemento final:159asserções,21cenários agrupados,zero falhas.18desafios livres gerados e resolvidos (6faixas×3larguras),6importações inválidas sobrepondo placa ou interruptor recusadas sem modificar save,3imports válidos e3restaurações de save v4 dafase74 preservadas em arquivo e encaminhadas à nova74 sem conclusão herdada. Separação de destinos conferida também no DOM dos desafios livres.
- Total final:18.279asserções. A contagem não equivale a18milcenários independentes; cobertura significativa está discriminada acima.
- Captura real74×320 revisada:quatro painéis,nomes longos,controles e destinos legíveis sem sobreposição/overflow.
- Duas chaves originais `intuicao.*` restauradas exatamente após suíte/revisão;abas24/25/26 fechadas e temporários removidos. Console da aplicação sem erros. Uma primeira execução complementar também passou e foi restaurada antes de ampliar a asserção de DOM; não foi somada ao total final.

## Artefatos
`/workspace/shared/sintonia-goals-v5-independent/`:baseline.json,browser-main.json,browser-extra.json,causality-report.json,free-report.json,phase74-320.png.
Fixtures externas:`/workspace/shared/sintonia-goals-v5-qa.html` e`/workspace/shared/sintonia-goals-v5-extra.html`.

## Limites
Sem calibração com jogadores. Comprimento de solução não foi usado como critério único de dificuldade. Ausência dos padrões finitos não prova ausência universal de atalhos. Testes históricos v4 não foram alterados por este QA; esta validação não declara a suíte global histórica integralmente verde.

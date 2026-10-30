# REFLEXOS — mais paredes, menos objetos amontoados

Atualização da campanha de 80 níveis, em 30/10/2026. Mantida a distribuição 15/15/15/15/15/5 e as decisões de level design.

## Resultado

- **33 níveis com paredes**, antes 23. Dez novas paredes bloqueiam alternativas demonstradas pelo motor, sem eliminar as decisões principais documentadas.
- **53 composições revistas** para espaçar fontes, espelhos, alvos e portais. As outras 27 mantêm suas identidades.
- Pela métrica conservadora de bordas, halos, rótulos e alças: **24 níveis com sobreposição inicial → zero**; **22 com sobreposição na referência → zero**. As perturbações também não apresentam sobreposição.
- Mantidos **64 desafios de conflito real**, sendo **41 sem paredes**, e seis fases de espelho compartilhado.
- **80 referências válidas**, inícios não resolvidos e **1.938 perturbações de ±0,5° sem falhas**. Incidência de referência mínima de 30°.
- Todas as decisões comparáveis continuam reproduzíveis: 1.678 casos históricos preservam seu resultado; 1.092 configurações vencedoras conservam os itinerários. Há 53 casos iniciais novos adicionais.
- Remover isoladamente cada nova parede restaura a alternativa que ela bloqueia; os dez testes passaram.

## O que não mudou

Física, reflexões, colisões, tolerâncias, tamanho e desenho dos objetos, animações, controles e botões permanecem iguais. Os 245 arquivos anteriores de execução, exceto a lista de fases de Reflexos, estão idênticos à versão 104. CORTE CERTO e todas as outras campanhas foram preservados.

As 53 composições alteradas receberam novos IDs; seus registros anteriores e rascunhos não foram reinterpretados. As 27 restantes conservaram seus IDs. A campanha anterior continua arquivada no Site.

## Folgas e limites

A ausência de sobreposição não significa distância uniforme. As fases 64 e 78 conservaram uma junção compartilhada com **1,482 unidade de folga visual**, antes sobreposta em 8,898 unidades. Os demais objetos dessas composições foram afastados; a física continua confortável nos testes. A junção de duas paredes da fase 37 tem 3 unidades, e uma configuração inicial da fase 62 tem 5,568. Os relatórios identificam esses casos, sem alegar folga ampla em todos os pontos.

A medição usa aproximações conservadoras dos rótulos, não limites exatos dos glifos. A rotação completa de um espelho pode aproximar objetos: o resultado sem sobreposição refere-se às configurações iniciais, referências e perturbações testadas, não a todo ângulo possível.

Foram inspecionadas sete comparações visuais **estáticas**, usando os mesmos renderizadores. Não foi realizado teste móvel ou navegação nativa: a indisponibilidade anterior do provedor de entrada não foi contornada. Testes DOM, renderização estática e teste humano são evidências distintas. Não se afirma unicidade, necessidade universal de recursos ou conforto em toda configuração contínua.

## Arquivos

- `80-registros-completos.json`: definições, lógica, soluções, conflitos, margens, espaço antes/depois e certificados de paredes.
- `80-registros-tabela.csv`: tabela de 80 linhas, UTF-8, separador ponto e vírgula.
- `80-definicoes-jogaveis.json`: definições jogáveis sem o relatório completo.
- `editorial-and-walls.md`, `physics-and-space-review.md`, `physics-and-space-summary.json`, `ui-preservation-and-static-review.md`: revisões independentes.
- `comparacao-*.svg`: sete comparações estáticas antes/depois, com início e solução de referência.

# PULSO

## Regras e representação

Cada linha recebe exatamente três batidas em progressão aritmética: se as colunas são `a < b < c`, então `b-a = c-b`. Distância 1 é permitida. A soma de cada coluna deve igualar sua cota e nenhuma pista interna pode mudar. Diagonais não participam da regra.

O nível contém `rows`, `cols`, `quotas`, `givens` (índice linear → 0/1), `solution` e metadados. O estado é `{cells}` com `null` para indecisa, `0` para vazia confirmada e `1` para batida. Uma resposta só está completa quando não há `null`. `checkState` calcula as regras sem consultar `solution`.

`applyAction` aceita `{type:'cell',index,tool}`; ferramentas: `cycle`, `mark`, `empty`, `clear`. O ciclo é indecisa → batida → vazia → indecisa. Ações inválidas e cliques em pistas retornam o mesmo estado. Ações válidas criam outro array, sem alterar argumentos. A integridade de restauração aceita estados parciais, mas rejeita valores inválidos, arrays esparsos, tamanho errado e pistas alteradas.

## Campanha certificada

80 fases, distribuídas em 15 Básico, 15 Aprendiz, 15 Intermediário, 15 Avançado, 15 Mestre e 5 Modo Sábio. A primeira é o exemplo guiado aprovado; a fase 46 preserva o desafio comparativo aprovado. Grades de 3–6 linhas e 6–9 colunas variam trios, intervalos e cotas.

O gerador parte de trios válidos e retira pistas somente quando a cadeia de deduções de capacidade ainda fecha a solução. A unicidade é conferida por um segundo enumerador independente. O filtro de diversidade rejeita a mesma solução sob **qualquer permutação das linhas ou reflexão horizontal**; nomes, cores e ordem das linhas não produzem variedade artificial.

### Progressão observada

| Faixa | Evidência usada |
| --- | --- |
| Básico | Candidatos de intervalo e cotas isoladas, cadeias curtas |
| Aprendiz | Mais propagação entre linhas ainda com cotas isoladas |
| Intermediário | Cadeias mais extensas e mais candidatos iniciais |
| Avançado | O propagador de cotas isoladas estaciona; comparações de duas colunas resolvem |
| Mestre | Comparações de duas colunas mais extensas; fases 71–75 introduzem três colunas |
| Modo Sábio | As comparações de uma e duas colunas estacionam; três colunas completam a cadeia |

O propagador calcula para cada linha o mínimo/máximo de ocupação de uma coluna, soma/diferença de duas e combinações de três. Um padrão é descartado somente se nem a capacidade dos outros padrões pode atingir a cota combinada. Isso permite o argumento aprovado “uma marca em A exige D, mas D não tem capacidade para todas”. As 80 fases fecham por essas deduções; não foi necessário adivinhar um tabuleiro. “Exige” nesta tabela se refere ao conjunto explícito de técnicas implementadas, não a uma prova sobre todas as estratégias humanas possíveis.

As faixas são editoriais. Métricas de candidatos, rodadas e eliminações não substituem playtest nem garantem dificuldade igual para todas as pessoas. As primeiras três faixas compartilham a técnica básica e variam a extensão da cadeia. Essa limitação está registrada, sem acrescentar símbolos ou regras.

## Reprodução e testes

Na raiz do repositório, com Node 24, sem dependências:

```sh
node tools/logica/pulso-build.mjs
node tools/logica/pulso-audit.mjs
node --test tests/logica/pulso-engine.test.mjs
```

O gerador usa a semente `0x50554c53`; escreve apenas esta campanha e seu relatório específico. `pulso-solver.mjs` só é usado offline. `pulso-audit.mjs` enumera independentemente todos os trios compatíveis com as pistas, usando apenas excesso/falta de capacidade para podar. Relatórios: `tests/logica/pulso-generation.json` e `pulso-independent.json`. Nenhum catálogo é resolvido ao abrir o navegador.

## Apresentação

`view.mjs` gera markup puro; importar também `view.css`. As células editáveis têm `data-cell`, `role="button"`, `tabindex="0"` e rótulo em português. O host fornece clique, Enter/espaço, histórico, reinício e foco. Pistas são fixas e têm pino; vazios usam ×, indecisas usam ponto discreto. Peças e cotas seguem a moldura dupla CERCO. Grades de 8–9 colunas preservam uma largura mínima e permitem rolagem horizontal em telas estreitas.

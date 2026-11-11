# FOZ

Jogo de orientação de canais para uma única foz. A interface usa o vocabulário visual CERCO: placa branca, células marfim, suportes sálvia, foz âmbar e pinos nas pistas. Números, setas e círculo duplo conservam o significado sem depender da cor.

## Regras preservadas

1. Cada ponto, exceto a foz, recebe exatamente uma seta para um vizinho unido por um canal desenhado.
2. Seguir qualquer seta deve levar à foz. Ciclos são proibidos; ramos podem se juntar.
3. Uma pista numérica conta os **trechos** do ponto até a foz. A foz tem distância zero.

Canais são ortogonais entre células vizinhas. Uma fase pode oferecer apenas parte dos canais da grade. Todos os pontos participam; não há diagonal, salto ou cruzamento geométrico de canais. Uma pista indica distância, e não uma seta fixa.

## Dados e contrato

`index.mjs` exporta o contrato comum do host. Os motores não acessam DOM, armazenamento, relógio ou rede. A campanha é importada pronta; nenhum solver roda na interface.

- Nível: `{width,height,root,channels:[[a,b]],clues:{indice:distancia},solution:[alvo]}` além dos campos comuns `id`, `version`, `game`, `name`, `difficulty`, `number` e `logic`.
- Índices são inteiros em ordem de leitura: `linha * width + coluna`.
- Estado: `{arrows:number[]}`. `-1` significa pendente; na foz é o único valor permitido.
- `initialState(level)` cria um array novo com todos os valores `-1`.
- `isStateValid` valida formato, valores, comprimento, canais e foz. Aceita uma tentativa ainda logicamente errada, para permitir correção e restauração de saves. Arrays esparsos são recusados.
- `checkState` segue as rotas, detecta ciclos e mede distâncias. **Não lê `solution`.** `complete` indica ausência de setas pendentes; `valid` exige também todas as regras satisfeitas.
- `solutionState` copia o gabarito somente para o recurso explícito do host e para testes. O host controla as três tentativas, histórico, reinício e persistência.

### Ações

| Ação | Efeito |
| --- | --- |
| `{type:'cell',index,tool:'cycle'}` | Alterna vizinhos permitidos na ordem cima/direita/baixo/esquerda e, por fim, vazio. |
| `tool:'up'`, `'right'`, `'down'`, `'left'` | Aponta para esse vizinho se houver canal. |
| `tool:'clear'` | Retira a seta do ponto. |
| `{type:'link',from,to}` | Define diretamente a seta; `to:-1` limpa. |

A foz não pode ser alterada. Ações inválidas devolvem o mesmo estado; ações válidas não mutam o argumento. A view fornece `data-cell`, `role="button"`, `tabindex` e descrição em português, inclusive destino atual e distância fixa. O host traduz clique e teclado em ações. Grades maiores mantêm alvos legíveis com rolagem horizontal local.

## Campanha e progressão

São **80 definições distintas**, com distribuição 15/15/15/15/15/5. IDs derivam do SHA-256 da definição real. A curadoria rejeita equivalências por rotação e reflexão, preservando foz, canais e pistas. As duas amostras aprovadas estão em `tests/logica/foz-fixtures.json`; ocupam as fases 1 e 31.

| Faixa | Evidência editorial |
| --- | --- |
| Básico, 1–15 | Compatibilidade direta de distâncias. A primeira amostra aprovada também usa a impossibilidade de retornar ao próprio ponto. |
| Aprendiz, 16–30 | Compatibilidade e limite mínimo de percurso em grades pequenas. |
| Intermediário, 31–45 | Interação entre distâncias e saídas que voltariam ao ponto de origem, com 3–5 trocas de regra no roteiro. |
| Avançado, 46–60 | Rotas sem saída intercaladas; as cinco últimas introduzem uma hipótese única com contradição curta. |
| Mestre, 61–75 | Pelo menos duas escolhas descartadas por hipóteses separadas, cada uma com até oito eliminações registradas. |
| Modo Sábio, 76–80 | Pelo menos três hipóteses separadas; 13–24 trocas de regra e até sete eliminações por hipótese. |

A trilha de resolução registra compatibilidade de distâncias, limite inferior de percurso, impossibilidade de chegar à foz sem voltar e contradições de **uma escolha por vez**. A enumeração que prova unicidade não é apresentada como roteiro humano. O comprimento contado nas contradições refere-se aos eventos de eliminação registrados, não a cada operação mental.

Os rótulos são editoriais e **ainda não passaram por playtest**. As métricas descrevem uma estratégia suficiente, não provam que seja a estratégia humana mais curta. O primeiro par de faixas tem alguma sobreposição de técnica; isso está explícito nos certificados. Tamanho da grade e tempo de execução do solver não servem de prova de dificuldade.

## Reconstrução e validação

Todos os comandos abaixo partem da raiz do checkout e usam Python 3 da biblioteca padrão ou Node sem dependências adicionais.

```sh
python3 tools/logica/foz-build-campaign.py
python3 tools/logica/foz-audit.py
node --test tests/logica/foz-engine.test.mjs
```

A reconstrução padrão lê `tests/logica/foz-curation.json`, um insumo versionado com as 80 definições escolhidas e a origem de cada candidato. Recalcula unicidade, gabaritos, trilhas, métricas e hashes; não precisa de pools intermediários. `foz-certificates.json` guarda a prova computacional e a trilha de cada fase. `foz-audit.py` recertifica os arquivos finais e confere os certificados.

Para repetir a busca de candidatos e refazer a seleção editorial:

```sh
python3 tools/logica/foz-generate.py --samples 420
python3 tools/logica/foz-build-campaign.py --reselect
```

A semente é `10112026`. Caminhadas com apagamento de laços geram árvores variadas; canais adicionais e retirada de pistas são aceitos só após recertificação. O arquivo `tools/logica/foz-pool.json` é uma saída intermediária descartável e não deve ser publicado. Mudanças intencionais no gerador/modelo humano podem alterar uma nova seleção; a curadoria versionada mantém a campanha reproduzível.

O solver enumera orientações com podas seguras. Encontrar uma segunda solução permite rejeitar o candidato; declarar uma solução única exige esgotar as demais possibilidades. Testes cobrem os 80 gabaritos, os exemplos aprovados, ciclos, distâncias erradas, estados malformados, imutabilidade, reinício e marcação acessível. O bug de array esparso descoberto na revisão independente tem regressão explícita.

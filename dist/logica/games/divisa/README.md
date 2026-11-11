# DIVISA

Jogo individual de partição por comprimento de fronteiras. O motor, a campanha e
a renderização são módulos puros, sem DOM, armazenamento, temporizadores ou
resolução da campanha na inicialização. O host administra navegação, histórico,
reinício, tentativas e exibição explícita do gabarito.

## Regras e invariantes

1. Cada casa recebe uma das letras presentes, preservando as letras fixas.
2. Todas as casas da mesma letra formam uma região conectada por lados.
3. Para cada par de letras, a quantidade de lados unitários compartilhados é a
   quota do painel.

Diagonais e borda externa não contam. Uma fronteira pode ter vários trechos.
Não se exige retângulo, área, convexidade nem uma regra adicional de buracos.
A campanha começa com três letras; as cinco fases do Modo Sábio usam quatro,
como previsto na concepção aprovada. Todos os pares aparecem no painel, inclusive
os de quota zero.

## Dados e estado

Um nível contém `rows`, `cols`, `letters`, `givens` e `contacts`. A grade é linear,
por linhas; `index = row * cols + col`. `givens` tem uma letra ou `null` em cada
casa. `contacts` usa pares alfabéticos, como `AB`, com valores inteiros.
`solution` é apenas o resultado para a ação explícita de gabarito: o verificador
não consulta esse campo. O `id` é `divisa-` seguido dos primeiros 16 caracteres
do SHA-256 da definição real, serializada com chaves ordenadas. Nome, posição na
campanha e rótulo de dificuldade não alteram a identidade de um desafio.

O estado serializável é `{ cells: (string | null)[], lastChanged: number | null }`.
`lastChanged` serve ao tracejado da última ação. `initialState` e `solutionState`
sempre devolvem cópias; `applyAction` copia o vetor somente quando há alteração.
Uma ação inválida, uma pista ou um valor já selecionado devolve o estado anterior.

Ferramentas: `cycle`, cada letra e `erase`. O ciclo é vazio → A → B → C
(→ D, quando presente) → vazio. `isStateValid` valida formato e pistas, permitindo
um estado parcial ou uma tentativa errada. Rejeita valores fora do domínio,
vetores esparsos, tamanhos incorretos e pistas alteradas. `checkState` retorna
`complete` quando não há indecisões e `valid` somente para uma solução que
efetivamente respeita as três regras. As mensagens e os erros vêm das regras,
nunca da comparação com `solution`.

## Campanha, unicidade e variedade

São 80 níveis: 15 Básico, 15 Aprendiz, 15 Intermediário, 15 Avançado, 15 Mestre
e 5 Modo Sábio. Os exemplos aprovados são preservados exatamente como fixtures e
também aparecem nos níveis 1 e 31.

O gerador constrói partições conectadas, calcula os contatos e remove pistas
somente quando a unicidade permanece. Conserva pelo menos uma âncora por letra.
Rejeita repetições da **partição final inteira**, mesmo após rotações, reflexões
ou renomeação das letras. Portanto não basta reposicionar uma pista, mudar uma
cor ou girar a grade para conseguir outro nível da campanha.

O solver offline usa domínios por casa. Para cada fronteira calcula limites
inferiores e superiores possíveis; para cada letra verifica se suas casas
obrigatórias ainda podem ser conectadas. Essas condições são necessárias, não
suposições sobre o gabarito. Ramos podados não poderiam satisfazer as regras.
A enumeração para na segunda solução para rejeitar um candidato; para emitir
`solutionCount: 1`, precisa terminar a busca inteira sem encontrar outra.

## Roteiro lógico e progressão

O roteiro é calculado separadamente da enumeração. Elimina uma letra quando sua
colocação já excederia uma quota, tornaria uma quota inalcançável ou destruiria a
conexão possível. Se isso não basta, registra uma hipótese seguida de propagação;
no máximo uma segunda escolha é analisada para provar a contradição.
Não se aceita um nível cujo roteiro precise de busca mais profunda.

| Faixa | Critério editorial aplicado | Profundidade registrada |
| --- | --- | --- |
| Básico | 3–5 casas a preencher, exclusões por quotas/conexão | 0 em 15 níveis |
| Aprendiz | 6–9 casas, pelo menos duas famílias de exclusão | 0 em 15 níveis |
| Intermediário | Combinações de limites e primeiras contradições; inclui o exemplo pequeno aprovado | 0 em 2; 1 em 13 |
| Avançado | 10–15 casas, contradição seguida de propagação | 1 em 12; 2 em 3 |
| Mestre | 12–18 casas e ao menos duas exclusões por contradição, ou uma de profundidade 2 | 1 em 10; 2 em 5 |
| Modo Sábio | Quatro territórios e seis relações de contato no mesmo conjunto de regras | 1 em 4; 2 em 1 |

`logic.maxDepth` mede este roteiro, **não prova que um jogador precise usar
hipóteses**: uma técnica humana mais forte pode encurtá-lo. `eliminations` conta
candidatos removidos, não cliques. `propagationPasses` conta passagens do algoritmo,
não tempo humano nem profundidade mínima. As faixas são classificação editorial;
não houve medição com jogadores. Os certificados guardam cada exclusão com casa,
letra removida, condição e profundidade.

## Renderização e integração

`renderBoard` devolve SVG responsivo com `data-cell`, `role="button"`,
`tabindex="0"` e nome acessível em português em todas as casas. Pistas têm pino e
`aria-disabled="true"`. O host deve tratar Enter/Espaço e importar `view.css`, que
desenha um foco visível sem depender da cor. Não há handlers inline.

O preenchimento dos territórios é contínuo: não se usa o espaçamento de células
de CERCO onde ele falsearia a fronteira. A malha fina mantém os lados contáveis;
o segmento verde distingue duas letras já decididas. Cada letra permanece
visível mesmo sem cor. As pequenas peças de dupla moldura identificam as letras,
sem se confundir com o limite de um território.

## Reproduzir e conferir

Na raiz do checkout:

```sh
python3 tools/logica/divisa-generate.py
python3 tools/logica/divisa-generate.py --verify
node --test tests/logica/divisa.test.mjs
node tests/logica/divisa-independent.mjs
```

Semente fixa: `20261110031`. O gerador usa apenas a biblioteca padrão do Python 3;
o navegador recebe os 80 dados prontos. Relatório completo:
`tests/logica/divisa-certificates.json`. Os testes de JavaScript conferem todos
os gabaritos pelo motor, toda a distribuição, a identidade estável, a rejeição de
simetrias e a imutabilidade. Enumeram independentemente as 27 configurações de
cada exemplo aprovado e incluem negativos de conexão, quota, diagonal, pistas
alteradas e saves malformados.

A auditoria independente em JavaScript não usa os domínios nem o propagador do
gerador. Atribui letras diretamente, poda somente excesso de contato e conexão
impossível e esgota a busca de cada nível. Confirmou uma solução nos 80 níveis,
com 7.199 nós ao todo. Resultado: `tests/logica/divisa-independent-results.json`.

Referências próximas da concepção: Shikaku e Nurikabe, em
https://www.nikoli.co.jp/en/puzzles/shikaku/ e
https://www.nikoli.co.jp/en/puzzles/nurikabe/. DIVISA não usa áreas retangulares
nem tamanhos de ilhas; a informação central é a fronteira entre cada par.
Não se afirma ineditismo mundial.

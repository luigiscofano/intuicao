# MIRANTE

## Regras e representação

Use exatamente o estoque global de círculos e triângulos, uma peça por casa no máximo. Cada observador precisa encontrar a forma pedida como primeira peça na direção da seta. Vazios são transparentes; qualquer peça encerra a vista. Não há diagonais. Toda peça deve ser vista por pelo menos dois observadores; lados opostos são duas testemunhas distintas. Uma borda sem observador não impõe uma vista nem conta como testemunha. Uma seta sem peça não satisfaz sua pista.

O nível contém `rows`, `cols`, `inventory:{circle,triangle}` e `observers:{left,right,top,bottom}`. Cada posição de borda contém `1` (círculo), `2` (triângulo) ou `null` (ausência de observador). Não há pistas internas nem quotas por linha/coluna. Formas podem repetir na mesma linha.

O estado é `{cells}`: `null` indecisa, `0` vazia confirmada, `1` círculo, `2` triângulo. A resposta completa não contém `null`. `checkState` conta estoque, percorre os raios e conta testemunhas sem consultar o gabarito. Durante uma tentativa, uma casa indecisa impede afirmar qual peça é a primeira; a contagem definitiva de testemunhas acontece na resposta completa.

`applyAction` aceita `{type:'cell',index,tool}`. Ferramentas: `cycle`, `circle`, `triangle`, `empty`, `clear`; ciclo indecisa → círculo → triângulo → vazia → indecisa. Todas as transições são imutáveis. `isStateValid` verifica integridade parcial para restauração, incluindo tamanho, valores e ausência de posições esparsas. `solutionState` sempre retorna cópia.

## Campanha e diversidade

80 fases: 15 Básico, 15 Aprendiz, 15 Intermediário, 15 Avançado, 15 Mestre e 5 Modo Sábio. Grades 3×3, 3×4 e 4×4, sem regras adicionais. As fases 1 e 16 preservam integralmente os dois exemplos aprovados, incluindo as doze placas e o estoque 2+2.

O gerador constrói tabuleiros e deriva suas primeiras vistas. Só remove observadores quando a solução continua tendo duas testemunhas por peça. Rejeita linhas/colunas completamente inúteis e soluções equivalentes por rotação, reflexão ou troca global entre círculo e triângulo. As 80 soluções são distintas mesmo após essas equivalências; variação apenas de placas não pode repetir o mesmo desenho de solução.

**Nas 35 fases finais, a regra de duas testemunhas é indispensável:** o mesmo estoque e as mesmas primeiras vistas admitem outras respostas quando ela é removida. Os exemplos iniciais não precisam dessa regra para serem únicos e não são usados como evidência desse efeito.

## Certificação e progressão

O propagador offline mantém domínios de vazio/círculo/triângulo. Elimina formas incompatíveis com o estoque, com a primeira peça dos raios ou com o número de testemunhas possíveis. Quando uma peça depende exatamente de duas vistas, preserva os corredores vazios de ambas. A busca completa ramifica apenas o que essas restrições não decidem; um limite interrompido nunca certifica unicidade.

Um auditor separado percorre **todas as distribuições do estoque**, sem importar o propagador ou motor. Foram conferidas 1.038.124 distribuições no conjunto; cada uma das 80 fases tem exatamente uma solução. Ele conta também as alternativas sem a regra das testemunhas.

As primeiras faixas usam cruzamento de vistas e estoque. Avançado introduz testemunhas indispensáveis; Mestre combina mais exclusões e corredores; Modo Sábio contém as maiores cadeias/buscas selecionadas, ainda em grades compactas — não depende de aumentar a grade. As métricas e os certificados são explícitos. Essa ordenação é editorial, **não foi calibrada com jogadores**. As fases com ramificação de solver não possuem roteiro humano completo: enumeração certifica a resposta, não é apresentada como dedução humana.

## Reprodução e testes

Na raiz do repositório, com Node 24, sem dependências:

```sh
node tools/logica/mirante-build.mjs
node tools/logica/mirante-audit.mjs
node --test tests/logica/mirante-engine.test.mjs
```

Semente `0x4d495241`. O gerador escreve somente esta campanha e `tests/logica/mirante-generation.json`; o auditor escreve `mirante-independent.json`. O navegador carrega dados prontos e nunca executa os solvers.

Os testes incluem regras negativas independentes do gabarito, visibilidade interrompida, vazios transparentes, ausência de visão diagonal, duas testemunhas opostas, estoque, estados malformados, transições imutáveis, reinício e os dois exemplos aprovados.

## Apresentação

Importar `view.mjs` e `view.css`. O markup é puro, sem DOM, eventos inline ou scripts. Células têm `data-cell`, `role="button"`, `tabindex="0"` e rótulo em português. O host trata clique, Enter/espaço, foco, histórico e saves. A apresentação aprovada combina tabuleiro e peças C1 (círculos azuis e triângulos verdes com centro creme) com observadores C3 amarelo-claro e pino fixo. A abertura usa a AIIJ A aprovada. O botão direito do mouse marca sempre × vazio, de forma idempotente e sem trocar a ferramenta; o botão esquerdo, o toque e Enter/espaço mantêm a ferramenta selecionada. Formas e × permitem leitura sem cor. Uma posição da borda sem placa é realmente ausência de observador.

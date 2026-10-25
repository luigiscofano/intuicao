# Seus próprios níveis em JSON

A opção **Adicionar seu próprio nível em JSON** fica no fim da seleção, depois de todos os níveis. No DESVIO, fica depois das configurações e dos mapas. Escolha o jogo antes de importar. Você pode abrir um arquivo `.json`, colar seu texto, usar o exemplo ou baixar o exemplo para editar.

## Antes de começar

- JSON é somente dados: não aceita JavaScript, comentários, funções, `NaN`, `Infinity` ou referências externas. Nenhum código do arquivo é executado e o conteúdo não é enviado a um servidor.
- Limite de arquivo: **200.000 bytes (200 KB decimais)**. Profundidade máxima: 16; no máximo 10.000 valores, 4.096 elementos em um array, 512 campos por objeto e 4.096 caracteres por texto. Os limites específicos de cada jogo são menores.
- Use o campo `game` correto: `light`, `cut`, `elo`, `prumo`, `pacto` ou `desvio`. Um arquivo de outro jogo é recusado. A única exceção é o formato antigo de mapa do DESVIO sem `game`.
- A importação só troca o tabuleiro depois de validar os dados e a solução. Um erro, cancelamento, arquivo grande demais ou verificação inconclusiva preserva a partida e o progresso anteriores.
- `id` e `name` servem para identificar/apresentar o arquivo, mas o jogo cria uma identidade personalizada a partir de suas regras. Reimportar as mesmas regras retoma a sessão personalizada; mudar apenas o nome não limpa os erros nem o uso de gabarito. Regras diferentes criam outra sessão.
- Campos de progresso, conclusão, modo Endless ou assistência fornecidos pelo arquivo não são aceitos como progresso. Concluir um nível personalizado nunca completa um nível da campanha.
- O estado fica no armazenamento local deste navegador, sujeito às permissões e ao espaço disponíveis. Não é uma conta ou sincronização entre aparelhos. Reflexos/Corte conservam até 20 sessões personalizadas recentes.

## Exemplos prontos

Todos começam com uma resposta ainda por montar e foram conferidos pelos motores do jogo. São exemplos de formato, não uma classificação de dificuldade humana.

- [Reflexos](json-examples/light.json)
- [Corte certo](json-examples/cut.json)
- [ELO](json-examples/elo.json)
- [PRUMO](json-examples/prumo.json)
- [PACTO](json-examples/pacto.json)
- [DESVIO](json-examples/desvio.json)

## Reflexos: `game: "light"`

`schemaVersion: 1` é opcional. `id` e `name` são textos opcionais de até 100 caracteres. Coordenadas usam o palco de 800 × 460: x entre 0 e 800; y entre 0 e 460.

- `sources`: de 1 a 3 objetos `{x, y, angle, color}`. Cores diferentes: `gold`, `blue`, `pink`. O ângulo inicial pode ir de −3600 a 3600 graus e é normalizado em uma volta.
- `targets`: exatamente um `{x, y, radius: 22, color}` para cada cor das fontes.
- `objects`: de 1 a 64 objetos `{type, x, y, length, angle}`. `type` é `mirror` ou `wall`, e deve existir pelo menos um espelho. Comprimento entre 1 e 800. Espelhos: ângulo de −90 a 90 graus. Paredes: ângulo de −360 a 360 e `width` opcional de 1 a 200 (padrão 12).
- `portals`: opcional, até 16 objetos `{id, pairId, label, x, y, radius, colors}`. IDs/labels usam até 40 letras ASCII, números, `_` ou `-`; os pares precisam apontar um para o outro. Raio de 4 a 48, padrão 16. `colors`, quando presente, é uma lista sem repetições das cores permitidas.
- `solution`: **obrigatório**, um ângulo de −90 a 90 para cada espelho, na ordem em que os espelhos aparecem em `objects`. As paredes não recebem uma entrada.

O motor testa os raios dessa solução: todas as cores devem chegar aos seus alvos, respeitando paredes, portais e colisões. Não há busca automática de ângulos nem afirmação de solução única neste jogo.

## Corte certo: `game: "cut"`

`schemaVersion: 1`, `id` e `name` seguem Reflexos.

- `shape`: `Retângulo`, `Quadrado`, `Triângulo`, `Trapézio`, `Paralelogramo`, `Losango`, `Pentágono`, `Hexágono`, `Heptágono`, `Octógono`, `Decágono`, `Dodecágono`, `Hexágono irregular`, `Triângulo largo`, `Trapézio estreito`, `Pentágono alongado` ou `Octógono achatado`.
- `target`: porcentagem desejada de 0 a 100.
- `family`: `Reta`, `Parábola`, `Seno`, `Cúbica`, `Cosseno` ou `Dupla curva`; padrão `Reta`.
- `angle` e `basicDirection`: de 0 a 360 graus e devem indicar a mesma direção. Padrão 0.
- `amplitude`: de −120 a 120, padrão 40; `frequency`: de 0,5 a 2, padrão 1.
- `basicOrigin`: `{x, y}` dentro do palco 800 × 460; padrão `{x:400,y:230}`.
- `basicMin` e `basicMax`: intervalo de deslocamento dentro de −1000 a 1000; mínimo estritamente menor que máximo. Padrões −600 e 600.
- `initialTravel`: deslocamento inicial dentro do intervalo, padrão 0; `initialOffset`: de −600 a 600, padrão 0.
- `holes`: até 4 polígonos simples, cada um com 3 a 12 pontos `{x,y}`; x de −200 a 1000, y de −200 a 660. Não pode haver pontos repetidos ou autointerseções. Buracos mantêm a mesma semântica geométrica do jogo, inclusive aberturas na borda; não são área útil.
- `permissions`: objeto opcional com booleanos `x`, `y`, `rotate`, `offset`, `amplitude`, `frequency`. Os quatro primeiros mantêm o comportamento dos controles avançados existentes; `amplitude` e `frequency` podem bloquear esses parâmetros.
- `solutionTravel`: deslocamento de uma solução dentro de `basicMin/basicMax`. Opcional; se ausente, uma busca limitada tenta encontrá-lo. O campo antigo `basicSolution` também é aceito.

A solução é testada pela área geométrica real, com a tolerância normal de até 3 pontos percentuais. A área útil deve ser pelo menos 100 unidades quadradas e 1% da forma original; geometrias complexas demais são recusadas. Para curvas, cada peça também passa por um limite conservador de finura e de segmentos estimados, considerando os controles que poderão ser usados depois; lascas quase degeneradas são recusadas antes do desenho. Cortes retos mantêm o recorte exato. Não se exige solução única.

## ELO: `game: "elo"`

- `rows`, `cols`: inteiros de 1 a 7. O importador/editor personalizado aceita no máximo 7 × 7, mesmo que a campanha tenha grades maiores. Exportar uma fase maior não a torna importável neste formato limitado.
- `regions`: um inteiro por casa, em ordem de linha. Regiões de 0 a 15, consecutivas e sem lacunas; cada região deve ser conectada pelos lados.
- `fixed`: opcional, objeto que liga o número da região à casa fixa: por exemplo `{"0":3}`. A casa deve pertencer à região.
- Casas usam índices a partir de 0: `linha * cols + coluna`. Linhas, colunas e regiões também começam em 0.
- `constraints`: objeto opcional com as pistas abaixo. Omitir uma pista significa não usá-la. Os números indicados são exemplos de formato, não uma fase completa.

| Campo | Formato e significado |
|---|---|
| `shapes` | `{"0":"turn","1":"straight"}`: curva ou reta no ponto da região. |
| `passages` | `[2,5]`: casas que o circuito deve atravessar, sem colocar ponto nelas. |
| `forbiddenEdges` | `[[0,1],[1,4]]`: pares de casas vizinhas pelos lados cujo trecho não pode ser usado. |
| `rowCounts` | `{"0":2}`: quantidade de pontos escolhidos na linha. |
| `colCounts` | `{"1":2}`: quantidade de pontos escolhidos na coluna. |
| `distances` | `{"0":4}`: soma dos comprimentos das duas ligações da região, em intervalos entre centros. |
| `neighbors` | `[[0,2]]`: regiões que precisam estar diretamente ligadas. |
| `order` | `[0,2,1,3]`: ordem cíclica das regiões indicadas; pelo menos quatro regiões distintas. |
| `cuts` | `[{"axis":"row","index":1,"count":2}]`: travessias da fronteira depois da linha ou coluna indicada; `axis` é `row` ou `col` e a contagem é par. |
| `exclusivePassages` | `[{"id":"A","cells":[2,5]}]`: exatamente uma das casas do grupo deve ser atravessada, sem receber ponto. |

Não repita referências dentro de uma pista. Passagens não podem coincidir com ponto fixo. A fase deve ter uma solução única; um campo `solution` fornecido no arquivo é ignorado e a solução é recalculada.

## PRUMO: `game: "prumo"`

- `rows`, `cols`: inteiros de 1 a 6, até 36 casas.
- `supports`: de 1 a 20 objetos `{x2,y2}`. IDs são normalizados na ordem da lista.
- Coordenadas duplicadas: x2 vai de 0 a `2*(cols−1)`, y2 de 0 a `2*(rows−1)`. Centros de casas têm ambos pares; meio de lado tem exatamente uma coordenada ímpar. Ambos ímpares não é válido.
- Dois apoios não podem compartilhar uma casa incidente.

Exige uma solução única calculada pelo motor. `solution` do arquivo não é usado.

## PACTO: `game: "pacto"`

- `rows: 8` e `cols: 8` obrigatórios.
- `clues`: exatamente 64 inteiros em ordem de linha; −1 significa vazio e 0, 1, 2, 3 são os quatro símbolos.

As pistas precisam respeitar as regras normais e determinar uma solução única. `solution` do arquivo não é usado.

## DESVIO: `game: "desvio"`

- `rows`, `cols`: inteiros positivos, até 16 casas no total.
- `arrows`: uma letra `H` ou `V` por casa, em ordem de linha.
- `initialAvailable`: opcional, máscara inteira entre 0 e `2^(rows*cols)−1`. O bit da casa indica se ela está disponível; sem o campo, todas começam disponíveis.
- `initialRestriction`: opcional, `null` ou `{axis:"row",index:0}` / `{axis:"col",index:0}`; índice dentro da grade.

Um mapa antigo exportado sem `game` é aceito somente quando o jogo selecionado é DESVIO e contém o formato de setas. O importador informa quem vence teoricamente com jogo perfeito. Não exige uma única jogada vencedora e não inventa progresso de campanha.

## Validação, partidas e controles

Nos três puzzles de grade, zero soluções, várias soluções e busca inconclusiva são erros diferentes. No navegador, a busca fica em um Worker descartável com limite de 1,5 segundo. O limite pode recusar uma fase válida porém cara de verificar; isso não é uma prova de impossibilidade. Em ambientes sem Worker, limites ainda menores protegem a interface (PRUMO até 16 casas, DESVIO até 12). Dificuldade humana não é certificada automaticamente.

Os gabaritos personalizados usam somente soluções conferidas e continuam sujeitos aos erros/desbloqueio e à confirmação explícita do jogo. Importar ou ver gabarito não dá vitória automática.

O botão Endless entra diretamente no modo, reutilizando sua sessão/configuração/seed quando existentes. Voltar a Desafios/Mapas e selecionar a fase retoma seu estado. O histórico novo de Reflexos e Corte certo é temporário, limitado a 80 edições nesta sessão: um arrasto ou ajuste contínuo conta como uma edição; desfazer não apaga tentativas, assistência nem vitórias. O campo JSON mantém o desfazer nativo da edição de texto.

Em todos os jogos, a barra usa a ordem: **desfazer, refazer, Reiniciar, Mostrar/Ocultar regras, Opções avançadas**. Reiniciar mantém sua confirmação e não apaga o progresso geral. Regras, dicas, gabaritos, exportação, campanhas e Endless continuam disponíveis. Os botões antigos Continuar partida e Tutorial do PDF foram retirados, não os dados salvos ou os documentos.

# ÓRBITA — campanha e geração de desafios

## Conteúdo entregue

A campanha contém 500 definições completas em `dist/orbita/catalog.mjs`. Cada definição guarda casas físicas, anéis, coordenadas, tipos de peça, ocupação inicial, alvos, comandos, condições, descoberta principal, dicas, solução reproduzível e evidências de validação. O catálogo é produzido por `tests/orbita-build-campaign.mjs` e usa o mesmo `engine.mjs` executado na interface.

O catálogo tem 50 fases muito fáceis, 150 básicas, 100 intermediárias, 100 avançadas e 100 mestre. As duas primeiras faixas compõem os 200 desafios básicos solicitados. Essa classificação é editorial: a interface continua com a seleção de níveis e o indicador de fase comuns ao Intuição.

## Progressão editorial

| Fases | Trabalho principal | Continuidade |
|---|---|---|
| 1–50 | Giro coletivo, alvos fixos, casa compartilhada e transferência | Quatro fases de um anel; segundo anel na fase 5 |
| 51–100 | Preparar quem recebe e reparar posições | Duplas de anéis, peças equivalentes e pequenas reservas |
| 101–150 | Guardar e ordenar entregas | Retomadas curtas alternadas com configurações mais restritas |
| 151–200 | Duas tarefas e pequenas cadeias | Permanecem desafios compactos de dois anéis |
| 201–250 | Duas interseções | O outro encontro também muda quando um anel gira |
| 251–300 | Transporte por intermediário e rotas | Cadeias e circuitos convivem com duplas |
| 301–350 | Restauração e passo 2 | Primeiro passo especial na fase 307, em sete casas |
| 351–400 | Preparação conjunta e engrenagens | Primeira engrenagem na fase 352, com dez casas |
| 401–450 | Dependências e sensores | Primeiro sensor na fase 411, com sete casas e dois movimentos |
| 451–500 | Síntese | Misturas de passo, engrenagem e sensor; continuam fases básicas |

O ritmo de dez fases gira entre retomada, combinação, reenquadramento, desafio e descoberta curta. A posição desse ritmo muda a cada grupo para evitar uma sequência fixa. A dificuldade não é uma rampa de tamanho: cinco anéis são raros, e há níveis mestre com apenas dois anéis.

## Primeiras dez fases

| Nível | Nome | Descoberta | Mínimo comprovado |
|---|---|---|---:|
| 1 | Uma primeira volta | Um acionamento desloca uma casa | 1 |
| 2 | O outro sentido | Escolher o sentido conveniente | 1 |
| 3 | Todas juntas | Todas as fichas do anel circulam | 1 |
| 4 | O destino fica | Três alvos permanecem fixos | 2 |
| 5 | Dois anéis | Casas exclusivas do outro anel ficam paradas | 1 |
| 6 | Até o encontro | Preparar a chegada à casa compartilhada | 3 |
| 7 | Pelo outro anel | Retirar a peça pelo anel receptor | 1 |
| 8 | Preparar para receber | Girar o receptor antes da transferência | 3 |
| 9 | Um acerto pode sair | Retirar a peça 2 do alvo e recuperá-la | 3 |
| 10 | Preparar, passar, restaurar | Preparação, transferência e restauração | 4 |

O nível 10 preserva exatamente as sete casas, a ocupação inicial, os três alvos e a sequência B horário, A horário, B horário, A anti-horário especificados no prompt. O mínimo de quatro giros foi comprovado por busca em largura. A peça 2 permanece livre e sai temporariamente de seu destino.

As fases 1 e 2 são o único par espelhado conservado deliberadamente: a segunda introduz a escolha de sentido. Essa exceção é identificada no relatório. Não é usada para multiplicar o restante da campanha.

## Geometria e famílias

Todos os trilhos são círculos fixos. Sua representação possui centro e raio; as casas são ordenadas no sentido horário verdadeiro, usando o eixo vertical positivo da tela. As interseções são calculadas antes de distribuir as casas exclusivas. Um encontro físico resulta em um único identificador referenciado por ambos os anéis.

Os círculos podem tocar externamente, compartilhar duas interseções ou tocar internamente. Na família aninhada, as tangências internas alternam de lado: isso permite colocar de dois a cinco anéis dentro de outros sem reunir três anéis numa só casa. Círculos estritamente concêntricos não se conectariam e, por isso, não são utilizados como topologia de transferência.

| Família | Quantidade de fases |
|---|---:|
| Um primeiro anel | 4 |
| Uma conexão | 167 |
| Percursos diferentes | 117 |
| Anéis em corrente | 76 |
| Um lugar de reserva | 66 |
| Dois encontros | 28 |
| Caminhos em circuito | 18 |
| Conexões reunidas | 8 |
| Centro e satélites | 7 |
| Caminhos por dentro | 9 |

Há quatro fases de um anel, 315 de dois, 154 de três, 22 de quatro e cinco de cinco anéis. Os anéis têm comprimentos diferentes; o conjunto contém 126 descritores topológicos distintos considerando comprimentos, passos, encontros e comandos.

O gerador calcula o menor afastamento entre centros das casas e escala somente as coordenadas para garantir ao menos 76 unidades lógicas nas famílias geradas. As regras nunca dependem dessas medidas. O teste geométrico independente confere ordem, interseções, coincidência dos encontros e separação mínima.

Nos anéis aninhados, cada percurso tem quatro casas. Essa decisão mantém os círculos internos legíveis e limita o desenho de cinco anéis a aproximadamente 821 unidades, evitando ampliar excessivamente o tabuleiro apenas para acomodar casas extras. A mesma regra vale no Endless.

## Como uma fase é construída

1. Escolher a descoberta, a função no ritmo e uma família compatível.
2. Construir uma configuração final que satisfaça os alvos.
3. Definir uma sequência de autoria: preparação do receptor, conjugação para guardar e recuperar, duas entregas, comutador para alterar poucas posições, transporte por três anéis ou preparação de comandos especiais.
4. Aplicar apenas comandos legais pelo motor. Quando um sensor impede a próxima ação, procurar uma ação legal de preparação; jamais atravessar a condição.
5. Eliminar retornos a estados já visitados no percurso de autoria.
6. Inverter a sequência legal para obter uma solução certificada.
7. Procurar soluções curtas com busca em largura. Rejeitar atalhos incompatíveis com o momento da campanha.
8. Medir a solução encontrada e rejeitar candidatas que não exercitem a descoberta principal.
9. Eliminar duplicações cosméticas e repetir o replay final.

Uma fase com conceito principal de duas entregas precisa transferir pelo menos duas peças não neutras entre anéis. Transporte por intermediário exige uma peça não neutra movimentada por três anéis distintos. Peças equivalentes exigem símbolos repetidos. Dois encontros utiliza a família com duas interseções. Desvio utiliza um circuito. Restauração e alteração localizada nas faixas superiores exigem recuperar alvos que começaram corretos e foram movidos durante a solução.

Essas evidências descrevem a solução certificada. Não afirmam que toda solução possível segue a mesma estratégia. O jogo aceita qualquer estado final válido.

## Mecânicas especiais

446 fases usam somente comandos básicos. As 54 restantes distribuem as novidades assim:

| Configuração | Fases |
|---|---:|
| Apenas passo 2 | 14 |
| Apenas engrenagem | 21 |
| Apenas sensor | 13 |
| Engrenagem e sensor | 3 |
| Passo 2 e sensor | 2 |
| Passo 2, engrenagem e sensor | 1 |

Contando as combinações, passo 2 aparece em 17 fases, engrenagens em 25 e sensores em 19. A fase 500 reúne os três recursos num tabuleiro de três anéis e doze casas.

Engrenagens substituem os comandos separados dos dois anéis ligados, para que a ligação seja relevante. Seus conjuntos de casas são disjuntos. Um sensor pode controlar uma engrenagem, mas sua casa fica fora de todos os anéis acionados. A fase final exemplifica essa combinação: o anel intermediário prepara o sensor dos anéis externos.

## Dificuldade e limites das afirmações

O número de movimentos do embaralhamento não recebe a função de medida única. Os dados registram cobertura dos alvos, mudanças de anel, peças transferidas, transporte por intermediário, alvos corretos deslocados e restaurados, giros que melhoram vários objetivos e mudanças de disponibilidade dos sensores.

A busca curta comprova o mínimo em 94 fases. Nas demais, o catálogo registra uma solução conhecida e o limite efetivamente explorado. Não declara que a solução armazenada seja ótima. Introduções curtas e retomadas podem exigir menos passos; os desafios avançados comuns passam pelo filtro que exclui soluções de um ou dois movimentos.

No catálogo final, 326 soluções restauram alvos que começaram corretos; 49 transportam uma peça não neutra por três ou mais anéis; 478 possuem um giro que satisfaz dois ou mais alvos novos. As soluções conhecidas variam de um a quinze movimentos. Esses números são evidências de conteúdo e não medidas psicológicas universais de dificuldade.

## Duplicação

A assinatura canônica ignora nomes e identificadores de casas e anéis, rótulos dos símbolos, escala e posição do desenho, ponto inicial das listas circulares e reflexão global. Também normaliza a inversão simultânea dos sentidos de um comando, pois ambos os sentidos já estão disponíveis. Ela conserva relações de ocupação e alvo, ordem circular, passo, composição das engrenagens e sensores. A campanha tem 499 assinaturas canônicas; a única repetição é o par introdutório 1/2 descrito acima.

O teste também transforma artificialmente nomes, símbolos, ordem de listas, coordenadas e orientação para conferir que a assinatura permanece igual. O catálogo de 500 não é uma coleção de mudanças de cor ou de rotação visual.

## Endless

`generateEndless(seed, options)` usa o mesmo processo de autoria e validação. A seed, a versão do gerador e a versão das regras são explícitas; a configuração completa da fase pode ser persistida pela interface. A dificuldade seleciona famílias e mecânicas compatíveis com o avanço do jogador. Assinaturas recentes são rejeitadas e famílias vistas nas duas rodadas anteriores são evitadas quando possível.

O trabalho possui limite de tentativas e de busca. Ao esgotar o orçamento, a função produz um resultado de orçamento excedido; o serviço seleciona a reserva certificada em `fallback.mjs`. A reserva usa fases reais e revalida sua solução, evitando assinaturas recentes. Não cria uma suposta novidade apenas trocando cor, título ou seed. O campo interno de origem distingue geração e reserva.

As fases geradas não começam resolvidas, não recebem prova de impossibilidade por timeout e não dependem da resolução da tela. Reiniciar e retomar devem reutilizar a definição e o histórico guardados pela interface, sem chamar o gerador novamente.

## Verificação reproduzível

```sh
node tests/orbita-build-campaign.mjs
node --test tests/orbita-catalog.test.mjs tests/orbita-generator.test.mjs tests/orbita-topology.test.mjs
```

O relatório em `tests/orbita-campaign-audit.json` guarda distribuições, limites, todas as soluções das dez primeiras fases e dados por blocos de cinquenta. Os testes de geração conferem sessenta seeds em todas as faixas, sua reprodução exata, rejeição de repetição recente, orçamento finito e oitenta seleções determinísticas da reserva.

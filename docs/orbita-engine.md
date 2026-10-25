# ÓRBITA — motor e continuação a partir do estado atual

## Modelo lógico

As regras usam a versão `orbita-1`. Uma fase declara as casas físicas em `cells`, os percursos horários em `rings`, os símbolos em `pieceTypes`, a ocupação inicial em `initial`, os alvos fixos em `targets` e os comandos em `commands`.

Uma casa compartilhada tem **um único identificador e uma única entrada de ocupação**. Os dois anéis referenciam essa mesma casa. O estado é `{occupancy, moves}`; `occupancy` associa cada casa ao tipo visível de uma peça. Não há uma identidade de peça oculta que interfira na vitória. O contador registra comandos atômicos realizados na sequência atual; desfazer restaura o estado anterior mantido pela interface.

Os campos de coordenadas e geometria não participam das transições. `createEngine` prepara uma cópia dos dados lógicos. Uma alteração de tamanho, centro ou curva de desenho não altera essa cópia.

## Uma regra de transição

Um movimento tem a forma `{command: 'A', direction: 1}` ou a mesma identificação com `direction: -1`. Cada parte do comando informa um anel e um `delta`. O deslocamento efetivo é:

`direction × delta × ring.step`

O motor lê todos os valores do estado anterior, calcula os destinos com módulo normalizado e escreve uma nova ocupação. Casas e alvos permanecem fixos. A avaliação de vitória ocorre uma vez sobre a ocupação final. Não existe verificação de objetivo ou sensor em uma posição intermediária do passo 2.

As saídas de estado são imutáveis. O motor não agenda animações, grava progresso nem registra conclusões; essas responsabilidades pertencem à interface. Uma jogada permitida com símbolos iguais ainda é uma jogada, mesmo que sua ocupação por tipos permaneça indistinguível. A busca reconhece esse estado repetido e não o expande novamente.

### Engrenagens

Os conjuntos de casas das partes de uma engrenagem precisam ser disjuntos. Uma casa não pode receber dois destinos concorrentes. Todas as partes leem o mesmo estado anterior e o movimento conta uma vez. O inverso nega o sentido de todas as partes.

Um anel não acionado pode compartilhar uma casa com cada anel acionado; apenas o conteúdo dessas casas compartilhadas muda. Suas casas exclusivas ficam intactas.

### Sensores

Cada condição associa uma casa a um tipo esperado. Sua casa deve ficar fora da união de todas as casas movidas pelo comando, inclusive em engrenagens. A condição é avaliada antes do movimento e permanece igual depois dele. Por isso, o inverso do comando continua disponível imediatamente.

Comandos bloqueados devolvem o próprio estado, sem incrementar movimentos. `commandStatus` explica quais sensores faltam e quais anéis/casas o comando afeta. A prévia não altera o estado.

## Validação

`validateLevel` verifica versões, identificadores, tipos visíveis distintos, ocupação completa, referências, quantidades compatíveis de peças e alvos, passos, sentidos, comandos, sensores e estrutura da solução declarada. Também impõe os limites do jogo: no máximo cinco anéis, dois anéis por casa e duas casas compartilhadas por par. Anéis não podem repetir uma casa internamente.

`validateState` verifica a ocupação completa e a conservação da quantidade de cada tipo. `replay` executa a sequência pelo mesmo motor e informa se todos os comandos foram legais e se a configuração final satisfaz os alvos. O validador estrutural não considera a presença de uma lista de solução como prova: a prova é seu replay.

## Busca, dicas e certificado seguro

`solve` realiza busca em largura sobre as mesmas transições de `createEngine`. O custo de cada comando é um, inclusive passo 2 e engrenagens. A chave de busca considera somente a ocupação por tipos visíveis; exclui contador, coordenadas e identidades de animação.

Quando a busca encontra uma solução, todas as profundidades menores já foram examinadas. Somente nesse caso ela informa `optimal: true`. Os limites padrão são 40.000 estados, 1.800 ms e profundidade 64; no Worker o processamento pode ser configurado até 150.000 estados e 6.000 ms. A resposta de tempo, profundidade ou capacidade esgotados é `inconclusive`.

O status `unsolvable` somente aparece após esgotamento completo do grafo alcançável. Um teste com um anel de passo 2 e um alvo na outra paridade verifica essa distinção. As fases entregues ao jogador têm certificado de solução; uma busca limitada não invalida esse certificado.

`safeSolution` permite aconselhamento mesmo quando a busca não termina:

1. Reproduz e confirma a solução inicial conhecida.
2. Confere se o histórico efetivamente chega à ocupação atual.
3. Inverte o histórico real para regressar à configuração inicial.
4. Concatena a solução conhecida e remove ciclos de ocupação.
5. Reproduz a continuação novamente **a partir do estado atual**.

Quando o estado atual já pertence ao caminho certificado, pode usar diretamente seu sufixo. Essa continuação segura não é anunciada como mínima. Históricos que não correspondem ao tabuleiro ou certificados inválidos são recusados.

`hintFromSolution` recebe uma continuação verificada a partir da posição presente. As três camadas são observação, estratégia e próximo movimento explícito. As mensagens consideram a saída temporária de alvos, transferências, giros coletivos e desbloqueio de sensores. A solução guiada usa o mesmo conjunto de comandos.

## Serviço assíncrono

`createOrbitaService` oferece canais independentes de geração e análise. Cada solicitação tem identificação própria. Substituição, cancelamento ou destruição encerram o Worker e ignoram respostas tardias.

A geração valida novamente a seed solicitada, as regras, a assinatura recente, a configuração inicial não resolvida e o replay de solução antes de entregar uma fase. Falha de Worker ou orçamento esgotado usa a reserva certificada de campanha. A análise recebida também precisa resolver o estado atual em replay; em caso de falha usa o certificado seguro do histórico. A indisponibilidade de Worker não é tratada como prova de impossibilidade.

## Verificações executadas

Comando: `node tests/orbita-engine.test.mjs` — **17 grupos passaram**.

- Exemplo obrigatório de sete casas: os quatro giros especificados resolvem, a peça 2 sai temporariamente do alvo e volta, e a busca prova comprimento mínimo 4.
- Comutador obrigatório: `[0,1,2,3,4,5,6]` torna-se `[3,1,2,6,4,5,0]`; apenas três posições mudam.
- Conservação, ocupação única e inversos em 600 movimentos determinísticos de configurações básicas, passo 2, engrenagens e sensores.
- Casas exclusivas inativas, alvos fixos, equivalência de símbolos e independência de layout.
- Passo 2 atômico, rejeição de engrenagem sobreposta e sensor dentro da região afetada.
- Timeout inconclusivo, histórico divergente recusado, ciclos removidos e dicas válidas depois de movimentos livres.

Comando: `node tests/orbita-service.test.mjs` — **11 grupos passaram**.

- Cancelamento, respostas obsoletas, canais independentes e destruição.
- Preservação de seed, rejeição de certificados inválidos e reserva sem repetição recente.
- Timeout, ausência de Worker e continuação com histórico atual.
- Módulo de Worker de produção executado em thread isolada para geração e análise.

A auditoria das 500 fases e da variedade do Endless fica nos relatórios de campanha. Estes testes demonstram as regras e os limites do serviço; não afirmam solução mínima para todos os níveis.

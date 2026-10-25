# SINTONIA — regras e compatibilidade

## Transição única

`dist/sintonia/engine.mjs` implementa as regras sem DOM, relógio de animação, armazenamento ou aleatoriedade. Campanha, Endless, reprodução de certificados, dicas e editor chamam o mesmo motor. As quatro direções são `up`, `right`, `down` e `left`.

Um comando captura as condições iniciais das cancelas, calcula todas as intenções, resolve entregas conflitantes e confirma as posições. Só depois recolhe chaves, alterna interruptores e seletores e consome pontes. Placas são derivadas da ocupação final. A vitória exige todos os animais em seus destinos. Um animal que chega antes continua respondendo às setas.

Cancelas ficam nas divisórias. Uma cancela aberta no início pode ser atravessada no comando em que outro animal deixa sua placa. Um interruptor ou seletor responde apenas à entrada que termina naquela casa. Um grupo possui um controlador, evitando prioridades ambíguas entre gatilhos simultâneos.

## Matriz de compatibilidade

| Elemento | Animal | Caixa | Combinação suportada |
|---|---|---|---|
| Piso comum | Anda uma casa | Empurrada uma casa | Sim |
| Parede/borda | Bloqueia | Bloqueia | Não é casa transitável |
| Destino | Pode entrar e sair | Pode ocupar e impedir a chegada | Não imobiliza o animal |
| Placa | Sustenta enquanto ocupa | Sustenta enquanto ocupa | Pressão calculada na posição final |
| Interruptor | Alterna ao entrar e terminar | Pode ocupar, sem alternar | Ao empurrar a caixa para fora, o animal que entra pode alternar |
| Chave | Recolhe ao terminar | Pode ocupar, sem recolher | Recolhimento permanente nesta tentativa |
| Seletor | Troca A/B ao entrar e terminar | Pode ocupar, sem alternar | Conexão nova vale no próximo comando |
| Cancela | Respeita condição inicial | Respeita condição inicial no trecho da caixa | Tanto o animal quanto a caixa precisam poder atravessar suas divisórias |
| Sentido único | Respeita a seta da divisória | Respeita a seta da divisória | Não produz movimento automático |
| Gelo | Continua até piso comum ou bloqueio | Percurso potencial da caixa é rejeitado | Pode combinar em outro tabuleiro/componente inacessível à caixa |
| Portal | Transporta uma vez e encerra o comando | Percurso potencial da caixa é rejeitado | Par dentro do mesmo tabuleiro |
| Ponte frágil | Consome ao sair | Percurso potencial da caixa é rejeitado | Sem contagem de tempo |
| Entrada de entrega | Continua no próprio mapa | Envia ao ser empurrada para a entrada | Piso comum ou placa |
| Saída de entrega | Pode ocupar, bloqueando o envio | Recebe apenas se livre no início e no resultado concorrente | Piso comum ou placa; sem encadeamento automático |

Gatilhos e terrenos especiais não podem se sobrepor. Cancelas precisam de uma condição declarada e não podem duplicar uma divisória. As condições aceitas são placa, conjunto de placas, interruptor em estado declarado, chave e placa com conexão selecionada. Redes cíclicas de entrega são rejeitadas.

O validador é conservador ao verificar o percurso de caixas: considera cancelas potencialmente abertas e os canais existentes. Se a caixa puder alcançar gelo, portal ou ponte frágil, rejeita a definição antes de jogar. Isso evita uma regra invisível que bloqueie a caixa somente durante a partida.

## Entrega atômica

Uma saída precisa estar livre no estado inicial, mesmo se seu ocupante pretender sair naquele comando. O envio também falha se um movimento concorrente ocupar a saída ou se duas entregas a disputarem. Em qualquer falha, remetente e caixa ficam nas posições anteriores ao empurrão. Outros movimentos independentes seguem normalmente. A ordem de renderização dos tabuleiros não estabelece prioridade.

## Estado e histórico

O estado lógico contém posições dos animais, posição e tabuleiro de cada caixa, chaves recolhidas, interruptores, seletores e pontes consumidas. `stateKey` normaliza todos esses campos. Um comando só é ignorado quando o estado completo permanece igual.

A interface guarda comandos, cursor, snapshot e definição completa da fase Endless. Na retomada, reconstrói o histórico pelo motor e confere o snapshot. Reiniciar mantém a definição do desafio. Desfazer restaura todos os mecanismos, inclusive transferências entre tabuleiros. O namespace `intuicao.sintonia.v1` é independente do armazenamento dos outros jogos.

## Solucionador e dicas

A BFS retorna `solved`, `unsolvable` ou `inconclusive`. Só o esgotamento completo da fronteira demonstra impossibilidade. Limites de tempo, estados ou profundidade produzem resultado inconclusivo. Uma solução encontrada pela BFS é mínima em comandos; uma sequência simplesmente reproduzida é identificada como testemunho, sem afirmar otimalidade.

Uma dica reutiliza um sufixo de certificado somente quando o estado lógico completo coincide com um estado daquele percurso. Caso contrário, busca a partir da configuração atual. Toda resposta vencedora é reproduzida antes de ser oferecida. As buscas rodam em Web Worker com orçamento e cancelamento por término do worker. Se Worker não estiver disponível, usa apenas testemunhos verificáveis e o banco certificado; a interface não executa uma busca custosa no fluxo de interação.

## Dimensões e autoria

As fases geradas usam tabuleiros compactos, até quatro animais e limites fixos de busca. O editor de interface aceita até 8 × 8 por tabuleiro e arquivos de até 200 KB. O motor aceita definições de até 16 × 16 para ferramentas internas, com as mesmas regras e validação. Metadados de capítulos, descoberta editorial e certificados não alteram transições.

Níveis são valores imutáveis depois do primeiro uso. O motor cacheia sua topologia por identidade. Ferramentas que modificarem uma definição em memória precisam criar um novo objeto ou chamar `invalidateLevelCache(level)` antes de usá-lo novamente.

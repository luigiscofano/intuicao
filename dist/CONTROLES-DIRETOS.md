# Controles diretos da coleção

## Escopo

Esta atualização incremental cobre ELO, PRUMO, PACTO e DESVIO. NEXO não faz parte desta entrega. Os motores de regras, as fases existentes, o editor JSON e a validação de unicidade permanecem separados da camada de interação.

## Comandos comuns

- Uma barra próxima da grade reúne desfazer, refazer e Reiniciar. Dicas aparecem nos puzzles individuais em lilás suave; Reiniciar usa terracota suave. As regras ficam em um quadro separado, com Mostrar/Ocultar e estratégias recolhíveis.
- Setas navegam entre casas; Enter executa a ação principal da casa focalizada. Ctrl/Cmd + Z desfaz e Ctrl/Cmd + Shift + Z refaz quando o foco está no jogo. Os atalhos de edição não interceptam campos de texto.
- Reiniciar pede confirmação. Uma edição comum não pede confirmação.
- Os botões de coordenadas, zoom, Enquadrar e deslocamento foram retirados da interface. A navegação com dois ponteiros permanece; começar um gesto de navegação cancela a edição em andamento. O zoom nativo do navegador e a navegação por teclado entre casas continuam disponíveis.
- Um arraste confirmado gera uma transação de histórico. Cancelá-lo restaura o estado anterior. Voltar sobre uma casa durante um mesmo traço não desfaz a própria pintura.

## ELO

- Clicar numa casa vazia coloca o ponto de sua região; clicar noutra casa da mesma região move o ponto; clicar no ponto editável o remove.
- As conexões são automáticas entre pontos consecutivos nas linhas e colunas. As fronteiras regionais e as anotações × não bloqueiam conexões.
- Shift + clique, clique direito ou X alternam um descarte em casa sem ponto. A ferramenta visível de descartes oferece outra forma de fazer a mesma anotação.
- Arrastar um ponto pré-visualiza sua nova posição; soltar fora da região cancela o movimento. Arrastar descartes mantém a intenção de marcar ou desmarcar do início ao fim.
- Pistas fixas permanecem protegidas; outras casas de uma região fixa ainda permitem anotações.
- A cor regional é preservada. Ramificações e cruzamentos recebem assistência visual; uma peça incompleta não é automaticamente um erro.

## PRUMO

- Escolha um apoio identificado por letra e cor. Sem seleção, a primeira interação numa casa livre oferece uma seleção de apoios, sem inventar uma peça ativa.
- Clicar numa casa livre pinta com a peça ativa. Clicar numa casa da mesma peça apaga. Clicar numa casa de outra peça a substitui.
- Clique direito apaga uma atribuição editável. Alt + clique e toque prolongado numa casa pintada escolhem sua peça.
- O arraste conserva sua operação inicial. Um arraste de apagar iniciado na cor ativa apaga apenas essa cor; o arraste direito apaga independentemente da cor.
- Casas incidentes a apoios são previamente atribuídas e protegidas. A seleção de apoio não é uma alteração lógica do tabuleiro.
- [ e ] percorrem os apoios. Enter pinta ou apaga conforme a seleção.
- O painel informa separadamente a tendência horizontal e vertical da peça ativa. Momentos exatos são opcionais. Peças temporariamente desequilibradas ou desconectadas continuam editáveis.

## PACTO

- Clique ou toque percorre vazio → círculo → quadrado → triângulo → losango → vazio. Shift + clique percorre o sentido inverso.
- 1 define círculo; 2, quadrado; 3, triângulo; 4, losango. Repetir o número mantém o valor em vez de apagá-lo.
- Shift + número alterna uma anotação na casa vazia. Delete, Backspace, 0 e clique direito limpam o conteúdo editável e suas notas.
- Espaço, toque prolongado ou o botão Valores e candidatos abrem a paleta. Escolher candidato mantém a paleta aberta; escolher valor a fecha. Inserir um valor limpa as notas na mesma transação.
- Pistas fixas não podem ser alteradas. Notas não entram nas contagens nem restringem a inserção de valores.
- As duplas são desenhadas automaticamente. Contadores mostram a linha e a coluna ativas, e conflitos comprovados recebem sinalização.
- Os identificadores internos antigos foram mantidos: círculo 0, triângulo 1, quadrado 2, losango 3. A nova ordem dos controles não reinterpreta partidas salvas ou fases.

## DESVIO

- O primeiro clique seleciona uma casa legal e mostra o destino; o segundo clique na mesma casa confirma. Escolher outra casa legal troca a seleção.
- Também há o botão Confirmar jogada. Escape, clique direito ou clicar fora da área da jogada cancelam a seleção.
- A prévia conta as opções do adversário depois de consumir a casa escolhida. Casas consumidas mantêm suas setas visualmente atenuadas.
- A opção de jogada em um clique pede confirmação para ativar, pois elimina a segunda ação de segurança.
- Duelo local amistoso permite desfazer mediante confirmação do acordo entre os jogadores. No competitivo, desfazer e dicas de melhor jogada ficam indisponíveis; reinício e revanche somente aparecem depois do término da partida. Contra o bot, desfazer procura retornar à decisão humana anterior.
- Análise estratégica está restrita ao treino. Não há multiplayer online.

## Dicas, conclusão e salvamento

1. A primeira etapa destaca as casas relevantes.
2. A segunda explica a dedução com coordenadas L1C1, L1C2 etc.
3. A terceira disponibiliza Aplicar esta dedução, quando existe uma conclusão demonstrada. Exibir a dica não a aplica automaticamente.

Uma edição lógica invalida a dica anterior. Contradições detectadas são apresentadas antes de continuações. O módulo de dicas usa regras locais e não lê o gabarito, não considera notas manuais como restrições e não chama busca exaustiva como recurso alternativo. Quando não encontra uma conclusão demonstrada, informa a limitação e não oferece um preenchimento arbitrário. Grades geométricas importadas acima de 64 casas não iniciam essa propagação síncrona.

A vitória continua sendo verificada pelas regras ao usar Confirmar resposta. Foi preservada a apresentação não modal existente, com acesso ao próximo nível e à seleção. Não foi introduzida conclusão automática após cada edição.

As partidas continuam sendo salvas no armazenamento local do navegador. O estado inclui valores, candidatos, pontos, descartes, pintura e histórico recente; a seleção PRUMO e o uso de assistência também são registrados. O histórico persistido da partida ativa é limitado a 50 passos por direção. Não há sincronização entre dispositivos nem conta obrigatória. No carregamento de partidas PRUMO antigas, as casas obrigatórias dos apoios são normalizadas em todos os estados do histórico; os demais valores continuam preservados.

O editor mantém importação, verificação de unicidade, reprodução e exportação JSON. A verificação exata de uma fase personalizada continua sendo uma operação explícita do editor, sujeita aos limites dos motores existentes, não uma rotina da nova dica.

## Verificação e limites conhecidos

- O teste `node direct-hints-tests.mjs` executou 721 consultas de dica e verificou 400 conclusões. Incluiu as 600 fases iniciais de ELO, PRUMO e PACTO, sequências em diferentes faixas de dificuldade, proteção contra consulta a respostas, independência de notas, idempotência das ações e exemplos de contradição.
- Esses testes são executados em Node, não são testes de um navegador real.
- A paleta é posicionada junto à casa ativa, sem cobri-la. Se a tela não tiver espaço lateral nem vertical suficiente, fica no fluxo abaixo da grade, em vez de encobrir o tabuleiro.
- O toque prolongado e o limiar de arraste são parâmetros de interação, não valores calibrados em dispositivos reais. Toque, acessibilidade, teclado virtual, orientação e gestos multitoque ainda exigem validação em navegador/dispositivo real.
- Os atalhos de desfazer/refazer também funcionam nos controles do jogo, mas preservam a edição nativa de campos de texto. Ctrl/Cmd com outros atalhos continua disponível ao navegador.
- A assistência local não pretende substituir uma busca completa ou garantir que toda posição sem conflito local tenha solução.

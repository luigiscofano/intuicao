# Intuição · coleção lógica

Implementação educativa produzida com auxílio de IA. Não representa autoria individual do estudante e não foi enviada a qualquer curso.

## O que está incluído

A coleção preserva os 300 níveis existentes: Equilíbrio, Reflexos e Corte certo, 100 cada. Acrescenta 200 níveis de ELO, 200 de PRUMO, 200 de PACTO e 200 de NEXO. São 1.100 desafios de campanha. DESVIO é um duelo, não uma quinta campanha: oferece 16 mapas, dois jogadores no mesmo dispositivo, bot e treino.

A especificação de referência é o PDF “Plano Ilustrado — Coleção de Jogos Lógicos”, versão 1.0, de outubro de 2026. As regras clássicas foram mantidas separadas das variantes que o documento descreve como futuras.

## Como jogar

1. Escolha o jogo. A tela inicial mostra os 200 números em botões arredondados, ou os mapas do duelo.
2. Escolha um nível, o tutorial do PDF, o desafio diário ou uma dificuldade para explorar livremente.
3. Use as ferramentas e o tabuleiro. A interação não decide o resultado automaticamente.
4. Pressione “Confirmar resposta”. Um estado incompleto sem contradição é uma pendência, não uma derrota.
5. Os tutoriais incluem três passos explícitos de explicação cada, com pré-requisitos; nenhuma escolha é feita por você. Peça pistas quando quiser. Os três graus de ajuda partem da regra/área relevante e chegam a uma dedução demonstrada; nenhum símbolo é preenchido automaticamente.

### ELO

Uma peça por região, regiões conectadas e pistas fixas imutáveis. Cada peça vê apenas a primeira peça nas quatro direções. As ligações atravessam fronteiras regionais. O resultado exige grau 2 em todas as peças, um único circuito e ausência de cruzamentos fora das peças. Linhas retas são permitidas. Clique numa outra casa da mesma região para mover, ou na peça não fixa para removê-la. “Marcar descarte” é uma anotação independente.

### PRUMO

Selecione um apoio e pinte casas por clique ou arraste. Todas as casas devem pertencer exatamente a uma peça conectada com um apoio. Massa é sempre 1. O centro de massa coincide exatamente com o apoio nos dois eixos; peças assimétricas são válidas. Um apoio no meio de um lado pertence às duas casas incidentes. Ao confirmar, momentos horizontal e vertical são mostrados separadamente, em coordenadas duplicadas inteiras.

### PACTO

Grade 8 × 8, quatro símbolos. Cada linha e coluna contém exatamente dois de cada. Cada casa tem exatamente um vizinho ortogonal igual. Os componentes iguais são duplas, nunca trios ou blocos. Diagonais não contam. “Lápis” guarda candidatos separados dos valores; ligações de pares são apenas uma ajuda visual.

### NEXO

Grade 6 × 6, três símbolos. Cada linha e coluna contém exatamente dois de cada. Cada casa deve tocar os outros dois tipos. Vizinhos iguais são permitidos, diferentemente da parceria exclusiva de PACTO. A campanha tem 200 conjuntos de pistas diferentes e cobre as 183 classes possíveis de grades completas clássicas; 17 classes são usadas duas vezes com pistas não equivalentes. No canto, as duas vizinhas são os outros dois tipos.

### DESVIO

Uma casa horizontal envia o próximo jogador à mesma linha; uma vertical, à mesma coluna. A casa escolhida é consumida. A primeira jogada é livre. A seleção é apenas prévia até “Confirmar jogada”. Quem não tem escolha legal perde; não há empate.

Há três bots: explorador, intermediário e exato. O bot exato usa busca completa com memoização. Os mapas não são anunciados como neutros: cada um tem uma vantagem teórica de início conhecida. A revanche inverte quem começa. Treino permite análise e desfazer; o duelo local competitivo não permite desfazer. O histórico pode ser revisto sem alterar a partida. A análise de uma prévia explica uma resposta concreta; “Revisar decisões” encontra a primeira perda de uma vitória forçada. D-01 é um desafio tático separado, fiel ao PDF.

## Editor local e dados

As opções avançadas podem ser ocultadas. O editor JSON permite alterar as pistas, regiões, apoios ou setas. Antes de jogar uma fase editada ou importada, o motor verifica as regras e conta soluções até duas. Um puzzle sem solução ou ambíguo é recusado. DESVIO recebe análise de vantagem, não exigência de solução única.

PRUMO também permite derivar os apoios de uma pintura completa: cada centro de massa precisa ser um centro de casa ou meio de lado. Depois é necessário verificar a unicidade da partição. O solucionador exato do editor PRUMO admite até 20 casas. ELO limita o trabalho de enumeração no editor; se necessário, reduza a grade ou adicione pistas fixas.

Exportar gera um arquivo JSON local. Importar não envia dados a servidor. Fases personalizadas e tutoriais não marcam níveis da campanha como concluídos.

## Progresso, diário e métricas

Os novos puzzles e partidas guardam progresso neste navegador em localStorage. O estado de cada fase é preservado; as últimas 50 ações da fase ativa são salvas para desfazer após recarregar. Ao trocar de fase, o histórico antigo é compactado, mantendo a posição. Se o armazenamento falhar, a interface avisa. Limpar os dados do navegador apaga esse progresso; não há sincronização com o Drive ou entre dispositivos. O código/documentação no Drive é uma cópia do projeto, não um serviço de sincronização de partidas.

O diário escolhe deterministicamente uma fase do catálogo por jogo e data local. Não aumenta a quantidade de níveis. Métricas de início, confirmação, conclusão, dicas, desfazer, reinício e duelo ficam apenas no navegador, limitadas aos 500 eventos mais recentes. A exportação é manual. Nenhuma telemetria é enviada.

## Acessibilidade e feedback

Símbolos, letras, contornos e coordenadas acompanham as cores. Pistas têm sombreado e ponto. Setas de teclado percorrem o tabuleiro; Enter ou espaço usa a ferramenta. Foco visível, textos de estado acessíveis e redução de movimento são preservados. As animações de vitória e derrota mantêm o padrão dos jogos anteriores: vitória verde com ampliação e “PARABÉNS!”, derrota curta com tremor, borda vermelha e desfoque.

## O que não é apresentado como pronto

O PDF marca contas, ranking, sincronização, eventual multiplayer online, monetização, variantes com barreiras/pesos e versões mobile nativas como fases futuras ou hipóteses. Esta entrega não simula esses serviços. DESVIO funciona localmente, não em rede. Não existem promessas de ganho cognitivo, exclusividade comercial ou neutralidade de mapas.

A dificuldade é uma hipótese editorial baseada em restrições, deduções, dependências e busca técnica. Ainda é necessário observar jogadores reais e recalibrar. Unicidade e aprovação de testes não provam diversão ou dificuldade humana.

## Arquitetura

- collection-ui.mjs: navegação, ferramentas, confirmação, editor e apresentação.
- collection-state.mjs: histórico, diário, persistência e métricas locais.
- collection-tutorials.mjs: instâncias exatas do PDF, sem respostas incorporadas.
- geometry-games.mjs / geometry-levels.mjs: ELO e PRUMO.
- symbol-games.mjs / symbol-levels.mjs: PACTO e NEXO.
- desvio.mjs: regras, minimax, bots, replay e mapas do duelo.
- result-motion.mjs: efeitos de resultado compartilhados, sem decidir regras.

Validadores calculam as regras, não comparam com uma resposta de referência. Solucionadores e geradores são independentes da interface. Os scripts de geração, auditorias e testes acompanham a cópia completa do projeto.

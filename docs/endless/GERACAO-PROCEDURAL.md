# Sem parar: desafios novos nas opções escolhidas

Atualização de 12 de novembro de 2026. Os 14 jogos solo com Sem parar constroem desafios novos; nenhum destes modos usa um ciclo das campanhas. Os 11 jogos Versus não receberam este modo.

## O que controla a dificuldade

- **Reflexos:** quantidade de fontes e espelhos, paredes e portais.
- **Corte certo:** forma, curvas e espaços vazios.
- **Elo:** grade, regiões e pista fixa.
- **Prumo:** grade e quantidade de apoios.
- **Pacto:** quantidade de pistas, preservando as regras 8 × 8.
- **Órbita:** faixa escolhida controla anéis, alvos e embaralhamento. A geometria circular é construída novamente e a sequência inversa é conferida pelo motor.
- **Sintonia e Repasse:** a faixa escolhida fica fixa. Apresentações curtas de mecânicas novas continuam sinalizadas. Os caminhos de recuperação também geram; não escolhem fases de um banco.
- **Divisa, Pulso, Foz, Refúgio, Mirante e Renovo:** seletor Básico até Modo Sábio. Cada gerador usa tamanho, decisões, pistas ou quantidade de peças para controlar sua faixa. Aplicar a dificuldade gera outro desafio, sem somar vitória.

As faixas não equivalem a calibração com jogadores. Duas construções da mesma faixa podem ter dificuldade humana diferente. Os cinco jogos originais continuam usando opções concretas em vez de uma classificação artificial.

## Novos geradores lógicos

| Jogo | Construção | Validação e limites |
| --- | --- | --- |
| Divisa | Crescimento aleatório de territórios conectados; fronteiras calculadas; remoção de pistas | 3×3 a 5×6, 3–4 territórios; remoção preserva unicidade certificada |
| Pulso | Três batidas em progressão aritmética por linha; contagens e pistas derivadas | 3–5 linhas e 5–10 colunas; unicidade certificada após remoção de pistas |
| Foz | Árvore aleatória de rotas, canais adicionais e pistas de distância | De 4×3 a 6×6; propagação de distâncias prova uma única orientação |
| Refúgio | Separadores e marcos novos, com construção alternativa procedural | 3×4 a 5×6; unicidade certificada nas pistas removidas |
| Mirante | Posições, formas, estoque e observadores derivados de uma solução | Construção legal; busca limitada registra se unicidade foi provada |
| Renovo | Trios ortogonais construídos sem colisão e dispostos em tabuleiro novo | Construção legal; busca limitada registra se unicidade foi provada |

Todos aceitam qualquer resposta que respeite as regras. O gabarito é validado pelo mesmo motor do jogo; o estado inicial nunca vem concluído. MIRANTE e os caminhos de recuperação de alguns geradores podem ter mais de uma resposta ou unicidade não provada. Não é feita uma promessa geral de solução única.

## Variedade, desempenho e persistência

A mesma semente, versão de gerador e opções reproduz a mesma definição. O número do desafio não é reduzido ao tamanho da campanha. Repetições estruturais recentes são rejeitadas: janela de 64 nos seis lógicos, 30 em Órbita e 24 nos outros jogos. Nos lógicos, a assinatura também considera simetrias. O espaço de possibilidades é finito: não se promete uma sequência matematicamente infinita nem ausência de repetição fora da janela.

As tentativas de geração têm limites. Se uma nova definição não puder ser produzida, o desafio atual permanece e aparece um erro; não há substituição silenciosa por uma fase de catálogo. Os seis lógicos usam Web Worker quando disponível, cancelado ao sair, reiniciar, editar ou substituir o pedido. Os geradores têm orçamento determinístico também na recuperação sem Worker. Sintonia pode ocupar brevemente a interface nesse caso excepcional, com limite de 800 ms/20.000 estados; normalmente roda em Worker.

A definição atual, as opções, a tentativa e o histórico recente são salvos localmente, separados da campanha. Reiniciar mantém a fase. Gerar outra não soma vitória. Vitórias não são duplicadas por Checar, desfazer/refazer ou reabrir. O autoavanço pode ser desligado nos jogos com esse controle.

A tentativa antiga dos seis lógicos, quando já existia no modo de ciclo, é mantida para não apagar uma partida em andamento. O próximo desafio passa a ser gerado. As partidas antigas de Órbita conservam sua definição; uma semente legada não é reinterpretada pela nova versão.

## Verificação

- Mais de 25 mil combinações dos cinco geradores originais conferidas no motor.
- 2.880 Divisa/Pulso/Refúgio, mais replays e 180 recuperações forçadas.
- 3.600 Foz/Mirante/Renovo, mais 1.200 recuperações e reexecuções determinísticas.
- Revisão independente: 3.240 desafios consecutivos, 90 em cada jogo/faixa, sem repetição na janela e com dificuldade fixa.
- 200 Órbita novos em todas as faixas, conferindo geometria, legibilidade, replay e retomada.
- Testes de cancelamento, migração, backup, gabarito, histórico e isolamento das campanhas.
- Navegador real: entrada nos 14 modos, opções, renovação e retomada dos nove modos com seletor; vitória e avanço automático nos seis lógicos, além de reinício e cancelamento de diálogo. Sem ensaio em aparelho físico com toque.

Os testes históricos de lançamentos anteriores incluem invariantes de catálogos e nomes que já mudaram; não devem ser confundidos com uma suíte integralmente verde. A entrega registra a comparação com a base e executa separadamente os testes vigentes e os novos contratos.

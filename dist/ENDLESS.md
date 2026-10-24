# Intuição · modo Endless

Atualização de 24 de outubro de 2026. Este documento descreve o novo modo; não substitui os registros históricos das campanhas.

## Entrar e jogar

Nos seis jogos, **Explorar modo livre** aparece antes dos níveis ou mapas. O botão abre **Endless**, com desafios gerados por uma semente aleatória, em vez de escolher uma fase do catálogo.

Cada puzzle é gerado a partir de uma resposta e conferido pelo mesmo motor de regras usado durante o jogo. Uma resposta válida, confirmada pelo jogador, exibe a animação de vitória e abre outro desafio depois de aproximadamente 1,5 segundo. No DESVIO local, a vitória de qualquer jogador inicia outro mapa. Contra o bot, uma vitória humana avança; uma derrota mantém o mapa para uma nova tentativa.

A geração usa um espaço finito de possibilidades e não promete variedade matematicamente infinita, unicidade ou dificuldade humana calibrada. Uma solução diferente da resposta construída é aceita quando satisfaz as regras.

## Personalizar

As opções ficam dentro do modo Endless. Alterar um campo não modifica a partida imediatamente: use **Aplicar opções e gerar**. Isso substitui o desafio atual, sem contar uma vitória. **Novo desafio** também troca a geração. **Reiniciar** mantém o mesmo desafio, semente e configurações.

| Jogo | Opções | Limites e construção |
|---|---|---|
| Reflexos | 1–3 raios, 1–3 espelhos por raio, paredes, portais, portais seletivos por cor | Caminhos separados por faixas, com posições e ângulos gerados. A solução é testada com todas as cores e a física de colisões original. |
| Corte certo | Forma aleatória ou escolhida, curvas além de retas, espaços vazios | Meta calculada a partir de um corte válido. Área útil, vazios e tolerância de ±3 pontos percentuais seguem o motor original. |
| ELO | Grade de 4×4 até 10×10, 4/6/8 regiões, uma peça fixa opcional | Quatro pontos formam um retângulo; seis e oito pontos formam circuitos côncavos. As regiões crescem aleatoriamente e permanecem conectadas. |
| PRUMO | Grade de 4×4 até 10×10, 2–10 peças/apoios | A solução construída usa partições retangulares equilibradas. Outras formas válidas também são aceitas. Não há apoios incidentes conflitantes. |
| PACTO | 24, 32 ou 40 pistas iniciais | Mantém 8×8: quatro símbolos com exatamente dois de cada por linha e coluna exigem oito casas. A regra de uma única vizinha igual por casa é preservada. |
| DESVIO | 3×3, 3×4 ou 4×4; modo local/competitivo/bot/treino e dificuldade do bot | Máximo de 16 casas, compatível com a análise exata. Mapas gerados não prometem igualdade de vantagem inicial; o jogador inicial alterna nas partidas seguintes. |

Portais seletivos são configuráveis somente quando os portais estão habilitados. Os espelhos de Reflexos giram, mas os objetos fixos não são movidos para contornar o desafio.

## Dicas, gabarito e progresso

- Depois de três confirmações erradas, o gabarito aplica uma solução conhecida, mas não confirma automaticamente. A resolução é marcada como assistida.
- Dicas são gerais ou deduções locais. Elas não alegam ter provado unicidade ou executado uma busca exata em tabuleiros que excedem os limites do solucionador.
- Configurações, semente, partida e contadores Endless ficam no navegador. Reabra **Explorar modo livre** para continuar. Não há sincronização entre aparelhos.
- O progresso Endless é separado das campanhas. Gerar outro desafio não conclui um nível de campanha.
- Sair, trocar de jogo, reiniciar e alterar configurações invalidam avanços e jogadas automáticas antigos. A confirmação de reinício não deixa um novo desafio surgir por trás do diálogo.
- Os registros atuais de Endless são limitados por jogo, em vez de acumular uma sessão por semente.

## Preservação e verificação

Catálogos, motores matemáticos, controles diretos, animações de resultado e arte aprovada permanecem iguais à versão anterior. A integração modifica as duas interfaces, acrescenta geradores e um arquivo de estilo isolado.

Os testes cobrem milhares de sementes/configurações, soluções validadas, determinismo, diversidade estrutural, colisões, gabarito, avanço único, reinício, edição após vitória, retorno/reabertura, bot, callbacks obsoletos e isolamento das campanhas. Testes em DOM simulado não equivalem a uma revisão visual em navegador real.

Veja também [Geradores da coleção](ENDLESS-GERADORES-COLECAO.md). Os documentos anteriores continuam descrevendo os respectivos lançamentos históricos.

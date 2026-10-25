# ELO: campanha em dez etapas

## Escopo e diagnóstico da versão anterior

Esta atualização é exclusiva do ELO. O ponto de partida foi o commit `0dc0c079a3df9a929b0615d9621eacda8120c83b`.
A campanha anterior tinha 200 fases clássicas: 25 tabuleiros 5×5, 50 de 6×6 e 125 de 7×7. A seleção os apresentava em quatro blocos de 50. Não havia dados para as nove novas famílias de pistas. O modo livre já era procedural e separado da campanha.

O núcleo anterior foi examinado antes de alterar dados: conexão automática ao primeiro ponto ortogonal, uma peça por região conectada, grau dois, circuito único e proibição de cruzamentos. Os 200 níveis não tinham buracos nem casas de região negativa. A busca de visibilidade não tratava células vazias, fronteiras ou anotações como paredes. A atualização não cria uma nova semântica para buracos.

## Regras que permanecem

- Um ponto em cada região e exatamente duas conexões por ponto na solução.
- O primeiro ponto em cada direção ortogonal conecta automaticamente. Um ponto intermediário divide o segmento; não se escolhem ligações manualmente.
- Todos os pontos formam um único circuito fechado, sem cruzamento fora dos pontos. Trechos retos são permitidos e não é preciso ocupar todas as casas.
- Fronteiras, anotações X e linhas de referência não bloqueiam visibilidade.
- Qualquer solução que satisfaça as regras é aceita. A resposta cadastrada não é a condição de vitória.
- Uma posição incompleta não é uma falha automática. Um circuito parcial pode receber pontos que subdividem seus segmentos.

## As dez etapas

1. Níveis 1–20, Fundamentos: regras clássicas e dependências de alinhamento.
2. Níveis 21–40, Curvas e retas: o ponto de uma região marcada deve ter conexões perpendiculares ou opostas.
3. Níveis 41–60, Passagens: certas casas vazias devem estar no interior de uma ligação.
4. Níveis 61–80, Trechos vedados: uma ligação não pode percorrer o intervalo unitário indicado.
5. Níveis 81–100, Contagens: números exatos de pontos em linhas ou colunas selecionadas.
6. Níveis 101–120, Distâncias: soma exata dos comprimentos das duas ligações incidentes ao ponto de uma região.
7. Níveis 121–140, Vizinhanças: pares de regiões devem estar diretamente ligados.
8. Níveis 141–160, Ordem no circuito: ordem relativa de pelo menos quatro regiões marcadas.
9. Níveis 161–180, Travessias: número exato de ligações que cruzam uma linha de referência.
10. Níveis 181–200, Escolhas interligadas: exatamente uma passagem de cada grupo deve ser atravessada.

As etapas reaproveitam famílias anteriores seletivamente, em vez de empilhar todas as regras em todos os níveis. A classificação de dificuldade é editorial e deve ser lida separadamente da comprovação matemática de solução.

## Definições sem ambiguidades

Uma passagem obrigatória ou alternativa de um grupo exclusivo não recebe ponto. Ela não é uma parede nem cria uma ligação. Para atendê-la, o centro da casa precisa estar estritamente no interior de um segmento horizontal ou vertical.

Um trecho vedado é o intervalo entre os centros de duas casas ortogonalmente vizinhas. A conexão automática continua visível quando o atravessa; a configuração é que viola a pista.

Contagens de linha/coluna incluem pistas fixas e contam pontos, não segmentos. Distâncias usam intervalos entre centros de células, não pixels, e são calculadas nas ligações efetivamente geradas pelo primeiro ponto visível.

Uma vizinhança exige uma aresta direta entre as duas regiões. Um caminho por outros pontos não serve. A ordem do circuito aceita rotações e a sequência inversa, pois o circuito não possui início nem sentido obrigatório. Regiões não marcadas podem aparecer entre os marcos.

Um corte fica entre duas linhas ou colunas e atravessa toda a grade. A pista conta ligações que passam de um lado ao outro. Não bloqueia conexões. Nos casos com pontos obrigatórios dos dois lados, um circuito fechado exige ao menos duas travessias e paridade par.

Em um grupo exclusivo, exatamente uma das casas é atravessada; todas ficam sem ponto e as alternativas não escolhidas ficam sem segmento pelo centro.

## Interação e histórico preservados

Clique e toque continuam colocando, removendo ou movendo o ponto dentro de sua região. Arrastes são atômicos; um destino inválido cancela a operação. Pistas fixas permanecem protegidas, as cores regionais não são substituídas e cadeados não retornam. X permanece uma anotação opcional, com os controles já existentes.

Desfazer/refazer, reinício com confirmação, navegação por teclado, gestos, confirmação pela rodinha, botões anterior/próximo, dicas em etapas e efeitos de vitória/derrota continuam presentes. O gabarito só fica disponível após três confirmações incorretas, preserva pistas fixas, marca assistência e não concede vitória sem Confirmar resposta.

A migração conserva as sessões, conclusões e respostas antigas. Uma fase redesenhada usa identidade nova e não recebe conclusão automática por ocupar o mesmo número. Fases realmente idênticas podem conservar a identidade anterior. O modo livre e o editor clássico são fluxos separados da campanha; não se amplia automaticamente a complexidade de uma importação arbitrária.

## Evidência e limites da avaliação

A validação matemática reconstrói o grafo e confere todas as regras. A busca de soluções alternativas tem orçamento explícito: limite atingido é inconclusivo, não prova unicidade. As dicas usam regras e o estado atual, nunca coordenadas extraídas da resposta.

A auditoria editorial registra ideia central e raciocínio explicável por nível. Tempo de solver, tamanho da grade e contagem de nós não provam dificuldade humana. Não foi realizada uma calibração com jogadores reais.

Os resultados quantitativos, a distribuição final, os testes e os limites de verificação visual são registrados na seção de validação após a integração.

## Verificação preliminar da integração

Antes da nova seleção final, passaram 43 execuções de regressão, incluindo 15.000 configurações do modo livre, os controles de todos os jogos, dicas, reinício, PACTO e testes de isolamento por hash. A única falha do conjunto genérico foi uma expectativa histórica de 10 elementos de folhas em `curiosity-brand-tests.mjs`; o HTML de referência já continha 16. `index.html` e os arquivos visuais da plataforma continuam byte-idênticos ao ponto de partida. Esse resultado não é apresentado como aprovação da suíte inteira.

O motor novo foi comparado com um oráculo independente em 168 tabuleiros. Foram verificadas 2.816 posições parciais desses casos, além das 200 respostas ELO anteriores, 6.400 subconjuntos das respostas antigas e os 200 níveis PRUMO. Casos manuais cobrem as nove famílias, soluções alternativas, rotação e inversão da ordem, passagem vazia, conexão vedada ainda visível e subdivisão de circuitos parciais.

As exceções de isolamento ELO são reversíveis e específicas. Os baselines históricos permanecem intactos; a rotina remove somente os blocos exatos desta atualização antes das verificações anteriores.

## Validação da campanha final

A campanha materializada contém exatamente 200 níveis, dez etapas de 20. São 77 compactos, 40 grandes e 83 retangulares; 42 compactos aparecem após o nível 80. As cinco fases de planejamento da etapa 2 usam grades médias, preservando uma apresentação gradual de curvas/retas; os 40 grandes estão nas etapas seguintes. Há 26 fases clássicas intencionais e 174 com novas restrições.

Todas as 200 respostas passaram pelo motor e por uma verificação separada que constrói o grafo ordenando pontos nas linhas e colunas. As 200 buscas de unicidade concluíram exaustivamente com uma solução. Nenhum limite atingido foi registrado como unicidade. As 174 famílias principais são semanticamente necessárias: removê-las permite alternativas. Para passagens e escolhas exclusivas, a auditoria mantém suas casas proibidas para pontos ao remover apenas a obrigação de atravessar/exatamente-uma, evitando confundir as duas regras.

Os 200 certificados de raciocínio estão completos e vinculados aos hashes do puzzle, motor e versão do método. Foram recomputados sem gabarito: propagação de condições necessárias e refutações de até duas hipóteses explícitas encadeadas, além dos testes diretos de candidatas das regras locais. Há zero certificados parciais na entrega. Certificados extensos ficam nos dados de desenvolvimento, não no módulo de apresentação do jogador.

A revisão editorial verificou duas amostras por etapa e uma amostra grande adicional. Os 21 hashes revisados coincidem com os dados finais. A matriz registra descobertas concretas, ajustes de classificação e rejeição/substituição de candidatos. A dificuldade continua sendo estimativa editorial, não resultado de playtesting. Distribuição final: 8 iniciais, 15 intermediários, 126 avançados e 51 especialistas.

A rodada final executou 47 verificações: 46 passaram; a única falha é a expectativa histórica de folhas descrita acima. Entre as aprovadas:

- As 200 fases atravessaram a interface real em DOM simulado: 600 confirmações incorretas, 200 desbloqueios/aplicações de gabarito, preservação dos pontos fixos, 200 vitórias somente após confirmação e cinco reconstruções do aplicativo com retomada.
- As dicas passaram por 718 consultas e 407 ações verificadas, sem consultar respostas ou interpretar X como restrição.
- O modo livre passou por 15.000 configurações; geradores, retomada e interface dos demais jogos também passaram.
- Foram preservados 85 arquivos anteriores byte a byte. Os sete arquivos compartilhados alterados possuem diferenças ELO exatas, reversíveis e auditadas. Dados e respostas PRUMO permanecem idênticos.

Relatórios: `tests/elo-campaign-audit.json`, `tests/elo-campaign-certificates.json`, `tests/elo-v3-proof-replay-results.json`, `tests/elo-v3-suite-results.json` e `tests/elo-editorial-review.md`.

### Limite da verificação visual

Os testes de interação são simulação determinística, não navegador/dispositivo. A grade ampla possui células mínimas de 44 px e deslocamento/rolagem sem mudar os gestos de edição; isso foi conferido estruturalmente. A revisão visual da versão publicada é uma etapa separada. Não se alega teste móvel físico nem calibração humana.

### Correção após a primeira revisão visual publicada

A revisão real do commit `459e027`, em viewport de 1180 px, identificou recorte à esquerda das pistas L4·2 no nível 81 e L5·2 no nível 121. A fonte e o afastamento eram escalados pelo viewBox do SVG, mas o espaço lateral era fixo em pixels. Isso também poderia reduzir a leitura dos rótulos nas grades 12×12.

Os números de linha, coluna e corte agora são rótulos HTML absolutos no próprio tabuleiro, em fonte monoespaçada de 12 px. Seus centros continuam alinhados por percentuais às casas e aos cortes. Eles acompanham o pan/zoom do tabuleiro, não recebem eventos de ponteiro e não entram no fluxo do grid. O espaço físico é de 64 px à esquerda e 32 px nos demais lados, inclusive no estilo móvel; grades com rótulos externos também preservam o mínimo de 44 px por casa, com rolagem em vez de compressão.

A mesma revisão corrigiu o texto de uma dica de contradição global: contagens ou cortes impossíveis usam o diagnóstico específico do motor, sem mencionar uma inexistente “região 0”. Nenhuma regra, fase, resposta, certificado ou migração foi alterada.

A nova rodada executou 48 verificações: 47 passaram, e permanece somente a falha histórica das folhas já documentada. O teste adicional cobre os 85 rótulos da campanha, um caso sintético 12×12, as telas 81/121/161/200 no DOM determinístico, os espaços laterais e o diagnóstico global. A confirmação visual desta correção depende da republicação e da nova inspeção real; o teste estrutural não substitui essa etapa nem representa teste em dispositivo móvel.

# Como jogar ilustrado nos 25 jogos

## Pedido e base

Em 11/11/2026 foi solicitado que todos os novos jogos tivessem regras detalhadas e exemplos no estilo do cartão de Reflexos, com animações em loop em todos os jogos. Base: Site v201 e árvore de PR58 `34ca285ba6812a9dc15e23daf8caf2131af399c8`, preservando o mosaico de rodapé, os controles de campanha, a confirmação Versus e o ajuste responsivo de tabuleiros.

## Entrega

- Os 11 exemplos existentes mantêm seus textos e geometrias exatamente. O movimento antes finito passa a repetir a cada seis segundos, com tempo de leitura entre ação e reinício.
- Seis jogos lógicos e oito Versus recebem exemplos próprios, quatro passos detalhados e descrições acessíveis. As ações ilustradas são verificadas contra os motores reais.
- Os cartões aparecem antes da lista de fases ou da preparação de duelo. Nos 14 jogos novos, a ajuda durante a partida também usa o mesmo cartão.
- Cada cartão permite pausar e retomar. Animações param fora da área visível e com a página em segundo plano. A preferência do aparelho e a opção Menos movimento do site mostram um estado final estático legível.
- O controller não lê nem escreve armazenamento. Motores, campanhas, saves, backups, artes e demais superfícies permanecem idênticos à base.

## Cobertura

Reflexos, Corte certo, ELO, PRUMO, PACTO, SINTONIA, REPASSE, ÓRBITA, DESVIO, BROTO, CERCO; DIVISA, PULSO, FOZ, REFÚGIO, MIRANTE, RENOVO; ENLACE, VAZANTE, MOSAICO, QUINHÃO, ESTALO, DOBRA, ACORDE e LASTRO.

O teste de catálogo compara os exemplos com as 25 entradas ativas. Um jogo acrescentado sem cartão falha no CI. Para manter o padrão, todo jogo futuro precisa de passos específicos, SVG local, descrição textual, animação repetida com pausa/redução de movimento e um exemplo validado no motor.

## Validação

- Recorte completo de CI: 610 testes aprovados, incluindo a preservação dos 11 exemplos e o contrato histórico atualizado.
- 480 soluções das seis campanhas lógicas verificadas nos testes dos exemplos; oito exemplos Versus reproduzidos no motor.
- Escopo: comparação integral de `dist` com a base, exceto os oito arquivos autorizados. O código dos dois UIs, removendo somente imports e marcação da ajuda, permanece idêntico.
- Navegador: 25 jogos nas larguras 1440, 768, 390 e 320 px. A primeira passagem encontrou a largura intrínseca do SVG em 320 px; o ajuste limita a ilustração à coluna disponível, e a rechecagem aprovou os 25 casos em 320 px. Resultado final: 100/100 layouts, sem texto SVG cortado nem overflow dos cartões.
- Navegador: pausa, retomada, redução de movimento e saves estáveis nos 25 jogos. Três amostras de 160 ms foram inconclusivas na retomada; a rechecagem em 700 ms confirmou avanço contínuo nos três, sem mudança de código.
- Sem alteração de acesso: o Site permanece público.

## Contratos históricos e limites

`rules-copy-preservation.test.mjs` conserva os SVGs que existiam na sua referência histórica; não exige que jogos posteriores existam naquela revisão. A equivalência byte a byte do CSS finito foi substituída pelas exigências autorizadas de loop, pausa e redução de movimento. O teste novo `rules-scope.test.mjs` mantém a proteção integral da base atual.

Há testes históricos fora do recorte de CI que já exigem layouts/contagens antigas (`rules-below-board`, registros de BROTO/CERCO e outros). Não foram apresentados como verdes nem alterados sem relação com o pedido. Os testes de inventário informam 11 registros de direitos pendentes, condição documental preexistente.

QA por viewports em navegador de desktop, não por aparelhos físicos. Inspeção visual de cartões representativos; medições de limites dos textos SVG em todos os 25. Os SVGs são exemplos didáticos, não gabaritos de fases.

Detalhes dos motores: [lógica](howto-logic-audit.md) e [Versus](howto-versus-audit.md).

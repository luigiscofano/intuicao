# Azulejos PNG transparentes

Os azulejos decorativos foram convertidos para PNG RGBA com fundo transparente. Foram preservadas as formas, orientações, dimensões CSS e cores de cada superfície, inclusive os tons próprios dos cabeçalhos dos jogos.

## Cobertura

- Cabeçalho da biblioteca e cabeçalho compartilhado dos 25 jogos.
- Marcas de categoria, seções e etapas de campanha.
- Conquistas, detalhes do painel lateral e faixa do diálogo de fauna.
- Rodapé, com intervalo real na divisória em vez de um retângulo opaco.
- Quatro peças da comemoração de vitória. O contêiner SVG conserva as animações existentes, mas cada azulejo é uma imagem PNG.

São dez arquivos de 256 × 256 px, suficientes para mais de 3× a maior peça exibida. As imagens são decorativas e não capturam interação. Nenhum motor, regra, campanha, mapa, progresso, ilustração de fauna ou peça funcional do jogo Mosaico mudou. A prévia de reformulação do FOZ não faz parte desta alteração.

## Integração no GitHub

A alteração parte do commit `3c0609db77b66aa27d4d61753e7db7f438b14ba9`, ponta da [PR #61](https://github.com/luigiscofano/intuicao/pull/61). Preserva a cadeia #54–61 e o HTML próprio do GitHub. Não incorpora os geradores da versão v206 do Site. São quatro arquivos existentes de produção alterados e dez PNGs novos.

A origem é o commit Sites `2c85579d10d1401c3a23c9e7650ab79f9eb478b9`. Os 14 arquivos de produção desta alteração foram comparados byte a byte com essa origem. Publicação do Site e merge no GitHub são operações independentes.

## Verificação nesta árvore GitHub

- 662 testes do recorte explícito de CI passaram: 95 de motores, 461 de integração e 106 de Versus. Os cinco testes de PNG estão incluídos nesse recorte.
- Os PNGs foram decodificados com Node, sem dependência gráfica no CI: formato RGBA, dimensões, transparência, bordas suavizadas e cores originais conferidos.
- Recursos locais, 25 entradas do cabeçalho compartilhado, marcação acessível, animações e preservação integral da distribuição fora do escopo conferidos.
- Contratos históricos continuam comparando suas entregas originais. O teste `transparent-tiles.test.mjs` protege o escopo atual contra a base da PR #61, sem referências a commits exclusivos do Sites.
- 88 documentos/752 links locais, 160 recursos inventariados, índice de missões, sintaxe e `git diff --check` aprovados. Permanecem 11 pendências documentais de direitos anteriores.

## Verificação da origem e limites

Na fonte Sites, foram verificados no navegador os cabeçalhos das 25 rotas, biblioteca, conquistas, diálogo de fauna e rodapé. Divisa foi conferido na seleção, dentro da fase e em documento de 390 px. Não é um teste em aparelho móvel físico nem uma sessão visual separada da árvore GitHub.

A suíte ampla da fonte apresentou 1.208 testes: 1.006 aprovados e as mesmas 202 falhas históricas da base v206, sem falha adicional. Esse resultado não é a suíte histórica do GitHub; os 662 testes acima são o recorte executado nesta árvore, não uma declaração de aprovação universal.

## Origem dos recursos e manutenção

Os PNGs são rasterizações dos ornamentos geométricos nativos já presentes no projeto, sem fotografia, arte ou serviço externo. A conversão foi solicitada pelo titular. Mantém-se o regime de direitos reservados dos recursos visuais; esta alteração não concede licença aberta para reutilização das artes. Caminhos, hashes e origem estão no [inventário](recursos/inventario.json).

O script [build-transparent-tiles.mjs](../scripts/build-transparent-tiles.mjs) documenta cores e geometria. Para regenerar os arquivos, é necessário ImageMagick 7 (`magick`) instalado e executar `node scripts/build-transparent-tiles.mjs`. O navegador e o CI de validação não precisam de ImageMagick. Regenerações devem ser revisadas visualmente e ter os hashes do inventário atualizados.

## Recuperação

A base da PR #61 permanece no histórico. A reversão dos quatro arquivos de apresentação e a retirada dos dez PNGs não exigem apagar dados do navegador. A versão anterior do Site continua preservada em seu próprio histórico.

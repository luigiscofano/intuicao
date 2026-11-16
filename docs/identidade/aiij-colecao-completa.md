# Coleção de AIIJs dos 19 jogos

As 13 composições novas aprovadas complementam as seis preexistentes. Foz, Mirante, Renovo, Pulso e Refúgio retomam a apresentação no espaço compacto do cabeçalho, reutilizando exatamente os arquivos originais. Nenhum SVG anterior foi redesenhado ou substituído. Desvio também usa o espaço compacto comum, reutilizando seu SVG original, sem imagem duplicada junto aos controles.

## Arquitetura

O registro em `dist/game-aiij.mjs` cobre os 19 jogos no mesmo local e com as mesmas dimensões. As imagens são decorativas, sem controles ou efeitos em regras e progresso. A largura é 120px no desktop e 72px no celular, com proporções preservadas.

## Validação

O registro único corresponde exatamente ao catálogo ativo de 19 jogos. Testes conferem recursos, dimensões e ausência de execução externa nos SVGs; os hashes dos seis arquivos anteriores continuam idênticos.

Ver [padrão único de apresentação](aiij-padrao-unico.md).

# RENOVO: reformulação aprovada e integração isolada

## Aprovação e conteúdo

Em 12/11/2026, o titular solicitou criar ligações traçando linhas a partir de uma semente ou folha, preservando a ligação por dois cliques. Aprovou a composição C1, a mesma cor em todas as células, a semente P1, o botão B3 e nervuras na folha. A AIIJ C1 foi aprovada separadamente e permanece sem redesenho. A instrução final foi: “Pode aplicar a nova reformulação completa no RENOVO”.

A interação nova aceita mouse, toque e caneta. O traço acrescenta ligações em uma única ação de histórico. Desfazer, refazer, limpar peça, dois cliques, Enter e Espaço permanecem disponíveis. O cancelamento não deve transformar um gesto interrompido em clique sobre uma peça.

## Base e preservação

A base GitHub é a main `3bbed9b6c66f46c1dc021b87b0ea46e1152c81ec`, após o PR #64. A integração porta apenas a reformulação RENOVO, sem substituir a árvore do repositório pela fonte do Site. As versões novas de geradores presentes no Site não fazem parte deste PR.

O contrato `tests/renovo-scope.test.mjs` protege a distribuição fora dos 15 arquivos aprovados e confere os acréscimos exatos na UI lógica e no shell compartilhado. Campanhas, IDs, checker, schema dos saves, demais jogos, FOZ, enquadramento e PNGs existentes permanecem intactos. Os contratos anteriores de escopo continuam verificando suas respectivas entregas históricas.

O ajuste para telas de até 600×500 CSS px limita-se ao RENOVO. Grades densas conservam a rolagem local acessível do enquadramento existente.

## Verificação

Os testes independentes percorrem os trios das 80 campanhas nas duas direções, sem consultar a solução durante a ação. Cobrem geometria, restrições, imutabilidade, histórico, persistência, dois cliques, cancelamento e captura de ponteiro. A revisão incluiu casos de transferência de captura implícita e Escape com ponteiro ainda pressionado.

O recorte automatizado do CI passou em 724 testes (95 de motores, 523 de família lógica e integração, 106 de Versus), além dos estados condicionais de viewport e índice de conquistas. Os 164 recursos têm hashes conferidos; permanecem 11 pendências documentais de direitos anteriores a esta entrega. Foram conferidos 89 documentos e 754 links locais.

A execução ampla dos arquivos `*.test.mjs` não está integralmente verde: a base possui 1.089 aprovações e 210 falhas; o delta final possui 1.121 aprovações e as mesmas 210 falhas, com zero falhas novas por nome. As quatro regressões de captura/cancelamento falham no código original e passam na correção, também em revisão independente.

A verificação visual da implementação foi feita em Chromium: dois cliques, traço vertical, trio em L partindo da folha, desfazer/refazer, Enter/Espaço, retomada após recarga, conclusão automática, janela 333×497, desktop e fase 76. Eventos de toque e caneta foram simulados; não houve teste em aparelho físico. Esses testes não substituem playtest nem certificação de acessibilidade.

## Recursos visuais e direitos

A AIIJ aprovada é preservada nestes arquivos:

- `dist/platform-assets/renovo-aiij-c1.svg`.
- `dist/platform-assets/renovo-aiij-c1.png`, SHA-256 `01cec34f888ef2f33608ba871266a4b20d542770f29dc630faf960fb96b98d54`.

O SVG combina formas vetoriais com três PNGs incorporados, idênticos por SHA-256 aos ornamentos existentes `green-br.png`, `gold-tl.png` e `blue-br.png` de `dist/platform-assets/tiles/`. Os vetores foram desenhados por código. O PNG final foi rasterizado do SVG com Sharp, largura de 1216 px, resultando em 1216×594 com canal alpha. Não usa imagens remotas nem nova imagem externa.

A aprovação autoriza sua incorporação ao Intuição. Mantém-se a política do [projeto](../../README.md#autoria-e-licença): os recursos visuais são excluídos da licença MIT do código. Não há nova licença aberta para reutilização por terceiros. A origem e os hashes são registrados no [inventário](../recursos/inventario.json).

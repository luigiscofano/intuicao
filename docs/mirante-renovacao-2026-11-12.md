# MIRANTE: renovação visual de 12 de novembro de 2026

## Aprovação e escopo

A aprovação autoriza aplicar no Site e no GitHub a combinação do tabuleiro e peças C1 com os observadores C3 amarelo-claro e a AIIJ A aprovada. A orientação corrigida pelo proprietário é: clique direito para X e esquerdo para o normal.

O botão direito do mouse em uma casa marca sempre × vazio, inclusive sobre círculo ou triângulo. Repetir a ação não cria outra transação nem altera a ferramenta selecionada. O botão esquerdo, toque e Enter/espaço usam a ferramenta selecionada; setas, Home/End, desfazer/refazer e restauração de sessão mantêm os caminhos existentes. O atalho não se aplica a toque, caneta, observadores, regiões externas ao tabuleiro, outros jogos, tela de seleção, jogo inativo ou confirmação de reinício aberta.

Motor, regras, 80 fases, soluções, geração sem fim, histórico e persistência não foram alterados. Os estilos e a arte de abertura são específicos do MIRANTE. A referência técnica da revisão é a base Site v211, commit `28e2cee`.

## Arte e proveniência

A AIIJ A em PNG foi conferida byte a byte contra o arquivo aprovado `MIRANTE-AIIJ-A.png`. A composição usa módulos Intuição existentes e composição SVG original, sem geração raster por IA. Esta nota não acrescenta afirmações de titularidade ou licença às informações verificadas no inventário de recursos.

## Verificação independente

- 30 testes em `tests/logica/mirante-input-independent.test.mjs`: quatro estados × cinco ferramentas, repetição, clique esquerdo, Enter/espaço, navegação, exclusão de toque/caneta, isolamento de outros jogos, regiões externas, interrupções, histórico, ramificação e save/restore.
- 24 testes existentes aprovados: motor MIRANTE, módulos compartilhados, integração e setas de fases.
- Renderização das 80 fases: quantidade correta de alvos acessíveis, ausência de valores indefinidos e geometria mínima calculada de 44 pixels por casa.
- Motor, campanha, sessão e armazenamento sem diferenças em relação à base revisada; `git diff --check` aprovado.

## Limites

Os testes de entrada executam os handlers reais em VM com DOM simulado. Não substituem testes em navegador ou dispositivo de toque real. QA desktop no Chrome confirmou a AIIJ, tabuleiro/observadores, botão direito repetido, ferramenta triângulo preservada, clique esquerdo, Enter, desfazer/refazer e ida/volta pelas setas com estado restaurado. Célula observada de aproximadamente 69 pixels no viewport usado. Não houve teste em dispositivo de toque real. Esta nota não certifica publicação, merge ou CI remoto.

## Contratos históricos de escopo

O teste `level-arrows-scope` conserva todas as verificações do PR66 contra sua árvore publicada `d88a3069`, em vez de rejeitar a renovação posterior do MIRANTE. `mirante-scope` compara a árvore de trabalho com essa mesma base e limita o delta de produção, incluindo comparação integral da UI após retirar somente o atalho aprovado. Nenhum gerador do Site foi importado para o GitHub.

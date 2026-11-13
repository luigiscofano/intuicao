# Entrada compacta dos jogos

A tela inicial de cada jogo usa menos espaço antes das instruções e das fases.
O ajuste está centralizado em `dist/selection-presentation.css`.

- Títulos de 24–28 px, mantendo Literata; corpo e controles mantêm Source Sans 3.
- Menos espaçamento na faixa de número/categoria, no retorno e no cabeçalho.
- Retorno com alvo mínimo de 44 px, inclusive no celular.
- Tutorial alinhado pelo topo, sem vazio acima das instruções.
- Regras, animações, AIIJs, modos, mapas, níveis e controles continuam disponíveis.
- Nenhum motor, tabuleiro, save ou gerador foi alterado.
- Os sete Versus continuam sem modos de campanha.

Cobertura estrutural: os 19 jogos do catálogo compartilham a apresentação.
Teste: `node --test tests/compact-game-entry.test.mjs tests/selection-presentation.test.mjs tests/compact-mode-cards.test.mjs tests/presentation-system.test.mjs`.

## Verificação visual

Em Chromium, 57 entradas foram medidas em viewports de iframe: 19 jogos ×
1440, 390 e 320 px. Todas apresentaram seleção, títulos entre 24 e 28 px,
retorno de 44 px e nenhuma rolagem horizontal da página. O Acorde foi
inspecionado visualmente em desktop e celular; margens duplicadas das
instruções e do retorno foram eliminadas. A lista mantém seu espaçamento
próprio e não altera o texto das regras.

31 testes focados passam. A suíte histórica rules-quick-start continua com
uma falha por ainda incluir Dobra, retirado; seus arquivos não foram alterados.
Esta mudança não afirma testar todas as partidas ou dispositivos físicos.

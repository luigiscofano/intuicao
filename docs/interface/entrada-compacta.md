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

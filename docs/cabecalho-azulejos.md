# Cabeçalho: acabamento C

Opção aprovada em 13/11/2026. Substitui a faixa verde grossa por uma linha
fina com três azulejos (verde, amarelo, azul) no extremo direito, seguindo a
prévia. A camada `header-tiles.css` é compartilhada pela página inicial,
biblioteca, conquistas e todos os jogos, inclusive Versus.

Não altera logo, controles, regras, progressos ou geradores. Os azulejos são
fundos PNG transparentes já existentes, sem área interativa. Em telas estreitas,
as peças passam de 22 para 16 px, mantendo o espaço de navegação.

Verificação estrutural: `node tests/header-tiles-tests.mjs`.

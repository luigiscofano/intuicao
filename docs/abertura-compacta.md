# Abertura compacta da biblioteca

A solicitação reduz o espaço ocupado por “A curiosidade é a primeira lição.”.
O ajuste é exclusivamente de apresentação em `dist/approved-opening.css`:

- altura mínima desktop passa de 280 para 214 px;
- título vai de 64 para até 46 px, mantendo a hierarquia;
- os oito azulejos continuam em duas linhas, em escala proporcional de 154 × 76 px;
- os seis animais em destaque, a expansão para quinze e seus diálogos permanecem;
- telas estreitas mantêm conteúdo no fluxo e alvos de toque, com menos margens.

Não altera regras, navegação, partidas, saves, catálogo ou geradores.
A barra verde e a nova marca são trabalhos independentes.

## Verificação

`node --test tests/compact-opening.test.mjs`

Os testes verificam o contrato de CSS; não substituem inspeção visual no navegador.

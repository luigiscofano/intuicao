# Movimento intencional

A mudança é limitada à apresentação ambiental em `ui-motion.css`.

- As folhas que percorriam toda a tela deixam de aparecer. Isso evita passagem sobre texto, controles ou tabuleiros, tanto na biblioteca quanto nas páginas de jogo.
- O acabamento de folhas no chão permanece; sua superfície SVG agora recorta partículas na própria área, em vez de projetá-las sobre o conteúdo acima.
- Azulejos, AIIJs, animais, layout da home, tabuleiros e controles não são alterados.
- Seleção, confirmação, vitórias, conquistas e exemplos de regras continuam com suas animações próprias. A preferência de movimento reduzido não é alterada.

## Verificação

`node --test tests/motion-intent.test.mjs tests/contextual-result-motion.test.mjs`: 7 testes aprovados.

Regressão adicional das regras e celebrações: 37 testes aprovados; três falhas legadas nos testes de catálogo de 20 jogos (ainda incluem Dobra, retirado) e no teste Versus que importa `dist/vertice/engine.mjs`, ausente. Esses arquivos e suas dependências não foram modificados nesta mudança. Não são evidência de regressão da folha de estilo, mas impedem chamar essa suíte antiga de totalmente aprovada.

Não foi feita validação visual em navegador nesta subtarefa. A revisão integrada deve verificar a página com rolagem e o rodapé, incluindo movimento reduzido e telas estreitas.

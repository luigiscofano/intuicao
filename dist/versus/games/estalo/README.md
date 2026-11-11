# ESTALO

Uma disputa de semeadura em um canteiro 4×4. Cada equipe possui oito vagens. No turno, o jogador escolhe uma origem própria, mantém a seta ou a gira em 90° e abre uma cadeia. Cada vagem aberta pontua para seu dono, mesmo se a outra equipe disparou o pulso. Uma casa já aberta encerra o caminho.

## Organização

- `engine.mjs`: percurso determinístico, consumo das vagens, pontuação e verificação do resultado.
- `view.mjs`: seleção da origem, três orientações permitidas, prévia numerada da cadeia e cascas abertas.
- `view.css`: grade responsiva, peças vetoriais com símbolos de posse e controles acessíveis.
- `index.mjs`: regras completas e metadados usados pelo controlador.
- `tests/versus/estalo.test.mjs`: histórico aprovado, circuitos, giros, vitória rival, empate simultâneo e término.

## Estado e ações

`board` contém 16 entradas, da esquerda para a direita e de cima para baixo. Uma entrada é `{ owner, direction }` ou `null` quando a vagem já abriu. As direções são 0 = norte, 1 = leste, 2 = sul e 3 = oeste. `scores` conta as aberturas por dono. `lastChain` preserva apenas a ordem da última cadeia para a apresentação.

Uma ação completa é `{ type: 'burst', cell: 0, turn: 0 }`. `turn` aceita somente -1, 0 ou 1, correspondendo a -90°, manter ou +90°. O giro afeta apenas a origem. As demais vagens seguem suas orientações originais.

O percurso marca a casa como visitada antes de avançar. Assim, um circuito volta a uma casca que acabou de abrir e termina sem uma regra adicional de repetição. Cada turno remove ao menos uma vagem, e o jogo nunca ultrapassa 16 turnos.

**A vitória é verificada somente após a cadeia inteira.** Uma cadeia pode completar a equipe rival ou completar as duas equipes simultaneamente, caso em que há empate.

## Exemplo verificado

A abertura em A1, sem giro, percorre A1 → B1 → B2 → C2 → C3 → B3. O pulso tenta voltar a B2, já aberta. O resultado é Verde 4, Âmbar 2. Âmbar responde por D3 → D4 → C4 e passa a liderar por 5 a 4.

O histórico completo testado usa origens A1, D3, A4, D1, A2 e C1, sempre sem giro, terminando com vitória âmbar por 8 a 7.

## Interação e verificação

Selecionar uma vagem apenas escolhe a origem. Um dos três botões de orientação prepara a jogada completa; o controlador apresenta a prévia e cuida da confirmação. A prévia credita as duas equipes e numera as casas na ordem do percurso.

`selectionForMove(state, move)` recupera a origem e o giro de uma dica do treino. Os botões continuam disponíveis para comparar outra orientação antes de confirmar.

Execute `node --test tests/versus/estalo.test.mjs`. Os testes conferem estados congelados e a invariância `vagens fechadas + pontos = 8` para cada equipe. Não constituem demonstração de equilíbrio entre jogadores.

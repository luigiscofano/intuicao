# ESTALO

Uma disputa de semeadura em canteiros de vários formatos. No mapa Clássico 4×4, cada equipe possui oito vagens. No turno, o jogador escolhe uma origem própria, mantém a seta ou a gira em 90° e abre uma cadeia. Cada vagem aberta pontua para seu dono, mesmo se a outra equipe disparou o pulso. Uma casa já aberta encerra o caminho.

## Organização

- `engine.mjs`: percurso determinístico, consumo das vagens, pontuação e verificação do resultado.
- `view.mjs`: seleção da origem, três orientações permitidas, prévia numerada da cadeia e cascas abertas.
- `view.css`: grade responsiva, peças vetoriais com símbolos de posse e controles acessíveis.
- `index.mjs`: regras completas e metadados usados pelo controlador.
- `tests/versus/estalo.test.mjs`: histórico aprovado, circuitos, giros, vitória rival, empate simultâneo e término.

## Estado e ações

`board` contém `rows × columns` entradas (16 no Clássico), da esquerda para a direita e de cima para baixo. Uma entrada é `{ owner, direction }` ou `null` quando a vagem já abriu. As direções são 0 = norte, 1 = leste, 2 = sul e 3 = oeste. `scores` conta as aberturas por dono. `lastChain` preserva apenas a ordem da última cadeia para a apresentação.

Uma ação completa é `{ type: 'burst', cell: 0, turn: 0 }`. `turn` aceita somente -1, 0 ou 1, correspondendo a -90°, manter ou +90°. O giro afeta apenas a origem. As demais vagens seguem suas orientações originais.

O percurso marca a casa como visitada antes de avançar. Assim, um circuito volta a uma casca que acabou de abrir e termina sem uma regra adicional de repetição. Cada turno remove ao menos uma vagem, e o jogo nunca ultrapassa o número inicial de vagens (16 turnos no Clássico).

**A vitória é verificada somente após a cadeia inteira.** Uma cadeia pode completar a equipe rival ou completar as duas equipes simultaneamente, caso em que há empate.

## Exemplo verificado

A abertura em A1, sem giro, percorre A1 → B1 → B2 → C2 → C3 → B3. O pulso tenta voltar a B2, já aberta. O resultado é Verde 4, Âmbar 2. Âmbar responde por D3 → D4 → C4 e passa a liderar por 5 a 4.

O histórico completo testado usa origens A1, D3, A4, D1, A2 e C1, sempre sem giro, terminando com vitória âmbar por 8 a 7.

## Interação e verificação

Selecionar uma vagem apenas escolhe a origem. Um dos três botões de orientação prepara a jogada completa; o controlador apresenta a prévia e cuida da confirmação. A prévia credita as duas equipes e numera as casas na ordem do percurso.

`selectionForMove(state, move)` recupera a origem e o giro de uma dica do treino. Os botões continuam disponíveis para comparar outra orientação antes de confirmar.

Execute `node --test tests/versus/estalo.test.mjs`. Os testes conferem estados congelados e a invariância `vagens fechadas + pontos = 8` para cada equipe. Não constituem demonstração de equilíbrio entre jogadores.

## Mapas e tamanhos

Na preparação, o seletor **Mapa e tamanho** oferece **42 canteiros: sete opções em cada um dos seis tamanhos**: 4 × 4, 3 × 6, 4 × 6, 6 × 6, 6 × 8 e 8 × 8.

Os sete layouts históricos continuam intactos:

| Mapa | Grade | Vagens por equipe |
| --- | --- | --- |
| Canteiro clássico | 4 × 4 | 8 |
| Canteiro entrelaçado | 4 × 4 | 8 |
| Vereda | 3 × 6 | 9 |
| Horta comprida | 4 × 6 | 12 |
| Bosque | 6 × 6 | 18 |
| Clareira | 6 × 6, sem os quatro cantos | 16 |
| Ilha | 6 × 6, com vazio central 2 × 2 | 16 |

O mapa Clássico mantém exatamente o arranjo anterior e continua padrão. Saves antigos sem `mapId` são reproduzidos nele. Mudar o seletor apenas prepara o próximo duelo; uma partida já salva conserva seu mapa e histórico.

Todos os mapas têm quantidades iguais para os dois jogadores e simetria de rotação de 180° com troca de posse e direção. Não há vitória ou empate na primeira jogada. Essas propriedades evitam vantagens estruturais óbvias, mas não são prova de equilíbrio perfeito ou de ausência de vantagem do primeiro jogador.

Os recortes vazios interrompem a cadeia: o pulso não salta sobre eles. A vitória ocorre ao abrir todas as vagens da equipe, e não sempre oito. A cadeia é resolvida inteira antes de verificar vitória/empate. Os três níveis do computador e os modos locais funcionam com todos os mapas.

`maps.mjs` centraliza layouts imutáveis; o estado guarda `mapId`, dimensões, recortes e metas. As regras de giro, posse e pontuação permanecem as mesmas. O renderer usa essas dimensões para coordenadas, setas e contadores. Não há mapa aleatório gerado durante uma partida.

### Confirmação direta
O primeiro clique ou toque na vagem prepara a direção atual. Repetir na mesma
vagem confirma; as setas laterais continuam permitindo girar antes. Após escolher
um giro, clicar na vagem confirma esse giro. O botão Confirmar permanece disponível,
assim como Enter/espaço; segurar a tecla não dispara jogadas repetidas.


### Expansão do catálogo
As sete famílias por tamanho são Canteiro, Entrelaçado, Clareira, Ilha, Margens,
Passagem e Trilha. Nos tamanhos menores, a diferenciação vem das setas; nos
maiores, recortes simétricos também mudam os percursos. Não são apenas nomes:
testes rejeitam tabuleiros repetidos no mesmo tamanho e áreas desconectadas.
Os IDs históricos são preservados, independentemente do nome da família.
O catálogo é fixo e não modifica geradores de outros modos ou jogos.
O Estalo não possui editor de mapa personalizado; configurações de partida
continuam guardando o ID do mapa e rejeitando IDs desconhecidos.

# Biblioteca com menos divisórias

## Escopo aprovado

A home conserva a identidade Terra e Mata, a frase editorial, os animais,
as categorias e todos os controles. O cabeçalho continua com seu filete e
três azulejos. Apenas a separação redundante dos grupos foi reduzida:

- Retirados os filetes abaixo da frase e da navegação Jogos/Conquistas.
- Retirada a moldura externa de Todos/Favoritos/Recentes.
- Retirado o filete vertical de Editar favoritos.
- Preservados os espaços compactos, o filtro azul selecionado, hover, foco
  de teclado e áreas de toque com pelo menos 44 px de altura.

Não houve mudanças em tabuleiros, regras, conquistas, animações, saves,
rotas ou no visual interno dos jogos. Bordas funcionais não foram removidas.

## Verificação

`node --test tests/library-dividers.test.mjs tests/approved-opening.test.mjs tests/cohesion-contract.test.mjs tests/presentation-system.test.mjs`

20 testes passam no checkout GitHub. O source do Site contém uma cópia
histórica de cohesion-contract que ainda espera 20 jogos; ela falha com os
19 jogos existentes antes desta mudança. Não foi alterada neste escopo.

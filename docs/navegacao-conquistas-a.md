# Navegação de Conquistas — opção A

A biblioteca de jogos permanece a tela principal. As antigas abas Jogos e Conquistas foram removidas; o acesso às conquistas aparece junto de Configurações no cabeçalho, com o símbolo botânico aprovado e o nome por escrito. Sobre o projeto permanece disponível em telas estreitas.

## Comportamento

- O botão abre um `dialog` nativo sobre a tela atual.
- Fechar ou Escape devolve o foco e a posição de rolagem, sem desmontar tabuleiros, reiniciar fases ou escrever em saves.
- A consulta mostra os dados reais de conquistas e atualiza enquanto estiver aberta.
- Links antigos `?screen=achievements` continuam funcionando; ao fechar, somente esse parâmetro é retirado.
- O link das notificações abre o painel sem recarregar a partida. Cliques com modificadores continuam sendo links normais.
- A navegação comum e os filtros de jogos mantêm seus handlers.

## Verificação

70 testes focados passaram: painel, biblioteca, ícone, abertura e casca de jogos. A revisão de navegador deve confirmar layout em 320, 390 e 1280 px, funcionamento com teclado e estado de uma partida aberta ao consultar/fechar o painel. Não publicar antes dessa revisão.

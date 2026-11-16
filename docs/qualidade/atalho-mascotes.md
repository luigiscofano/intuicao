# Atalho dos mascotes no catálogo

O botão **Conheça os mascotes** fica à direita da linha Todos / Favoritos / Recentes / Editar favoritos. Em telas estreitas, quebra para uma linha própria alinhada à direita, preservando alvos de toque de 44 px.

## Comportamento

- Reutiliza o diálogo e os 15 ícones frontais oficiais existentes.
- Mantém o acesso em Sobre o projeto.
- Ao fechar, devolve o foco ao botão usado para abrir.
- O rodapé mostra Voltar aos jogos quando aberto pelo catálogo, ou Voltar ao projeto quando aberto por Sobre.
- Não altera cabeçalho global, filtros, regras ou dados salvos.

## Verificação em 16/11/2026

`node --test tests/mascots-dialog.test.mjs`: 5 testes aprovados.

Chrome headless em perfil isolado: 1440, 760, 390 e 320 px. Verificados abertura por Enter, fechamento por Escape e botão, reabertura, entrada via Sobre, retorno de foco à origem, 15 mascotes, alvos de 44 px e ausência de transbordamento do novo controle. Capturas inspecionadas visualmente em 1440 e 320 px.

A suíte ampliada de apresentação, nesta cópia Windows, apresentou 24 aprovações e 17 falhas de harness VM ao interpretar imports em `achievements-panel` e `library-navigation`. Os módulos afetados por essas falhas não foram alterados; 12 falhas de navegação também foram reproduzidas no checkout paralelo sem esta mudança. O resultado não representa uma suíte global aprovada.

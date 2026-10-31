# VÉRTICE — entrega

## Escopo
Novo 13º jogo, ao final de Versus depois de TRAMA. Malha de nove pontos e doze segmentos, três peças azuis circulares e três losangos lilases; nenhum mascote. Modos local amistoso, competitivo, bot e treino. Regras abertas abaixo do tabuleiro, seguindo o padrão atual aprovado do site.

## Arquivos
- `dist/vertice/engine.mjs`: motor puro, controle dos dois lados, prévia, resultados, ocorrências, histórico e replay estrito.
- `dist/vertice/bot.mjs`, `worker.mjs`, `service.mjs`: três dificuldades, busca limitada, worker e fallback cooperativo cancelável.
- `dist/vertice/ui.mjs`, `ui.css`, `route.mjs`: tela inicial, partida, consulta de apoios, prévia, demonstrações, resultados e persistência exclusiva `intuicao.vertice.v1`.
- Registro aditivo em `app.mjs`, `index.html`, `category-navigation.mjs`, `game-info*`, `game-nav-icons.mjs`, `game-nav-scroll.mjs`, `platform.css`, `rules-examples.*` e `rules-preview.mjs`.
- Testes `vertice-engine`, `vertice-integration`, `vertice-registration`, `vertice-prior-invariance`; listas históricas de registro atualizadas para 13 jogos sem enfraquecer os testes dos jogos anteriores.

## Componentes reutilizados
Shell, navegação de categorias, cards, ícones monocromáticos, informações com atraso, quadro Como jogar, confirmação de reinício, botão circular de reinício, confirmação pelo botão central do mouse, celebração institucional e contratos de desfazer/revanche. Regras e imagens dos outros doze jogos não foram reescritas.

## Regras verificadas
Controle exclusivo de vazios com pelo menos dois apoios ortogonais, inclusive curva em L; centro 2×2 disputado; ocupado não pontua; mover ou ocupar recalcula ambos os jogadores. Vitória inclusive do adversário do autor vem antes de bloqueio, repetição e limite. Bloqueio resulta em empate, não derrota. Terceira ocorrência inclui a abertura e distingue o jogador da vez. Limite de 60 ações individuais.
Sequência obrigatória 1→2, 5→4, 0→1, 7→6, 3→0: placares 1/1, 1/1, 1/1, 1/2, 0/3; Jogador 2 vence por ação do Jogador 1.

## Verificação
- 124 testes Node nos quatro novos jogos Versus e integração compartilhada, incluindo 34 específicos iniciais de VÉRTICE e invariância adicional.
- Oráculo independente de todas as 1.680 ocupações válidas e 500 partidas completas; outra bateria independente de 500 partidas no motor.
- Replays reais de bloqueio em sete ações, repetição em oito e limite em 60; restauração e histórico exatos.
- 69 verificações no navegador: abertura, prévia sem mutação, consulta de apoios, cinco ações obrigatórias, vitória adversária, três empates, histórico, reinício/cancelamento, revanche, bot, treino e registro inválido preservado, em 1366/390/320 px.
- 13 verificações extras de ciclo: saída/reentrada, resposta cancelada, reset/nova partida durante resposta, bot iniciando revanche, undo da abertura protegido, retomada sem duplicação, movimento reduzido e isolamento de saves. Usa worker real com entrega atrasada artificialmente para testar cancelamento de forma determinística, não para medir desempenho.
- 36 casos de regressão: doze jogos anteriores × três larguras, cards/ícones/informações, primeira partida, root único e ausência de overflow horizontal.
- Alvos medidos: 64 px desktop, 48 px compactos. Confirmar 19 px abaixo da malha no desktop e 17 px em 390/320. Regras abaixo, sem rolagem interna.
- Entrada nativa por clique e teclado: setas consultam apoios, Enter seleciona e pré-visualiza, Espaço confirma. Capturas desktop e 320 px inspecionadas.
- Todos os arquivos de jogos/assets anteriores fora dos pontos aditivos de registro têm hashes idênticos ao commit `083b8bc37b88f80b609ea2f33983b63d5ded113e`; 12 informações, ilustrações Como jogar e pictogramas preservados exatamente.

## Correções encontradas no QA
Seletor do modal de reinício corrigido; exemplos agora demonstram exatamente dois apoios retos e em L; listener de consulta por foco corrigido para `addEventListener`, sem recriar o botão entre foco e clique. Os símbolos dos cartões possuem dimensões próprias, sem herdar tamanhos das peças.

## Limites honestos
Bot heurístico com orçamento, não solução exata nem promessa de invencibilidade/equilíbrio. Não houve teste com participantes humanos ou dispositivo físico de toque: larguras móveis foram verificadas em iframes do navegador real. Vitória exatamente na ação 60 foi testada por estado unitário de fronteira; não foi encontrado replay real desse caso na busca adicional. Replays reais de empate na ação 60 foram verificados. Saves antigos conservados; a metadata preexistente `lastView.active` pode mudar ao sair de uma rota, sem alterar sua partida. Sem servidor/contas/bot remoto, campanhas ou ranking novos.

# Confirmação próxima ao tabuleiro nos Versus

## Resultado

- Os oito Versus novos confirmam ao repetir a mesma escolha completa. Uma origem ou peça sozinha não confirma.
- DESVIO, BROTO e CERCO conservam o segundo clique já existente.
- Os onze jogos mantêm um único botão Confirmar junto ao tabuleiro, com altura mínima de 44 px.
- Enter/espaço selecionam e confirmam; Escape cancela. Repetição automática de tecla é bloqueada.
- Confirmação/cancelamento preservam foco no controle ou retornam ao tabuleiro/turno quando o alvo deixa de ser utilizável.
- A prévia não desloca os alvos em ENLACE, VAZANTE, MOSAICO, QUINHÃO, ESTALO e DOBRA.

## Verificações

Node: 172 testes relevantes aprovados, incluindo partidas completas dos oito motores novos, IA, ações legais, términos/empates, histórico, replay, cancelamento e controles do shell. A suíte expandida reproduziu as mesmas 11 falhas anteriores à mudança (guardas históricas de hashes/escopo e referências a TRAMA removido), sem falha nova.

Navegador Chromium, preview integrado sobre a base responsiva:

- Duplo clique real confirmou uma jogada nos onze Versus, respeitando as etapas de cada um.
- MOSAICO: duas ativações Enter, Escape, botão Confirmar e retorno do foco ao tabuleiro verificados.
- MOSAICO contra computador: resposta legal da IA e desfazer até a decisão humana inicial verificados.
- QUINHÃO: 24 cestos permanecem durante a prévia; os botões de escolha mantêm exatamente sua posição; a confirmação remove três; desfazer restaura os 24.
- DESVIO: casa L1C1 passou a consumida e turno mudou para jogador 2.
- BROTO e CERCO: segundo clique no plantio/destino trocou o jogador/time.
- Matriz de 44 casos (11 jogos × larguras 320, 375, 768 e 1200): nenhum overflow horizontal, nenhum botão duplicado, botão dentro da área jogável e altura de 44 px.
- Inspeção visual móvel: Confirmar/Cancelar lado a lado abaixo da grade de MOSAICO, antes das legendas. Intervalo medido de 24 px; LASTRO tem intervalo de 16 px após o instrumento.

A largura móvel foi simulada em iframe; não foi usado um aparelho físico de toque. A entrada por toque usa o mesmo evento click padrão e touch-action: manipulation, sem depender de dblclick nativo.

Os testes finais usaram uma cópia temporária com armazenamento exclusivamente em memória. Nenhuma sessão existente foi apagada. As duas páginas temporárias de QA foram retiradas de dist antes da publicação.

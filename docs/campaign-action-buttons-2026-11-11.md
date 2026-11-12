# Botões de campanha com ícones e cores

Implementa a prévia aprovada em 11/11/2026. São 14 jogos: Reflexos, Corte certo, Elo, Prumo, Pacto, Sintonia, Repasse, Órbita, Divisa, Pulso, Foz, Refúgio, Mirante e Renovo. Os 11 jogos Versus não recebem esta camada.

## Sistema visual

- Confirmar/Checar principal: verde, com confirmação dentro de um círculo.
- Checar auxiliar de Elo/Prumo/Pacto: verde claro; continua distinto de Confirmar resposta.
- Desfazer: azul claro, seta para a esquerda.
- Refazer: ocre claro, seta para a direita.
- Reiniciar: papel com contorno terra, seta circular.
- Estado indisponível: fundo neutro; não depende só de transparência.
- Alvos mínimos de 46 px, foco de teclado com contorno externo e quebra de linha do grupo histórico quando necessário.

O contraste calculado dos textos ativos é de pelo menos 6,4:1. Cores não substituem os rótulos nem as formas dos ícones. O modo de alto contraste usa cores do sistema.

## Preservação

A classe `approved-campaign-actions` depende do jogo ativo no shell, sendo retirada no catálogo, conquistas e Versus. Os controles reais não são substituídos nem clonados. Os SVGs são máscaras CSS decorativas, portanto sobrevivem à atualização do texto “Raio em percurso…” de Reflexos. O nome acessível de Reiniciar é explicitado apenas nos controles legados de campanha para evitar duplicação do texto gerado visualmente.

Não há mudança de eventos, funções, motores, níveis, armazenamento, histórico, vitórias ou progresso. `hidden` e `disabled` permanecem soberanos. Os botões Confirmar de Sintonia, Repasse e Órbita continuam ocultos e a conclusão automática continua intacta.

## Testes

- `tests/campaign-action-buttons.test.mjs`: escopo 14/11, seletores, ícones, contraste, estados, confirmação automática e carregamento.
- `tests/approved-game-shell.test.mjs`: todos os 25 jogos, identidade dos nós/handlers, rótulos, hidden/disabled, retorno ao catálogo e remoção do estilo.
- Suítes de lógica, motores Sintonia/Repasse/Órbita e backup: verificadas em conjunto.

As suítes históricas `focused-game-controls`, `arrow-only-controls` e `compact-collection-controls` contêm quatro falhas pré-existentes, reproduzidas sem mudanças sobre v198. Não foram enfraquecidas para acomodar esta entrega.

## Verificação no navegador

A matriz `tests/browser/campaign-action-buttons.html` passou nos 14 jogos em 320 × 568, 360 × 640, 390 × 844 e 1024 × 768: 56 de 56 casos. Foram verificados alvos de 46 px, máscaras dos ícones, rótulos acessíveis, controles automáticos ocultos e ausência de transbordamento horizontal.

Em 360 × 640, Divisa foi testado com marcação, Desfazer, Refazer, Checar e Reiniciar (cancelando e confirmando). Reflexos foi concluído pelo botão Confirmar todos; a indicação de nível concluído continuou presente após uma nova navegação. As telas foram inspecionadas visualmente. O armazenamento e as sessões existentes não foram apagados.

## Integração e proteção da base

A integração com a confirmação próxima/repetida de Versus e com a responsividade passou nos 574 testes do recorte explícito do CI. Documentação, inventário de recursos e índice de missões também foram conferidos. As comparações históricas de escopo foram atualizadas apenas para os arquivos autorizados; uma comparação adicional com a árvore responsiva mantém motores, níveis, armazenamento e artes fora do escopo protegidos.

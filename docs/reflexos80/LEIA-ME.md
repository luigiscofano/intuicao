# REFLEXOS — campanha de 80 níveis

Revisão de 30/10/2026. Seis faixas: Básico 1–15; Aprendiz 16–30; Intermediário 31–45; Avançado 46–60; Mestre 61–75; Modo Sábio 76–80.

## O que foi verificado

- 80 soluções conjuntas e 80 inícios não resolvidos.
- 64 fases com configuração completa que vence por cor isolada e conflita em conjunto: 5/13/13/14/14/5 por faixa; 51 sem paredes.
- Seis fases com espelho simultaneamente compartilhado por cores distintas: 18, 29, 40, 52, 64 e 78.
- Incidências de referência ≥30°, medidas contra a superfície. Nenhuma exceção entre 20° e 30°.
- 1.938 perturbações conjuntas de ±0,5°: nenhuma derrota ou mudança de itinerário. Folgas mínimas amostradas: extremidades 12,465; paredes 6,396; alvos 5,484; portais 6,327; cores 6,335 unidades do tabuleiro.
- 16 conceitos e dez padrões A–J, sem três núcleos de decisão iguais consecutivos.
- 80 vitórias pelo gabarito no teste DOM da aplicação; 240 erros completos verificam a liberação após três erros. Navegação, histórico por ID, desfazer/refazer, reinício e isolamento de importação/Modo Sem Parar preservados.

## Arquivos

- `80-registros-completos.json`: definições, descoberta, alternativa que falha, dependências, justificativa de faixa, origem, soluções, contraprovas, contatos compartilhados, margens e todas as perturbações.
- `80-registros-tabela.csv`: tabela dos 80 registros, separador ponto e vírgula, UTF-8.
- `80-definicoes-jogaveis.json`: definições jogáveis sem logs de auditoria.
- `indice-80.md`: índice breve por número, ID e faixa.
- `revisao-editorial-independente.md`, `physics-review.md`, `physics-summary.json` e `ui-verification.md`: escopo e limites das revisões independentes.

## Preservação

A física, reflexão, colisões, tolerâncias, comprimentos, raios, renderização, controles e botões não mudaram. 236 arquivos anteriores de `dist` são idênticos; fora dos novos arquivos documentais, mudaram apenas a lista de fases e três linhas da seleção de campanha. As seis outras campanhas anteriores permanecem intactas.

76 desafios conservam geometria e ID. As fases 4, 64, 78 e 79 têm novas identidades; não recebem rascunhos, assistência ou conclusões da geometria anterior. As 500 definições anteriores e seus registros permanecem arquivados no Site. Endless/Modo Sem Parar e fases próprias ficam fora dos 80.

A interface atual prevalece sobre instruções históricas: dicas visíveis apenas em PACTO; painel avançado apenas em REFLEXOS; regras à direita e confirmação conjunta preservadas.

## Limites

Testes finitos não provam unicidade, uso necessário de cada recurso, mínimo global de peças, ausência de qualquer atalho contínuo ou conforto de toda configuração angular. Há alternativas conhecidas válidas entre 20° e 30°; o motor não as proíbe. A campanha não foi calibrada com jogadores.

A verificação visual nativa não foi concluída: o provedor de entrada AT-SPI do Chromium estava indisponível. Não houve nova tentativa de DevTools/CDP bloqueado nem teste móvel. A cobertura DOM determinística não é apresentada como teste visual ou humano.

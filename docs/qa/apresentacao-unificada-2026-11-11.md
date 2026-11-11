# Apresentação unificada dos jogos

## Escopo e base

Pedido: padronizar Como jogar, Desafio diário, Modo sem parar e Níveis, sem diário ou modo sem parar nos jogos Versus. Integração sobre PR59, commit `669fbe8b917bff01db99cb05582862b0818a5bb2`, preservando a cadeia de PRs54–59. Delta de origem aplicado sobre Site v203, commit `2be41960f38dad9c5401e4812a78574864f05afc`; os arquivos próprios de documentação e formatação do GitHub não foram substituídos em massa.

A distribuição muda somente nove arquivos: index, app, collection-ui, logica/storage, logica/ui e quatro módulos/folhas novos (daily-challenge, logica/endless e selection-presentation.mjs/.css). Os 25 cartões de regras ilustradas, motores, campanhas, artes e interfaces dos oito novos duelos permanecem intactos. DESVIO somente oculta seus dois controles de modo solo; mapas e dados existentes são preservados.

Reflexos e Corte certo usam a data de São Paulo para selecionar uma das 80 fases existentes. Não são fases inéditas. As seis sequências lógicas usam as 80 fases certificadas em ciclos, com sessão própria incluída no backup existente; não concluem fases da campanha. [Detalhes da sessão contínua](logica-sem-parar-2026-11-11.md).

## Verificação local da integração GitHub

Node.js 24.22.1. Antes da edição: 611/611 testes do recorte explícito de CI. Após portar: 627/627 (95 motores anteriores, 426 integração/lógica/apresentação e 106 Versus), zero falhas. Documentação, índice de conquistas e inventário passaram. O inventário continua com 150 recursos e 11 pendências documentais de direitos preexistentes; nenhum recurso visual foi acrescentado ou removido.

Os snapshots históricos das entregas de regras e ajuste responsivo permanecem executáveis contra suas revisões congeladas. O novo presentation-scope protege todos os arquivos fora da whitelist mínima contra PR59, verifica o index integral removendo apenas as três inserções autorizadas e exige que collection-ui só difira nas duas condições hidden de DESVIO. Identidade continua verificando markup e arquivos preservados, com exceções explícitas para a nova entrega.

## Verificação no navegador

Matriz de 25 jogos em 1440, 768, 390 e 320 px: 100/100 layouts aprovados. As 25 entradas em jogo e as 28 entradas de diário/sem parar das 14 campanhas passaram. Nos seis jogos lógicos, uma vitória real pelo gabarito assistido seguido de Checar verificou avanço automático, retomada, recarga e preservação da campanha. Zero erros JavaScript ou overflow. Capturas inspecionadas de ELO em 1000 px, DIVISA em 320 px e CERCO em 390 px. Navegador isolado com armazenamento sintético. A fonte do Site também passou 525 testes selecionados; esse recorte é distinto dos 627 testes da integração GitHub.

## Limites

Esses números representam o recorte de CI, não todos os testes históricos do repositório. Não foram executados geradores. A verificação no navegador é distinta dos testes de DOM; os resultados estão registrados acima. Não houve teste em hardware físico com toque. CI remota da nova branch só pode ser verificada após publicação; push, PR, merge e publicação do Site são etapas independentes.

# Módulos de ÓRBITA

Este diretório implementa permutações em anéis e objetivos simultâneos. Comece pelo [manual completo](../../docs/jogos/orbita/README.md), que reúne regras, exemplo, estado do catálogo e pontos de entrada.

## Ler na ordem

Leia `engine.mjs` para regras e estado, o catálogo ou mapa importado pela rota, `route.mjs` para integração e `ui.mjs` para interação. Arquivos de serviço, worker e análise, quando presentes, tratam trabalhos de busca e geração fora do fluxo imediato da interface.

## Inventário de arquivos

- [analysis.mjs](analysis.mjs)
- [authored-patterns.mjs](authored-patterns.mjs)
- [campaign.mjs](campaign.mjs)
- [catalog-legacy1000.mjs](catalog-legacy1000.mjs)
- [catalog.mjs](catalog.mjs)
- [compact-catalog.mjs](compact-catalog.mjs)
- [design-evidence.mjs](design-evidence.mjs)
- [diversity.mjs](diversity.mjs)
- [endless-v2.mjs](endless-v2.mjs)
- [engine.mjs](engine.mjs)
- [fallback.mjs](fallback.mjs)
- [generator-v2.mjs](generator-v2.mjs)
- [generator-v3.mjs](generator-v3.mjs)
- [generator.mjs](generator.mjs)
- [presentation-fit.mjs](presentation-fit.mjs)
- [ring-selection.mjs](ring-selection.mjs)
- [route.mjs](route.mjs)
- [service.mjs](service.mjs)
- [symbols.mjs](symbols.mjs)
- [topology-braid-order.mjs](topology-braid-order.mjs)
- [topology-circles-v3.mjs](topology-circles-v3.mjs)
- [topology-v2.mjs](topology-v2.mjs)
- [topology.mjs](topology.mjs)
- [ui.css](ui.css)
- [ui.mjs](ui.mjs)
- [worker.mjs](worker.mjs)

## Executar e verificar

Sirva a pasta `dist` a partir da raiz do repositório. Este módulo não é uma aplicação independente e não tem instalação npm própria. Consulte [execução](../../docs/setup/README.md) e [testes](../../tests/README.md).

## Cuidados de manutenção

Preservar IDs das 72 fases não substituídas pelo catálogo compacto e não herdar conclusão nas oito novas definições. Algumas descrições históricas falam em 500/1.000 fases; a campanha ativa tem 80.

Preserve a separação entre regra, animação e armazenamento. Não mova um módulo sem atualizar imports e testes que o referenciam. Catálogos anteriores podem ser necessários para interpretar saves antigos.

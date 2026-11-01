# Módulos de REPASSE

Este diretório implementa ordem de remoção e propagação de valores. Comece pelo [manual completo](../../docs/jogos/repasse/README.md), que reúne regras, exemplo, estado do catálogo e pontos de entrada.

## Ler na ordem

Leia `engine.mjs` para regras e estado, o catálogo ou mapa importado pela rota, `route.mjs` para integração e `ui.mjs` para interação. Arquivos de serviço, worker e análise, quando presentes, tratam trabalhos de busca e geração fora do fluxo imediato da interface.

## Inventário de arquivos

- [analysis.mjs](analysis.mjs)
- [campaign.mjs](campaign.mjs)
- [certification.mjs](certification.mjs)
- [engine.mjs](engine.mjs)
- [fallback.mjs](fallback.mjs)
- [generator.mjs](generator.mjs)
- [route.mjs](route.mjs)
- [service.mjs](service.mjs)
- [ui.css](ui.css)
- [ui.mjs](ui.mjs)
- [worker.mjs](worker.mjs)

## Executar e verificar

Sirva a pasta `dist` a partir da raiz do repositório. Este módulo não é uma aplicação independente e não tem instalação npm própria. Consulte [execução](../../docs/setup/README.md) e [testes](../../tests/README.md).

## Cuidados de manutenção

Cobrir metas zero, excesso, retirada repetida, receptor ausente e inteiros seguros. Grade vazia só é vitória quando todas as metas de borda são exatas.

Preserve a separação entre regra, animação e armazenamento. Não mova um módulo sem atualizar imports e testes que o referenciam. Catálogos anteriores podem ser necessários para interpretar saves antigos.

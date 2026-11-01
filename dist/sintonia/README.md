# Módulos de SINTONIA

Este diretório implementa comandos simultâneos e coordenação de estados. Comece pelo [manual completo](../../docs/jogos/sintonia/README.md), que reúne regras, exemplo, estado do catálogo e pontos de entrada.

## Ler na ordem

Leia `engine.mjs` para regras e estado, o catálogo ou mapa importado pela rota, `route.mjs` para integração e `ui.mjs` para interação. Arquivos de serviço, worker e análise, quando presentes, tratam trabalhos de busca e geração fora do fluxo imediato da interface.

## Inventário de arquivos

- [accessory-art.css](accessory-art.css)
- [accessory-art.mjs](accessory-art.mjs)
- [accessory-palette.mjs](accessory-palette.mjs)
- [active-rules.mjs](active-rules.mjs)
- [analysis.mjs](analysis.mjs)
- [animal-roster.mjs](animal-roster.mjs)
- [assets.mjs](assets.mjs)
- [box-design.mjs](box-design.mjs)
- [campaign-v1.mjs](campaign-v1.mjs)
- [campaign-v2.mjs](campaign-v2.mjs)
- [campaign-v3.mjs](campaign-v3.mjs)
- [campaign-v4.mjs](campaign-v4.mjs)
- [campaign.mjs](campaign.mjs)
- [delivery-design.mjs](delivery-design.mjs)
- [engine.mjs](engine.mjs)
- [fallback.mjs](fallback.mjs)
- [generator.mjs](generator.mjs)
- [obstacle-design.mjs](obstacle-design.mjs)
- [purpose.mjs](purpose.mjs)
- [route.mjs](route.mjs)
- [scenery.css](scenery.css)
- [scenery.mjs](scenery.mjs)
- [service.mjs](service.mjs)
- [ui.css](ui.css)
- [ui.mjs](ui.mjs)
- [worker.mjs](worker.mjs)

## Executar e verificar

Sirva a pasta `dist` a partir da raiz do repositório. Este módulo não é uma aplicação independente e não tem instalação npm própria. Consulte [execução](../../docs/setup/README.md) e [testes](../../tests/README.md).

## Cuidados de manutenção

Cobrir bloqueios, portas, placas, chaves, gelo e separação entre destino e mecanismo. Há uma correção de idempotência de migração documentada na revisão f0e7fcf, ainda ausente desta base: não declarar essa correção incorporada.

Preserve a separação entre regra, animação e armazenamento. Não mova um módulo sem atualizar imports e testes que o referenciam. Catálogos anteriores podem ser necessários para interpretar saves antigos.

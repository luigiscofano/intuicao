# Módulos de BROTO

Este diretório implementa estímulos por eixos e efeitos compartilhados. Comece pelo [manual completo](../../docs/jogos/broto/README.md), que reúne regras, exemplo, estado do catálogo e pontos de entrada.

## Ler na ordem

Leia `engine.mjs` para regras e estado, o catálogo ou mapa importado pela rota, `route.mjs` para integração e `ui.mjs` para interação. Arquivos de serviço, worker e análise, quando presentes, tratam trabalhos de busca e geração fora do fluxo imediato da interface.

## Inventário de arquivos

- [engine.mjs](engine.mjs)
- [maps.mjs](maps.mjs)
- [route.mjs](route.mjs)
- [ui.css](ui.css)
- [ui.mjs](ui.mjs)

## Executar e verificar

Sirva a pasta `dist` a partir da raiz do repositório. Este módulo não é uma aplicação independente e não tem instalação npm própria. Consulte [execução](../../docs/setup/README.md) e [testes](../../tests/README.md).

## Cuidados de manutenção

Jogador 1 inicia novo duelo e revanche; a segunda rodada alterna o iniciador. Verificar resolução simultânea, pontuação por dono, reservas e restauração por replay. Os sete mapas são variações de duelo, não níveis de campanha.

Preserve a separação entre regra, animação e armazenamento. Não mova um módulo sem atualizar imports e testes que o referenciam. Catálogos anteriores podem ser necessários para interpretar saves antigos.

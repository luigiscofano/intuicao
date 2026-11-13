# Refinamento transversal do Intuição

A direção mantém Terra e Mata, o azulejo, as AIIJs individuais, os animais reais e a tipografia C (Literata/Source Sans 3). Não é uma nova skin nem uma reformulação das regras.

## Responsabilidades

- `presentation-system.css`: tokens de superfície e acabamento compartilhado de biblioteca, conquistas, diálogos e partidas. Não seleciona células ou SVGs genéricos.
- `approved-game-shell.css`: composição externa, espaço disponível e superfície clara. A geometria de cada jogo continua nos arquivos específicos e no sistema de viewport.
- `action-sidebar.css`: ações nativas menores (44 px), com ícone, nome e cor semântica: verde confirmar; azul histórico; ocre reiniciar; papel ajuda. Comandos avançados não disputam o destaque da confirmação.
- `selection-presentation.css`: etapas com papel claro, regras em superfície secundária e bordas menos pesadas.
- `category-navigation.mjs`: a introdução da biblioteca não se repete sobre o título de Conquistas. A home recebe apenas a faixa editorial aprovada separadamente.
- `ui-motion.css`: elimina partículas ambientais sobre a leitura, preserva animações dos jogos e respeita movimento reduzido.

## Limites deliberados

Não modifica motores, níveis, IA, progresso, persistência, sprites, AIIJs ou peças. Integra a faixa editorial da home aprovada separadamente, documentada em `faixa-editorial-2026-11-13.md`. Não integra o estudo separado dos jogadores em lados opostos. Nenhum jogo removido retorna. A alternância de skins existente permanece.

O acabamento evita substituir a personalidade de cada tabuleiro por cartões genéricos. Azulejos continuam nas divisões, animais mantêm o papel de identidade dos jogadores e descobertas; nenhuma decoração nova é espalhada.

## Verificação

Testes específicos de contrato em `tests/presentation-system.test.mjs` e `tests/motion-intent.test.mjs`. Matriz e evidências de QA estão em `design-system-coverage.md`; estágios ainda não executados devem ser explicitamente marcados, não presumidos.

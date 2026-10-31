# CERCO — entrega

Novo jogo Versus local, contra bot e treino; tabuleiro 5×5, seis peças, barreiras permanentes na origem e derrota somente quando o time da vez inteiro perde a mobilidade. Revanche alterna o iniciador. Não há campanha, servidor, captura ou mascote com vantagem.

## Arquivos
- `dist/cerco/{engine,bot,worker,service,ui,route}.mjs` e `ui.css`: regras puras, busca limitada cancelável, interface, persistência própria e navegação.
- Registro aditivo em `app.mjs`, `index.html`, `category-navigation.mjs`, `game-nav-{icons,scroll}.mjs`, `game-info*`, `rules-{examples,preview}*`, `platform.css`.
- Testes CERCO engine/bot/integration/registration; expectativas aditivas nos testes BROTO/card/rules.

## Componentes reaproveitados
Moldura e controles do laboratório, confirmação de reinício, regras abertas abaixo, informações com atraso/padding padrão, pictograma monocromático, banner PARABÉNS e botão circular de reinício. Catálogo e recortes originais dos 15 ícones de frente usados diretamente; nenhuma arte nova ou recoloração.

## Verificações
- 32 testes de motor/bot/integração/registro e componentes passaram. Incluem 2.000 partidas geradas e oráculo independente de 500 partidas: seis peças conservadas, máximo 19 ações, resultado correto e replay canônico.
- Regressão BROTO: 24 testes passaram, incluindo 500 duelos e 3.200 jogadas comparadas a oráculo; hash dos nove jogos originais preservado. Os dez conjuntos anteriores de informações, diagramas e pictogramas também são idênticos à versão anterior.
- Navegador: cliques reais peça→destino→confirmar, setas/Enter/Escape e cancelamento de reinício. Fixture de 30 entradas (dez jogos anteriores × 1366/390/320) sem overflow horizontal, CERCO oculto corretamente.
- Fixture de ciclo de vida: 23 verificações aprovadas, incluindo competitivo, 15 mascotes/mesmo animal para ambos, três camadas de treino sem mutação, saída durante movimento/busca, retomada única do bot, reinício/cancelamento durante busca e retry preservando identidade/iniciador.
- Revisão encontrou e corrigiu corrida em erro tardio de Worker cancelado; regressão dedicada passou.

## Limites
Busca heurística com orçamento, não solução perfeita nem prova de equilíbrio. Simulações e QA de interface não substituem estudo de usabilidade ou partidas humanas. Fixtures exercitam eventos DOM no navegador real; somente os controles descritos acima foram operados também com entrada nativa. Não houve alteração de motores, fases ou arte dos outros jogos. Fixtures temporários excluídos da publicação.

### QA responsivo final
83 verificações funcionais passaram no fixture de interface: três partidas completas de 17 ações, reload terminal/em andamento, retry, revanche alternada, preview imutável, tutorial isolado, undo/refazer local e par humano/bot, save inválido preservado até início explícito. Células medidas: 68,80 px (1366), 59,39 px (390), 45,39 px (320). Confirmar fica 12 px abaixo da moldura (18–19 px do grid interno). Regras abaixo abertas e sem overflow. Capturas desktop e viewport responsivo 320 inspecionadas.

A asserção estrita de identidade de todas as chaves detectou metadado herdado de navegação BROTO. Diff isolado confirmou **somente** `.lastView.active: true → false`, escrito pelo `hide()` preexistente de BROTO; o objeto `state` permaneceu integralmente idêntico. Não foi alterado o mecanismo anterior nem o save do jogo para esconder esse efeito esperado de navegação.

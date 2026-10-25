# Reinício instantâneo após derrota

Implementado em 25/10/2026 sobre a versão 72 do Intuição, a pedido do usuário, nos oito jogos: Reflexos, Corte certo, ELO, PRUMO, PACTO, DESVIO, SINTONIA e REPASSE.

## Comportamento

Após uma derrota ou confirmação incorreta, a área de resultado mostra um botão circular verde, de 52 × 52 px, com seta circular branca. Clique, toque ou ativação por teclado reiniciam imediatamente o mesmo desafio. Esse botão não abre diálogo. O botão normal da barra continua usando a confirmação existente.

O componente comum `result-motion.mjs` recebe uma rotina de reinício. O token do resultado e a desabilitação na ativação impedem que cliques repetidos ou callbacks antigos reiniciem outra tentativa. O botão é acessível, tem foco visível e é a única parte interativa da área de efeitos.

Cada jogo reutiliza sua rotina normal de reinício confirmado. Nível, definição, seed do Endless, progresso concluído e contadores são preservados. O reinício limpa somente a tentativa atual, incluindo histórico e trabalhos assíncronos pendentes.

No DESVIO contra o bot, a derrota oferece o botão; vitórias mantêm o comportamento anterior. Em partidas locais, competitivas e de treino, o encerramento oferece reinício mantendo o vencedor visível, o mesmo mapa e quem começou. Não é a ação de revanche que inverte o início.

REPASSE também oferece o botão ao produzir uma derrota já comprovada pelo motor, como excesso de meta. SINTONIA e REPASSE o oferecem quando uma análise comprova impossibilidade. A presença do botão não bloqueia continuar explorando ou desfazer.

## Verificação

- Navegador: derrota e reinício direto nos oito jogos, sem diálogo, permanecendo no mesmo desafio.
- Reflexos: ativação do botão por Enter; formato renderizado de 52 × 52 px, raio de 50% e cliques habilitados.
- ELO: o botão continua disponível depois de abrir opções avançadas.
- REPASSE: derrota automática por excesso de meta na fase 3 e recuperação das duas peças por um clique.
- DESVIO: D-01 contra bot Exato e no modo competitivo, com reinício no jogador 1 e restrição inicial na linha 3.
- SINTONIA e REPASSE Endless: definição exportável, número do desafio e contagem de conclusões iguais antes e depois do botão; histórico reiniciado.
- Harness dos módulos reais: Reflexos e Corte certo Endless com seed, configuração e contadores preservados, tentativa inicial restaurada, nenhum diálogo e clique antigo ignorado.
- Coleção: 12 verificações direcionadas do botão, incluindo os quatro modos de DESVIO, campanha, Endless e descarte de callbacks antigos.
- Testes existentes de reinício original, reinício da coleção e interface Endless da coleção aprovados; testes de estado de SINTONIA (8) e REPASSE (10) aprovados.
- Sintaxe e `git diff --check` aprovados.

Não houve alteração de motores, regras, física, catálogos ou recursos visuais dos jogos. As comparações históricas que exigiam resultado de derrota vazio precedem esta mudança explicitamente solicitada e não descrevem mais a interface desejada.

Captura da interface: `docs/intuicao-reinicio-instantaneo-1792950788305.jpg`.

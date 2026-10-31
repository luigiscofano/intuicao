# Resultado lateral — CERCO e BROTO

Solicitação: apresentar o resultado final à direita do tabuleiro, centralizando o conjunto e retornando o jogo ao centro quando o resultado é removido.

Base: `cc58f12a0103ff7459535a699e43bb423ac2e8cd`.

## Contrato
- Apenas apresentação dos dois jogos; mapas, motores, bot, persistência, peças e cores permanecem intactos.
- Moldura da área de jogo e regras abaixo preservadas; preparação e seleção de mapas sem mudança.
- Resultado lateral somente quando a largura comporta tabuleiro legível e painel. Em telas estreitas, resultado abaixo, sem coluna vazia e sem comprimir células.
- Animações específicas existentes mantidas; empate/perda não anunciam falsa vitória. Primeira rodada de BROTO não é vitória final.
- Transição horizontal curta, cancelável e dispensada em reduced-motion/restauração inicial.

## Testes
- 48 testes Node iniciais aprovados: motores, mapas e preservação do restante do site, incluindo 500 duelos BROTO, 2000 partidas CERCO e 2800 partidas CERCO nos mapas.

## Implementação e regressões
- Novo helper `dist/duel-result-layout.mjs`: FLIP horizontal de360ms ancorado no próprio tabuleiro (não na coluna, cuja largura muda), com cancelamento ao reiniciar, desfazer, sair, redimensionar ou mudar preferência de movimento.
- Painel final com fade discreto enquanto o tabuleiro libera a posição direita; a cena específica existente não foi alterada.
- Container queries usam714px úteis como mínimo para390px de coluna de jogo +24px de separação +300px de resultado. Abaixo disso, painel abaixo do tabuleiro.
- Primeira rodada BROTO continua com ação de próxima rodada abaixo, sem painel lateral de vitória.
- 52 testes Node finais aprovados, cobrindo motores/mapas e integridade/apresentação. Os testes de hash verificam que todo arquivo de produção preexistente fora dos quatro UI/CSS autorizados permaneceu exato.
- Teste unitário reproduz a mudança de coluna620→390px com tabuleiro fixo: deslocamento correto162px, evitando salto inicial de115px.

## QA de navegador final
- 455 verificações aprovadas sem erros em1366,390 e320px: vitória dos dois jogadores, nova vitória repetida após desfazer, revanche, reinício, novo mapa, estado terminal restaurado, empateBROTO, perdaCERCO contra bot e primeiro fim de rodadaBROTO.
- Amostragem de34–36frames por transição desktop confirmou162px de deslocamento, salto inicial0px e avanço monotônico até a posição final. Preferência reduced-motion simulada por proxy matchMedia resultou em atualização estática, sem animação em execução.
- Conjunto lateral714px exatamente centralizado (desvio0px). Menor célula compacta44,1875px; sem overflow horizontal ou painel fora da moldura. Regras continuam abaixo.
- Revisão visual nativa dos resultados BROTO/CERCO desktop e320px confirmou acabamento e legibilidade;390px medido automaticamente.
- Todos os saves `intuicao.*` originais restaurados exatamente após testes e revisão.
- Limites: teste compacto em navegador, não aparelho físico; reduced-motion validado por proxy da preferência e testes unitários, não mudança do sistema operacional.

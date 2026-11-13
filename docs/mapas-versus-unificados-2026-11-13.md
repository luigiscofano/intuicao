# Mapas dos sete jogos Versus

Pedido: ampliar mapas e formatos sem transformar duelos em campanhas, usando uma apresentação consistente.

## Catálogo publicado por esta revisão

| Jogo | Antes | Agora | Formatos / organização |
| --- | ---: | ---: | --- |
| Broto | 7 | 39 | 4×4, 5×5, 6×6, 7×7, 8×8 |
| Cerco | 28 | 40 | 5×5, 6×6, 7×7, 8×8 |
| Estalo | 42 | 48 | 4×4, 3×6, 4×6, 6×6, 6×8, 8×8 |
| Quinhão | 1 | 42 | 6 coleções de distribuições; sempre 24 cestos |
| Mosaico | 1 | 42 | 5×5, 4×4, 4×6, 6×4, 6×6, 7×7 |
| Desvio | 16 | 42 | 4×4, 3×3, 3×4, 4×3, 2×6, 2×8 |
| Acorde | 1 | 42 | 4×4, 4×5, 5×4, 4×6, 6×4, 6×6 |

São 295 mapas/cenários, 199 a mais. As contagens próximas priorizam diversidade real, não duplicatas para atingir um número exato. Os clássicos continuam primeiro e não mudam.

### Regras que permanecem

- Broto: oito sementes por jogador, duas rodadas. Jardins com pelo menos 16 casas jogáveis.
- Cerco: seis peças e paredes neutras; mapas conectados/simétricos.
- Estalo: cada pulso para nos recortes; mesma meta de vagens para ambas as equipes.
- Quinhão: 24 cestos e oito frutos de cada tipo; distribuição muda, vizinhança circular e pontuação não.
- Mosaico: alguns cenários abrem com dois azulejos comuns, uma sequência inicial legal par, sem junções completas nem pontos. A seleção informa isso. Reserva e término seguem a quantidade de casas realmente livres.
- Desvio: máximo 16 casas. Mantém solver exato, não troca silenciosamente o computador perfeito por uma heurística. Nem todo mapa é neutro para o iniciador; mantenha a revanche com início alternado.
- Acorde: sinos equilibrados por tipo, vitória por pares de três tipos intacta.

Nenhum modo diário, sem parar ou campanha foi adicionado aos Versus.

## Seleção uniforme

`dist/versus/map-selection.mjs` e `.css` definem o componente usado pelos sete jogos: tamanho/coleção, miniatura real, nome, estado selecionado, explicação e ação separada de iniciar. Desvio agora também seleciona antes de iniciar. Selecionar não substitui saves. As miniaturas não são botões dentro de botões, nem tabuleiros jogáveis; a prévia grande redundante da preparação foi removida. Foco de teclado é restaurado após a reorganização das seções.

O estilo preserva Literata/Source Sans 3 e as cores existentes; estados usam texto/check e não só cor. Seletores têm altura mínima de 44 px. Os dados ficam nos catálogos de cada jogo; ampliar mapas não exige duplicar um componente visual.

## Compatibilidade e recuperação

Base Site anterior: `2f456e66f2fc11bcdbde8f852733829870547c35` (v254). A revisão é recuperável por histórico Git. Todos os IDs/geometrias anteriores foram preservados. Novos cenários têm identidade e versão determinísticas, saves são reexecutados pelo motor, undo/redo e revanche preservam mapa. A sincronização GitHub é um patch específico sobre sua main, sem copiar os geradores de modo sem parar que só existem no Site.

## Verificações

- Mais de 10 mil partidas simuladas completas entre os sete motores, além de replay/undo/redo e conservação de recursos.
- Quinhão: 126 duelos completos de IA / 2.016 decisões; Estalo: 18 duelos completos de IA dos mapas novos; Cerco: 120 aberturas nas três dificuldades; Acorde/Mosaico: 252 buscas e 84 aberturas com orçamento real.
- Desvio comparado a oráculo independente; preserva resultado exato dos 42 mapas.
- Navegador real: seleção e início nos sete jogos em 320 / 390 / 768 / 1280 px; nenhum overflow horizontal. Todos os 39 grupos de tamanho/coleção percorridos com clique/Enter. Um mapa selecionado por grupo, miniaturas reais e controles ≥ 44 px.
- QA isolou o armazenamento em memória para não substituir saves reais do usuário. Persistência/replay também têm testes de motor/plataforma.
- Corrigidos durante QA: células de Broto 8×8 que se alongavam; células de Acorde denso; Estalo em 768 px que ficava 305×408, agora 433×433. Broto 8×8 em 320 px permanece 271×271 antes/depois do primeiro plantio; Mosaico 7×7 permanece 253×253 antes/depois da jogada.
- Exemplos de regras identificam explicitamente o mapa clássico e não afirmam que todos os novos formatos têm 16 / 25 casas.

### Limites honestos

Simulações não provam equilíbrio competitivo humano. Desvio tem vantagem teórica em alguns mapas. Tempos de IA medidos em servidor, não celular físico. Grids densos em 320 px têm células menores que 44 px (por exemplo Estalo 8×8 ≈ 29 px); controles externos e seleção mantêm 44 px, e teclado/rótulos completos permanecem. Não é possível prometer simultaneamente 8 colunas, 44 px por célula e ausência de rolagem horizontal em 320 px. Telas de pouca altura podem precisar rolagem vertical. Testes responsivos usam navegador real em iframes, não dispositivos físicos.

Relatórios detalhados: [Broto/Cerco](qa/maps-expansion-broto-cerco-2026-11-13.md), [Estalo](qa/maps-expansion-estalo-2026-11-13.md), [Quinhão/Desvio](qa/maps-expansion-quinhao-desvio-2026-11-13.md), [Acorde/Mosaico](mapas-acorde-mosaico-2026-11-13.md).

# Tipografia do Intuição

Opção C aprovada: **Literata** para títulos e **Source Sans 3** para a interface.
A marca gráfica permanece como imagem, sem alteração de lettering. Regras,
layout, desenhos e ícones dos jogos não são redefinidos por esta mudança.

## Sistema

- `--font-title`: Literata, com Georgia/Times como fallback.
- `--font-ui`: Source Sans 3, com Segoe UI/Arial como fallback.
- Pesos variáveis de 200 a 900. Títulos usam 600; texto 400; controles preservam
  seus pesos semibold/bold. Não há mudanças nos tamanhos aprovados.
- Números de controles e placares usam `lining-nums tabular-nums`.
- SVGs de regras e jogos herdam a mesma fonte de interface.
- `font-display: swap` mantém o conteúdo visível durante carregamento/falha.
- Fontes são hospedadas localmente: nenhuma chamada ao Google em navegação.

## Arquivos e licenças

Fontes obtidas do repositório oficial `google/fonts`, diretórios `ofl/literata`
e `ofl/sourcesans3`. Ambas sob SIL Open Font License 1.1. As licenças completas
acompanham os WOFF2 em `dist/assets/fonts/`.

Os arquivos são subconjuntos latinos com acentos portugueses, pontuação e
recursos OpenType preservados, convertidos em WOFF2 com FontTools. O subconjunto
de Source Sans 3 foi renomeado internamente para **Intuicao Interface**, conforme
a cláusula de nome reservado `Source`. O desenho dos glifos não foi modificado.
A denominação CSS é um alias local; a família original é identificada aqui.

- https://github.com/google/fonts/tree/main/ofl/literata
- https://github.com/google/fonts/tree/main/ofl/sourcesans3

## Manutenção

A declaração dos arquivos e os tokens ficam em `dist/typography.css`.
Folhas antigas referenciam esses tokens, em vez de definir famílias divergentes.
Não trocar fontes de ícones por fontes de texto nem converter a marca em texto.
Antes de publicar, verificar títulos longos, controles, níveis, conquistas,
regras e todos os jogos em telas estreitas e desktop. Não confundir testes
estáticos com inspeção visual do navegador.
## Auditoria recursiva e cobertura de navegação (2026-11-13)

- V244: inspeção das fontes computadas no DOM das seleções dos 19 jogos e de
  um primeiro tabuleiro/partida de cada um, incluindo os sete versus.
- Modais Sobre, Configurações e fauna; tela Conquistas também inspecionados.
- Exceções descobertas: seleção Sintonia (Courier/system), CSS aninhados de
  Sintonia/Repasse/Lógica, lema Sobre, rótulos do ELO e declaração redundante
  ui-sans-serif na vitória. Corrigidas sem mudar dimensões ou regras.
- Novo teste recursivo percorre 66 folhas CSS, inclusive subpastas. Todas as
  famílias de texto ativas devem ser tokens C; teste protege contra regressão.
- Exceções intencionais: imagem/lettering da marca; editores e exemplos JSON em
  monoespaçada para preservar formatação do código; diagramas de setas de mapas
  Desvio em monoespaçada como arte; código arquivado Órbita não foi reestilizado.
- Símbolos, sprites pixel e ilustrações mantêm seus desenhos. Textos SVG de
  tutoriais recebem Source Sans por CSS mesmo com atributo legado no SVG.

Limites: inspeção DOM de um estado inicial por jogo, não de toda sequência
possível de jogadas. Estados de vitória/erro compartilham o sistema e têm CSS
inspecionado, mas não houve vitória manual em cada jogo. QA visual anterior
cobriu desktop 1331px e viewport 390px em amostras; não é auditoria visual de
cada um dos 19 jogos em cada tamanho. Publicação das correções é coordenada
com a revisão integrada do sistema visual, sem deployment concorrente.

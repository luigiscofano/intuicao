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

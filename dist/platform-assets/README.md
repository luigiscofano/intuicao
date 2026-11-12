# Recursos visuais e identidade

Logo, fonte, folhas, molduras e imagens de fauna usados pela aplicação. Este inventário aponta arquivos reais sem presumir autoria ou licença específica de cada ativo.

## Inventário

| Arquivo | Formato | Bytes |
| --- | --- | ---: |
| [active-flower.svg](active-flower.svg) | SVG | 686 |
| [content-frame-curve-left.svg](content-frame-curve-left.svg) | SVG | 219 |
| [content-frame-curve-right.svg](content-frame-curve-right.svg) | SVG | 215 |
| [continuous-crown-left.svg](continuous-crown-left.svg) | SVG | 277 |
| [continuous-crown-right.svg](continuous-crown-right.svg) | SVG | 275 |
| [continuous-root-left.svg](continuous-root-left.svg) | SVG | 275 |
| [continuous-root-right.svg](continuous-root-right.svg) | SVG | 269 |
| [fauna-green-original.png](fauna-green-original.png) | PNG | 117,434 |
| [fauna-side-original.png](fauna-side-original.png) | PNG | 20,907 |
| [fauna-sprites-original.png](fauna-sprites-original.png) | PNG | 1,631,726 |
| [flower-green-original.png](flower-green-original.png) | PNG | 423,879 |
| [flower-white-original.png](flower-white-original.png) | PNG | 362,741 |
| [foliage-shape-1.svg](foliage-shape-1.svg) | SVG | 228 |
| [foliage-shape-2.svg](foliage-shape-2.svg) | SVG | 220 |
| [foliage-shape-3.svg](foliage-shape-3.svg) | SVG | 230 |
| [foliage-shape-4.svg](foliage-shape-4.svg) | SVG | 246 |
| [foliage-shape-5.svg](foliage-shape-5.svg) | SVG | 246 |
| [header-tree-frame.svg](header-tree-frame.svg) | SVG | 1,113 |
| [hero-frame-curve-left.svg](hero-frame-curve-left.svg) | SVG | 281 |
| [hero-frame-curve-right.svg](hero-frame-curve-right.svg) | SVG | 271 |
| [intuicao-logo-original.png](intuicao-logo-original.png) | PNG | 354,115 |
| [intuicao-pixel.woff](intuicao-pixel.woff) | WOFF | 3,640 |
| [leaf-clay.svg](leaf-clay.svg) | SVG | 265 |
| [leaf-floor.svg](leaf-floor.svg) | SVG | 19,873 |
| [leaf-honey.svg](leaf-honey.svg) | SVG | 281 |
| [leaf-pile-growth-1.svg](leaf-pile-growth-1.svg) | SVG | 3,839 |
| [leaf-pile-growth-2.svg](leaf-pile-growth-2.svg) | SVG | 4,951 |
| [leaf-pile-growth-3.svg](leaf-pile-growth-3.svg) | SVG | 4,798 |
| [leaf-pile-growth-4.svg](leaf-pile-growth-4.svg) | SVG | 8,535 |
| [leaf-pile-growth-5.svg](leaf-pile-growth-5.svg) | SVG | 5,171 |
| [leaf-pile-growth-6.svg](leaf-pile-growth-6.svg) | SVG | 5,178 |
| [leaf-piles-base.svg](leaf-piles-base.svg) | SVG | 32,968 |
| [leaf-sage.svg](leaf-sage.svg) | SVG | 265 |
| [leaf-seal.svg](leaf-seal.svg) | SVG | 437 |
| [leaf.svg](leaf.svg) | SVG | 279 |
| [paper-marks.svg](paper-marks.svg) | SVG | 230 |
| [quiet-garden.svg](quiet-garden.svg) | SVG | 11,372 |
| [soft-crown-left.svg](soft-crown-left.svg) | SVG | 293 |
| [soft-crown-right.svg](soft-crown-right.svg) | SVG | 291 |
| [tree-canopy-diverse.svg](tree-canopy-diverse.svg) | SVG | 10,565 |
| [tree-canopy-natural-filled.svg](tree-canopy-natural-filled.svg) | SVG | 80,132 |
| [tree-canopy-pixel.svg](tree-canopy-pixel.svg) | SVG | 6,103 |
| [tree-canopy-softedge-fine.svg](tree-canopy-softedge-fine.svg) | SVG | 53,038 |
| [tree-canopy-softedge.svg](tree-canopy-softedge.svg) | SVG | 17,762 |
| [tree-canopy-varied.svg](tree-canopy-varied.svg) | SVG | 11,851 |
| [tree-canopy.svg](tree-canopy.svg) | SVG | 985 |
| [mirante-aiij-a.png](mirante-aiij-a.png) | PNG | 43,675 |
| [mirante-aiij-a.svg](mirante-aiij-a.svg) | SVG | 9,691 |

## Como os ativos são usados

O HTML e o CSS referenciam logos e elementos de cenário. Módulos como [fauna-art.mjs](../fauna-art.mjs), [hero-fauna.mjs](../hero-fauna.mjs) e [versus-mascot-art.mjs](../versus-mascot-art.mjs) controlam recortes e apresentação. SINTONIA também tem seu catálogo de animais e módulos de arte.

Uma imagem maior pode conter vários recortes. Alterar dimensões, margens ou ordem dos animais muda coordenadas esperadas pelo código; substituir o PNG sem conferir seus consumidores pode mostrar o personagem errado.

## Procedimento de alteração

1. Identifique quais módulos e estilos usam o arquivo.
2. Preserve uma referência visual e as dimensões antes da troca.
3. Confira transparência, contorno, nitidez de pixels e encaixe no tabuleiro.
4. Teste tamanhos compactos e desktop, inclusive perto de texto e botões.
5. Registre origem do novo ativo, autorização de uso e modificações realizadas.
6. Reexecute testes de preservação aplicáveis e explique qualquer hash atualizado.

## MIRANTE: AIIJ A

A [renovação aprovada em 12/11/2026](../../docs/mirante-renovacao-2026-11-12.md) usa composição SVG original com módulos Intuição existentes e exportação PNG transparente, sem geração raster por IA. Os hashes SHA-256 dos dois ativos estão no [inventário de recursos](../../docs/recursos/inventario.json). Aplica-se a política de direitos visuais já registrada para os elementos do projeto; a aprovação não altera sua licença.

## Registro de origem e permissões

O [inventário completo](../../docs/recursos/README.md) inclui os arquivos desta pasta, atlas de SINTONIA, acessórios, capturas e diagramas. Origem conhecida não significa autorização de redistribuição.

## Direitos

O código e a documentação autorais do projeto usam a [licença MIT](../../LICENSE), com Copyright (c) 2026 Luigi Scofano de Araujo. Essa licença não inclui automaticamente imagens, sprites, fontes, logos e demais recursos visuais deste inventário.

A presença de um recurso visual no repositório não estabelece, por si só, permissão de redistribuição. Antes de reutilizá-lo ou publicá-lo, confira sua origem, titularidade e autorização específica, mantendo as licenças e os créditos de terceiros. Nenhuma afirmação de proveniência deve ser inventada para completar uma tabela.

[Arquitetura](../../docs/arquitetura/README.md) · [Manutenção](../../docs/manutencao/README.md)

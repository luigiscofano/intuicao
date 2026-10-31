# Órbita: seleção direta dos anéis

`pickOrbitaRing(projectedLevel, point, tolerance=16)` mede a distância radial absoluta à trajetória circular, não ao centro. Retorna o ID mais próximo dentro da tolerância; interseções empatadas (epsilon 1e-7) usam a ordem estável de `level.rings`. Pontos vazios não selecionam nada. Não altera geometria, estado ou comandos.

Integração: converter coordenadas do ponteiro para o sistema do SVG projetado. A tolerância também deve ser convertida: por exemplo, 16 CSS px divididos pela escala do SVG. Os rótulos acessíveis devem passar seu ID explícito a `commandForOrbitaRing`, sem seleção por proximidade.

`commandForOrbitaRing(level, ringId, selectedId)` prioriza comando só daquele anel; depois preserva o comando atual se inclui o anel; por último usa o primeiro comando vinculado compatível. Não inventa giros independentes para engrenagens. Sensores/condições de execução continuam sob responsabilidade do motor existente.

Teste: `node --test tests/orbita-ring-selection.test.mjs`. Inclui 80 fases nas larguras 265/335/680px, acesso direto a todos os anéis, comandos compatíveis, imutabilidade e casos sintéticos de um a cinco anéis, concêntricos, interseções, empates, espaço vazio e escala do SVG.

## UI integration (2026-10-31)

The old per-path click handler only worked on a narrow stroke, with noninteractive labels and opaque houses covering some hit areas. The SVG now delegates clicks to geometric nearest-circumference picking (18 CSS px tolerance converted through its screen CTM). Houses/pieces do not cause rotations or defeat picking. Blank space outside the annular tolerance does nothing; there is no full-disk hit area. Equal-distance crossings retain authored ring order; exact letter buttons remove ambiguity. Linked commands remain linked.

Labels are focusable SVG buttons, with aria-pressed, visible focus and Enter/Space activation. Selection keeps focus, synchronizes existing command choices and highlights the rail. A moved/cancelled pointer gesture does not select. Existing arrows, number shortcuts, sensors, turn logic and state persistence remain untouched. New short instruction is in gameplay only; pre-selection Como jogar illustration unchanged. Projection/geometry and glyph dimensions unchanged.

Browser integration QA: all80campaign levels at1366x768,320x568,390x844;239rings per viewport,717total cases. Each label selected with Enter, each rail selected through a touch-origin pointer sequence at an unambiguous point on the actual rendered SVG path; all717 correct and synchronized with command buttons, zero move-count changes, zero page horizontal overflow. Closely crossing paths are inherently ambiguous at a shared pixel; nearest actual pointer coordinate governs, with stable exact ties and explicit letters for disambiguation. Native mouse click on phase80 ringE's visible outer rail selectedE while moves stayed3; native letterB click selectedB. Screenshot highlight inspected.20 focused geometry/state/ELO toolbar tests passed. Temporary fixture removed.

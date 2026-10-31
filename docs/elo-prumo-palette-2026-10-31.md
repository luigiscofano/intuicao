# ELO: exact PRUMO colours with adjacency separation

Requested change: reuse the existing PRUMO tones, but prevent visually similar neighbouring ELO regions. PRUMO itself and all game data are unchanged.

The helper keeps its exact deterministic DSATUR four-colouring of the shared-side region graph. Connected valid regions form a planar graph, so four colours suffice. Non-neighbours can reuse colours. The selected quartet is copied unchanged from PRUMO's source palette:

- gold `#e3d173`
- salmon `#e7a4a0`
- sea-green `#86cbbb`
- lilac `#b9a4da`

All210 possible four-colour subsets of the ten existing tones were enumerated. This quartet maximizes the smallest CIELAB1976 (D65) pairwise distance: **37.140044**. The operational threshold is37. The former45 threshold cannot be maintained for four mutually adjacent regions while retaining exactly PRUMO's palette; no tones have been invented or altered to disguise that limitation. This metric is a perceptual separation heuristic, not a universal colour-vision accessibility guarantee. Existing region letters and boundaries remain available.

Regression checks:
-80 campaign maps;
-840 seeded endless maps covering all7 sizes,3 region counts and both fixed-clue options;
-257 imported geometries passed through the existing normalizer, including160 connected flood partitions up to16 regions;
-11,997 shared region boundaries: minimumΔE76 **37.140044**, zero duplicate neighbours and zero fallback on valid input;
-minimum contrast against the existing `#344633` region text colour: **4.534289:1**;
-stability across cache/re-render and cloned definitions; no level-data mutation;
-source equality against PRUMO's palette, and proof of the optimal quartet among210 choices;
-hover/focus/selection rules retain region fills and change only boundary emphasis.

Invalid, disconnected input can encode a non-planar adjacency graph. That existing defensive fallback now also uses only exact PRUMO colours, and reports unmet thresholds explicitly instead of introducing foreign tones. Such maps are rejected by normal import validation. K5 and K16 invalid-graph tests verify honest fallback diagnostics; they are not claimed to meet the valid-map separation guarantee.

Command: `node tests/elo-region-colors.test.mjs` (passed).

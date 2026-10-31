# ELO: more colours, without similar adjacent tones

Follow-up request: keep the current colours, but add variety in the same style instead of repeating a four-colour pattern across many regions.

## Presentation-only changes

- Keep all ten original PRUMO tones, including the four previously selected ELO colours.
- Add eighteen soft, light pastel tones, for a fixed28-colour bank. The new tones were selected within a lightness/chroma range consistent with the existing pastel style, and all28 colours maintain at least4.5:1 contrast against existing region lettering `#344633`.
- First seek a unique colour for every region, with an explicit hard boundary constraint: CIELAB1976 distance must be at least37 for every shared-side adjacency.
- Deterministic minimum-remaining-values search, degree tie-break and future-neighbour freedom ordering avoid unnecessary repeats. A12,000-step budget protects interaction time on unusual inputs.
- If that unique-colour search cannot complete within budget, the previous exact four-colour graph algorithm remains the contrast-preserving fallback for valid planar maps. Colour variety never takes precedence over distinct adjacent regions.
- Cache and deterministic ordering retain colours during interactions/re-render. No region IDs, topology, puzzles, rules, engines, clues, saves or PRUMO colours are changed.

## Regression results

`node tests/elo-region-colors.test.mjs` passes:

-80 campaign maps;
-840 generated endless maps (all7 sizes,3 region counts, both fixed-clue choices,20seeds);
-257 normalized imported geometries, including160 connected partitions up to16regions;
-11,997 shared-side boundaries;
-**Every region has its own colour in every one of the1,177 valid test maps**;
-minimum adjacent ΔE76: **37.118371**, above threshold37;
-minimum lettering contrast: **4.534289:1**;
-zero invalid-map fallback used on valid cases;
-maximum16 search decisions per valid map;
-stability across cloned/cached definitions and no input mutation;
-hover/focus/selection continue to emphasize borders without changing colour fills.

The80 campaign maps contain688 regions in total. Previously the per-map counts of unique colours summed to272, leaving416 repeated region colours. They now sum to688: **zero repeated colours within any campaign map**, with up to13 distinct region colours in one map.

Invalid disconnected/non-planar stress inputs remain outside the accepted import contract and are not claimed to meet the valid-map guarantee. Fallback diagnostics still report threshold failures honestly. The ΔE metric is a practical perceptual-separation check, not a universal colour-vision accessibility guarantee; region lettering and clear boundaries remain important.

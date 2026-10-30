# Clean scenery and controls — 2026-10-30

Based on published 4de1ab60c51d3a9bd3372a953de716498e51e032.

User-authorized bundle:
- SINTONIA scenery uses consistent flat CSS and eleven code-native SVG icons: walls, grid, crate, switch, key, selector, delivery, one-way and direction controls; simplified plates, gates, portals, ice, fragile/consumed bridges and targets. Animal renderer and original animal assets remain byte-identical. No mechanics, campaigns, level counts or saved state logic changed.
- REPASSE incomplete targets changed to warm butter yellow #f5dfa0; light-green exact and red overfull unchanged.
- About title now “Sobre o Intuição.”; added the authorized curious-children origin sentence without changing authorship or existing paragraphs.
- Celebration preserves all existing pastel and green stars; adds exact supplied green animal icons with varied size/rotation/drift. 28 animated or 8 reduced-motion static animals, bounded cleanup and pointer-events none.
- Advanced toggle/panel visible only in Reflexos. Corte direct handles, basic slider and curve tabs remain. Other games retain rules, undo/redo, reset, movement, check/confirm and endless. Removed obsolete help references to now-hidden advanced export/values.
- Undo/redo labels removed visually across all nine games, preserving arrows and accessible labels/tooltips. Reference screenshot was specifically undo/redo; unrelated arrow controls/puzzle letters retained.

Verification:
- SINTONIA desktop screenshots: levels 181, 251, 402, 400, 226, 426 covering every scenery mechanic. 390 × 844 responsive iframe screenshots: levels 181, 251, 402, 400, 226. Mobile movement increments cursor; undo restores it.
- Desktop/mobile About text and animal confetti visually inspected; repeated click and cleanup tested. REPASSE all three colors reviewed together.
- Browser all nine routes confirms advanced toggle/panel true only for Reflexos and false in remaining eight.
- Independent functional checks: eight SINTONIA engine/catalog/persistence/roster suites; current animal rendering and assets preservation; Corte 100 solutions; REPASSE engine/UI-state. New tests: scenery 3/3, standard controls 2/2, arrow-only controls 1/1; confetti 30 viewport/motion/lifecycle cases. Syntax and diff checks pass.
- Historical integration/hash tests tied to older project snapshots remain pre-existing failures, not claimed as full-suite pass. Reduced-motion confetti was deterministic-test verified, not OS-emulation browser verified.

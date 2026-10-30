# ELO80 — editorial revision

The live campaign contains exactly 80 puzzles in six groups: Básico 1–15; Aprendiz 16–30; Intermediário 31–45; Avançado 46–60; Mestre 61–75; Modo Sábio 76–80.

Mechanic debuts: turn 10, straight 13, passage 16, forbidden interval 24, point counts 31, incident distance 39, direct neighbors 46, relative circuit order 54, cut crossings 61, exclusive passages 68.

## Evidence

- `tests/elo80-validation-metadata.json`: per-level provenance, principal/secondary families, central deduction, explained sequence, complete-search result and controlled clue ablations. Passage/group ablations retain the ban on placing points, testing the crossing obligation separately.
- `tests/elo80-reasoning-certificates.json`: complete bounded-deduction certificates (not a stored-answer claim of uniqueness).
- `tests/elo80-independent-validation.json`: two exhaustive solver implementations for each puzzle, including partial-state soundness checks.
- `tests/elo80-proof-replay-results.json`: fresh full-certificate replay for every puzzle, without cached outcomes.
- `tests/elo80-suite-results.json`: current runtime/UI/progress/preservation regression results. Historical 200-level suites remain as historical specifications; use `node tests/run-elo80-suite.mjs` for current integration checks and `node tests/elo80-regression.mjs` for all 80 mathematical checks.
- `tests/fixtures/elo200-campaign.mjs` and answers preserve the prior source catalogue for reproducible curation.

No mathematical engine, geometry, physics, color, sprite, fixed-point rule, shared control, or CSS is changed. Existing ELO check/confirm/undo/redo/reset behavior stays in place. Dicas remains available only in PACTO; advanced options remain restricted by the existing site policy. Modo Sem Parar and imported puzzles are not part of these 80.

Unchanged puzzles retain their stable IDs. Recomposed puzzles use new versioned IDs. The browser migration records retired puzzle progress under `eloLegacy.campaign 80.records`, leaves original sessions/completions/answer records intact, and never copies progress by ordinal. A retired last-session pointer is archived rather than redirected to a different puzzle.

Difficulty and instructional progression are editorial estimates, not human-playtest calibration. All uniqueness declarations require completed searches. Large boards remain within the existing 12× 12 limit; compact challenges and classic interludes continue in later groups.

# Requested UI adjustments

- Added the 15 original front-facing green-on-white fauna PNG icons to the blank hero area beside the main phrase. The original sheet is unchanged; bounded CSS viewports isolate each animal without redrawing it. At narrower widths, the gallery reflows below the phrase.
- Moved Sintonia's existing movement counter into the board surface next to its direction arrows. The current session cursor and update logic are unchanged; the counter has a larger tabular number and a quiet green card.
- All eight numbered solo campaigns now show the same bold, larger `DESAFIO NN / TOTAL` presentation. Elo, Prumo and Pacto use the stage toolbar like the other games. Free/custom modes do not gain a fictitious campaign total. Desvio remains a versus map game.

## Verification

Real desktop browser: hero PNGs loaded, gallery and counter inspected; counter changes 1 → 0 → 1 on move/undo/redo. Eight campaign labels rendered at 16 px / weight 750 with actual total 80. CSS explicitly provides 14 px labels, gallery reflow and compact controls at small widths; native mobile viewport resizing was not available through the supported browser API, so mobile visual verification is not claimed.

Focused preservation test checks unchanged assets and all non-authorized runtime files against c3aa04e4765198d6b068f09105573962d7f56d9e. Sintonia engine: 25 passing tests. Existing animal celebration: 30 passing viewport/motion cases. Two historical snapshot suites (`about-dialog-tests.mjs`, `sintonia-scenery.test.mjs`) still expect old sparkle hashes / old 500-level campaign data and fail against the prior published state; neither discrepancy was introduced here.

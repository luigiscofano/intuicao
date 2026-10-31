# BROTO — delivery and verification

Implemented against all 558 lines of the supplied prompt. Current platform convention wins over the older sidebar sentence: gameplay rules start open below the board/controls. Versus contains DESVIO and BROTO; the other nine games retain their engines, campaigns, art and controls.

## Files and reuse
- New game: `dist/broto/engine.mjs`, `ui.mjs`, `ui.css`, `route.mjs`.
- Registration only: `app.mjs`, `index.html`, `category-navigation.mjs`, `game-info-content.mjs`, `game-info.mjs`, `game-info.css`, `game-nav-icons.mjs`, `game-nav-scroll.mjs`, `platform.css`, `rules-examples.mjs`, `rules-examples.css`, `rules-preview.mjs`.
- Tests: `broto-engine.test.mjs`, `broto-integration.test.mjs`, `broto-registration.test.mjs`; ten-game list in `rules-preview.test.mjs`.
- Shared contracts reused: category/history routing, information tooltip/modal, mono navigation pictogram system, rules preview and rules-card disclosure, control classes, shared restart dialog, Desvio's second-activation confirmation and two-player undo agreement, middle-click confirmation, original Sintonia avatar atlas, celebrationMarkup/result-badge. Own validated localStorage namespace `intuicao.broto.v1`; no server, bot, telemetry, campaign or advanced options.

## Automated verification
28 focused Node tests passed. Engine mandatory five-move example and all required edge cases covered; 500 seeded duels / 16,000 plantings pass invariants/replay. Independent nearest-neighbor oracle compares 3,200 additional resolutions. Existing nine information objects, rule visuals and icons remain hash-identical; platform/info CSS declarations unchanged except explicit BROTO selector registration. Syntax checks and git diff --check pass.

## Native browser verification
Cloud browser, actual application loaded in responsive iframe harnesses (not inferred from Node tests):
- Three complete two-round duels and rematches at1366/390/320 CSS px. Preview/cancel do not change saved state; mandatory example ends2–0, reserves5/6, new piece unmarked. Duplicate confirms ignored; undo/redo and separate five-step example preserve correct game state.
- Board widths330/309/239px; cell widths78.75/74.25/56.75px. Confirmation19/18/18px below board. No horizontal overflow.
-14 lifecycle checks pass: undo/reset while animating, reduced-motion immediate resolution, reload exact state, second-round reset preserving first result, navigate-away cancellation and return, competitive restrictions, changed/cancelled previews and rejection of corrupt saves.
- Separate winning duel ends9–11, announces Jogador2 and displays shared PARABÉNS. Tie presentation also verified. No automatic next round/rematch.
- Opened first playable state of each previous nine games at390px: all available, BROTO hidden, rules open, no horizontal overflow.
- Actual keyboard ArrowRight + Enter twice performed selection/planting. Actual pointer selection displayed projected vertical mark and ray; desktop screenshot and320px mobile-layout screenshot inspected. Standard info modal and rules disclosure checked.

## Limits
No physical mobile hardware/touchscreen or external assistive-technology session was available. Responsive layouts and hit sizes were checked in Chromium; keyboard and pointer interaction were exercised. Other games received routing/play-entry smoke tests and unchanged-source/hash checks, not exhaustive replay of every older campaign in this batch. No mathematical claim of perfect game balance.

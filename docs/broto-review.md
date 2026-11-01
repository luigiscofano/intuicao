# BROTO independent review — 2026-10-31

Read all 558 lines of the supplied implementation prompt (Library `referencia-privada-omitida`). Review scope: pure rules, state boundaries, integrated UI contracts, and preservation of the existing platform. Browser checks are reported separately by the publication owner, not inferred from source tests.

## Independent checks completed

- Reviewed production engine and mandatory examples against the complete rules.
- Independent geometric oracle uses same-row/same-column filtering and nearest-distance sorting, unlike the production ray walker. Compared 3,200 moves across 100 complete two-round duels: boards, recipient identities/axes, harvested pieces, point owners, preview equality, and input immutability all match.
- Persisted undo/redo branch test restores the current round exactly and rejects corrupt future history; undo at the start of round two cannot alter the consolidated first round.
- The separate engine suite contains 19 passing tests, including the exact five-move example, four simultaneous recipients, idempotent axes, no propagation after removal, last-turn effects, restart, rematch, draw, and malformed saves. Its randomized replay check covers 500 duels / 16,000 moves.

## Interface verification

Reviewed `ui.mjs`, `route.mjs`, and scoped CSS independently. Two minor issues were reported and corrected by the UI author: focus retention during animation rerenders and terminal status copy. Preview markers operate on cloned pieces and use production engine events. Confirmations guard inactive/hidden, animating and terminal states; logical state is saved before effects. Timer revision cancellation covers hide, reset, undo and next-round transitions. Competitive UI omits undo/redo/reset. Namespaced restoration replays engine state. Shared restart dialog, middle-confirm binder, rules preview, animal roster and celebration markup are reused.

Five independent tests pass. Preservation hashes exactly match all nine previously shipped game information objects, rule diagrams and navigation pictograms. Source assertions check state namespace, no broad storage clearing, CSS scoping and required guards; these do not replace browser checks.

Do not treat engine or source assertions as browser interaction evidence. Required owner browser checks: preview/cancel, second activation and confirmation button, duplicate guard, undo agreement, competitive restrictions, current-round reset, first/second-round results, rematch, reload, navigation during motion, keyboard, touch-sized layout, and reduced motion.

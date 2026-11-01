# CERCO independent review — 2026-10-31

Read all 259 lines of the supplied implementation prompt (Library `referencia-privada-omitida`). Current approved platform layout takes precedence over the older right-sidebar wording: rules remain below gameplay, open by default.

## Independent verification completed

- A separate Manhattan-distance legal-move oracle checked 500 complete games with alternating starters. Every state agrees on moves, six-piece conservation, one new neutral barrier per move, remaining empties, next-player terminal condition and winner. No game exceeded nineteen confirmed moves.
- Immutable preview and actual resolution agree with the independent oracle without altering the input.
- Bot samples cover immediate wins and positions with both dangerous and safe choices: the intermediate bot takes a win or avoids an immediate losing reply when a safe choice exists.
- Cooperative strong search cancels with AbortError and respects the explicit 512-node test budget. This is a code-level async test, not a browser performance measurement.
- Strict save replay rejects forged result/turn fields and illegal redo branches; undo/redo restores the original canonical state.
- Hash comparisons preserve all ten prior game information objects, rule illustrations and navigation icons. Existing category order is unchanged, with CERCO appended after DESVIO and BROTO.

## Interface/service source review

Reviewed UI, route, worker client and scoped CSS. Official front-view icon crops are used from FAUNA_ART/FAUNA_ASSETS, not sprites or generated animals. Mascots are absent from the logical engine. Competitive controls exclude history and in-progress reset; bot history recedes to the human decision. Invalid saves are preserved until explicit new-game replacement. Rules use the shared component below the board, open at entry; restart/confirmation/middle-click and result contracts are reused.

Found and reproduced one async race: a delayed error from a cancelled worker could terminate a newer worker through fallback. The UI author added an origin-serial/abort guard before fallback. An independent fake-worker test now verifies stale errors cannot terminate or resolve a replacement search. Source checks are not browser evidence.

Seven independent integration tests pass after that correction.

## Owner browser checks

Do not infer browser success from these tests. Verify selection/preview/cancel/confirm, bot stale-response protection, return to a human decision on undo, competitive restrictions, invalid save preservation, mascots on the same geometry, reload, result/restart/rematch, keyboard and narrow-screen touch targets. Actual visual checks and interaction evidence are owned by the publication agent.

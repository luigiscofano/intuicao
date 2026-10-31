# Continuous game footer audit

Scope: Reflexos/Corte certo share `.lab > .workspace > .experiment`; ELO/PRUMO/PACTO/DESVIO share `.collection-lab .collection-workspace > .collection-surface`; Sintonia/Repasse/Órbita each use their named lab shell plus `.collection-workspace > .collection-surface`.

Cause: `platform.css` shell-ID rules supplied white `.level-actions`, a bottom 20px white surface gradient, and white DESVIO replay. These outranked the earlier generic compact-play overrides. Sintonia additionally supplied an explicit white collection surface in its own CSS.

Fix: higher-specificity, workspace-direct-child-only rules in `compact-play.css` set the playing *surround* and direct footer rows to #f8f9f3 with background-image:none. Footer actions use 8px vertical padding; surface bottom padding is 8px; feedback no longer reserves 58px when content is absent; empty replay vanishes. Existing buttons/handlers, text, rules, status cards, grid backgrounds, and playable-frame colors are not targeted.

Automated: `node tests/continuous-game-footer.test.mjs` passes scope/spacing/noninterference assertions.

Browser owner verification: each of nine games at 1366x768 and 390x844; one narrow 320x568 case per shell. Inspect computed footer and surface background-color rgb(248,249,243), background-image none. Confirm no white horizontal band between board controls and rules, next remains visible when applicable, wrapped controls retain targets, nonempty hint/feedback/replay expand naturally, and the board's intentional white frame remains unchanged. Include rules-open and an actual win/retry state.

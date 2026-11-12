# Conditional controls: manual viewport QA

Run `node tests/viewport-conditional-states.mjs` for legal-state verification. This test never uses storage or changes production assets. It proves control markup and legal reachability, not visual fit.

Use a fresh disposable QA browser profile/fixture. Do not overwrite an owner's saved games. In each iframe, inspect controls after layout settles at 320×568, 390×844 and a short landscape viewport. Check the game area, enabled action buttons, confirm/cancel, and game toolbar against the iframe viewport. Repeat with all four modes and expanded disclosures.

## Entry and modes

- Click `[data-category="versus"]`, then `[data-versus="estalo"]` (or dobra/quinhao/acorde/lastro).
- Preparation: `#nv-mode` values `local`, `competitive`, `bot`, `training`. `bot` reveals `#nv-difficulty` (beginner/intermediate/strong). `#nv-start` starts.
- In play: `[data-shell-action="preparation"]` returns to preparation. Training adds `#nv-hint`.
- Existing-match replacement can show `dialog.restart-dialog[open]`, with `[data-dialog-cancel]` and `[data-dialog-confirm]`. Do not approve replacement of real saves.
- Desvio map chooser: `[data-collection="desvio"]`, `#c-duel-mode`, `#c-bot-difficulty`, `.duel-maps [data-map="0"]`; `#c-back` returns to maps. In play `#c-mode-challenge` is labelled Mapas.

## Multi-step states

- Estalo: `.estalo-cell:not(:disabled)` → `.estalo-aim` with three `.estalo-aim-button`; choose one → `.estalo-preview-note` and enabled `#nv-confirm` / `#nv-cancel`.
- Dobra: `.dobra-tile:not(:disabled)` → `.dobra-edge:not(:disabled)` becomes enabled; choose one → `.dobra-grid.is-preview` and `.dobra-preview-note`. Check smaller map sizes after confirms as well.
- Quinhão: `.quinhao-basket:not(:disabled)` → offer preview; `#nv-confirm` → `.quinhao-choices` with three `.quinhao-choice` buttons. Choose one → receipt `.quinhao-preview-note`. Preview alone does not reveal the three choices; the offer must be committed.
- Lastro: `.lastro-mark--occupied:not(:disabled)` → `.lastro-mark--legal`; select destination → preview. Also expand `.lastro-calculation > summary` and check reflow.

## Reachable Acorde pass

In local mode, from a fresh game collect cells 4, 0, 1, 5, 6, 2, 3, 7 (zero-based). Confirm each via `#nv-confirm`. Then `.acorde-pass` appears. Each cell button's `data-action` is JSON `{ "type": "cell", "cell": N }`; select by parsing `dataset.action`, not by assuming rendered order (empty cells become divs). Click pass to inspect preview, then confirm. Also inspect collections below `.acorde-board`.

## Reachable Lastro round break

In local mode, make and confirm the following legal moves from a fresh game:
E1→2, E1→3, E1→4, D2→2, E2→2, D2→3, E2→3, D2→4, E2→4, D3→2, D3→3, E7→2, D3→4, D5→2, E7→3, D5→3.

For each, select the occupied button in `.lastro-rail[data-piece="E1"]` (replace piece), then its legal destination whose `data-action` parses to `{type:"destination",piece:"E1",to:2}`, then `#nv-confirm`. This reveals `.lastro-round-break` and `.lastro-next-round`. Click next round to inspect preview/confirm; confirm to start round 2. Never replace these steps with save injection.

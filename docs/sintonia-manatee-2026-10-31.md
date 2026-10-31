# Peixe-boi identification and shared modal sprites

The user identifies Sintonia's gray frame 11 as Peixe-boi-da-Amazônia. Canonical cosmetic roster ID is now `peixeboi`, and all rendered captions, accessible names and named hints obtain the corrected name from ANIMAL_NAMES. No pixel, atlas, crop, campaign map, engine, movement or save history was changed.

Historical `anta` cosmetic IDs normalize to `peixeboi` before roster validation. The same frame/order is retained; no random redraw occurs for valid historical rosters. Resuming a campaign, Endless or custom attempt saves the normalized cosmetic roster without changing positions, commands, undo/redo or completion history. Remaining `anta` runtime occurrences are the intentional alias/comment and unchanged invisible SVG data-animal metadata. The historical atlas-building script retains its original provenance vocabulary and is not runtime code.

All 15 fauna dialogs now use ANIMAL_SPRITES from Sintonia, not an alternative sprite sheet. Their background URL, size and position compare exactly against actual gameplay spriteMarkup for every animal. Generic Mico uses the roster's Macaco; Mico-leão-dourado uses its Mico frame. Front/side icons and factual descriptions remain unchanged. Captions are exactly “Ícone de frente”, “Ícone de lado” and “Sprite do Sintonia”.

Verification:
- 80 campaign cosmetic draws + 500 Endless-sized draws, 16 unique available animals and no duplicate animal per phase.
- UI harness: historical anta roster migration, named hints, moves, undo/redo, restart, reload, campaign/Endless/custom modes.
- 1000 archived campaign histories migration suite passed.
- 15 modal/gameplay style equality checks; source atlas and engine/campaign/generator/gameplay/rules bytes preserved.
- Native Chrome all15 modals at 320px: correct captions, expected 4×4 atlas frame positions, zero horizontal overflow. Gray sprite visually inspected.
- Old sintonia80-preservation test targets a much older global baseline and fails on previously authorized CATALOGO-ATUAL.md changes; targeted current-baseline preservation passes.

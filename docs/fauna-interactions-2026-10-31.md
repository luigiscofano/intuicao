# Hero fauna interactions

All 15 existing front icons are now semantic buttons without changing their original crop, placement, dimensions or spacing. Tooltip shares createInfoDwell with the game information button (800 ms); keyboard focus also shows it, touch/click opens the modal. Native dialog contains focus; Escape, close buttons and outside click close it, restore focus and body scrolling. Pointer exit, blur, scroll and resize clear tooltip timers. No animation added, so reduced motion is unchanged.

Modal presents original front, side and sprite sheet crops, researched Portuguese descriptions, origins/distribution, project/nature connection and expandable source links. Generic Mico, Cobra-coral and Tatu-bola are not falsely identified to species. Arara-azul explicitly introduces arara-azul-grande as the factual reference. Editorial connections describe the project's already-approved nature theme, not undocumented personal selection motives.

## Original assets
- Ordering: fauna manual v5 p2, Library referencia-privada-omitida.
- Front: existing fauna-green-original.png unchanged.
- Side: original Intuicao_Icones_Fauna_Lado_Verde_sobre_Branco.png, 971×1620, referencia-privada-omitida.
- Sprite: original Neotropical Wildlife Pixel Sprite Sheet.png, 1983×793, referencia-privada-omitida. Correct manatee and separate dark primate included. No generated or repainted animals. CSS crops/polygons prevent neighboring art leaking into each viewport.

## Verification
- Native Chrome desktop: tooltip shown, placement within viewport, keyboard Enter opens; focus enters dialog and Tab reaches close; three original illustrations visually inspected.
- Native Chrome iframe at 320 px: all 15 modals opened and closed with Escape, all 45 images loaded, every modal and text region had equal clientWidth/scrollWidth (no horizontal overflow). Text scrolls internally while heading/close remain reachable. Mico artwork inspected at compact width.
- Escape restored trigger focus and original body overflow; homepage had no horizontal overflow.
- node --test tests/fauna-info.test.mjs tests/rules-copy-preservation.test.mjs: 4 passing.
- Hero geometry sources and all approved rule visuals remain byte-identical to b6641a2. Game engines/campaigns untouched.

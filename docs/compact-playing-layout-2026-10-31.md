# Compact playing layout

## Changes
- Existing confirmation/check controls are immediately after the board navigation block. Original Reflexos/Corte Certo actions now precede metrics; ELO/PRUMO/PACTO/DESVIO share a below-board check row. Next/hints follow without intervening readouts. Automatic games keep their confirmation buttons hidden.
- Shorter headings/toolbars, no artificial idle result height, smaller readouts and tighter action spacing. Relevant surfaces use a continuous background. Rules remain available in normal page flow, without a separate vertically scrolling sidebar.
- Moderate desktop size caps: original board navigation820px, PACTO570px, PRUMO/small ELO600px; mobile boards use the available width and original/collection phase arrows move below rather than stealing horizontal board space. Larger52/48px phase-arrow controls retained.
- Wide ELO boards retain44px cells and clue gutters. Their pre-existing compact horizontal scroll remains where a12×12 grid cannot fit honestly; confirmation/next are outside this scroll. Desktop large-board width is not artificially constrained.
- Sintonia desktop map caps54/48/40px and max340px; mobile map sizing retained. On wide screens shared commands and the prominent movement count sit beside maps in a290px column. Four-map sample height fell from~726px to~488px, without changing any cell behavior.
- Repasse collectors use32px noninteractive edge tracks, interactive pieces stay≥44px, gap4px; all80campaign layouts fit a260px board minimum. Native320px measured pieces45.75×45.75px, with no inner scroll.
- Órbita height-aware presentation seeks a compact geometry while keeping26px pieces,28px minimum center distance, complete rings and nonoverlapping labels. It expands vertically when necessary instead of clipping or shrinking symbols. No phase definitions changed.

## Verification
Native Chrome iframe viewports1366×768,390×844 and320×568: all nine routes checked, first levels and large/final samples. No document horizontal overflow. Confirmation/check buttons measured8–21px after their board block; next buttons8–16px. Phase navigation, Sintonia movement/count and Órbita movement verified. Large Órbita sample at320px needs540px drawing height; page scrolling remains intentional, no inner board scroll. Large ELO retains its existing inner horizontal pan only on narrow viewports; a12×12 grid plus clues cannot retain44px cells and fit320px.

Native sample indices: originals79, ELO44(12×12), PRUMO67(10×10), PACTO79, Sintonia73(max90cells across maps), Repasse46(4×4), Órbita67(tall compact geometry), Desvio15. All had accessible controls adjacent below and no page horizontal overflow. Restored solved levels may retain their real success display; empty results no longer reserve blank height.

Automated: seven focused tests pass covering source/engine/campaign preservation, direct DOM order, all80Sintonia layouts, all80Órbita geometries at265/335/680 widths, all80Repasse certified solutions and minimum cell dimensions. Delegated regression suites passed:48Repasse/Órbita checks;33Sintonia engine/state checks;400manual campaign answers/partials; full80PACTO automatic victories including undo/redo/restoration/endless. No engine, campaign, fauna art/content, or level-save definition changes.

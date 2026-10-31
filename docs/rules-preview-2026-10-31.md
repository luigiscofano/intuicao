# Instruction panels before level selection

Nine shared-style panels, specific to each game, precede all eight80-level campaign grids and Desvio's16map choices. Home remains3categories. Existing in-game rules and mechanics remain untouched. Code-native SVGs illustrate actual actions: light reflection,25→50% cut, closing ELO circuit, balancing PRUMO bothaxes, local PACTO pair, shared Sintonia command with wall, integral REPASSE transfer, collective ÓRBITA rotation, and DESVIO rowrestriction.

Animations run once, at most2.4seconds, begin on viewport entry (IntersectionObserver), and end in a readable final diagram. Removed panels are unobserved; no timers or game-state mutation. Reduced-motion CSS disables animations and leaves the final state visible. Sintonia uses the existing original animal atlas.

QA: all9routes observed in native browser desktop and320px iframe; each panel precedes tiles/maps. All8campaigns still80levels, Desvio16maps. Panel clientWidth/scrollWidth both241px at320viewport, no internal horizontal overflow. Typical desktopheight180px; compact wraps into text+diagram. Home3categorybuttons and0visible rulepanels. Rule/diagram accuracy independently reviewed against sources.

Tests passed: rules-preview.test; manual-check400cases; JSON-import4games; ELO80UI(80wins,240failures,80answers,5reloads); PRUMO balance9signed-axis cases and UI toggle/history. No engine/catalog/save schema changes. Browser reduced-motion emulation unavailable; static CSS fallback verified by source assertions, not browser emulation.

## Monochrome navigation pictograms (same publication)

Nine distinct SVG/currentColor pictograms added to the existing persistent game navigation cards. No other game-entry links exist. Decorative aria-hidden wrappers preserve accessible names; no extra controls or colored artwork. Desktop26px and compact25px; native browser cards retain clientWidth=scrollWidth130px at320px, information buttons and names remain visible. All three groups inspected, keyboard navigation verified; hero animals and level buttons unchanged.

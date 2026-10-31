# SINTONIA controls / ÓRBITA counters

SINTONIA: the entire desktop command group (D-pad, moves and help) is relatively inset left by 8–24px according to viewport width. This leaves grid tracks, maps, frame and input sizing unchanged. Mobile layout unchanged. Native tests at 1100,1200,1366,390,320px with phases1,74,80: no page overflow. At1366 right counter clearance10→33.94px; smallest tested desktop clearance18px. Minimum desktop gap to maps17.5px. Map widths unchanged (224/244px desktop;149.5px at390;116.5px at320). Moves still respond to controls; blocked moves correctly do not increment.

ÓRBITA: two calm green metric cards using SINTONIA's fill/border/text colours. Values36px (32px at320), previously20px. Cards86px high (80px at320). Continuous standard off-white game background; removed white bottom padding band by reducing surface bottom padding20→8px and disabling the legacy 20px white bottom-gradient overlay for ÓRBITA only. Empty status collapses; functional feedback remains. No change to board projection/26px glyphs, engines or saves.

Native tests phases1/80 at1366/390/320: all6 no page overflow, turn increments and undo restores the count; cards fit in one row. Bottom gap8px. Native visual inspection.21 engine/UI state tests plus focused presentation guard pass. Temporary QA pages removed.

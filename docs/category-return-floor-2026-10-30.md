# Category return and curved floor

The shared return button is now56px high,17px/750 text desktop (16px compact), with a28px arrow, green border, pale background and visible keyboard focus. At320px the button is273px wide,56px high; page client/scroll widths are both305px (15px scrollbar), no horizontal overflow.

The original continuous-root-left/right SVG perimeter was conditional on a visible level or game panel. Category-only screens lack those panels, leaving the old flat footer reservation exposed. Added the same original root artwork to the footer only when all game/selection sections are hidden. Existing112px/84px floor reservation, all leaf assets/physics and game-screen styles remain untouched.

Native browser QA: three groups return with Enter; same checks at320px. Desktop and compact screenshots inspected including curved floor. Source changes only HTML button spans and two scoped stylesheets; no JavaScript, engines, saves or asset changes.

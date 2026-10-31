# REPASSE — top frame clearance

Authorized presentation-only refinement. Added 24px top padding to the shared board scroll container (previously 2px). No horizontal sizing, piece dimensions, engines, campaigns, importers, or other games changed. The selector is common to campaign, endless and custom boards.

Native browser QA: all 80 campaign levels rendered at 1366px and 320px iframe viewports using the real Repasse UI. Top collector preview badges were populated to exercise their -6px overhang. Minimum measured painted-element clearance from frame top: 19px; actual inner paint clearance is approximately 18px accounting for the outline. Collector box top is 24px from frame top. 3x3 board remains 340px desktop and 236px mobile; largest campaign width remains 422px desktop/267px mobile.

Additional shared-renderer layout stress test: all 144 combinations of 1–12 row/column CSS geometry, the importer engine's supported bounds. Minimum top badge clearance remains 19px. This is a geometry test, not a claim to validate 144 custom puzzles or generate new campaign content. Broad imported boards retain their pre-existing horizontal scrolling, unaffected by this vertical-only change.

Visually inspected native screenshot including live preview badge. 11 focused inset/state tests pass. Temporary QA fixture removed before packaging.

# Repasse size and whitespace refinement

CSS-only; no game state, rules, campaign or other game changed. Desktop≥681px raises playable cells52→76px, collectors32→44px, gaps4→6px and proportionally increases numbers/arrows. Narrow viewports retain prior responsive geometry and minimum44px interactive pieces.

The large blank area came from the open rules sidebar stretching the game surface to its~968px height, leaving~540px below the useful game content. Repasse rules now follow the game in full-width normal flow, all text and disclosures preserved. Surface ends16px after its legend. Selection catalog/import gap32→12px; final grid margin30→12px and bottom padding28→16px. JSON remains closed by default and opens normally;80levels remain available. No footer artwork removed.

Native Chrome measurements:
-1366×768 3×3: board236→340px(+44%), pieces52→76px(+46%), numeric text17→22.2px.4×4 board292→422px.
-390×844:3×3 remains236px/pieces52px;4×4 remains292px/pieces52px.
-320×568:3×3 remains236px/pieces52px;4×4 fits267px/pieces45.75px.
-All six cases: no horizontal inner/page overflow; next button16px after board block, bottom spare area16px.
-JSON disclosure manually opened, original input retained; catalog80buttons verified.

Regression: Repasse state/UI tests and full80certified-layout audit retained. Source-only preservation test confirms sole runtime diff is Repasse CSS.

Verification limit: the older repasse80-ui.mjs mock lacks Element.after(), used by the already-deployed compact layout, so that legacy harness cannot run. This is not a browser failure or a runtime change in this CSS-only update. The10Repasse state tests and80layout/solution audit pass; native browser verifies the current DOM/controls.

Additional user refinements integrated before publication:
- ELO's Marcar células bloqueadas overlap came from an old -12px bottom margin. It now has a positive12px margin, giving20px to the following toolbar buttons. Shared wrapped tool/check/action rows use12px gaps. Native audit9games×desktop/320px found zero overlapping controls and minimum12px inter-button gaps, no page overflow.
- Repasse board surface has an18px rounded2px outline, including all objective collectors. Outline does not change dimensions or clip/intercept input.
- Home categories now have the exact heading “ESCOLHA SEU ESTILO DE PUZZLE:” immediately above the three buttons (18px gap on desktop), hidden together with the category selector while inside a group/game.
- Final runtime diff limited to Repasse CSS, shared compact-control spacing, category CSS and the exact home heading. No JavaScript behavior changed in this update.

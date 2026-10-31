# ELO marking toggle placement

Moved only the existing 'Marcar células bloqueadas' markup into the ELO board surface immediately before its board. Original id, aria-pressed, aria-controls and handler/persistence unchanged. CSS left-aligns it with the board's content edge, not the overall page. Existing horizontal pan carries the toggle and board together. Standard gap12px; clue-gutter boards32px to leave column annotations unobstructed.

Native browser QA: phases1,45(12x12),60,80 at1366,390,320 (12 cases): button and grid left edges exactly align (0px delta); gap12/32px; column label minimum clearance7px; toggle changes and restores aria-pressed; confirmation remains below board; zero page horizontal overflow. Existing large-board inner pan remains. New palette visible: distinct10region colours on complex phases, all constraints independently audited by elo-region-colors test. Native screenshot reviewed. No modifications to mechanics, saves, PRUMO, other boards, or rules visuals.

# ELO actions aligned with Pontos/Descartes

Latest user correction referenced Pontos/Descartes, not Marcar células bloqueadas. ELO-only tools row now contains the existing point/discard controls and the existing undo/redo/reset/rules disclosure. Phase label remains above the board, mark toggle remains board-local left, and confirmation remains below. No handler duplication or rule/mechanics changes.

Native browser checks at1366/390/320: desktop groups have identical vertical center (0px delta). Mobile wraps onto an adjacent row because all controls cannot fit320px. Zero overlapping control rectangles, zero page overflow, minimum44px hit height in all three sizes. Existing panel toggles and ELO structural/regression tests pass.

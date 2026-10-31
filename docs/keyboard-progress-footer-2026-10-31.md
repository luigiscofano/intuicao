# Keyboard and continuous gameplay footers — 2026-10-31

- Órbita arrows use the existing selected-command rotation flow beyond board-only focus. Right is clockwise; left counterclockwise. Inputs, editable fields, selects, dialogs, modifiers, repetition, disabled gates and hidden gameplay are guarded. Visible and accessible hints retained. Status text is centered without changing announcements.
- All nine gameplay outer surfaces and direct control/footer areas now share #f8f9f3 with no legacy white gradient. Intentional board frames/cards remain untouched; next-level controls and content remain visible.
- Sintonia destination count uses a 34px soft-green card beside next level; footer dividing lines removed. Board frame, maps and movement controls retained. Progress area measured 134px high at desktop and compact widths.

## Verification
- 25 focused Node tests passed, including replaying all 80 Órbita certificates.
- Browser fixture: 464 campaign command/direction cases, zero failures; 10 protected-context cases passed.
- Actual keyboard interaction on Órbita phase 80: both arrow directions incremented turns via the existing flow. Status computed centered.
- Browser footer audit: nine games at 1366, 390 and 320 CSS px (27 cases): standard effective background, no gradient strips and no horizontal overflow. Sintonia next/count same row, 34px count and zero footer border widths at all three sizes.
- Desktop representative visual inspection confirms continuous gameplay footer and preserved rules/board content. Test-only fixture pages removed before publication.

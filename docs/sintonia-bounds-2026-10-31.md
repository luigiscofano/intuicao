# Sintonia frame spacing and destination card

The previous relative right offset moved commands over the play-area focus outline. Commands now have a real right padding inset and a 24px grid gap, so their layout bounds stay separate from the animal boards.

Destination card shrunk from 170×80 to a measured 104×54 CSS px (24px value). Its right edge follows the board frame rather than the outer next-level arrows.

Validation: native browser fixture checked all80 campaign levels at1366,1100,1024,390 and320px (400 cases): no command/play-area intersection, commands inside outerframe, zero rightedge alignment error and no horizontal page overflow. 10 focused Node tests passed. Gameplay JS, maps and movement counter unchanged.

# Balanced category heading spacing

Only game-sections.css changes: the return/title block now has symmetric24px vertical padding,20px at760px and below. Its adjacent games navigation has zero top margin to avoid doubled/collapsed gaps. Button sizing/design, titles and all navigation logic are unchanged.

Native desktop and320px browser measurements in Intuição, Raciocínio lógico and Versus:24px above/below desktop;20px above/below compact (below means the bottom of the entire return/title block when title wraps underneath). Button remains56px high. Main clientWidth equals scrollWidth in both sizes, no horizontal overflow. Screenshots inspected; keyboard return tested in all groups.

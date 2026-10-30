# Seven mechanic-specific victory scenes

Scope: ELO closes a circuit; PRUMO settles a balanced polyomino; PACTO forms symbol pairs; SINTONIA moves three existing cropped animal PNGs together; REPASSE transfers a value into an exact target; ÓRBITA rotates symbols onto their targets; DESVIO alternates row/column choices and reaches its final move. Decorative SVG/CSS only; no physics, campaigns, scoring, saves or game engines changed.

All animations finish in ≤1.3 s, have no loops or extra timers, are pointer-inert, and become complete static illustrations for reduced-motion users. Existing reset/navigation cleanup remains in place. A WeakSet of actual winning state objects prevents repeated confirmation/undo-redo/rerender from replaying an already celebrated state. Saved wins are displayed statically; a newly solved/restarted state may celebrate again. Failure/retry UI is untouched.

Validation:
- `node tests/game-victory.test.mjs`: exact old Reflexos/Corte Certo result markup across success/failure/options, exact lifecycle trace, byte-identical original app.mjs and style.css; seven new scenes, real-win gating, repeat suppression, restoration and cancellation.
- Existing manual-check suite: 400 campaign answer/partial cases, alternative solutions, worker deadline/reset/stale handling passed.
- PACTO feedback integration passed, including reset/navigation and loss/answer behavior.
- Sintonia/Repasse/Órbita engines: 25/24/17 tests passed.
- Native browser: all seven campaign/map-1 engines produced real wins and their corresponding new scene; repeated ELO confirm kept the same attempt serial; Sintonia returned to a saved won level with static scene.
- Screenshots inspected for actual ELO game and seven-scene overview. A temporary same-CSS 320px iframe verified compact scene/text layout; fixture removed before packaging. Full-device mobile interactions and OS reduced-motion toggling were not available; media-query implementation and static final-state rendering were reviewed.

Original Reflexos/Corte Certo SVGs, animation CSS and gameplay remain unchanged. Other existing art, confetti, controls and public access settings remain unchanged.

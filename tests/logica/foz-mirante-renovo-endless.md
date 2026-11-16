# Runtime procedural generation: FOZ, MIRANTE, RENOVO

Each game exports `generateEndlessLevel(seed, difficulty = 0, options = {})` and `structuralSignature(level)` from its `endless.mjs`. The modules import only their real browser-compatible engine, never a campaign, prebuilt pool, Node module, or offline tooling. Equal seeds and clamped bands produce equal independent definitions. Every returned answer is checked by the real rules engine and the starting state is checked not to win.

## Construction and bounded work

- **FOZ:** randomized depth-first spanning tree over a 4×3 through 6×6 grid; derive outgoing arrows and distances. Add random grid chords only while distance-domain propagation proves a single outgoing choice at every non-root cell. Remove shuffled distance clues only while that proof remains valid. A tree with the original distance clues is always the valid procedural fallback. Propagation removes monotonically from at most N² distance values, with N ≤ 36. `generation.unique: true` is a sound proof, not a human difficulty rating.
- **MIRANTE:** construct up to 64 random placements, derive first-visible observers, and reject placements whose pieces lack two witnesses. Adapt the existing offline propagator into a self-contained bounded runtime search (at most 400 search nodes per certification). Prefer exhaustive unique results. Remove up to the selected band's number of observers only while retaining witnesses and proving uniqueness. If no unique candidate is found, keep a valid generated board. If no valid random placement is found, construct a fresh permutation placement with horizontal witnesses. **Uniqueness is not guaranteed**: `generation.unique: false` means no proof was obtained; it does not assert multiple solutions. The engine correctly accepts any answer satisfying the puzzle rules.
- **RENOVO:** try up to 24 constructions, with at most 70 placements per trio. Randomly place perpendicular seed/bud/leaf triples while preserving first visibility and nonintersection. Prefer boards whose bounded exact trio-cover search (1,000 nodes) exhaustively finds one answer. If construction fails, generate randomized adjacent L triples in disjoint 2×2 regions, never a campaign board. As with MIRANTE, a false uniqueness flag means unproven, not necessarily ambiguous.

For MIRANTE and RENOVO, `options.maxAttempts` can lower the attempt budget to test or request fallback; it cannot raise the built-in cap. No timing-dependent choice affects determinism.

## Difficulty scope and repeat detection

Difficulty is clamped to integer 0–5. FOZ grows from 11 to 35 arrow decisions and targets a lower clue proportion; MIRANTE grows from 12 to 20 cell decisions and attempts more observer removal; RENOVO grows from 3 to 8 trios. These are construction controls, **not calibrated human difficulty, solver-depth requirements, or guarantees of matching campaign techniques**. MIRANTE bands sharing dimensions still differ in clue-removal targets and seed streams. The `calibrated: false` flag is deliberate.

Signatures omit IDs, names, and difficulty. FOZ canonicalizes channels/root/clues under all eight grid symmetries. MIRANTE canonicalizes solution layouts under those symmetries plus global shape swapping, deliberately treating observer-only variants as repetitions. RENOVO canonicalizes piece layouts under symmetries and global endpoint swapping and compresses empty coordinate spacing. The host must retain signature history and reject repeats; a finite board space cannot guarantee fresh layouts for literally unbounded play.

## Verification

Run from the checkout root:

```
node --test tests/logica/foz-mirante-renovo-endless.test.mjs
node --test tests/logica/foz-engine.test.mjs tests/logica/mirante-engine.test.mjs tests/logica/renovo-engine.test.mjs
```

The focused suite covers 3,600 generated puzzles, repeats every generation for determinism, checks real-engine answers/non-winning initial states, validates canonical variety (at least 90/200 per band, more than the entire 80-board campaign), clamps bands, tests unusual seeds and independent returned arrays, and forces 1,200 procedural fallback cases with deterministic repeats. The first run passed all 8 focused tests in about 8 seconds and all 22 existing engine tests. The 30-second per-game performance guard is intentionally generous to avoid hardware-sensitive flakes.

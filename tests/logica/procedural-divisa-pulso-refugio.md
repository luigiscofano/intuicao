# Procedural DIVISA, PULSO and REFÚGIO

The three runtime modules import only their respective rule engines. They do not
read a campaign, generated catalog, offline tool, Node API or Python runtime.
They export `generateEndlessLevel(seed, difficulty = 0, options = {})` and
`structuralSignature(level)`. Difficulty is clamped to integer 0–5. The same seed,
band and supported options produce an identical JSON definition without clocks
or global random state. The caller may retain definitions for versioned resume.

## Construction and budgets

- DIVISA seeds 3 or 4 territories at randomly selected squares, then repeatedly
  grows a random frontier edge. This guarantees each territory is connected.
  Contact quotas are derived from the fresh partition. Rows range from 3 to 5,
  columns from 3 to 6. Every prospective clue removal gets an exhaustive search
  capped at 1,200 nodes, with necessary lower/upper contact bounds.
- PULSO samples a newly selected arithmetic triple for each row, then derives
  column quotas. Rows range from 3 to 5, columns from 5 to 10. Clue-removal search
  assigns allowed row patterns and prunes by remaining column capacities, with
  at most 2,500 nodes per removal.
- REFÚGIO samples up to 192 new wall masks and validates connected free regions
  and wall contacts. Rows range from 3 to 5, columns from 4 to 6. If none qualifies,
  it constructs a random-walk separator, changing column by at most one between
  adjacent rows. Both sides remain connected and every wall touches both sides.
  Anchors are independently sampled within regions. `options.maxAttempts: 0`
  explicitly exercises this procedural fallback. Removal search prunes merged
  markers and walls with insufficient possible contacts, capped at 1,500 nodes.

Each search stops on its second solution or exhausted budget. A clue is removed
**only** when a complete search proves exactly one solution. An exhausted search
retains its clue; it never labels an incomplete search as a uniqueness proof.
There is at most one removal attempt per square, so both construction and search
have fixed work bounds. Every returned solution is checked by the real game
engine, and an already solved initial state is rejected.

The difficulty controls board size and target unknown squares: DIVISA/REFÚGIO
use 3 + 2 × band, PULSO uses 55% + 7% × band of squares. Uniqueness may prevent
reaching the target. These are structural difficulty controls, **not** a claim of
human difficulty calibration, minimal clues or a particular deduction depth.

## Structural identities

IDs and display metadata are excluded. DIVISA canonicalizes rotations,
reflections and territory names; its key includes the normalized unique partition,
fixed squares and contact quotas. REFÚGIO canonicalizes rotations/reflections
and ignores marker labels. PULSO ignores row permutations and horizontal
reflection. These signatures accept existing campaign levels with the same
schema. Signatures are not promises of an infinite collision-free stream; the
caller handles recent-history deduplication and bounded retries.

## Reproduction

Run `node tests/logica/procedural-divisa-pulso-refugio.test.mjs`.

The suite checks 960 primary seeds per game (160 per band), plus deterministic
replays and 180 forced REFÚGIO fallbacks. It validates real engine solutions,
initial state, replay through legal actions, JSON round trips, metadata and
reflection invariance, diversity, non-replay of the campaign, input clamping and
performance. An independent exhaustive assignment enumerator verifies uniqueness
for six easy seeds per game; the generators' own complete bounded searches prove
uniqueness of every returned board. Results from the last run are in the adjacent
`procedural-divisa-pulso-refugio-results.json`. No browser or UI behavior is
covered by this focused generator suite.

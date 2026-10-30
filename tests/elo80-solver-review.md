# ELO80 solver regression review

No engine semantics or runtime engine file changed for the 80-level campaign.

## Safe incomplete-state checks reviewed

- A placed point's occupied directions cannot disappear when more points are placed: first-visible endpoints may change, but the direction remains occupied. Therefore degree >2 and incompatible turn/straight directions are irreversible violations.
- Subdivision preserves the geometric coverage of an existing connection. Forbidden intervals and existing cut crossings cannot disappear. Inserting at a crossing would create four occupied directions, so a crossing between settled connections cannot be repaired in a valid final circuit.
- Mandatory/exclusive passage cells cannot receive points. A passage already traversed cannot stop being traversed through a legal subdivision. Existing excess exclusive traversals therefore are contradictions, whereas zero traversals remains pending until completion or a sound impossibility deduction.
- Distances can decrease through subdivision and are not rejected merely for a partial distance mismatch.
- A partial circuit is not forbidden. Its remaining regions must be able to subdivide its edges; only proven inability to join that circuit is rejected.
- A reference answer is never supplied to search or local propagation. Stored answers are compared only after independent solving.
- An enumeration stopped by time, node, work or solution-count limits is not a uniqueness proof. Regression requires exhaustive=true and count=1 separately from stored answer validity.

## Regression evidence

`node tests/elo-v3-independent-tests.mjs`: 16 named mathematical-semantic fixtures passed.

`node tests/elo-rules-tests.mjs`: 17 tests passed, including an independently implemented full-board oracle, 168 seeded connected-region boards (68 with solutions), and 2,816 partial-solution checks. The independent oracle reconstructs visibility via sorted row/column points instead of the runtime scanner.

`node tests/elo80-proof-replay.mjs`: all 80 explanation proofs freshly recomputed without cache or reference answers, including seven recomposed puzzles. Results: `elo80-proof-replay-results.json`.

`node tests/elo80-regression.mjs`: all 80 puzzles passed both exhaustive searches and 320 valid partial-subset checks. Final-campaign results are recorded in `elo80-independent-validation.json`; the report is complete only after every structural check and both exhaustive searches succeed for all80. The separately implemented campaign DFS does not use production local-propagation candidates. Its complete constraint check shares the geometry first-visible edge utility; the small-board oracle tests above independently test that utility's semantics.

Automated mathematical evidence does not constitute player testing or human difficulty calibration.

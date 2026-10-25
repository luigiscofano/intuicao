# ELO: independent logic and editorial review

Review date: 2026-10-25. This review distinguishes a mathematical certificate from an editorial judgement and from playtesting. It is not a player-tested difficulty calibration.

## Scope and evidence

- Reviewed `dist/elo-rules.mjs`, the production enumerator and bounded-reasoning generator.
- Re-ran `tests/elo-rules-tests.mjs`: 17 test groups passed, including 168 independently enumerated boards and 2,816 partial-solution states.
- Recomputed the sampled reasoning certificates from regions, fixed clues and constraints, without passing answers to the reasoning algorithm. Checked their final singleton positions against the full rule validator. Agreement with a saved answer is not the deduction proof and is not the victory condition.
- Hash prefixes below are the `levelHash` SHA-256 of exact dimensions, regions, fixed clues and constraints, not just a level ID. A changed candidate needs a new review.
- Early findings were made during generation and repair. The final active matrix was subsequently matched to the materialized 200-level campaign: all 21 reviewed hashes match, including the extra large-board sample. Full hashes and the checked campaign-file hash are in `elo-editorial-hash-review.json`.
- Independently checked all 200 final certificate fingerprints against the current level, rule engine and method version. All report solved without contradiction or budget exhaustion, and all final singleton configurations satisfy the full rules.

## Algorithm and certificate findings

1. The examined necessary-condition pruning is sound in the cases reviewed. In particular, an incomplete loop is not rejected merely for being closed: rejection requires a remaining region with no allowed position on any of that loop's segments. Distance sums are not prematurely fixed before possible subdivision. Order pruning waits for all marked regions. Forbidden intervals do not change automatic visibility.
2. Bounded propagation/refutation is a logical proof when it reaches singletons and all pruning is sound. A budget cutoff is inconclusive, not a contradiction or uniqueness proof. The method does not read answer data.
3. The original ID-only certificate cache was unsafe for regenerated candidates. This was corrected during review. Verified that mutating the constraints of a same-ID temporary candidate caused recomputation and replaced `solved: true` with the proper contradiction. The cache now also records and checks the rule-engine hash and a reasoning-method version. The subsequent limited-result cache issue was also corrected and retested: a budget-0 certificate marked limited was recomputed successfully when the budget increased to 5,000. Only complete successes are reused.
4. The stated hypothesis depth now explicitly excludes the direct candidate tests within local propagation. Two nested hypotheses are not by themselves evidence of a short human explanation. Some certificates contain long nested chains; do not classify difficulty from evaluation counts, runtime or proof depth alone.
5. Initial `logicIdea`/`reasoningTrace` values were generation templates, with at most three eliminations computed without the new constraints. Those values are not a complete solving sequence. Final development data must contain the concrete reviewed idea and a reference to the full, matching certificate.
6. Repeated already-forced placements occur in successive certificate propagation steps. They are harmless mathematically but should be deduplicated in the readable summary rather than counted as fresh discoveries.
7. During production the fast `productionSolve` was changed to call the main engine. The final uniqueness label was corrected to exhaustive search after sound propagation, rather than independent enumeration. A separate final-rule checker is also run. The independent small-board oracle remains a separate, narrower check of pruning and rule correctness; this report does not claim a second independent exhaustive enumeration of all 200 levels.

## Important semantic ablation finding

Removing a passage family also re-allows points on its marked cells. Thus `mainFamilyEssential: true` alone can mean that the no-point rule matters, not that the passage must be used or that exactly one option matters.

In the original stage-10 snapshot, levels 182 (`2016687af302`) and 183 remained uniquely solvable after removing exactly-one while retaining all marked cells as no-point domain restrictions. Level 181 (`f863eec1e21e`) had an option at corner L5C1, which can never be the strict interior of an orthogonal connection. It therefore reduced to an ordinary mandatory passage. These candidates were sent for repair. The same ablation must preserve no-point cells when reviewing mandatory passages.

This is distinct from usefulness: a redundant clue can still provide a good short deduction. Record “helps the deduction” separately from “necessary for uniqueness.”

All 20 stage-3 candidates passed the semantic ablation: preserving their no-point cells while removing mandatory traversal produced at least two rule-valid alternatives for every level, 41–60.

## Sample matrix

Regions and coordinates below are one-based. “Approve” means the observed reasoning supports the stated role, not that playtesting has been performed.

| Stage | Candidate / hash prefix | Concrete central deduction and relevant clue | Editorial result |
|---|---|---|---|
| 1 | 1, `elo-v2-001` / `f685725e1900` | The two fixed opposite corners force the other two aligned corners; shifting either leaves a fixed point without a second direction. | Approve as brief introduction. |
| 1 | 20, `elo-v2-153` / `9bc65ffc2d41` | Region 12's upper alternatives either cross the fixed vertical or leave only one direction. Fixing the right-hand area rules out third directions in the middle; the lower alternative is then distinguished by a crossing. | Approve as classical synthesis, beyond tutorial. |
| 2 | repaired 21 / `b0b8547a4f39` | If R1 is L2C1, two directions require R4 at L2C5 and R6 below. The fixed curve R2 at L1C3 must exit downward, crossing that horizontal link. Thus R1 is L1C1, and the curve forbids R4 on the top row. The remaining small chain resolves R3 and the lower return route. | Approve with this explanation, not the generic curve template. |
| 2 | repaired 22 / `23c21949c6c3` | R7 cannot be straight anywhere on the last row because it has no opposite pair there. It must be L5C2, forcing R2 to L5C1 and propagating alignment to the upper and right areas. | Approve as clear straight-point introduction. |
| 3 | 41 / `93816cf84da0` | The passage at L3C4 removes R2's two upper-right alternatives: neither would leave endpoints able to straddle it. The remaining branch must also supply the fixed left point's second direction; the previously learned curve forces the lower return. | Approve as a short introduction combining the new passage with curves. |
| 3 | 59 / `8f9f010928f7` | Three passages in column 4 couple the top crossing and the lower return. Lower-left branches lose their second direction or cross; once R5 is settled, the middle passage fixes R1 and propagates through five regions. | Approve as a compact chained challenge, not a cosmetic set of passages. |
| 4 | 61 / `6a792a944069` | R5 at L1C4 would connect automatically to the fixed point across the forbidden L1C4–L2C4 interval. The connection is not hidden; the position is rejected. R5 at L2C4 begins a short forced cascade. | Approve as a clear, direct introduction. |
| 4 | 79 / `6f57056dce05` | The two left-edge forbidden intervals force R5 down to L3C1. The right passage then limits R2, while the central passage and the remaining forbidden vertical interval constrain the lower return; the alternatives fail by crossing or loss of a direction. | Approve as an advanced combination of passages and forbidden intervals. |
| 5 | 81 / `9b6a9b876653` | The two-point quota in column 1 must be supplied by R1/R5. The two-point quota in row 4 then constrains R2/R3; fixed points decide the remaining alignments. | Approve as short, meaningful introduction. |
| 5 | 99 / `4222ddcfb53a` | The top-row quota puts R2/R4 there. Passages constrain the lower-right return; after R3 is fixed, the column-2 quota eliminates three R7 alternatives and propagates across the board. | Approve as a compact advanced chain. |
| 6 | 101 / `e8d3eb090454` | Sum 3 for R5 excludes the far-right corner. The other lower alternative produces three connections elsewhere; the remaining sum then restricts R2/R4 and the left-hand return. | Approve as an introduction using already-learned core rules. |
| 6 | 117 / `4efc5e426f2a` | Sum 2 at fixed R1 forces the adjacent R8. If R2 uses L2C5, neither remaining R4 position can meet sum 6 without creating a third direction. The other branch gives a short forced cascade. | Good compact puzzle; prefer advanced/a breather, not automatic “expert.” |
| 7 | 121 / `7bef78b02d25` | Required direct R5–R1 adjacency removes R5's L1C4 position. The lower row quota and fixed points then force a consistent vertical return. | Approve as a direct-neighbor introduction. |
| 7 | 128 / `11c36c82a3a9` | R7 already needs R10 and R1 as its two direct neighbors, excluding competing aligned points. Their alignments combine with R1's sum 6 to force R5 farther down; the remaining classical branch must avoid a closed isolated circuit. | Approve as an intermediate global combination; not expert merely because the board is medium. |
| 8 | 146 / `29f1453c9937` | After geometric alternatives are reduced, R8–R2 cannot be consecutive marked regions. Rejecting those apparently workable local links forces the left side; later R1–R4 and R8–R7 adjacency exclusions propagate through the right side. | Approve as a genuine order-dependent compact puzzle, with a concrete summary needed. |
| 8 | 159 / `15003fc59d92` | The passage leaves R7 at L4C5. A tempting R10 at L4C2 would connect R10 directly to R7, but the marked order requires R2 between them. This constraint appears in the refutation of the lower-left R4 alternative and combines with distant crossings. | Appropriate advanced compact candidate. Full nested certificate is not itself a short tutorial explanation. |
| 9 | 163 / `8258f1c9adf0` | The two-crossing cut competes with the left return route. For example, in the branch R3=L2C1 and R4=L4C3, placing R9 at L2C4 would make three crossings of the C2/C3 cut, exceeding its quota. Propagation of these exclusions reaches the fixed right points and upper return. | Approve as advanced continuation; would be too indirect as the first teaching example. |
| 9 | 171 / `1499a32d6cd6` | Three four-crossing cuts, two row quotas and marked order couple upper, middle and lower areas. For example, R2's top alternatives exhaust the row-4 quota or place marked R1/R9 consecutively; lower choices must preserve the row-7 quota. | Real global interaction, but the certificate has long nested chains. Keep the difficulty estimate provisional and provide a selected human-readable chain. |
| 10 | repaired 181 / `a80abc777210` | Both marked cells have geometric support. The fixed left point first forces R3; the upper alternative for R2 crosses the resulting required return. With that branch removed, R5 cannot use the top-left cell because neither group passage could be served. | Approve as a short exclusive-choice introduction. Exact-one is essential with bans preserved. |
| 10 | repaired 182 / `dab524a1f92e` | Three geometrically possible marked cells remain empty. After R1 is fixed by the core, the lower-right R3 alternative exhausts R4; R6's remaining lower choice cannot close a loop that excludes R5. The consistent route serves exactly one marked cell. | Approve as a second introduction using a short classical chain. Exact-one is essential with bans preserved. |

## Larger-board checks beyond the two-per-stage sample

- Level 93 (`1b4eeb55f861`, 10×10) has a genuine long-range dependency: passages fix R12 low on the board; alternatives for R2 and R4 then leave too few suppliers for column 7's quota. That quota forces R10/R1 high on the board. Later the remaining loop must still admit the upper-left region. This is not merely a collection of independent local rectangles.

## Regenerated stage-10 semantic check

The reviewed regenerated snapshot has semantic exact-one necessity in all 19 non-classical stage-10 levels: removing all group traversal conditions, but retaining every marked cell as a no-point domain restriction, produces at least two solutions in every case. The classical interlude is intentionally excluded.

Each group is individually necessary under the same test in levels 184, 186, 187, 191, 193, 194, 198, 199 and 200. Some groups are individually redundant in 183, 185, 188, 189, 190, 195, 196 and 197; the family remains necessary. These can be pedagogically useful, but do not call every individual clue necessary. Initial timeouts in 193 were inconclusive; applying sound local propagation before enumeration subsequently established at least two alternatives for every tested removal. The later replacement of level 184 was detected by hash, rechecked, and all four of its groups proved individually necessary. Full results matched to final level hashes are in `elo-editorial-exclusive-ablation.json`.

## Final acceptance checks and limits

- The two-per-stage sample and the additional large level are complete, and all 21 hashes match the final file. Earlier replaced candidates are not approvals of their replacements.
- Final materialized counts independently confirmed: exactly 200 levels, 20 in each of 10 stages, 77 compact boards, 40 large boards, and 42 compact boards after level 80.
- All 200 final certificates are current and complete. Final development data link to those certificates rather than treating a short displayed summary as the entire proof.
- Classification remains an assisted editorial estimate. Reviewed exceptions, including level 117, were adjusted from the concrete chain; no human playtesting or player-calibrated difficulty is claimed. Long bounded proofs should not be presented as evidence that a human must or can perform every listed refutation in that order.
- This logic/editorial review does not replace interaction, mobile layout, saved-progress migration or cross-game regression testing.

# ELO region adjacency colours

Replaced region-index modulo colouring only in ELO. Board and legend now share a deterministic exact DSATUR four-colouring of the graph formed by orthogonally shared region borders. Disconnected/non-neighbouring regions may reuse a colour; neighbouring regions never do for validated planar maps. The palette is gold, blue, rose and mint. Existing letters, borders, selection/hover outlines, tokens, clues and all engines/data/saves are unchanged. A WeakMap cache checks the geometry signature so edits cannot use a stale assignment.

Metric: CIELAB 1976 / D65 Euclidean separation, required minimum45. Measured minimum47.380602; minimum contrast of existing #344633 letters4.739:1. These are defined engineering checks, not a universal colour-vision accessibility guarantee. Existing letters and boundary strokes remain additional cues.

Validation:
-80 published campaigns;840 endless maps across all7 sizes,3 region counts, both fixed settings and20 seeds;257 import geometries through the existing normalizer, including partitions up to16 connected regions.
-11,997 shared-region borders; no conflict and no fallback on validated inputs. Maximum search16 nodes. Tests include a deliberately nonplanar/disconnected invalid K5/K16 fallback, no adjacent duplicate colours and honest threshold diagnostics.
-All80 ELO campaign UI flows:240 failures,80 verified answers,80 explicit wins and5 reload checks. Historical test expectations updated to already-published zero-padded labels and80-level sibling campaigns; game code not changed to suit tests.
-Existing manual-check suite (400 cases and worker/reset/stale handling) and JSON import UI suite passed.
-Native browser: level36 screenshot inspected, colours remain stable on interaction/undo.320px embedded viewport inspected; existing local board horizontal scrolling preserved. Temporary QA page removed.

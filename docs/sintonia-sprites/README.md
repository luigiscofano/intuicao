# Sintonia — user-provided animal sprites

## Scope and provenance

The user asked to replace Sintonia's animal sprites with their uploaded sheet,
`sprites_chibi_ituicao.png` (Library `libfile_8a210bf8f6008191873c2b2786ed652f`,
version 0). The existing four animal identities use the sheet's top row:

| Existing identity | Top-row column / atlas frame |
| --- | --- |
| `tuiuiu` | 1 / 0 |
| `capivara` | 2 / 1 |
| `bemtevi` | 3 / 2 |
| `mico` | 4 / 3 |

Only `dist/sintonia/assets.mjs` changes among the 217 previously deployed files.
The sole added deployed file is `dist/sintonia/assets/chibi-user-atlas.svg`.
No animals, campaigns, maps, rules, progress schemas, UI layout, or other games
were added or changed. The four prior PNG atlases remain byte-identical.

## Exact source, native clipping

The self-contained SVG embeds the original 1254 × 1254 PNG **once, byte for
byte**, and exposes a 1254 × 313.5 (4 × 1) atlas. It does not load any external
resource. The original PNG's SHA-256 is:

`3eca630eae5054dbc39dab03a64af4b059821edf4412a8f1b0fda63f9d4a5651`

Code-native SVG clipping paths select the four top-row animal silhouettes.
They do not redraw, regenerate, recolor, or substitute the uploaded artwork.
Clips retain the enclosed white plumage/eyes, remove the sheet's black grid and
white cards, and exclude its decorative tan floor flecks. The remaining twelve
sheet animals are not exposed by any clip or game identity.

The silhouettes were identified from each animal's connected foreground,
with enclosed holes filled to preserve white details. Only the decorative tan
floor hue below source y=285 was excluded where its antialias fringe touched a
foot. The final clip consists of exact integer-coordinate rectangular runs,
not a newly painted bitmap. The provenance JSON records each visible source
bounding box and area.

The existing `spriteMarkup` function already supports columns/rows/frame;
using that interface preserves the renderer and CSS exactly, including
`inset:-10%` and the existing positioning/accessibility behavior.

## Verification

- `node --test tests/sintonia-sprites.test.mjs tests/sintonia-integration.test.mjs`
  — 11/11 pass.
- `node --test tests/sintonia-engine.test.mjs tests/sintonia-ui-state.test.mjs tests/sintonia-content-migration.test.mjs tests/sintonia-content-migration-ui.test.mjs`
  — 49/49 pass.
- The sprite audit compares every other deployed file against commit
  `06549a80f656c6d0a839a526c58e11ddedb5b1a4`, checks the embedded original PNG's
  hash, enforces exactly four frame mappings, and invokes the unchanged real
  `spriteMarkup` implementation for every animal and direction.
- The historical content-v2 audit remains strict. Its explicit later-change
  adapter checks the exact current sprite mapping/asset hashes, then restores
  only the exact former mapping for the historical byte comparison; it does
  not introduce an unrestricted asset exception.
- Inkscape successfully rasterized the self-contained SVG. Inspection confirmed
  all four original artworks. The render has 266,881 fully transparent pixels;
  sampled grid/card/floor-fleck pixels have alpha 0, while sampled white bird
  details have alpha 255. This verifies native SVG rendering, not browser QA.
- Browser verification is owned by the publishing task; local preview
  infrastructure was unavailable at this stage.

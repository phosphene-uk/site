# Replace the radial star with the glowing o

On 2026-10-29 Steve chose a new Phosphene mark: a bold ring (an “o”) with two fainter rings of light around it, after a bare sixteen-ray star read as too close to Claude’s spark logo. He compared five directions and a second round of variations, then approved it in a scratch copy of this site at every size it’s used (header, spines, inserts, cover imprints, favicon).

Geometry, in the existing 32 × 32 view box, centred on (16, 16):

| Ring | Radius | Stroke | Opacity |
| --- | --- | --- | --- |
| Core | 6.8 | 3 | 1 |
| Inner halo | 11 | 1.2 | .6 |
| Outer halo | 14.6 | .9 | .3 |

## 1. Ident prototype (review before anything else changes)

- `prototypes/ident/index.html`: replace the rays in the three SVG renderings and the pixel fallback with the three rings; relabel “Separate star” and “Star → o” as “Separate mark” and “Glowing o”; update the captions and footer copy.
- `prototypes/ident/ident.js`: the core ring grows from the seed, then each halo follows a little later; the optical fringes become ghost rings that converge. In the o position the halos fade and the core cross-fades into Lilita’s o, as before. The pixel study draws integer circles, with the halos in two darker citron tones.
- `prototypes/ident/ident.test.cjs`: keep every invariant (final states agree across timings, hollow pixel o, a meaningful intermediate state, one frame loop, pause, visibility and reduced motion cancel work), with the rings in place of the rays.
- Update `README.md`, regenerate `preview.html`, run the tests, and check every rendering in Chrome at the start, middle and end of both timings.

Verify: `node prototypes/ident/ident.test.cjs` passes, and fails if a ring's final radius is changed; screenshots of each rendering at 0.4, 0.9, 1.4 and 2.0 seconds look right.

## 2. Site (after Steve approves the motion)

- `public/index.html`: replace the `studio-star` symbol's contents (one place; 50 uses).
- `public/assets/favicon.svg`: the rings in citron on slate, with slightly heavier strokes for small sizes.
- `PRODUCT.md` and `DESIGN.md`: record the new mark and the ident approval, replacing the star.
- Check the page in Chrome at desktop and mobile widths.

## 3. The book

- Replace the star in the title page imprint of *Build your first website* (`../book/publish/styles/print.css`).

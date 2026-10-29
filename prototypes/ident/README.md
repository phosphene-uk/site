# Phosphene ident · motion study

**Chosen direction:** Optical · glowing o. On 2026-10-13 Steve approved light gathering into a radial star inside the name and resolving into the ordinary o. On 2026-10-29 he replaced the star with a new mark, a bold ring with two fainter rings of light around it, because the bare star looked too close to Claude's spark logo (see `plans/2026-10-29-glowing-o-mark.md`). The motion keeps the approved structure with the new mark; it's awaiting his review. This is a review prototype, not an introduction installed in the website or any game.

Open `preview.html` directly in a browser for the self-contained version, with fonts, styles and animation embedded. Rebuild it after editing with `python3 prototypes/ident/export-preview.py`.

For the editable source version, from the repository root:

```sh
python3 -m http.server 49192 --bind 127.0.0.1
```

Open <http://127.0.0.1:49192/prototypes/ident/> and press **Replay**. All four views share one timeline. **Play / Pause**, the keyboard-accessible time slider and **Still version** make the sequence inspectable. Stop the server with Ctrl-C.

## Simple · one second

| Time | Action |
| --- | --- |
| 0–100 ms | A small citron point appears on ink blue. |
| 120–640 ms | The core ring grows from the point; each halo follows 60 ms later, spreading outwards. |
| 240–620 ms | The initial point dissolves into the ring's centre. |
| 390–950 ms | The Phosphene wordmark is revealed and settles. |
| 1000 ms | The complete mark holds. No loop or automatic fade to black. |

The point occupies the mark's final position: no spinning or travelling logo. The background remains still. No audio is included. The sequence uses a bounded animation-frame loop, growing SVG circles and a small wordmark mask. Canvas is repainted only when its discrete frame changes. Completion, pause, page hiding and reduced motion cancel scheduled animation work.

## Optical · two seconds

Choose **Optical** to compare the richer version with the original **Simple** ident. Selecting a variant replays it unless reduced motion is active.

| Time | Action |
| --- | --- |
| 30–650 ms | A defocused cyan-and-violet afterimage gathers around a pale light. |
| 650–1490 ms | The rings grow outwards, 120 ms apart, as cyan and violet ghost rings converge on them. |
| 1080–1850 ms | Light reveals the wordmark through a soft mask; its blur and colour separation settle. |
| 2000 ms | The same completed citron mark holds. All optical layers are invisible. |

SVG gradients, local blur and a moving luminance mask create the optical effect. No footage, generated images, external libraries or fullscreen filters are used. The 320×200 interpretation substitutes discrete coloured echoes and integer-pixel convergence. Both sequences remain silent.

## Form factors

- Landscape and 4:3 use name and mark side by side, matching the website. The mark has generous margins.
- Portrait places the mark above the wordmark. It shares the timing and final geometry of the landscape mark.
- The pixel study uses a 320×200 buffer, 12 discrete frames, integer lines and an authored 5×7 lettering grid at 2× size. It is a visual study, not a claim that it runs on a particular classic machine. Font, palette, pixel aspect ratio and memory limits need adapting to the actual target. Native presentation should use integer scaling; the comparison board may fit the buffer into fractional CSS dimensions.
- Reduced motion shows the finished mark immediately. The preview honours the system preference and also provides a manual still control. Static SVG marks remain visible without JavaScript.

## Glowing o · integrated treatment

The **Mark** choice compares **Separate mark** with **Glowing o**. The experiment keeps the o's advance width, temporarily hides its printed glyph and positions the rings on it using the loaded Lilita lettering, stretched to the letter's proportions (461 × 520 units) so the core ring lies on the o's stroke. The complete name remains available to assistive technology. The wordmark is centred on both landscape and portrait screens, and the optical reveal radiates out from the rings inside it.

The pixel version draws integer circles: a two-pixel core and two halos in darker citron tones (citron mixed into ink at 60% and 30%), because pixel art has no opacity. The halos drop out first, then the ordinary rounded o outline appears. The simple timeline makes this transition at 480–800ms; optical uses 1120–1640ms. The completed pixel wordmark spells Phosphene with a normal, hollow o. The modern SVG treatment follows the same timing: the halos fade, the core ring fades, and the actual Lilita o becomes fully visible. All sizes finish on the readable wordmark, including in still mode.

## Integration contract

Keep the visual sequence separate from each application's launch machinery. A host can show the still mark immediately, play the sequence during genuine loading, interrupt it when ready or let a game player skip it. Never add waiting time to a tool solely to finish the animation. Hold or transition from the final frame into the title's own visual identity.

The browser study reuses the repository's licensed Lilita wordmark font. Final native assets should preserve the lettering as outlines or approved raster sizes, avoiding runtime font dependencies. OS launch screens may need a separate static/icon treatment; this prototype does not replace platform launch requirements.

This folder introduces no packages and is outside `public/`, so it is not deployed to the main website by the existing Pages configuration.

## Verification recorded

Checked in Chrome at 320px, 768px and 1504px viewport widths, with no horizontal overflow. Inspected start, star formation, name reveal and completed frames. Exercised replay, pause during playback, keyboard slider input and manual still mode; checked the completed timeline and absence of console warnings/errors. A deterministic controller check confirmed frame cancellation on completion, pause, page hiding, manual still and simulated system reduced-motion changes. The operating system preference itself was not changed during browser review.

The self-contained artifact was checked through the local HTTP preview. Browser automation does not allow `file://` navigation, so direct local-file opening was not browser-tested.

Optical follow-up: inspected afterimage, convergence, soft lettering reveal and completion; exercised mode switching and interruption. Run `node prototypes/ident/ident.test.cjs` for deterministic controller checks, including agreement between both variants' final SVG state and pixel drawing, a single scheduled frame during switching, and cancellation on pause, completion, hiding or reduced motion. This is not a GPU benchmark or native-device verification.

On 2026-10-29 the glowing-o version was checked in Chrome: every rendering at 0.4, 0.9, 1.3 and 2.0 s (optical) and 0.2, 0.45, 0.7 and 1.0 s (simple), in both treatments, with no page errors, plus close-ups of the ring-to-o cross-fade at 1.15–1.55 s. `ident.test.cjs` now also fails if a ring finishes at the wrong size.

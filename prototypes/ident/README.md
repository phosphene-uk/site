# Phosphene ident · motion study

A point of light becomes the radial star; Phosphene appears. The finished mark holds. This is a review prototype, not an introduction installed in the website or any game.

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
| 120–640 ms | Sixteen rays extend outwards, easing into the existing star. |
| 240–620 ms | The initial point dissolves into the star's centre. |
| 390–950 ms | The Phosphene wordmark is revealed and settles. |
| 1000 ms | The complete mark holds. No loop or automatic fade to black. |

The point occupies the star's final position: no spinning or travelling logo. The background remains still. No audio is included. The sequence uses a bounded animation-frame loop, SVG stroke reveal and a small wordmark mask. Canvas is repainted only when its discrete frame changes. Completion, pause, page hiding and reduced motion cancel scheduled animation work.

## Optical · two seconds

Choose **Optical** to compare the richer version with the original **Simple** ident. Selecting a variant replays it unless reduced motion is active.

| Time | Action |
| --- | --- |
| 30–650 ms | A defocused cyan-and-violet afterimage gathers around a pale light. |
| 650–1250 ms | The star extends as the colour fringes converge. |
| 1080–1850 ms | Light reveals the wordmark through a soft mask; its blur and colour separation settle. |
| 2000 ms | The same completed citron mark holds. All optical layers are invisible. |

SVG gradients, local blur and a moving luminance mask create the optical effect. No footage, generated images, external libraries or fullscreen filters are used. The 320×200 interpretation substitutes discrete coloured echoes and integer-pixel convergence. Both sequences remain silent.

## Form factors

- Landscape and 4:3 use name and star side by side, matching the website. The mark has generous margins.
- Portrait places the star above the wordmark. It shares the timing and final geometry of the landscape star.
- The pixel study uses a 320×200 buffer, 12 discrete frames, integer lines and an authored 5×7 lettering grid at 2× size. It is a visual study, not a claim that it runs on a particular classic machine. Font, palette, pixel aspect ratio and memory limits need adapting to the actual target. Native presentation should use integer scaling; the comparison board may fit the buffer into fractional CSS dimensions.
- Reduced motion shows the finished mark immediately. The preview honours the system preference and also provides a manual still control. Static SVG marks remain visible without JavaScript.

## Integration contract

Keep the visual sequence separate from each application's launch machinery. A host can show the still mark immediately, play the sequence during genuine loading, interrupt it when ready or let a game player skip it. Never add waiting time to a tool solely to finish the animation. Hold or transition from the final frame into the title's own visual identity.

The browser study reuses the repository's licensed Lilita wordmark font. Final native assets should preserve the lettering as outlines or approved raster sizes, avoiding runtime font dependencies. OS launch screens may need a separate static/icon treatment; this prototype does not replace platform launch requirements.

This folder introduces no packages and is outside `public/`, so it is not deployed to the main website by the existing Pages configuration.

## Verification recorded

Checked in Chrome at 320px, 768px and 1504px viewport widths, with no horizontal overflow. Inspected start, star formation, name reveal and completed frames. Exercised replay, pause during playback, keyboard slider input and manual still mode; checked the completed timeline and absence of console warnings/errors. A deterministic controller check confirmed frame cancellation on completion, pause, page hiding, manual still and simulated system reduced-motion changes. The operating system preference itself was not changed during browser review.

The self-contained artifact was checked through the local HTTP preview. Browser automation does not allow `file://` navigation, so direct local-file opening was not browser-tested.

Optical follow-up: inspected afterimage, convergence, soft lettering reveal and completion; exercised mode switching and interruption. Run `node prototypes/ident/ident.test.cjs` for deterministic controller checks, including agreement between both variants' final SVG state and pixel drawing, a single scheduled frame during switching, and cancellation on pause, completion, hiding or reduced motion. This is not a GPU benchmark or native-device verification.

# Settle the pixel star into o

Steve approved trying star → o for the pixel rendering of the integrated wordmark. Keep the modern SVG star treatment and separate-star pixel option.

1. Update `prototypes/ident/ident.js`: retract the pixel star's inner rays while the rounded o outline appears, then render the ordinary glyph with the rest of the name. Fit the transition within both existing timelines and keep integer pixels.
2. Extend `ident.test.cjs` to compare the resulting letter against the normal wordmark's glyph, confirm its hollow centre, and retain final-state/interruption checks. Update `README.md` and regenerate `preview.html`.
3. Inspect the star, transition and final wordmark in Chrome. Verify both timings and still mode; commit/push and stop the preview server.

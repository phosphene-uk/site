# Optical Phosphene ident

Steve chose the optical direction: an afterimage gathers into focus, briefly separates in colour and resolves into the citron star and name. Keep the approved simple ident available for comparison.

1. `prototypes/ident/index.html` and `ident.css`: add a labelled Simple / Optical choice to the existing four-format review board. Add restrained optical light layers inside each SVG, retaining the final geometry and static default.
2. `prototypes/ident/ident.js`: add a deterministic 2000ms optical sequence. A defocused chromatic afterimage contracts; ghost rays converge; light from the star reveals the name. Bound filters to the mark. Adapt the 12-frame pixel study with discrete colour offsets. Share existing interruption, scrubbing and reduced-motion controls.
3. Update `README.md` with optical timing and rendering limits. Regenerate `preview.html` using the existing exporter.
4. Inspect beginning, convergence, lettering and final frames in Chrome at desktop and mobile widths; verify mode switching, keyboard controls, pause, still and completion. Run syntax and `prototypes/ident/ident.test.cjs` controller checks, commit/push, stop preview server and retain the self-contained preview.

Motion thesis: perceived light becomes a stable, recognisable mark. The optical version lasts two seconds, remains silent and never loops. The final frame matches the simple version exactly. No website or game integration and no dependencies.

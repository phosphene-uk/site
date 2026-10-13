# Phosphene ident preview

Build the agreed light → star → Phosphene concept as a standalone review surface. No title integrations or website intro are included.

- `prototypes/ident/index.html`: four synchronized previews (16:9, portrait, 4:3, 320×200 pixel), replay, pause, scrub and still controls. Default to a completed mark without JavaScript.
- `prototypes/ident/ident.css`: existing palette and self-hosted typography, responsive review layout, intentional static reduced-motion presentation.
- `prototypes/ident/ident.js`: one bounded 1000ms timeline; point of light resolves into the exact radial mark, name appears, complete mark holds. SVG rendering for modern targets and integer-pixel canvas rendering for a constrained-machine study. No audio or dependencies. Cancel animation frames on pause, completion, reduced motion and page hiding.
- `prototypes/ident/export-preview.py` and `preview.html`: a self-contained review artifact that works after the preview server is stopped.
- `prototypes/ident/README.md`: timing, aspect-ratio rules, preview instructions, limitations and integration contract. Pixel version is a visual study, not proof of compatibility with a specific machine.

Motion thesis: a light takes a recognisable shape; the name supplies the maker. Keep the background still, avoid spinning, flashing, loops and artificial startup delays. The host title decides when to hand over. Preview controls acknowledge immediately and can interrupt the sequence.

Verification: JavaScript syntax; browser desktop and 320px layout; scrub start/intermediate/end; replay/pause/reduced-motion override/keyboard; confirm no recurring frame work when stopped. Commit and push the standalone prototype. Stop the task preview server after browser review and leave durable files with a reproducible launch command.

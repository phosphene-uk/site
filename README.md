# phosphene.uk

The Phosphene showcase, deployed to Cloudflare Pages from `public/`.

- `public/index.html` — the complete project catalogue and native edition disclosures
- `public/styles.css` — identity, responsive shelves and CSS 3D binding
- `public/site.js` — optional collection filters, deep links and motion control
- `public/assets/` — local fonts, flat cover illustrations, authentic wordmarks and prototype captures
- `public/_headers` — security headers applied by Cloudflare Pages
- `DESIGN.md` — design tokens and the approved edition treatment

No build step or package dependencies. Edit the files in `public/`, commit, and push; Cloudflare Pages redeploys automatically. All projects and edition notes work without JavaScript.

For a local preview, run `python3 -m http.server 8000 --directory public` and open `http://localhost:8000`. Stop the server with Control-C when finished.

To add an edition, copy a sibling `article.edition`, give it a unique project ID and accessible title, and supply a flat transparent illustration. CSS provides the physical cover and spine. Keep unpublished and planned status explicit; planned work has no launch link. Preserve the source and generation prompt in the asset provenance sidecar.

Steve Hill, trading as Phosphene.

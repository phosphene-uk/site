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

## How I judge the work

I want the work to be approachable, responsive and worth spending time with. Games should leave room for meaningful player choices; tools and teaching should help people understand what they can do and why. The site should make that work easy to reach, with readable notes, keyboard access, reduced motion and useful content without JavaScript.

I use AI to help make things. I remain responsible for the choices and the claims I publish. Build results, tests, independent checks and real player or learner feedback answer different questions. I want the evidence and its limits to be clear, and I am willing to revise or cut work that does not earn its place.

These are commitments, not a claim that every project has passed every check. Released software, unpublished prototypes and planned work stay clearly labelled. The [game-quality charter](https://github.com/phosphene-uk/site/issues/3) sets proportionate gates for each game's stage and intended platforms; individual projects carry their own evidence and constraints.

Steve Hill, trading as Phosphene.

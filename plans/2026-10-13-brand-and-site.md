# Phosphene brand and website evolution

## Agreed brief

Create a studio showcase that makes visitors curious about the games, tools and experiments and leads them into the projects. Keep the name; every visual element may evolve. Steve chose visual mockups before implementation.

## Steps

1. Record confirmed product truth in `PRODUCT.md` and the chosen workflow in `.impeccable/config.json`. Verify against Steve's answers and the existing page.
2. Develop distinct identity and homepage directions in `.impeccable/`, with polished mockups in `.impeccable/mocks/decision/`. Present the directions for selection before changing `public/index.html`. Verify that mockups preserve real project names and avoid invented claims.
3. Record the selected direction in the surface brief for `public/index.html`; resolve composition and asset requirements. Verify with the selected mockup and Steve's feedback.
4. Implement the agreed identity in `public/index.html` and, if needed, new files under `public/assets/`. Preserve existing static deployment and security headers; ask before adding dependencies. Verify links, keyboard access, reduced motion, contrast and desktop/mobile rendering.
5. Complete the design review; document the finished identity in `DESIGN.md` and `.impeccable/design.json`; update `README.md` if instructions change. Run appropriate checks, inspect the actual rendered page, commit the self-contained change and push. Verify deployment output and clean up task-owned temporary processes and files.

## Initial evidence

The existing page is a narrow text column with a glowing amber wordmark and five project entries sharing the same treatment. It contains no project imagery. The current site is the visual baseline, not a constraint on the replacement identity.

## Status

Brief confirmed. Four direction mockups are ready in `.impeccable/mocks/decision/`: Colour proofs, Software editions, Studio notebook, and the conventional portfolio alternative. Each has its exact generation prompt in a sidecar and embedded in the PNG. Generated descriptive copy remains unapproved and must be replaced with verified wording before publication.

Steve shortlisted Software editions and Studio notebook, then explicitly chose “Develop the combination: Software editions with restrained notebook details.” The combined identity in `annotated-editions.png` is approved as the direction. Its layout remains option one in the composition round, alongside two new compositions. The exact wording and artwork remain subject to verification. The build phase has started at `comps`; production code waits for composition selection.

The two composition alternatives are `.impeccable/mocks/open-edition.png` and `.impeccable/mocks/fold-out-catalogue.png`. Steve also asked whether unpublished experimental games belong on the site. Recommendation: a selective, clearly labelled Experiments section below the main collection, showing meaningful screenshots, clips or playable builds and truthful status. Names, content, public visibility and inclusion are pending Steve's reply; no unpublished projects have been added or inferred.

Steve directed the review to `~/Projects/Games`. Evidence and recommendations are saved in `.impeccable/experimental-games-review.md`. Steve approved Please Use the Stairs, Haunt Planning, Elevated Stunt Racing and Bowl Knockout for the Experiments section. Downhill Sled remains specification-only. The games were not changed or retested. The final composition choice (collection shelf, open edition or fold-out catalogue) is pending.

### Composition revision

Steve's feedback: “I worry that none of these leave space for the additional projects.” The fixed five-project compositions are not approved. Preserve the chosen editions/notebook identity, but revise the page as a vertically growing library showing all nine projects, with explicit unpublished-prototype status and notebook details when a project is explored. The next mockup must show the full page and actual capacity for additional entries, not only its opening viewport. Selection remains pending until this revised composition is reviewed.

The direction board uses `http://127.0.0.1:60417/`, question key `afb20a69`. Its original payload is `.impeccable/direction-options.json`; the shortlist payload is `.impeccable/shortlist-options.json`. Keep this task-owned local server while the decision is pending, then close it when the design discussion no longer needs it. Seed `84e7d94d` was retained across the Impeccable update. No production page changes made.

The revised full-page composition is `.impeccable/mocks/collection-library.png`, shown through `.impeccable/library-options.json`. Visual inspection confirms all nine project entries and four explicit Unpublished prototype labels. It preserves the chosen identity and grows by adding rows. Repeated annotations and solid buttons were removed in one refinement. Composition approval remains pending; project-detail and mobile layouts follow after selection.

Steve is inclined to build the growing library but identified missing 198x-family projects. The reconciled catalogue is `.impeccable/project-catalogue.md`: seven more active siblings bring the full-edition count to sixteen. Forge198x is deferred and Studio198x is not started; their inclusion as compact planned notebook entries is proposed separately. Preserve the chosen composition and complete the content roster before generating production assets. Use authentic 198x wordmark assets in final covers, following the family's binding identity decision; the provisional lettering in the mockup is not a sibling rebrand.

## Implementation plan — approved complete catalogue

Steve approved everything: 18 named projects, 16 full editions plus two planned entries. Build the growing library with 198x peers grouped.

1. Record composition approval, surface brief and measured map under `.impeccable/build/`. Verify cover bounds and typography against the selected comp.
2. Produce illustrated cover assets in `public/assets/editions/`, self-host fonts in `public/assets/fonts/`, and use authentic sibling wordmarks. Verify asset provenance, dimensions and legibility; complete the Impeccable asset review.
3. Implement semantic, responsive catalogue in `public/index.html`, with local `public/styles.css` and `public/site.js` only if useful. Filtering must preserve all entries without JavaScript; native expandable project notes provide descriptions, direct links and real prototype captures. Verify 18 names, status distinctions, no dead controls, correct links.
4. Inspect desktop and mobile, keyboard use, reduced motion and contrast. Run finish review and write DESIGN.md plus .impeccable/design.json. Preserve security headers and no-build deployment.
5. Commit and push the completed change, verify the published page, and stop task-owned preview/review servers.

## Asset checkpoint — ready for review

All 16 edition PNGs are present in `assets/plates/`, along with the slate texture; exact prompts are embedded and stored in sidecars. All ten measured raster regions now pass the plate gate; the only remaining gate reason is human plan/asset acceptance. Seven additional 198x covers extend the comp; the complete contact sheet shows authentic SVG wordmarks over the blank title areas. Forge198x/Studio198x appear as planned text entries. All 12 public destinations returned the expected page titles; evidence is `.impeccable/project-links.json`. Four original captures were converted without cropping or recolouring into `public/assets/captures/`. Fonts and authentic wordmarks are prepared in `public/assets/`; no production HTML changed, no build or deployment claimed.

Required skill checkpoint: `/Users/stevehill/.agents/skills/impeccable/reference/component-review.md` says not to build past the pending asset review and not to submit it on the user's behalf. Review manifest `.impeccable/review/components.json`, session `2fae5aa360332eb60b14bf06ea4506cddbe74be4cbb16c09fcf78c6365bc210d`, revision `30dcc3ccd0f88329a045a9d0bab6737f09a55116ab8cdeca867886fcab4e0ee1`. Latest `build-phase advance` reports only this pending review.

Task-owned processes retained for unfinished user review:
- Formal asset review: http://127.0.0.1:49189/ ; exec session 20518; reported PID 413; auto-expires after 1800 idle seconds.
- Complete artwork contact sheet: http://127.0.0.1:49190/ ; exec session 23504; `python3 -m http.server 49190 --bind 127.0.0.1 --directory .impeccable/review/catalogue-artwork`. Source and thumbnails live at that exact project path. Needed until asset choice is settled; stop after review/build completion.
- Earlier composition board: http://127.0.0.1:60417/ ; question key afb20a69, prior PID 54586 (not reverified: sandbox denied `ps`). Stop when the original comp is no longer needed for comparison.

Chrome tabs: artwork sheet 1893423920; formal review 1893423917. Both marked for handoff. Screenshot `.impeccable/review/artwork-sheet.png`. Three asset-producer agents completed; no background worktrees, clones or installs.

## CSS 3D exploration

Steve proposed using CSS 3D transforms instead of generating the box geometry exactly, so editions can be more interactive. Prepare one reversible Rachel proof before changing the production page or regenerating the full set. This explores a new construction method within the chosen identity; the prior baked-box asset review is no longer the immediate next step.

1. Generate flat illustration art from the Rachel concept, without text, box edges or baked perspective, in `.impeccable/prototypes/css-edition/`. Verify that CSS can own the whole box geometry and live type.
2. Build a standalone `index.html` in that folder: perspective, front/spine/back planes, live title, explicit open/close action and accessible notes. Reuse prepared fonts. No dependencies and no production-file changes.
3. Inspect the prototype through Chrome, verify open/close and keyboard operation, check narrow layout and reduced motion. Present it as a construction proof for the agreed catalogue, not the finished site.

### CSS edition proof — verified

Standalone proof: `.impeccable/prototypes/css-edition/index.html`. Flat Rachel illustration with embedded exact prompt, self-hosted fonts, six CSS planes, hinged cover, live titles and semantic notebook disclosure. No dependencies or production changes. Steve found the first case too thin; depth increased from 34 to 70px on desktop, 28 to 58px on tablet, 26 to 52px on phones, with the closed angle increased from 22 to 28 degrees. This is a local proportion adjustment, not a binding project-rule drift.

Chrome verification: Enter opens, Space closes, aria-expanded and note visibility agree, Less motion gives a computed 0s transition, and the updated open edition fits a 390px viewport with document width 390px. Fonts and image loaded; no browser warnings or errors observed. The system reduced-motion CSS is implemented but OS preference emulation was not performed. Screenshots: desktop-closed.png, desktop-open.png and mobile-open.png beside the proof. Impeccable's shadow finding was resolved by replacing tinted elevation shadows with neutral black; no suppression added.

Retain the proof workspace and server at http://127.0.0.1:49191/ (exec session 44254) for the ongoing design review. Chrome tab 1893423928. Stop the server when the construction choice is settled or transferred into the full catalogue. The proof is not the final 18-project website.

### Bound cover detail

Steve requested the book-style edge from the mockup. Inspection of `assets/plates/rachel-cover.png` shows a pressed vertical hinge channel and a raised cover lip. Refine only `.impeccable/prototypes/css-edition/index.html`: add the recessed channel to the moving front cover, gently rounded spine lighting, and a thin cover board edge, preserving the approved thicker proportions. Verify closed/open desktop and narrow layouts through Chrome; keep existing disclosure and reduced-motion behavior.

Bound-cover verification passed in Chrome: desktop closed/open inspected; phone closed lettering and illustration clear of the new groove; open phone width remains 390/390px; keyboard disclosure and Less motion (0s transition) work. Adjusted cover content margins after first inspection to prevent the binding masking the imprint. Final detail screenshot: `.impeccable/prototypes/css-edition/book-edge.png`. No dependencies, production edits, new processes or suppressions. Existing proof server remains for the ongoing design review.

## Full catalogue build — approved CSS edition treatment

Steve approved the thicker CSS edition, recessed binding groove and raised cover edge (“That's spot on”), then instructed “Go for it” for the whole collection. The working CSS prototype is now the construction authority; `collection-library.png` remains the composition reference. This user-directed change supersedes the old baked-perspective plate reproduction workflow and its stale build-state gates. Preserve those records as history rather than manufacture approval receipts.

Before replacement, the old page fails the agreed brief in four ways: it contains only five of eighteen projects; it has no prototype/planned status treatment; its plain link list lacks the selected editions identity; it has no project-note disclosure. Verify each against the new static HTML and rendered browser. Preserve project destinations, email, attribution, security headers and no-build deployment.

1. Prepare flat illustrations in `assets/flat/` and optimised alpha WebP files in `public/assets/editions/`; keep the approved Rachel reference. Verify all sixteen images load and retain provenance. Existing wordmarks and real captures remain unchanged.
2. Implement `public/index.html`, `public/styles.css`, `public/site.js`: eighteen semantic entries, three-column growing shelves, nine active 198x peers plus two planned notebook entries, four unpublished games, native details for notes and accessible filters. Use the approved CSS geometry and local fonts. Without JS, every project and note remains available.
3. Validate inventory, destinations, local resource references, accessible names/status, keyboard disclosure and filters; capture desktop/mobile/open states, reduced-motion and narrow-width checks. Have Impeccable's fresh finish reviewer review the concrete result, fix material findings, and document the final world in DESIGN.md and `.impeccable/design.json`.
4. Commit only website sources/assets and useful durable design documentation, then push to the existing main remote. Verify deployed contents and rendered page; close task preview processes and tabs once no longer needed. Keep source artwork/design exploration as ignored local working material, not production payload.

### Full catalogue verification and review

The production page contains all eighteen approved IDs, sixteen native disclosures, twelve expected public destinations, four explicit unpublished prototypes and two planned entries. A static validator rejects injected duplicate IDs and a missing artwork fixture; the real page passes IDs, inventory, local file references and destinations. JavaScript syntax and `git diff --check` pass. All twenty shipping rasters carry provenance; shipping assets total approximately 3.1 MB, including local fonts and original captures. No dependencies or build step added; security headers unchanged.

Chrome checks: all/family/experiments filters show 18/11/4 projects; hidden editions close; Enter/Space open/close native notes; deep linking to Bowl Knockout opens its notes; Less motion sets the transition to 0s. Document widths equal viewport widths at 320, 390, 768 and 1504px. A temporary script-free copy confirmed eighteen projects, native opening, visible project link and fallback navigation; that file has been removed. All sixteen illustration files loaded. First full-page captures made before lazy images settled were discarded as review evidence; refreshed captures from the top contain the complete artwork. No Safari/Firefox or OS motion-emulation claim is made.

The fresh Impeccable reviewer requested one accessibility repair: derive disclosure names from visible labels. All sixteen custom summary labels were removed, and native AX now matches Open edition/View experiment/Close edition plus the visible project names. Reviewer verdict: ship, naming fix resolved. The final detector identified the Studio mark at 7px on phones; it is now 11px at all widths. A second narrow reviewer verdict confirmed that repair with no overlap or clipping at 320px. No detector suppressions were added. Reports and screenshots remain in `.impeccable/review/` as local evidence.

The CSS prototype server (exec44254/port49191) is stopped. Earlier formal review and artwork-sheet servers are stopped; port60417 has no listening process. The full-site preview (exec77048/port49192) remains until deployment verification, then must stop.

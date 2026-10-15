# Phosphene live-site audit — 15 October 2026

The approved showcase is live and the checked visitor journeys work. The first fix should be inaccurate release information on Rachel's website. The Phosphene catalogue needs a small improvement to Rachel's project notes, not a redesign.

Scope: the audit portion of [issue #4](https://github.com/phosphene-uk/site/issues/4). We inspected Phosphene's live HTML, CSS, JavaScript and linked destinations, then exercised the journeys in Chrome. No application code or live content changed. This report does not complete #4's separate implementation and feedback requirements.

## Implementation follow-up — 15 October 2026

The findings below preserve the audit snapshot. A1–A3 have since been addressed with approval:

- **A1 published:** Rachel-site commits `60e7bde` and [385a6df](https://github.com/rachel-multiverse/rachel-site/commit/385a6df) correct release availability, the seven-theme count and outdated screenshot alt text, and remove the forthcoming label from the rendered social card. The earlier release-flag commit already existed locally and was preserved. The production build generated seven pages; the stale-release check failed on the previous live baseline and passed on the built output. After the successful GitHub Pages deployment, all seven live pages passed the same check and the live social PNG matched the inspected 1200×630 asset byte-for-byte. The web search cache still showed old App Store copy; current Chrome inspection of the listing confirmed version 1.4 and seven themes.
- **A2 published:** [25f3a68](https://github.com/phosphene-uk/site/commit/25f3a68) adds verified Apple-platform availability and direct App Store, support and privacy links within Rachel's existing edition, retaining Explore Rachel. Native HTML contains all four links. Chrome verified the new accessible names, Tab from Explore Rachel to the store link, and Tab from privacy to the next edition. The store shortcut loaded successfully in Chrome; a later curl attempt returned exit 56, so that request was not counted as a passing check.
- **A3 published:** [3335fe1](https://github.com/phosphene-uk/site/commit/3335fe1) gives notebook links, footer contact and the mobile motion label a 44px minimum height. At a measured 320px Chrome viewport, all four Rachel links, contact and the motion label measured 44px high; document width remained 320px and all 18 projects remained present. The prototype caption link also measured 44px, and its capture remained within its column. Phosphene's live HTML and CSS match the verified local files byte-for-byte; the deployment check succeeded.

The final Phosphene detector run returned 52 advisories, all about design-system sizes, colours and radii, with no non-advisory findings. The reviewed material details remain intentional. Rachel's detector flagged its unchanged press blockquote border; that styling was outside this copy correction. Its build also emitted `[Shiki] The language "z80" doesn't exist, falling back to "plaintext".` No dependencies were added or upgraded.

Real visitor feedback, physical-device testing, full assistive-technology coverage and field performance measurements remain outstanding. The audit score has not been recalculated from these narrow fixes. No GitHub issue was closed or edited; #4 still needs its visitor-feedback evidence before completion.

## Implementation integrity verdict: pass

The implementation expresses the approved growing library of software editions: native disclosures, readable project notes outside the transformed artwork, authentic 198x marks, four explicit unpublished prototypes and two explicit planned entries. The live page contains all 18 approved projects. Keep that direction, the Phosphene name without a Studio suffix, and the static deployment model recorded in PRODUCT.md.

The Rachel-first wording in #4 should describe a journey to audit within this showcase. It is not approval to replace the broader catalogue.

## Audit health

These are bounded manual assessment scores, not accessibility certification, Lighthouse results or field-performance measurements. Scores cover Phosphene; the linked Rachel-site defect is listed separately below.

| Dimension | Score | Evidence and limits |
| --- | --- | --- |
| Accessibility | 3/4 | Keyboard disclosures, skip-link focus, accessible names, status updates and main text contrast checked. Full screen-reader and zoom testing remain open. |
| Performance | 3/4 | Small static implementation, WebP covers, local fonts, intrinsic image dimensions and lazy loading. Mobile loading and animation performance are unmeasured. |
| Theming | 4/4 | Coherent fixed slate/paper identity, shared interface tokens and intentional material colours. Multiple selectable themes are not a requirement. |
| Responsive design | 3/4 | Checked layouts fit 320, 390, 768 and 1504 CSS-pixel widths. Some secondary targets fall below the project's preferred 44px height. No physical-device test. |
| Implementation integrity | 4/4 | Live source matches the inspected implementation; catalogue, interaction and status distinctions follow the approved brief. |
| **Total** | **17/20 — Good** | Preserve the system and address the specific gaps. |

Findings: **0 P0, 1 P1, 2 P2, 0 P3**. The P1 belongs to Rachel's website. There is no verified blocking defect in the Phosphene journeys tested.

## Visitor journeys

| Journey | Observed result | Gap |
| --- | --- | --- |
| Discover Rachel and reach its store listing | Open Rachel → Explore Rachel → Download on the App Store reaches the correct listing, ID 6794358319. | The catalogue provides only “A tactical card game.” The destination contradicts the store's release status. |
| Find help and privacy information | Rachel's “Need a hand?” reaches support; support links to privacy. The store also links to that privacy page. Phosphene has a public contact email. | No direct Rachel support/privacy links on the studio homepage. These resources exist; their absence from Phosphene is a discovery gap. |
| Understand an experiment and explore a 198x project | Experiments filter shows four projects. Please Use the Stairs opens its description and an actual loaded capture. The 198x filter shows nine active projects plus two planned entries; Code198x leads to its live learning site. | No blocking failure observed. Prototype status and lack of public downloads are explicit. |

These are evaluator walkthroughs, not tests with representative visitors. We have no evidence of actual conversion loss or visitor confusion rates.

## Prioritised findings

### A1 — P1: Rachel's website reports an obsolete release state

- **Category:** implementation integrity / release-content accuracy.
- **Owner:** [rachel-multiverse/rachel-site](https://github.com/rachel-multiverse/rachel-site), not Phosphene's homepage.
- **Locations:** `src/config.ts:4`, `src/components/SiteHeader.astro:4`, `src/pages/support.astro:11`, `src/pages/press.astro:43`, `src/pages/index.astro:17`, `src/components/Saturday.astro:3` in the Rachel-site repository.
- **Evidence:** the [live homepage](https://rachel.stevehill.xyz/) and [support page](https://rachel.stevehill.xyz/support/) say version 1.2 is awaiting App Store review. The [linked App Store listing](https://apps.apple.com/us/app/rachel-tactical-card-game/id6794358319) shows version 1.4, dated October 7, and describes iPhone, iPad and Apple silicon Mac availability. The website says five themes; the listing describes seven.
- **Cause:** the inspected local source still sets `RELEASE_1_2_AVAILABLE = false`, which selects pending-review copy in the shared header, support, press and homepage metadata. The theme description is separately hard-coded. The live text exhibits the same stale state; we did not compare Rachel's deployed artifact byte-for-byte with its local source.
- **Impact:** prospective buyers receive conflicting information about features and platform availability. Existing players are told support describes an unreleased update.
- **Recommendation:** reconcile current release copy with the shipped listing across the shared header, support, press, metadata and theme description. Simply flipping the flag would still describe an old release as current in some copy. Verify the deployed pages and their metadata after the change. No game behaviour or pricing change is needed.
- **Standard:** factual release accuracy; no WCAG violation asserted.
- **Suggested workflow:** `$impeccable clarify` in the owning repository, after consulting its current rules.

### A2 — P2: Rachel's catalogue notes omit availability and useful destinations

- **Category:** implementation integrity / visitor journey.
- **Owner:** [phosphene-uk/site](https://github.com/phosphene-uk/site), tracked by [#4](https://github.com/phosphene-uk/site/issues/4).
- **Location:** `public/index.html:65–69`, Rachel's notebook content. The catalogue authoring data also contains this entry in `.impeccable/catalogue-content.json`; reconcile that record if implementation changes it.
- **Evidence:** opening Rachel reveals one sentence and one “Explore Rachel” link. Its release state, platform availability, App Store destination, support and privacy are not stated or linked there. The destination website and listing provide these resources.
- **Impact:** someone seeking the game, help or privacy information must leave the catalogue and find another navigation path. This is a verified extra step, not measured evidence of lost sales. The edition-opening interaction itself is approved and should remain.
- **Recommendation:** add concise verified availability and labelled App Store, support and privacy links within Rachel's existing notebook, retaining Explore Rachel. Do not add release dates, prices or promotional claims that create unnecessary maintenance.
- **Standard:** discoverability and factual content; no WCAG violation asserted.
- **Suggested workflow:** `$impeccable clarify`.

### A3 — P2: Secondary touch targets fall short of the preferred 44px height

- **Category:** responsive design / accessibility enhancement.
- **Owner:** phosphene-uk/site.
- **Locations:** `public/styles.css:122`, `public/styles.css:138`, `public/styles.css:188` and notebook capture-caption links.
- **Evidence:** at a 390px viewport, the Less motion label measured 36px high, Explore Rachel 39px, and the full-size capture text link about 31.75px. Filter buttons measured 44px and the edition summaries provide large targets. We measured the label's complete clickable area, not just its 16px checkbox.
- **Impact:** secondary actions are less forgiving to tap than the main controls. No failed physical-device gesture was reproduced.
- **Recommendation:** increase the clickable height of these standalone actions to at least 44px while retaining readable spacing and the existing layout. Include the footer contact link when verifying the shared target treatment; it was not separately measured.
- **Standard:** the measured targets exceed WCAG 2.2 AA's 24px minimum dimension. Falling below 44px alone is not an AA failure. Treat 44px as the project's preferred touch-target standard / enhanced target-size goal.
- **Suggested workflow:** `$impeccable adapt`.

## Verification evidence

### Source and delivery

- Inspected commit: `4e9119b` (`Set the approved optical ident as the preview default`).
- Fetched live `index.html`, `styles.css` and `site.js` match the local public files byte-for-byte.
- All 12 outgoing project destinations returned HTTP 200 after redirects. This verifies reachability, not every destination's features or gameplay.
- Every distinct HTML-referenced local resource checked returned HTTP 200. The four CSS-referenced fonts also returned HTTP 200. All four prototype capture files were reachable; Please Use the Stairs was additionally loaded and viewed in Chrome at 320px, with natural image width 3456px.
- The live response includes `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, the recorded referrer policy and the permissions policy. HTTP headers do not prove a particular Cloudflare deployment product; no deployment migration is proposed.

### Interaction and layout

- Chrome desktop viewport: 1504 × 1575. Emulated narrow/tablet viewports: 390 × 844, 320 × 740 and 768 × 1024. Document scroll width equalled viewport width in each sampled state. Screenshots inspected included desktop collection, mobile open Rachel, narrow prototype capture and tablet family layout. This does not cover every open edition at every breakpoint.
- Enter opens a native summary; Space closes it. Opening Rachel closes an already-open Chaotic Tanx edition in this Chrome version.
- Skip to the collection moves focus to `main#collection`. Focused summaries expose a visible 3px orange outline.
- Filters return 18 / 3 / 11 / 4 projects for All work / Games & other work / 198x family / Experiments. The status text and selected control state change accordingly. Filtering away an open edition closes it.
- A fresh `#rachel` deep link opens Rachel. Changing to `#chaotic-tanx` from the family-filtered state restores All work and opens the requested project. Opening a different edition manually does not update the URL; this is current behaviour, not classified as a defect in this audit.
- Less motion changes the book and lid transition durations from 0.65s / 0.85s to 0s / 0s, preserving the open state and text. The OS `prefers-reduced-motion` branch was source-reviewed, not independently emulated.
- No-JavaScript content access is supported by the inspected native HTML and fallback anchors. JavaScript was not disabled in the live browser, so this remains a source-level check.

### Contrast and semantics

Calculated sRGB contrast ratios for the main solid-colour pairs:

| Foreground / background | Ratio |
| --- | --- |
| Paper / slate | 7.33:1 |
| Muted / slate | 6.33:1 |
| Orange / slate | 4.84:1 |
| Citron / slate | 7.01:1 |
| Ink / paper | 12.49:1 |
| Ink / citron | 11.94:1 |

These pairs pass the 4.5:1 normal-text threshold. This is not a whole-page contrast certification: artwork, gradients, browser-native checkbox rendering and all interaction states were not exhaustively sampled.

All 49 HTML image elements have alt attributes. Decorative edition scenes are hidden from assistive technology and have separate readable titles. Prototype captures have nonempty alt text and full-size links have accessible names. Image-alt presence does not establish that every description is sufficient for every visitor.

### Performance and detector interpretation

- `site.js` is 1,923 bytes and `styles.css` is 14,483 bytes before transport compression. There are no package dependencies or client framework bundles in this repository.
- The public HTML/CSS/JS/SVG/WebP/WOFF2 files total 3,129,196 bytes on disk. This includes a font file not referenced by production CSS and all catalogue media; it is not an initial-page network transfer measurement. Caveat alone is 173,580 bytes. Do not prioritise removal without measuring its effect and considering the approved handwritten identity.
- Twenty-one of 49 image elements declare lazy loading, including every non-Rachel cover and all prototype captures. The remaining images include reused lightweight SVG wordmarks. Rachel's cover has high fetch priority; fonts use swap.
- The bounded HTTP pass returned Phosphene resource responses in approximately 0.12–1.06 seconds from this machine. These concurrent curl timings are not LCP, INP, CLS or mobile-loading results. No performance failure is established by them.
- The Impeccable detector was run once across the three production UI files. It emitted design-system advisories about literal sizes, colours and a radius. Examples are 19px intro text, 13px labels, 43/66px mobile title endpoints, 5px cover corners, shadow colour and binding-gradient colours. DESIGN.md explicitly documents these responsive sizes and physical material details. They are not evidence of accidental UI drift; no visual change or suppression is justified by these advisories alone.

## Next work

1. **P1 — Rachel release accuracy:** take A1 into the Rachel-site repository first. Use the store's current public release as evidence and verify all affected deployed surfaces. Suggested command: `$impeccable clarify`.
2. **P2 — One bounded Phosphene improvement:** agree the A2 notebook addition, then implement it in `public/index.html` and its authoring record. Verify destinations, keyboard order, a 320px open edition and native access without JavaScript. Preserve all 18 projects, illustrations and deployment. Suggested command: `$impeccable clarify`.
3. **P2 — Touch targets:** apply A3 in a separate small change; measure the actual clickable bounds, then inspect mobile layout. Suggested command: `$impeccable adapt`.
4. **After implementation:** ask a real visitor to find Rachel, reach its store listing and find support. Record task completion and where they hesitate; do not substitute this audit for that feedback. Finish the scoped UI changes with `$impeccable polish`, then re-run `$impeccable audit` as appropriate.

The actions can be requested individually or together, in any order. No GitHub issues, comments, assignments or labels were changed during this audit. A1–A3 are concrete follow-up drafts; #4 remains open until its implementation and feedback requirements are met.

## Limits

We did not inspect analytics or conversion baselines, measure field Core Web Vitals, run Lighthouse or axe, test with VoiceOver, exercise browser zoom/text scaling, emulate the OS motion preference, use Safari/Firefox, test on physical touch devices, buy/download Rachel, verify the app's privacy implementation or collect player/visitor feedback. We did not verify all content claims across all linked projects. These remain unknown rather than passes or failures.

Diagnostic notes: Python urllib received `HTTP Error 403: Forbidden` during the earlier reconnaissance; curl and Chrome successfully accessed the live site. An initial resource-check script failed with `TypeError: unsupported operand type(s) for |: 'list' and 'set'`; the corrected script completed and its actual output was read. A browser read using `checkVisibility` was unsupported; subsequent checks used the supported DOM surface. A same-hash navigation did not reset an existing filter, so a hidden-summary action failed with `no_visible_match`; the subsequent actual hash-change test passed. None of these tool failures was counted as a site defect or a passing check.

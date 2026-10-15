---
name: Phosphene
description: Software editions with restrained Studio notebook details.
colors:
  slate: "#394e65"
  ink: "#162a40"
  paper: "#f1efce"
  citron: "#eced9f"
  orange: "#ffb181"
  muted: "#d6dfe3"
  rule: "#f1efce40"
typography:
  display:
    fontFamily: "Lilita, sans-serif"
    fontSize: "clamp(52px, 7.4vw, 96px)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Lilita, sans-serif"
    fontSize: "38px"
    fontWeight: 400
    lineHeight: 1.05
  cover-title:
    fontFamily: "Lilita, sans-serif"
    fontSize: "46px"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-.015em"
  title:
    fontFamily: "Akatab, sans-serif"
    fontSize: "23px"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Akatab, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Akatab, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  maker-note:
    fontFamily: "Caveat, cursive"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.18
  notebook-heading:
    fontFamily: "Caveat, cursive"
    fontSize: "27px"
    fontWeight: 400
    lineHeight: 1.2
rounded:
  disclosure: "3px"
  cover: "2px 5px 5px 2px"
  spine: "3px 3px 2px 2px"
spacing:
  filter-inline: "28px"
  grid-column: "40px"
  grid-row: "56px"
  shelf: "72px"
  notebook-top: "24px"
components:
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    padding: "7px 0"
  filter-selected:
    backgroundColor: "transparent"
    textColor: "{colors.orange}"
    typography: "{typography.body}"
    padding: "7px 0"
  collection-navigation:
    textColor: "{colors.orange}"
    typography: "{typography.body}"
    padding: "14px 0"
  motion-control:
    textColor: "{colors.paper}"
    size: "13px"
  edition:
    textColor: "{colors.paper}"
    rounded: "{rounded.disclosure}"
  notebook:
    textColor: "{colors.paper}"
    typography: "{typography.body}"
    padding: "24px 6px 0"
  planned-work:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    padding: "26px 30px 30px"
---

# Design System: Phosphene

## Overview

**Creative North Star: "Software editions with restrained Studio notebook details"**

The collection takes the form of illustrated software editions on a slate-blue ground. Citron covers, rounded display lettering and a fine radial studio imprint make separate projects feel like work from the same maker. Small handwritten notes add a personal voice without taking over the catalogue.

The objects have physical depth: a thick spine, recessed binding groove and raised cover lip. Opening an edition reveals readable notes outside the transformed object. The approved CSS 3D Rachel prototype establishes construction; the selected library mockup remains a composition reference. The earlier baked-perspective construction gates are superseded by the explicit CSS 3D approval recorded in PRODUCT.md and the surface brief.

**Key Characteristics:**

- Illustrated citron editions against slate blue.
- Live titles and authentic 198x wordmarks.
- Physical CSS cover opening with readable native disclosures.
- Restrained handwritten notes, fine rules and orange actions.
- A growing catalogue with honest prototype and planned-work status.

This is a scan of `public/index.html`, `public/styles.css` and `public/site.js`. The tokens above describe the implemented system; the sidecar holds depth, motion, responsive metadata and component samples. This document does not assert a review verdict. Page composition and project inventory remain in `.impeccable/surfaces/public-index-html.md` and PRODUCT.md.

## Colors

The palette pairs cool slate with pale printed paper and a warm action colour. The frontmatter preserves the production CSS values and token names.

### Primary

- **Citron:** edition material, the Phosphene wordmark, shelf headings and handwritten note headings. This is the collection's recurring identity colour.
- **Orange:** links, disclosure actions, selected filters and keyboard focus. Its use marks an available action or current selection.

### Neutral

- **Slate:** the continuous page ground.
- **Ink:** text and print details on light covers and paper panels.
- **Paper:** readable page text and the planned-work panel.
- **Muted:** supporting categories, captions, shelf explanations and legal copy.
- **Rule:** translucent paper dividers across navigation, shelves and notes.

**The Material Colour Rule.** Cover-face highlights, spine gradients and shadows model the same printed object; they are local construction details, not extra interface accents. Their exact values live with the signature component in the sidecar and production stylesheet.

## Typography

**Display Font:** Lilita, from the self-hosted `LilitaOne-Regular.woff2`, with sans-serif fallback.

**Body Font:** Akatab, self-hosted regular and bold (`Akatab-Regular.woff2`, `Akatab-Bold.woff2`), with sans-serif fallback.

**Handwritten Font:** Caveat, from `caveat.woff2`, with cursive fallback. All four font files use `font-display: swap`; the Lilita face is preloaded.

Lilita supplies the rounded studio voice; Akatab keeps project information straightforward. Caveat is reserved for maker notes, insert notes and notebook headings. There is no separate monospace role.

### Hierarchy

- **Display:** the Phosphene masthead. Its fluid desktop token changes to `clamp(43px, 11vw, 66px)` at the mobile breakpoint.
- **Headline:** shelf headings; reduced to (33px) on mobile.
- **Cover title:** live text on non-198x covers. Longer titles use (34px) at desktop size. Responsive object sizes carry their own title sizes rather than shrinking the entire page.
- **Title:** the readable project name below each object. The bold weight is backed by the supplied Akatab bold file.
- **Body:** project descriptions and the base interface text. Introduction text uses (19px), then (17px) at narrower widths.
- **Label:** project categories. Captions use (13px); legal and artwork attribution use (12px).
- **Maker note / notebook heading:** handwritten accents. The masthead note rotates (-4deg); notebook headings remain level.

**The Readable Title Rule.** Every decorative edition has a readable project title and category outside its 3D scene. Use genuine SVG wordmarks for 198x cover, spine and insert lettering; do not recreate those logos with the display font.

## Layout

The page is a centred container with a maximum width of (1320px), default padding of (42px 52px 28px), and a minimum body width of (320px). A broad masthead leads to a ruled navigation strip. The catalogue extends vertically; its capacity is not fixed by the original composition.

| Viewport | Columns | Page padding | Edition width × height × depth | Scene height | Grid row / column gap |
| --- | --- | --- | --- | --- | --- |
| Above 1100px | 3 | 42px 52px 28px | 266 × 360 × 62px | 440px | 56 / 40px |
| 851–1100px | 3 | 36px 32px 26px | 228 × 310 × 53px | 390px | 48 / 28px |
| 621–850px | 2 | 36px 32px 26px | 250 × 340 × 58px | 420px | 48 / 34px |
| 360–620px | 1 | 28px 24px 24px | 254 × 344 × 59px | 422px | 42px |
| 320–359px | 1 | 28px 20px 24px | 230 × 312 × 54px | 386px | 42px |

These are inclusive `max-width` breakpoints at (1100px), (850px), (620px) and (359px). At (850px), shelf heading and explanation stack. At (620px), the masthead stacks, navigation wraps, planned entries become one column, and the footer becomes left-aligned in one column. Planned entries lose their internal two-column layout at (1100px).

Shelves have generous separation; thin rules mark section changes without adding card chrome. Open notes stay within their edition's grid column. The current page contains 16 editions and two planned entries; the full 18-project catalogue is an approved instance of this extensible layout.

## Elevation & Depth

Depth belongs to the software editions. The surrounding page, text links and notebook sections remain flat. Each edition uses CSS faces, a thick rounded spine, a recessed (23px) binding channel and a raised cover board. The scene perspective is (1450px) with its origin at (50% 45%). The resting book rotates (-7deg on X, 28deg on Y, -3deg on Z).

The front face sits (2px) forward; the board backing sits (2px) behind the lid. The spine and hinge use gradients to describe material. The ground shadow is a blurred ellipse, not a card shadow.

### Shadow Vocabulary

- **Ground:** `background: #00000045; filter: blur(15px)` on a (25px) ellipse below the edition.
- **Tray:** `inset 0 0 0 11px #cbcba5, inset 0 0 24px #00000026` establishes the recessed interior.
- **Insert:** `1px 3px 8px #00000033` lifts the slightly rotated paper insert.
- **Cover:** `inset 0 2px 2px #ffffff70, inset -2px -2px 3px #00000016` describes the cover edge.
- **Inner lid:** `inset 0 0 0 11px #dbdcb4` forms the inner border.

**The Readable Notes Rule.** Only the decorative object rotates. Project descriptions, capture captions and destination links remain outside that transform.

## Shapes

The edition silhouette has subtly rounded board corners and a visibly thick spine. The three radius tokens describe disclosure focus geometry, the asymmetric cover and the spine. The (3px) disclosure radius does not turn the project into a filled card.

Rules are generally (1px). Planned-work paper has square corners. The radial studio imprint uses fine strokes; arrow icons are (18px) with an unfilled stroke. Covers use flat illustration files; CSS constructs perspective and depth around them.

## Components

### Collection controls and navigation

Filters are plain text buttons with no fill or border, at least (44px) high. The active filter uses orange text and an underline offset by (7px). Hover changes text to orange. The group exposes selection with `aria-pressed` and announces the resulting project count through a status region.

Without JavaScript, ordinary anchor navigation reaches each shelf and all projects remain present. JavaScript reveals the filter group, hides the fallback navigation and adds the optional Less motion control. There are no text fields or chips in this implementation.

Links use an underline offset of (.25em); hover increases its thickness from (1px) to (2px). Notebook links, the footer contact and the motion-control label have a minimum clickable height of (44px), including mobile. Rachel's additional store, support and privacy links form a vertical group inside its existing notebook. Interactive elements share a visible orange outline of (3px), offset by (7px). A skip link becomes visible on focus.

### Edition disclosure

Each full edition is a native `details` / `summary` disclosure in the shared `name="editions"` group. Browsers supporting named details keep one edition open at a time. The decorative scene is `aria-hidden`; visible text supplies the summary's project name, category and action. Native opening works without JavaScript.

Opening changes the action label to “Close edition,” reverses the arrow and rotates the lid (-120deg) around its left edge. The book moves (34px) to the right and settles at `rotateX(-4deg) rotateY(12deg) rotateZ(0deg) scale(.84)`. The notebook appears in normal flow below it. Published destinations have direct links in these notes; experiments reveal actual captures and a full-size capture link.

Book movement takes (650ms); the lid takes (850ms), both using `cubic-bezier(.2, .7, .2, 1)`. Hover-capable devices and keyboard focus lift the closed object by (7px), only when reduced motion is not requested. Both the system reduced-motion preference and the Less motion checkbox disable transitions; the open state remains usable. The checkbox state is held for the current page, not persisted. Project hash links open the matching disclosure and restore the All work filter.

### Notebook and planned work

Notebook content uses a top rule, clear body text and a handwritten heading. Real prototype captures use their intrinsic aspect ratio at full column width; captions identify them as unpublished prototypes. Planned entries sit together on a flat paper panel with authentic wordmarks and explicit statuses. They do not masquerade as released products.

### Identity and imagery

The Phosphene wordmark is live Lilita text paired with the radial star, without a Studio suffix. The 198x SVG wordmarks are authentic sibling assets; retain their artwork. Edition illustrations in `public/assets/editions/` are illustrative studio artwork, while `public/assets/captures/` contains real prototype captures. The footer states this distinction. Asset provenance must accompany shipping rasters.

The page is static HTML, CSS and progressively enhanced JavaScript, with self-hosted fonts. It has no build step or package dependencies. Preserve native content access, project links, contact and legal attribution when extending the design.

## Do's and Don'ts

### Do:

- **Do** retain the approved thick spine, recessed binding groove and raised cover lip.
- **Do** keep titles and project notes readable outside the transformed object.
- **Do** use authentic 198x wordmarks and keep their artwork intact.
- **Do** distinguish illustrative covers from real unpublished prototype captures.
- **Do** allow the catalogue to grow vertically and label planned work honestly.
- **Do** preserve native disclosures, visible keyboard focus and reduced-motion behavior.

### Don't:

- **Don't** treat the original composition as a fixed project capacity or as authority for superseded baked-perspective construction.
- **Don't** bake project titles or replacement logos into generated cover artwork.
- **Don't** describe illustrative covers as screenshots or imply that unpublished prototypes have a public release.
- **Don't** move essential project information inside the decorative 3D scene.
- **Don't** require JavaScript to read the collection or open its notes.

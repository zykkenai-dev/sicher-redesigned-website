# Verification — 6 October 2026

## Build and static checks

`npm run build`, `npm run check` and JavaScript syntax validation passed.

The checks cover all 18 generated pages: internal links and anchors, file/image availability, titles/descriptions/canonicals/Open Graph, valid JSON-LD, one H1 and main landmark, unique IDs, labelled form fields, product table sections, product-specific RFQ links, sitemap entries and the legacy benches redirect.

## Browser verification

The site was run locally and inspected in the Codex in-app browser. All 18 pages were visited at:

- Desktop: 1440 × 900
- Tablet: 768 × 1024
- Mobile: 390 × 844

All 54 route/breakpoint checks passed: no horizontal document overflow, one H1, and all images visible in the viewport loaded successfully. Desktop and mobile screenshots and the detailed JSON results are stored locally in `docs/qa/` (excluded from published source).

Visual inspection covered the home page, product catalogue, all five product pages, company page, manufacturing capabilities, industries, insights, article layout and contact/RFQ. Product specifications were inspected at desktop and mobile widths. The homepage was also checked at the app’s default laptop width.

## Interactions

- Desktop product disclosure and mobile navigation open/close correctly.
- Escape closes product menus and gallery dialogs; gallery closure restores the trigger focus.
- Product galleries enlarge images and advance to the correct second image. A one-image gallery has no redundant previous/next buttons.
- Product RFQ links preselect the appropriate category.
- Required fields prevent empty quotation requests from opening the review dialog.
- RFQ review includes entered contact, product, quantity and project information.
- General enquiry tabs select the appropriate form and prepare the correct draft.
- The email draft URL includes the selected recipient, subject and enquiry body; no email was sent.
- Copy action was exercised; downloading created a real text file, which was read and verified against the entered RFQ details.
- Original email spellings are both visible with their source labels.
- The old benches URL returns HTTP 301 in the local server; an unknown URL returns HTTP 404 with the site’s error page.
- No browser console warnings or errors were reported during the checks.

## Accessibility and presentation

Semantic navigation, breadcrumbs, headings, labelled native form controls, table row/column headers, skip links, visible keyboard focus, native modal dialogs and reduced-motion handling are implemented. The brass text accent was darkened after a contrast check; it exceeds 4.5:1 against the light backgrounds. This is a manual/code review, not a claim of independent WCAG certification.

The mobile hero overflow discovered in the first pass was fixed. Anchor offsets were reduced to keep section headings visible under the sticky header. A desktop quotation sidebar remains available alongside long product specifications. Product selectors and drawing references use full-width fields to avoid truncated selection labels.

## Performance

Static HTML rendering; no framework runtime or npm dependencies. Responsive WebP images use actual image-width descriptors, off-screen images load lazily, and the single IBM Plex Sans family is self-hosted.

At the verified build:

- Homepage HTML: approximately 5.3 KB gzip
- CSS: approximately 8.1 KB gzip
- JavaScript: approximately 2.3 KB gzip
- Font: approximately 45.7 KB WOFF2

These are asset sizes, not Lighthouse or field performance scores.

## Publication and remaining integration details

The source is prepared for a private Sites preview. Company-domain publication requires setting `SICHER_SITE_URL` to the company origin and configuring the benches 301 on the chosen host.

Enquiry forms prepare drafts and text exports. They do not have an email-delivery or file-upload backend. The correct email spelling, current certificates and genuine company facility photographs require company verification or supplied assets, as documented in `CONTENT-AUDIT.md`.

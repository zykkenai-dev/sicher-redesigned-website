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

# Refinement verification — 7 October 2026

## Presentation and responsive improvements

The homepage now uses a full-width split hero: navy typography panel, existing railway application photography, clearer actions, a capabilities link and a product link in the photograph caption. Its typography and photographic crop adapt at phone and tablet widths. No new product imagery or unsupported company claims were introduced.

A branded loader is inlined in the generated HTML, so it adds no network request. It waits for the logo, priority image and font, dismisses as soon as those assets are ready, and has no artificial minimum duration. It dismisses after at most 1.4 seconds if assets stall. CSS supplies a separate fail-safe. Keyboard or pointer interaction dismisses it immediately; reduced-motion and Save-Data preferences bypass it. It does not capture focus or block pointer interaction, and it is hidden by default without JavaScript.

Narrow phone product grids now use one readable column, with larger descriptions and links. Form controls use 16px text to avoid focus zoom on iPhones. Navigation toggles, gallery controls, enquiry actions and modal close buttons have improved target sizes. Both galleries and enquiry reviews use flexible, bounded modal layouts with internal scrolling, keeping actions accessible on short screens.

## Browser matrix

All 18 pages were checked at these actual CSS viewport sizes:

- 320 × 740
- 390 × 844
- 768 × 1024
- 1024 × 768
- 1440 × 900
- 2560 × 1440
- 844 × 390 (phone landscape)

Five representative pages (home, catalogue, automated doors, contact and company) were additionally checked at widths 360, 420, 430, 600, 680, 681, 900, 901, 1000, 1001, 1280 and 1920. These include both sides of grid, hero and navigation transitions. Additional interaction-related page checks bring the recorded total to **190**.

All recorded checks passed: no horizontal document overflow, one H1 per page, loaded visible images, and actual viewport width matching the intended test width. The checks use the Chromium-based in-app browser; they are viewport emulation, not a physical-device or all-browser certification. The result file is `docs/qa/refined-responsive-results.json`.

## Interactions and failure cases

- Phone navigation and product categories were opened and used to visit a product.
- Product specifications remained readable at 390px; the anchor heading cleared the sticky header and the table fit its container.
- Gallery images advanced correctly, Escape closed the dialog and restored the trigger focus, and all controls remained inside an 844 × 390 viewport.
- A product quote link preselected Automated Door Systems. Empty required fields prevented review; a completed local test request produced the correct review and mailto recipient/subject/body. No email was sent.
- The general enquiry tab and completed draft were checked at 320 × 320. All three review actions and the close button fit the unusually short screen, with the draft body scrolling internally.
- Desktop product disclosure fitted the viewport. Escape closed it and restored focus.
- No browser warnings or errors were recorded.
- `npm run check` includes loader regression checks for ready assets, failed images, stalled fonts/deadline, keyboard and pointer dismissal, reduced motion, Save-Data and history restoration. All pass.

Clean desktop and phone hero screenshots, plus landscape gallery and short-screen enquiry screenshots, are saved in `docs/qa/`. These local QA artifacts are excluded from published source.

## Final local result

`npm run build`, `npm run check` and JavaScript syntax checks pass. The local preview remains at `http://localhost:4173`. The earlier hosted private preview has not been updated in this local refinement pass.

Current compressed payloads: homepage HTML 5,966 bytes, CSS 10,093 bytes and interaction JavaScript 2,299 bytes (gzip). The loader is included in the HTML size. No dependencies were added. These are asset sizes, not measured field performance scores.

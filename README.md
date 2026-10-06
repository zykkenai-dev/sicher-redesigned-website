# Sicher Engineering website

An 18-page, static corporate website with shared templates, original company assets, detailed product specifications and client-side enquiry preparation.

## Run locally

Requires Node.js 20 or later. There are no npm dependencies to install.

```bash
npm run build
npm run dev
```

Open http://localhost:4173. The server prints the URL. Set `SICHER_PORT` to use another port.

```bash
npm run check
```

This checks local links and anchors, assets, page metadata, structured data, document structure and product specification presence. Browser QA is recorded separately in `docs/QA.md`.

## Editing

- `src/content.mjs`: source-backed company, product, capability and article information.
- `src/templates.mjs`: header, footer, homepage and shared presentation.
- `src/pages.mjs`: inner pages, product tables, galleries and forms.
- `public/site.css`: responsive design system.
- `public/site.js`: menus, galleries, enquiry review/copy/download/draft behavior.
- `scripts/build.mjs`: emits static HTML, metadata, sitemap, robots and redirect configuration into `dist/`.
- `scripts/serve.mjs`: local static server with the benches 301 and real 404 responses.
- `docs/CONTENT-AUDIT.md`: source inventory, factual limits and email discrepancy.
- `public/assets/manifest.json`: image origins and dimensions.

`SICHER_SITE_URL` sets the canonical, Open Graph, structured-data and sitemap origin at build time. It defaults to the private Sites preview origin. Set it to `https://www.sicherengineering.in` when deploying to the company domain. Deploy the contents of `dist/`, preserving directory paths. The existing public company site has not been replaced.

## Email and file integration

The original contact page and footer list different email spellings; both are retained for verification. The forms prepare an enquiry on the visitor’s device and offer an email draft or plain-text export. They do not send messages or upload files. A production mail/upload integration needs a confirmed recipient and a chosen backend. The current forms do not collect server-side submissions or store data in browser storage.

## Redirect and hosting notes

The local server redirects `/copy-of-window-solutions` to `/stainless-steel-benches` with HTTP 301. Static output includes `_redirects` for hosts supporting that convention and a canonical/HTML refresh fallback. Configure the equivalent server-side 301 on a host that does not support `_redirects`. Existing product and article slugs are otherwise retained.

IBM Plex Sans is served locally. Its SIL Open Font License is included in `public/assets/OFL.txt`.

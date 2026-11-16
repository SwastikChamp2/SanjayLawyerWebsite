# Sanjay Achhra Law Chambers

Informational website for Adv. Sanjay Achhra, Advocate, High Court, Mumbai.
Built with React 19, Vite, Tailwind CSS 4 and Firebase/Firestore.

## Commands

```bash
npm install
npm run dev          # local development
npm run lint         # ESLint
npm run build        # regenerate sitemap + production build in dist/
npm run preview      # preview the production build
npm run seo:sitemap  # regenerate public/sitemap.xml only
```

## SEO and GEO architecture

| File | Purpose |
| --- | --- |
| `index.html` | Static title, description, keywords, robots, canonical, Open Graph/Twitter tags, geo tags and the site-wide JSON-LD `@graph` (LegalService/Attorney, Person, WebSite). |
| `src/seo/siteConfig.js` | Canonical domain, contact details, default keywords and per-practice SEO copy. **Change `SITE_URL` here first.** |
| `src/seo/schemas.js` | Reusable `WebPage`, `CollectionPage`, `BlogPosting`, `Service`, `BreadcrumbList`, `FAQPage` and `ScholarlyArticle` builders. |
| `src/components/MetaSEO.jsx` | Per-page head manager. Sets title, description, keywords, canonical, robots, Open Graph, Twitter and JSON-LD, then cleans up on navigation. |
| `src/utils/seoUtils.js` | Keyword parsing, HTML text/word counts, FAQ extraction and JSON-LD validation. |
| `public/robots.txt` | Crawl policy, including explicit permission for search and AI crawlers; admin routes disallowed. |
| `public/sitemap.xml` | Sitemap generated before each build. The generator reads published articles from Firestore. |
| `public/llms.txt` | Short machine-readable index for LLM and AI-search systems. |
| `public/llms-full.txt` | Detailed factual reference, article summaries and citation guidance. |
| `public/og-image.jpg` | 1200 × 630 social sharing image. |
| `firebase.json` | Firebase Hosting SPA rewrites, cache and security headers (used by the Firebase CLI). |

### How page metadata is composed

Each page renders a single `<MetaSEO />` with its own title, description,
keywords, canonical path and JSON-LD. Article pages additionally use the
optional Firestore fields described below. The visible content is semantic HTML
(`section`, `article`, `nav`, `aside`, `address`, `time`) with labelled regions
and descriptive image alt text.

### Article SEO fields (Firestore `articles` collection)

Admins can set these optional fields in **Add article / Edit article**:

| Field | Type | Notes |
| --- | --- | --- |
| `focusedKeyword` | string | Primary query the article targets. Used in meta keywords and the `about` property of the Article schema. |
| `keywords` | string | Comma-separated secondary keywords. |
| `jsonLd` | string | Validated JSON-LD object, array or `@graph`. Added alongside the generated Article, WebPage, Breadcrumb and FAQ markup. |

All three fields are optional. When blank, the article falls back to its title,
excerpt, category and the site defaults. Invalid JSON-LD is rejected with an
inline error before the article is saved.

The article page automatically generates:

- `BlogPosting` / `Article` with author, publisher, dates, image, section,
  keywords, word count and `speakable` markup
- `WebPage` and `BreadcrumbList`
- `FAQPage` when the body contains `<details><summary>…</summary>` Q&A blocks

### Sitemap generation

`npm run build` runs `scripts/generate-sitemap.mjs`, which:

1. adds every static route and the built-in articles;
2. reads published (`isActive: true`) articles from the public Firestore REST API;
3. writes `public/sitemap.xml` before Vite copies `public/` into `dist/`.

If Firestore is unreachable the build continues with the static routes.

## Deployment

### Firebase Hosting — manual upload

```bash
npm run build
```

Upload the **contents of `dist/`** to Firebase Hosting, keeping the directory
structure intact. Do not upload the `dist` folder itself as an extra nested
directory.

Important: a manual upload does not apply `firebase.json`. That file is read by
the Firebase CLI, not by the Hosting file manager. If you upload manually,
configure the SPA rewrite and cache/security headers in Firebase Hosting
separately, or deploy with:

```bash
npm run build
npx firebase deploy --only hosting
```

The rewrite must send every route to `/index.html` so deep links such as
`/article/<slug>/` and `/practice/<slug>/` work after a hard refresh.

### Before going live

1. Set the production domain in `src/seo/siteConfig.js` (`SITE_URL`) and in
   `public/robots.txt`, `public/sitemap.xml` and `public/llms*.txt` if it differs
   from `https://sanjayachhra.com`.
2. Replace the client-side demo admin credentials in
   `src/admin/adminAuth.js`. They are visible in the built bundle and are not
   real security. Firestore security rules must also restrict writes.
3. Add verified profile URLs to `SAME_AS` in `src/seo/siteConfig.js` (LinkedIn,
   Google Business Profile, Bar Council listing) to strengthen entity signals.
4. Confirm the address, PIN code, coordinates and phone number in
   `src/seo/siteConfig.js` and `index.html`.
5. Submit `https://sanjayachhra.com/sitemap.xml` in Google Search Console and
   Bing Webmaster Tools, and verify the domain in both.
6. Test the deployed pages with the
   [Rich Results Test](https://search.google.com/test/rich-results) and the
   [Schema Markup Validator](https://validator.schema.org/).
7. Replace `public/og-image.jpg` if the branding or practice list changes.

## Content and legal notices

The site is published in accordance with Rule 36 of the Bar Council of India
Rules. Content is informational only and is not legal advice, advertisement or
solicitation. The disclaimer gate and the `/disclaimer/` page state this.

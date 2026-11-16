# SEO / GEO verification checklist

This file lists the checks to run before deploying the SEO and GEO changes.
It is intentionally manual: do not treat a successful build as proof that
metadata, structured data or hosting redirects are correct.

## 1. Build and lint

Run from the project root:

```bash
npm install
npm run lint
npm run build
npm run preview -- --port 4173 --strictPort
```

Expected:

- `npm run lint` exits with no errors.
- `npm run build` regenerates `public/sitemap.xml`, then writes `dist/`.
- Vite may print a chunk-size warning only. A warning is not a build failure.
- `dist/` contains `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`,
  `og-image.jpg`, `site.webmanifest` and the usual `assets/` files.

Important: the production build reads Firestore through the public REST API to
add article URLs to the sitemap. If Firestore is unreachable, the build should
still succeed with the static routes only, but the sitemap will be incomplete.
Check the build log for:

```text
[sitemap] Added N article URL(s) from Firestore.
```

## 2. Page-by-page head checks

Open each route in a browser and confirm the document head. A quick DevTools
console helper:

```js
(() => ({
  title: document.title,
  description: document.querySelector('meta[name="description"]')?.content,
  keywords: document.querySelector('meta[name="keywords"]')?.content,
  robots: document.querySelector('meta[name="robots"]')?.content,
  canonical: document.querySelector('link[rel="canonical"]')?.href,
  og: Object.fromEntries(
    [...document.querySelectorAll('meta[property^="og:"]')]
      .map((m) => [m.getAttribute('property'), m.content])
  ),
  twitter: Object.fromEntries(
    [...document.querySelectorAll('meta[name^="twitter:"]')]
      .map((m) => [m.getAttribute('name'), m.content])
  ),
  jsonLd: [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((s) => {
      try { return JSON.parse(s.textContent); }
      catch (e) { return { parseError: e.message }; }
    }),
}))()
```

Check these routes:

| Route | Expected page-level output |
| --- | --- |
| `/` | Home title/description, canonical root, `WebSite` + `LegalService`/`Attorney` + `Person`, `WebPage` |
| `/practice/` | `CollectionPage`, `ItemList`, `BreadcrumbList` |
| `/practice/income-tax-litigation/` | `WebPage`, `Service`, `BreadcrumbList` |
| `/practice/black-money-act/` | Same pattern, Black Money Act metadata |
| `/practice/pmla/` | Same pattern, PMLA metadata |
| `/practice/cyber-law/` | Same pattern, cyber-law metadata |
| `/practice/msme-conciliation-arbitration/` | Same pattern, MSME metadata |
| `/practice/gst-litigation/` | Same pattern, GST metadata |
| `/practice/company-llp-firm-formation/` | Same pattern, entity-formation metadata |
| `/practice/drafting-and-vetting/` | Same pattern, drafting metadata |
| `/approach/` | Approach metadata and `WebPage`/breadcrumb markup |
| `/article/` | `CollectionPage`/`ItemList`/`BreadcrumbList` |
| `/article/unauthorised-bank-transactions-first-72-hours/` | Article title, article OG tags, `BlogPosting`/`Article`, `WebPage`, `BreadcrumbList`, `FAQPage` |
| `/article/delayed-payments-msme-suppliers-interest-facilitation-council/` | Same article pattern |
| `/article/private-limited-company-or-llp-points-to-consider/` | Same article pattern |
| `/publications/` | `CollectionPage`, `ScholarlyArticle` nodes, `ItemList` |
| `/disclaimer/` | Disclaimer metadata, canonical, `WebPage` |
| `/privacy/` | Privacy metadata, canonical, `WebPage` |
| `/not-a-real-page/` | `noindex, nofollow`, canonical for requested URL, no accidental indexable metadata |
| `/practice/not-real/` | `noindex, nofollow`, `Practice area not found` |

For every indexable page confirm:

- Canonical URL is absolute, uses `https://sanjayachhra.com`, and matches the
  visible route (including the trailing slash).
- Only one canonical link and one description/keywords/robots set remain.
- `og:title`, `og:description`, `og:url`, `og:image` and Twitter equivalents
  are present.
- `og:image` is an absolute `https://` URL.
- `robots` is `index, follow, max-image-preview:large, max-snippet:-1,
  max-video-preview:-1` on public pages.
- No console errors occur while navigating from page to page.
- No duplicate page-level `WebPage`/`Article` JSON-LD appears after client-side
  navigation. The static `index.html` graph may remain, but page-level nodes
  should be replaced, not duplicated.

## 3. Article pages

Check both built-in articles and Firestore articles.

For an article:

1. Confirm the `<h1>` matches the article title.
2. Confirm `og:type` is `article`.
3. Confirm `article:published_time`, `article:modified_time`,
   `article:section`, `article:author` and `article:tag` tags appear.
4. Confirm the `BlogPosting`/`Article` node has `headline`, `description`,
   `image`, `datePublished`, `dateModified`, `author`, `publisher`,
   `articleSection`, `keywords`, `wordCount` and `speakable`.
5. Confirm `BreadcrumbList` contains Home → Articles → article.
6. If the article body contains a `<details><summary>` Q&A block, confirm a
   valid `FAQPage` node is emitted. Do not emit FAQ markup unless the Q&A is
   visible on the page.
7. Confirm the canonical points to the article, not the home page.

### Optional per-article SEO fields

Sign in to `/add-article/` or `/edit-article/<slug>/` and test:

- `Focus keyword` is saved to Firestore as `focusedKeyword`.
- `Keywords` (comma-separated) is saved as `keywords`.
- `Custom JSON-LD` is accepted only when valid JSON with an `@type` or a
  `@graph` containing typed nodes.
- Invalid JSON shows an inline validation error and does not save.
- Reloading the editor restores all three fields.
- The article page uses the saved focus keyword in the `about` property of the
  Article schema and adds the saved keyword list to meta keywords.
- The custom JSON-LD is rendered as a separate `application/ld+json` script.
  It must not contain a literal `</script>` sequence.

Use [Google Rich Results Test](https://search.google.com/test/rich-results) and
[Schema Markup Validator](https://validator.schema.org/) on a deployed article
URL. Both should parse without errors. Warnings about optional properties are
acceptable; invalid dates, missing required properties or malformed JSON are not.

## 4. Structured data checks

Expected site-wide entities (from `index.html`):

- `WebSite` with `@id` `https://sanjayachhra.com/#website`
- `LegalService` + `Attorney` + `LocalBusiness` with `@id`
  `https://sanjayachhra.com/#legalservice`
- `Person` with `@id` `https://sanjayachhra.com/#person`
- Office address, phone, email, coordinates, opening hours and practice
  catalogue.

Page-level nodes should reference those IDs rather than duplicating the full
business entity. Confirm the JSON is valid, uses `https://schema.org` as the
context, and has no placeholder text.

## 5. Crawl and AI-reference files

After `npm run build`, confirm these are present in `dist/` and served with the
right content types:

| File | Check |
| --- | --- |
| `/robots.txt` | Allows public pages; blocks `/add-article`, `/edit-article`, `/article-overview`; includes the sitemap URL |
| `/sitemap.xml` | Valid XML; all public routes; 22 URLs with the current built-in + Firestore articles; no admin routes |
| `/llms.txt` | Short entity/practice/article index with absolute URLs |
| `/llms-full.txt` | Fuller reference with citation guidance and legal limitations |
| `/og-image.jpg` | 1200 × 630, loads as `image/jpeg` |
| `/site.webmanifest` | Valid JSON; name, start URL, theme and icons |

Check the sitemap count and that every `<loc>` returns HTTP 200. If you add a
new built-in article to `src/data.jsx`, add its route to
`scripts/generate-sitemap.mjs`; Firestore articles are added automatically.

## 6. Hosting and redirects

### Firebase Hosting — manual upload

The deployment path is:

```bash
npm run build
```

Then upload the **contents of `dist/`** to Firebase Hosting, preserving the
directory structure.

`firebase.json` describes the rewrites, cache headers and security headers, but
it is only applied by the Firebase CLI. A manual file-manager upload does not
apply it. Therefore check:

- The SPA rewrite sends every route to `/index.html`; otherwise
  `/article/<slug>/` and `/practice/<slug>/` will fail on a hard refresh.
- `/robots.txt`, `/sitemap.xml`, `/llms.txt` and `/llms-full.txt` are served as
  static files, not rewritten to the app shell.
- Hashed files under `/assets/` use long-lived immutable caching.
- Security headers (`X-Content-Type-Options`, `Referrer-Policy`,
  `X-Frame-Options`) are configured in Firebase Hosting if you are not using
  `firebase.json` through the CLI.
- A hard refresh works on `/article/<slug>/`, `/practice/<slug>/`, `/approach/`,
  `/publications/`, `/disclaimer/` and `/privacy/`.

If the manual upload interface cannot configure rewrites, use:

```bash
npx firebase deploy --only hosting
```

after a successful build so that `firebase.json` is applied.

## 7. Social previews and the client-side limitation

Per-page metadata is applied by the React `MetaSEO` component. Google can
render the JavaScript and see it. Many social scrapers and some AI crawlers do
not execute JavaScript and will see the static metadata in `index.html` (home
page defaults) for deep links.

This is a known architectural limitation of the current SPA. If per-article
LinkedIn/X/WhatsApp previews are required, the next step is static pre-rendering
or edge-generated HTML for article routes. Do not claim that deep-link social
previews are article-specific until that is implemented and tested with each
platform's debugger.

## 8. Pre-launch fixes outside the SEO code

These are not optional if the site is public:

1. Replace the hardcoded demo admin credentials in `src/admin/adminAuth.js`.
   Client-side credentials are visible in the built bundle. Use Firebase
   Authentication (or another server-verified login) and Firestore rules that
   restrict writes to an allow-listed admin UID.
2. Add verified public profiles to `SAME_AS` in `src/seo/siteConfig.js` only
   after they exist. Do not invent LinkedIn, Bar Council or Google Business
   URLs.
3. Confirm the office address, PIN code, phone number, email, coordinates and
   opening hours in `src/seo/siteConfig.js` and `index.html`.
4. Set the real production domain in `src/seo/siteConfig.js` and the static
   files if it is not `https://sanjayachhra.com`.
5. Confirm Firestore security rules permit public reads only for published
   articles and restrict all writes.
6. Submit the sitemap in Google Search Console and Bing Webmaster Tools, then
   inspect the rendered HTML for a sample article and practice page.
7. Re-run Lighthouse on `/`, `/approach/`, an article and a practice page. The
   target is Accessibility 100, Best Practices 100 and SEO 100; investigate any
   regression rather than ignoring it.

## 9. Deployment smoke test

After deployment:

```bash
curl -I https://sanjayachhra.com/
curl -I https://sanjayachhra.com/robots.txt
curl -I https://sanjayachhra.com/sitemap.xml
curl -I https://sanjayachhra.com/llms.txt
curl -I https://sanjayachhra.com/article/<slug>/
```

Then check:

- HTTPS is enforced.
- The canonical host and the `www`/non-`www` redirect agree.
- No mixed-content or console errors.
- The sitemap URL in `robots.txt` is reachable.
- An article link and a practice link both resolve after a hard refresh.

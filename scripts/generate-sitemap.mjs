/**
 * Generates public/sitemap.xml before a production build.
 *
 * Static routes are always included. Articles stored in Firestore are read
 * through the public Firestore REST API and appended when the request succeeds;
 * a network failure never fails the build.
 *
 * Usage:
 *   node scripts/generate-sitemap.mjs
 *   SITE_URL=https://example.com node scripts/generate-sitemap.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SITE_URL = (process.env.SITE_URL || 'https://sanjayachhra.com').replace(/\/$/, '');
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || 'sanjay-achhra';
// Public web API key (the same key is already shipped in the client bundle).
const API_KEY = process.env.FIREBASE_API_KEY || 'AIzaSyCG0aki4rfChR2cAjIYX39xfPtSHXl4JME';

const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
    { path: '/', changefreq: 'monthly', priority: '1.0' },
    { path: '/practice/', changefreq: 'monthly', priority: '0.9' },
    { path: '/practice/income-tax-litigation/', changefreq: 'monthly', priority: '0.8' },
    { path: '/practice/black-money-act/', changefreq: 'monthly', priority: '0.8' },
    { path: '/practice/pmla/', changefreq: 'monthly', priority: '0.8' },
    { path: '/practice/cyber-law/', changefreq: 'monthly', priority: '0.8' },
    { path: '/practice/msme-conciliation-arbitration/', changefreq: 'monthly', priority: '0.8' },
    { path: '/practice/gst-litigation/', changefreq: 'monthly', priority: '0.8' },
    { path: '/practice/company-llp-firm-formation/', changefreq: 'monthly', priority: '0.8' },
    { path: '/practice/drafting-and-vetting/', changefreq: 'monthly', priority: '0.8' },
    { path: '/approach/', changefreq: 'monthly', priority: '0.7' },
    { path: '/article/', changefreq: 'weekly', priority: '0.9' },
    { path: '/article/unauthorised-bank-transactions-first-72-hours/', changefreq: 'yearly', priority: '0.7' },
    { path: '/article/delayed-payments-msme-suppliers-interest-facilitation-council/', changefreq: 'yearly', priority: '0.7' },
    { path: '/article/private-limited-company-or-llp-points-to-consider/', changefreq: 'yearly', priority: '0.7' },
    { path: '/publications/', changefreq: 'yearly', priority: '0.6' },
    { path: '/disclaimer/', changefreq: 'yearly', priority: '0.3' },
    { path: '/privacy/', changefreq: 'yearly', priority: '0.3' },
];

const escapeXml = (value) =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

const toIsoDate = (value) => {
    if (!value) return '';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
};

async function fetchArticles() {
    const articles = [];
    let pageToken = '';
    for (let page = 0; page < 10; page += 1) {
        const url = new URL(
            `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/articles`
        );
        url.searchParams.set('key', API_KEY);
        url.searchParams.set('pageSize', '300');
        if (pageToken) url.searchParams.set('pageToken', pageToken);

        const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
        if (!res.ok) throw new Error(`Firestore returned ${res.status}`);
        const json = await res.json();

        for (const doc of json.documents || []) {
            const fields = doc.fields || {};
            const slug = doc.name?.split('/').pop();
            // Match the client query in src/hooks/useArticles.js: only articles
            // explicitly marked active are published on the site.
            const active = fields.isActive?.booleanValue === true;
            if (!slug || !active) continue;
            articles.push({
                slug,
                lastmod:
                    toIsoDate(fields.updatedAt?.timestampValue || fields.createdAt?.timestampValue) ||
                    toIsoDate(fields.date?.stringValue) ||
                    today,
            });
        }

        pageToken = json.nextPageToken || '';
        if (!pageToken) break;
    }
    return articles;
}

function renderSitemap(articles) {
    const urls = [
        ...staticRoutes.map((route) => ({
            loc: `${SITE_URL}${route.path}`,
            lastmod: today,
            changefreq: route.changefreq,
            priority: route.priority,
        })),
        ...articles.map((article) => ({
            loc: `${SITE_URL}/article/${article.slug}/`,
            lastmod: article.lastmod,
            changefreq: 'yearly',
            priority: '0.7',
        })),
    ];

    // De-duplicate by URL, keeping the first occurrence.
    const seen = new Set();
    const unique = urls.filter((item) => {
        if (seen.has(item.loc)) return false;
        seen.add(item.loc);
        return true;
    });

    const body = unique
        .map(
            (item) => `  <url>
    <loc>${escapeXml(item.loc)}</loc>
    <lastmod>${escapeXml(item.lastmod)}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
        )
        .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

async function main() {
    let articles = [];
    try {
        articles = await fetchArticles();
        console.log(`[sitemap] Added ${articles.length} article URL(s) from Firestore.`);
    } catch (error) {
        console.warn(`[sitemap] Could not read Firestore (${error.message}). Using static routes only.`);
    }

    const output = resolve(root, 'public', 'sitemap.xml');
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, renderSitemap(articles), 'utf8');
    console.log(`[sitemap] Wrote ${output}`);
}

main();

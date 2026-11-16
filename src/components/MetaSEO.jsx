import { useEffect, useId, useMemo } from 'react';
import {
    CONTACT,
    DEFAULT_DESCRIPTION,
    DEFAULT_IMAGE,
    DEFAULT_IMAGE_ALT,
    DEFAULT_KEYWORDS,
    DEFAULT_ROBOTS,
    SITE_LOCALE,
    SITE_NAME,
    SITE_SHORT_NAME,
    SITE_URL,
    absoluteUrl,
} from '../seo/siteConfig';
import { parseKeywords, truncate, validateJsonLd } from '../utils/seoUtils';

const MANAGED = 'data-seo-managed';

const createMeta = (attr, key, content) => {
    const el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute('content', content);
    el.setAttribute(MANAGED, 'true');
    return el;
};

const createLink = (rel, href) => {
    const el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute('href', href);
    el.setAttribute(MANAGED, 'true');
    return el;
};

const createJsonLd = (value) => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.setAttribute(MANAGED, 'true');
    // Escaping < prevents a value inside the JSON from closing the script tag.
    el.textContent = JSON.stringify(value).replace(/</g, '\\u003c');
    return el;
};

/**
 * Declarative document-head manager for per-page SEO.
 *
 * Only one MetaSEO should be rendered per page. It adds the page title,
 * description, keywords, canonical, Open Graph / Twitter cards and JSON-LD,
 * and removes them again when the page unmounts.
 */
export default function MetaSEO({
    title,
    description = DEFAULT_DESCRIPTION,
    path = '/',
    image = DEFAULT_IMAGE,
    imageAlt = DEFAULT_IMAGE_ALT,
    type = 'website',
    keywords = DEFAULT_KEYWORDS,
    focusedKeyword = '',
    author = CONTACT.name,
    noindex = false,
    publishedTime,
    modifiedTime,
    section,
    jsonLd = [],
    customJsonLd,
    absoluteTitle = false,
}) {
    const ownerId = useId();
    const url = absoluteUrl(path);

    const keywordList = useMemo(
        () => parseKeywords([...parseKeywords(keywords), focusedKeyword]),
        [keywords, focusedKeyword]
    );

    const fullTitle = useMemo(() => {
        if (!title) return SITE_NAME;
        if (absoluteTitle) return title;
        return `${title} | ${SITE_NAME}`;
    }, [title, absoluteTitle]);

    const payload = useMemo(
        () => ({
            fullTitle,
            description: truncate(description, 160),
            url,
            image: absoluteUrl(image),
            imageAlt,
            type,
            keywords: keywordList,
            focusedKeyword,
            author,
            noindex,
            publishedTime,
            modifiedTime,
            section,
        }),
        [
            fullTitle,
            description,
            url,
            image,
            imageAlt,
            type,
            keywordList,
            focusedKeyword,
            author,
            noindex,
            publishedTime,
            modifiedTime,
            section,
        ]
    );

    // Stable dependency: avoids re-running the effect on every parent render.
    const serialized = JSON.stringify(payload);
    const jsonLdKey = JSON.stringify(jsonLd || []);
    const customKey = typeof customJsonLd === 'string' ? customJsonLd : JSON.stringify(customJsonLd || '');

    useEffect(() => {
        const data = JSON.parse(serialized);
        const nodes = [];
        const add = (node) => {
            nodes.push(node);
            document.head.appendChild(node);
        };

        // Clear any tags left behind by a previous page (including stale tags
        // after an interrupted navigation).
        document.head.querySelectorAll(`[${MANAGED}]`).forEach((el) => el.remove());

        // Remove the duplicate defaults written in index.html (they remain in
        // the initial HTML for non-JS crawlers and social scrapers).
        document.head
            .querySelectorAll([
                'meta[name="description"]',
                'meta[name="keywords"]',
                'meta[name="author"]',
                'meta[name="robots"]',
                'meta[name="googlebot"]',
                'meta[name="news_keywords"]',
                'meta[property^="og:"]',
                'meta[name^="twitter:"]',
                'link[rel="canonical"]',
            ].join(','))
            .forEach((el) => el.remove());

        document.title = data.fullTitle;
        add(createLink('canonical', data.url));

        add(createMeta('name', 'description', data.description));
        add(createMeta('name', 'robots', data.noindex ? 'noindex, nofollow' : DEFAULT_ROBOTS));
        add(createMeta('name', 'googlebot', data.noindex ? 'noindex, nofollow' : DEFAULT_ROBOTS));
        add(createMeta('name', 'author', data.author || SITE_SHORT_NAME));
        if (data.keywords.length) add(createMeta('name', 'keywords', data.keywords.join(', ')));
        if (data.focusedKeyword) add(createMeta('name', 'news_keywords', data.focusedKeyword));

        // Open Graph
        add(createMeta('property', 'og:type', data.type));
        add(createMeta('property', 'og:site_name', SITE_NAME));
        add(createMeta('property', 'og:locale', SITE_LOCALE));
        add(createMeta('property', 'og:title', data.fullTitle));
        add(createMeta('property', 'og:description', data.description));
        add(createMeta('property', 'og:url', data.url));
        add(createMeta('property', 'og:image', data.image));
        add(createMeta('property', 'og:image:alt', data.imageAlt));
        if (data.image === `${SITE_URL}/og-image.jpg`) {
            add(createMeta('property', 'og:image:width', '1200'));
            add(createMeta('property', 'og:image:height', '630'));
        }
        if (data.type === 'article') {
            if (data.publishedTime) add(createMeta('property', 'article:published_time', data.publishedTime));
            if (data.modifiedTime) add(createMeta('property', 'article:modified_time', data.modifiedTime));
            if (data.section) add(createMeta('property', 'article:section', data.section));
            add(createMeta('property', 'article:author', data.author));
            [...new Set(data.keywords)].slice(0, 12).forEach((tag) => {
                add(createMeta('property', 'article:tag', tag));
            });
        }

        // Twitter / X
        add(createMeta('name', 'twitter:card', 'summary_large_image'));
        add(createMeta('name', 'twitter:title', data.fullTitle));
        add(createMeta('name', 'twitter:description', data.description));
        add(createMeta('name', 'twitter:image', data.image));
        add(createMeta('name', 'twitter:image:alt', data.imageAlt));

        // Generated schema is combined into one @graph.
        const generated = (jsonLd || [])
            .filter(Boolean)
            .map((node) =>
                Object.fromEntries(Object.entries(node).filter(([key]) => key !== '@context'))
            );
        if (generated.length) {
            add(createJsonLd({ '@context': 'https://schema.org', '@graph': generated }));
        }

        // Editor-supplied JSON-LD is validated before it reaches this point.
        const custom = validateJsonLd(customJsonLd);
        if (custom.ok && custom.value) {
            const values = Array.isArray(custom.value) ? custom.value : [custom.value];
            values.forEach((value) => add(createJsonLd(value)));
        }

        return () => {
            nodes.forEach((node) => node.remove());
            if (document.title === data.fullTitle) document.title = SITE_NAME;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serialized, jsonLdKey, customKey, ownerId]);

    return null;
}

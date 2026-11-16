// Reusable schema.org builders.
//
// The site-wide LegalService / Person / WebSite graph lives in index.html.
// Page-level markup references those nodes by @id, which keeps the graph
// coherent and avoids duplicating the business entity on every page.

import {
    SITE_URL,
    SITE_NAME,
    SITE_LANGUAGE,
    LEGAL_SERVICE_ID,
    PERSON_ID,
    WEBSITE_ID,
    CONTACT,
    absoluteUrl,
} from './siteConfig';

const ref = (id) => ({ '@id': id });

const clean = (value) => String(value || '').replace(/\s+/g, ' ').trim();

/** BreadcrumbList from [{ name, path }]. */
export function breadcrumbSchema(items = []) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${absoluteUrl(items[items.length - 1]?.path || '/')}#breadcrumb`,
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: clean(item.name),
            item: absoluteUrl(item.path || '/'),
        })),
    };
}

/** WebPage / CollectionPage / AboutPage / ProfilePage. */
export function webPageSchema({
    path = '/',
    type = 'WebPage',
    name,
    description,
    image,
    about,
    mainEntity,
    keywords = [],
    datePublished,
    dateModified,
    breadcrumbs,
    speakable = false,
}) {
    const url = absoluteUrl(path);
    return {
        '@context': 'https://schema.org',
        '@type': type,
        '@id': `${url}#webpage`,
        url,
        name: clean(name),
        description: clean(description),
        inLanguage: SITE_LANGUAGE,
        isPartOf: ref(WEBSITE_ID),
        about: about || ref(LEGAL_SERVICE_ID),
        ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: image } } : {}),
        ...(mainEntity ? { mainEntity } : {}),
        ...(keywords.length ? { keywords: keywords.join(', ') } : {}),
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified ? { dateModified } : {}),
        ...(breadcrumbs ? { breadcrumb: ref(breadcrumbSchema(breadcrumbs)['@id']) } : {}),
        ...(speakable
            ? {
                speakable: {
                    '@type': 'SpeakableSpecification',
                    cssSelector: ['h1', 'main p:first-of-type'],
                },
            }
            : {}),
        potentialAction: {
            '@type': 'ReadAction',
            target: [url],
        },
    };
}

/** ItemList for index pages. */
export function itemListSchema({ path = '/', name, items = [] }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': `${absoluteUrl(path)}#itemlist`,
        name: clean(name),
        numberOfItems: items.length,
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: clean(item.name),
            url: absoluteUrl(item.path),
        })),
    };
}

/** BlogPosting / Article for an individual article page. */
export function articleSchema({
    path,
    headline,
    description,
    image,
    datePublished,
    dateModified,
    section,
    keywords = [],
    focusedKeyword,
    wordCount,
    url,
    citations = [],
}) {
    const articleUrl = url || absoluteUrl(path);
    const imageUrl = image || `${SITE_URL}/og-image.jpg`;
    const published = datePublished || new Date().toISOString().slice(0, 10);
    return {
        '@context': 'https://schema.org',
        '@type': ['BlogPosting', 'Article'],
        '@id': `${articleUrl}#article`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${articleUrl}#webpage` },
        url: articleUrl,
        headline: clean(headline),
        name: clean(headline),
        description: clean(description),
        image: [imageUrl.startsWith('http') ? imageUrl : absoluteUrl(imageUrl)],
        datePublished: published,
        dateModified: dateModified || published,
        author: ref(PERSON_ID),
        publisher: ref(LEGAL_SERVICE_ID),
        copyrightHolder: ref(PERSON_ID),
        copyrightYear: new Date(published).getFullYear() || new Date().getFullYear(),
        inLanguage: SITE_LANGUAGE,
        isAccessibleForFree: true,
        ...(section ? { articleSection: clean(section) } : {}),
        ...(keywords.length ? { keywords: keywords.join(', ') } : {}),
        ...(focusedKeyword
            ? { about: { '@type': 'Thing', name: clean(focusedKeyword) } }
            : {}),
        ...(wordCount ? { wordCount } : {}),
        ...(citations.length ? { citation: citations } : {}),
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1', '.prose-body > p:first-of-type'],
        },
        license: `${SITE_URL}/disclaimer/`,
    };
}

/** FAQPage from the Q&A blocks in an article. */
export function faqPageSchema(faqs = [], path = '/') {
    if (!faqs.length) return null;
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${absoluteUrl(path)}#faq`,
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: clean(faq.question),
            acceptedAnswer: {
                '@type': 'Answer',
                text: clean(faq.answer),
            },
        })),
    };
}

/** Service node for an area-of-practice page. */
export function serviceSchema({ path, name, description, keywords = [] }) {
    const url = absoluteUrl(path);
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `${clean(name)} in Mumbai`,
        serviceType: clean(name),
        description: clean(description),
        provider: ref(LEGAL_SERVICE_ID),
        areaServed: [
            { '@type': 'City', name: 'Mumbai' },
            { '@type': 'State', name: 'Maharashtra' },
        ],
        audience: {
            '@type': 'Audience',
            audienceType: 'Individuals, businesses and enterprises in India',
        },
        availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: url,
            servicePhone: CONTACT.phoneE164,
            serviceLocation: {
                '@type': 'Place',
                name: SITE_NAME,
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: CONTACT.streetAddress,
                    addressLocality: CONTACT.addressLocality,
                    addressRegion: CONTACT.addressRegion,
                    postalCode: CONTACT.postalCode,
                    addressCountry: CONTACT.addressCountry,
                },
            },
        },
        ...(keywords.length ? { keywords: keywords.join(', ') } : {}),
        termsOfService: `${SITE_URL}/disclaimer/`,
    };
}

/** ScholarlyArticle nodes for the publications page. */
export function scholarlyArticleSchema({ title, note, author = CONTACT.name, index = 0 }) {
    return {
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        '@id': `${SITE_URL}/publications/#publication-${index + 1}`,
        headline: clean(title),
        name: clean(title),
        ...(note ? { description: clean(note) } : {}),
        author: ref(PERSON_ID),
        publisher: ref(LEGAL_SERVICE_ID),
        inLanguage: SITE_LANGUAGE,
        url: `${SITE_URL}/publications/`,
        isPartOf: ref(`${SITE_URL}/publications/#webpage`),
        ...(author ? { creator: { '@type': 'Person', name: clean(author) } } : {}),
    };
}

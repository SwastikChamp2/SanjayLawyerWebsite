// Small, dependency-free helpers used by the SEO components and admin form.

/** Accepts a comma-separated string or an array and returns clean keywords. */
export function parseKeywords(input) {
    if (!input) return [];
    const list = Array.isArray(input) ? input : String(input).split(',');
    const seen = new Set();
    return list
        .map((k) => String(k).trim())
        .filter((k) => {
            if (!k) return false;
            const key = k.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
}

/** Strip HTML tags and collapse whitespace (safe in the browser). */
export function stripHtml(html = '') {
    if (!html) return '';
    if (typeof DOMParser === 'undefined') {
        return String(html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    }
    const doc = new DOMParser().parseFromString(String(html), 'text/html');
    return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
}

/** Approximate word count of an HTML body. */
export function htmlWordCount(html = '') {
    const text = stripHtml(html);
    return text ? text.split(/\s+/).length : 0;
}

/** Trim text to a maximum length without cutting a word in half. */
export function truncate(text = '', max = 160) {
    const value = String(text).replace(/\s+/g, ' ').trim();
    if (value.length <= max) return value;
    const cut = value.slice(0, max - 1);
    const space = cut.lastIndexOf(' ');
    return `${(space > max * 0.6 ? cut.slice(0, space) : cut).trim()}…`;
}

const isPlainObject = (value) =>
    value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * Validates a JSON-LD string entered in the article editor.
 *
 * Returns { ok, value, error }:
 *  - ok:    whether the value is syntactically valid JSON-LD
 *  - value: the parsed object/array when valid, otherwise null
 *  - error: a human-readable message when invalid
 */
export function validateJsonLd(input, { maxBytes = 60 * 1024 } = {}) {
    if (input == null) return { ok: true, value: null, error: '' };
    const raw = typeof input === 'string' ? input.trim() : input;
    if (raw === '' || raw == null) return { ok: true, value: null, error: '' };

    if (typeof raw === 'string') {
        if (new Blob([raw]).size > maxBytes) {
            return {
                ok: false,
                value: null,
                error: `JSON-LD is too large. Keep it under ${Math.round(maxBytes / 1024)} KB.`,
            };
        }
    }

    let parsed = raw;
    if (typeof raw === 'string') {
        try {
            parsed = JSON.parse(raw);
        } catch (err) {
            return { ok: false, value: null, error: `Invalid JSON: ${err.message}` };
        }
    }

    const nodes = [];
    const collect = (node) => {
        if (Array.isArray(node)) {
            node.forEach(collect);
            return;
        }
        if (!isPlainObject(node)) return;
        if (Array.isArray(node['@graph'])) {
            node['@graph'].forEach(collect);
        } else if (node['@type']) {
            nodes.push(node);
        }
    };
    collect(parsed);

    if (!nodes.length) {
        return {
            ok: false,
            value: null,
            error: 'JSON-LD must be an object or array with an "@type" (or a @graph containing @type entries).',
        };
    }

    if (isPlainObject(parsed) && parsed['@context'] != null) {
        const ctx = parsed['@context'];
        if (typeof ctx !== 'string' && !isPlainObject(ctx) && !Array.isArray(ctx)) {
            return {
                ok: false,
                value: null,
                error: '"@context" must be a string, object or array.',
            };
        }
    }

    return { ok: true, value: parsed, error: '' };
}

/**
 * Collects FAQ pairs from <details><summary>…</summary>…</details> blocks in
 * an article body so they can be emitted as FAQPage structured data.
 */
export function extractFaqs(html = '') {
    if (!html || typeof DOMParser === 'undefined') return [];
    const doc = new DOMParser().parseFromString(String(html), 'text/html');
    return [...doc.querySelectorAll('details')]
        .map((details) => {
            const question = (details.querySelector('summary')?.textContent || '').trim();
            const answerNodes = [...details.children].filter((el) => el.tagName !== 'SUMMARY');
            const answer = answerNodes
                .map((el) => (el.textContent || '').trim())
                .filter(Boolean)
                .join(' ');
            return { question, answer };
        })
        .filter((f) => f.question && f.answer);
}

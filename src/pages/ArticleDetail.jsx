import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaLinkedinIn, FaWhatsapp, FaFacebookF, FaXTwitter, FaLink, FaCheck } from 'react-icons/fa6';
import { Reveal, RevealText } from '../components/Motion.jsx';
import { ArticleCard } from './Articles.jsx';
import DOMPurify from 'dompurify';
import MetaSEO from '../components/MetaSEO.jsx';
import { images, author, formatDate } from '../data.jsx';
import { useArticles } from '../hooks/useArticles';
import { isAdmin } from '../admin/adminAuth';
import {
    DEFAULT_IMAGE,
    DEFAULT_KEYWORDS,
    absoluteUrl,
} from '../seo/siteConfig';
import {
    articleSchema,
    breadcrumbSchema,
    faqPageSchema,
    webPageSchema,
} from '../seo/schemas';
import { extractFaqs, htmlWordCount, parseKeywords } from '../utils/seoUtils';

/* Rich-text styles for article bodies. Plain CSS (no @apply) because this
   <style> tag is not processed by Tailwind. Colours come from the theme variables. */
const proseCss = `
.prose-body > :first-child { margin-top: 0; }
.prose-body > .contents > :first-child { margin-top: 0; }
.prose-body [id] { scroll-margin-top: 96px; }

.prose-body h1 { font-size: 36px; margin: 54px 0 16px; }
.prose-body h2 { font-size: 30px; margin: 46px 0 14px; }
.prose-body h3 { font-size: 26px; margin: 34px 0 10px; }
.prose-body h4 { font-family: var(--font-serif); font-size: 21px; font-weight: 600; line-height: 1.25; color: var(--color-navy); margin: 28px 0 8px; }

/* Paragraphs and inline text */
.prose-body p { margin: 0 0 22px; font-size: 18px; line-height: 1.75; color: #2b3a42; }
.prose-body .lead { font-family: var(--font-serif); font-size: 26px; line-height: 1.4; color: var(--color-navy); margin-bottom: 30px; }
.prose-body strong { font-weight: 600; color: var(--color-ink); }
.prose-body em { font-style: italic; }
.prose-body u { text-decoration-color: var(--color-gold); text-decoration-thickness: 1.5px; text-underline-offset: 3px; }
.prose-body mark { background: #f1e2bd; color: inherit; padding: 0 .25em; }
.prose-body small { font-size: .85em; color: var(--color-muted); }
.prose-body abbr[title] { text-decoration: underline dotted var(--color-gold); text-underline-offset: 3px; cursor: help; }
.prose-body sup { font-size: .7em; line-height: 0; }
.prose-body a { color: var(--color-navy); text-decoration: underline; text-decoration-color: var(--color-gold); text-underline-offset: 3px; transition: color .3s; }
.prose-body a:hover { color: var(--color-gold); }
.prose-body sup a { font-weight: 600; color: var(--color-gold); text-decoration: none; }

/* Lists */
.prose-body ul { margin: 0 0 22px 22px; list-style: disc; }
.prose-body ol { margin: 0 0 22px 22px; list-style: decimal; }
.prose-body li { margin-bottom: 10px; font-size: 18px; line-height: 1.75; color: #2b3a42; }
.prose-body li::marker { color: var(--color-gold); }
.prose-body ol > li::marker { font-weight: 600; }
.prose-body li > ul, .prose-body li > ol { margin: 10px 0 0; }
.prose-body li > ul { list-style: circle; }
.prose-body li > p { margin-bottom: 10px; }

/* Definition list */
.prose-body dl { margin: 32px 0; border-top: 1px solid var(--color-line); }
.prose-body dt { padding-top: 16px; font-family: var(--font-serif); font-size: 21px; font-weight: 600; color: var(--color-navy); }
.prose-body dd { margin: 0; padding: 4px 0 16px; border-bottom: 1px solid var(--color-line); font-size: 17px; color: #2b3a42; }

/* Divider */
.prose-body hr { height: 1px; margin: 48px 0; border: 0; background: var(--color-line); }

/* Blockquote / pull quote */
.prose-body blockquote { margin: 34px 0; padding: 6px 0 6px 24px; border-left: 3px solid var(--color-gold); font-family: var(--font-serif); font-size: 26px; font-style: italic; line-height: 1.4; color: var(--color-navy); }
.prose-body blockquote p { margin: 0; font-size: inherit; line-height: inherit; color: inherit; }
.prose-body blockquote cite { display: block; margin-top: 12px; font-family: var(--font-sans); font-size: 13px; font-style: normal; letter-spacing: .14em; text-transform: uppercase; color: var(--color-gold); }

/* Callouts: <div class="callout [callout-note | callout-warn]"> */
.prose-body .callout { margin: 36px 0; padding: 20px 24px; border: 1px solid var(--color-line); border-left: 3px solid var(--color-gold); background: var(--color-cream); }
.prose-body .callout > :last-child { margin-bottom: 0; }
.prose-body .callout p, .prose-body .callout li { font-size: 16px; line-height: 1.65; }
.prose-body .callout .callout-title { margin: 0 0 8px; font-size: 12.5px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: var(--color-gold); }
.prose-body .callout-note { border-left-color: var(--color-navy); background: #fff; }
.prose-body .callout-note .callout-title { color: var(--color-navy); }
.prose-body .callout-warn { border-left-color: #a4453a; background: #faf0ed; }
.prose-body .callout-warn .callout-title { color: #a4453a; }

/* Tables: wrap in <div class="table-wrap"> */
.prose-body .table-wrap { margin: 36px 0; overflow-x: auto; border: 1px solid var(--color-line); background: #fff; }
.prose-body table { width: 100%; min-width: 560px; border-collapse: collapse; text-align: left; font-size: 15.5px; }
.prose-body caption { caption-side: bottom; padding: 12px 16px; border-top: 1px solid var(--color-line); background: var(--color-paper); text-align: left; font-size: 13.5px; font-style: italic; color: var(--color-muted); }
.prose-body th { padding: 14px 16px; text-align: left; vertical-align: top; }
.prose-body thead th { background: var(--color-navy); color: #fff; font-size: 12.5px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; }
.prose-body tbody th { border-top: 1px solid var(--color-line); background: var(--color-cream); font-weight: 600; color: var(--color-navy); }
.prose-body td { padding: 14px 16px; vertical-align: top; border-top: 1px solid var(--color-line); color: #2b3a42; }
.prose-body tbody tr:nth-child(even) td { background: var(--color-paper); }

/* Code */
.prose-body code { padding: 1px 6px; border: 1px solid var(--color-line); background: var(--color-cream); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: .88em; color: var(--color-navy); }
.prose-body pre { margin: 32px 0; padding: 24px; overflow-x: auto; border-left: 3px solid var(--color-gold); background: var(--color-navy-deep); font-size: 14.5px; line-height: 1.75; color: #e9e1d1; white-space: pre-wrap; word-break: break-word; }
.prose-body pre code { padding: 0; border: 0; background: transparent; font-size: 1em; color: inherit; }

/* Expandable FAQ: <details><summary>…</summary><p>…</p></details> */
.prose-body details { margin: 12px 0; border: 1px solid var(--color-line); background: #fff; }
.prose-body summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 16px 20px; cursor: pointer; list-style: none; font-weight: 600; color: var(--color-navy); }
.prose-body summary::-webkit-details-marker { display: none; }
.prose-body summary::after { content: '+'; font-family: var(--font-serif); font-size: 24px; line-height: 1; color: var(--color-gold); }
.prose-body details[open] summary { border-bottom: 1px solid var(--color-line); }
.prose-body details[open] summary::after { content: '–'; }
.prose-body details > :not(summary) { margin-left: 20px; margin-right: 20px; }
.prose-body details > summary + * { margin-top: 18px; }
.prose-body details > :last-child { margin-bottom: 18px; }

/* Images and figures */
.prose-body img { display: block; width: 100%; margin: 32px 0; border: 1px solid var(--color-line); }
.prose-body figure { margin: 36px 0; }
.prose-body figure img { margin: 0; }
.prose-body figcaption { margin-top: 12px; text-align: center; font-size: 13.5px; font-style: italic; color: var(--color-muted); }

/* Sources / footnotes */
.prose-body .footnotes { margin-top: 8px; }
.prose-body .footnotes h2 { margin-top: 24px; font-size: 22px; }
.prose-body .footnotes li { margin-bottom: 8px; font-size: 15px; color: var(--color-muted); }
.prose-body .footnotes li:target { background: rgba(241, 226, 189, .5); }
`;

const iconBtn = 'grid size-11 cursor-pointer place-items-center rounded-full border border-line bg-white text-[17px] text-navy no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-navy hover:bg-navy hover:text-gold';

function ShareBar({ title }) {
    const [copied, setCopied] = useState(false);
    const url = window.location.href;
    const enc = encodeURIComponent;

    const links = [
        { label: 'LinkedIn', icon: <FaLinkedinIn />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
        { label: 'WhatsApp', icon: <FaWhatsapp />, href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
        { label: 'X', icon: <FaXTwitter />, href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
        { label: 'Facebook', icon: <FaFacebookF />, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    ];

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch { /* clipboard unavailable */ }
    };

    return (
        <nav aria-label="Share this article" className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-line py-6">
            <span className="eyebrow">Share</span>
            <ul className="flex list-none flex-wrap items-center gap-2.5">
                {links.map((l) => (
                    <li key={l.label}>
                        <a className={iconBtn} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${l.label}`} title={`Share on ${l.label}`}>
                            {l.icon}
                        </a>
                    </li>
                ))}
                <li>
                    <button type="button" className={iconBtn} onClick={copy} aria-label="Copy article link" title="Copy article link">
                        {copied ? <FaCheck /> : <FaLink />}
                    </button>
                </li>
            </ul>
            <span role="status" className="text-[13px] font-semibold tracking-[.06em] text-gold">{copied ? 'Link copied' : ''}</span>
        </nav>
    );
}

export default function ArticleDetail() {
    const { slug } = useParams();
    const { posts: sorted, loading } = useArticles();
    const post = sorted.find((p) => p.slug === slug);

    // Firestore articles store their body as an HTML string; sanitize before rendering
    const safeHtml = useMemo(
        () => (post?.bodyHtml ? DOMPurify.sanitize(post.bodyHtml, { USE_PROFILES: { html: true } }) : ''),
        [post]
    );

    // SEO inputs derived from the (optional) fields stored with the article.
    const savedFaqs = post?.faq;
    const faqs = useMemo(
        () => (Array.isArray(savedFaqs) && savedFaqs.length ? savedFaqs : extractFaqs(safeHtml)),
        [safeHtml, savedFaqs]
    );
    const wordCount = useMemo(() => htmlWordCount(safeHtml), [safeHtml]);
    const articlePath = `/article/${post?.slug || slug}/`;
    const articleUrl = absoluteUrl(articlePath);
    const keywords = useMemo(() => {
        const saved = parseKeywords(post?.keywords);
        if (saved.length) return saved;
        return parseKeywords([
            post?.focusedKeyword,
            post?.tagName,
            'Adv. Sanjay Achhra',
            'Mumbai advocate',
            ...DEFAULT_KEYWORDS.slice(0, 5),
        ]);
    }, [post]);

    const publishedISO = post?.date ? `${post.date}T00:00:00+05:30` : undefined;
    const modifiedISO = post?.updatedAt || publishedISO;

    const articleLd = post
        ? articleSchema({
            path: articlePath,
            url: articleUrl,
            headline: post.title,
            description: post.excerpt,
            image: post.image || DEFAULT_IMAGE,
            datePublished: post.date,
            dateModified: post.updatedAt || post.date,
            section: post.tagName,
            keywords,
            focusedKeyword: post.focusedKeyword,
            wordCount,
        })
        : null;
    const breadcrumbs = post
        ? [
            { name: 'Home', path: '/' },
            { name: 'Articles', path: '/article/' },
            { name: post.title, path: articlePath },
        ]
        : [];
    const breadcrumbLd = post ? breadcrumbSchema(breadcrumbs) : null;
    const faqLd = post ? faqPageSchema(faqs, articlePath) : null;
    const webPageLd = post
        ? webPageSchema({
            path: articlePath,
            name: post.title,
            description: post.excerpt,
            image: post.image || DEFAULT_IMAGE,
            mainEntity: { '@type': 'Article', '@id': `${articleUrl}#article` },
            breadcrumbs,
            keywords,
            datePublished: post.date,
            dateModified: post.updatedAt || post.date,
            speakable: true,
        })
        : null;

    useEffect(() => { window.scrollTo(0, 0); }, [slug]);

    if (!post && loading) {
        return (
            <>
                <MetaSEO title="Loading article" path={articlePath} noindex />
                <section className="block-section wrap"><p className="text-muted">Loading article…</p></section>
            </>
        );
    }

    if (!post) {
        return (
            <>
                <MetaSEO title="Article not found" path={articlePath} description="The requested article could not be found." noindex />
                <section className="block-section wrap">
                    <h1 className="text-5xl mb-4">Article not found</h1>
                    <Link to="/article/" className="text-gold font-semibold">Back to Articles</Link>
                </section>
            </>
        );
    }

    // Same category first, then the latest others, max 3
    const others = sorted.filter((p) => p.slug !== slug);
    const more = [...others.filter((p) => p.tag === post.tag), ...others.filter((p) => p.tag !== post.tag)].slice(0, 3);

    return (
        <>
            <style>{proseCss}</style>

            <MetaSEO
                title={post.title}
                description={post.excerpt}
                path={articlePath}
                image={post.image || DEFAULT_IMAGE}
                imageAlt={post.title}
                type="article"
                keywords={keywords}
                focusedKeyword={post.focusedKeyword}
                publishedTime={publishedISO}
                modifiedTime={modifiedISO}
                section={post.tagName}
                jsonLd={[webPageLd, articleLd, breadcrumbLd, faqLd]}
                customJsonLd={post.jsonLd}
            />

            {/* Hero */}
            <header className="page-hero relative overflow-hidden bg-navy text-white">
                <div className="relative z-[1] mx-auto w-full max-w-[860px] px-6 py-16 min-[901px]:py-20">
                    <Reveal variant="fade" className="eyebrow">
                        <Link to="/article/" className="text-inherit no-underline transition-colors hover:text-gold-soft">Articles</Link> · {post.tagName}
                    </Reveal>
                    <Reveal as="h1" delay={0.1} className="mt-4 text-[clamp(34px,5vw,58px)] leading-[1.1] text-white">{post.title}</Reveal>
                    <Reveal delay={0.25} className="mt-8 flex items-center gap-4">
                        <img
                            src={images.portrait} alt={`${author.name}, author of this article`} width="56" height="56"
                            loading="lazy" decoding="async"
                            className="size-14 shrink-0 rounded-full border border-gold bg-white object-cover object-top"
                        />
                        <div>
                            <div className="font-semibold">{author.name}</div>
                            <time className="text-[15px] text-[#c8d5da]" dateTime={post.date}>{formatDate(post.date)}</time>
                        </div>
                    </Reveal>
                </div>
            </header>

            {/* Body */}
            <div className="mx-auto w-full max-w-[860px] px-6 pt-14 pb-20">
                <Reveal as="article" delay={0.1} className="prose-body">
                    {safeHtml
                        ? <div className="contents" dangerouslySetInnerHTML={{ __html: safeHtml }} />
                        : (post.body ?? <p>{post.excerpt}</p>)}
                    <div className="bg-cream border border-line px-6 py-5 text-[14.5px] text-[#4b5a61] my-10">
                        <strong>Note:</strong> This article is for general information only and is not legal advice. Readers should consult the current text of the law for their specific facts.
                    </div>
                </Reveal>

                <ShareBar title={post.title} />

                {post.remote && isAdmin() && (
                    <div className="mt-6">
                        <Link to={`/edit-article/${post.slug}/`} className="text-sm font-semibold text-gold">Edit this article →</Link>
                    </div>
                )}

                {/* Author */}
                <aside aria-label="About the author" className="mt-10 flex flex-col items-center gap-6 bg-navy p-8 text-center min-[701px]:flex-row min-[701px]:text-left">
                    <img
                        src={images.portrait} alt={`Portrait of ${author.name}`} width="120" height="120"
                        loading="lazy" decoding="async"
                        className="size-[120px] shrink-0 rounded-full border border-gold bg-white object-cover object-top p-1"
                    />
                    <div>
                        <div className="font-serif text-[30px] font-semibold leading-tight text-gold">{author.name}</div>
                        <p className="mt-2 text-[15px] leading-[1.6] text-[#c8d5da]">{author.bio}</p>
                    </div>
                </aside>
            </div>

            {/* Read more */}
            {more.length > 0 && (
                <section aria-label="More articles" className="block-section bg-cream">
                    <div className="wrap">
                        <div className="mb-[50px] flex flex-wrap items-end justify-between gap-10">
                            <div>
                                <Reveal variant="fade" className="eyebrow">Articles</Reveal>
                                <RevealText as="h2" className="h2" delay={0.1}>Read More</RevealText>
                            </div>
                            <Reveal delay={0.3}><Link className="btn btn-dark" to="/article/">All articles</Link></Reveal>
                        </div>
                        <div className="grid grid-cols-1 gap-8 min-[701px]:grid-cols-2 min-[1001px]:grid-cols-3">
                            {more.map((p, i) => <ArticleCard key={p.slug} post={p} index={i} />)}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
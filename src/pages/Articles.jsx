import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import MetaSEO from '../components/MetaSEO.jsx';
import { Reveal } from '../components/Motion.jsx';
import { formatDate } from '../data.jsx';
import { useArticles } from '../hooks/useArticles';
import { DEFAULT_KEYWORDS } from '../seo/siteConfig';
import { breadcrumbSchema, itemListSchema, webPageSchema } from '../seo/schemas';

const PER_PAGE = 15;

// 1 … 4 [5] 6 … 12
function pageList(current, total) {
    const keep = new Set([1, total, current - 1, current, current + 1]);
    const nums = [...keep].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
    const out = [];
    nums.forEach((n, i) => {
        if (i > 0 && n - nums[i - 1] > 1) out.push('gap-' + n);
        out.push(n);
    });
    return out;
}

const pageHref = (n) => (n === 1 ? '/article/' : `/article/?page=${n}`);

const pageBtn = 'grid size-11 place-items-center border text-[15px] font-semibold no-underline transition-colors duration-300';
const navBtn = 'inline-flex h-11 items-center gap-2 border px-4 text-[13px] font-semibold uppercase tracking-[.1em] no-underline transition-colors duration-300';

export function ArticleCard({ post, index }) {
    return (
        <Reveal
            as="article"
            delay={(index % 3) * 0.1}
            className="group relative flex flex-col border border-line bg-white transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-[0_24px_40px_-28px_rgba(18,60,79,.4)]"
        >
            <div className="thumb relative aspect-video overflow-hidden bg-navy flex items-center justify-center">
                {post.image
                    ? <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                    : <span className="relative z-[1] font-serif text-[22px] tracking-[.14em] uppercase text-gold transition-transform duration-700 group-hover:scale-105" aria-hidden="true">{post.tagName}</span>}
            </div>
            <div className="flex flex-1 flex-col p-8">
                <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[.14em] text-gold">{post.tagName}</span>
                    <time className="text-[13px] text-muted" dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <h2 className="mt-4 text-[26px] leading-[1.2] transition-colors duration-500 group-hover:text-gold">
                    <Link to={`/article/${post.slug}/`} className="stretched text-inherit no-underline">{post.title}</Link>
                </h2>
                <p className="mt-3 line-clamp-3 text-[15.5px] text-muted">{post.excerpt}</p>
                <span className="mt-auto pt-6 text-[13px] font-semibold uppercase tracking-[.14em] text-gold transition-transform duration-300 group-hover:translate-x-1.5">
                    Read more →
                </span>
            </div>
        </Reveal>
    );
}

export default function Articles() {
    const [params] = useSearchParams();
    // Built-in articles + Firestore articles, newest first
    const { posts: sorted, loading } = useArticles();

    const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
    const requested = parseInt(params.get('page') || '1', 10);
    const page = Number.isFinite(requested) ? Math.min(Math.max(requested, 1), totalPages) : 1;
    const visible = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const listPath = page === 1 ? '/article/' : `/article/?page=${page}`;
    const title = page === 1 ? 'Articles' : `Articles — Page ${page}`;
    const description =
        'Articles and legal notes by Adv. Sanjay Achhra on income tax litigation, the Black Money Act, PMLA, cyber law, MSME arbitration, GST and allied laws in Mumbai.';
    const keywords = [
        ...DEFAULT_KEYWORDS.slice(0, 10),
        'legal articles India',
        'tax law insights',
        'Bombay High Court judgments',
        'Mumbai advocate articles',
    ];
    const list = itemListSchema({
        path: '/article/',
        name: 'Articles by Adv. Sanjay Achhra',
        items: sorted.map((post) => ({
            name: post.title,
            path: `/article/${post.slug}/`,
        })),
    });
    const pageSchema = webPageSchema({
        path: listPath,
        type: 'CollectionPage',
        name: 'Articles — Adv. Sanjay Achhra, Mumbai',
        description,
        keywords,
        mainEntity: { '@id': list['@id'] },
        breadcrumbs: [
            { name: 'Home', path: '/' },
            { name: 'Articles', path: '/article/' },
        ],
        speakable: true,
    });

    // Bring the list back into view when the page changes (not on first load)
    const listRef = useRef(null);
    const first = useRef(true);
    useEffect(() => {
        if (first.current) { first.current = false; return; }
        listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [page]);

    return (
        <>
            <MetaSEO
                title={title}
                description={description}
                path={listPath}
                keywords={keywords}
                focusedKeyword="legal articles by a Mumbai advocate"
                jsonLd={[pageSchema, list, breadcrumbSchema([
                    { name: 'Home', path: '/' },
                    { name: 'Articles', path: '/article/' },
                ])]}
            />

            <PageHero
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Articles' }]}
                title="Articles"
                sub="Articles, academic work, law insights and case studies on direct-tax litigation and allied laws."
            />

            <section ref={listRef} id="articles-list" className="block-section paper" aria-label="Published articles">
                <div className="wrap">
                    {visible.length === 0 ? (
                        <p className="text-center text-muted">{loading ? 'Loading articles…' : 'No articles have been published yet.'}</p>
                    ) : (
                        <div key={page} className="grid grid-cols-1 gap-8 min-[701px]:grid-cols-2 min-[1001px]:grid-cols-3">
                            {visible.map((p, i) => <ArticleCard key={p.slug} post={p} index={i} />)}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <nav aria-label="Pagination" className="mt-16 flex flex-wrap items-center justify-center gap-2">
                            {page > 1 ? (
                                <Link to={pageHref(page - 1)} rel="prev" className={`${navBtn} border-line text-navy hover:border-gold hover:text-gold`}>← Prev</Link>
                            ) : (
                                <span aria-disabled="true" className={`${navBtn} border-line text-muted opacity-40`}>← Prev</span>
                            )}

                            {pageList(page, totalPages).map((n) =>
                                typeof n === 'string' ? (
                                    <span key={n} aria-hidden="true" className="px-1 text-muted">…</span>
                                ) : n === page ? (
                                    <span key={n} aria-current="page" className={`${pageBtn} border-navy bg-navy text-white`}>{n}</span>
                                ) : (
                                    <Link key={n} to={pageHref(n)} aria-label={`Page ${n}`} className={`${pageBtn} border-line bg-white text-navy hover:border-gold hover:text-gold`}>{n}</Link>
                                )
                            )}

                            {page < totalPages ? (
                                <Link to={pageHref(page + 1)} rel="next" className={`${navBtn} border-line text-navy hover:border-gold hover:text-gold`}>Next →</Link>
                            ) : (
                                <span aria-disabled="true" className={`${navBtn} border-line text-muted opacity-40`}>Next →</span>
                            )}
                        </nav>
                    )}
                </div>
            </section>
        </>
    );
}
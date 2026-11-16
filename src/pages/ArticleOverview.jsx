import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, deleteDoc, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import PageHero from '../components/PageHero.jsx';
import AdminLogin from '../components/AdminLogin.jsx';
import MetaSEO from '../components/MetaSEO.jsx';
import { formatDate } from '../data.jsx';
import { isAdmin, logoutAdmin } from '../admin/adminAuth';
import { invalidateArticles } from '../hooks/useArticles';
import { collectCloudinaryUrls, deleteCloudinaryImages } from '../utils/articleUtils';

const btn = 'inline-flex h-10 items-center justify-center border px-4 text-[13px] font-semibold uppercase tracking-[.1em] no-underline transition-colors duration-300 disabled:opacity-50';

export default function ArticleOverview() {
    const [authed, setAuthed] = useState(isAdmin());
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [busySlug, setBusySlug] = useState(null);
    const [report, setReport] = useState(null); // { title, failed: string[], total }

    const load = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const snap = await getDocs(collection(db, 'articles'));
            const list = snap.docs.map((d) => {
                const x = d.data();
                return {
                    slug: d.id,
                    title: x.title || d.id,
                    tagName: x.tagName || '',
                    date: x.date || '',
                    excerpt: x.excerpt || '',
                    image: x.image || '',
                    createdAtMs: x.createdAt?.toMillis?.() || 0,
                };
            });
            list.sort((a, b) => b.date.localeCompare(a.date) || b.createdAtMs - a.createdAtMs);
            setArticles(list);
        } catch (e) {
            console.error(e);
            setError('Failed to load articles.');
        } finally {
            setLoading(false);
        }
    }, []);

    // eslint-disable-next-line react-hooks/set-state-in-effect -- load() sets loading state for the admin list
    useEffect(() => { if (authed) load(); }, [authed, load]);

    const remove = async (article) => {
        if (!window.confirm(`Delete "${article.title}"?\n\nIts Cloudinary images will be deleted first, then the article. This cannot be undone.`)) return;
        setBusySlug(article.slug);
        setReport(null);
        try {
            // Read the latest copy of the document to collect every image it uses
            const ref = doc(db, 'articles', article.slug);
            const snap = await getDoc(ref);
            const data = snap.exists() ? snap.data() : {};
            const urls = collectCloudinaryUrls({ image: data.image, bodyHtml: data.bodyHtml });

            // 1. Images first (never throws - returns the ones that failed)
            const failed = await deleteCloudinaryImages(urls);

            // 2. Then the document
            await deleteDoc(ref);
            invalidateArticles();
            setArticles((list) => list.filter((a) => a.slug !== article.slug));
            setReport({ title: article.title, failed, total: urls.length });
        } catch (e) {
            console.error(e);
            setError(`Failed to delete "${article.title}". The article was not removed.`);
        } finally {
            setBusySlug(null);
        }
    };

    const heroProps = {
        crumbs: [{ label: 'Home', to: '/' }, { label: 'Articles', to: '/article/' }, { label: 'Manage articles' }],
        title: 'Manage articles',
        sub: 'View, edit or delete published articles.',
    };

    if (!authed) {
        return (
            <>
                <MetaSEO title="Manage articles" path="/article-overview/" noindex />
                <PageHero {...heroProps} />
                <section className="block-section paper">
                    <div className="wrap"><AdminLogin onSuccess={() => setAuthed(true)} /></div>
                </section>
            </>
        );
    }

    return (
        <>
            <MetaSEO title="Manage articles" path="/article-overview/" noindex />
            <PageHero {...heroProps} />
            <section className="block-section paper">
                <div className="wrap">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <Link to="/add-article/" className={`${btn} border-navy bg-navy text-white hover:text-gold`}>+ Add article</Link>
                        <button type="button" onClick={() => { logoutAdmin(); setAuthed(false); }} className="text-sm font-semibold text-muted hover:text-gold">Sign out</button>
                    </div>

                    {error && <p role="alert" className="mb-6 text-sm font-semibold text-[#a4453a]">{error}</p>}

                    {report && (
                        <div className={`mb-8 border p-5 text-[15px] ${report.failed.length ? 'border-[#a4453a] bg-[#faf0ed]' : 'border-line bg-white'}`} role="status">
                            <p className="font-semibold text-navy">Deleted “{report.title}”.</p>
                            {report.failed.length === 0 ? (
                                <p className="mt-1 text-muted">
                                    {report.total === 0 ? 'It had no Cloudinary images.' : `All ${report.total} Cloudinary image(s) were deleted.`}
                                </p>
                            ) : (
                                <>
                                    <p className="mt-1 text-[#a4453a]">
                                        {report.failed.length} of {report.total} Cloudinary image(s) could not be deleted. Please delete them manually from your Cloudinary media library:
                                    </p>
                                    <ul className="mt-2 list-disc space-y-1 pl-6 break-all">
                                        {report.failed.map((u) => (
                                            <li key={u}><a href={u} target="_blank" rel="noopener noreferrer" className="text-navy underline">{u}</a></li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            <button type="button" onClick={() => setReport(null)} className="mt-3 text-sm font-semibold text-muted hover:text-gold">Dismiss</button>
                        </div>
                    )}

                    {loading ? (
                        <p className="text-center text-muted">Loading articles…</p>
                    ) : articles.length === 0 ? (
                        <p className="text-center text-muted">No articles yet. Use “Add article” to publish the first one.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 min-[701px]:grid-cols-2 min-[1001px]:grid-cols-3">
                            {articles.map((a) => (
                                <article key={a.slug} className="flex flex-col border border-line bg-white">
                                    <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-navy">
                                        {a.image
                                            ? <img src={a.image} alt={a.title} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
                                            : <span className="font-serif text-[22px] uppercase tracking-[.14em] text-gold" aria-hidden="true">{a.tagName}</span>}
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-xs font-semibold uppercase tracking-[.14em] text-gold">{a.tagName}</span>
                                            <time className="text-[13px] text-muted" dateTime={a.date}>{a.date && formatDate(a.date)}</time>
                                        </div>
                                        <h2 className="mt-3 text-[22px] leading-[1.2] text-navy">{a.title}</h2>
                                        <p className="mt-2 line-clamp-3 text-[15px] text-muted">{a.excerpt}</p>

                                        <div className="mt-auto flex flex-wrap gap-2 pt-6">
                                            <a href={`/article/${a.slug}/`} target="_blank" rel="noopener noreferrer" className={`${btn} border-line text-navy hover:border-gold hover:text-gold`}>View</a>
                                            <Link to={`/edit-article/${a.slug}/`} className={`${btn} border-line text-navy hover:border-gold hover:text-gold`}>Edit</Link>
                                            <button
                                                type="button"
                                                onClick={() => remove(a)}
                                                disabled={busySlug !== null}
                                                className={`${btn} border-[#a4453a] text-[#a4453a] hover:bg-[#a4453a] hover:text-white`}
                                            >
                                                {busySlug === a.slug ? 'Deleting…' : 'Delete'}
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
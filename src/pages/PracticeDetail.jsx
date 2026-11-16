import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import PostCard from '../components/PostCard.jsx';
import MetaSEO from '../components/MetaSEO.jsx';
import { Reveal, RevealText } from '../components/Motion.jsx';
import { practiceAreas, site } from '../data.jsx';
import { useArticles } from '../hooks/useArticles';
import { DEFAULT_KEYWORDS, LEGAL_SERVICE_ID, PRACTICE_META, absoluteUrl } from '../seo/siteConfig';
import { breadcrumbSchema, serviceSchema, webPageSchema } from '../seo/schemas';

export default function PracticeDetail() {
    const { slug } = useParams();
    const { posts } = useArticles();
    const area = practiceAreas.find((a) => a.slug === slug);

    if (!area) {
        return (
            <>
                <MetaSEO
                    title="Practice area not found"
                    path={`/practice/${slug || ''}/`}
                    description="The requested practice area could not be found."
                    noindex
                />
                <section className="block-section wrap">
                    <h1 className="text-5xl mb-4">Page not found</h1>
                    <Link to="/practice/" className="text-gold font-semibold">Back to Areas of Practice</Link>
                </section>
            </>
        );
    }

    const related = posts.filter((p) => p.tag === slug).slice(0, 3);
    const path = `/practice/${area.slug}/`;
    const meta = PRACTICE_META[area.slug] || {};
    const keywords = meta.keywords?.length
        ? [...meta.keywords, 'Adv. Sanjay Achhra', 'Mumbai advocate']
        : [...DEFAULT_KEYWORDS.slice(0, 8), area.title, 'advocate Mumbai'];
    const focusedKeyword = meta.focusedKeyword || `${area.title} advocate in Mumbai`;
    const description = `${area.excerpt} Adv. Sanjay Achhra, Advocate, High Court, Mumbai.`;

    const breadcrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Areas of Practice', path: '/practice/' },
        { name: area.title, path },
    ];
    const page = webPageSchema({
        path,
        name: `${area.title} — Advocate in Mumbai`,
        description,
        keywords,
        about: { '@id': LEGAL_SERVICE_ID },
        mainEntity: { '@id': `${absoluteUrl(path)}#service` },
        breadcrumbs,
        speakable: true,
    });
    const service = serviceSchema({
        path,
        name: area.title,
        description,
        keywords,
    });

    return (
        <>
            <MetaSEO
                title={`${area.title} Advocate in Mumbai`}
                description={description}
                path={path}
                keywords={keywords}
                focusedKeyword={focusedKeyword}
                jsonLd={[page, service, breadcrumbSchema(breadcrumbs)]}
            />

            <PageHero
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Areas of Practice', to: '/practice/' }, { label: area.title }]}
                title={area.title}
                sub={area.excerpt}
            />

            <div className="wrap grid grid-cols-1 items-start gap-0 min-[901px]:grid-cols-[minmax(0,1fr)_320px] min-[901px]:gap-14">
                <Reveal as="article" delay={0.2} className="prose-body pt-16 pb-10" aria-label={`${area.title} — overview`}>
                    <p>{area.excerpt}</p>
                    {area.body}
                    <div className="bg-cream border border-line px-6 py-5 text-[14.5px] text-[#4b5a61] my-10">
                        <strong>Note:</strong> This page describes areas of practice as permitted under Rule 36 of the Bar Council of India Rules. It is for information only and is not legal advice or a solicitation of work.
                    </div>
                </Reveal>

                <aside className="flex flex-col gap-5 pt-0 pb-10 min-[901px]:sticky min-[901px]:top-[110px] min-[901px]:pt-16" aria-label="Practice areas and contact details">
                    <Reveal variant="right" delay={0.3} className="border border-line bg-white p-6">
                        <div className="eyebrow">Areas of Practice</div>
                        <nav aria-label="All areas of practice">
                            <ul className="mt-3 list-none">
                                {practiceAreas.map((a) => (
                                    <li key={a.slug} className="border-b border-line last:border-0">
                                        <Link to={`/practice/${a.slug}/`} className={`block py-2.5 text-[15px] no-underline transition-all duration-300 hover:translate-x-1.5 hover:text-gold ${a.slug === slug ? 'text-gold' : 'text-navy'}`}>{a.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </Reveal>
                    <Reveal variant="right" delay={0.45} className="border border-navy bg-navy p-6 text-[14.5px] text-[#c8d5da]">
                        <div className="eyebrow">Sanjay Achhra Law Chambers</div>
                        <address className="mt-2.5 not-italic">{site.officeAddress}</address>
                        <p className="mt-2.5">
                            <a className="text-white no-underline" href={`tel:${site.phone}`}>{site.phone}</a><br />
                            <a className="text-white no-underline" href={`mailto:${site.email}`}>{site.email}</a>
                        </p>
                    </Reveal>
                </aside>
            </div>

            {related.length > 0 && (
                <section className="block-section bg-cream" aria-label={`Articles about ${area.title}`}>
                    <div className="wrap">
                        <div className="mb-[50px] flex flex-wrap items-end justify-between gap-10">
                            <div>
                                <Reveal variant="fade" className="eyebrow">Insights</Reveal>
                                <RevealText as="h2" className="h2" delay={0.1}>Related articles</RevealText>
                            </div>
                            <Reveal delay={0.3}><Link className="btn btn-dark" to="/article/">All articles</Link></Reveal>
                        </div>
                        <div className="grid grid-cols-1 gap-8 min-[701px]:grid-cols-2 min-[1001px]:grid-cols-3">
                            {related.map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

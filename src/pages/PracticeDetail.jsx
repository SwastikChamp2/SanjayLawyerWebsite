import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import PostCard from '../components/PostCard.jsx';
import { Reveal, RevealText } from '../components/Motion.jsx';
import { practiceAreas, posts, site } from '../data.jsx';

export default function PracticeDetail() {
    const { slug } = useParams();
    const area = practiceAreas.find((a) => a.slug === slug);

    if (!area) {
        return (
            <section className="block-section wrap">
                <h1 className="text-5xl mb-4">Page not found</h1>
                <Link to="/practice/" className="text-gold font-semibold">Back to Areas of Practice</Link>
            </section>
        );
    }

    const related = posts.filter((p) => p.tag === slug).slice(0, 3);

    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Areas of Practice', to: '/practice/' }, { label: area.title }]}
                title={area.title}
                sub={area.excerpt}
            />

            <div className="wrap grid grid-cols-1 items-start gap-0 min-[901px]:grid-cols-[minmax(0,1fr)_320px] min-[901px]:gap-14">
                <Reveal as="article" delay={0.2} className="prose-body pt-16 pb-10">
                    {/* Replace with the page body for this area (was Ghost {{content}}) */}
                    <p>{area.excerpt}</p>
                    <h2>Scope of work</h2>
                    <p>Detailed description of this area of practice goes here.</p>
                    <div className="bg-cream border border-line px-6 py-5 text-[14.5px] text-[#4b5a61] my-10">
                        <strong>Note:</strong> This page describes areas of practice as permitted under Rule 36 of the Bar Council of India Rules. It is for information only and is not legal advice or a solicitation of work.
                    </div>
                </Reveal>

                <aside className="flex flex-col gap-5 pt-0 pb-10 min-[901px]:sticky min-[901px]:top-[110px] min-[901px]:pt-16">
                    <Reveal variant="right" delay={0.3} className="border border-line bg-white p-6">
                        <div className="eyebrow">Areas of Practice</div>
                        <ul className="mt-3 list-none">
                            {practiceAreas.map((a) => (
                                <li key={a.slug} className="border-b border-line last:border-0">
                                    <Link to={`/practice/${a.slug}/`} className={`block py-2.5 text-[15px] no-underline transition-all duration-300 hover:translate-x-1.5 hover:text-gold ${a.slug === slug ? 'text-gold' : 'text-navy'}`}>{a.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal variant="right" delay={0.45} className="border border-navy bg-navy p-6 text-[14.5px] text-[#c8d5da]">
                        <div className="eyebrow">Chambers</div>
                        <p className="mt-2.5">{site.officeAddress}</p>
                        <p className="mt-2.5">
                            <a className="text-white no-underline" href={`tel:${site.phone}`}>{site.phone}</a><br />
                            <a className="text-white no-underline" href={`mailto:${site.email}`}>{site.email}</a>
                        </p>
                    </Reveal>
                </aside>
            </div>


        </>
    );
}
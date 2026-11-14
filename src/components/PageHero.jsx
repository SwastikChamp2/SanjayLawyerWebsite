import { Link } from 'react-router-dom';
import { Reveal, RevealText } from './Motion.jsx';

// Inner-page hero with breadcrumbs. crumbs = [{label, to?}] (last one has no `to`)
export default function PageHero({ crumbs, title, sub }) {
    return (
        <section className="page-hero relative overflow-hidden bg-navy text-white pt-20 pb-[70px]">
            <div className="wrap relative z-[1]">
                <Reveal as="nav" variant="fade" delay={0.1} className="text-[13px] tracking-[.06em] text-[#9fb2ba] mb-3.5" aria-label="Breadcrumb">
                    {crumbs.map((c, i) => (
                        <span key={c.label}>
                            {i > 0 && ' / '}
                            {c.to ? <Link to={c.to} className="text-gold no-underline">{c.label}</Link> : <span>{c.label}</span>}
                        </span>
                    ))}
                </Reveal>
                <RevealText as="h1" delay={0.2} className="!text-white text-[clamp(38px,5vw,58px)] mt-4 mb-[22px]">{title}</RevealText>
                {sub && <Reveal as="p" delay={0.6} className="text-lg text-[#c8d5da] max-w-[640px] mt-3.5">{sub}</Reveal>}
            </div>
        </section>
    );
}
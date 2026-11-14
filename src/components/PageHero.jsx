import { Link } from 'react-router-dom';

// Inner-page hero with breadcrumbs. crumbs = [{label, to?}] (last one has no `to`)
export default function PageHero({ crumbs, title, sub }) {
    return (
        <section className="page-hero relative overflow-hidden bg-navy text-white pt-20 pb-[70px]">
            <div className="wrap relative z-[1]">
                <nav className="text-[13px] tracking-[.06em] text-[#9fb2ba] mb-3.5" aria-label="Breadcrumb">
                    {crumbs.map((c, i) => (
                        <span key={c.label}>
                            {i > 0 && ' / '}
                            {c.to ? <Link to={c.to} className="text-gold no-underline">{c.label}</Link> : <span>{c.label}</span>}
                        </span>
                    ))}
                </nav>
                <h1 className="!text-white text-[clamp(38px,5vw,58px)] mt-4 mb-[22px]">{title}</h1>
                {sub && <p className="text-lg text-[#c8d5da] max-w-[640px] mt-3.5">{sub}</p>}
            </div>
        </section>
    );
}
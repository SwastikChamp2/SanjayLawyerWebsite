import { Link } from 'react-router-dom';
import MetaSEO from '../components/MetaSEO.jsx';
import { Reveal } from '../components/Motion.jsx';

const links = [
    { label: 'Areas of practice', to: '/practice/' },
    { label: 'Articles', to: '/article/' },
    { label: 'Approach', to: '/approach/' },
    { label: 'Publications', to: '/publications/' },
    { label: 'Contact the Chambers', to: '/#contact' },
];

export default function NotFound() {
    return (
        <>
            <MetaSEO
                title="Page not found"
                description="The page you requested could not be found on sanjayachhra.com."
                path="/404/"
                noindex
            />
            <section className="block-section wrap" aria-label="Page not found">
                <Reveal as="p" variant="fade" className="eyebrow">404</Reveal>
                <h1 className="mt-3 text-[clamp(38px,5vw,58px)]">Page not found</h1>
                <p className="mt-4 max-w-[620px] text-muted">
                    The page you requested does not exist, or its address has changed. The links below lead to the main
                    sections of the site.
                </p>
                <ul className="mt-10 grid list-none gap-3 border-t border-line pt-8 min-[601px]:grid-cols-2">
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link to={link.to} className="font-semibold text-navy underline decoration-gold underline-offset-4 hover:text-gold">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { site, footerNav, images } from '../data.jsx';
import { Reveal, ease } from './Motion.jsx';

export default function Footer() {
    const lenis = useLenis();
    const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.8 }) : window.scrollTo({ top: 0, behavior: 'smooth' }));

    return (
        <footer className="relative bg-navy-deep text-[#9fb2ba] text-sm pt-[46px] pb-[34px]">
            {/* gold line draws across the top */}
            <motion.div
                className="absolute inset-x-0 top-0 h-px origin-left bg-gold/50"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease }}
            />
            <div className="wrap">
                <Reveal className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-3.5">
                        <img src={images.monogram} alt="" aria-hidden="true" className="size-[38px]" />
                        <span className="font-serif text-white text-xl font-semibold tracking-[.04em] leading-none">
                            SANJAY ACHHRA <span className="ml-2 font-sans text-[10.5px] tracking-[.3em] uppercase text-gold">Law Chambers</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <nav aria-label="Footer" className="flex gap-[22px]">
                            {footerNav.map((n) => (
                                <Link key={n.label} to={n.to} className="relative text-[#cfdade] no-underline after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 hover:after:w-full">{n.label}</Link>
                            ))}
                        </nav>
                        <button
                            onClick={toTop}
                            aria-label="Back to top"
                            className="grid size-11 cursor-pointer place-items-center rounded-full border border-gold/60 bg-transparent text-gold transition duration-500 hover:-translate-y-1 hover:bg-gold hover:text-navy-deep"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                        </button>
                    </div>
                </Reveal>
                <Reveal delay={0.15} variant="fade">
                    <p className="mt-6 text-[12.5px] leading-[1.6] text-[#7f959e] max-w-[900px]">
                        Adv. Sanjay N. Achhra · Enrolment No. {site.enrolment} · Bar Council of Maharashtra &amp; Goa. This website is for information only, in accordance with Rule 36 of the Bar Council of India Rules, and does not constitute advertisement, solicitation or legal advice. © {new Date().getFullYear()} Sanjay Achhra Law Chambers.
                    </p>
                </Reveal>
            </div>
        </footer>
    );
}
import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { site, nav, footerNav } from '../data.jsx';

export default function Layout() {
    const { pathname, hash } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [gateOpen, setGateOpen] = useState(() => {
        try { return !localStorage.getItem('sa-disclaimer-ack'); } catch { return true; }
    });

    // On every route change: close menu, scroll to hash/top, (re)attach scroll-reveal
    useEffect(() => {
        setMenuOpen(false);
        if (hash) document.querySelector(hash)?.scrollIntoView();
        else window.scrollTo(0, 0);

        document.documentElement.classList.add('js-reveal');
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            }),
            { threshold: 0.12 }
        );
        document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [pathname, hash]);

    const acceptGate = () => {
        try { localStorage.setItem('sa-disclaimer-ack', '1'); } catch { }
        setGateOpen(false);
    };

    return (
        <>
            <a href="#main" className="absolute left-3 -top-[60px] z-[200] bg-gold text-navy-deep px-4 py-2.5 font-semibold no-underline focus:top-3">Skip to content</a>

            {site.showPreviewRibbon && (
                <div className="bg-gold text-navy-deep text-center text-[13px] py-[7px] px-3 font-semibold tracking-[.03em]">
                    Preview draft for Adv. Sanjay Achhra · content to be reviewed and approved before going live
                </div>
            )}

            {/* Disclaimer gate */}
            {gateOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-[rgba(8,28,38,.86)] backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="gate-title">
                    <div className="w-full max-w-[640px] max-h-[90vh] overflow-auto bg-paper border-t-4 border-gold px-[22px] py-[30px] min-[561px]:px-11 min-[561px]:pt-11 min-[561px]:pb-9">
                        <img src="https://sanjay.178-105-212-85.sslip.io/assets/images/monogram.svg" alt="" className="w-14 mb-[18px]" />
                        <div id="gate-title" className="font-serif font-semibold text-navy leading-[1.1] text-[34px] mb-3.5">Disclaimer</div>
                        <p className="text-[14.5px] text-[#3c4c54] mb-3">The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner. By accessing this website, you acknowledge that you are seeking information relating to Adv. Sanjay Achhra of your own accord and that there has been no advertisement, personal communication, solicitation, invitation or inducement of any sort whatsoever from him or his chambers to solicit any work through this website.</p>
                        <p className="text-[14.5px] text-[#3c4c54] mb-3">The content of this website is for information only and should not be interpreted as legal advice. No lawyer-client relationship is created by use of this website.</p>
                        <div className="flex flex-wrap gap-3 mt-6">
                            <button className="btn btn-solid !bg-navy !text-white !border-navy" onClick={acceptGate}>I Agree</button>
                            <a className="btn btn-dark" href="https://www.google.com">Decline</a>
                        </div>
                    </div>
                </div>
            )}

            {/* Top bar */}
            <div className="bg-navy-deep text-[#9fb2ba] text-[12.5px] tracking-[.06em] border-b border-gold/20">
                <div className="wrap flex justify-between gap-4 py-2 max-[700px]:justify-center">
                    <span className="max-[700px]:hidden">Advocate, High Court · Enrolment No. {site.enrolment} · Bar Council of Maharashtra &amp; Goa</span>
                    <a href={`tel:${site.phone}`} className="text-gold no-underline whitespace-nowrap">{site.phone}</a>
                </div>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-40 bg-navy-deep/[.97] backdrop-blur-sm border-b border-gold/25">
                <div className="wrap flex items-center justify-between h-[78px]">
                    <Link to="/" className="flex items-center gap-3.5 no-underline">
                        <img src="https://sanjay.178-105-212-85.sslip.io/assets/images/monogram.svg" alt="SA monogram" width="46" height="46" className="size-[46px]" />
                        <span>
                            <span className="font-serif text-white text-2xl font-semibold tracking-[.04em] leading-none">SANJAY ACHHRA</span>
                            <span className="block text-[10.5px] tracking-[.3em] uppercase text-gold mt-1.5">Law Chambers</span>
                        </span>
                    </Link>

                    <nav id="site-nav" aria-label="Main"
                        className={`${menuOpen ? 'flex' : 'hidden'} absolute top-[78px] inset-x-0 flex-col bg-navy-deep px-6 pt-2 pb-5 min-[901px]:static min-[901px]:flex min-[901px]:flex-row min-[901px]:gap-[34px] min-[901px]:bg-transparent min-[901px]:p-0`}>
                        {nav.map((n) => (
                            <Link key={n.label} to={n.to}
                                className="relative py-3.5 border-b border-white/10 text-sm tracking-[.06em] text-[#dfe7ea] no-underline min-[901px]:py-1.5 min-[901px]:border-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full">
                                {n.label}
                            </Link>
                        ))}
                    </nav>

                    <button className="min-[901px]:hidden bg-transparent border-0 text-white text-[26px] cursor-pointer" aria-label="Open menu" aria-controls="site-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>☰</button>
                </div>
            </header>

            <main id="main"><Outlet /></main>

            {/* Footer */}
            <footer className="bg-navy-deep text-[#9fb2ba] text-sm pt-[46px] pb-[34px] border-t border-gold/25">
                <div className="wrap">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-3.5">
                            <img src="https://sanjay.178-105-212-85.sslip.io/assets/images/monogram.svg" alt="" aria-hidden="true" className="size-[38px]" />
                            <span className="font-serif text-white text-xl font-semibold tracking-[.04em] leading-none">
                                SANJAY ACHHRA <span className="ml-2 font-sans text-[10.5px] tracking-[.3em] uppercase text-gold">Law Chambers</span>
                            </span>
                        </div>
                        <nav aria-label="Footer">
                            {footerNav.map((n) => <Link key={n.label} to={n.to} className="ml-[22px] text-[#cfdade] no-underline">{n.label}</Link>)}
                        </nav>
                    </div>
                    <p className="mt-6 text-[12.5px] leading-[1.6] text-[#7f959e] max-w-[900px]">
                        Adv. Sanjay N. Achhra · Enrolment No. {site.enrolment} · Bar Council of Maharashtra &amp; Goa. This website is for information only, in accordance with Rule 36 of the Bar Council of India Rules, and does not constitute advertisement, solicitation or legal advice. © {new Date().getFullYear()} Sanjay Achhra Law Chambers.
                    </p>
                </div>
            </footer>
        </>
    );
}
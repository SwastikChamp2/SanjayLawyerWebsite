import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { site, nav, images } from '../data.jsx';
import { ease } from './Motion.jsx';

const linkClass =
    "relative text-sm tracking-[.06em] text-[#dfe7ea] no-underline after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-500 hover:text-white hover:after:w-full";

export default function Header() {
    const { key } = useLocation();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY, scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

    useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));
    useEffect(() => { setOpen(false); }, [key]);

    return (
        <>
            {/* Top bar */}
            <div className="bg-navy-deep text-[#9fb2ba] text-[12.5px] tracking-[.06em] border-b border-gold/20">
                <div className="wrap flex justify-between gap-4 py-2 max-[700px]:justify-center">
                    <span className="max-[700px]:hidden">Advocate, High Court · Enrolment No. {site.enrolment} · Bar Council of Maharashtra &amp; Goa</span>
                    <a href={`tel:${site.phone}`} className="text-gold no-underline whitespace-nowrap">{site.phone}</a>
                </div>
            </div>

            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease }}
                className={`sticky top-0 z-40 border-b border-gold/25 backdrop-blur-md transition-[background-color,box-shadow] duration-500 ${scrolled ? 'bg-navy-deep/[.97] shadow-[0_10px_30px_-18px_rgba(0,0,0,.6)]' : 'bg-navy-deep/90'
                    }`}
            >
                <div className={`wrap flex items-center justify-between transition-[height] duration-500 ${scrolled ? 'h-16' : 'h-[78px]'}`}>
                    <Link to="/" className="group flex items-center gap-3.5 no-underline">
                        <img
                            src={images.monogram}
                            alt="SA monogram"
                            width="46"
                            height="46"
                            className={`transition-all duration-700 group-hover:rotate-[8deg] ${scrolled ? 'size-10' : 'size-[46px]'}`}
                        />
                        <span>
                            <span className="font-serif text-white text-2xl font-semibold tracking-[.04em] leading-none">SANJAY ACHHRA</span>
                            <span className="block text-[10.5px] tracking-[.3em] uppercase text-gold mt-1.5">Law Chambers</span>
                        </span>
                    </Link>

                    <nav aria-label="Main" className="hidden min-[901px]:flex gap-[34px]">
                        {nav.map((n) => <Link key={n.label} to={n.to} className={linkClass}>{n.label}</Link>)}
                    </nav>

                    <button
                        className="min-[901px]:hidden bg-transparent border-0 text-white text-[26px] cursor-pointer"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-controls="mobile-nav"
                        aria-expanded={open}
                        onClick={() => setOpen((o) => !o)}
                    >
                        {open ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {open && (
                        <motion.nav
                            id="mobile-nav"
                            aria-label="Mobile"
                            className="absolute top-full inset-x-0 overflow-hidden border-b border-gold/25 bg-navy-deep min-[901px]:hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease }}
                        >
                            <div className="flex flex-col px-6 pt-2 pb-5">
                                {nav.map((n, i) => (
                                    <motion.div key={n.label} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease }}>
                                        <Link to={n.to} className="block border-b border-white/10 py-3.5 text-sm tracking-[.06em] text-[#dfe7ea] no-underline">{n.label}</Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>

                {/* Scroll progress */}
                <motion.div style={{ scaleX: progress }} className="absolute -bottom-px left-0 h-0.5 w-full origin-left bg-gold" />
            </motion.header>
        </>
    );
}
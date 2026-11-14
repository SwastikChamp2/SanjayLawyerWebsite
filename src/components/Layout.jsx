import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { ease } from './Motion.jsx';
import { site, images } from '../data.jsx';

function Shell() {
    const { pathname, hash, key } = useLocation();
    const lenis = useLenis();
    const [gateOpen, setGateOpen] = useState(() => {
        try { return !localStorage.getItem('sa-disclaimer-ack'); } catch { return true; }
    });

    // Route change: scroll to #hash (offset for sticky header) or to top
    useEffect(() => {
        if (hash) {
            const el = document.querySelector(hash);
            if (el) { lenis ? lenis.scrollTo(el, { offset: -96, duration: 1.6 }) : el.scrollIntoView(); return; }
        }
        lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
    }, [key, lenis]);

    // Freeze page scroll while the disclaimer is open
    useEffect(() => {
        if (!lenis) return;
        gateOpen ? lenis.stop() : lenis.start();
    }, [gateOpen, lenis]);

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
            <AnimatePresence>
                {gateOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-[rgba(8,28,38,.86)] backdrop-blur-sm"
                        role="dialog" aria-modal="true" aria-labelledby="gate-title"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}
                    >
                        <motion.div
                            data-lenis-prevent
                            className="w-full max-w-[640px] max-h-[90vh] overflow-auto bg-paper border-t-4 border-gold px-[22px] py-[30px] min-[561px]:px-11 min-[561px]:pt-11 min-[561px]:pb-9"
                            initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }}
                            transition={{ duration: 0.8, ease, delay: 0.1 }}
                        >
                            <img src={images.monogram} alt="" className="w-14 mb-[18px]" />
                            <div id="gate-title" className="font-serif font-semibold text-navy leading-[1.1] text-[34px] mb-3.5">Disclaimer</div>
                            <p className="text-[14.5px] text-[#3c4c54] mb-3">The Bar Council of India does not permit advertisement or solicitation by advocates in any form or manner. By accessing this website, you acknowledge that you are seeking information relating to Adv. Sanjay Achhra of your own accord and that there has been no advertisement, personal communication, solicitation, invitation or inducement of any sort whatsoever from him or his chambers to solicit any work through this website.</p>
                            <p className="text-[14.5px] text-[#3c4c54] mb-3">The content of this website is for information only and should not be interpreted as legal advice. No lawyer-client relationship is created by use of this website.</p>
                            <div className="flex flex-wrap gap-3 mt-6">
                                <button className="btn btn-solid !bg-navy !text-white !border-navy" onClick={acceptGate}>I Agree</button>
                                <a className="btn btn-dark" href="https://www.google.com">Decline</a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Header />

            <motion.main id="main" key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease }}>
                <Outlet />
            </motion.main>

            <Footer />
        </>
    );
}

export default function Layout() {
    const reduce = useReducedMotion();
    return (
        <MotionConfig reducedMotion="user">
            <ReactLenis root options={{ lerp: 0.09, smoothWheel: !reduce }}>
                <Shell />
            </ReactLenis>
        </MotionConfig>
    );
}
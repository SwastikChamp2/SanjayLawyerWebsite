import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import PracticeCards from '../components/PracticeCards.jsx';
import PostCard from '../components/PostCard.jsx';
import Contact from '../components/Contact.jsx';
import MetaSEO from '../components/MetaSEO.jsx';
import { Counter, Magnetic, Reveal, RevealText, Rule, ease } from '../components/Motion.jsx';
import { site, images } from '../data.jsx';
import { useArticles } from '../hooks/useArticles';
import {
    DEFAULT_DESCRIPTION,
    DEFAULT_KEYWORDS,
    LEGAL_SERVICE_ID,
    SITE_TITLE,
} from '../seo/siteConfig';
import { webPageSchema } from '../seo/schemas';

const timeline = [
    ['1999', 'Joined the Income Tax Department', 'Mumbai'],
    ['2000', 'B.Com.', 'University of Mumbai'],
    ['2007', 'LL.B.', 'University of Mumbai'],
    ['2011', 'Diploma in Cyber Law', 'Asian School of Cyber Laws'],
    ['2024', 'LL.M.', 'University of Mumbai'],
    ['2026', 'Enrolled as Advocate', `Bar Council of Maharashtra & Goa · ${site.enrolment}`],
    ['Now', 'Research Scholar, Ph.D. in Law', 'University of Mumbai'],
];

const creds = [
    ['1999 – 2026', 'Income Tax Department'],
    ['LL.M.', 'University of Mumbai'],
    ['C.S.', 'Executive, ICSI'],
    ['Cyber Law', 'Diploma, ASCL'],
    ['Ph.D.', 'Research Scholar, Law'],
];

const numbers = [
    [27, <>Years of service in the<br />Income Tax Department</>],
    [8, <>Departmental wings<br />served in</>],
    [5, <>Academic and professional<br />qualifications</>],
    [7, <>Research papers, chapters<br />and dissertations</>],
];

const pubs = [
    ['Ph.D. Proposal', 'Critical Evaluation of Adjudication Process of Income Tax Disputes under Income Tax Authorities in Maharashtra', 'Approved by the Research Advisory Committee, University of Mumbai'],
    ['Published Paper', 'Analysis of Criminal Prosecution Under the Income Tax Law in India', 'Indian Journal of Law and Legal Research'],
    ['LL.M. Dissertation', 'A Study on Prosecution launched under the provisions of the Income Tax Act, 1961'],
    ['LL.M. Project', 'A Study on Cyber Crimes with Special Reference to Banking Transactions', 'Awarded the highest marks'],
    ['Conference Paper', 'AI-Generated Works and the Copyright Challenge of Ownership', 'Online Global Conference, DTSS College, Mumbai'],
    ['Seminar Paper', 'Gender Neutral Laws in India: Equality in Theory, Challenges in Practice'],
    ['Seminar Paper', 'Live-in Relationship and Non-Traditional Families: Law, Morality and Social Change', 'KC Law College, Mumbai'],
    ['Book Chapter', 'The Role of Awareness in Promoting Human Rights in the Digital Era'],
];

const scalesPaths = [
    'M100 30v140M70 170h60M40 60h120M100 30l-4 6h8z',
    'M40 60 22 112h36zM160 60l-18 52h36z',
    'M22 112a18 9 0 0 0 36 0M142 112a18 9 0 0 0 36 0',
];


// Soft, slow entrance used only in the hero
const soft = (delay = 0, y = 14) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.5, ease, delay },
});

const sectionHead = 'mb-[50px] flex flex-wrap items-end justify-between gap-10';
const goldText = 'w-fit pb-[.1em] text-transparent bg-clip-text bg-[linear-gradient(100deg,#b8955a_0%,#e6cf9f_25%,#b8955a_50%,#e6cf9f_75%,#b8955a_100%)] bg-[length:200%_100%] animate-shimmer';

export default function Home() {
    const { posts: latestPosts } = useArticles();

    // Hero parallax
    const heroRef = useRef(null);
    const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const textY = useTransform(heroP, [0, 1], [0, -60]);
    const portraitY = useTransform(heroP, [0, 1], [0, 70]);
    const markY = useTransform(heroP, [0, 1], [0, -120]);

    // Timeline line that fills as you scroll
    const tlRef = useRef(null);
    const { scrollYProgress: tlP } = useScroll({ target: tlRef, offset: ['start 75%', 'end 65%'] });
    const tlScale = useSpring(tlP, { stiffness: 80, damping: 25 });

    // Scales-of-justice drift
    const quoteRef = useRef(null);
    const { scrollYProgress: qP } = useScroll({ target: quoteRef, offset: ['start end', 'end start'] });
    const scalesY = useTransform(qP, [0, 1], [60, -60]);

    const homeSchema = webPageSchema({
        path: '/',
        name: 'Adv. Sanjay Achhra — Advocate, High Court, Mumbai',
        description: DEFAULT_DESCRIPTION,
        keywords: DEFAULT_KEYWORDS,
        about: { '@id': LEGAL_SERVICE_ID },
        mainEntity: { '@id': LEGAL_SERVICE_ID },
        speakable: true,
    });

    return (
        <>
            <MetaSEO
                title={SITE_TITLE}
                absoluteTitle
                description={DEFAULT_DESCRIPTION}
                path="/"
                keywords={DEFAULT_KEYWORDS}
                focusedKeyword="advocate High Court Mumbai"
                jsonLd={[homeSchema]}
            />

            {/* Hero */}
            <section ref={heroRef} aria-label="Introduction" className="hero relative overflow-hidden bg-navy text-white">
                <motion.img style={{ y: markY }} className="pointer-events-none absolute -left-[90px] -bottom-[120px] z-0 w-[460px] opacity-[.06] max-[900px]:hidden" src={images.monogram} alt="" aria-hidden="true" />
                <div className="wrap relative z-[1] grid grid-cols-1 items-center gap-10 py-[70px] max-[900px]:pt-12 min-[901px]:min-h-[620px] min-[901px]:grid-cols-[1.15fr_.85fr]">
                    <motion.div style={{ y: textY }}>
                        <motion.div {...soft(0.5, 0)} className="eyebrow flex items-center gap-3">
                            <motion.span aria-hidden="true" className="h-px bg-gold" initial={{ width: 0 }} animate={{ width: 40 }} transition={{ duration: 1.6, ease, delay: 0.5 }} />
                            Advocate, High Court · Mumbai
                        </motion.div>

                        <motion.h1
                            className={`mt-[18px] mb-1.5 text-[clamp(54px,7.2vw,92px)] ${goldText}`}
                            initial={{ opacity: 0, y: 12, filter: 'blur(10px)', letterSpacing: '.08em' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '.01em' }}
                            transition={{ duration: 2, ease, delay: 0.7 }}
                        >
                            Sanjay Achhra
                        </motion.h1>

                        <motion.div {...soft(1.3)} className="font-serif italic text-[clamp(22px,2.4vw,28px)] text-[#e9e1d1]">Sanjay Achhra Law Chambers, Mulund</motion.div>
                        <motion.p {...soft(1.5)} className="max-w-[520px] mt-7 mb-9 text-lg text-[#c8d5da]">Practising in direct-tax litigation and allied laws, after a 27-year career with the Income Tax Department, Mumbai.</motion.p>
                        <motion.p {...soft(1.65)} className="text-[15px] tracking-[.02em] text-white/90">B.Com. · LL.B. · LL.M. · C.S. (Executive) · Diploma in Cyber Law · Research Scholar (Ph.D. in Law)</motion.p>
                        <motion.div {...soft(1.85)} className="mt-[34px] flex flex-wrap gap-3.5">
                            <Magnetic><Link className="btn btn-solid" to="/#about">About the Chambers</Link></Magnetic>
                            <Magnetic><Link className="btn" to="/article/">Read Insights</Link></Magnetic>
                        </motion.div>
                    </motion.div>

                    <motion.div style={{ y: portraitY }} className="relative justify-self-center w-[min(380px,100%)] max-[900px]:order-first max-[900px]:w-60">
                        {/* offset gold outline: fades in late and drifts out slowly */}
                        <motion.div
                            aria-hidden="true"
                            className="absolute inset-0 rounded-[200px_200px_6px_6px] border border-gold/50"
                            initial={{ opacity: 0, x: 0, y: 0 }}
                            animate={{ opacity: 1, x: 14, y: 14 }}
                            transition={{ duration: 2.2, ease, delay: 1 }}
                        />
                        {/* portrait: simple slow fade, image settles inward */}
                        <motion.div
                            className="relative overflow-hidden rounded-[200px_200px_6px_6px] border border-gold bg-white p-2.5 shadow-[0_30px_60px_-30px_rgba(0,0,0,.45)]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.8, ease, delay: 0.2 }}
                        >
                            <motion.img
                                className="w-full aspect-[3/4] object-cover object-top rounded-[190px_190px_2px_2px]"
                                src={images.portrait} alt="Adv. Sanjay Achhra, Advocate, High Court, Mumbai" width="709" height="945" fetchPriority="high"
                                initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.8, ease, delay: 0.2 }}
                            />
                        </motion.div>
                        {/* badge: soft fade, then keeps its gentle float */}
                        <motion.div
                            className="absolute left-[-48px] bottom-[34px] max-[900px]:left-auto max-[900px]:right-[-40px] max-[900px]:bottom-2.5"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.4, ease, delay: 1.5 }}
                        >
                            <div className="flex items-center gap-3 border border-gold bg-navy-deep px-[18px] py-3.5 text-white animate-float max-[900px]:px-3 max-[900px]:py-2.5">
                                <b className="font-serif text-[40px] leading-none font-semibold text-gold max-[900px]:text-[30px]">27</b>
                                <span className="text-[12.5px] leading-[1.35] tracking-[.03em] text-[#d6dfe2]">years with the<br />Income Tax Department</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

            </section>

            {/* Credentials strip */}
            <section aria-label="Qualifications and experience" className="border-t border-gold/35 bg-navy-deep text-[#d8e1e4]">
                <ul className="wrap grid list-none grid-cols-2 min-[901px]:grid-cols-5">
                    {creds.map(([a, b], i) => (
                        <Reveal as="li" key={a} delay={i * 0.1} className="border-b border-r border-gold/20 px-[18px] py-[26px] text-center text-[13.5px] tracking-[.04em] min-[901px]:border-b-0 min-[901px]:last:border-r-0">
                            <strong className="mb-0.5 block font-serif text-[22px] font-semibold tracking-normal text-gold">{a}</strong>{b}
                        </Reveal>
                    ))}
                </ul>
            </section>

            {/* About */}
            <section className="block-section paper" id="about" aria-label="About Adv. Sanjay Achhra">
                <div className="wrap grid grid-cols-1 items-start gap-10 min-[901px]:grid-cols-[.9fr_1.1fr] min-[901px]:gap-20">
                    <div>
                        <Reveal variant="fade" className="eyebrow">About</Reveal>
                        <RevealText as="h2" className="h2" delay={0.1}>From the Department to the Bar</RevealText>
                        <Rule />
                        <Reveal delay={0.3} className="[&>p]:mb-[18px] [&>p]:text-[#33434b] [&>p:first-child]:font-serif [&>p:first-child]:text-[26px] [&>p:first-child]:leading-[1.4] [&>p:first-child]:text-navy">
                            {/* Replace with "about" page content (was Ghost {{#get "pages" filter="slug:about"}}) */}
                            <p>After 27 years with the Income Tax Department, Mumbai, Adv. Sanjay Achhra now practises before the tax tribunals and the Bombay High Court.</p>
                            <p>Add the fuller profile text here.</p>
                        </Reveal>
                    </div>
                    <ol ref={tlRef} className="relative list-none pl-[30px]">
                        <span className="absolute left-0 top-0 h-full w-px bg-gold/25" aria-hidden="true" />
                        <motion.span style={{ scaleY: tlScale }} className="absolute left-0 top-0 h-full w-px origin-top bg-gold" aria-hidden="true" />
                        {timeline.map(([yr, what, where]) => (
                            <Reveal as="li" variant="left" key={yr + what} className="relative pb-7">
                                <motion.span
                                    className="absolute -left-9 top-[7px] size-[11px] rounded-full border-2 border-gold bg-paper"
                                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.2 }}
                                />
                                <div className="font-serif text-[22px] font-semibold text-gold">{yr}</div>
                                <div className="font-semibold text-navy">{what}</div>
                                <div className="text-[15px] text-muted">{where}</div>
                            </Reveal>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Quote band */}
            <section ref={quoteRef} className="relative overflow-hidden bg-navy py-24 text-center text-white" aria-label="Legal maxim">
                <motion.svg style={{ y: scalesY }} className="absolute right-[6%] top-1/2 w-[260px] -translate-y-1/2 text-gold opacity-[.2]" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
                    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        {scalesPaths.map((d, i) => (
                            <motion.path key={i} d={d}
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: '-20%' }}
                                transition={{ duration: 2.4, ease, delay: i * 0.3 }} />
                        ))}
                    </g>
                </motion.svg>
                <div className="wrap quote-lines">
                    <RevealText as="p" delay={0.2} stagger={0.15} className="font-serif italic text-[clamp(34px,5vw,58px)] leading-[1.15] text-gold">Ubi jus, ibi remedium.</RevealText>
                    <Reveal as="span" variant="fade" delay={1} className="mt-3.5 block text-[13px] uppercase tracking-[.2em] text-[#c8d5da]">Where there is a right, there is a remedy</Reveal>
                </div>
            </section>

            {/* Practice */}
            <section className="block-section bg-cream" id="practice" aria-label="Areas of practice">
                <div className="wrap">
                    <div className={sectionHead}>
                        <div>
                            <Reveal variant="fade" className="eyebrow">Areas of Practice</Reveal>
                            <RevealText as="h2" className="h2" delay={0.1}>Areas of practice</RevealText>
                        </div>
                        <Reveal as="p" delay={0.3} className="max-w-[460px] text-muted">
                            <Link to="/practice/" className="font-semibold tracking-[.04em] text-gold no-underline">View all areas →</Link><br />
                            Listed as permitted under Rule 36 of the Bar Council of India Rules (as amended). This information is provided for reference only.
                        </Reveal>
                    </div>
                    <PracticeCards />
                </div>
            </section>

            {/* Numbers */}
            <section aria-label="Professional experience in numbers" className="border-y border-gold/25 bg-navy-deep text-[#c8d5da]">
                <div className="wrap grid grid-cols-2 min-[801px]:grid-cols-4">
                    {numbers.map(([n, label], i) => (
                        <Reveal key={n} delay={i * 0.12} className="border-b border-r border-gold/20 px-5 py-[54px] text-center min-[801px]:border-b-0 min-[801px]:last:border-r-0">
                            <b className="mb-2.5 block font-serif text-[64px] font-semibold leading-none text-gold"><Counter to={n} /></b>
                            <span className="text-sm tracking-[.03em]">{label}</span>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Insights */}
            <section className="block-section paper" id="insights" aria-label="Latest articles">
                <div className="wrap">
                    <div className={sectionHead}>
                        <div>
                            <Reveal variant="fade" className="eyebrow">Insights</Reveal>
                            <RevealText as="h2" className="h2" delay={0.1}>Notes on law & judgments</RevealText>
                        </div>
                        <Reveal delay={0.3}><Link className="btn btn-dark" to="/article/">All articles</Link></Reveal>
                    </div>
                    <div className="grid grid-cols-1 gap-8 min-[901px]:grid-cols-3">
                        {latestPosts.slice(0, 3).map((p, i) => <PostCard key={p.slug} post={p} index={i} />)}
                    </div>
                </div>
            </section>

            {/* Research */}
            <section className="block-section bg-cream" id="research" aria-label="Research and publications">
                <div className="wrap grid grid-cols-1 items-start gap-10 min-[901px]:grid-cols-[.9fr_1.1fr] min-[901px]:gap-20">
                    <div className="min-[901px]:sticky min-[901px]:top-[120px]">
                        <Reveal variant="fade" className="eyebrow">Research &amp; Publications</Reveal>
                        <RevealText as="h2" className="h2" delay={0.1}>Scholarship</RevealText>
                        <Rule />
                        <Reveal as="p" delay={0.3} className="text-muted">Academic work on income-tax adjudication, prosecution and technology law.</Reveal>
                    </div>
                    <ul className="list-none">
                        {pubs.map(([type, title, note]) => (
                            <Reveal as="li" key={title} className="group grid grid-cols-1 gap-1.5 border-b border-line py-[22px] transition-[padding] duration-500 hover:pl-4 min-[601px]:grid-cols-[150px_1fr] min-[601px]:gap-6">
                                <div className="pt-1 text-xs font-semibold uppercase tracking-[.14em] text-gold">{type}</div>
                                <div>
                                    <div className="font-serif text-[22px] font-semibold leading-tight text-navy transition-colors duration-500 group-hover:text-gold">{title}</div>
                                    {note && <div className="mt-1 text-[14.5px] text-muted">{note}</div>}
                                </div>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </section>

            <Contact />
        </>
    );
}
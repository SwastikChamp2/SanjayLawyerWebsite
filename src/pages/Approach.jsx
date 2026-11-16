import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLenis } from 'lenis/react';
import PageHero from '../components/PageHero.jsx';
import Contact from '../components/Contact.jsx';
import MetaSEO from '../components/MetaSEO.jsx';
import { Counter, Reveal, RevealText, Rule, ease } from '../components/Motion.jsx';
import { DEFAULT_KEYWORDS, LEGAL_SERVICE_ID } from '../seo/siteConfig';
import { breadcrumbSchema, webPageSchema } from '../seo/schemas';

const record = ['Notices', 'Replies', 'Documents', 'Orders'];

// Pull-quote: a short gold rule over serif italics, no box
const callout = "relative mt-8 pt-5 font-serif text-[22px] italic leading-snug text-navy before:absolute before:left-0 before:top-0 before:h-px before:w-12 before:bg-gold before:content-['']";

// Two layouts, neither uses a box:
//  rows    -> hairline-ruled list with a small gold diamond (best for 4–5 items)
//  columns -> short items under a gold top rule (best for 3 items)
const Points = ({ items, columns = false }) => (
    <ul className={`mt-6 grid list-none grid-cols-1 ${columns ? 'gap-x-8 gap-y-6 sm:grid-cols-3' : 'gap-x-12 sm:grid-cols-2'}`}>
        {items.map((t, i) =>
            columns ? (
                <Reveal as="li" key={t} delay={i * 0.1} className="border-t border-gold/40 pt-4 font-serif text-[21px] leading-snug text-navy">{t}</Reveal>
            ) : (
                <Reveal as="li" key={t} delay={i * 0.08} className="group flex items-center gap-4 border-b border-gold/30 py-3.5 transition-[padding] duration-500 hover:pl-2">
                    <span className="size-1.5 shrink-0 rotate-45 bg-gold transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
                    <span className="font-serif text-[21px] leading-snug text-navy">{t}</span>
                </Reveal>
            )
        )}
    </ul>
);


const forums = ['Authorities', 'Commissioner (Appeals)', 'Income Tax Appellate Tribunal', 'Hon’ble Bombay High Court'];

const steps = [
    {
        title: 'Understanding the matter and the record',
        body: 'Every matter starts with a complete reading of the record.',
        extra: (
            <>
                <Points items={['What has been asked', 'What has been filed', 'What the authority has relied on', 'What is missing']} />
                <Reveal className={callout}>Dates are noted at the outset, because time limits decide which remedies remain available.</Reveal>
            </>
        ),
    },
    {
        title: 'Building the record',
        body: 'Replies and submissions are prepared so that they are complete in themselves, supported by documents, and organised so that an appellate authority reading them later can follow the facts without further explanation.',
        extra: <Points columns items={['Complete in themselves', 'Supported by documents', 'Easy for an appellate authority to follow']} />,
    },
    {
        title: 'Considering every available route',
        body: 'Litigation is not always the only or the best course. Depending on the matter, options may include:',
        extra: (
            <>
                <Points items={['Rectification', 'Settlement or compounding schemes', 'Conciliation', 'Arbitration', 'An appeal']} />
                <Reveal className={callout}>The client decides, after a clear explanation of each route.</Reveal>
            </>
        ),
    },
    {
        title: 'Representation',
        body: 'Representation at every stage, from the authorities to the High Court, and before the relevant forums in GST, MSME and other matters.',
        extra: (
            // stepped staircase: each forum sits one step higher than the last
            <div className="mt-8 flex flex-col gap-5">
                {forums.map((f, i) => (
                    <Reveal key={f} variant="left" delay={i * 0.12} style={{ marginLeft: i * 28 }} className="flex items-center gap-3">
                        <span className="size-2 shrink-0 rounded-full border border-gold bg-cream" aria-hidden="true" />
                        <span className="h-px w-8 shrink-0 bg-gold/50" aria-hidden="true" />
                        <span className="font-serif text-[21px] leading-snug text-navy">{f}</span>
                    </Reveal>
                ))}
            </div>
        ),
    },
    {
        title: 'Clear communication',
        body: 'Clients receive written notes of:',
        extra: <Points columns items={['What has been filed', 'What comes next', 'The dates that matter']} />,
    },
];

const wings = ['Investigation Wing', 'Central Charge', 'Valuation Cell', 'Audit', 'Judicial Section', 'Nodal Officer for the Department’s Bombay High Court matters'];

export default function Approach() {
    const lenis = useLenis();
    const [active, setActive] = useState(1);

    const path = '/approach/';
    const description =
        'How Adv. Sanjay Achhra reads the record, prepares replies and submissions, considers every remedy and represents clients before tax authorities, the ITAT and the Bombay High Court.';
    const keywords = [
        ...DEFAULT_KEYWORDS.slice(0, 10),
        'tax litigation process Mumbai',
        'legal case preparation',
        'income tax appeal representation',
        'advocate approach Mumbai',
    ];
    const breadcrumbs = [
        { name: 'Home', path: '/' },
        { name: 'Approach', path },
    ];
    const page = webPageSchema({
        path,
        type: 'AboutPage',
        name: 'Approach — Sanjay Achhra Law Chambers',
        description,
        keywords,
        about: { '@id': LEGAL_SERVICE_ID },
        breadcrumbs,
        speakable: true,
    });

    // Fill the gold line as the steps are scrolled
    const tlRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: tlRef, offset: ['start 70%', 'end 60%'] });
    const fill = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

    // Highlight the current step in the side index
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.step)); }),
            { rootMargin: '-35% 0px -55% 0px' }
        );
        steps.forEach((_, i) => { const el = document.getElementById(`step-${i + 1}`); if (el) io.observe(el); });
        return () => io.disconnect();
    }, []);

    const go = (n) => {
        const el = document.getElementById(`step-${n}`);
        if (!el) return;
        lenis ? lenis.scrollTo(el, { offset: -120, duration: 1.4 }) : el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <MetaSEO
                title="Approach"
                description={description}
                path={path}
                keywords={keywords}
                focusedKeyword="tax litigation process in Mumbai"
                jsonLd={[page, breadcrumbSchema(breadcrumbs)]}
            />

            <PageHero
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Approach' }]}
                title="Approach"
                sub="How a matter is read, prepared and represented at the Chambers."
            />

            {/* Overview */}
            <section className="block-section paper" aria-label="Overview of the Chambers' approach">
                <div className="wrap max-w-[920px] text-center">
                    <Reveal variant="fade" className="eyebrow">Overview</Reveal>
                    <RevealText as="p" delay={0.1} stagger={0.04} className="mx-auto mt-4 font-serif text-[clamp(26px,3.4vw,38px)] leading-[1.3] text-navy">
                        Most disputes in tax and allied laws are decided on the record: the notices, replies, documents and orders that build up over months or years.
                    </RevealText>

                    {/* the record, building up */}
                    <div className="relative mx-auto mt-14 max-w-[640px]">
                        <motion.span
                            aria-hidden="true"
                            className="absolute left-0 right-0 top-[7px] h-px origin-left bg-gold/60"
                            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.8, ease, delay: 0.3 }}
                        />
                        <ul className="relative flex list-none justify-between">
                            {record.map((r, i) => (
                                <Reveal as="li" key={r} delay={0.3 + i * 0.25} className="flex flex-col items-center gap-3 bg-transparent">
                                    <span className="size-[15px] rounded-full border-2 border-gold bg-paper" />
                                    <span className="text-xs font-semibold uppercase tracking-[.14em] text-muted">{r}</span>
                                </Reveal>
                            ))}
                        </ul>
                    </div>

                    <Reveal as="p" delay={0.2} className="mx-auto mt-14 font-serif text-2xl italic text-gold">The Chambers’ approach is built around that record.</Reveal>
                </div>
            </section>

            {/* Steps */}
            <section className="block-section bg-cream" aria-label="The five-step process">
                <div className="wrap grid grid-cols-1 items-start gap-12 min-[901px]:grid-cols-[280px_1fr] min-[901px]:gap-20">
                    {/* side index (desktop) */}
                    <div className="hidden min-[901px]:sticky min-[901px]:top-[120px] min-[901px]:block">
                        <Reveal variant="fade" className="eyebrow">The process</Reveal>
                        <RevealText as="h2" delay={0.1} className="h2">Five steps</RevealText>
                        <Rule />
                        <nav aria-label="Steps" className="flex flex-col">
                            {steps.map((s, i) => {
                                const on = active === i + 1;
                                return (
                                    <button key={s.title} onClick={() => go(i + 1)}
                                        className={`flex w-full cursor-pointer items-baseline gap-3 border-0 border-l-2 bg-transparent py-3 pl-5 text-left transition-colors duration-500 ${on ? 'border-gold' : 'border-line hover:border-gold/60'}`}>
                                        <span className={`font-serif text-lg transition-colors duration-500 ${on ? 'text-gold' : 'text-muted'}`}>{String(i + 1).padStart(2, '0')}</span>
                                        <span className={`text-[15px] leading-snug transition-colors duration-500 ${on ? 'font-semibold text-navy' : 'text-muted'}`}>{s.title}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    {/* mobile heading */}
                    <div className="min-[901px]:hidden">
                        <Reveal variant="fade" className="eyebrow">The process</Reveal>
                        <RevealText as="h2" delay={0.1} className="h2">Five steps</RevealText>
                        <Rule />
                    </div>

                    {/* steps */}
                    <ol ref={tlRef} className="relative list-none">
                        <span className="absolute left-[21px] top-0 h-full w-px bg-gold/25" aria-hidden="true" />
                        <motion.span style={{ scaleY: fill }} className="absolute left-[21px] top-0 h-full w-px origin-top bg-gold" aria-hidden="true" />
                        {steps.map((s, i) => (
                            <Reveal as="li" key={s.title} id={`step-${i + 1}`} data-step={i + 1} className="relative pb-16 pl-[72px] last:pb-0 max-[600px]:pl-[60px]">
                                <motion.span
                                    className="absolute left-0 top-0 grid size-11 place-items-center rounded-full border border-gold bg-cream font-serif text-lg text-gold"
                                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                                    transition={{ type: 'spring', stiffness: 240, damping: 15, delay: 0.15 }}
                                >
                                    {i + 1}
                                </motion.span>
                                <h3 className="pt-1 text-[clamp(26px,3vw,32px)]">{s.title}</h3>
                                <p className="mt-3 text-lg text-[#33434b]">{s.body}</p>
                                {s.extra}
                            </Reveal>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Background */}
            <section className="block-section bg-navy-deep text-[#c8d5da]" aria-label="Professional background">
                <div className="wrap grid grid-cols-1 items-start gap-12 min-[901px]:grid-cols-[.8fr_1.2fr] min-[901px]:gap-20">
                    <div>
                        <Reveal variant="fade" className="eyebrow">Background</Reveal>
                        <RevealText as="h2" delay={0.1} className="h2 !text-white">Background</RevealText>
                        <Rule />
                        <Reveal className="flex items-end gap-4">
                            <b className="font-serif text-[96px] font-semibold leading-[.85] text-gold"><Counter to={27} /></b>
                            <span className="pb-1 text-sm leading-snug tracking-[.03em]">years with the<br />Income Tax Department,<br />Mumbai</span>
                        </Reveal>
                    </div>
                    <div>
                        <Reveal as="p" className="text-lg">Adv. Sanjay Achhra served in the Income Tax Department, Mumbai, including in:</Reveal>
                        <div className="mt-6 grid grid-cols-1 gap-px border border-gold/25 bg-gold/25 sm:grid-cols-2">
                            {wings.map((w, i) => (
                                <Reveal key={w} delay={i * 0.08} className="bg-navy-deep px-5 py-5 font-serif text-xl text-white transition-colors duration-500 hover:bg-navy">{w}</Reveal>
                            ))}
                        </div>
                        <Reveal as="p" delay={0.1} className="mt-8 text-lg text-white">This background gives him a working understanding of how departmental records are created, examined and relied upon.</Reveal>
                        <Reveal delay={0.1} className="mt-8 border border-gold/30 px-6 py-5 text-[14.5px] leading-relaxed text-[#9fb2ba]">
                            This background is mentioned for information only. It does not imply any association with, or influence over, any authority. All matters are conducted strictly in accordance with law and the Bar Council of India Rules.
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Confidentiality */}
            <section className="block-section paper" aria-label="Confidentiality">
                <div className="wrap grid grid-cols-1 items-center gap-10 min-[901px]:grid-cols-[.6fr_1.4fr] min-[901px]:gap-20">
                    <svg className="mx-auto w-[150px] text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth=".6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {['M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z', 'M9.5 11.5h5v4h-5z', 'M10.5 11.5v-1.2a1.5 1.5 0 0 1 3 0v1.2'].map((d, i) => (
                            <motion.path key={i} d={d} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: '-20%' }} transition={{ duration: 2.2, ease, delay: i * 0.4 }} />
                        ))}
                    </svg>
                    <div>
                        <Reveal variant="fade" className="eyebrow">Confidentiality</Reveal>
                        <RevealText as="h2" delay={0.1} className="h2">Confidentiality</RevealText>
                        <Rule />
                        <Reveal as="p" delay={0.2} className="max-w-[640px] font-serif text-[clamp(22px,2.6vw,28px)] leading-[1.4] text-navy">
                            Information shared by clients is treated as confidential and privileged, in accordance with the Advocates Act, 1961, the Bar Council of India Rules and the law of evidence.
                        </Reveal>
                    </div>
                </div>
            </section>

            <Contact />
        </>
    );
}
import { Link } from 'react-router-dom';
import PracticeCards from '../components/PracticeCards.jsx';
import PostCard from '../components/PostCard.jsx';
import Contact from '../components/Contact.jsx';
import { site, posts } from '../data.jsx';

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
    ['27', <>Years of service in the<br />Income Tax Department</>],
    ['8', <>Departmental wings<br />served in</>],
    ['5', <>Academic and professional<br />qualifications</>],
    ['7', <>Research papers, chapters<br />and dissertations</>],
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

const sectionHead = 'mb-[50px] flex flex-wrap items-end justify-between gap-10';

export default function Home() {
    return (
        <>
            {/* Hero */}
            <section className="hero relative overflow-hidden bg-navy text-white">
                <img className="pointer-events-none absolute -left-[90px] -bottom-[120px] z-0 w-[460px] opacity-[.06] max-[900px]:hidden" src="https://sanjay.178-105-212-85.sslip.io/assets/images/monogram.svg" alt="" aria-hidden="true" />
                <div className="wrap relative z-[1] grid grid-cols-1 items-center gap-10 py-[70px] max-[900px]:pt-12 min-[901px]:min-h-[620px] min-[901px]:grid-cols-[1.15fr_.85fr]">
                    <div className="animate-rise motion-reduce:animate-none">
                        <div className="eyebrow">Advocate, High Court · Mumbai</div>
                        <h1 className="mt-[18px] mb-1.5 text-[clamp(54px,7.2vw,92px)] tracking-[.01em] text-transparent bg-clip-text bg-[linear-gradient(100deg,#c9a66b_0%,#e6cf9f_40%,#b8955a_70%)]">Sanjay Achhra</h1>
                        <div className="font-serif italic text-[clamp(22px,2.4vw,28px)] text-[#e9e1d1]">Sanjay Achhra Law Chambers, Mulund</div>
                        <p className="max-w-[520px] mt-7 mb-9 text-lg text-[#c8d5da]">Practising in direct-tax litigation and allied laws, after a 27-year career with the Income Tax Department, Mumbai.</p>
                        <p className="text-[15px] tracking-[.02em] text-white/90">B.Com. · LL.B. · LL.M. · C.S. (Executive) · Diploma in Cyber Law · Research Scholar (Ph.D. in Law)</p>
                        <div className="mt-[34px] flex flex-wrap gap-3.5">
                            <a className="btn btn-solid" href="#about">About the Chambers</a>
                            <Link className="btn" to="/insights/">Read Insights</Link>
                        </div>
                    </div>

                    <div className="relative justify-self-center w-[min(380px,100%)] max-[900px]:order-first max-[900px]:w-60 animate-rise [animation-delay:.25s] motion-reduce:animate-none">
                        <div className="overflow-hidden rounded-[200px_200px_6px_6px] border border-gold bg-white p-2.5 shadow-[0_30px_60px_-30px_rgba(0,0,0,.45)]">
                            <img className="w-full aspect-[3/4] object-cover object-top rounded-[190px_190px_2px_2px]" src="https://sanjay.178-105-212-85.sslip.io/assets/images/sanjay.webp?v=JTMAF5ysK2fO_XF1" alt="Adv. Sanjay Achhra" width="709" height="945" />
                        </div>
                        <div className="absolute left-[-48px] bottom-[34px] flex items-center gap-3 border border-gold bg-navy-deep px-[18px] py-3.5 text-white max-[900px]:left-auto max-[900px]:right-[-40px] max-[900px]:bottom-2.5 max-[900px]:px-3 max-[900px]:py-2.5">
                            <b className="font-serif text-[40px] leading-none font-semibold text-gold max-[900px]:text-[30px]">27</b>
                            <span className="text-[12.5px] leading-[1.35] tracking-[.03em] text-[#d6dfe2]">years with the<br />Income Tax Department</span>
                        </div>
                    </div>
                </div>

            </section>

            {/* Credentials strip */}
            <div className="border-t border-gold/35 bg-navy-deep text-[#d8e1e4]">
                <ul className="wrap grid list-none grid-cols-2 min-[901px]:grid-cols-5">
                    {creds.map(([a, b]) => (
                        <li key={a} className="border-b border-r border-gold/20 px-[18px] py-[26px] text-center text-[13.5px] tracking-[.04em] min-[901px]:border-b-0 min-[901px]:last:border-r-0">
                            <strong className="mb-0.5 block font-serif text-[22px] font-semibold tracking-normal text-gold">{a}</strong>{b}
                        </li>
                    ))}
                </ul>
            </div>

            {/* About */}
            <section className="block-section paper" id="about">
                <div className="wrap grid grid-cols-1 items-start gap-10 min-[901px]:grid-cols-[.9fr_1.1fr] min-[901px]:gap-20">
                    <div className="reveal">
                        <div className="eyebrow">About</div>
                        <h2 className="h2">From the Department to the Bar</h2>
                        <hr className="rule" />
                        <div className="[&>p]:mb-[18px] [&>p]:text-[#33434b] [&>p:first-child]:font-serif [&>p:first-child]:text-[26px] [&>p:first-child]:leading-[1.4] [&>p:first-child]:text-navy">
                            {/* Replace with "about" page content (was Ghost {{#get "pages" filter="slug:about"}}) */}
                            <p>After 27 years with the Income Tax Department, Mumbai, Adv. Sanjay Achhra now practises before the tax tribunals and the Bombay High Court.</p>
                            <p>Add the fuller profile text here.</p>
                        </div>
                    </div>
                    <ol className="reveal list-none border-l border-gold pl-[30px]">
                        {timeline.map(([yr, what, where]) => (
                            <li key={yr + what} className="relative pb-7 before:content-[''] before:absolute before:-left-9 before:top-[7px] before:size-[11px] before:rounded-full before:border-2 before:border-gold before:bg-paper">
                                <div className="font-serif text-[22px] font-semibold text-gold">{yr}</div>
                                <div className="font-semibold text-navy">{what}</div>
                                <div className="text-[15px] text-muted">{where}</div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Quote band */}
            <section className="relative overflow-hidden bg-navy py-24 text-center text-white" aria-label="Legal maxim">
                <svg className="absolute right-[6%] top-1/2 w-[260px] -translate-y-1/2 text-gold opacity-[.14]" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
                    <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M100 30v140M70 170h60M40 60h120M100 30l-4 6h8z" />
                        <path d="M40 60 22 112h36zM160 60l-18 52h36z" />
                        <path d="M22 112a18 9 0 0 0 36 0M142 112a18 9 0 0 0 36 0" />
                    </g>
                </svg>
                <div className="wrap quote-lines reveal">
                    <p className="font-serif text-[clamp(34px,5vw,58px)] leading-[1.15] text-gold"><em>Ubi jus, ibi remedium.</em></p>
                    <span className="mt-3.5 block text-[13px] uppercase tracking-[.2em] text-[#c8d5da]">Where there is a right, there is a remedy</span>
                </div>
            </section>

            {/* Practice */}
            <section className="block-section bg-cream" id="practice">
                <div className="wrap">
                    <div className={`${sectionHead} reveal`}>
                        <div>
                            <div className="eyebrow">Areas of Practice</div>
                            <h2 className="h2">Areas of practice</h2>
                        </div>
                        <p className="max-w-[460px] text-muted">
                            <Link to="/practice/" className="font-semibold tracking-[.04em] text-gold no-underline">View all areas →</Link><br />
                            Listed as permitted under Rule 36 of the Bar Council of India Rules (as amended). This information is provided for reference only.
                        </p>
                    </div>
                    <PracticeCards />
                </div>
            </section>

            {/* Numbers */}
            <section className="border-y border-gold/25 bg-navy-deep text-[#c8d5da]">
                <div className="wrap grid grid-cols-2 min-[801px]:grid-cols-4">
                    {numbers.map(([n, label]) => (
                        <div key={n} className="reveal border-b border-r border-gold/20 px-5 py-[54px] text-center min-[801px]:border-b-0 min-[801px]:last:border-r-0">
                            <b className="mb-2.5 block font-serif text-[64px] font-semibold leading-none text-gold">{n}</b>
                            <span className="text-sm tracking-[.03em]">{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Insights */}
            <section className="block-section paper" id="insights">
                <div className="wrap">
                    <div className={`${sectionHead} reveal`}>
                        <div>
                            <div className="eyebrow">Insights</div>
                            <h2 className="h2">Notes on law &amp; judgments</h2>
                        </div>
                        <Link className="btn btn-dark" to="/insights/">All articles</Link>
                    </div>
                    <div className="grid grid-cols-1 gap-8 min-[901px]:grid-cols-3">
                        {posts.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} />)}
                    </div>
                </div>
            </section>

            {/* Research */}
            <section className="block-section bg-cream" id="research">
                <div className="wrap grid grid-cols-1 items-start gap-10 min-[901px]:grid-cols-[.9fr_1.1fr] min-[901px]:gap-20">
                    <div className="reveal min-[901px]:sticky min-[901px]:top-[120px]">
                        <div className="eyebrow">Research &amp; Publications</div>
                        <h2 className="h2">Scholarship</h2>
                        <hr className="rule" />
                        <p className="text-muted">Academic work on income-tax adjudication, prosecution and technology law.</p>
                    </div>
                    <ul className="list-none">
                        {pubs.map(([type, title, note]) => (
                            <li key={title} className="reveal grid grid-cols-1 gap-1.5 border-b border-line py-[22px] min-[601px]:grid-cols-[150px_1fr] min-[601px]:gap-6">
                                <div className="pt-1 text-xs font-semibold uppercase tracking-[.14em] text-gold">{type}</div>
                                <div>
                                    <div className="font-serif text-[22px] font-semibold leading-tight text-navy">{title}</div>
                                    {note && <div className="mt-1 text-[14.5px] text-muted">{note}</div>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <Contact />
        </>
    );
}
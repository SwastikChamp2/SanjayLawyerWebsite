import PageHero from '../components/PageHero.jsx';
import { Reveal } from '../components/Motion.jsx';

const groups = [
    {
        heading: 'Doctoral research',
        items: [
            {
                title: 'Critical Evaluation of Adjudication Process of Income Tax Disputes under Income Tax Authorities in Maharashtra',
                note: 'Ph.D. research proposal approved by the Research Advisory Committee, University of Mumbai',
            },
        ],
    },
    {
        heading: 'Published papers',
        items: [
            { title: 'Analysis of Criminal Prosecution Under the Income Tax Law in India', note: 'Indian Journal of Law and Legal Research' },
        ],
    },
    {
        heading: 'LL.M. research (University of Mumbai)',
        items: [
            { title: 'A Study on Prosecution launched under the provisions of the Income Tax Act, 1961', note: 'Dissertation' },
            { title: 'A Study on Cyber Crimes with Special Reference to Banking Transactions', note: 'Inter-disciplinary project, awarded the highest marks' },
        ],
    },
    {
        heading: 'Conference and seminar papers',
        items: [
            { title: 'AI-Generated Works and the Copyright Challenge of Ownership', note: 'Online Global Conference, DTSS College, Mumbai' },
            { title: 'Gender Neutral Laws in India: Equality in Theory, Challenges in Practice', note: 'Seminar paper' },
            { title: 'Live-in Relationship and Non-Traditional Families: Law, Morality and Social Change', note: 'Seminar, KC Law College, Mumbai' },
        ],
    },
    {
        heading: 'Book chapter',
        items: [
            { title: 'The Role of Awareness in Promoting Human Rights in the Digital Era' },
        ],
    },
    {
        heading: 'Debates',
        items: [
            { title: '“Digital Media Trials: Are Social Media Platforms Undermining the Right to Fair Trial?”' },
            { title: '“One Nation, One Election: Constitutional Reform or Federal Disruption”' },
        ],
    },
];

export default function Publications() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Publications' }]}
                title="Publications"
                sub="Adv. Sanjay Achhra’s academic work focuses on income-tax adjudication and prosecution, cyber crime, and the law’s response to technology and social change."
            />

            <section className="block-section paper">
                <div className="wrap">
                    {groups.map((g) => (
                        <div
                            key={g.heading}
                            className="grid grid-cols-1 gap-3 border-t border-line py-10 first:border-t-0 first:pt-0 min-[901px]:grid-cols-[260px_1fr] min-[901px]:gap-14"
                        >
                            <Reveal as="h2" variant="fade" className="font-serif text-[28px] leading-[1.15] text-navy">{g.heading}</Reveal>
                            <ul className="list-none">
                                {g.items.map((it) => (
                                    <Reveal
                                        as="li"
                                        key={it.title}
                                        className="group border-b border-line py-[22px] transition-[padding] duration-500 first:pt-0 last:border-b-0 last:pb-0 hover:pl-4"
                                    >
                                        <div className="font-serif text-[22px] font-semibold leading-tight text-navy transition-colors duration-500 group-hover:text-gold">{it.title}</div>
                                        {it.note && <div className="mt-1 text-[14.5px] text-muted">{it.note}</div>}
                                    </Reveal>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
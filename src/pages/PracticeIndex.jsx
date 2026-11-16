import PageHero from '../components/PageHero.jsx';
import PracticeCards from '../components/PracticeCards.jsx';
import Contact from '../components/Contact.jsx';
import MetaSEO from '../components/MetaSEO.jsx';
import { practiceAreas } from '../data.jsx';
import { DEFAULT_KEYWORDS, LEGAL_SERVICE_ID } from '../seo/siteConfig';
import { breadcrumbSchema, itemListSchema, webPageSchema } from '../seo/schemas';

const path = '/practice/';
const title = 'Areas of Practice';
const description =
    'Areas of practice of Adv. Sanjay Achhra, Mumbai: income tax litigation, the Black Money Act, PMLA, cyber law, MSME conciliation and arbitration, GST litigation, company and LLP formation, and legal drafting.';

const keywords = [
    ...DEFAULT_KEYWORDS,
    'law practice areas Mumbai',
    'tax and allied laws advocate',
    'legal services Mulund Mumbai',
];

const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Areas of Practice', path },
];

const list = itemListSchema({
    path,
    name: 'Areas of practice',
    items: practiceAreas.map((area) => ({
        name: area.title,
        path: `/practice/${area.slug}/`,
    })),
});

const page = webPageSchema({
    path,
    type: 'CollectionPage',
    name: 'Areas of Practice — Adv. Sanjay Achhra, Mumbai',
    description,
    keywords,
    about: { '@id': LEGAL_SERVICE_ID },
    mainEntity: { '@id': list['@id'] },
    breadcrumbs,
    speakable: true,
});

export default function PracticeIndex() {
    return (
        <>
            <MetaSEO
                title={title}
                description={description}
                path={path}
                keywords={keywords}
                focusedKeyword="advocate for tax and allied laws in Mumbai"
                jsonLd={[page, list, breadcrumbSchema(breadcrumbs)]}
            />
            <PageHero
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Areas of Practice' }]}
                title="Areas of Practice"
                sub="Sanjay Achhra Law Chambers, Mulund (W), Mumbai. Listed as permitted under Rule 36 of the Bar Council of India Rules (as amended)."
            />
            <section className="block-section bg-cream" aria-label="Practice areas">
                <div className="wrap"><PracticeCards /></div>
            </section>
            <Contact />
        </>
    );
}

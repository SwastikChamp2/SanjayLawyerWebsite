import PageHero from '../components/PageHero.jsx';
import MetaSEO from '../components/MetaSEO.jsx';
import { Reveal } from '../components/Motion.jsx';
import { LEGAL_SERVICE_ID } from '../seo/siteConfig';
import { breadcrumbSchema, webPageSchema } from '../seo/schemas';

const path = '/disclaimer/';
const description =
    'Disclaimer for the website of Sanjay Achhra Law Chambers: information only, no advertisement or solicitation, and no advocate-client relationship, in accordance with Rule 36 of the Bar Council of India Rules.';

const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Disclaimer', path },
];

const page = webPageSchema({
    path,
    name: 'Disclaimer — Sanjay Achhra Law Chambers',
    description,
    keywords: ['disclaimer', 'Bar Council of India Rules', 'Rule 36', 'no solicitation', 'legal information only'],
    about: { '@id': LEGAL_SERVICE_ID },
    breadcrumbs,
});

export default function Disclaimer() {
    return (
        <>
            <MetaSEO
                title="Disclaimer"
                description={description}
                path={path}
                keywords={['disclaimer', 'Bar Council of India Rule 36', 'no solicitation', 'legal information only']}
                focusedKeyword="Bar Council of India disclaimer"
                jsonLd={[page, breadcrumbSchema(breadcrumbs)]}
            />

            <PageHero
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Disclaimer' }]}
                title="Disclaimer"
                sub="Please read this before using the website."
            />

            <div className="wrap">
                <Reveal as="article" delay={0.2} className="prose-body mx-auto max-w-[820px] pt-16 pb-20" aria-label="Website disclaimer">
                    <p>The Bar Council of India does not permit advocates to solicit work or advertise. By accessing this website, you acknowledge that:</p>
                    <ul>
                        <li>You are seeking information about Sanjay Achhra Law Chambers on your own accord, and there has been no advertisement, solicitation, invitation or inducement of any sort.</li>
                        <li>The information on this website is for general information only and does not constitute legal advice. No advocate–client relationship is created by accessing this website or by contacting the Chambers through it.</li>
                        <li>Sanjay Achhra Law Chambers is not liable for any action taken on the basis of the information provided on this website.</li>
                    </ul>
                </Reveal>
            </div>
        </>
    );
}

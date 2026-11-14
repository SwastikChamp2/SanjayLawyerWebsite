import PageHero from '../components/PageHero.jsx';
import PracticeCards from '../components/PracticeCards.jsx';
import Contact from '../components/Contact.jsx';

export default function PracticeIndex() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Areas of Practice' }]}
                title="Areas of Practice"
                sub="Sanjay Achhra Law Chambers, Mulund (W), Mumbai. Listed as permitted under Rule 36 of the Bar Council of India Rules (as amended)."
            />
            <section className="block-section bg-cream">
                <div className="wrap"><PracticeCards /></div>
            </section>
            <Contact />
        </>
    );
}
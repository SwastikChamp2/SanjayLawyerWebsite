import PageHero from '../components/PageHero.jsx';
import { Reveal } from '../components/Motion.jsx';

export default function Disclaimer() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Disclaimer' }]}
                title="Disclaimer"
                sub="Please read this before using the website."
            />

            <div className="wrap">
                <Reveal as="article" delay={0.2} className="prose-body mx-auto max-w-[820px] pt-16 pb-20">
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
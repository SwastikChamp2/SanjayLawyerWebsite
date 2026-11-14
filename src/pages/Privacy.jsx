import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { Reveal } from '../components/Motion.jsx';
import { site } from '../data.jsx';

const lastUpdated = '15 November 2026';

export default function Privacy() {
    return (
        <>
            <PageHero
                crumbs={[{ label: 'Home', to: '/' }, { label: 'Privacy' }]}
                title="Privacy Policy"
                sub="How this website handles information about its visitors."
            />

            <div className="wrap">
                <Reveal as="article" delay={0.2} className="prose-body mx-auto max-w-[820px] pt-16 pb-20">
                    <p>This website is an informational website for Sanjay Achhra Law Chambers. It is a static site: it does not ask visitors to register, log in or submit personal details, and it does not collect, store or process the personal information of its visitors.</p>

                    <h2>Information we collect</h2>
                    <p>We do not collect any personal information from you through this website. The phone number and email address shown on the site open in your own phone or email application, and what you send from there is handled by your own service provider, not stored by this website.</p>

                    <h2>Browser and analytics data</h2>
                    <p>When you visit any website, standard technical information such as your IP address, browser type, device and the pages you view is processed by your browser and by the services involved in delivering and indexing the site. Some of this data may be collected by search engines such as Google and similar services under their own privacy policies. This website does not use that data to identify you and does not build profiles of its visitors.</p>

                    <h2>Restricted administrator access</h2>
                    <p>Certain areas of the website are restricted to authorised administrators, who use role-based permissions to manage the site’s content. These accounts exist only for administration. There are no visitor accounts, and no visitor information is collected through them.</p>

                    <h2>Third-party links</h2>
                    <p>The website may link to external websites, such as journals, institutions or government portals. We do not control these sites and are not responsible for their content or privacy practices. Please read their policies before sharing any information with them.</p>

                    <h2>Changes to this policy</h2>
                    <p>This policy may be updated from time to time, and the date below will change when it is. Please also read our <Link to="/disclaimer/">Disclaimer</Link>.</p>

                    <h2>Questions</h2>
                    <p>For any question about this policy, write to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>

                    <p><small>Last updated: {lastUpdated}</small></p>
                </Reveal>
            </div>
        </>
    );
}
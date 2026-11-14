// Site-wide settings (were Ghost @custom.* values) — edit these.
export const site = {
    enrolment: 'MAH/12289/2026',
    phone: '+91 93237 93229',
    email: 'contact@sanjayachhra.com',
    officeAddress: 'Neptune Flying Colors, Mulund (W), Mumbai',
    showPreviewRibbon: false,
};

export const nav = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/#about' },
    { label: 'Practice', to: '/practice/' },
    { label: 'Approach', to: '/approach/' },
    { label: 'Insights', to: '/insights/' },
    { label: 'Contact', to: '/#contact' },
];

export const footerNav = [
    { label: 'Disclaimer', to: '/disclaimer/' },
    { label: 'Privacy', to: '/privacy/' },
];

export const images = {
    portrait: 'https://sanjay.178-105-212-85.sslip.io/assets/images/sanjay.webp',
    monogram: 'https://sanjay.178-105-212-85.sslip.io/assets/images/monogram.svg',
};

const svg = (children) => (
    <svg className="mb-[18px] size-[34px] fill-none stroke-gold stroke-[1.4] [stroke-linecap:round] [stroke-linejoin:round] transition-transform duration-300 group-hover:-translate-y-[3px]" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        {children}
    </svg>
);

export const practiceAreas = [
    {
        slug: 'income-tax-litigation', title: 'Income Tax Litigation', excerpt: 'Appeals and proceedings before the CIT(A), ITAT and the Hon’ble Bombay High Court.',
        icon: svg(<><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v3h3M9 11h6M9 15h6M9 7h3" /></>),
        body: (
            <>
                <h2>Overview</h2>
                <p>Income tax disputes usually begin with an assessment, reassessment, rectification or penalty order. An aggrieved taxpayer can challenge these through a structured hierarchy of appellate forums, each with its own limitation periods, filing requirements and scope of review.</p>
                <h2>Matters covered</h2>
                <ul>
                    <li>Scrutiny assessments and replies to notices and show-cause letters</li>
                    <li>Reassessment proceedings and challenges to the validity of notices</li>
                    <li>Revision of orders by the Principal Commissioner or Commissioner</li>
                    <li>Penalty proceedings and prosecution for alleged tax offences</li>
                    <li>Search and seizure assessments</li>
                    <li>Stay of demand and rectification applications</li>
                </ul>
                <h2>Forums and procedure</h2>
                <p>The first appeal lies to the Commissioner of Income Tax (Appeals), which reviews both facts and law. A further appeal lies to the Income Tax Appellate Tribunal (ITAT), the final fact-finding authority. An appeal then lies to the High Court, which is limited to substantial questions of law. Writ petitions under Article 226 of the Constitution are also available where an order or notice is without jurisdiction or violates principles of natural justice.</p>
                <h2>Governing law</h2>
                <p>The Income-tax Act, 1961 continues to govern proceedings for earlier assessment years, and the Income-tax Act, 2025 applies to periods from 1 April 2026, together with the relevant rules and notifications.</p>
            </>
        ),
    },
    {
        slug: 'black-money-act', title: 'Black Money Act', excerpt: 'Proceedings relating to undisclosed foreign income and assets.',
        icon: svg(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>),
        body: (
            <>
                <h2>Overview</h2>
                <p>The Black Money (Undisclosed Foreign Income and Assets) and Imposition of Tax Act, 2015 applies to income and assets held outside India that have not been disclosed to the tax authorities. It operates separately from the Income Tax Act and carries its own tax, penalty and prosecution provisions.</p>
                <h2>Matters covered</h2>
                <ul>
                    <li>Notices and assessments for undisclosed foreign income or assets</li>
                    <li>Disputes on whether an asset is &ldquo;undisclosed&rdquo; or was acquired from disclosed sources</li>
                    <li>Penalty for non-disclosure of foreign assets in the return of income</li>
                    <li>Prosecution for wilful attempt to evade tax or failure to furnish required information</li>
                    <li>Residential status questions (only a &ldquo;resident and ordinarily resident&rdquo; is covered)</li>
                </ul>
                <h2>Forums and procedure</h2>
                <p>Assessment is made by the Assessing Officer, with appeals to the CIT(A), the ITAT and then the High Court. Prosecution under the Act is tried before the competent criminal court, and sanction requirements and limitation are often central issues.</p>
                <h2>Governing law</h2>
                <p>The 2015 Act and the Black Money Rules, read with the Income Tax Act where the Act cross-refers to it. Disclosure of foreign assets in the return of income (Schedule FA) is a related compliance requirement.</p>
            </>
        ),
    },
    {
        slug: 'pmla', title: 'PMLA', excerpt: 'Matters under the Prevention of Money Laundering Act, 2002.',
        icon: svg(<><path d="M4 7h16v12H4z" /><path d="M8 7V5h8v2M4 12h16" /></>),
        body: (
            <>
                <h2>Overview</h2>
                <p>The Prevention of Money Laundering Act, 2002 criminalises the process of projecting proceeds of crime as untainted property. Proceedings are typically initiated by the Directorate of Enforcement (ED) and run in parallel with the underlying &ldquo;scheduled offence&rdquo; case.</p>
                <h2>Matters covered</h2>
                <ul>
                    <li>Summons, statements and investigation by the Directorate of Enforcement</li>
                    <li>Arrest, remand and bail, including the stricter bail conditions under the Act</li>
                    <li>Provisional attachment of property and its confirmation</li>
                    <li>Prosecution complaints before the Special Court</li>
                    <li>Quashing of proceedings and challenges to the legality of arrest or attachment</li>
                </ul>
                <h2>Forums and procedure</h2>
                <p>Provisional attachment orders are adjudicated by the Adjudicating Authority, with appeals to the Appellate Tribunal and then the High Court. Criminal prosecution proceeds before the Special Court designated under the Act, with bail and quashing matters heard by the High Court and Supreme Court. Constitutional remedies under Article 226 are also used in appropriate cases.</p>
                <h2>Governing law</h2>
                <p>The PMLA, 2002 and its rules, read with the Bharatiya Nagarik Suraksha Sanhita, 2023 where applicable, and judgments of the Supreme Court on arrest, bail and attachment.</p>
            </>
        ),
    },
    {
        slug: 'cyber-law', title: 'Cyber Law', excerpt: 'Cyber crime and information technology law, including banking frauds.',
        icon: svg(<><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z" /><path d="M9 12l2 2 4-4" /></>),
        body: (
            <>
                <h2>Overview</h2>
                <p>Cyber law covers offences and civil disputes arising from computers, networks and digital transactions. A large share of present-day matters involve online banking and payment frauds such as phishing, SIM-swap, UPI and card fraud.</p>
                <h2>Matters covered</h2>
                <ul>
                    <li>Unauthorised electronic transactions and the liability of banks and customers</li>
                    <li>Identity theft, impersonation, hacking and data theft</li>
                    <li>Obscene or defamatory online content and online harassment</li>
                    <li>Filing of complaints and FIRs with cyber police, and defence of persons accused of cyber offences</li>
                    <li>Compensation claims for data breach or unauthorised access</li>
                </ul>
                <h2>Forums and procedure</h2>
                <p>Offences are reported through the National Cyber Crime Reporting Portal, the 1930 helpline or the local cyber police station. Compensation claims under the IT Act are made before the Adjudicating Officer, with appeal to the appellate tribunal. Customers can also approach the RBI Ombudsman and consumer forums for banking-related grievances, and prompt reporting to the bank is important for limiting liability.</p>
                <h2>Governing law</h2>
                <p>The Information Technology Act, 2000 and its rules, the Bharatiya Nyaya Sanhita, 2023, the Bharatiya Nagarik Suraksha Sanhita, 2023, the Digital Personal Data Protection Act, 2023 and RBI directions on customer liability in unauthorised electronic banking transactions.</p>
            </>
        ),
    },
    {
        slug: 'msme-conciliation-arbitration', title: 'MSME Conciliation & Arbitration', excerpt: 'Delayed-payment disputes under the MSMED Act.',
        icon: svg(<><path d="M7 11l3-3 4 4 3-3" /><path d="M3 21h18M5 21V10M19 21V10M12 21v-5" /></>),
        body: (
            <>
                <h2>Overview</h2>
                <p>The MSMED Act, 2006 gives registered micro and small enterprises a dedicated statutory mechanism for recovering delayed payments from buyers. The Act requires payment within the agreed period, subject to a statutory maximum of 45 days, and provides for interest on delayed amounts at a multiple of the bank rate notified by the RBI, compounded monthly.</p>
                <h2>Matters covered</h2>
                <ul>
                    <li>Recovery of unpaid dues for goods supplied or services rendered by MSME suppliers</li>
                    <li>Claims for statutory interest on delayed payments</li>
                    <li>Reference to the Micro and Small Enterprises Facilitation Council (MSEFC)</li>
                    <li>Defence of buyers in MSEFC proceedings, including jurisdiction and registration objections</li>
                    <li>Challenges to MSEFC awards and execution of awards</li>
                </ul>
                <h2>Forums and procedure</h2>
                <p>A supplier files a reference with the MSEFC, which first attempts conciliation and, if that fails, conducts arbitration or refers the dispute to an institution for arbitration. An award can be challenged under Section 34 of the Arbitration and Conciliation Act, 1996, subject to the requirement of depositing 75% of the awarded amount.</p>
                <h2>Governing law</h2>
                <p>The MSMED Act, 2006 (Chapter V), the Arbitration and Conciliation Act, 1996 and judgments on the effect of Udyam registration timing and on the applicability of the Act to a supplier.</p>
            </>
        ),
    },
    {
        slug: 'gst-litigation', title: 'GST Litigation', excerpt: 'Proceedings and appeals under GST law.',
        icon: svg(<><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 18h8" /></>),
        body: (
            <>
                <h2>Overview</h2>
                <p>GST disputes commonly arise from show cause notices on alleged short payment of tax, wrongful availment of input tax credit, refund rejection, registration cancellation or inspection and search by the department.</p>
                <h2>Matters covered</h2>
                <ul>
                    <li>Replies to show cause notices and personal hearings before the adjudicating authority</li>
                    <li>Input tax credit disputes, including supplier-default cases</li>
                    <li>Refund claims and rejections</li>
                    <li>Registration cancellation and revocation</li>
                    <li>Inspection, search, seizure, detention of goods and arrest</li>
                    <li>Writ petitions against jurisdictional or procedural defects</li>
                </ul>
                <h2>Forums and procedure</h2>
                <p>Orders are first appealed to the Appellate Authority, usually within three months and with a pre-deposit of part of the disputed tax. A further appeal lies to the GST Appellate Tribunal (GSTAT), again with a pre-deposit, and then to the High Court on substantial questions of law. Limitation periods and the validity of the notice itself are frequently decisive.</p>
                <h2>Governing law</h2>
                <p>The Central Goods and Services Tax Act, 2017, the State GST Acts, the IGST Act, 2017, the GST Rules and notifications, circulars and judicial precedent.</p>
            </>
        ),
    },
    {
        slug: 'company-llp-firm-formation', title: 'Companies, LLPs & Firms', excerpt: 'Formation and registration of business entities.',
        icon: svg(<><path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6M3 21h18" /></>),
        body: (
            <>
                <h2>Overview</h2>
                <p>The choice of entity affects liability, taxation, compliance burden and the ability to raise capital. The common structures are the private limited company, one person company, limited liability partnership (LLP), partnership firm and sole proprietorship.</p>
                <h2>Matters covered</h2>
                <ul>
                    <li>Selection of the appropriate business structure</li>
                    <li>Incorporation of companies and LLPs with the Registrar of Companies</li>
                    <li>Preparation of the Memorandum, Articles of Association, LLP agreement or partnership deed</li>
                    <li>Registration of partnership firms and Section 8 companies</li>
                    <li>Related registrations such as PAN, TAN, GST, Shops and Establishment and Udyam</li>
                    <li>Annual filings and conversions between entity types</li>
                </ul>
                <h2>Procedure</h2>
                <p>Companies and LLPs are incorporated online through the Ministry of Corporate Affairs portal, after name approval, with digital signatures and the required declarations. Partnership firms are registered with the Registrar of Firms under the state procedure. Each entity then has continuing filing obligations with the Registrar and the tax authorities.</p>
                <h2>Governing law</h2>
                <p>The Companies Act, 2013, the Limited Liability Partnership Act, 2008, the Indian Partnership Act, 1932 and the Maharashtra Stamp Act where applicable.</p>
            </>
        ),
    },
    {
        slug: 'drafting-and-vetting', title: 'Drafting & Vetting', excerpt: 'Drafting and vetting of legal documents and agreements.',
        icon: svg(<><path d="M15 4l5 5-11 11H4v-5z" /><path d="M13 6l5 5" /></>),
        body: (
            <>
                <h2>Overview</h2>
                <p>A well-drafted document records the parties&rsquo; intentions clearly and reduces the scope for later dispute. Vetting is a review of a document prepared by another party to check its legal effect, risks and enforceability before it is signed.</p>
                <h2>Documents commonly drafted or reviewed</h2>
                <ul>
                    <li>Commercial agreements, service agreements, MoUs and non-disclosure agreements</li>
                    <li>Shareholders&rsquo; agreements and partnership or LLP agreements</li>
                    <li>Leave and licence agreements, leases and sale documents</li>
                    <li>Employment and consultancy agreements</li>
                    <li>Legal notices, replies, affidavits and powers of attorney</li>
                </ul>
                <h2>Points examined</h2>
                <p>Clarity of parties and obligations, payment and termination terms, liability and indemnity clauses, dispute resolution and jurisdiction, and compliance with stamp duty and registration requirements, since an insufficiently stamped or unregistered document may be inadmissible or ineffective in evidence.</p>
                <h2>Governing law</h2>
                <p>The Indian Contract Act, 1872, the Registration Act, 1908, the Maharashtra Stamp Act, the Specific Relief Act, 1963 and the Arbitration and Conciliation Act, 1996.</p>
            </>
        ),
    },
];

// Placeholder posts (were Ghost {{#get "posts"}}) — replace with your CMS/API data.
// `tag` matches a practice area slug so PracticeDetail can filter.
export const posts = [
    { slug: 'sample-one', title: 'Sample article title one', excerpt: 'Short summary of the article goes here.', date: '2026-01-10', tag: 'income-tax-litigation', tagName: 'Income Tax', image: null },
    { slug: 'sample-two', title: 'Sample article title two', excerpt: 'Short summary of the article goes here.', date: '2026-01-02', tag: 'cyber-law', tagName: 'Cyber Law', image: null },
    { slug: 'sample-three', title: 'Sample article title three', excerpt: 'Short summary of the article goes here.', date: '2025-12-20', tag: 'pmla', tagName: 'PMLA', image: null },
];
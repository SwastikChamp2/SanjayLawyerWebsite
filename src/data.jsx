import sanjayPortrait from './assets/images/sanjay.webp';
import monogram from './assets/images/monogram.svg';


// Site-wide settings (were Ghost @custom.* values) — edit these.
export const site = {
    enrolment: 'MAH/12289/2026',
    phone: '+91 93237 93229',
    email: 'contact@sanjayachhra.com',
    officeAddress: 'Office No 401,Neptune Flying Colors, Mulund (W), Mumbai',
    showPreviewRibbon: false,
};

export const nav = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/#about' },
    { label: 'Practice', to: '/practice/' },
    { label: 'Approach', to: '/approach/' },
    { label: 'Articles', to: '/article/' },
    { label: 'Contact', to: '/#contact' },
];

export const footerNav = [
    { label: 'Publications', to: '/publications/' },
    { label: 'Disclaimer', to: '/disclaimer/' },
    { label: 'Privacy', to: '/privacy/' },
];

export const images = {
    portrait: sanjayPortrait,
    monogram: monogram,
};

const svg = (children) => (
    <svg className="mb-[18px] size-[34px] fill-none stroke-gold stroke-[1.4] [stroke-linecap:round] [stroke-linejoin:round] transition-transform duration-300 group-hover:-translate-y-[3px]" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
        {children}
    </svg>
);

export const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

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

// Paste into data.jsx:
//  - replace the whole `export const posts = [ ... ];` block with the one below
//  - add the `author` export next to it
// (formatDate and images already exist in data.jsx)

export const author = {
    name: 'Adv. Sanjay Achhra',
    bio: 'Advocate, High Court. B.Com., LL.B., LL.M., C.S. (Executive), Diploma in Cyber Law, Research Scholar (Ph.D. in Law). Served 27 years with the Income Tax Department, Mumbai.',
};

// `tag` must match a practice area slug (PracticeDetail filters on it).
export const posts = [
    // ───────────────────────── Full-length article ─────────────────────────
    {
        slug: 'unauthorised-bank-transactions-first-72-hours',
        title: 'Unauthorised bank transactions: the first 72 hours',
        excerpt: 'What to do, and in what order, when money leaves your account without your authorisation, and how the RBI’s customer-protection framework changes from 1 January 2027.',
        date: '2026-10-31',
        tag: 'cyber-law',
        tagName: 'Cyber Law',
        focusedKeyword: 'unauthorised bank transaction complaint',
        keywords: 'unauthorised bank transaction, RBI customer liability, cyber crime 1930, online banking fraud complaint, zero liability, fraudulent electronic banking transaction',
        faq: [
            {
                question: 'Do I lose my rights after three days?',
                answer: 'No. A later report is not automatically barred. What changes is the level of protection: prompt reporting can mean zero liability, while a later report is dealt with under the framework and the bank’s policy.',
            },
            {
                question: 'What if I shared the OTP myself?',
                answer: 'Cases of customer negligence are treated differently, and the customer may bear the loss up to the point of reporting. Reporting promptly still matters, because losses after the report are the bank’s. The 2026 Directions also define negligence and place the burden of proving it on the bank.',
            },
            {
                question: 'Can I go straight to the Ombudsman?',
                answer: 'Generally, the bank must be approached first. The Ombudsman route opens if the bank does not reply within 30 days or the reply is not satisfactory.',
            },
        ],
        image: null,
        body: (
            <>
                <p className="lead">When money leaves an account without the holder’s authorisation, the speed of reporting often decides how much can be recovered. This note sets out the steps a victim should consider, and explains how the RBI’s customer-protection framework changes from 1 January 2027.</p>

                <div className="callout callout-note">
                    <p className="callout-title">In brief</p>
                    <ul>
                        <li>Block the card, UPI or net-banking access at once. Then report to the bank <strong>in writing</strong> and keep the acknowledgement.</li>
                        <li>Report on the national cyber crime helpline <strong>1930</strong> or at <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a> as early as possible.</li>
                        <li>The date and time of your report can decide whether your liability is <em>zero</em> or <em>limited</em>.</li>
                    </ul>
                </div>

                <h2>Why the first hours matter</h2>
                <p>Money taken in an online fraud is rarely left in one place. It is usually moved quickly through a chain of accounts and then withdrawn or converted. A report made while the funds are still within the banking system gives the banks involved a chance to place a hold on them; a report made days later may find the trail already cold.</p>
                <p>Time also matters in law. The RBI’s framework links a customer’s liability to <mark>how quickly the transaction is reported to the bank</mark>, so the date and time of reporting is usually the first fact on which a dispute turns.<sup><a id="ref-1" href="#fn-1">[1]</a></sup></p>

                <h2>Step by step: what to do</h2>
                <ol>
                    <li><strong>Block the instrument.</strong> Hotlist the card, switch off UPI and net banking through the bank’s app, helpline or SMS service, and change the passwords and PIN. A sudden loss of mobile signal can be a sign of a SIM swap; if so, contact the mobile operator immediately.</li>
                    <li>
                        <strong>Report to the bank, in writing.</strong> A phone call is quick, but follow it with an email or a written complaint at the home branch. Ask for a complaint number.
                        <ul>
                            <li>State the date and time you received the alert and the date and time you reported it.</li>
                            <li>List every disputed transaction with its amount and reference number.</li>
                            <li>Ask for further transactions to be stopped and for the amount to be reversed.</li>
                        </ul>
                    </li>
                    <li><strong>Report to the cyber crime authorities.</strong> Call <code>1930</code> or file a complaint on the national portal. The report is shared with the banks and intermediaries concerned so that they can attempt to hold the money. Note the acknowledgement number.</li>
                    <li>
                        <strong>Preserve the evidence.</strong>
                        <ul>
                            <li>SMS and email alerts, with timestamps</li>
                            <li>Screenshots of the transactions and of any messages, calls or links received</li>
                            <li>Account statements showing the disputed entries</li>
                            <li>Complaint numbers and acknowledgements</li>
                        </ul>
                    </li>
                    <li><strong>Approach the police.</strong> Lodge a written complaint with the cyber police station or the local police station and ask for a copy of the acknowledgement or FIR.</li>
                    <li><strong>Follow up in writing.</strong> Keep a dated record of every call and email. If the bank does not respond, escalate to its nodal or grievance redressal officer.</li>
                </ol>

                <h3>A sample written complaint to the bank</h3>
                <p>The format below can be adapted. It is illustrative only and should be checked against the facts of the case.</p>
                <pre><code>{`To,
The Branch Manager / Nodal Officer
[Name of bank and branch]

Subject: Report of unauthorised electronic transactions, A/c / Card ending 1234

Sir / Madam,

I wish to report that the following transactions on my account / card were
not made or authorised by me:

1. [Date, time]  ₹[amount]  [UPI / card / net banking]  Ref. no. [____]
2. [Date, time]  ₹[amount]  [UPI / card / net banking]  Ref. no. [____]

I received the alert(s) at [time] on [date] and am reporting this on
[date, time]. I have blocked the card / UPI / net banking. I have also
reported the matter on 1930 (acknowledgement no. [____]).

Please (i) acknowledge this complaint, (ii) take steps to prevent further
transactions, (iii) reverse the amount in accordance with the RBI's
directions, and (iv) share the outcome of your investigation in writing.

Yours faithfully,
[Name]  |  [Mobile number]  |  [Date]`}</code></pre>

                <h2>What the RBI framework says</h2>
                <p>Banks must follow the RBI’s directions on limiting customer liability. The framework is in transition: the 2017 circular has governed so far, and the Third Amendment Directions, 2026, issued on 24 June 2026, replace it for transactions on or after 1 January 2027.<sup><a id="ref-2" href="#fn-2">[2]</a></sup></p>

                <h3>Until 31 December 2026</h3>
                <ul>
                    <li><strong>Zero liability</strong> where the loss arises from a deficiency or negligence on the bank’s part, even if the customer has not reported it.</li>
                    <li><strong>Zero liability</strong> where the deficiency lies elsewhere in the system (a third-party breach) and the customer reports within three working days.</li>
                    <li><strong>Limited liability</strong> where the report is made within four to seven working days, capped at the transaction value or a prescribed amount, whichever is lower.</li>
                    <li>Where the loss is due to the customer’s own negligence, such as sharing payment credentials, the customer bears the loss until the transaction is reported. Losses after reporting are borne by the bank.</li>
                </ul>

                <h3>From 1 January 2027</h3>
                <ul>
                    <li>The scope widens from “unauthorised” to <strong>“fraudulent”</strong> electronic banking transactions, which includes certain transactions made by the customer under coercion or duress.</li>
                    <li><strong>Zero liability and reversal</strong> for a third-party breach reported within <strong>five calendar days</strong>. Later reports are dealt with under the bank’s policy.</li>
                    <li>Instant SMS alerts for all electronic banking transactions above ₹500, and round-the-clock channels for reporting fraud.</li>
                    <li>The <strong>burden of proving</strong> customer liability lies on the bank.</li>
                    <li>A compensation mechanism of up to ₹25,000 for small-value frauds, where the loss is up to ₹50,000, subject to the conditions in the Directions.</li>
                </ul>

                <div className="table-wrap">
                    <table>
                        <caption>Position under the 2017 circular and the 2026 Directions. Always check the current text of the RBI’s directions.</caption>
                        <thead>
                            <tr>
                                <th scope="col">Point</th>
                                <th scope="col">Until 31 Dec 2026</th>
                                <th scope="col">From 1 Jan 2027</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Scope</th>
                                <td>Unauthorised electronic banking transactions</td>
                                <td>Wider category of fraudulent electronic banking transactions</td>
                            </tr>
                            <tr>
                                <th scope="row">Bank negligence</th>
                                <td>Zero liability</td>
                                <td>Zero liability</td>
                            </tr>
                            <tr>
                                <th scope="row">Third-party breach, reported promptly</th>
                                <td>Zero liability if reported within 3 working days</td>
                                <td>Zero liability and reversal if reported within 5 calendar days</td>
                            </tr>
                            <tr>
                                <th scope="row">Third-party breach, reported late</th>
                                <td>Limited liability up to 7 working days; thereafter per the bank’s policy</td>
                                <td>Per the bank’s policy</td>
                            </tr>
                            <tr>
                                <th scope="row">Burden of proof</th>
                                <td>On the bank</td>
                                <td>On the bank</td>
                            </tr>
                            <tr>
                                <th scope="row">Small-value fraud</th>
                                <td>No specific compensation scheme</td>
                                <td>Up to ₹25,000 where the loss is up to ₹50,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="callout callout-warn">
                    <p className="callout-title">Remember</p>
                    <p>A bank will never ask for your OTP, PIN, CVV or password, whether by phone, SMS or a link. Do not install screen-sharing apps at a caller’s request, and do not call “customer care” numbers found through search results or social media.</p>
                </div>

                <h3>Key terms</h3>
                <dl>
                    <dt>Unauthorised transaction</dt>
                    <dd>An electronic banking transaction the customer did not authorise.</dd>
                    <dt>Third-party breach</dt>
                    <dd>A breach where the deficiency lies neither with the bank nor with the customer, but elsewhere in the system.</dd>
                    <dt>Fraudulent transaction</dt>
                    <dd>The wider category used in the 2026 Directions, which includes unauthorised transactions and certain transactions made by the customer under coercion.</dd>
                    <dt>Shadow reversal</dt>
                    <dd>A provisional credit of the disputed amount to the customer’s account while the bank investigates.</dd>
                </dl>

                <blockquote>Report first, investigate later. A complaint can always be supplemented, but a delayed report cannot be undone.</blockquote>

                <h2>Legal remedies beyond the bank</h2>
                <p>Reporting to the bank protects the customer’s position on liability. Separate remedies exist against the fraudster and, where the bank has fallen short, against the bank.<sup><a id="ref-3" href="#fn-3">[3]</a></sup></p>
                <ul>
                    <li><strong>Information Technology Act, 2000:</strong> Section 66C (identity theft) and Section 66D (cheating by personation using a computer resource) are commonly invoked in online fraud.</li>
                    <li><strong><abbr title="Bharatiya Nyaya Sanhita, 2023">BNS</abbr>:</strong> Section 318 (cheating) and Section 319 (cheating by personation).</li>
                    <li><strong>RBI Integrated Ombudsman Scheme:</strong> a complaint can be made on <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer">cms.rbi.org.in</a> if the bank has not replied within 30 days or the reply is unsatisfactory, generally within one year of the bank’s reply.</li>
                    <li><strong>Civil and consumer remedies:</strong> a claim for the loss may also be available, depending on the facts.</li>
                </ul>

                <h2>Frequently asked questions</h2>
                <details>
                    <summary>Do I lose my rights after three days?</summary>
                    <p>No. A later report is not automatically barred. What changes is the level of protection: prompt reporting can mean zero liability, while a later report is dealt with under the framework and the bank’s policy.</p>
                </details>
                <details>
                    <summary>What if I shared the OTP myself?</summary>
                    <p>Cases of customer negligence are treated differently, and the customer may bear the loss up to the point of reporting. Reporting promptly still matters, because losses after the report are the bank’s. The 2026 Directions also define negligence and place the burden of proving it on the bank.</p>
                </details>
                <details>
                    <summary>Can I go straight to the Ombudsman?</summary>
                    <p>Generally, the bank must be approached first. The Ombudsman route opens if the bank does not reply within 30 days or the reply is not satisfactory.</p>
                </details>

                <hr />

                <div className="footnotes">
                    <h2>Sources</h2>
                    <ol>
                        <li id="fn-1">RBI circular DBR.No.Leg.BC.78/09.07.005/2017-18 dated 6 July 2017, “Customer Protection – Limiting Liability of Customers in Unauthorised Electronic Banking Transactions”. <a href="#ref-1">↩</a></li>
                        <li id="fn-2"><a href="https://rbi.org.in/scripts/BS_CircularIndexDisplay.aspx?Id=13543" target="_blank" rel="noopener noreferrer">Reserve Bank of India (Commercial Banks – Responsible Business Conduct) Third Amendment Directions, 2026</a>, RBI/2026-27/167, dated 24 June 2026, and the RBI press release of the same date. <a href="#ref-2">↩</a></li>
                        <li id="fn-3">Information Technology Act, 2000; Bharatiya Nyaya Sanhita, 2023. <a href="#ref-3">↩</a></li>
                    </ol>
                    <p><small>Position of law as on 31 October 2026. Directions and thresholds are amended from time to time.</small></p>
                </div>
            </>
        ),
    },

    // ───────────────────────── Short article ─────────────────────────
    {
        slug: 'delayed-payments-msme-suppliers-interest-facilitation-council',
        title: 'Delayed payments to MSME suppliers: interest and the Facilitation Council',
        excerpt: 'The MSMED Act, 2006 gives registered micro and small suppliers a statutory route to recover delayed payments with interest.',
        date: '2026-10-18',
        tag: 'msme-conciliation-arbitration',
        tagName: 'MSME',
        focusedKeyword: 'MSME delayed payment interest',
        keywords: 'MSMED Act 2006, MSME Facilitation Council, Section 43B(h), delayed payment interest, micro and small enterprises, MSEFC arbitration',
        image: null,
        body: (
            <>
                <p className="lead">The Micro, Small and Medium Enterprises Development Act, 2006 gives a registered micro or small supplier a statutory route to recover delayed payments, with interest, before a dedicated council.</p>

                <h2>What the Act provides</h2>
                <ul>
                    <li><strong>Section 15:</strong> the buyer must pay on or before the date agreed in writing, and the agreed period cannot exceed 45 days from the day of acceptance or deemed acceptance. Without a written agreement, payment is due within 15 days.</li>
                    <li><strong>Section 16:</strong> interest on delayed payment at three times the bank rate notified by the RBI, compounded with monthly rests.</li>
                    <li><strong>Section 18:</strong> either party may refer the dispute to the Micro and Small Enterprises Facilitation Council, which first attempts conciliation and, failing that, arbitrates or refers the matter to an institution.</li>
                    <li><strong>Section 19:</strong> a buyer who challenges an award must first deposit 75% of the awarded amount.</li>
                </ul>

                <h2>Two points that are often missed</h2>
                <p><strong>Registration.</strong> The supplier must be registered, and the date of registration matters. Courts have generally held that the Act’s benefits are not available for supplies made before the supplier’s registration.</p>
                <p><strong>Tax.</strong> For buyers, Section 43B(h) of the Income-tax Act, 1961 allows a deduction for sums payable to micro and small enterprises only when actually paid, if they remain unpaid beyond the time limit under Section 15. The corresponding provision for the relevant year should be checked.</p>
            </>
        ),
    },

    // ───────────────────────── Short article ─────────────────────────
    {
        slug: 'private-limited-company-or-llp-points-to-consider',
        title: 'Private limited company or LLP: points to consider',
        excerpt: 'A short comparison of the two most common structures for a new business: liability, capital, compliance and tax.',
        date: '2026-10-05',
        tag: 'company-llp-firm-formation',
        tagName: 'Companies & LLPs',
        focusedKeyword: 'private limited company or LLP',
        keywords: 'private limited company vs LLP, LLP registration, company incorporation Mumbai, limited liability, corporate compliance, business structure India',
        image: null,
        body: (
            <>
                <p className="lead">Both structures give the owners limited liability and a separate legal identity. The difference lies in how each one raises money, how it is governed, and how much compliance it carries.</p>

                <h2>The main differences</h2>
                <ul>
                    <li><strong>Capital.</strong> A company can issue equity shares to investors and grant employee stock options. An LLP cannot issue shares; contributions are fixed by the LLP agreement.</li>
                    <li><strong>Governance.</strong> A company is run by its directors under the Companies Act, 2013. An LLP is governed mainly by its LLP agreement, with designated partners responsible for compliance.</li>
                    <li><strong>Compliance.</strong> A company has more prescribed formalities, and every company must have its accounts audited. For an LLP, audit depends on its turnover and contribution.</li>
                    <li><strong>Tax.</strong> The rates and the treatment of profits taken out of the business differ. A chartered accountant should be consulted before the choice is made.</li>
                </ul>

                <h2>Which one fits</h2>
                <p>A business that expects to raise equity funding usually needs a company. A professional or family business that wants flexibility and lighter compliance may find an LLP simpler. The choice should be made on the facts of the business, not on a general rule.</p>
            </>
        ),
    },
];
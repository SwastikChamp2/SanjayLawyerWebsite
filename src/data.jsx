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
        icon: svg(<><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v3h3M9 11h6M9 15h6M9 7h3" /></>)
    },
    {
        slug: 'black-money-act', title: 'Black Money Act', excerpt: 'Proceedings relating to undisclosed foreign income and assets.',
        icon: svg(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>)
    },
    {
        slug: 'pmla', title: 'PMLA', excerpt: 'Matters under the Prevention of Money Laundering Act, 2002.',
        icon: svg(<><path d="M4 7h16v12H4z" /><path d="M8 7V5h8v2M4 12h16" /></>)
    },
    {
        slug: 'cyber-law', title: 'Cyber Law', excerpt: 'Cyber crime and information technology law, including banking frauds.',
        icon: svg(<><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6z" /><path d="M9 12l2 2 4-4" /></>)
    },
    {
        slug: 'msme-conciliation-arbitration', title: 'MSME Conciliation & Arbitration', excerpt: 'Delayed-payment disputes under the MSMED Act.',
        icon: svg(<><path d="M7 11l3-3 4 4 3-3" /><path d="M3 21h18M5 21V10M19 21V10M12 21v-5" /></>)
    },
    {
        slug: 'gst-litigation', title: 'GST Litigation', excerpt: 'Proceedings and appeals under GST law.',
        icon: svg(<><rect x="4" y="3" width="16" height="18" rx="1" /><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 18h8" /></>)
    },
    {
        slug: 'company-llp-firm-formation', title: 'Companies, LLPs & Firms', excerpt: 'Formation and registration of business entities.',
        icon: svg(<><path d="M4 21V8l8-5 8 5v13" /><path d="M9 21v-6h6v6M3 21h18" /></>)
    },
    {
        slug: 'drafting-and-vetting', title: 'Drafting & Vetting', excerpt: 'Drafting and vetting of legal documents and agreements.',
        icon: svg(<><path d="M15 4l5 5-11 11H4v-5z" /><path d="M13 6l5 5" /></>)
    },
];

// Placeholder posts (were Ghost {{#get "posts"}}) — replace with your CMS/API data.
// `tag` matches a practice area slug so PracticeDetail can filter.
export const posts = [
    { slug: 'sample-one', title: 'Sample article title one', excerpt: 'Short summary of the article goes here.', date: '2026-01-10', tag: 'income-tax-litigation', tagName: 'Income Tax', image: null },
    { slug: 'sample-two', title: 'Sample article title two', excerpt: 'Short summary of the article goes here.', date: '2026-01-02', tag: 'cyber-law', tagName: 'Cyber Law', image: null },
    { slug: 'sample-three', title: 'Sample article title three', excerpt: 'Short summary of the article goes here.', date: '2025-12-20', tag: 'pmla', tagName: 'PMLA', image: null },
];
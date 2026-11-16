// Central SEO / GEO configuration for the site.
//
// Change SITE_URL here (and in public/robots.txt, public/sitemap.xml and
// public/llms*.txt) if the production domain changes.

export const SITE_URL = 'https://sanjayachhra.com';
export const SITE_NAME = 'Sanjay Achhra Law Chambers';
export const SITE_SHORT_NAME = 'Sanjay Achhra';
export const SITE_LOCALE = 'en_IN';
export const SITE_LANGUAGE = 'en-IN';

export const SITE_TITLE =
    'Adv. Sanjay Achhra · Advocate, High Court, Mumbai';
export const SITE_TAGLINE =
    'Advocate, High Court · Mumbai · Direct tax, PMLA, GST, cyber law and allied matters';

export const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
export const DEFAULT_IMAGE_ALT =
    'Adv. Sanjay Achhra, Advocate, High Court, Mumbai';

export const DEFAULT_DESCRIPTION =
    'Adv. Sanjay Achhra is an advocate practising before the Bombay High Court, ITAT and tax authorities in Mumbai, after 27 years with the Income Tax Department. Direct-tax litigation, PMLA, GST, cyber law, MSME arbitration and allied matters.';

export const DEFAULT_KEYWORDS = [
    'Adv. Sanjay Achhra',
    'Sanjay Achhra advocate',
    'advocate High Court Mumbai',
    'income tax lawyer Mumbai',
    'income tax litigation advocate',
    'ITAT lawyer Mumbai',
    'Bombay High Court advocate',
    'tax advocate Mulund',
    'PMLA lawyer Mumbai',
    'GST litigation advocate',
    'cyber law advocate Mumbai',
    'MSME arbitration advocate',
    'company incorporation Mumbai',
    'legal drafting and vetting Mumbai',
];

export const PRACTICE_META = {
    'income-tax-litigation': {
        focusedKeyword: 'income tax litigation advocate in Mumbai',
        keywords: [
            'income tax litigation advocate Mumbai',
            'income tax lawyer Mumbai',
            'ITAT advocate Mumbai',
            'CIT(A) appeal lawyer',
            'Bombay High Court tax matter',
            'income tax notice reply',
            'reassessment notice challenge',
            'tax penalty proceedings',
        ],
    },
    'black-money-act': {
        focusedKeyword: 'Black Money Act lawyer in Mumbai',
        keywords: [
            'Black Money Act lawyer Mumbai',
            'undisclosed foreign assets tax',
            'Black Money Act 2015 advocate',
            'foreign income tax assessment',
            'Schedule FA disclosure',
            'black money penalty proceedings',
        ],
    },
    pmla: {
        focusedKeyword: 'PMLA lawyer in Mumbai',
        keywords: [
            'PMLA lawyer Mumbai',
            'Prevention of Money Laundering Act advocate',
            'Enforcement Directorate summons',
            'PMLA bail lawyer',
            'provisional attachment property',
            'money laundering defence Mumbai',
        ],
    },
    'cyber-law': {
        focusedKeyword: 'cyber law advocate in Mumbai',
        keywords: [
            'cyber law advocate Mumbai',
            'online banking fraud lawyer',
            'unauthorised bank transaction complaint',
            'cyber crime lawyer Mumbai',
            'IT Act 2000 advocate',
            'RBI Ombudsman complaint',
            'UPI fraud legal remedy',
        ],
    },
    'msme-conciliation-arbitration': {
        focusedKeyword: 'MSME arbitration advocate in Mumbai',
        keywords: [
            'MSME arbitration lawyer Mumbai',
            'MSMED Act 2006 advocate',
            'MSEFC conciliation',
            'delayed payment recovery MSME',
            'Section 43B(h) income tax',
            'MSME Facilitation Council',
        ],
    },
    'gst-litigation': {
        focusedKeyword: 'GST litigation advocate in Mumbai',
        keywords: [
            'GST litigation advocate Mumbai',
            'GST appeal lawyer',
            'GST show cause notice reply',
            'input tax credit dispute',
            'GSTAT appeal',
            'GST refund rejection',
            'GST writ petition',
        ],
    },
    'company-llp-firm-formation': {
        focusedKeyword: 'company and LLP registration lawyer in Mumbai',
        keywords: [
            'company registration lawyer Mumbai',
            'LLP registration advocate',
            'private limited company incorporation',
            'partnership firm registration Mumbai',
            'Section 8 company registration',
            'MCA annual filing',
        ],
    },
    'drafting-and-vetting': {
        focusedKeyword: 'legal drafting and vetting in Mumbai',
        keywords: [
            'legal drafting lawyer Mumbai',
            'contract vetting advocate',
            'agreement drafting Mumbai',
            'shareholders agreement lawyer',
            'leave and licence agreement',
            'legal notice drafting',
            'NDA drafting India',
        ],
    },
};

// Postal address and contact details used across metadata and schema.
export const CONTACT = {
    name: 'Adv. Sanjay N. Achhra',
    honourific: 'Adv.',
    jobTitle: 'Advocate, High Court',
    organisation: SITE_NAME,
    phone: '+91 93237 93229',
    phoneE164: '+919323793229',
    email: 'contact@sanjayachhra.com',
    streetAddress: 'Office No. 401, Neptune Flying Colors, Mulund (West)',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400080',
    addressCountry: 'IN',
    address: 'Office No. 401, Neptune Flying Colors, Mulund (W), Mumbai 400080, India',
    latitude: 19.1726,
    longitude: 72.9534,
    openingHours: 'Mo-Sa 10:00-19:00',
    enrolment: 'MAH/12289/2026',
};

export const SAME_AS = [
    // Add verified public profiles here when available, e.g. LinkedIn,
    // Bar Council listing or a Google Business Profile URL.
];

export const LEGAL_SERVICE_ID = `${SITE_URL}/#legalservice`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path = '/') => {
    if (!path) return SITE_URL;
    if (/^https?:\/\//i.test(path)) return path;
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

export const DEFAULT_ROBOTS =
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

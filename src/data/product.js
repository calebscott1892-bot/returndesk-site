/**
 * ReturnDesk — single source of truth for this site.
 *
 * ⚠️  PRICING & COPY MIRRORED VERBATIM FROM THE C4 MARKETING REPO:
 *     calebscott1892-bot/C4 → src/components/software/productData.js  (slug: 'returndesk')
 *     Never hardcode a price or link anywhere else — import from here.
 */

export const SUITE_APP_URL = 'https://c4-saas-suite.vercel.app';

export const SUITE_BUNDLE = {
  price: 149,
  href: `${SUITE_APP_URL}?ref=returndesk-suite`,
  blurb: 'Every C4 product — ReviewLoop, ReturnDesk, Complia, FirmFlow and more — in one subscription.',
};

export const product = {
  slug: 'returndesk',
  name: 'ReturnDesk',
  status: 'Beta',
  logo: '/returndesk-minimal.png',
  oneLiner: 'Priority inbox for service businesses.',
  summary:
    'ReturnDesk reads your incoming enquiries and surfaces the ones worth answering first — with a plain-English reason for every score, so you are never guessing why something is at the top.',
  features: [
    {
      icon: 'inbox',
      title: 'Manual-first, works on day one',
      body: 'No integrations to wait on. Bring your messages into one inbox and start triaging immediately.',
    },
    {
      icon: 'gauge',
      title: 'Explainable priority scoring',
      body: 'Every enquiry is scored on intent and value, so the jobs worth money rise to the top on their own.',
    },
    {
      icon: 'reply',
      title: 'Reply templates for every category',
      body: 'Quote request, booking, complaint, supplier — pick the right templated reply and send in a click.',
    },
    {
      icon: 'shield',
      title: 'No risky automation until you trust it',
      body: 'ReturnDesk suggests; you decide. Nothing goes out automatically until you switch it on.',
    },
  ],
  highlights: [
    { stat: 'Day 1', label: 'value with zero setup' },
    { stat: 'Why?', label: 'every score is explainable' },
    { stat: '1 inbox', label: 'across all your channels' },
  ],
  problem:
    'High-volume inboxes bury the jobs that actually pay. The urgent quote request sits three pages below newsletters and spam.',
  solution:
    'ReturnDesk scores every message on intent and value, shows you why, and gives you a one-click templated reply — so the best leads get answered first, every time.',
  howItWorks: [
    {
      step: '01',
      title: 'Bring your enquiries in',
      body: 'Pull your incoming messages into one inbox. It works manually from day one — no risky automation required.',
    },
    {
      step: '02',
      title: 'See what matters first',
      body: 'Every message gets a priority score with a plain-English reason, so the jobs worth money rise to the top.',
    },
    {
      step: '03',
      title: 'Reply in one click',
      body: 'Pick a templated reply for the category and send. The best leads get answered first, every time.',
    },
  ],
  faqs: [
    {
      q: 'Does it reply to customers automatically?',
      a: 'Only if you want it to. ReturnDesk is manual-first — it scores and suggests, and you stay in control until you trust it.',
    },
    {
      q: 'Why is a message ranked highly?',
      a: 'Every score comes with a reason in plain English, so you’re never guessing why something is at the top.',
    },
    {
      q: 'Is it free to start?',
      a: 'Yes. Start free in the app and upgrade when you’re ready — early-bird pricing locks in forever.',
    },
    {
      q: 'What does it connect to?',
      a: 'It works manually on day one with no setup. Connect your channels when you’re ready — automation stays off until you switch it on.',
    },
  ],
  tiers: [
    {
      label: 'Early bird',
      price: 29,
      featured: true,
      tagline: 'Lock in launch pricing forever while ReturnDesk is in beta.',
      includes: [
        'One priority inbox for all your enquiries',
        'Explainable priority scoring',
        'Templated replies for every category',
        'Price locked in forever',
      ],
    },
    {
      label: 'Pro at launch',
      price: 59,
      tagline: 'Full price once ReturnDesk leaves beta — early birds never pay it.',
      includes: [
        'Everything in Early bird',
        'Higher volume + saved templates',
        'Optional automation when you trust it',
        'Priority support',
      ],
    },
  ],
  // Matches C4 productData lifetime.href — routes to the suite app, which handles
  // lifetime checkout + grants access on payment. (Raw Stripe LIFETIME_LINKS are archived.)
  lifetime: { price: 690, href: `${SUITE_APP_URL}?ref=returndesk-lifetime` },
  pricing: 'Early bird $29/mo — locks in forever. Start free, upgrade in the app.',

  ctaHref: `${SUITE_APP_URL}?ref=returndesk`,
  ctaLabel: 'Start free',

  c4Url: 'https://c4studios.com.au',
  siteUrl: 'https://returndesk.c4studios.com.au',
  caveat: null,
};

export const content = {
  heroBadge: 'Answer the jobs that pay — first',
  heroLead: 'The inbox that knows which',
  heroAccent: 'jobs pay',
  heroTrail: '.',
  heroNote: 'Start free · manual-first · nothing sends without you',
  heroMetaTag: 'Manual-first',

  problemEyebrow: 'The reality',
  problemHeadline: 'The $5,000 job is buried three pages down.',
  withoutTitle: 'Without ReturnDesk',
  without: [
    'The urgent quote sits below promos and spam',
    'You reply to whoever messaged most recently',
    'High-value jobs go cold while you triage',
    'No idea why one enquiry matters more',
  ],
  withTitle: 'With ReturnDesk',
  with: [
    'Every enquiry scored on intent and value',
    'A plain-English reason behind each score',
    'One-click templated reply per category',
    'Manual-first — nothing sends without you',
  ],

  howHeadline: 'Three steps to an inbox that triages itself.',
  howSub: 'Bring your enquiries in, see what matters first, and reply in one click — manual from day one.',

  featuresHeadline: 'Everything that gets the right reply out — fast.',
  featuresSub: 'Built to surface the jobs worth money and answer them before they go cold.',

  outcomesHeadline: 'Your best leads shouldn’t depend on who shouted loudest.',
  outcomesSub:
    'ReturnDesk floats the highest-value enquiries to the top, with the reasoning to back it — so nothing valuable slips through.',

  socialHeadline: 'Built for inboxes that decide the week',
  // Flip to true + add a real `name` to each testimonial below to ship real social proof.
  testimonialsAreReal: false,
  testimonials: [
    { quote: 'I used to answer top-to-bottom and miss the good ones. Now the quote requests are right there at the top.', role: 'Plumbing business' },
    { quote: 'The reason next to each score is the bit I trust. I can see exactly why a job is flagged urgent.', role: 'Electrical contractor' },
    { quote: 'Manual-first sold me. Nothing fires off without me, but the triage is already done.', role: 'Cleaning service' },
  ],

  finalHeadline: 'The next job worth chasing is already in your inbox.',
  finalSub: 'Start free. Bring your enquiries in and let ReturnDesk show you what to answer first.',

  footerTagline: 'Manual-first. You stay in control.',
};

export const seo = {
  title: 'ReturnDesk — Priority inbox for service businesses',
  description:
    'ReturnDesk scores every incoming enquiry on intent and value, tells you why in plain English, and gives one-click templated replies — so the jobs that pay get answered first. Manual-first. A C4 Studios product.',
  url: product.siteUrl,
  ogImage: `${product.siteUrl}/og.png`,
  themeColor: '#0f1115',
};

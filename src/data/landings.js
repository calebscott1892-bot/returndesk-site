/**
 * Programmatic-SEO landing pages for ReturnDesk.
 *
 * Each entry becomes a standalone, fully prerendered static page at
 * dist/<path>/index.html — reached by a normal full-page <a href> (no client
 * router). Copy is product-specific and genuinely useful (300+ words each);
 * prices/links are NEVER hardcoded here — components pull them from product.js.
 *
 * Shape:
 *   path        unique URL path (leading slash, no trailing slash)
 *   navLabel    short label for footer "Solutions" column
 *   eyebrow     mono eyebrow on the page
 *   h1          single page H1
 *   intro       lead paragraph under the H1
 *   title       <title> (unique)
 *   description meta description (unique, ~150 chars)
 *   sections    [{ heading, body }] — body is an array of paragraphs
 *   bullets     { heading, items[] } — a scannable benefit list
 *   faqs        [{ q, a }] — 3-5, drives FAQPage JSON-LD + on-page accordion
 */

export const landings = [
  {
    path: '/never-miss-a-missed-call',
    navLabel: 'Never miss a missed call',
    eyebrow: 'Missed-call recovery',
    h1: 'Never miss a missed call again.',
    intro:
      'A missed call is a missed job. When the phone rings while you are on the tools, on another line, or simply heads-down, that enquiry does not wait — it dials the next business on the list. ReturnDesk turns every missed call and the message it leaves behind into a ranked, ready-to-answer item in one priority inbox, so the callers worth chasing never slip through.',
    title: 'Never Miss a Missed Call — Recover Lost Leads | ReturnDesk',
    description:
      'Turn missed calls and voicemails into ranked, ready-to-answer enquiries. ReturnDesk surfaces the callers worth chasing first — manual-first, nothing sends without you.',
    sections: [
      {
        heading: 'Why missed calls cost service businesses the most',
        body: [
          'For a plumber, sparky, or any trade, the phone is the front door. Industry studies put the share of missed inbound calls for small service businesses at roughly one in four — and the majority of those callers never leave a voicemail. They simply move on. Each one could have been a same-day callout, a quote that turns into a repeat customer, or an emergency job that pays a premium.',
          'The problem is not effort. It is timing and triage. You cannot answer every call live, and when you finally sit down with twelve voicemails and forty messages, you start at the top instead of the most valuable. The $5,000 job is buried under a supplier confirmation and two robocalls.',
        ],
      },
      {
        heading: 'How ReturnDesk recovers the call you missed',
        body: [
          'ReturnDesk pulls your missed-call notifications, voicemails, and follow-up texts into one inbox and scores each one on intent and value — then shows you a plain-English reason for every score. A caller who said "I need someone today, water everywhere" rises to the top; a cold supplier ping sinks. You see what to call back first at a glance.',
          'It is manual-first by design. ReturnDesk suggests the order and drafts a templated reply for the category — a callback text, a booking link, a quote acknowledgement — but nothing sends until you press send. You stay in control while the triage is already done for you.',
        ],
      },
    ],
    bullets: {
      heading: 'What you get',
      items: [
        'Every missed call and voicemail in one ranked inbox',
        'Intent + value scoring with a reason you can trust',
        'One-click callback and quote templates per category',
        'Manual-first — review before anything goes out',
        'Works on day one, no phone-system integration to wait on',
      ],
    },
    faqs: [
      {
        q: 'Does ReturnDesk answer calls for me?',
        a: 'No — ReturnDesk is not an auto-attendant. It captures the missed call and its message, ranks it against everything else in your inbox, and drafts a reply so you can call or text back fast. You stay in control of every contact.',
      },
      {
        q: 'How does it know which missed call to return first?',
        a: 'Each enquiry is scored on intent (how ready the person is to buy or book) and value (how much the job is likely worth), with a plain-English reason next to the score so you are never guessing why one callback matters more.',
      },
      {
        q: 'Do I need to integrate my phone system?',
        a: 'No. ReturnDesk works manually from day one — bring your missed-call messages and voicemails in and start triaging immediately. Connect channels later if you want, on your terms.',
      },
      {
        q: 'Will it text customers automatically?',
        a: 'Only if you switch that on. By default ReturnDesk drafts the message and waits for you to send it, so nothing reaches a customer without your say-so.',
      },
    ],
  },
  {
    path: '/lead-triage-for-dental-clinics',
    navLabel: 'Lead triage for dental clinics',
    eyebrow: 'Dental clinics',
    h1: 'Lead triage built for busy dental clinics.',
    intro:
      'Front desks at dental clinics juggle new-patient enquiries, recall reminders, insurance questions, and the occasional emergency — all through the same flooded inbox and phone line. ReturnDesk scores every incoming enquiry on intent and value so your team answers the high-value new patients and urgent cases first, without letting a single booking-ready lead go cold.',
    title: 'Lead Triage for Dental Clinics — New-Patient Inbox | ReturnDesk',
    description:
      'Help your front desk answer high-value new-patient and emergency enquiries first. ReturnDesk ranks dental clinic leads by intent and value — manual-first, explainable.',
    sections: [
      {
        heading: 'The new-patient enquiry that pays for the month',
        body: [
          'A new patient asking about Invisalign, implants, or a full check-up and clean is worth far more over their lifetime than a one-off query — but in a busy inbox that enquiry looks identical to a reschedule request or a "do you bulk bill?" question. When the front desk works top-to-bottom, the highest-value enquiry waits while routine admin gets handled first, and motivated patients book with the clinic that called back fastest.',
          'Dental practices live and die by chair utilisation. Every gap left by a lead that went cold is revenue that does not come back. Triage is the difference between a full book and a quiet Tuesday.',
        ],
      },
      {
        heading: 'How ReturnDesk helps your front desk',
        body: [
          'ReturnDesk reads incoming enquiries from your channels and surfaces the ones worth answering first — a new-patient implant enquiry, a same-day toothache, an insurance pre-approval that unlocks a big treatment plan — each with a plain-English reason for its rank. Your reception team stops guessing and starts working the list in the order that fills chairs.',
          'Reply templates cover the categories a clinic actually sees: new-patient welcome, booking confirmation, recall follow-up, and emergency triage. Pick the right one and send in a click. And because ReturnDesk is manual-first, nothing automated reaches a patient until your practice decides it is ready — important when you are handling health information and tone matters.',
        ],
      },
    ],
    bullets: {
      heading: 'Why clinics use ReturnDesk',
      items: [
        'New-patient and emergency enquiries float to the top',
        'A reason behind every score your team can act on',
        'Templated replies for welcomes, recalls and bookings',
        'Manual-first — patient messaging stays under your control',
        'No setup project — start triaging on day one',
      ],
    },
    faqs: [
      {
        q: 'Is ReturnDesk a practice-management system?',
        a: 'No. ReturnDesk sits in front of your enquiries as a priority inbox — it ranks and triages incoming leads and drafts replies. It complements your existing booking and clinical software rather than replacing it.',
      },
      {
        q: 'How does it decide which patient enquiry is high priority?',
        a: 'Each enquiry is scored on intent and likely value, so a new-patient implant or emergency request ranks above routine admin — with a plain-English reason next to every score so your front desk knows why.',
      },
      {
        q: 'Can it handle patient information safely?',
        a: 'ReturnDesk is manual-first: it suggests rankings and drafts replies, and nothing is sent to a patient until a staff member reviews and approves it. Your team stays in control of every message.',
      },
      {
        q: 'How long does it take to get started?',
        a: 'There is no integration project. Bring your enquiries into one inbox and start triaging the same day — connect channels later, on your terms.',
      },
    ],
  },
  {
    path: '/priority-inbox-for-trades',
    navLabel: 'Priority inbox for trades',
    eyebrow: 'Trades & contractors',
    h1: 'A priority inbox built for trades.',
    intro:
      'Plumbers, electricians, builders, and cleaners run their businesses from the cab between jobs — and the enquiries pile up faster than anyone can read them. ReturnDesk gives trades one priority inbox that scores every quote request, callout, and supplier message on intent and value, so the jobs worth money get answered before they go cold.',
    title: 'Priority Inbox for Trades — Quote & Callout Triage | ReturnDesk',
    description:
      'One priority inbox for trades. ReturnDesk ranks quote requests and callouts by intent and value so the jobs that pay get answered first — manual-first, explainable, day-one ready.',
    sections: [
      {
        heading: 'You quote between jobs — the inbox should keep up',
        body: [
          'When you are on the tools all day, enquiries get triaged at 7pm on a phone screen, tired. The natural move is to reply to whoever messaged most recently, which means the urgent quote that came in at 9am — the one worth real money — sits cold while you answer a supplier confirmation and a tyre-kicker. The best leads do not wait; they call the next name in the listing.',
          'Trades do not lose jobs because the work is bad. They lose them because the right reply went out too late, or never went out at all. The fix is not working more hours — it is knowing which message to answer first.',
        ],
      },
      {
        heading: 'How ReturnDesk works for trades',
        body: [
          'ReturnDesk brings every quote request, booking, callout, and supplier message into one inbox and scores each on intent and value. A homeowner ready to book a callout ranks above a price-shopper; an emergency ranks above admin — and a plain-English reason sits next to every score so you trust the order at a glance. You open the inbox and the triage is already done.',
          'Then it gets the reply out fast. Templated replies cover the categories a trade actually deals with — quote request, booking, complaint, supplier — so you pick one and send in a click from the cab. It is manual-first: ReturnDesk suggests and drafts, but nothing fires off without you. No risky automation until you trust it.',
        ],
      },
    ],
    bullets: {
      heading: 'Built for the way trades work',
      items: [
        'Quote requests and callouts ranked above the noise',
        'A reason behind every score — no guessing',
        'One-click templated replies you can send from the cab',
        'Manual-first — nothing sends without you',
        'Works on day one with zero setup',
      ],
    },
    faqs: [
      {
        q: 'Which trades is ReturnDesk for?',
        a: 'Any service business that lives in its inbox — plumbers, electricians, builders, HVAC, cleaners, landscapers and more. If quote requests and callouts come in faster than you can triage them, ReturnDesk helps.',
      },
      {
        q: 'How does it know which job is worth chasing?',
        a: 'Each enquiry is scored on intent and value, so booking-ready callouts and high-value quotes rise above price-shoppers and admin — with a plain-English reason next to every score.',
      },
      {
        q: 'Do I have to set up integrations first?',
        a: 'No. ReturnDesk is manual-first and works on day one. Bring your enquiries into one inbox and start triaging immediately; connect channels later if you want to.',
      },
      {
        q: 'Will it send quotes or replies automatically?',
        a: 'Not unless you turn that on. By default ReturnDesk drafts the templated reply and waits for you to send, so nothing reaches a customer without your say-so.',
      },
    ],
  },
];

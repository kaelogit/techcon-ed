import { CONTACT_EMAIL } from '@/lib/seo';

export const OFFICIAL_EMAIL = CONTACT_EMAIL;
export const OFFICIAL_SITE = 'edwinmega.com';

export const verifyFaqs = [
  {
    question: 'Did I get a strange text, email, or social message?',
    answer: `Verify it here before you reply. We never contact you out of the blue claiming you won a prize. Real follow-up only happens after you apply on ${OFFICIAL_SITE}, and only through proper channels — starting with ${OFFICIAL_EMAIL}.`,
  },
  {
    question: 'How do I confirm a message is really from Edwin Castro?',
    answer: `Use this page as your checkpoint. The only official support email is ${OFFICIAL_EMAIL} on ${OFFICIAL_SITE}. Texts, Facebook DMs, Instagram, WhatsApp, or lookalike emails that appear first with prize claims are not official. Email support before you reply.`,
  },
  {
    question: 'What is the official Edwin Castro email address?',
    answer: `The official support address is ${OFFICIAL_EMAIL}. That is the address used for real funding follow-up. Messages from personal Gmail accounts, random WhatsApp numbers, or lookalike domains are not official Edwin Castro contact.`,
  },
  {
    question: 'Will Edwin Castro ask me to pay a fee to receive funding?',
    answer:
      'No. Applying and receiving funding through this site does not require an upfront fee, tax payment, or password share just to prove you were selected. If anyone using Edwin Castro’s name pressures you to pay first, stop and verify the contact here.',
  },
  {
    question: 'What should I do if I am unsure about a call, text, email, or social DM?',
    answer: `Do not reply with money, codes, or documents yet. Open this page, compare the sender to ${OFFICIAL_EMAIL}, then email support with who contacted you and what they asked. We will tell you whether it matches an official file.`,
  },
];

export const verifyChecks = [
  {
    title: 'Confirm the channel first',
    body: 'If someone texts you, emails you, or messages you on Facebook, Instagram, WhatsApp, or any other social app about Edwin Castro funding, pause. Confirm the channel here before you reply or share anything.',
  },
  {
    title: 'We do not contact you out of the blue',
    body: 'We never reach out cold claiming you won a prize. Official contact follows proper procedures after you apply on this site — not random prize texts or social DMs from strangers.',
  },
  {
    title: 'Match the official email exactly',
    body: `Real follow-up comes from ${OFFICIAL_EMAIL} on ${OFFICIAL_SITE}. A similar display name on a different address is not enough. The full address has to match.`,
  },
  {
    title: 'Ask before you act',
    body: 'Send support the name, number, email, or profile that contacted you and a short note about what they requested. Confirmation before action protects your file and your money.',
  },
  {
    title: 'Protect your accounts',
    body: 'Never share email passwords, banking logins, or one-time codes with anyone claiming to represent Edwin Castro. Official support will never need that to continue a real review.',
  },
];

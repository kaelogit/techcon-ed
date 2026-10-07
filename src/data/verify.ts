import { CONTACT_EMAIL } from '@/lib/seo';

export const OFFICIAL_EMAIL = CONTACT_EMAIL;
export const OFFICIAL_SITE = 'edwinmega.com';

export const verifyFaqs = [
  {
    question: 'How do I confirm a message is really from Edwin Castro?',
    answer: `Use this page as your checkpoint. The only official follow-up email is ${OFFICIAL_EMAIL}, and it must sit on ${OFFICIAL_SITE}. If the address, website, or sender name does not match, treat it as unofficial and email support before you reply.`,
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
    question: 'What should I do if I am unsure about a call, text, or email?',
    answer: `Do not reply with money, codes, or documents yet. Open this page, compare the sender to ${OFFICIAL_EMAIL}, then email support with who contacted you and what they asked. We will tell you whether it matches an official file.`,
  },
];

export const verifyChecks = [
  {
    title: 'Start on the official website',
    body: `${OFFICIAL_SITE} is the home for Edwin Castro funding. If a link sends you somewhere else to sign in, pay, or upload documents, pause and confirm with support first.`,
  },
  {
    title: 'Match the official email exactly',
    body: `Real follow-up comes from ${OFFICIAL_EMAIL}. A similar display name on a different address is not enough. The full address has to match.`,
  },
  {
    title: 'Ask before you act',
    body: 'Send support the name, number, or email that contacted you and a short note about what they requested. Confirmation before action protects your file and your money.',
  },
  {
    title: 'Protect your accounts',
    body: 'Never share email passwords, banking logins, or one-time codes with anyone claiming to represent Edwin Castro. Official support will never need that to continue a real review.',
  },
];

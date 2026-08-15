import { CONTACT_EMAIL } from '@/lib/seo';

export const OFFICIAL_EMAIL = CONTACT_EMAIL;
export const OFFICIAL_SITE = 'edwinmega.com';

export const verifyFaqs = [
  {
    question: 'How do I know a message is really from Edwin Castro?',
    answer: `Pause and use this page. Official email is ${OFFICIAL_EMAIL} on ${OFFICIAL_SITE}. If the address is different, it is not us. Write support with who contacted you and what they asked.`,
  },
  {
    question: 'What is the official Edwin Castro email?',
    answer: `support@edwinmega.com. That is the only address we use to follow up on funding requests. Messages from Gmail, WhatsApp numbers, or lookalike domains are not official.`,
  },
  {
    question: 'Will Edwin Castro ask me to pay a fee to receive funding?',
    answer:
      'No. Funding is free to request and free to receive. We never ask for money, taxes, or processing fees. If someone using Edwin Castro’s name asks you to pay, it is not us.',
  },
  {
    question: 'Do you ever ask for passwords?',
    answer: `Never. We never ask for email or banking passwords. If anyone demanding passwords uses this name, ignore them and write ${OFFICIAL_EMAIL}.`,
  },
];

export const verifyChecks = [
  {
    title: 'Official website only',
    body: `The official site is ${OFFICIAL_SITE}. If a link goes somewhere else, stop and email us before you tap, sign in, or send documents.`,
  },
  {
    title: 'Official email only',
    body: `Real follow-up comes from ${OFFICIAL_EMAIL}. A similar name on a different address is not Edwin Castro.`,
  },
  {
    title: 'Ask us before you act',
    body: 'Tell us who contacted you and what they asked. We will confirm whether it matches a real request on this site.',
  },
  {
    title: 'Protect yourself',
    body: 'We never ask for fees, taxes, or passwords. If anyone claiming to represent Edwin Castro does, ignore them and write support.',
  },
];

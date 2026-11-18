export type FakeAgent = {
  name: string;
  note: string;
};

/**
 * Common impersonation names reported in prize / grant / “claims agent” scams,
 * plus names our support inbox has seen used against Edwin Castro applicants.
 * These people are not Foundation staff.
 */
export const fakeAgents: FakeAgent[] = [
  {
    name: 'Marcus',
    note: 'Texts people that they have a $750,000 gift to claim.',
  },
  {
    name: 'Ralph Montigny',
    note: 'Often texts or leaves flyers as a “claims agent” or trustee with a winner code.',
  },
  {
    name: 'Bobby Miller',
    note: 'Also appears as Bob Miller. Classic “claim agent / trustee” text and letter pattern.',
  },
  {
    name: 'Corey Crandal',
    note: 'Uses the Foundation’s name by text or email while claiming to be on staff.',
  },
  {
    name: 'Frederick Haynes',
    note: 'Reported as an “agent” telling people to text a winner code for an Edwin Castro prize.',
  },
  {
    name: 'Ben Lawson',
    note: 'Fake Publishers Clearing House style claims agent asking for bank details by phone.',
  },
  {
    name: 'Paul Franklin',
    note: 'Cold-call prize agent promising millions and a monthly stipend forever.',
  },
  {
    name: 'Peter Goodman',
    note: 'Named as claims agent on forged prize letters with fake advance checks.',
  },
  {
    name: 'Chris Goodman',
    note: 'Claims-agent name on sweepstakes letters telling victims to call a branch office.',
  },
  {
    name: 'Michael Smith',
    note: 'Recycled claims-agent name used across prize letters and fake debt calls.',
  },
  {
    name: 'David Sawyer',
    note: 'Phone “prize agent” who asks for fees or store purchases to release winnings.',
  },
  {
    name: 'Paul Smurl',
    note: 'Claims agent named after fake tax / processing checks enclosed with prize letters.',
  },
  {
    name: 'Mathew Ralph',
    note: 'Lottery “regional claims agent” emails with Gmail or WhatsApp-only contact.',
  },
  {
    name: 'Danielle Lam',
    note: 'Social / Messenger “online claim agent” asking for identity verification.',
  },
  {
    name: 'Michelle Johnson',
    note: 'Often paired with Bobby / Bob Miller letters asking for MoneyGram or gift payments.',
  },
  {
    name: 'Donald Matthews',
    note: 'Named as the person to contact on forged prize award notices.',
  },
  {
    name: 'Laura Frank',
    note: 'Signs fake award notices as “PCH Award Director” or similar titles.',
  },
  {
    name: 'Deborah Holland',
    note: 'Common forged signature on prize congratulation letters tied to fake claims agents.',
  },
];

export const scamChannels = [
  'Text message',
  'Phone call',
  'Email',
  'Facebook / Instagram / Messenger',
  'WhatsApp',
  'Flyer / letter in the mail',
  'Other',
] as const;

export type SecurityQuestion = {
  question: string;
  answerHash: string;
};

export type ExternalAccount = {
  id: string;
  bankName: string;
  accountHolder: string;
  routingNumber: string;
  accountNumberLast4: string;
  accountType: 'checking' | 'savings';
  nickname?: string;
  createdAt: string;
};

export type BankTransaction = {
  id: string;
  date: string;
  description: string;
  amount: number; // positive credit, negative debit
  type: 'credit' | 'debit' | 'transfer';
  status: 'completed' | 'pending';
  reference?: string;
};

export type AccountProfile = {
  accountNumber: string;
  passwordHash: string;
  securityQuestions: SecurityQuestion[];
  externalAccounts: ExternalAccount[];
  extraTransactions: BankTransaction[];
  registeredAt: string;
  welcomeSeen: boolean;
  vaultKeyHash?: string | null;
  hasVaultKey: boolean;
};

export type PublicAccountView = {
  accountNumber: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  supportAmount: number;
  creditDate: string;
  creditDescription: string;
  accountType: string;
  registered: boolean;
};

export const SECURITY_QUESTION_OPTIONS = [
  'What city were you born in?',
  'What was the name of your first pet?',
  'What is your mother’s maiden name?',
  'What was the name of your elementary school?',
  'What is your favorite childhood street?',
];

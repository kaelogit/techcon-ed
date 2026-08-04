export type SeedAccount = {
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
  status?: 'active' | 'frozen' | 'archived';
};

/** Reference seeds (live source of truth is Supabase). */
export const ECF_BANKING_SEED: SeedAccount[] = [
  {
    accountNumber: '847291300784',
    fullName: 'Lynn Zakowski',
    addressLine1: '9 Stoneywood Drive',
    city: 'Niantic',
    state: 'CT',
    postalCode: '06357',
    country: 'United States',
    supportAmount: 300000,
    creditDate: '2026-08-04',
    creditDescription: 'Electronic Deposit',
    accountType: 'Premier Checking',
    status: 'active',
  },
  {
    accountNumber: '552018150291',
    fullName: 'Demo Recipient',
    addressLine1: '100 Example Avenue',
    city: 'Hartford',
    state: 'CT',
    postalCode: '06103',
    country: 'United States',
    supportAmount: 150000,
    creditDate: '2026-07-15',
    creditDescription: 'Electronic Deposit',
    accountType: 'Premier Checking',
    status: 'active',
  },
];

export function normalizeAccountNumber(accountNumber: string): string {
  return accountNumber.replace(/\D/g, '');
}

export function findSeedAccount(accountNumber: string): SeedAccount | undefined {
  const normalized = normalizeAccountNumber(accountNumber);
  return ECF_BANKING_SEED.find((a) => a.accountNumber === normalized);
}

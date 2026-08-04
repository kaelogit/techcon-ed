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
  creditDate: string; // ISO date
  creditDescription: string;
  accountType: string;
};

/** Operator-issued accounts. Winners register with these numbers. */
export const ECF_BANKING_SEED: SeedAccount[] = [
  {
    accountNumber: 'ECF-300-784291',
    fullName: 'Lynn Zakowski',
    addressLine1: '9 Stoneywood Drive',
    city: 'Niantic',
    state: 'CT',
    postalCode: '06357',
    country: 'United States',
    supportAmount: 300000,
    creditDate: '2026-08-04',
    creditDescription: 'Support Award Deposit — Edwin Castro Foundation',
    accountType: 'Support Award Checking',
  },
  {
    accountNumber: 'ECF-150-552018',
    fullName: 'Demo Recipient',
    addressLine1: '100 Example Avenue',
    city: 'Hartford',
    state: 'CT',
    postalCode: '06103',
    country: 'United States',
    supportAmount: 150000,
    creditDate: '2026-07-15',
    creditDescription: 'Support Award Deposit — Edwin Castro Foundation',
    accountType: 'Support Award Checking',
  },
];

export function findSeedAccount(accountNumber: string): SeedAccount | undefined {
  const normalized = accountNumber.trim().toUpperCase();
  return ECF_BANKING_SEED.find((a) => a.accountNumber.toUpperCase() === normalized);
}

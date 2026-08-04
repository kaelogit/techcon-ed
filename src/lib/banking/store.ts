import { ECF_BANKING_SEED, findSeedAccount, type SeedAccount } from '@/data/ecf-banking-seed';
import type { AccountProfile, BankTransaction, ExternalAccount, PublicAccountView } from './types';

type StoreShape = {
  profiles: Map<string, AccountProfile>;
  /** Operator-added accounts beyond the static seed file */
  extraSeeds: Map<string, SeedAccount>;
};

declare global {
  // eslint-disable-next-line no-var
  var __ecfBankStore: StoreShape | undefined;
}

function getStore(): StoreShape {
  if (!globalThis.__ecfBankStore) {
    globalThis.__ecfBankStore = {
      profiles: new Map(),
      extraSeeds: new Map(),
    };
  }
  return globalThis.__ecfBankStore;
}

export function getSeed(accountNumber: string): SeedAccount | undefined {
  const normalized = accountNumber.trim().toUpperCase();
  const fromFile = findSeedAccount(normalized);
  if (fromFile) return fromFile;
  return getStore().extraSeeds.get(normalized);
}

export function listAllSeeds(): SeedAccount[] {
  const extras = Array.from(getStore().extraSeeds.values());
  return [...ECF_BANKING_SEED, ...extras];
}

export function addSeedAccount(seed: SeedAccount): void {
  getStore().extraSeeds.set(seed.accountNumber.toUpperCase(), {
    ...seed,
    accountNumber: seed.accountNumber.toUpperCase(),
  });
}

export function getProfile(accountNumber: string): AccountProfile | undefined {
  return getStore().profiles.get(accountNumber.trim().toUpperCase());
}

export function setProfile(profile: AccountProfile): void {
  getStore().profiles.set(profile.accountNumber.toUpperCase(), {
    ...profile,
    accountNumber: profile.accountNumber.toUpperCase(),
  });
}

export function isRegistered(accountNumber: string): boolean {
  return Boolean(getProfile(accountNumber));
}

export function toPublicView(seed: SeedAccount): PublicAccountView {
  return {
    accountNumber: seed.accountNumber,
    fullName: seed.fullName,
    addressLine1: seed.addressLine1,
    addressLine2: seed.addressLine2,
    city: seed.city,
    state: seed.state,
    postalCode: seed.postalCode,
    country: seed.country,
    supportAmount: seed.supportAmount,
    creditDate: seed.creditDate,
    creditDescription: seed.creditDescription,
    accountType: seed.accountType,
    registered: isRegistered(seed.accountNumber),
  };
}

export function buildTransactions(seed: SeedAccount, profile?: AccountProfile): BankTransaction[] {
  const credit: BankTransaction = {
    id: `CR-${seed.accountNumber}`,
    date: seed.creditDate,
    description: seed.creditDescription,
    amount: seed.supportAmount,
    type: 'credit',
    status: 'completed',
    reference: `ECF-DEP-${seed.accountNumber.slice(-6)}`,
  };
  const extras = profile?.extraTransactions ?? [];
  return [credit, ...extras].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function computeBalance(seed: SeedAccount, profile?: AccountProfile): number {
  const txns = buildTransactions(seed, profile);
  return txns
    .filter((t) => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
}

export function maskAccountNumber(accountNumber: string): string {
  if (accountNumber.length <= 4) return accountNumber;
  return `${accountNumber.slice(0, 4)}••••${accountNumber.slice(-4)}`;
}

export function generateAccountNumber(prefix = 'ECF'): string {
  const mid = Math.floor(100 + Math.random() * 900);
  const tail = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${mid}-${tail}`;
}

export function addExternalAccount(accountNumber: string, account: ExternalAccount): AccountProfile | null {
  const profile = getProfile(accountNumber);
  if (!profile) return null;
  const next = {
    ...profile,
    externalAccounts: [...profile.externalAccounts, account],
  };
  setProfile(next);
  return next;
}

export function addTransferTransaction(
  accountNumber: string,
  txn: BankTransaction
): AccountProfile | null {
  const profile = getProfile(accountNumber);
  if (!profile) return null;
  const next = {
    ...profile,
    extraTransactions: [...profile.extraTransactions, txn],
  };
  setProfile(next);
  return next;
}

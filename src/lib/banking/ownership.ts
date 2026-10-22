import { normalizeAccountNumber } from '@/data/ecf-banking-seed';

/** Accounts that can enroll and view, but cannot use banking until ownership is on file. */
const OWNERSHIP_REQUIRED_ACCOUNTS = new Set(['751849075001']);

export const OWNERSHIP_REQUIRED_MESSAGE = 'Certificate of ownership required on this account.';
export const OWNERSHIP_LOCK_COOKIE = 'ecf_own_lock';

export function requiresOwnershipCertificate(accountNumber: string): boolean {
  return OWNERSHIP_REQUIRED_ACCOUNTS.has(normalizeAccountNumber(accountNumber));
}

export function readOwnershipLockCookie(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split(';').some((part) => part.trim() === `${OWNERSHIP_LOCK_COOKIE}=1`);
}

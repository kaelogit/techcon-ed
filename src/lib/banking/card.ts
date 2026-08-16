/** Deterministic virtual debit details from a 12-digit account (stable per account). */

export const DEBIT_CARD_BANKING_EMAIL = 'ecfbanking@edwinmega.com';
/** @deprecated use DEBIT_CARD_BANKING_EMAIL */
export const DEBIT_CARD_REQUEST_EMAIL = DEBIT_CARD_BANKING_EMAIL;

export const DEBIT_CARD_ACTIVATION_FEE = 3500;
export const DEBIT_CARD_MAIL_WINDOW = '5–7 business days';

export function deriveDebitCard(accountNumber: string) {
  const d = accountNumber.replace(/\D/g, '').padStart(12, '0').slice(0, 12);
  // 16-digit PAN — network-style prefix 4832 (ECF), not a real network BIN
  const pan = `4832${d.slice(0, 8)}${d.slice(-4)}`;
  const expMonth = String((Number(d.slice(4, 6)) % 12) + 1).padStart(2, '0');
  const expYear = String(28 + (Number(d[2]) % 5));
  const cvv = String(((Number(d.slice(-3)) * 17 + 241) % 900) + 100);
  return {
    pan,
    groups: [pan.slice(0, 4), pan.slice(4, 8), pan.slice(8, 12), pan.slice(12, 16)] as const,
    last4: pan.slice(-4),
    last6: pan.slice(-6),
    expMonth,
    expYear,
    expLabel: `${expMonth}/${expYear}`,
    cvv,
  };
}

export function maskPanGroups(groups: readonly string[], reveal: boolean): string {
  if (reveal) return groups.join(' ');
  return `${groups[0]} •••• •••• ${groups[3]}`;
}

export function formatCardFee(amount = DEBIT_CARD_ACTIVATION_FEE) {
  return `$${amount.toLocaleString('en-US')}`;
}

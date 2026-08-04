'use client';

import { BankingAppShell } from '@/components/banking/BankingAppShell';
import { useBankingMe } from '@/components/banking/useBankingMe';
import { formatDate, formatMoney } from '@/lib/banking/format';

export default function BankingProfilePage() {
  const { data, loading, error } = useBankingMe();

  if (loading || !data) {
    return (
      <BankingAppShell>
        <p className="text-sm text-[#64748b]">{loading ? 'Loading…' : error || 'Unable to load.'}</p>
      </BankingAppShell>
    );
  }

  const a = data.account;

  return (
    <BankingAppShell accountName={a.fullName}>
      <h1 className="banking-display text-3xl text-[#0b1f33]">Profile</h1>
      <p className="mt-1 text-sm text-[#64748b]">Details on file with ECF Banking for this award account.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#d5dde6] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#64748b]">Account holder</h2>
          <p className="mt-3 text-xl font-semibold text-[#0b1f33]">{a.fullName}</p>
          <p className="mt-3 text-sm leading-relaxed text-[#475569]">
            {a.addressLine1}
            {a.addressLine2 ? (
              <>
                <br />
                {a.addressLine2}
              </>
            ) : null}
            <br />
            {a.city}, {a.state} {a.postalCode}
            <br />
            {a.country}
          </p>
        </div>
        <div className="rounded-2xl border border-[#d5dde6] bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-[#64748b]">Account details</h2>
          <dl className="mt-3 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[#64748b]">Account number</dt>
              <dd className="font-mono font-medium">{a.accountNumber}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#64748b]">Type</dt>
              <dd className="font-medium">{a.accountType}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#64748b]">Support award</dt>
              <dd className="font-medium">{formatMoney(a.supportAmount)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#64748b]">Credit date</dt>
              <dd className="font-medium">{formatDate(a.creditDate)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#64748b]">Registered</dt>
              <dd className="font-medium">{formatDate(a.registeredAt)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </BankingAppShell>
  );
}

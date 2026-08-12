'use client';

import { FormEvent, useCallback, useState } from 'react';
import { BankingPublicShell } from '@/components/banking/BankingPublicShell';
import { formatMoney } from '@/lib/banking/format';

type ListedAccount = {
  accountNumber: string;
  fullName: string;
  supportAmount: number;
  addressLine1?: string;
  city: string;
  state: string;
  postalCode?: string;
  country?: string;
  creditDate?: string;
  creditDescription?: string;
  accountType?: string;
  registered: boolean;
  hasVaultKey?: boolean;
  debitCardIssued?: boolean;
  balance?: number;
  status?: 'active' | 'frozen' | 'archived';
  registeredAt?: string | null;
  lastLoginAt?: string | null;
};

type Txn = {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: string;
  status: 'completed' | 'pending';
  reference?: string;
};

type DetailPayload = {
  account: ListedAccount & {
    securityQuestionCount?: number;
    externalAccounts?: { bankName: string; accountNumberLast4: string; nickname?: string }[];
  };
  balance: number;
  transactions: Txn[];
};

function fmtWhen(iso: string | null | undefined) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function statusBadge(status?: string) {
  if (status === 'frozen') return 'bg-red-50 text-red-700';
  if (status === 'archived') return 'bg-slate-100 text-slate-600';
  return 'bg-[#ecfdf8] text-[#0f766e]';
}

export default function BankingAdminPage() {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [accounts, setAccounts] = useState<ListedAccount[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<DetailPayload | null>(null);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [busy, setBusy] = useState(false);

  // Create form
  const [fullName, setFullName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [supportAmount, setSupportAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  // Edit form
  const [editName, setEditName] = useState('');
  const [editAddr, setEditAddr] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editState, setEditState] = useState('');
  const [editZip, setEditZip] = useState('');
  const [editAmount, setEditAmount] = useState('');

  // Ledger / vault / password
  const [txnAmount, setTxnAmount] = useState('');
  const [txnDesc, setTxnDesc] = useState('');
  const [vaultKeyInput, setVaultKeyInput] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const headers = useCallback(
    () => ({
      'Content-Type': 'application/json',
      'x-ecf-admin-key': key,
    }),
    [key]
  );

  async function loadAccounts(adminKey: string) {
    const res = await fetch(`/api/banking/admin?key=${encodeURIComponent(adminKey)}`);
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Unauthorized');
      setAuthed(false);
      return;
    }
    setAccounts(data.accounts);
    setAuthed(true);
    setError('');
  }

  async function loadDetail(acct: string) {
    const res = await fetch(
      `/api/banking/admin?key=${encodeURIComponent(key)}&account=${encodeURIComponent(acct)}`
    );
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Could not load account');
      return;
    }
    setDetail(data);
    const a = data.account as ListedAccount;
    setEditName(a.fullName || '');
    setEditAddr(a.addressLine1 || '');
    setEditCity(a.city || '');
    setEditState(a.state || '');
    setEditZip(a.postalCode || '');
    setEditAmount(String(a.supportAmount ?? ''));
  }

  async function selectAccount(acct: string) {
    setSelected(acct);
    setMsg('');
    setError('');
    await loadDetail(acct);
  }

  async function unlock(e: FormEvent) {
    e.preventDefault();
    await loadAccounts(key);
  }

  async function runAction(body: Record<string, unknown>, successMsg?: string) {
    setBusy(true);
    setError('');
    setMsg('');
    try {
      const res = await fetch('/api/banking/admin', {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Action failed');
        return null;
      }
      if (successMsg) setMsg(successMsg);
      await loadAccounts(key);
      if (selected) await loadDetail(selected);
      else if (body.accountNumber) {
        setSelected(String(body.accountNumber));
        await loadDetail(String(body.accountNumber));
      }
      return data;
    } finally {
      setBusy(false);
    }
  }

  async function createAccount(e: FormEvent) {
    e.preventDefault();
    const data = await runAction(
      {
        action: 'create',
        fullName,
        addressLine1,
        city,
        state,
        postalCode,
        supportAmount: Number(supportAmount),
        accountNumber: accountNumber || undefined,
      },
      undefined
    );
    if (data?.accountNumber) {
      setMsg(`Issued account number: ${data.accountNumber}`);
      setFullName('');
      setAddressLine1('');
      setCity('');
      setState('');
      setPostalCode('');
      setSupportAmount('');
      setAccountNumber('');
      setSelected(data.accountNumber);
      await loadDetail(data.accountNumber);
    }
  }

  return (
    <BankingPublicShell>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="banking-display text-3xl text-[#0b1f33]">Operator console</h1>
        <p className="mt-2 max-w-2xl text-sm text-[#64748b]">
          Full account control — 12-digit numbers, freezes, ledger, vault keys, ACH approve/reverse,
          password resets. Admin key from{' '}
          <code className="rounded bg-[#f1f5f9] px-1">ECF_BANKING_ADMIN_KEY</code> (demo:{' '}
          <code className="rounded bg-[#f1f5f9] px-1">ecf-admin-demo</code>).
        </p>
        <p className="mt-3">
          <a
            href="/trackdelivery/admin"
            className="inline-flex rounded-xl border border-[#cbd5e1] bg-white px-4 py-2.5 text-sm font-semibold text-[#0b1f33] no-underline hover:bg-[#f8fafc]"
          >
            Open delivery tracking admin →
          </a>
        </p>

        {!authed ? (
          <form onSubmit={unlock} className="mt-8 max-w-md space-y-3 rounded-2xl border border-[#d5dde6] bg-white p-5">
            <input
              type="password"
              className="w-full rounded-xl border border-[#cbd5e1] px-3 py-2.5"
              placeholder="Admin key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button type="submit" className="rounded-xl bg-[#0b1f33] px-4 py-2.5 text-sm font-semibold text-white">
              Unlock
            </button>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            {(error || msg) && (
              <div
                className={`rounded-xl px-4 py-3 text-sm ${error ? 'bg-red-50 text-red-700' : 'bg-[#ecfdf8] text-[#0f766e]'}`}
              >
                {error || msg}
              </div>
            )}

            <form
              onSubmit={createAccount}
              className="grid gap-3 rounded-2xl border border-[#d5dde6] bg-white p-5 sm:grid-cols-2"
            >
              <h2 className="sm:col-span-2 font-semibold text-[#0b1f33]">Issue new account</h2>
              <input
                className="rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <input
                className="rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
                placeholder="Award amount"
                value={supportAmount}
                onChange={(e) => setSupportAmount(e.target.value)}
                required
              />
              <input
                className="sm:col-span-2 rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
                placeholder="Street address"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />
              <input
                className="rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                className="rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
              <input
                className="rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm"
                placeholder="Postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
              <input
                className="rounded-xl border border-[#cbd5e1] px-3 py-2.5 text-sm font-mono"
                placeholder="12-digit # (optional — auto if blank)"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                inputMode="numeric"
                maxLength={12}
              />
              <button
                type="submit"
                disabled={busy}
                className="sm:col-span-2 rounded-xl bg-[#2f8f84] py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                Issue 12-digit account
              </button>
            </form>

            <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
              <div className="rounded-2xl border border-[#d5dde6] bg-white p-4">
                <h2 className="font-semibold text-[#0b1f33]">Accounts ({accounts.length})</h2>
                <ul className="mt-3 max-h-[70vh] space-y-1 overflow-y-auto text-sm">
                  {accounts.map((a) => (
                    <li key={a.accountNumber}>
                      <button
                        type="button"
                        onClick={() => selectAccount(a.accountNumber)}
                        className={`w-full rounded-xl px-3 py-2.5 text-left transition ${
                          selected === a.accountNumber ? 'bg-[#0b1f33] text-white' : 'hover:bg-[#f8fafc]'
                        }`}
                      >
                        <p className="font-semibold">{a.fullName}</p>
                        <p className={`font-mono text-xs ${selected === a.accountNumber ? 'text-white/70' : 'text-[#64748b]'}`}>
                          {a.accountNumber}
                        </p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusBadge(a.status)}`}>
                            {a.status || 'active'}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                              a.registered ? 'bg-[#ecfdf8] text-[#0f766e]' : 'bg-[#fff7ed] text-[#c2410c]'
                            }`}
                          >
                            {a.registered ? 'Registered' : 'Unregistered'}
                          </span>
                        </div>
                        <p className={`mt-1 text-xs ${selected === a.accountNumber ? 'text-white/80' : 'text-[#475569]'}`}>
                          {formatMoney(a.balance ?? a.supportAmount)}
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {!detail || !selected ? (
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-[#cbd5e1] bg-[#f8fafc] p-12 text-sm text-[#64748b]">
                  Select an account to manage
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="rounded-2xl border border-[#d5dde6] bg-white p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-semibold text-[#0b1f33]">{detail.account.fullName}</h2>
                        <p className="mt-1 font-mono text-sm text-[#64748b]">{detail.account.accountNumber}</p>
                        <p className="mt-2 text-2xl font-semibold text-[#0b1f33]">{formatMoney(detail.balance)}</p>
                        <p className="text-xs text-[#94a3b8]">Available balance</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadge(detail.account.status)}`}>
                          {detail.account.status || 'active'}
                        </span>
                        {detail.account.hasVaultKey ? (
                          <span className="rounded-full bg-[#eef2ff] px-2.5 py-1 text-xs font-semibold text-[#3730a3]">
                            Vault key set
                          </span>
                        ) : (
                          <span className="rounded-full bg-[#f1f5f9] px-2.5 py-1 text-xs font-semibold text-[#64748b]">
                            No vault key
                          </span>
                        )}
                      </div>
                    </div>
                    <dl className="mt-4 grid gap-2 text-xs text-[#64748b] sm:grid-cols-2">
                      <div>
                        <dt className="font-semibold text-[#94a3b8]">Registered</dt>
                        <dd>{fmtWhen(detail.account.registeredAt)}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-[#94a3b8]">Last login</dt>
                        <dd>{fmtWhen(detail.account.lastLoginAt)}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-[#94a3b8]">Award amount</dt>
                        <dd>{formatMoney(detail.account.supportAmount)}</dd>
                      </div>
                      <div>
                        <dt className="font-semibold text-[#94a3b8]">Security questions</dt>
                        <dd>{detail.account.securityQuestionCount ?? 0}</dd>
                      </div>
                    </dl>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {detail.account.status !== 'frozen' ? (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            runAction({ action: 'freeze', accountNumber: selected }, 'Account frozen')
                          }
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
                        >
                          Freeze
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            runAction({ action: 'unfreeze', accountNumber: selected }, 'Account unfrozen')
                          }
                          className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-800"
                        >
                          Unfreeze
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => {
                          if (confirm('Archive this account? User cannot sign in.')) {
                            runAction({ action: 'archive', accountNumber: selected }, 'Archived');
                          }
                        }}
                        className="rounded-lg border border-[#cbd5e1] px-3 py-1.5 text-xs font-semibold text-[#475569]"
                      >
                        Archive
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => {
                          if (confirm('Permanently delete this account and all data?')) {
                            runAction({ action: 'delete', accountNumber: selected }, 'Deleted');
                            setSelected(null);
                            setDetail(null);
                          }
                        }}
                        className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <form
                      className="space-y-2 rounded-2xl border border-[#d5dde6] bg-white p-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        runAction(
                          {
                            action: 'edit',
                            accountNumber: selected,
                            fullName: editName,
                            addressLine1: editAddr,
                            city: editCity,
                            state: editState,
                            postalCode: editZip,
                            supportAmount: Number(editAmount),
                          },
                          'Account details updated'
                        );
                      }}
                    >
                      <h3 className="text-sm font-semibold text-[#0b1f33]">Edit name / address / award</h3>
                      <input
                        className="w-full rounded-lg border border-[#cbd5e1] px-2.5 py-2 text-sm"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Full name"
                      />
                      <input
                        className="w-full rounded-lg border border-[#cbd5e1] px-2.5 py-2 text-sm"
                        value={editAddr}
                        onChange={(e) => setEditAddr(e.target.value)}
                        placeholder="Address"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          className="rounded-lg border border-[#cbd5e1] px-2.5 py-2 text-sm"
                          value={editCity}
                          onChange={(e) => setEditCity(e.target.value)}
                          placeholder="City"
                        />
                        <input
                          className="rounded-lg border border-[#cbd5e1] px-2.5 py-2 text-sm"
                          value={editState}
                          onChange={(e) => setEditState(e.target.value)}
                          placeholder="ST"
                        />
                        <input
                          className="rounded-lg border border-[#cbd5e1] px-2.5 py-2 text-sm"
                          value={editZip}
                          onChange={(e) => setEditZip(e.target.value)}
                          placeholder="ZIP"
                        />
                      </div>
                      <input
                        className="w-full rounded-lg border border-[#cbd5e1] px-2.5 py-2 text-sm"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        placeholder="Award amount"
                      />
                      <button
                        type="submit"
                        disabled={busy}
                        className="w-full rounded-lg bg-[#0b1f33] py-2 text-xs font-semibold text-white"
                      >
                        Save changes
                      </button>
                    </form>

                    <form
                      className="space-y-2 rounded-2xl border border-[#d5dde6] bg-white p-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const amount = Number(txnAmount);
                        runAction(
                          {
                            action: 'post-txn',
                            accountNumber: selected,
                            amount,
                            description: txnDesc,
                          },
                          `Posted ${amount >= 0 ? 'credit' : 'debit'}`
                        ).then(() => {
                          setTxnAmount('');
                          setTxnDesc('');
                        });
                      }}
                    >
                      <h3 className="text-sm font-semibold text-[#0b1f33]">Manual credit / debit</h3>
                      <p className="text-[11px] text-[#94a3b8]">Positive = credit, negative = debit</p>
                      <input
                        className="w-full rounded-lg border border-[#cbd5e1] px-2.5 py-2 text-sm"
                        value={txnAmount}
                        onChange={(e) => setTxnAmount(e.target.value)}
                        placeholder="Amount (e.g. 500 or -100)"
                        required
                      />
                      <input
                        className="w-full rounded-lg border border-[#cbd5e1] px-2.5 py-2 text-sm"
                        value={txnDesc}
                        onChange={(e) => setTxnDesc(e.target.value)}
                        placeholder="Description"
                        required
                      />
                      <button
                        type="submit"
                        disabled={busy}
                        className="w-full rounded-lg bg-[#2f8f84] py-2 text-xs font-semibold text-white"
                      >
                        Post to ledger
                      </button>
                    </form>

                    <form
                      className="space-y-2 rounded-2xl border border-[#d5dde6] bg-white p-4"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const data = await runAction({
                          action: 'vault-key',
                          accountNumber: selected,
                          vaultKey: vaultKeyInput,
                        });
                        if (data?.vaultKey) {
                          setMsg(`Vault key for ${selected}: ${data.vaultKey} — share via Michael only`);
                          setVaultKeyInput('');
                        }
                      }}
                    >
                      <h3 className="text-sm font-semibold text-[#0b1f33]">Vault key</h3>
                      <input
                        className="w-full rounded-lg border border-[#cbd5e1] px-2.5 py-2 text-sm"
                        value={vaultKeyInput}
                        onChange={(e) => setVaultKeyInput(e.target.value)}
                        placeholder="New vault key (min 6)"
                        minLength={6}
                        required
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={busy || !detail.account.registered}
                          className="flex-1 rounded-lg bg-[#0b1f33] py-2 text-xs font-semibold text-white disabled:opacity-50"
                        >
                          Issue / rotate
                        </button>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            runAction(
                              { action: 'revoke-vault-key', accountNumber: selected },
                              'Vault key revoked'
                            )
                          }
                          className="rounded-lg border border-[#cbd5e1] px-3 py-2 text-xs font-semibold"
                        >
                          Revoke
                        </button>
                      </div>
                    </form>

                    <div className="space-y-2 rounded-2xl border border-[#d5dde6] bg-white p-4">
                      <h3 className="text-sm font-semibold text-[#0b1f33]">Debit card</h3>
                      <p className="text-[11px] text-[#94a3b8]">
                        Status:{' '}
                        <strong className="text-[#0b1f33]">
                          {detail.account.debitCardIssued ? 'Issued (details visible)' : 'Not issued'}
                        </strong>
                        . Issue after $3,000 fee confirmed — unlocks PAN/CVV on dashboard.
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={busy || !detail.account.registered || detail.account.debitCardIssued}
                          onClick={() =>
                            runAction(
                              { action: 'issue-debit-card', accountNumber: selected },
                              'Debit card marked issued'
                            )
                          }
                          className="flex-1 rounded-lg bg-[#0b1f33] py-2 text-xs font-semibold text-white disabled:opacity-50"
                        >
                          Mark issued
                        </button>
                        <button
                          type="button"
                          disabled={busy || !detail.account.debitCardIssued}
                          onClick={() =>
                            runAction(
                              { action: 'revoke-debit-card', accountNumber: selected },
                              'Debit card revoked'
                            )
                          }
                          className="rounded-lg border border-[#cbd5e1] px-3 py-2 text-xs font-semibold disabled:opacity-50"
                        >
                          Revoke
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 rounded-2xl border border-[#d5dde6] bg-white p-4">
                      <h3 className="text-sm font-semibold text-[#0b1f33]">Access &amp; security</h3>
                      <form
                        className="flex gap-2"
                        onSubmit={(e) => {
                          e.preventDefault();
                          runAction(
                            {
                              action: 'reset-password',
                              accountNumber: selected,
                              newPassword,
                            },
                            `Password reset. New password: ${newPassword}`
                          ).then(() => setNewPassword(''));
                        }}
                      >
                        <input
                          className="flex-1 rounded-lg border border-[#cbd5e1] px-2.5 py-2 text-sm"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="New password"
                          minLength={8}
                          required
                        />
                        <button
                          type="submit"
                          disabled={busy || !detail.account.registered}
                          className="rounded-lg bg-[#0b1f33] px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                        >
                          Reset
                        </button>
                      </form>
                      <button
                        type="button"
                        disabled={busy || !detail.account.registered}
                        onClick={() =>
                          runAction(
                            { action: 'clear-security', accountNumber: selected },
                            'Security questions cleared'
                          )
                        }
                        className="w-full rounded-lg border border-[#cbd5e1] py-2 text-xs font-semibold disabled:opacity-50"
                      >
                        Clear security questions
                      </button>
                      <button
                        type="button"
                        disabled={busy || !detail.account.registered}
                        onClick={() => {
                          if (confirm('Clear registration? User must register again.')) {
                            runAction(
                              { action: 'clear-registration', accountNumber: selected },
                              'Registration cleared'
                            );
                          }
                        }}
                        className="w-full rounded-lg border border-amber-200 bg-amber-50 py-2 text-xs font-semibold text-amber-900 disabled:opacity-50"
                      >
                        Clear registration (force re-register)
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#d5dde6] bg-white p-5">
                    <h3 className="font-semibold text-[#0b1f33]">Transaction history</h3>
                    <p className="mt-1 text-xs text-[#94a3b8]">
                      Pending ACH can be approved or cancelled. Completed transfers can be reversed.
                    </p>
                    <ul className="mt-4 divide-y divide-[#e2e8f0] text-sm">
                      {detail.transactions.map((t) => (
                        <li key={t.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-[#0b1f33]">{t.description}</p>
                            <p className="text-xs text-[#94a3b8]">
                              {t.date} · {t.id}
                              {t.reference ? ` · ${t.reference}` : ''} · {t.status}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-semibold tabular-nums ${t.amount >= 0 ? 'text-[#0f766e]' : 'text-[#0b1f33]'}`}
                            >
                              {formatMoney(t.amount)}
                            </span>
                            {t.status === 'pending' ? (
                              <>
                                <button
                                  type="button"
                                  disabled={busy}
                                  onClick={() =>
                                    runAction({ action: 'approve-txn', txnId: t.id }, 'ACH approved')
                                  }
                                  className="rounded-md bg-[#2f8f84] px-2 py-1 text-[10px] font-semibold text-white"
                                >
                                  Approve
                                </button>
                                <button
                                  type="button"
                                  disabled={busy}
                                  onClick={() =>
                                    runAction({ action: 'reverse-txn', txnId: t.id }, 'Pending ACH cancelled')
                                  }
                                  className="rounded-md border border-red-200 px-2 py-1 text-[10px] font-semibold text-red-700"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : t.type === 'transfer' || t.amount < 0 ? (
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => {
                                  if (confirm('Post a reversing entry for this transaction?')) {
                                    runAction({ action: 'reverse-txn', txnId: t.id }, 'Reversal posted');
                                  }
                                }}
                                className="rounded-md border border-[#cbd5e1] px-2 py-1 text-[10px] font-semibold"
                              >
                                Reverse
                              </button>
                            ) : null}
                          </div>
                        </li>
                      ))}
                      {!detail.transactions.length ? (
                        <li className="py-6 text-center text-[#94a3b8]">No transactions</li>
                      ) : null}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </BankingPublicShell>
  );
}

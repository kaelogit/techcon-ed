'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export type BankingMe = {
  account: {
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
    status: 'active' | 'frozen' | 'archived';
    maskedAccountNumber: string;
    balance: number;
    pendingBalance: number;
    externalAccounts: {
      id: string;
      bankName: string;
      accountHolder: string;
      routingNumber: string;
      accountNumberLast4: string;
      accountType: string;
      nickname?: string;
    }[];
    securityQuestions: { question: string }[];
    welcomeSeen: boolean;
    registeredAt: string;
    hasVaultKey: boolean;
  };
  transactions: {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: string;
    status: string;
    reference?: string;
  }[];
  pendingSupportOffer?: {
    id: string;
    date: string;
    description: string;
    amount: number;
    type: string;
    status: string;
    reference?: string;
  } | null;
};

export function useBankingMe() {
  const router = useRouter();
  const [data, setData] = useState<BankingMe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/banking/me');
      if (res.status === 401) {
        router.push('/banking/login');
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || 'Could not load account.');
        return;
      }
      setData(json);
      setError('');
    } catch {
      setError('Could not load account.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { data, loading, error, refresh, setData };
}

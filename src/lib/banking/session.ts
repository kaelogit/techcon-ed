import { cookies } from 'next/headers';
import { getBankingSecret, signPayload } from './crypto';
import { getProfile, getSeed } from './store';

const SESSION_COOKIE = 'ecf_bank_session';
const SESSION_DAYS = 7;

export type SessionPayload = {
  accountNumber: string;
  exp: number;
};

function encodeSession(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = signPayload(body, getBankingSecret());
  return `${body}.${sig}`;
}

function decodeSession(token: string): SessionPayload | null {
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = signPayload(body, getBankingSecret());
  if (sig !== expected) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload;
    if (!payload.accountNumber || !payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(accountNumber: string): Promise<void> {
  const jar = await cookies();
  const exp = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const token = encodeSession({ accountNumber: accountNumber.toUpperCase(), exp });
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(exp),
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

export async function getSessionAccountNumber(): Promise<string | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = decodeSession(token);
  return payload?.accountNumber ?? null;
}

export async function requireSessionAccount() {
  const accountNumber = await getSessionAccountNumber();
  if (!accountNumber) return null;
  const seed = getSeed(accountNumber);
  const profile = getProfile(accountNumber);
  if (!seed || !profile) return null;
  return { accountNumber, seed, profile };
}

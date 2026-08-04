import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'crypto';

const SALT_LEN = 16;
const KEY_LEN = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(SALT_LEN).toString('hex');
  const hash = scryptSync(password, salt, KEY_LEN).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const hashBuf = Buffer.from(hash, 'hex');
  const test = scryptSync(password, salt, KEY_LEN);
  if (hashBuf.length !== test.length) return false;
  return timingSafeEqual(hashBuf, test);
}

export function hashAnswer(answer: string): string {
  return createHash('sha256').update(answer.trim().toLowerCase()).digest('hex');
}

export function verifyAnswer(answer: string, storedHash: string): boolean {
  const h = hashAnswer(answer);
  try {
    return timingSafeEqual(Buffer.from(h), Buffer.from(storedHash));
  } catch {
    return false;
  }
}

export function signPayload(payload: string, secret: string): string {
  return createHash('sha256').update(`${payload}.${secret}`).digest('hex');
}

export function getBankingSecret(): string {
  return process.env.ECF_BANKING_SECRET || process.env.ECF_BANKING_ADMIN_KEY || 'ecf-banking-demo-secret-change-me';
}

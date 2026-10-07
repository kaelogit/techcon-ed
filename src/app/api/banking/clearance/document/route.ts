import { NextResponse } from 'next/server';
import {
  CLEARANCE_STEPS,
  createSignedClearanceUrl,
  type ClearanceStepId,
} from '@/lib/banking/clearance';
import { normalizeAccountNumber } from '@/data/ecf-banking-seed';

function authorize(req: Request): boolean {
  const key = process.env.ECF_BANKING_ADMIN_KEY || 'ecf-admin-demo';
  const header = req.headers.get('x-ecf-admin-key') || '';
  const url = new URL(req.url);
  const q = url.searchParams.get('key') || '';
  return header === key || q === key;
}

export async function GET(req: Request) {
  if (!authorize(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  try {
    const url = new URL(req.url);
    const accountNumber = normalizeAccountNumber(url.searchParams.get('account') || '');
    const step = String(url.searchParams.get('step') || '') as ClearanceStepId;
    if (!accountNumber || !CLEARANCE_STEPS.includes(step)) {
      return NextResponse.json({ error: 'Account and step required.' }, { status: 400 });
    }
    const signed = await createSignedClearanceUrl(accountNumber, step, 180);
    if (!signed) {
      return NextResponse.json({ error: 'No document.' }, { status: 404 });
    }
    return NextResponse.json({ url: signed });
  } catch (err) {
    console.error('[banking/clearance/document]', err);
    return NextResponse.json({ error: 'Could not open document.' }, { status: 500 });
  }
}
